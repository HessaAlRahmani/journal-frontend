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


  acceptFriend = async (friendId,userId) => {
    try {
      const response = await instance.put(
        `notifications/acceptFriendSentfrom/${userId}/to/${friendId}`
      );
      
      runInAction(() => {
     userStore.fetchUsers();
     userStore.acceptFriend(userId);
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

}

const notificationsStore = new NotificationsStore();
notificationsStore.fetchNotifications();

export default notificationsStore;
