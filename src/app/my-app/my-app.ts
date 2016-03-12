import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
//import {HTTP_PROVIDERS} from 'angular2/http';
import {HttpSvc} from '../svc/http';
//import 'rxjs/Rx';

import {MyHeroList} from '../my-hero-list/my-hero-list';
import {MyHeroDetail} from '../my-hero-detail/my-hero-detail';
import {MyDashboard} from '../my-dashboard/my-dashboard';
import {MyAgency} from '../my-agency/my-agency';
import {HeroSvc} from '../svc/hero';

// It's natural to combine
// - the creation of a new router,
// - its configuration,
// - and its assignment to a host component in a single step.
// That's the purpose of the @RouteConfig decorator
// The @RouteConfig decorator creates a new router
// When the browser's location URL changes to match the path segment /agency, create or retrieve an instance of the MyAgency and display its view.
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
	}, {
		// Notice that the path ends with a slash and three trailing periods (/...)
		// That means this is an incomplete route (a non-terminal route). The finished route will be some combination of the parent /crisis-center/ route and a route from the child router that belongs to the designated component.
		path: '/agency/...',
		name: 'Agency',
		component: MyAgency
	}
])
// A router also needs a Host Component, a point of origin for its navigations.
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
