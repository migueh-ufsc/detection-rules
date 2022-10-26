import { IHttpError } from 'contracts/server/Http';

export class HttpError implements IHttpError {
  readonly status: number;
  readonly message: string;

  constructor(props: IHttpError) {
    this.status = props.status;
    this.message = props.message;
  }
}
