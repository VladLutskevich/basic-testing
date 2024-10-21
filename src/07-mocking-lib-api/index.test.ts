/* eslint-disable prettier/prettier */
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/albums/5';

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: {} });
    axios.create = jest.fn().mockReturnValue({ get: getMock });
    await throttledGetDataFromApi(relativePath);
    expect(getMock).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: { id: 5 } });
    axios.create = jest.fn().mockReturnValue({ get: getMock });
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual({ id: 5 });
  });
});
