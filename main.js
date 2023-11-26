import * as THREE from 'three';

function main(){
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({antialias:true, canvas});

function setCamera(fov, aspect, near, far)
{
    const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.z = 2;
    return camera; 
}

const aspect = window.innerWidth / window.innerHeight;
const camera = setCamera(75, aspect, 0.1, 5);

const scene = new THREE.Scene();

function makeColorCube(geometry, color, x)
{
    const material = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
}

function makeTextureCube(geometry, texture, x)
{
  const material = new THREE.MeshBasicMaterial({
    map:texture
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
}

const geometry = new THREE.BoxGeometry(1, 1, 1);

function setLighting(color,intensity,position)
{
    const light = new THREE.DirectionalLight(color,intensity);
    light.position.set(...position);
    return light;
}

const positionArr = [-1,2,4];
const light1 = setLighting(0xFFFFF, 3, positionArr);
// const light2 = setLighting(0xFFFFF, 3, [1,2,4]);
scene.add(light1);
// scene.add(light2);


function loadColorTexture( path ) {
  const texture = loader.load( path );
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}


const loader = new THREE.TextureLoader();
const materials = [
  new THREE.MeshBasicMaterial({map: loadColorTexture('images/arthurmorgan.webp')}),
  new THREE.MeshBasicMaterial({map: loadColorTexture('images/verticalarthur.jpg')}),
  new THREE.MeshBasicMaterial({map: loadColorTexture('images/log.jpg')}),
  new THREE.MeshBasicMaterial({map: loadColorTexture('images/rayquaza.jpg')}),
  new THREE.MeshBasicMaterial({map: loadColorTexture('images/soyface.jpg')}),
  new THREE.MeshBasicMaterial({map: loadColorTexture('images/thinkmarkthumbnail.png')}),
];

const cube = new THREE.Mesh(geometry, materials);

scene.add(cube);


renderer.render(scene, camera);


// this function ups resolution of renderer
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}


function render(time) {
    time *= 0.001;  // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      // these lines ensure responsiveness, ie images dont distort when screen shrinks
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    const speed = 2;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;


    // cubes.forEach((cube, ndx) => {
    //     const speed = 1 + ndx * .1;
    //     const rot = time * speed;
    //     cube.rotation.x = rot;
    //     cube.rotation.y = rot;
    //   });
   
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);

}
main();