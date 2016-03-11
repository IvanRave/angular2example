import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
//import {HTTP_PROVIDERS} from 'angular2/http';
import {HttpSvc} from '../svc/http';
//import 'rxjs/Rx';

import {MyHeroList} from '../my-hero-list/my-hero-list';
import {MyHeroDetail} from '../my-hero-detail/my-hero-detail';
import {MyDashboard} from '../my-dashboard/my-dashboard';
import {HeroSvc} from '../svc/hero';


@RouteConfig([
	{
		path: '/heroes',
		// the official name of the route; it must begin with a capital letter to avoid confusion with the path 
		name: 'HeroList',
		component: MyHeroList
	},{
		path: '/dashboard',
		name: 'Dashboard',
		component: MyDashboard,
		useAsDefault: true
	},{
		path: '/detail/:id',
		name: 'HeroDetail',
		component: MyHeroDetail
	}
])
@Component({
	selector: 'my-app',
	directives: [
		ROUTER_DIRECTIVES
	],
	// teach the DI how to make a HeroSvc by registering a provider
	// The providers array tells Angular to create a fresh instance
	//   of the HeroService when it creates a new AppComponent. 
	providers: [
		ROUTER_PROVIDERS,
		//		HTTP_PROVIDERS,
		HttpSvc,
		HeroSvc
	],
	styleUrls: ['app/my-app/my-app.css'],
	templateUrl: 'app/my-app/my-app.html'
})
export class MyApp {
	title : string = 'My application';	
}
