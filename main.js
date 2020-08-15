var container, scene, camera, renderer;

var controls;

init();

animate();

function init(){
    // basic setup
    
    container = document.getElementById("container");

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
    camera = new THREE.PerspectiveCamera ( 50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;


    // create an AudioListener and add it to the camera
	var listener = new THREE.AudioListener();
	camera.add( listener );

	// create a global audio source
	var sound = new THREE.Audio( listener );

	// load a sound and set it as the Audio object's buffer
	var audioLoader = new THREE.AudioLoader();
	audioLoader.load( './04. Clair de Lune.ogg', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop(false);
		sound.setVolume(0.5);
		sound.play();
	});

    

    renderer = new THREE.WebGLRenderer ( { alpha: true});
    renderer.setSize ( window.innerWidth, window.innerHeight);

 

    loadGame();

    // eventos:
    window.addEventListener("resize", onWindowResize, false);

    container.appendChild( renderer.domElement );
    document.body.appendChild( container );
}

function animate(){
    requestAnimationFrame(animate);
if ( controls ){
    controls.update();
}


    render();

}

function render(){

    renderer.clear();
    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight);
}
