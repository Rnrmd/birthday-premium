import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.querySelector('#universe');
let renderer, scene, camera, stars, starMaterial, animationId;
try {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  renderer.setSize(innerWidth, innerHeight);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, .1, 100);
  camera.position.z = 30;
  const count = 950, positions = new Float32Array(count * 3), sizes = new Float32Array(count);
  for (let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*70;positions[i*3+1]=(Math.random()-.5)*45;positions[i*3+2]=(Math.random()-.5)*45;sizes[i]=Math.random()*1.5+.3;}
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geo.setAttribute('size',new THREE.BufferAttribute(sizes,1));
  starMaterial = new THREE.PointsMaterial({color:0xe9b6d0,size:.085,transparent:true,opacity:.75,sizeAttenuation:true});
  stars = new THREE.Points(geo,starMaterial); scene.add(stars);
  const clock = new THREE.Clock();
  const render = () => { animationId=requestAnimationFrame(render); if(!prefersReduced){stars.rotation.y=clock.getElapsedTime()*.008;stars.rotation.x=Math.sin(clock.getElapsedTime()*.05)*.025;} renderer.render(scene,camera); };
  render();
  addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));});
} catch(e) { console.warn('WebGL is unavailable; the page will use its CSS background.',e); }

if (window.gsap && !prefersReduced) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-kicker,.hero-copy .reveal',{y:28,opacity:0,duration:1,stagger:.14,ease:'power3.out',delay:.25});
  gsap.to('.orbit-a',{rotation:12, duration:24, repeat:-1, yoyo:true, ease:'sine.inOut'});
  gsap.to('.orbit-b',{rotation:48, duration:30, repeat:-1, yoyo:true, ease:'sine.inOut'});
  gsap.utils.toArray('.reveal').forEach((el)=>{
    if(el.closest('.hero')) return;
    gsap.fromTo(el,{y:35,opacity:0},{y:0,opacity:1,duration:.9,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none reverse'}});
  });
  gsap.to('.note-left',{y:-18,rotation:-7,duration:3,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.note-right',{y:16,rotation:13,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
}

const beginBtn=document.querySelector('#beginBtn');
beginBtn.addEventListener('click',()=>document.querySelector('#letter').scrollIntoView({behavior:prefersReduced?'auto':'smooth'}));
const wishBtn=document.querySelector('#wishBtn');
wishBtn.addEventListener('click',()=>{
  const feedback=document.querySelector('#wishFeedback');
  feedback.textContent='Your wish is on its way. Keep believing. ✨';
  if(window.gsap&&!prefersReduced){gsap.fromTo('.wish-orb',{scale:1},{scale:1.16,duration:.35,yoyo:true,repeat:1,ease:'power2.inOut'});}
  // A burst of small stars is intentionally visual-only; no wish text is collected or sent.
});
document.querySelector('#replayBtn').addEventListener('click',()=>window.scrollTo({top:0,behavior:prefersReduced?'auto':'smooth'}));

const audio=document.querySelector('#bgMusic'), soundToggle=document.querySelector('#soundToggle'), soundLabel=document.querySelector('#soundLabel');
let playing=false;
soundToggle.addEventListener('click',async()=>{
  if(!playing){try{await audio.play();playing=true;soundLabel.textContent='SOUND ON';soundToggle.classList.add('is-playing');}catch(e){soundLabel.textContent='ADD SONG';}}
  else{audio.pause();playing=false;soundLabel.textContent='SOUND OFF';soundToggle.classList.remove('is-playing');}
});

// Personalize once: change the value below or replace the tokens in index.html.
const recipientName='Beautiful';
document.querySelectorAll('[data-name]').forEach(el=>el.textContent=recipientName);
