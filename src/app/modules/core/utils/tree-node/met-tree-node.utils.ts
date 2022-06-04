import { IMenuConfig, IMenuTree } from '@core/models/menu.model';

export function setMenuTreeData(data: IMenuConfig[], level = 0): IMenuTree[] {
  return data.map((item, index) => {
    const treeItem = {
      ...item,
      isOpen: false,
      level,
      id: index,
    };
    if (level !== 0) {
      treeItem.id = Number(`${level}${index}`);
    }
    if (treeItem.children) {
      treeItem.children = setMenuTreeData(
        treeItem.children,
        treeItem.level + 1
      );
    }
    return treeItem as IMenuTree;
  });
}
