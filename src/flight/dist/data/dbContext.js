"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialDbContext = void 0;
const tsyringe_1 = require("tsyringe");
const dbContext_1 = require("building-blocks/typeorm/db-context");
const repositoryExtensions_1 = require("../extensions/repositoryExtensions");
const flightSeed_1 = require("./seeds/flightSeed");
const initialDbContext = (options) => __awaiter(void 0, void 0, void 0, function* () {
    tsyringe_1.container.register('IDbContext', dbContext_1.DbContext);
    const dbContext = tsyringe_1.container.resolve(dbContext_1.DbContext);
    const connection = yield dbContext.initialize(options);
    yield (0, repositoryExtensions_1.registerRepositories)();
    const flightSeed = tsyringe_1.container.resolve(flightSeed_1.FlightSeed);
    yield flightSeed.seedData();
    return connection;
});
exports.initialDbContext = initialDbContext;
//# sourceMappingURL=dbContext.js.map
