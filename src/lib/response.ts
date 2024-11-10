export interface Response<T> {
  msg: string;
  status: boolean;
  data: T;
}

export function createResponse<T>(props: Response<T>): Response<T> {
  return {
    msg: props.msg,
    status: props.status,
    data: props.data,
  };
}
