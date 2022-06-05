export interface IMenuConfig {
  title: string;
  children?: IMenuConfig[];
}

export interface IMenuTree {
  id: number;
  title: string;
  isOpen: boolean;
  level: number;
  children: IMenuTree[];
}
