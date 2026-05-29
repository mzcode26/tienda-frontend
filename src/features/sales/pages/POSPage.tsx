import { useEffect, useMemo, useState } from 'react';
import { ProductSearch } from '../components/pos/ProductSearch';
import { Cart } from '../components/pos/Cart';
import { useCartStore } from '../stores/cart.store';
import type { POSProduct } from '../types/sales.types';
import { useStores } from '../../settings/hooks/useSettings';

export default function POSPage() {
  const { data: stores = [], isLoading: storesLoading } = useStores();
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!selectedStoreId && stores.length > 0) {
      setSelectedStoreId(stores[0].id);
    }
  }, [stores, selectedStoreId]);

  const selectedStore = useMemo(
    () => stores.find((store) => store.id === selectedStoreId) ?? null,
    [stores, selectedStoreId]
  );

  const handleSelectProduct = (product: POSProduct) => {
    addItem({
      variantId: product.variantId,
      sku: product.sku,
      productName: product.productName,
      size: product.size,
      color: product.color,
      unitPrice: product.unitPrice,
      stock: product.stock,
    });
  };

  return (
    <div className="grid h-[calc(100vh-120px)] grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.9fr]">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="rounded-xl border bg-white p-4">
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Punto de Venta</h1>
              <p className="text-sm text-gray-500">Busca productos, agrégalos al carrito y cobra.</p>
            </div>

            <div className="min-w-[240px]">
              <label className="mb-1 block text-sm font-medium text-gray-700">Sucursal</label>
              <select
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={storesLoading}
              >
                <option value="">Seleccionar sucursal</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ProductSearch onSelect={handleSelectProduct} />
        </div>

        {!selectedStore && !storesLoading && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            No hay sucursales disponibles o aún no seleccionaste una.
          </div>
        )}
      </div>

      <div className="min-h-0">
        <Cart storeId={selectedStoreId} />
      </div>
    </div>
  );
}