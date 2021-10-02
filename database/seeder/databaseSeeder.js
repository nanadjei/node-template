import '../database.js';
import UsersTableSeeder from './UsersTableSeeder.js';
UsersTableSeeder.drop().then(c => c.create());


