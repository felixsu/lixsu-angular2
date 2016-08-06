export class Health {
    statusCode : number;
    statusMessage : string;

    constructor() {
        this.statusCode = -1;
        this.statusMessage = "Not Initialized";
    }
}