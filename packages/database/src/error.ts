export class DatabaseError extends Error {
  constructor(
    public message: string,
    public cause?: unknown,
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class RecordNotFoundError extends DatabaseError {
  constructor(entity: string, identifier: string) {
    super(`${entity} with identifier ${identifier} not found`);
    this.name = "RecordNotFoundError";
  }
}
