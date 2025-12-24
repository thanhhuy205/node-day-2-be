import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, "../db");
const loadDB = async (resourceName) => {
  try {
    const data = await fs.readFile(`${DB_DIR}/${resourceName}.json`, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(`${DB_DIR}/${resourceName}.json`, JSON.stringify([]));
      return [];
    }
    throw error;
  }
};

const saveDB = async (resourceName, data) => {
  await fs.writeFile(
    `${DB_DIR}/${resourceName}.json`,
    JSON.stringify(data, null, 2)
  );
};

export const db = { loadDB, saveDB };
