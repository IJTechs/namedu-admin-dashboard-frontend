export const QUERY_KEYS = {
  NEWS: {
    ALL: ['news'] as const,
    DETAILS: (newsId: string) => ['news', newsId] as const,
  },

  AUTH: {
    USER: ['auth', 'user'] as const,
  },

  USER: {
    ALL: ['users'] as const,
    DETAILS: (userId: string) => ['users', userId] as const,
    PROFILE: (userId: string) => ['users', userId, 'profile'] as const,
    CHANGE_PASSWORD: (userId: string) =>
      ['users', userId, 'change-password'] as const,
    CONTROL_STATUS: (userId: string) =>
      ['users', userId, 'control-status'] as const,
    MANAGE_ROLE: (userId: string) => ['users', userId, 'manage-role'] as const,
  },

  TELEGRAM: {
    ALL: ['telegram'] as const,
    DETAILS: (telegramId: string) => ['telegram', telegramId] as const,
    BY_ADMIN: (adminId: string) => ['telegram', 'admin', adminId] as const,
  },
};
