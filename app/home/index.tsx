import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
import { useRouter } from "expo-router";

let page = 1;

const HomeScreen = () => {
  const router = useRouter();

  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState<string>("");
  const searchInputRef = useRef(null);
  const [images, setImages] = useState<any>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<null | object>({});
  const [isEndReached, setIsEndReached] = useState<boolean>(false);

  const filterModalRef = useRef(null);
  const scrollRef = useRef(null);

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
        fetchImages({ page, q: value, ...filterOptions }, false);
      }
      if (value == "") {
        page = 1;
        setImages([]);
        fetchImages({ page, ...filterOptions }, false);
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
      ...filterOptions,
    };
    if (category) params.category = category;
    fetchImages(params, false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = true) => {
    let res = await apiCall(params);
    if (append) {
      setImages([...images, ...res.hits]);
    } else {
      setImages([...res.hits]);
    }
  };

  const handleApply = () => {
    console.log("filterOptions", { ...filterOptions });
    if (filterOptions) {
      page = 1;
      setImages([]);
      let params = {
        page,
        ...filterOptions,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }
    closeModal();
  };
  const handleReset = () => {
    setFilterOptions({});
    page = 1;
    setImages([]);
    let params = {
      page,
    };
    fetchImages(params, false);

    closeModal();
  };

  const handleFilterOption = (key: any) => {
    let tempFilter = { ...filterOptions };
    delete tempFilter[key];
    setFilterOptions({ ...tempFilter });
    page = 1;
    setImages([]);
    let params = {
      page,
      ...tempFilter,
    };
    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search;
    fetchImages(params, false);
  };

  const handleHomeClick = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleScroll = (e: any) => {
    const contentHeight = e.nativeEvent.contentSize.height;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const scrollOffset = e.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        console.log("reached bottom position");
        // fetch more images
        ++page;
        let params = {
          page,
          ...filterOptions,
        };
        if (activeCategory) params.category = activeCategory;
        if (search) params.q = search;
        fetchImages(params, true);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* heading */}
      <View style={styles.heading}>
        <Pressable onPress={handleHomeClick}>
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
      <ScrollView
        contentContainerStyle={{ gap: 15 }}
        onScroll={handleScroll}
        scrollEventThrottle={5}
        ref={scrollRef}
      >
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

        {/* show filters */}
        {filterOptions && (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 25, gap: 15 }}
          >
            {Object.keys(filterOptions)?.map((key: any, index) => (
              <View style={styles.filterIcon} key={index}>
                <Text>{filterOptions[key]} </Text>
                <Pressable onPress={() => handleFilterOption(key)}>
                  <Ionicons
                    name="close"
                    size={14}
                    color={theme.colors.neutral(0.8)}
                  />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}

        {/* imageGridView */}
        {images?.length > 0 && (
          <ImageGridView images={images} router={router} />
        )}

        {/* loading  */}

        <View
          style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}
        >
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>
      {/* FiltersModal */}
      <FiltersModal
        filterModalRef={filterModalRef}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        handleApply={handleApply}
        handleReset={handleReset}
      />
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
  filterIcon: {
    backgroundColor: theme.colors.grayBG,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 10,
  },
});
