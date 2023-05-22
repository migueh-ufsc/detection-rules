import { HttpError } from 'common/errors/HttpError';
import { UserData } from './UserDataModel';
import axios from 'axios';
import { Config } from 'infra/config';

export interface GetUserDataParams {
  username?: string;
  id?: string;
}
export class TwitterIntegrationService {
  static async getUserData(options: GetUserDataParams): Promise<UserData> {
    try {
      const params: GetUserDataParams = {};
      if (options.id) params.id = options.id;
      if (options.username) params.username = options.id;

      const userData = await axios.get<UserData>(Config.twitterIntegrationURL, {
        params,
        responseType: 'json',
      });
      return userData.data;
    } catch (error) {
      throw new HttpError({
        status: error.status || 500,
        message: `Erro no serviço de integração com o Twitter: ${
          error.message || error.text || error.statusText || error.body
        }`,
      });
    }
  }
}
