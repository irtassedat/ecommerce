import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { cards } from './mockData';

const instance = axios.create({
  baseURL: 'https://your-api-url.com'
});

const mock = new MockAdapter(instance);

// Kart listesi için mock setup
mock.onGet('/user/card').reply(200, cards);

// Kart ekleme için mock setup
mock.onPost('/user/card').reply((config) => {
  const newCard = JSON.parse(config.data);
  cards.push({...newCard, id: cards.length + 1});
  return [201, newCard];
});

export default instance;
