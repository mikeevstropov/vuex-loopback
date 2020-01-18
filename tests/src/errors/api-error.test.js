import {ApiError} from '@src/errors/api-error';

describe('ApiError class checking.', () => {

  test('Has specific properties.', () => {

    const error = new ApiError();

    expect(error.statusCode).toBeNumber();
    expect(error.name).toBeString();
    expect(error.message).toBeString();
    expect(error.code).toBeString();
  });
});
