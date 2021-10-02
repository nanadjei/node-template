# Model

Each database table has a corresponding "Model" which is used to interact with that collection. Think of collections as tables. Models allow you to query for data in your collection, as well as insert new records into them. To get started, let's create an model. Models typically live in the`./models` directory.

Example; `User.js`

```js
import mongoose from "mongoose";

import UserSchema from "../database/migrations/create_users_table.js";

export default mongoose.model("User", UserSchema);
```
