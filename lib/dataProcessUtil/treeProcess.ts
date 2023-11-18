import { cloneDeep, omit } from 'lodash';

/**
 * ---------------------------------------- flatTree ----------------------------------------
 */

export type TreeNode<T extends string = 'children'> = Record<string, any> & {
  [k in T]?: TreeNode<T>;
};

export type FlatTreeOption = {
  /**
   * 指定关联子节点的属性
   */
  childrenPropName?: string;
  /**
   * 是否包含父节点（好像没啥必要，砍了~）
   */
  includeParent?: boolean;
};

const flatLoop = <
  T extends TreeNode // 用来定义返回的类型
>(
  tree: T[],
  result: T[],
  options?: FlatTreeOption
): T[] => {
  if (!Array.isArray(tree)) {
    return [];
  }
  const { childrenPropName = 'children' } = options || {};

  for (const item of tree) {
    result.push(omit(item, childrenPropName) as T);

    if (item[childrenPropName]) {
      flatLoop(item[childrenPropName], result, options);
    }
  }
  return result;
};

/**
 * 将树结构数据拍平
 */
export const flatTree = <
  T extends TreeNode // 用来定义返回的类型
>(
  tree: T[],
  options?: FlatTreeOption
): T[] => {
  const cloneData = cloneDeep(tree);
  const result: T[] = [];

  flatLoop<T>(cloneData, result, options);

  return result;
};

/**
 * 将树结构数据拍平
 * reduce 版本
 */
export const flatTreeByReduce = <T extends TreeNode>(
  tree: T[],
  options?: FlatTreeOption
): T[] => {
  const { childrenPropName = 'children' } = options || {};
  return tree.reduce((prev, curr) => {
    prev.push(omit(cloneDeep(curr), childrenPropName) as T);
    if (curr[childrenPropName] && Array.isArray(curr[childrenPropName])) {
      prev.push(...flatTreeByReduce<T>(curr[childrenPropName], options));
    }
    return prev;
  }, [] as T[]);
};

/**
 * ---------------------------------------- arr2tree ----------------------------------------
 */

export type Arr2treeOptions = {
  /**
   * 指定节点标识
   */
  nodeIdPropName?: string;
  /**
   * 指定关联父子节点属性
   */
  parentNodeIdPropName?: string;
};

/**
 * 将数组转换为树结构
 */
export const arr2tree = <T extends Record<string, any>>(
  source: T[],
  options?: Arr2treeOptions
) => {
  const nodes = cloneDeep(source);
  const nodeMap = new Map();
  const tree: (T & {
    children?: T[];
  })[] = [];

  const { nodeIdPropName = 'id', parentNodeIdPropName = 'parentId' } =
    options || {};

  /**
   * 建立 id => node 的映射关系
   */
  for (const node of nodes) {
    nodeMap.set(node[nodeIdPropName], node);
  }

  // 由于 js 引用类型，因此不需要递归
  for (const node of nodes) {
    // 没有 parentId 说明是根节点
    if (!node[parentNodeIdPropName]) {
      tree.push(node);
      continue;
    }

    const parent = nodeMap.get(node[parentNodeIdPropName]) || {};
    parent.children = [...(parent.children || []), node];
  }

  return tree;
};
