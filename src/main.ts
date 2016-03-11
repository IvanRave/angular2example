// Notice that we import the bootstrap function
//   from angular2/platform/browser, not angular2/core.
// But it is possible to load a component in a different environment.
//   We might load it on a mobile device with Apache Cordova
//   or NativeScript.
// We might wish to render the first page of our application
//   on the server to improve launch performance or facilitate SEO.

// We might launch the AppComponent in multiple environments
//	 with different bootstrappers.
// Testing the component is much easier if it doesn't also try
//   to run the entire application.
// Let's make the small extra effort to do it the right way.
import {bootstrap} from 'angular2/platform/browser'


import {MyApp} from './app/my-app/my-app'

// import {Component} from 'angular2/core'
// @Component({
// 	selector: 'my-app',
// 	template: '<div>Demo app</div>'
// })
// class MyApp {
// 	title: string = "demo app";
// }

bootstrap(MyApp)
	.catch(err => console.error('bootstrap', err));
