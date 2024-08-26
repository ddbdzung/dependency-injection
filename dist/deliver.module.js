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
var DeliverModule = /*#__PURE__*/ function() {
    "use strict";
    function DeliverModule() {}
    var _proto = DeliverModule.prototype;
    // constructor(@Inject() private readonly _officeModule: IOfficeModule) {
    //   console.log("[DEBUG][DzungDang] _officeModule:", _officeModule);
    // }
    _proto.userDrivingToOffice = function userDrivingToOffice() {
        console.log("User driving to office");
    };
    return DeliverModule;
}();
DeliverModule = _ts_decorate([
    (0, _container.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], DeliverModule);

//# sourceMappingURL=deliver.module.js.map