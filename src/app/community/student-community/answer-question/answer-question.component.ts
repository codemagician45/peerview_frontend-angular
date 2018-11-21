import {
    Component
} from '@angular/core';
import {
    ActivatedRoute,
    Router,
    Params
} from '@angular/router';

@Component({
    selector: 'answer-question-component',
    templateUrl: './answer-question.component.html',
    styleUrls: ['./answer-question.component.scss']
})
export class  AnswerQuestionCommunityComponent {
    constructor (
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    public ngOnInit (): void {
        this.route.parent.params.subscribe((params) => {});
    }
}

