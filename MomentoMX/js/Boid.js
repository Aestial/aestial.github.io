// Based on http://www.openprocessing.org/visuals/?visualID=6910

var Boid = function() {

    var vector = new THREE.Vector3(),
	_index, _formMesh = true, _reached = false, _counted = false,
	_acceleration, _width = 500, _height = 500,
	_depth = 200, _goal, _neighborhoodRadius = 20,
	_maxSpeed = 10.5, _minSpeed = 0.01, _maxSteerForce = 0.25, _avoidWalls = false;

    var _path, _meshGoal, _source, _slowingRadius = 25, _pathGoalRadius = 100, _modelIndex;
    var _currentNode = 0;

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    _acceleration = new THREE.Vector3();

    this.pathFollowing = function ( amount ) {
	var target = new THREE.Vector3();
	if ( _path != null ) {
	    //console.log("Path found");
	    var nodes = _path.getNodes();
	    target = nodes[_currentNode];
	    if ( this.position.distanceTo(target) <= _path.getRadius(_currentNode) ) {
		_currentNode +=1;
		if ( _currentNode > _modelIndex ) {
		    if ( _meshGoal != null && _formMesh) {
			this.setGoal(_meshGoal);
			this.setPath(null);
		    }
		}
		if ( _currentNode >= nodes.length ) {
		    this.setPath(null);
		    _formMesh = true;
		    _currentNode = 0;
		    this.position.x = Math.random() * _randomSource.x + _source.x;
		    this.position.y = Math.random() * _randomSource.y + _source.y;
		    this.position.z = Math.random() * _randomSource.z + _source.z;
		} 
	    }
	 
	}
	else {
	    console.log("Path not found!");
	}    
	return target != null ? this.reach(target, amount) : new THREE.Vector3();
    };

    this.getReached = function () {
	return _reached;
    }

    this.getCounted = function () {
	return _counted;
    }

    this.setCounted = function ( value ) {
	_counted = value;
    }
    
    this.setModelIndex = function ( index ) {
	_modelIndex = index;
    }

    this.setIndex = function ( index ) {
	_index = index;
    }

    this.setSource = function ( x, y, z ) {
	_source = new THREE.Vector3(x, y, z);
    }

    this.setRandomSource = function (x, y, z ) {
	_randomSource = new THREE.Vector3(x, y, z);
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
	if ( !_reached ) {
	    
	    if ( Math.random() > 0.5 ) {
		this.flock( boids );
	    }
	    
	    this.move();
	}
    };

    this.flock = function ( boids ) {
	if ( _goal ) {
	    _acceleration.add( this.reach( _goal, 0.2 ) );
	}
	if ( _path ) {
	    _acceleration.add( this.pathFollowing( 0.007 ) );
	}
	//_acceleration.add( this.alignment( boids ) );
	//_acceleration.add( this.cohesion( boids ) );
	//_acceleration.add( this.separation( boids ) );
    };

    this.move = function () {

	this.velocity.add( _acceleration );

	var l = this.velocity.length();

	if ( l > _maxSpeed ) {

	    //this.velocity.divideScalar( l / _maxSpeed );
	    this.velocity.multiplyScalar( _maxSpeed / l);

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
	
	if ( distance < 50 ) {
	    var steer = new THREE.Vector3();

	    steer.subVectors( this.position, target );
	    steer.multiplyScalar( 0.5 / distance );

	    _acceleration.add( steer );

	}

    };

    this.reach = function ( target, amount ) {
	var ratio = 1;
	var steer = new THREE.Vector3();
	steer.subVectors( target, this.position );
	steer.multiplyScalar( amount );

	if ( _goal != null ) {   
	    var distance = this.position.distanceTo(_goal);
	    if ( distance < _slowingRadius ) {
		ratio = distance/_slowingRadius;
		_maxSpeed *= ratio;
		_reached = true;
		if ( _maxSpeed < _minSpeed ) {
		    //_maxSpeed = 0;
		    _maxSpeed = _minSpeed;
		}
	    }
	}
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
