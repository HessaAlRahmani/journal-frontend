import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "../instance";
import userStore from "./usersStore";

class NotificationsStore {
  constructor() {
    makeAutoObservable(this);
  }

  notifications = [];


  fetchNotifications = async () => {
    try {
      const response = await instance.get("/notifications");
      this.notifications = response.data;
    } catch (error) {
      console.error("fetching notifications error", error);
    }
  };

  pending=async(userId,friendId)=>{
    try{
      const response=await instance.put(`/notifications/pendingSentFrom/${userId}/to/${friendId}`);
      userStore.users.find((user)=>user._id==userId).notifications.push(friendId);
    }
    catch(error){ console.error(error);}
  }


  acceptFriend = async (friendId,userId) => {
    try {
      const response = await instance.put(
        `notifications/acceptFriendSentfrom/${userId}/to/${friendId}`
      );
      this.rejectFriend(userId,friendId);
      
      runInAction(() => {
     userStore.fetchUsers();
     userStore.user.friends=userStore.users.find((user)=>user._id==userId).friends;
     userStore.users.find((friend)=>friend._id==friendId).friends.push(userId);
      });

    } catch (error) {
      console.error(error);
    }
  };

  newNotification = async (newNotification) => {
    try {
      

      const response = await instance.post("/notifications/newNotification/", newNotification);

      runInAction(() => {
        this.notifications.push(response.data);
      });
    } catch (error) {
      console.error("can't add notification", error);
    }
  };

  deleteNotification = async (notificationId) => {
    try {
      

      const response = await instance.delete(`/notifications/deleteNotification/${notificationId}`);

      runInAction(() => {
        this.notifications=this.notifications.filter((notification)=>notification._id !=notificationId);
      });
    } catch (error) {
      console.error("can't delete notification", error);
    }
  };
  rejectFriend=async(userId,friendId)=>{
    let rejectedUser=userStore.users.find((user)=>user._id==friendId).notifications.filter((id)=>id!=userId);

    console.log("rejeccccttttt     ",rejectedUser);
    let updatedUser={notifications:rejectedUser};
    try{
        const response=await instance.put(`notifications/rejectFriend/${friendId}`,updatedUser);
        userStore.users.find((user)=>user._id==friendId).notifications.filter((id)=>id!=userId);
      }
    catch(error){console.error("can't reject friend", error);}
  
  }
  openNotification=async(notificationId)=>{
    try{
    let  updatedNotification={open:true};
    const response=await instance.put(`notifications/openNotification/${notificationId}`,updatedNotification);
    notificationsStore.notifications.find((notification)=>notification._id==notificationId).open=true;

    }
    catch(error){console.error("can't update notification", error);}

  }

}

const notificationsStore = new NotificationsStore();
notificationsStore.fetchNotifications();

export default notificationsStore;
