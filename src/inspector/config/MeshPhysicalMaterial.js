import {default as config} from './number.config.js';

export var MeshPhysicalMaterial = {
    type:"MeshPhysicalMaterial",
    ops:[
        {
            name:"info",
            title:"info", 
            type:"string",
            des:"信息",
            disabled:true
        },
        {
            name:"name",
            title:"name", 
            type:"string",
            des:"名称"
        },
        {
            name:"color",
            text:"color", 
            type:"color",
            des:"表面颜色"
        },
        {
            name:"opacity", 
            text:"opacity", 
            type:"float", 
            des:"透明度",
            config:config.float1

        },

        // {
        //     name:"clearCoat", 
        //     text:"clearCoat", 
        //     type:"float", 
        //     des:"透明涂层",
        //     config:config.float1   
        // },

        // {
        //     name:"clearCoatRoughness", 
        //     text:"clearCoatRoughness", 
        //     type:"float", 
        //     des:"透明涂层粗糙度" ,
        //     config:config.float1  
        // },
        {
            name:"metalness", 
            text:"metalness", 
            type:"float", 
            des:"金属性贴图",
            config:config.float1   
        },

        {
            name:"roughness",
            text:"roughness", 
            type:"float", 
            des:"粗糙度" ,
            config:config.float1  
        },
        {
            name:"emissive", 
            text:"emissive", 
            type:"color",
            des:"高光反射颜色"   
        },
        {
            name:"emissiveIntensity", 
            text:"emissiveIntensity", 
            type:"float", 
            des:"高光反射强度"   
        },
        {
            name:"emissiveMap", 
            text:"emissiveMap",
            type:"texture", 
            des:"高光反射贴图"   
        },
        {
            name:"map", 
            text:"map",
            type:"texture",
            des:"表面贴图"
        },
        {
            name:"lightMap",
            text:"lightMap",
            type:"texture",
            des:"灯光贴图"  
        },
        {
            name:"lightMapIntensity",
            text:"lightMapIntensity",
            type:"float",
            des:"灯光贴图强度"
        },
        {
            name:"aoMap",
            text:"aoMap",
            type:"texture",
            des:"AO贴图"
        },
        {
            name:"aoMapIntensity",
            text:"aoMapIntensity",
            type:"float",
            des:"AO贴图强度"
        },
        {
            name:"bumpMap",
            text:"bumpMap",
            type:"texture",
            des:"凹凸贴图"   
        },
        {
            name:"bumpScale",
            text:"bumpScale",
            type:"float",
            des:"凹凸缩放"   
        },
        {
            name:"normalMap",
            text:"normalMap",
            type:"texture",
            des:"法线贴图"   
        },
        {
            name:"normalScale",
            text:"normalScale",
            type:"vector2",
            des:"法线贴图缩放"   
        },
        {
            name:"displacementMap",
            text:"displacementMap",
            type:"texture",
            des:"置换贴图"   
        },
        {
            name:"displacementScale",
            text:"displacementScale",
            type:"float",
            des:"置换贴图缩放"   
        },
        {
            name:"displacementBias",
            text:"displacementBias",
            type:"float",
            des:"置换贴偏移"   
        },
        {
            name:"alphaMap",
            text:"alphaMap",
            type:"texture",
            des:"透明贴图"   
        },
        {
            name:"envMap", 
            text:"envMap", 
            type:"texture",
            des:"环境贴图"   
        },
        // {
        //     name:"envMapIntensity",
        //     text:"envMapIntensity",
        //     type:"texture",
        //     des:"环境贴图"   
        // },
        // {
        //     name:"refractionRatio", 
        //     text:"refractionRatio",
        //     type:"float", 
        //     des:"折射率"   
        // },
        {
            name:"reflectivity",
            text:"reflectivity", 
            type:"float",
            des:"反射率"   
        },
        {
            name:"roughnessMap",
            text:"roughnessMap",
            type:"texture",
            des:"粗糙度贴图"   
        },
        {
            name:"metalnessMap",
            text:"metalnessMap",
            type:"texture",
            des:"金属性贴图"   
        },
        {
            name:"wireframe",
            text:"wireframe", 
            type:"boolean",
            des:"线框"   
        }

    ]
}