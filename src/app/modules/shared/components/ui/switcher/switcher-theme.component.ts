import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ThemeNames, THEME_TYPES } from '@core/config/theme.config';
import { ThemeChangeService } from '@core/services/ui/theme-change.service';

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
  isChecked = false;
  constructor(
    private themeChangeService: ThemeChangeService,
    private elRef: ElementRef
  ) {}

  onChenge() {
    if (this.isChecked) {
      this.themeChangeService.current = THEME_TYPES.light;
    } else {
      this.themeChangeService.current = THEME_TYPES.dark;
    }
  }

  ngOnInit(): void {
    this.isChecked = this.themeChangeService.current === ThemeNames.light;
  }
}
