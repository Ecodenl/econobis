"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[7142],{29527:(e,t,a)=>{a.d(t,{A:()=>l});var n=a(61941),c="district";const l={fetchDistricts:function(){return n.A.get(c).then((function(e){return e.data}))},fetchDistrictDetails:function(e){return n.A.get("".concat(c,"/").concat(e)).then((function(e){return e.data}))},fetchDistrictCalendarItems:function(e,t,a){return n.A.get("".concat(c,"/").concat(e,"/calendar-items"),{params:{startDate:t,endDate:a}}).then((function(e){return e.data}))},newDistrict:function(e){return n.A.post(c,e).then((function(e){return e.data}))},updateDistrict:function(e){return n.A.post("".concat(c,"/").concat(e.id),e)},deleteDistrict:function(e){return n.A.post("".concat(c,"/").concat(e.id,"/delete"))},detachDistrictCoach:function(e){var t=e.districtId,a=e.coachId;return n.A.post("".concat(c,"/").concat(t,"/coaches/").concat(a,"/detach"))},attachDistrictCoach:function(e){var t=e.districtId,a=e.coachId;return n.A.post("".concat(c,"/").concat(t,"/coaches/").concat(a,"/attach"))}}},29758:(e,t,a)=>{a.d(t,{A:()=>p});var n=a(5544),c=a(96540),l=a(62493),i=a(55849),r=a(54814),o=a(98758),m=a(15941),s=a(55956),u=a(14809),d=a(77465),h=a(6438);function p(e){for(var t=e.initialValues,a=e.onSubmit,p=e.cancelAction,f=c.useState([]),E=(0,n.A)(f,2),A=E[0],g=E[1],v=(0,o.Wx)({initialValues:t,validationSchema:m.Ik().shape({name:m.Yj().required("Verplicht")}),onSubmit:function(e,t){var n=t.setSubmitting;a(e,n)}}),b=v.values,C=v.errors,T=v.touched,k=v.handleChange,N=v.handleSubmit,D=v.handleBlur,w=v.isSubmitting,S=v.setFieldValue,I=[],P=30;P<=180;P+=15)I.push({id:P,name:P+" minuten"});return(0,c.useEffect)((function(){h.A.fetchEmailTemplatesPeek().then((function(e){g(e)}))}),[]),c.createElement("form",{className:"form-horizontal",onSubmit:N},c.createElement(l.A,null,c.createElement(i.A,null,c.createElement("div",{className:"row"},c.createElement(r.A,{label:"Weergavenaam",name:"name",value:b.name,onChangeAction:k,onBlurAction:D,required:"required",error:C.name&&T.name,errorMessage:C.name}),c.createElement(u.A,{label:"Standaard duur afspraak",name:"defaultDurationMinutes",value:b.defaultDurationMinutes,options:I,onChangeAction:k,emptyOption:!1})),c.createElement("div",{className:"row"},c.createElement(d.A,{label:"Verstuur automatisch e-mail aan bewoner bij maken afspraak",name:"sendEmailToContactWhenPlanned",value:b.sendEmailToContactWhenPlanned,onChangeAction:function(e){e.persist(),S(e.target.name,e.target.checked)},size:"col-sm-5",textToolTip:"Deze e-mails worden verstuurd vanaf het primaire e-mail adres."}),b.sendEmailToContactWhenPlanned&&c.createElement(u.A,{label:"E-mail template",name:"emailToContactTemplateId",value:b.emailToContactTemplateId,options:A,onChangeAction:k})),c.createElement("div",{className:"row"},c.createElement(d.A,{label:"Verstuur automatisch e-mail aan coach bij maken afspraak",name:"sendEmailToCoachWhenPlanned",value:b.sendEmailToCoachWhenPlanned,onChangeAction:function(e){e.persist(),S(e.target.name,e.target.checked)},size:"col-sm-5",textToolTip:"Deze e-mails worden verstuurd vanaf het primaire e-mail adres."}),b.sendEmailToCoachWhenPlanned&&c.createElement(u.A,{label:"E-mail template",name:"emailToCoachTemplateId",value:b.emailToCoachTemplateId,options:A,onChangeAction:k})),c.createElement("div",{className:"row"},c.createElement(d.A,{label:"Gesloten",name:"closed",value:b.closed,onChangeAction:function(e){e.persist(),S(e.target.name,e.target.checked)}}))),c.createElement(i.A,null,c.createElement("div",{className:"pull-right btn-group",role:"group"},p&&c.createElement(s.A,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:p}),c.createElement(s.A,{buttonText:"Opslaan",onClickAction:N,type:"submit",value:"Submit",loading:w})))))}},47142:(e,t,a)=>{a.r(t),a.d(t,{default:()=>s});var n=a(96540),c=a(62493),l=a(55849),i=a(91858),r=a(24179),o=a(29527),m=a(29758);function s(){return n.createElement("div",{className:"row"},n.createElement("div",{className:"col-md-9"},n.createElement("div",{className:"col-md-12 margin-10-top"},n.createElement(c.A,null,n.createElement(l.A,{className:"panel-small"},n.createElement("div",{className:"row"},n.createElement("div",{className:"col-md-4"},n.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},n.createElement(i.A,{iconName:"arrowLeft",onClickAction:r.Nc.goBack}))),n.createElement("div",{className:"col-md-4"},n.createElement("h4",{className:"text-center margin-small"},"Nieuwe Afspraakkalender")),n.createElement("div",{className:"col-md-4"}))))),n.createElement("div",{className:"col-md-12 margin-10-top"},n.createElement(m.A,{initialValues:{defaultDurationMinutes:90,sendEmailToContactWhenPlanned:!1,sendEmailToCoachWhenPlanned:!1,closed:!1},onSubmit:function(e,t){var a=t.setSubmitting;o.A.newDistrict(e).then((function(e){r.RL.push("/afspraak-kalender/".concat(e.id))})).catch((function(){a(!1),alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))}}))))}}}]);