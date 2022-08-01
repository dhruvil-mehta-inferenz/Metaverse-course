import { down, up, isPressed } from './moments.js';
import blockchain from './web3.js';
import abi from "./abi/abi.json" assert {type: "json"};
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { VRButton } from './VRButton.js';

//Declaration of new Scene
const scene = new THREE.Scene();
//Camera and Rendering Configuration
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const orbit = new OrbitControls(camera, renderer.domElement);//passing the camera and domelement as arguments
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;


//Setting up the flat space for mettaverse
const geometry_plane = new THREE.PlaneGeometry(5, 5);
const material_plane = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry_plane, material_plane);
scene.add(plane);

plane.rotation.x = 5;

//Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// cube.position.set(1,1,-1)

//Cone
// const geometry_cone = new THREE.ConeGeometry( 0.5, 2, 32 );
// const material_cone = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// const cone = new THREE.Mesh( geometry_cone, material_cone );
// cone.position.set(-1,-0.3,1.5);
// scene.add( cone );
camera.position.z = 5;
orbit.update();

//Ambient Light
const ambient_light = new THREE.AmbientLight(0x404040);
const direction_light = new THREE.DirectionalLight(0x00ff00, 1);
ambient_light.add(direction_light);
scene.add(ambient_light);


document.addEventListener("keyup", up);
document.addEventListener("keydown", down);



// function down(e) {
//     if (moments[e.keyCode]) return;
//     moments[e.keyCode] = true;
//     console.log("ON Key Down:->", e.key, ",The Key:Code", e.keyCode);
// }
// function up(e) {
//     moments[e.keyCode] = false;
//     console.log("ON Key Up:->", e.key, ",The Key:Code", e.keyCode);
// }


window.addEventListener('resize',onWindowResize);

function animate(){
    renderer.setAnimationLoop(render);
}

//Rendering Function
function render() {
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;
    orbit.update();
    requestAnimationFrame(animate);
    // //Moment TO left

    if (isPressed(37)) {
        camera.position.x -= 0.05
    }
    // //Moment TO UP

    if (isPressed(38)) {
        camera.position.x += 0.05;
        camera.position.y += 0.05;
    }
    //  //Moment TO right

    if (isPressed(39)) {
        camera.position.x += 0.05;
    }
    //   //Moment TO DOWN

    if (isPressed(40)) {
        camera.position.y -= 0.05;
        camera.position.x -= 0.05;
    }

    camera.lookAt(plane.position);
    renderer.render(scene, camera);
}
animate();


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


// New NFT

const buttonMint = document.getElementById('mint');
buttonMint.addEventListener('click', mintNFT);


function mintNFT() {
    // Parameters to create a NFT inthe Metaverse
    var nftName = document.getElementById("nftName").value;
    var nftWidth = document.getElementById("nftWidth").value;
    var nftHeight = document.getElementById("nftHeight").value;
    var nftDepth = document.getElementById("nftDepth").value;
    var nftNPosx = document.getElementById("nftNPosx").value;
    var nftNPosy = document.getElementById("nftNPosy").value;
    var nftNPosz = document.getElementById("nftNPosz").value;


    //if mettamask is not available
    if (typeof window.ethereum == "undefined") {
        rej("YOU SHOULD INSTALL METAMASK");
        console.log("INSTALL")
    }

    // Web3 instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x747615239fde97551096EA97635B11328f9Ce51F") //passing the abi and the address of smart contract

    web3.eth.getAccounts().then((accounts) => {
        contract.methods.mint(nftName, nftWidth, nftHeight, nftDepth, parseInt(nftNPosx), parseInt(nftNPosy), parseInt(nftNPosz)).send({ from: accounts[0] }).then((data) => {
            console.log("NFT Available in the Metaverse!");
        });
    })
    // web3.eth.getAccounts().then((accounts) => {
    //     contract.methods().mint(nftName, nftWidth, nftDepth, nftNPosx, nftNPosy, nftNPosz).send({ fron: accounts[0] }).then((data) => {
    //         console.log("NFT Available in the Metaverse!");
    //     });
    // });
}




// Web3 connection to the data generated in the blockchain to be 
//representted in the metaverse

blockchain.then((result) => {
    console.log("INSIDE");
    result.building.forEach((building, index) => {
        // For Each building paid for in the smart contract
        // a graphical representation is made in the metaverse

        if (index <= result.supply) {
            //Representation of NFT Tokens as boxes

            const nftBox = new THREE.BoxGeometry(building.width, building.height, building.depth);

            const nftboxMaterial = new THREE.MeshNormalMaterial();
            const nft = new THREE.Mesh(nftBox, nftboxMaterial);
            // nft.position.set(-1,-0.3,1.5);
            nft.position.set(building.pos_x, building.pos_y, building.pos_z);
            scene.add(nft);
        }
    })

})