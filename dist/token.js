"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InjectionToken", {
    enumerable: true,
    get: function() {
        return InjectionToken;
    }
});
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var InjectionToken = /*#__PURE__*/ function() {
    "use strict";
    function InjectionToken(token) {
        this._token = token;
    }
    _create_class(InjectionToken, [
        {
            key: "token",
            get: function get() {
                return this._token;
            }
        }
    ]);
    return InjectionToken;
}();

//# sourceMappingURL=token.js.map