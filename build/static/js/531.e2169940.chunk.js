"use strict";(self.webpackChunktelegaruda_caregiver=self.webpackChunktelegaruda_caregiver||[]).push([[531],{28644:(e,a,t)=>{t.d(a,{A:()=>n});var s=t(65043),r=t(70579);const n=e=>{let{currentPage:a,totalItems:t,onPageChange:n,itemsPerPage:l}=e;const[o,i]=(0,s.useState)(1);(0,s.useEffect)((()=>{const e=Math.ceil(t/l);i(e)}),[t,l]);const c=e=>{e>=1&&e<=o&&n(e)},d=(()=>{const e=[];if(o<=5)for(let a=1;a<=o;a++)e.push(a);else if(a<=3){for(let a=1;a<=3;a++)e.push(a);e.push("..."),e.push(o)}else if(a>=o-2){e.push(1),e.push("...");for(let a=o-2;a<=o;a++)e.push(a)}else{e.push(1),e.push("...");for(let t=a-1;t<=a+1;t++)t>0&&t<=o&&e.push(t);e.push("..."),e.push(o)}return e.filter(((e,a,t)=>"..."!==e||a>0&&"..."!==t[a-1]))})();return(0,r.jsxs)("div",{className:"pagination",children:[(0,r.jsx)("button",{onClick:()=>c(a-1),disabled:1===a,"aria-label":"Previous",children:"<"}),d.map(((e,t)=>(0,r.jsx)("button",{onClick:()=>{"..."!==e&&c(e)},className:e===a?"active-page":"",disabled:"..."===e,"aria-current":e===a?"page":void 0,children:e},t))),(0,r.jsx)("button",{onClick:()=>c(a+1),disabled:a===o,"aria-label":"Next",children:">"})]})}},20761:(e,a,t)=>{t.d(a,{kk:()=>o,r6:()=>l});var s=t(55639),r=t(64),n=t(64790);function l(e){return new Date(e).toLocaleString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).replace(",","")}function o(e){if(!e)return"Invalid date-time";const a=(0,s.qg)(e,"yyyy-MM-dd HH:mm",new Date);return(0,r.f)(a)?(0,n.GP)(a,"dd-MM-yyyy HH:mm"):"Invalid date-time"}},84709:(e,a,t)=>{t.d(a,{Q:()=>d});var s=t(22378),r=t(65043),n=t(65173),l=t.n(n),o=t(25196),i=t(90777),c=t(75232),d=(0,r.forwardRef)((function(e,a){var t,n=e.children,l=e.as,c=void 0===l?"button":l,d=e.className,u=e.color,m=e.shape,p=e.size,h=e.type,f=void 0===h?"button":h,b=e.variant,v=(0,s.Tt)(e,["children","as","className","color","shape","size","type","variant"]);return r.createElement(i.K,(0,s.Cl)({as:v.href?"a":c},!v.href&&{type:f},{className:(0,o.A)("btn",b?"btn-".concat(b,"-").concat(u):"btn-".concat(u),(t={},t["btn-".concat(p)]=p,t),m,d)},v,{ref:a}),n)}));d.propTypes={as:l().elementType,children:l().node,className:l().string,color:c.TX,shape:l().string,size:l().oneOf(["sm","lg"]),type:l().oneOf(["button","submit","reset"]),variant:l().oneOf(["outline","ghost"])},d.displayName="CButton"},85968:(e,a,t)=>{t.d(a,{I:()=>i});var s=t(22378),r=t(65043),n=t(65173),l=t.n(n),o=t(25196),i=(0,r.forwardRef)((function(e,a){var t=e.children,n=e.className,l=(0,s.Tt)(e,["children","className"]);return r.createElement("div",(0,s.Cl)({className:(0,o.A)("modal-footer",n)},l,{ref:a}),t)}));i.propTypes={children:l().node,className:l().string},i.displayName="CModalFooter"},11418:(e,a,t)=>{t.d(a,{E:()=>d});var s=t(22378),r=t(65043),n=t(65173),l=t.n(n),o=t(25196),i=(0,r.forwardRef)((function(e,a){var t=e.className,n=e.dark,l=e.disabled,i=e.white,c=(0,s.Tt)(e,["className","dark","disabled","white"]);return r.createElement("button",(0,s.Cl)({type:"button",className:(0,o.A)("btn","btn-close",{"btn-close-white":i},l,t),"aria-label":"Close",disabled:l},n&&{"data-coreui-theme":"dark"},c,{ref:a}))}));i.propTypes={className:l().string,dark:l().bool,disabled:l().bool,white:l().bool},i.displayName="CCloseButton";var c=t(42878),d=(0,r.forwardRef)((function(e,a){var t=e.children,n=e.className,l=e.closeButton,d=void 0===l||l,u=(0,s.Tt)(e,["children","className","closeButton"]),m=(0,r.useContext)(c.m).setVisible;return r.createElement("div",(0,s.Cl)({className:(0,o.A)("modal-header",n)},u,{ref:a}),t,d&&r.createElement(i,{onClick:function(){return m(!1)}}))}));d.propTypes={children:l().node,className:l().string,closeButton:l().bool},d.displayName="CModalHeader"},89689:(e,a,t)=>{t.d(a,{l:()=>i});var s=t(22378),r=t(65043),n=t(65173),l=t.n(n),o=t(25196),i=(0,r.forwardRef)((function(e,a){var t=e.children,n=e.as,l=void 0===n?"h5":n,i=e.className,c=(0,s.Tt)(e,["children","as","className"]);return r.createElement(l,(0,s.Cl)({className:(0,o.A)("modal-title",i)},c,{ref:a}),t)}));i.propTypes={as:l().elementType,children:l().node,className:l().string},i.displayName="CModalTitle"}}]);
//# sourceMappingURL=531.e2169940.chunk.js.map