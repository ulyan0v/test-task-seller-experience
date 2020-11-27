import axios from 'axios';
import config from 'config';

const HOSTNAME = config.get('hostname');
const PORT = config.get('port');

const api = axios.create({
  baseURL: `http://${HOSTNAME}:${PORT}/`
})

export const getNews = async () => {
  return api.get('news');
}
