
export class ApiError extends Error {

  constructor({
    statusCode = 0,
    name = 'Error',
    message = 'Unknown error',
    code = 'UNKNOWN_ERROR',
  } = {}) {

    super();

    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    this.code = code;
  }

  static from(error) {

    if (
      !error.response ||
      !error.response.data ||
      !error.response.data.error
    ) return new ApiError({
      code: error.code || 'UNKNOWN_ERROR',
      statusCode: error.statusCode || 0,
      message: error.message,
    });

    const data = error
      .response
      .data
      .error;

    return new ApiError({
      statusCode: data.statusCode || 0,
      name: data.name || 'Error',
      message: data.message || 'Unknown error',
      code: data.code || 'UNKNOWN_ERROR',
    });
  }
}
