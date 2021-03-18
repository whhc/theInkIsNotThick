export interface NewArticle {
  title: string;
  date: string;
  content: string;
  userId: string;
  [k: string]: any;
}

export interface Article extends NewArticle {
  _id: string;
}
