"use strict";(self.webpackChunktelegaruda_caregiver=self.webpackChunktelegaruda_caregiver||[]).push([[735],{41907:(e,t,n)=>{n.r(t),n.d(t,{default:()=>K});var s=n(65043),a=n(44101),i=n(44227),r=n(70579);const l=function(){return(0,r.jsx)("div",{className:"patient-card-details",children:(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:12,lg:6,children:(0,r.jsxs)("div",{className:"blue-card patient-box",children:[(0,r.jsx)("h5",{children:"Patient Details"}),(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Patient Name: Ram Mohan S R"})}),(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Date Of Birth & Age: 04-02-1997 & 27 Years"})})]}),(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Gender:\xa0Male"})}),(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Blood Group:\xa0O+"})})]})]})}),(0,r.jsx)(i.U,{sm:12,lg:6,children:(0,r.jsxs)("div",{className:"black-card patient-box",children:[(0,r.jsx)("h5",{children:"Consult Details"}),(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Scheduled at:\xa021-06-2024 12:34 PM"})}),(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Started at:"})})]}),(0,r.jsxs)(a.s,{children:[(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Ended at:"})}),(0,r.jsx)(i.U,{sm:6,children:(0,r.jsx)("span",{children:"Additional Notes:"})})]})]})})]})})};var c=n(65173),o=n.n(c),d=n(25196),m=(0,s.createContext)({}),u=(0,s.forwardRef)((function(e,t){var n=e.children,a=e.activeItemKey,i=e.className,r=e.onChange,l=(0,s.useId)(),c=(0,s.useState)(a),o=c[0],u=c[1];return(0,s.useEffect)((function(){o&&r&&r(o)}),[o]),s.createElement(m.Provider,{value:{_activeItemKey:o,setActiveItemKey:u,id:l}},s.createElement("div",{className:(0,d.A)("tabs",i),ref:t},n))}));u.propTypes={activeItemKey:o().oneOfType([o().number,o().string]).isRequired,children:o().node,className:o().string,onChange:o().func},u.displayName="CTabs";var h=n(22378),f=n(94462),x=(0,s.forwardRef)((function(e,t){var n,a=e.children,i=e.className,r=e.layout,l=e.variant,c=(0,h.Tt)(e,["children","className","layout","variant"]),o=(0,s.useRef)(null),m=(0,f.E2)(t,o);return s.createElement("div",(0,h.Cl)({className:(0,d.A)("nav",(n={},n["nav-".concat(r)]=r,n["nav-".concat(l)]=l,n),i),role:"tablist",onKeyDown:function(e){if(null!==o.current&&("ArrowDown"===e.key||"ArrowUp"===e.key||"ArrowLeft"===e.key||"ArrowRight"===e.key||"Home"===e.key||"End"===e.key)){e.preventDefault();var t=e.target,n=Array.from(o.current.querySelectorAll(".nav-link:not(.disabled):not(:disabled)")),s=void 0;(s="Home"===e.key||"End"===e.key?"End"===e.key?n.at(-1):n[0]:function(e,t,n,s){var a=e.length,i=e.indexOf(t);return-1===i?!n&&s?e[a-1]:e[0]:(i=((i+=n?1:-1)+a)%a,e[Math.max(0,Math.min(i,a-1))])}(n,t,"ArrowDown"===e.key||"ArrowRight"===e.key,!0))&&s.focus({preventScroll:!0})}},ref:m},c),a)}));x.propTypes={children:o().node,className:o().string,layout:o().oneOf(["fill","justified"]),variant:o().oneOf(["pills","tabs","underline","underline-border"])},x.displayName="CTabList";var y=(0,s.forwardRef)((function(e,t){var n=e.children,a=e.className,i=e.itemKey,r=(0,h.Tt)(e,["children","className","itemKey"]),l=(0,s.useContext)(m),c=l._activeItemKey,o=l.setActiveItemKey,u=l.id,f=function(){return i===c};return s.createElement("button",(0,h.Cl)({className:(0,d.A)("nav-link",{active:f()},a),id:"".concat(u).concat(i,"-tab"),onClick:function(){return o(i)},onFocus:function(){return o(i)},role:"tab",tabIndex:f()?0:-1,type:"button","aria-controls":"".concat(u).concat(i,"-tab-pane"),"aria-selected":f(),ref:t},r),n)}));y.propTypes={children:o().node,className:o().string,itemKey:o().oneOfType([o().number,o().string]).isRequired},y.displayName="CTab";var j=(0,s.forwardRef)((function(e,t){var n=e.children,a=e.className,i=(0,h.Tt)(e,["children","className"]);return s.createElement("div",(0,h.Cl)({className:(0,d.A)("tab-content",a)},i,{ref:t}),n)}));j.propTypes={children:o().node,className:o().string},j.displayName="CTabContent";var v=function(e){if(!e)return 0;var t=window.getComputedStyle(e),n=t.transitionDuration,s=t.transitionDelay,a=Number.parseFloat(n),i=Number.parseFloat(s);return a||i?(n=n.split(",")[0],s=s.split(",")[0],1e3*(Number.parseFloat(n)+Number.parseFloat(s))):0},p=n(93789),b=(0,s.forwardRef)((function(e,t){var n=e.children,a=e.className,i=e.itemKey,r=e.onHide,l=e.onShow,c=e.transition,o=void 0===c||c,u=e.visible,x=(0,h.Tt)(e,["children","className","itemKey","onHide","onShow","transition","visible"]),y=(0,s.useContext)(m),j=y._activeItemKey,b=y.id,N=(0,s.useRef)(),C=(0,f.E2)(t,N),g=(0,s.useState)(u||j===i),S=g[0],A=g[1];return(0,s.useEffect)((function(){void 0!==u&&A(u)}),[u]),(0,s.useEffect)((function(){A(j===i)}),[j]),s.createElement(p.Ay,{in:S,nodeRef:N,onEnter:l,onExit:r,timeout:N.current?v(N.current):0},(function(e){return s.createElement("div",(0,h.Cl)({className:(0,d.A)("tab-pane",{active:S,fade:o,show:"entered"===e},a),id:"".concat(b).concat(i,"-tab-pane"),role:"tabpanel","aria-labelledby":"".concat(b).concat(i,"-tab"),tabIndex:0,ref:C},x),n)}))}));b.propTypes={children:o().node,className:o().string,itemKey:o().oneOfType([o().number,o().string]).isRequired,onHide:o().func,onShow:o().func,transition:o().bool,visible:o().bool},b.displayName="CTabPanel";var N=n(73216),C=n(35475);var g=n(94876),S=n(47925),A=n(10768),k=n(95212),w=n(20653),I=n(67639);const K=function(){const[e,t]=(0,s.useState)("Vitals"),n=(0,N.zy)(),a=(0,N.Zp)(),i=n.state.PatientDetail,c=(e,t,n,s)=>{a("/patients/history",{state:{PatientDetail:i}}),localStorage.removeItem("patiendDetailTab"),localStorage.setItem("PatientMenu",JSON.stringify(e)),localStorage.setItem("PatientSubMenu-1",JSON.stringify(t)),localStorage.setItem("PatientSubMenu-2",JSON.stringify(n)),localStorage.setItem("PatientSubMenu-3",JSON.stringify(s))};return(0,r.jsxs)("section",{className:"patient-summary-sec",children:[(0,r.jsx)("div",{className:"detailing-card",children:(0,r.jsx)(l,{})}),(0,r.jsx)("div",{className:"tab-sec mt-4 mb-4",children:(0,r.jsxs)(u,{activeItemKey:"Subjective",onChange:e=>t(e),children:[(0,r.jsxs)(x,{variant:"pills",children:[(0,r.jsx)(y,{"aria-controls":"home-tab-pane",itemKey:"Subjective",children:"Subjective"}),(0,r.jsx)(y,{"aria-controls":"profile-tab-pane",itemKey:"Objective",children:"Objective"}),(0,r.jsx)(y,{"aria-controls":"contact-tab-pane",itemKey:"Assessment",children:"Assessment"}),(0,r.jsx)(y,{"aria-controls":"contact-tab-pane",itemKey:"Plan",children:"Plan"})]}),(0,r.jsx)("div",{className:"bread-crumbs mt-4",children:(0,r.jsxs)("p",{children:[(0,r.jsx)(C.N_,{to:"/patients",children:"Patients"})," /"," ",(0,r.jsx)(C.N_,{to:"/patients/history",children:" Patient History "})," /"," ",(0,r.jsxs)(C.N_,{to:"/patients/summary",className:"active",children:[" ",e]})]})}),(0,r.jsx)(j,{children:(0,r.jsxs)(b,{className:"p-2","aria-labelledby":"home-tab-pane",itemKey:"Subjective",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{onClick:()=>{c(2,1,1)},children:"Chief Complaints"}),(0,r.jsx)(S.A,{from:"Consult"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{onClick:()=>{c(2,1,2,1)},children:"History of Present Illness (HPI) - SYMPTOMS"}),(0,r.jsx)(A.A,{from:"Consult"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{onClick:()=>{c(2,1,2,2)},children:"History of Present Illness (HPI) - Medication"}),(0,r.jsx)(k.A,{from:"Consult"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{onClick:()=>{c(2,1,3,1)},children:"History - Medical History"}),(0,r.jsx)(g.A,{from:"Consult"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{onClick:()=>{c(2,1,3,3)},children:"History - Surgical History"}),(0,r.jsx)(w.A,{from:"Consult"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{onClick:()=>{c(2,1,3,4)},children:"History - Family History"}),(0,r.jsx)(I.A,{from:"Consult"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{onClick:()=>{c(2,1,3,5)},children:"History - Social History"}),(0,r.jsx)(I.A,{from:"Consult"})]})]})})]})})]})}}}]);
//# sourceMappingURL=735.8937d4ec.chunk.js.map