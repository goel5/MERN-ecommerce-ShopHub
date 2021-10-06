import axios from 'axios';

const BASE_URL = '/api/';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWE4OTMzN2E4Y2E1YmI3NDQ3NzQxYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzQxNDkzNywiZXhwIjoxNjMzNjc0MTM3fQ._5Uu_c0zB6UzxKA5-2Mw0oZDNawn3JLkOM6e591OOz0';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
