"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _express = /*#__PURE__*/ _interop_require_default(require("express"));
var _container = require("./container");
var _token = require("./token");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var app = (0, _express.default)();
app.get("/", function(req, res) {
    res.send("Hello World!");
});
app.listen(3006, function() {
    console.log("Server is running on port 3006");
    var deliverModule = _container.container.getDependencyByToken(new _token.InjectionToken("DeliverModule"));
    console.log("[DEBUG][DzungDang] container:", _container.container);
    console.log("[DEBUG][DzungDang] deliverModule:", deliverModule);
    deliverModule.userDrivingToOffice();
});

//# sourceMappingURL=index.js.map