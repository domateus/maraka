import axios from "axios";

type CipherProps = {
  strategy: string;
  job: "encrypt" | "decrypt";
  payload: string;
};

const apiUrl = process.env.ENV_API_URL;

export const cipher = ({ strategy, job, payload }: CipherProps) => {
  axios.post(apiUrl + "/cipher", { strategy, job, payload });
};
