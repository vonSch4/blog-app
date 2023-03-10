import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import defaultUserAvatar from '../../assets/image/user-image.png';
import transformArticleData from '../../mappers';
import LoaderSpinner from '../LoaderSpinner';
import {
  deleteLikesArticle,
  setLikesArticle,
} from '../../store/slices/articleSlice';

import styles from './Card.module.scss';

function Card(props) {
  const dispatch = useDispatch();

  const { article } = props;
  const transformedArticle = transformArticleData(article);
  const {
    slug,
    title,
    description,
    createdAt,
    tagList,
    favorited,
    favoritesCount,
    author,
  } = transformedArticle;

  const tags = tagList.map((tag) => (
    <li key={nanoid()} className={styles.tag}>
      {tag.trim()}
    </li>
  ));

  const isLogin = useSelector((state) => state.user.isLogin);
  const token = useSelector((state) => state.user.user.token);

  const [liked, setLiked] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    setLiked(favorited);
  }, [favorited]);

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

  return (
    <li className={styles.card}>
      <div className={styles.cardInfo}>
        <div className={styles.title}>
          <Link to={`/articles/${slug}`} className={styles.titleText}>
            {title}
          </Link>
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
        {!!tags.length && <ul className={styles.tagsList}>{tags}</ul>}
        <p className={styles.cardText}>{description}</p>
      </div>

      <div className={styles.userInfo}>
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
    </li>
  );
}

export default Card;
