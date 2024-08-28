"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OfficeModule", {
    enumerable: true,
    get: function() {
        return OfficeModule;
    }
});
var _container = require("./container");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var OfficeModule = /*#__PURE__*/ function() {
    "use strict";
    function OfficeModule(location, employeeQty) {}
    var _proto = OfficeModule.prototype;
    _proto.userArrivedToOffice = function userArrivedToOffice() {
        console.log("User arrived to office");
    };
    return OfficeModule;
}();
OfficeModule = _ts_decorate([
    _container.Injectable,
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ])
], OfficeModule);

//# sourceMappingURL=office.module.js.map