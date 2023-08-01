

const float1 = {

    min:0,
    max:1,
    step:0.05

};

const float2 = {

    min:0,
    max:2,
    step:0.1

};


export default {
    float1,
    float2,
    opacity:float1,
    reflectivity:float1,
    refractionRatio:float1,
    lightMapIntensity:float1,
    aoMapIntensity:float1,
    emissiveIntensity:float1,
    bumpScale:float1,
    shininess:{
        min:0,
        max:100,
        step:8
    },
    normalScale:float1,
    displacementScale:float1,
    displacementBias:float1,
    metalness:float1,
    roughness:float1,
    clearCoat:float1,
    clearCoatRoughness:float1,
    position:{
        min:-Infinity,
        max:Infinity,
        step:10
    }

};
