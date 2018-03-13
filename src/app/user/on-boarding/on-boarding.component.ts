import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  OnBoardingEmitter
} from '../../shared/emitter';

@Component({
  selector: 'user-on-boarding-component',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss']
})
export class UserOnboardingComponent {
  constructor (
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.onBoardingEmitterSubscriber();
  }

  protected steps: Array<string> = [];

  public ngOnDestroy (): void {
    OnBoardingEmitter.removeSubscriber(OnBoardingEmitter.getOnboardingName());
  }

  private onBoardingEmitterSubscriber (): void {
    OnBoardingEmitter
    .onBoardingCurrentRoute()
    .subscribe((data) => {
      this.steps = data;
      console.log('this.steps');
      console.log(this.steps);
      this.changeDetectorRef.detectChanges();
    });
  }
}

