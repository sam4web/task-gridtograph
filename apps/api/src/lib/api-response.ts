import type { IApiResponse } from "@repo/shared";

export class ApiResponse<T> implements IApiResponse<T> {
  public success: boolean;

  constructor(
    public statusCode: number,
    public message: string = "Success",
    public data: T,
  ) {
    this.success = statusCode < 400;
  }
}
