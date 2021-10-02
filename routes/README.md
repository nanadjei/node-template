# Routes

Routes can be defined in the `./routes` directory. `api.js` is an example route which has express imported and `Router()` is been called on it to get the router object. You can now call Route.`http verb` such as get, post, put, update and delete on them. The http verb takes a couple of arguements; the uri and a callback(takes in request and response). The controller responsible can be called inside the callback with the corresponding method tack on it like the example below.

Example; `User.js`

```js
import express from "express";
const Route = express.Router();
import UsersController from "../controllers/UsersController.js";

/** Get all users */
Route.get("/users", (_, res) => {
  return UsersController.index(res);
});

export default Route;
```
