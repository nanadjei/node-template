export function responder(res) {
    class Responder {
        constructor() {
            if(res == undefined) {
                throw new Error("Request not found")
            }
            this.res = res;
            this.payload = null;
        }
        /** Success response 
         * @param { Object } data - The data to return.
         * @return JSON
         */
        success(data = null) {
            this.payload = { status: 200, success: true, data: data };
            return this;
        }

        /** Success response 
         * @param { Object } data - The data to return.
         * @return JSON
         */
        error(key, value) {
            if(!key || !value) {
                throw new Error("Error response expects key and value.");
            }
            this.payload = { success: false, status: 500, errors: {[key]: value}};
            return this;
        }

        respond(statusCode = 200) {
            this.res.status(statusCode);
            const payload = statusCode ? Object.assign(this.payload, { status: statusCode }) : this.payload;
            return this.res.send(payload);
        }
    }

    return new Responder();
}
