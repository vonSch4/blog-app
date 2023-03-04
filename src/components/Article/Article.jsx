import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import unlikedIcon from '../../assets/image/like.svg';
import likedIcon from '../../assets/image/like-active.svg';
import defaultUserAvatar from '../../assets/image/user-image.png';
import transformArticleData from '../../mappers';

import styles from './Article.module.scss';

function Article() {
  const article = useSelector((state) => state.article.article);

  const transformedArticle = transformArticleData(article);

  const {
    title,
    description,
    body,
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
    <div className={styles.article}>
      <div className={styles.infoWrapper}>
        <div className={styles.articleInfo}>
          <div className={styles.title}>
            <h1 className={styles.titleText}>{title}</h1>
            <button className={styles.likeBtn} type='button'>
              <img className={styles.likeIcon} src={likeIcon} alt='Like' />
              <span className={styles.likeCount}>{favoritesCount}</span>
            </button>
          </div>
          <ul className={styles.tagsList}>{tags}</ul>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.userInfo}>
          <div>
            <span className={styles.userName}>{author.username}</span>
            <br />
            <span className={styles.postDate}>{createdAt}</span>
          </div>
          <img
            className={styles.userAvatar}
            src={author.image || defaultUserAvatar}
            alt='Avatar'
          />
        </div>
      </div>

      <div className={styles.articleBody}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Article;
