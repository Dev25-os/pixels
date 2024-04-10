import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { wp } from "@/helper/common";

const ImageGridView = ({ images }: any) => {
  return (
    <View style={{ minHeight: 3, width: wp(100) }}>
      {/* <MasonryFlashList
        data={images}
        numColumns={2}
        renderItem={({ item }) => <Text>{item} </Text>}
        estimatedItemSize={200}
      />
    </View> */}
  );
};

export default ImageGridView;

const styles = StyleSheet.create({});
