import axios from 'axios';

const BASE_URL = '/api/';
let liveUser;

const getPersistRoot = localStorage.getItem('persist:root');
if (getPersistRoot !== null) {
  liveUser = JSON.parse(
    JSON.parse(localStorage.getItem('persist:root')).user
  ).currentUser;
}
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//   .currentUser
//   ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//       .currentUser.accessToken
//   : '';
let TOKEN = '';
console.log('ds', liveUser);
if (liveUser) {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
    .currentUser.accessToken;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
