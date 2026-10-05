import{r as i,j as e,u as k,a as S}from"./index-C-8S-Smi.js";import{S as C}from"./Shell-NPs1lBTA.js";import{c as r}from"./activity-CSiAwEcn.js";import{C as z}from"./ClarificationCard-CxuNgzIe.js";import{C as N}from"./ConfidenceMeter-C1kbMvqI.js";import{L as M}from"./StatsCard-CSWtPYHI.js";import{a as p}from"./api-DUjmgKzo.js";import"./triangle-alert-Hb-9F3V3.js";import"./shield-check-Cbuknqc0.js";/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=r("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=r("CameraOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16",key:"qmtpty"}],["path",{d:"M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5",key:"1ufyfc"}],["path",{d:"M14.121 15.121A3 3 0 1 1 9.88 10.88",key:"11zox6"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=r("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=r("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=r("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=r("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=r("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);function A({active:l,demo:c}){const o=i.useRef(null),d=i.useRef(null),[u,h]=i.useState(null);return i.useEffect(()=>{let x=!1;async function a(){if(!(c||!l))try{const t=await navigator.mediaDevices.getUserMedia({video:!0});if(x){t.getTracks().forEach(s=>s.stop());return}d.current=t,o.current&&(o.current.srcObject=t)}catch{h("Camera access is required for live sign recognition.")}}return a(),()=>{var t;x=!0,(t=d.current)==null||t.getTracks().forEach(s=>s.stop())}},[l,c]),c?e.jsxs("div",{className:"camera-panel",children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 40%, #0D2852, #01081C)"}}),e.jsx(f,{size:64,color:"#28406E",style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}),e.jsx("div",{className:"scan-frame"}),e.jsx("div",{className:"scan-line"}),e.jsx("div",{className:"live-pill",children:"LIVE · PSL MODE · DEMO"})]}):e.jsxs("div",{className:"camera-panel",children:[u?e.jsx("div",{style:{position:"absolute",inset:0,display:"grid",placeItems:"center",textAlign:"center",padding:20,color:"var(--text-secondary)"},children:e.jsxs("div",{children:[e.jsx(R,{size:40,style:{marginBottom:10}}),e.jsx("p",{children:u}),e.jsx("p",{style:{fontSize:".8rem",marginTop:6},children:"You can still use Demo Mode below."})]})}):e.jsx("video",{ref:o,autoPlay:!0,playsInline:!0,muted:!0}),e.jsx("div",{className:"scan-frame"}),e.jsx("div",{className:"scan-line"}),e.jsx("div",{className:"live-pill",children:"LIVE · PSL MODE"})]})}function U(){const l=k(),{setRecognition:c,showToast:o}=S(),[d,u]=i.useState(!1),[h,x]=i.useState(!0),[a,t]=i.useState("listening"),[s,m]=i.useState(null),[g,y]=i.useState(0),j=async()=>{t("detecting");const n=d?await p.recognizeSignDemo(g):await p.recognizeSign();y(b=>b+1),n.confidence>=.8?(m(n),t("recognized"),c(n)):(m(n),t("lowconf"),c(n))},v=()=>{o("Sign confirmed: "+s.text),l("/patient/chat")};return e.jsx(C,{title:"Sign Recognition",subtitle:"Pakistan Sign Language · live intake",children:e.jsxs("div",{className:"grid-2",children:[e.jsxs("div",{children:[e.jsx(A,{active:h,demo:d}),e.jsxs("div",{style:{display:"flex",gap:10,marginTop:16,flexWrap:"wrap"},children:[e.jsxs("button",{className:"btn btn-primary",onClick:j,disabled:a==="detecting",children:[e.jsx(f,{size:16})," Capture"]}),e.jsxs("button",{className:"btn btn-ghost",onClick:()=>x(!1),children:[e.jsx(E,{size:16})," Pause"]}),e.jsxs("button",{className:"btn btn-ghost",onClick:()=>{t("listening"),m(null)},children:[e.jsx(D,{size:16})," Retry"]}),e.jsxs("button",{className:"btn btn-ghost",onClick:()=>u(!0),children:[e.jsx(P,{size:16})," Demo Mode"]}),e.jsxs("button",{className:"btn btn-ghost",onClick:()=>l("/patient"),children:[e.jsx(w,{size:16})," Back"]})]})]}),e.jsxs("div",{className:"card",style:{padding:26},children:[e.jsx("h2",{style:{marginBottom:14},children:"Recognition"}),a==="listening"&&e.jsxs("p",{className:"subtitle",children:[e.jsx(L,{size:14})," Listening for your sign… position yourself inside the camera frame."]}),a==="detecting"&&e.jsx(M,{text:"Signing detected… analyzing gesture"}),a==="recognized"&&s&&e.jsxs("div",{style:{textAlign:"center",padding:"20px 0"},children:[e.jsx("p",{className:"label",children:"Recognized"}),e.jsx("h1",{style:{fontSize:"2.2rem",margin:"10px 0",color:"#C4B5FD"},children:s.text}),e.jsxs("p",{className:"subtitle",children:["Confidence: ",Math.round(s.confidence*100),"%"]}),e.jsx("div",{style:{margin:"16px 0"},children:e.jsx(N,{value:s.confidence})}),e.jsx("button",{className:"btn btn-primary",onClick:v,children:"Yes, that's correct →"})]}),a==="lowconf"&&s&&e.jsx(z,{options:s.alternatives,onSelect:n=>{m({text:n.text,confidence:n.confidence}),t("recognized"),o(`Confirmed: ${n.text}`)},onRetry:()=>t("listening")})]})]})})}export{U as default};
