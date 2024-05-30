const BASE_URL = "http://127.0.0.1:3000";

export const getTodayHabits = () =>
  fetch(`${BASE_URL}/habits/today`).then((res) => res.json());

export const updateHabitDone = async (id, done) => {
  return fetch(`${BASE_URL}/habits/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done }),
  }).then((res) => res.json());
};

export const addHabit = async (title) => {
  return fetch(`${BASE_URL}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
};
