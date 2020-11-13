/**
 * @file Ce fihier contient le code permettant de faire le TP2
 * @author Emmanuel  Pellegrin <optionalEmail@example.com>
 * @copyright Emmanuel Pellegrin 2021 - Librement inspiré de Nancy Rodriguez(nancy.rodriguez@lirmm.fr)
 * @license Creative Commons
 */
/*global THREE , console, window, document*/
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
    var carousel = null;
    const onError = function (error) {

        console.log("An error happened : " + error);
    }
    const onProgress = function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    }
    /** 
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
        const ambientLight = new THREE.HemisphereLight(
            0xddeeff, // sky color
            0x202020, // ground color
            3, // intensity
        );
        scene.add(ambientLight);

    }

    function loadTextures(textureURLs) {
        var loaded = 0;

        function loadedOne() {
            loaded++;
            if (loaded == textureURLs.length) {
                for (var i = 0; i < textureURLs; i++)
                    textures[i].needsUpdate = true;
            }
        }
        var textures = [];
        for (var i = 0; i < textureURLs.length; i++) {
            var tex = new THREE.TextureLoader().load(textureURLs[i], undefined, loadedOne);
            textures.push(tex);
        }
        return textures;
    }

    function addSkyBox(texture) {
        var cube = null;
        var textureURLs = [ // URLs of the six faces of the cube map
            "./textures/" + texture + "/posx.jpg",
            "./textures/" + texture + "/negx.jpg",
            "./textures/" + texture + "/posy.jpg",
            "./textures/" + texture + "/negy.jpg",
            "./textures/" + texture + "/posz.jpg",
            "./textures/" + texture + "/negz.jpg"
        ];
        // skybox
        var textures = loadTextures(textureURLs);
        var materials = [];
        for (var i = 0; i < 6; i++) {
            materials.push(new THREE.MeshBasicMaterial({
                color: "white",
                // IMPORTANT: To see the inside of the cube, back faces must be rendered!
                side: THREE.BackSide,
                map: textures[i]
            }));
        }
        cube = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), materials);
        scene.add(cube);
    }

    /** 
     * Brief description of the function here.
     * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
     * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
     * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
     */
    function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
        object.rotateX(THREE.Math.degToRad(degreeX));
        object.rotateY(THREE.Math.degToRad(degreeY));
        object.rotateZ(THREE.Math.degToRad(degreeZ));
    }

    /** 
     * ajoute un jouet dans le carrousel.
     */
    function addOneToy(parentObject, toyName, fileName, fileMaterialName, pathName, positionX, positionY, positionZ, scaleX, scaleY, scaleZ, degreeX = 0, degreeY = 0, degreeZ = 0) {
        new THREE.MTLLoader()
            .setResourcePath(pathName)
            .setPath(pathName)
            .load(fileMaterialName, function (materials) {
                materials.preload();

                new THREE.OBJLoader()
                    .setMaterials(materials)
                    .setPath(pathName)
                    .load(fileName, function (object) {
                            object.name = toyName;
                            object.scale.set(scaleX, scaleY, scaleZ);
                            object.position.set(positionX, positionY, positionZ);
                            rotateObject(object, degreeX, degreeY, degreeZ);
                            object.traverse(function (node) {
                                if (node instanceof THREE.Mesh) {
                                    node.castShadow = true;
                                    node.receiveShadow = false;
                                    if (node.material.map)
                                        node.material.map.anisotropy = 16;
                                }
                            });
                            parentObject.add(object);
                        },
                        // called when loading is in progresses
                        onProgress,
                        // called when loading has errors 
                        onError);
            });
    }
    /**
     * cette fonction permet de les objets dans le carousel
     * 
     */
    function addToysOnCarousel() {
        addOneToy(carousel, "whiteCup", "cup.obj", "cup2.mtl", "./models/Cups/", 10, 2, 0, 0.1, 0.1, 0.1);
        addOneToy(carousel, "blackCup", "cup.obj", "cup.mtl", "./models/Cups/", -10, 2, 0, 0.1, 0.1, 0.1);
        addOneToy(carousel, "skull", "skull.obj", "skull.mtl", "./models/skull/", 0, 0.5, 10, 0.1, 0.1, 0.1, -90, 0, 0);
        addOneToy(carousel, "ironMan", "IronMan.obj", "IronMan.mtl", "./models/IronMan/", 0, 0.5, -10, 0.02, 0.02, 0.02);

    }

    function createCarousel() { // Create a color cube and add it to the scene

        var groundGeometry = new THREE.CylinderBufferGeometry(15, 15, 1, 32);
        var groundMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load("./textures/spiral-retro-background.jpg"),
            side: THREE.FrontSide,
            shininess: 2
        });
        ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.castShadow = false; // l’objet ne génère pas d’ombre
        ground.receiveShadow = true; // l’objet peut recevoir les ombres
        //création de la colonne
        var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 10, 32);

        /*  var material = new THREE.MeshBasicMaterial({
             color: 0x2a2a1e
         }); */

        var columnMaterial = new THREE.MeshStandardMaterial({
            color: 0x3287a8,
            roughness: 0.5,
            metalness: 1
        });

        var column = new THREE.Mesh(cylinderGeometry, columnMaterial);

        column.position.y = 5;

        column.castShadow = false; // l’objet ne génère pas d’ombre
        column.receiveShadow = true; // l’objet peut recevoir les ombres

        var coneGeometry = new THREE.ConeGeometry(15, 5, 52);

        var texture = new THREE.TextureLoader().load("./textures/gold.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        var hatMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.FrontSide,
            shininess: 10
        });


        var hat1 = new THREE.Mesh(coneGeometry, hatMaterial);
        hat1.position.y = 10;
        hat1.castShadow = false; // l’objet ne génère pas d’ombre
        hat1.receiveShadow = true; // l’objet peut recevoir les ombres
        //scene.add(ground, cylinder, cone);
        var hat2Geometry = new THREE.CylinderGeometry(15, 15, 1, 32);
        var hat2 = new THREE.Mesh(hat2Geometry, hatMaterial);
        hat2.castShadow = false; // l’objet ne génère pas d’ombre
        hat2.receiveShadow = true; // l’objet peut recevoir les ombres
        hat2.position.y = 7;
        carousel = new THREE.Group();
        carousel.add(ground);
        carousel.add(column);
        carousel.add(hat1);
        carousel.add(hat2);
        scene.add(carousel);

    }




    function updateToys() {


        var angle = -0.02;

        var whiteCup = scene.getObjectByName("whiteCup", true);
        if (whiteCup)
            whiteCup.rotation.y += angle;
        angle = -0.1;
        var blackCup = scene.getObjectByName("blackCup", true);
        if (blackCup)
            blackCup.rotation.y += angle;

        var angle = -0.1;
        var ironMan = scene.getObjectByName("ironMan", true);
        if (ironMan)
            ironMan.rotation.y += angle;



    }

    function updateCarousel() {


        var angle = 0.005;
        carousel.rotation.y += angle;

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




    function initSound() {
        // instantiate a listener
        var audioListener = new THREE.AudioListener();
        // add the listener to the camera
        camera.add(audioListener);
        // instantiate audio object
        var ambientSound = new THREE.Audio(audioListener);
        // add the audio object to the scene
        scene.add(ambientSound);
        // instantiate a loader
        var loader = new THREE.AudioLoader();
        // load a resource
        loader.load('./sounds/ambient.mp3',
            // Function when resource is loaded
            function (audioBuffer) {
                ambientSound.setBuffer(audioBuffer);
                ambientSound.setLoop(true);
                ambientSound.setVolume(0.5);
                ambientSound.play();
            });
        document.body.addEventListener('keydown', toggle);
    }

    function toggle() {
        if (ambientSound.isPlaying === true) {
            ambientSound.pause();
        } else {
            ambientSound.play();
        }
    }

    function main() {

        var canvas = document.getElementById("glcanvas");
        // Create the Three.js renderer and attach it to our canvas
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.physicallyCorrectLights = true;

        // Set the viewport size
        renderer.setSize(canvas.width, canvas.height);
        document.body.appendChild(renderer.domElement);
        // Create a new Three.js scene
        scene = new THREE.Scene();
        // Add a camera so we can view the scene
        camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 400);
        camera.position.z = 40;
        camera.lookAt(scene.position);
        // scene.add(new THREE.AxesHelper(500));


        // var axesHelper = new THREE.AxesHelper(20);
        //scene.add(axesHelper);


        scene.add(camera);
        //Orbit Controls
        controls = new THREE.OrbitControls(camera);

        createLights();
        createCarousel();
        addToysOnCarousel();
        addSkyBox("Fatbursparken");
        initSound();





        // Run the run loop
        renderer.setAnimationLoop(() => { // tells the browser we want to perform an animation
            updateCarousel();
            updateToys();
            render();

        });
    }

    main();

})();