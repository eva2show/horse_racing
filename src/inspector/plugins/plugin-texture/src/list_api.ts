import {BladeApi,Emitter} from '@tweakpane/core';

import {SeparatorController} from './list_controller';
import {Object3DResolvable} from './model';


export interface ListEvents {
	select: {
		object: Object3DResolvable;
	}
}

export class SeparatorBladeApi extends BladeApi<SeparatorController> {
	
	public readonly objects: Map<number,Object3DResolvable> = new Map<number,Object3DResolvable>;
	public readonly emitter: Emitter<ListEvents> = new Emitter();

	public  selected: number=0;


	constructor(controller:SeparatorController){
		super(controller);

		// console.log("SeparatorBladeApi",this);
	}

	addItem(obj:Object3DResolvable){

		if(this.objects.has(obj.id))return;
		this.objects.set(obj.id,obj);
		const item = this.controller.view.addItem(obj);
		item.addEventListener("click",e=>{
			this.select(obj,true);
		});

	}


	removeItem(obj:Object3DResolvable){

		if(!this.objects.has(obj.id))return;
		this.objects.delete(obj.id);
		this.controller.view.removeItem(obj);

	}

	select(obj:Object3DResolvable,isE:boolean=false){

		if(!this.objects.has(obj.id))return;
		this.controller.view.select(obj);

		if(isE){
			this.emitter.emit("select",{
				object:obj
			});
		}

		this.selected = obj.id;

	}

	setList(list:Object3DResolvable[]){

		list.forEach( obj=> this.addItem(obj));

		// console.log("setList",list);
		// console.log("setList-item",this.controller.view.list.children);

	}

}
