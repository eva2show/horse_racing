import { BaseInspector } from "./BaseInspector";
import { Vector3, Box3 } from 'three'
import { object3d } from './config';


const DEF_BOX = new Box3();
class Object3DInspector extends BaseInspector {

    constructor(option) {
        super(option);
    }

    update() {

        const object =  this.object;
        this.params = {};
        this.params.info = `${object.type}:${object.uuid.slice(-12)}`;
        DEF_BOX.setFromObject(object);
        this.params.bounds = new Vector3;
        DEF_BOX.getSize(this.params.bounds);
        this.setParams(object, object3d.ops);

    }

    render(){


        this.pane =  this.parent.addPage({
            title:"对象"
        });
    
        this.__render(this.pane, object3d.ops);
    }

}

export { Object3DInspector }