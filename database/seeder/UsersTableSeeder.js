import User from '../../models/User.js';
import UserFactory from "../factory/UserFactory.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

class UsersTableSeeder {
    /** Create dummy users */
    create = async () => {
        await bcrypt.hash(process.env.YOUR_PASSWORD || "password.demo", 12, (err, hashedPassword) => {
            const newUser = new User({
                firstName: process.env.YOUR_FIRST_NAME || "John",
                lastName: process.env.YOUR_LAST_NAME || "Doe",
                email: process.env.YOUR_EMAIL || "john@doe.com",
                emailVerifiedAt: Date.now(),
                password: hashedPassword,
            });
            hashedPassword ? newUser.save() : err;
            return new UserFactory(hashedPassword).create(50);
        });

        console.log("Users seeded...!")
    }

    
        /** Delete this collection for the database */
        drop = async () => {
            try {
                await User.collection.drop().then(() => {
                    console.log("Users collection dropped...");
                });
                return this;
            } catch (e) {
                return this;
            }
        }
}

export default new UsersTableSeeder();