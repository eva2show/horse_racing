
// import { TabPageApi, Pane } from 'tweakpane'
import * as THREE from 'three'

import {MaterilsInspector} from "./MaterilsInspector";
import {Object3DInspector} from "./Object3DInspector";
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import * as TweakpaneTexturePlugin from "./plugins/plugin-texture/src/index";
import Stats from 'three/examples/jsm/libs/stats.module.js';

export const TOOLS = [
    ['LOAD', 'PLAY', 'EXPORT'],
    ['W', 'R', 'T'],
    ['SAVEM', 'FOCUS', 'COPY'],
    ['ANI', 'SAVE', 'COPY'],
];

class Inspectors {
    constructor( {editor,container} ){
       
        this.editor = editor;

        const stats = this.stats = new Stats;
        editor.dom.appendChild( stats.dom );

        editor.on("update", d => {
            stats.update();
        });

        this.params = {
            toneMappingExposure: 1.2,

            exposure: 2,
            // toneMapping: THREE.ACESFilmicToneMapping,
            tone: THREE.ACESFilmicToneMapping,
            // blurriness: 0.3
            blur: 1,

            dlight: .2,
            hlight: .2,
            zoom: 1,
            prop: 3,

            helper:!!editor.showSceneHelpers,
           
            radius:1000,
            height:42,

            speed:50,


            coffset:{x:-23, y:7.0, z:-17.0},
            clookat:{x:2, y:-2.0, z:2.0},

            list:[]
        };
        

        const pane = this.pane = new Pane({
            container
        });

        pane.registerPlugin(EssentialsPlugin);
        pane.registerPlugin(TweakpaneTexturePlugin);

        this.object = null;        
        this.insList = [];

        const tab = pane.addTab({
            pages: [
                {title: '列表'},
                {title: '设置'},
            ],
        });

        const tab1 = tab.pages[0];
        const tab2 = tab.pages[1];

        const list = this.list = tab1.addBlade({
            view: 'three-list',
            includes:[]
        });

        list.emitter.on("select",e=>{

            let so = editor.scene.getObjectById(e.object.id);

            if(so){
                editor.select(so);
            }
            
        });

        // editor.on("init",_=>{
        //     let objects = [];
        //     editor.scene.traverseVisible( obj=>{
        //         objects.push({
        //             id:obj.id,
        //             name:obj.name,
        //             type:obj.type
        //         });
        //     });
        //     list.setList(objects);
        // });

        editor.on("checkObjects", objList=>{
            console.log("checkObjects", objList );
            list.setList(objList);
        });

        tab2.addBlade({
            view: 'buttongrid',
            size: [TOOLS[0].length,TOOLS.length],
            cells: (x, y) => ({
                title: TOOLS[y][x]
            }),
            label: 'tools',
        }).on('click', (ev) => {
            editor.onTools(ev.index);
        });

        tab2.addBinding(this.params, 'helper').on('change', (ev) => {

            editor.showSceneHelpers = ev.value;
            // editor.renderer.toneMappingExposure = ev.value;
        });

        tab2.addBinding(this.params, 'tone', {
            options: {
                None: THREE.NoToneMapping,
                Linear: THREE.LinearToneMapping,
                Reinhard: THREE.ReinhardToneMapping,
                Cineon: THREE.CineonToneMapping,
                ACESFilmic: THREE.ACESFilmicToneMapping,
                Custom: THREE.CustomToneMapping
            },
        }).on('change', (ev) => {

            editor.renderer.toneMapping = ev.value;
        });

        tab2.addBinding(this.params, 'exposure', {
            step: 0.1,
            min: 0,
            max: 10,
        }).on('change', (ev) => {
            editor.renderer.toneMappingExposure = ev.value;
        });

        tab2.addBinding(this.params, 'blur', {
            step: 0.01,
            min: 0,
            max: 2,
        }).on('change', (ev) => {
            editor.scene.backgroundBlurriness = ev.value;
        });

        this.tab2 = tab2;

        tab2.addBinding(this.params, 'dlight', {
            step: 0.05,
            min: 0,
            max: 5,
        }).on('change', (ev) => {
            editor.light.intensity = ev.value;
        });

        tab2.addBinding(this.params, 'hlight', {
            step: 0.05,
            min: 0,
            max: 5,
        }).on('change', (ev) => {
            editor.hemiLight.intensity = ev.value;
        });

        tab2.addBinding(this.params, 'radius', {
            step: 1,
            min: 0,
            max: 1000,
        }).on('change', (ev) => {
            editor.skybox.radius = ev.value;
        });



        tab2.addBinding(this.params, 'height', {
            step: 1,
            min: 0,
            max: 100,
        }).on('change', (ev) => {
            editor.skybox.height = ev.value;
        });


        tab2.addBinding(this.params, 'coffset').on('change', (ev) => {


            editor.third.idealOffset.copy(ev.value);
            // editor.skybox.height = ev.value;
        });
        tab2.addBinding(this.params, 'clookat').on('change', (ev) => {
            editor.third.idealLookat.copy(ev.value);

            // editor.skybox.height = ev.value;
        });

        const udpateHorse = s=>{

            editor.horses.forEach(h => {
                h.userData.time = s;
             });


        };


        tab2.addBinding(this.params, 'speed',{
            step:1,
            min: 10,
            max: 100,
        }).on('change', (ev) => {
            
            udpateHorse(ev.value);

        });



        editor.on('init',_=>{

            editor.skybox.radius = this.params.radius;
            editor.skybox.height = this.params.height;

            editor.third.idealLookat.copy(this.params.clookat);
            editor.third.idealOffset.copy(this.params.coffset);

            udpateHorse( this.params.speed );


        });


        // coffset:{x:-1, y:2.0, z:-2.0},
        //     clookat:{x:0, y:1.0, z:1.0},

      

       

        this.tab = pane.addTab({
            pages:[
                {title: '对象'}
            ]
        });

        // this.tab.removePage(0);
        

        this.inspectors = 
        {
            object3d:new Object3DInspector({parent:this.tab}),
            materil:new MaterilsInspector({parent:this.tab, editor })
        };

    }
   

    attach(object){

        if(!object || object === this.object )return;

        if(object !== this.object ){
            this.detach();
        }

        this.list.select(object);        

        // console.log("attach:",object,this.tab.pages);
        // this.insList.push(new Object3DInspector(object))

        if(object.isObject3D){
            this.inspectors.object3d.attach( object );
        }

        if(object.material && object.material.isMaterial){
            this.inspectors.materil.attach( object.material );
        }

    }

    detach(){

        
        this.inspectors.object3d.detach();
        this.inspectors.materil.detach();

        let len = this.tab.pages.length;
        while(len-->0){
            this.tab.removePage(0);
        }

    }
}
export {Inspectors}


