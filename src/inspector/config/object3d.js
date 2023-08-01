
// import {default as config} from './number.config.js';
 


export const object3d = {
     type:"object3d",
     ops:[{
             name:"info",
             title:"info",
             type:"string", 
             des:"info",
             disabled:true

         },
         {
               name:"name",
               title:"name",
               type:"string", 
               des:"name"  ,
          },
         {
             name:"position",
             title:"position", 
             type:"vector3",
             des:"位置"
         },
         {
             name:"rotation",
             title:"rotation",
             type:"euler",
             des:"旋转"   
         },
         {
             name:"scale",
             title:"scale",
             type:"vector3",
             des:"缩放"   
         },
         {
             name:"bounds", 
             title:"bounds", 
             type:"vector3", 
             des:"边界",
             disabled:true
         },
         {
             name:"visible",
             title:"visible",
             type:"boolean", //值的类型
             des:"可见"   
         }
     ]
 }
 