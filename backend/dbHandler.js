import fs from "fs/promises";

const file = "./habits.json";

export const setDatabase = async () => {
  const defaultContent = { habits: [] };

  try {
    // Vérifier si le fichier existe
    await fs.access(file, fs.constants.F_OK);
  } catch (err) {
    // Le fichier n'existe pas, le créer
    const handle = await fs.writeFile(
      file,
      JSON.stringify(defaultContent, null, 2)
    );
    await handle.close();
  }
};

export const getHabits = async () => {
  const data = await fs.readFile(file, "utf-8");
  return JSON.parse(data);
};

export const addHabit = async (habit) => {
  const data = await getHabits();
  data.habits.push(habit);
  await fs.writeFile(file, JSON.stringify(data, null, 2));
};
