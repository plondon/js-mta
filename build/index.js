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
        // @ts-ignore
        var stops = fs.readFileSync(path.join(__dirname, "./mta-data/stops.txt"));
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
