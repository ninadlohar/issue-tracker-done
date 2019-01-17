import { Pipe, PipeTransform } from '@angular/core';
import { issues } from './issue.model';

@Pipe({
  name: 'reporterFilter'
})
export class ReporterFilter implements PipeTransform {
  transform(list: Array<issues>, value: string): any {
    if (!list) { return null; }
    if (!value) { return list; }
    value = value.toLowerCase();
    return list.filter(t => t.reporter.toLowerCase().includes(value))
  }
}