import {Component,OnInit} from 'angular2/core';
import {
	FormBuilder,
	Validators,
	Control,
	ControlGroup
} from 'angular2/common';

import {Agency} from './agency';

@Component({
	templateUrl: 'app/my-agency/my-agency-creation.html'
	// already registered by initial
	//	directives: [FORM_DIRECTIVES]
})
export class MyAgencyCreation implements OnInit {	
	powers = ['Really Smart', 'Super Flexible',
			  'Super Hot', 'Weather Changer'];

	model = new Agency(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

	// Controls have values and validation state, which is determined by an optional validation function
	clName: Control;

	// Defines a part of a form, of fixed length, that can contain other controls.
	clForm: ControlGroup;

	constructor(private _formBuilder: FormBuilder){}

	ngOnInit(){
		// a default value, a validator and a asynchronous validator.
		// required, minlenght, maxlength can be setted in an element
		this.clName = new Control(
			'',
			Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15)
			])
		);

		this.clForm = this._formBuilder.group({
			clName:  this.clName
		});
	}
	
	onSubmit(tmpModel: Agency) {
		console.log('submitted', tmpModel);
	}
	
	// TODO: Remove this when we're done
	// We threw in a diagnostic property at the end to return a JSON representation of our model. It'll help us see what we're doing during our development; we've left ourselves a cleanup note to discard it later.
	get diagnostic() { return JSON.stringify(this.model); }
}
