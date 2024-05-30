import { addHabit } from "../api/habits-api";
import { closeModal, openModal } from "./Modals";

export class Buttons {
  constructor(todayHabits) {
    this.todayHabits = todayHabits;
  }

  init() {
    this.addHabitButton = document.querySelector("#add-new-habit");
    this.habitModal = document.querySelector("#add-habit-modal");
    this.addHabitButton.addEventListener("click", () => {
      openModal(this.habitModal);
    });
    this.addHabitForm = this.habitModal.querySelector("form");
    this.addHabitForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = new FormData(this.addHabitForm).get("title");
      await addHabit(title);
      closeModal(this.habitModal);
      this.todayHabits.refresh();
    });
  }
}
