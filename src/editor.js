import * as THREE from 'three'
import { fileToBuffer } from './utils'
import { EventEmitter } from './EventEmitter.js';

import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EventEmit } from './EventEmit'
import { GroundProjectedSkybox } from 'three/examples/jsm/objects/GroundProjectedSkybox.js';



// import * as TweakpaneTexturePlugin from "./inspector/plugins/plugin-texture/src/index";
import { EditorControls } from './EditorControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from './GLTFExporter.js';
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

import { Inspectors, TOOLS } from './inspector/inspector.js';
import { previewRenderer } from './Preview';
// import { fileHelper } from './openfile';
import { Loader } from './Loader';
import { ThirdPersonCamera } from './ThirdPersonCamera';
// import * as jspoint from 'pkg/assets/RACE.json';

// console.log("jspoint",jspoint);


class Editor extends EventEmitter {

    constructor(ops = {}) {
        super();
        const { assets, dom } = ops;
        this.renderer = null;
        this.pmremGenerator = null;

        this.objects = new Map;
        this.assets = new Map;
        this.materials = new Map;

        this.scene = new THREE.Scene;
        this.sceneHelpers = new THREE.Scene;
        this.clock = new THREE.Clock();

        this.mixer = new THREE.AnimationMixer(this.scene);

        this.camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100000);

        this.viewportCamera = this.camera;
        this.showSceneHelpers = true;
        this.dom = dom;
        this.inspectorView = ops.inspectorView;

        this.helpers = new Map;
        this.selected = null;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.renderer = new THREE.WebGLRenderer({
            // alpha: false,
            // precision: "highp",
            // premultipliedAlpha: true,
            antialias: true,
            // stencil: true,
            // preserveDrawingBuffer: false,
            // depth: true,
            // logarithmicDepthBuffer: false
        });

        this.rescamera = [-0.8174173221266783, 2.7755575615628914e-17, 0.5760459369592413, 0, 0.248518363881144, 0.902150678266384, 0.35265106907160026, 0, -0.5196802327403743, 0.431421086299109, -0.7374335915832742, 0, -143.02106009724432, 11.729210265400171, -153.6761439311841, 1];


        this.animatePoint = [];

        this.ViewHelper = null; // new ViewHelper()

        this.previewRenderer = previewRenderer;
        // this.fileHelper = fileHelper;
        // fileHelper.init();

        this.loader = new Loader();
        this.sphere = new THREE.Sphere;

        this.materils = new Map;
        this.textures = new Map;
        this.geometryes = new Map;
        this.horses = [];

        this.third = new ThirdPersonCamera({
            camera:this.camera
        })
    }

    addObjects(objecet) {

        let list = [];
        this.scene.add(objecet);


        if (this.includesObject(objecet)) {
            list.push(objecet)
        }

        objecet.traverseVisible(obj => {

            // if( obj.material && obj.material.is)

            if (this.includesObject(obj)) {
                list.push(obj)
            }

        });

        this.emit("checkObjects", list);
        return list
    }

    animateEdit( h, points ){

        let hy = h.position.y;

        let apoints = points.map( (p,i)=>{

            // let baseMaterial = new THREE.MeshBasicMaterial({
            //     color:i*0x111111
            // });

            // let g =  new THREE.SphereGeometry(0.1, 64, 64);
            // let m = new THREE.Mesh( g,baseMaterial );
            // m.position.copy(p);
            // this.scene.add( m );

            return new THREE.Vector3(p.x,hy,p.z);
        });

        h.position.copy(apoints[0]);

        const curve3 = new THREE.CatmullRomCurve3( apoints);

        h.userData.curve = curve3;
        h.userData.fraction = 0;
        h.userData.time = 100;
        h.userData.current = 0;
        h.userData.pause = true;
      
        // console.log("animateEdit:",apoints)
        
    }

    includesObject(objecet) {
        return !!(objecet.name && objecet.name.includes("_root"));
    }

    initHorse( horse, animation, arr ) {

        this.up = new THREE.Vector3( 0, 0, 1 );
        this.axis = new THREE.Vector3( 0, 1, 0 );
        


        console.log("initHorse", horse, animation, arr )
        // SkeletonUtils.clone();
        // this.horses = [];
        // mixer.clipAction(seglb.animations[0]);
        let x = horse.position.x;
        let xs = -1.4;
        let zs = horse.position.z-10;
        // console.log(horse);
        // this.horses.push(horse);
        // horse.rotation.x = -Math.PI/2;
        const num = 10;
        const cname = "curve";
        let flow = null;

        // let includes = [1,4]
        let includes = []

        for (let i = 0, l = num; i < l; i++) {

            let h = SkeletonUtils.clone(horse);
            h.position.x = x + i * xs;
            h.position.z = zs;
            
            let mixer = new THREE.AnimationMixer(h);
            let action = mixer.clipAction(animation);
            h.userData.mixer = mixer;
            h.userData.action = action;
          
            this.horses.push(h);
            action.play();
            mixer.update(0);
            // action.play();
            action.paused = true;

            if(arr[i]){
                this.animateEdit(h,arr[i])
            }

            this.scene.add(h);

            // h.updateMatrixWorld(true);
          
            h.userData.rest = {
                position:new THREE.Vector3(arr[i][0].x,h.position.y, arr[i][0].z),
                rotation:h.rotation.clone()
            };
            // },500)
         

        }
        horse.visible = false;

        this.third._target = this.horses[0];


        this.on('init', _ => {
            this.focus(this.horses[0]);
            // this.focus(horse);
        });

        this.on("update", d => {

            this.horses.forEach(h => {
               this.updateHorse(h,d);
            });

            this.third.update(d);

        });
    }

    updateHorse(h,d){

        const pi = 3.141592;
        let {mixer,curve,current,time} = h.userData;
        let {axis,up} = this;
        
        if(!curve || h.userData.pause)return;
        mixer.update(d);

        let fraction = current / time;
        if(fraction>1){
            h.userData.pause = true;
        }

        const newPosition = curve.getPoint(fraction);
        const tangent = curve.getTangent(fraction);
        h.position.copy(newPosition);
        let radians = Math.acos( up.dot( tangent ) );
        h.quaternion.setFromAxisAngle( axis, radians );
        h.userData.current += d;

    }

    initPathAni( horse, curve ){

        curve.updateMatrixWorld();
        let m = curve.matrixWorld.clone();
        curve.visible = false;

        const material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });

        const geometry1 =  curve.geometry.clone();
        geometry1.applyMatrix4(m);
        const position = geometry1.attributes.position;
     
        let points = [];
        
        // for(let i=0,l=position.count-2;i<l;i++){
        for(let i=0,l=3;i<l;i++){
            
            points.push( 
                new THREE.Vector3( position.array[i*3],position.array[i*3+1], position.array[i*3+2]) 
            );
        }
        const curve3 = new THREE.SplineCurve( points);
        const pointsPath = new THREE.CurvePath();
        pointsPath.add(curve3);
        
        const gpoints = pointsPath.curves.reduce((p, d)=> [...p, ...d.getPoints(20)], []);

        const geometry = new THREE.BufferGeometry().setFromPoints( gpoints );
        
        const line = new THREE.Line( geometry, material );
        this.scene.add(line);

        const up = new THREE.Vector3( 0, 1, 0 );
        const axis = new THREE.Vector3( );

        horse.userData.curve = pointsPath;

    }

    playAni( gltf ){

        if(gltf.animations.length===0)return;

        let model = gltf.scene;
        let mixer = new THREE.AnimationMixer( model );
        const action = mixer.clipAction( gltf.animations[0] );
        action.play();

        this.scene.add(model);


        this.on("update",d=>{
            mixer.update(d);
        })

    }

    async initScene() {

        const { scene, mixer } = this;
        // const evurl = "assets/equirectangular/royal_esplanade_1k.hdr";

        const k = '_2k.hdr';
        const names = ['lilienstein', 'wasteland_clouds', 'industrial_sunset_02']
        const evurl = "assets/equirectangular/" + names[2] + k;

        const envMap = await (new RGBELoader).loadAsync(evurl);
        envMap.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = envMap;
        scene.environment = envMap;
        scene.backgroundBlurriness = this.inspectors.params.blur;

        // const hdrLoader = new RGBELoader();
        // const envMap = await hdrLoader.loadAsync( 'textures/equirectangular/blouberg_sunrise_2_1k.hdr' );
        // envMap.mapping = THREE.EquirectangularReflectionMapping;

        const skybox = new GroundProjectedSkybox(envMap);
        skybox.scale.setScalar(50000);
        scene.add(skybox);

        this.skybox = skybox;

        // const seurl = "assets/cg01.glb";
        // const seurl = "assets/race course_cg01/race course_cg01.glb";
        const seurl = "assets/scene2.glb";
        const seglb = await this.loadGltf(seurl);
        // scene.add(seglb.scene);

        this.addObjects(seglb.scene);
        console.log("seglb:", seglb);


        const floader = new THREE.FileLoader();
        floader.setResponseType("json")
        let f = await floader.loadAsync("assets/7-24.json");

        console.log("RACE:", f);


        const maurl = "assets/horse_root.glb";
        const maglb = await this.loadGltf(maurl);
        console.log("maglb:", maglb);

        // let horse = seglb.scene.getObjectByName("horse_root");
        let horse = maglb.scene;

        if (horse) {
            this.initHorse(horse, maglb.animations[0],f);
        }

        const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
        const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
        mesh.name = 'Box';
        scene.add(mesh);

        const boxposition = [65.9488165236896, 10.315567586199487, -27.015505634896975];

        this.camera.position.fromArray(boxposition);
        mesh.position.set(46, 0, -30);

        this.camera.lookAt(mesh.position);
        this.controls.center.copy(mesh.position);

    }

    getPreviewImg(obj) {

        if (obj) {
            this.previewRenderer.getPreviewImg(obj);
        }
        return

    }

    focus(object = {}) {

        if (!object || !object.isObject3D) {
            return;
        }

        var boundingSphere1 = this.box.setFromObject(object);
        const boundingSphere = boundingSphere1.getBoundingSphere(this.sphere);

        var center = boundingSphere.center;

        // object.getWorldPosition(position);

        this.controls.focus(object);
        this.camera.lookAt(center);
        this.controls.center.copy(center);

    }


    copy(object) {

        if (!object || !object.isObject3D) {
            return;
        }


        var boundingSphere1 = this.box.setFromObject(object);
        const boundingSphere = boundingSphere1.getBoundingSphere(this.sphere);

        var center = boundingSphere.center;
        var radius = boundingSphere.radius;

        const newObject = object.clone();

        object.getWorldPosition(newObject.position);
        object.getWorldQuaternion(newObject.quaternion);
        object.getWorldScale(newObject.scale);

        newObject.position.x = newObject.position.x + (radius * 2);

        this.scene.add(newObject);


    }

    // this.controls.focus(mesh);


    initControls() {

        const { camera, renderer, helpers, sceneHelpers, dom } = this;

        const getMousePosition = this.getMousePosition.bind(this);
        const getIntersects = this.getIntersects.bind(this);
        // camera.position.set( 22.26901612895711, 26.014072174525886, 19.337075264578257);
        const controls = new EditorControls(camera, renderer.domElement);
        this.controls = controls;
        const viewHelper = this.viewHelper = new ViewHelper(camera, dom);
        viewHelper.center = controls.center;

        const box = new THREE.Box3();

        const selectionBox = new THREE.Box3Helper(box);
        selectionBox.material.depthTest = false;
        selectionBox.material.transparent = true;
        selectionBox.visible = false;
        sceneHelpers.add(selectionBox);

        let objectPositionOnDown = null;
        let objectRotationOnDown = null;
        let objectScaleOnDown = null;

        const transformControls = this.transformControls = new TransformControls(camera, dom);
        sceneHelpers.add(transformControls);


        transformControls.addEventListener('change', () => {

            const object = transformControls.object;
            if (object !== undefined) {

                box.setFromObject(object, true);

                const helper = helpers.get(object.id);

                if (helper !== undefined && helper.isSkeletonHelper !== true) {
                    helper.update();
                }

                this.updateBox(object);
                // signals.refreshSidebarObject3D.dispatch( object );

            }
        });

        transformControls.addEventListener('mouseDown', function () {
            const object = transformControls.object;
            objectPositionOnDown = object.position.clone();
            objectRotationOnDown = object.rotation.clone();
            objectScaleOnDown = object.scale.clone();
            controls.enabled = false;
        });
        transformControls.addEventListener('mouseUp', function () {

            const object = transformControls.object;

            if (object !== undefined) {

                switch (transformControls.getMode()) {

                    case 'translate':

                        if (!objectPositionOnDown.equals(object.position)) {

                            // editor.execute( new SetPositionCommand( editor, object, object.position, objectPositionOnDown ) );

                        }

                        break;

                    case 'rotate':

                        if (!objectRotationOnDown.equals(object.rotation)) {

                            // editor.execute( new SetRotationCommand( editor, object, object.rotation, objectRotationOnDown ) );

                        }

                        break;

                    case 'scale':

                        if (!objectScaleOnDown.equals(object.scale)) {

                            // editor.execute( new SetScaleCommand( editor, object, object.scale, objectScaleOnDown ) );

                        }

                        break;

                }

            }

            controls.enabled = true;

        });

        const onDownPosition = new THREE.Vector2();
        const onUpPosition = new THREE.Vector2();
        const onDoubleClickPosition = new THREE.Vector2();

        const handleClick = () => {

            if (onDownPosition.distanceTo(onUpPosition) === 0) {

                const intersects = getIntersects(onUpPosition);

                if (intersects.length > 0) {

                    const object = intersects[0].object;

                    if (object.userData.object !== undefined) {

                        // helper

                        this.select(object.userData.object);

                    } else {

                        this.select(object);

                    }

                } else {

                    this.select(null);

                }

                // this.emit("intersectionsDetected",intersects);
                // signals.intersectionsDetected.dispatch( intersects );
                // render();

            }

        }

        function onMouseDown(event) {

            // event.preventDefault();

            if (event.target !== renderer.domElement) return;

            const array = getMousePosition(dom, event.clientX, event.clientY);
            onDownPosition.fromArray(array);

            document.addEventListener('mouseup', onMouseUp);

        }

        function onMouseUp(event) {

            const array = getMousePosition(dom, event.clientX, event.clientY);
            onUpPosition.fromArray(array);

            handleClick();

            document.removeEventListener('mouseup', onMouseUp);

        }

        function onTouchStart(event) {

            const touch = event.changedTouches[0];

            const array = getMousePosition(dom, touch.clientX, touch.clientY);
            onDownPosition.fromArray(array);

            document.addEventListener('touchend', onTouchEnd);

        }

        function onTouchEnd(event) {

            const touch = event.changedTouches[0];

            const array = getMousePosition(dom, touch.clientX, touch.clientY);
            onUpPosition.fromArray(array);

            handleClick();

            document.removeEventListener('touchend', onTouchEnd);

        }

        const onDoubleClick = (event) => {

            const array = getMousePosition(dom, event.clientX, event.clientY);
            onDoubleClickPosition.fromArray(array);

            const intersects = getIntersects(onDoubleClickPosition);

            if (intersects.length > 0) {

                const intersect = intersects[0];
                this.emit("objectFocused", intersect.object);

                // signals.objectFocused.dispatch( intersect.object );

            }

        }

        dom.addEventListener('mousedown', onMouseDown);
        dom.addEventListener('touchstart', onTouchStart, { passive: false });
        dom.addEventListener('dblclick', onDoubleClick);

        window.addEventListener("resize", this.resize.bind(this));
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        this.on("update", d => {
            if (viewHelper.animating === true) {
                viewHelper.update(delta);
            }
        });



    }

    initLight() {
        let { scene } = this;
        const light = this.light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1.0, 1.0, 1.0).normalize();
        light.intensity = this.inspectors.params.dlight;
        scene.add(light);

        const hemiLight = this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
        // hemiLight.color.setRGB( 1.0,1.0,1.0 );
        // hemiLight.groundColor.setRGB( 1.0,1.0,1.0 );
        hemiLight.position.set(0, 50, 0);
        hemiLight.intensity = this.inspectors.params.hlight;
        scene.add(hemiLight);


    }

    async init() {

        const { renderer, sceneHelpers, scene, defaultCamera, dom } = this;
        await this.initGUI();

        await this.initControls();

        await this.initLight();
        await this.initScene();

        this.restGame();

        const grid = new THREE.Group();
        sceneHelpers.add(grid);

        const grid1 = new THREE.GridHelper(30, 30, 0x888888);
        grid1.material.color.setHex(0x888888);
        grid1.material.vertexColors = false;
        grid.add(grid1);

        const grid2 = new THREE.GridHelper(30, 6, 0x222222);
        grid2.material.color.setHex(0x222222);
        grid2.material.vertexColors = false;
        grid.add(grid2);

        this.grid1 = grid1;
        this.grid2 = grid2;

        const box = this.box = new THREE.Box3();

        const selectionBox = this.selectionBox = new THREE.Box3Helper(box);
        selectionBox.material.depthTest = false;
        selectionBox.material.transparent = true;
        selectionBox.visible = false;
        sceneHelpers.add(selectionBox);

        this.createRenderer(this.renderer);
        this.emit("init", this);

        // dom.appendChild(renderer.domElement);
        // this.initLoadHandl();

        if(!this.getQueryString("debug")){
            this.inspectors.pane.hidden = true;
            this.inspectors.stats.dom.style.display = "none";
            this.Stats
        }

        this.resize();
    }

    saveMaterial(mate) {

        if (!mate || !mate.isMaterial) return;

        console.log("saveMaterial", mate.toJSON())

    }

    async onTools(index) {

        const tname = TOOLS[index[1]][index[0]];

        switch (tname) {

            case "LOAD":
                let f = await this.loader.openFile();
                if (f) {
                    let se = await this.loader.loadFile(f);
                    console.log("LOAD", se);
                    // this.scene.add(se);
                    this.addObjects(se);
                    this.focus(se);

                }

                // if (f) {
                //     let bf = await fileToBuffer(f);
                //     let gltf = await this.loadGltf(bf);
                //     console.log(gltf)
                //     this.scene.add(gltf.scene);
                //     this.focus(gltf.scene);
                // } else {
                //     console.log("加载GLB:打开文件异常！");
                // }
                break;

            case "SAVEM":

                if (this.selected) this.saveMaterial(this.selected.material);


                // this.showSceneHelpers = !this.showSceneHelpers;
                break;


            case "PLAY":

            this.restGame();
            this.playGame();
                // this.horses.forEach(h => {

                //     // if(h.userData.action)

                //     this.ctrAnimation(h.userData.action,h);

                // });

                // this.ctrAnimation(!this.mixer._actions[0].isRunning());
                break;


            case "EXPORT":

                const gltfExporter = new GLTFExporter();

                const options = {
                    trs: false,
                    onlyVisible: true,
                    binary: false,
                    maxTextureSize: 1024
                };

                gltfExporter.parse(
                    [this.scene],
                    function (result) {

                        console.log(result)

                        // if ( result instanceof ArrayBuffer ) {

                        //     saveArrayBuffer( result, 'scene.glb' );

                        // } else {

                        //     const output = JSON.stringify( result, null, 2 );
                        //     console.log( output );
                        //     saveString( output, 'scene.gltf' );

                        // }

                    },
                    function (error) {

                        console.log('An error happened during parsing', error);

                    },
                    options
                );

                // this.ctrAnimation(!this.mixer._actions[0].isRunning());
                break;


                GLTFExporter

            case "W":

                if (this.selected) this.transformControls.attach(this.selected);

                this.transformControls.setMode('translate');
                break;
            case "R":
                if (this.selected) this.transformControls.attach(this.selected);

                this.transformControls.setMode('rotate');
                break;
            case "T":
                if (this.selected) this.transformControls.attach(this.selected);

                this.transformControls.setMode('scale');
                break;

            case "FOCUS":

                this.focus(this.selected);
                break;

            case "COPY":

                if (this.selected) {
                    this.copy(this.selected);

                }

                break;




        }

    }


    ctrAnimation(a,h) {

        let bool = !a.isRunning();

        if (bool) {
            setTimeout(_ => {

                if (a.paused === true) {
                    a.paused = false;
                } else {
                    a.play();
                }
                h.userData.pause = !bool;
                this.third.enable = !h.userData.pause;

            }, Math.random() * 1000 | 0);

        } else {
            a.paused = true;
            h.userData.pause = !bool;
            this.third.enable = !h.userData.pause;

        }



    }


    initGUI() {

        const { renderer, hemiLight, itemList, scene, light } = this;

        this.inspectors = new Inspectors({ container: this.inspectorView, editor: this });

        this.on("selected", obj => {
            this.inspectors.attach(obj);
            // renderUI(obj,inspectorTab);
        });

    }

    restGame(){

        this.controls.enabled = false;
        this.third.enable = false;

        this.camera.matrixAutoUpdate = false;
        this.camera.matrix.fromArray(this.rescamera);
        this.camera.position.set({x: 143.71509687186762, y: 102.21735033124205, z: -89.688050335372});
        this.camera.updateMatrixWorld( true );

        this.horses.forEach(h=>{

            h.position.copy(h.userData.rest.position)
            h.rotation.copy(h.userData.rest.rotation)
            h.userData.current = 0;
            h.userData.pause = true;

            h.userData.action.paused = true;
        });

     
        

    }

    playGame(){

        this.third.enable = true;
        this.camera.matrixAutoUpdate = true;
        this.horses.forEach(h => {
          

            setTimeout(_ => {

              
                h.userData.pause = false;
                h.userData.action.paused = false;

            }, Math.random() * 1000 | 0);

            // this.ctrAnimation(h.userData.action,h);
        });

    }

    start() {

        this.init();
        if (typeof this.onLoad === 'function') {
            this.onLoad();
        }
    }

    initRender() {


    }

    loadGltf(opt) {

        const loader = new GLTFLoader();
        loader.crossOrigin = 'anonymous';

        return new Promise((res, rej) => {

            const loaded = gltf => {

                this.emit("load:gltf", gltf);
                res(gltf);
            };

            if (opt instanceof ArrayBuffer) {
                loader.parse(opt, '', loaded, rej);
            } else if (typeof opt === 'string') {
                loader.load(opt, loaded, null, rej);
            } else {
                rej(opt)
            }
        })

    }
    updateBox(object) {
        const { selectionBox, box, scene, camera, transformControls } = this;
        box.setFromObject(object, true);
        if (box.isEmpty() === false) {
            selectionBox.visible = true;
        }

    }

    // obj light  materials  camera  Node
    select(object) {
        if (this.selected === object) return;
        this.selected = object;

        const { selectionBox, box, scene, camera, transformControls } = this;

        selectionBox.visible = false;
        transformControls.detach();

        if (object !== null && object !== scene && object !== camera) {

            this.updateBox(object);

            // console.log("selected--1",box.getSize(new THREE.Vector3))

            // transformControls.attach( object,box.isEmpty() === false );

        }
        console.log("selected", object);

        this.emit("selected", object);

    }

    addObject() {


    }

    addMaterial() {

    }

    addLight() {

    }

    addAssets() {


    }

    addScript(object, file) {

    }

    // fbx  gltf  obj dae
    loadModel() {

        // path
    }

    export() {

    }
    updateAspectRatio() {

        const { dom, camera } = this;

        camera.aspect = dom.offsetWidth / dom.offsetHeight;
        camera.updateProjectionMatrix();
    }

    resize() {

        this.updateAspectRatio();
        const { dom, renderer } = this;


        console.log("resize",dom.offsetWidth, dom.offsetHeight);


        renderer.setSize(dom.offsetWidth, dom.offsetHeight);

    }

    getMousePosition(dom, x, y) {

        const rect = dom.getBoundingClientRect();
        return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];

    }



    getIntersects(point) {

        const { mouse, raycaster, sceneHelpers, scene, camera } = this;
        mouse.set((point.x * 2) - 1, - (point.y * 2) + 1);
        raycaster.setFromCamera(mouse, camera);
        const objects = [];

        scene.traverseVisible( (child)=> {


            if(typeof this.includesFn === 'function'){

                if(this.includesFn(child)){
                    objects.push(child);
                }
            }else{
                objects.push(child);
            }
        });

        
        sceneHelpers.traverseVisible(function (child) {
            if (child.name === 'picker') objects.push(child);
        });

        // console.log("getIntersects",objects.length);

        // const ins = raycaster.intersectObjects(objects, false);
        const ins = raycaster.intersectObjects(objects);
        return ins

    }
    createRenderer(newRenderer) {

        const { dom } = this;

        let oldRenderer = this.renderer;

        if (oldRenderer !== null && oldRenderer !== newRenderer) {

            oldRenderer.setAnimationLoop(null);
            oldRenderer.dispose();
            this.pmremGenerator.dispose();
            dom.removeChild(oldRenderer.domElement);

        }

        const renderer = newRenderer;

        renderer.setAnimationLoop(this.animate.bind(this));
        renderer.setClearColor(0xaaaaaa);

        if (window.matchMedia) {

            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            renderer.setClearColor(mediaQuery.matches ? 0x333333 : 0xaaaaaa);
            this.updateGridColors(mediaQuery.matches ? [0x222222, 0x888888] : [0x888888, 0x282828]);

        }

        renderer.toneMapping = this.inspectors.params.tone;
        renderer.toneMappingExposure = this.inspectors.params.toneMappingExposure;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(dom.offsetWidth, dom.offsetHeight);

        this.pmremGenerator = new THREE.PMREMGenerator(renderer);
        this.pmremGenerator.compileEquirectangularShader();

        dom.appendChild(renderer.domElement);


    }


    updateGridColors(colors) {

        const { grid1, grid2 } = this;

        grid1.material.color.setHex(colors[0]);
        grid2.material.color.setHex(colors[1]);

    }


    animate() {

        const { inspectors, clock } = this;


        // inspectors.fpsGraph.begin()

        const delta = this.clock.getDelta();

        // console.log("animate",delta);

        this.update(delta);
        this.render(delta);
        // inspectors.fpsGraph.end()


    }
    update(delta) {
        this.emit("update", delta);
    }

    render() {

        const { sceneHelpers, renderer, viewHelper, scene, dom, camera } = this;


        renderer.setViewport(0, 0, dom.offsetWidth, dom.offsetHeight);
        renderer.render(scene, this.viewportCamera);

        if (this.camera === this.viewportCamera) {

            renderer.autoClear = false;

            if (this.showSceneHelpers === true) {
                renderer.render(sceneHelpers, camera);
            }
            viewHelper.render(renderer);
            renderer.autoClear = true;

        }

    }



    setPosition() { }
    setRotation() { }
    setScale() { }

    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
}



export { Editor }



