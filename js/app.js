let container;
let camera;
let renderer;
let scene;
let girl;

function init() {
  container = document.querySelector(".scene");

  //create scene
  scene = new THREE.Scene();

  //filed of view
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 10000;
  //camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 65, 300);

  const ambient = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 5);
  light.position.set(10, 10, 30);
  scene.add(light);

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //load model
  let loader = new THREE.GLTFLoader();
  loader.load("./3D/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    girl = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  girl.rotation.z -= 0.01;
  renderer.render(scene, camera);
}

function resizeWindow() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

function throttle(fn, wait = 200) {
  let timer = null;
  return function () {
    if (timer === null) {
      timer = setTimeout(() => {
        fn.apply(this);
        timer = null;
      }, wait);
    }
  };
}

init();
window.addEventListener("resize", throttle(resizeWindow));
