(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('gsap'), require('@ngneat/until-destroy'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-beautify-cursor', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', 'gsap', '@ngneat/until-destroy', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ngx-beautify-cursor"] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.gsap, global.untilDestroy, global.ng.common));
})(this, (function (exports, i0, rxjs, operators, gsap, untilDestroy, common) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var gsap__default = /*#__PURE__*/_interopDefaultLegacy(gsap);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var BrowserWindowRef = /** @class */ (function () {
        function BrowserWindowRef(platformId) {
            this.platformId = platformId;
        }
        Object.defineProperty(BrowserWindowRef.prototype, "nativeWindow", {
            get: function () {
                if (common.isPlatformBrowser(this.platformId)) {
                    return this.windowRef();
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        BrowserWindowRef.prototype.windowRef = function () {
            return window;
        };
        return BrowserWindowRef;
    }());
    BrowserWindowRef.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0__namespace, type: BrowserWindowRef, deps: [{ token: i0.PLATFORM_ID }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    BrowserWindowRef.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0__namespace, type: BrowserWindowRef, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0__namespace, type: BrowserWindowRef, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], ctorParameters: function () {
            return [{ type: Object, decorators: [{
                            type: i0.Inject,
                            args: [i0.PLATFORM_ID]
                        }] }];
        } });

    exports.NgxBeautifyCursorComponent = /** @class */ (function () {
        function NgxBeautifyCursorComponent(wr) {
            this.wr = wr;
            this.DEFAULT_HOVER_CLASS = 'clickable';
            this.BUTTON_TAG = 'button';
            //region Inputs
            this.cursorHoldAnimationDuration = 0.25;
            this.cursorHoldAnimationScaleDown = 0.8;
            this.cursorHoverAnimationDuration = 0.4;
            this.cursorHoverAnimationScaleUp = 1.5;
            this.defaultCursor = 'none';
            this.nParentsStyleCheck = 5;
            this.zIndex = 999;
            this.enableHoverAnimation = true;
            this.hideDotWhileHover = true;
            this.hoverAttributes = [
                'href',
                this.BUTTON_TAG,
                this.DEFAULT_HOVER_CLASS
            ];
            this.circleSizePx = 40;
            this.circleBorderSizePx = 1;
            this.circleFollowDuration = 0.5;
            this.circleBorderColor = '#6363af';
            this.circleBackgroundColor = 'hsla(245, 44%, 56%, 0.08)';
            this.dotSizeInPx = 8;
            this.dotFollowDuration = 0;
            this.dotColor = 'hsla(245, 44%, 56%, 1)';
            //endregion
            //region states
            this.isHover = false;
            this.originalCircleBackgroundColor = '';
            this.originalCircleBorderColor = '';
            this.originalDotColor = '';
            //endregion
            this.cursorCustomClasses = [
                'ngx-beautify-cursor-circle-bg-color',
                'ngx-beautify-cursor-circle-border-color',
                'ngx-beautify-cursor-dot-color'
            ];
            // binding
            this._mouseDown = this._mouseDown.bind(this);
            this._mouseUp = this._mouseUp.bind(this);
        }
        NgxBeautifyCursorComponent.prototype.ngOnChanges = function () {
            this.setStyles();
        };
        NgxBeautifyCursorComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.wr.nativeWindow) {
                this.init();
                this.setStyles();
                var mousemove$ = rxjs.fromEvent(this.wr.nativeWindow, 'mousemove');
                this.wr.nativeWindow.addEventListener('mousedown', this._mouseDown);
                this.wr.nativeWindow.addEventListener('mouseup', this._mouseUp);
                mousemove$.pipe(untilDestroy.untilDestroyed(this)).subscribe(function (e) {
                    _this.moveCursor(e.clientX, e.clientY);
                });
                var getElementsFamily$ = mousemove$.pipe(untilDestroy.untilDestroyed(this), operators.pluck('path'), operators.filter(function (family) { return family && family.length > 0; }), operators.map(function (family) { return family.slice(0, _this.nParentsStyleCheck); }));
                // region Custom style detection
                var getElementsAttrs$ = getElementsFamily$.pipe(operators.map(function (data) { return data.reduce(function (acc, item) {
                    if (item.attributes) {
                        acc.push(Object.values(item.attributes).filter(function (attr) { return _this.cursorCustomClasses.indexOf(attr.name) !== -1; }));
                    }
                    return acc;
                }, []); }));
                var applyStylesFromAttr$ = getElementsAttrs$.pipe(operators.tap(function (_) { return _this.removeClass(); }), operators.map(function (data) { return data.flat(); }), operators.filter(function (arrayAttr) { return arrayAttr.length > 0; }), operators.tap(function (arrayAttr) {
                    arrayAttr.map(function (item) {
                        if (item) {
                            _this.applyCustomDivStyle(item);
                        }
                    });
                }));
                rxjs.combineLatest(mousemove$, getElementsAttrs$, applyStylesFromAttr$)
                    .pipe(untilDestroy.untilDestroyed(this))
                    .subscribe();
                //endregion
                // region Hover detection
                if (this.enableHoverAnimation) {
                    var findHoverAttrs$ = getElementsFamily$.pipe(operators.map(function (items) {
                        return items.findIndex(function (item) {
                            var _a, _b;
                            if (item) {
                                var hoverOnTag = _this.hoverAttributes.indexOf((_a = item.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== -1;
                                var hoverOnClass = item.classList ?
                                    ((_b = Object.values(item.classList)) === null || _b === void 0 ? void 0 : _b.filter(function (className) { return _this.hoverAttributes.indexOf(className) !== -1; }).length) > 0
                                    : false;
                                return hoverOnTag || hoverOnClass;
                            }
                            else {
                                return false;
                            }
                        }) !== -1;
                    }));
                    var applyHover$ = findHoverAttrs$.pipe(untilDestroy.untilDestroyed(this), operators.filter(function (shouldHover) { return shouldHover != _this.isHover; }), operators.tap(function (shouldHover) {
                        _this.isHover = shouldHover;
                        if (_this.isHover) {
                            _this._onHover();
                        }
                        else {
                            _this._leaveHover();
                        }
                    }));
                    rxjs.combineLatest(mousemove$, findHoverAttrs$, applyHover$)
                        .pipe(untilDestroy.untilDestroyed(this))
                        .subscribe();
                }
                //endregion
            }
            this._showCursorFirstTime();
        };
        NgxBeautifyCursorComponent.prototype.init = function () {
            this.originalCircleBackgroundColor = this.circleBackgroundColor;
            this.originalCircleBorderColor = this.circleBorderColor;
            this.originalDotColor = this.dotColor;
        };
        NgxBeautifyCursorComponent.prototype.applyCustomDivStyle = function (item) {
            switch (item.name) {
                case 'ngx-beautify-cursor-circle-bg-color':
                    this.circleBackgroundColor = item.value;
                    break;
                case 'ngx-beautify-cursor-circle-border-color':
                    this.circleBorderColor = item.value;
                    break;
                case 'ngx-beautify-cursor-dot-color':
                    this.dotColor = item.value;
                    break;
            }
            this.setStyles();
        };
        NgxBeautifyCursorComponent.prototype.removeClass = function () {
            this.circleBackgroundColor = this.originalCircleBackgroundColor;
            this.circleBorderColor = this.originalCircleBorderColor;
            this.dotColor = this.originalDotColor;
            this.setStyles();
        };
        NgxBeautifyCursorComponent.prototype.moveCursor = function (x, y) {
            var _a, _b;
            /**
             * Move cursor(dot & circle) to the pointer center
             */
            var offset = this.dotSizeInPx / 2;
            gsap__default["default"].to((_a = this.ngxBeautifyCursorDot) === null || _a === void 0 ? void 0 : _a.nativeElement, {
                x: x - offset,
                y: y - offset,
                rotation: 0.01,
                duration: this.dotFollowDuration
            });
            offset = this.circleSizePx / 2 + this.circleBorderSizePx;
            gsap__default["default"].to((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, {
                x: x - offset,
                y: y - offset,
                rotation: 0.01,
                duration: this.circleFollowDuration
            });
        };
        NgxBeautifyCursorComponent.prototype._mouseDown = function () {
            var _a, _b;
            if (this.isHover) {
                gsap__default["default"].fromTo((_a = this.ngxBeautifyCursorCircle) === null || _a === void 0 ? void 0 : _a.nativeElement, { scale: this.cursorHoverAnimationScaleUp }, {
                    scale: this.cursorHoldAnimationScaleDown * this.cursorHoverAnimationScaleUp,
                    duration: this.cursorHoldAnimationDuration
                });
            }
            else {
                gsap__default["default"].fromTo((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, { scale: 1 }, { scale: this.cursorHoldAnimationScaleDown, duration: this.cursorHoldAnimationDuration });
            }
        };
        NgxBeautifyCursorComponent.prototype._mouseUp = function () {
            var _a, _b;
            if (this.isHover) {
                gsap__default["default"].fromTo((_a = this.ngxBeautifyCursorCircle) === null || _a === void 0 ? void 0 : _a.nativeElement, { scale: this.cursorHoldAnimationScaleDown * this.cursorHoverAnimationScaleUp }, { scale: this.cursorHoverAnimationScaleUp, duration: this.cursorHoldAnimationDuration });
            }
            else {
                gsap__default["default"].fromTo((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, { scale: this.cursorHoldAnimationScaleDown }, { scale: 1, duration: this.cursorHoldAnimationDuration });
            }
        };
        NgxBeautifyCursorComponent.prototype._leaveHover = function () {
            var _a, _b;
            if (this.hideDotWhileHover)
                gsap__default["default"].to((_a = this.ngxBeautifyCursorDot) === null || _a === void 0 ? void 0 : _a.nativeElement, { scale: 1, duration: 0.2 });
            gsap__default["default"].to((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, { scale: 1, duration: this.cursorHoverAnimationDuration });
        };
        NgxBeautifyCursorComponent.prototype._onHover = function () {
            var _a, _b;
            if (this.hideDotWhileHover)
                gsap__default["default"].to((_a = this.ngxBeautifyCursorDot) === null || _a === void 0 ? void 0 : _a.nativeElement, { scale: 0, duration: 0.2 });
            gsap__default["default"].to((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, {
                scale: this.cursorHoverAnimationScaleUp,
                duration: this.cursorHoverAnimationDuration
            });
        };
        NgxBeautifyCursorComponent.prototype.setStyles = function () {
            var _a, _b, _c, _d, _e, _f, _g;
            (_a = this.ngxBeautifyCursorCircle) === null || _a === void 0 ? void 0 : _a.nativeElement.style.setProperty('--ngx-beautify-cursor--circle--BackgroundColor', this.circleBackgroundColor);
            (_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement.style.setProperty('--ngx-beautify-cursor--circle--BorderColor', this.circleBorderColor);
            (_c = this.ngxBeautifyCursorCircle) === null || _c === void 0 ? void 0 : _c.nativeElement.style.setProperty('--ngx-beautify-cursor--circle--Size', this.circleSizePx + "px");
            (_d = this.ngxBeautifyCursorDot) === null || _d === void 0 ? void 0 : _d.nativeElement.style.setProperty('--ngx-beautify-cursor--zindex', "" + this.zIndex);
            (_e = this.ngxBeautifyCursorCircle) === null || _e === void 0 ? void 0 : _e.nativeElement.style.setProperty('--ngx-beautify-cursor--zindex', "" + this.zIndex);
            (_f = this.ngxBeautifyCursorDot) === null || _f === void 0 ? void 0 : _f.nativeElement.style.setProperty('--ngx-beautify-cursor--dot--Size', this.dotSizeInPx + "px");
            (_g = this.ngxBeautifyCursorDot) === null || _g === void 0 ? void 0 : _g.nativeElement.style.setProperty('--ngx-beautify-cursor--dot--BackgroundColor', this.dotColor);
            if (this.wr.nativeWindow) {
                this.wr.nativeWindow.document.body.style.setProperty('--global--ngx-beautify-cursor', this.defaultCursor);
            }
        };
        NgxBeautifyCursorComponent.prototype._showCursorFirstTime = function () {
            var _a, _b;
            gsap__default["default"].to((_a = this.ngxBeautifyCursorDot) === null || _a === void 0 ? void 0 : _a.nativeElement, { opacity: 1, scale: 1, duration: 0.7 });
            gsap__default["default"].to((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, { opacity: 1, scale: 1, duration: 0.7 });
        };
        return NgxBeautifyCursorComponent;
    }());
    exports.NgxBeautifyCursorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0__namespace, type: exports.NgxBeautifyCursorComponent, deps: [{ token: BrowserWindowRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    exports.NgxBeautifyCursorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.5", type: exports.NgxBeautifyCursorComponent, selector: "ngx-beautify-cursor", inputs: { cursorHoldAnimationDuration: "cursorHoldAnimationDuration", cursorHoldAnimationScaleDown: "cursorHoldAnimationScaleDown", cursorHoverAnimationDuration: "cursorHoverAnimationDuration", cursorHoverAnimationScaleUp: "cursorHoverAnimationScaleUp", defaultCursor: "defaultCursor", nParentsStyleCheck: "nParentsStyleCheck", zIndex: "zIndex", enableHoverAnimation: "enableHoverAnimation", hideDotWhileHover: "hideDotWhileHover", hoverAttributes: "hoverAttributes", circleSizePx: "circleSizePx", circleBorderSizePx: "circleBorderSizePx", circleFollowDuration: "circleFollowDuration", circleBorderColor: "circleBorderColor", circleBackgroundColor: "circleBackgroundColor", dotSizeInPx: "dotSizeInPx", dotFollowDuration: "dotFollowDuration", dotColor: "dotColor" }, viewQueries: [{ propertyName: "ngxBeautifyCursorCircle", first: true, predicate: ["ngxBeautifyCursorCircle"], descendants: true }, { propertyName: "ngxBeautifyCursorDot", first: true, predicate: ["ngxBeautifyCursorDot"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "\n    <div #ngxBeautifyCursorCircle class=\"cursor-circle\"></div>\n    <div #ngxBeautifyCursorDot class=\"cursor-dot\"></div>\n  ", isInline: true, styles: ["div.cursor-circle,div.cursor-dot{--ngx-beautify-cursor--circle--BackgroundColor: hsla(245, 44%, 56%, .08);--ngx-beautify-cursor--circle--BorderColor: #6363af;--ngx-beautify-cursor--circle--BorderSize: 1px;--ngx-beautify-cursor--circle--Border: var(--ngx-beautify-cursor--circle--BorderSize) solid var(--ngx-beautify-cursor--circle--BorderColor);--ngx-beautify-cursor--circle--Size: 40px;--ngx-beautify-cursor--dot--BackgroundColor: hsla(245, 44%, 56%, 1);--ngx-beautify-cursor--dot--Size: 8px;--ngx-beautify-cursor--zindex: 999}::ng-deep *{--global--ngx-beautify-cursor: none;cursor:var(--global--ngx-beautify-cursor)}.cursor-circle{background-color:var(--ngx-beautify-cursor--circle--BackgroundColor);border:var(--ngx-beautify-cursor--circle--Border);width:var(--ngx-beautify-cursor--circle--Size);height:var(--ngx-beautify-cursor--circle--Size);z-index:var(--ngx-beautify-cursor--zindex);border-radius:50%;display:flex;align-items:center;justify-content:center;position:fixed;pointer-events:none;top:0;left:0}.cursor-dot{background-color:var(--ngx-beautify-cursor--dot--BackgroundColor);width:var(--ngx-beautify-cursor--dot--Size);height:var(--ngx-beautify-cursor--dot--Size);z-index:var(--ngx-beautify-cursor--zindex);display:flex;align-items:center;justify-content:center;border-radius:50%;position:fixed;pointer-events:none;top:0;left:0}\n"] });
    exports.NgxBeautifyCursorComponent = __decorate([
        untilDestroy.UntilDestroy()
    ], exports.NgxBeautifyCursorComponent);
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0__namespace, type: exports.NgxBeautifyCursorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-beautify-cursor',
                        template: "\n    <div #ngxBeautifyCursorCircle class=\"cursor-circle\"></div>\n    <div #ngxBeautifyCursorDot class=\"cursor-dot\"></div>\n  ",
                        styleUrls: ['./ngx-beautify-cursor.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: BrowserWindowRef }]; }, propDecorators: { cursorHoldAnimationDuration: [{
                    type: i0.Input
                }], cursorHoldAnimationScaleDown: [{
                    type: i0.Input
                }], cursorHoverAnimationDuration: [{
                    type: i0.Input
                }], cursorHoverAnimationScaleUp: [{
                    type: i0.Input
                }], defaultCursor: [{
                    type: i0.Input
                }], nParentsStyleCheck: [{
                    type: i0.Input
                }], zIndex: [{
                    type: i0.Input
                }], enableHoverAnimation: [{
                    type: i0.Input
                }], hideDotWhileHover: [{
                    type: i0.Input
                }], hoverAttributes: [{
                    type: i0.Input
                }], circleSizePx: [{
                    type: i0.Input
                }], circleBorderSizePx: [{
                    type: i0.Input
                }], circleFollowDuration: [{
                    type: i0.Input
                }], circleBorderColor: [{
                    type: i0.Input
                }], circleBackgroundColor: [{
                    type: i0.Input
                }], dotSizeInPx: [{
                    type: i0.Input
                }], dotFollowDuration: [{
                    type: i0.Input
                }], dotColor: [{
                    type: i0.Input
                }], ngxBeautifyCursorCircle: [{
                    type: i0.ViewChild,
                    args: ['ngxBeautifyCursorCircle']
                }], ngxBeautifyCursorDot: [{
                    type: i0.ViewChild,
                    args: ['ngxBeautifyCursorDot']
                }] } });

    var NgxBeautifyCursorModule = /** @class */ (function () {
        function NgxBeautifyCursorModule() {
        }
        return NgxBeautifyCursorModule;
    }());
    NgxBeautifyCursorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0__namespace, type: NgxBeautifyCursorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    NgxBeautifyCursorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0__namespace, type: NgxBeautifyCursorModule, declarations: [exports.NgxBeautifyCursorComponent], exports: [exports.NgxBeautifyCursorComponent] });
    NgxBeautifyCursorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0__namespace, type: NgxBeautifyCursorModule, imports: [[]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0__namespace, type: NgxBeautifyCursorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [exports.NgxBeautifyCursorComponent],
                        imports: [],
                        exports: [exports.NgxBeautifyCursorComponent]
                    }]
            }] });

    /*
     * Public API Surface of ngx-beautify-cursor
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxBeautifyCursorModule = NgxBeautifyCursorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-beautify-cursor.umd.js.map
