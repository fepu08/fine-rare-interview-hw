export default class ResourceNotFoundError extends Error {
  constructor(msg: string = 'Resource not found') {
    super(msg);
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
    this.name = 'ResourceNotFoundError';
  }
}
