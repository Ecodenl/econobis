"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[1036],{14956:(e,t,a)=>{a.d(t,{Z:()=>m});var n=a(29439),o=a(67294),r=a(45697),s=a.n(r),i=a(32574),l=a.n(i),c=a(30381),u=a.n(c),d=function(e){var t=e.label,a=e.size,r=e.id,s=e.name,i=e.value,c=e.onChangeAction,d=e.start,m=e.end,p=e.step,h=e.readOnly,f=e.nullable,g=e.nullableLabel,v=e.nullableSize,y=(0,o.useState)("00:00"==i),b=(0,n.Z)(y,2),C=b[0],E=b[1];return o.createElement("div",{className:"form-group col-sm-6"},o.createElement("label",{htmlFor:r,className:"col-sm-6"},t),o.createElement("div",{className:"".concat(a)},h||C?o.createElement("input",{name:s,value:i,className:"form-control input-sm",readOnly:!0,disabled:!0}):o.createElement(l(),{name:s,value:i,onChange:function(e){var t=u()("1900-01-01 00:00:00").add(e,"seconds").format("HH:mm");c(t,s)},start:d,end:m,step:p,format:24,className:"input-sm"})),f?o.createElement("div",{className:"".concat(v)},o.createElement("label",{className:"col-sm"},o.createElement("input",{type:"checkbox",name:"nullableChecked",value:!0,checked:C,onChange:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value;E(a),c(a?"00:00":"08:00",s)}})," ",g)):"")};d.defaultProps={className:"",size:"col-sm-6",value:"",start:"08:00",end:"23:00",step:15,readOnly:!1,nullable:!1,nullableLabel:"",nullableSize:"col-sm-3",nullableChecked:!1},d.propTypes={label:s().string.isRequired,id:s().string,name:s().string.isRequired,value:s().oneOfType([s().string,s().number]),onChangeAction:s().func,start:s().string,end:s().string,step:s().number,readOnly:s().bool,nullable:s().bool,nullableLabel:s().string,nullableSize:s().string,nullableChecked:s().bool};const m=d},71036:(e,t,a)=>{a.r(t),a.d(t,{default:()=>M});var n=a(15671),o=a(43144),r=a(60136),s=a(82963),i=a(61120),l=a(67294),c=a(29439),u=a(97326),d=a(4942),m=a(61409),p=a(30381),h=a.n(p),f=a(89038),g=a(71840),v=a(49332),y=a(9181),b=a(54138),C=a(85129),E=a(48966),R=a.n(E),A=a(14956),I=a(41355);function q(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Z(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?q(Object(a),!0).forEach((function(t){(0,d.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):q(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}h().locale("nl");const N=function(e){(0,r.Z)(h,e);var t,a,p=(t=h,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,i.Z)(t);if(a){var o=(0,i.Z)(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return(0,s.Z)(this,e)});function h(e){var t;return(0,n.Z)(this,h),t=p.call(this,e),(0,d.Z)((0,u.Z)(t),"handleInputChange",(function(e){var a,n=e.target,o="checkbox"===n.type?n.checked:n.value,r=n.name;if("statusId"===r&&"visit"===t.state.opportunityActionCodeRef&&o==t.state.visitDefaultStatusId)t.setState(Z(Z({},t.state),{},{quotationRequest:Z(Z({},t.state.quotationRequest),{},(a={},(0,d.Z)(a,r,o),(0,d.Z)(a,"datePlanned",""),(0,d.Z)(a,"timePlanned","08:00"),(0,d.Z)(a,"dateRecorded",""),(0,d.Z)(a,"timeRecorded","08:00"),a))}));else if("statusId"==r&&"visit"===t.state.opportunityActionCodeRef&&o==t.state.visitDoneStatusId){var s;t.setState(Z(Z({},t.state),{},{quotationRequest:Z(Z({},t.state.quotationRequest),{},(s={},(0,d.Z)(s,r,o),(0,d.Z)(s,"dateRecorded",t.state.quotationRequest.datePlanned),(0,d.Z)(s,"timeRecorded",t.state.quotationRequest.timePlanned),s))}))}else t.setState(Z(Z({},t.state),{},{quotationRequest:Z(Z({},t.state.quotationRequest),{},(0,d.Z)({},r,o))}))})),(0,d.Z)((0,u.Z)(t),"handleSubmit",(function(e){e.preventDefault();var a=t.state.quotationRequest,n={},o=!1;R().isEmpty(a.statusId+"")&&(n.status=!0,o=!0),t.setState(Z(Z({},t.state),{},{errors:n})),!o&&f.Z.newQuotationRequest(a).then((function(e){m.nA.push("/offerteverzoek/".concat(e.data.id))})).catch((function(e){if(e.response&&422===e.response.status){if(e.response.data&&e.response.data.errors)e.response.data.errors.econobis&&e.response.data.errors.econobis.length&&t.setState(Z(Z({},t.state),{},{errorMesssage:"Niet alle benodigde gegevens zijn ingevuld"}));else if(e.response.data&&e.response.data.message){for(var a=[],n=0,o=Object.entries(JSON.parse(e.response.data.message));n<o.length;n++){var r=(0,c.Z)(o[n],2),s=(r[0],r[1]);a.push("".concat(s))}t.setState(Z(Z({},t.state),{},{errorMesssage:a,showHoomdossierWarningModal:!0}))}}else t.setState(Z(Z({},t.state),{},{errorMesssage:"Er is iets misgegaan bij het aanmaken van het hoomdossier ("+(e.response&&e.response.status)+").",showHoomdossierWarningModal:!0}))}))})),(0,d.Z)((0,u.Z)(t),"closeHoomdossierWarningModal",(function(){t.setState({showHoomdossierWarningModal:!1}),m.nA.push("/kans/".concat(t.props.opportunityId))})),t.state={opportunityActionCodeRef:e.opportunityAction.codeRef,visitDefaultStatusId:null,visitMadeStatusId:null,visitDoneStatusId:null,visitCanceledStatusId:null,opportunity:{fullName:"",fullAddress:"",measureName:"",organisationsOrCoaches:[],projectManagers:[],externalParties:[]},quotationRequest:{opportunityId:"",organisationOrCoachId:"",projectManagerId:"",externalPartyId:"",statusId:"",opportunityActionId:e.opportunityAction.id,dateRecorded:"",timeRecorded:"",dateReleased:"",timeReleased:"",datePlanned:"",timePlanned:"",dateApprovedClient:"",dateApprovedProjectManager:"",dateApprovedExternal:"",quotationText:""},quotationRequestStatuses:[],errors:{organisationOrCoach:!1,projectManager:!1,externalParty:!1,status:!1},errorMessage:"",showHoomdossierWarningModal:!1},t.handleInputChangeDate=t.handleInputChangeDate.bind((0,u.Z)(t)),t}return(0,o.Z)(h,[{key:"componentWillMount",value:function(){var e=this;f.Z.fetchNewQuotationRequest(this.props.opportunityId,this.props.opportunityAction.id).then((function(t){e.setState({visitDefaultStatusId:"visit"===e.state.opportunityActionCodeRef?t.relatedQuotationRequestsStatuses.find((function(e){return"default"==e.codeRef})).id:null,visitMadeStatusId:"visit"===e.state.opportunityActionCodeRef?t.relatedQuotationRequestsStatuses.find((function(e){return"made"==e.codeRef})).id:null,visitDoneStatusId:"visit"===e.state.opportunityActionCodeRef?t.relatedQuotationRequestsStatuses.find((function(e){return"done"==e.codeRef})).id:null,visitCanceledStatusId:"visit"===e.state.opportunityActionCodeRef?t.relatedQuotationRequestsStatuses.find((function(e){return"cancelled"==e.codeRef})).id:null,opportunity:{fullName:t.intake.contact.fullName,fullAddress:t.intake.fullAddress,organisationsOrCoaches:t.intake&&t.intake.campaign?t.intake.campaign.organisationsOrCoaches:"",projectManagers:t.intake&&t.intake.campaign?t.intake.campaign.projectManagers:"",externalParties:t.intake&&t.intake.campaign?t.intake.campaign.externalParties:"",measureNames:t.measures&&t.measures.map((function(e){return e.name})).join(", "),measureCategoryName:t.measureCategory.name},quotationRequest:{opportunityId:t.id,organisationOrCoachId:"",projectManagerId:"",externalPartyId:"",statusId:t.defaultStatusId,opportunityActionId:e.props.opportunityAction.id,dateRecorded:"",timeRecorded:"",dateReleased:"",timeReleased:"",datePlanned:"",timePlanned:"",dateApprovedClient:"",dateApprovedProjectManager:"",dateApprovedExternal:"",quotationText:t.quotationText?t.quotationText:""},quotationRequestStatuses:t.relatedQuotationRequestsStatuses?t.relatedQuotationRequestsStatuses:[]})}))}},{key:"handleInputChangeDate",value:function(e,t){var a;"datePlanned"==t&&"visit"===this.state.opportunityActionCodeRef&&this.state.quotationRequest.statusId!=this.state.visitCanceledStatusId?this.setState(Z(Z({},this.state),{},{quotationRequest:Z(Z({},this.state.quotationRequest),{},(a={},(0,d.Z)(a,t,e),(0,d.Z)(a,"statusId",this.state.visitMadeStatusId),a))})):this.setState(Z(Z({},this.state),{},{quotationRequest:Z(Z({},this.state.quotationRequest),{},(0,d.Z)({},t,e))}))}},{key:"render",value:function(){var e=this.state.quotationRequest,t=e.organisationOrCoachId,a=e.projectManagerId,n=e.externalPartyId,o=e.statusId,r=e.dateRecorded,s=e.timeRecorded,i=e.dateReleased,c=e.timeReleased,u=e.datePlanned,d=e.timePlanned,m=e.dateApprovedClient,p=e.dateApprovedProjectManager,h=e.dateApprovedExternal,f=e.quotationText,E=this.state.opportunity,R=E.fullName,q=E.fullAddress,Z=E.organisationsOrCoaches,N=E.projectManagers,k=E.externalParties,O=E.measureNames,S=E.measureCategoryName;return l.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},"quotation-request"===this.props.opportunityAction.codeRef?l.createElement(l.Fragment,null,l.createElement("div",{className:"row"},l.createElement(g.Z,{label:"Organisatie/Coach",size:"col-sm-6",name:"organisationOrCoachId",value:t,options:Z,onChangeAction:this.handleInputChange,error:this.state.errors.organisation}),l.createElement(y.Z,{label:"Verzoek voor bewoner",name:"fullName",value:R,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(g.Z,{label:"Externe partij",size:"col-sm-6",name:"externalPartyId",value:n,options:k,onChangeAction:this.handleInputChange,error:this.state.errors.externalPartyId}),l.createElement(y.Z,{label:"Adres",name:"address",value:q,onChange:function(){},readOnly:!0}))):null,"visit"===this.props.opportunityAction.codeRef?l.createElement(l.Fragment,null,l.createElement("div",{className:"row"},l.createElement(g.Z,{label:"Organisatie/Coach",size:"col-sm-6",name:"organisationOrCoachId",value:t,options:Z,onChangeAction:this.handleInputChange,error:this.state.errors.organisation}),l.createElement(y.Z,{label:"Verzoek voor bewoner",name:"fullName",value:R,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(g.Z,{label:"Projectleider",size:"col-sm-6",name:"projectManagerId",value:a,options:N,onChangeAction:this.handleInputChange,error:this.state.errors.projectManagerId}),l.createElement(y.Z,{label:"Adres",name:"address",value:q,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(g.Z,{label:"Externe partij",size:"col-sm-6",name:"externalPartyId",value:n,options:k,onChangeAction:this.handleInputChange,error:this.state.errors.externalPartyId}))):null,"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement(l.Fragment,null,l.createElement("div",{className:"row"},l.createElement(g.Z,{label:"Projectleider",size:"col-sm-6",name:"projectManagerId",value:a,options:N,onChangeAction:this.handleInputChange,error:this.state.errors.projectManagerId}),l.createElement(y.Z,{label:"Verzoek voor bewoner",name:"fullName",value:R,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(g.Z,{label:"Externe partij",size:"col-sm-6",name:"externalPartyId",value:n,options:k,onChangeAction:this.handleInputChange,error:this.state.errors.externalPartyId}),l.createElement(y.Z,{label:"Adres",name:"address",value:q,onChange:function(){},readOnly:!0}))):null,l.createElement("div",{className:"row"},l.createElement(y.Z,{label:"Maatregel - categorie",name:"measureCategory",value:S,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(y.Z,{label:"Maatregel - specifiek",name:"measure",value:O,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(g.Z,{label:"Status",size:"col-sm-6",name:"statusId",value:o,options:this.state.quotationRequestStatuses,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.status})),l.createElement("div",{className:"row"},l.createElement(b.Z,{label:"Datum afspraak",size:"col-sm-6",name:"datePlanned",value:u,onChangeAction:this.handleInputChangeDate}),u?l.createElement(A.Z,{label:"Tijd afspraak",size:"col-sm-3",name:"timePlanned",value:d,start:"06:00",end:"23:00",onChangeAction:this.handleInputChangeDate,nullableSize:"col-sm-3",nullable:!0,nullableLabel:"Onbekend",nullableChecked:""}):null),"quotation-request"===this.props.opportunityAction.codeRef||"visit"===this.props.opportunityAction.codeRef?l.createElement("div",{className:"row"},l.createElement(b.Z,{label:"Datum opname",size:"col-sm-6",name:"dateRecorded",value:r,onChangeAction:this.handleInputChangeDate}),r?l.createElement(A.Z,{label:"Tijd opname",size:"col-sm-6",name:"timeRecorded",value:s,start:"06:00",end:"23:00",onChangeAction:this.handleInputChangeDate}):null):null,"quotation-request"===this.props.opportunityAction.codeRef||"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement("div",{className:"row"},l.createElement(b.Z,{label:"Datum uitgebracht",size:"col-sm-6",name:"dateReleased",value:i,onChangeAction:this.handleInputChangeDate}),i?l.createElement(A.Z,{label:"Tijd uitgebracht",size:"col-sm-6",name:"timeReleased",value:c,start:"06:00",end:"23:00",onChangeAction:this.handleInputChangeDate}):null):null,"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement("div",{className:"row"},l.createElement(b.Z,{label:"Datum akkoord bewoner",size:"col-sm-6",name:"dateApprovedClient",value:m,onChangeAction:this.handleInputChangeDate})):null,"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement("div",{className:"row"},l.createElement(b.Z,{label:"Datum akkoord projectleider",size:"col-sm-6",name:"dateApprovedProjectManager",value:p,onChangeAction:this.handleInputChangeDate})):null,"quotation-request"===this.props.opportunityAction.codeRef||"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement("div",{className:"row"},l.createElement(b.Z,{label:"Datum akkoord extern",size:"col-sm-6",name:"dateApprovedExternal",value:h,onChangeAction:this.handleInputChangeDate})):null,l.createElement("div",{className:"row"},l.createElement(C.Z,{label:"Omschrijving",name:"quotationText",value:f,onChangeAction:this.handleInputChange})),l.createElement("div",{className:"panel-footer"},l.createElement("div",{className:"pull-right btn-group",role:"group"},l.createElement(v.Z,{buttonText:"Opslaan",onClickAction:this.handleSubmit}))),this.state.showHoomdossierWarningModal&&l.createElement(I.Z,{buttonClassName:"btn-danger",closeModal:this.closeHoomdossierWarningModal,buttonCancelText:"Sluiten",showConfirmAction:!1,title:"Hoomdossier aanmaken"},l.createElement("p",null,"Kansactie is wel aangemaakt, maar er zijn meldingen vanuit Hoomdossier:"),this.state.errorMesssage.length?l.createElement("ul",null,this.state.errorMesssage.map((function(e){return l.createElement("li",null,e)}))):null))}}]),h}(l.Component);var k=a(14309),O=a(98688);const S=function(e){return l.createElement("div",null,l.createElement(k.Z,null,l.createElement(O.Z,null,l.createElement(N,{opportunityId:e.opportunityId,opportunityAction:e.opportunityAction}))))};var P=a(55451);const j=function(e){return l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-4"},l.createElement("div",{className:"btn-group",role:"group"},l.createElement(P.Z,{iconName:"arrowLeft",onClickAction:m.mW.goBack}))),l.createElement("div",{className:"col-md-4"},l.createElement("h4",{className:"text-center"},"Nieuw ",e.opportunityAction?e.opportunityAction.name:"actie")),l.createElement("div",{className:"col-md-4"}))};var w=a(86706);var x=function(e){(0,r.Z)(u,e);var t,a,c=(t=u,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,i.Z)(t);if(a){var o=(0,i.Z)(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return(0,s.Z)(this,e)});function u(e){var t;(0,n.Z)(this,u),t=c.call(this,e);var a=e.opportunityActions.find((function(t){return t.id==e.params.opportunityActionId}));return t.state={opportunityAction:a},t}return(0,o.Z)(u,[{key:"render",value:function(){return l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-9"},l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(j,{opportunityAction:this.state.opportunityAction})),l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(S,{opportunityId:this.props.params.opportunityId,opportunityAction:this.state.opportunityAction}))),l.createElement("div",{className:"col-md-3"}))}}]),u}(l.Component);const M=(0,w.$j)((function(e){return{opportunityActions:e.systemData.opportunityActions}}),null)(x)}}]);