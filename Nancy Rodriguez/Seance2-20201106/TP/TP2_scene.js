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


    function createLights() {
        // Add a directional light to show off the object
        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        // Position the light out from the scene, pointing at the origin
        light.position.set(0, 0, 10);
        scene.add(light);
        // Stars’ geometry and material
        var starGeometry = new THREE.SphereGeometry(200, 50, 50);
        var starMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load("./textures/background-stars.jpg"),
            side: THREE.DoubleSide,
            shininess: 0
        });
        var starSkybox = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starSkybox);
        var ambientLight = new THREE.AmbientLight(0xffccaa, 0.4);
        scene.add(ambientLight);
    }



    /**
     * cette fonction permet de rajouter des tasses
     * 
     */
    function addCups() {
        // Cup
        var mtlLoader = new THREE.MTLLoader();
        // mtlLoader.setResourcePath("./models/Cups/");
        //mtlLoader.setPath("./models/Cups/");

        function addOneToy(toyName, fileName, fileMaterialName, pathName, positionX, positionY, positionZ, scaleX, scaleY, scaleZ) {
            mtlLoader.setResourcePath(pathName);
            mtlLoader.setPath(pathName);
            mtlLoader.load(fileMaterialName, function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath(pathName);

                objLoader.load(fileName, function (object) {

                        object.name = toyName;
                        object.scale.set(scaleX, scaleY, scaleZ);
                        object.position.set(positionX, positionY, positionZ);
                        carousel.add(object);
                    },
                    // called when loading is in progresses
                    function (xhr) {
                        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
                    },
                    // called when loading has errors 
                    function (error) {

                        console.log("An error happened : " + error);
                    });
            });
        }
        addOneToy("whiteCup", "cup.obj", "cup2.mtl", "./models/Cups/", 10, 2, 0, 0.1, 0.1, 0.1);
        addOneToy("blackCup", "cup.obj", "cup.mtl", "./models/Cups/", -10, 2, 0, 0.1, 0.1, 0.1);
        addOneToy("r2d2", "r2-d2.obj", "r2-d2.mtl", "./models/R2D2/", 0, 0, 10, 0.03, 0.03, 0.03);
        addOneToy("horse", "Horse.obj", "Blank.mtl", "./models/Carousel_Horse/", 0, 0, -10, 0.1, 0.1, 0.1);

    }

    function createContent() { // Create a color cube and add it to the scene

        var groundGeometry = new THREE.CylinderBufferGeometry(15, 15, 1, 32);
        var groundMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load("./textures/spiral-retro-background.jpg"),
            side: THREE.FrontSide,
            shininess: 2
        });
        ground = new THREE.Mesh(groundGeometry, groundMaterial);

        var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 10, 32);
        var material = new THREE.MeshBasicMaterial({
            color: 0x2a2a1e
        });

        var column = new THREE.Mesh(cylinderGeometry, material);
        column.position.y = 5;
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
        //scene.add(ground, cylinder, cone);
        var hat2Geometry = new THREE.CylinderGeometry(15, 15, 1, 32);
        var hat2 = new THREE.Mesh(hat2Geometry, hatMaterial);
        hat2.position.y = 7;
        carousel = new THREE.Group();
        carousel.add(ground);
        carousel.add(column);
        carousel.add(hat1);
        carousel.add(hat2);
        carousel.rotation.x = Math.PI / 5;
        carousel.rotation.y = Math.PI / 5;
        scene.add(carousel);

    }


    main();

    function updateCups() {


        var angle = -0.02;

        var whiteCup = scene.getObjectByName("whiteCup", true);
        if (whiteCup)
            whiteCup.rotation.y += angle;
        angle = -0.1;
        var blackCup = scene.getObjectByName("blackCup", true);
        if (blackCup)
            blackCup.rotation.y += angle;



    }

    function update() {


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

    function main() {

        var canvas = document.getElementById("glcanvas");
        // Create the Three.js renderer and attach it to our canvas
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        // Set the viewport size
        renderer.setSize(canvas.width, canvas.height);
        document.body.appendChild(renderer.domElement);
        // Create a new Three.js scene
        scene = new THREE.Scene();
        // Add a camera so we can view the scene
        camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 400);
        camera.position.z = 40;
        camera.lookAt(scene.position);
        var axesHelper = new THREE.AxesHelper(20);
        scene.add(axesHelper);
        //Orbit Controls
        //orbit = new THREE.OrbitControls(camera);

        scene.add(camera);
        controls = new THREE.OrbitControls(camera);

        createLights();
        createContent();
        addCups();





        // Run the run loop
        renderer.setAnimationLoop(() => { // tells the browser we want to perform an animation
            update();
            updateCups();
            render();

        });
    }

})();
