import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let canvas = document.querySelector('#c');

const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.x = -10.924;
camera.position.y = 5.927;
camera.position.z = 8.964;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0x056ff00,
    opacity: 0, // Opacité réglée à 50% (valeur entre 0 et 1)
    transparent: true,
});

const cube = new THREE.Mesh(geometry,material);
cube.position.set(0, 3.2, -2);

scene.add(cube);

function lerp(x, y, a) {
    return (1 - a) * x + a * y;
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start);
}

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
        camera.position.y = lerp(5, 3.4, scalePercent(60, 100));
        camera.position.z = lerp(10, 0.20, scalePercent(60, 100));
        camera.lookAt(cube.position);
    },
});

const light = new THREE.AmbientLight(0x404040, 20); // soft white light
scene.add(light);

const loader = new GLTFLoader();
const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf);
scene.add(gridHelper);

let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    
});

let scrollPercent = 0;

document.body.onscroll = () => {
    // calculate the current scroll progress as a percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight || document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100;
        ;(document.getElementById('scrollProgress') ).innerText =
            'Scroll Progress : ' + scrollPercent.toFixed(2)
        
};

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func();
           
        }
    });
}

loader.load('/scene.gltf', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

function animate() {
    requestAnimationFrame(animate);
    playScrollAnimations();
    render();
}

function render() {
    renderer.render(scene, camera);
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

console.log(scrollY);