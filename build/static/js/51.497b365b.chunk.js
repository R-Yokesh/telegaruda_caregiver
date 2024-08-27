"use strict";(self.webpackChunktelegaruda_caregiver=self.webpackChunktelegaruda_caregiver||[]).push([[51],{89302:(e,a,t)=>{t.d(a,{A:()=>s});var l=t(65043);const s=()=>{const e="https://telegaruda-api.a2zhealth.in/v1/",a="feafbab7cb630d7110a81685b90c4b82",[t,s]=(0,l.useState)(!1),[i,n]=(0,l.useState)(null),r=(0,l.useRef)({}),o=(0,l.useCallback)((async(a,t)=>{if(s(!0),null!==r&&void 0!==r&&r.current[a]&&a.startsWith("resource/vitals")&&(s(!0),r.current={}),null!==r&&void 0!==r&&r.current[a])return s(!1),r.current[a];try{const l=await fetch(e+a,t);if(!l.ok)throw new Error("Failed to fetch ".concat(a,": ").concat(l.statusText));const i=await l.json();return r.current[a]=i,s(!1),i}catch(i){throw s(!1),n("Error: ".concat(i.message)),i}}),[e]),c=(0,l.useCallback)((async e=>{const t={method:"GET",headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("token")),"X-API-KEY":a}};return await o(e,t)}),[o,a]),d=(0,l.useCallback)((async(e,t)=>{const l={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(sessionStorage.getItem("token")),"X-API-KEY":a},body:JSON.stringify(t)};return await o(e,l)}),[o]),u=(0,l.useCallback)((async(e,t)=>{const l={method:"PATCH",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(sessionStorage.getItem("token")),"X-API-KEY":a},body:JSON.stringify(t)};return await o(e,l)}),[o]),m=(0,l.useCallback)((async t=>{const l={method:"DELETE",headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("token")),"X-API-KEY":a}};s(!0);try{const a=await fetch(e+t,l);if(!a.ok)throw new Error("Failed to fetch ".concat(t,": ").concat(a.statusText));const i=await a.json();return s(!1),i}catch(i){throw s(!1),n("Error: ".concat(i.message)),i}}),[a,e]);return{loading:t,error:i,get:c,post:d,patch:u,del:m,clearCache:(0,l.useCallback)((()=>{r.current={}}),[])}}},79505:(e,a,t)=>{t.d(a,{A:()=>o});var l=t(80861),s=t(96105),i=(t(65043),t(257)),n=t(73216),r=t(70579);const o=()=>{var e,a,t,o,c,d,u,m,v,h,p,g,x;const f=null===(e=(0,n.zy)().state)||void 0===e?void 0:e.PatientDetail;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(l.E,{className:"card-profile",children:(0,r.jsxs)(s.W,{className:"d-flex gap-4",children:[(0,r.jsx)("div",{className:"img-container",children:(0,r.jsx)("img",{src:i.s.patient1,alt:"profile-img"})}),(0,r.jsxs)("div",{className:"user-details",children:[(0,r.jsxs)("span",{className:"user-title",children:[null===f||void 0===f||null===(a=f.user)||void 0===a?void 0:a.first_name," ",null===f||void 0===f||null===(t=f.user)||void 0===t?void 0:t.last_name]}),(0,r.jsxs)("div",{className:"d-flex flex-wrap gap-2",children:[(0,r.jsx)("p",{className:"user-email",children:null!==(o=null===f||void 0===f||null===(c=f.user)||void 0===c?void 0:c.email)&&void 0!==o?o:"--"}),(0,r.jsx)("p",{className:"user-email",children:"|"}),(0,r.jsxs)("p",{className:"user-email",children:[null===f||void 0===f||null===(d=f.user)||void 0===d?void 0:d.isd_code," ",null!==(u=null===f||void 0===f||null===(m=f.user)||void 0===m?void 0:m.mobile)&&void 0!==u?u:"--"]})]}),(0,r.jsxs)("div",{className:"d-flex flex-wrap gap-2",children:[(0,r.jsxs)("p",{className:"user-email",children:["MRN: ",null!==(v=null===f||void 0===f||null===(h=f.additional_info)||void 0===h?void 0:h.mrn_number)&&void 0!==v?v:"--"]}),(0,r.jsx)("p",{className:"user-email",children:"|"}),(0,r.jsxs)("p",{className:"user-email",children:[null!==(p=null===f||void 0===f||null===(g=f.additional_info)||void 0===g?void 0:g.age)&&void 0!==p?p:"--"," yrs (","Male"===(null===f||void 0===f||null===(x=f.user)||void 0===x?void 0:x.gender)?" M ":" F ",")"]})]})]})]})})})}},17406:(e,a,t)=>{t.d(a,{A:()=>o});var l=t(80861),s=t(96105),i=t(65043),n=t(257),r=t(70579);const o=e=>{let{getCurrentTab:a}=e;const t=[{id:1,title:"Call",image:n.s.Call},{id:2,title:"Medical Profile",image:n.s.Notes},{id:3,title:"Camera Control",image:n.s.Camera},{id:4,title:"Pair",image:n.s.Qr}],[o,c]=(0,i.useState)((()=>{const e=localStorage.getItem("patiendDetailTab"),a=localStorage.getItem("PatientMenu"),l=()=>null===t||void 0===t?void 0:t.find((e=>(null===e||void 0===e?void 0:e.id)===Number(a)));return console.log(l()),e?JSON.parse(e):a?l():null}));return(0,r.jsx)(l.E,{className:"card-tabs",children:(0,r.jsx)(s.W,{className:"tabs-container",children:t.map(((e,t)=>(0,r.jsxs)("div",{className:"tab-items ".concat((null===e||void 0===e?void 0:e.id)===(null===o||void 0===o?void 0:o.id)?"tab-active":""),onClick:()=>(e=>{localStorage.removeItem("PatientSubMenu-1"),localStorage.removeItem("PatientSubMenu-2"),localStorage.removeItem("PatientSubMenu-3"),localStorage.removeItem("PatientSubMenu-4"),localStorage.removeItem("PatientSubMenu-5"),localStorage.removeItem("PatientMenu"),localStorage.removeItem("PatientConsultTab"),localStorage.setItem("patiendDetailTab",JSON.stringify(e)),c(e),a(null===e||void 0===e?void 0:e.id),(null===e||void 0===e?void 0:e.id)===(null===o||void 0===o?void 0:o.id)&&(a(null),c(null))})(e),children:[(0,r.jsx)("img",{src:null===e||void 0===e?void 0:e.image,alt:"call",className:"tab-icon"}),(0,r.jsx)("span",{className:"tab-title",children:null===e||void 0===e?void 0:e.title})]},t)))})})}},99558:(e,a,t)=>{t.d(a,{A:()=>n});t(65043);var l=t(257),s=t(20761),i=t(70579);const n=function(e){var a,t,n,r,o,c,d,u,m;let{DoctorDetail:v}=e;return(0,i.jsxs)("div",{className:"card-sec",children:[(0,i.jsxs)("div",{className:"row align-items-center",children:[(0,i.jsx)("div",{className:"profile col-4",children:(0,i.jsx)("img",{src:(null===v||void 0===v?void 0:v.profile)||l.s.NoImg,alt:"Patient-image"})}),(0,i.jsxs)("div",{className:"patient-details col-8 p-2",children:[(0,i.jsxs)("h5",{children:["Dr."," ",null!==v&&void 0!==v&&v.participants?null===v||void 0===v||null===(a=v.participants[1])||void 0===a||null===(t=a.participant_info)||void 0===t?void 0:t.name:"--"]}),(0,i.jsxs)("p",{className:"gap-sec d-flex flex-wrap",children:[(0,i.jsx)("small",{className:"fs-10 fw-500",children:null!==v&&void 0!==v&&v.participants?null===v||void 0===v||null===(n=v.participants[1])||void 0===n||null===(r=n.participant_info)||void 0===r?void 0:r.email:"--"}),(0,i.jsx)("small",{className:"fs-10 fw-500",children:"|"}),(0,i.jsx)("small",{className:"fs-10 fw-500",children:null!==v&&void 0!==v&&v.participants?null===v||void 0===v||null===(o=v.participants[1])||void 0===o||null===(c=o.participant_info)||void 0===c?void 0:c.phone:"--"})]}),(0,i.jsxs)("p",{className:"flex-sec-wrap gap-sec",children:[(0,i.jsx)("small",{className:"fs-10 fw-600",children:null!==v&&void 0!==v&&v.participants?null===v||void 0===v||null===(d=v.participants[1])||void 0===d||null===(u=d.participant_info)||void 0===u||null===(m=u.additional_info)||void 0===m?void 0:m.consult_speciality:"--"}),(0,i.jsx)("small",{className:"fs-10 fw-600",children:"|"}),(0,i.jsx)("small",{className:"fs-10 fw-600",children:null!==v&&void 0!==v&&v.scheduled_at?(0,s.r6)(null===v||void 0===v?void 0:v.scheduled_at):"--"})]})]})]}),(0,i.jsx)("img",{src:l.s.notes,className:"edit-icon",alt:"edit-icon"})]})}},64417:(e,a,t)=>{t.d(a,{A:()=>s});t(65043);var l=t(70579);const s=()=>(0,l.jsx)("div",{class:"loading",children:(0,l.jsxs)("svg",{height:"96px",width:"128px",viewBox:"0 0 64 48",children:[(0,l.jsx)("polyline",{id:"back",points:"0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"}),(0,l.jsx)("polyline",{id:"front",points:"0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"})]})})},70986:(e,a,t)=>{t.d(a,{A:()=>i});var l=t(65043),s=t(70579);const i=e=>{let{currentPage:a,totalItems:t,onPageChange:i,itemsPerPage:n}=e;const[r,o]=(0,l.useState)(1);(0,l.useEffect)((()=>{const e=Math.ceil(t/n);o(e)}),[t,n]);const c=e=>{e>=1&&e<=r&&i(e)},d=(()=>{const e=[];if(r<=5)for(let a=1;a<=r;a++)e.push(a);else if(a<=3){for(let a=1;a<=3;a++)e.push(a);e.push("..."),e.push(r)}else if(a>=r-2){e.push(1),e.push("...");for(let a=r-2;a<=r;a++)e.push(a)}else{e.push(1),e.push("...");for(let t=a-1;t<=a+1;t++)t>0&&t<=r&&e.push(t);e.push("..."),e.push(r)}return e.filter(((e,a,t)=>"..."!==e||a>0&&"..."!==t[a-1]))})();return(0,s.jsxs)("div",{className:"pagination-home",children:[(0,s.jsx)("div",{onClick:()=>c(a-1),disabled:1===a,"aria-label":"Previous",children:"<"}),d.map(((e,t)=>(0,s.jsx)("div",{onClick:()=>{"..."!==e&&c(e)},className:e===a?"active-home-page":"",disabled:"..."===e,"aria-current":e===a?"page":void 0,children:e},t))),(0,s.jsx)("div",{onClick:()=>c(a+1),disabled:a===r,"aria-label":"Next",children:">"})]})}},20761:(e,a,t)=>{function l(e){return new Date(e).toLocaleString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).replace(",","")}function s(e){const a=new Date(e),t=String(a.getDate()).padStart(2,"0"),l=String(a.getMonth()+1).padStart(2,"0"),s=a.getFullYear();return"".concat(t,"-").concat(l,"-").concat(s)}function i(){const e=new Date,a=e.getHours().toString().padStart(2,"0"),t=e.getMinutes().toString().padStart(2,"0");return"".concat(a,":").concat(t)}t.d(a,{Ln:()=>i,Yq:()=>s,r6:()=>l})},90051:(e,a,t)=>{t.r(a),t.d(a,{default:()=>S});var l=t(65043),s=(t(79505),t(17406),t(44101)),i=t(44227),n=t(257),r=t(99558),o=t(73216),c=t(35475),d=t(42878),u=t(11418),m=t(89689),v=t(16323),h=t(97397),p=t(85968),g=t(84709),x=t(31899),f=t.n(x),j=t(70579);const N=function(e){let{visible:a,setVisible:t,RegDoctors:n,getFilter:r}=e;const o=new Date,[c,x]=(0,l.useState)(null),[N,b]=(0,l.useState)(null),[y,D]=(0,l.useState)(""),[S,w]=(0,l.useState)({startDate:"",endDate:"",doctor:""}),C=()=>{if((()=>{let e=!0;const a={startDate:"",endDate:"",doctor:""};return c&&N&&c>N&&(a.startDate="Start date must be before end date.",a.endDate="End date must be after start date.",e=!1),!c&&N&&(a.startDate="Start date is required when end date is selected.",e=!1),c&&!N&&(a.endDate="End date is required when start date is selected.",e=!1),w(a),e})()){t(!1);const e={id:y||null,startDate:c?null===c||void 0===c?void 0:c.toLocaleDateString():null,endDate:N?null===N||void 0===N?void 0:N.toLocaleDateString():null};r(e)}};return(0,j.jsxs)(d.z,{visible:a,onClose:()=>t(!1),"aria-labelledby":"LiveDemoExampleLabel",className:"modal-cutomize",backdrop:"static",children:[(0,j.jsx)(u.E,{children:(0,j.jsx)(m.l,{id:"LiveDemoExampleLabel",children:"FILTER"})}),(0,j.jsxs)(v.T,{children:[(0,j.jsxs)(h.M,{"aria-label":"Default select example",onChange:e=>{const a=e.target.value;D(a),console.log("Selected doctor ID:",a),w((e=>({...e,doctor:""})))},value:y,children:[(0,j.jsx)("option",{value:"",children:"Filter with Doctor"})," ",null===n||void 0===n?void 0:n.map((e=>{var a,t,l,s;return(0,j.jsxs)("option",{value:null===e||void 0===e||null===(t=e.user)||void 0===t?void 0:t.id,children:[null===e||void 0===e||null===(l=e.user)||void 0===l?void 0:l.first_name," ",null===e||void 0===e||null===(s=e.user)||void 0===s?void 0:s.last_name]},null===e||void 0===e||null===(a=e.user)||void 0===a?void 0:a.id)}))]}),(0,j.jsxs)(s.s,{children:[(0,j.jsxs)(i.U,{lg:6,sm:12,children:[(0,j.jsx)("p",{className:"date-sec",children:"From Date"}),(0,j.jsx)(f(),{showIcon:!0,selected:c,onChange:e=>x(e),isClearable:!0,className:"date-range-picker picker-sec",dateFormat:"dd/MM/yyyy",maxDate:o}),S.startDate&&(0,j.jsx)("p",{className:"error-text",children:S.startDate})]}),(0,j.jsxs)(i.U,{lg:6,sm:12,children:[(0,j.jsx)("p",{className:"date-sec",children:"End Date"}),(0,j.jsx)(f(),{showIcon:!0,selected:N,onChange:e=>b(e),isClearable:!0,className:"date-range-picker picker-sec",dateFormat:"dd/MM/yyyy",maxDate:o}),S.endDate&&(0,j.jsx)("p",{className:"error-text",children:S.endDate})]})]})]}),(0,j.jsxs)(p.I,{children:[(0,j.jsx)(g.Q,{color:"secondary",onClick:()=>(x(),b(),D(""),void w({startDate:"",endDate:"",doctor:""})),className:"clear-filter-btn",children:"Clear Filter"}),(0,j.jsx)(g.Q,{color:"primary",className:"apply-filter-sec",onClick:()=>C(),children:"Apply Filter"})]})]})};var b=t(89302),y=t(70986),D=t(64417);const S=function(){var e;const[a,t]=(0,l.useState)(!1),d=(0,o.Zp)(),[u,m]=(0,l.useState)([]),[v,h]=(0,l.useState)([]),[p,g]=(0,l.useState)(0),[x,f]=(0,l.useState)({id:null,startDate:null,endDate:null}),{loading:S,error:w,get:C,post:k}=(0,b.A)(),[P,E]=(0,l.useState)(1),I=null===(e=(0,o.zy)().state)||void 0===e?void 0:e.PatientDetail,_=()=>{d("/patients/summary",{state:{PatientDetail:I}}),localStorage.removeItem("patiendDetailTab")};(0,l.useEffect)((()=>{(async()=>{try{const l=await C("resource/consults?limit=".concat(9,"&page=").concat(P).concat(null!==x.id?"&participant_ref_number=".concat(x.id):"").concat(null!==x.startDate?"&from_date=".concat(x.startDate):"").concat(null!==x.endDate?"&to_date=".concat(x.endDate):""));var e,a,t;console.log(l),200===l.code?(h(null===l||void 0===l||null===(e=l.data)||void 0===e?void 0:e.consults),g(null===l||void 0===l||null===(a=l.data)||void 0===a||null===(t=a.pagination)||void 0===t?void 0:t.total)):h([])}catch(l){console.error("Error fetching data:",l)}})()}),[P,x]);const T=(0,l.useCallback)((async()=>{try{const a=await C("resource/providers?order_by=id&dir=1");var e;if(console.log(a),200===a.code)m(null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.providers);else m([])}catch(a){console.error("Error fetching data:",a)}}),[C]);return(0,l.useEffect)((()=>{T()}),[T]),console.log("getFilter",x),(0,j.jsxs)("section",{className:"call-history-sec",children:[(0,j.jsxs)("div",{className:"flex-sec top-sec",children:[(0,j.jsxs)("div",{className:"bread-crumbs",children:[(0,j.jsxs)("p",{className:"mb-0",children:[(0,j.jsx)(c.N_,{to:"/patients",children:"Patient"})," /"," ",(0,j.jsx)(c.N_,{to:"/patients",className:"active",children:"Existing Patient"})]}),(0,j.jsx)("h4",{children:"Appointments - Call History"})]}),(0,j.jsx)("div",{className:"patient-adding",children:(0,j.jsxs)("button",{onClick:()=>t(!a),children:[(0,j.jsx)("img",{src:n.s.filter,alt:"filter-sec",className:"filter-icon"})," ","Filter"]})})]}),(0,j.jsx)("div",{className:"doctor-card-sec",children:(0,j.jsxs)("div",{className:"row",children:[S?(0,j.jsx)("div",{className:"d-flex w-100 justify-content-center mb-3 align-items-center",style:{height:"350px",maxHeight:"100%"},children:(0,j.jsx)(D.A,{})}):v.length<=0?(0,j.jsx)("div",{className:"d-flex w-100 justify-content-center mb-3 align-items-center",style:{height:"350px",maxHeight:"100%"},children:(0,j.jsx)("h5",{children:"No Data Found"})}):(0,j.jsx)(j.Fragment,{children:v.map(((e,a)=>(0,j.jsx)("div",{className:"col-4",onClick:()=>_(),children:(0,j.jsx)(c.N_,{className:"card-link",children:(0,j.jsx)(r.A,{DoctorDetail:e})})})))}),(0,j.jsx)(s.s,{className:"mb-3",children:(0,j.jsx)(i.U,{lg:12,className:"d-flex justify-content-center",children:(0,j.jsx)(y.A,{currentPage:P,onPageChange:e=>{E(e)},totalItems:p,itemsPerPage:9})})})]})}),(0,j.jsx)("div",{className:"modal-sec",children:(0,j.jsx)(N,{visible:a,setVisible:t,RegDoctors:u,getFilter:e=>{f(e)}})})]})}},84709:(e,a,t)=>{t.d(a,{Q:()=>d});var l=t(22378),s=t(65043),i=t(65173),n=t.n(i),r=t(25196),o=t(90777),c=t(75232),d=(0,s.forwardRef)((function(e,a){var t,i=e.children,n=e.as,c=void 0===n?"button":n,d=e.className,u=e.color,m=e.shape,v=e.size,h=e.type,p=void 0===h?"button":h,g=e.variant,x=(0,l.Tt)(e,["children","as","className","color","shape","size","type","variant"]);return s.createElement(o.K,(0,l.Cl)({as:x.href?"a":c},!x.href&&{type:p},{className:(0,r.A)("btn",g?"btn-".concat(g,"-").concat(u):"btn-".concat(u),(t={},t["btn-".concat(v)]=v,t),m,d)},x,{ref:a}),i)}));d.propTypes={as:n().elementType,children:n().node,className:n().string,color:c.TX,shape:n().string,size:n().oneOf(["sm","lg"]),type:n().oneOf(["button","submit","reset"]),variant:n().oneOf(["outline","ghost"])},d.displayName="CButton"},85968:(e,a,t)=>{t.d(a,{I:()=>o});var l=t(22378),s=t(65043),i=t(65173),n=t.n(i),r=t(25196),o=(0,s.forwardRef)((function(e,a){var t=e.children,i=e.className,n=(0,l.Tt)(e,["children","className"]);return s.createElement("div",(0,l.Cl)({className:(0,r.A)("modal-footer",i)},n,{ref:a}),t)}));o.propTypes={children:n().node,className:n().string},o.displayName="CModalFooter"},89689:(e,a,t)=>{t.d(a,{l:()=>o});var l=t(22378),s=t(65043),i=t(65173),n=t.n(i),r=t(25196),o=(0,s.forwardRef)((function(e,a){var t=e.children,i=e.as,n=void 0===i?"h5":i,o=e.className,c=(0,l.Tt)(e,["children","as","className"]);return s.createElement(n,(0,l.Cl)({className:(0,r.A)("modal-title",o)},c,{ref:a}),t)}));o.propTypes={as:n().elementType,children:n().node,className:n().string},o.displayName="CModalTitle"}}]);
//# sourceMappingURL=51.497b365b.chunk.js.map