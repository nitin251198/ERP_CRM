import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

// Common Axios instance for requests
const request = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios instance for tasks with token
const task = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the x-auth-token header using an interceptor
task.interceptors.request.use(
    (config: any) => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        config.headers = {
          ...config.headers,
          'x-auth-token': authToken,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export const login = (data: any) => {
  return request.post('/auth/signin', data).then(response=>response.data);

};

export const signup = (data: any) => {
  return request.post('/auth/signup', data).then(response=>response.data);
};



