import { env } from '@app/config/env';
import axios from 'axios';

export abstract class Service {
  protected static httpClient = axios.create({
    baseURL: env.api.url,
  });

  static setAcessToken(accessToken: string) {
    this.httpClient.defaults.headers.common.Authorization = accessToken;
  }

  static removeAccessToken() {
    this.httpClient.defaults.headers.common.Authorization = undefined;
  }
}
