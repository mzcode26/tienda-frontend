"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSelector = CustomerSelector;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var axios_1 = require("../../../../lib/axios");
function CustomerSelector(_a) {
    var _this = this;
    var selectedCustomer = _a.selectedCustomer, onSelect = _a.onSelect;
    var _b = (0, react_1.useState)(''), query = _b[0], setQuery = _b[1];
    var _c = (0, react_1.useState)([]), results = _c[0], setResults = _c[1];
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    (0, react_1.useEffect)(function () {
        if (query.length < 2) {
            setResults([]);
            return;
        }
        var timer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var data, _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get('/customers', { params: { search: query, limit: 5 } })];
                    case 1:
                        data = (_d.sent()).data;
                        setResults((_c = (_b = data.data) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : []);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _d.sent();
                        setResults([]);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }, 300);
        return function () { return clearTimeout(timer); };
    }, [query]);
    if (selectedCustomer) {
        return (<div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
        <div className="flex items-center gap-2">
          <lucide_react_1.User className="h-4 w-4 text-indigo-600"/>
          <div>
            <p className="text-sm font-medium text-indigo-900">
              {selectedCustomer.firstName} {selectedCustomer.lastName}
            </p>
            {selectedCustomer.email && (<p className="text-xs text-indigo-600">{selectedCustomer.email}</p>)}
          </div>
        </div>
        <button onClick={function () { return onSelect(null); }} className="text-indigo-400 hover:text-indigo-600">
          <lucide_react_1.X className="h-4 w-4"/>
        </button>
      </div>);
    }
    return (<div className="relative">
      <input value={query} onChange={function (e) { setQuery(e.target.value); setIsOpen(true); }} onFocus={function () { return setIsOpen(true); }} placeholder="Buscar cliente (opcional)..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
      {isOpen && results.length > 0 && (<div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {results.map(function (c) { return (<button key={c.id} onClick={function () { onSelect(c); setQuery(''); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left border-b last:border-0">
              <lucide_react_1.User className="h-4 w-4 text-gray-400 flex-shrink-0"/>
              <div>
                <p className="text-sm font-medium">{c.firstName} {c.lastName}</p>
                {c.email && <p className="text-xs text-gray-500">{c.email}</p>}
              </div>
            </button>); })}
        </div>)}
    </div>);
}
