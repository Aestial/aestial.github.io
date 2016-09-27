var Vertex = function () {

    var scope = this;

    THREE.Geometry.call( this );

    v(   0,   0,   0 );

    function v( x, y, z ) {

	scope.vertices.push( new THREE.Vector3( x, y, z ) );

    }	

}

Vertex.prototype = Object.create( THREE.Geometry.prototype );
Vertex.prototype.constructor = Vertex;
