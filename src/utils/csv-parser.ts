import fs from 'node:fs';
import { ProductIntermediate } from '../product/product-dto';

type CSVRecord = Record<string, string>;
interface GroupedRecord {
  uniqueIdentifier: string;
  data: CSVRecord;
}

export function processCSVAndUpsert(
  path: string,
  callback: (batch: ProductIntermediate[]) => Promise<void>,
  config = { separator: ',', batchSize: 100 },
) {
  const fileStream = fs.createReadStream(path);

  let data = '';
  let headers: string[] | null = null;
  let batch: CSVRecord[] = [];

  fileStream.on('data', (chunk: Buffer) => {
    data += chunk.toString();

    let lineEndIndex;
    while ((lineEndIndex = data.indexOf('\n')) >= 0) {
      const line = data.slice(0, lineEndIndex).trim();
      data = data.slice(lineEndIndex + 1);

      if (!headers) {
        headers = line.split(',');
      } else {
        const row = line.split(',');
        const record: CSVRecord = headers.reduce(
          (acc: CSVRecord, header, index) => {
            acc[header] = row[index];
            return acc;
          },
          {} as CSVRecord,
        );

        batch.push(record);

        if (batch.length >= config.batchSize) {
          fileStream.pause();
          callback(convertCSVRecordsToProductIntermediate(batch))
            .then(() => {
              batch = [];
              fileStream.resume();
            })
            .catch(console.error);
          batch = [];
          fileStream.resume();
        }
      }
    }
  });

  fileStream.on('end', () => {
    if (batch.length > 0) {
      callback(convertCSVRecordsToProductIntermediate(batch))
        .then(() => {
          console.log('CSV processing completed.');
        })
        .catch((error) => {
          console.error('Error in CSV processing:', error);
        });
    }
  });

  fileStream.on('error', (error) => {
    console.error('Error processing CSV:', error);
  });
}

function convertCSVRecordsToProductIntermediate(
  batch: CSVRecord[],
): ProductIntermediate[] {
  return batch.map((item) => {
    return {
      vintage: item.Vintage,
      name: item.Name,
      producer: {
        name: item.Producer,
        country: item.Country,
        region: item.Region,
      },
    } as ProductIntermediate;
  });
}
