import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class Preview {
    constructor({ width = 120, height = 120 }={}) {

        this.width = width;
        this.height = height;

        const renderer = this.renderer = new THREE.WebGLRenderer({
            // alpha: false,
            precision: "highp",
            // premultipliedAlpha: true,
            antialias: true,
            // stencil: true,
            // preserveDrawingBuffer: false,
            // depth: true,
            // logarithmicDepthBuffer: false
        });

        this.box = new THREE.Box3();


        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
    
        this.autoRender = false;
    
        renderer.autoClear = false;
    
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.001, 10000000);
        // this.camera.z = 30;
    
        this.scene = new THREE.Scene;
    
       
    
        this.orbit = new OrbitControls(this.camera, renderer.domElement);
        this.orbit.enablePan = false;
    
        var sky = new Sky();
        var sun = new THREE.Vector3();
        // sun.y = - 700000;
        sky.scale.setScalar( 450000 );

        var uniforms = sky.material.uniforms;
    
        uniforms.turbidity.value = 1;
        uniforms.rayleigh.value = 1;
        // uniforms.luminance.value = 0.7;
        uniforms.mieCoefficient.value = 0.1;
        uniforms.mieDirectionalG.value = 1;
        var distance = 400000;
        var theta = Math.PI * (0 - 0.5);
        var phi = 2 * Math.PI * (0.25 - 0.5);
        sun.x = distance * Math.cos(phi);
        sun.y = distance * Math.sin(phi) * Math.sin(theta);
        sun.z = distance * Math.sin(phi) * Math.cos(theta);
        uniforms['sunPosition' ].value.copy( sun );
    
        this.scene.add(sky);
    
        var lightGroup = new THREE.Group();
    
        var ambientLight = new THREE.AmbientLight(0x000000);
        lightGroup.add(ambientLight);
    
        var lights = [];
        lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(- 100, - 200, - 100);
    
        lightGroup.add(lights[0]);
        lightGroup.add(lights[1]);
        lightGroup.add(lights[2]);
    
        this.scene.add(lightGroup);
    
        this.material = new THREE.MeshStandardMaterial({
            roughness: 1,
            metalness: .7,
            color: 0xb9b9b9
        });

        this.ortCamera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, - 10000, 10000 );
        this.ortCamera.position.z = 100;

        const plane = new THREE.PlaneGeometry( width, height );

        this.baseMaterial = new THREE.MeshBasicMaterial({
            // color: 0xff0000
            color: 0xffffff,
            // this.baseMaterial
        });

        const quad = this.plane = new THREE.Mesh( plane, this.baseMaterial );
        quad.position.z = - 100;
        this.scene.add( quad );

        // this.renderer.domElement.style.cssText ="position: fixed;top:0;left:0;z-index:999;";
        // document.body.appendChild(this.renderer.domElement);
        // console.log("Preview:--",this.width,this.height);

        this.sphere = new THREE.Sphere;

        this.geometry = new THREE.SphereGeometry(15, 64, 64);
    
        this.mesh = new THREE.Mesh();
        this.mesh.visible = false;
    
        this.scene.add(this.mesh);
    }

    update(){
        this.orbit.update();
        // this.orbit.update();
    }

    render(){
    
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }

    getPreviewImg( obj, rect ){

        if(!obj){
            return
        }else if(obj.isMaterial){
            this.renderMaterial(obj);
        }else if(obj.isTexture){
            this.renderTexture(obj);

        }else if(obj.isMesh){

            this.__renderMesh(obj);

        }else if(obj.isGeometry){

            this.renderGeometry(obj);

        }else if(obj.isObject3D){
            
            this.renderObject(obj);
        }else{
            return
        }
        
        return this.renderer.domElement.toDataURL();
        
    }

    renderTexture( texture ){

        
        if(!texture.isTexture)return;

        // const yuan = texture.flipY;
        const {material,mesh,camera,renderer,scene,autoRender} = this;
        this.baseMaterial.map = texture;
        texture.flipY = true;

        this.baseMaterial.needsUpdate = true;
        texture.needsUpdate = true;



        this.renderPlane();

        
        // texture.flipY = yuan;

    }
    renderMaterial( material ){

        if(!material.isMaterial)return;

        const {mesh,camera,renderer,scene,autoRender} = this;

        camera.position.set(0,0,30);
        mesh.scale.set(1,1,1);
        mesh.geometry = this.geometry;
        mesh.material = material;
        material.needsUpdate = true;

        this.renderMesh();


    }

    __renderMesh(mesh){

        if(!mesh||!mesh.isMesh)return;

        const {camera,renderer,scene,autoRender} = this;

        camera.position.set(0,0,0);
        this.mesh.scale.set(1,1,1);
        this.mesh.geometry = mesh.geometry;
        this.mesh.material = mesh.material;
        this.mesh.material.needsUpdate = true;

        this.renderMesh();

    }

    renderMesh( renderObj = this.mesh  ){

        this.update();
        this.plane.visible = false;
        this.mesh.visible = true;


        var boundingSphere1 = this.box.setFromObject( renderObj );

        console.log("boundingSphere--1:",boundingSphere1);

        const boundingSphere = boundingSphere1.getBoundingSphere(this.sphere);


        var center = boundingSphere.center;
        var radius = boundingSphere.radius;

        console.log("boundingSphere--2:",boundingSphere);


        let size = radius *1.2;
        this.camera.position.copy(center);
        // this.camera.position.z =  size;
        this.camera.position.y = center.y + size;
        // this.camera.position.y = center.z + size;
        // this.camera.position.z = center.z + size;
        this.camera.lookAt(center);

        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        
        // console.log("renderMesh==")
    }

    renderPlane(){
        
        this.plane.visible = true;
        this.mesh.visible = false;
        this.renderer.clear();
        this.renderer.render(this.scene, this.ortCamera);
    }

    renderGeometry( geometry ){

        if(!(geometry.isGeometry || geometry.isBufferGeometry) ){
            return
        }

        const {material,mesh,camera} = this;
        
        mesh.geometry = geometry;
        mesh.material = material;
        this.renderMesh();

    }

    renderObject( obj ){
                
        if(!obj.isObject3D){
            return;
        }

        const {mesh,camera,renderer,scene,plane} = this;
        
        const cloneObj = obj.clone();
        scene.add(cloneObj);
        mesh.visible = false;
        plane.visible = false;

        this.renderMesh(cloneObj);

        // scene.remove(cloneObj);
        
    }
}



export {Preview}

export const previewRenderer = new Preview;