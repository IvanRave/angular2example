import { Pipe, PipeTransform } from "angular2/core";

@Pipe({
	name: "orderBy",
	pure: false
})
export class OrderByPipe implements PipeTransform {
	
	transform(arr: any[], args: string[]): any[] {
		var propName = args[0];
		if (!propName){
			return arr;
		}

		arr.sort((a: any, b: any) => {
			if (a[propName] > b[propName]) {
				return -1;
			} else if (a[propName] < b[propName]) {
				return 1;
			} else {
				return 0;
			}
		});
		return arr;
	}
	
}
