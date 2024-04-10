import { Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { categories } from "@/constants/data";
import { hp, wp } from "@/helper/common";
import { theme } from "@/constants/theme";
import Animated, { FadeInRight } from "react-native-reanimated";

type PropsType = {
  activeCategory: string | null;
  handleActiveCategory: (category: string | null) => void;
};

const Categories = ({ activeCategory, handleActiveCategory }: PropsType) => {
  const handleCategorySelect = (item: string, index: number) => {
    handleActiveCategory(item === activeCategory ? null : item);
  };
  const bgBtnColor = activeCategory;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp(4), gap: 8 }}
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInRight.delay(index * 200)
              .duration(1000)
              .springify()
              .damping(14)}
          >
            <Pressable
              style={[
                styles.item,
                {
                  backgroundColor:
                    activeCategory == item ? theme.colors.neutral(0.7) : "#fff",
                },
              ]}
              onPress={() => handleCategorySelect(item, index)}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      activeCategory === item
                        ? theme.colors.white
                        : theme.colors.neutral(0.8),
                  },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          </Animated.View>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: hp(2),
    color: theme.colors.neutral(0.8),
    fontWeight: "500",
  },
});
