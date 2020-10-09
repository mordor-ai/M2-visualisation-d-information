var renderer = null,
  scene = null,
  camera = null,
  cube = null;

main();


function update() {
  //Orbit Controls
  var orbit = new THREE.OrbitControls(camera);
  var axesHelper = new THREE.AxesHelper(20);
  scene.add(axesHelper);
  var angle = .005;
  cube.rotation.y += angle;

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
  camera.position.z = 20;
  camera.lookAt(scene.position);
  scene.add(camera);

  // Add a directional light to show off the object
  var light = new THREE.DirectionalLight(0xffffff, 1.5);
  // Position the light out from the scene, pointing at the origin
  light.position.set(0, 0, 10);
  scene.add(light);
  // Create a color cube and add it to the scene
  /*var material = new THREE.MeshBasicMaterial({
    color: 0x0000ff
  }); //hex colors
  */
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  });
  // First, create the texture map
  var mapUrl = "./textures/kittenMask.png";
  var texture = new THREE.TextureLoader().load(mapUrl);
  // Material with texture
  var material = new THREE.MeshPhongMaterial({
    map: texture,
    emissive: 0x0000ff
  });









  // Create the cube geometry
  var geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  // And put the geometry and material together into a mesh
  cube = new THREE.Mesh(geometry, material);
  // Tilt the mesh toward the viewer
  cube.rotation.x = Math.PI / 5;
  cube.rotation.y = Math.PI / 5;
  // Finally, add the mesh to our scene
  scene.add(cube);


  // Stars’ geometry and material
  var starGeometry = new THREE.SphereGeometry(200, 50, 50);
  var starMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("./textures/stars.png"),
    side: THREE.DoubleSide,
    shininess: 0
  });
  var starSkybox = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(starSkybox);
  var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);

  // Run the run loop
  renderer.setAnimationLoop(() => { // tells the browser we want to perform an animation
    update();
    render()

  });
};