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

  async registerNewUser(data) {
    const { username, email, password } = data;

    const user = await this.blogAPI.post('/users', {
      user: {
        username,
        email,
        password,
      },
    });

    return user;
  }

  async loginUser(data) {
    const { email, password } = data;

    const user = await this.blogAPI.post('/users/login', {
      user: {
        email,
        password,
      },
    });

    return user;
  }

  async updateProfileUser({ data, token }) {
    const { email, password, username, image } = data;

    const updatedUser = await this.blogAPI.put(
      '/user',
      {
        user: {
          email,
          password,
          username,
          image,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return updatedUser;
  }

  async getUser({ token }) {
    const user = await this.blogAPI.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user;
  }
}

export default new BlogService();
