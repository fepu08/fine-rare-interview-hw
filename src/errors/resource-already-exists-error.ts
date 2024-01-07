export default class ResourceAlreadyExistsError extends Error {
  constructor(msg: string = 'Resource already exists') {
    super(msg);
    Object.setPrototypeOf(this, ResourceAlreadyExistsError.prototype);
    this.name = 'ResourceAlreadyExistsError';
  }
}
