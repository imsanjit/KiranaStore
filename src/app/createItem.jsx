import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const CreateItems = ({ data, setData }) => {
  const [itemName, setitemName] = useState("");
  const [itemStock, setitemStock] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const addItemHandler = () => {
    if (itemName.trim() === "") return alert("Please enter item name");
    if (itemStock === "") return alert("Please enter stock number");

    if (isEdit) {
      setData(data.map((item) =>
        item.id === editId
          ? { ...item, name: itemName, stock: parseInt(itemStock) || 0 }
          : item
      ));
      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),
        name: itemName,
        stock: parseInt(itemStock) || 0,
      };
      setData([...data, newItem]);
    }
    setitemName("");
    setitemStock("");
    setIsEdit(false);
  };

  const deleteHandler = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const editHandler = (item) => {
    setIsEdit(true);
    setEditId(item.id);
    setitemName(item.name);
    setitemStock(item.stock.toString());
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Item Name"
        value={itemName}
        style={styles.input}
        onChangeText={(text) => setitemName(text)}
      />
      <TextInput
        placeholder="Stock Number"
        value={itemStock}
        style={styles.input}
        onChangeText={(text) => setitemStock(text)}
        keyboardType="number-pad"
      />
      <Pressable style={styles.button} onPress={() => addItemHandler()}>
        <Text style={styles.btnText}>
          {isEdit ? "Update Item" : "Add Item"}
        </Text>
      </Pressable>
      <View style={{ marginTop: 30 }}>
        <View style={styles.rowTitle}>
          <Text style={styles.txt}>All Items List</Text>
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
              <View style={styles.actions}>
                <Pressable onPress={() => editHandler(item)}>
                  <Text>Edit</Text>
                </Pressable>

                <Pressable onPress={() => deleteHandler(item.id)}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CreateItems;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#27c298",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  rowTitle: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
  actions: {
    flexDirection: "row",
    gap: 15,
  },
});
