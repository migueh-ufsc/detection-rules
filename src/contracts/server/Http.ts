export interface Query {
  [key: string]: undefined | string | string[] | Query | Query[];
}

export interface HttpRequest {
  headers?: Record<string, string | string[] | undefined>;
  params?: Record<string, string>;
  query?: Query;
  body?: any;
}

export interface HttpResponse {
  status: number;
  body?: unknown;
}

export interface IHttpError {
  status: number;
  message: string;
}
