import * as THREE from 'three';
function Viewport(editor) {

	let { renderer, scene, sceneHelpers, camera, dom,
		controls, transformControls, getMousePosition, pmremGenerator
	} = editor;

	let showSceneHelpers = true;

	// helpers

	const grid = new THREE.Group();
	sceneHelpers.add(grid);

	const grid1 = new THREE.GridHelper(30, 30, 0x888888);
	grid1.material.color.setHex(0x888888);
	grid1.material.vertexColors = false;
	grid.add(grid1);

	const grid2 = new THREE.GridHelper(30, 6, 0x222222);
	grid2.material.color.setHex(0x222222);
	grid2.material.vertexColors = false;
	grid.add(grid2);

	//
	const box = new THREE.Box3();

	const selectionBox = new THREE.Box3Helper(box);
	selectionBox.material.depthTest = false;
	selectionBox.material.transparent = true;
	selectionBox.visible = false;
	sceneHelpers.add(selectionBox);

	let objectPositionOnDown = null;
	let objectRotationOnDown = null;
	let objectScaleOnDown = null;

	transformControls.addEventListener('change', () => {

		const object = transformControls.object;

		if (object !== undefined) {

			box.setFromObject(object, true);

			const helper = editor.helpers[object.id];

			if (helper !== undefined && helper.isSkeletonHelper !== true) {

				helper.update();

			}
			editor.emit("refreshSidebarObject3D", object);
		}

		editor.render();

	});
	transformControls.addEventListener('mouseDown', function () {

		const object = transformControls.object;

		objectPositionOnDown = object.position.clone();
		objectRotationOnDown = object.rotation.clone();
		objectScaleOnDown = object.scale.clone();

		controls.enabled = false;

	});
	transformControls.addEventListener('mouseUp', function () {

		const object = transformControls.object;

		if (object !== undefined) {

			switch (transformControls.getMode()) {

				case 'translate':

					if (!objectPositionOnDown.equals(object.position)) {


						// editor.execute( new SetPositionCommand( editor, object, object.position, objectPositionOnDown ) );
						//object  newPosition  oldPosition
						editor.setPosition(object, object.position, objectPositionOnDown);
					}

					break;

				case 'rotate':

					if (!objectRotationOnDown.equals(object.rotation)) {

						// editor.execute( new SetRotationCommand( editor, object, object.rotation, objectRotationOnDown ) );
						editor.setRotation(object, object.rotation, objectRotationOnDown);

					}

					break;

				case 'scale':

					if (!objectScaleOnDown.equals(object.scale)) {

						// editor.execute( new SetScaleCommand( editor, object, object.scale, objectScaleOnDown ) );
						editor.setScale(object, object.scale, objectScaleOnDown);

					}

					break;

			}

		}

		controls.enabled = true;

	});

	sceneHelpers.add(transformControls);

	// object picking

	const onDownPosition = new THREE.Vector2();
	const onUpPosition = new THREE.Vector2();
	const onDoubleClickPosition = new THREE.Vector2();


	function handleClick() {

		if (onDownPosition.distanceTo(onUpPosition) === 0) {

			const intersects = editor.getIntersects(onUpPosition);

			editor.emit("intersectionsDetected", intersects);

			// signals.intersectionsDetected.dispatch( intersects );
			editor.render();

		}

	}

	function onMouseDown(event) {

		// event.preventDefault();

		if (event.target !== renderer.domElement) return;

		const array = getMousePosition(dom, event.clientX, event.clientY);
		onDownPosition.fromArray(array);

		document.addEventListener('mouseup', onMouseUp);

	}

	function onMouseUp(event) {

		const array = getMousePosition(dom, event.clientX, event.clientY);
		onUpPosition.fromArray(array);

		handleClick();

		document.removeEventListener('mouseup', onMouseUp);

	}

	function onTouchStart(event) {

		const touch = event.changedTouches[0];

		const array = getMousePosition(dom, touch.clientX, touch.clientY);
		onDownPosition.fromArray(array);

		document.addEventListener('touchend', onTouchEnd);

	}

	function onTouchEnd(event) {

		const touch = event.changedTouches[0];

		const array = getMousePosition(dom, touch.clientX, touch.clientY);
		onUpPosition.fromArray(array);

		handleClick();

		document.removeEventListener('touchend', onTouchEnd);

	}

	function onDoubleClick(event) {

		const array = getMousePosition(dom, event.clientX, event.clientY);
		onDoubleClickPosition.fromArray(array);

		const intersects = getIntersects(onDoubleClickPosition);

		if (intersects.length > 0) {

			const intersect = intersects[0];
			editor.emit("objectFocused", intersect.object);

			// signals.objectFocused.dispatch( intersect.object );

		}

	}

	dom.addEventListener('mousedown', onMouseDown);
	dom.addEventListener('touchstart', onTouchStart, { passive: false });
	dom.addEventListener('dblclick', onDoubleClick);

	// controls need to be added *after* main logic,
	// otherwise controls.enabled doesn't work.

	controls.addEventListener('change', function () {

		// signals.cameraChanged.dispatch( camera );
		// signals.refreshSidebarObject3D.dispatch( camera );

		editor.emit("cameraChanged", camera);
		editor.emit("refreshSidebarObject3D", camera);

	});

	// signals

	editor.on("editorCleared", () => {

		controls.center.set(0, 0, 0);
		editor.render();

	});

	editor.on("transformModeChanged", (mode) => {

		transformControls.setMode(mode);

	});

	editor.on("snapChanged", (dist) => {

		transformControls.setTranslationSnap(dist);

	});
	editor.on("spaceChanged", (space) => {

		transformControls.setSpace(space);

	});

	editor.on("rendererUpdated", () => {

		scene.traverse(function (child) {

			if (child.material !== undefined) {

				child.material.needsUpdate = true;

			}

		});

		editor.render();

	});

	editor.on("rendererCreated", (newRenderer) => {


		if (renderer !== null) {
			renderer.setAnimationLoop(null);
			renderer.dispose();
			pmremGenerator.dispose();
			dom.removeChild(renderer.domElement);
		}

		renderer = editor.renderer = newRenderer;

		renderer.setAnimationLoop(animate);
		renderer.setClearColor(0xaaaaaa);

		if (window.matchMedia) {

			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			renderer.setClearColor(mediaQuery.matches ? 0x333333 : 0xaaaaaa);
			updateGridColors(grid1, grid2, mediaQuery.matches ? [0x222222, 0x888888] : [0x888888, 0x282828]);

		}

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(dom.offsetWidth, dom.offsetHeight);

		pmremGenerator = new THREE.PMREMGenerator(renderer);
		pmremGenerator.compileEquirectangularShader();

		dom.appendChild(renderer.domElement);

		editor.render();

	});

	editor.on("sceneGraphChanged", () => {

		editor.render();

	});

	editor.on("cameraChanged", () => {

		// signals.cameraChanged.add( function () {

		editor.render();


	});

	editor.on("objectSelected", (object) => {

	// signals.objectSelected.add(function (object) {

		selectionBox.visible = false;
		transformControls.detach();

		if (object !== null && object !== scene && object !== camera) {

			box.setFromObject(object, true);

			if (box.isEmpty() === false) {

				selectionBox.visible = true;

			}

			transformControls.attach(object);

		}

		editor.render();

	});

	editor.on("objectFocused", (object) => {


	// signals.objectFocused.add(function (object) {

		controls.focus(object);

	});

	editor.on("geometryChanged", (object) => {


	// signals.geometryChanged.add(function (object) {

		if (object !== undefined) {
			box.setFromObject(object, true);
		}

		editor.render();

	});

	editor.on("objectChanged", (object) => {


	// signals.objectChanged.add(function (object) {

		if (editor.selected === object) {

			box.setFromObject(object, true);

		}

		if (object.isPerspectiveCamera) {

			object.updateProjectionMatrix();

		}

		const helper = editor.helpers[object.id];

		if (helper !== undefined && helper.isSkeletonHelper !== true) {

			helper.update();

		}

		editor.render();

	});

	editor.on("objectRemoved", (object) => {


	// signals.objectRemoved.add(function (object) {

		controls.enabled = true; // see #14180
		if (object === transformControls.object) {

			transformControls.detach();

		}

	});

	editor.on("materialChanged", () => {


	// signals.materialChanged.add(function () {

		editor.render();

	});

	// background

	editor.on("sceneBackgroundChanged", (backgroundType, backgroundColor, backgroundTexture, backgroundEquirectangularTexture, backgroundBlurriness, backgroundIntensity) => {

	// signals.sceneBackgroundChanged.add(function (backgroundType, backgroundColor, backgroundTexture, backgroundEquirectangularTexture, backgroundBlurriness, backgroundIntensity) {

		switch (backgroundType) {

			case 'None':

				scene.background = null;

				break;

			case 'Color':

				scene.background = new THREE.Color(backgroundColor);

				break;

			case 'Texture':

				if (backgroundTexture) {

					scene.background = backgroundTexture;

				}

				break;

			case 'Equirectangular':

				if (backgroundEquirectangularTexture) {

					backgroundEquirectangularTexture.mapping = THREE.EquirectangularReflectionMapping;
					scene.background = backgroundEquirectangularTexture;
					scene.backgroundBlurriness = backgroundBlurriness;
					scene.backgroundIntensity = backgroundIntensity;

				}

				break;

		}

		editor.render();

	});

	// environment

	editor.on("sceneEnvironmentChanged", (environmentType, environmentEquirectangularTexture) => {

	// signals.sceneEnvironmentChanged.add(function (environmentType, environmentEquirectangularTexture) {

		switch (environmentType) {

			case 'None':

				scene.environment = null;

				break;

			case 'Equirectangular':

				scene.environment = null;

				if (environmentEquirectangularTexture) {

					environmentEquirectangularTexture.mapping = THREE.EquirectangularReflectionMapping;
					scene.environment = environmentEquirectangularTexture;

				}

				break;

			case 'ModelViewer':

				scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

				break;

		}

		editor.render();

	});

	// fog
	editor.on("sceneFogChanged", (fogType, fogColor, fogNear, fogFar, fogDensity) => {

	// signals.sceneFogChanged.add(function (fogType, fogColor, fogNear, fogFar, fogDensity) {

		switch (fogType) {

			case 'None':
				scene.fog = null;
				break;
			case 'Fog':
				scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
				break;
			case 'FogExp2':
				scene.fog = new THREE.FogExp2(fogColor, fogDensity);
				break;

		}

		render();

	});

	editor.on("sceneFogSettingsChanged", (fogType, fogColor, fogNear, fogFar, fogDensity) => {


	// signals.sceneFogSettingsChanged.add(function (fogType, fogColor, fogNear, fogFar, fogDensity) {

		switch (fogType) {

			case 'Fog':
				scene.fog.color.setHex(fogColor);
				scene.fog.near = fogNear;
				scene.fog.far = fogFar;
				break;
			case 'FogExp2':
				scene.fog.color.setHex(fogColor);
				scene.fog.density = fogDensity;
				break;

		}

		editor.render();

	});

	editor.on("viewportCameraChanged", () => {

	// signals.viewportCameraChanged.add(function () {

		const viewportCamera = editor.camera;

		if (viewportCamera.isPerspectiveCamera) {

			viewportCamera.aspect = editor.camera.aspect;
			viewportCamera.projectionMatrix.copy(editor.camera.projectionMatrix);

		} else if (viewportCamera.isOrthographicCamera) {

			// TODO

		}

		// disable EditorControls when setting a user camera

		controls.enabled = (viewportCamera === editor.camera);

		editor.render();

	});

	editor.on("viewportShadingChanged", () => {

	// signals.viewportShadingChanged.add(function () {

		const viewportShading = editor.viewportShading;

		switch (viewportShading) {

			case 'default':
				scene.overrideMaterial = null;
				break;

			case 'normals':
				scene.overrideMaterial = new THREE.MeshNormalMaterial();
				break;

			case 'wireframe':
				scene.overrideMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
				break;

		}

		editor.render();

	});

	editor.on("showGridChanged", (showGrid) => {

	
	// signals.showGridChanged.add(function (showGrid) {

		grid.visible = showGrid;
		editor.render();

	});

	editor.on("showGridChanged", (showHelpers) => {


	// signals.showHelpersChanged.add(function (showHelpers) {

		showSceneHelpers = showHelpers;
		transformControls.enabled = showHelpers;

		editor.render();

	});

	editor.on("cameraResetted", () => {
		editor.updateAspectRatio();
	})
	// signals.cameraResetted.add(updateAspectRatio);
	// animations

	let prevActionsInUse = 0;

	const clock = new THREE.Clock(); // only used for animations

	function animate() {

		const mixer = editor.mixer;
		const delta = clock.getDelta();

		let needsUpdate = false;

		// Animations

		const actions = mixer.stats.actions;

		if (actions.inUse > 0 || prevActionsInUse > 0) {

			prevActionsInUse = actions.inUse;

			mixer.update(delta);
			needsUpdate = true;

		}

		if (needsUpdate === true) editor.render();

	}

	//

	let startTime = 0;
	let endTime = 0;

	function render() {

		startTime = performance.now();

		renderer.setViewport(0, 0, container.dom.offsetWidth, container.dom.offsetHeight);
		renderer.render(scene, editor.viewportCamera);

		if (camera === editor.viewportCamera) {

			renderer.autoClear = false;
			if (showSceneHelpers === true) renderer.render(sceneHelpers, camera);
			if (vr.currentSession === null) viewHelper.render(renderer);
			renderer.autoClear = true;

		}

		endTime = performance.now();
		editor.signals.sceneRendered.dispatch(endTime - startTime);

	}

	return container;

}

function updateGridColors(grid1, grid2, colors) {

	grid1.material.color.setHex(colors[0]);
	grid2.material.color.setHex(colors[1]);

}

export { Viewport };
