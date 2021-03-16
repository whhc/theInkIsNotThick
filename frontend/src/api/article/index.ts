import { Article } from 'src/type';
import http from '../http';

export const getArticles = () => {
  return http.get<Article[]>('/api/article');
};

export const getArticle = (id: string) => {
  return http.get(`/api/article/${id}`);
};

export const postArticle = (data: Article) => {
  return http.post('/api/article', { data: data });
};

export const putArticle = (id: string, data: any) => {
  return http.put(`/api/article/${id}`, data);
};

export default {
  getArticles,
  getArticle,
  postArticle,
};
