import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const UsersPage = () => {
  const [users] = useState([
    { id: "1", name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg", isFriend: true },
    { id: "2", name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg", isFriend: false },
    { id: "3", name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/3.jpg", isFriend: true },
    { id: "4", name: "Bob Brown", avatar: "https://randomuser.me/api/portraits/men/4.jpg", isFriend: false },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      {/* Avatar */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {item.isFriend ? (
          <>
            <TouchableOpacity style={styles.chatButton}>
              <Icon name="comment" size={16} color="#fff" />
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Icon name="trash" size={16} color="#fff" />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.addButton}>
            <Icon name="user-plus" size={16} color="#fff" />
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        {["All", "Friends", "Not Friends"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilter,
            ]}
            onPress={() => setSelectedFilter(filter)} // Mock behavior
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* User List */}
      <FlatList
        data={users} // Replace with filtered data in functionality
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  listContainer: {
    padding: 10,
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    margin: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  selectedFilter: {
    backgroundColor: "#007BFF",
  },
  filterText: {
    fontSize: 16,
    color: "#333",
  },
  selectedFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, // For shadow effect
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF5A5A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#28A745",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
  },
});

export default UsersPage;
