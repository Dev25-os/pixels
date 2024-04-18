import {
  StyleSheet,
  Text,
  Platform,
  View,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { hp, wp } from "@/helper/common";
import { Entypo, Octicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";

const ImageOverlay = () => {
  let [status, setStatus] = useState("loading");
  let data = useLocalSearchParams();
  console.log("Image Overlay", data);
  const router = useRouter();

  const fileName = data?.previewURL?.split("/").pop();
  const imageUrl = data?.webformatURL;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  const getSize = () => {
    const aspectRatio = data?.imageWidth / data?.imageHeight;

    const maxWidth = Platform.OS == "web" ? wp(50) : wp(92);
    let calculateHeight = maxWidth / aspectRatio;
    let calculateWidth = maxWidth;
    if (aspectRatio < 1) {
      calculateWidth = calculateHeight * aspectRatio;
    }

    return {
      width: calculateWidth,
      height: calculateHeight,
    };
  };

  const onImageLoad = () => {
    setStatus("");
  };

  const handleDownloadImage = async () => {
    setStatus("downloading");
    let uri = await downloadFile();
    if (uri) {
      console.log("Image downloaded", uri);

      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            headers["Content-Type"]
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              });
            })
            .catch((e) => console.log(e));
        }
      }
    }
  };
  const handleFileShare = async () => {
    setStatus("sharing");
    let uri = await downloadFile();
    if (uri) {
      await Sharing.shareAsync(uri);
    }
  };
  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      setStatus("");
      showToast("Image Downloaded Successfully");
      return uri;
    } catch (error) {
      console.log("Error downloading file", error.message);
      setStatus("");
      Alert.alert("Image", error.message);
      return null;
    }
  };
  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };
  const customToast = {
    success: ({ text1, props, ...rest }) => (
      <View style={styles.toast}>
        <Text style={styles.toastTitle}>{text1}</Text>
      </View>
    ),
  };
  return (
    <BlurView tint="dark" intensity={60} style={[styles.container]}>
      <View style={getSize()}>
        <View style={styles.loading}>
          {status == "loading" && (
            <ActivityIndicator size="large" color={"white"} />
          )}
        </View>
        <Image
          style={[styles.image, getSize()]}
          source={data?.webformatURL}
          transition={100}
          onLoad={onImageLoad}
        />
      </View>
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Octicons name="x" size={24} color={"white"} />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status === "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator size={"small"} color={"white"} />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleDownloadImage}>
              <Octicons name="download" size={24} color={"white"} />
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status === "sharing" ? (
            <View style={styles.button}>
              <ActivityIndicator size={"small"} color={"white"} />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleFileShare}>
              <Entypo name="share" size={22} color={"white"} />
            </Pressable>
          )}
        </Animated.View>
      </View>
      <Toast config={customToast} />
    </BlurView>
  );
};

export default ImageOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  image: {
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255,0.2)",
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255,0.2)",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 15,
  },
  button: {
    width: wp(15),
    // height: hp(7),
    padding: 7,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  toastTitle: {
    fontSize: hp(1.8),
    fontWeight: "700",
    color: "white",
  },
});
