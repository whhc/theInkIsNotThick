import http from '../http';

export const getUser = (id: string) => {
  return http.get(`api/user/${id}`);
};

export default { getUser };
