import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}



/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector ('.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('black')

// Camera
const camera = new THREE.PerspectiveCamera (
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set (10, 2, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// Objects
// LEAVES
const sphere1Geometry = new THREE.SphereGeometry
const sphere1Material = new THREE.MeshNormalMaterial()
const sphere1 = new THREE.Mesh (sphere1Geometry, sphere1Material)
sphere1.position.set(15, 2.5, 3)
sphere1.castShadow = true
scene.add(sphere1)

const sphere2Geometry = new THREE.SphereGeometry
const sphere2Material = new THREE.MeshNormalMaterial()
const sphere2 = new THREE.Mesh (sphere2Geometry, sphere2Material)
sphere2.position.set(15, 4, -2.5)
sphere2.castShadow = true
scene.add(sphere2)

const sphere3Geometry = new THREE.SphereGeometry
const sphere3Material = new THREE.MeshNormalMaterial()
const sphere3 = new THREE.Mesh (sphere3Geometry, sphere3Material)
sphere3.position.set(15, 6.5, 2)
sphere3.castShadow = true
scene.add(sphere3)

const sphere4Geometry = new THREE.SphereGeometry
const sphere4Material = new THREE.MeshNormalMaterial
const sphere4 = new THREE.Mesh (sphere4Geometry, sphere4Material)
sphere4.position.set (15, 0, -10)
scene.add(sphere4)

const sphere5Geometry = new THREE.SphereGeometry
const sphere5Material = new THREE.MeshNormalMaterial
const sphere5 = new THREE.Mesh (sphere5Geometry, sphere5Material)
sphere5.position.set (15, 2, -12)
scene.add(sphere5)

const bigLeafGeometry = new THREE.SphereGeometry (6, 10, 16)
const bigLeafMaterial = new THREE.MeshNormalMaterial ()
const bigLeaf = new THREE.Mesh (bigLeafGeometry, bigLeafMaterial)
bigLeaf.position.set(15, 10, -6)
scene.add(bigLeaf)

// BRANCHES
const branch1Geometry = new THREE.CylinderGeometry (1, 1, 5, 32)
const branch1Material = new THREE.MeshNormalMaterial()
const branch1 = new THREE.Mesh (branch1Geometry, branch1Material)
branch1.position.set(15, 2.5, -1)
branch1.castShadow = true
branch1.rotation.x = Math.PI / 3.5
scene.add(branch1)

const branch2Geometry = new THREE.CylinderGeometry (1, 1, 7, 32)
const branch2Material = new THREE.MeshNormalMaterial()
const branch2 = new THREE.Mesh (branch2Geometry, branch2Material)
branch2.position.set(15, 2.5, -1)
branch2.castShadow = true
branch2.rotation.x = Math.PI /3.5
scene.add(branch2)

const branch3Geometry = new THREE.CylinderGeometry(1, 1, 7, 32)
const branch3Material = new THREE.MeshNormalMaterial()
const branch3 = new THREE.Mesh (branch3Geometry, branch3Material)
scene.add(branch3)
branch3.position.set(15, 2.5, -8)
branch3.rotation.x = Math.PI / 1.5

// TRUNK
const trunkGeometry = new THREE.CylinderGeometry (2.8, 2.5, 20, 32)
const trunkMaterial = new THREE.MeshNormalMaterial ()
const trunk = new THREE.Mesh (trunkGeometry, trunkMaterial)
trunk.position.set(15, 2.5, -5.6)
trunk.castShadow = true
scene.add(trunk)

// GROUP
const treeGroup = new THREE.Group()
treeGroup.add(sphere1)
treeGroup.add(sphere2)
treeGroup.add(sphere3)
treeGroup.add(bigLeaf)
treeGroup.add(sphere4)
treeGroup.add(sphere5)
treeGroup.add(branch1)
treeGroup.add(branch2)
treeGroup.add(branch3)
scene.add(treeGroup)

const capsuleGeometry = new THREE.CapsuleGeometry(1, 5, 8, 16, 1)
const capsuleMaterial = new THREE.MeshNormalMaterial()
const capsule = new THREE.Mesh (capsuleGeometry, capsuleMaterial)
capsule.position.set(8, 0, 0)
capsule.castShadow = true
capsule.rotation.x = Math.PI / 2
//scene.add(capsule)

/*********** 
** LIGHTS **
************/
// Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//    new THREE.Color('white')
//)

//scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048


// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*********************
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}

// part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}

// first-change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second-change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

// third-change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}

// fourth-change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

/*******
** UI **
********/
// UI
/*const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(15)
    .max(25)
    .step(0.1)
    .name('X')
    */
/*******************
** ANIMATION lOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // part-one
    if(domObject.part === 1)
    {
        camera.position.set(8, 0, 0)
        camera.lookAt(0, 0, 0)
    }

    // part-two
    if(domObject.part === 2)
    {
        camera.position.set(40, 1, 0)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange) 
    {
        treeGroup.position.z = Math.sin(elapsedTime * 0.25)
    }

    // second-change
    if(domObject.secondChange) 
    {
        branch2.rotation.x = Math.PI / 1.20
        branch1.position.set(15, 3.5, -5.5)
        sphere1.position.set(15, -2.5, 2)
        sphere2.position.set(15, 2, 4)
        sphere3.position.set(15, 1, -2)
        treeGroup.position.z = Math.sin(elapsedTime * 0.5)
    }
    
    // third-change
    if(domObject.thirdChange) 
    {
        treeGroup.position.z = Math.sin(elapsedTime * 2)
        treeGroup.position.y = Math.sin(elapsedTime * 0.5)
    }
    
    // fourth-change
    if(domObject.fourthChange) 
    {
        branch3.rotation.x = Math.PI / 3
        sphere4.position.set (15, -4, -10)
        sphere5.position.set (15, -2, -12)
        treeGroup.position.y = Math.sin(elapsedTime * 1.5)
    }
    
    // Update directionalLightHelper
    directionalLightHelper.update()

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render (scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()