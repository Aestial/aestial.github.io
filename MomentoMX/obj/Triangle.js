var Triangle = function () {

    var scope = this;

    THREE.Geometry.call( this );

    v( - 1,   0,   0 );
    c(   0,   1,   1 );

    v(   1,   0,   0 );
    c(   0,   1,   1 );

    v(   0,   1,   0 );
    c(   1,   0,   0 );
    
    f3( 0, 2, 1 );
    
    this.colorsNeedUpdate = true;
    this.computeFaceNormals();

    function v( x, y, z ) {

	scope.vertices.push( new THREE.Vector3( x, y, z ) );

    }
    
    function c( r, g, b ) {

	scope.colors.push( new THREE.Color( r, g, b ) );

    }

    function f3( a, b, c ) {

	scope.faces.push( new THREE.Face3( a, b, c ) );

    }

    function debugColors () {

	for ( var i = 0; i< scope.colors.length; i++ ) {
	    console.log(scope.colors[i]);
	}
	
    }	

}

Triangle.prototype = Object.create( THREE.Geometry.prototype );
Triangle.prototype.constructor = Triangle;
