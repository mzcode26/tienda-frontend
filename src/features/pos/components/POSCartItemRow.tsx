import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../sales/types/sales.types';

interface Props {
  item: CartItem;
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemove: (variantId: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: Props) {
  return (
    <div className="flex items-center gap-3 border-b py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">{item.productName}</p>
        <p className="text-xs text-gray-500">
          SKU: {item.sku}
          {item.size && ` · ${item.size}`}
          {item.color && ` · ${item.color}`}
        </p>
        <p className="text-xs font-medium text-indigo-600">${item.unitPrice.toFixed(2)} c/u</p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
          className="flex h-6 w-6 items-center justify-center rounded-full border hover:bg-gray-100 disabled:opacity-40"
          disabled={item.quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </button>

        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

        <button
          onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
          className="flex h-6 w-6 items-center justify-center rounded-full border hover:bg-gray-100 disabled:opacity-40"
          disabled={item.quantity >= item.stock}
          title={item.quantity >= item.stock ? 'Sin stock disponible' : 'Agregar unidad'}
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <div className="min-w-[70px] text-right">
        <p className="text-sm font-semibold">${item.subtotal.toFixed(2)}</p>
      </div>

      <button onClick={() => onRemove(item.variantId)} className="text-red-400 hover:text-red-600">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}