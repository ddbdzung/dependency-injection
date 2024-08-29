"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Inject: function() {
        return Inject;
    },
    Injectable: function() {
        return Injectable;
    },
    container: function() {
        return container;
    }
});
require("reflect-metadata");
var _delivermodule = require("./deliver.module");
var _officemodule = require("./office.module");
var _usermodule = require("./user.module");
var _token = require("./token");
function _construct(Parent, args, Class) {
    if (_is_native_reflect_construct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}
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
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
var INJECT_CLASS_METADATA_KEY = "__INJECT_CLASS_METADATA_KEY__";
var DIContainer = /*#__PURE__*/ function() {
    "use strict";
    function DIContainer() {
        this._constructor2Instance = new Map();
        this._tokenMap = new Map();
    }
    var _proto = DIContainer.prototype;
    _proto.getDependencyByToken = function getDependencyByToken(injectionToken) {
        return this._constructor2Instance.get(injectionToken.token);
    };
    _proto.bindToClass = function bindToClass(token, ctr) {
        this._tokenMap.set(token.token, ctr);
        return this;
    };
    _proto.getConstructorByToken = function getConstructorByToken(token) {
        if (this._tokenMap.has(token.token)) {
            return this._tokenMap.get(token.token);
        }
        throw new Error("Token " + String(token.token) + " not bound");
    };
    _proto.construct = function construct(ctr, injectionToken) {
        var _this = this;
        if (this._constructor2Instance.has(injectionToken.token)) {
            return this._constructor2Instance.get(injectionToken.token);
        }
        // Load the constructor's param types
        var params = Reflect.getMetadata("design:paramtypes", ctr) || [];
        var injectedMetadataList = Reflect.getMetadata("__INJECT_CLASS_METADATA_KEY__", ctr) || [];
        var injectedMetadataKeybyIndex = injectedMetadataList.reduce(function(acc, cur) {
            acc.set(cur.index, cur);
            return acc;
        }, new Map());
        // Inject the dependencies
        var args = params.map(function(param, paramIndex) {
            console.log("[DEBUG][DzungDang] param:", param, paramIndex, ctr.name);
            if (!injectedMetadataKeybyIndex.has(paramIndex)) {
                console.log("[DEBUG][DzungDang] param is not injected:", param);
                // TODO: Handle case when param is not injected and is type of Class
                return param;
            }
            var _$injectionToken = injectedMetadataKeybyIndex.get(paramIndex).token;
            var ctrByToken = _this.getConstructorByToken(_$injectionToken);
            return _this.construct(ctrByToken, _$injectionToken);
        });
        var instance = _construct(ctr, [].concat(args));
        this._constructor2Instance.set(injectionToken.token, instance);
        return instance;
    };
    DIContainer.getInstance = function getInstance() {
        if (!DIContainer._instance) {
            DIContainer._instance = new DIContainer();
        }
        return DIContainer._instance;
    };
    _create_class(DIContainer, [
        {
            key: "tokenMap",
            get: function get() {
                return this._tokenMap;
            }
        },
        {
            key: "constructor2Instance",
            get: function get() {
                return this._constructor2Instance;
            }
        }
    ]);
    return DIContainer;
}();
var container = DIContainer.getInstance();
console.log("[DEBUG][DzungDang] me fukin in here:");
var userModuleToken = new _token.InjectionToken("UserModule");
var deliverModuleToken = new _token.InjectionToken("DeliverModule");
var officeModuleToken = new _token.InjectionToken("OfficeModule");
container.bindToClass(userModuleToken, _usermodule.UserModule);
container.bindToClass(deliverModuleToken, _delivermodule.DeliverModule);
container.bindToClass(officeModuleToken, _officemodule.OfficeModule);
console.log("[DEBUG][DzungDang] and u suck with DI Container here:", container);
container.construct(_usermodule.UserModule, userModuleToken);
container.construct(_delivermodule.DeliverModule, deliverModuleToken);
container.construct(_officemodule.OfficeModule, officeModuleToken);
function Injectable(target) {
    return target;
}
function Inject(token) {
    return function(target, key, index) {
        var metadataKey = "__INJECT_CLASS_METADATA_KEY__";
        // Define metadata to mark the injected constructor parameter
        var payload = {
            index: index,
            token: token,
            sourceConstructor: target
        };
        var metadataValue = Reflect.getMetadata(metadataKey, target) || [];
        metadataValue.push(payload);
        Reflect.defineMetadata(metadataKey, metadataValue, target);
    };
}

//# sourceMappingURL=container.js.map