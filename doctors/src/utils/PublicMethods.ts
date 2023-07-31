export enum ECode {
  Success = 10000
}

/**根据公司实际情况去修改 */
export interface ResultData<T> extends Result {
  data: T
}
interface Result {
  code: number
  message: string
}
