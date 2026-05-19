import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const AllItems = ({ data }) => {
  return (
    <View>
      <View style={styles.rowTitle}>
        <Text style={styles.txt}>Items Names</Text>
        <Text style={styles.txt}>Items Quantity</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemContainer,
              { backgroundColor: item.stock < 10 ? "#ffcccc" : "#ccffcc" },
            ]}
          >
            <Text>{item.name}</Text>
            <Text>{item.stock}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  rowTitle: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  txt: {
    fontSize: 16,
    fontWeight: "semibold",
  },
  itemContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0.1,
    elevation: 1,
  },
});
