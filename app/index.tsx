import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "@/helper/common";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/welcome.png")}
        resizeMode="cover"
        style={styles.imageBg}
      />

      {/* linear gradient */}
      <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        {/* text content */}
        <View style={styles.textContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}
          >
            Pixels
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            style={styles.des}
          >
            Every Pixel Tells a Story
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable
              onPress={() => router.push("home")}
              style={styles.startBtn}
            >
              <Text style={styles.btnText}>Start Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradient: {
    height: hp(75),
    width: wp(100),
    position: "absolute",
    bottom: 0,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: hp(6),
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  des: {
    fontSize: hp(2),
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 20,
    // fontWeight: theme.fontWeights.medium,
  },
  startBtn: {
    backgroundColor: theme.colors.neutral(0.8),
    padding: 15,
    paddingHorizontal: 90,
    marginBottom: 50,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  btnText: {
    color: theme.colors.white,
    fontSize: hp(2),
    letterSpacing: 1,
    fontWeight: "700",
    // fontWeight: theme.fontWeights.medium,
  },
});

export default WelcomeScreen;
