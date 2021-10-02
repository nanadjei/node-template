# Controllers

Instead of defining all of your request handling logic as Closures in route files, you may wish to organize this behavior using Controller classes. Controllers can group related request handling logic into a single class. Controllers are stored in the `./controllers` directory.

Example `UserController.js`;

```js
import User from "../models/User.js";

class UserController {
  /**
   * Get all users.
   *
   * @param object represents the HTTP response that an Express app
   * sends when it gets an HTTP request.
   *
   * @return JSON of the retrieved users.
   */
  index = async (res) => {
    await User.find((err, data) => {
      return err ? res.status(500).send(err) : res.status(200).send(data);
    });
  };
}
```
