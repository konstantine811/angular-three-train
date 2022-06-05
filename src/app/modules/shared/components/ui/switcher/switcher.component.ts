import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
})
export class SwitcherComponent implements OnInit {
  @Output() isDarkMode: EventEmitter<boolean> = new EventEmitter();
  isChecked = false;
  constructor() {}

  onChenge() {
    console.log('emit');
    this.isDarkMode.emit(this.isChecked);
  }

  ngOnInit(): void {
    this.onChenge();
  }
}
