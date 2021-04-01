import http from '../http';

export const getUser = (id: string) => {
  return http.get(`/api/user/${id}`);
};

export const login = (data: { name: string; password: string }) => {
  return http.post<{
    name: string;
    email: string;
    gender: string;
    [k: string]: any;
  }>(`/api/user/login`, data);
};

export default { getUser };
