import axios from 'axios';

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
});

/*

client.interceptors.request.use(request => {

  console.log('Starting Request', request);
  return request
});

client.interceptors.response.use(response => {

  console.log('Response:', response);
  return response
});

*/

export default client;
