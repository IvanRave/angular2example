import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Hero} from '../mdl/hero';
import {HeroSvc} from '../svc/hero';


@Component({
	selector: 'my-hero-detail',
	// The input declaration ensures that consumers of our directive can only bind to the properties of our public API ... nothing else.
	//inputs: ['hero'],
	templateUrl: 'app/my-hero-detail/my-hero-detail.html',
	styleUrls: ['app/my-hero-detail/my-hero-detail.css']
})
export class MyHeroDetail implements OnInit {
	hero: Hero;
	errorMsg: string;

 	// executes, when AppCmp creates a HeroDetail (once)
	constructor(private _heroSvc: HeroSvc,
				private _routeParams: RouteParams) {}

	ngOnInit(){

		let id = +this._routeParams.get('id');
		console.log('ngoninit', id);

		// The hero id is a number. Route parameters are always strings. So we convert the route parameter value to a number with the JavaScript (+) operator.
		this._heroSvc.getHero(id)
			.then(hero => this.hero = hero)
			.catch(err => this.errorMsg = <string>err);
	}

	goBack() {
		window.history.back();
	}

}
