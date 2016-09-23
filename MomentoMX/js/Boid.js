// Based on http://www.openprocessing.org/visuals/?visualID=6910

var Boid = function() {

    var vector = new THREE.Vector3(),
	_index,
	_acceleration, _width = 500, _height = 500,
	_depth = 200, _goal, _neighborhoodRadius = 25,
	_maxSpeed = 5, _maxSteerForce = 0.1, _avoidWalls = false;

    var _path, _meshGoal, _source, _modelIndex;
    var _currentNode = 0;

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    _acceleration = new THREE.Vector3();

    this.pathFollowing = function () {
	var target = new THREE.Vector3();
	if ( _path != null ) {
	    //console.log("Path found");
	    var nodes = _path.getNodes();
	    target = nodes[_currentNode];
	    if ( boid.position.distanceTo(target) <= 100 ) {
		_currentNode +=1;
		if ( _currentNode >= _modelIndex ) {
		    if ( _meshGoal != null ) {
			this.setGoal(_meshGoal);
			this.setPath(null);
		    }
		}
		if ( _currentNode >= nodes.length ) {
		    _currentNode = 0;
		    boid.position.x = _source.x;
		    //boid.position.y = Math.random() * 1000 + _source.y;
		    boid.position.y = _source.y;
		    boid.position.z = -Math.random() * 2500 + _source.z;
		} 
	    }
	 
	}
	else {
	    console.log("Path not found!");
	}    
	return target != null ? this.reach(target, 0.001) : new THREE.Vector3();
    };

    this.setModelIndex = function ( index ) {
	_modelIndex = index;
    }

    this.setIndex = function ( index ) {
	_index = index;
    }

    this.setSource = function ( x, y, z ) {
	_source = new THREE.Vector3(x, y, z);
    }	

    this.setPath = function ( path ) {
	_path = path;
    }

    this.setMeshGoal = function ( target ) {
	_meshGoal = target;
    };
    
    this.setGoal = function ( target ) {
	_goal = target;
    };

    this.setAvoidWalls = function ( value ) {
	_avoidWalls = value;
    };

    this.setWorldSize = function ( width, height, depth ) {
	_width = width;
	_height = height;
	_depth = depth;
    };

    this.run = function ( boids ) {

	if ( _avoidWalls ) {

	    vector.set( - _width, this.position.y, this.position.z );
	    vector = this.avoid( vector );
	    vector.multiplyScalar( 5 );
	    _acceleration.add( vector );

	    vector.set( _width, this.position.y, this.position.z );
	    vector = this.avoid( vector );
	    vector.multiplyScalar( 5 );
	    _acceleration.add( vector );

	    vector.set( this.position.x, - _height, this.position.z );
	    vector = this.avoid( vector );
	    vector.multiplyScalar( 5 );
	    _acceleration.add( vector );

	    vector.set( this.position.x, _height, this.position.z );
	    vector = this.avoid( vector );
	    vector.multiplyScalar( 5 );
	    _acceleration.add( vector );

	    vector.set( this.position.x, this.position.y, - _depth );
	    vector = this.avoid( vector );
	    vector.multiplyScalar( 5 );
	    _acceleration.add( vector );

	    vector.set( this.position.x, this.position.y, _depth );
	    vector = this.avoid( vector );
	    vector.multiplyScalar( 5 );
	    _acceleration.add( vector );

	}/* else {

this.checkBounds();

}
	 */

	if ( Math.random() > 0.3 ) {
	    this.flock( boids );
	}
	
	this.move();

    };

    this.flock = function ( boids ) {
	if ( _goal ) {
	    _acceleration.add( this.reach( _goal, 0.5 ) );
	}
	if ( _path ) {
	    _acceleration.add( this.pathFollowing() );
	}
	//_acceleration.add( this.alignment( boids ) );
	//_acceleration.add( this.cohesion( boids ) );
	_acceleration.add( this.separation( boids ) );
    };

    this.move = function () {

	this.velocity.add( _acceleration );

	var l = this.velocity.length();

	if ( l > _maxSpeed ) {

	    this.velocity.divideScalar( l / _maxSpeed );
	    //this.velocity.multiplyScalar( _maxSpeed );

	}

	this.position.add( this.velocity );
	_acceleration.set( 0, 0, 0 );

    };

    this.checkBounds = function () {

	if ( this.position.x >   _width ) this.position.x = - _width;
	if ( this.position.x < - _width ) this.position.x =   _width;
	if ( this.position.y >   _height ) this.position.y = - _height;
	if ( this.position.y < - _height ) this.position.y =  _height;
	if ( this.position.z >  _depth ) this.position.z = - _depth;
	if ( this.position.z < - _depth ) this.position.z =  _depth;

    };

    //

    this.avoid = function ( target ) {

	var steer = new THREE.Vector3();

	steer.copy( this.position );
	steer.sub( target );

	steer.multiplyScalar( 1 / this.position.distanceToSquared( target ) );

	return steer;

    };

    this.repulse = function ( target ) {

	var distance = this.position.distanceTo( target );
	
	if ( distance < 150 ) {
	    var steer = new THREE.Vector3();

	    steer.subVectors( this.position, target );
	    steer.multiplyScalar( 0.5 / distance );

	    _acceleration.add( steer );

	}

    };

    this.reach = function ( target, amount ) {

	var steer = new THREE.Vector3();

	steer.subVectors( target, this.position );
	steer.multiplyScalar( amount );

	return steer;

    };

    this.alignment = function ( boids ) {

	var boid, velSum = new THREE.Vector3(),
	    count = 0;

	for ( var i = 0, il = boids.length; i < il; i++ ) {

	    if ( Math.random() > 0.6 ) continue;

	    boid = boids[ i ];

	    distance = boid.position.distanceTo( this.position );

	    if ( distance > 0 && distance <= _neighborhoodRadius ) {

		velSum.add( boid.velocity );
		count++;

	    }

	}

	if ( count > 0 ) {

	    velSum.divideScalar( count );

	    var l = velSum.length();

	    if ( l > _maxSteerForce ) {

		velSum.divideScalar( l / _maxSteerForce );

	    }

	}

	return velSum;

    };

    this.cohesion = function ( boids ) {

	var boid, distance,
	    posSum = new THREE.Vector3(),
	    steer = new THREE.Vector3(),
	    count = 0;

	for ( var i = 0, il = boids.length; i < il; i ++ ) {

	    if ( Math.random() > 0.6 ) continue;

	    boid = boids[ i ];
	    distance = boid.position.distanceTo( this.position );

	    if ( distance > 0 && distance <= _neighborhoodRadius ) {

		posSum.add( boid.position );
		count++;

	    }

	}

	if ( count > 0 ) {

	    posSum.divideScalar( count );

	}

	steer.subVectors( posSum, this.position );

	var l = steer.length();

	if ( l > _maxSteerForce ) {

	    steer.divideScalar( l / _maxSteerForce );

	}

	return steer;

    };

    this.separation = function ( boids ) {

	var boid, distance,
	    posSum = new THREE.Vector3(),
	    repulse = new THREE.Vector3();

	for ( var i = 0, il = boids.length; i < il; i ++ ) {

	    if ( Math.random() > 0.6 ) continue;

	    boid = boids[ i ];
	    distance = boid.position.distanceTo( this.position );

	    if ( distance > 0 && distance <= _neighborhoodRadius ) {

		repulse.subVectors( this.position, boid.position );
		repulse.normalize();
		repulse.divideScalar( distance );
		posSum.add( repulse );

	    }

	}

	return posSum;

    }

}
