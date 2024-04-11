import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const wp = (percentage: number) => {
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  return (percentage * height) / 100;
};

export const getColumns = () => {
  if (width > 1024) {
    return 4;
  } else if (width > 768) {
    return 3;
  } else {
    return 2;
  }
};

export const getImageSize = (height: number, width: number) => {
  if (width > height) {
    return 250;
  } else if (width < height) {
    return 300;
  } else {
    return 200;
  }
};
