import cors from "@fastify/cors";
import Fastify from "fastify";
import { setDatabase, getHabits, addHabit } from "./dbHandler.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

await setDatabase();

// Test si le serveur fonctionne
fastify.get("/", async () => {
  return { hello: "world" };
});

fastify.get("/habits", async (request, response) => {
  const data = await getHabits();
  response.send(JSON.stringify(data.habits));
});

fastify.post("/habits", async (request, response) => {
  const habit = request.body;
  await addHabit(habit);
  response.statusCode(201).send(habit);
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
