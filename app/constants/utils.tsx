import axios from "axios";

export const fetchValue = (url: string, callBack: Function) =>{
  axios
    .get(url)
    .then((response) => callBack(response.data))
    .catch((response) => onError(response))
    .finally(() => console.log("Finally done"));
}

export const postValue = (url: string, data: any, callback?: Function) => {
  axios
    .post(url, data)
    .then((response) => {
      callback?.(response.data);
    })
    .catch((response) => onError(response))
    .finally(() => console.log("Finally done"));
}

export const deleteValue = (url: string, callback?: Function) => {
  axios
    .delete(url)
    .then((response) => {
      callback?.(response.data);
    })
    .catch((response) => onError(response))
    .finally(() => console.log("Finally done"));
}

const onError = (response: any) => {
  console.log(response);
  // alert('OH NO!')
}
