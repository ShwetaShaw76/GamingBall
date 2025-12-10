import * as THREE from 'three'; 
import {OrbitControls} from 'three/addons/controls/OrbitConstrols.js';
import {GLTFLoader} from 'three/addons/controls/GLTFLoader.js';

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();