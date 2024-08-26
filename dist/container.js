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
var DIContainer = /*#__PURE__*/ function() {
    "use strict";
    function DIContainer() {
        this._constructor2Instance = new Map();
    }
    var _proto = DIContainer.prototype;
    _proto.getDependencyByCtr = function getDependencyByCtr(ctr) {
        return this.construct(ctr);
    };
    _proto.construct = function construct(ctr) {
        if (!ctr) {
            throw new Error("ctr not found", ctr);
        }
        console.log("[DEBUG][DzungDang] ctr:", ctr);
        if (this._constructor2Instance.has(ctr)) {
            return this._constructor2Instance.get(ctr);
        }
        var params = Reflect.getMetadata("design:paramtypes", ctr) || [];
        var args = params.map(this.construct);
        var instance = _construct(ctr, [].concat(args));
        this._constructor2Instance.set(ctr, instance);
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
            key: "constructor2Instance",
            get: function get() {
                return this._constructor2Instance;
            }
        }
    ]);
    return DIContainer;
}();
var container = DIContainer.getInstance();
container.construct(_usermodule.UserModule);
container.construct(_delivermodule.DeliverModule);
container.construct(_officemodule.OfficeModule);
function Injectable() {
    return function(target) {
        Reflect.defineMetadata("design:paramtypes", [], target);
    };
}

//# sourceMappingURL=container.js.map