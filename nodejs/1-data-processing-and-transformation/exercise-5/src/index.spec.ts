// src/index.test.ts
import { describe, it, expect } from 'vitest';
import {
  buildTree,
  findNodeById,
  type FlatNode,
  type BuildTreeOptions,
  type TreeNode,
} from './index.js';

describe('findNodeById', () => {
  it('can find a node in a tree by the id', () => {
    const tree: TreeNode<FlatNode>[] = [
      {
        id: '1',
        parentId: null,
        name: 'Level 0',
        children: [
          {
            id: '2',
            parentId: '1',
            name: 'Level 1',
            children: [
              {
                id: '3',
                parentId: '2',
                name: 'Level 2',
                children: [
                  {
                    id: '4',
                    parentId: '3',
                    name: 'Level 3',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    const result = findNodeById(tree[0], '3');
    expect(result).toEqual({
      id: '3',
      parentId: '2',
      name: 'Level 2',
      children: [
        {
          id: '4',
          parentId: '3',
          name: 'Level 3',
          children: [],
        },
      ],
    });
  });
});

describe('buildTree', () => {
  it('should handle empty array', () => {
    const options: BuildTreeOptions = {
      rootIdentifier: null,
    };

    const result = buildTree([], options);
    expect(result).toEqual({
      tree: [],
      orphanedNodes: [],
      circularRefs: [],
    });
  });

  it('should build simple parent-child tree', () => {
    const nodes = [
      { id: '1', parentId: null, name: 'Root' },
      { id: '2', parentId: '1', name: 'Child 1' },
      { id: '3', parentId: '1', name: 'Child 2' },
    ];

    const options: BuildTreeOptions = {
      rootIdentifier: null,
    };

    const result = buildTree(nodes, options);
    expect(result.tree).toEqual([
      {
        id: '1',
        parentId: null,
        name: 'Root',
        children: [
          { id: '2', parentId: '1', name: 'Child 1', children: [] },
          { id: '3', parentId: '1', name: 'Child 2', children: [] },
        ],
      },
    ]);
    expect(result.orphanedNodes).toEqual([]);
    expect(result.circularRefs).toEqual([]);
  });

  it('should handle multiple root nodes', () => {
    const nodes = [
      { id: '1', parentId: null, name: 'Root 1' },
      { id: '2', parentId: null, name: 'Root 2' },
      { id: '3', parentId: '1', name: 'Child' },
    ];

    const options: BuildTreeOptions = {
      rootIdentifier: null,
    };

    const result = buildTree(nodes, options);
    expect(result.tree).toEqual([
      {
        id: '1',
        parentId: null,
        name: 'Root 1',
        children: [{ id: '3', parentId: '1', name: 'Child', children: [] }],
      },
      {
        id: '2',
        parentId: null,
        name: 'Root 2',
        children: [],
      },
    ]);
  });

  it('should identify orphaned nodes', () => {
    const nodes = [
      { id: '1', parentId: null, name: 'Root' },
      { id: '2', parentId: 'missing', name: 'Orphan' },
    ];

    const options: BuildTreeOptions = {
      rootIdentifier: null,
    };

    const result = buildTree(nodes, options);
    expect(result.tree).toEqual([{ id: '1', parentId: null, name: 'Root', children: [] }]);
    expect(result.orphanedNodes).toEqual([{ id: '2', parentId: 'missing', name: 'Orphan' }]);
  });

  it('should detect circular references', () => {
    const nodes = [
      { id: '1', parentId: '3', name: 'Node 1' },
      { id: '2', parentId: '1', name: 'Node 2' },
      { id: '3', parentId: '2', name: 'Node 3' },
    ];

    const options: BuildTreeOptions = {
      rootIdentifier: null,
    };

    const result = buildTree(nodes, options);
    expect(result.tree).toEqual([]);
    expect(result.circularRefs).toHaveLength(3);
  });

  it('should handle custom id and parent fields', () => {
    type CustomNode = FlatNode & {
      nodeId: string;
      parentNodeId: string | null;
      data: string;
    };

    const nodes: CustomNode[] = [
      { nodeId: '1', parentNodeId: null, data: 'Root', id: '1', parentId: null },
      { nodeId: '2', parentNodeId: '1', data: 'Child', id: '2', parentId: null },
    ];

    const options: BuildTreeOptions = {
      rootIdentifier: null,
      idField: 'nodeId',
      parentField: 'parentNodeId',
    };

    const result = buildTree(nodes, options);
    expect(result.tree).toEqual([
      {
        nodeId: '1',
        parentNodeId: null,
        data: 'Root',
        id: '1',
        parentId: null,
        children: [
          {
            nodeId: '2',
            parentNodeId: '1',
            data: 'Child',
            id: '2',
            parentId: null,
            children: [],
          },
        ],
      },
    ]);
  });

  it('should handle custom root identifier', () => {
    const nodes = [
      { id: '1', parentId: 'ROOT', name: 'Node 1' },
      { id: '2', parentId: '1', name: 'Node 2' },
    ];

    const options: BuildTreeOptions = {
      rootIdentifier: 'ROOT',
    };

    const result = buildTree(nodes, options);
    expect(result.tree).toEqual([
      {
        id: '1',
        parentId: 'ROOT',
        name: 'Node 1',
        children: [
          {
            id: '2',
            parentId: '1',
            name: 'Node 2',
            children: [],
          },
        ],
      },
    ]);
  });

  it('should handle deeply nested structures', () => {
    const nodes = [
      { id: '1', parentId: null, name: 'Level 0' },
      { id: '2', parentId: '1', name: 'Level 1' },
      { id: '3', parentId: '2', name: 'Level 2' },
      { id: '4', parentId: '3', name: 'Level 3' },
    ];

    const options: BuildTreeOptions = {
      rootIdentifier: null,
    };

    const result = buildTree(nodes, options);
    expect(result.tree).toEqual([
      {
        id: '1',
        parentId: null,
        name: 'Level 0',
        children: [
          {
            id: '2',
            parentId: '1',
            name: 'Level 1',
            children: [
              {
                id: '3',
                parentId: '2',
                name: 'Level 2',
                children: [
                  {
                    id: '4',
                    parentId: '3',
                    name: 'Level 3',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });
});
