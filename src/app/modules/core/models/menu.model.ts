export interface IMenuConfig {
  title: string;
  children?: IMenuConfig[];
}

export interface IMenuTree {
  title: string;
  isOpen: boolean;
  level: number;
  children: IMenuTree[];
}
