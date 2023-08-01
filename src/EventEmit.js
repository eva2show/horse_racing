import * as THREE from 'three'

class EventEmit extends THREE.EventDispatcher{}

EventEmit.prototype.on = THREE.EventDispatcher.prototype.addEventListener;
EventEmit.prototype.off = THREE.EventDispatcher.prototype.removeEventListener;
EventEmit.prototype.emit = THREE.EventDispatcher.prototype.dispatchEvent;

export {EventEmit}