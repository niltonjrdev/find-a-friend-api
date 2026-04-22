import { app } from "./app.ts";

const port = Number(process.env.PORT) || 3333;

app.listen({ host: "0.0.0.0", port }).then(() => {
  console.log(`HTTP running at port ${port}`);
});
