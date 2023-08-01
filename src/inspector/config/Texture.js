import {default as config} from './number.config.js';

export var Texture = {
    type:"Texture",
    ops:[
        // {
        //     name:"enable",
        //     text:"enable",
        //     type:"boolean",
        //     des:"启用"
        // },
        {
            name:"name",
            text:"name",
            type:"string",
            des:"名称"
        },
        // {
        //     name:"size",
        //     text:"size",
        //     type:"string",
        //     des:"尺寸",
        //     disabled:true
        // },
        {
            name:"format",
            text:"format",
            type:"select",
            des:"包裹方式"
        },
        {
            name:"wrapS",
            text:"wrapS",
            type:"select",
            des:"包裹方式"
        },
        {
            name:"wrapT",
            text:"wrapT",
            type:"select",
            des:"包裹方式"
        },
        {
            name:"magFilter",
            text:"magFilter",
            type:"select",
            des:"包裹方式"
        },
        {
            name:"minFilter",
            text:"minFilter",
            type:"select",
            des:"包裹方式"
        },
        {
            name:"mapping",
            text:"mapping",
            type:"select",
            des:"包裹方式"
        },
        {
            name:"anisotropy",
            text:"anisotropy",
            type:"float",
            des:"包裹方式",
            config:{
                min:2,
                max:256,
                step:1
            }
        },
        {
            name:"channel",
            text:"channel",
            type:"float",
            des:"通道",
            config:{
                min:0,
                max:3,
                step:1
            }
        },
        {
            name:"center",
            text:"center",
            type:"vector2",
            des:"包裹方式",
            config:{
                x: config.float1,
                y: config.float1,
            }

        },
        {
            name:"offset",
            text:"offset",
            type:"vector2",
            des:"包裹方式",
            config:{
                x: config.float1,
                y: config.float1,
            }
        },
        {
            name:"repeat",
            text:"repeat",
            type:"vector2",
            des:"包裹方式"
        },
        {
            name:"flipY",
            text:"flipY",
            type:"boolean",
            des:"包裹方式"
        }
    ]
}
