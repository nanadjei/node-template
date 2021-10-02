import faker from "faker";
import Factory from "./Factory.js";
import User from '../../models/User.js';
export default class UserFactory extends Factory {
    constructor(hashedPassword) {
        super();
        this.password = hashedPassword;
        super.model = User; // Model responsible for storing the seed data..
    }

    /** Responsible for taking care of your seed structure 
     * @return { Object } key value pairs of your data representation
    */
    build() {
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: this.password
        }
    }
}