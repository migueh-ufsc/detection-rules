export interface UserData {
  id: string;
  username: string;
  name: string;
  description?: string;
  location?: string;
  verified: boolean;
  accountCreatedAt: string;
  accountDeletedAt?: string;
  nFollowers: number;
  nFollowing: number;
  nTweets: number;
  sampleTimeline?: {
    id: string;
    text: string;
    authorId: string;
    nRetweet: number;
    nReply: number;
    nLike: number;
    nQuote: number;
    mentions?: { username: string; id: string }[];
    isReply: boolean;
    isRetweet: boolean;
    geolocation?: string; //todo precisa mudar pq o que vem da api é um geojson
  }[];
}
