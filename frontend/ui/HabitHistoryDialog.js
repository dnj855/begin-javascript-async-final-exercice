import { createHabit, getHabits } from "../api/habits-api";

export class HabitHistoryDialog {
  static instance;
  constructor() {
    if (HabitHistoryDialog.instance) {
      throw new Error("Use HabitHistoryDialog.getInstance() instead.");
    }
  }

  static getInstance() {
    if (!HabitHistoryDialog.instance) {
      HabitHistoryDialog.instance = new HabitHistoryDialog();
    }
    return HabitHistoryDialog.instance;
  }

  _open = false;

  init() {
    this.trigger = document.querySelector("#open-history");
    this.dialog = document.querySelector("#habits-history-dialog");
    this.tableWrapper = document.querySelector("#table-wrapper");
    this.trigger.addEventListener("click", () => {
      this.open = true;
    });
  }

  getEarliestDate = (habits) => {
    let earliestDate = null;
    habits.forEach((habit) => {
      Object.keys(habit.daysDone).forEach((date) => {
        if (!earliestDate || new Date(date) < new Date(earliestDate)) {
          earliestDate = date;
        }
      });
    });
    return earliestDate;
  };

  iterateThroughDateRange = (dateRange) => {
    let currentDate = new Date(dateRange.startDate);
    currentDate.setHours(12);

    let endDate = new Date(dateRange.endDate);
    endDate.setHours(12);

    const dates = [];

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  async render() {
    const habits = await getHabits();
    const earliestDate = this.getEarliestDate(habits);
    this.tableWrapper.innerHTML = "";
    const dateRange = {
      startDate: new Date(earliestDate),
      endDate: new Date(),
    };
    const table = document.createElement("table");
    const tableHeaders = document.createElement("tr");
    const tableHeaderHabit = document.createElement("th");
    tableHeaderHabit.textContent = "Habit";
    tableHeaders.appendChild(tableHeaderHabit);
    const dates = this.iterateThroughDateRange(dateRange);
    dates.forEach((date) => {
      let tableHeader = document.createElement("th");
      tableHeader.textContent = date.toISOString().slice(0, 10);
      tableHeaders.appendChild(tableHeader);
    });
    table.appendChild(tableHeaders);
    habits.forEach((habit) => {
      const tableRow = document.createElement("tr");
      const tableDataHabit = document.createElement("td");
      tableDataHabit.textContent = habit.title;
      tableRow.appendChild(tableDataHabit);
      dates.forEach((date) => {
        const tableData = document.createElement("td");
        tableData.textContent = habit.daysDone[date.toISOString().slice(0, 10)]
          ? "✅"
          : "❌";
        tableRow.appendChild(tableData);
      });
      table.appendChild(tableRow);
    });
    this.tableWrapper.appendChild(table);
  }

  get open() {
    return this._open;
  }

  set open(newOpen) {
    this._open = newOpen;
    if (newOpen) {
      this.dialog.setAttribute("open", "");
      this.render();
    } else {
      this.dialog.removeAttribute("open");
    }
  }
}
