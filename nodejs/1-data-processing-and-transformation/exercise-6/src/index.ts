export type WarehouseInventory = {
  warehouseId: string;
  location: string;
  products: {
    sku: string;
    quantity: number;
    available: number; // May be less than quantity due to holds/reserves
    reserved: number;
    damaged: number;
    restockThreshold: number;
    isActive: boolean;
  }[];
};

export type ProductInventoryStatus = {
  sku: string;
  totalQuantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  damagedQuantity: number;
  needsRestock: boolean;
  stockLocation: {
    warehouseId: string;
    location: string;
    quantity: number;
  }[];
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
};

export type InventoryAggregateOptions = {
  // If true, excludes warehouses with isActive: false products
  activeOnly?: boolean;
  // Custom threshold for "LOW_STOCK" status
  lowStockThreshold?: number;
};

export type InventoryAggregateResult = {
  products: ProductInventoryStatus[];
  outOfStockCount: number;
  lowStockCount: number;
  needsRestockCount: number;
  totalInventoryCount: number;
};

export function aggregateInventory(
  warehouseInventories: WarehouseInventory[],
  options: InventoryAggregateOptions = {}
): InventoryAggregateResult {
  throw new Error('Not implemented');
}
