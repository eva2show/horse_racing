import * as THREE from 'three'

class ThirdPersonCamera {
    constructor(params) {

        this._target = params.target;
        this._camera = params.camera;

        this._currentPosition = new THREE.Vector3();
        this._currentLookat = new THREE.Vector3();

        this.idealOffset = new THREE.Vector3(-1, 2.0, -2.0);
        this.idealLookat =  new THREE.Vector3(0, 1.0, 1.0);

        this.enable = false;
    }

    _CalculateIdealOffset() {
        const idealOffset = this.idealOffset.clone();

        idealOffset.applyQuaternion(this._target.quaternion);
        idealOffset.add(this._target.position);

        return idealOffset;
    }

    _CalculateIdealLookat() {
        const idealLookat = this.idealLookat.clone();
        idealLookat.applyQuaternion(this._target.quaternion);
        idealLookat.add(this._target.position);
        return idealLookat;
    }

    update(timeElapsed) {

        if(!this.enable)return;
        
        const idealOffset = this._CalculateIdealOffset();
        const idealLookat = this._CalculateIdealLookat();

        const t = 1.0 - Math.pow(0.001, timeElapsed);
        this._currentPosition.lerp(idealOffset, t);
        this._currentLookat.lerp(idealLookat, t);

        this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookat);
    }
}


export {ThirdPersonCamera}