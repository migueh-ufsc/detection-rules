/**
 * Essa interface armazena a pontuação das dez regras de análise dos perfis
 * Essa pontuação será calculada baseada nas constantes definidas a partir da
 * analise dos dados de bots e humanos
 *
 * REGRAS
 * - Proporção de seguidores para seguidos (fr:fg)
 * - Proporção de retweets e replys entre os tweets
 * - Média do tamanho dos tweets
 * - Idade da conta
 * - Utilização de hashtags únicas (proporção de utilização de hashtags)
 * - Quantidade de tweets em relação a idade da conta
 * - Tamanho do texto da descrição
 * - Similaridade entre o nome do usuario e o username
 * - Proporção de numeros para letras no nome de usuário (varios numeros indicam user padrão)
 *
 */
export interface IProfileAnalysis {
  accountType?: AccountType;
  followerToFollowingRatioScore?: number;
  retweetToReplyToTweetRatioScore?: number;
  tweetSizeAvgScore?: number;
  accountAgeScore?: number;
  hashtagUsageScore?: number;
  tweetCountToAccountAgeScore?: number;
  descriptionTextSizeScore?: number;
  similarityBetweenNameAndUsernameScore?: number;
  numberToLetterRatioOnUsernameScore?: number;
}

export enum AccountType {
  BOT = 'bot',
  HUMAN = 'human',
}
