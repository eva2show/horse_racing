
export var MeshBasicMaterial = {
    type:"MeshBasicMaterial",
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
            name:"wireframe",
            text:"wireframe",
            type:"check",
            des:"线框"   
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
            name:"specularMap",
            text:"specularMap",
            type:"texture",
            des:"镜面贴图"   
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
        {
            name:"combine",
            text:"combine", 
            type:"select", 
            des:"环境结合"   
        }
    ]
}