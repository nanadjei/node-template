# Seeder

This class actually handles the seeds. You can name the method that runs the seeds any how you wish but it is nice to follow some conventions. Try and name them after create, store or run. Seeder class can be found in `./database/UsersTableSeeder` directory.

Example; `UsersTableSeeder.js`

```js
import UserFactory from "../factory/UserFactory.js";

class UsersTableSeeder {
  /** Create dummy users */
  create = () => {
    new UserFactory().create(50);
  };

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
  };
}

export default new UsersTableSeeder();
```

Don't forget to register this class `databaseSeeder.js`
