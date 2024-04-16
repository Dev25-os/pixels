import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";

import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { filterData } from "@/constants/data";
import { hp } from "@/helper/common";
import { theme } from "@/constants/theme";


const FiltersModal = ({
  filterModalRef,
  setFilterOptions,
  handleApply,
  handleReset,
  filterOptions,
}: any) => {
  const snapPoints = useMemo(() => ["75%"], []);

  const handleOrder = (ele: string) => {
    setFilterOptions((prev: any) => {
      return { ...prev, order: ele };
    });
    console.log("filterOptions", filterOptions);
  };

  const handleOrientation = (ele: string) => {
    console.log("e;e", ele);
    setFilterOptions((prev: any) => {
      return { ...prev, orientation: ele };
    });
  };

  const handleType = (ele: string) => {
    console.log("e;e", ele);
    setFilterOptions((prev: any) => {
      return { ...prev, image_type: ele };
    });
  };
  const handleColor = (ele: string) => {
    console.log("e;e", ele);
    setFilterOptions((prev: any) => {
      return { ...prev, colors: ele };
    });
  };

  return (
    <BottomSheetModal
      ref={filterModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={customBackground}
      //   onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* <Filters /> */}
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: hp(4) }}>Filters</Text>
          <View style={{ marginVertical: 5 }}>
            {/* render filter category with items */}

            {/* order */}
            <View>
              <Text style={styles.filterCatTitle}>Order</Text>
              <View style={styles.filterCatContainer}>
                {filterData.orders.map((order, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleOrder(order)}
                    style={[
                      styles.filterCatItem,
                      order === filterOptions.order &&
                        styles.selectedFilterCatItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterCatText,
                        order === filterOptions.order &&
                          styles.selectedFilterCatText,
                      ]}
                    >
                      {order}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            {/* orientation */}
            <View>
              <Text style={styles.filterCatTitle}>Orientations</Text>
              <View style={styles.filterCatContainer}>
                {filterData.orientations.map((orientation, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleOrientation(orientation)}
                    style={[
                      styles.filterCatItem,
                      orientation === filterOptions.orientation &&
                        styles.selectedFilterCatItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterCatText,
                        orientation === filterOptions.orientation &&
                          styles.selectedFilterCatText,
                      ]}
                    >
                      {orientation}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            {/* type */}
            <View>
              <Text style={styles.filterCatTitle}>Type</Text>
              <View style={styles.filterCatContainer}>
                {filterData.type.map((type, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleType(type)}
                    style={[
                      styles.filterCatItem,
                      type === filterOptions.image_type &&
                        styles.selectedFilterCatItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterCatText,
                        type === filterOptions.image_type &&
                          styles.selectedFilterCatText,
                      ]}
                    >
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            {/* colors */}
            <View>
              <Text style={styles.filterCatTitle}>Colors</Text>
              <View style={styles.filterCatContainer}>
                {filterData.color.map((color, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleColor(color)}
                    style={[
                      styles.filterCatItem,
                      color === filterOptions.colors &&
                        styles.selectedFilterCatItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterCatText,
                        color === filterOptions.colors &&
                          styles.selectedFilterCatText,
                      ]}
                    >
                      {color}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* action buttons */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 15,
              marginTop: 30,
            }}
          >
            <Pressable
              onPress={() => handleReset()}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: theme.colors.black,
                alignItems: "center",
                padding: 15,
                borderRadius: 7,
              }}
            >
              <Text>Reset</Text>
            </Pressable>
            <Pressable
              onPress={handleApply}
              style={{
                flex: 1,
                backgroundColor: theme.colors.neutral(0.9),
                alignItems: "center",
                padding: 15,
                borderRadius: 7,
              }}
            >
              <Text style={{ color: "white" }}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const customBackground = ({ animatedIndex, style }: any) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity: any = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={50} />
    </Animated.View>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    // alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  itemStyle: {
    borderWidth: 1,
    borderColor: "#111111",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  filterCatTitle: {
    fontSize: hp(3),
  },
  filterCatContainer: {
    marginVertical: 10,
    gap: 25,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterCatItem: {
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    borderRadius: 5,
  },
  selectedFilterCatText: {
    color: "white", // Text color for selected chip
  },
  selectedFilterCatItem: {
    backgroundColor: "black", // Background color for selected chip
  },
  filterCatText: {
    color: "black", // Text color for all chips
  },
});
