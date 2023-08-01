import {ClassName, View, ViewProps} from '@tweakpane/core';
import {setting,open} from './icons';

interface Config {
	viewProps: ViewProps;
}

const className = ClassName('img');

export class PluginView implements View {
	public readonly element: HTMLElement;
	public readonly input: HTMLElement;
	// public readonly bt_: HTMLElement;
	public readonly bt_open: HTMLElement;
	public readonly check_: HTMLInputElement;

	private image_: HTMLImageElement;
	private info_: HTMLElement;
	
	public fileName:string;
	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div');
		this.element.classList.add(className());
		config.viewProps.bindClassModifiers(this.element);

		this.input = doc.createElement('input');
		this.input.classList.add(className('input'));
		this.input.setAttribute('type', 'file');

		// this.input.setAttribute('accept', config.extensions.join(','));

		this.element.appendChild(this.input);

		this.image_ = doc.createElement('img');
		this.image_.classList.add(className('image'));

		const imageFit = "contain";
		this.image_.classList.add(className(`image_${imageFit}`));
		this.element.classList.add(className('area_root'));
		this.element.appendChild(this.image_);

		const leftBase = 70 , spw = 36;

		this.check_ = doc.createElement('input');
		this.check_.setAttribute('type', 'checkbox');
		this.check_.classList.add(className('check'));
		this.element.appendChild(this.check_);
		this.check_.style.left = leftBase + (spw*1) + "px";

		this.bt_open = doc.createElement('button');
		this.bt_open.innerHTML = open;
		this.bt_open.classList.add(className('bt'));

		this.bt_open.style.left = leftBase + "px";

		this.element.appendChild(this.bt_open);

		this.info_ = doc.createElement('span');
		this.info_.classList.add(className('info'));
		this.info_.style.left = leftBase + "px";
		
		this.element.appendChild(this.info_);
		this.fileName = "No texture";

	}

	setInfo(option:any){
		const {width = 100,height=100} = option;
		this.info_.innerHTML = `${width}x${height}`;
	}	

	changeImage(src: string) {
		this.image_.src = src;
	}

	changeDraggingState(state: boolean) {
		const el = this.element;
		if (state) {
			el?.classList.add(className('area_dragging'));
		} else {
			el?.classList.remove(className('area_dragging'));
		}
	}
}
