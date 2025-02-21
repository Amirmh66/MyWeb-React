import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Setting from "../Models/Setting.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configDir = path.join(__dirname, "..", "config", "Default-Settings");

async function readConfigFile(filePath) {
  try {
    const data = await fs.readFileSync(filePath, "utf8");
    const config = JSON.parse(data);
    return config;
  } catch (error) {
    return "Error reading config file: ", error;
  }
}
export const defaultSetting = async (req, res) => {
  const groupName = req.query.group;
  try {
    const filename = "Store.json";
    const storeFile = path.join(configDir, filename);
    const storeData = await readConfigFile(storeFile);
    console.log(storeData);

    if (groupName === "Store") {
      // query on db and const groupOnDb = fineOne(group)
      const defaultSettings = new Setting(storeData);
      const insertdefaultSettings = await defaultSettings.save();
      res.json(`Default Settings ${groupName} successfully applyed.`);
    } else if (groupName === "API") {
      // To Do
    } else if (groupName === "Appeariance&Design") {
      // To Do
    }
  } catch (error) {
    res.status(500).json({ message: "Error while applying Default Settings!" });
  }
};
export const getSettingsByGroup = async (req, res) => {
  const groupName = req.query.group;
  try {
    if (groupName === "Store") {
      const filename = "Store.json";
      const storeFile = path.join(configDir, filename);
      const storeData = await readConfigFile(storeFile);
      res.json(storeData);
    } else if (groupName === "API") {
      //To Do
    } else if (groupName === "Appeariance&Design") {
      //To Do
    }
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};
export const updateSettingsByKey = async (req, res) => {};
