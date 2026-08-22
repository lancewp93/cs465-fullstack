export const environment = {
  production: false,
  apiBaseUrl: (globalThis as any).__env?.apiBaseUrl || 'http://localhost:3000/api'
};
