import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";

import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const FiltersModal = ({ filterModalRef }: any) => {
  const snapPoints = useMemo(() => ["75%"], []);
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
        <Text>Awesome 🎉</Text>
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
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
