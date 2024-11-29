# Tree Builder Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 3-4 hours
- Prerequisites:
   - TypeScript generics
   - Tree data structures
   - Recursive algorithms
   - Type safety concepts

## Problem Description

Implement a function that converts a flat array of nodes with parent-child relationships into a nested tree structure. This is a common task when working with hierarchical data from databases or APIs that store tree structures in a flat format.

### Function Signature
```typescript
function buildTree<T extends FlatNode>(
  nodes: T[],
  options: BuildTreeOptions
): TreeResult<T>

// Input node type - flat structure
type FlatNode = {
  id: string;
  parentId: string | null;
  [key: string]: unknown;
};

// Output node type - every node in the tree has this structure
type TreeNode<T extends FlatNode> = T & {
  children: TreeNode<T>[];  // Every node, even leaves, must have a children array
};

type BuildTreeOptions = {
  rootIdentifier: null | string;  // What marks a node as root
  idField?: string;              // Defaults to 'id'
  parentField?: string;          // Defaults to 'parentId'
};

type TreeResult<T extends FlatNode> = {
  tree: TreeNode<T>[];           // Array of root nodes, each a full TreeNode
  orphanedNodes: T[];           // Nodes whose parents don't exist
  circularRefs: T[];            // Nodes that would create cycles
};
```

### Requirements

The function should:

1. Basic Tree Building:
   - Convert flat array into nested tree structure
   - Every node in the resulting tree must be a TreeNode (including leaves)
   - Every node must have a children array (empty array for leaf nodes)
   - Maintain all original node properties
   - Support multiple root nodes
   - Handle deeply nested structures

2. Error Detection:
   - Identify orphaned nodes (nodes whose parent doesn't exist)
   - Detect circular references
   - Preserve original node data for error reporting

3. Flexibility:
   - Support custom root node identification
   - Allow custom id and parent field names
   - Preserve additional node properties

### Important Implementation Notes

1. Tree Structure:
   - Every node in the tree must be a TreeNode
   - Every node must have a children array, even if it's empty
   - Leaf nodes (nodes with no children) should have an empty children array, not undefined or omitted
   - The children property should never be omitted from any node

2. Type Safety:
   - The TreeNode type extends the input node type, preserving all original properties
   - The children array is typed recursively as TreeNode<T>[]
   - This ensures type safety throughout the entire tree structure

### Example

```typescript
const nodes = [
  { id: '1', parentId: null, name: 'Root' },
  { id: '2', parentId: '1', name: 'Child 1' },
  { id: '3', parentId: '1', name: 'Child 2' },
  { id: '4', parentId: '2', name: 'Grandchild' }
];

const result = buildTree(nodes, { rootIdentifier: null });

// Result: Note that EVERY node has a children array
{
  tree: [
    {
      id: '1',
      parentId: null,
      name: 'Root',
      children: [              // Root's children array
        {
          id: '2',
          parentId: '1',
          name: 'Child 1',
          children: [          // Intermediate node's children array
            {
              id: '4',
              parentId: '2',
              name: 'Grandchild',
              children: []     // Leaf node still has children array (empty)
            }
          ]
        },
        {
          id: '3',
          parentId: '1',
          name: 'Child 2',
          children: []         // Leaf node still has children array (empty)
        }
      ]
    }
  ],
  orphanedNodes: [],
  circularRefs: []
}
```

## Notes

This exercise tests your ability to:
- Transform data structures
- Handle error cases gracefully
- Work with recursive structures
- Maintain type safety with generics
- Detect problematic data patterns

Consider:
- How to efficiently build the tree
- How to detect circular references
- Memory usage for large trees
- Type safety throughout the transformation

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Start with simple cases and progress to more complex scenarios
4. Consider adding additional test cases for edge cases

## Real-World Applications

This exercise simulates real-world scenarios like:
- Building category hierarchies
- Organizing file/folder structures
- Displaying organizational charts
- Menu systems with nested items
- Comment thread structures
- Task/subtask relationships

## Extension Ideas

Once you have the basic implementation working, consider adding:
- Tree validation rules
- Path generation (from root to any node)
- Tree traversal utilities
- Node movement operations
- Subtree extraction
