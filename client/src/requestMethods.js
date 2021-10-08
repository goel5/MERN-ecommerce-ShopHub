import axios from 'axios';

const BASE_URL = '/api/';
let liveUser;

// const getPersistRoot = localStorage.getItem('persist:root');
// if (getPersistRoot !== null) {
//   liveUser = JSON.parse(
//     JSON.parse(localStorage.getItem('persist:root')).user
//   ).currentUser;
// }
// let TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//   .currentUser
//   ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//       .currentUser.accessToken
//   : '';
// let TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//   .currentUser
//   ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//       .currentUser.accessToken
//   : '';
// console.log('ds', liveUser);
// if (liveUser) {
//   TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//     .currentUser.accessToken;
// }
// if (
//   JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser
// ) {
//   TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//     .currentUser.accessToken;
// } else {
//   TOKEN = '';
// }

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     token: `Bearer ${TOKEN}`,
//   },
// });
