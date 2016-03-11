// strongly typed Hero
// If we need a Hero that goes beyond simple properties,
//   a Hero with logic and behavior, we must define a class.
// If we only need type checking, the interface is sufficient
//   and lighter weight.
// Transpiling a class to JavaScript produces code.
// Transpiling an interface produces — nothing.
// If the class does nothing (and there is nothing for a Hero class to do right now), we prefer an interface.
// export interface Hero {
	// id: number;
	// name: string;
// }
// export as a class to test it
export class Hero {
	constructor(public id: number, public name: string) {}
}
