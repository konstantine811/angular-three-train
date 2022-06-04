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

  constructor() {}

  openMenu(menu: IMenuTree) {
    menu.isOpen = !menu.isOpen;
  }

  ngOnInit(): void {}
}
