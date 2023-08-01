// import './style.css'

import { Editor  } from './src/editor.js'
// import { App  } from 'pkg/games/horserace/app.js';

function setup() {


  const editor = new Editor({

    dom: document.getElementById("mainView"),
    inspectorView:document.getElementById("inspectorView"),
    assetsPath:"./gltf/",
    itemList:[
      {
        id:"item01",
        object:"mian01",
        url:"./images/yuan01.png",
      },
      {
        id:"item02",
        object:"mian02",
        url:"./images/yuan02.png",
      },
      {
        id:"item03",
        object:"mian03",
        url:"./images/yuan03.png",

      },
      {
        id:"item04",
        object:"mian04",
        url:"./images/yuan04.png",

      },
      {
        id:"item05",
        object:"mian05",
        url:"./images/yuan05.png",

      },
      {
        id:"item06",
        object:"mian06",
        url:"./images/yuan06.png",

      }
    ]
  });



  const loading = document.getElementById("loading");
  const start = document.getElementById("startGame");
  const stop = document.getElementById("stopGame");

  start.addEventListener("click",e=>{
    editor.playGame();
  });

  stop.addEventListener("click",e=>{
    editor.restGame();
  });


  editor.onProgress = (p,loaded) => {

    loading.innerText = `${p.name}:${loaded}%`;
    console.log(loading.innerText);
  };

  editor.onLoad = _ => {
    loading.remove();
  };

  editor.start();

  window.editor = editor;

}




window.onload = setup;