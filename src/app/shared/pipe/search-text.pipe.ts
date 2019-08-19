import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchText',
    pure: false
})
export class SearchTextPipe implements PipeTransform {
    public transform (items: any[], searchText: string, selectedSkills: any[]): any[] {

        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        searchText = searchText.toLocaleLowerCase();
        let filterItems = [];

        items.map((item, index) => {
            let check = true;

            selectedSkills.map((skill, index1) => {
                if (item.id === skill.id) {
                    check = false;
                }
            });

            if (check) {
                filterItems.push(item);
            }
        });

        return filterItems.filter(it => {
            return it.name.toLocaleLowerCase().includes(searchText);
        });
    }
}
