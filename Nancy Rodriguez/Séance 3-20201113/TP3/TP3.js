/**
 * @file Ce fihier contient le code permettant de faire le TP2
 * @author Emmanuel  Pellegrin <optionalEmail@example.com>
 * @copyright Emmanuel Pellegrin 2021 - Librement inspiré de Nancy Rodriguez(nancy.rodriguez@lirmm.fr)
 * @license Creative Commons
 */
/*global THREE , console, window, document, TweenMax,Elastic*/
/*jshint esversion: 6*/
(function () {
    "use strict";

    var renderer = null,
        scene = null,
        camera = null,
        cube = null,
        ground = null,
        cylinder = null,
        cone = null,
        controls = null;
    var bar = [];
    var data = [];
    // tooltip
    var fontSizeInit = 40;
    var sprite1;
    var canvas1, ctx, texture1;
    // global variables for intersections
    var mouse = {
            x: 0,
            y: 0
        },
        INTERSECTED;
    var labels = {
        x: ["cat1", "cat2", "cat3", "cat4", "cat5"],
        z: ["2016", "2017", "2018", "2019", "2020"]
    };


    var inSelectionMode = false,
        selected = null,
        colorChanged = false,
        colorSelected = 0xffff00;

    function onDocumentMouseDown(event) {
        inSelectionMode = !inSelectionMode;
        if (inSelectionMode) {
            selected = INTERSECTED;
            if (selected) {
                selected.material.color.setHex(colorSelected);
            }
        } else
            selected = null;
    }

    function onDocumentMouseMove(event) {
        // the following line would stop any other event handler from firing // (such as the mouse's TrackballControls)
        // event.preventDefault();
        // update the mouse variable
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        if (!inSelectionMode)
            findIntersections();


    }



    function onError(error) {
        console.log("An error happened : " + error);
    }

    function onProgress(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    }
    /*
     * Création des lumières 
     */
    function createLights() {
        // Add a directional light to show off the object
        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.distance = 40;
        // Position the light out from the scene, pointing at the origin
        light.position.set(10, 10, 0);
        light.castShadow = true;
        //Set up shadow properties for the light
        light.shadow.mapSize.width = 512; // default
        light.shadow.mapSize.height = 512; // default
        light.shadow.camera.near = 0.5; // default
        light.shadow.camera.far = 50; // default
        light.shadow.camera.width = 100;
        light.shadow.camera.height = 100;
        light.target.position.set(-10, 0, 5);
        scene.add(light);
        scene.add(light.target);
        // scene.add(new THREE.CameraHelper(light.shadow.camera));
        // scene.add(new THREE.DirectionalLightHelper(light));
        // Stars’ geometry and material
        var starGeometry = new THREE.SphereGeometry(200, 50, 50);
        var starMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load("./textures/background-stars.jpg"),
            side: THREE.DoubleSide,
            shininess: 0
        });
        var starSkybox = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starSkybox);
        //  var ambientLight = new THREE.AmbientLight(0xffccaa, 0.4);
        var ambientLight = new THREE.HemisphereLight(
            0xddeeff, // sky color
            0x7694d6, // ground color
            3 // intensity
        );
        scene.add(ambientLight);

    }





    // render, or 'draw a still image', of the scene
    function render() {
        renderer.render(scene, camera);
    }
    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);


    function createFloor() {
        var material = new THREE.MeshPhongMaterial({
            color: 0xcccccc,
            shininess: 20
        });
        material.side = THREE.DoubleSide;
        var planeGeo = new THREE.PlaneBufferGeometry(100, 100, 32);
        var planeMat = new THREE.MeshLambertMaterial(0xffffff);
        var plane = new THREE.Mesh(planeGeo, material);
        plane.rotation.x = -0.5 * Math.PI;
        plane.receiveShadow = true;
        scene.add(plane);
    }

    function initData() {
        //var data = [];
        var nbBarsX = 5; // number of objets for each Z 
        var startZ = -25; // position of first Z line
        var nbZ = 5;
        var espacmnt = 5;
        var z = startZ;
        for (var i = 0; i < nbZ; i += 1) {
            for (var j = 0; j < nbBarsX; j += 1) {
                data.push([j * espacmnt, 1, z]);
            }
            z += espacmnt;
        }
        //return data
    }

    function createBars() {
        var geometry;
        //var data = initData();
        var colors = [0xff0000, 0x1176c5, 0xf9f9f9];
        var barSize = 1;
        geometry = new THREE.BoxBufferGeometry(barSize, barSize, barSize);
        for (var i = 0; i < data.length; i++) {
            var material = new THREE.MeshPhongMaterial({
                color: colors[0]
            });
            material.color.setHex(colors[Math.floor(Math.random() * 3)]);
            //geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, data[i][2]));
            var obj = new THREE.Mesh(geometry, material);
            obj.position.set(data[i][0], data[i][1], data[i][2]);
            obj.name = "bar-" + i;
            obj.castShadow = true;
            obj.receiveShadow = true;
            scene.add(obj);
            bar.push(obj);
        }
        //bar[1].scale.y = 10;
        //bar[1].position.y = 5;
        // Animate Y value
        for (i = 0; i < bar.length; i++) {

            var tween = new TweenMax.to(bar[i].scale // DOM element objects we want to animate at the same time
                , 1 // duration of animation
                , {
                    ease: Elastic.easeOut.config(1, 1),
                    y: Math.random() * 10,
                    delay: i * 0.25,
                    onUpdate: tweenUpdate
                });
        }
        /*
        cette fonction permet d'ajuster la position des barres
        */
        function tweenUpdate(tween, message) {
            for (i = 0; i < bar.length; i++) {
                bar[i].position.y = bar[i].scale.y / 2;
            }
        }
    }

    function createGUI() {
        var controls = {
            color: 0xffffff
        }
        var gui = new dat.GUI();
        gui.addColor(controls, 'color').onChange(function (value) {
            if (selected) {
                colorSelected = value;
                selected.material.color = new THREE.Color(colorSelected);
                colorChanged = true;
            }
        });
    }

    function findIntersections() {
        // create a Ray with origin at the mouse position and direction into the scene (camera direction) 
        var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
        vector.unproject(camera);
        var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        // create an array containing all objects in the scene with which the ray intersects 
        var intersects = ray.intersectObjects(scene.children);
        // INTERSECTED = the object in the scene currently closest to the camera 
        //and intersected by the Ray projected from the mouse position
        // if there is one (or more) intersections 
        if (intersects.length > 0) {
            // if the closest object intersected is not the currently stored intersection object 
            if (intersects[0].object != INTERSECTED) {
                // restore previous intersection object (if it exists) to its original color
                if (INTERSECTED) {
                    INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                }
                // store reference to closest object as current intersection object
                INTERSECTED = intersects[0].object;
                // store color of closest object (for later restoration) 
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex(); // set a new color for closest object 
                INTERSECTED.material.color.setHex(colorSelected);
                var message = "Waiting...";
                ctx.clearRect(0, 0, canvas1.width, canvas1.height);

                // update text, if it has a "name" field. 
                if (intersects[0].object.name) {
                    var intersectedPoint = intersects[0].point;
                    message = intersects[0].object.name + ": " + intersects[0].object.scale.y;
                }
                ctx.fillStyle = 'black';
                ctx.fillText(message, 0, fontSizeInit);
                texture1.needsUpdate = true;
                colorChanged = false;
            }
        } else // there are no intersections
        {
            // restore previous intersection object (if it exists) to its original color 
            if (INTERSECTED && !colorChanged)
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            // remove previous intersection object reference
            // by setting current intersection object to "nothing" 
            INTERSECTED = null;
        }
    }


    function createTooltip() {
        // draw text on canvas
        var fontface = "Helvetica";
        var fontsize = fontSizeInit;
        var message = "Hello World";
        canvas1 = document.createElement('canvas');
        ctx = canvas1.getContext('2d');
        ctx.font = fontsize + "px " + fontface;
        ctx.textBaseline = 'top';
        // text color
        ctx.fillStyle = 'black';
        ctx.fillText(message, 0, fontsize);
        // canvas contents will be used for a texture 
        texture1 = new THREE.Texture(canvas1);
        texture1.minFilter = THREE.LinearFilter;
        texture1.needsUpdate = true;
        var spriteMaterial = new THREE.SpriteMaterial({
            map: texture1
        });
        var sprite1 = new THREE.Sprite(spriteMaterial);
        sprite1.position.set(5, 5, 5);
        sprite1.scale.set(10, 10, 10);
        scene.add(sprite1);
    }








    function makeTextSprite(message) {
        var fontface = "Helvetica";
        var fontsize = fontSizeInit;
        var canvas2 = document.createElement('canvas');
        var context = canvas2.getContext('2d');
        context.font = fontsize + "px " + fontface;
        context.textBaseline = 'top';
        // text color
        context.fillStyle = 'black';
        context.fillText(message, 0, fontsize);
        // canvas contents will be used for a texture 
        var texture = new THREE.Texture(canvas2)
        texture.minFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        var spriteMaterial = new THREE.SpriteMaterial({
            map: texture
        });
        var sprite = new THREE.Sprite(spriteMaterial);
        return sprite;
    }

    function labelAxis(dataLbl, direction, separator, p) { // data from bars creation !
        var dobj = new THREE.Group();
        for (var i = 0; i < dataLbl.length; i++) {
            var label = makeTextSprite(dataLbl[i]);
            label.position.set(p.x, p.y, p.z);
            label.scale.set(10, 10, 10);
            dobj.add(label);
            p[direction] += separator;
        }
        return dobj;
    }

    function createLabels() {
        var pz = {
            x: 30,
            y: 0,
            z: -25
        };
        var labelsZ = labelAxis(labels.z, "z", 5, pz);
        scene.add(labelsZ);
        var px = {
            x: 5,
            y: 0,
            z: 0
        };
        var labelsX = labelAxis(labels.x, "x", 5, px);
        scene.add(labelsX);
    }

    function main() {
        var canvas = document.getElementById("glcanvas");


        // Event handler to resize the canvas when the document view is changed
        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

        }
        resizeCanvas();

        // Create the Three.js renderer and attach it to our canvas
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });

        renderer.setClearColor(0xab8ce5);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.physicallyCorrectLights = true;

        // Set the viewport size
        renderer.setSize(canvas.width, canvas.height);


        document.body.appendChild(renderer.domElement);

        // when the mouse moves, call the given function 
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);

        // when the mouse down, call the given function 
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        // Create a new Three.js scene
        scene = new THREE.Scene();


        // Add a camera so we can view the scene
        camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 400);
        camera.position.z = 40;
        camera.lookAt(scene.position);
        scene.add(new THREE.AxesHelper(20));

        scene.add(camera);
        //Orbit Controls
        controls = new THREE.OrbitControls(camera);
        createFloor();
        createLights();
        initData();
        createBars();
        createTooltip();
        findIntersections();
        createLabels();
        createGUI();






        // Run the run loop
        renderer.setAnimationLoop(() => { // tells the browser we want to perform an animation

            render();

        });
    }

    main();

})();
