import axios from "axios";

const API_KEY = "43317255-825495eb792c801416843462e";
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params: any) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;
  let paramsKeys = Object.keys(params);
  paramsKeys.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });

  return url;
};

export const apiCall = async (params: any) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;
    // console.log("data", data);

    return data;
  } catch (error) {
    console.log("error", error);
  }
};
