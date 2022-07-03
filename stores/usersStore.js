import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "../instance";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;

  setUser = async (userToken) => {
    await AsyncStorage.setItem("token", JSON.stringify(userToken));
    instance.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    this.user = jwt_decode(userToken);
  };

  checkForToken = async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken) {
      const newUser = jwt_decode(userToken);
      if (newUser.exp > Date.now()) this.setUser(userToken);
      else this.signout();
    }
  };

  signup = async (userData) => {
    try {
      const response = await instance.post("/signup", userData);
      this.setUser(response.data.token);
    } catch (error) {
      alert("This username is already taken. Please choose another username");
      console.error(error);
    }
  };

  signin = async (userData) => {
    try {
      const res = await instance.post("/signin", userData);
      this.setUser(res.data.token);
      console.log("logged in!!");
    } catch (error) {
      alert("Incorrect username or password");
      console.error(error);
    }
  };

  signout = async () => {
    try {
      delete instance.defaults.headers.common.Authorization;
      await AsyncStorage.removeItem("token");
      this.user = null;
    } catch (error) {
      console.error(error);
    }
  };

  updateUser = async (arrayOfPics) => {
    try {
      //const response = await instance.put("/updateUser", arrayOfURI);
      const formData = new FormData();
      for (const key in arrayOfPics) formData.append(key, arrayOfPics[key]);
      const res = await instance.put("/updateUser", formData);
    } catch (error) {
      console.error(error);
    }
  };
}

const userStore = new UserStore();
userStore.checkForToken();
export default userStore;
