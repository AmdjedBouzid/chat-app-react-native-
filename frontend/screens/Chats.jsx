import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const friends = [
  {
    id: "1",
    name: "John Doe",
    status: "Online",
    avatar:
      "https://t4.ftcdn.net/jpg/06/08/55/73/360_F_608557356_ELcD2pwQO9pduTRL30umabzgJoQn5fnd.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    status: "Offline",
    avatar:
      "https://cdn.create.vista.com/api/media/small/278886198/stock-photo-close-up-portrait-of-african-american-guy-talking-by-phone",
  },
  {
    id: "3",
    name: "Alice Brown",
    status: "Online",
    avatar:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  },
  {
    id: "4",
    name: "Alice Brown",
    status: "Online",
    avatar:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  },
  {
    id: "5",
    name: "Alice Brown",
    status: "Online",
    avatar:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  },
  {
    id: "6",
    name: "Alice Brown",
    status: "Online",
    avatar:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  },
  {
    id: "7",
    name: "Alice Brown",
    status: "Online",
    avatar:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  },
  {
    id: "8",
    name: "Alice Brown",
    status: "Online",
    avatar:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  },
  {
    id: "9",
    name: "Alice Brown",
    status: "Online",
    avatar:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  },
];

const ChatsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFriendItem = ({ item }) => (
    <TouchableOpacity
      style={styles.friendCard}
      onPress={() => navigation.navigate("ChatDetails", { id: item.id })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
  // ChatDetailsScreen
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={renderFriendItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 20,
  },
  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 14,
    color: "#666",
  },
});

export default ChatsScreen;
