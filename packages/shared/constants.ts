export const FILE_UPLOAD_CONSTANTS = {
  MAX_SIZE_MB: 10,
  get MAX_SIZE_BYTES() {
    return this.MAX_SIZE_MB * 1024 * 1024;
  },
  ACCEPTED_FILE_TYPES: [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "text/csv", // .csv
    "application/csv", // .csv (alt)
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12", // .xlsb
    "application/vnd.ms-excel.sheet.macroEnabled.12", // .xlsm
    "application/vnd.oasis.opendocument.spreadsheet", // .ods
  ] as const,

  MIME_TO_EXTENSION: {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      ".xlsx",
    "application/vnd.ms-excel": ".xls",
    "text/csv": ".csv",
    "application/csv": ".csv",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12": ".xlsb",
    "application/vnd.ms-excel.sheet.macroEnabled.12": ".xlsm",
    "application/vnd.oasis.opendocument.spreadsheet": ".ods",
  } as Record<string, string>,

  get ACCEPT_STR() {
    return Object.values(this.MIME_TO_EXTENSION).join(",");
  },
};

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}
