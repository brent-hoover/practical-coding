export type FlatNode = {
  id: string;
  parentId: string | null;
  [key: string]: unknown;
};

export type TreeNode<T extends FlatNode> = T & {
  children: TreeNode<T>[];
};

export type BuildTreeOptions = {
  rootIdentifier: null | string;
  idField?: string;
  parentField?: string;
};

export type TreeResult<T extends FlatNode> = {
  tree: TreeNode<T>[];
  orphanedNodes: T[];
  circularRefs: T[];
};

export function findNodeById<T extends FlatNode>(
  tree: TreeNode<T>,
  id: string,
  idField: string = 'id'
): TreeNode<T> | undefined {
  if (tree[idField] === id) {
    return tree;
  }
  for (const child of tree.children) {
    const found = findNodeById(child, id, idField);
    if (found) {
      return found;
    }
  }
  return undefined;
}

function detectCycle<T extends FlatNode>(
  nodeId: string,
  parentId: string,
  nodes: T[],
  idField: string = 'id',
  parentField: string = 'parentId'
): boolean {
  let currentId = parentId;
  const visited = new Set<string>();

  while (currentId) {
    if (currentId === nodeId) return true;
    if (visited.has(currentId)) return true;

    visited.add(currentId);
    const parentNode = nodes.find((n) => n[idField] === currentId);
    if (!parentNode) break;

    currentId = parentNode[parentField] as string;
    if (!currentId) break;
  }

  return false;
}

export function buildTree<T extends FlatNode>(
  nodes: T[],
  options: BuildTreeOptions
): TreeResult<T> {
  const { rootIdentifier, idField = 'id', parentField = 'parentId' } = options;
  const results: TreeResult<T> = {
    tree: [],
    orphanedNodes: [],
    circularRefs: [],
  };

  if (!nodes.length) return results;

  // Create a map of nodes for easier lookup
  const nodeMap = new Map<string, T>();
  nodes.forEach((node) => nodeMap.set(node[idField] as string, node));

  // First identify circular references
  nodes.forEach((node) => {
    const parentId = node[parentField] as string;
    if (parentId && parentId !== rootIdentifier) {
      if (detectCycle(node[idField] as string, parentId, nodes, idField, parentField)) {
        results.circularRefs.push(node);
        nodeMap.delete(node[idField] as string); // Remove from processing
      }
    }
  });

  // Process remaining nodes
  const rootNodes = nodes.filter(
    (n) => n[parentField] === rootIdentifier && !results.circularRefs.includes(n)
  );

  if (rootNodes.length) {
    for (const rootNode of rootNodes) {
      results.tree.push({ ...rootNode, children: [] } as TreeNode<T>);
    }
  }

  // Build the tree excluding circular refs
  const remainingNodes = nodes.filter(
    (n) => !results.circularRefs.includes(n) && n[parentField] !== rootIdentifier
  );

  for (const node of remainingNodes) {
    const treeNode: TreeNode<T> = { ...node, children: [] };
    let parent: TreeNode<T> | undefined;

    for (const root of results.tree) {
      parent = findNodeById(root, node[parentField] as string, idField);
      if (parent) break;
    }

    if (parent) {
      parent.children.push(treeNode);
    } else {
      if (node[parentField] !== rootIdentifier) {
        results.orphanedNodes.push(node);
      }
    }
  }

  return results;
}
