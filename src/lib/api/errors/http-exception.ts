export class HTTPException extends Error {
  constructor(
    public status: number,
    public message: string = "Bad Request",
    public cause?: unknown
  ) {
    super(message);
    this.name = "HTTPException";
  }
}
