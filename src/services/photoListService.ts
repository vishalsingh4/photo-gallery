import axios from "axios";
import { isApiSuccess } from "../utils/serviceUtils";
import {BASE_URI} from "../constants/routes";

export const fetchPhotoList = (): Promise<any> => {
  const url: string = `${BASE_URI}/photos`;

  return axios
    .get(url)
    .then((res) => ({
      res,
    }))
    .catch((err) => ({
      err,
    }));
};
