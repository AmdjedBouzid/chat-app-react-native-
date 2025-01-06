import React, { useEffect, useState } from "react";
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
import { statesContainer } from "../context/GlobalState";
// import {getToken} from "../utils/functions";
import { useIsFocused } from "@react-navigation/native";
import {
  fetchAllUsers,
  getToken,
  fetchFriends,
  fetchUser,
} from "../utils/functions";
import axios from "axios";
import DOMAIN from "../utils/constants";
import { useNavigation } from "@react-navigation/native";

const UsersPage = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { users, friends, user, setFriends, setUsers, chats, setChats } =
    statesContainer();
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    // const handlingGetAllRequests = async () => {
    //   try {
    //     const token = await getToken();
    //     console.log("Token____", token);
    //     const response = await axios.get(`${DOMAIN}}/api/notifications/all`, {
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     });
    //     console.log("es_______", response.data);
    //     setAllRequests(response.data);
    //   } catch (error) {
    //     console.error(
    //       "Error fetching all requests:",
    //       error.response?.data || error.message
    //     );
    //   }
    // };

    // handlingGetAllRequests();
    const fetchData = async () => {
      const USERS = await fetchAllUsers();
      setUsers(USERS);
      const FRIENDS = await fetchFriends();
      setFriends(FRIENDS);
    };
    fetchData();
  }, [isFocused]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredUsers = users.filter((U) => {
    const matchesSearchQuery =
      (U.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        U.last_name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      U.id != user.id;
    if (selectedFilter === "All") {
      return matchesSearchQuery;
    } else if (selectedFilter === "Friends") {
      return matchesSearchQuery && friends.some((f) => f.id === U.id);
    } else if (selectedFilter === "Not Friends") {
      return matchesSearchQuery && !friends.some((f) => f.id === U.id);
    }

    return false;
  });
  const handelAddUser = async (id) => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `${DOMAIN}/api/users/addfriend/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log("User added successfully:", response.data);
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );
    }
  };

  const createChat = async (friendsId) => {
    try {
      for (ch of chats) {
        if (ch.participants[0].userId === friendsId) {
          navigation.navigate("ChatDetails", { id: ch.chatId });
          return;
        }
      }
      const token = await getToken();
      const response = await axios.post(
        `${DOMAIN}/api/chats`, // Adjust the endpoint as necessary
        { friendId: friendsId }, // Assuming you need to send the friend's ID in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setChats((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error(
        "Error creating chat:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.image }} style={styles.avatar} />

      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {item.first_name} {item.last_name}
        </Text>
      </View>

      <View style={styles.actions}>
        {friends.some((f) => f.id === item.id) ? (
          <>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => createChat(item.id)}
            >
              <Icon name="comment" size={16} color="#fff" />
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Icon name="trash" size={16} color="#fff" />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handelAddUser(item.id)}
          >
            <Icon name="user-plus" size={16} color="#fff" />
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <View style={styles.filterBar}>
        {["All", "Friends", "Not Friends"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilter,
            ]}
            onPress={() => setSelectedFilter(filter)}
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

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
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
    elevation: 2,
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
