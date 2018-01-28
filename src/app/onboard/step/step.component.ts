import {Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: "app-test",
    templateUrl: "./step.component.html",
})

export class StepComponent implements OnInit, OnDestroy  {
    steps = [
        {
            number: 1,
            active: true,
            complete: false,
            activeVariation: '1',
            variations: ['1']
        },
        {
            number: 2,
            active: false,
            complete: false,
            activeVariation: null,
            variations: ['2', '2ex', '2opt', '2org']
        },
        {
            number: 3,
            active: false,
            complete: false,
            activeVariation: null,
            variations: ['3']
        }
    ];

    private sub: any;

    constructor(private route: ActivatedRoute, private location: Location) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.setStep(params['variation']);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    setStep(variation, number = null) {
        let activeStepIndex = this.steps.findIndex(function(step) {
            if (number && number == step.number) {
                return true;
            }
            for (let i=0; i < step.variations.length; i++) {
                if (step.variations[i] == variation) {
                    return true;
                }
            }
            return false;
        });

        if (variation) {
            this.steps[activeStepIndex].activeVariation = variation;
        }

        if (this.steps[activeStepIndex].activeVariation) {
             this.steps.forEach(function(step, index){
                step.active = activeStepIndex == index;
                step.complete = activeStepIndex > index;
            })
            this.location.go('onboard/' + this.steps[activeStepIndex].activeVariation);
        }
    }

    getActiveStep() {
        return this.steps.find(function(step) {
            if (step.active) {
                return true;
            }
            return false;
        });
    }
}
