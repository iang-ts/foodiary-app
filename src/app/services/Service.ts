import { env } from '@app/config/env';
import axios, { isAxiosError } from 'axios';
import base64 from 'react-native-base64';

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

  static async uploadPresignedPOST({ file, uploadSignature }: Service.uploadPresignedPOSTParams) {
    const decodedSignature = base64.decode(uploadSignature);
    const { url, fields } = JSON.parse(decodedSignature) as { url: string, fields: Record<string, string> };
    const form = new FormData();

    for (const [key, value] of Object.entries(fields)) {
      form.append(key, value);
    }

    form.append('file', file as unknown as string);

    await axios.post(url, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export namespace Service {
  export type uploadPresignedPOSTParams = {
    uploadSignature: string;
    file: {
      name: string;
      type: string;
      uri: string;
    };
  }
}
