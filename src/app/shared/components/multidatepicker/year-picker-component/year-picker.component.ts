import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDatepicker,
} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { MultiDatepickerComponent } from '../multidatepicker.component';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';

const moment = _moment;

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearPickerComponent),
      multi: true,
    },
  ],
})
export class YearPickerComponent
  implements ControlValueAccessor, AfterViewInit {
  constructor (private parent: MultiDatepickerComponent) { }

  /** custom form-field class */
  @Input() private jpCustomFormFieldClass = '';

  /** Component label */
  @Input() private label = '';

  private y_max: Moment;
  @Input()
  get max (): number | Date {
    return this.y_max ? this.y_max.year() : undefined;
  }
  set max (max: number | Date) {
    if (max) {
      const momentDate =
        typeof max === 'number' ? moment([max, 0, 1]) : moment(max);
      this.y_max = momentDate.isValid() ? momentDate : undefined;
    }
  }

  private y_min: Moment;
  @Input()
  get min (): number | Date {
    return this.y_min ? this.y_min.year() : undefined;
  }
  set min (min: number | Date) {
    if (min) {
      const momentDate =
        typeof min === 'number' ? moment([min, 0, 1]) : moment(min);
      this.y_min = momentDate.isValid() ? momentDate : undefined;
    }
  }

  @Input() private touchUi = false;

  @Input() private requried = false;

  @ViewChild(MatDatepicker) private y_picker: MatDatepicker<Moment>;

  private y_inputCtrl: FormControl = new FormControl();

  // Function to call when the date changes.
  protected onChange = (year: Date) => { };

  // Function to call when the input is touched (when a star is clicked).
  protected onTouched = () => { };

  /** send the focus away from the input so it doesn't open again */
  protected y_takeFocusAway = (datepicker: MatDatepicker<Moment>) => { };


  public ngAfterViewInit (): void {
    this.y_takeFocusAway = this.parent.y_takeFocusAway;
  }

  public writeValue (date: Date): void {
    if (date && this.y_isYearEnabled(date.getFullYear())) {
      const momentDate = moment(date);
      if (momentDate.isValid()) {
        momentDate.set({ date: 1 });
        this.y_inputCtrl.setValue(moment(date), { emitEvent: false });
      }
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
    isDisabled
      ? (this.y_picker.disabled = true)
      : (this.y_picker.disabled = false);

    isDisabled ? this.y_inputCtrl.disable() : this.y_inputCtrl.enable();
  }

  public y_yearSelectedHandler (chosenDate: Moment, datepicker: MatDatepicker<Moment>): void {
    datepicker.close();

    if (!this.y_isYearEnabled(chosenDate.year())) {
      return;
    }

    chosenDate.set({ date: 1 });

    this.y_inputCtrl.setValue(chosenDate, { emitEvent: false });
    this.onChange(chosenDate.toDate());
    this.onTouched();
  }

  public y_openDatepickerOnClick (datepicker: MatDatepicker<Moment>): void {
    if (!datepicker.opened) {
      datepicker.open();
    }
  }

  /** Whether the given year is enabled. */
  protected y_isYearEnabled (year: number): boolean {
    // disable if the year is greater than maxDate lower than minDate
    if (
      year === undefined ||
      year === null ||
      (this.y_max && year > this.y_max.year()) ||
      (this.y_min && year < this.y_min.year())
    ) {
      return false;
    }

    return true;
  }
}
