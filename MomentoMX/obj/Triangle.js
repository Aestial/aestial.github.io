var Triangle = function () {

    var scope = this;

    THREE.Geometry.call( this );

    v(   0,   0,   0 );
    v(   1,  -1,   0 );
    v( - 1,  -1,   0 );
    v(   1,   1,   0 );
    v(  -1,   1,   0 );

    //f3( 0, 2, 1 );
    
    //this.computeFaceNormals();

    function v( x, y, z ) {

	scope.vertices.push( new THREE.Vector3( x, y, z ) );

    }

    function f3( a, b, c ) {

	scope.faces.push( new THREE.Face3( a, b, c ) );

    }

}

Triangle.prototype = Object.create( THREE.Geometry.prototype );
Triangle.prototype.constructor = Triangle;
