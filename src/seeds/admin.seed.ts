import dotenv = require("dotenv");

dotenv.config();
import mongoose = require("mongoose");
const User = require("../models/users");
import CryptoJS from 'crypto-js';
import { Config } from "../config";

const passwordSha = CryptoJS.SHA256(process.env.ADMIN_PASSWORD!).toString(CryptoJS.enc.Hex);

async function seedAdmin() {
    try {
        await mongoose.connect(Config.mongoUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
          });
          
        await User.updateOne(
            { email:process.env.ADMIN_EMAIL },
            {
              $set: {
                email: process.env.ADMIN_EMAIL,
                name: "Admin",
                address: "—",
                city: "—",
                postalCode: "—",
                country: "—",
                phoneNumber: "—",
                password: passwordSha,
                type: "admin",
              },
            },
            { upsert: true }
          );
  
      console.log("Admin seed completed.");
    } catch (err) {
      console.error("Admin seed failed:", err);
      process.exitCode = 1;
    } finally {
      await mongoose.disconnect();
    }
  }
  
  seedAdmin();