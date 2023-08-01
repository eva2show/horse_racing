import * as config from './config';
import {BaseInspector} from "./BaseInspector";
import {TextureInspector} from "./TextureInspector";

// console.log("select:",select)

class MaterilsInspector  extends BaseInspector {

    constructor(option){
        super(option);
        this.inspectors = [];
        this.editor = option.editor;
    }
   
    update(){

        const object =  this.object;
        this.params = {};
        this.params.info = `${object.type}:${object.uuid.slice(-12)}`;
        const __config = config[object.type];
        this.setParams(object, __config.ops);

    }

    detach(){

        super.detach();
        this.inspectors.forEach(t=>{
            t.detach();
        });
    }

    bindTexture( pane, ops ){

        const object =  this.object;
        const ti = new TextureInspector({
            name:ops.name,
            editor:this.editor
        });

        ti.attach(object,pane);
        this.inspectors.push(ti);

    }

    render(){

        const __config = config[this.object.type];
        if( !__config) return;

        this.pane =  this.parent.addPage({
            title:"材质"
        });
    
        const ops = __config.ops;

        ops.forEach( c => {

            if(c.type === 'texture'){

                this.bindTexture(this.pane,c);

            }else{
                this.bindChange(this.pane,c);
            }
        });
        
    }

   
}

export { MaterilsInspector }