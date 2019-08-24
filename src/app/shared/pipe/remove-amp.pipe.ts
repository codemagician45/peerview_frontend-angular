import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeAmp',
    pure: false
})
export class RemoveAmpPipe implements PipeTransform {
    public transform (text: string): string {
        if (text) {
            return text.replace('amp;', '');
        }

        return '';
    }
}
