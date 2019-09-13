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
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-regular-datepicker',
  templateUrl: './regular-datepicker.component.html',
  styleUrls: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegularDatepickerComponent),
      multi: true,
    },
  ],
})
export class RegularDatepickerComponent
  implements ControlValueAccessor, AfterViewInit {

  constructor (private parent: MultiDatepickerComponent) {}

  /** custom form-field class */
  @Input() private jpCustomFormFieldClass = '';

  /** Component label */
  @Input() private label = '';

  private y_max: Moment;
  @Input()
  get max (): Date {
    return this.y_max ? this.y_max.toDate() : undefined;
  }
  set max (max: Date) {
    if (max) {
      const momentDate = moment(max);
      this.y_max = momentDate.isValid() ? momentDate : undefined;
    }
  }

  private y_min: Moment;
  @Input()
  get min (): Date {
    return this.y_min ? this.y_min.toDate() : undefined;
  }
  set min (min: Date) {
    if (min) {
      const momentDate = moment(min);
      this.y_min = momentDate.isValid() ? momentDate : undefined;
    }
  }

  private y_mode: 'WEEK' | 'SEMESTER' | '' | null = '';
  @Input()
  get mode (): 'WEEK' | 'SEMESTER' | '' | null {
    return this.y_mode;
  }
  set mode (mode: 'WEEK' | 'SEMESTER' | '' | null) {
    this.y_mode = mode;
    this.y_setupFilter();
  }

  @Input() private touchUi = false;

  private y_customFilter: (d: Moment) => boolean;

  @ViewChild(MatDatepicker) private y_picker: MatDatepicker<Moment>;

  private y_inputCtrl: FormControl = new FormControl();

  // Function to call when the date changes.
  private onChange = (date: Date) => {};

  // Function to call when the input is touched (when a star is clicked).
  private onTouched = () => {};

  /** send the focus away from the input so it doesn't open again */
  private y_takeFocusAway = (datepicker: MatDatepicker<Moment>) => {};

  public ngAfterViewInit (): void {
    this.y_takeFocusAway = this.parent.y_takeFocusAway;
  }

  public writeValue (date: Date): void {
    if (date) {
      const momentDate = moment(date);
      if (momentDate.isValid()) {
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

  private y_dateChangeHandler (chosenDate: Moment): void {
    this.onChange(chosenDate.toDate());
    this.onTouched();
  }

  private y_openDatepickerOnClick (datepicker: MatDatepicker<Moment>): void {
    if (!datepicker.opened) {
      datepicker.open();
      this.onTouched();
    }
  }

  private y_setupFilter (): void {
    switch (this.mode) {
      case 'WEEK':
        this.y_customFilter = (d: Moment) => {
          return !d.day();
        };
        break;
    }
  }
}
