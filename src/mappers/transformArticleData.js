import { format } from 'date-fns';

function filterTagsList(tag, index) {
  if (index > 8 || !tag) return false;
  if (tag.trim()) return true;
  return false;
}

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
    tagList: tagList?.filter(filterTagsList),
    favorited,
    favoritesCount,
    author,
  };
}

export default transformArticleData;
