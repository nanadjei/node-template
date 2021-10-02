export default function register(program, fs) {
    return program
    .command('model <name>')
    .description('Create a new model')
    .action((name) => {
        handler(name, fs);
    });
}

const handler = (name, fs) => {

    fs.writeFileSync(`./models/${name}.js`,  `import mongoose from 'mongoose';
import ${name}Schema from "../database/migrations/create_${name.toLowerCase()}s_table.js";

${name}Schema.statics.allowedValues = (${name.toLowerCase()}) => {
    return {
        // Write your fillable
    }
}

export default mongoose.model("${name}", ${name}Schema);
`,  
    { encoding: "utf8"});
    console.info(`${name} model created successfully`)
}