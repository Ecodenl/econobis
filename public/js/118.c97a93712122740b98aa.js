(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{1609:function(e,a,t){"use strict";t.r(a);var n=t(547),r=t.n(n),l=t(5),o=t.n(l),i=t(0),c=t.n(i),s=t(27),m=t(30),u=t(4),d=t(50),b=t(38),v=t(19),g=t(35),p=t(2),E=function(){return p.a.get("cooperation")},h=function(e){return p.a.post("cooperation",e)},_=function(e,a){var t="cooperation/".concat(e);return p.a.post(t,a)},k=function(e){var a="cooperation/".concat(e,"/sync-all-with-laposta");return p.a.post(a)};var f=function(e){var a=e.closeModal,t=e.formData,n=Object(i.useState)("Synchronisatie laposta gestart"),l=r()(n,2),o=l[0],s=l[1],m=Object(i.useState)([]),u=r()(m,2),d=u[0],b=u[1];return Object(i.useEffect)((function(){k(t.id).then((function(e){s("Synchronisatie is succesvol uitgevoerd"),setTimeout(a,2e3)})).catch((function(e){if(e.response&&422===e.response.status){if(e.response.data&&e.response.data.errors)e.response.data.errors.econobis&&e.response.data.errors.econobis.length&&(s("De volgende fouten gevonden tijdens synchronisatie:"),b(e.response.data.errors.econobis));else if(e.response.data&&e.response.data.message){s("Er is iets misgegaan bij het synchroniseren met Laposta ("+e.response.status+").");for(var a=[],t=0,n=Object.entries(JSON.parse(e.response.data.message));t<n.length;t++){var l=r()(n[t],2),o=(l[0],l[1]);a.push("".concat(o))}b(a)}}else s("Er is iets misgegaan bij het synchroniseren met Laposta ("+(e.response&&e.response.status)+").")}))}),[]),c.a.createElement(g.a,{buttonClassName:"btn-danger",closeModal:a,buttonCancelText:"Sluiten",showConfirmAction:!1,title:"Synchroniseren met Laposta"},c.a.createElement("p",null,o),d.length?c.a.createElement("ul",null,d.map((function(e){return c.a.createElement("li",null,e)}))):null)};var w=Object(v.b)((function(e){return{permissions:e.meDetails.permissions,isLoading:e.loadingData.isLoading}}),null)((function(e){var a=e.permissions,t=e.isLoading,n=e.formData,l=Object(i.useState)(!1),o=r()(l,2),v=o[0],g=o[1];function p(){g(!v)}return c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12"},c.a.createElement(s.a,null,c.a.createElement(m.a,{className:"panel-small"},c.a.createElement("div",{className:"col-md-4"},c.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},c.a.createElement(d.a,{iconName:"glyphicon-arrow-left",onClickAction:u.e.goBack}),a.manageMarketing&&1==n.useLaposta?c.a.createElement(b.a,{onClickAction:p,buttonText:"Synchroniseren LaPosta"}):null)),!t&&c.a.createElement("div",{className:"col-md-4"},c.a.createElement("h4",{className:"text-center"},"Coöperatie instellingen")),c.a.createElement("div",{className:"col-md-4"})))),v&&c.a.createElement(f,{closeModal:p,formData:n}))})),N=t(21),A=t(53),y=t(36),C=t(1165),j=t(54),O=t.n(j),S=t(76),L=t(286),T=t(58),x=t(1166),I=t(979),D=x.a().shape({name:x.b().required("Verplicht"),iban:x.b().trim().nullable().test("iban","Ongeldige IBAN !",(function(e){return!e||I.isValidIBAN(e)})),kvkNumber:x.b().nullable().trim().test("number","Alleen nummers",(function(e){return!e||Number.isInteger(+e)})),email:x.b().email("Ongeldige e-mail"),website:x.b().url("Ongeldige url"),hoomLink:x.b().url("Ongeldige url")}),P=t(551).default;var B=function(e){var a=e.addAttachment,t=e.toggleShowUploadLogo,n=Object(i.useState)(!1),l=r()(n,2),o=l[0],s=l[1];return c.a.createElement(g.a,{closeModal:t,showConfirmAction:!1,title:"Upload bestand"},c.a.createElement("div",{className:"upload-file-content"},c.a.createElement(P,{accept:"image/jpeg, image/png, image/jpg",multiple:!1,className:"dropzone",onDropAccepted:function(e){a(e[0]),setTimeout((function(){t()}),500)},onDropRejected:function(){s(!0)},maxSize:6291456},c.a.createElement("p",null,"Klik hier voor het uploaden van een bestand"),c.a.createElement("p",null,c.a.createElement("strong",null,"of")," sleep het bestand hierheen"))),o&&c.a.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn."))},M=t(89),H=t(288);var K=Object(v.b)(null,(function(e){return{fetchSystemData:function(){e(Object(H.a)())}}}))((function(e){var a=e.formData,t=e.toggleEdit,n=e.updateResult,l=e.fetchSystemData,o=Object(i.useState)([]),u=r()(o,2),d=u[0],v=u[1],p=Object(i.useState)([]),E=r()(p,2),k=E[0],f=E[1],w=Object(i.useState)(!0),N=r()(w,2),j=N[0],x=N[1],I=Object(i.useState)(!1),P=r()(I,2),H=P[0],K=P[1],z=Object(i.useState)(null),G=r()(z,2),R=G[0],F=G[1],J=Object(i.useState)(!1),q=r()(J,2),V=q[0],U=q[1],W=Object(C.a)({initialValues:a,validationSchema:D,onSubmit:function(e){!function(e){for(var a=0,o=["hoomGroup","hoomEmailTemplate","createdAt","createdBy","createdById","updatedAt","updatedById","updatedBy"];a<o.length;a++){delete e[o[a]]}for(var i=new FormData,c=0,s=Object.entries(e);c<s.length;c++){var m=r()(s[c],2),u=m[0],d=m[1];i.append(u,d)}R&&i.append("attachment",R);var b=null;b=null===e.id?h(i):_(e.id,i);b.then((function(e){n(e.data.data),t(),l()})).catch((function(e){alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))}(e)}}),Q=W.values,X=W.errors,Y=W.touched,Z=W.handleChange,$=W.handleSubmit,ee=W.setFieldValue,ae=W.handleBlur;function te(){K(!H)}return Object(i.useEffect)((function(){O.a.all([S.a.fetchEmailTemplatesPeek(),T.a.peekStaticContactGroups()]).then(O.a.spread((function(e,a){v(e),f(a),x(!1)})))}),[]),c.a.createElement("div",null,c.a.createElement("section",{className:"panel-hover"},c.a.createElement(s.a,null,c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(y.a,{label:"Naam",name:"name",value:Q.name,onChangeAction:Z,onBlurAction:ae,required:"required",error:X.name&&Y.name,errorMessage:X.name}),c.a.createElement(y.a,{label:"KvK",name:"kvkNumber",value:Q.kvkNumber,onChangeAction:Z,error:X.kvkNumber&&Y.kvkNumber,errorMessage:X.kvkNumber})),c.a.createElement("div",{className:"row"},c.a.createElement(y.a,{label:"Adres",name:"address",value:Q.address,onChangeAction:Z}),c.a.createElement(y.a,{label:"Btw nummer",name:"btwNumber",value:Q.btwNumber,onChangeAction:Z})),c.a.createElement("div",{className:"row"},c.a.createElement(y.a,{label:"Postcode",name:"postalCode",value:Q.postalCode,onChangeAction:Z}),c.a.createElement(y.a,{label:"IBAN",name:"iban",value:Q.iban,onChangeAction:Z,onBlurAction:ae,error:X.iban&&Y.iban,errorMessage:X.iban})),c.a.createElement("div",{className:"row"},c.a.createElement(y.a,{label:"Plaats",name:"city",value:Q.city,onChangeAction:Z}),c.a.createElement(y.a,{label:"IBAN t.n.v.",name:"ibanAttn",value:Q.ibanAttn,onChangeAction:Z})),c.a.createElement("div",{className:"row"},c.a.createElement(y.a,{label:"Email",name:"email",value:Q.email,onChangeAction:Z,onBlurAction:ae,error:X.email&&Y.email,errorMessage:X.email}),c.a.createElement(y.a,{label:"Website",name:"website",value:Q.website,onChangeAction:Z,onBlurAction:ae,error:X.website&&Y.website,errorMessage:X.website})),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"form-group col-sm-6"},c.a.createElement("label",{className:"col-sm-6"},"Kies logo"),c.a.createElement("div",{className:"col-sm-6"},c.a.createElement("input",{type:"text",className:"form-control input-sm col-sm-6",value:R?R.name:Q.logoName,onClick:te,onChange:function(){}}))),H?c.a.createElement(B,{addAttachment:F,toggleShowUploadLogo:te}):null)),c.a.createElement(A.a,null,c.a.createElement("span",{className:"h5 text-bold"},"Hoom gegevens")),c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(y.a,{label:"Hoom link",name:"hoomLink",value:Q.hoomLink,onChangeAction:Z,onBlurAction:ae,error:X.hoomLink&&Y.hoomLink,errorMessage:X.hoomLink}),c.a.createElement(y.a,{label:"Hoom key",name:"hoomKey",value:Q.hoomKey,onChangeAction:Z})),c.a.createElement("div",{className:"row"},c.a.createElement(L.a,{label:"Hoom e-mail template",name:"hoomEmailTemplateId",options:d,value:Q.hoomEmailTemplateId,onChangeAction:function(e,a){return ee(a,e)},isLoading:j}),c.a.createElement(L.a,{label:"Hoom groep",name:"hoomGroupId",options:k,value:Q.hoomGroupId,onChangeAction:function(e,a){return ee(a,e)},isLoading:j})),c.a.createElement("div",{className:"row"},c.a.createElement(M.a,{label:"Stuur e-mail bij nieuw Hoomdossier",name:"sendEmail",value:!!Q.sendEmail,onChangeAction:function(e){e.persist(),ee(e.target.name,e.target.checked)}}))),c.a.createElement(A.a,null,c.a.createElement("span",{className:"h5 text-bold"},"Laposta gegevens")),c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(M.a,{label:"Gebruik Laposta",name:"useLaposta",value:Q.useLaposta,onChangeAction:function(e){return ee("useLaposta",e.target.checked)}}),c.a.createElement(y.a,{label:"Laposta key",name:"lapostaKey",value:Q.lapostaKey,onChangeAction:Z}))),c.a.createElement(A.a,null,c.a.createElement("span",{className:"h5 text-bold"},"Twee factor authenticatie")),c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(M.a,{label:"Verplichten voor alle gebruikers",name:"requireTwoFactorAuthentication",value:Q.requireTwoFactorAuthentication,onChangeAction:function(e){ee("requireTwoFactorAuthentication",e.target.checked),e.target.checked&&U(!0)},size:"col-sm-5",textToolTip:"Je kan voor individuele gebruikers 2 factor authenticatie afdwingen via instellingen > gebruikers"}))),c.a.createElement(A.a,null,c.a.createElement("span",{className:"h5 text-bold"},"Overig")),c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(M.a,{label:"Gebruik export energieverbruik tarieven en verbruik",name:"useExportAddressConsumption",value:Q.useExportAddressConsumption,onChangeAction:function(e){return ee("useExportAddressConsumption",e.target.checked)},size:"col-sm-5",textToolTip:"Met deze knop krijg je de optie om op de Contacten pagina een download te maken van energie verbruik en tarief voorstellen.<br/>\nDeze tarieven kunnen voorals nog alleen via de API worden ingeschoten met waardes:<br/>\n{verbruik_gas_begindatum}<br/>\n{verbruik_gas_einddatum}<br/>\n{verbruik_gas_verbruik_m3}<br/>\n{verbruik_gas_voorgesteld_tarief_vast}<br/>\n{verbruik_gas_voorgesteld_tarief_variabel}<br/>\n{verbruik_gas_variabele_kosten}<br/>\n{verbruik_gas_vaste_kosten}<br/>\n<br/>\n{verbruik_electriciteit_begindatum}<br/>\n{verbruik_electriciteit_einddatum}<br/>\n{verbruik_electriciteit_verbruik_hoog}<br/>\n{verbruik_electriciteit_verbruik_laag}<br/>\n{verbruik_electriciteit_terug_hoog}<br/>\n{verbruik_electriciteit_terug_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_hoog<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_hoog}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_laag}<br/>\n{verbruik_electriciteit_variabele_kosten_hoog}<br/>\n{verbruik_electriciteit_variabele_kosten_laag}<br/>\n{verbruik_electriciteit_vaste_kosten_hoog}<br/>\n{verbruik_electriciteit_vaste_kosten_laag}"})),c.a.createElement("div",{className:"row"},c.a.createElement(L.a,{label:"Schouwen gepland e-mail template",name:"inspectionPlannedEmailTemplateId",options:d,value:Q.inspectionPlannedEmailTemplateId,onChangeAction:function(e,a){return ee(a,e)},isLoading:j}),c.a.createElement(L.a,{label:"Schouwen opname e-mail template",name:"inspectionRecordedEmailTemplateId",options:d,value:Q.inspectionRecordedEmailTemplateId,onChangeAction:function(e,a){return ee(a,e)},isLoading:j}))),c.a.createElement(m.a,null,c.a.createElement("div",{className:"pull-right btn-group",role:"group"},c.a.createElement(b.a,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:t}),c.a.createElement(b.a,{loading:!1,loadText:"laden",buttonText:"Opslaan",onClickAction:$,type:"submit",value:"Submit"}))))),V&&c.a.createElement(g.a,{showConfirmAction:!1,buttonCancelText:"Sluiten",closeModal:function(){return U(!1)},title:"Waarschuwing"},"Bij het activeren van twee factor authenticatie voor de gehele coöperatie worden alle gebruikers per direct verplicht om twee factor authenticatie in te stellen.",c.a.createElement("br",null),c.a.createElement("br",null),"Dit geldt ook voor gebruikers die op dit moment in het programma actief zijn."))}));var z=function(e){var a=e.formData,t=e.toggleEdit;return c.a.createElement("section",{className:"panel-hover",onClick:t},c.a.createElement(s.a,null,c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Naam",value:a.name}),c.a.createElement(N.a,{label:"KvK",value:a.kvkNumber})),c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Adres",value:a.address}),c.a.createElement(N.a,{label:"Btw nummer",value:a.btwNumber})),c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Postcode",value:a.postalCode}),c.a.createElement(N.a,{label:"IBAN",value:a.iban})),c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Plaats",value:a.city}),c.a.createElement(N.a,{label:"IBAN t.n.v.",value:a.ibanAttn})),c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Email",value:a.email}),c.a.createElement(N.a,{label:"Website",value:a.website})),c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Logo",value:a.logoName}))),c.a.createElement(A.a,null,c.a.createElement("span",{className:"h5 text-bold"},"Hoom gegevens")),c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Hoom link",value:a.hoomLink}),c.a.createElement(N.a,{label:"Hoom key",value:a.hoomKey})),c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Hoom e-mail template",value:a.hoomEmailTemplate&&a.hoomEmailTemplate.name}),c.a.createElement(N.a,{label:"Hoom groep",value:a.hoomGroup&&a.hoomGroup.name})),c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Stuurt e-mail bij nieuw Hoomdossier",value:a.sendEmail?"Ja":"Nee"}))),c.a.createElement(A.a,null,c.a.createElement("span",{className:"h5 text-bold"},"Laposta gegevens")),c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Gebruik Laposta",value:a.useLaposta?"Ja":"Nee"}),c.a.createElement(N.a,{label:"Laposta key",value:a.lapostaKey}))),c.a.createElement(A.a,null,c.a.createElement("span",{className:"h5 text-bold"},"Twee factor authenticatie")),c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Verplichten voor alle gebruikers",value:a.requireTwoFactorAuthentication?"Ja":"Nee",size:"col-sm-5",textToolTip:"Je kan voor individuele gebruikers 2 factor authenticatie afdwingen via instellingen > gebruikers"}))),c.a.createElement(A.a,null,c.a.createElement("span",{className:"h5 text-bold"},"Overig")),c.a.createElement(m.a,null,c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Gebruik export energieverbruik tarieven en verbruik",value:a.useExportAddressConsumption?"Ja":"Nee",size:"col-sm-5",name:"useExportAddressConsumption",textToolTip:"Met deze knop krijg je de optie om op de Contacten pagina een download te maken van energie verbruik en tarief voorstellen.<br/>\nDeze tarieven kunnen voorals nog alleen via de API worden ingeschoten met waardes:<br/>\n{verbruik_gas_begindatum}<br/>\n{verbruik_gas_einddatum}<br/>\n{verbruik_gas_verbruik_m3}<br/>\n{verbruik_gas_voorgesteld_tarief_vast}<br/>\n{verbruik_gas_voorgesteld_tarief_variabel}<br/>\n{verbruik_gas_variabele_kosten}<br/>\n{verbruik_gas_vaste_kosten}<br/>\n<br/>\n{verbruik_electriciteit_begindatum}<br/>\n{verbruik_electriciteit_einddatum}<br/>\n{verbruik_electriciteit_verbruik_hoog}<br/>\n{verbruik_electriciteit_verbruik_laag}<br/>\n{verbruik_electriciteit_terug_hoog}<br/>\n{verbruik_electriciteit_terug_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_hoog<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_hoog}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_laag}<br/>\n{verbruik_electriciteit_variabele_kosten_hoog}<br/>\n{verbruik_electriciteit_variabele_kosten_laag}<br/>\n{verbruik_electriciteit_vaste_kosten_hoog}<br/>\n{verbruik_electriciteit_vaste_kosten_laag}"})),c.a.createElement("div",{className:"row"},c.a.createElement(N.a,{label:"Schouwen gepland e-mail template",value:a.inspectionPlannedEmailTemplate&&a.inspectionPlannedEmailTemplate.name}),c.a.createElement(N.a,{label:"Schouwen opname e-mail template",value:a.inspectionRecordedEmailTemplate&&a.inspectionRecordedEmailTemplate.name})))))},G=t(301);function R(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function F(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?R(Object(t),!0).forEach((function(a){o()(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):R(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}var J={result:{id:null,name:"",address:"",postalCode:"",city:"",kvkNumber:"",btwNumber:"",iban:"",ibanAttn:"",email:"",website:"",logoFilename:"",logoName:"",hoomLink:"",hoomKey:"",hoomEmailTemplateId:"",hoomGroupId:"",useLaposta:!1,lapostaKey:"",useExportAddressConsumption:!1,requireTwoFactorAuthentication:!1,inspectionPlannedEmailTemplateId:"",inspectionRecordedEmailTemplateId:""},isLoading:!0,showEdit:!1},q=function(e,a){switch(a.type){case"updateIsLoading":return F(F({},e),{},{isLoading:a.payload});case"updateResult":return F(F({},e),{},{result:a.payload});case"updateShowEdit":return F(F({},e),{},{showEdit:a.payload});default:return J}};a.default=Object(v.b)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var a=e.permissions,t=Object(i.useReducer)(q,J),n=r()(t,2),l=n[0],o=n[1];function u(e){o({type:"updateIsLoading",payload:e})}function d(e){o({type:"updateResult",payload:e})}function b(){o({type:"updateShowEdit",payload:!l.showEdit})}return Object(i.useEffect)((function(){a.manageCooperationSettings&&(u(!0),E().then((function(e){e.data&&e.data.data&&e.data.data.id&&d(e.data.data),u(!1)})).catch((function(e){alert("Er is iets misgegaan met het laden van de gegevens. Herlaad de pagina."),u(!1)})))}),[l.filter]),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-md-9"},a.manageCooperationSettings?l.isLoading?"Laden...":c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"col-md-12 margin-10-top"},c.a.createElement(s.a,null,c.a.createElement(m.a,{className:"panel-small"},c.a.createElement(w,{formData:l.result})))),c.a.createElement("div",{className:"col-md-12 margin-10-top"},c.a.createElement(c.a.Fragment,null,l.showEdit&&a.manageCooperationSettings?c.a.createElement(K,{formData:l.result,toggleEdit:b,updateResult:d}):c.a.createElement(z,{formData:l.result,toggleEdit:b})))):c.a.createElement(G.a,null)),c.a.createElement("div",{className:"col-md-3"}))}))}}]);