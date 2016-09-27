var Path = function() {
    
    var nodes = [];
    var radius;

    this.addNode = function ( node ) {
	nodes.push(node);
    }

    this.getNodes = function () {
	return nodes;
    }

    this.DEBUG_ShowNodes = function () {
	for ( var i = 0; i< nodes.length; i++ ) {
	    console.log(nodes[i]);
	}
    }	
}
