import { BaseInspector } from "./BaseInspector";
import * as THREE from 'three'
import { select, Texture } from './config';
import { previewRenderer } from '../Preview';
import {
	FolderApi,
	InputBindingController,
	MonitorBindingController,
	PluginPool,
} from '@tweakpane/core';

const selectMap = (function () {
    let smap = {};
    for (let k in select.texture) {
        smap[k] = {};
        let obj = select.texture[k];
        for (let k1 in obj) {
            smap[k][obj[k1]] = k1;
        }
    }
    return smap
})();


const LOADER = new THREE.TextureLoader();
const DEF_TEX = LOADER.load("assets/uv_test.jpg");

class TextureInspector extends BaseInspector {

    constructor(option) {
        super(option);
        //  object = materil
        //  name = material [map name]
        this.name = option.name || "texture";
        this.material = null;
        this.editor = option.editor;
        this.controller = null;
    }
    attach( material, pane) {

        if(!material || !material.isMaterial){
            console.warn("参数错误，object 必须是材质类型");
            return;
        };

        this.material = material;

        let tex = material[this.name];

        if(!tex){
            tex = DEF_TEX.clone();
            tex.userData.enable = false;
            tex.name = this.name;
        }else{
            tex.userData.enable = true;
        }

        tex.userData.material = material;
        this.object = tex;
        if (pane) this.parent = pane;

        this.update();
        this.render();
        return this;
    }

    __onChange(op, ev) {

        if(op.name === 'enable'){

           this.pane.title = this.name + (ev.value?"*":"");
            if( ev.value ){
                this.material[this.name] = this.object;
            }else{
                this.material[this.name] = null;
            }
            this.object.userData.enable = ev.value;

        }
        
        this.object.needsUpdate = true;
        this.material.needsUpdate = true;

    }
    update() {

        const object = this.object;
        this.params = this.params || {
            image:""
        };

        this.params.name = object.name;
        // this.params.enable = object.userData.enable;

        // let w = 0, h = 0;
        // if (object.image) {
        //     w = object.image.width;
        //     h = object.image.height;
        // }
        // this.params.size = `${w}x${h}`;

        Texture.ops.forEach(c => {

            if (c.type === 'select') {
                this.params[c.name] = object[c.name];
            } else if (this.params[c.name] === undefined) {
                this.addParams(object, c);
            }
        });
    }

    updateView(tex){

        this.controller.setSize(tex.image);
        // this.params.name = filename;
        const imgsrc = this.editor.previewRenderer.getPreviewImg(tex);
        this.controller.changeImage(imgsrc);
        this.controller.setCheck(this.object.userData.enable);

    }

    async loadImg( file ){

        const filename = file.name;
		const extension = filename.split('.').pop().toLowerCase();
        const extensions = ['jpg','png','tga'];

        // console.log("loadImg",extension);

        if(!extensions.includes(extension)){
            console.warn("不支持的纹理格式："+ filename);
            return;
        }

        let tex = await this.editor.loader.loadFile(file);
        tex.name = filename;
        tex.userData.enable = true;
        // this.object.image = tex.image;
        this.object = tex;

        this.__onChange({name:"enable"},{value:true});
        
        this.material[this.name] = this.object;

        this.updateView(tex);
        this.object.needsUpdate = true;
        this.material.needsUpdate = true;

        console.log("this",this);
        this.update();
        this.pane.refresh();
        // this.refresh();
        

    }


    render() {


        this.pane = this.parent.addFolder({
            expanded:false,
            title: this.name + (this.object.userData.enable?"*":"")
        });

        // enable  FY  url 
        let fy = this.pane.addBinding( this.params, 'image', {
            view:'three-texture'
        });

        // console.log("three-texture-fy:",fy)
        const controller = this.controller = fy.controller.valueController;
        controller.setCheck(this.object.userData.enable);

        controller.emitter.on("check",e=>{
            this.__onChange({name:"enable"},{value:e.checked});
            // console.log("valueController-check:",e);
        });

        controller.emitter.on("open",async e=>{
            let f = await this.editor.loader.openFile();
            console.log("open:",f);
            this.loadImg(f);
        });

       

        this.__render(this.pane, Texture.ops);

        if(this.object&&this.object.image){
            this.updateView(this.object);
        }

    }

}

export { TextureInspector }