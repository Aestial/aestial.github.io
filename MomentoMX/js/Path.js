var Path = function() {
    
    var nodes = [];
    var originalPos = [];
    var offsets = [];
    var radius;

    this.addNode = function ( node ) {
	nodes.push(node);
	originalPos.push(node.clone());
	offsets.push(Math.random()*20);
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
