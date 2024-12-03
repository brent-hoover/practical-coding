# GraphQL Builder Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - GraphQL concepts
    - Schema design
    - Type systems

## Problem Description

Implement a GraphQL schema builder that can define types, create resolvers, and handle query execution with proper type safety. This is used to create GraphQL APIs with full type checking and schema validation.

### Function Signature
```typescript
type SchemaConfig = {
  types: TypeDefinition[];
  queries: FieldDefinition[];
  mutations?: FieldDefinition[];
  subscriptions?: FieldDefinition[];
};

type TypeDefinition = {
  name: string;
  fields: Record<string, FieldDefinition>;
  interfaces?: string[];
};

type FieldDefinition = {
  type: string;
  args?: Record<string, ArgumentDefinition>;
  resolve?: FieldResolver;
  subscribe?: FieldSubscriber;
};

class GraphQLBuilder {
  constructor(options?: {
    validationRules?: ValidationRule[];
    middlewares?: Middleware[];
  });

  // Define type
  defineType(type: TypeDefinition): this;

  // Add resolver
  addResolver(
    path: string,
    resolver: FieldResolver
  ): this;

  // Execute query
  execute(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<ExecutionResult>;

  // Get schema info
  getSchemaInfo(): SchemaInfo;
}

type ExecutionResult = {
  data?: Record<string, unknown>;
  errors?: GraphQLError[];
};

type SchemaInfo = {
  types: string[];
  queries: string[];
  mutations: string[];
  subscriptions: string[];
};
```

### Requirements

1. Schema Building:
    - Type definitions
    - Field resolvers
    - Argument handling
    - Interface support

2. Query Execution:
    - Query parsing
    - Resolver execution
    - Error handling
    - Result formatting

3. Type System:
    - Type validation
    - Type inference
    - Field resolution
    - Null handling

### Edge Cases to Handle

- Circular references
- Invalid queries
- Type mismatches
- Missing resolvers
- Deep queries
- Field errors
- Invalid variables
- Performance issues

### Example

```typescript
// Create builder
const builder = new GraphQLBuilder({
  validationRules: [
    depthLimitRule(5),
    complexityLimitRule(100)
  ]
});

// Define types
builder.defineType({
  name: 'User',
  fields: {
    id: { type: 'ID!' },
    name: { type: 'String!' },
    email: { type: 'String!' },
    posts: {
      type: '[Post!]!',
      resolve: async (user) => {
        return getPosts(user.id);
      }
    }
  }
});

builder.defineType({
  name: 'Post',
  fields: {
    id: { type: 'ID!' },
    title: { type: 'String!' },
    content: { type: 'String!' },
    author: {
      type: 'User!',
      resolve: async (post) => {
        return getUser(post.authorId);
      }
    }
  }
});

// Add query resolvers
builder.addResolver('Query.user', async (_, { id }) => {
  return getUser(id);
});

// Execute query
const result = await builder.execute(`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
      posts {
        title
        content
      }
    }
  }
`, { id: "123" });

console.log(result);
// {
//   data: {
//     user: {
//       name: "John Doe",
//       email: "john@example.com",
//       posts: [
//         { title: "Post 1", content: "..." }
//       ]
//     }
//   }
// }

// Get schema info
console.log(builder.getSchemaInfo());
// {
//   types: ['User', 'Post'],
//   queries: ['user'],
//   mutations: [],
//   subscriptions: []
// }
```

## Notes

This exercise tests your ability to:
- Design GraphQL schemas
- Implement resolvers
- Handle types safely
- Execute queries
- Manage errors

Consider:
- Type safety
- Query performance
- Error handling
- Schema design
- Resolver efficiency

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Field directives
2. Query complexity
3. Dataloaders
4. Schema stitching
5. Code generation
6. Subscriptions
7. Custom scalars
8. Input validation

## Real-World Applications

This functionality is commonly used in:
- API servers
- Data aggregation
- BFF patterns
- Mobile backends
- CMS systems
- Admin interfaces
- API gateways
- Development tools
