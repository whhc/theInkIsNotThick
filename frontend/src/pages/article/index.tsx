import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import articleApi from '../../api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const useStyles = makeStyles({
  root: {
    padding: `0 20px`,
  },
  markdown: {
    fontSize: `14px`,
    lineHeight: `1.5`,
  },
});

const renderers = {
  code: ({ language, value }: { [k: string]: string }) => {
    return (
      <SyntaxHighlighter style={dark} language={language} children={value} />
    );
  },
};

const L18N = {
  write: '输入',
  preview: '预览',
  uploadingImage: '上传图片',
  pasteDropSelect: '拖拽',
};

function ArticlePage() {
  const classes = useStyles();
  let { articleId } = useParams<{ articleId: string }>();
  const [edit, setEdit] = useState<Boolean>(false);
  const [article, setArticle] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );
  useEffect(() => {
    articleId &&
      articleApi.getArticle(articleId).then((res) => {
        console.log(res);
        setTitle(res.title);
        setArticle(res.content);
        setDate(res.date);
      });
  }, [articleId]);

  const updateArticle = () => {
    const t = new Date();
    articleApi
      .putArticle(articleId, {
        content: article,
        title: title,
        date: `${t.toLocaleDateString()}  ${t.toLocaleTimeString()}`,
      })
      .then((res) => {
        if (res) {
          setEdit(!edit);
        }
        console.log(res);
      });
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="subtitle2">{date}</Typography>
      {!edit && <Button onClick={() => setEdit(!edit)}>编辑</Button>}
      {edit && (
        <>
          <ReactMde
            l18n={L18N}
            minEditorHeight={400}
            value={article}
            onChange={setArticle}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(
                <ReactMarkdown renderers={renderers} source={markdown} />
              )
            }
          />
          <Button onClick={updateArticle}>保存</Button>
        </>
      )}
      {!edit && (
        <ReactMarkdown
          className={classes.markdown}
          renderers={renderers}
          source={article}
        />
      )}
    </div>
  );
}

export default ArticlePage;
