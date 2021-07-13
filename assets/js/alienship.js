
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(0x00000,0);

var c = renderer.domElement;
document.body.appendChild(c);

var scene = new THREE.Scene();
renderer.setSize(1000, 300);
c.width = 1000;
c.height = 300;
var camera = new THREE.PerspectiveCamera(10,innerWidth/innerHeight,0.1, 1000);
camera.position.z = -80;

var target = new THREE.Vector3();

var donutGeo = new THREE.TorusGeometry(0.5,0.21,60,240);
var mat = new THREE.ShaderMaterial({
  color:0xff0000,
  uniforms:{
    time:{type:'f', value:0}
    
  },
  vertexShader:
  "																													\n"+
  "	uniform float time;																			\n"+
  "	varying vec3 vPos;																			\n"+
  "	varying float d;																				\n"+
  "	void main() {																						\n"+
  "		vPos = position;																				\n"+
  "		d = .07*min(sin(-time*1.+position.y*position.x*position.z*205.),0.89);										\n"+
  "		float d2 = .07*min(sin(time*1.+sin(uv.y*3.141*2.+uv.x*3.141*12.)*3.141),0.89);										\n"+
  "	d = mix(d,d2, sin(time)*.3);																			\n"+
  "		d = max(d,-0.4);																					\n"+
  "		vPos += vec4(normal*d*0.6,1.).xyz;												\n"+
  "		gl_Position = projectionMatrix*modelViewMatrix*vec4(vPos,1.);	\n"+
  "	}																												\n"+
  "																													\n"+
  "																													\n"+
  "																													\n"+
  ""
  ,
  fragmentShader: 
  "		varying float d;																			\n"+
  "		varying vec3 vPos;																		\n"+
  "																													\n"+
  "		void main() {																					\n"+
  "																															\n"+
  "			gl_FragColor.rgb = ((vPos+0.5)*(d*0.01+1.2)*(-d+0.25)*1.4);					\n"+
  "			if(d<-0.04) { gl_FragColor.rgb = vec3(.8);}										\n"+
  "			gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.), (0.03-d)*10.);	\n"+
  "		}																											\n"+
  "																													\n"+
  "																													\n"+
  "																													\n"+
  ""
 
});


var donut = new THREE.Mesh(donutGeo, mat);
donut.scale.set(6,6,6);
scene.add(donut);


var plane = new THREE.PlaneGeometry(9,9);

document.body.addEventListener('mousemove',onMouseMove);
function onMouseMove(evt) {
    
  
}
camera.lookAt(new THREE.Vector3());

update();
function update() {
  mat.uniforms.time.value = (new Date().getTime()%2500)/2500*Math.PI*2;
  camera.lookAt(target);
  donut.rotation.x = Math.PI/2-0.3*Math.sin(new Date().getTime()*0.001);
  donut.rotateZ(0.01);
  donut.scale.set(9,9,9);
  renderer.render(scene,camera);
requestAnimationFrame(update);
}


function fromCanvas(c) {
  var tex = new THREE.Texture(c);
  tex.needsUpdate = true;
  var shadowMaterial = new THREE.MeshBasicMaterial({
  	transparent:true,
    map:tex
  });
    
  
  return shadowMaterial;
}