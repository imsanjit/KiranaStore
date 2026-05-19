import React, { useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AllItems from "./allItems";
import CreateItems from "./createItem";
import LowStocks from "./lowStocks";

const HomeScreen = () => {
  const [view, setView] = useState(0);
  const [data, setData] = useState([
    { id: 1, name: "Item 1", stock: 10 },
    { id: 2, name: "Item 2", stock: 5 },
    { id: 3, name: "Item 3", stock: 0 },
    { id: 4, name: "Item 4", stock: 2 },
    { id: 5, name: "Item 5", stock: 15 },
  ]);

  return (
    <SafeAreaView style={styles.contanier}>
      <StatusBar backgroundColor="#08785a" />
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.button, view === 0 && styles.activeButton]}
          onPress={() => setView(0)}
        >
          <Text style={[styles.btnText, view === 0 && styles.activeButtonText]}>
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, view === 1 && styles.activeButton]}
          onPress={() => setView(1)}
        >
          <Text style={[styles.btnText, view === 1 && styles.activeButtonText]}>
            Low Stocks
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, view === 2 && styles.activeButton]}
          onPress={() => setView(2)}
        >
          <Text style={[styles.btnText, view === 2 && styles.activeButtonText]}>
            Create/Modify
          </Text>
        </Pressable>
      </View>

      {view === 0 && <AllItems data={data} />}
      {view === 1 && (
        <LowStocks data={data.filter((item) => item.stock < 10)} />
      )}
      {view === 2 && <CreateItems data={data} setData={setData} />}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    paddingTop: 10,
    padding: "8%",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btnContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderWidth: 1,
    borderColor: "#08785a",
    justifyContent: "center",
    gap: "2%",
    borderRadius: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  btnText: {
    fontSize: 16,
    color: "#08785a",
  },
  activeButton: {
    backgroundColor: "#08785a",
  },
  activeButtonText: {
    color: "#fff",
  },
});
