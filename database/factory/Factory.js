export default class Factory {
    constructor(model) {
        this.model = model;
        this.checkBuild();
    }
    
    create(numberOfSeeds) {
        for (let i = 0; i < numberOfSeeds; i++) {
            const build = this.build();
            new this.model(build).save();
        }
    }

    checkBuild() {
        if(typeof this.build == "undefined") {
            throw new Error("Build method not found in factory class");
        }
        if(typeof this.build !== "object") {
            throw new Error("Build method must return an object");
        }
    }
}