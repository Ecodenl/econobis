"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[1284],{81284:(e,t,a)=>{a.r(t),a.d(t,{default:()=>F});var n=a(29439),r=a(4942),l=a(67294),o=a(14309),i=a(98688),s=a(61409),c=a(55451),m=a(49332),u=a(37974),d=a(41355),b=a(69265);const p=function(){return b.Z.get("cooperation")},v=function(e){return b.Z.post("cooperation",e)},g=function(e,t){var a="cooperation/".concat(e);return b.Z.post(a,t)},E=function(e){var t="cooperation/".concat(e,"/sync-all-with-laposta");return b.Z.post(t)},h=function(e){var t=e.closeModal,a=e.formData,r=(0,l.useState)("Synchronisatie laposta gestart"),o=(0,n.Z)(r,2),i=o[0],s=o[1],c=(0,l.useState)([]),m=(0,n.Z)(c,2),u=m[0],b=m[1];return(0,l.useEffect)((function(){E(a.id).then((function(e){s("Synchronisatie is succesvol uitgevoerd"),setTimeout(t,2e3)})).catch((function(e){if(e.response&&422===e.response.status){if(e.response.data&&e.response.data.errors)e.response.data.errors.econobis&&e.response.data.errors.econobis.length&&(s("De volgende fouten gevonden tijdens synchronisatie:"),b(e.response.data.errors.econobis));else if(e.response.data&&e.response.data.message){s("Er is iets misgegaan bij het synchroniseren met Laposta ("+e.response.status+").");for(var t=[],a=0,r=Object.entries(JSON.parse(e.response.data.message));a<r.length;a++){var l=(0,n.Z)(r[a],2),o=(l[0],l[1]);t.push("".concat(o))}b(t)}}else s("Er is iets misgegaan bij het synchroniseren met Laposta ("+(e.response&&e.response.status)+").")}))}),[]),l.createElement(d.Z,{buttonClassName:"btn-danger",closeModal:t,buttonCancelText:"Sluiten",showConfirmAction:!1,title:"Synchroniseren met Laposta"},l.createElement("p",null,i),u.length?l.createElement("ul",null,u.map((function(e){return l.createElement("li",null,e)}))):null)},k=(0,u.$j)((function(e){return{permissions:e.meDetails.permissions,isLoading:e.loadingData.isLoading}}),null)((function(e){var t=e.permissions,a=e.isLoading,r=e.formData,u=(0,l.useState)(!1),d=(0,n.Z)(u,2),b=d[0],p=d[1];function v(){p(!b)}return l.createElement("div",{className:"row"},l.createElement("div",{className:"col-sm-12"},l.createElement(o.Z,null,l.createElement(i.Z,{className:"panel-small"},l.createElement("div",{className:"col-md-4"},l.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},l.createElement(c.Z,{iconName:"arrowLeft",onClickAction:s.mW.goBack}),t.manageMarketing&&1==r.useLaposta?l.createElement(m.Z,{onClickAction:v,buttonText:"Synchroniseren LaPosta"}):null)),!a&&l.createElement("div",{className:"col-md-4"},l.createElement("h4",{className:"text-center"},"Coöperatie instellingen")),l.createElement("div",{className:"col-md-4"})))),b&&l.createElement(h,{closeModal:v,formData:r}))}));var _=a(80720),f=a(9181),Z=a(62265),N=a(9669),w=a.n(N),A=a(19789),C=a(82084),y=a(60813),T=a(19501),L=a(59687),x=T.Ry().shape({name:T.Z_().required("Verplicht"),iban:T.Z_().trim().nullable().test("iban","Ongeldige IBAN !",(function(e){return!e||L.isValidIBAN(e)})),kvkNumber:T.Z_().nullable().trim().test("number","Alleen nummers",(function(e){return!e||Number.isInteger(+e)})),email:T.Z_().email("Ongeldige e-mail"),website:T.Z_().url("Ongeldige url"),hoomLink:T.Z_().url("Ongeldige url")}),S=a(88601).Z;const I=function(e){var t=e.addAttachment,a=e.toggleShowUploadLogo,r=(0,l.useState)(!1),o=(0,n.Z)(r,2),i=o[0],s=o[1];return l.createElement(d.Z,{closeModal:a,showConfirmAction:!1,title:"Upload bestand"},l.createElement("div",{className:"upload-file-content"},l.createElement(S,{accept:"image/jpeg, image/png, image/jpg",multiple:!1,className:"dropzone",onDropAccepted:function(e){t(e[0]),setTimeout((function(){a()}),500)},onDropRejected:function(){s(!0)},maxSize:6291456},l.createElement("p",null,"Klik hier voor het uploaden van een bestand"),l.createElement("p",null,l.createElement("strong",null,"of")," sleep het bestand hierheen"))),i&&l.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn."))};var j=a(21606),B=a(25725),P=a(90329);const O=(0,u.$j)(null,(function(e){return{fetchSystemData:function(){e((0,B.P)())}}}))((function(e){var t=e.formData,a=e.toggleEdit,r=e.updateResult,s=e.fetchSystemData,c=(0,l.useState)([]),u=(0,n.Z)(c,2),b=u[0],p=u[1],E=(0,l.useState)([]),h=(0,n.Z)(E,2),k=h[0],N=h[1],T=(0,l.useState)([]),L=(0,n.Z)(T,2),S=L[0],B=L[1],O=(0,l.useState)(!0),D=(0,n.Z)(O,2),M=D[0],R=D[1],H=(0,l.useState)(!1),K=(0,n.Z)(H,2),z=K[0],G=K[1],F=(0,l.useState)(null),q=(0,n.Z)(F,2),J=q[0],V=q[1],U=(0,l.useState)(!1),W=(0,n.Z)(U,2),$=W[0],Q=W[1],X=(0,Z.TA)({initialValues:t,validationSchema:x,onSubmit:function(e){!function(e){for(var t=0,l=["hoomGroup","hoomEmailTemplate","createdAt","createdBy","createdById","updatedAt","updatedById","updatedBy"];t<l.length;t++)delete e[l[t]];for(var o=new FormData,i=0,c=Object.entries(e);i<c.length;i++){var m=(0,n.Z)(c[i],2),u=m[0],d=m[1];o.append(u,d)}J&&o.append("attachment",J);(null===e.id?v(o):g(e.id,o)).then((function(e){r(e.data.data),a(),s()})).catch((function(e){alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))}(e)}}),Y=X.values,ee=X.errors,te=X.touched,ae=X.handleChange,ne=X.handleSubmit,re=X.setFieldValue,le=X.handleBlur;function oe(){G(!z)}return(0,l.useEffect)((function(){w().all([A.Z.fetchEmailTemplatesPeek(),P.Z.fetchMailboxesLoggedInUserPeek(),y.Z.peekStaticContactGroups()]).then(w().spread((function(e,t,a){B(t.data.data),p(e),N(a),R(!1)})))}),[]),l.createElement("div",null,l.createElement("section",{className:"panel-hover"},l.createElement(o.Z,null,l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(f.Z,{label:"Naam",name:"name",value:Y.name,onChangeAction:ae,onBlurAction:le,required:"required",error:ee.name&&te.name,errorMessage:ee.name}),l.createElement(f.Z,{label:"KvK",name:"kvkNumber",value:Y.kvkNumber,onChangeAction:ae,error:ee.kvkNumber&&te.kvkNumber,errorMessage:ee.kvkNumber})),l.createElement("div",{className:"row"},l.createElement(f.Z,{label:"Adres",name:"address",value:Y.address,onChangeAction:ae}),l.createElement(f.Z,{label:"Btw nummer",name:"btwNumber",value:Y.btwNumber,onChangeAction:ae})),l.createElement("div",{className:"row"},l.createElement(f.Z,{label:"Postcode",name:"postalCode",value:Y.postalCode,onChangeAction:ae}),l.createElement(f.Z,{label:"IBAN",name:"iban",value:Y.iban,onChangeAction:ae,onBlurAction:le,error:ee.iban&&te.iban,errorMessage:ee.iban})),l.createElement("div",{className:"row"},l.createElement(f.Z,{label:"Plaats",name:"city",value:Y.city,onChangeAction:ae}),l.createElement(f.Z,{label:"IBAN t.n.v.",name:"ibanAttn",value:Y.ibanAttn,onChangeAction:ae})),l.createElement("div",{className:"row"},l.createElement(f.Z,{label:"Email",name:"email",value:Y.email,onChangeAction:ae,onBlurAction:le,error:ee.email&&te.email,errorMessage:ee.email}),l.createElement(f.Z,{label:"Website",name:"website",value:Y.website,onChangeAction:ae,onBlurAction:le,error:ee.website&&te.website,errorMessage:ee.website})),l.createElement("div",{className:"row"},l.createElement("div",{className:"form-group col-sm-6"},l.createElement("label",{className:"col-sm-6"},"Kies logo"),l.createElement("div",{className:"col-sm-6"},l.createElement("input",{type:"text",className:"form-control input-sm col-sm-6",value:J?J.name:Y.logoName,onClick:oe,onChange:function(){}}))),z?l.createElement(I,{addAttachment:V,toggleShowUploadLogo:oe}):null)),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Hoom gegevens")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(f.Z,{label:"Hoom link",name:"hoomLink",value:Y.hoomLink,onChangeAction:ae,onBlurAction:le,error:ee.hoomLink&&te.hoomLink,errorMessage:ee.hoomLink}),l.createElement(f.Z,{label:"Hoom key",name:"hoomKey",value:Y.hoomKey,onChangeAction:ae})),l.createElement("div",{className:"row"},l.createElement(C.Z,{label:"Hoom e-mail template",name:"hoomEmailTemplateId",options:b,value:Y.hoomEmailTemplateId,onChangeAction:function(e,t){return re(t,e)},isLoading:M,clearable:!0}),l.createElement(C.Z,{label:"Hoom groep",name:"hoomGroupId",options:k,value:Y.hoomGroupId,onChangeAction:function(e,t){return re(t,e)},isLoading:M,clearable:!0})),l.createElement("div",{className:"row"},l.createElement(j.Z,{label:"Stuur e-mail bij nieuw Hoomdossier",name:"sendEmail",value:!!Y.sendEmail,onChangeAction:function(e){e.persist(),re(e.target.name,e.target.checked)}}))),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Laposta gegevens")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(j.Z,{label:"Gebruik Laposta",name:"useLaposta",value:Y.useLaposta,onChangeAction:function(e){return re("useLaposta",e.target.checked)}}),l.createElement(f.Z,{label:"Laposta key",name:"lapostaKey",value:Y.lapostaKey,onChangeAction:ae}))),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Twee factor authenticatie")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(j.Z,{label:"Verplichten voor alle gebruikers",name:"requireTwoFactorAuthentication",value:Y.requireTwoFactorAuthentication,onChangeAction:function(e){re("requireTwoFactorAuthentication",e.target.checked),e.target.checked&&Q(!0)},size:"col-sm-5",textToolTip:"Je kan voor individuele gebruikers 2 factor authenticatie afdwingen via instellingen > gebruikers"}))),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Buurtaanpak")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(C.Z,{label:"Buurtaanpak afspraak e-mail template",name:"inspectionPlannedEmailTemplateId",options:b,value:Y.inspectionPlannedEmailTemplateId,onChangeAction:function(e,t){return re(t,e)},isLoading:M,clearable:!0}),l.createElement(C.Z,{label:"Mailbox afspraak/opname/uitgebracht bevestigingen",name:"inspectionPlannedMailboxId",options:S,optionName:"email",value:Y.inspectionPlannedMailboxId,onChangeAction:function(e,t){return re(t,e)},isLoading:M,clearable:!0})),l.createElement("div",{className:"row"},l.createElement(C.Z,{label:"Buurtaanpak opname e-mail template",name:"inspectionRecordedEmailTemplateId",options:b,value:Y.inspectionRecordedEmailTemplateId,onChangeAction:function(e,t){return re(t,e)},isLoading:M,clearable:!0})),l.createElement("div",{className:"row"},l.createElement(C.Z,{label:"Buurtaanpak uitgebracht e-mail template",name:"inspectionReleasedEmailTemplateId",options:b,value:Y.inspectionReleasedEmailTemplateId,onChangeAction:function(e,t){return re(t,e)},isLoading:M,clearable:!0}))),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Overig")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(j.Z,{label:"Gebruik export energieverbruik tarieven en verbruik",name:"useExportAddressConsumption",value:Y.useExportAddressConsumption,onChangeAction:function(e){return re("useExportAddressConsumption",e.target.checked)},size:"col-sm-5",textToolTip:"Met deze knop krijg je de optie om op de Contacten pagina een download te maken van energie verbruik en tarief voorstellen.<br/>\nDeze tarieven kunnen voorals nog alleen via de API worden ingeschoten met waardes:<br/>\n{verbruik_gas_begindatum}<br/>\n{verbruik_gas_einddatum}<br/>\n{verbruik_gas_verbruik_m3}<br/>\n{verbruik_gas_voorgesteld_tarief_vast}<br/>\n{verbruik_gas_voorgesteld_tarief_variabel}<br/>\n{verbruik_gas_variabele_kosten}<br/>\n{verbruik_gas_vaste_kosten}<br/>\n<br/>\n{verbruik_electriciteit_begindatum}<br/>\n{verbruik_electriciteit_einddatum}<br/>\n{verbruik_electriciteit_verbruik_hoog}<br/>\n{verbruik_electriciteit_verbruik_laag}<br/>\n{verbruik_electriciteit_terug_hoog}<br/>\n{verbruik_electriciteit_terug_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_hoog<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_hoog}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_laag}<br/>\n{verbruik_electriciteit_variabele_kosten_hoog}<br/>\n{verbruik_electriciteit_variabele_kosten_laag}<br/>\n{verbruik_electriciteit_vaste_kosten_hoog}<br/>\n{verbruik_electriciteit_vaste_kosten_laag}"}))),l.createElement(i.Z,null,l.createElement("div",{className:"pull-right btn-group",role:"group"},l.createElement(m.Z,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:a}),l.createElement(m.Z,{loading:!1,loadText:"laden",buttonText:"Opslaan",onClickAction:ne,type:"submit",value:"Submit"}))))),$&&l.createElement(d.Z,{showConfirmAction:!1,buttonCancelText:"Sluiten",closeModal:function(){return Q(!1)},title:"Waarschuwing"},"Bij het activeren van twee factor authenticatie voor de gehele coöperatie worden alle gebruikers per direct verplicht om twee factor authenticatie in te stellen.",l.createElement("br",null),l.createElement("br",null),"Dit geldt ook voor gebruikers die op dit moment in het programma actief zijn."))}));var D=a(7250);const M=function(e){var t=e.formData,a=e.toggleEdit;return l.createElement("section",{className:"panel-hover",onClick:a},l.createElement(o.Z,null,l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Naam",value:t.name}),l.createElement(D.Z,{label:"KvK",value:t.kvkNumber})),l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Adres",value:t.address}),l.createElement(D.Z,{label:"Btw nummer",value:t.btwNumber})),l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Postcode",value:t.postalCode}),l.createElement(D.Z,{label:"IBAN",value:t.iban})),l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Plaats",value:t.city}),l.createElement(D.Z,{label:"IBAN t.n.v.",value:t.ibanAttn})),l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Email",value:t.email}),l.createElement(D.Z,{label:"Website",value:t.website})),l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Logo",value:t.logoName}))),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Hoom gegevens")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Hoom link",value:t.hoomLink}),l.createElement(D.Z,{label:"Hoom key",value:t.hoomKey})),l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Hoom e-mail template",value:t.hoomEmailTemplate&&t.hoomEmailTemplate.name}),l.createElement(D.Z,{label:"Hoom groep",value:t.hoomGroup&&t.hoomGroup.name})),l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Stuurt e-mail bij nieuw Hoomdossier",value:t.sendEmail?"Ja":"Nee"}))),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Laposta gegevens")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Gebruik Laposta",value:t.useLaposta?"Ja":"Nee"}),l.createElement(D.Z,{label:"Laposta key",value:t.lapostaKey}))),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Twee factor authenticatie")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Verplichten voor alle gebruikers",value:t.requireTwoFactorAuthentication?"Ja":"Nee",size:"col-sm-5",textToolTip:"Je kan voor individuele gebruikers 2 factor authenticatie afdwingen via instellingen > gebruikers"}))),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Buurtaanpak")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Buurtaanpak afspraak e-mail template",value:t.inspectionPlannedEmailTemplate&&t.inspectionPlannedEmailTemplate.name}),l.createElement(D.Z,{label:"Mailbox buurtaanpak e-mail bevestigingen",value:t.inspectionPlannedMailbox&&t.inspectionPlannedMailbox.name})),l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Buurtaanpak opname e-mail template",value:t.inspectionRecordedEmailTemplate&&t.inspectionRecordedEmailTemplate.name})),l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Buurtaanpak uitgebracht e-mail template",value:t.inspectionReleasedEmailTemplate&&t.inspectionReleasedEmailTemplate.name}))),l.createElement(_.Z,null,l.createElement("span",{className:"h5 text-bold"},"Overig")),l.createElement(i.Z,null,l.createElement("div",{className:"row"},l.createElement(D.Z,{label:"Gebruik export energieverbruik tarieven en verbruik",value:t.useExportAddressConsumption?"Ja":"Nee",size:"col-sm-5",name:"useExportAddressConsumption",textToolTip:"Met deze knop krijg je de optie om op de Contacten pagina een download te maken van energie verbruik en tarief voorstellen.<br/>\nDeze tarieven kunnen voorals nog alleen via de API worden ingeschoten met waardes:<br/>\n{verbruik_gas_begindatum}<br/>\n{verbruik_gas_einddatum}<br/>\n{verbruik_gas_verbruik_m3}<br/>\n{verbruik_gas_voorgesteld_tarief_vast}<br/>\n{verbruik_gas_voorgesteld_tarief_variabel}<br/>\n{verbruik_gas_variabele_kosten}<br/>\n{verbruik_gas_vaste_kosten}<br/>\n<br/>\n{verbruik_electriciteit_begindatum}<br/>\n{verbruik_electriciteit_einddatum}<br/>\n{verbruik_electriciteit_verbruik_hoog}<br/>\n{verbruik_electriciteit_verbruik_laag}<br/>\n{verbruik_electriciteit_terug_hoog}<br/>\n{verbruik_electriciteit_terug_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_hoog<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_hoog}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_laag}<br/>\n{verbruik_electriciteit_variabele_kosten_hoog}<br/>\n{verbruik_electriciteit_variabele_kosten_laag}<br/>\n{verbruik_electriciteit_vaste_kosten_hoog}<br/>\n{verbruik_electriciteit_vaste_kosten_laag}"})))))};var R=a(49514);function H(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function K(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?H(Object(a),!0).forEach((function(t){(0,r.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):H(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var z={result:{id:null,name:"",address:"",postalCode:"",city:"",kvkNumber:"",btwNumber:"",iban:"",ibanAttn:"",email:"",website:"",logoFilename:"",logoName:"",hoomLink:"",hoomKey:"",hoomEmailTemplateId:"",hoomGroupId:"",useLaposta:!1,lapostaKey:"",useExportAddressConsumption:!1,requireTwoFactorAuthentication:!1,inspectionPlannedEmailTemplateId:"",inspectionRecordedEmailTemplateId:"",inspectionReleasedEmailTemplateId:"",inspectionPlannedMailboxId:""},isLoading:!0,showEdit:!1},G=function(e,t){switch(t.type){case"updateIsLoading":return K(K({},e),{},{isLoading:t.payload});case"updateResult":return K(K({},e),{},{result:t.payload});case"updateShowEdit":return K(K({},e),{},{showEdit:t.payload});default:return z}};const F=(0,u.$j)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var t=e.permissions,a=(0,l.useReducer)(G,z),r=(0,n.Z)(a,2),s=r[0],c=r[1];function m(e){c({type:"updateIsLoading",payload:e})}function u(e){c({type:"updateResult",payload:e})}function d(){c({type:"updateShowEdit",payload:!s.showEdit})}return(0,l.useEffect)((function(){t.manageCooperationSettings&&(m(!0),p().then((function(e){e.data&&e.data.data&&e.data.data.id&&u(e.data.data),m(!1)})).catch((function(e){alert("Er is iets misgegaan met het laden van de gegevens. Herlaad de pagina."),m(!1)})))}),[s.filter]),l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-9"},t.manageCooperationSettings?s.isLoading?"Laden...":l.createElement(l.Fragment,null,l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(o.Z,null,l.createElement(i.Z,{className:"panel-small"},l.createElement(k,{formData:s.result})))),l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(l.Fragment,null,s.showEdit&&t.manageCooperationSettings?l.createElement(O,{formData:s.result,toggleEdit:d,updateResult:u}):l.createElement(M,{formData:s.result,toggleEdit:d})))):l.createElement(R.Z,null)),l.createElement("div",{className:"col-md-3"}))}))}}]);