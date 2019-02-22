import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    transform(value: any, filteredString: string, property: string): any {
        if (!value.length || !filteredString) {
            return value;
        }
        const filteredArray = [];
        for (const item of value) {
            if (item[property].substr(0, filteredString.length).toLowerCase() === filteredString.toLowerCase()) {
                filteredArray.push(item);
            }
        }
        return filteredArray;
    }

}
