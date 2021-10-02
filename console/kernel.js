;import program from "commander";
import fs from "fs";

// Import commands
import createControllerCommand from "./commands/createControllerCommand.js"
import createModelCommand from "./commands/createModelCommand.js"
import createFactoryCommand from "./commands/createFactoryCommand.js"
import createMigrationCommand from "./commands/createMigrationCommand.js"
import createSeederCommand from "./commands/createSeederCommand.js"

program.version('1.0.0').description(process.env.APP_NAME);

// Register commands
createControllerCommand(program, fs);
createModelCommand(program, fs);
createFactoryCommand(program, fs);
createMigrationCommand(program, fs);
createSeederCommand(program, fs);


program.parse(process.argv);