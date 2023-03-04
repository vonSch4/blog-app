import { format } from 'date-fns';

function transformArticleData(article) {
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
  } = article;

  return {
    slug,
    title: title?.trim(),
    description: description?.trim(),
    body: body?.trim(),
    createdAt: format(new Date(createdAt), 'PP'),
    tagList: tagList.slice(0, 10),
    favorited,
    favoritesCount,
    author,
  };
}

export default transformArticleData;
