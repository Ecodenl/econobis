"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[3496],{97716:(e,t,a)=>{a.d(t,{A:()=>m});var n=a(5544),o=a(96540),s=a(5556),r=a.n(s),i=a(60801),l=a.n(i),u=a(95093),c=a.n(u),d=function(e){var t=e.label,a=e.size,s=e.id,r=e.name,i=e.value,u=e.onChangeAction,d=e.start,m=e.end,p=e.step,h=e.readOnly,A=e.nullable,g=e.nullableLabel,v=e.nullableSize,f=(0,o.useState)("00:00"==i),b=(0,n.A)(f,2),y=b[0],C=b[1];return o.createElement("div",{className:"form-group col-sm-6"},o.createElement("label",{htmlFor:s,className:"col-sm-6"},t),o.createElement("div",{className:"".concat(a)},h||y?o.createElement("input",{name:r,value:i,className:"form-control input-sm",readOnly:!0,disabled:!0}):o.createElement(l(),{name:r,value:i,onChange:function(e){var t=c()("1900-01-01 00:00:00").add(e,"seconds").format("HH:mm");u(t,r)},start:d,end:m,step:p,format:24,className:"input-sm"})),A?o.createElement("div",{className:"".concat(v)},o.createElement("label",{className:"col-sm"},o.createElement("input",{type:"checkbox",name:"nullableChecked",value:!0,checked:y,onChange:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value;C(a),u(a?"00:00":"08:00",r)},disabled:h})," ",g)):"")};d.defaultProps={className:"",size:"col-sm-6",value:"",start:"08:00",end:"23:00",step:15,readOnly:!1,nullable:!1,nullableLabel:"",nullableSize:"col-sm-3",nullableChecked:!1},d.propTypes={label:r().string.isRequired,id:r().string,name:r().string.isRequired,value:r().oneOfType([r().string,r().number]),onChangeAction:r().func,start:r().string,end:r().string,step:r().number,readOnly:r().bool,nullable:r().bool,nullableLabel:r().string,nullableSize:r().string,nullableChecked:r().bool};const m=d},13496:(e,t,a)=>{a.r(t),a.d(t,{default:()=>L});var n=a(23029),o=a(92901),s=a(56822),r=a(53954),i=a(85501),l=a(96540),u=a(5544),c=a(64467),d=a(24179),m=a(95093),p=a.n(m),h=a(89686),A=a(14809),g=a(55956),v=a(54814),f=a(73421),b=a(33579),y=a(57761),C=a.n(y),E=a(97716),R=a(63750),q=a(30483);function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function N(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(Object(a),!0).forEach((function(t){(0,c.A)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function k(e,t,a){return t=(0,r.A)(t),(0,s.A)(e,w()?Reflect.construct(t,a||[],(0,r.A)(e).constructor):t.apply(e,a))}function w(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(w=function(){return!!e})()}p().locale("nl");const O=function(e){function t(e){var a;return(0,n.A)(this,t),a=k(this,t,[e]),(0,c.A)(a,"handleInputChange",(function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,o=t.name;"statusId"===o&&"visit"===a.state.opportunityActionCodeRef&&n==a.state.visitDefaultStatusId?a.setState(N(N({},a.state),{},{quotationRequest:N(N({},a.state.quotationRequest),{},(0,c.A)((0,c.A)((0,c.A)((0,c.A)((0,c.A)({},o,n),"datePlanned",""),"timePlanned","08:00"),"dateRecorded",""),"timeRecorded","08:00"))})):"statusId"==o&&"visit"===a.state.opportunityActionCodeRef&&n==a.state.visitDoneStatusId?a.setState(N(N({},a.state),{},{quotationRequest:N(N({},a.state.quotationRequest),{},(0,c.A)((0,c.A)((0,c.A)({},o,n),"dateRecorded",a.state.quotationRequest.datePlanned),"timeRecorded",a.state.quotationRequest.timePlanned))})):a.setState(N(N({},a.state),{},{quotationRequest:N(N({},a.state.quotationRequest),{},(0,c.A)({},o,n))}))})),(0,c.A)(a,"handleSubmit",(function(e){e.preventDefault();var t=a.state.quotationRequest,n={},o=!1;C().isEmpty(t.statusId+"")&&(n.status=!0,o=!0),isNaN(t.quotationAmount)?t.quotationAmount=t.quotationAmount.replace(/,/g,"."):t.quotationAmount=t.quotationAmount+"",isNaN(t.costAdjustment)?t.costAdjustment=t.costAdjustment.replace(/,/g,"."):t.costAdjustment=t.costAdjustment+"",isNaN(t.awardAmount)?t.awardAmount=t.awardAmount.replace(/,/g,"."):t.awardAmount=t.awardAmount+"",a.setState(N(N({},a.state),{},{errors:n})),!o&&h.A.newQuotationRequest(t).then((function(e){d.RL.push("/offerteverzoek/".concat(e.data.id))})).catch((function(e){if(e.response&&422===e.response.status){if(e.response.data&&e.response.data.errors)e.response.data.errors.econobis&&e.response.data.errors.econobis.length&&a.setState(N(N({},a.state),{},{errorMesssage:"Niet alle benodigde gegevens zijn ingevuld"}));else if(e.response.data&&e.response.data.message){for(var t=[],n=0,o=Object.entries(JSON.parse(e.response.data.message));n<o.length;n++){var s=(0,u.A)(o[n],2),r=(s[0],s[1]);t.push("".concat(r))}a.setState(N(N({},a.state),{},{errorMesssage:t,showHoomdossierWarningModal:!0}))}}else a.setState(N(N({},a.state),{},{errorMesssage:"Er is iets misgegaan bij het aanmaken van het hoomdossier ("+(e.response&&e.response.status)+").",showHoomdossierWarningModal:!0}))}))})),(0,c.A)(a,"closeHoomdossierWarningModal",(function(){a.setState({showHoomdossierWarningModal:!1}),d.RL.push("/kans/".concat(a.props.opportunityId))})),a.state={opportunityActionCodeRef:e.opportunityAction.codeRef,visitDefaultStatusId:null,visitMadeStatusId:null,visitDoneStatusId:null,visitCanceledStatusId:null,opportunity:{fullName:"",fullAddress:"",opportunityNumber:"",measureName:"",organisationsOrCoaches:[],projectManagers:[],externalParties:[]},quotationRequest:{opportunityId:"",organisationOrCoachId:"",projectManagerId:"",externalPartyId:"",statusId:"",opportunityActionId:e.opportunityAction.id,dateRecorded:"",timeRecorded:"",dateReleased:"",timeReleased:"",datePlannedAttempt1:"",datePlanned:"",timePlanned:"",dateApprovedClient:"",dateApprovedProjectManager:"",dateApprovedExternal:"",quotationText:"",quotationAmount:"",costAdjustment:"",awardAmount:""},quotationRequestStatuses:[],errors:{organisationOrCoach:!1,projectManager:!1,externalParty:!1,status:!1},errorMessage:"",showHoomdossierWarningModal:!1},a.handleInputChangeDate=a.handleInputChangeDate.bind(a),a}return(0,i.A)(t,e),(0,o.A)(t,[{key:"componentWillMount",value:function(){var e=this;h.A.fetchNewQuotationRequest(this.props.opportunityId,this.props.opportunityAction.id).then((function(t){e.setState({visitDefaultStatusId:"visit"===e.state.opportunityActionCodeRef?t.relatedQuotationRequestsStatuses.find((function(e){return"default"==e.codeRef})).id:null,visitMadeStatusId:"visit"===e.state.opportunityActionCodeRef?t.relatedQuotationRequestsStatuses.find((function(e){return"made"==e.codeRef})).id:null,visitDoneStatusId:"visit"===e.state.opportunityActionCodeRef?t.relatedQuotationRequestsStatuses.find((function(e){return"done"==e.codeRef})).id:null,visitCanceledStatusId:"visit"===e.state.opportunityActionCodeRef?t.relatedQuotationRequestsStatuses.find((function(e){return"cancelled"==e.codeRef})).id:null,opportunity:{fullName:t.intake.contact.fullName,fullAddress:t.intake.fullAddress,opportunityNumber:t.number,organisationsOrCoaches:t.intake&&t.intake.campaign?t.intake.campaign.organisationsOrCoaches:"",projectManagers:t.intake&&t.intake.campaign?t.intake.campaign.projectManagers:"",externalParties:t.intake&&t.intake.campaign?t.intake.campaign.externalParties:"",measureNames:t.measures&&t.measures.map((function(e){return e.name})).join(", "),measureCategoryName:t.measureCategory.name},quotationRequest:{opportunityId:t.id,organisationOrCoachId:"",projectManagerId:"",externalPartyId:"",statusId:t.defaultStatusId,opportunityActionId:e.props.opportunityAction.id,dateRecorded:"",timeRecorded:"08:00",dateReleased:"",timeReleased:"08:00",datePlannedAttempt1:"",datePlanned:"",timePlanned:"08:00",dateApprovedClient:"",dateApprovedProjectManager:"",dateApprovedExternal:"",dateUnderReview:"",dateExecuted:"",quotationText:t.quotationText?t.quotationText:"",quotationAmount:"",costAdjustment:"",awardAmount:""},quotationRequestStatuses:t.relatedQuotationRequestsStatuses?t.relatedQuotationRequestsStatuses:[]})}))}},{key:"handleInputChangeDate",value:function(e,t){"datePlanned"==t&&"visit"===this.state.opportunityActionCodeRef&&this.state.quotationRequest.statusId!=this.state.visitCanceledStatusId?this.setState(N(N({},this.state),{},{quotationRequest:N(N({},this.state.quotationRequest),{},(0,c.A)((0,c.A)({},t,e),"statusId",this.state.visitMadeStatusId))})):this.setState(N(N({},this.state),{},{quotationRequest:N(N({},this.state.quotationRequest),{},(0,c.A)({},t,e))}))}},{key:"render",value:function(){var e=this.state.quotationRequest,t=e.organisationOrCoachId,a=e.projectManagerId,n=e.externalPartyId,o=e.statusId,s=e.dateRecorded,r=e.timeRecorded,i=e.dateReleased,u=e.timeReleased,c=e.datePlannedAttempt1,d=e.datePlanned,m=e.timePlanned,p=e.dateApprovedClient,h=e.dateApprovedProjectManager,y=e.dateApprovedExternal,C=e.dateUnderReview,I=e.dateExecuted,N=e.quotationText,k=e.quotationAmount,w=e.costAdjustment,O=e.awardAmount,S=this.state.opportunity,j=S.fullName,P=S.fullAddress,D=S.opportunityNumber,M=S.organisationsOrCoaches,z=S.projectManagers,x=S.externalParties,T=S.measureNames,H=S.measureCategoryName;return l.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},l.createElement("div",{className:"row"},l.createElement(A.A,{label:"Organisatie/Coach",size:"col-sm-6",name:"organisationOrCoachId",value:t,options:M,onChangeAction:this.handleInputChange,error:this.state.errors.organisation}),l.createElement(v.A,{label:"Verzoek voor bewoner",name:"fullName",value:j,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(A.A,{label:"Projectleider",size:"col-sm-6",name:"projectManagerId",value:a,options:z,onChangeAction:this.handleInputChange,error:this.state.errors.projectManagerId}),l.createElement(v.A,{label:"Adres",name:"address",value:P,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(A.A,{label:"Externe partij",size:"col-sm-6",name:"externalPartyId",value:n,options:x,onChangeAction:this.handleInputChange,error:this.state.errors.externalPartyId}),l.createElement(q.A,{label:"Kansnummer",id:"opportunityNumber",className:"col-sm-6 form-group",value:D})),l.createElement("div",{className:"row"},l.createElement(v.A,{label:"Maatregel - categorie",name:"measureCategory",value:H,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(v.A,{label:"Maatregel - specifiek",name:"measure",value:T,onChange:function(){},readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(A.A,{label:"Status",size:"col-sm-6",name:"statusId",value:o,options:this.state.quotationRequestStatuses,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.status})),l.createElement("div",{className:"row"},l.createElement(b.A,{label:"Omschrijving",name:"quotationText",value:N,onChangeAction:this.handleInputChange})),"visit"===this.props.opportunityAction.codeRef||"redirection"===this.props.opportunityAction.codeRef?l.createElement("div",{className:"row"},l.createElement(f.A,{label:"Datum afspraakpoging 1",size:"col-sm-6",name:"datePlannedAttempt1",value:c,onChangeAction:this.handleInputChangeDate})):null,"visit"===this.props.opportunityAction.codeRef||"quotation-request"===this.props.opportunityAction.codeRef||"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement(l.Fragment,null,l.createElement("div",{className:"row"},l.createElement(f.A,{label:"Datum afspraak",size:"col-sm-6",name:"datePlanned",value:d,onChangeAction:this.handleInputChangeDate}),d?l.createElement(E.A,{label:"Tijd afspraak",size:"col-sm-3",name:"timePlanned",value:m,start:"06:00",end:"23:00",onChangeAction:this.handleInputChangeDate,nullableSize:"col-sm-3",nullable:!0,nullableLabel:"Onbekend",nullableChecked:!0}):null),l.createElement("div",{className:"row"},l.createElement(f.A,{label:"Afspraak gedaan op",size:"col-sm-6",name:"dateRecorded",value:s,onChangeAction:this.handleInputChangeDate}),s?l.createElement(E.A,{label:"Tijd opname",size:"col-sm-3",name:"timeRecorded",value:r,start:"06:00",end:"23:00",onChangeAction:this.handleInputChangeDate,nullableSize:"col-sm-3",nullable:!0,nullableLabel:"Onbekend",nullableChecked:!0}):null)):null,"quotation-request"===this.props.opportunityAction.codeRef||"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement(l.Fragment,null,l.createElement("div",{className:"row"},l.createElement(f.A,{label:"Datum uitgebracht",size:"col-sm-6",name:"dateReleased",value:i,onChangeAction:this.handleInputChangeDate}),i?l.createElement(E.A,{label:"Tijd uitgebracht",size:"col-sm-3",name:"timeReleased",value:u,start:"06:00",end:"23:00",onChangeAction:this.handleInputChangeDate,nullableSize:"col-sm-3",nullable:!0,nullableLabel:"Onbekend",nullableChecked:!0}):null),l.createElement("div",{className:"row"},l.createElement(f.A,{label:"Datum akkoord bewoner",size:"col-sm-6",name:"dateApprovedClient",value:p,onChangeAction:this.handleInputChangeDate})),l.createElement("div",{className:"row"},l.createElement(f.A,{label:"Datum akkoord projectleider",size:"col-sm-6",name:"dateApprovedProjectManager",value:h,onChangeAction:this.handleInputChangeDate,readOnly:"subsidy-request"===this.props.opportunityAction.codeRef}))):null,"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement(l.Fragment,null,l.createElement("div",{className:"row"},l.createElement(f.A,{label:"Datum akkoord toekenning",size:"col-sm-6",name:"dateApprovedExternal",value:y,onChangeAction:this.handleInputChangeDate,readOnly:!0})),l.createElement("div",{className:"row"},l.createElement(f.A,{label:"Datum toekenning in behandeling",size:"col-sm-6",name:"dateUnderReview",value:C,onChangeAction:this.handleInputChangeDate,readOnly:!0}))):null,"quotation-request"===this.props.opportunityAction.codeRef||"subsidy-request"===this.props.opportunityAction.codeRef||"redirection"===this.props.opportunityAction.codeRef?l.createElement("div",{className:"row"},l.createElement(f.A,{label:"redirection"===this.props.opportunityAction.codeRef?"Datum afgehandeld":"Datum uitgevoerd",size:"col-sm-6",name:"dateExecuted",value:I,onChangeAction:this.handleInputChangeDate})):null,"quotation-request"===this.props.opportunityAction.codeRef||"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement("div",{className:"row"},l.createElement(v.A,{type:"number",label:"subsidy-request"===this.props.opportunityAction.codeRef?"Budgetaanvraagbedrag":"Offertebedrag",size:"col-sm-6",name:"quotationAmount",value:k,onChangeAction:this.handleInputChange})):null,"subsidy-request"===this.props.opportunityAction.codeRef?l.createElement(l.Fragment,null,l.createElement("div",{className:"row"},l.createElement(v.A,{type:"number",label:"Kosten aanpassing",size:"col-sm-6",name:"costAdjustment",value:w,onChangeAction:this.handleInputChange})),l.createElement("div",{className:"row"},l.createElement(v.A,{type:"number",label:"Bedrag toekenning",size:"col-sm-6",name:"awardAmount",value:O,onChangeAction:this.handleInputChange}))):null,l.createElement("div",{className:"panel-footer"},l.createElement("div",{className:"pull-right btn-group",role:"group"},l.createElement(g.A,{buttonText:"Opslaan",onClickAction:this.handleSubmit}))),this.state.showHoomdossierWarningModal&&l.createElement(R.A,{buttonClassName:"btn-danger",closeModal:this.closeHoomdossierWarningModal,buttonCancelText:"Sluiten",showConfirmAction:!1,title:"Hoomdossier aanmaken"},l.createElement("p",null,"Kansactie is wel aangemaakt, maar er zijn meldingen vanuit Hoomdossier:"),this.state.errorMesssage.length?l.createElement("ul",null,this.state.errorMesssage.map((function(e){return l.createElement("li",null,e)}))):null))}}])}(l.Component);var S=a(62493),j=a(55849);const P=function(e){return l.createElement("div",null,l.createElement(S.A,null,l.createElement(j.A,null,l.createElement(O,{opportunityId:e.opportunityId,opportunityAction:e.opportunityAction}))))};var D=a(91858);const M=function(e){return l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-4"},l.createElement("div",{className:"btn-group",role:"group"},l.createElement(D.A,{iconName:"arrowLeft",onClickAction:d.Nc.goBack}))),l.createElement("div",{className:"col-md-4"},l.createElement("h4",{className:"text-center"},"Nieuw ",e.opportunityAction?e.opportunityAction.name:"actie")),l.createElement("div",{className:"col-md-4"}))};var z=a(69733);function x(e,t,a){return t=(0,r.A)(t),(0,s.A)(e,T()?Reflect.construct(t,a||[],(0,r.A)(e).constructor):t.apply(e,a))}function T(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(T=function(){return!!e})()}var H=function(e){function t(e){var a;(0,n.A)(this,t),a=x(this,t,[e]);var o=e.opportunityActions.find((function(t){return t.id==e.params.opportunityActionId}));return a.state={opportunityAction:o},a}return(0,i.A)(t,e),(0,o.A)(t,[{key:"render",value:function(){return l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-9"},l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(M,{opportunityAction:this.state.opportunityAction})),l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(P,{opportunityId:this.props.params.opportunityId,opportunityAction:this.state.opportunityAction}))),l.createElement("div",{className:"col-md-3"}))}}])}(l.Component);const L=(0,z.Ng)((function(e){return{opportunityActions:e.systemData.opportunityActions}}),null)(H)}}]);