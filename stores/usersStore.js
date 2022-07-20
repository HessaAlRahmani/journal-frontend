import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "../instance";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;
  users = [];
  token = "";

  fetchUsers = async () => {
    try {
      const response = await instance.get("/users");
      this.users = response.data;
    } catch (error) {
      console.error("fetching error", error);
    }
  };

  setUser = async (userToken) => {
    try {
      await AsyncStorage.setItem("token", JSON.stringify(userToken));
      this.token = userToken;
      instance.defaults.headers.common.Authorization = `Bearer ${userToken}`;
      runInAction(() => {
        this.user = jwt_decode(userToken);
      });
    } catch (error) {
      console.error(error);
    }
  };

  checkForToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");
      if (userToken) {
        const newUser = jwt_decode(JSON.parse(userToken));
        if (newUser.exp > Date.now()) this.setUser(userToken);
        else this.signout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  signup = async (userData) => {
    try {
      const response = await instance.post("/signup", userData);
      await this.setUser(response.data.token);
    } catch (error) {
      alert("This username is already taken. Please choose another username");
      console.error(error);
    }
  };

  signin = async (userData) => {
    try {
      const res = await instance.post("/signin", userData);
      await this.setUser(res.data.token);
    } catch (error) {
      alert("Incorrect username or password");
      console.error(error);
    }
  };

  signout = async () => {
    try {
      delete instance.defaults.headers.common.Authorization;
      await AsyncStorage.removeItem("token");
      runInAction(() => {
        this.user = null;
      });
    } catch (error) {
      console.error(error);
    }
  };

  updateUser = async (updatedUser) => {
    try {
      const res = await instance.put(
        `/updateUser/${updatedUser._id}`,
        updatedUser
      );
      this.user = res.data;
      console.log(this.user);
    } catch (error) {
      console.error(error);
    }
  };

  getUserById(id) {
    return this.users.find((user) => user._id === id);
  }
  filteredUsers = [];
  searchFriend = (query) => {
    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
  };

  acceptFriend = (userId) => {
    this.user = this.users.find((user) => user._id == userId);
  };

  handleRemove = async (exfriend) => {
    try {
      console.log("friend",this.user.friends[0]);
      const usersfriends = { friends: [] };
      usersfriends.friends = this.user.friends.filter(
        (myfriend) => myfriend != exfriend._id
      );
      
console.log("friendsss   ",usersfriends.friends);
    

      const friendsfriends = { friends: [] };
      friendsfriends.friends = exfriend.friends.filter(
        (myfriend) => myfriend != this.user._id
      );

      const res1 = await instance.put(
        `/updateUser/${this.user._id}`,
        usersfriends
      );
      const res2 = await instance.put(
        `/updateUser/${exfriend._id}`,
        friendsfriends
      );
      runInAction(() => {
        this.users.find((user)=>user._id==this.user._id).friends = usersfriends.friends;
        this.users.find((user)=> exfriend._id==user._id).friends = friendsfriends.friends;
        console.log("hessa  friendsss",this.users.find((user)=>user._id==this.user._id).friends);
        console.log("nora  friendsss", this.users.find((user)=> exfriend._id==user._id).friends);
        this.fetchUsers();

        console.log(this.user.friends);
      });
  
    } catch (error) {
      console.error(error);
    }
  };
}

const userStore = new UserStore();
userStore.checkForToken();
userStore.fetchUsers();

export default userStore;
