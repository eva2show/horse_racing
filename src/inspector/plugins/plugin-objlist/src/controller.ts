import { Controller, Value, ViewProps, Emitter } from '@tweakpane/core';

import {Object3DResolvable} from './model';

import { cloneImage, createPlaceholderImage, loadImage } from './utils';
import { PluginView } from './view';

interface Config {
	value: Value<Object3DResolvable>;
	viewProps: ViewProps;
}

export interface ImgEvents {
	check: {
		checked: boolean;
	},
	file: {
		file: File;
	};
	open: {
		name: string;
	};
}

export class PluginController implements Controller<PluginView> {

	public readonly emitter: Emitter<ImgEvents> = new Emitter();
	public readonly value: Value<Object3DResolvable>;
	public readonly view: PluginView;
	public readonly viewProps: ViewProps;

	constructor(doc: Document, config: Config) {
		this.value = config.value;
		this.viewProps = config.viewProps;

		this.view = new PluginView(doc, {
			viewProps: this.viewProps
		});

	}
	addObject( object ){

	}

}
