import { ResponseType } from './http';

export type ResponseCaptchaType = {
  code: number;
  i: string;
  v: string;
};

export interface ResponseLoginType extends ResponseType {
  token: string;
}
