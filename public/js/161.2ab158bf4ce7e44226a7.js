"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[161],{30161:(e,t,a)=>{a.r(t),a.d(t,{default:()=>we});var n=a(29439),l=a(4942),r=a(67294),o=a(14309),i=a(98688),c=a(61409),s=a(55451),m=a(49332),u=a(86706),p=a(41355),d=a(69265);const b=function(){return d.Z.get("cooperation")},g=function(e){return d.Z.post("cooperation",e)},v=function(e,t){var a="cooperation/".concat(e);return d.Z.post(a,t)},h=function(e){return d.Z.post("cooperation-hoom-campaign",e)},E=function(e,t){var a="cooperation-hoom-campaign/".concat(e);return d.Z.post(a,t)},f=function(e){var t="cooperation-hoom-campaign/".concat(e,"/delete");return d.Z.post(t)},Z=function(e){var t="cooperation/".concat(e,"/sync-all-with-laposta");return d.Z.post(t)},k=function(e){var t=e.closeModal,a=e.formData,l=(0,r.useState)("Synchronisatie laposta gestart"),o=(0,n.Z)(l,2),i=o[0],c=o[1],s=(0,r.useState)([]),m=(0,n.Z)(s,2),u=m[0],d=m[1];return(0,r.useEffect)((function(){Z(a.id).then((function(e){c("Synchronisatie is succesvol uitgevoerd"),setTimeout(t,2e3)})).catch((function(e){if(e.response&&422===e.response.status){if(e.response.data&&e.response.data.errors)e.response.data.errors.econobis&&e.response.data.errors.econobis.length&&(c("De volgende fouten gevonden tijdens synchronisatie:"),d(e.response.data.errors.econobis));else if(e.response.data&&e.response.data.message){c("Er is iets misgegaan bij het synchroniseren met Laposta ("+e.response.status+").");for(var t=[],a=0,l=Object.entries(JSON.parse(e.response.data.message));a<l.length;a++){var r=(0,n.Z)(l[a],2),o=(r[0],r[1]);t.push("".concat(o))}d(t)}}else c("Er is iets misgegaan bij het synchroniseren met Laposta ("+(e.response&&e.response.status)+").")}))}),[]),r.createElement(p.Z,{buttonClassName:"btn-danger",closeModal:t,buttonCancelText:"Sluiten",showConfirmAction:!1,title:"Synchroniseren met Laposta"},r.createElement("p",null,i),u.length?r.createElement("ul",null,u.map((function(e){return r.createElement("li",null,e)}))):null)},C=(0,u.$j)((function(e){return{permissions:e.meDetails.permissions,isLoading:e.loadingData.isLoading}}),null)((function(e){var t=e.permissions,a=e.isLoading,l=e.formData,u=(0,r.useState)(!1),p=(0,n.Z)(u,2),d=p[0],b=p[1];function g(){b(!d)}return r.createElement("div",{className:"row"},r.createElement("div",{className:"col-sm-12"},r.createElement(o.Z,null,r.createElement(i.Z,{className:"panel-small"},r.createElement("div",{className:"col-md-4"},r.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},r.createElement(s.Z,{iconName:"arrowLeft",onClickAction:c.mW.goBack}),t.manageMarketing&&1==l.useLaposta?r.createElement(m.Z,{onClickAction:g,buttonText:"Synchroniseren LaPosta"}):null)),!a&&r.createElement("div",{className:"col-md-4"},r.createElement("h4",{className:"text-center"},"Coöperatie instellingen")),r.createElement("div",{className:"col-md-4"})))),d&&r.createElement(k,{closeModal:g,formData:l}))}));var w=a(80720),_=a(9181),N=a(62265),y=a(9669),A=a.n(y),T=a(19789),L=a(82084),S=a(60813),R=a(19501),P=a(59687),O=R.Ry().shape({name:R.Z_().required("Verplicht"),iban:R.Z_().trim().nullable().test("iban","Ongeldige IBAN !",(function(e){return!e||P.isValidIBAN(e)})),kvkNumber:R.Z_().nullable().trim().test("number","Alleen nummers",(function(e){return!e||Number.isInteger(+e)})),email:R.Z_().email("Ongeldige e-mail"),emailReportTableProblems:R.Z_().email("Ongeldige Email bij problemen vullen report tabel"),website:R.Z_().url("Ongeldige url"),hoomLink:R.Z_().url("Ongeldige url"),hoomConnectCoachLink:R.Z_().url("Ongeldige url")}),D=R.Ry().shape({campaignId:R.Z_().required("Verplicht")}),j=R.Ry().shape({}),I=a(88601).Z;const x=function(e){var t=e.addAttachment,a=e.toggleShowUploadLogo,l=(0,r.useState)(!1),o=(0,n.Z)(l,2),i=o[0],c=o[1];return r.createElement(p.Z,{closeModal:a,showConfirmAction:!1,title:"Upload bestand"},r.createElement("div",{className:"upload-file-content"},r.createElement(I,{accept:"image/jpeg, image/png, image/jpg",multiple:!1,className:"dropzone",onDropAccepted:function(e){t(e[0]),setTimeout((function(){a()}),500)},onDropRejected:function(){c(!0)},maxSize:6291456},r.createElement("p",null,"Klik hier voor het uploaden van een bestand"),r.createElement("p",null,r.createElement("strong",null,"of")," sleep het bestand hierheen"))),i&&r.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn."))};var B=a(21606),M=a(25725),F=a(90329),z=a(7250),H=a(30381),V=a.n(H),G=a(85016),K=a(93433),q=a(15671),J=a(43144),W=a(97326),U=a(60136),$=a(82963),Q=a(61120),X=a(97894),Y=a(75502),ee=a(77320);const te=function(e){var t=e.hoomCampaign,a=t.campaignName,n=t.measureName;return r.createElement("div",{className:"row border ".concat(e.highlightLine),onMouseEnter:function(){return e.onLineEnter()},onMouseLeave:function(){return e.onLineLeave()}},r.createElement("div",{onClick:e.openEdit},r.createElement("div",{className:"col-sm-6"},a),r.createElement("div",{className:"col-sm-5"},n||"- Alle -")),r.createElement("div",{className:"col-sm-1"},e.showActionButtons?r.createElement(r.Fragment,null,r.createElement("a",{role:"button",onClick:e.openEdit},r.createElement(X.ZP,{className:"mybtn-success",size:14,icon:Y.r})),r.createElement("a",{role:"button",onClick:e.toggleDelete},r.createElement(X.ZP,{className:"mybtn-danger",size:14,icon:ee._}))):""))};var ae=a(71840),ne=a(90916);const le=function(e){var t=e.hoomCampaign,a=e.cancelEdit,l=e.updateResult,c=(0,r.useState)([]),s=(0,n.Z)(c,2),u=s[0],p=s[1],d=(0,r.useState)(!0),b=(0,n.Z)(d,2),g=(b[0],b[1]),v={campaignName:t.campaignName,measureId:t.measureId},h=(0,N.TA)({initialValues:v,validationSchema:j,onSubmit:function(e){!function(e){for(var a=0,r=["campaignName"];a<r.length;a++)delete e[r[a]];for(var o=new FormData,i=0,c=Object.entries(e);i<c.length;i++){var s=(0,n.Z)(c[i],2),m=s[0],u=s[1];o.append(m,u)}E(t.id,o).then((function(e){l(e.data.data)})).catch((function(e){alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))}(e)}}),f=h.values,Z=(h.errors,h.touched,h.handleChange),k=h.handleSubmit;return h.setFieldValue,h.handleBlur,(0,r.useEffect)((function(){A().all([ne.Z.peekMeasures()]).then(A().spread((function(e){p(e),g(!1)})))}),[]),r.createElement("div",null,r.createElement(o.Z,{className:"panel-grey"},r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(_.Z,{label:"Campagne",size:"col-sm-6",name:"campaignName",value:f.campaignName,readOnly:!0}),r.createElement(ae.Z,{label:"Maatregel specifiek",size:"col-sm-6",name:"measureId",options:u,value:f.measureId,onChangeAction:Z})),r.createElement("div",{className:"pull-right btn-group",role:"group"},r.createElement(m.Z,{buttonClassName:"btn-default",buttonText:"Annuleren",onClickAction:a}),r.createElement(m.Z,{buttonText:"Opslaan",onClickAction:k,type:"submit",value:"Submit"})))))},re=function(e){return r.createElement(p.Z,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:e.toggleDelete,confirmAction:function(){f(e.hoomCampaign.id).then((function(t){e.toggleDelete(),e.removeResult(e.hoomCampaign.id)})).catch((function(e){alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))},title:"Verwijderen"},r.createElement("p",null,"Wil je deze campagne ",r.createElement("strong",null,e.hoomCampaign.campaignName)," met maatregel"," ",r.createElement("strong",null,e.hoomCampaign.measureId?e.hoomCampaign.measureName:"- Alle -")," ","ontkoppelen van cooperatie?"))};function oe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ie(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(a),!0).forEach((function(t){(0,l.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):oe(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}const ce=function(e){(0,U.Z)(o,e);var t,a,n=(t=o,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,Q.Z)(t);if(a){var l=(0,Q.Z)(this).constructor;e=Reflect.construct(n,arguments,l)}else e=n.apply(this,arguments);return(0,$.Z)(this,e)});function o(e){var t;return(0,q.Z)(this,o),t=n.call(this,e),(0,l.Z)((0,W.Z)(t),"onLineEnter",(function(){t.setState({showActionButtons:!!t.props.showEditCooperation,highlightLine:"highlight-line"})})),(0,l.Z)((0,W.Z)(t),"onLineLeave",(function(){t.setState({showActionButtons:!1,highlightLine:""})})),(0,l.Z)((0,W.Z)(t),"openEdit",(function(){t.setState({showEdit:!0})})),(0,l.Z)((0,W.Z)(t),"closeEdit",(function(){t.setState({showEdit:!1})})),(0,l.Z)((0,W.Z)(t),"cancelEdit",(function(){t.setState(ie(ie({},t.state),{},{hoomCampaign:ie({},t.props.hoomCampaign)})),t.closeEdit()})),(0,l.Z)((0,W.Z)(t),"updateResult",(function(e){t.setState(ie(ie({},t.state),{},{hoomCampaign:ie({},e)})),t.closeEdit()})),(0,l.Z)((0,W.Z)(t),"toggleDelete",(function(){t.setState({showDelete:!t.state.showDelete})})),t.state={showActionButtons:!1,highlightLine:"",showEdit:!1,showDelete:!1,hoomCampaign:ie({},e.hoomCampaign)},t}return(0,J.Z)(o,[{key:"render",value:function(){return r.createElement("div",null,r.createElement(te,{hoomCampaign:this.state.hoomCampaign,highlightLine:this.state.highlightLine,showActionButtons:this.state.showActionButtons,onLineEnter:this.onLineEnter,onLineLeave:this.onLineLeave,openEdit:this.openEdit,toggleDelete:this.toggleDelete}),this.state.showEdit&&r.createElement(le,{hoomCampaign:this.state.hoomCampaign,cancelEdit:this.cancelEdit,updateResult:this.updateResult}),this.state.showDelete&&r.createElement(re,{hoomCampaign:this.state.hoomCampaign,toggleDelete:this.toggleDelete,removeResult:this.props.removeResult}))}}]),o}(r.Component),se=function(e){return r.createElement("div",null,r.createElement("div",{className:"row border header"},r.createElement("div",{className:"col-sm-6"},"Campagne"),r.createElement("div",{className:"col-sm-5"},"Maatregel specifiek"),r.createElement("div",{className:"col-sm-1"})),e.hoomCampaigns.length>0?e.hoomCampaigns.map((function(t){return r.createElement(ce,{key:t.id,showEditCooperation:e.showEditCooperation,hoomCampaign:t,removeResult:e.removeResult})})):r.createElement("div",null,"Geen campagnes bekend."))};var me=a(55359);const ue=function(e){var t=e.cooperationId,a=e.toggleShowNew,l=e.addResult,c=(0,r.useState)([]),s=(0,n.Z)(c,2),u=s[0],p=s[1],d=(0,r.useState)([]),b=(0,n.Z)(d,2),g=b[0],v=b[1],E=(0,r.useState)(!0),f=(0,n.Z)(E,2),Z=(f[0],f[1]),k={cooperationId:t,campaignId:"",measureId:""},C=(0,N.TA)({initialValues:k,validationSchema:D,onSubmit:function(e){!function(e){for(var t=new FormData,r=0,o=Object.entries(e);r<o.length;r++){var i=(0,n.Z)(o[r],2),c=i[0],s=i[1];t.append(c,s)}h(t).then((function(e){l(e.data.data),a()})).catch((function(e){alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))}(e)}}),w=C.values,_=C.errors,y=C.touched,T=C.handleChange,L=C.handleSubmit;return C.setFieldValue,C.handleBlur,(0,r.useEffect)((function(){A().all([me.Z.peekCampaigns(),ne.Z.peekMeasures()]).then(A().spread((function(e,t){p(e),v(t),Z(!1)})))}),[]),r.createElement("div",null,r.createElement(o.Z,{className:"panel-grey"},r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(ae.Z,{label:"Campagne",size:"col-sm-6",name:"campaignId",options:u,value:w.campaignId,onChangeAction:T,required:"required",error:_.campaignId&&y.campaignId,errorMessage:_.campaignId}),r.createElement(ae.Z,{label:"Maatregel specifiek",size:"col-sm-6",name:"measureId",options:g,value:w.measureId,onChangeAction:T})),r.createElement("div",{className:"pull-right btn-group",role:"group"},r.createElement(m.Z,{buttonClassName:"btn-default",buttonText:"Annuleren",onClickAction:a}),r.createElement(m.Z,{buttonText:"Opslaan",onClickAction:L,type:"submit",value:"Submit"})))))};var pe=a(10055);function de(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function be(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?de(Object(a),!0).forEach((function(t){(0,l.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):de(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}const ge=function(e){(0,U.Z)(c,e);var t,a,n=(t=c,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,Q.Z)(t);if(a){var l=(0,Q.Z)(this).constructor;e=Reflect.construct(n,arguments,l)}else e=n.apply(this,arguments);return(0,$.Z)(this,e)});function c(e){var t;return(0,q.Z)(this,c),t=n.call(this,e),(0,l.Z)((0,W.Z)(t),"toggleShowNew",(function(){t.setState({showNew:!t.state.showNew})})),(0,l.Z)((0,W.Z)(t),"addResult",(function(e){t.setState({hoomCampaigns:[].concat((0,K.Z)(t.state.hoomCampaigns),[be({},e)])})})),(0,l.Z)((0,W.Z)(t),"removeResult",(function(e){t.setState({hoomCampaigns:t.state.hoomCampaigns.filter((function(t){return t.id!==e}))})})),t.state={hoomCampaigns:e.hoomCampaigns,showNew:!1},t}return(0,J.Z)(c,[{key:"render",value:function(){return r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Hoom campagnes"),this.props.showEditCooperation&&r.createElement("a",{role:"button",className:"pull-right",onClick:this.toggleShowNew},r.createElement(X.ZP,{size:14,icon:pe.P}))),r.createElement(i.Z,null,this.state.showNew&&r.createElement("div",{className:"col-md-12 margin-10-top"},r.createElement(ue,{cooperationId:this.props.cooperationId,toggleShowNew:this.toggleShowNew,addResult:this.addResult})),r.createElement("div",{className:"col-md-12"},r.createElement(se,{cooperationId:this.props.cooperationId,showEditCooperation:this.props.showEditCooperation,hoomCampaigns:this.state.hoomCampaigns,removeResult:this.removeResult}))))}}]),c}(r.Component),ve=(0,u.$j)((function(e){return{meDetails:e.meDetails}}),(function(e){return{fetchSystemData:function(){e((0,M.P)())}}}))((function(e){var t=e.formData,a=e.toggleEdit,l=e.updateResult,c=e.fetchSystemData,s=e.meDetails,u=(0,r.useState)([]),d=(0,n.Z)(u,2),b=d[0],h=d[1],E=(0,r.useState)([]),f=(0,n.Z)(E,2),Z=f[0],k=f[1],C=(0,r.useState)([]),y=(0,n.Z)(C,2),R=y[0],P=y[1],D=(0,r.useState)(!0),j=(0,n.Z)(D,2),I=j[0],M=j[1],H=(0,r.useState)(!1),K=(0,n.Z)(H,2),q=K[0],J=K[1],W=(0,r.useState)(null),U=(0,n.Z)(W,2),$=U[0],Q=U[1],X=(0,r.useState)(!1),Y=(0,n.Z)(X,2),ee=Y[0],te=Y[1],ae=(0,N.TA)({initialValues:t,validationSchema:O,onSubmit:function(e){!function(e){for(var t=0,r=["hoomGroup","hoomEmailTemplate","hoomCampaigns","createdAt","createdBy","createdById","updatedAt","updatedById","updatedBy"];t<r.length;t++)delete e[r[t]];for(var o=new FormData,i=0,s=Object.entries(e);i<s.length;i++){var m=(0,n.Z)(s[i],2),u=m[0],p=m[1];o.append(u,p)}$&&o.append("attachment",$);(null===e.id?g(o):v(e.id,o)).then((function(e){l(e.data.data),a(),c()})).catch((function(e){alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))}(e)}}),ne=ae.values,le=ae.errors,re=ae.touched,oe=ae.handleChange,ie=ae.handleSubmit,ce=ae.setFieldValue,se=ae.handleBlur;function me(){J(!q)}return(0,r.useEffect)((function(){A().all([T.Z.fetchEmailTemplatesPeek(),F.Z.fetchMailboxesLoggedInUserPeek(),S.Z.peekStaticContactGroups()]).then(A().spread((function(e,t,a){P(t.data.data),h(e),k(a),M(!1)})))}),[]),r.createElement("div",null,r.createElement("section",{className:"panel-hover"},r.createElement(o.Z,null,r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(_.Z,{label:"Naam",name:"name",value:ne.name,onChangeAction:oe,onBlurAction:se,required:"required",error:le.name&&re.name,errorMessage:le.name}),r.createElement(_.Z,{label:"KvK",name:"kvkNumber",value:ne.kvkNumber,onChangeAction:oe,error:le.kvkNumber&&re.kvkNumber,errorMessage:le.kvkNumber})),r.createElement("div",{className:"row"},r.createElement(_.Z,{label:"Adres",name:"address",value:ne.address,onChangeAction:oe}),r.createElement(_.Z,{label:"Btw nummer",name:"btwNumber",value:ne.btwNumber,onChangeAction:oe})),r.createElement("div",{className:"row"},r.createElement(_.Z,{label:"Postcode",name:"postalCode",value:ne.postalCode,onChangeAction:oe}),r.createElement(_.Z,{label:"IBAN",name:"iban",value:ne.iban,onChangeAction:oe,onBlurAction:se,error:le.iban&&re.iban,errorMessage:le.iban})),r.createElement("div",{className:"row"},r.createElement(_.Z,{label:"Plaats",name:"city",value:ne.city,onChangeAction:oe}),r.createElement(_.Z,{label:"IBAN t.n.v.",name:"ibanAttn",value:ne.ibanAttn,onChangeAction:oe})),r.createElement("div",{className:"row"},r.createElement(_.Z,{label:"Email",name:"email",value:ne.email,onChangeAction:oe,onBlurAction:se,error:le.email&&re.email,errorMessage:le.email}),r.createElement(_.Z,{label:"Website",name:"website",value:ne.website,onChangeAction:oe,onBlurAction:se,error:le.website&&re.website,errorMessage:le.website})),r.createElement("div",{className:"row"},r.createElement("div",{className:"form-group col-sm-6"},r.createElement("label",{className:"col-sm-6"},"Kies logo"),r.createElement("div",{className:"col-sm-6"},r.createElement("input",{type:"text",className:"form-control input-sm col-sm-6",value:$?$.name:ne.logoName,onClick:me,onChange:function(){}}))),q?r.createElement(x,{addAttachment:Q,toggleShowUploadLogo:me}):null))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Hoom gegevens")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(_.Z,{label:"Hoom link",name:"hoomLink",value:ne.hoomLink,onChangeAction:oe,onBlurAction:se,error:le.hoomLink&&re.hoomLink,errorMessage:le.hoomLink}),r.createElement(_.Z,{label:"Hoom key",name:"hoomKey",value:ne.hoomKey,onChangeAction:oe})),r.createElement("div",{className:"row"},r.createElement(_.Z,{label:"Hoom bewoner/coach link",name:"hoomConnectCoachLink",value:ne.hoomConnectCoachLink,onChangeAction:oe,onBlurAction:se,error:le.hoomConnectCoachLink&&re.hoomConnectCoachLink,errorMessage:le.hoomConnectCoachLink})),r.createElement("div",{className:"row"},r.createElement(L.Z,{label:"Hoom e-mail template",name:"hoomEmailTemplateId",options:b,value:ne.hoomEmailTemplateId,onChangeAction:function(e,t){return ce(t,e)},isLoading:I,clearable:!0}),r.createElement(L.Z,{label:"Hoom groep",name:"hoomGroupId",options:Z,value:ne.hoomGroupId,onChangeAction:function(e,t){return ce(t,e)},isLoading:I,clearable:!0})),r.createElement("div",{className:"row"},r.createElement(B.Z,{label:"Stuur e-mail bij nieuw Hoomdossier",name:"sendEmail",value:!!ne.sendEmail,onChangeAction:function(e){e.persist(),ce(e.target.name,e.target.checked)}})),r.createElement(ge,{cooperationId:t.id,showEditCooperation:!0,hoomCampaigns:t.hoomCampaigns}))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Laposta gegevens")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(B.Z,{label:"Gebruik Laposta",name:"useLaposta",value:ne.useLaposta,onChangeAction:function(e){return ce("useLaposta",e.target.checked)}}),r.createElement(_.Z,{label:"Laposta key",name:"lapostaKey",value:ne.lapostaKey,onChangeAction:oe})))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Twee factor authenticatie")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(B.Z,{label:"Verplichten voor alle gebruikers",name:"requireTwoFactorAuthentication",value:ne.requireTwoFactorAuthentication,onChangeAction:function(e){ce("requireTwoFactorAuthentication",e.target.checked),e.target.checked&&te(!0)},size:"col-sm-5",textToolTip:"Je kan voor individuele gebruikers 2 factor authenticatie afdwingen via instellingen > gebruikers"})))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Buurtaanpak")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(L.Z,{label:"Buurtaanpak afspraak e-mail template",name:"inspectionPlannedEmailTemplateId",options:b,value:ne.inspectionPlannedEmailTemplateId,onChangeAction:function(e,t){return ce(t,e)},isLoading:I,clearable:!0}),r.createElement(L.Z,{label:"Mailbox afspraak/opname/uitgebracht bevestigingen",name:"inspectionPlannedMailboxId",options:R,optionName:"email",value:ne.inspectionPlannedMailboxId,onChangeAction:function(e,t){return ce(t,e)},isLoading:I,clearable:!0})),r.createElement("div",{className:"row"},r.createElement(L.Z,{label:"Buurtaanpak opname e-mail template",name:"inspectionRecordedEmailTemplateId",options:b,value:ne.inspectionRecordedEmailTemplateId,onChangeAction:function(e,t){return ce(t,e)},isLoading:I,clearable:!0})),r.createElement("div",{className:"row"},r.createElement(L.Z,{label:"Buurtaanpak uitgebracht e-mail template",name:"inspectionReleasedEmailTemplateId",options:b,value:ne.inspectionReleasedEmailTemplateId,onChangeAction:function(e,t){return ce(t,e)},isLoading:I,clearable:!0})))),("support@econobis.nl"===s.email||"software@xaris.nl"===s.email)&&r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Contactgroep/contact koppelingen ")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(B.Z,{label:r.createElement("span",null,"Vullen report tabel (tbv Power BI)",ne.createContactsForReportTable?r.createElement(r.Fragment,null,r.createElement("br",null),r.createElement("small",{style:{color:"red",fontWeight:"normal"}},"Wanneer je dit uitzet wordt de report tabel geleegd.")):null),name:"createContactsForReportTable",value:!!ne.createContactsForReportTable,onChangeAction:function(e){return ce("createContactsForReportTable",e.target.checked)},size:"col-sm-5",textToolTip:"Hiermee wordt er een tabel gevuld met alle contactgroep/contact koppelingen tbv Power BI."}),1==ne.createContactsForReportTable&&r.createElement(_.Z,{label:"Email bij problemen vullen report tabel",name:"emailReportTableProblems",value:ne.emailReportTableProblems,onChangeAction:oe,onBlurAction:se,error:le.emailReportTableProblems&&re.emailReportTableProblems,errorMessage:le.emailReportTableProblems})),r.createElement("div",{className:"row"},1==ne.createContactsForReportTable&&r.createElement(z.Z,{label:"Datum laatste keer gevuld",value:ne.createContactsForReportTableLastCreated?V()(ne.createContactsForReportTableLastCreated).format("L"):""}),1==ne.createContactsForReportTableInProgress&&r.createElement("span",{class:"form-group col-sm-6"},r.createElement("span",{class:"form-group col-sm-12",style:{color:"#e64a4a"}},"Report tabel wordt momenteel bijgewerkt…"))))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"E-mail opmaak")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(L.Z,{label:"Lettertype",name:"fontFamilyDefault",options:[{id:"Helvetica",name:"Helvetica"},{id:"Arial",name:"Arial"},{id:"Arial Black",name:"Arial Black"},{id:"Verdana",name:"Verdana"},{id:"Tahoma",name:"Tahoma"},{id:"Trebuchet MS",name:"Trebuchet MS"},{id:"Impact",name:"Impact"},{id:"Gill Sans",name:"Gill Sans"},{id:"Times New Roman",name:"Times New Roman"},{id:"Georgia",name:"Georgia"},{id:"Palatino",name:"Palatino"},{id:"Baskerville",name:"Baskerville"},{id:"Andalé Mono",name:"Andalé Mono"},{id:"Courier",name:"Courier"},{id:"Lucida",name:"Lucida"},{id:"Monaco",name:"Monaco"},{id:"Bradley Hand",name:"Bradley Hand"},{id:"Brush Script MT",name:"Brush Script MT"},{id:"Luminari",name:"Luminari"},{id:"Comic Sans MS",name:"Comic Sans MS"},{id:"Maven Pro",name:"Maven Pro"}],value:ne.fontFamilyDefault,onChangeAction:function(e,t){return ce(t,e)},clearable:!0}),r.createElement(_.Z,{label:"Lettergrootte",name:"fontSizeDefault",value:ne.fontSizeDefault,onChangeAction:oe,onBlurAction:se,type:"number"})),r.createElement("div",{className:"row"},r.createElement(G.Z,{label:"Letterkleur",name:"fontColorDefault",value:ne.fontColorDefault,onChangeAction:oe,cpSize:"col-sm-2",divSize:"col-sm-6",size:"col-sm-4"})))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Overig")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(B.Z,{label:"Gebruik export energieverbruik tarieven en verbruik",name:"useExportAddressConsumption",value:ne.useExportAddressConsumption,onChangeAction:function(e){return ce("useExportAddressConsumption",e.target.checked)},size:"col-sm-5",textToolTip:"Met deze knop krijg je de optie om op de Contacten pagina een download te maken van energie verbruik en tarief voorstellen.<br/>\nDeze tarieven kunnen voorals nog alleen via de API worden ingeschoten met waardes:<br/>\n{verbruik_gas_begindatum}<br/>\n{verbruik_gas_einddatum}<br/>\n{verbruik_gas_verbruik_m3}<br/>\n{verbruik_gas_voorgesteld_tarief_vast}<br/>\n{verbruik_gas_voorgesteld_tarief_variabel}<br/>\n{verbruik_gas_variabele_kosten}<br/>\n{verbruik_gas_vaste_kosten}<br/>\n<br/>\n{verbruik_electriciteit_begindatum}<br/>\n{verbruik_electriciteit_einddatum}<br/>\n{verbruik_electriciteit_verbruik_hoog}<br/>\n{verbruik_electriciteit_verbruik_laag}<br/>\n{verbruik_electriciteit_terug_hoog}<br/>\n{verbruik_electriciteit_terug_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_hoog<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_hoog}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_laag}<br/>\n{verbruik_electriciteit_variabele_kosten_hoog}<br/>\n{verbruik_electriciteit_variabele_kosten_laag}<br/>\n{verbruik_electriciteit_vaste_kosten_hoog}<br/>\n{verbruik_electriciteit_vaste_kosten_laag}"}))),r.createElement(i.Z,null,r.createElement("div",{className:"pull-right btn-group",role:"group"},r.createElement(m.Z,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:a}),r.createElement(m.Z,{loading:!1,loadText:"laden",buttonText:"Opslaan",onClickAction:ie,type:"submit",value:"Submit"}))))),ee&&r.createElement(p.Z,{showConfirmAction:!1,buttonCancelText:"Sluiten",closeModal:function(){return te(!1)},title:"Waarschuwing"},"Bij het activeren van twee factor authenticatie voor de gehele coöperatie worden alle gebruikers per direct verplicht om twee factor authenticatie in te stellen.",r.createElement("br",null),r.createElement("br",null),"Dit geldt ook voor gebruikers die op dit moment in het programma actief zijn."))})),he=(0,u.$j)((function(e){return{meDetails:e.meDetails}}),null)((function(e){var t=e.formData,a=e.toggleEdit,n=e.meDetails;return r.createElement("section",{className:"panel-hover",onClick:a},1==t.createContactsForReportTableInProgress&&r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5",style:{color:"#e64a4a"}},"Contactgroep/contact koppelingen report tabel wordt momenteel bijgewerkt…"))),r.createElement(o.Z,null,r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Naam",value:t.name}),r.createElement(z.Z,{label:"KvK",value:t.kvkNumber})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Adres",value:t.address}),r.createElement(z.Z,{label:"Btw nummer",value:t.btwNumber})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Postcode",value:t.postalCode}),r.createElement(z.Z,{label:"IBAN",value:t.iban})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Plaats",value:t.city}),r.createElement(z.Z,{label:"IBAN t.n.v.",value:t.ibanAttn})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Email",value:t.email}),r.createElement(z.Z,{label:"Website",value:t.website})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Logo",value:t.logoName})))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Hoom gegevens")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Hoom link",value:t.hoomLink}),r.createElement(z.Z,{label:"Hoom key",value:t.hoomKey})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Hoom bewoner/coach link",value:t.hoomConnectCoachLink})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Hoom e-mail template",value:t.hoomEmailTemplate&&t.hoomEmailTemplate.name}),r.createElement(z.Z,{label:"Hoom groep",value:t.hoomGroup&&t.hoomGroup.name})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Stuurt e-mail bij nieuw Hoomdossier",value:t.sendEmail?"Ja":"Nee"})),r.createElement(ge,{cooperationId:t.id,showEditCooperation:!1,hoomCampaigns:t.hoomCampaigns}))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Laposta gegevens")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Gebruik Laposta",value:t.useLaposta?"Ja":"Nee"}),r.createElement(z.Z,{label:"Laposta key",value:t.lapostaKey})))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Twee factor authenticatie")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Verplichten voor alle gebruikers",value:t.requireTwoFactorAuthentication?"Ja":"Nee",size:"col-sm-5",textToolTip:"Je kan voor individuele gebruikers 2 factor authenticatie afdwingen via instellingen > gebruikers"})))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Buurtaanpak")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Buurtaanpak afspraak e-mail template",value:t.inspectionPlannedEmailTemplate&&t.inspectionPlannedEmailTemplate.name}),r.createElement(z.Z,{label:"Mailbox buurtaanpak e-mail bevestigingen",value:t.inspectionPlannedMailbox&&t.inspectionPlannedMailbox.name})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Buurtaanpak opname e-mail template",value:t.inspectionRecordedEmailTemplate&&t.inspectionRecordedEmailTemplate.name})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Buurtaanpak uitgebracht e-mail template",value:t.inspectionReleasedEmailTemplate&&t.inspectionReleasedEmailTemplate.name})))),("support@econobis.nl"===n.email||"software@xaris.nl"===n.email)&&r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Contactgroep/contact koppelingen ")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Vullen report tabel (tbv Power BI)",value:t.createContactsForReportTable?"Ja":"Nee",size:"col-sm-5",name:"createContactsForReportTable",textToolTip:"Hiermee wordt er een tabel gevuld met alle contactgroep/contact koppelingen tbv Power BI."}),1==t.createContactsForReportTable&&r.createElement(z.Z,{label:"Email bij problemen vullen report tabel",value:t.emailReportTableProblems}),1==t.createContactsForReportTable&&r.createElement(z.Z,{label:"Datum laatste keer gevuld",value:t.createContactsForReportTableLastCreated?V()(t.createContactsForReportTableLastCreated).format("L"):""})))),r.createElement(o.Z,null,r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"E-mail opmaak")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Lettertype",value:t.fontFamilyDefault}),r.createElement(z.Z,{label:"Lettergrootte",value:t.fontSizeDefault})),r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Letterkleur",value:t.fontColorDefault}))),r.createElement(w.Z,null,r.createElement("span",{className:"h5 text-bold"},"Overig")),r.createElement(i.Z,null,r.createElement("div",{className:"row"},r.createElement(z.Z,{label:"Gebruik export energieverbruik tarieven en verbruik",value:t.useExportAddressConsumption?"Ja":"Nee",size:"col-sm-5",name:"useExportAddressConsumption",textToolTip:"Met deze knop krijg je de optie om op de Contacten pagina een download te maken van energie verbruik en tarief voorstellen.<br/>\nDeze tarieven kunnen voorals nog alleen via de API worden ingeschoten met waardes:<br/>\n{verbruik_gas_begindatum}<br/>\n{verbruik_gas_einddatum}<br/>\n{verbruik_gas_verbruik_m3}<br/>\n{verbruik_gas_voorgesteld_tarief_vast}<br/>\n{verbruik_gas_voorgesteld_tarief_variabel}<br/>\n{verbruik_gas_variabele_kosten}<br/>\n{verbruik_gas_vaste_kosten}<br/>\n<br/>\n{verbruik_electriciteit_begindatum}<br/>\n{verbruik_electriciteit_einddatum}<br/>\n{verbruik_electriciteit_verbruik_hoog}<br/>\n{verbruik_electriciteit_verbruik_laag}<br/>\n{verbruik_electriciteit_terug_hoog}<br/>\n{verbruik_electriciteit_terug_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_hoog<br/>\n{verbruik_electriciteit_voorgesteld_tarief_variabel_laag}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_hoog}<br/>\n{verbruik_electriciteit_voorgesteld_tarief_vast_laag}<br/>\n{verbruik_electriciteit_variabele_kosten_hoog}<br/>\n{verbruik_electriciteit_variabele_kosten_laag}<br/>\n{verbruik_electriciteit_vaste_kosten_hoog}<br/>\n{verbruik_electriciteit_vaste_kosten_laag}"})))))}));var Ee=a(49514);function fe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Ze(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?fe(Object(a),!0).forEach((function(t){(0,l.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):fe(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ke={result:{id:null,name:"",address:"",postalCode:"",city:"",kvkNumber:"",btwNumber:"",iban:"",ibanAttn:"",email:"",website:"",logoFilename:"",logoName:"",hoomLink:"",hoomConnectCoachLink:"",hoomKey:"",hoomCampaigns:{},hoomEmailTemplateId:"",hoomGroupId:"",useLaposta:!1,lapostaKey:"",useExportAddressConsumption:!1,requireTwoFactorAuthentication:!1,inspectionPlannedEmailTemplateId:"",inspectionRecordedEmailTemplateId:"",inspectionReleasedEmailTemplateId:"",inspectionPlannedMailboxId:"",createContactsForReportTable:!1,createContactsForReportTableLastCreated:"",emailReportTableProblems:"",createContactsForReportTableInProgress:!1,fontFamilyDefault:"",fontSizeDefault:"",fontColorDefault:""},isLoading:!0,showEdit:!1},Ce=function(e,t){switch(t.type){case"updateIsLoading":return Ze(Ze({},e),{},{isLoading:t.payload});case"updateResult":return Ze(Ze({},e),{},{result:t.payload});case"updateShowEdit":return Ze(Ze({},e),{},{showEdit:t.payload});default:return ke}};const we=(0,u.$j)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var t=e.permissions,a=(0,r.useReducer)(Ce,ke),l=(0,n.Z)(a,2),c=l[0],s=l[1];function m(e){s({type:"updateIsLoading",payload:e})}function u(e){s({type:"updateResult",payload:e})}function p(){s({type:"updateShowEdit",payload:!c.showEdit})}return(0,r.useEffect)((function(){t.manageCooperationSettings&&(m(!0),b().then((function(e){e.data&&e.data.data&&e.data.data.id&&u(e.data.data),m(!1)})).catch((function(e){alert("Er is iets misgegaan met het laden van de gegevens. Herlaad de pagina."),m(!1)})))}),[c.filter]),r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-9"},t.manageCooperationSettings?c.isLoading?"Laden...":r.createElement(r.Fragment,null,r.createElement("div",{className:"col-md-12 margin-10-top"},r.createElement(o.Z,null,r.createElement(i.Z,{className:"panel-small"},r.createElement(C,{formData:c.result})))),r.createElement("div",{className:"col-md-12 margin-10-top"},r.createElement(r.Fragment,null,c.showEdit&&t.manageCooperationSettings?r.createElement(ve,{formData:c.result,toggleEdit:p,updateResult:u}):r.createElement(he,{formData:c.result,toggleEdit:p})))):r.createElement(Ee.Z,null)),r.createElement("div",{className:"col-md-3"}))}))}}]);