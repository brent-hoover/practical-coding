import { describe, it, expect } from 'vitest';
import { aggregateInventory, type WarehouseInventory } from './index.js';

describe('aggregateInventory', () => {
  it('should handle empty warehouse list', () => {
    const result = aggregateInventory([]);
    expect(result).toEqual({
      products: [],
      outOfStockCount: 0,
      lowStockCount: 0,
      needsRestockCount: 0,
      totalInventoryCount: 0
    });
  });

  it('should aggregate single warehouse inventory', () => {
    const inventory: WarehouseInventory[] = [{
      warehouseId: 'WH1',
      location: 'New York',
      products: [
        {
          sku: 'SHIRT-RED-M',
          quantity: 100,
          available: 95,
          reserved: 5,
          damaged: 0,
          restockThreshold: 20,
          isActive: true
        }
      ]
    }];

    const result = aggregateInventory(inventory);
    expect(result.products[0]).toEqual({
      sku: 'SHIRT-RED-M',
      totalQuantity: 100,
      availableQuantity: 95,
      reservedQuantity: 5,
      damagedQuantity: 0,
      needsRestock: false,
      stockLocation: [{
        warehouseId: 'WH1',
        location: 'New York',
        quantity: 100
      }],
      status: 'IN_STOCK'
    });
    expect(result.totalInventoryCount).toBe(100);
  });

  it('should aggregate inventory across multiple warehouses', () => {
    const inventory: WarehouseInventory[] = [
      {
        warehouseId: 'WH1',
        location: 'New York',
        products: [
          {
            sku: 'SHIRT-RED-M',
            quantity: 50,
            available: 45,
            reserved: 5,
            damaged: 0,
            restockThreshold: 20,
            isActive: true
          }
        ]
      },
      {
        warehouseId: 'WH2',
        location: 'Los Angeles',
        products: [
          {
            sku: 'SHIRT-RED-M',
            quantity: 30,
            available: 25,
            reserved: 3,
            damaged: 2,
            restockThreshold: 20,
            isActive: true
          }
        ]
      }
    ];

    const result = aggregateInventory(inventory);
    const product = result.products.find(p => p.sku === 'SHIRT-RED-M');
    expect(product).toBeDefined();
    expect(product?.totalQuantity).toBe(80);
    expect(product?.availableQuantity).toBe(70);
    expect(product?.reservedQuantity).toBe(8);
    expect(product?.damagedQuantity).toBe(2);
    expect(product?.stockLocation).toHaveLength(2);
  });

  it('should identify products needing restock', () => {
    const inventory: WarehouseInventory[] = [{
      warehouseId: 'WH1',
      location: 'New York',
      products: [
        {
          sku: 'SHIRT-RED-M',
          quantity: 15,
          available: 15,
          reserved: 0,
          damaged: 0,
          restockThreshold: 20,
          isActive: true
        }
      ]
    }];

    const result = aggregateInventory(inventory);
    expect(result.products[0].needsRestock).toBe(true);
    expect(result.needsRestockCount).toBe(1);
  });

  it('should respect activeOnly option', () => {
    const inventory: WarehouseInventory[] = [{
      warehouseId: 'WH1',
      location: 'New York',
      products: [
        {
          sku: 'SHIRT-RED-M',
          quantity: 100,
          available: 95,
          reserved: 5,
          damaged: 0,
          restockThreshold: 20,
          isActive: true
        },
        {
          sku: 'SHIRT-BLUE-M',
          quantity: 100,
          available: 95,
          reserved: 5,
          damaged: 0,
          restockThreshold: 20,
          isActive: false
        }
      ]
    }];

    const result = aggregateInventory(inventory, { activeOnly: true });
    expect(result.products).toHaveLength(1);
    expect(result.products[0].sku).toBe('SHIRT-RED-M');
  });

  it('should calculate correct stock status', () => {
    const inventory: WarehouseInventory[] = [{
      warehouseId: 'WH1',
      location: 'New York',
      products: [
        {
          sku: 'OUT-STOCK',
          quantity: 0,
          available: 0,
          reserved: 0,
          damaged: 0,
          restockThreshold: 20,
          isActive: true
        },
        {
          sku: 'LOW-STOCK',
          quantity: 5,
          available: 5,
          reserved: 0,
          damaged: 0,
          restockThreshold: 20,
          isActive: true
        },
        {
          sku: 'IN-STOCK',
          quantity: 100,
          available: 95,
          reserved: 5,
          damaged: 0,
          restockThreshold: 20,
          isActive: true
        }
      ]
    }];

    const result = aggregateInventory(inventory);
    expect(result.outOfStockCount).toBe(1);
    expect(result.lowStockCount).toBe(1);

    const outOfStock = result.products.find(p => p.sku === 'OUT-STOCK');
    const lowStock = result.products.find(p => p.sku === 'LOW-STOCK');
    const inStock = result.products.find(p => p.sku === 'IN-STOCK');

    expect(outOfStock?.status).toBe('OUT_OF_STOCK');
    expect(lowStock?.status).toBe('LOW_STOCK');
    expect(inStock?.status).toBe('IN_STOCK');
  });

  it('should handle custom lowStockThreshold', () => {
    const inventory: WarehouseInventory[] = [{
      warehouseId: 'WH1',
      location: 'New York',
      products: [
        {
          sku: 'SHIRT-RED-M',
          quantity: 30,
          available: 30,
          reserved: 0,
          damaged: 0,
          restockThreshold: 20,
          isActive: true
        }
      ]
    }];

    const result = aggregateInventory(inventory, { lowStockThreshold: 50 });
    expect(result.products[0].status).toBe('LOW_STOCK');
    expect(result.lowStockCount).toBe(1);
  });
});
