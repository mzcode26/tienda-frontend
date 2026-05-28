"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = POSPage;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var useSettings_1 = require("../../settings/hooks/useSettings");
var useInventory_1 = require("../../inventory/hooks/useInventory");
var InventoryProductsTable_1 = require("../../../shared/InventoryProductsTable");
var StoreSelector_1 = require("../../../shared/StoreSelector");
var POSCart_1 = require("../components/POSCart");
var POSItemModal_1 = require("../components/POSItemModal");
var POSPaymentModal_1 = require("../components/POSPaymentModal");
var POSCustomerModal_1 = require("../components/POSCustomerModal");
var pos_cart_store_1 = require("../stores/pos-cart.store");
function POSPage() {
    var _a;
    /**
     * STORE
     */
    var _b = (0, react_1.useState)(''), selectedStoreId = _b[0], setSelectedStoreId = _b[1];
    /**
     * SEARCH
     */
    var _c = (0, react_1.useState)(''), searchTerm = _c[0], setSearchTerm = _c[1];
    /**
     * PRODUCT MODAL
     */
    var _d = (0, react_1.useState)(null), selectedItem = _d[0], setSelectedItem = _d[1];
    var _e = (0, react_1.useState)(false), itemModalOpen = _e[0], setItemModalOpen = _e[1];
    /**
     * PAYMENT
     */
    var _f = (0, react_1.useState)(false), paymentOpen = _f[0], setPaymentOpen = _f[1];
    /**
     * CUSTOMER MODAL
     */
    var _g = (0, react_1.useState)(false), customerModalOpen = _g[0], setCustomerModalOpen = _g[1];
    /**
     * CART
     */
    var _h = (0, pos_cart_store_1.usePOSCartStore)(), addItem = _h.addItem, clearCart = _h.clearCart, customer = _h.customer, setCustomer = _h.setCustomer;
    /**
     * STORES
     */
    var _j = (0, useSettings_1.useStores)(false), storesData = _j.data, storesLoading = _j.isLoading;
    var activeStores = (_a = storesData === null || storesData === void 0 ? void 0 : storesData.filter(function (store) {
        return store.isActive;
    })) !== null && _a !== void 0 ? _a : [];
    /**
     * AUTOSELECT STORE
     */
    (0, react_1.useEffect)(function () {
        if (!selectedStoreId &&
            activeStores.length > 0) {
            setSelectedStoreId(activeStores[0].id);
        }
    }, [
        selectedStoreId,
        activeStores,
    ]);
    /**
     * RESET SEARCH
     */
    (0, react_1.useEffect)(function () {
        setSearchTerm('');
    }, [selectedStoreId]);
    /**
     * INVENTORY
     */
    var _k = (0, useInventory_1.useInventoryByStore)(selectedStoreId, Boolean(selectedStoreId)), _l = _k.data, inventoryItems = _l === void 0 ? [] : _l, inventoryLoading = _k.isLoading, inventoryFetching = _k.isFetching;
    /**
     * FILTERED ITEMS
     */
    var filteredInventoryItems = (0, react_1.useMemo)(function () {
        var term = searchTerm
            .trim()
            .toLowerCase();
        if (!term) {
            return inventoryItems;
        }
        return inventoryItems.filter(function (item) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            var productName = (_g = (_e = (_c = (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : (_d = item.variant) === null || _d === void 0 ? void 0 : _d.productName) !== null && _e !== void 0 ? _e : (_f = item.variant) === null || _f === void 0 ? void 0 : _f.variantName) !== null && _g !== void 0 ? _g : '';
            var sku = (_j = (_h = item.variant) === null || _h === void 0 ? void 0 : _h.sku) !== null && _j !== void 0 ? _j : '';
            return (productName
                .toLowerCase()
                .includes(term) ||
                sku
                    .toLowerCase()
                    .includes(term));
        });
    }, [
        inventoryItems,
        searchTerm,
    ]);
    /**
     * OPEN ITEM MODAL
     */
    var handleAddToSale = function (item) {
        setSelectedItem(item);
        setItemModalOpen(true);
    };
    /**
     * CLOSE ITEM MODAL
     */
    var handleCloseItemModal = function () {
        setSelectedItem(null);
        setItemModalOpen(false);
    };
    /**
     * CONFIRM ITEM
     */
    var handleConfirmItem = function (payload) {
        addItem(payload);
    };
    /**
     * CHECKOUT
     */
    var handleCheckout = function () {
        if (!selectedStoreId) {
            return;
        }
        setPaymentOpen(true);
    };
    /**
     * CUSTOMER
     */
    var handleSelectCustomer = function () {
        setCustomerModalOpen(true);
    };
    var handleRemoveCustomer = function () {
        setCustomer(null);
    };
    return (<div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* LEFT PANEL */}
      <div className="flex flex-1 flex-col border-r bg-white">
        {/* HEADER */}
        <div className="border-b bg-white p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <lucide_react_1.Store className="h-6 w-6 text-blue-600"/>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Punto de Venta
              </h1>

              <p className="text-sm text-gray-500">
                Selecciona productos y registra ventas
              </p>
            </div>
          </div>

          {/* STORE SELECTOR */}
          <div className="mb-4">
            <StoreSelector_1.StoreSelector value={selectedStoreId} onChange={setSelectedStoreId} stores={activeStores} loading={storesLoading}/>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <lucide_react_1.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>

            <input type="text" value={searchTerm} onChange={function (e) {
            return setSearchTerm(e.target.value);
        }} placeholder="Buscar producto o SKU..." className="w-full rounded-xl border py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="flex-1 overflow-hidden p-4">
          <InventoryProductsTable_1.InventoryProductsTable items={filteredInventoryItems} isLoading={inventoryLoading ||
            inventoryFetching} mode="pos" onAddToSale={handleAddToSale}/>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[420px] border-l bg-white">
        <POSCart_1.POSCart onCheckout={handleCheckout} onClear={function () {
            clearCart();
        }} onSelectCustomer={handleSelectCustomer} onRemoveCustomer={handleRemoveCustomer}/>
      </div>

      {/* ITEM MODAL */}
      <POSItemModal_1.POSItemModal isOpen={itemModalOpen} item={selectedItem} onClose={handleCloseItemModal} onConfirm={handleConfirmItem}/>

      {/* PAYMENT */}
      <POSPaymentModal_1.POSPaymentModal isOpen={paymentOpen} storeId={selectedStoreId} onClose={function () {
            return setPaymentOpen(false);
        }} onSuccess={function () {
            return setPaymentOpen(false);
        }}/>

      {/* CUSTOMER SELECTOR */}
    <POSCustomerModal_1.POSCustomerModal isOpen={customerModalOpen} selectedCustomer={customer} onClose={function () { return setCustomerModalOpen(false); }} onSelect={function (selectedCustomer) {
            setCustomer(selectedCustomer);
        }}/>
    </div>);
}
