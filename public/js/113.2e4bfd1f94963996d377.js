(window.webpackJsonp=window.webpackJsonp||[]).push([[113],{1604:function(e,a,t){"use strict";t.r(a);var n=t(545),r=t.n(n),l=t(5),o=t.n(l),i=t(0),s=t.n(i),c=t(28),m=t(31),u=t(4),b=t(51),d=t(39),v=t(20),g=t(37),p=t(9),E=t(2),_=t.n(E),h=function(){return p.a.get("cooperation")},k=function(e){return p.a.post("cooperation",e)},f=function(e,a){var t="cooperation/".concat(e);return p.a.post(t,a)},N=function(e){var a="cooperation/".concat(e,"/sync-all-with-laposta");return p.a.post(a)};var w=function(e){var a=e.closeModal,t=e.formData,n=Object(i.useState)("Synchronisatie laposta gestart"),l=r()(n,2),o=l[0],c=l[1],m=Object(i.useState)([]),u=r()(m,2),b=u[0],d=u[1];return Object(i.useEffect)((function(){N(t.id).then((function(e){c("Synchronisatie is succesvol uitgevoerd"),setTimeout(a,2e3)})).catch((function(e){if(e.response&&422===e.response.status){if(e.response.data&&e.response.data.errors)e.response.data.errors.econobis&&e.response.data.errors.econobis.length&&(c("De volgende fouten gevonden tijdens synchronisatie:"),d(e.response.data.errors.econobis));else if(e.response.data&&e.response.data.message){c("Er is iets misgegaan bij het synchroniseren met Laposta ("+e.response.status+").");for(var a=[],t=0,n=Object.entries(JSON.parse(e.response.data.message));t<n.length;t++){var l=r()(n[t],2),o=(l[0],l[1]);a.push("".concat(o))}d(a)}}else c("Er is iets misgegaan bij het synchroniseren met Laposta ("+(e.response&&e.response.status)+").")}))}),[]),s.a.createElement(g.a,{buttonClassName:"btn-danger",closeModal:a,buttonCancelText:"Sluiten",showConfirmAction:!1,title:"Synchroniseren met Laposta"},s.a.createElement("p",null,o),b.length?s.a.createElement("ul",null,b.map((function(e){return s.a.createElement("li",null,e)}))):null)};var A=Object(v.b)((function(e){return{permissions:e.meDetails.permissions,isLoading:e.loadingData.isLoading}}),null)((function(e){var a=e.permissions,t=e.isLoading,n=e.formData,l=Object(i.useState)(!1),o=r()(l,2),v=o[0],g=o[1];function p(){g(!v)}return s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-sm-12"},s.a.createElement(c.a,null,s.a.createElement(m.a,{className:"panel-small"},s.a.createElement("div",{className:"col-md-4"},s.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},s.a.createElement(b.a,{iconName:"glyphicon-arrow-left",onClickAction:u.e.goBack}),a.manageMarketing&&1==n.useLaposta?s.a.createElement(d.a,{onClickAction:p,buttonText:"Synchroniseren LaPosta"}):null)),!t&&s.a.createElement("div",{className:"col-md-4"},s.a.createElement("h4",{className:"text-center"},"Coöperatie instellingen")),s.a.createElement("div",{className:"col-md-4"})))),v&&s.a.createElement(w,{closeModal:p,formData:n}))})),y=t(22),C=t(54),O=t(36),j=t(1155),L=t(76),S=t(285),x=t(58),D=t(1156),B=t(975),I=D.a().shape({name:D.b().required("Verplicht"),iban:D.b().trim().nullable().test("iban","Ongeldige IBAN !",(function(e){return!e||B.isValidIBAN(e)})),kvkNumber:D.b().nullable().trim().test("number","Alleen nummers",(function(e){return!e||Number.isInteger(+e)})),email:D.b().email("Ongeldige e-mail"),website:D.b().url("Ongeldige url"),hoomLink:D.b().url("Ongeldige url")}),T=t(549).default;var P=function(e){var a=e.addAttachment,t=e.toggleShowUploadLogo,n=Object(i.useState)(!1),l=r()(n,2),o=l[0],c=l[1];return s.a.createElement(g.a,{closeModal:t,showConfirmAction:!1,title:"Upload bestand"},s.a.createElement("div",{className:"upload-file-content"},s.a.createElement(T,{accept:"image/jpeg, image/png, image/jpg",multiple:!1,className:"dropzone",onDropAccepted:function(e){a(e[0]),setTimeout((function(){t()}),500)},onDropRejected:function(){c(!0)},maxSize:6291456},s.a.createElement("p",null,"Klik hier voor het uploaden van een bestand"),s.a.createElement("p",null,s.a.createElement("strong",null,"of")," sleep het bestand hierheen"))),o&&s.a.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn."))},H=t(89),K=t(287);var M=Object(v.b)(null,(function(e){return{fetchSystemData:function(){e(Object(K.a)())}}}))((function(e){var a=e.formData,t=e.toggleEdit,n=e.updateResult,l=e.fetchSystemData,o=Object(i.useState)([]),u=r()(o,2),b=u[0],v=u[1],g=Object(i.useState)([]),p=r()(g,2),E=p[0],h=p[1],N=Object(i.useState)(!0),w=r()(N,2),A=w[0],y=w[1],D=Object(i.useState)(!1),B=r()(D,2),T=B[0],K=B[1],M=Object(i.useState)(null),G=r()(M,2),z=G[0],J=G[1],R=Object(j.a)({initialValues:a,validationSchema:I,onSubmit:function(e){!function(e){for(var a=0,o=["hoomGroup","hoomEmailTemplate","createdAt","createdBy","createdById","updatedAt","updatedById","updatedBy"];a<o.length;a++){delete e[o[a]]}for(var i=new FormData,s=0,c=Object.entries(e);s<c.length;s++){var m=r()(c[s],2),u=m[0],b=m[1];i.append(u,b)}z&&i.append("attachment",z);var d=null;d=null===e.id?k(i):f(e.id,i);d.then((function(e){n(e.data.data),t(),l()})).catch((function(e){alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))}(e)}}),F=R.values,U=R.errors,V=R.touched,q=R.handleChange,W=R.handleSubmit,Q=R.setFieldValue,X=R.handleBlur;function Y(){K(!T)}return Object(i.useEffect)((function(){_.a.all([L.a.fetchEmailTemplatesPeek(),x.a.peekStaticContactGroups()]).then(_.a.spread((function(e,a){v(e),h(a),y(!1)})))}),[]),s.a.createElement("section",{className:"panel-hover"},s.a.createElement(c.a,null,s.a.createElement(m.a,null,s.a.createElement("div",{className:"row"},s.a.createElement(O.a,{label:"Naam",name:"name",value:F.name,onChangeAction:q,onBlurAction:X,required:"required",error:U.name&&V.name,errorMessage:U.name}),s.a.createElement(O.a,{label:"KvK",name:"kvkNumber",value:F.kvkNumber,onChangeAction:q,error:U.kvkNumber&&V.kvkNumber,errorMessage:U.kvkNumber})),s.a.createElement("div",{className:"row"},s.a.createElement(O.a,{label:"Adres",name:"address",value:F.address,onChangeAction:q}),s.a.createElement(O.a,{label:"Btw nummer",name:"btwNumber",value:F.btwNumber,onChangeAction:q})),s.a.createElement("div",{className:"row"},s.a.createElement(O.a,{label:"Postcode",name:"postalCode",value:F.postalCode,onChangeAction:q}),s.a.createElement(O.a,{label:"IBAN",name:"iban",value:F.iban,onChangeAction:q,onBlurAction:X,error:U.iban&&V.iban,errorMessage:U.iban})),s.a.createElement("div",{className:"row"},s.a.createElement(O.a,{label:"Plaats",name:"city",value:F.city,onChangeAction:q}),s.a.createElement(O.a,{label:"IBAN t.n.v.",name:"ibanAttn",value:F.ibanAttn,onChangeAction:q})),s.a.createElement("div",{className:"row"},s.a.createElement(O.a,{label:"Email",name:"email",value:F.email,onChangeAction:q,onBlurAction:X,error:U.email&&V.email,errorMessage:U.email}),s.a.createElement(O.a,{label:"Website",name:"website",value:F.website,onChangeAction:q,onBlurAction:X,error:U.website&&V.website,errorMessage:U.website})),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"form-group col-sm-6"},s.a.createElement("label",{className:"col-sm-6"},"Kies logo"),s.a.createElement("div",{className:"col-sm-6"},s.a.createElement("input",{type:"text",className:"form-control input-sm col-sm-6",value:z?z.name:F.logoName,onClick:Y,onChange:function(){}}))),T?s.a.createElement(P,{addAttachment:J,toggleShowUploadLogo:Y}):null)),s.a.createElement(C.a,null,s.a.createElement("span",{className:"h5 text-bold"},"Hoom gegevens")),s.a.createElement(m.a,null,s.a.createElement("div",{className:"row"},s.a.createElement(O.a,{label:"Hoom link",name:"hoomLink",value:F.hoomLink,onChangeAction:q,onBlurAction:X,error:U.hoomLink&&V.hoomLink,errorMessage:U.hoomLink}),s.a.createElement(O.a,{label:"Hoom key",name:"hoomKey",value:F.hoomKey,onChangeAction:q})),s.a.createElement("div",{className:"row"},s.a.createElement(S.a,{label:"Hoom e-mail template",name:"hoomEmailTemplateId",options:b,value:F.hoomEmailTemplateId,onChangeAction:function(e,a){return Q(a,e)},isLoading:A}),s.a.createElement(S.a,{label:"Hoom groep",name:"hoomGroupId",options:E,value:F.hoomGroupId,onChangeAction:function(e,a){return Q(a,e)},isLoading:A})),s.a.createElement("div",{className:"row"},s.a.createElement(H.a,{label:"Stuur e-mail bij nieuw Hoomdossier",name:"sendEmail",value:!!F.sendEmail,onChangeAction:function(e){e.persist(),Q(e.target.name,e.target.checked)}}))),s.a.createElement(C.a,null,s.a.createElement("span",{className:"h5 text-bold"},"Laposta gegevens")),s.a.createElement(m.a,null,s.a.createElement("div",{className:"row"},s.a.createElement(H.a,{label:"Gebruik Laposta",name:"useLaposta",value:F.useLaposta,onChangeAction:function(e){return Q("useLaposta",e.target.checked)}}),s.a.createElement(O.a,{label:"Laposta key",name:"lapostaKey",value:F.lapostaKey,onChangeAction:q}))),s.a.createElement(C.a,null,s.a.createElement("span",{className:"h5 text-bold"},"Overig")),s.a.createElement(m.a,null,s.a.createElement("div",{className:"row"},s.a.createElement(H.a,{label:"Gebruik export energieverbruik tarieven en verbruik",name:"useExportAddressConsumption",value:F.useExportAddressConsumption,onChangeAction:function(e){return Q("useExportAddressConsumption",e.target.checked)},size:"col-sm-5",textToolTip:"Met deze knop krijg je de optie om op de Contacten pagina een download te maken van energie verbruik en tarief voorstellen.<br/>\nDeze tarieven kunnen voorals nog alleen via de API worden ingeschoten met waardes:<br/>\n{verbruik_gas_begindatum}<br/>\n{verbruik_gas_einddatum}<br/>\n{verbruik_gas_verbruik_m3}<br/>\n{verbruik_gas_voorgesteld_tarief_vast}<br/>\n{verbruik_gas_voorgesteld_tarief_variabel}<br/>\n{verbruik_gas_variabele_kosten}<br/>\n{verbruik_gas_vaste_kosten}<br/>\n<br/>\n{verbruik_electriciteit_begindatum}<br/>\n{verbruik_electriciteit_einddatum}<br/>\n{verbruik_electriciteit_verbruik_hoog}<br/>\n{verbruik_electriciteit_verbruik_laag}<br/>\n{verbruik_electriciteit_terug_hoog}<br/>\n{verbruik_electriciteit_terug_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_hoog<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_hoog}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_laag}<br/>\n{verbruik_electriciteit_variabele_kosten_hoog}<br/>\n{verbruik_electriciteit_variabele_kosten_laag}<br/>\n{verbruik_electriciteit_vaste_kosten_hoog}<br/>\n{verbruik_electriciteit_vaste_kosten_laag}"}))),s.a.createElement(m.a,null,s.a.createElement("div",{className:"pull-right btn-group",role:"group"},s.a.createElement(d.a,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:t}),s.a.createElement(d.a,{loading:!1,loadText:"laden",buttonText:"Opslaan",onClickAction:W,type:"submit",value:"Submit"})))))}));var G=function(e){var a=e.formData,t=e.toggleEdit;return s.a.createElement("section",{className:"panel-hover",onClick:t},s.a.createElement(c.a,null,s.a.createElement(m.a,null,s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Naam",value:a.name}),s.a.createElement(y.a,{label:"KvK",value:a.kvkNumber})),s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Adres",value:a.address}),s.a.createElement(y.a,{label:"Btw nummer",value:a.btwNumber})),s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Postcode",value:a.postalCode}),s.a.createElement(y.a,{label:"IBAN",value:a.iban})),s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Plaats",value:a.city}),s.a.createElement(y.a,{label:"IBAN t.n.v.",value:a.ibanAttn})),s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Email",value:a.email}),s.a.createElement(y.a,{label:"Website",value:a.website})),s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Logo",value:a.logoName}))),s.a.createElement(C.a,null,s.a.createElement("span",{className:"h5 text-bold"},"Hoom gegevens")),s.a.createElement(m.a,null,s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Hoom link",value:a.hoomLink}),s.a.createElement(y.a,{label:"Hoom key",value:a.hoomKey})),s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Hoom e-mail template",value:a.hoomEmailTemplate&&a.hoomEmailTemplate.name}),s.a.createElement(y.a,{label:"Hoom groep",value:a.hoomGroup&&a.hoomGroup.name})),s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Stuurt e-mail bij nieuw Hoomdossier",value:a.sendEmail?"Ja":"Nee"}))),s.a.createElement(C.a,null,s.a.createElement("span",{className:"h5 text-bold"},"Laposta gegevens")),s.a.createElement(m.a,null,s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Gebruik Laposta",value:a.useLaposta?"Ja":"Nee"}),s.a.createElement(y.a,{label:"Laposta key",value:a.lapostaKey}))),s.a.createElement(C.a,null,s.a.createElement("span",{className:"h5 text-bold"},"Overig")),s.a.createElement(m.a,null,s.a.createElement("div",{className:"row"},s.a.createElement(y.a,{label:"Gebruik export energieverbruik tarieven en verbruik",value:a.useExportAddressConsumption?"Ja":"Nee",size:"col-sm-5",name:"useExportAddressConsumption",textToolTip:"Met deze knop krijg je de optie om op de Contacten pagina een download te maken van energie verbruik en tarief voorstellen.<br/>\nDeze tarieven kunnen voorals nog alleen via de API worden ingeschoten met waardes:<br/>\n{verbruik_gas_begindatum}<br/>\n{verbruik_gas_einddatum}<br/>\n{verbruik_gas_verbruik_m3}<br/>\n{verbruik_gas_voorgesteld_tarief_vast}<br/>\n{verbruik_gas_voorgesteld_tarief_variabel}<br/>\n{verbruik_gas_variabele_kosten}<br/>\n{verbruik_gas_vaste_kosten}<br/>\n<br/>\n{verbruik_electriciteit_begindatum}<br/>\n{verbruik_electriciteit_einddatum}<br/>\n{verbruik_electriciteit_verbruik_hoog}<br/>\n{verbruik_electriciteit_verbruik_laag}<br/>\n{verbruik_electriciteit_terug_hoog}<br/>\n{verbruik_electriciteit_terug_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_hoog<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_hoog}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_laag}<br/>\n{verbruik_electriciteit_variabele_kosten_hoog}<br/>\n{verbruik_electriciteit_variabele_kosten_laag}<br/>\n{verbruik_electriciteit_vaste_kosten_hoog}<br/>\n{verbruik_electriciteit_vaste_kosten_laag}"})))))};function z(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function J(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?z(Object(t),!0).forEach((function(a){o()(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):z(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}var R={result:{id:null,name:"",address:"",postalCode:"",city:"",kvkNumber:"",btwNumber:"",iban:"",ibanAttn:"",email:"",website:"",logoFilename:"",logoName:"",hoomLink:"",hoomKey:"",hoomEmailTemplateId:"",hoomGroupId:"",useLaposta:!1,lapostaKey:"",useExportAddressConsumption:!1},isLoading:!0,showEdit:!1},F=function(e,a){switch(a.type){case"updateIsLoading":return J(J({},e),{},{isLoading:a.payload});case"updateResult":return J(J({},e),{},{result:a.payload});case"updateShowEdit":return J(J({},e),{},{showEdit:a.payload});default:return R}};a.default=Object(v.b)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var a=e.permissions,t=Object(i.useReducer)(F,R),n=r()(t,2),l=n[0],o=n[1];function u(e){o({type:"updateIsLoading",payload:e})}function b(e){o({type:"updateResult",payload:e})}function d(){o({type:"updateShowEdit",payload:!l.showEdit})}return Object(i.useEffect)((function(){u(!0),h().then((function(e){e.data&&e.data.data&&e.data.data.id&&b(e.data.data),u(!1)})).catch((function(e){alert("Er is iets misgegaan met het laden van de gegevens. Herlaad de pagina."),u(!1)}))}),[l.filter]),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-9"},l.isLoading?"Laden...":s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"col-md-12 margin-10-top"},s.a.createElement(c.a,null,s.a.createElement(m.a,{className:"panel-small"},s.a.createElement(A,{formData:l.result})))),s.a.createElement("div",{className:"col-md-12 margin-10-top"},s.a.createElement(s.a.Fragment,null,l.showEdit&&a.manageCooperationSettings?s.a.createElement(M,{formData:l.result,toggleEdit:d,updateResult:b}):s.a.createElement(G,{formData:l.result,toggleEdit:d}))))),s.a.createElement("div",{className:"col-md-3"}))}))}}]);