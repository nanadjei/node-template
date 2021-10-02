export default function register(program, fs) {
    return program
    .command('migration <name>')
    .alias('m')
    .description('Create a new migration')
    .action((name) => {
        handler(name, fs);
    });
}

const handler = (name, fs) => {

    fs.writeFileSync(`./database/migrations/${name}.js`,  `import mongoose from "mongoose";

const Schema = mongoose.Schema;

/** 
 * Your database schema
 */ 
export default Schema({
    //
});

`,  
    { encoding: "utf8"});
    console.info(`Migration created successfully`)
}