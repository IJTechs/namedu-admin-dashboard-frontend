export const QUERY_KEYS = {
  NEWS: {
    ALL: ['news'] as const,
    DETAILS: (newsId: string) => ['news', newsId] as const,
  },

  AUTH: {
    USER: ['auth', 'admin'] as const,
  },

  ADMIN: {
    ALL: ['admins'] as const,
    DETAILS: (adminId: string) => ['admins', adminId] as const,
    PROFILE: (adminId: string) => ['admins', adminId, 'profile'] as const,
    CHANGE_PASSWORD: (adminId: string) => ['admins', adminId, 'change-password'] as const,
    CONTROL_STATUS: (adminId: string) => ['admins', adminId, 'control-status'] as const,
    MANAGE_ROLE: (adminId: string) => ['admins', adminId, 'manage-role'] as const,
  },

  TELEGRAM: {
    ALL: ['telegram'] as const,
    DETAILS: (telegramId: string) => ['telegram', telegramId] as const,
    BY_LINKED_ADMIN: (adminId: string) => ['telegram', 'admin', adminId] as const,
  },
};
