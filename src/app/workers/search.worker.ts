import {Injectable} from '@angular/core';
import {SearchPropertyItem, SearchType} from '../factory/worker/SearchPropertyItem';

@Injectable({
  providedIn: 'root'
})
export class SearchWorker {
  public searchValueInsideProperty(value: string, list: any[], property: string) {
    if (value != null) {
      value = value.toLowerCase();
      if (list) {
        return list.filter(item => {
          return item[property].toLowerCase().indexOf(value) > -1 && item[property];
        });
      }
    }
  }
  public searchValueInsideProperties(value: string, list: any[], properties: string[]) {
    if (value != null) {
      value = value.toLowerCase();
      if (list) {
        return list.filter(item => {
          return properties.filter(property => {
            return item[property].toLowerCase().indexOf(value) > -1 && item[property];
          }).length > 0;
        });
      }
    }
  }
  public searchValueByFunction<T>(value: string, list: T[], func: ((itemValue: T) => string))  {
    if (value != null) {
      value = value.toLowerCase();
      if (list) {
        return list.filter(item => {
          return func(item).toLowerCase().indexOf(value) > -1 && func(item);
        });
      }
    }
  }
  public searchValueBySearchPropertyItem(value: string, list: any[], searchItemProperties: SearchPropertyItem[]) {
    if (value != null) {
      value = value.toLowerCase();
      if (list) {
        return list.filter(item => {
          return searchItemProperties.filter(property => {
            if (property.type === SearchType.Property) {
              return item[property.value].toLowerCase().indexOf(value) > -1 && item[property.value];
            } else if (property.type === SearchType.Function) {
              return property.value(item).toLowerCase().indexOf(value) > -1 && property.value(item);
            }
          }).length > 0;
        });
      }
    }
  }


}
