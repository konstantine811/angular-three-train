import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher-theme.component.html',
  styleUrls: ['./switcher-theme.component.scss'],
})
export class SwitcherThemeComponent implements OnInit {
  @Input() set size(size: number) {
    (this.elRef.nativeElement as HTMLBaseElement).style.setProperty(
      '--switch-width',
      `${size}px`
    );
  }
  @Output() onChecked: EventEmitter<boolean> = new EventEmitter();
  @Input() isChecked = false;
  constructor(private elRef: ElementRef) {}

  onChenge() {
    this.onChecked.emit(this.isChecked);
  }

  ngOnInit(): void {
    this.onChenge();
  }
}
