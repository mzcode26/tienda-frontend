"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lucide_react_1 = require("lucide-react");
var ErrorMessage = function (_a) {
    var message = _a.message, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div className={"rounded-2xl border border-red-700 bg-red-950/90 p-4 text-red-100 ".concat(className)}>
    <div className="flex items-start gap-3">
      <lucide_react_1.AlertTriangle className="mt-1 h-5 w-5 text-red-400"/>
      <p className="text-sm leading-6">{message}</p>
    </div>
  </div>);
};
exports.default = ErrorMessage;
