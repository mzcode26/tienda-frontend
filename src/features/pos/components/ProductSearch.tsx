import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import api from '../../../lib/axios';
import type { POSProduct } from '../../sales/types/sales.types';

interface Props {
  onSelect: (variant: POSProduct) => void;
}

export function ProductSearch({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<POSProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/pos/search', { params: { q: query } });
        const payload = response.data;
        const list = Array.isArray(payload) ? payload : payload?.data ?? [];
        setResults(list);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, SKU o código..."
          className="w-full rounded-lg border px-3 py-2.5 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
          {results.map((variant) => (
            <button
              key={variant.variantId}
              onClick={() => {
                onSelect(variant);
                setQuery('');
                setResults([]);
              }}
              className="flex w-full items-center justify-between border-b px-4 py-3 text-left last:border-0 hover:bg-gray-50"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{variant.productName}</p>
                <p className="text-xs text-gray-500">
                  SKU: {variant.sku}
                  {variant.size && ` · Talle: ${variant.size}`}
                  {variant.color && ` · Color: ${variant.color}`}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-indigo-600">
                  ${variant.unitPrice.toFixed(2)}
                </p>
                <p className={`text-xs ${variant.stock <= 0 ? 'text-red-500' : 'text-gray-400'}`}>
                  Stock: {variant.stock}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border bg-white p-3 text-center text-sm text-gray-400 shadow-lg">
          Buscando...
        </div>
      )}
    </div>
  );
}