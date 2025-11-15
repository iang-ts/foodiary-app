import { env } from '@app/config/env';
import axios, { isAxiosError } from 'axios';

export abstract class Service {
  private static refreshTokenInterceptorId: number | undefined;

  protected static httpClient = axios.create({
    baseURL: env.api.url,
  });

  static setAcessToken(accessToken: string) {
    this.httpClient.defaults.headers.common.Authorization = accessToken;
  }

  static removeAccessToken() {
    this.httpClient.defaults.headers.common.Authorization = undefined;
  }

  static removeRefreshTokenHandler() {
    if (this.refreshTokenInterceptorId !== undefined) {
      this.httpClient.interceptors.response.eject(this.refreshTokenInterceptorId);
      this.refreshTokenInterceptorId =  undefined;
    }
  }

  static setRefreshTokenHandler(refreshFn: () => Promise<void>) {
    this.removeRefreshTokenHandler();

    this.refreshTokenInterceptorId = this.httpClient.interceptors.response.use(
      response => response,
      async (error) => {
        if (
          !isAxiosError(error)
          || error.response?.status !== 401
          || !error.config
          || error.config.url === '/auth/refresh-token'
        ) {
          return Promise.reject(error);
        }

        await refreshFn();

        return this.httpClient(error.config);
      },
    );
  }
}
