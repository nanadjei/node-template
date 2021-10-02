export default function register(program, fs) {
    return program
    .command('seeder <name>')
    .alias('s')
    .description('Create a new seeder')
    .action((name) => {
        handler(name, fs);
    });
}

const handler = (name, fs) => {
    const modelName = name.replace(/TableSeeder/gi, '');
    fs.writeFileSync(`./database/seeder/${name}.js`,  `import ${modelName} from '../../models/${modelName}.js';
import ${modelName}Factory from "../factory/${modelName}Factory.js";

class ${modelName}TableSeeder {
    /** Create dummy ${modelName.toLowerCase()}s */
    create = async () => {
        //

        console.info("${modelName} seeded...!")
    }

    
        /** Delete this collection for the database */
        drop = async () => {
            try {
                await ${modelName}.collection.drop().then(() => {
                    console.log("${modelName}s collection dropped...");
                });
                return this;
            } catch (e) {
                return this;
            }
        }
}

export default new ${name}();
`,  
    { encoding: "utf8"});
    console.info(`${name} created successfully`)
}