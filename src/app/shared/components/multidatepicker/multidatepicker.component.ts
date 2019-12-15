import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDatepicker} from '@angular/material';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'jp-multi-datepicker',
  templateUrl: './multidatepicker.component.html',
  styleUrls: ['./multidatepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiDatepickerComponent),
      multi: true,
    },
  ],
})
export class MultiDatepickerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  constructor (@Inject(DOCUMENT) private y_document: any) {}

  /** custom form-field class */
  @Input() private jpCustomFormFieldClass = '';

  @Input() private mode: 'YEAR' | 'MONTH' | 'MONTHYEAR' | 'WEEK' | 'SEMESTER' | '' | null;

  @Input() private label = '';

  @Input() private max: any;

  @Input() private min: any;

  @Input() private touchUi = false;

  @Input() private required = false;

  private y_disabled = false;
  @Input()
  get disabled (): boolean {
    return this.y_disabled;
  }
  set disabled (disabled: boolean) {
    this.y_disabled = disabled;
    this.setDisabledState(disabled);
  }

  @Output() public dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  private y_yearPickerCtrl: FormControl = new FormControl();
  private y_monthPickerCtrl: FormControl = new FormControl();
  private y_regularPickerCtrl: FormControl = new FormControl();

  private y_onDestroy: Subject<void> = new Subject<void>();

  public ngAfterViewInit (): void {
    switch (this.mode) {
      case 'YEAR':
        this.y_subscribeToChanges(this.y_yearPickerCtrl);
        break;

      case 'MONTH':
      case 'SEMESTER':
      case 'MONTHYEAR':
        this.y_subscribeToChanges(this.y_monthPickerCtrl);
        break;

      default:
        this.y_subscribeToChanges(this.y_regularPickerCtrl);
    }
  }

  public ngOnDestroy (): void {
    this.y_onDestroy.next();
  }

  // Function to call when the date changes.
  public onChange = (date: any) => {};

  // Function to call when the input is touched (when a star is clicked).
  public onTouched = () => {};

  public writeValue (date: any): void {
    if (date) {
      this.y_writeValue(date);
    }
  }
  public registerOnChange (fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched (fn: any): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  public setDisabledState (isDisabled: boolean): void {
    this.y_disabled = isDisabled;
    switch (this.mode) {
      case 'YEAR':
        isDisabled ? this.y_yearPickerCtrl.disable() : this.y_yearPickerCtrl.enable();
        break;

      case 'MONTH':
      case 'SEMESTER':
      case 'MONTHYEAR':
        isDisabled ? this.y_monthPickerCtrl.disable() : this.y_monthPickerCtrl.enable();
        break;

      default:
        isDisabled ? this.y_regularPickerCtrl.disable() : this.y_regularPickerCtrl.enable();
    }
  }

  public y_takeFocusAway ($datepicker: MatDatepicker<any>): void {
    $datepicker.disabled = true;
    setTimeout(() => {
      $datepicker._datepickerInput['_elementRef'].nativeElement.blur();
      $datepicker.disabled = false;
    }, 600);
  }

  private y_writeValue (date: any): any {
    if (!date) {
      return;
    }

    switch (this.mode) {
      case 'YEAR':
        if (date instanceof Date) {
          this.y_yearPickerCtrl.setValue(date, {emitEvent: false});
        }
        break;

      case 'MONTHYEAR':
      case 'MONTH':
      case 'SEMESTER':
        if (date instanceof Date) {
          this.y_monthPickerCtrl.setValue(date, {emitEvent: false});
        }
        break;

      default:
        if (date instanceof Date) {
          this.y_regularPickerCtrl.setValue(date, {emitEvent: false});
        }
    }
  }

  private y_subscribeToChanges (control: FormControl): void {
    if (!control) {
      return;
    }

    control.valueChanges.pipe(takeUntil(this.y_onDestroy)).subscribe((value) => {
      const valor = new Date(value);
      this.dateChange.emit(valor);
      this.onChange(valor);
      this.onTouched();
    });
  }

  get y_showMonthPicker (): boolean {
    return this.mode === 'MONTH' || this.mode === 'MONTHYEAR' || this.mode === 'SEMESTER';
  }

  get y_showRegularDatepicker (): boolean {
    return !this.mode || this.mode === 'WEEK';
  }
}
