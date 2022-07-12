import { makeAutoObservable, runInAction } from "mobx";
import usersStore from "./usersStore";
import { instance } from "../instance";

class EntriesStore {
  constructor() {
    makeAutoObservable(this);
  }
  entries = [];
  //filtered entries (based on user)
  //function to fitler the entries

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

  addEntry = async (newEntry) => {
    try {
      newEntry.user = usersStore.user._id;
      console.log(newEntry);

      const response = await instance.post("/journal/", newEntry);

      runInAction(() => {
        this.entries.push(response.data);
      });
    } catch (error) {
      console.error("can't add entry", error);
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
      console.log(isFav);
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
}

const entriesStore = new EntriesStore();
entriesStore.fetchEntries();
export default entriesStore;
