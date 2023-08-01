
export var MeshPhongMaterial = {
    type:"MeshPhongMaterial",
    ops:[{
            name:"color", //属性名字
            text:"color", //显示名称
            type:"color", //值的类型
            des:"表面颜色"
        },
        {
            name:"opacity", //属性名字
            text:"opacity", //显示名称
            type:"float", //值的类型
            des:"透明度"
        },
        {
            name:"specular", //属性名字
            text:"specular", //显示名称
            type:"color", //值的类型
            des:"高光颜色"   
        },
        {
            name:"shininess", //属性名字
            text:"shininess", //显示名称
            type:"integer", //值的类型
            des:"光泽度"
        },
        {
            name:"emissive", //属性名字
            text:"emissive", //显示名称
            type:"color", //值的类型
            des:"高光反射颜色"   
        },
        {
            name:"emissiveIntensity", //属性名字
            text:"emissiveIntensity", //显示名称
            type:"float", //值的类型
            des:"高光强度"   
        },
        {
            name:"reflectivity", //属性名字
            text:"reflectivity", //显示名称
            type:"float", //值的类型
            des:"反射率"   
        },
        {
            name:"refractionRatio", //属性名字
            text:"refractionRatio", //显示名称
            type:"float", //值的类型
            des:"折射率"   
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
            des:"高光贴图"   
        },
        {
            name:"bumpMap", //属性名字
            text:"bumpMap", //显示名称
            type:"texture", //值的类型
            des:"凹凸贴图"   
        },
        {
            name:"bumpScale", //属性名字
            text:"bumpScale", //显示名称
            type:"float", //值的类型
            des:"凹凸缩放"   
        },
        {
            name:"normalMap", //属性名字
            text:"normalMap", //显示名称
            type:"texture", //值的类型
            des:"法线贴图"   
        },
        {
            name:"normalScale", //属性名字
            text:"normalScale", //显示名称
            type:"vector2", //值的类型
            des:"法线贴图缩放"   
        },
        {
            name:"displacementMap", //属性名字
            text:"displacementMap", //显示名称
            type:"texture", //值的类型
            des:"置换贴图"   
        },
        {
            name:"displacementScale", //属性名字
            text:"displacementScale", //显示名称
            type:"float", //值的类型
            des:"置换贴图缩放"   
        },
        {
            name:"displacementBias", //属性名字
            text:"displacementBias", //显示名称
            type:"float", //值的类型
            des:"置换贴偏移"   
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