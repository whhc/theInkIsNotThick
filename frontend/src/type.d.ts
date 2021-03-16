export interface NewArticle {
  title: string;
  date: string;
  content: string;
}

export interface Article extends NewArticle {
  _id: string;
}
