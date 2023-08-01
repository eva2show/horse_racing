import {ClassName, View, ViewProps} from '@tweakpane/core';
import {Object3DResolvable} from './model';

const className = ClassName('list');

const genItem = (obj:Object3DResolvable,element: HTMLElement) =>{

	const icon = document.createElement('span');
	icon.classList.add(className('icon'));

	switch(obj.type){

		case "Mesh":
			icon.innerText = "G";
		break;

		case "Object3D":
			icon.innerText = "O";
		break;

		case "MeshStandardMaterial":
			icon.innerText = "M";
		break;

		default:
			icon.innerText = "U";
			break;

	}


	const title = document.createElement('span');
	title.classList.add(className('title'));

	title.innerText = obj.name;

	const context= document.createElement('div');
	context.classList.add(className('context'));
	
	context.appendChild(icon);
	context.appendChild(title);
	element.appendChild(context);

};


/**
 * @hidden
 */
interface Config {
	viewProps: ViewProps;
}

/**
 * @hidden
 */
export class SeparatorView implements View {
	public readonly element: HTMLElement;
	public readonly list: HTMLElement;
	public selected:HTMLElement|null=null;

	

	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div');
		this.element.classList.add(className());
		config.viewProps.bindClassModifiers(this.element);

		this.list = doc.createElement('ul');
		this.list.classList.add(className('body'));
		this.element.appendChild(this.list);
	}

	findElement(id:number){

		for(let i = 0,l =this.list.children.length;i<l;i++){
			
			let find_data = this.list.children[i].getAttribute("data-id");
			let find_id = 0;

			if(find_data){
				find_id = Number(find_data);
			}

			if(find_id && find_id === id){
				return this.list.children[i]
			}
		}


	}

	addItem(obj:Object3DResolvable){

		const item = document.createElement('li');
		item.classList.add(className('item'));

		// item.innerText = obj.name;

		genItem(obj,item);
		this.list.appendChild(item);
		item.setAttribute("data-id", String(obj.id) );
		return item

	}


	select(obj:Object3DResolvable){


		// console.log("view-selelct",obj);

		if(this.selected && Number(this.selected.getAttribute("data-id")) === obj.id ){
				return;
		}

		const item = this.findElement(obj.id) as HTMLElement;

		if(!item) return;


		item.classList.add(className('select'));

		if(this.selected){
			this.selected.classList.remove(className('select'));
		}

		this.selected = item;
		




	}
	removeItem(obj:Object3DResolvable){

	}

}
