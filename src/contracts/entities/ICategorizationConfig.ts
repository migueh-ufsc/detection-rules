export interface ICategorizationConfig {
  threshold: number;
  limits: {
    followingToFollowerRatioScore: number;
    retweetToTweetRatioScore: number;
    mentionsPerUserScore: number;
    tweetSizeAvgScore: number;
    accountAgeScore: number;
    hashtagUsageScore: number;
    tweetCountToAccountAgeScore: number;
    similarityBetweenNameAndUsernameScore: number;
    avgTimeBetweenPostsScore: number;
  };
  weights: {
    followingToFollowerRatioScore: number;
    retweetToTweetRatioScore: number;
    mentionsPerUserScore: number;
    tweetSizeAvgScore: number;
    accountAgeScore: number;
    hashtagUsageScore: number;
    tweetCountToAccountAgeScore: number;
    similarityBetweenNameAndUsernameScore: number;
    avgTimeBetweenPostsScore: number;
  };
}
