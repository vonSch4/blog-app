import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import unlikedIcon from '../../assets/image/like.svg';
import likedIcon from '../../assets/image/like-active.svg';
import defaultUserAvatar from '../../assets/image/user-image.png';
import transformArticleData from '../../mappers';
import LoaderSpinner from '../LoaderSpinner';

import styles from './Card.module.scss';

function Card(props) {
  const [imgLoading, setImgLoading] = useState(true);

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

  const tags = tagList.map((tag) => {
    return (
      <li key={nanoid()} className={styles.tag}>
        {tag.trim()}
      </li>
    );
  });

  const likeIcon = favorited ? likedIcon : unlikedIcon;

  return (
    <li className={styles.card}>
      <div className={styles.cardInfo}>
        <div className={styles.title}>
          <Link to={`/articles/${slug}`} className={styles.titleText}>
            {title}
          </Link>
          <button className={styles.likeBtn} type='button'>
            <img className={styles.likeIcon} src={likeIcon} alt='Like' />
            <span className={styles.likeCount}>{favoritesCount}</span>
          </button>
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
