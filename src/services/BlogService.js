import axios from 'axios';

class BlogService {
  blogAPI = axios.create({
    baseURL: 'https://blog.kata.academy/api/',
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: (status) => {
      return status >= 200 && status < 300;
    },
  });

  async getArticles({ offset }) {
    try {
      const articles = await this.blogAPI.get('/articles', {
        params: {
          limit: 5,
          offset,
        },
      });

      return articles;
    } catch (error) {
      throw error.toJSON();
    }
  }

  async getArticle({ slug }) {
    try {
      const article = await this.blogAPI.get(`/articles/${slug}`);

      return article;
    } catch (error) {
      throw error.toJSON();
    }
  }
}

export default new BlogService();
