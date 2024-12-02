# Feature Flags Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - State management
    - Boolean logic
    - User/group management concepts

## Problem Description

Implement a feature flag system that can manage feature toggles with complex conditions, user targeting, and dependencies. This is commonly used for rolling out features gradually, A/B testing, and managing feature access across different environments.

### Function Signature
```typescript
type User = {
  id: string;
  groups?: string[];
  attributes?: Record<string, unknown>;
};

type FeatureRule = {
  enabled: boolean;
  groups?: string[];
  percentage?: number;
  dependencies?: string[];
  condition?: (user: User) => boolean;
  startDate?: Date;
  endDate?: Date;
};

type FeatureState = {
  enabled: boolean;
  reason: string;
  dependencies: {
    name: string;
    satisfied: boolean;
  }[];
};

class FeatureFlags {
  constructor(options?: {
    storage?: FlagStorage;
    logger?: FlagLogger;
  });

  // Define a feature flag
  define(name: string, rules: FeatureRule): void;

  // Check if feature is enabled for user
  isEnabled(name: string, user?: User): boolean;

  // Get detailed feature state
  getState(name: string, user?: User): FeatureState;

  // Update feature rules
  update(name: string, rules: Partial<FeatureRule>): void;

  // Get all feature states
  getAllStates(user?: User): Record<string, FeatureState>;
}
```

### Requirements

1. Feature Management:
    - Enable/disable features
    - User/group targeting
    - Percentage rollouts
    - Time-based activation

2. Dependency Handling:
    - Feature dependencies
    - Circular dependency detection
    - Dependency satisfaction checking
    - State propagation

3. Evaluation:
    - User attribute matching
    - Group membership
    - Custom conditions
    - Detailed state reporting

### Edge Cases to Handle

- Circular dependencies
- Invalid percentages
- Missing user data
- Date boundary conditions
- Group hierarchy
- Rule conflicts
- Feature not found
- Invalid conditions

### Example

```typescript
const flags = new FeatureFlags();

// Define features
flags.define('newUI', {
  enabled: true,
  percentage: 50,
  groups: ['beta-testers']
});

flags.define('advancedFeatures', {
  enabled: true,
  dependencies: ['newUI'],
  condition: (user) => user.attributes?.tier === 'premium'
});

// Check feature state
const user = {
  id: '123',
  groups: ['beta-testers'],
  attributes: {
    tier: 'premium'
  }
};

console.log(flags.isEnabled('advancedFeatures', user));  // true

const state = flags.getState('advancedFeatures', user);
console.log(state);
// {
//   enabled: true,
//   reason: 'All conditions satisfied',
//   dependencies: [
//     { name: 'newUI', satisfied: true }
//   ]
// }

// Update feature rules
flags.update('newUI', {
  percentage: 75,
  startDate: new Date('2024-01-01')
});
```

## Notes

This exercise tests your ability to:
- Manage complex state
- Evaluate boolean conditions
- Handle dependencies
- Process user attributes
- Implement rollout strategies

Consider:
- Performance with many flags
- Memory usage
- State consistency
- Rule evaluation order
- User data security

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Flag inheritance
2. A/B testing support
3. Rule scheduling
4. Audit logging
5. Flag versioning
6. Remote configuration
7. Analytics tracking
8. Override management

## Real-World Applications

This functionality is commonly used in:
- Feature rollouts
- A/B testing
- Beta programs
- User targeting
- Premium features
- Gradual rollouts
- Experimental features
- Service management
