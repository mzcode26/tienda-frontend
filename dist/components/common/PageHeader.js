"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageHeader = function (_a) {
    var title = _a.title, subtitle = _a.subtitle;
    return (<div className="mb-8 flex flex-col gap-2">
    <h2 className="text-3xl font-semibold text-white">{title}</h2>
    {subtitle ? <p className="text-slate-400">{subtitle}</p> : null}
  </div>);
};
exports.default = PageHeader;
