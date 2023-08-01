
export var MeshLambertMaterial = {
    type:"MeshLambertMaterial",
    ops:[{
            name:"color",
            text:"color",
            type:"color", 
            des:"表面颜色"
        },
        {
            name:"opacity",
            text:"opacity", 
            type:"float",
            des:"透明度"
        },
        {
            name:"reflectivity",
            text:"reflectivity",
            type:"float",
            des:"反射率"   
        },
        {
            name:"refractionRatio",
            text:"refractionRatio",
            type:"float",
            des:"折射率"   
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
            type:"float", //值的类型
            des:"高光强度"   
        },
        {
            name:"wireframe", //属性名字
            text:"wireframe", //显示名称
            type:"check", //值的类型
            des:"线框"   
        },
        
        {
            name:"map", //属性名字
            text:"map", //显示名称
            type:"texture", //值的类型
            des:"表面贴图"
        },
        {
            name:"lightMap", //属性名字
            text:"lightMap", //显示名称
            type:"texture", //值的类型
            des:"灯光贴图"   //改变值的路径
        },
        {
            name:"lightMapIntensity", //属性名字
            text:"lightMapIntensity", //显示名称
            type:"float", //值的类型
            des:"灯光贴图强度"   //改变值的路径
        },
        {
            name:"aoMap", //属性名字
            text:"aoMap", //显示名称
            type:"texture", //值的类型
            des:"AO贴图"   //改变值的路径
        },
        {
            name:"aoMapIntensity", //属性名字
            text:"aoMapIntensity", //显示名称
            type:"float", //值的类型
            des:"AO贴图强度"   //改变值的路径
        },
        {
            name:"emissiveMap", //属性名字
            text:"emissiveMap", //显示名称
            type:"texture", //值的类型
            des:"高光反射贴图"   
        },
        {
            name:"specularMap", //属性名字
            text:"specularMap", //显示名称
            type:"texture", //值的类型
            des:"镜面贴图"   
        },
        {
            name:"alphaMap", //属性名字
            text:"alphaMap", //显示名称
            type:"texture", //值的类型
            des:"透明贴图"   
        },
        {
            name:"envMap", //属性名字
            text:"envMap", //显示名称
            type:"texture", //值的类型
            des:"环境贴图"   
        },
        {
            name:"combine",
            text:"combine", 
            type:"select", 
            des:"环境结合"   
        }
    ]
}
