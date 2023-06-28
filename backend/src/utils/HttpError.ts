export default class HttpError extends Error {
  constructor(
    public name: string,
    public message: string,
    public status: number,
  ) { // eslint-disable-line unicorn/custom-error-definition
    super(message);
  }
}
