

var Player = function( playerID, form ){

     this.playerID = playerID;
     this.isMainPlayer = false;
     this.form = form;

     var cone_geo = new THREE.ConeGeometry( 1, 3, 10 );
     var cube_geo = new THREE.BoxGeometry( 1, 1, 1 );
     var ico_geo = new THREE.IcosahedronGeometry(1, 0);
     var torus_geo = new THREE.TorusKnotGeometry( 0.6, 0.3, 100, 16 );
     var player_mat = new THREE.MeshNormalMaterial;
 
     var scope = this;
 
     this.init = function(){
         
         let player_geo;

         switch(form) {
             case 1:
               player_geo = cube_geo;
               break;
             case 2:
               player_geo = cone_geo;
               break;
             case 3:
               player_geo = ico_geo;
               break;
             case 4:
                 player_geo = torus_geo;
                 break;
         }
     
         
         scope.mesh = new THREE.Mesh( player_geo, player_mat );
         scene.add( scope.mesh );

        if ( scope.isMainPlayer ){

            controls = new THREE.PlayerControls( camera, scope.mesh );
            controls.init();
        }

    };

    this.setOrientation = function( position, rotation ){
        if (scope.mesh){
            scope.mesh.position.copy(position);
            scope.mesh.rotation.x = rotation.x;
            scope.mesh.rotation.y = rotation.y;
            scope.mesh.rotation.z = rotation.z;

        }

    }

}