export const BASE_URL = 'http://localhost:8000/api/v1';

export const API_URLS = {
  // News Endpoints
  NEWS: {
    BASE: `${BASE_URL}/news`,
    GET_BY_ID: (news_id: string) => `${BASE_URL}/news/${news_id}`,
    CREATE: `${BASE_URL}/news/post`,
    UPDATE: (news_id: string) => `${BASE_URL}/news/${news_id}`,
    DELETE: (news_id: string) => `${BASE_URL}/news/${news_id}`,
  },

  // Authentication Endpoints
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/signup`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    ME: `${BASE_URL}/auth/me`,
  },

  // User Endpoints
  USER: {
    BASE: `${BASE_URL}/users`,
    CREATE: `${BASE_URL}/users/create`,
    GET_BY_ID: (user_id: string) => `${BASE_URL}/users/${user_id}`,
    UPDATE: (user_id: string) => `${BASE_URL}/users/${user_id}`,
    DELETE: (user_id: string) => `${BASE_URL}/users/${user_id}`,
    CHANGE_PASSWORD: (user_id: string) =>
      `${BASE_URL}/users/${user_id}/change-password`,
    CONTROL_STATUS: (user_id: string) => `${BASE_URL}/users/${user_id}/control`,
    MANAGE_ROLE: (user_id: string) => `${BASE_URL}/users/${user_id}/role`,
  },

  // Telegram Endpoints
  TELEGRAM: {
    CREATE: `${BASE_URL}/telegram/add`,
    GET_BY_ID: (telegram_id: string) => `${BASE_URL}/telegram/${telegram_id}`,
    BY_LINKED_ADMIN: (linked_admin: string) =>
      `${BASE_URL}/telegram/${linked_admin}`,
    UPDATE: (telegram_id: string) => `${BASE_URL}/telegram/${telegram_id}`,
    DELETE: (telegram_id: string) => `${BASE_URL}/telegram/${telegram_id}`,
  },
};
