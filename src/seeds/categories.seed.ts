import dotenv = require("dotenv");

dotenv.config();
import mongoose = require("mongoose");
import { Config } from "../config";

const Category = require("../models/category");

const categories = ["grocery", "pharmacy", "food", "electronic"];

async function seedCategories() {
  try {
    await mongoose.connect(Config.mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    // Upsert avoids duplicates on repeated runs
    for (const title of categories) {
      await Category.updateOne({ title }, { $setOnInsert: { title } }, { upsert: true });
    }

    console.log("Category seed completed.");
  } catch (err) {
    console.error("Category seed failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedCategories();