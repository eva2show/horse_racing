import {
    EventDispatcher,
    Scene,PerspectiveCamera
} from 'three';


// script sampile 

export const setup = ({ setInfo, findModule, emitter, register,getMainRenderer })=>{

    setInfo({
        name:"hello"
    });

    getMainRenderer();

    emitter.on("render",d=>{

    });

    findModule("hello:guanqia");

    register("guanqia",(target,app)=>{


    });

    register("update",(target,app)=>{



    });

    register("init",(target,app)=>{


    });

    register("start",(target,app)=>{


    });

}


class BaseApp {

    // base 基本组件，游戏配置信息，渲染器等。
    // static assets， 静态资源, 一般是场景，模型信息，固定不变的，或者固定的纹理。
    // 动态资源  一般是根据设备情况加载的，例如根据设备加载不同大小的纹理
    // 代码部分，整个程序的运行逻辑。
    // assets
    static load(){

        // horse.tapp = gltf ?
        // setPath

    }

    setInfo( option ){


    }

    register( name, module ){


    }

    findModule(){

    }

    initScrupt( key , setup ){

        this.scripts[key] = setup(this);

    }

    constructor({ container }={}){
      
        this.container = null;
        this.scriptObjects = new Map;
        this.emitter = new EventDispatcher;

        // {
        //     objectid:[scriptid],
        // }

        this.scripts = {
            key:setup
        };

        this.initScript = {
            objectid:['scriptid','scriptid']
        };

        this.updateScript = {
            objectid:['scriptid','scriptid']
        };



    }
    
    __init( tapp ){




    }

    init(){



    }

    update(){

    }

    render(){

    }

}


export {BaseApp}

