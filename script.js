import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector("#bg")
});



renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0,0,50);

const courtYard = new THREE.TextureLoader().load('Volleycourt.jpg');
scene.background = courtYard;

const basketBallTexture = new THREE.TextureLoader().load('basket-texture-orange-vector.jpg');

const geometry = new THREE.SphereGeometry(10,32,16);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347,map: basketBallTexture});
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0,0,0);
scene.add(sphere);

const VolletTexture = new THREE.TextureLoader().load('volleyball-skin.jpg');
const VolleyBall = new THREE.Mesh(
    new THREE.SphereGeometry(5,32,16),
    new THREE.MeshStandardMaterial({map: VolletTexture})
);
VolleyBall.position.set(-30,0,0);
scene.add(VolleyBall);

const footballTexture = new THREE.TextureLoader().load('football.avif');
const SmileyTexture = new THREE.TextureLoader().load('SmieyBall.jpg');
const change = document.getElementById("change");
let i = false;
change.addEventListener('click',changeTexture);
function changeTexture(){
    if(i==true){
        sphere.material.map = basketBallTexture;
        sphere.material.needsUpdate = true;

        VolleyBall.material.map = VolletTexture;
        VolleyBall.material.needsUpdate = true;
        i=false;
    }
    else{
        sphere.material.map = footballTexture;
        sphere.material.needsUpdate = true;

        VolleyBall.material.map = SmileyTexture;
        VolleyBall.material.needsUpdate = true;
        i=true;
    }
}

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);

function move(v,u,g,t){
    sphere.position.x += 0.03*t;
    sphere.position.y += u*t - 0.5*g*t*t;
    
    VolleyBall.position.y += u*t - 0.5*g*t*t;
    VolleyBall.position.z -= v*t;
}

var v=0.05;
var t=0;
var u=4;
var g=9.8;

function animate() {
    t=t+0.01;
    move(v,u,g,t);
    if(sphere.position.y < -10){
        // sphere.position.set(sphere.position.x,-10,sphere.position.z);
        // VolleyBall.position.set(VolleyBall.position.x,VolleyBall.position.y,0);
        // camera.position.set(0,0,30);
        t=0;
    }
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.005;
    sphere.rotation.z += 0.005;
    VolleyBall.rotation.x +=0.01;
    VolleyBall.rotation.y +=0.005;
    VolleyBall.rotation.z +=0.005;
    controls.update();
    renderer.render(scene, camera);
}

function moveCamera(){
    const w = window.scrollY;

    camera.position.z = w * -0.02+50;
    camera.position.x = w * -0.005;
    camera.position.y = w * -0.0002;
}
document.body.onscroll = moveCamera;

renderer.setAnimationLoop(animate);