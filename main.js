import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Définir une couleur beige clair
const beigeColor = 0x707070;

// Ajouter un fond de couleur
scene.background = new THREE.Color(beigeColor); // couleur beige clair

// Import de la scène 3D
loader.load('/scene.gltf', function (gltf) {
    scene.add(gltf.scene);

    // Activer les ombres pour les objets chargés
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });

}, undefined, function (error) {
    console.error(error);
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    playScrollAnimations();
    render();
}

function render() {
    renderer.render(scene, camera);
}

// Ajout de la lumière ambiante
const ambientLight = new THREE.AmbientLight(0xffffff, 2.20); // lumière ambiante avec intensité 1
ambientLight.position.set(0, 1, 11);
scene.add(ambientLight);



// Ajout d'une lumière directionnelle
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 5, 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);



function LightSwing() {
    directionalLight.position.set(2, 4, 3);


}


// Ajout d'un plan pour le sol avec un matériau standard
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x707070,
    roughness: 1,
    metalness: 0
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotation pour qu'il soit horizontal
plane.position.y = 0; // Positionner le sol à y = 0
plane.receiveShadow = true; // Permet au plan de recevoir des ombres
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
cube.castShadow = false; // Activer les ombres pour le cube
cube.receiveShadow = true;
scene.add(cube);

// Animation de la caméra de 0 à 60% du scroll
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

// Animation de la caméra de 60% à 100% du scroll
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

// Fonction du scroll
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

// Affichage du bouton end
const end = document.getElementById('end');
window.addEventListener('scroll', () => {
    if (scrollPercent <= 99) {
        end.style.visibility = 'hidden';
    } else {
        end.style.visibility = 'visible';
    }
});

// Gestion du resize de la fenêtre
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Helper functions
function lerp(x, y, a) {
    return (1 - a) * x + a * y;
}

function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start);
}


renderer.setPixelRatio(window.devicePixelRatio);


