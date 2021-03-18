import { Article, NewArticle } from 'src/type';
import http from '../http';

export const getArticles = () => {
  return http.get<Article[]>('/api/article');
};

export const getArticle = (id: string) => {
  return http.get<Article>(`/api/article/${id}`);
};

export const postArticle = (data: NewArticle) => {
  return http.post('/api/article', { ...data });
};

export const putArticle = (id: string, data: any) => {
  return http.put(`/api/article/${id}`, data);
};

export const deleteArticle = (id: string) => {
  return http.del(`/api/article/${id}`);
};

export default {
  getArticles,
  getArticle,
  postArticle,
};
