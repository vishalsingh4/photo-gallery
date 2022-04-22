import { API_ERROR } from "../constants/appConstants";

const isApiSuccess = (res: any) => res?.status === 200;

const getErrMsg = (err: any) =>
  err?.response?.data?.errorMsg || API_ERROR.DEFAULT_MSG;

export { isApiSuccess, getErrMsg };
