import { StopsType } from "./types";
export default class MTA {
    apiKey: string;
    constructor(apiKey: string);
    stops(): Promise<StopsType>;
}
