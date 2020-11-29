
export interface ApiResponse<T> {
  success : boolean,
  errorMessage? : string,
  data : T
}
