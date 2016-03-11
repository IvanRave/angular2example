import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {HeroSvc} from '../svc/hero';
import {Hero} from '../mdl/hero';

@Component({
	selector: 'my-dashboard',
	// Angular doesn't support module-relative paths.
	templateUrl: 'app/my-dashboard/my-dashboard.html',
	styleUrls: ['app/my-dashboard/my-dashboard.css']
})
export class MyDashboard implements OnInit {
	heroes: Hero[] = [];
	errorMsg: string;
	
	constructor(private _heroSvc: HeroSvc,
				private _router: Router) {}

	ngOnInit() {
		this._heroSvc.getHeroesRemote()
			.then(arr => this.heroes = arr.slice(1,5))
			.catch(err => this.errorMsg = <string>err);
	}

	gotoDetail(hero: Hero) {
		let linkData = ['HeroDetail', {id: hero.id}];
		this._router.navigate(linkData);
	}
}
