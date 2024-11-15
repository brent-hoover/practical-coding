export type FlatNode = {
  id: string;
  parentId: string | null;
  [key: string]: unknown;
};

export type TreeNode<T extends FlatNode> = T & {
  children: TreeNode<T>[];
};

export type BuildTreeOptions = {
  rootIdentifier: null | string; // What marks a node as root (null or specific parentId)
  idField?: string; // Defaults to 'id'
  parentField?: string; // Defaults to 'parentId'
};

export type TreeResult<T extends FlatNode> = {
  tree: TreeNode<T>[]; // The resulting tree structure
  orphanedNodes: T[]; // Nodes whose parents don't exist
  circularRefs: T[]; // Nodes that would create cycles
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
  const rootNodes = nodes.filter((n) => n[parentField] === rootIdentifier);
  if (rootNodes) {
    for (const rootNode of rootNodes) {
      results.tree.push({ ...rootNode, children: [] } as TreeNode<T>);
    }
  } else {
    console.log('could not find root node');
  }

  for (const node of nodes) {
    const treeNode: TreeNode<T> = { ...node, children: [] };
    let parent: TreeNode<T> | undefined;
    for (const root of results.tree) {
      parent = findNodeById(root, node[parentField] as string, idField);
      if (parent) break;
    }
    if (parent) {
      parent.children.push(treeNode);
    } else {
      if (node[parentField] !== rootIdentifier) results.orphanedNodes.push(node);
    }
  }
  console.log('results', JSON.stringify(results));
  return results;
}
