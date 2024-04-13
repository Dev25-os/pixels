import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helper/common";
import Categories from "@/components/Categories";
import { apiCall } from "@/api";
import ImageGridView from "@/components/ImageGridView";
import FiltersModal from "@/components/FiltersModal";

let page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState<string>("");
  const searchInputRef = useRef(null);
  const [images, setImages] = useState<any>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filterModalRef = useRef(null);
  const paddingTop = top > 0 ? top + 10 : 30;

  const openModal = () => {
    filterModalRef?.current?.present();
  };
  const closeModal = () => {
    filterModalRef?.current?.close();
  };

  const clearText = () => {
    setSearch("");
    page = 1;
    setImages([]);
    fetchImages({ page });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setActiveCategory("");
    setTimeout(() => {
      if (value.length > 2) {
        page = 1;
        setImages([]);
        fetchImages({ page, q: value });
      }
      if (value == "") {
        page = 1;
        setImages([]);
        fetchImages({ page });
      }
    }, 400);
  };

  const handleActiveCategory = (category: string | null) => {
    setActiveCategory(category);
    console.log("active", activeCategory);
    setImages([]);
    setSearch("");
    page = 1;
    let params = {
      page,
    };
    if (category) params.category = category;
    fetchImages(params, false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = false) => {
    let res = await apiCall(params);
    if (append) {
      setImages([...images, ...res.hits]);
    } else {
      setImages([...res.hits]);
    }
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* heading */}
      <View style={styles.heading}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable onPress={openModal}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      {/* scrollbar  */}
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* Search bar */}
        <View style={styles.search}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={22}
              color={theme.colors.neutral(0.7)}
            />
            <TextInput
              onChangeText={(value) => handleSearch(value)}
              value={search}
              ref={searchInputRef}
              placeholder="Search..."
              style={styles.searchInput}
            />
          </View>

          {search && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={clearText}
              style={styles.close}
            >
              <Ionicons
                name="close"
                size={22}
                color={theme.colors.neutral(0.7)}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* categories */}
        <Categories
          activeCategory={activeCategory}
          handleActiveCategory={handleActiveCategory}
        />

        {/* imageGridView */}
        {images?.length > 0 && <ImageGridView images={images} />}
      </ScrollView>

      {/* FiltersModal */}
      <FiltersModal filterModalRef={filterModalRef} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  heading: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: hp(4),
    fontWeight: "700",
    color: theme.colors.neutral(0.8),
  },
  search: {
    margin: wp(5),
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    flexDirection: "row",
  },
  searchInput: {
    paddingLeft: 5,
    fontSize: hp(2.3),
    flex: 1,
    position: "relative",
  },
  close: {
    backgroundColor: theme.colors.grayBG,
    padding: 3,
    borderRadius: theme.radius.xl,
    position: "absolute",
    right: 10,
  },
});
