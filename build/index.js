"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var csvParse = require("csv-parse");
var MTA = /** @class */ (function () {
    function MTA(apiKey) {
        this.apiKey = apiKey;
    }
    MTA.prototype.stops = function () {
        var stops;
        // @ts-ignore
        if (process.env === 'DEV') {
            stops = fs.readFileSync(path.resolve(__dirname, "./mta-data/stops.txt"));
        }
        else {
            // TODO: fix-me
            stops = fs.readFileSync(path.resolve("node_modules/js-mta/build/mta-data/stops.txt"));
        }
        return new Promise(function (resolve, reject) {
            csvParse(stops, {
                columns: true,
                objname: "stop_id"
            }, function (err, data) {
                if (err)
                    return reject(err);
                return resolve(data);
            });
        });
    };
    return MTA;
}());
exports.default = MTA;
console.log(new MTA('123').stops());
