"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingSpinner = void 0;
var sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
};
var LoadingSpinner = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'md' : _b, _c = _a.fullScreen, fullScreen = _c === void 0 ? false : _c;
    return (<div className={"flex items-center justify-center ".concat(fullScreen ? 'min-h-screen' : 'min-h-[240px]', " px-4 py-6")}>
    <div className={"animate-spin rounded-full border-gray-300 border-t-blue-600 ".concat(sizes[size])}/>
  </div>);
};
exports.LoadingSpinner = LoadingSpinner;
exports.default = exports.LoadingSpinner;
