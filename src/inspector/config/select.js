import * as THREE from 'three'

export const texture = {

     mapping:{

          UV:THREE.UVMapping,
          CubeReflection:THREE.CubeReflectionMapping ,
          CubeRefraction:THREE.CubeRefractionMapping,
          EquReflection:THREE.EquirectangularReflectionMapping,
          EquRefraction:THREE.EquirectangularRefractionMapping ,
          CubeUVR:THREE.CubeUVReflectionMapping,
     },
     wrapS:{
          Repeat:THREE.RepeatWrapping ,
          ClampToEdge:THREE.ClampToEdgeWrapping,
          MirroredRepeat:THREE.MirroredRepeatWrapping
     },
     wrapT:{
          Repeat:THREE.RepeatWrapping ,
          ClampToEdge:THREE.ClampToEdgeWrapping,
          MirroredRepeat:THREE.MirroredRepeatWrapping
     },

     magFilter:{

          Nearest:THREE.NearestFilter,
          Linear:THREE.LinearFilter,

     },
     minFilter:{

          Nearest:THREE.NearestFilter ,
          NearestMipmapNearest:THREE.NearestMipmapNearestFilter,
          NearestMipmapLinear:THREE.NearestMipmapLinearFilter ,
          Linear:THREE.LinearFilter,
          LinearMipmapNearest:THREE.LinearMipmapNearestFilter ,
          LinearMipmapLinear:THREE.LinearMipmapLinearFilter
  
       
     },
     format:{
          AlphaFormat:THREE.AlphaFormat,
          RedFormat:THREE.RedFormat ,
          RedIntegerFormat:THREE.RedIntegerFormat ,
          RGFormat:THREE.RGFormat,
          RGIntegerFormat:THREE.RGIntegerFormat ,
          RGBAFormat:THREE.RGBAFormat ,
          RGBAIntegerFormat:THREE.RGBAIntegerFormat,
          LuminanceFormat:THREE.LuminanceFormat ,
          LuminanceAlphaFormat:THREE.LuminanceAlphaFormat ,
          DepthFormat:THREE.DepthFormat,
          DepthStencilFormat:THREE.DepthStencilFormat,

          // DDS / ST3C Compressed Texture Formats
          RGB_S3TC_DXT1_Format:THREE.RGB_S3TC_DXT1_Format ,
          RGBA_S3TC_DXT1_Format:THREE.RGBA_S3TC_DXT1_Format,
          RGBA_S3TC_DXT3_Format:THREE.RGBA_S3TC_DXT3_Format ,
          RGBA_S3TC_DXT5_Format:THREE.RGBA_S3TC_DXT5_Format ,

          // PVRTC Compressed Texture Formats
          RGB_PVRTC_4BPPV1_Format:THREE.RGB_PVRTC_4BPPV1_Format,
          RGB_PVRTC_2BPPV1_Format:THREE.RGB_PVRTC_2BPPV1_Format,
          RGBA_PVRTC_4BPPV1_Format:THREE.RGBA_PVRTC_4BPPV1_Format ,
          RGBA_PVRTC_2BPPV1_Format:THREE.RGBA_PVRTC_2BPPV1_Format,

          // ETC Compressed Texture Format
          RGB_ETC1_Format:THREE.RGB_ETC1_Format ,
          RGB_ETC2_Format:THREE.RGB_ETC2_Format ,
          RGBA_ETC2_EAC_Format:THREE.RGBA_ETC2_EAC_Format,

          // ASTC Compressed Texture Format
          RGBA_ASTC_4x4_Format:THREE.RGBA_ASTC_4x4_Format ,
          RGBA_ASTC_5x4_Format:THREE.RGBA_ASTC_5x4_Format,
          RGBA_ASTC_5x5_Format:THREE.RGBA_ASTC_5x5_Format ,
          RGBA_ASTC_6x5_Format:THREE.RGBA_ASTC_6x5_Format,
          RGBA_ASTC_6x6_Format:THREE.RGBA_ASTC_6x6_Format ,
          RGBA_ASTC_8x5_Format:THREE.RGBA_ASTC_8x5_Format,
          RGBA_ASTC_8x6_Format:THREE.RGBA_ASTC_8x6_Format ,
          RGBA_ASTC_8x8_Format:THREE.RGBA_ASTC_8x8_Format,
          RGBA_ASTC_10x5_Format:THREE.RGBA_ASTC_10x5_Format, 
          RGBA_ASTC_10x6_Format:THREE.RGBA_ASTC_10x6_Format,
          RGBA_ASTC_10x8_Format:THREE.RGBA_ASTC_10x8_Format ,
          RGBA_ASTC_10x10_Format:THREE.RGBA_ASTC_10x10_Format,
          RGBA_ASTC_12x10_Format:THREE.RGBA_ASTC_12x10_Format ,
          RGBA_ASTC_12x12_Format:THREE.RGBA_ASTC_12x12_Format,

          // BPTC Compressed Texture Format
          RGBA_BPTC_Format:THREE.RGBA_BPTC_Format,

     },

     type:{
          UnsignedByteType:THREE.UnsignedByteType ,
          ByteType:THREE.ByteType ,
          ShortType:THREE.ShortType,
          UnsignedShortType:THREE.UnsignedShortType, 
          IntType:THREE.IntType ,
          UnsignedIntType:THREE.UnsignedIntType,
          FloatType:THREE.FloatType ,
          HalfFloatType:THREE.HalfFloatType, 
          UnsignedShort4444Type:THREE.UnsignedShort4444Type,
          UnsignedShort5551Type:THREE.UnsignedShort5551Type ,
          UnsignedInt248Type:THREE.UnsignedInt248Type,
     }

}



let s = 
{











/////////////////////////////// 材质

   side:{
       [THREE.FrontSide]:"FrontSide",
       [THREE.BackSide]:"BackSide",
       [THREE.DoubleSide]:"DoubleSide"
   },
   shading:{
       [THREE.SmoothShading]:"SmoothShading",
       [THREE.FlatShading]:"FlatShading"
   },
   vertexColors:{
       [THREE.NoColors]:"NoColors",
       [THREE.FaceColors]:"FaceColors",
       [THREE.VertexColors]:"VertexColors"
   },
   blending:{
        [THREE.NoBlending]:"NoBlending",
        [THREE.NormalBlending]:"NormalBlending" ,
        [THREE.AdditiveBlending]:"AdditiveBlending",
        [THREE.SubtractiveBlending]:"SubtractiveBlending",
        [THREE.MultiplyBlending]:"MultiplyBlending",
        [THREE.CustomBlending]:"CustomBlending"
   },
   depthFunc:{
        [THREE.NeverDepth]:"NeverDepth",
        [THREE.AlwaysDepth]:"AlwaysDepth",
        [THREE.LessDepth]:"LessDepth",
        [THREE.LessEqualDepth]:"LessEqualDepth",
        [THREE.GreaterEqualDepth]:"GreaterEqualDepth",
        [THREE.GreaterDepth]:"GreaterDepth",
        [THREE.NotEqualDepth]:"NotEqualDepth"
   },

   combine:{
        [THREE.MultiplyOperation]:"MultiplyOperation",
        [THREE.MixOperation]:"MixOperation",
        [THREE.AddOperation]:"AddOperation"
   },

   
/******************************纹理
 
UV贴图
立方体反射贴图
立方体折射贴图
圆柱反射贴图
圆柱折射贴图
球面反射映射
立方体UV反射贴图
立方体UV折射贴图

 */

   mapping:{
    [THREE.UVMapping]:"UVMapping",
    [THREE.CubeReflectionMapping]:"CubeReflectionMapping",
    [THREE.CubeRefractionMapping]:"CubeRefractionMapping",
    [THREE.EquirectangularReflectionMapping]:"EquirectangularReflectionMapping",
    [THREE.EquirectangularRefractionMapping]:"EquirectangularRefractionMapping",
    [THREE.SphericalReflectionMapping]:"SphericalReflectionMapping",
    [THREE.CubeUVReflectionMapping]:"CubeUVReflectionMapping",
    [THREE.CubeUVRefractionMapping]:"CubeUVRefractionMapping"

   },

   wrapS:{
        //重复
        [THREE.RepeatWrapping]:"RepeatWrapping",
        //纹理的最后一个像素延伸到网格的边缘。
        [THREE.ClampToEdgeWrapping]:"ClampToEdgeWrapping",
        //镜像重复
        [THREE.MirroredRepeatWrapping]:"MirroredRepeatWrapping"

   },
   wrapT:{
        //重复
        [THREE.RepeatWrapping]:"RepeatWrapping",
        //纹理的最后一个像素延伸到网格的边缘。
        [THREE.ClampToEdgeWrapping]:"ClampToEdgeWrapping",
        //镜像重复
        [THREE.MirroredRepeatWrapping]:"MirroredRepeatWrapping"
   },

   magFilter:{

        [THREE.NearestFilter]:"NearestFilter",
        [THREE.LinearFilter]:"LinearFilter"

   },
   minFilter:{

        [THREE.NearestFilter]:"NearestFilter",
        [THREE.NearestMipMapNearestFilter]:"NearestMipMapNearestFilter",
        [THREE.NearestMipMapLinearFilter]:"NearestMipMapLinearFilter",
        [THREE.LinearFilter]:"LinearFilter",
        [THREE.LinearMipMapNearestFilter]:"LinearMipMapNearestFilter",
        [THREE.LinearMipMapLinearFilter]:"LinearMipMapLinearFilter"

   },
   format:{

        [THREE.AlphaFormat]:"AlphaFormat",
        [THREE.RGBFormat]:"RGBFormat",
        [THREE.RGBAFormat]:"RGBAFormat",
        [THREE.LuminanceFormat]:"LuminanceFormat",
        [THREE.LuminanceAlphaFormat]:"LuminanceAlphaFormat",
        [THREE.RGBEFormat]:"RGBEFormat",
        [THREE.DepthFormat]:"DepthFormat",
        [THREE.DepthStencilFormat]:"DepthStencilFormat",

        [THREE.RGB_S3TC_DXT1_Format]:"RGB_S3TC_DXT1_Format",
        [THREE.RGBA_S3TC_DXT1_Format]:"RGBA_S3TC_DXT1_Format",
        [THREE.RGBA_S3TC_DXT3_Format]:"RGBA_S3TC_DXT3_Format",
        [THREE.RGBA_S3TC_DXT5_Format]:"RGBA_S3TC_DXT5_Format",

        [THREE.RGB_PVRTC_4BPPV1_Format]:"RGB_PVRTC_4BPPV1_Format",
        [THREE.RGB_PVRTC_2BPPV1_Format]:"RGB_PVRTC_2BPPV1_Format",
        [THREE.RGBA_PVRTC_4BPPV1_Format]:"RGBA_PVRTC_4BPPV1_Format",
        [THREE.RGBA_PVRTC_2BPPV1_Format]:"RGBA_PVRTC_2BPPV1_Format",

        [THREE.RGB_ETC1_Format]:"RGB_ETC1_Format"
   },

   type:{
        [THREE.UnsignedByteType]:"UnsignedByteType",
        [THREE.ByteType]:"ByteType",
        [THREE.ShortType]:"ShortType",
        [THREE.UnsignedShortType]:"UnsignedShortType",
        [THREE.IntType]:"IntType",
        [THREE.UnsignedIntType]:"UnsignedIntType",
        [THREE.FloatType]:"FloatType",
        [THREE.HalfFloatType]:"HalfFloatType",
        [THREE.UnsignedShort4444Type]:"UnsignedShort4444Type",
        [THREE.UnsignedShort5551Type]:"UnsignedShort5551Type",
        [THREE.UnsignedShort565Type]:"UnsignedShort565Type",
        [THREE.UnsignedInt248Type]:"UnsignedInt248Type"
   },

   encoding:{

        [THREE.LinearEncoding]:"LinearEncoding",
        [THREE.sRGBEncoding]:"sRGBEncoding",
        [THREE.GammaEncoding]:"GammaEncoding",
        [THREE.RGBEEncoding]:"RGBEEncoding",
        [THREE.LogLuvEncoding]:"LogLuvEncoding",
        [THREE.RGBM7Encoding]:"RGBM7Encoding",
        [THREE.RGBM16Encoding]:"RGBM16Encoding",
        [THREE.RGBDEncoding]:"RGBDEncoding",
        [THREE.BasicDepthPacking]:"BasicDepthPacking",
        [THREE.RGBADepthPacking]:"RGBADepthPacking"

   },

   mattype:{

        MeshBasicMaterial:'core/basic',
        MeshLambertMaterial:'core/lambert',
        MeshPhongMaterial:'core/phong',
        MeshStandardMaterial:'core/standard',
        MeshPhysicalMaterial:'core/PBR'

   }

}
