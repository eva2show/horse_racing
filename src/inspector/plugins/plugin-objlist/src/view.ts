import {ClassName, View, ViewProps} from '@tweakpane/core';
import {setting,open} from './icons';
import {Object3DResolvable} from './model';

interface Config {
	viewProps: ViewProps;
}

const className = ClassName('img');

export class PluginView implements View {
	public readonly element: HTMLElement;
	
	public readonly list: Object3DResolvable[] = [];

	public readonly ul: HTMLElement;


	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div');
		this.element.classList.add(className());
		config.viewProps.bindClassModifiers(this.element);

		this.ul = doc.createElement('div');
		this.ul.classList.add(className());
		
		// this.element.appendChild(this.input);


	}


}
