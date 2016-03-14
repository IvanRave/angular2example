import {Component, OnInit} from 'angular2/core';
import {RouteParams, CanDeactivate, ComponentInstruction} from 'angular2/router';

import {Hero} from '../mdl/hero';
import {HeroSvc} from '../svc/hero';
import {OrderByPipe} from '../pipes/order-by';

@Component({
	selector: 'my-hero-detail',
	// The input declaration ensures that consumers of our directive can only bind to the properties of our public API ... nothing else.
	//inputs: ['hero'],
	pipes: [ OrderByPipe ],
	templateUrl: 'app/my-hero-detail/my-hero-detail.html',
	styleUrls: ['app/my-hero-detail/my-hero-detail.css']
})
export class MyHeroDetail implements OnInit, CanDeactivate {
	hero: Hero;
	errorMsg: string;
	nameEdit: string;
	inputFlow: any[] = [];

 	// executes, when AppCmp creates a HeroDetail (once)
	constructor(private _heroSvc: HeroSvc,
				private _routeParams: RouteParams) {}

	// We put the data access logic in the ngOnInit method rather than inside the constructor to improve the component's testability
	ngOnInit(){
		
		let id = +this._routeParams.get('id');
		console.log('ngoninit', id);

		// The hero id is a number. Route parameters are always strings. So we convert the route parameter value to a number with the JavaScript (+) operator.
		this._heroSvc.getHero(id)
			.then(hero => this.hero = hero)
			.then(() => this.nameEdit = this.hero.name)
			.catch(err => this.errorMsg = <string>err);
	}

	// Notice that the routerCanDeactivate method can return synchronously; it returns true immediately if there is no crisis or there are no pending changes. But it can also return a promise and the router will wait for that promise to resolve to truthy (navigate) or falsey (stay put).
	routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction): any {
		if (this.nameEdit === this.hero.name){
			return true;
		}
		console.log('next,prev', next, prev);
		return confirm('Are you sure? Data is not saved.');
	}

	saveName(tmpNameEdit: string){		
		this.hero.name = tmpNameEdit;
	}

	goBack() {
		window.history.back();
	}

	onKey(val: string){
		// if (ev.target.value !== this.inputFlow[this.inputFlow.length - 1]){
		this.inputFlow.push({
			created: new Date(),
			msg: val
		});
		//	}
	}
}
