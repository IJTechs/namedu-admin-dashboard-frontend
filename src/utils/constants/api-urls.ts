export const BASE_URL = 'https://api.namedu.uz/api/v1';
// export const BASE_URL = 'http://localhost:8000/api/v1';

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
  ADMIN: {
    BASE: `${BASE_URL}/admins`,
    CREATE: `${BASE_URL}/admins/create`,
    GET_BY_ID: (admin_id: string) => `${BASE_URL}/admins/${admin_id}`,
    UPDATE: (admin_id: string) => `${BASE_URL}/admins/${admin_id}`,
    DELETE: (admin_id: string) => `${BASE_URL}/admins/${admin_id}`,
    CHANGE_PASSWORD: `${BASE_URL}/admins/change-password`,
    CHANGE_STATUS: (admin_id: string) => `${BASE_URL}/admins/${admin_id}/control`,
    CHANGE_ROLE: (admin_id: string) => `${BASE_URL}/admins/${admin_id}/role`,
  },

  // Telegram Endpoints
  TELEGRAM: {
    BASE: `${BASE_URL}/telegrams`,
    CREATE: `${BASE_URL}/telegrams/add`,
    GET_BY_ID: (telegram_id: string) => `${BASE_URL}/telegrams/${telegram_id}`,
    BY_LINKED_ADMIN: (linked_admin: string) => `${BASE_URL}/telegrams/${linked_admin}`,
    UPDATE: (telegram_id: string) => `${BASE_URL}/telegrams/${telegram_id}`,
    DELETE: (telegram_id: string) => `${BASE_URL}/telegrams/${telegram_id}`,
  },
};
