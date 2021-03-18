import { Button, Divider, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import api from 'src/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useArticleStyles } from './style';
import { ConsumerContext } from 'src/store';

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

function ArticlePage(props: any) {
  const { hasLogin } = props;
  const { user } = useContext(ConsumerContext);
  const classes = useArticleStyles();
  const history = useHistory();
  let { articleId } = useParams<{ articleId: string }>();
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [edit, setEdit] = useState<Boolean>(false);
  const [article, setArticle] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );
  useEffect(() => {
    if (articleId && articleId !== 'new') {
      api.getArticle(articleId).then((res) => {
        if (res.status === 200) {
          setTitle(res.data.title);
          setArticle(res.data.content);
          setDate(res.data.date);
        }
      });
    } else if (articleId && articleId === 'new') {
      setIsNewArticle(true);
      setEdit(true);
      setTitle('');
    }
  }, [articleId]);

  const handleUpdate = () => {
    const t = new Date();
    !isNewArticle &&
      api
        .putArticle(articleId, {
          userId: user._id,
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

    isNewArticle &&
      api
        .postArticle({
          content: article,
          title: title,
          userId: user._id,
          date: `${t.toLocaleDateString()}  ${t.toLocaleTimeString()}`,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setEdit(!edit);
          }
        });
  };

  const handleQuitEdit = () => {
    if (isNewArticle) {
      history.goBack();
    } else {
      setEdit(!edit);
    }
  };

  const handleDelete = () => {
    api.deleteArticle(articleId).then((res) => {
      console.log(res);
      if (res.status === 200) {
        history.goBack();
      }
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className="title">
          {!edit && (
            <Typography variant="subtitle1" component="p">
              {title}
            </Typography>
          )}
          {edit && (
            <TextField
              value={title}
              placeholder={`请输入标题`}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>
          )}
          <Typography variant="caption" component="p">
            {date}
          </Typography>
        </div>
        <div className="action">
          {!edit && (
            <>
              {hasLogin && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setEdit(!edit)}
                >
                  编辑
                </Button>
              )}
              <Button
                variant="outlined"
                color="default"
                className={classes.actionButton}
                onClick={() => history.goBack()}
              >
                返回列表
              </Button>
            </>
          )}
          {edit && (
            <>
              <Button variant="outlined" color="primary" onClick={handleUpdate}>
                保存
              </Button>
              {!isNewArticle && (
                <Button
                  className={classes.actionButton}
                  variant="outlined"
                  color="secondary"
                  onClick={handleDelete}
                >
                  删除
                </Button>
              )}
              <Button
                className={classes.actionButton}
                variant="outlined"
                color="default"
                onClick={handleQuitEdit}
              >
                退出编辑
              </Button>
            </>
          )}
        </div>
      </div>
      <Divider />
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
                <ReactMarkdown
                  className={classes.markdown}
                  renderers={renderers}
                  source={markdown}
                />
              )
            }
          />
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
