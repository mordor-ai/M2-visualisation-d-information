var renderer = null,
  scene = null,
  camera = null,
  cube = null,
  ground = null,
  cylinder = null,
  cone = null,
  controls = null;


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
    color: 0xee00ab
  });

  column = new THREE.Mesh(cylinderGeometry, material)
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


  hat1 = new THREE.Mesh(coneGeometry, hatMaterial)
  hat1.position.y = 10;
  //scene.add(ground, cylinder, cone);
  var hat2Geometry = new THREE.CylinderGeometry(15, 15, 1, 32);
  hat2 = new THREE.Mesh(hat2Geometry, hatMaterial);
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


function update() {


  var angle = .005;
  carousel.rotation.y += angle;

}
// render, or 'draw a still image', of the scene
function render() {
  renderer.render(scene, camera);
}
window.addEventListener('resize', function() {
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

  createLights()
  createContent()





  // Run the run loop
  renderer.setAnimationLoop(() => { // tells the browser we want to perform an animation
    update();
    render()

  });
};