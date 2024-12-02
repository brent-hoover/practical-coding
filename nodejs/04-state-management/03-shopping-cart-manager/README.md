# Shopping Cart Manager Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - State management
    - Business logic implementation
    - Basic arithmetic operations

## Problem Description

Implement a shopping cart manager that can handle items, quantities, pricing rules, and discounts. This is a common requirement in e-commerce applications that requires managing state with business rules.

### Function Signature
```typescript
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type PricingRule = {
  type: 'quantity' | 'percentage' | 'fixed';
  target: string | 'total';  // item id or 'total'
  threshold?: number;        // minimum amount/quantity
  discount: number;
};

type CartSummary = {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
  items: CartItem[];
};

class ShoppingCart {
  constructor(options?: {
    taxRate?: number;
    pricingRules?: PricingRule[];
  });

  // Add item to cart
  addItem(item: Omit<CartItem, 'quantity'>, quantity: number): void;

  // Update item quantity
  updateQuantity(itemId: string, quantity: number): void;

  // Remove item from cart
  removeItem(itemId: string): void;

  // Add pricing rule
  addPricingRule(rule: PricingRule): void;

  // Get cart summary
  getSummary(): CartSummary;

  // Clear cart
  clear(): void;
}
```

### Requirements

1. Cart Management:
    - Add/remove items
    - Update quantities
    - Track item details
    - Clear cart contents

2. Price Calculations:
    - Calculate subtotals
    - Apply discounts
    - Calculate tax
    - Handle pricing rules

3. Business Rules:
    - Quantity-based discounts
    - Percentage discounts
    - Fixed amount discounts
    - Minimum thresholds

### Edge Cases to Handle

- Zero quantities
- Negative prices
- Invalid discounts
- Multiple discounts
- Rounding errors
- Missing items
- Rule conflicts
- Tax calculations

### Example

```typescript
const cart = new ShoppingCart({
  taxRate: 0.1,  // 10% tax
  pricingRules: [
    {
      type: 'quantity',
      target: 'WIDGET-1',
      threshold: 3,
      discount: 5  // $5 off each when buying 3 or more
    },
    {
      type: 'percentage',
      target: 'total',
      threshold: 100,
      discount: 10  // 10% off orders over $100
    }
  ]
});

// Add items
cart.addItem({
  id: 'WIDGET-1',
  name: 'Basic Widget',
  price: 20.00
}, 4);

cart.addItem({
  id: 'GADGET-1',
  name: 'Super Gadget',
  price: 50.00
}, 1);

// Check summary
console.log(cart.getSummary());
// {
//   subtotal: 130.00,    // (4 * 20) + (1 * 50)
//   discount: 33.00,     // (4 * 5) + (10% of remainder)
//   tax: 9.70,          // 10% of post-discount amount
//   total: 106.70,
//   itemCount: 5,
//   items: [
//     { id: 'WIDGET-1', name: 'Basic Widget', price: 20.00, quantity: 4 },
//     { id: 'GADGET-1', name: 'Super Gadget', price: 50.00, quantity: 1 }
//   ]
// }

// Update quantity
cart.updateQuantity('WIDGET-1', 2);

// Remove item
cart.removeItem('GADGET-1');

// Clear cart
cart.clear();
```

## Notes

This exercise tests your ability to:
- Manage complex state
- Implement business rules
- Handle calculations accurately
- Maintain data consistency
- Apply pricing logic

Consider:
- Decimal precision
- Discount ordering
- Rule precedence
- State consistency
- Performance implications

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Coupon codes
2. Bundle pricing
3. Time-based discounts
4. Customer tiers
5. Inventory checking
6. Price history
7. Currency support
8. Shipping calculations

## Real-World Applications

This functionality is commonly used in:
- E-commerce platforms
- Point of sale systems
- Subscription services
- Booking systems
- Product configurators
- Service pricing
- Quote generators
- Order management
