export interface ActionResponse<T = unknown> {
  msg: string;
  status: boolean;
  data: T;
}

interface ResponsePayload<T = unknown> {
  msg?: string;
  status?: boolean;
  data?: T;
}

export function createActionResponse<T = string>(
  props: ResponsePayload<T>,
): ActionResponse {
  return {
    msg: props.msg ?? "",
    status: props.status ?? true,
    data: props.data ?? "",
  };
}
