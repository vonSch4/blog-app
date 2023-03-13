import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

import defaultUserAvatar from '../../assets/image/user-image.png';
import transformArticleData from '../../mappers';
import LoaderSpinner from '../LoaderSpinner';
import {
  deleteLikesArticle,
  setLikesArticle,
  deleteArticle,
  resetIsDeleted,
} from '../../store/slices/articleSlice';

import styles from './Article.module.scss';

function Article() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const article = useSelector((state) => state.article.article);
  const username = useSelector((state) => state.user.user.username);
  const isDeleted = useSelector((state) => state.article.isDeleted);
  const isLoading = useSelector((state) => state.article.isLoading);
  const isLogin = useSelector((state) => state.user.isLogin);
  const token = useSelector((state) => state.user.user.token);

  const transformedArticle = transformArticleData(article);
  const {
    slug,
    title,
    description,
    body,
    createdAt,
    tagList,
    favorited,
    favoritesCount,
    author,
  } = transformedArticle;

  const [liked, setLiked] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [imgLoading, setImgLoading] = useState(true);

  const tags = tagList.map((tag) => (
    <li key={nanoid()} className={styles.tag}>
      {tag.trim()}
    </li>
  ));

  useEffect(() => {
    setLiked(favorited);
  }, [favorited]);

  useEffect(() => {
    if (isDeleted) navigate('/articles', { replace: true });

    return () => dispatch(resetIsDeleted());
  }, [dispatch, navigate, isDeleted]);

  const likesHandler = () => {
    if (!liked) {
      setLikeCount((l) => l + 1);
      setLiked(true);
      dispatch(setLikesArticle({ slug, token }));
    }
    if (liked) {
      setLikeCount((l) => l - 1);
      setLiked(false);
      dispatch(deleteLikesArticle({ slug, token }));
    }
  };

  const delArticle = (data) => {
    dispatch(deleteArticle(data));
  };

  return (
    <div className={styles.article}>
      <div className={styles.infoWrapper}>
        <div className={styles.articleInfo}>
          <div className={styles.title}>
            <h1 className={styles.titleText}>{title}</h1>
            <label className={styles.likeBtn}>
              <input
                type='checkbox'
                disabled={!isLogin}
                onChange={likesHandler}
                checked={liked}
              />
              <span>{likeCount}</span>
            </label>
          </div>
          <ul className={styles.tagsList}>{tags}</ul>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.userInfoContainer}>
            <div>
              <span className={styles.userName}>{author.username}</span>
              <br />
              <span className={styles.postDate}>{createdAt}</span>
            </div>
            {imgLoading && <LoaderSpinner />}
            <img
              className={styles.userAvatar}
              style={imgLoading ? { display: 'none' } : {}}
              src={author.image || defaultUserAvatar}
              alt='Avatar'
              onError={(e) => {
                e.target.src = defaultUserAvatar;
              }}
              onLoad={() => setImgLoading(false)}
            />
          </div>
          {username === author.username && (
            <div className={styles.buttonContainer}>
              <Popup
                trigger={
                  <button type='button' className={styles.btnDelete}>
                    Delete
                  </button>
                }
              >
                {(close) => (
                  <div className={styles.deletePopup}>
                    <div className={styles.popupText}>
                      Are you sure to delete this article?
                    </div>
                    <button
                      className={styles.btnNo}
                      type='button'
                      onClick={close}
                    >
                      No
                    </button>
                    <button
                      className={styles.btnYes}
                      type='button'
                      onClick={() => delArticle({ slug, token })}
                    >
                      Yes
                    </button>
                  </div>
                )}
              </Popup>

              <Link to='edit' className={styles.btnEdit}>
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className={styles.articleBody}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>

      {isLoading && <LoaderSpinner customClass={styles.loaderContainer} />}
    </div>
  );
}

export default Article;
