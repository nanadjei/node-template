export default function register(program, fs) {
    return program
    .command('controller <name>')
    .alias('c')
    .description('Create a new controller')
    .action((name) => {
        handler(name, fs);
    });
}

const handler = (name, fs) => {
    // var dir = './tmp';

    // if (!fs.existsSync(name)){
    //     fs.mkdirSync(name);
    // }

    fs.writeFileSync(`./controllers/${name}.js`,  `import Controller from "./controller";
class ${name} extends Controller {
    index(req, res) {
        //
    }
}
export default ${name} = new ${name}();
`,  
    { encoding: "utf8"});
    console.info(`${name} created successfully`)
}