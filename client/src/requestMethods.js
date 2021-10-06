import axios from 'axios';

const BASE_URL = '/api/';

const liveUser = JSON.parse(
  JSON.parse(localStorage.getItem('persist:root')).user
).currentUser;
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//   .currentUser
//   ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//       .currentUser.accessToken
//   : '';
let TOKEN = '';
console.log('ds', liveUser);
if (liveUser !== null) {
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
