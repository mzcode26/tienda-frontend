"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function () {
        return { hasError: true };
    };
    ErrorBoundary.prototype.componentDidCatch = function (_error, _errorInfo) {
        // Log error to monitoring service if needed
        // console.error(error, errorInfo);
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            return (<div className="m-6 rounded-3xl border border-red-700 bg-red-950/80 p-8 text-red-100">
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          <p className="mt-2 text-slate-300">Please refresh the page or contact support.</p>
        </div>);
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(react_1.default.Component));
exports.default = ErrorBoundary;
