import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Initialisation de la scène, caméra et renderer
let canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);

// Ajouter une couleur de fond
scene.background = new THREE.Color(0xE8DCCA);

// Chargement du modèle GLTF
const loader = new GLTFLoader();
let mixer;
loader.load('scene.gltf', function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // Créer l'AnimationMixer et jouer l'animation
    mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });

    // Activer les ombres pour le modèle chargé
    model.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
}, undefined, function (error) {
    console.error(error);
});

// Configuration du renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajouter des lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 2.60);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(1, 6, 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.mapSize.width = 1024;
scene.add(directionalLight);

// Ajouter un plan pour le sol

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xE8DCCA,
    roughness: 1,
    metalness: 0
   
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
plane.receiveShadow = true;
scene.add(plane);
// Création du cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0x056ff00,
    opacity: 0,
    transparent: true,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 3.2, -2);
cube.castShadow = false;
cube.receiveShadow = true;
scene.add(cube);

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(clock.getDelta());
    playScrollAnimations();
    render();
}

function render() {
    renderer.render(scene, camera);
}

// Ajouter les animations de la caméra
const animationScripts = [];
animationScripts.push({
    start: 0,
    end: 60,
    func: () => {
        camera.position.x = lerp(0, 5, scalePercent(40, 60));
        camera.position.y = lerp(5, 5, scalePercent(40, 60));
        camera.position.z = lerp(10, 10, scalePercent(40, 60));
        camera.lookAt(cube.position);
    },
});

animationScripts.push({
    start: 60,
    end: 101,
    func: () => {
        camera.position.x = lerp(5, 0, scalePercent(60, 100));
        camera.position.y = lerp(5, 3.35, scalePercent(60, 100));
        camera.position.z = lerp(10, 0.20, scalePercent(60, 100));
        camera.lookAt(cube.position);
    },
});

let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

let scrollPercent = 0;
document.body.onscroll = () => {
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight || document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100;
};

function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func();
        }
    });
}

window.scrollTo({ top: 0, behavior: 'smooth' });
animate();

const end = document.getElementById('end');
window.addEventListener('scroll', () => {
    if (scrollPercent <= 99) {
        end.style.visibility = 'hidden';
    } else {
        end.style.visibility = 'visible';
    }
});

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function lerp(x, y, a) {
    return (1 - a) * x + a * y;
}

function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start);
}

renderer.setPixelRatio(window.devicePixelRatio);

const clock = new THREE.Clock();
