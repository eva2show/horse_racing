import { Vector3 } from 'three';
import {select} from './config';

// console.log("config:",config)

class BaseInspector {
    
    constructor(ops={}){
        this.object = null;
        this.params = null;
        this.pane = null;
        this.parent = ops.parent;
    }
    attach( object, pane ){

        if(!object)return;
        this.object = object;
        if(pane) this.pane = pane;

        this.update();
        this.render();
        return this;
    }

    detach(){
        this.object = null;
        this.params = null;
        if(this.pane && this.pane.dispose)this.pane.dispose();
        this.pane = null;
        // this.parent = null;
    }

    
    addParams( object, op, v ){

        v = v ===undefined ? object[op.name] : v;

        switch(op.type){




            case "float":
            case "string":
                this.params[op.name] = v;
            break;

            case "boolean":
                this.params[op.name] = !!v;
            break;

            case "euler":
                this.params[op.name] = new Vector3( v.x, v.y, v.z );
            break;

            case "vector3":
                this.params[op.name] = v.clone();
            break;

            case "color":
                this.params[op.name] = v.clone();
            break;

            case "texture":
                // console.log("texture:",op.name,v);

                if(!v){
                    this.params[op.name] = "";
                }else{
                    let img = v.source.toJSON();
                    this.params[op.name] =  Array.isArray(img.url)?img.url[0]:img.url ;
                    // console.log("texture--url",img);
                }
               

            break;

            case "vector2":
                this.params[op.name] = v.clone();

                // this.params[op.name] = 1;
            break;

        }


    }

    setParams( object, ops ){
        ops.forEach( c => {
            if(this.params[c.name] === undefined){
                this.addParams(object,c);
            }
        });
    }

   
    bindChange( pane, op ){

        let option = op.config?Object.assign({},op.config):{};

        if(op.disabled===true){
            option.disabled = true;
        }

        switch(op.type){
            case "color":
            option.color ={type: 'float'};
            break;

            case "texture":
                option.view = 'input-image';
            break;

            case "select":
                option.options = select.texture[op.name];

                // console.log("select:",op.name,this.params,option)
            break;

        }

        pane.addBinding(this.params, op.name, option).on("change",ev=>{
            this.__change( op, ev );
        });
      
    }

    __change( op, ev ){

        if(!this.object)return;

        // 如果change 返回true 就跳过赋值；
        if( this.__onChange(op, ev) ) return;

        switch(op.type){
            case "string":
            case "float":
            case "boolean":
                this.object[op.name] = ev.value;
            break;

            case "select":

            console.log("select",op.name,this.object[op.name] , ev.value)
                this.object[op.name] = ev.value;
            break;

            case "vector3":
                this.object[op.name].copy(ev.value);
            break;

            case "euler":
                this.object[op.name].set(ev.value.x, ev.value.y, ev.value.z );
            break;

            case "color":
                this.object[op.name].copy(ev.value);
            break;

            case "texture":
                // this.params[op.name] = 1;
            break;

            case "vector2":
                this.object[op.name].copy(ev.value);
            break;

        }
        
    }

    __render( pane, ops  ){


        ops.forEach( c => {
            this.bindChange(pane,c);
        });
    }

    render(){}
    __onChange(){}

}


export {BaseInspector};