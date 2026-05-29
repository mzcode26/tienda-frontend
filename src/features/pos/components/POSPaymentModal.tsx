import { useState } from 'react';
import type { ReactNode } from 'react';
import { Banknote, CreditCard, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '../../sales/stores/cart.store';
import { useCreateSale } from '../../sales/hooks/useSales';
import type { SalePaymentMethod } from '../../sales/types/sales.types';

interface Props {
  isOpen: boolean;
  customerId: string | null;
  storeId: string;
  onClose: () => void;
  onSuccess: () => void;
}

type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER';

const PAYMENT_METHODS: { value: PaymentMethod; label: string; icon: ReactNode }[] = [
  { value: 'CASH', label: 'Efectivo', icon: <Banknote className="h-5 w-5" /> },
  { value: 'CARD', label: 'Tarjeta', icon: <CreditCard className="h-5 w-5" /> },
  { value: 'TRANSFER', label: 'Transferencia', icon: <Smartphone className="h-5 w-5" /> },
];

export function PaymentModal({ isOpen, customerId, storeId, onClose, onSuccess }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [cashReceived, setCashReceived] = useState('');
  const { items, getTotal, clearCart } = useCartStore();
  const createSale = useCreateSale();

  const total = getTotal();
  const change = paymentMethod === 'CASH' ? Math.max(0, Number(cashReceived) - total) : 0;

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      if (paymentMethod === 'CASH' && Number(cashReceived) < total) {
        toast.error('El efectivo recibido es insuficiente');
        return;
      }

      await createSale.mutateAsync({
        storeId,
        customerId: customerId ?? undefined,
        items: items.map((i) => ({
          variantId: i.variantId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          discount: i.discountAmount,
        })),
        payments: [
          {
            method: paymentMethod as SalePaymentMethod,
            amount: total,
          },
        ],
      });

      clearCart();
      setCashReceived('');
      setPaymentMethod('CASH');
      toast.success('Venta registrada exitosamente');
      onSuccess();
    } catch {
      toast.error('Error al procesar la venta');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">Confirmar Pago</h2>

        <div className="mb-4 rounded-lg bg-gray-50 p-4">
          <div className="mb-1 flex justify-between text-sm text-gray-600">
            <span>{items.length} producto(s)</span>
            <span>{items.reduce((a, i) => a + i.quantity, 0)} unidades</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-indigo-600">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Método de pago</p>
          <div className="grid grid-cols-3 gap-2">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.value}
                onClick={() => setPaymentMethod(m.value)}
                className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 transition-colors ${
                  paymentMethod === m.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {m.icon}
                <span className="text-xs font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {paymentMethod === 'CASH' && (
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Efectivo recibido</label>
            <input
              type="number"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              placeholder={`Mínimo $${total.toFixed(2)}`}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {Number(cashReceived) >= total && (
              <p className="mt-1 text-sm font-medium text-green-600">Vuelto: ${change.toFixed(2)}</p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border px-4 py-2.5 text-sm hover:bg-gray-50"
          >
            Cancelar
          </button>

          <button
            onClick={handleConfirm}
            disabled={createSale.isPending || (paymentMethod === 'CASH' && Number(cashReceived) < total)}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {createSale.isPending ? 'Procesando...' : 'Confirmar Venta'}
          </button>
        </div>
      </div>
    </div>
  );
}