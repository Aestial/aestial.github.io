THREE.OutlineShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"offset":   { type: "f", value: 1.0 }
	},

	vertexShader: [

		"uniform float offset;",
        "void main() {",
            "vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );",
            "gl_Position = projectionMatrix * pos;",
        "}"

	].join("\n"),

	fragmentShader: [

		"void main(){",
            "gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );",
        "}"

	].join("\n")

};