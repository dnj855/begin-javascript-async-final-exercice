import {
  addHabit,
  getHabits,
  getTodayHabits,
  updateHabit,
} from "../habits.helper.js";

export async function habitsRoute(fastify) {
  fastify.get("/", async () => {
    const habits = await getHabits();
    return habits;
  });

  fastify.get("/today", async () => {
    const todayHabits = await getTodayHabits();
    return todayHabits;
  });

  fastify.post("/", async (request, response) => {
    const body = request.body;
    if (body.title === undefined) {
      response.code(400).send({
        error: "Title is required in the body",
      });
    }

    const newHabit = await addHabit(body.title);

    return newHabit;
  });

  fastify.patch("/:habitId", async (request, response) => {
    const body = request.body;
    if (body.done === undefined) {
      response.code(400).send({
        error: "Done is required in the body",
      });
    }

    if (typeof body.done !== "boolean") {
      response.code(400).send({
        error: "Done must be a boolean",
      });
    }

    const habitId = Number(request.params.habitId);

    if (!habitId || Number.isNaN(habitId)) {
      response.code(400).send({
        error: "Habit id is required and must be a number",
      });
    }
    try {
      const updatedHabit = await updateHabit(habitId, body.done);
      return updatedHabit;
    } catch (error) {
      response.code(400).send({
        error: error.message,
      });
    }
    return updatedHabit;
  });
}
