import { useState } from 'react';
import { useCartStore } from '../../stores/cart.store';
import { CartItemRow } from './CartItemRow';
import { PaymentModal } from './PaymentModal';

interface Props {
  storeId: string;
}

export function Cart({ storeId }: Props) {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { items, total, itemCount, customerId, updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex h-full flex-col rounded-xl border bg-white">
      <div className="border-b px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Carrito ({itemCount} unidades)</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {items.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-400">Carrito vacío</div>
        ) : (
          items.map((item) => (
            <CartItemRow
              key={item.variantId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))
        )}
      </div>

      <div className="border-t p-4">
        <div className="mb-3 flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => setIsPaymentOpen(true)}
          disabled={!items.length || !storeId}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Cobrar ${total.toFixed(2)}
        </button>
      </div>

      <PaymentModal
        isOpen={isPaymentOpen}
        customerId={customerId}
        storeId={storeId}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={() => setIsPaymentOpen(false)}
      />
    </div>
  );
}