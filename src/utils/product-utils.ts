export function getUniqueIdentifierFrom(
  productVintage: string,
  productName: string,
  producerId: string,
) {
  return `${productVintage}+${productName}+${producerId}`;
}
