"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[9191],{95430:(e,t,n)=>{n.d(t,{A:()=>r});var a=n(61941);const r={fetchPortalFreeFieldsPages:function(e,t,n){var r="".concat(URL_API,"/api/portal-free-fields-pages/grid");return a.A.get(r,{params:{filters:JSON.stringify(e),sorts:JSON.stringify(t),limit:n.limit,offset:n.offset}})},fetchPortalFreeFieldsPageDetails:function(e){var t="".concat(URL_API,"/api/portal-free-fields-page/").concat(e);return a.A.get(t).then((function(e){return e.data.data}))},peekFreeFieldsContacts:function(e){var t="".concat(URL_API,"/api/portal-free-fields-page/free-fields-contacts/").concat(e,"/peek-contacts");return a.A.get(t)},deletePortalFreeFieldsPage:function(e){var t="".concat(URL_API,"/api/portal-free-fields-page/").concat(e,"/delete");return a.A.post(t)},newPortalFreeFieldsPage:function(e){var t="".concat(URL_API,"/api/portal-free-fields-page");return a.A.post(t,e).then((function(e){return e.data})).catch((function(e){console.log(e)}))},updatePortalFreeFieldsPage:function(e){return a.A.post("".concat(URL_API,"/api/portal-free-fields-page/").concat(e.id,"/update"),e)},createPortalFreeFieldsField:function(e){var t="".concat(URL_API,"/api/portal-free-fields-page-field");return a.A.post(t,e)},updatePortalFreeFieldsField:function(e,t){var n="".concat(URL_API,"/api/portal-free-fields-page-field/").concat(e);return a.A.post(n,t)},deletePortalFreeFieldsField:function(e){var t="".concat(URL_API,"/api/portal-free-fields-page-field/").concat(e,"/delete");return a.A.post(t)}}},9152:(e,t,n)=>{n.d(t,{A:()=>u});var a=n(96540),r=n(5556),l=n.n(r),i=n(87722),o=n(71866),c=n(34527),s=void 0,d=function(e){var t=e.RowClassName,n=e.setSorts,r=e.sortColumn,l=e.title,d=e.width;return a.createElement("th",{className:t,width:d},l,a.createElement(i.Ay,{className:"pull-right small",size:14,icon:c.m,role:"button",onClick:n.bind(s,r,"ASC")}),a.createElement(i.Ay,{className:"pull-right small",size:14,icon:o.b,role:"button",onClick:n.bind(s,r,"DESC")}))};d.defaultProps={RowClassName:""},d.propTypes={setSorts:l().func.isRequired,sortColumn:l().string.isRequired,title:l().string.isRequired,width:l().string.isRequired,RowClassName:l().string};const u=d},43790:(e,t,n)=>{n.d(t,{A:()=>l});var a=n(96540),r=n(63750);const l=function(e){var t=e.deletePortalFreeFieldsPage,n=e.closeDeleteItemModal,l=e.description,i=e.id;return a.createElement(r.A,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:n,confirmAction:function(){return t(i),void n()},title:"Verwijderen"},"Verwijder vrije velden portaal pagina: ",a.createElement("strong",null,l),"?")}},89191:(e,t,n)=>{n.r(t),n.d(t,{default:()=>D});var a=n(60436),r=n(64467),l=n(5544),i=n(96540),o=n(62493),c=n(55849),s=n(58168),d=n(69733),u=n(24179),m=n(87722),f=n(88505),p=n(87696);const g=(0,d.Ng)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var t=e.id,n=e.name,a=e.isActive,r=e.showDeleteItemModal,o=e.permissions,c=(0,i.useState)(!1),s=(0,l.A)(c,2),d=s[0],g=s[1],v=(0,i.useState)(""),h=(0,l.A)(v,2),E=h[0],A=h[1];function P(e){u.RL.push("/vrije-velden-portaal-pagina/".concat(e))}return i.createElement("tr",{className:"".concat(E),onMouseEnter:function(){return g(!0),void A("highlight-row")},onMouseLeave:function(){return g(!1),void A("")},onDoubleClick:function(){return P(t)}},i.createElement("td",null,n),i.createElement("td",null,Boolean(a)?"Ja":"Nee"),i.createElement("td",null,d&&o.manageFreeFields&&o.managePortalSettings?i.createElement("a",{role:"button",onClick:function(){return P(t)}},i.createElement(m.Ay,{className:"mybtn-success",size:14,icon:f.w})):"",d&&o.manageFreeFields?i.createElement("a",{role:"button",onClick:function(){return r(t,n)}},i.createElement(m.Ay,{className:"mybtn-danger",size:14,icon:p.d})):""))}));var v=n(74850),h=n(42285),E=n(45403),A=n(93913),P=n(26829),F=n(9152);const w=function(e){return i.createElement("tr",{className:"thead-title"},i.createElement(F.A,{sortColumn:"name",title:"Naam",width:"70%",setSorts:e.handleChangeSort}),i.createElement(P.A,{title:"Actief",width:"25%"}),i.createElement("th",{width:"5%"}))};var b=n(95430);const N=function(e){var t=e.filter,n=e.handleChangeFilter;return i.createElement(i.Fragment,null,i.createElement("tr",{className:"thead-filter"},i.createElement("th",null,i.createElement("input",{type:"text",className:"form-control input-sm",value:t.name,onChange:function(e){return n("name",e.target.value)}})),i.createElement("th",null,i.createElement("select",{className:"form-control input-sm",value:t.isActive,onChange:function(e){return n("isActive",e.target.value)}},i.createElement("option",null),i.createElement("option",{key:1,value:1},"Ja"),i.createElement("option",{key:0,value:0},"Nee"))),i.createElement("th",null)))};var C=n(43790);const y=function(e){var t=e.portalFreeFieldsPages,n=e.portalFreeFieldsTotal,a=e.recordsPerPage,r=e.isLoading,o=e.filter,c=e.handlePageClick,d=e.handleChangeSort,u=e.handleChangeFilter,m=e.handleKeyUp,f=e.deletePortalFreeFieldsPage,p=(0,i.useState)(!1),P=(0,l.A)(p,2),F=P[0],b=P[1],y=(0,i.useState)({id:"",description:""}),S=(0,l.A)(y,2),k=S[0],j=S[1];function q(e,t){b(!0),j({id:e,description:t})}return i.createElement("div",null,i.createElement("form",{onKeyUp:m,className:"margin-10-top"},i.createElement(h.A,null,i.createElement(E.A,null,i.createElement(w,{handleChangeSort:d}),i.createElement(N,{filter:o,handleChangeFilter:u})),i.createElement(A.A,null,r?i.createElement("tr",null,i.createElement("td",{colSpan:3},"Bezig met gegevens laden")):t.length>0?t.map((function(e){return i.createElement(g,(0,s.A)({key:e.id},e,{showDeleteItemModal:q}))})):i.createElement("tr",null,i.createElement("td",{colSpan:3},"Geen resultaten!")))),i.createElement("div",{className:"col-md-6 col-md-offset-3"},i.createElement(v.A,{onPageChangeAction:c,totalRecords:n,initialPage:0,recordsPerPage:a}))),F&&i.createElement(C.A,(0,s.A)({closeDeleteItemModal:function(){b(!1),j({id:"",description:""})}},k,{deletePortalFreeFieldsPage:f})))};var S=n(91858);const k=(0,d.Ng)((function(e){return{permissions:e.meDetails.permissions}}),null)((function(e){var t=e.portalFreeFieldsPagesTotal,n=e.refreshPortalFreeFieldsPageFields,a=e.permissions;return i.createElement("div",{className:"row"},i.createElement("div",{className:"col-md-4"},i.createElement("div",{className:"btn-group btn-group-flex",role:"group"},i.createElement(S.A,{iconName:"refresh",onClickAction:n}),a.manageFreeFields&&i.createElement(S.A,{iconName:"plus",onClickAction:function(){u.RL.push("/vrije-velden-portaal-pagina/nieuw")}}))),i.createElement("div",{className:"col-md-4"},i.createElement("h3",{className:"text-center table-title"},"Vrije velden portaal pagina's")),i.createElement("div",{className:"col-md-4"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-sm-12"},i.createElement("div",{className:"pull-right"},"Resultaten: ",t)))))}));var j=n(25562),q=n(72505),R=n.n(q);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function L(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){(0,r.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}const D=function(){var e=(0,i.useState)([]),t=(0,l.A)(e,2),n=t[0],s=t[1],d=(0,i.useState)(!0),u=(0,l.A)(d,2),m=u[0],f=u[1],p=(0,i.useState)({total:0}),g=(0,l.A)(p,2),v=g[0],h=g[1],E=(0,i.useState)([]),A=(0,l.A)(E,2),P=A[0],F=A[1],w=(0,i.useState)([{field:"name",order:"ASC"}]),N=(0,l.A)(w,2),C=N[0],S=N[1],q=(0,i.useState)({offset:0,limit:50}),O=(0,l.A)(q,2),D=O[0],I=O[1],U=(0,j.A)("Enter");function M(){var e;R().all([b.A.fetchPortalFreeFieldsPages((e=[],P.name&&e.push({field:"name",data:P.name}),P.isActive&&e.push({field:"isActive",data:P.isActive}),e),C,D)]).then(R().spread((function(e){s(e.data.data),h(e.data.meta),f(!1)}))).catch((function(e){f(!1),alert("Er is iets misgegaan met ophalen van de gegevens.")}))}function _(){s([]),I(L(L({},D),{},{page:0,offset:0}))}return(0,i.useEffect)((function(){M()}),[D.offset,C,P.name,P.isActive]),(0,i.useEffect)((function(){U&&M()}),[U]),i.createElement(o.A,null,i.createElement(c.A,null,i.createElement("div",{className:"col-md-12 margin-10-top"},i.createElement(k,{portalFreeFieldsPagesTotal:v.total,refreshPortalFreeFieldsPages:M})),i.createElement("div",{className:"col-md-12 margin-10-top"},i.createElement(y,{portalFreeFieldsPages:n,portalFreeFieldsTotal:v.total,recordsPerPage:50,isLoading:m,filter:P,handlePageClick:function(e){var t=Math.ceil(50*e.selected);I(L(L({},D),{},{offset:t}))},handleChangeSort:function(e,t){var n=C;3===n.length&&n.pop();var r={field:"".concat(e),order:"".concat(t)};S([r].concat((0,a.A)(n)))},handleChangeFilter:function(e,t){F(L(L({},P),{},(0,r.A)({},e,t))),_()},handleKeyUp:function(e){13===e.keyCode&&_()},deletePortalFreeFieldsPage:function(e){b.A.deletePortalFreeFieldsPage(e).then((function(e){M()})).catch((function(e){alert("Er is iets misgegaan bij verwijderen. Probeer het opnieuw.")}))}}))))}},25562:(e,t,n)=>{n.d(t,{A:()=>l});var a=n(5544),r=n(96540);const l=function(e){var t=(0,r.useState)(!1),n=(0,a.A)(t,2),l=n[0],i=n[1];function o(t){t.key===e&&i(!0)}function c(t){t.key===e&&i(!1)}return(0,r.useEffect)((function(){return window.addEventListener("keydown",o),window.addEventListener("keyup",c),function(){window.removeEventListener("keydown",o),window.removeEventListener("keyup",c)}}),[]),l}},34527:(e,t)=>{t.m=void 0,t.m={viewBox:"0 0 1664 1792",children:[{name:"path",attribs:{d:"M1611 832q0 53-37 90l-651 652q-39 37-91 37-53 0-90-37l-651-652q-38-36-38-90 0-53 38-91l74-75q39-37 91-37 53 0 90 37l294 294v-704q0-52 38-90t90-38h128q52 0 90 38t38 90v704l294-294q37-37 90-37 52 0 91 37l75 75q37 39 37 91z"}}]}},71866:(e,t)=>{t.b=void 0,t.b={viewBox:"0 0 1664 1792",children:[{name:"path",attribs:{d:"M1611 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"}}]}}}]);