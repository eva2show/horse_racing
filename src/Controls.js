
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import { EditorControls } from './EditorControls.js';

class Controls {
    constructor(editor) {
        this.editor = editor;
        this.transformControls = new TransformControls(editor.defaultCamera, editor.dom);
        this.controls = new EditorControls(editor.defaultCamera, editor.dom);

        this.init();
    }


    init() {

        const {editor,controls,transformControls} = this;

        const {helperScene,dom} = editor;

        let objectPositionOnDown = null;
        let objectRotationOnDown = null;
        let objectScaleOnDown = null;

        const box = new THREE.Box3();

        const selectionBox = new THREE.Box3Helper( box );
        selectionBox.material.depthTest = false;
        selectionBox.material.transparent = true;
        selectionBox.visible = false;
        helperScene.add( selectionBox );


        transformControls.addEventListener('change',()=>{

            const object = transformControls.object;

            if (object !== undefined) {

                box.setFromObject(object, true);

                const helper = editor.helpers.get(object.id);

                if (helper !== undefined && helper.isSkeletonHelper !== true) {

                    helper.update();

                }
                editor.emit("refreshSidebarObject3D",object);
            }

            editor.render();

        });
        transformControls.addEventListener('mouseDown', ()=>{

            const object = transformControls.object;
            objectPositionOnDown = object.position.clone();
            objectRotationOnDown = object.rotation.clone();
            objectScaleOnDown = object.scale.clone();
            this.controls.enabled = false;
        });
        transformControls.addEventListener('mouseUp', function () {

            const object = transformControls.object;

            if (object !== undefined) {

                switch (transformControls.getMode()) {

                    case 'translate':

                        if (!objectPositionOnDown.equals(object.position)) {

                            editor.execute(new SetPositionCommand(editor, object, object.position, objectPositionOnDown));

                        }

                        break;

                    case 'rotate':

                        if (!objectRotationOnDown.equals(object.rotation)) {

                            editor.execute(new SetRotationCommand(editor, object, object.rotation, objectRotationOnDown));

                        }

                        break;

                    case 'scale':

                        if (!objectScaleOnDown.equals(object.scale)) {

                            editor.execute(new SetScaleCommand(editor, object, object.scale, objectScaleOnDown));

                        }

                        break;

                }

            }

            controls.enabled = true;

        });

        helperScene.add(transformControls);
    }
}