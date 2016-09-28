var Path = function() {
    
    var nodes = [];
    var originalPos = [];
    var offsets = [];
    var radiuses = [];

    this.addNode = function ( node, radius ) {
	nodes.push(node);
	originalPos.push(node.clone());
	radiuses.push(radius);
	offsets.push(Math.random()*20);
    }

    this.getRadius = function ( index ) {
	return radiuses[index];
    }
	

    this.getOffset = function() {
	return offsets;
    }
	
    this.getNodes = function () {
	return nodes;
    }

    this.getOriginalPos = function () {
	return originalPos;
    }

    this.DEBUG_ShowNodes = function () {
	for ( var i = 0; i< nodes.length; i++ ) {
	    console.log(nodes[i]);
	}
    }	
}
