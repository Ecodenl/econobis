(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{1625:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a.n(n),o=a(15),i=a.n(o),s=a(9),c=a.n(s),l=a(16),d=a.n(l),u=a(17),p=a.n(u),m=a(12),f=a.n(m),h=a(5),g=a.n(h),b=a(0),y=a.n(b),v=a(4),O=a(27),I=a(30),E=a(50),C=function(e){e.projectTypeName;return y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-sm-12"},y.a.createElement(O.a,null,y.a.createElement(I.a,{className:"panel-small"},y.a.createElement("div",{className:"col-md-4"},y.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},y.a.createElement(E.a,{iconName:"glyphicon-arrow-left",onClickAction:v.e.goBack}))),y.a.createElement("div",{className:"col-md-4"},y.a.createElement("h3",{className:"text-center table-title"},"Nieuwe deelnemer")),y.a.createElement("div",{className:"col-md-4"})))))},j=a(233),w=a(292),q=a(19),D=a(3),S=a.n(D),N=function(e){var t=e.buttonClassName,a=e.buttonCancelText,n=e.buttonConfirmText,r=e.children,o=e.closeModal,i=e.confirmAction,s=e.title,c=e.closingText;return y.a.createElement("div",{className:"modal"},y.a.createElement("div",{className:"modal-dialog"},y.a.createElement("div",{className:"modal-content"},y.a.createElement("div",{className:"modal-header"},y.a.createElement("h4",{className:"modal-title"},s)),y.a.createElement("div",{className:"modal-body"},y.a.createElement("ul",null,r.map((function(e,t){return y.a.createElement("li",{key:t},e)}))),y.a.createElement("p",null,c)),y.a.createElement("div",{className:"modal-footer"},y.a.createElement("button",{type:"button",className:"btn btn-default",onClick:o},a),e.showConfirmAction&&y.a.createElement("button",{type:"button",className:"btn ".concat(t),onClick:i},n)))))};N.defaultProps={buttonClassName:"btn-success",buttonConfirmText:"Opslaan",buttonCancelText:"Annuleren",showConfirmAction:!0,confirmAction:function(){}},N.propTypes={buttonCancelText:S.a.string,buttonConfirmText:S.a.string,children:S.a.oneOfType([S.a.element.isRequired,S.a.array.isRequired]),closeModal:S.a.func.isRequired,confirmAction:S.a.func,showConfirmAction:S.a.bool,title:S.a.string};var P=N,M=a(289),R=a.n(M),Y=a(547),k=a.n(Y),A=a(6),G=a.n(A),T=a(123),L=a(38),x=a(124),F=a(36),B=a(51),V=a(969),z=a(968),_=a(146);var W=function(e){var t=Object(b.useState)(""),a=k()(t,2),n=a[0],r=a[1],o=Object(b.useState)(!1),i=k()(o,2),s=i[0],c=i[1],l=e.participation,d=e.errors,u=e.handleInputChange,p=e.handleInputChangeDate,m=e.handleInputChangeContactId,f=e.handleInputChangeAddressId,h=e.handleInputChangeProjectId,g=e.handleSubmit,v=e.selectedContact,O=e.addresses,I=e.projects,E=e.participantMutationStatuses,C=e.projectTypeCodeRef,j=e.isSceProject,w=e.disableProjectSelection,q=e.disableClientSelection,D=e.isLoading,S=l.addressId,N=l.statusId,P=l.projectId,M=l.quantityInterest,Y=l.amountInterest,A=l.dateInterest,W=l.quantityOption,U=l.amountOption,J=l.dateOption,K=l.quantityGranted,H=l.amountGranted,Q=l.dateGranted,X=l.quantityFinal,Z=l.amountFinal,$=l.dateContractRetour,ee=l.datePayment,te=l.paymentReference,ae=l.dateEntry,ne=l.disableBeforeEntryDate,re=E.find((function(e){return e.id==N})),oe=re?re.codeRef:null,ie=function(){var e=R()(G.a.mark((function e(){var t;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n.length<=1)){e.next=2;break}return e.abrupt("return");case 2:return c(!0),e.prev=3,e.next=6,_.a.fetchContactSearch(n);case 6:return t=e.sent,c(!1),e.abrupt("return",t.data.data);case 11:e.prev=11,e.t0=e.catch(3),c(!1);case 14:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(){return e.apply(this,arguments)}}();return y.a.createElement("form",{className:"form-horizontal col-md-12",onSubmit:g},y.a.createElement("div",{className:"row"},y.a.createElement(V.a,{label:"Project",name:"projectId",id:"projectId",options:I,value:Number(P),onChangeAction:h,required:"required",error:d.projectId,disabled:w})),y.a.createElement("div",{className:"row"},y.a.createElement(z.a,{label:"Contact",name:"contactId",id:"contactId",loadOptions:ie,optionName:"fullName",value:v,onChangeAction:m,required:"required",error:d.contactId,disabled:q,isLoading:s,handleInputChange:function(e){r(e)},multi:!1})),y.a.createElement("div",{className:"row"},y.a.createElement(V.a,{label:"Adres",name:"addressId",id:"addressId",options:O,optionName:"streetPostalCodeCity",value:Number(S),onChangeAction:f,required:"required",disabled:"postalcode_link_capital"!==C&&!j,error:d.addressId})),y.a.createElement("div",{className:"row"},y.a.createElement(T.a,{label:"Status",name:"statusId",id:"statusId",options:E,value:N,onChangeAction:u,required:"required",error:d.statusId})),"interest"===oe?y.a.createElement("div",{className:"row"},"loan"===C?y.a.createElement(F.a,{type:"number",label:"Bedrag interesse",name:"amountInterest",id:"amountInterest",value:Y,onChangeAction:u,error:d.amountInterest}):y.a.createElement(F.a,{type:"number",label:"Aantal interesse",name:"quantityInterest",id:"quantityInterest",value:M,onChangeAction:u,error:d.quantityInterest}),y.a.createElement(B.a,{label:"Interesse datum",name:"dateInterest",id:"dateInterest",value:A,onChangeAction:p})):null,"option"===oe?y.a.createElement("div",{className:"row"},"loan"===C?y.a.createElement(F.a,{type:"number",label:"Bedrag inschrijving",name:"amountOption",id:"amountOption",value:U,onChangeAction:u,required:"required",error:d.amountOption}):y.a.createElement(F.a,{type:"number",label:"Aantal inschrijving",name:"quantityOption",id:"quantityOption",value:W,onChangeAction:u,required:"required",error:d.quantityOption}),y.a.createElement(B.a,{label:"Inschrijvingsdatum",name:"dateOption",id:"dateOption",value:J,onChangeAction:p,required:"required",error:d.dateOption})):null,"granted"===oe?y.a.createElement("div",{className:"row"},"loan"===C?y.a.createElement(F.a,{type:"number",label:"Bedrag toegekend",name:"amountGranted",id:"amountGranted",value:H,onChangeAction:u,required:"required",error:d.amountGranted}):y.a.createElement(F.a,{type:"number",label:"Aantal toegekend",name:"quantityGranted",id:"quantityGranted",value:K,onChangeAction:u,required:"required",error:d.quantityGranted}),y.a.createElement(B.a,{label:"Toewijzingsdatum",name:"dateGranted",id:"dateGranted",value:Q,onChangeAction:p,required:"required",error:d.dateGranted})):null,"final"===oe?y.a.createElement(y.a.Fragment,null,y.a.createElement("div",{className:"row"},"loan"===C?y.a.createElement(F.a,{type:"number",label:"Bedrag definitief",name:"amountFinal",id:"amountFinal",value:Z,onChangeAction:u,required:"required",error:d.amountFinal}):y.a.createElement(F.a,{type:"number",label:"Aantal definitief",name:"quantityFinal",id:"quantityFinal",value:X,onChangeAction:u,required:"required",error:d.quantityFinal}),y.a.createElement(B.a,{label:"Toewijzingsdatum",name:"dateGranted",id:"dateGranted",value:Q,onChangeAction:p})),y.a.createElement("div",{className:"row"},y.a.createElement(B.a,{label:"Contract retour",name:"dateContractRetour",id:"dateContractRetour",value:$,onChangeAction:p}),y.a.createElement(B.a,{label:"Betaaldatum",name:"datePayment",id:"datePayment",value:ee,onChangeAction:p})),y.a.createElement("div",{className:"row"},y.a.createElement(B.a,{label:"Ingangsdatum",name:"dateEntry",id:"dateEntry",value:ae,onChangeAction:p,disabledBefore:ne,required:"required",error:d.dateEntry}),y.a.createElement(F.a,{label:"Betalingskenmerk",id:"paymentReference",name:"paymentReference",value:te,onChangeAction:u}))):null,y.a.createElement(x.a,null,y.a.createElement("div",{className:"pull-right btn-group",role:"group"},y.a.createElement(L.a,{buttonText:"Opslaan",type:"submit",value:"Submit",loading:D}))))},U=a(32),J=a.n(U),K=a(7),H=a.n(K),Q=a(312);function X(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Z(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?X(Object(a),!0).forEach((function(t){g()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):X(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function $(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=f()(e);if(t){var r=f()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return p()(this,a)}}var ee=function(e){d()(a,e);var t=$(a);function a(e){var n;return r()(this,a),n=t.call(this,e),g()(c()(n),"redirectTask",(function(){v.f.push(n.state.modalRedirectTask)})),g()(c()(n),"redirectParticipation",(function(){v.f.push(n.state.modalRedirectParticipation)})),g()(c()(n),"closeShowModalError",(function(){n.setState(Z(Z({},n.state),{},{showModalError:!1}))})),g()(c()(n),"handleInputChange",(function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,r=t.name;n.setState(Z(Z({},n.state),{},{participation:Z(Z({},n.state.participation),{},g()({},r,a))}))})),g()(c()(n),"handleInputChangeContactId",(function(e){var t=e?e.id:null;t&&Q.a.getContactDetailsWithAddresses(t).then((function(e){var t=e;n.setState(Z(Z({},n.state),{},{selectedContact:t,participation:Z(Z({},n.state.participation),{},{contactId:t.id,addressId:t?t.primaryAddressId:0}),addresses:t?t.addresses:[]}))}))})),g()(c()(n),"handleInputChangeAddressId",(function(e){n.setState(Z(Z({},n.state),{},{participation:Z(Z({},n.state.participation),{},{addressId:e})}))})),g()(c()(n),"handleInputChangeProjectId",(function(e){var t=e,a=n.state.projects.find((function(e){return e.id==t})),r=n.getDisableBeforeEntryDate(a);n.setState(Z(Z({},n.state),{},{projectTypeCodeRef:a.typeCodeRef,isSceProject:a.isSceProject,participation:Z(Z({},n.state.participation),{},{projectId:t,dateEntry:a.dateEntry?H()(a.dateEntry).format("YYYY-MM-DD"):J.a.isEmpty(r+"")?H()().format("YYYY-MM-DD"):H()(r).format("YYYY-MM-DD"),disableBeforeEntryDate:r})}))})),g()(c()(n),"handleInputChangeStatusId",(function(e){var t=e.target.value,a=Number(t)===n.props.participantMutationStatuses.find((function(e){return"final"===e.codeRef})).id?null:H()().format("YYYY-MM-DD");n.setState(Z(Z({},n.state),{},{participation:Z(Z({},n.state.participation),{},{statusId:t,dateGranted:a})}))})),g()(c()(n),"handleInputChangeDate",(function(e,t){n.setState(Z(Z({},n.state),{},{participation:Z(Z({},n.state.participation),{},g()({},t,e))}))})),g()(c()(n),"handleSubmit",(function(e){e.preventDefault();var t=n.state.participation,a=n.props.participantMutationStatuses.find((function(e){return e.id==t.statusId})),r=a?a.codeRef:null,o=function(e,t,a,n,r){if(e.contactId||(t.contactId=!0,a=!0),e.projectId||(t.projectId=!0,a=!0),e.statusId)switch(n){case"interest":"loan"===r?e.amountInterest&&e.amountInterest<0&&(t.amountInterest=!0,a=!0):e.quantityInterest&&e.quantityInterest<0&&(t.quantityInterest=!0,a=!0);break;case"option":e.dateOption||(t.dateOption=!0,a=!0),"loan"===r?(!e.amountOption||e.amountOption<0)&&(t.amountOption=!0,a=!0):(!e.quantityOption||e.quantityOption<0)&&(t.quantityOption=!0,a=!0);break;case"granted":e.dateGranted||(t.dateGranted=!0,a=!0),"loan"===r?(!e.amountGranted||e.amountGranted<0)&&(t.amountGranted=!0,a=!0):(!e.quantityGranted||e.quantityGranted<0)&&(t.quantityGranted=!0,a=!0);break;case"final":e.dateEntry||(t.dateEntry=!0,a=!0),!J.a.isEmpty(e.dateEntry+"")&&!J.a.isEmpty(e.disableBeforeEntryDate)&&e.dateEntry<e.disableBeforeEntryDate&&(t.dateEntry=!0,a=!0),"loan"===r?(!e.amountFinal||e.amountFinal<0)&&(t.amountFinal=!0,a=!0):(!e.quantityFinal||e.quantityFinal<0)&&(t.quantityFinal=!0,a=!0)}else t.statusId=!0,a=!0;return{hasErrors:a,errors:t}}(t,{},!1,r,n.state.projectTypeCodeRef);if(n.setState(Z(Z({},n.state),{},{errors:o.errors})),!o.hasErrors){var i=function(e,t,a){var n={contactId:e.contactId,addressId:e.addressId,statusId:e.statusId,projectId:e.projectId};switch(t){case"interest":n.dateInterest=e.dateInterest,"loan"===a?n.amountInterest=e.amountInterest:n.quantityInterest=e.quantityInterest;break;case"option":n.dateOption=e.dateOption,"loan"===a?n.amountOption=e.amountOption:n.quantityOption=e.quantityOption;break;case"granted":n.dateGranted=e.dateGranted,"loan"===a?n.amountGranted=e.amountGranted:n.quantityGranted=e.quantityGranted;break;case"final":n.dateGranted=e.dateGranted,n.dateContractRetour=e.dateContractRetour,n.datePayment=e.datePayment,n.paymentReference=e.paymentReference,n.dateEntry=e.dateEntry,"loan"===a?n.amountFinal=e.amountFinal:n.quantityFinal=e.quantityFinal}return n}(t,r,n.state.projectTypeCodeRef);n.setState({isLoading:!0}),j.a.storeParticipantProject(i).then((function(e){void 0!==e.data.message&&e.data.message.length>0&&0==e.data.id?n.setState({showModalError:!0,modalText:e.data.message}):void 0!==e.data.message&&e.data.message.length>0?(n.setState({showModal:!0,modalText:e.data.message}),n.setState({modalRedirectTask:"/taak/nieuw/contact/".concat(t.contactId,"/project/").concat(t.projectId,"/deelnemer/").concat(e.data.id),modalRedirectParticipation:"/project/deelnemer/".concat(e.data.id)})):v.f.push("/project/deelnemer/".concat(e.data.id)),n.setState({isLoading:!1})}))}})),n.state={showModal:!1,showModalError:!1,modalText:[],modalRedirectTask:"",modalRedirectParticipation:"",selectedContact:{},addresses:[],projects:[],participationWorth:0,projectTypeCodeRef:"",isSceProject:!1,disableClientSelection:!!e.params.contactId,disableProjectSelection:!!e.params.projectId,participation:{contactId:e.params.contactId||"",addressId:"",statusId:"",projectId:e.params.projectId||"",quantityInterest:0,amountInterest:0,dateInterest:H()().format("YYYY-MM-DD"),quantityOption:0,amountOption:0,dateOption:H()().format("YYYY-MM-DD"),quantityGranted:0,amountGranted:0,dateGranted:H()().format("YYYY-MM-DD"),quantityFinal:0,amountFinal:0,dateContractRetour:null,datePayment:null,paymentReference:null,dateEntry:H()().format("YYYY-MM-DD"),disableBeforeEntryDate:""},errors:{contactId:!1,addressId:!1,statusId:!1,projectId:!1,amountOption:!1,dateOption:!1,amountGranted:!1,dateGranted:!1,amountFinal:!1,dateEntry:!1},isLoading:!1},n}return i()(a,[{key:"componentDidMount",value:function(){var e=this;this.props.params.contactId&&Q.a.getContactDetailsWithAddresses(this.props.params.contactId).then((function(t){var a=t;e.setState(Z(Z({},e.state),{},{selectedContact:a,participation:Z(Z({},e.state.participation),{},{contactId:a.id,addressId:a?a.primaryAddressId:0}),addresses:a?a.addresses:[]}))})),w.a.peekProjects().then((function(t){if(e.setState({projects:t}),e.props.params.projectId){var a=t.find((function(t){return t.id==e.props.params.projectId})),n=e.getDisableBeforeEntryDate(a);e.setState(Z(Z({},e.state),{},{projectTypeCodeRef:a.typeCodeRef,isSceProject:a.isSceProject,participation:Z(Z({},e.state.participation),{},{dateEntry:a.dateEntry?H()(a.dateEntry).format("YYYY-MM-DD"):J.a.isEmpty(n+"")?H()().format("YYYY-MM-DD"):H()(n).format("YYYY-MM-DD"),disableBeforeEntryDate:n})}))}}))}},{key:"getDisableBeforeEntryDate",value:function(e){var t,a=0;e&&e.lastYearFinancialOverviewDefinitive?a=e.lastYearFinancialOverviewDefinitive:(t=(t=this.props.administrations.filter((function(t){return t.id==e.administrationId})))[0])&&t.lastYearFinancialOverviewDefinitive&&(a=t.lastYearFinancialOverviewDefinitive);var n=a>0?H()(H()().year(a+1)).format("YYYY-01-01"):"";return e&&"postalcode_link_capital"===e.typeCodeRef&&e.dateInterestBearingKwh&&(!n||H()(e.dateInterestBearingKwh).format("YYYY-MM-DD")<n)&&(n=H()(e.dateInterestBearingKwh).format("YYYY-MM-DD")),n}},{key:"render",value:function(){return y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-md-9"},y.a.createElement("div",{className:"col-md-12"},y.a.createElement(C,null)),y.a.createElement("div",{className:"col-md-12"},y.a.createElement(O.a,null,y.a.createElement(I.a,null,y.a.createElement("div",{className:"col-md-12"},y.a.createElement(W,{editForm:!1,participation:this.state.participation,errors:this.state.errors,handleInputChange:this.handleInputChange,handleInputChangeDate:this.handleInputChangeDate,handleSubmit:this.handleSubmit,selectedContact:this.state.selectedContact,addresses:this.state.addresses,projects:this.state.projects,handleProjectChange:this.handleProjectChange,projectTypeCodeRef:this.state.projectTypeCodeRef,isSceProject:this.state.isSceProject,disableProjectSelection:this.state.disableProjectSelection,disableClientSelection:this.state.disableClientSelection,projectDateEntry:this.state.projectDateEntry,participantMutationStatuses:this.props.participantMutationStatuses,handleInputChangeContactId:this.handleInputChangeContactId,handleInputChangeAddressId:this.handleInputChangeAddressId,handleInputChangeProjectId:this.handleInputChangeProjectId,handleInputChangeStatusId:this.handleInputChangeStatusId,isLoading:this.state.isLoading})))))),y.a.createElement("div",{className:"col-md-3"}),this.state.showModalError&&y.a.createElement(P,{title:"Melding",closeModal:this.closeShowModalError,buttonCancelText:"Sluiten",showConfirmAction:!1,closingText:"De deelname is niet aangemaakt!"},this.state.modalText),this.state.showModal&&y.a.createElement(P,{title:"Waarschuwing",closeModal:this.redirectParticipation,buttonCancelText:"Nee",confirmAction:this.redirectTask,buttonConfirmText:"Ja",closingText:"De deelname is aangemaakt, maar de gegevens zijn niet compleet. Wil je ook een taak aanmaken om je daar aan te herinneren ?"},this.state.modalText))}}]),a}(b.Component);t.default=Object(q.b)((function(e){return{participantMutationStatuses:e.systemData.participantMutationStatuses,administrations:e.meDetails.administrations}}))(ee)},936:function(e,t,a){"use strict";a.d(t,"b",(function(){return O}));a(550);var n=a(23),r=(a(547),a(291)),o=a(46),i=a(56),s=a(55),c=(a(9),a(57)),l=a(64),d=a(44),u=a(0),p=a.n(u),m=(a(22),a(83),a(90),a(26)),f=a(125),h=(a(84),a(548),a(225),a(287));function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(d.a)(e);if(t){var r=Object(d.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(l.a)(this,a)}}function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,a=String(e).toLowerCase(),n=String(t.value).toLowerCase(),r=String(t.label).toLowerCase();return n===a||r===a},v=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){Object(o.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({allowCreateWhileLoading:!1,createOptionPosition:"last"},{formatCreateLabel:function(e){return'Create "'.concat(e,'"')},isValidNewOption:function(e,t,a){return!(!e||t.some((function(t){return y(e,t)}))||a.some((function(t){return y(e,t)})))},getNewOptionData:function(e,t){return{label:t,value:e,__isNew__:!0}}}),O=function(e){var t,a;return a=t=function(t){Object(c.a)(o,t);var a=g(o);function o(e){var t;Object(i.a)(this,o),(t=a.call(this,e)).select=void 0,t.onChange=function(e,a){var n=t.props,o=n.getNewOptionData,i=n.inputValue,s=n.isMulti,c=n.onChange,l=n.onCreateOption,d=n.value,u=n.name;if("select-option"!==a.action)return c(e,a);var p=t.state.newOption,f=Array.isArray(e)?e:[e];if(f[f.length-1]!==p)c(e,a);else if(l)l(i);else{var h=o(i,i),g={action:"create-option",name:u};c(s?[].concat(Object(r.a)(Object(m.c)(d)),[h]):h,g)}};var n=e.options||[];return t.state={newOption:void 0,options:n},t}return Object(s.a)(o,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=e.allowCreateWhileLoading,a=e.createOptionPosition,n=e.formatCreateLabel,o=e.getNewOptionData,i=e.inputValue,s=e.isLoading,c=e.isValidNewOption,l=e.value,d=e.options||[],u=this.state.newOption;u=c(i,Object(m.c)(l),d)?o(i,n(i)):void 0,this.setState({newOption:u,options:!t&&s||!u?d:"first"===a?[u].concat(Object(r.a)(d)):[].concat(Object(r.a)(d),[u])})}},{key:"focus",value:function(){this.select.focus()}},{key:"blur",value:function(){this.select.blur()}},{key:"render",value:function(){var t=this,a=this.state.options;return p.a.createElement(e,Object(n.a)({},this.props,{ref:function(e){t.select=e},options:a,onChange:this.onChange}))}}]),o}(u.Component),t.defaultProps=v,a},I=O(f.a),E=Object(h.a)(I);t.a=E},968:function(e,t,a){"use strict";var n=a(5),r=a.n(n),o=a(0),i=a.n(o),s=a(3),c=a.n(s),l=(a(550),a(143),a(547),a(13),a(14),a(15),a(9),a(16),a(17),a(12),a(22),a(83),a(90),a(125)),d=(a(84),a(548),a(225),a(287)),u=a(81),p=a(23),m=a(56),f=a(55),h=a(57),g=a(64),b=a(44),y=a(26);function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(b.a)(e);if(t){var r=Object(b.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(g.a)(this,a)}}var O={cacheOptions:!1,defaultOptions:!1,filterOption:null,isLoading:!1},I=function(e){var t,a;return a=t=function(t){Object(h.a)(n,t);var a=v(n);function n(e){var t;return Object(m.a)(this,n),(t=a.call(this)).select=void 0,t.lastRequest=void 0,t.mounted=!1,t.optionsCache={},t.handleInputChange=function(e,a){var n=t.props,r=n.cacheOptions,o=n.onInputChange,i=Object(y.f)(e,a,o);if(!i)return delete t.lastRequest,void t.setState({inputValue:"",loadedInputValue:"",loadedOptions:[],isLoading:!1,passEmptyOptions:!1});if(r&&t.optionsCache[i])t.setState({inputValue:i,loadedInputValue:i,loadedOptions:t.optionsCache[i],isLoading:!1,passEmptyOptions:!1});else{var s=t.lastRequest={};t.setState({inputValue:i,isLoading:!0,passEmptyOptions:!t.state.loadedInputValue},(function(){t.loadOptions(i,(function(e){t.mounted&&(e&&(t.optionsCache[i]=e),s===t.lastRequest&&(delete t.lastRequest,t.setState({isLoading:!1,loadedInputValue:i,loadedOptions:e||[],passEmptyOptions:!1})))}))}))}return i},t.state={defaultOptions:Array.isArray(e.defaultOptions)?e.defaultOptions:void 0,inputValue:void 0!==e.inputValue?e.inputValue:"",isLoading:!0===e.defaultOptions,loadedOptions:[],passEmptyOptions:!1},t}return Object(f.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.mounted=!0;var t=this.props.defaultOptions,a=this.state.inputValue;!0===t&&this.loadOptions(a,(function(t){if(e.mounted){var a=!!e.lastRequest;e.setState({defaultOptions:t||[],isLoading:a})}}))}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){e.cacheOptions!==this.props.cacheOptions&&(this.optionsCache={}),e.defaultOptions!==this.props.defaultOptions&&this.setState({defaultOptions:Array.isArray(e.defaultOptions)?e.defaultOptions:void 0})}},{key:"componentWillUnmount",value:function(){this.mounted=!1}},{key:"focus",value:function(){this.select.focus()}},{key:"blur",value:function(){this.select.blur()}},{key:"loadOptions",value:function(e,t){var a=this.props.loadOptions;if(!a)return t();var n=a(e,t);n&&"function"==typeof n.then&&n.then(t,(function(){return t()}))}},{key:"render",value:function(){var t=this,a=this.props,n=(a.loadOptions,a.isLoading),r=Object(u.a)(a,["loadOptions","isLoading"]),o=this.state,s=o.defaultOptions,c=o.inputValue,l=o.isLoading,d=o.loadedInputValue,m=o.loadedOptions,f=o.passEmptyOptions?[]:c&&d?m:s||[];return i.a.createElement(e,Object(p.a)({},r,{ref:function(e){t.select=e},options:f,isLoading:l||n,onInputChange:this.handleInputChange}))}}]),n}(o.Component),t.defaultProps=O,a},E=(I(Object(d.a)(l.a)),a(936)),C=Object(E.b)(l.a),j=I(Object(d.a)(C));function w(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function q(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?w(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):w(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var D=function(e){var t=e.label,a=e.size,n=e.id,r=e.name,o=e.value,s=e.loadOptions,c=e.optionId,l=e.optionName,d=e.onChangeAction,u=e.handleInputChange,p=e.required,m=e.allowCreate,f=e.multi,h=e.error,g=e.errorMessage,b=e.isLoading,y=e.disabled,v=e.placeholder,O=e.clearable,I={option:function(e){return q(q({},e),{},{fontSize:"12px"})},singleValue:function(e){return q(q({},e),{},{fontSize:"12px"})},menu:function(e){return q(q({},e),{},{zIndex:20})}};return i.a.createElement("div",{className:"form-group col-sm-12"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-sm-3"},i.a.createElement("label",{htmlFor:n,className:"col-sm-12 ".concat(p)},t)),i.a.createElement("div",{className:"".concat(a)},i.a.createElement(j,{id:n,name:r,onChange:function(e){return d(e)},value:o,loadOptions:s,onInputChange:u,getOptionLabel:function(e){return e[l]},getOptionValue:function(e){return e[c]},placeholder:v,noOptionsMessage:function(){return"Geen opties gevonden (tik om te zoeken minimaal 2 tekens)"},loadingMessage:function(){return"Laden"},isMulti:f,simpleValue:!0,removeSelected:!0,className:h?" has-error":"",isLoading:b,isDisabled:y,styles:I,isClearable:O,formatCreateLabel:function(e){return'Maak optie "'.concat(e,'" aan')},getNewOptionData:function(e,t){return m?{id:t,name:t,__isNew__:!0}:{}},theme:function(e){return q(q({},e),{},{colors:q({},e.colors),spacing:q(q({},e.spacing),{},{baseUnit:2,controlHeight:24,menuGutter:4})})}})),h&&i.a.createElement("div",{className:"col-sm-offset-3 col-sm-8"},i.a.createElement("span",{className:"has-error-message"}," ",g))))};D.defaultProps={allowCreate:!1,className:"",size:"col-sm-8",optionId:"id",optionName:"name",disabled:!1,required:"",error:!1,errorMessage:"",value:"",multi:!0,isLoading:!1,placeholder:"",clearable:!1},D.propTypes={allowCreate:c.a.bool,label:c.a.string.isRequired,className:c.a.string,size:c.a.string,id:c.a.string,name:c.a.string.isRequired,loadOptions:c.a.array,optionId:c.a.string,optionName:c.a.string,value:c.a.oneOfType([c.a.email,c.a.number]),onChangeAction:c.a.func,handleInputChange:c.a.func,required:c.a.string,disabled:c.a.bool,error:c.a.bool,errorMessage:c.a.string,multi:c.a.bool,isLoading:c.a.bool,placeholder:c.a.string,clearable:c.a.bool};t.a=D},969:function(e,t,a){"use strict";var n=a(5),r=a.n(n),o=a(0),i=a.n(o),s=a(3),c=a.n(s),l=a(306);function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var p=function(e){var t=e.label,a=e.id,n=e.name,r=e.value,o=e.options,s=e.optionId,c=e.optionName,d=e.onChangeAction,p=e.required,m=e.error,f=e.errorMessage,h=e.isLoading,g=e.disabled,b=e.placeholder,y=e.clearable,v={option:function(e){return u(u({},e),{},{fontSize:"12px"})},singleValue:function(e){return u(u({},e),{},{fontSize:"12px"})},menu:function(e){return u(u({},e),{},{zIndex:20})}};return i.a.createElement("div",{className:"form-group col-sm-12"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-sm-3"},i.a.createElement("label",{htmlFor:a,className:"col-sm-12 ".concat(p)},t)),i.a.createElement("div",{className:"col-sm-8"},i.a.createElement(l.a,{id:a,name:n,value:o&&r?o.find((function(e){return e[s]===r})):"",onChange:function(e){return d(e?e[s]:"",n)},options:o,getOptionLabel:function(e){return e[c]},getOptionValue:function(e){return e[s]},placeholder:b,noOptionsMessage:function(){return"Geen opties gevonden"},loadingMessage:function(){return"Laden"},isMulti:!1,simpleValue:!0,removeSelected:!0,className:m?" has-error":"",isLoading:h,isDisabled:g,styles:v,isClearable:y,theme:function(e){return u(u({},e),{},{colors:u({},e.colors),spacing:u(u({},e.spacing),{},{baseUnit:2,controlHeight:24,menuGutter:4})})}})),m&&i.a.createElement("div",{className:"col-sm-offset-3 col-sm-8"},i.a.createElement("span",{className:"has-error-message"}," ",f))))};p.defaultProps={optionId:"id",optionName:"name",disabled:!1,required:"",error:!1,errorMessage:"",value:"",isLoading:!1,placeholder:"",clearable:!1},p.propTypes={label:c.a.string.isRequired,id:c.a.string,name:c.a.string.isRequired,options:c.a.array,optionId:c.a.string,optionName:c.a.string,value:c.a.oneOfType([c.a.string,c.a.number]),onChangeAction:c.a.func,onBlurAction:c.a.func,required:c.a.string,disabled:c.a.bool,error:c.a.bool,errorMessage:c.a.string,isLoading:c.a.bool,placeholder:c.a.string,clearable:c.a.bool},t.a=p}}]);