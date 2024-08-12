"use strict";(self.webpackChunktelegaruda_caregiver=self.webpackChunktelegaruda_caregiver||[]).push([[232],{41907:(e,s,t)=>{t.r(s),t.d(s,{default:()=>K});var n=t(65043),a=t(44101),i=t(44227),r=t(70579);const l=function(){return(0,r.jsx)("div",{className:"patient-card-details",children:(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:12,lg:6,children:(0,r.jsxs)("div",{className:"blue-card patient-box",children:[(0,r.jsx)("h5",{children:"Patient Details"}),(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Patient Name: Ram Mohan S R"})}),(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Date Of Birth & Age: 04-02-1997 & 27 Years"})})]}),(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Gender:\xa0Male"})}),(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Blood Group:\xa0O+"})})]})]})}),(0,r.jsx)(i.U,{sm:12,lg:6,children:(0,r.jsxs)("div",{className:"black-card patient-box",children:[(0,r.jsx)("h5",{children:"Consult Details"}),(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Scheduled at:\xa021-06-2024 12:34 PM"})}),(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Started at:"})})]}),(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Ended at:"})}),(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Additional Notes:"})})]})]})})]})})};var c=t(65173),o=t.n(c),d=t(25196),m=(0,n.createContext)({}),u=(0,n.forwardRef)((function(e,s){var t=e.children,a=e.activeItemKey,i=e.className,r=e.onChange,l=(0,n.useId)(),c=(0,n.useState)(a),o=c[0],u=c[1];return(0,n.useEffect)((function(){o&&r&&r(o)}),[o]),n.createElement(m.Provider,{value:{_activeItemKey:o,setActiveItemKey:u,id:l}},n.createElement("div",{className:(0,d.A)("tabs",i),ref:s},t))}));u.propTypes={activeItemKey:o().oneOfType([o().number,o().string]).isRequired,children:o().node,className:o().string,onChange:o().func},u.displayName="CTabs";var h=t(22378),x=t(94462),b=(0,n.forwardRef)((function(e,s){var t,a=e.children,i=e.className,r=e.layout,l=e.variant,c=(0,h.Tt)(e,["children","className","layout","variant"]),o=(0,n.useRef)(null),m=(0,x.E2)(s,o);return n.createElement("div",(0,h.Cl)({className:(0,d.A)("nav",(t={},t["nav-".concat(r)]=r,t["nav-".concat(l)]=l,t),i),role:"tablist",onKeyDown:function(e){if(null!==o.current&&("ArrowDown"===e.key||"ArrowUp"===e.key||"ArrowLeft"===e.key||"ArrowRight"===e.key||"Home"===e.key||"End"===e.key)){e.preventDefault();var s=e.target,t=Array.from(o.current.querySelectorAll(".nav-link:not(.disabled):not(:disabled)")),n=void 0;(n="Home"===e.key||"End"===e.key?"End"===e.key?t.at(-1):t[0]:function(e,s,t,n){var a=e.length,i=e.indexOf(s);return-1===i?!t&&n?e[a-1]:e[0]:(i=((i+=t?1:-1)+a)%a,e[Math.max(0,Math.min(i,a-1))])}(t,s,"ArrowDown"===e.key||"ArrowRight"===e.key,!0))&&n.focus({preventScroll:!0})}},ref:m},c),a)}));b.propTypes={children:o().node,className:o().string,layout:o().oneOf(["fill","justified"]),variant:o().oneOf(["pills","tabs","underline","underline-border"])},b.displayName="CTabList";var j=(0,n.forwardRef)((function(e,s){var t=e.children,a=e.className,i=e.itemKey,r=(0,h.Tt)(e,["children","className","itemKey"]),l=(0,n.useContext)(m),c=l._activeItemKey,o=l.setActiveItemKey,u=l.id,x=function(){return i===c};return n.createElement("button",(0,h.Cl)({className:(0,d.A)("nav-link",{active:x()},a),id:"".concat(u).concat(i,"-tab"),onClick:function(){return o(i)},onFocus:function(){return o(i)},role:"tab",tabIndex:x()?0:-1,type:"button","aria-controls":"".concat(u).concat(i,"-tab-pane"),"aria-selected":x(),ref:s},r),t)}));j.propTypes={children:o().node,className:o().string,itemKey:o().oneOfType([o().number,o().string]).isRequired},j.displayName="CTab";var v=(0,n.forwardRef)((function(e,s){var t=e.children,a=e.className,i=(0,h.Tt)(e,["children","className"]);return n.createElement("div",(0,h.Cl)({className:(0,d.A)("tab-content",a)},i,{ref:s}),t)}));v.propTypes={children:o().node,className:o().string},v.displayName="CTabContent";var y=function(e){if(!e)return 0;var s=window.getComputedStyle(e),t=s.transitionDuration,n=s.transitionDelay,a=Number.parseFloat(t),i=Number.parseFloat(n);return a||i?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0},f=t(93789),p=(0,n.forwardRef)((function(e,s){var t=e.children,a=e.className,i=e.itemKey,r=e.onHide,l=e.onShow,c=e.transition,o=void 0===c||c,u=e.visible,b=(0,h.Tt)(e,["children","className","itemKey","onHide","onShow","transition","visible"]),j=(0,n.useContext)(m),v=j._activeItemKey,p=j.id,N=(0,n.useRef)(),C=(0,x.E2)(s,N),S=(0,n.useState)(u||v===i),g=S[0],I=S[1];return(0,n.useEffect)((function(){void 0!==u&&I(u)}),[u]),(0,n.useEffect)((function(){I(v===i)}),[v]),n.createElement(f.Ay,{in:g,nodeRef:N,onEnter:l,onExit:r,timeout:N.current?y(N.current):0},(function(e){return n.createElement("div",(0,h.Cl)({className:(0,d.A)("tab-pane",{active:g,fade:o,show:"entered"===e},a),id:"".concat(p).concat(i,"-tab-pane"),role:"tabpanel","aria-labelledby":"".concat(p).concat(i,"-tab"),tabIndex:0,ref:C},b),t)}))}));p.propTypes={children:o().node,className:o().string,itemKey:o().oneOfType([o().number,o().string]).isRequired,onHide:o().func,onShow:o().func,transition:o().bool,visible:o().bool},p.displayName="CTabPanel";var N=t(73216),C=t(35475);var S=t(94876),g=t(47925),I=t(10768),A=t(95212),k=t(20653),P=t(67639),H=t(91682),O=t(92009),T=t(27338),w=t(62457);const K=function(){const e=localStorage.getItem("ConsultTab"),s=e?JSON.parse(e):"Subjective",[t,a]=(0,n.useState)(s),i=(0,N.zy)(),c=(0,N.Zp)(),o=i.state.PatientDetail,d=(e,s,t,n,a,i)=>{c("/patients/history",{state:{PatientDetail:o}}),localStorage.removeItem("patiendDetailTab"),localStorage.setItem("PatientConsultTab",JSON.stringify(!0)),localStorage.setItem("PatientMenu",JSON.stringify(e)),localStorage.setItem("PatientSubMenu-1",JSON.stringify(s)),t&&localStorage.setItem("PatientSubMenu-2",JSON.stringify(t)),n&&localStorage.setItem("PatientSubMenu-3",JSON.stringify(n)),a&&localStorage.setItem("PatientSubMenu-4",JSON.stringify(a)),i&&localStorage.setItem("PatientSubMenu-5",JSON.stringify(i))},m=()=>{c(-1)};return(0,r.jsxs)("section",{className:"patient-summary-sec",children:[(0,r.jsx)("div",{className:"detailing-card",children:(0,r.jsx)(l,{})}),(0,r.jsx)("div",{className:"tab-sec mt-4 mb-4",children:(0,r.jsxs)(u,{activeItemKey:s,onChange:e=>{a(e),localStorage.setItem("ConsultTab",JSON.stringify(e))},children:[(0,r.jsxs)(b,{variant:"pills",children:[(0,r.jsx)(j,{"aria-controls":"home-tab-pane",itemKey:"Subjective",children:"Subjective"}),(0,r.jsx)(j,{"aria-controls":"profile-tab-pane",itemKey:"Objective",children:"Objective"}),(0,r.jsx)(j,{"aria-controls":"contact-tab-pane",itemKey:"Assessment",children:"Assessment"}),(0,r.jsx)(j,{"aria-controls":"contact-tab-pane",itemKey:"Plan",children:"Plan"})]}),(0,r.jsx)("div",{className:"bread-crumbs mt-4",children:(0,r.jsxs)("p",{children:[(0,r.jsx)(C.N_,{to:"/patients",children:"Patients"})," /"," ",(0,r.jsxs)(C.N_,{to:"/patients/history",onClick:e=>{e.preventDefault(),localStorage.removeItem("patiendDetailTab"),localStorage.removeItem("PatientConsultTab"),localStorage.removeItem("PatientMenu"),localStorage.removeItem("PatientSubMenu-1"),localStorage.removeItem("PatientSubMenu-2"),localStorage.removeItem("PatientSubMenu-3"),c("/patients/history",{state:{PatientDetail:o}})},children:[" ","Patient History"," "]})," ","/"," ",(0,r.jsxs)(C.N_,{to:"/patients/summary",className:"active",children:[" ",t]})]})}),(0,r.jsxs)(v,{children:[(0,r.jsxs)(p,{className:"p-2","aria-labelledby":"home-tab-pane",itemKey:"Subjective",children:[(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,1)},children:(0,r.jsx)("h4",{children:"Chief Complaints"})}),(0,r.jsx)(g.A,{from:"Consult",OnClose:m})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,2,1)},children:(0,r.jsx)("h4",{children:"History of Present Illness (HPI) - SYMPTOMS"})}),(0,r.jsx)(I.A,{from:"Consult"})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,2,2)},children:(0,r.jsx)("h4",{children:"History of Present Illness (HPI) - Medication"})}),(0,r.jsx)(A.A,{from:"Consult"})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,3,1)},children:(0,r.jsx)("h4",{children:"History - Medical History"})}),(0,r.jsx)(S.A,{from:"Consult"})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,3,3)},children:(0,r.jsx)("h4",{children:"History - Surgical History"})}),(0,r.jsx)(k.A,{from:"Consult"})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,3,4)},children:(0,r.jsx)("h4",{children:"History - Family History"})}),(0,r.jsx)(P.A,{from:"Consult"})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,3,5)},children:(0,r.jsx)("h4",{children:"History - Social History"})}),(0,r.jsx)(H.A,{from:"Consult"})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,3,2,1)},children:(0,r.jsx)("h4",{children:"History - OG History - Obstetric History"})}),(0,r.jsx)(O.A,{from:"Consult"})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,3,2,2,1)},children:(0,r.jsx)("h4",{children:"History - OG History - Gynaec History"})}),(0,r.jsx)(O.A,{from:"Consult-Gynaec"})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,1,3,2,2,2)},children:(0,r.jsx)("h4",{children:"History - OG History - Gynaec History- Screening and Diagnostic History"})}),(0,r.jsx)(O.A,{from:"Consult-Screen"})]})]}),(0,r.jsxs)(p,{className:"p-2","aria-labelledby":"home-tab-pane",itemKey:"Assessment",children:[(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,3,1)},children:(0,r.jsx)("h4",{children:"Diagnosis (Including ICD)"})}),(0,r.jsx)(T.A,{from:"Consult",OnClose:m})]}),(0,r.jsxs)("div",{className:"mb-2",children:[(0,r.jsx)("div",{className:"mb-3 cursor",onClick:()=>{d(2,3,2)},children:(0,r.jsx)("h4",{children:"Immunization Status"})}),(0,r.jsx)(w.A,{from:"Consult",OnClose:m})]})]})]})]})})]})}}}]);
//# sourceMappingURL=232.cbc12779.chunk.js.map