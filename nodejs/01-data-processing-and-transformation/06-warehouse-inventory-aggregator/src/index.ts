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

function calculateStatus(item: {
  availableQuantity: number;
  restockThreshold?: number
}, lowStockThreshold: number): "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" {
  if (item.availableQuantity <= 0) {
    return 'OUT_OF_STOCK';
  }

  if (item.restockThreshold && item.availableQuantity <= item.restockThreshold) {
    return 'LOW_STOCK';
  }

  if (lowStockThreshold && item.availableQuantity <= lowStockThreshold) {
    return 'LOW_STOCK';
  }

  return 'IN_STOCK';
}

export function aggregateInventory(
  warehouseInventories: WarehouseInventory[],
  options: InventoryAggregateOptions = {}
): InventoryAggregateResult {
  const { activeOnly, lowStockThreshold = 0 } = options;
  if (!warehouseInventories.length) {
    return {
      products: [],
      outOfStockCount: 0,
      lowStockCount: 0,
      needsRestockCount: 0,
      totalInventoryCount: 0,
    };
  }
  const inventoryAggregate: InventoryAggregateResult = {
    products: [],
    outOfStockCount: 0,
    lowStockCount: 0,
    needsRestockCount: 0,
    totalInventoryCount: 0,
  };
  for (const warehouseInventory of warehouseInventories) {
    for (const product of warehouseInventory.products) {
      if (activeOnly && !product.isActive) {
        continue;
      }
      const productEntry = inventoryAggregate.products.find((p) => {
        return p.sku === product.sku;
      });
      if (!productEntry) {
        // create a products entry
        const status = calculateStatus({
          availableQuantity: product.available,
          restockThreshold: product.restockThreshold,
        }, lowStockThreshold)
        inventoryAggregate.products.push({
          availableQuantity: product.available,
          damagedQuantity: product.damaged || 0,
          needsRestock: product.available - product.restockThreshold <= 0,
          reservedQuantity: product.reserved,
          status: status,
          stockLocation: [
            {
              warehouseId: warehouseInventory.warehouseId,
              location: warehouseInventory.location,
              quantity: product.quantity,
            },
          ],
          totalQuantity: product.quantity,
          sku: product.sku,
        });
        if (product.available - product.restockThreshold <= 0) {
          inventoryAggregate.needsRestockCount += 1;
        }
        if (status === 'LOW_STOCK') {
          inventoryAggregate.lowStockCount += 1;
        }

        if (status === 'OUT_OF_STOCK') {
          inventoryAggregate.outOfStockCount += 1;
        }
      } else {
        productEntry.availableQuantity += product.available;
        productEntry.totalQuantity += product.quantity;
        productEntry.damagedQuantity += product.damaged;
        productEntry.needsRestock = productEntry.availableQuantity - product.restockThreshold <= 0;
        productEntry.reservedQuantity += product.reserved;
        productEntry.status = calculateStatus(productEntry, lowStockThreshold);
        productEntry.stockLocation.push({
          warehouseId: warehouseInventory.warehouseId,
          location: warehouseInventory.location,
          quantity: product.quantity,
        });
        if (productEntry.needsRestock) {
          inventoryAggregate.needsRestockCount += 1;
        }
        if (productEntry.status === 'LOW_STOCK') {
          inventoryAggregate.lowStockCount += 1;
        }
        if (productEntry.status === 'OUT_OF_STOCK') {
          inventoryAggregate.outOfStockCount += 1;
        }
      }
      inventoryAggregate.totalInventoryCount += product.quantity;
    }
  }
  return inventoryAggregate;
}
