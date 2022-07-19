import { makeAutoObservable, runInAction } from "mobx";
import usersStore from "./usersStore";
import { instance } from "../instance";
import { useSyncExternalStore } from "react";

class EntriesStore {
  constructor() {
    makeAutoObservable(this);
  }
  entries = [];
  userEntries = [];
  filteredUserEntries = [];
  pics = [];

  fetchEntries = async () => {
    try {
      const response = await instance.get("/journal/");
      runInAction(() => {
        this.entries = response.data;
      });
    } catch (error) {
      console.error("fetching error", error);
    }
  };

  fetchUserEntries = async () => {
    try {
      const userId = usersStore.user._id;
      const response = await instance.get(`/journal/${userId}`);

      runInAction(() => {
        this.userEntries = response.data;
        this.filteredUserEntries = response.data;
      });
    } catch (error) {
      console.error("fetching error", error);
    }
  };

  filterUserEntries = (query, value) => {
    console.log(query);
    if (value !== "all") {
      this.filteredUserEntries = this.userEntries.filter((entry) => {
        return (
          entry.title.toLowerCase().includes(query.toLowerCase()) &&
          entry.activityType === value
        );
      });
    } else {
      this.filteredUserEntries = this.userEntries.filter((entry) => {
        return entry.title.toLowerCase().includes(query.toLowerCase());
      });
    }
  };

  addEntry = async (newEntry) => {
    try {
      newEntry.attachments = this.pics;
      newEntry.user = usersStore.user._id;

      const response = await instance.post("/journal/", newEntry);
      this.fetchUserEntries();
      console.log("back from the shop");
      this.pics = [];

      // runInAction(() => {
      //   this.entries.push(response.data);
      //   this.userEntries.push(response.data);
      // });
      return true;
    } catch (error) {
      console.error("can't add entry", error);
      return false;
    }
  };

  updateEntry = async (updatedEntry) => {
    try {
      await instance.put(`/journal/${updatedEntry._id}`, updatedEntry);
      runInAction(() => {
        const index = this.entries.find(
          (entry) => entry._id == updatedEntry._id
        );
        this.entries[index] = updatedEntry;
      });
    } catch (error) {
      console.error("updating error", error);
    }
  };

  fav = async (id, isFav) => {
    try {
      const go = { isFav: !isFav };

      await instance.put(`/journal/fav/${id}`, go);
      this.entries.find((anentry) => id == anentry._id).isFav = isFav;
    } catch (error) {
      console.error("updating error", error);
    }
  };

  deleteEntry = async (entryId) => {
    try {
      await instance.delete(`/journal/${entryId}`);
      this.entries = this.entries.filter((entry) => entry._id != entryId);
    } catch (error) {
      console.error("deleting error", error);
    }
  };

  pics = (entryPics) => {
    this.pics = entryPics;
  };
}

const entriesStore = new EntriesStore();
if (usersStore.user) entriesStore.fetchUserEntries();
entriesStore.fetchEntries();
export default entriesStore;
