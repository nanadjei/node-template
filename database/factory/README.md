# Factory

When building your application you might want to have some data to play around with. Factories are responsible for generating dummy data to assist in doing so. Think of a factory as a place where your dummy data are prepared before storing them in your database. Example; `UserFactory.js`

```js
import faker from "faker";
import Factory from "../../lib/factory.js";
import User from "../../models/User.js";

export default class UserFactory extends Factory {
  constructor() {
    super();
    super.model = User; // Model responsible for storing the seed data.
  }

  /** Responsible for taking care of your seed structure
   * @return { Object } key value pairs of your data representation
   */
  build() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "someNicelyHashedPassword",
    };
  }
}
```
