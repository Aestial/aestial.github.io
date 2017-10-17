varying vec2 vUv;
uniform sampler2D tBase;
uniform sampler2D tGlow;
uniform float glowStrength;
void main() {
	//Screen: X = 1- ((255-U)*(255-L))/255
	vec4 color = 1.0 - ( ( 1.0 - glowStrength*texture2D( tGlow, vec2( vUv.x, vUv.y ) ) ) * ( 1.0 - texture2D( tBase, vUv ) ) );
	//vec4 color = mix( texture2D( tBase, vUv ), texture2D( tGlow, vec2( vUv.x, 1.0 - vUv.y ) ), .5 );
	//vec4 color = texture2D( tBase, vUv ) + texture2D( tGlow, vUv ) * texture2D( tGlow, vUv );
	gl_FragColor = vec4( color.rgb, 1.0 );
}