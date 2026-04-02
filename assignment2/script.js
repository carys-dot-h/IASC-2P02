import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

// Resizing
window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    // Update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 12, -20)

// Fog
const fogColor = new THREE.Color('purple')
scene.fog = new THREE.Fog(fogColor, 25, 10)
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**********
** LIGHTS **
***********/
// Directional light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***********
** MESHES **
************/
// Cube Geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, params) => 
    {
    // Create cube material
    let material
    if(params.transparent)
    {
        material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(params.color),
            transparent: true,
            flatShading: (params.flatShading),
            fog: (params.fog),
            opacity: (params.opacity),
            metalness: (params.metalness),
            roughness: (params.roughness),
            wireframe: (params.wireframe)
        })
    } else {
        material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(params.color),
            transparent: true,
            flatShading: (params.flatShading),
            fog:(params.fog),
            opacity: 1.0,
            metalness: (params.metalness),
            roughness: (params.roughness),
            wireframe: (params.wireframe)
    })
    }

    

    // Create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    // Darken cube
    

    // Position cube
    cube.position.x = (Math.random() - 0.5) * params.diameter
    cube.position.z = (Math.random() - 0.5) * params.diameter
    cube.position.y = height - 10

    // Scale cube
    cube.scale.x = params.scale
    cube.scale.y = params.scale
    cube.scale.z = params.scale

    // Randomize cube
    if(params.randomized){
        cube.rotation.x = Math.random() * 2 * Math.PI
        cube.rotation.y = Math.random() * 2 * Math.PI
        cube.rotation.z = Math.random() * 2 * Math.PI
    }
    // Add cube to group
    params.group.add(cube)
}


/*******
** UI **
********/
// UI
const ui = new dat.GUI()

let preset = {}

// Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

const uiObj = {
    sourceText: "",
    saveSourceText() {
        saveSourceText ()
    },
    term1: {
        term: 'frodo',
        color: '#75ff7a',
        diameter: 5,
        flatShading: false,
        fog: true,
        group: group1,
        nCubes: 65,
        metalness: 0,
        opacity: 1.0,
        randomized: true,
        reflectivity: 20,
        roughness: 5,
        scale: 0.75,
        transparent: true,
        wireframe: false
    },
    term2: {
        term: 'boromir',
        color: '#2731c7',
        diameter: 10,
        flatShading: false,
        fog: false,
        group: group2,
        nCubes: 50,
        metalness: 0,
        opacity: 0.75,
        randomized: true,
        reflectivity: 0,
        roughness: 1,
        scale: 1.5,
        transparent: true,
        wireframe: false
    },
    term3: {
        term: 'ring',
        color: '#ff4000',
        diameter: 30,
        flatShading: true,
        fog: false,
        group: group3,
        nCubes: 150,
        metalness: 10.0,
        opacity: 1.0,
        randomized: true,
        reflectivity: 0,
        roughness: 1,
        scale: 0.5,
        transparent: true,
        wireframe: true
    },
    saveTerms() {
        saveTerms()
    },
    rotateCamera: false
}

// UI Functions
const saveSourceText = () =>
{
    // UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()

    // Text Analysis
    tokenizeSourceText(uiObj.sourceText)
}

const saveTerms = () =>
{
    // UI
    preset = ui.save
    visualizeFolder.hide()
    cameraFolder.show()

    // Testing
    //console.log(uiObj.term1)
    //console.log(uiObj.color1)
    //console.log(uiObj.term2)
    //console.log(uiObj.color2)
    //console.log(uiObj.term3)
    //console.log(uiObj.color3)

    // Text Analysis
    findSearchTermInTokenizedText(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedText(uiObj.term3)
}

// Text Folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder
    .add(uiObj, 'saveSourceText')
    .name("Save")

// Terms, Visualize, and Camera Folders
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")
const cameraFolder = ui.addFolder("Camera")

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1")

termsFolder
    .add(group1, 'visible')
    .name("Term 1 Visibility")

termsFolder
    .addColor(uiObj.term1, 'color')
    .name("Term 1 Color")

termsFolder
    .add(uiObj.term2,'term')
    .name("Term 2")

termsFolder
    .add(group2, 'visible')
    .name("Term 2 Visibility")

termsFolder
    .addColor(uiObj.term2, 'color')
    .name("Term 2 Color")

termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3")

termsFolder
    .add(group3, 'visible')
    .name("Term 3 Visibility")

termsFolder
    .addColor(uiObj.term3, 'color')
    .name("Term 3 Color")

visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

cameraFolder
    .add(uiObj, 'rotateCamera')
    .name("Turntable")

// Terms and Visualize Folders are hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()

/*******************
 ** TEXT ANALYSIS **
 *******************/
// Variables
let parsedText, tokenizedText

// Parse and Tokenize SourceText
const tokenizeSourceText = (sourceText) => 
{
    // Strip periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // Tokenize text
    tokenizedText = parsedText.split(/[^\w]+/)
}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (params) =>
{
    // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        // If tokenizedText[i] matches our searchTerm, then we draw a cube
        if(tokenizedText[i] === params.term){
            // convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2

            // call drawCube function nCubes times using converted height value
            for(let a = 0; a < params.nCubes; a++)
            {
            drawCube(height, params)
            }
        }
    }
}

/*******************
** ANIMATION lOOP **
********************/
const clock = new THREE.Clock()

const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()

    // Rotate Camera
    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 7.5
        camera.lookAt(0, 0, 0)
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()