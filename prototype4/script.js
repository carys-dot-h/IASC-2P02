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

const drawCube = (height, color) => {
    // Create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    // Create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    // Position cube
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = height - 10

    // Randomize cube location
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI

    // Add cube to scene
    scene.add(cube)
}

//drawCube(0, 'red')
//drawCube(1, 'green')
//drawCube(2, 'yellow')
//drawCube(3, 'blue')

/*******
** UI **
********/
// UI
const ui = new dat.GUI()

/*******************
 ** TEXT ANALYSIS **
 *******************/
// SourceText
const sourceText = "After Azteca, you return to Wintertusk. You do not know why at first until your feet bring you to the base of Grandmother Raven’s tree - perhaps it was also in part due to your fate being woven into the tapestry of this world. Under her knowing gaze, you finally allow yourself to weep for who you have failed. You ask her why; she said she would be with you for as long as you were a Wizard, but you were not enough to stop the Shadow Web. A large part of you cannot help but feel your efforts have been futile, having been consistently asking yourself for months now what the point in fighting was. If there was even a point to chasing Morganthe across the Spiral like this if she was always going to be one step ahead of you. The inherent magic of the world surrounds you, attempting to comfort the earthling with gentle touches and soothing whispers. It still is not enough. Her words feel hollow to your ears, false promises and empty statements falling from her beak above you. You can feel your tears freezing on your cheekbones, unable to fall fully off your face. Grief is a familiar friend to you by now, hurling against your better judgement as spheres of hail upon glass windows. You want to scream, to lash out with your magic as your enemy does (just to feel something), but you restrain yourself - barely. Shadows creep at the peripherals of your vision, a constant reminder of your enemy and your failure. You desperately hold onto your fraying heart and mind as they claw at you, determined to pull you from the light. In an attempt to keep yourself together, you think back to when your magic was new and exciting, elevating yourself with the feeling that no one could hurt you. Bitterly, you look back up at her, wondering why she couldn’t have done more. She had more power than you and Morganthe combined - so why did she not step in to save the descendents of the First World? It was them who had worshipped her and Bartleby’s Song of Creation, them who had taken it upon themselves to guard its secrets, asking for nothing in return. Burning cold anger flows through your veins, your fists clench tightly enough that they become an icy white, and you stand up and leave without a word, lest you do something you regret. Your feet take you back to the Spiral door."
// Variables
let parsedText, tokenizedText

// Parse and Tokenize SourceText
const tokenizeSourceText = () => 
{
    // Strip periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // Tokenize text
    tokenizedText = parsedText.split(/[^\w]+/)
}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color) =>
{
    // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        // If tokenizedText[i] matches our searchTerm, then we draw a cube
        if(tokenizedText[i] === term){
            // convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2

            // call drawCube function 100 times using converted height value
            for(let a = 0; a < 100; a++)
            {
            drawCube(height, color)
            }
        }
    }
}

tokenizeSourceText()
findSearchTermInTokenizedText("morganthe", "darkred")
findSearchTermInTokenizedText("magic", "aqua")
findSearchTermInTokenizedText("spiral", "royalblue")
findSearchTermInTokenizedText("raven", "black")
findSearchTermInTokenizedText("her", "darkslategray")
/*******************
** ANIMATION lOOP **
********************/
const clock = new THREE.Clock()

const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()