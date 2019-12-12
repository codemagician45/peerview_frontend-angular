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
  MatDialog,
} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { MultiDatepickerComponent } from '../multidatepicker.component';
import { InfoDialogComponent } from './dialog/info-dialog/info-dialog.component';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';

const moment = _moment;

export const MONTH_MODE_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MONTH_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthPickerComponent),
      multi: true,
    },
  ],
})
export class MonthPickerComponent
  implements ControlValueAccessor, AfterViewInit {

  constructor (
    private dialog: MatDialog,
    private parent: MultiDatepickerComponent,
  ) { }

  /** custom form-field class */
  @Input() private jpCustomFormFieldClass = '';

  /** Component label */
  @Input() private label = '';

  private y_max: Moment;
  @Input()
  get max (): string | Date {
    return this.y_max ? this.y_max.format('MM/YYYY') : undefined;
  }
  set max (max: string | Date) {
    // expect MM to be 1..12 and YYYY > 0
    if (max) {
      const momentDate =
        typeof max === 'string' ? moment(max, 'MM/YYYY') : moment(max);
      this.y_max = momentDate.isValid() ? momentDate : undefined;
    }
  }

  private y_min: Moment;
  @Input()
  get min (): string | Date {
    return this.y_min ? this.y_min.format('MM/YYYY') : undefined;
  }
  set min (min: string | Date) {
    // expect MM to be 1..12 and YYYY > 0
    if (min) {
      const momentDate =
        typeof min === 'string' ? moment(min, 'MM/YYYY') : moment(min);
      this.y_min = momentDate.isValid() ? momentDate : undefined;
    }
  }

  private y_mode: 'SEMESTER' | 'MONTH' | 'MONTHYEAR';
  @Input()
  get mode (): 'SEMESTER' | 'MONTH' | 'MONTHYEAR' {
    return this.y_mode;
  }
  set mode (mode: 'SEMESTER' | 'MONTH' | 'MONTHYEAR') {
    this.y_mode = mode;
    setTimeout(() => this.y_setupFilter(), 300);
  }

  @Input() private touchUi = false;

  @Input() private requried = false;

  private y_customFilter: (d: Moment) => boolean;

  @ViewChild(MatDatepicker) private y_picker: MatDatepicker<Moment>;

  private y_inputCtrl: FormControl = new FormControl();

  // TODO(@julianobrasil): remove
  // private _finalDate: Date;

  // Function to call when the date changes.
  private onChange = (monthAndYear: Date) => { };

  // Function to call when the input is touched.
  private onTouched = () => { };

  /** send the focus away from the input so it doesn't open again */
  private y_takeFocusAway = (datepicker: MatDatepicker<Moment>) => { };

  public ngAfterViewInit (): void {
    this.y_takeFocusAway = this.parent.y_takeFocusAway;
  }

  public writeValue (date: Date): void {
    if (date && this.y_isMonthEnabled(date.getFullYear(), date.getMonth())) {
      const momentDate = moment(date);
      if (momentDate.isValid()) {
        momentDate.set({ date: 1 });

        this.y_inputCtrl.setValue(momentDate, { emitEvent: false });
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

  private y_yearSelectedHandler (
    chosenMonthDate: Moment,
    datepicker: MatDatepicker<Moment>,
  ): void {
    if (!this.y_isYearEnabled(chosenMonthDate.year())) {
      datepicker.close();

      // wait for some time before enabling the calendar again
      setTimeout(() => (datepicker.disabled = false), 600);
    }
  }

  public y_monthSelectedHandler (chosenMonthDate: Moment, datepicker: MatDatepicker<Moment>): void {
    datepicker.close();

    if (
      !this.y_isMonthEnabled(chosenMonthDate.year(), chosenMonthDate.month())
    ) {
      this.dialog.open(InfoDialogComponent);
      return;
    }

    if (this.y_max && chosenMonthDate.diff(this.y_max, 'month') > 0) {
      chosenMonthDate = this.y_max.clone();
    }

    if (this.y_min && this.y_min.diff(chosenMonthDate, 'month') > 0) {
      chosenMonthDate = this.y_min.clone();
    }

    chosenMonthDate.set({ date: 1 });

    this.y_inputCtrl.setValue(chosenMonthDate);
    this.onChange(chosenMonthDate.toDate());
    this.onTouched();
  }

  /** Whether the given year is enabled. */
  private y_isYearEnabled (year: number): boolean {
    // disable if the year is greater than maxDate lower than minDate
    if (
      year === undefined ||
      year === null ||
      (this.y_max && year > this.y_max.year()) ||
      (this.y_min && year < this.y_min.year())
    ) {
      return false;
    }

    // enable if it reaches here and there's no filter defined
    if (!this.y_customFilter) {
      return true;
    }

    const firstOfYear = moment([year, 0, 1]);

    // If any date in the year is enabled count the year as enabled.
    for (const date = firstOfYear; date.year() === year; date.add(1)) {
      if (this.y_customFilter(date)) {
        return true;
      }
    }

    return false;
  }

  /** Whether the given year is enabled. */
  private y_isMonthEnabled (year: number, month: number): boolean {
    if (
      month === undefined ||
      month === null ||
      this.y_isYearAndMonthAfterMaxDate(year, month) ||
      this.y_isYearAndMonthBeforeMinDate(year, month)
    ) {
      return false;
    }

    if (!this.y_customFilter) {
      return true;
    }

    const firstOfMonth = moment([year, month, 1]);

    // If any date in the month is enabled count the month as enabled.
    for (const date = firstOfMonth; date.month() === month; date.add(1, 'd')) {
      if (this.y_customFilter(date)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Tests whether the combination month/year is after this.maxDate, considering
   * just the month and year of this.maxDate
   */
  private y_isYearAndMonthAfterMaxDate (year: number, month: number): boolean {
    if (this.y_max) {
      const maxYear = this.y_max.year();
      const maxMonth = this.y_max.month();

      return year > maxYear || (year === maxYear && month > maxMonth);
    }

    return false;
  }

  /**
   * Tests whether the combination month/year is before this.minDate, considering
   * just the month and year of this.minDate
   */
  private y_isYearAndMonthBeforeMinDate (year: number, month: number): boolean {
    if (this.min) {
      const minYear = this.y_min.year();
      const minMonth = this.y_min.month();

      return year < minYear || (year === minYear && month < minMonth);
    }

    return false;
  }

  private y_openDatepickerOnClick (datepicker: MatDatepicker<Moment>): void {
    if (!datepicker.opened) {
      datepicker.open();
    }
  }

  private y_setupFilter (): void {
    switch (this.mode) {
      case 'SEMESTER':
        this.y_customFilter = (d: Moment) => {
          return d.month() === 0 || d.month() === 6;
        };
        break;
    }
  }
}
