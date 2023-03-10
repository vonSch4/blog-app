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

  async getArticles({ offset, token }) {
    const articles = await this.blogAPI.get('/articles', {
      params: {
        limit: 5,
        offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return articles;
  }

  async getArticle({ slug, token }) {
    const article = await this.blogAPI.get(`/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return article;
  }

  async setLikesArticle({ slug, token }) {
    const likedArticle = await this.blogAPI.post(
      `/articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return likedArticle;
  }

  async deleteLikesArticle({ slug, token }) {
    const unlikedArticle = await this.blogAPI.delete(
      `/articles/${slug}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return unlikedArticle;
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

  async loginUser({ email, password }) {
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
