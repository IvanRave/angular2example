import {Injectable}     from 'angular2/core';

import {HttpSvc} from './http';
import {Hero}   from '../mdl/hero';

// TypeScript sees the @Injectable() decorator
//   and emits metadata about our service,
//   metadata that Angular may need to inject other dependencies
//   into this service.
// Components such as services, directives, filters, and animations
//   are defined by an injectable factory method or constructor function.
// These components can be injected with "service" and "value"
//   components as dependencies.
@Injectable()
export class HeroSvc {
	// cache
	heroes: Hero[] = [];
	
	constructor(private _httpSvc: HttpSvc){}

	// We may also pass an error message back to the component for presentation to the user but only if we can say something the user can understand and act upon.
	private handleError(res: any) {
		let msg: string = '';
		if (res.status === 404){
			msg = "Data is not found";
		}		
		return Promise.reject(msg || 'Server error');
		//Observable.throw(msg || 'Server error');
	}
	
	reqOrCache() {
		// todo: check cache by other condition
		if (this.heroes.length > 0) {
			//console.log('from cache', this.heroes);
			return Promise.resolve(this.heroes);
		}
		
		return this._httpSvc.get('app/data/heroes.json')
			.then(arr => {
				// save to cache
				// use 'this' from outer scope
				this.heroes = <Hero[]>arr;
				
				return this.heroes;

				// angular2/http behavior
				// var obj = res.json();
				// return <Hero[]> obj.data;
			})
			.catch(this.handleError);
	}
	
	// The Angular HTTP client follows the ES2015 specification
	//   for the response object returned by the Fetch function.
	// That spec defines a json() method that parses the response body
	//   into a JavaScript object.
	// The component that calls the HeroService wants heroes. It has no interest in what we do to get them. It doesn't care where they come from. And it certainly doesn't want to deal with a response object.
	getHeroesRemote() {
		return this.reqOrCache();	
	}

	getHero(id: number) {
		// todo: use separated method to retrieve one item
		return this.reqOrCache()
			.then(arr => arr.filter(hero => hero.id === id)[0]);

	}

	// addHero(name: string) : Promise<Hero> {
	// 	let body = JSON.stringify({name});
	// 	let headers = new Headers({
	// 		'Content-Type': 'application/json'
	// 	});
	// 	let options = new RequestOptions({headers: headers});

	// 	return this.http.post('data/heroes.json',
	// 						  body,
	// 						  options)
	// 		.toPromise()
	// 		.then(res => <Hero> res.json().data)
	// 		.catch(this.handleError);
	// }
}

// getHeroes() {
// 	return Promise.resolve(HEROES);
// }

// getHeroesSlowly() {
// 	return new Promise<Hero[]>(resolve =>
// 							   setTimeout(() => resolve(HEROES), 2000)
// 							  );
//	}


// In fact, the http.get method returns an Observable
//  of HTTP Responses (Observable<Response>) from the RxJS library
//  and map is one of the RxJS operators.
// The http.get does not send the request just yet!
// This observable is cold which means the request won't go out
//   until something subscribes to the observable
//   That something is the HeroListComponent.		
