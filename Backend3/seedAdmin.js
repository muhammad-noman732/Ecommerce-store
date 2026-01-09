import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import { User } from "./model/user.model.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL);


        const adminEmail = "info@imkautos.co.uk";
        const adminPassword = "Aneesbella@12345";

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {

            await mongoose.disconnect();
            return;
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(adminPassword, salt);

        // Create admin user
        const admin = await User.create({
            name: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "ADMIN",
            isGoogleAuth: false,
            cartData: {},
        });



        await mongoose.disconnect();

    } catch (error) {
        console.error("❌ Error seeding admin:", error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
};

seedAdmin();
