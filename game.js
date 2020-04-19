

var firebaseConfig = {
    apiKey: "AIzaSyBftOHdzak6IgaLfyyzT2zdUuQbSkCNZhI",
    authDomain: "fir-7a806.firebaseapp.com",
    databaseURL: "https://fir-7a806.firebaseio.com",
    projectId: "fir-7a806",
    storageBucket: "fir-7a806.appspot.com",
    messagingSenderId: "437395406041",
    appId: "1:437395406041:web:32bd40c8c45111f75b52c8",
    measurementId: "G-REZW4J4HPZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.database();
 

var playerID = db.ref("Players").push().key;
var player;
var otherPlayers = {};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

function loadGame(){
    // load the environment
    loadEnvironment();

    initMainPlayer();

    listenForOtherPlayers();

    window.onunload = function(){
        db.ref("Players/" + playerID).remove(); 

    };
    window.onbeforeunload = function(){
        db.ref("Players/" + playerID).remove(); 

    };
}

function listenToPlayer( playerData ){
    if (playerData.val()){

        otherPlayers[playerData.key].setOrientation( playerData.val().orientation.position, playerData.val().orientation.rotation );         

    }

}

function listenForOtherPlayers(){
    db.ref("Players").on("child_added", function( playerData ){
        if (playerData.val()) {
            let k = playerData.key;
            let forma = playerData.val().form;

            if ( playerID != k && !otherPlayers[k]) {
                otherPlayers[k] = new Player( k, forma );
                otherPlayers[k].init();
                db.ref("Players/"+k).on("value", listenToPlayer);
            }
        }

    });    

    db.ref("Players").on("child_removed", function( playerData ) {
        if (playerData.val()){
            let k = playerData.key;

            db.ref("Players/"+k).off("value", listenToPlayer);
            scene.remove( otherPlayers[k].mesh );
            delete otherPlayers[k];
        
        }
        

    });

}

function initMainPlayer(){
    
    playerID = db.ref("Players").push().key;

    var rand = getRandomInt(1,5);
   
    db.ref("Players/" + playerID ).set({
        orientation: {position: {x:0, y:0, z:0},
      				  rotation: {x:0, y:0, z:0}},
        form: rand
     })

   
    player = new Player(playerID, rand);
    player.isMainPlayer = true;
    player.init();

}

function loadEnvironment(){
    
    var sphere_geometry = new THREE.SphereGeometry( 2 );
    var sphere_material = new THREE.MeshNormalMaterial();
    var sphere = new THREE.Mesh( sphere_geometry,  sphere_material );



    
    scene.add( sphere );


    var vertices = [];

    for ( var i = 0; i < 10000; i ++ ) {

        var x = THREE.MathUtils.randFloatSpread( 2000 );
        var y = THREE.MathUtils.randFloatSpread( 2000 );
        var z = THREE.MathUtils.randFloatSpread( 2000 );

        vertices.push( x, y, z );

    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    var material = new THREE.PointsMaterial( { color: 0xffffff} );
    var points = new THREE.Points( geometry, material );
    scene.add( points );


}
