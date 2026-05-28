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
exports.ProductSearch = ProductSearch;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var axios_1 = require("../../../lib/axios");
function unwrapProducts(payload) {
    var _a, _b;
    if (Array.isArray(payload))
        return payload;
    if (payload && typeof payload === 'object') {
        var p = payload;
        if (Array.isArray(p.items))
            return p.items;
        if (Array.isArray((_a = p.data) === null || _a === void 0 ? void 0 : _a.items))
            return p.data.items;
        if (Array.isArray((_b = p.data) === null || _b === void 0 ? void 0 : _b.data))
            return p.data.data;
    }
    return [];
}
function ProductSearch(_a) {
    var _this = this;
    var storeId = _a.storeId, onSelect = _a.onSelect;
    var _b = (0, react_1.useState)(''), query = _b[0], setQuery = _b[1];
    var _c = (0, react_1.useState)([]), results = _c[0], setResults = _c[1];
    var _d = (0, react_1.useState)(false), isLoading = _d[0], setIsLoading = _d[1];
    (0, react_1.useEffect)(function () {
        var q = query.trim();
        if (q.length < 2 || !storeId) {
            setResults([]);
            return;
        }
        var timer = window.setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        console.log('BUSCANDO POS =>', { q: q, storeId: storeId });
                        return [4 /*yield*/, axios_1.default.get('/pos/search', {
                                params: { q: q, storeId: storeId },
                            })];
                    case 2:
                        data = (_a.sent()).data;
                        console.log('RESPUESTA POS =>', data);
                        setResults(unwrapProducts(data === null || data === void 0 ? void 0 : data.data));
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error buscando productos POS', error_1);
                        setResults([]);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); }, 300);
        return function () { return window.clearTimeout(timer); };
    }, [query, storeId]);
    return (<div className="relative">
      <div className="relative">
        <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
        <input value={query} onChange={function (e) { return setQuery(e.target.value); }} placeholder="Buscar producto... (F2)" className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
      </div>

      {isLoading && (<div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-3 text-center text-sm text-gray-400">
          Buscando...
        </div>)}

      {results.length > 0 && (<div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {results.map(function (variant) { return (<button key={variant.variantId} onClick={function () {
                    onSelect(variant);
                    setQuery('');
                    setResults([]);
                }} className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left border-b last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{variant.productName}</p>
                <p className="text-xs text-gray-500">
                  SKU: {variant.sku}
                  {variant.size && " \u00B7 Talle: ".concat(variant.size)}
                  {variant.color && " \u00B7 Color: ".concat(variant.color)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-indigo-600">${variant.price.toFixed(2)}</p>
                <p className={"text-xs ".concat(variant.stock <= 0 ? 'text-red-500' : 'text-gray-400')}>
                  Stock: {variant.stock}
                </p>
              </div>
            </button>); })}
        </div>)}
    </div>);
}
