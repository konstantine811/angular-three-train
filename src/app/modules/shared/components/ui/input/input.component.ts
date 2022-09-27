import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() inputType!: string;
  @Input() placeholder!: string;
  @Input() iconName!: string;
  @Input() formControlName!: string;
  control!: FormControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    if (
      this.controlContainer &&
      this.controlContainer.control &&
      this.formControlName
    ) {
      this.control = this.controlContainer.control.get(
        this.formControlName
      ) as FormControl;
    }
  }

  registerOnChange() {}

  registerOnTouched() {}
  writeValue() {}
  setDisabledState() {}
}
