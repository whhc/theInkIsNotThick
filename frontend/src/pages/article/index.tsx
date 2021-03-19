import { Button, Divider, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useHistory, useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import api from 'src/api';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useArticleStyles } from './style';
import { ConsumerContext } from 'src/store';
import gfm from 'remark-gfm';
import { Article } from 'src/type';

const renderers = {
  code: ({ language, value }: { [k: string]: string }) => {
    return (
      <SyntaxHighlighter
        style={atomOneDark}
        language={language}
        children={value}
      />
    );
  },
};

const L18N = {
  write: '输入',
  preview: '预览',
  uploadingImage: '上传图片',
  pasteDropSelect: '拖拽',
};

const MarkDownCom = (props: any) => {
  const classes = useArticleStyles();
  return (
    <ReactMarkdown
      plugins={[gfm]}
      className={classes.markdown}
      renderers={renderers}
      source={props.markdown}
    />
  );
};

function ArticlePage(props: any) {
  const { hasLogin } = props;
  /**
   * 草稿功能
   * 1.文本变更时，将变更的文本存储于草稿中 ✅
   * 2.保存时，将初始文本更改为最新状态 ✅
   * 3.编辑状态下，首先比较草稿跟当前文本，不一致的情况以草稿为准 ✅
   * 4.草稿存储于本地 ✅
   * TODO: (后期增加是否应用草稿的选项)
   * 5.何时清除草稿
   * 5.1 当保存时 ✅
   * 5.2 删除时 ✅
   * 6.何时应用初始文本
   * 6.1当退出编辑状态时 ✅
   */
  const draftRef = useRef(''); // 草稿
  const initialRef = useRef(''); // 初始文本
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

  const handleResponse = (data: Article) => {
    setTitle(data.title);
    setArticle(data.content);
    setDate(data.date);
  };

  useEffect(() => {
    if (articleId && articleId !== 'new') {
      api.getArticle(articleId).then((res) => {
        if (res.status === 200) {
          handleResponse(res.data);
        }
      });
    } else if (articleId && articleId === 'new') {
      handleEditClick();
      setIsNewArticle(true);
      // setEdit(true);
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
          if (res.status === 200) {
            initialRef.current = article;
            localStorage.removeItem(`draft-${articleId}`);
            setEdit(!edit);
          }
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
            initialRef.current = article;
            localStorage.removeItem(`draft-${articleId}`);
            setEdit(!edit);
            setIsNewArticle(false);
            history.replace(`/article/${res.data._id}`);
          }
        });
  };

  const handleQuitEdit = () => {
    if (isNewArticle) {
      history.goBack();
    } else {
      // 先退出编辑状态再变更文本到初始文本
      setEdit(false);
      setArticle(initialRef.current);
    }
  };

  const handleDelete = () => {
    api.deleteArticle(articleId).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem(`draft-${articleId}`);
        history.goBack();
      }
    });
  };

  // 草稿功能
  // 初始化
  const initializeArticle = () => {
    // 将当前文本设置为初始文本
    initialRef.current = article;
    // 获取本地存储并将之应用于草稿
    let _localArticle = localStorage.getItem(`draft-${articleId}`);
    if (_localArticle) {
      draftRef.current = _localArticle;
      // 当草稿存在时应用于当前文本
      setArticle(draftRef.current);
    }
  };
  // 处理变更
  // 当处于编辑状态并且在当前编辑文本初始化之后开始
  const handleArticleChange = useMemo(
    () =>
      // 如果当前文本与草稿不一致，将草稿更新为当前文本，并更新本地草稿
      () => {
        if (edit && draftRef.current !== article) {
          draftRef.current = article;
          localStorage.setItem(`draft-${articleId}`, article);
        }
      },
    [edit, article]
  );

  // 检测当前文本变更
  useEffect(() => {
    // 当且仅当编辑状态时
    handleArticleChange();
  }, [article]);

  const handleEditClick = () => {
    initializeArticle();
    setEdit(true);
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
                  onClick={handleEditClick}
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
              Promise.resolve(<MarkDownCom markdown={markdown} />)
            }
          />
        </>
      )}
      {!edit && <MarkDownCom markdown={article} />}
    </div>
  );
}

export default ArticlePage;
