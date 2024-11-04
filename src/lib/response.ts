export interface Response<T = unknown> {
  msg: string;
  status: boolean;
  data: T;
}

interface ResponsePayload<T = unknown> {
  msg?: string;
  status?: boolean;
  data?: T;
}

export function createResponse<T = string>(
  props: ResponsePayload<T>,
): Response {
  return {
    msg: props.msg ?? "",
    status: props.status ?? true,
    data: props.data ?? "",
  };
}
