import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'http://111.231.60.214:48080', // 替换为你的 API 基础 URL
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export { apiAxios };
