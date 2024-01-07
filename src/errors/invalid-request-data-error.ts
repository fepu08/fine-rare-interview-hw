export default class InvalidRequestDataError extends Error {
  constructor(msg: string = 'Invalid Request Data') {
    super(msg);
    Object.setPrototypeOf(this, InvalidRequestDataError.prototype);
    this.name = 'InvalidRequestDataError';
  }
}
