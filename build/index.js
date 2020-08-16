"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var csvParse = require("csv-parse");
console.log(process.env.NODE_ENV)
var dname = process.env.NODE_ENV === "dev" ? __dirname + '/./' : "node_modules/js-mta/build/";
var MTA = /** @class */ (function () {
    function MTA(apiKey) {
        this.apiKey = apiKey;
    }
    MTA.prototype.stops = function () {
        var stops = fs.readFileSync(path.resolve(dname, "mta-data/stops.txt"));
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
