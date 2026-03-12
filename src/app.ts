import cors from "cors";
import express from "express";
import path from "node:path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { connectDB } from "#db";
import { errorHandler, notFound } from "#middleware/errorHandler";
import routes from "#routes/index";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const swaggerDocument = YAML.load(path.resolve(process.cwd(), "swagger.yaml"));

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "eCommerce API is running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", routes);
app.use(notFound);
app.use(errorHandler);

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
