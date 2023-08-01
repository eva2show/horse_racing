

import {Preview} from "./Preview.js";



export const fileToBuffer = (file) => {

    return new Promise((r) => {
        const reader = new FileReader();
        reader.onload = () => {
            r(reader.result);
        };
        reader.readAsArrayBuffer(file);
    });

};

export const preview = new Preview