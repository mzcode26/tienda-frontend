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
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var useProducts_1 = require("../features/products/hooks/useProducts");
var ProductsTable_1 = require("../features/products/components/ProductsTable");
var ProductFilters_1 = require("../features/products/components/ProductFilters");
var CategoryModal_1 = require("../features/products/components/CategoryModal");
var BrandModal_1 = require("../features/products/components/BrandModal");
var ProductsPage = function () {
    var _a = (0, react_1.useState)({
        page: 1,
        limit: 20,
    }), filters = _a[0], setFilters = _a[1];
    var _b = (0, react_1.useState)(false), showCategoryModal = _b[0], setShowCategoryModal = _b[1];
    var _c = (0, react_1.useState)(false), showBrandModal = _c[0], setShowBrandModal = _c[1];
    var _d = (0, react_1.useState)(null), deletingProduct = _d[0], setDeletingProduct = _d[1];
    var _e = (0, useProducts_1.useProducts)(filters), productsResponse = _e.data, isLoading = _e.isLoading;
    var deleteProduct = (0, useProducts_1.useDeleteProduct)();
    var categories = [];
    var brands = [];
    var categoryOptions = categories.map(function (category) { return ({
        id: category.id,
        name: category.name,
    }); });
    var brandOptions = brands.map(function (brand) { return ({
        id: brand.id,
        name: brand.name,
    }); });
    var productRows = (0, react_1.useMemo)(function () {
        if (Array.isArray(productsResponse))
            return productsResponse;
        if (productsResponse &&
            typeof productsResponse === 'object' &&
            'data' in productsResponse &&
            Array.isArray(productsResponse.data)) {
            return productsResponse.data;
        }
        if (productsResponse &&
            typeof productsResponse === 'object' &&
            'items' in productsResponse &&
            Array.isArray(productsResponse.items)) {
            return productsResponse.items;
        }
        return [];
    }, [productsResponse]);
    var handleEditProduct = function (_product) {
        // TODO: abrir modal o formulario de edición
    };
    var handleDeleteProduct = function (id) {
        var product = productRows.find(function (item) { return item.id === id; });
        if (product) {
            setDeletingProduct(product);
        }
    };
    var handleAddVariant = function (_product) {
        // TODO: abrir modal para agregar variante
    };
    var handleEditVariant = function (_product, _variant) {
        // TODO: abrir modal para editar variante
    };
    var handleViewDetail = function (_product) {
        // TODO: abrir modal de detalle
    };
    var confirmDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!deletingProduct)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, deleteProduct.mutateAsync(deletingProduct.id)];
                case 2:
                    _a.sent();
                    setDeletingProduct(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleCreateProduct = function () {
        // TODO: abrir modal o formulario de creación
    };
    if (isLoading) {
        return <div className="p-4 text-sm text-gray-500">Cargando...</div>;
    }
    return (<div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona tu catálogo de productos, categorías y marcas
          </p>
        </div>

        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button onClick={function () { return setShowCategoryModal(true); }} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
            Nueva Categoría
          </button>

          <button onClick={function () { return setShowBrandModal(true); }} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
            Nueva Marca
          </button>

          <button onClick={handleCreateProduct} className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
            Nuevo Producto
          </button>
        </div>
      </div>

      <ProductFilters_1.ProductFilters filters={filters} onChange={setFilters} categoryOptions={categoryOptions} brandOptions={brandOptions}/>

      <ProductsTable_1.ProductsTable products={productRows} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} onAddVariant={handleAddVariant} onEditVariant={handleEditVariant} onViewDetail={handleViewDetail}/>

      {showCategoryModal && (<CategoryModal_1.CategoryModal open={showCategoryModal} onClose={function () { return setShowCategoryModal(false); }} onSuccess={function () {
                setShowCategoryModal(false);
            }}/>)}

      {showBrandModal && (<BrandModal_1.BrandModal open={showBrandModal} onClose={function () { return setShowBrandModal(false); }} onSuccess={function () {
                setShowBrandModal(false);
            }}/>)}

      {deletingProduct && (<div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <lucide_react_1.AlertTriangle className="h-6 w-6 text-red-600"/>
                  </div>

                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Eliminar Producto
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ¿Estás seguro de que quieres eliminar "{deletingProduct.name}"?
                        Esta acción no se puede deshacer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" onClick={confirmDelete} disabled={deleteProduct.isPending} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:ml-3 sm:w-auto sm:text-sm">
                  {deleteProduct.isPending ? 'Eliminando...' : 'Eliminar'}
                </button>

                <button type="button" onClick={function () { return setDeletingProduct(null); }} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>)}
    </div>);
};
exports.default = ProductsPage;
