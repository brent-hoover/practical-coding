# Form Field Manager Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Form handling concepts
    - Basic validation patterns

## Problem Description

Implement a form field manager that can track field values, validate input, and manage field states. This is a common requirement for handling form data and user input in applications.

### Function Signature
```typescript
type FieldValue = string | number | boolean | null;

type ValidationRule = {
  validate: (value: FieldValue) => boolean;
  message: string;
};

type FieldOptions = {
  initialValue?: FieldValue;
  required?: boolean;
  rules?: ValidationRule[];
};

type FieldState = {
  value: FieldValue;
  dirty: boolean;
  touched: boolean;
  errors: string[];
  valid: boolean;
};

class FormFieldManager {
  constructor(fields: Record<string, FieldOptions>);

  // Set field value
  setValue(field: string, value: FieldValue): void;

  // Mark field as touched
  touch(field: string): void;

  // Get field state
  getFieldState(field: string): FieldState;

  // Validate specific field or all fields
  validate(field?: string): boolean;

  // Reset field(s) to initial state
  reset(field?: string): void;

  // Get form status
  getStatus(): FormStatus;
}

type FormStatus = {
  valid: boolean;
  dirty: boolean;
  touched: boolean;
  errors: Record<string, string[]>;
};
```

### Requirements

1. Field Management:
    - Track field values
    - Maintain field state
    - Handle initial values
    - Support reset functionality

2. Validation:
    - Required field checking
    - Custom validation rules
    - Error messages
    - Field-level validation

3. State Tracking:
    - Dirty state (changed from initial)
    - Touched state (user interaction)
    - Error tracking
    - Form-level status

### Edge Cases to Handle

- Empty field values
- Multiple validation errors
- Field not found
- Type conversions
- Reset partial form
- Invalid validation rules
- Duplicate error messages
- Touch state management

### Example

```typescript
const form = new FormFieldManager({
  username: {
    required: true,
    rules: [
      {
        validate: value => value.length >= 3,
        message: 'Username must be at least 3 characters'
      }
    ]
  },
  age: {
    required: true,
    rules: [
      {
        validate: value => Number(value) >= 18,
        message: 'Must be 18 or older'
      }
    ]
  }
});

// Set field value
form.setValue('username', 'jo');
form.touch('username');

// Check field state
console.log(form.getFieldState('username'));
// {
//   value: 'jo',
//   dirty: true,
//   touched: true,
//   errors: ['Username must be at least 3 characters'],
//   valid: false
// }

// Validate form
const isValid = form.validate();
console.log(form.getStatus());
// {
//   valid: false,
//   dirty: true,
//   touched: true,
//   errors: {
//     username: ['Username must be at least 3 characters'],
//     age: ['Field is required']
//   }
// }

// Reset form
form.reset();
```

## Notes

This exercise tests your ability to:
- Track form state
- Implement validation
- Handle user interaction
- Manage error messages
- Track field status

Consider:
- Error message clarity
- Validation timing
- State updates
- Type coercion
- User experience

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Async validation
2. Field dependencies
3. Custom error formatting
4. Validation groups
5. Field transformers
6. Value formatting
7. Submit handling
8. Field masks

## Real-World Applications

This functionality is commonly used in:
- User registration
- Data entry forms
- Search interfaces
- Settings panels
- Profile editors
- Payment forms
- Survey tools
- Configuration screens
