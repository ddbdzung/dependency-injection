"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeliverModule", {
    enumerable: true,
    get: function() {
        return DeliverModule;
    }
});
var _usermoduleinterface = require("./user.module.interface");
var _container = require("./container");
var _officemoduleinterface = require("./office.module.interface");
var _token = require("./token");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
var DeliverModule = /*#__PURE__*/ function() {
    "use strict";
    function DeliverModule(_officeModule, _userModule) {
        this._officeModule = _officeModule;
        this._userModule = _userModule;
    }
    var _proto = DeliverModule.prototype;
    _proto.userDrivingToOffice = function userDrivingToOffice() {
        console.log("User driving to office");
        this._userModule.createUser("Dzung Dang");
        this._officeModule.userArrivedToOffice();
    };
    return DeliverModule;
}();
DeliverModule = _ts_decorate([
    _container.Injectable,
    _ts_param(0, (0, _container.Inject)(new _token.InjectionToken("OfficeModule"))),
    _ts_param(1, (0, _container.Inject)(new _token.InjectionToken("UserModule"))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _officemoduleinterface.IOfficeModule === "undefined" ? Object : _officemoduleinterface.IOfficeModule,
        typeof _usermoduleinterface.IUserModule === "undefined" ? Object : _usermoduleinterface.IUserModule
    ])
], DeliverModule);

//# sourceMappingURL=deliver.module.js.map