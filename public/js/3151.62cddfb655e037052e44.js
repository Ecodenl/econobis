"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[3151],{75254:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(69265),c="".concat(URL_API,"/api");const r={getCoachPeek:function(){var e="".concat(c,"/coach-peek");return n.Z.get(e).then((function(e){return e.data.data})).catch((function(e){console.log(e)}))},getProjectManagerPeek:function(){var e="".concat(c,"/project-manager-peek");return n.Z.get(e).then((function(e){return e.data.data})).catch((function(e){console.log(e)}))},getExternalPartyPeek:function(){var e="".concat(c,"/external-party-peek");return n.Z.get(e).then((function(e){return e.data.data})).catch((function(e){console.log(e)}))}}},97809:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(69265),c="district";const r={fetchDistricts:function(){return n.Z.get(c).then((function(e){return e.data}))},fetchDistrictDetails:function(e){return n.Z.get("".concat(c,"/").concat(e)).then((function(e){return e.data}))},fetchDistrictCalendarItems:function(e,t,a){return n.Z.get("".concat(c,"/").concat(e,"/calendar-items"),{params:{startDate:t,endDate:a}}).then((function(e){return e.data}))},newDistrict:function(e){return n.Z.post(c,e).then((function(e){return e.data}))},updateDistrict:function(e){return n.Z.post("".concat(c,"/").concat(e.id),e)},deleteDistrict:function(e){return n.Z.post("".concat(c,"/").concat(e.id,"/delete"))},detachDistrictCoach:function(e){var t=e.districtId,a=e.coachId;return n.Z.post("".concat(c,"/").concat(t,"/coaches/").concat(a,"/detach"))},attachDistrictCoach:function(e){var t=e.districtId,a=e.coachId;return n.Z.post("".concat(c,"/").concat(t,"/coaches/").concat(a,"/attach"))}}},33151:(e,t,a)=>{a.r(t),a.d(t,{default:()=>A});var n=a(29439),c=a(67294),r=a(14309),l=a(98688),o=a(55451),i=a(61409),s=a(97809),m=a(14816);function u(e){var t=e.district,a=e.switchToView,n=e.onSave;return c.createElement(m.Z,{initialValues:t,onSubmit:function(e,t){var c=t.setSubmitting;s.Z.updateDistrict(e).then((function(){n(),a()})).catch((function(){c(!1),alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))},cancelAction:a})}var d=a(7250);function h(e){var t,a,n=e.district,o=e.switchToEdit;return c.createElement("div",{onClick:o},c.createElement(r.Z,null,c.createElement(l.Z,null,c.createElement("div",{className:"row"},c.createElement(d.Z,{label:"Weergavenaam",value:n.name}),c.createElement(d.Z,{label:"Standaard duur afspraak",value:n.defaultDurationMinutes+" minuten"})),c.createElement("div",{className:"row"},c.createElement(d.Z,{label:"Verstuur automatisch e-mail aan bewoner bij maken afspraak",value:n.sendEmailToContactWhenPlanned?"Ja":"Nee",textToolTip:"Deze e-mails worden verstuurd vanaf het primaire e-mail adres."}),c.createElement(d.Z,{label:"E-mail template",value:null===(t=n.emailToContactTemplate)||void 0===t?void 0:t.name})),c.createElement("div",{className:"row"},c.createElement(d.Z,{label:"Verstuur automatisch e-mail aan coach bij maken afspraak",value:n.sendEmailToCoachWhenPlanned?"Ja":"Nee",textToolTip:"Deze e-mails worden verstuurd vanaf het primaire e-mail adres."}),c.createElement(d.Z,{label:"E-mail template",value:null===(a=n.emailToCoachTemplate)||void 0===a?void 0:a.name})),c.createElement("div",{className:"row"},c.createElement(d.Z,{label:"Status",value:n.closed?"Gesloten":"Open"})))))}function f(e){var t=e.district,a=e.onSave,r=(0,c.useState)(""),l=(0,n.Z)(r,2),o=l[0],i=l[1],s=(0,c.useState)(!1),m=(0,n.Z)(s,2),d=m[0],f=m[1];return c.createElement("div",{className:o,onMouseEnter:function(){return i("panel-grey")},onMouseLeave:function(){return i("")}},d?c.createElement(u,{district:t,switchToView:function(){return f(!1)},onSave:a}):c.createElement(h,{district:t,switchToEdit:function(){return f(!0)}}))}var E=a(80720),v=a(41355),p=a(97894),g=a(77320);function Z(e){var t=e.district,a=e.coach,r=e.onDetach,l=(0,c.useState)(!1),o=(0,n.Z)(l,2),i=o[0],m=o[1],u=(0,c.useState)(!1),d=(0,n.Z)(u,2),h=d[0],f=d[1];return c.createElement(c.Fragment,null,c.createElement("div",{className:"row border ".concat(i?"highlight-line":""),onMouseEnter:function(){return m(!0)},onMouseLeave:function(){return m(!1)}},c.createElement("div",{className:"col-sm-11"},a.fullName),c.createElement("div",{className:"col-sm-1"},i&&c.createElement("a",{role:"button",onClick:function(){return f(!0)}},c.createElement(p.ZP,{className:"mybtn-danger",size:14,icon:g._})))),h&&c.createElement(v.Z,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:function(){return f(!1)},confirmAction:function(){s.Z.detachDistrictCoach({districtId:t.id,coachId:a.id}).then((function(){r(),f(!1)})).catch((function(){alert("Er is iets misgegaan met het ontkoppelen van de coach.")}))},title:"Verwijderen"},c.createElement("p",null,"Wil je deze coach ontkoppelen van deze afspraakkalender?")))}var b=a(9181),k=a(49332),C=a(71840),N=a(75254);function T(e){var t=e.district,a=e.onCreate,o=e.onHide,i=(0,c.useState)([]),m=(0,n.Z)(i,2),u=m[0],d=m[1],h=(0,c.useState)(null),f=(0,n.Z)(h,2),E=f[0],v=f[1];(0,c.useEffect)((function(){N.Z.getCoachPeek().then((function(e){d(e)})).catch((function(){alert("Er is iets misgegaan met ophalen van de coaches! Herlaad de pagina en probeer het nogmaals.")}))}),[]);var p=function(e){e.preventDefault(),s.Z.attachDistrictCoach({districtId:t.id,coachId:E}).then((function(){a()})).catch((function(){alert("Er is iets misgegaan met het koppelen van de coach.")}))};return c.createElement("form",{className:"form-horizontal",onSubmit:p},c.createElement(r.Z,{className:"panel-grey"},c.createElement(l.Z,null,c.createElement("div",{className:"row"},c.createElement(b.Z,{label:"Afspraakkalender",name:"afspraakKalender",value:t.name,readOnly:!0}),c.createElement(C.Z,{label:"Coach",size:"col-sm-6",name:"coachId",options:u.filter((function(e){return!t.coaches.some((function(t){return t.id===e.id}))})),optionName:"name",value:E,onChangeAction:function(e){return v(e.target.value)},required:"required"})),c.createElement("div",{className:"pull-right btn-group",role:"group"},c.createElement(k.Z,{buttonClassName:"btn-default",buttonText:"Annuleren",onClickAction:o}),c.createElement(k.Z,{buttonText:"Opslaan",onClickAction:p,type:"submit",value:"Submit"})))))}var w=a(10055);function D(e){var t=e.district,a=e.onChange,o=(0,c.useState)(!1),i=(0,n.Z)(o,2),s=i[0],m=i[1];return c.createElement(r.Z,null,c.createElement(E.Z,null,c.createElement("span",{className:"h5 text-bold"},"Gekoppelde coaches"),c.createElement("a",{role:"button",className:"pull-right",onClick:function(){return m(!0)}},c.createElement(p.ZP,{size:14,icon:w.P}))),c.createElement(l.Z,null,c.createElement("div",{className:"col-md-12"},c.createElement("div",{className:"row border header"},c.createElement("div",{className:"col-sm-11"},"Naam"),c.createElement("div",{className:"col-sm-1"})),t.coaches.length>0?t.coaches.map((function(e){return c.createElement(Z,{key:e.id,district:t,coach:e,onDetach:a})})):c.createElement("div",null,"Geen coaches bekend.")),c.createElement("div",{className:"col-md-12 margin-10-top"},s&&c.createElement(T,{district:t,onCreate:function(){m(!1),a()},onHide:function(){return m(!1)}}))))}function S(e){var t=e.district,a=e.onDelete,n=e.showDeleteModal,r=e.setShowDeleteModal;return c.createElement(c.Fragment,null,c.createElement(o.Z,{iconName:"trash",onClickAction:function(){return r(!0)}}),n&&c.createElement(v.Z,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:function(){return r(!1)},confirmAction:function(){s.Z.deleteDistrict(t).then((function(){r(!1),a()})).catch((function(){alert("Er is iets misgegaan met het verwijderen van de afspraakkalender.")}))},title:"Verwijderen"},"Verwijder afspraakkalender: ",c.createElement("strong",null," ",t.name," ")))}function A(e){var t=(0,c.useState)({coaches:[]}),a=(0,n.Z)(t,2),m=a[0],u=a[1],d=(0,c.useState)(!1),h=(0,n.Z)(d,2),E=h[0],v=h[1];(0,c.useEffect)((function(){p()}),[]);var p=function(){s.Z.fetchDistrictDetails(e.params.id).then((function(e){u(e)})).catch((function(){alert("Er is iets misgegaan met ophalen van de afspraakkalender.")}))};return c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-9"},c.createElement("div",{className:"col-md-12 margin-10-top"},c.createElement(r.Z,null,c.createElement(l.Z,{className:"panel-small"},c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-4"},c.createElement("div",{className:"btn-group",role:"group"},c.createElement(o.Z,{iconName:"arrowLeft",onClickAction:i.mW.goBack}),c.createElement(S,{district:m,onDelete:i.mW.goBack,setShowDeleteModal:v,showDeleteModal:E}),"                                    ")),c.createElement("div",{className:"col-md-4"},c.createElement("h4",{className:"text-center"},"Instellingen Afspraakkalender: ",m.name)),c.createElement("div",{className:"col-md-4"}))))),c.createElement("div",{className:"col-md-12 margin-10-top"},c.createElement(f,{district:m,onSave:p}),c.createElement(D,{district:m,onChange:p}))),c.createElement("div",{className:"col-md-3"}))}},14816:(e,t,a)=>{a.d(t,{Z:()=>f});var n=a(29439),c=a(67294),r=a(14309),l=a(98688),o=a(9181),i=a(62265),s=a(19501),m=a(49332),u=a(71840),d=a(21606),h=a(19789);function f(e){for(var t=e.initialValues,a=e.onSubmit,f=e.cancelAction,E=c.useState([]),v=(0,n.Z)(E,2),p=v[0],g=v[1],Z=(0,i.TA)({initialValues:t,validationSchema:s.Ry().shape({name:s.Z_().required("Verplicht")}),onSubmit:function(e,t){var n=t.setSubmitting;a(e,n)}}),b=Z.values,k=Z.errors,C=Z.touched,N=Z.handleChange,T=Z.handleSubmit,w=Z.handleBlur,D=Z.isSubmitting,S=Z.setFieldValue,A=[],P=30;P<=180;P+=15)A.push({id:P,name:P+" minuten"});return(0,c.useEffect)((function(){h.Z.fetchEmailTemplatesPeek().then((function(e){g(e)}))}),[]),c.createElement("form",{className:"form-horizontal",onSubmit:T},c.createElement(r.Z,null,c.createElement(l.Z,null,c.createElement("div",{className:"row"},c.createElement(o.Z,{label:"Weergavenaam",name:"name",value:b.name,onChangeAction:N,onBlurAction:w,required:"required",error:k.name&&C.name,errorMessage:k.name}),c.createElement(u.Z,{label:"Standaard duur afspraak",name:"defaultDurationMinutes",value:b.defaultDurationMinutes,options:A,onChangeAction:N,emptyOption:!1})),c.createElement("div",{className:"row"},c.createElement(d.Z,{label:"Verstuur automatisch e-mail aan bewoner bij maken afspraak",name:"sendEmailToContactWhenPlanned",value:b.sendEmailToContactWhenPlanned,onChangeAction:function(e){e.persist(),S(e.target.name,e.target.checked)},size:"col-sm-5",textToolTip:"Deze e-mails worden verstuurd vanaf het primaire e-mail adres."}),b.sendEmailToContactWhenPlanned&&c.createElement(u.Z,{label:"E-mail template",name:"emailToContactTemplateId",value:b.emailToContactTemplateId,options:p,onChangeAction:N})),c.createElement("div",{className:"row"},c.createElement(d.Z,{label:"Verstuur automatisch e-mail aan coach bij maken afspraak",name:"sendEmailToCoachWhenPlanned",value:b.sendEmailToCoachWhenPlanned,onChangeAction:function(e){e.persist(),S(e.target.name,e.target.checked)},size:"col-sm-5",textToolTip:"Deze e-mails worden verstuurd vanaf het primaire e-mail adres."}),b.sendEmailToCoachWhenPlanned&&c.createElement(u.Z,{label:"E-mail template",name:"emailToCoachTemplateId",value:b.emailToCoachTemplateId,options:p,onChangeAction:N})),c.createElement("div",{className:"row"},c.createElement(d.Z,{label:"Gesloten",name:"closed",value:b.closed,onChangeAction:function(e){e.persist(),S(e.target.name,e.target.checked)}}))),c.createElement(l.Z,null,c.createElement("div",{className:"pull-right btn-group",role:"group"},f&&c.createElement(m.Z,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:f}),c.createElement(m.Z,{buttonText:"Opslaan",onClickAction:T,type:"submit",value:"Submit",loading:D})))))}}}]);