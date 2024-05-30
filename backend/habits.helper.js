import path from "path";
import fs from "fs/promises";

const databaseFile = path.join(process.cwd(), "database.json");

const readDatabase = async () => {
  const database = await fs.readFile(databaseFile, "utf-8");
  const json = JSON.parse(database);
  return json;
};

const writeDatabase = async (newDatabase) => {
  const database = await readDatabase();
  await fs.writeFile(
    databaseFile,
    JSON.stringify(
      {
        ...database,
        ...newDatabase,
      },
      null,
      2
    )
  );
};

export const getHabits = async () => {
  const database = await readDatabase();
  return database.habits;
};

export const getTodayHabits = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const habits = await getHabits();
  return habits.map((habit) => {
    return {
      id: habit.id,
      title: habit.title,
      done: habit.daysDone[today] || false,
    };
  });
};

export const addHabit = async (title) => {
  const habits = await getHabits();
  const newHabit = {
    id: habits[habits.length - 1].id + 1 || 0,
    title: title,
    daysDone: {},
  };
  habits.push(newHabit);
  await writeDatabase({ habits });
  return newHabit;
};

export const updateHabit = async (habitId, done) => {
  const habits = await getHabits();
  const toEditHabit = habits.find((habit) => habit.id === habitId);
  if (!toEditHabit) {
    throw new Error("Habit not found");
  }
  const today = new Date().toISOString().slice(0, 10);
  toEditHabit.daysDone[today] = done;
  await writeDatabase({ habits });
  return toEditHabit;
};
