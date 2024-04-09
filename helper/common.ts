import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const wp = (percentage: number) => {
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  return (percentage * height) / 100;
};
