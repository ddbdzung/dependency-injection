"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _express = /*#__PURE__*/ _interop_require_default(require("express"));
var _delivermodule = require("./deliver.module");
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
    _delivermodule.DeliverModule.userDrivingToOffice();
});

//# sourceMappingURL=index.js.map