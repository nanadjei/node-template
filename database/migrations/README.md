# Migrations

Migrations are typically designed to build your application's database schema. If you have ever had to tell a teammate to manually add a column to their local database schema, you've faced the problem that database migrations solve. Migrations are stored in the `./database/migrations` directory.

Example; `create_users_table.js`

```js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 *
 */
const UserSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String },
  emailVerifiedAt: { type: Date },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

export default UserSchema;
```
