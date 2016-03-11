import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {Hero} from '../mdl/hero';
import {HeroSvc} from '../svc/hero';

// ngIf and ngFor are called “structural directives”
//   because they can change the structure of portions of the DOM.
// In other words, they give structure
//   to the way Angular displays content in the DOM.

// []
// This is the syntax for a Property Binding, a binding in which data flows one way from the data source

// <input [(ngModel)]="selectedHero.name" placeholder="name"/>

// the hero property is the target of a property binding —
//   it's in square brackets to the left of the (=).

// A @Component decorator that tells Angular
//   what template to use and how to create the component.
@Component({
    selector: 'my-hero-list',
	// the AppComponent creates an instance of HeroDetail by virtue of the <my-hero-detail> tag at the bottom of its template
	//directives: [MyHeroDetail],
	templateUrl: 'app/my-hero-list/my-hero-list.html',
	// When we assign styles to a component they are scoped to that specific component. Our styles will only apply to our AppComponent and won't "leak" to the outer HTML.
	styleUrls: ['app/my-hero-list/my-hero-list.css']
})
export class MyHeroList implements OnInit {
	selectedHero: Hero;
	heroes: Hero[];
	errorMsg: any;
	
	// We prefix private variables with an underscore (_) to warn readers of our code that this variable is not part of the component's public API.
	constructor(private _heroSvc: HeroSvc,
				private _router: Router) {}
		
	getHeroes() {
		this._heroSvc.getHeroesRemote()
			.then(heroes => this.heroes = heroes)
			.catch(err => this.errorMsg = <string>err);
	}

	// addHero(name: string) {
	// 	if (!name) { return; }
	// 	this._heroSvc.addHero(name)
	// 		.subscribe(
	// 			hero => this.heroes.push(hero),
	// 			err => this.errorMsg = <any>err);
	// }

	ngOnInit() {
		this.getHeroes();
	}
	
	// no initialization before a user will select an item
	onSelect(hero: Hero) {
		this.selectedHero = hero;
	}

	gotoDetail(tmpHero: Hero) {
		this._router.navigate(['HeroDetail', {
			id:	tmpHero.id
		}]);
	}
}


// Every Angular app has at least one root component,
//   conventionally named AppComponent,
//   that hosts the client user experience.
