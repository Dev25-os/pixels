import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp } from "@/helper/common";
import { theme } from "@/constants/theme";
import { filterData } from "@/constants/data";

const Filters = () => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: hp(4) }}>Filters</Text>
      <View style={{ marginVertical: 5 }}>
        {/* render filter category with items */}

        {/* order */}
        <View>
          <Text style={styles.filterCatTitle}>Order</Text>
          <View style={styles.filterCatContainer}>
            {filterData.orders.map((order, index) => (
              <Text style={styles.filterCatItem}>{order}</Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
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
  },
  filterCatItem: {
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    borderRadius: 5,
  },
});
