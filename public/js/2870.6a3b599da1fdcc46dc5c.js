"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[2870],{42870:(e,t,a)=>{a.r(t),a.d(t,{default:()=>_});var n=a(23029),r=a(92901),i=a(56822),o=a(53954),s=a(85501),d=a(64467),c=a(96540),l=a(24179),u=a(62493),m=a(55849),p=a(91858);const h=function(e){return e.projectTypeName,c.createElement("div",{className:"row"},c.createElement("div",{className:"col-sm-12"},c.createElement(u.A,null,c.createElement(m.A,{className:"panel-small"},c.createElement("div",{className:"col-md-4"},c.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},c.createElement(p.A,{iconName:"arrowLeft",onClickAction:l.Nc.goBack}))),c.createElement("div",{className:"col-md-4"},c.createElement("h3",{className:"text-center table-title"},"Nieuwe deelnemer")),c.createElement("div",{className:"col-md-4"})))))};var f=a(19390),y=a(44758),I=a(69733),g=a(5556),b=a.n(g),E=function(e){var t=e.buttonClassName,a=e.buttonCancelText,n=e.buttonConfirmText,r=e.children,i=e.closeModal,o=e.confirmAction,s=e.title,d=e.closingText;return c.createElement("div",{className:"modal"},c.createElement("div",{className:"modal-dialog"},c.createElement("div",{className:"modal-content"},c.createElement("div",{className:"modal-header"},c.createElement("h4",{className:"modal-title"},s)),c.createElement("div",{className:"modal-body"},c.createElement("ul",null,r.map((function(e,t){return c.createElement("li",{key:t},e)}))),c.createElement("p",null,d)),c.createElement("div",{className:"modal-footer"},c.createElement("button",{type:"button",className:"btn btn-default",onClick:i},a),e.showConfirmAction&&c.createElement("button",{type:"button",className:"btn ".concat(t),onClick:o},n)))))};E.defaultProps={buttonClassName:"btn-success",buttonConfirmText:"Opslaan",buttonCancelText:"Annuleren",showConfirmAction:!0,confirmAction:function(){}},E.propTypes={buttonCancelText:b().string,buttonConfirmText:b().string,children:b().oneOfType([b().element.isRequired,b().array.isRequired]),closeModal:b().func.isRequired,confirmAction:b().func,showConfirmAction:b().bool,title:b().string};const v=E;var C=a(10467),A=a(5544),j=a(54756),q=a.n(j),D=a(14809),Y=a(55956),O=a(22102),S=a(54814),M=a(73421),w=a(98564),N=a(14585),P=a(93822);const k=function(e){var t=(0,c.useState)(""),a=(0,A.A)(t,2),n=a[0],r=a[1],i=(0,c.useState)(!1),o=(0,A.A)(i,2),s=o[0],d=o[1],l=e.participation,u=e.errors,m=e.handleInputChange,p=e.handleInputChangeDate,h=e.handleInputChangeContactId,f=e.handleInputChangeAddressId,y=e.handleInputChangeProjectId,I=e.handleSubmit,g=e.selectedContact,b=e.addresses,E=e.projects,v=e.participantMutationStatuses,j=e.projectTypeCodeRef,k=e.isSceProject,R=e.disableProjectSelection,G=e.disableClientSelection,T=e.isLoading,F=l.addressId,x=l.statusId,B=l.projectId,L=l.quantityInterest,W=l.amountInterest,z=l.dateInterest,V=l.quantityOption,_=l.amountOption,K=l.dateOption,J=l.quantityGranted,H=l.amountGranted,Q=l.dateGranted,U=l.quantityFinal,X=l.amountFinal,Z=l.dateContractRetour,$=l.datePayment,ee=l.paymentReference,te=l.dateEntry,ae=l.disableBeforeEntryDate,ne=v.find((function(e){return e.id==x})),re=ne?ne.codeRef:null,ie=function(){var e=(0,C.A)(q().mark((function e(){var t;return q().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n.length<=1)){e.next=2;break}return e.abrupt("return");case 2:return d(!0),e.prev=3,e.next=6,P.A.fetchContactSearch(n);case 6:return t=e.sent,d(!1),e.abrupt("return",t.data.data);case 11:e.prev=11,e.t0=e.catch(3),d(!1);case 14:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(){return e.apply(this,arguments)}}();return c.createElement("form",{className:"form-horizontal col-md-12",onSubmit:I},c.createElement("div",{className:"row"},c.createElement(w.A,{label:"Project",name:"projectId",id:"projectId",options:E,value:Number(B),onChangeAction:y,required:"required",error:u.projectId,errorMessage:u.projectId?"Verplicht":"",disabled:R})),c.createElement("div",{className:"row"},c.createElement(N.A,{label:"Contact",name:"contactId",id:"contactId",loadOptions:ie,optionName:"fullName",value:g,onChangeAction:h,required:"required",error:u.contactId,errorMessage:u.contactId?"Verplicht":"",disabled:G,isLoading:s,handleInputChange:function(e){r(e)},multi:!1})),c.createElement("div",{className:"row"},c.createElement(w.A,{label:"Adres",name:"addressId",id:"addressId",options:b,optionName:"streetPostalCodeCity",value:Number(F),onChangeAction:f,required:"required",disabled:"postalcode_link_capital"!==j&&!k,error:u.addressId,errorMessage:u.addressId?"Verplicht (indien geen adres beschikbaar, controleer adresgegevens bij contact)":""})),c.createElement("div",{className:"row"},c.createElement(D.A,{label:"Status",name:"statusId",id:"statusId",options:v,value:x,onChangeAction:m,required:"required",error:u.statusId,errorMessage:u.statusId?"Verplicht":""})),"interest"===re?c.createElement("div",{className:"row"},"loan"===j?c.createElement(S.A,{type:"number",label:"Bedrag interesse",name:"amountInterest",id:"amountInterest",value:W,onChangeAction:m,error:u.amountInterest}):c.createElement(S.A,{type:"number",label:"Aantal interesse",name:"quantityInterest",id:"quantityInterest",value:L,onChangeAction:m,error:u.quantityInterest}),c.createElement(M.A,{label:"Interesse datum",name:"dateInterest",id:"dateInterest",value:z,onChangeAction:p})):null,"option"===re?c.createElement("div",{className:"row"},"loan"===j?c.createElement(S.A,{type:"number",label:"Bedrag inschrijving",name:"amountOption",id:"amountOption",value:_,onChangeAction:m,required:"required",error:u.amountOption}):c.createElement(S.A,{type:"number",label:"Aantal inschrijving",name:"quantityOption",id:"quantityOption",value:V,onChangeAction:m,required:"required",error:u.quantityOption}),c.createElement(M.A,{label:"Inschrijvingsdatum",name:"dateOption",id:"dateOption",value:K,onChangeAction:p,required:"required",error:u.dateOption})):null,"granted"===re?c.createElement("div",{className:"row"},"loan"===j?c.createElement(S.A,{type:"number",label:"Bedrag toegekend",name:"amountGranted",id:"amountGranted",value:H,onChangeAction:m,required:"required",error:u.amountGranted}):c.createElement(S.A,{type:"number",label:"Aantal toegekend",name:"quantityGranted",id:"quantityGranted",value:J,onChangeAction:m,required:"required",error:u.quantityGranted}),c.createElement(M.A,{label:"Toewijzingsdatum",name:"dateGranted",id:"dateGranted",value:Q,onChangeAction:p,required:"required",error:u.dateGranted})):null,"final"===re?c.createElement(c.Fragment,null,c.createElement("div",{className:"row"},"loan"===j?c.createElement(S.A,{type:"number",label:"Bedrag definitief",name:"amountFinal",id:"amountFinal",value:X,onChangeAction:m,required:"required",error:u.amountFinal}):c.createElement(S.A,{type:"number",label:"Aantal definitief",name:"quantityFinal",id:"quantityFinal",value:U,onChangeAction:m,required:"required",error:u.quantityFinal}),c.createElement(M.A,{label:"Toewijzingsdatum",name:"dateGranted",id:"dateGranted",value:Q,onChangeAction:p})),c.createElement("div",{className:"row"},c.createElement(M.A,{label:"Contract retour",name:"dateContractRetour",id:"dateContractRetour",value:Z,onChangeAction:p}),c.createElement(M.A,{label:"Betaaldatum",name:"datePayment",id:"datePayment",value:$,onChangeAction:p})),c.createElement("div",{className:"row"},c.createElement(M.A,{label:"Ingangsdatum",name:"dateEntry",id:"dateEntry",value:te,onChangeAction:p,disabledBefore:ae,required:"required",error:u.dateEntry}),c.createElement(S.A,{label:"Betalingskenmerk",id:"paymentReference",name:"paymentReference",value:ee,onChangeAction:m}))):null,c.createElement(O.A,null,c.createElement("div",{className:"pull-right btn-group",role:"group"},c.createElement(Y.A,{buttonText:"Opslaan",type:"submit",value:"Submit",loading:T}))))};var R=a(57761),G=a.n(R),T=a(95093),F=a.n(T),x=a(63923);function B(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function L(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?B(Object(a),!0).forEach((function(t){(0,d.A)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):B(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function W(e,t,a){return t=(0,o.A)(t),(0,i.A)(e,z()?Reflect.construct(t,a||[],(0,o.A)(e).constructor):t.apply(e,a))}function z(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(z=function(){return!!e})()}var V=function(e){function t(e){var a;return(0,n.A)(this,t),a=W(this,t,[e]),(0,d.A)(a,"redirectTask",(function(){l.RL.push(a.state.modalRedirectTask)})),(0,d.A)(a,"redirectParticipation",(function(){l.RL.push(a.state.modalRedirectParticipation)})),(0,d.A)(a,"closeShowModalError",(function(){a.setState(L(L({},a.state),{},{showModalError:!1}))})),(0,d.A)(a,"handleInputChange",(function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,r=t.name;a.setState(L(L({},a.state),{},{participation:L(L({},a.state.participation),{},(0,d.A)({},r,n))}))})),(0,d.A)(a,"handleInputChangeContactId",(function(e){var t=e?e.id:null;t&&x.A.getContactDetailsWithAddresses(t).then((function(e){var t=e;a.setState(L(L({},a.state),{},{selectedContact:t,participation:L(L({},a.state.participation),{},{contactId:t.id,addressId:t?t.primaryAddressId:0}),addresses:t?t.addresses:[]}))}))})),(0,d.A)(a,"handleInputChangeAddressId",(function(e){a.setState(L(L({},a.state),{},{participation:L(L({},a.state.participation),{},{addressId:e})}))})),(0,d.A)(a,"handleInputChangeProjectId",(function(e){var t=e,n=a.state.projects.find((function(e){return e.id==t})),r=a.getDisableBeforeEntryDate(n);a.setState(L(L({},a.state),{},{projectTypeCodeRef:n.typeCodeRef,isSceProject:n.isSceProject,participation:L(L({},a.state.participation),{},{projectId:t,dateEntry:n.dateEntry?F()(n.dateEntry).format("YYYY-MM-DD"):G().isEmpty(r+"")?F()().format("YYYY-MM-DD"):F()(r).format("YYYY-MM-DD"),disableBeforeEntryDate:r})}))})),(0,d.A)(a,"handleInputChangeStatusId",(function(e){var t=e.target.value,n=Number(t)===a.props.participantMutationStatuses.find((function(e){return"final"===e.codeRef})).id?null:F()().format("YYYY-MM-DD");a.setState(L(L({},a.state),{},{participation:L(L({},a.state.participation),{},{statusId:t,dateGranted:n})}))})),(0,d.A)(a,"handleInputChangeDate",(function(e,t){a.setState(L(L({},a.state),{},{participation:L(L({},a.state.participation),{},(0,d.A)({},t,e))}))})),(0,d.A)(a,"handleSubmit",(function(e){e.preventDefault();var t=a.state.participation,n=a.props.participantMutationStatuses.find((function(e){return e.id==t.statusId})),r=n?n.codeRef:null,i=function(e,t,a,n,r){if(e.contactId||(t.contactId=!0,a=!0),e.addressId||(t.addressId=!0,a=!0),e.projectId||(t.projectId=!0,a=!0),e.statusId)switch(n){case"interest":"loan"===r?e.amountInterest&&e.amountInterest<0&&(t.amountInterest=!0,a=!0):e.quantityInterest&&e.quantityInterest<0&&(t.quantityInterest=!0,a=!0);break;case"option":e.dateOption||(t.dateOption=!0,a=!0),"loan"===r?(!e.amountOption||e.amountOption<0)&&(t.amountOption=!0,a=!0):(!e.quantityOption||e.quantityOption<0)&&(t.quantityOption=!0,a=!0);break;case"granted":e.dateGranted||(t.dateGranted=!0,a=!0),"loan"===r?(!e.amountGranted||e.amountGranted<0)&&(t.amountGranted=!0,a=!0):(!e.quantityGranted||e.quantityGranted<0)&&(t.quantityGranted=!0,a=!0);break;case"final":e.dateEntry||(t.dateEntry=!0,a=!0),!G().isEmpty(e.dateEntry+"")&&!G().isEmpty(e.disableBeforeEntryDate)&&e.dateEntry<e.disableBeforeEntryDate&&(t.dateEntry=!0,a=!0),"loan"===r?(!e.amountFinal||e.amountFinal<0)&&(t.amountFinal=!0,a=!0):(!e.quantityFinal||e.quantityFinal<0)&&(t.quantityFinal=!0,a=!0)}else t.statusId=!0,a=!0;return{hasErrors:a,errors:t}}(t,{},!1,r,a.state.projectTypeCodeRef);if(a.setState(L(L({},a.state),{},{errors:i.errors})),!i.hasErrors){var o=function(e,t,a){var n={contactId:e.contactId,addressId:e.addressId,statusId:e.statusId,projectId:e.projectId};switch(t){case"interest":n.dateInterest=e.dateInterest,"loan"===a?n.amountInterest=e.amountInterest:n.quantityInterest=e.quantityInterest;break;case"option":n.dateOption=e.dateOption,"loan"===a?n.amountOption=e.amountOption:n.quantityOption=e.quantityOption;break;case"granted":n.dateGranted=e.dateGranted,"loan"===a?n.amountGranted=e.amountGranted:n.quantityGranted=e.quantityGranted;break;case"final":n.dateGranted=e.dateGranted,n.dateContractRetour=e.dateContractRetour,n.datePayment=e.datePayment,n.paymentReference=e.paymentReference,n.dateEntry=e.dateEntry,"loan"===a?n.amountFinal=e.amountFinal:n.quantityFinal=e.quantityFinal}return n}(t,r,a.state.projectTypeCodeRef);a.setState({isLoading:!0}),f.A.storeParticipantProject(o).then((function(e){void 0!==e.data.message&&e.data.message.length>0&&0==e.data.id?a.setState({showModalError:!0,modalText:e.data.message}):void 0!==e.data.message&&e.data.message.length>0?(a.setState({showModal:!0,modalText:e.data.message}),a.setState({modalRedirectTask:"/taak/nieuw/contact/".concat(t.contactId,"/project/").concat(t.projectId,"/deelnemer/").concat(e.data.id),modalRedirectParticipation:"/project/deelnemer/".concat(e.data.id)})):l.RL.push("/project/deelnemer/".concat(e.data.id)),a.setState({isLoading:!1})}))}})),a.state={showModal:!1,showModalError:!1,modalText:[],modalRedirectTask:"",modalRedirectParticipation:"",selectedContact:{},addresses:[],projects:[],participationWorth:0,projectTypeCodeRef:"",isSceProject:!1,disableClientSelection:!!e.params.contactId,disableProjectSelection:!!e.params.projectId,participation:{contactId:e.params.contactId||"",addressId:"",statusId:"",projectId:e.params.projectId||"",quantityInterest:0,amountInterest:0,dateInterest:F()().format("YYYY-MM-DD"),quantityOption:0,amountOption:0,dateOption:F()().format("YYYY-MM-DD"),quantityGranted:0,amountGranted:0,dateGranted:F()().format("YYYY-MM-DD"),quantityFinal:0,amountFinal:0,dateContractRetour:null,datePayment:null,paymentReference:null,dateEntry:F()().format("YYYY-MM-DD"),disableBeforeEntryDate:""},errors:{contactId:!1,addressId:!1,statusId:!1,projectId:!1,amountOption:!1,dateOption:!1,amountGranted:!1,dateGranted:!1,amountFinal:!1,dateEntry:!1},isLoading:!1},a}return(0,s.A)(t,e),(0,r.A)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.params.contactId&&x.A.getContactDetailsWithAddresses(this.props.params.contactId).then((function(t){var a=t;e.setState(L(L({},e.state),{},{selectedContact:a,participation:L(L({},e.state.participation),{},{contactId:a.id,addressId:a?a.primaryAddressId:0}),addresses:a?a.addresses:[]}))})),y.A.peekProjects().then((function(t){if(e.setState({projects:t}),e.props.params.projectId){var a=t.find((function(t){return t.id==e.props.params.projectId})),n=e.getDisableBeforeEntryDate(a);e.setState(L(L({},e.state),{},{projectTypeCodeRef:a.typeCodeRef,isSceProject:a.isSceProject,participation:L(L({},e.state.participation),{},{dateEntry:a.dateEntry?F()(a.dateEntry).format("YYYY-MM-DD"):G().isEmpty(n+"")?F()().format("YYYY-MM-DD"):F()(n).format("YYYY-MM-DD"),disableBeforeEntryDate:n})}))}}))}},{key:"getDisableBeforeEntryDate",value:function(e){var t,a=0;e&&e.lastYearFinancialOverviewDefinitive?a=e.lastYearFinancialOverviewDefinitive:(t=(t=this.props.administrations.filter((function(t){return t.id==e.administrationId})))[0])&&t.lastYearFinancialOverviewDefinitive&&(a=t.lastYearFinancialOverviewDefinitive);var n=a>0?F()(F()().year(a+1)).format("YYYY-01-01"):"";return e&&"postalcode_link_capital"===e.typeCodeRef&&e.dateInterestBearingKwh&&(!n||F()(e.dateInterestBearingKwh).format("YYYY-MM-DD")<n)&&(n=F()(e.dateInterestBearingKwh).format("YYYY-MM-DD")),n}},{key:"render",value:function(){return c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-9"},c.createElement("div",{className:"col-md-12"},c.createElement(h,null)),c.createElement("div",{className:"col-md-12"},c.createElement(u.A,null,c.createElement(m.A,null,c.createElement("div",{className:"col-md-12"},c.createElement(k,{editForm:!1,participation:this.state.participation,errors:this.state.errors,handleInputChange:this.handleInputChange,handleInputChangeDate:this.handleInputChangeDate,handleSubmit:this.handleSubmit,selectedContact:this.state.selectedContact,addresses:this.state.addresses,projects:this.state.projects,handleProjectChange:this.handleProjectChange,projectTypeCodeRef:this.state.projectTypeCodeRef,isSceProject:this.state.isSceProject,disableProjectSelection:this.state.disableProjectSelection,disableClientSelection:this.state.disableClientSelection,projectDateEntry:this.state.projectDateEntry,participantMutationStatuses:this.props.participantMutationStatuses,handleInputChangeContactId:this.handleInputChangeContactId,handleInputChangeAddressId:this.handleInputChangeAddressId,handleInputChangeProjectId:this.handleInputChangeProjectId,handleInputChangeStatusId:this.handleInputChangeStatusId,isLoading:this.state.isLoading})))))),c.createElement("div",{className:"col-md-3"}),this.state.showModalError&&c.createElement(v,{title:"Melding",closeModal:this.closeShowModalError,buttonCancelText:"Sluiten",showConfirmAction:!1,closingText:"De deelname is niet aangemaakt!"},this.state.modalText),this.state.showModal&&c.createElement(v,{title:"Waarschuwing",closeModal:this.redirectParticipation,buttonCancelText:"Nee",confirmAction:this.redirectTask,buttonConfirmText:"Ja",closingText:"De deelname is aangemaakt, maar de gegevens zijn niet compleet. Wil je ook een taak aanmaken om je daar aan te herinneren ?"},this.state.modalText))}}])}(c.Component);const _=(0,I.Ng)((function(e){return{participantMutationStatuses:e.systemData.participantMutationStatuses,administrations:e.meDetails.administrations}}))(V)}}]);