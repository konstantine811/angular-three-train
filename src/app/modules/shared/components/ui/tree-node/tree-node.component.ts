import { Component, Input, OnInit } from '@angular/core';
import { animOpenMenu } from '@core/animations/common-animation';
import { IMenuConfig, IMenuTree } from 'src/app/modules/core/models/menu.model';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  animations: [animOpenMenu],
})
export class TreeNodeComponent implements OnInit {
  @Input() menuTreeData!: IMenuTree[];
  @Input() isMultiOpen = true;

  constructor() {}

  openMenu(menu: IMenuTree) {
    if (this.isMultiOpen) {
      menu.isOpen = !menu.isOpen;
    } else {
      menu.isOpen = !menu.isOpen;
      if (menu.isOpen) {
        this.menuTreeData.forEach((item) => {
          if (item.id !== menu.id) {
            item.isOpen = false;
          }
        });
      }
    }
  }

  ngOnInit(): void {}
}
