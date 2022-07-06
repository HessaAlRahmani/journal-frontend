import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "../instance";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;

  setUser = async (userToken) => {
    await AsyncStorage.setItem("token", JSON.stringify(userToken));
    instance.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    this.user = jwt_decode(userToken);
    console.log("setuser", this.user);
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
      await this.setUser(response.data.token);
    } catch (error) {
      alert("This username is already taken. Please choose another username");
      console.error(error);
    }
  };

  signin = async (userData) => {
    try {
      this.isLoading = true;
      const res = await instance.post("/signin", userData);
      await this.setUser(res.data.token);
      console.log("sign in ", this.user);
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
      // const formData = new FormData();
      // formData.append("profileImage", {
      //   uri: pic,
      //   name: "pfp.png",
      //   type: "image/png",
      // });
      //console.log(formData);
      const res = await instance.put("/updateUser", updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  image = async (imgUri) => {
    const formData = new FormData();
    formData.append("profileImage", {
      uri: Platform.OS === "ios" ? imgUri.replace("file://", "") : imgUri,
      name: new Date() + "pfp",
      type: "image/jpg",
    });

    //console.log(formData);
    try {
      const res = await instance.post("/image", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          //authorization: "JWT insert token here"
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

const userStore = new UserStore();
userStore.checkForToken();
export default userStore;
