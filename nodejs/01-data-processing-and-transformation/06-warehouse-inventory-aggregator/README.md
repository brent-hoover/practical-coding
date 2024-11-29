# Inventory Aggregator Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
   - TypeScript
   - Data aggregation
   - Business logic implementation
   - Status calculation patterns

## Problem Description

Implement a function that aggregates product inventory data across multiple warehouses to provide a comprehensive view of stock levels and inventory status. This is a common requirement in e-commerce and inventory management systems.

### Function Signature
```typescript
type WarehouseInventory = {
  warehouseId: string;
  location: string;
  products: {
    sku: string;
    quantity: number;
    available: number;    // May be less than quantity due to holds/reserves
    reserved: number;
    damaged: number;
    restockThreshold: number;
    isActive: boolean;
  }[];
};

type ProductInventoryStatus = {
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

type InventoryAggregateOptions = {
  activeOnly?: boolean;       // If true, excludes inactive products
  lowStockThreshold?: number; // Custom threshold for "LOW_STOCK" status
};

type InventoryAggregateResult = {
  products: ProductInventoryStatus[];
  outOfStockCount: number;
  lowStockCount: number;
  needsRestockCount: number;
  totalInventoryCount: number;
};

function aggregateInventory(
  warehouseInventories: WarehouseInventory[],
  options: InventoryAggregateOptions = {}
): InventoryAggregateResult
```

### Requirements

The function should:

1. Basic Aggregation:
   - Combine inventory data for the same SKU across warehouses
   - Calculate total quantities (total, available, reserved, damaged)
   - Track stock locations and quantities
   - Maintain accurate counts for various inventory statuses

2. Status Determination:
   - OUT_OF_STOCK: No available quantity
   - LOW_STOCK: Available quantity below threshold
   - IN_STOCK: Sufficient available quantity
   - Track products needing restock (available quantity below restockThreshold)

3. Filtering and Options:
   - Support excluding inactive products
   - Allow custom low stock threshold
   - Handle missing or partial data gracefully

### Example

```typescript
const warehouseInventories = [
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

const result = aggregateInventory(warehouseInventories);

// Result:
{
  products: [
    {
      sku: 'SHIRT-RED-M',
      totalQuantity: 80,
      availableQuantity: 70,
      reservedQuantity: 8,
      damagedQuantity: 2,
      needsRestock: false,
      stockLocation: [
        { warehouseId: 'WH1', location: 'New York', quantity: 50 },
        { warehouseId: 'WH2', location: 'Los Angeles', quantity: 30 }
      ],
      status: 'IN_STOCK'
    }
  ],
  outOfStockCount: 0,
  lowStockCount: 0,
  needsRestockCount: 0,
  totalInventoryCount: 80
}
```

## Notes

This exercise tests your ability to:
- Process and combine data from multiple sources
- Handle business logic and rules
- Calculate derived values
- Work with complex data structures
- Handle configuration options

Consider:
- Edge cases in inventory data
- Accuracy of calculations
- Clear status determination logic
- Performance with large inventory sets

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Start with simple cases and progress to more complex scenarios
4. Consider adding additional test cases for edge cases

## Real-World Applications

This exercise simulates real-world scenarios like:
- E-commerce inventory management
- Warehouse management systems
- Order fulfillment systems
- Inventory reporting and analytics
- Stock level monitoring
- Reorder point calculations

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Inventory value calculations
2. Stock movement trends
3. Warehouse capacity analysis
4. Reorder suggestions
5. Stock transfer recommendations
6. Historical tracking
7. Predictive analytics
8. 
