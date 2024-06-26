import { IProfileData } from './IProfileData';

/**
 * Essa interface armazena a pontuação das dez regras de análise dos perfis
 * Essa pontuação será calculada baseada nas constantes definidas a partir da
 * analise dos dados de bots e humanos
 */
export interface IProfileAnalysis {
  _id?: string;
  profileData: IProfileData;
  accountType?: AccountType;
  accountScore?: number;
  /**
   * Proporção de seguidos para seguidores (fg:fr)
   */
  followingToFollowerRatioScore?: number;
  /**
   * Proporção de retweets entre os tweets da timeline
   */
  retweetToTweetRatioScore?: number | null;
  /**
   * Menções únicas (proporção de quantas menções únicas são feitas)
   */
  mentionsPerUserScore?: number;
  /**
   * Média do tamanho dos tweets (nesse caso da amostra de tweets)
   */
  tweetSizeAvgScore?: number;
  /**
   * Idade da conta em dias
   */
  accountAgeScore?: number;
  /**
   * Utilização de hashtags únicas (proporção de utilização de hashtags)
   */
  hashtagUsageScore?: number;
  /**
   * Quantidade de tweets em relação a idade da conta
   */
  tweetCountToAccountAgeScore?: number;
  /**
   * Similaridade entre o nome do usuário e o username
   */
  similarityBetweenNameAndUsernameScore?: number;
  /**
   * Média de tempo de postagem entre um tweet e outro
   */
  avgTimeBetweenPostsScore?: number;

  [key: string]: any;
}

export enum AccountType {
  BOT = 'bot',
  HUMAN = 'human',
}
