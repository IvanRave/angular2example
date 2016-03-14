import {Component,OnInit} from 'angular2/core';
import {RouterOutlet, RouteConfig} from 'angular2/router';
import {AgencySvc} from './agency-svc';
import {MyAgencyList} from './my-agency-list';
import {MyAgencyDetail} from './my-agency-detail';
import {MyAgencyCreation} from './my-agency-creation';

// A shell of agency management
// Defines Agency child routes
// MyApp defines top-level routes
// Normally paths that begin with / refer to the root of the application. Here they refer to the root of the child component!.
@RouteConfig([
	{
		path:'/',
		name: 'AgencyList',
		component: MyAgencyList,
		// it allows to use links to /agency 
		useAsDefault: true
	},
	{
		path:'/detail',
		name: 'AgencyDetail',
		component: MyAgencyDetail
	},
	{
		path: '/add',
		name: 'AgencyCreation',
		component: MyAgencyCreation
	}
])
@Component({
	template: '<router-outlet></router-outlet>',
	directives: [RouterOutlet],
	providers: [AgencySvc]
})
export class MyAgency {
	
}
