import axios from "axios";

export function fetchValue(url: string, callBack: Function) {
  axios
    .get(url)
    .then((response) => callBack(response.data))
    .catch((response) => onError(response))
    .finally(() => console.log("Finally done"));
}

function onError(response: any) {
  console.log(response);
}
