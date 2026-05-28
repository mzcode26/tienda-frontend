"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsTable = ProductsTable;
function ProductsTable(_a) {
    var products = _a.products, onEditProduct = _a.onEditProduct, onDeleteProduct = _a.onDeleteProduct, onAddVariant = _a.onAddVariant, onEditVariant = _a.onEditVariant, onViewDetail = _a.onViewDetail;
    if (!products.length) {
        return (<div className="p-6 text-sm text-gray-500">
        No hay productos cargados.
      </div>);
    }
    return (<table className="w-full text-left">
      <thead className="border-b text-gray-800 text-sm">
        <tr>
          <th className="px-4 py-3">Nombre</th>
          <th className="px-4 py-3">Categoría</th>
          <th className="px-4 py-3">Marca</th>
          <th className="px-4 py-3">Estado</th>
          <th className="px-4 py-3">Variantes</th>
          <th className="px-4 py-3">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {products.map(function (product) {
            var _a, _b, _c, _d, _e, _f, _g;
            return (<tr key={product.id} className="border-b text-sm text-gray-700">
            <td className="px-4 py-3">
              <div className="font-medium">{product.name}</div>
              <div className="text-xs">{product.slug}</div>
            </td>

            <td className="px-4 py-3 text-gray-800">
              {(_b = (_a = product.category) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '-'}
            </td>

            <td className="px-4 py-3">
              {(_d = (_c = product.brand) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '-'}
            </td>

            <td className="px-4 py-3">
              {product.isActive ? 'Activo' : 'Inactivo'}
            </td>

            <td className="px-4 py-3">
              {(_f = (_e = product.variants) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0}
            </td>

            <td className="px-4 py-3">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={function () { return onViewDetail(product); }} className="rounded-lg border px-3 py-1 text-xs">
                  Ver
                </button>

                <button type="button" onClick={function () { return onEditProduct(product); }} className="rounded-lg border px-3 py-1 text-xs">
                  Editar
                </button>

                <button type="button" onClick={function () { return onAddVariant(product); }} className="rounded-lg border px-3 py-1 text-xs">
                  Agregar variante
                </button>

                <button type="button" onClick={function () { return onDeleteProduct(product.id); }} className="rounded-lg border px-3 py-1 text-xs text-red-600">
                  Eliminar
                </button>
              </div>

              {((_g = product.variants) === null || _g === void 0 ? void 0 : _g.length) ? (<div className="mt-2 flex flex-wrap gap-2">
                  {product.variants.map(function (variant) { return (<button key={variant.id} type="button" onClick={function () { return onEditVariant(product, variant); }} className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                      {variant.sku}
                    </button>); })}
                </div>) : null}
            </td>
          </tr>);
        })}
      </tbody>
    </table>);
}
