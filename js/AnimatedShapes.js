//Directive that catches common mistakes.
'use strict';

var AnimatedShape = function(container){
    //Declares Canvas Container
    container = typeof container == 'string' ? document.getElementById(container) : 
    console.info('An ID container is here required');
    
    //OBJECT HOLDS SIZES OF DIV
    var sizes = {HEIGHT:container.offsetHeight,
                 WIDTH:container.offsetWidth};
                 
    //Declare vars for Threejs Height & Width
    var HEIGHT = sizes.HEIGHT;
    var WIDTH = sizes.WIDTH;
    

    //Creating The Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(100, WIDTH / HEIGHT, 1, 100);
    
    camera.position.z = 30;
    camera.position.y = 0;
    
    var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    var renderHalfX = container.clientHeight / 2;
    var renderHalfY = container.clientWidth / 2;
    
    renderer.setPixelRatio( window.devicePixelRatio);
    
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(WIDTH, HEIGHT);
    
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    
    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = camera.far;
    renderer.shadowCameraFov = 75;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    
    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapWidth = 1024;

    container.appendChild( renderer.domElement);
    scene.add( camera );
    
    //Adds Lighting To Shape
    var lightGroup = [];
    lightGroup[ 0 ] = new THREE.SpotLight( 0xFFFFFF);
    lightGroup[ 0 ].position.set( 0, 25, 69);
    lightGroup[ 0 ].castShadow = true;
    lightGroup[ 0 ].angle = 2;
    lightGroup[ 0 ].intensity = 0.1;
    lightGroup[ 0 ].shadowMapDarkness = 0.9;
    lightGroup[ 0 ].lookAt( scene );
    
    camera.add(lightGroup[0]);
    
    lightGroup[ 1 ] = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    lightGroup[ 1 ].position.set( camera.position.x, camera.position.y, camera.position.z);
    lightGroup[ 1 ].castShadow = true;
    lightGroup[ 1 ].shadowMapDarkness = 0.9;
    
    camera.add( lightGroup[ 1 ]);
    
    //Create Shape
    var geometry = new THREE.SphereBufferGeometry( 1.8, 9, 9);
    var material = new THREE.MeshPhongMaterial({
    color: 0xf5f5f5
    , emissive: 0x606060
    , shading: THREE.FlatShading
    , shininess: 75
    });
    var cube = new THREE.Mesh( geometry, material );
    cube.position.y = .5;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add( cube );
    camera.position.z = 3.5;
   
      
    //Render Shape
    var render = function(){
        requestAnimationFrame( render );
        //Animate The Cube
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    render();
    
    //Resizes canvas and updates window size 
    function onWindowResize() {
        sizes.HEIGHT = container.offsetHeight;
        sizes.WIDTH = container.offsetWidth;
        var HEIGHT = sizes.HEIGHT;
        var WIDTH = sizes.WIDTH;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }   
    window.addEventListener( 'resize', onWindowResize, false);

    //Hides Shape When Menu Hamburger is Clicked
    var button = document.getElementById('nav-action'); // Assumes element with id='button'
    button.onclick = function () {
    var div = document.getElementById('shape-iconsahedron');
        if (div.style.display !== 'none') {
            div.style.display = 'none';
        }
        else {
            div.style.display = 'block';
        }
    };

    //Moves Shape to corner and return it when Scrolled
    window.onscroll = function () {
        myFunction()
    };
    function myFunction() {
        if (window.scrollY > 100) {
            var elements = document.getElementsByClassName('shape');
            for (var i = 0; i < elements.length; i++) {
                elements[i].className = "min";
            }
        }
        else if (window.scrollY < 100) {
            var elements = document.getElementsByClassName('min');
            for (var i = 0; i < elements.length; i++) {
                elements[i].className = "shape";
            }
        }
    }
        
}
//Function Call;
AnimatedShape('shape-iconsahedron');







