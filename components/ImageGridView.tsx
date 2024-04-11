import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { getColumns, getImageSize, wp } from "@/helper/common";
import { theme } from "@/constants/theme";

const ImageGridView = ({ images }: any) => {
  const column = getColumns();
  const getImageHeight = (item: any) => {
    const { imageHeight, imageWidth } = item;

    return { height: getImageSize(imageHeight, imageWidth) };
  };

  const isLastInRow = (index: number) => {
    return (index + 1) % column === 0;
  };
  return (
    <View style={{ minHeight: 3, width: wp(100) }}>
      <MasonryFlashList
        data={images}
        numColumns={column}
        // initialNumToRender={1000}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <Pressable
            style={[styles.imageWrapper, !isLastInRow(index) && styles.spacing]}
          >
            {/* <Image style={styles.images} source={{ uri: item?.webformatURL }} /> */}

            <Image
              style={[styles.images, getImageHeight(item)]}
              source={item?.webformatURL}
              transition={1000}
            />
          </Pressable>
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ImageGridView;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp(4),
  },
  images: {
    height: 200,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(4),
  },
  spacing: {
    marginRight: wp(2),
  },
});
