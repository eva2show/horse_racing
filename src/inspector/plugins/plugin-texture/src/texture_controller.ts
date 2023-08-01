import { Controller, Value, ViewProps, Emitter } from '@tweakpane/core';

import { ImageResolvable } from './model';
import { cloneImage, createPlaceholderImage, loadImage } from './utils';
import { PluginView } from './texture_view';

interface Config {
	value: Value<ImageResolvable>;
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

	public readonly value: Value<ImageResolvable>;
	public readonly view: PluginView;
	public readonly viewProps: ViewProps;
	private placeholderImage: HTMLImageElement | null = null;


	constructor(doc: Document, config: Config) {
		this.value = config.value;
		this.viewProps = config.viewProps;

		this.view = new PluginView(doc, {
			viewProps: this.viewProps
		});

		this.onFile = this.onFile.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);

		this.view.input.addEventListener('change', this.onFile);

		this.view.bt_open.addEventListener('click', e => {
			
			this.emitter.emit("open", {
				name:""
			});

		});

		this.view.check_.addEventListener('change', e => {
			this.emitter.emit("check", {
				checked: !!e.target?.checked
			});
		});

		this.view.element.addEventListener('drop', this.onDrop);
		this.view.element.addEventListener('dragover', this.onDragOver);
		this.view.element.addEventListener('dragleave', this.onDragLeave);

		this.viewProps.handleDispose(() => {
			this.view.input.removeEventListener('change', this.onFile);
			this.view.input.removeEventListener('drop', this.onDrop);
			this.view.input.removeEventListener('dragover', this.onDragOver);
			this.view.input.removeEventListener('dragleave', this.onDragLeave);
		});

		// this.value.emitter.on('change', this.handleValueChange.bind(this));
		// this.handleValueChange();

	}

	setCheck(check:boolean){
		this.view.check_.checked = check;
	}

	setSize(option:any){
		this.view.setInfo(option);
	}

	changeImage(src:string){
		this.view.changeImage(src);
	}

	handleFile(file:File){

		this.emitter.emit("file", {
			file: file
		});

		this.view.fileName = file.name;
	}
	

	private onFile(event: Event): void {

		const files = (event?.target as HTMLInputElement).files;
		if (!files || !files.length) return;
		const file = files[0];
		
		this.handleFile(file);
		
		// this.view.fileName = file.name;
		// const url = URL.createObjectURL(file);
		// this.setValue(url);
		// this.updateImage(url);
	}

	private async onDrop(event: DragEvent) {
		event.preventDefault();
		try {
			const { dataTransfer } = event;
			const file = dataTransfer?.files[0];
			if (file) {
				this.handleFile(file);
			}
		} catch (e) {
			console.error('Could not parse the dropped image', e);
		} finally {
			this.view.changeDraggingState(false);
		}
	}

	private onDragOver(event: Event) {
		event.preventDefault();
		this.view.changeDraggingState(true);
	}

	private onDragLeave() {
		this.view.changeDraggingState(false);
	}

}
