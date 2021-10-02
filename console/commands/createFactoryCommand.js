export default function register(program, fs) {
    return program
    .command('factory <name>')
    .alias('f')
    .description('Create a new factory')
    .action((name) => {
        handler(name, fs);
    });
}

const handler = (name, fs) => {
    const modelName = name.replace(/Factory/gi, '');

    fs.writeFileSync(`./database/factory/${name}.js`,  `import faker from "faker";
import Factory from "./Factory.js";
import ${modelName} from '../../models/${modelName}.js';
export default class ${name} extends Factory {
    constructor() {
        super.model = ${modelName}; // Model responsible for storing the seed data..
    }

    /** Responsible for taking care of your seed structure 
     * @return { Object } key value pairs of your data representation
    */
    build() {
        return {
            //
        }
    }
}
`,  
    { encoding: "utf8"});
    console.info(`${name} created successfully`)
}