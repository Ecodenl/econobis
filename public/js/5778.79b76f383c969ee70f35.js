"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[5778],{53530:(e,t,a)=>{a.d(t,{A:()=>m});var n=a(96540),o=a(96522),r=a(5556),s=a.n(r),c=a(62493),l=a(55956),i=function(e){var t=e.label,a=e.className,r=e.id,s=e.value,i=e.switchToEdit;return n.createElement("div",{className:a},n.createElement("label",{htmlFor:r,className:"col-sm-3"},t,i?n.createElement("span",null,n.createElement("br",null),n.createElement(l.A,{buttonClassName:"btn-success btn-padding-small",buttonText:"Wijzig",onClickAction:i})):""),n.createElement(c.A,{className:"col-sm-9"},n.createElement(o.A,null,n.createElement("div",{id:r,dangerouslySetInnerHTML:{__html:s}}))))};i.defaultProps={className:"col-sm-12",value:""},i.propTypes={label:s().string.isRequired,className:s().string,id:s().string,value:s().oneOfType([s().string,s().number])};const m=i},65778:(e,t,a)=>{a.r(t),a.d(t,{default:()=>Ee});var n=a(23029),o=a(92901),r=a(56822),s=a(53954),c=a(85501),l=a(64467),i=a(96540),m=a(24179),d=a(57761),u=a.n(d),p=a(10467),h=a(54756),g=a.n(h),C=a(69733),v=a(14809),f=a(54814),E=a(77465),A=a(14585),y=a(93822);const I=(0,C.Ng)((function(e){return{documentTypes:e.systemData.documentTypes,administrations:e.meDetails.administrations}}),null)((function(e){var t=e.document,a=e.errors,n=e.errorMessage,o=e.contactGroups,r=void 0===o?[]:o,s=e.intakes,c=void 0===s?[]:s,l=e.opportunities,m=void 0===l?[]:l,d=e.tasks,u=void 0===d?[]:d,h=e.quotationRequests,C=void 0===h?[]:h,I=e.housingFiles,b=void 0===I?[]:I,N=e.projects,T=void 0===N?[]:N,D=e.participants,k=void 0===D?[]:D,j=e.orders,q=void 0===j?[]:j,w=e.measures,S=void 0===w?[]:w,R=e.campaigns,x=void 0===R?[]:R,G=e.handleInputChange,O=e.handleProjectChange,M=e.documentTypes,P=e.administrations,L=e.handleInputChangeContactId,F=e.searchTermContact,B=e.isLoadingContact,U=e.setSearchTermContact,z=e.setLoadingContact,H=t.documentCreatedFrom,K=t.administrationId,V=t.contactId,W=t.selectedContact,Q=t.contactGroupId,_=t.intakeId,J=t.opportunityId,X=t.documentType,Y=t.description,Z=t.taskId,$=t.quotationRequestId,ee=t.housingFileId,te=t.projectId,ae=t.participantId,ne=t.orderId,oe=t.measureId,re=t.campaignId,se=t.showOnPortal,ce=M.find((function(e){return e.id==X})).name,le=""===V&&""===Q&&""===Z&&""===te&&""===ae&&""===ne&&""===K&&""===oe&&""===re,ie=function(){var e=(0,p.A)(g().mark((function e(){var t;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(F.length<=1)){e.next=2;break}return e.abrupt("return");case 2:return z(!0),e.prev=3,e.next=6,y.A.fetchContactSearch(F);case 6:return t=e.sent,z(!1),e.abrupt("return",t.data.data);case 11:e.prev=11,e.t0=e.catch(3),z(!1);case 14:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(){return e.apply(this,arguments)}}();return i.createElement("div",{className:"margin-30-bottom"},a.docLinkedAtAny&&i.createElement("div",{className:"row"},i.createElement("div",{className:"col-sm-12"},i.createElement("span",{className:"has-error-message"}," ",n.docLinkedAtAny))),i.createElement("div",{className:"row"},i.createElement(f.A,{label:"Type",name:"documentTypeName",value:ce,readOnly:!0})),i.createElement("div",{className:"row"},i.createElement(A.A,{label:"Contact",name:"contactId",id:"contactId",size:"col-sm-6",loadOptions:ie,optionName:"fullName",value:W,onChangeAction:L,required:"required",error:a.docLinkedAtAny,isLoading:B,handleInputChange:function(e){U(e)},multi:!1,disabled:["contact","intake","opportunity","quotationrequest","housingfile","participant"].includes(H.codeRef)})),i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Groep",name:"contactGroupId",value:Q,options:r,onChangeAction:G,required:le&&"required",error:a.docLinkedAtAny,readOnly:["contactgroup"].includes(H.codeRef)}),i.createElement(v.A,{label:"Intake",name:"intakeId",value:_,options:c,onChangeAction:G,readOnly:["intake","quotationrequest","opportunity"].includes(H.codeRef)})),i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Kans",name:"opportunityId",value:J,options:m,onChangeAction:G,readOnly:["opportunity","quotationrequest"].includes(H.codeRef)}),i.createElement(v.A,{label:"Taak",name:"taskId",value:Z,options:u,onChangeAction:G,required:le&&"required",error:a.docLinkedAtAny,readOnly:["task"].includes(H.codeRef)})),i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Kansactie",name:"quotationRequestId",value:$,options:C,onChangeAction:G,readOnly:["quotationrequest"].includes(H.codeRef)}),i.createElement(v.A,{label:"Woningdossier",name:"housingFileId",value:ee,options:b,onChangeAction:G,readOnly:["housingfile"].includes(H.codeRef)})),i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Project",name:"projectId",value:te,options:T,onChangeAction:O,required:le&&"required",error:a.docLinkedAtAny}),i.createElement(v.A,{label:"Deelnemer project",name:"participantId",value:ae,options:te?k:[],placeholder:te?"":"Kies eerst een project",onChangeAction:G})),i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Order",name:"orderId",value:ne,options:q,onChangeAction:G,required:le&&"required",error:a.docLinkedAtAny,readOnly:["order"].includes(H.codeRef)}),i.createElement(v.A,{label:"Administratie",name:"administrationId",value:K,options:P,onChangeAction:G,required:le&&"required",error:a.docLinkedAtAny})),i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Maatregel",name:"measureId",value:oe,options:S,onChangeAction:G,required:le&&"required",error:a.docLinkedAtAny,readOnly:["measure"].includes(H.codeRef)}),i.createElement(v.A,{label:"Campagne",name:"campaignId",value:re,options:x,onChangeAction:G,required:le&&"required",error:a.docLinkedAtAny,readOnly:["campaign","quotationrequest"].includes(H.codeRef)})),i.createElement("div",{className:"row"},i.createElement(E.A,{label:"Tonen op portal",name:"showOnPortal",value:se,onChangeAction:G})),i.createElement("div",{className:"row"},i.createElement("div",{className:"form-group col-sm-12"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-sm-3"},i.createElement("label",{className:"col-sm-12 required"},"Omschrijving")),i.createElement("div",{className:"col-sm-6"},i.createElement("input",{type:"text",className:"form-control input-sm "+(a&&a.description?"has-error":""),name:"description",value:Y,onChange:G})),a.description&&i.createElement("div",{className:"col-sm-3"},i.createElement("span",{className:"has-error-message"}," ",n.description))))))}));var b=a(22102),N=a(62493),T=a(55849),D=a(55956),k=a(5544),j=a(26369),q=a(98564);a(53530);const w=(0,C.Ng)((function(e){return{documentGroups:e.systemData.documentGroups}}),null)((function(e){var t=(0,i.useState)(""),a=(0,k.A)(t,2),n=a[0],o=a[1],r=e.document,s=e.templates,c=e.errors,l=e.errorMessage,m=e.handleInputChange,d=e.handleTextChange,u=e.handleDocumentGroupChange,p=e.handleDocumentTemplateChange,h=e.documentGroups,g=r.documentGroup,C=r.templateId,v=r.allowChangeHtmlBody,f=r.initialHtmlBody,E=r.freeText1,A=r.freeText2;return(0,i.useEffect)((function(){d(n)}),[n]),i.createElement(i.Fragment,null,i.createElement("div",{className:"row"},i.createElement(q.A,{label:"Documentgroep",name:"documentGroup",value:g,options:h,onChangeAction:u,required:"required",error:c.documentGroup,errorMessage:l.documentGroup})),i.createElement("div",{className:"row"},i.createElement(q.A,{label:"Template",name:"templateId",value:C,options:s,onChangeAction:p,required:"required",error:c.templateId,errorMessage:l.templateId})),i.createElement("div",{className:"row"},i.createElement("div",{className:"form-group col-sm-12"},i.createElement("div",{className:"row"},v?i.createElement(j.A,{label:"Template inhoud",initialValue:f,value:""!=n?n:f,onChangeAction:function(e,t){return o(e)}}):null))),i.createElement("div",{className:"row"},i.createElement("div",{className:"form-group col-sm-12"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-sm-3"},i.createElement("label",{className:"col-sm-12"},"Tekst veld 1")),i.createElement("div",{className:"col-sm-9"},i.createElement("input",{type:"text",className:"form-control input-sm",name:"freeText1",value:E,onChange:m})))),i.createElement("div",{className:"form-group col-sm-12"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-sm-3"},i.createElement("label",{className:"col-sm-12"},"Tekst veld 2")),i.createElement("div",{className:"col-sm-9"},i.createElement("input",{type:"text",className:"form-control input-sm",name:"freeText2",value:A,onChange:m}))))))}));var S=a(5556),R=a.n(S),x=a(63750),G=void 0,O=a(14825).A,M=function(e){var t=e.title,a=e.errors,n=e.multiple,o=e.maxSize,r=e.toggleModal,s=e.onDropAccepted,c=e.onDropRejected;return i.createElement(x.A,{closeModal:r,showConfirmAction:!1,title:t},i.createElement("div",{className:"upload-file-content"},i.createElement(O,{className:"dropzone",onDropAccepted:function(e){setTimeout((function(){s(e),r()}),300)}.bind(G),onDropRejected:c.bind(G),maxSize:o,multiple:n},i.createElement("p",null,"Klik hier voor het uploaden van een file (max. ",o/1048576,"MB)"),i.createElement("p",null,i.createElement("strong",null,"of")," sleep het bestand hierheen"))),a.uploadFailed&&i.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Probeer nogmaals het bestand te uploaden."),a.uploadMaxSize&&i.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Het bestand mag maximaal ",o/1048576,"MB groot zijn."))};M.defaultProps={errors:{},maxSize:21495808,multiple:!0,title:"Upload bestand"},M.propTypes={errors:R().object,maxSize:R().number,multiple:R().bool,onDropAccepted:R().func.isRequired,onDropRejected:R().func.isRequired,title:R().string,toggleModal:R().func.isRequired};const P=M;function L(e,t,a){return t=(0,s.A)(t),(0,r.A)(e,F()?Reflect.construct(t,a||[],(0,s.A)(e).constructor):t.apply(e,a))}function F(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(F=function(){return!!e})()}var B=function(e){function t(e){var a;return(0,n.A)(this,t),(a=L(this,t,[e])).state={showUploadModal:!1},a.toggleUploadModal=a.toggleUploadModal.bind(a),a}return(0,c.A)(t,e),(0,o.A)(t,[{key:"toggleUploadModal",value:function(){this.setState({showUploadModal:!this.state.showUploadModal})}},{key:"render",value:function(){var e=this.props,t=e.document,a=e.errors,n=e.errorMessage,o=e.handleInputChange,r=e.documentGroups,s=e.onDropAccepted,c=e.onDropRejected,l=t.documentGroup,m=t.attachment;return i.createElement("div",null,i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Documentgroep",name:"documentGroup",value:l,options:r,onChangeAction:o,required:"required",error:a.documentGroup,errorMessage:n.documentGroup}),i.createElement("div",{className:"form-group col-sm-6"},i.createElement("label",{className:"col-sm-6"},"Kies bestand"),i.createElement("div",{className:"col-sm-6"},i.createElement("input",{type:"text",className:"form-control input-sm col-sm-6 ".concat(a.noDocument?"has-error":""),value:m&&m.name,onClick:this.toggleUploadModal})),a&&i.createElement("div",{className:"col-sm-offset-6 col-sm-6"},i.createElement("span",{className:"has-error-message"}," ",n.noDocument)))),this.state.showUploadModal&&i.createElement(P,{onDropAccepted:s.bind(this),onDropRejected:c.bind(this),toggleModal:this.toggleUploadModal,multiple:!1,errors:a}))}}])}(i.Component);const U=(0,C.Ng)((function(e){return{documentGroups:e.systemData.documentGroups}}),null)(B),z=function(e){var t=e.document,a=e.projects,n=e.participants,o=e.orders,r=e.contactGroups,s=e.templates,c=e.intakes,l=e.opportunities,m=e.campaigns,d=e.housingFiles,u=e.quotationRequests,p=e.measures,h=e.tasks,g=e.errors,C=e.errorMessage,v=e.handleSubmit,f=e.handleDocumentGroupChange,E=e.handleInputChange,A=e.handleTextChange,y=e.handleProjectChange,k=e.handleDocumentTemplateChange,j=e.onDropAccepted,q=e.onDropRejected,S=e.handleInputChangeContactId,R=e.searchTermContact,x=e.isLoadingContact,G=e.setSearchTermContact,O=e.setLoadingContact,M="internal"===t.documentType?"Maak document":"Upload document";return i.createElement("form",{className:"form-horizontal",onSubmit:v},i.createElement(N.A,null,i.createElement(T.A,null,i.createElement(I,{tasks:h,quotationRequests:u,housingFiles:d,document:t,contactGroups:r,intakes:c,opportunities:l,projects:a,participants:n,orders:o,measures:p,campaigns:m,errors:g,errorMessage:C,handleInputChange:E,handleProjectChange:y,handleInputChangeContactId:S,searchTermContact:R,isLoadingContact:x,setSearchTermContact:G,setLoadingContact:O}),"internal"===t.documentType?i.createElement(w,{document:t,errors:g,errorMessage:C,handleInputChange:E,handleTextChange:A,templates:s,handleDocumentGroupChange:f,handleDocumentTemplateChange:k}):i.createElement(U,{document:t,errors:g,errorMessage:C,handleInputChange:E,onDropAccepted:j,onDropRejected:q}),i.createElement(b.A,null,i.createElement("div",{className:"pull-right"},i.createElement(D.A,{buttonText:M,onClickAction:v,type:"submit",value:"Submit"}))))))};var H=a(91858);const K=function(e){e.handleSubmit;var t=e.documentCreatedFromName;return i.createElement("div",{className:"row"},i.createElement("div",{className:"col-md-4"},i.createElement("div",{className:"btn-group btn-group-flex margin-small margin-10-right",role:"group"},i.createElement(H.A,{iconName:"arrowLeft",onClickAction:m.Nc.goBack}))),i.createElement("div",{className:"col-md-4"},i.createElement("h4",{className:"text-center margin-small"},"Nieuw document")),i.createElement("div",{className:"col-md-4"},i.createElement("h4",{className:"text-right margin-10-right"},"Gemaakt vanuit/voor: ",i.createElement("strong",null,t||""))))};var V=a(78441),W=(a(2543),a(60738)),Q=a(48240),_=a(73941),J=a(34390),X=a(68821),Y=a(63950),Z=a(46749),$=a(38732),ee=a(49957),te=a(875),ae=a(44758),ne=a(45872),oe=a(77798),re=a(61741),se=a(89686);const ce=(0,C.Ng)((function(e){return{documentTypes:e.systemData.documentTypes}}),null)((function(e){var t=e.document,a=e.errors,n=e.projects,o=void 0===n?[]:n,r=e.handleInputChange,s=e.documentTypes,c=t.documentType,l=t.description,m=t.projectId,d=t.showOnPortal,u=s.find((function(e){return e.id==c})).name;return i.createElement("div",{className:"margin-30-bottom"},i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Project",name:"projectId",value:m,options:o,onChangeAction:r,required:"required",readOnly:!0,error:a.docLinkedAtAny}),i.createElement(f.A,{label:"Type",name:"documentTypeName",value:u,readOnly:!0})),i.createElement("div",{className:"row"},i.createElement(E.A,{label:"Tonen op portal",name:"showOnPortal",value:d,onChangeAction:r})),i.createElement("div",{className:"row"},i.createElement("div",{className:"form-group col-sm-12"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-sm-3"},i.createElement("label",{className:"col-sm-12 required"},"Omschrijving")),i.createElement("div",{className:"col-sm-6"},i.createElement("input",{type:"text",className:"form-control input-sm "+(a&&a.description?"has-error":""),name:"description",value:l,onChange:r}))))))})),le=function(e){var t=e.document,a=e.projects,n=e.templates,o=e.errors,r=e.errorMessage,s=e.handleSubmit,c=e.handleInputChange,l=e.handleTextChange,m=e.handleDocumentGroupChange,d=e.handleDocumentTemplateChange,u=e.onDropAccepted,p=e.onDropRejected,h="internal"===t.documentType?"Maak document":"Upload document";return i.createElement("form",{className:"form-horizontal",onSubmit:s},i.createElement(N.A,null,i.createElement(T.A,null,i.createElement(ce,{document:t,projects:a,errors:o,errorMessage:r,handleInputChange:c}),"internal"===t.documentType?i.createElement(w,{document:t,errors:o,errorMessage:r,handleInputChange:c,handleTextChange:l,templates:n,handleDocumentGroupChange:m,handleDocumentTemplateChange:d}):i.createElement(U,{document:t,errors:o,errorMessage:r,handleInputChange:c,onDropAccepted:u,onDropRejected:p}),i.createElement(b.A,null,i.createElement("div",{className:"pull-right"},i.createElement(D.A,{buttonText:h,onClickAction:s,type:"submit",value:"Submit"}))))))},ie=(0,C.Ng)((function(e){return{documentTypes:e.systemData.documentTypes,administrations:e.meDetails.administrations}}),null)((function(e){var t=e.document,a=e.errors,n=void 0===a?[]:a,o=e.handleInputChange,r=e.documentTypes,s=e.administrations,c=t.documentType,l=t.description,m=t.administrationId,d=t.showOnPortal,u=r.find((function(e){return e.id==c})).name;return i.createElement("div",{className:"margin-30-bottom"},i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Administratie",name:"administrationId",value:m,options:s,onChangeAction:o,required:"required",readOnly:!0,error:n.docLinkedAtAny}),i.createElement(f.A,{label:"Type",name:"documentTypeName",value:u,readOnly:!0})),i.createElement("div",{className:"row"},i.createElement(E.A,{label:"Tonen op portal",name:"showOnPortal",value:d,onChangeAction:o})),i.createElement("div",{className:"row"},i.createElement("div",{className:"form-group col-sm-12"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-sm-3"},i.createElement("label",{className:"col-sm-12 required"},"Omschrijving")),i.createElement("div",{className:"col-sm-6"},i.createElement("input",{type:"text",className:"form-control input-sm "+(n&&n.description?"has-error":""),name:"description",value:l,onChange:o}))))))})),me=function(e){var t=e.document,a=e.templates,n=e.errors,o=e.errorMessage,r=e.handleSubmit,s=e.handleInputChange,c=e.handleTextChange,l=e.handleDocumentGroupChange,m=e.handleDocumentTemplateChange,d=e.onDropAccepted,u=e.onDropRejected,p="internal"===t.documentType?"Maak document":"Upload document";return i.createElement("form",{className:"form-horizontal",onSubmit:r},i.createElement(N.A,null,i.createElement(T.A,null,i.createElement(ie,{document:t,errors:n,errorMessage:o,handleInputChange:s}),"internal"===t.documentType?i.createElement(w,{document:t,errors:n,errorMessage:o,handleInputChange:s,handleTextChange:c,templates:a,handleDocumentGroupChange:l,handleDocumentTemplateChange:m}):i.createElement(U,{document:t,errors:n,errorMessage:o,handleInputChange:s,onDropAccepted:d,onDropRejected:u}),i.createElement(b.A,null,i.createElement("div",{className:"pull-right"},i.createElement(D.A,{buttonText:p,onClickAction:r,type:"submit",value:"Submit"}))))))},de=(0,C.Ng)((function(e){return{documentTypes:e.systemData.documentTypes}}),null)((function(e){var t=e.document,a=e.errors,n=e.projects,o=void 0===n?[]:n,r=e.participants,s=void 0===r?[]:r,c=e.handleInputChange,l=e.documentTypes,m=t.documentType,d=t.description,u=t.projectId,p=t.participantId,h=t.showOnPortal,g=l.find((function(e){return e.id==m})).name;return i.createElement("div",{className:"margin-30-bottom"},i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Project",name:"projectId",value:u,options:o,onChangeAction:c,required:"required",readOnly:!0,error:a.docLinkedAtAny}),i.createElement(f.A,{label:"Type",name:"documentTypeName",value:g,readOnly:!0})),i.createElement("div",{className:"row"},i.createElement(v.A,{label:"Deelnemer project",name:"participantId",value:p,options:s,onChangeAction:c,required:"required",readOnly:!0,error:a.docLinkedAtAny})),i.createElement("div",{className:"row"},i.createElement(E.A,{label:"Tonen op portal",name:"showOnPortal",value:h,onChangeAction:c})),i.createElement("div",{className:"row"},i.createElement("div",{className:"form-group col-sm-12"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-sm-3"},i.createElement("label",{className:"col-sm-12 required"},"Omschrijving")),i.createElement("div",{className:"col-sm-6"},i.createElement("input",{type:"text",className:"form-control input-sm "+(a&&a.description?"has-error":""),name:"description",value:d,onChange:c}))))))})),ue=function(e){var t=e.document,a=e.projects,n=e.participants,o=e.templates,r=e.errors,s=e.errorMessage,c=e.handleSubmit,l=e.handleInputChange,m=e.handleTextChange,d=e.handleDocumentGroupChange,u=e.handleDocumentTemplateChange,p=e.onDropAccepted,h=e.onDropRejected,g="internal"===t.documentType?"Maak document":"Upload document";return i.createElement("form",{className:"form-horizontal",onSubmit:c},i.createElement(N.A,null,i.createElement(T.A,null,i.createElement(de,{document:t,projects:a,participants:n,errors:r,errorMessage:s,handleInputChange:l}),"internal"===t.documentType?i.createElement(w,{document:t,errors:r,errorMessage:s,handleInputChange:l,handleTextChange:m,templates:o,handleDocumentGroupChange:d,handleDocumentTemplateChange:u}):i.createElement(U,{document:t,errors:r,errorMessage:s,handleInputChange:l,onDropAccepted:p,onDropRejected:h}),i.createElement(b.A,null,i.createElement("div",{className:"pull-right"},i.createElement(D.A,{buttonText:g,onClickAction:c,type:"submit",value:"Submit"}))))))};var pe=a(63923);function he(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ge(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?he(Object(a),!0).forEach((function(t){(0,l.A)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):he(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function Ce(e,t,a){return t=(0,s.A)(t),(0,r.A)(e,ve()?Reflect.construct(t,a||[],(0,s.A)(e).constructor):t.apply(e,a))}function ve(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(ve=function(){return!!e})()}var fe=function(e){function t(e){var a;(0,n.A)(this,t),a=Ce(this,t,[e]),(0,l.A)(a,"handleInputChangeContactId",(function(e){var t=e?e.id:null;t&&a.setState(ge(ge({},a.state),{},{document:ge(ge({},a.state.document),{},{contactId:t,selectedContact:e})}))}));var o;o=e.params.participantId?"participant":e.params.opportunityId?"opportunity":e.params.quotationRequestId?"quotationrequest":e.params.housingFileId?"housingfile":e.params.intakeId?"intake":e.params.measureId?"measure":e.params.administrationId?"administration":e.params.campaignId?"campaign":e.params.taskId?"task":e.params.projectId?"project":e.params.orderId?"order":e.params.contactGroupId?"contactgroup":e.params.contactId?"contact":e.params.emailAttachmentId?"emailattachment":"document";var r=a.props.documentCreatedFroms.find((function(e){return e.codeRef==o}));return a.state={contactsGroups:[],intakes:[],opportunities:[],templates:[],campaigns:[],housingFiles:[],quotationRequests:[],measures:[],tasks:[],participants:[],projects:[],orders:[],document:{administrationId:a.props.params.administrationId||"",contactId:a.props.params.contactId||"",selectedContact:null,contactGroupId:a.props.params.contactGroupId||"",intakeId:a.props.params.intakeId||"",opportunityId:a.props.params.opportunityId||"",campaignId:a.props.params.campaignId||"",housingFileId:a.props.params.housingFileId||"",quotationRequestId:a.props.params.quotationRequestId||"",measureId:a.props.params.measureId||"",taskId:a.props.params.taskId||"",projectId:a.props.params.projectId||"",participantId:a.props.params.participantId||"",orderId:a.props.params.orderId||"",documentCreatedFrom:r,documentType:a.props.params.type,description:"",documentGroup:"",templateId:"",allowChangeHtmlBody:!1,htmlBody:"",initialHtmlBody:"",freeText1:"",freeText2:"",sentById:"",attachment:"",filename:"temp",showOnPortal:!(!a.props.params.showOnPortal||"portal"!==a.props.params.showOnPortal)},errors:{docLinkedAtAny:!1,documentGroup:!1,uploadFailed:!1,templateId:!1,noDocument:!1,description:!1},errorMessage:{docLinkedAtAny:"",documentGroup:"",templateId:"",noDocument:"",description:""},searchTermContact:"",isLoadingContact:!1},a.handleInputChange=a.handleInputChange.bind(a),a.handleTextChange=a.handleTextChange.bind(a),a.handleSubmit=a.handleSubmit.bind(a),a.onDropAccepted=a.onDropAccepted.bind(a),a.onDropRejected=a.onDropRejected.bind(a),a.handleDocumentGroupChange=a.handleDocumentGroupChange.bind(a),a.handleDocumentTemplateChange=a.handleDocumentTemplateChange.bind(a),a.handleProjectChange=a.handleProjectChange.bind(a),a.setSearchTermContact=a.setSearchTermContact.bind(a),a.setLoadingContact=a.setLoadingContact.bind(a),a}return(0,c.A)(t,e),(0,o.A)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.params.contactId&&pe.A.getContactDetails(this.props.params.contactId).then((function(t){t&&e.setState(ge(ge({},e.state),{},{document:ge(ge({},e.state.document),{},{selectedContact:{id:t.id,fullName:t.fullName+" ("+t.number+")",primaryAddressId:t.primaryAddressId}})}))})),Q.A.peekIntakes().then((function(t){e.setState({intakes:t})})),W.A.peekContactGroups().then((function(t){e.setState({contactGroups:t})})),_.A.peekOpportunities().then((function(t){e.setState({opportunities:t})})),J.A.fetchDocumentTemplatesPeekGeneral().then((function(t){e.setState({templates:t})})),$.A.peekCampaigns().then((function(t){e.setState({campaigns:t})})),ee.A.peekHousingFiles().then((function(t){e.setState({housingFiles:t})})),te.A.peekQuotationRequests().then((function(t){e.setState({quotationRequests:t})})),Y.A.peekTasks().then((function(t){e.setState({tasks:t})})),X.A.peekMeasures().then((function(t){e.setState({measures:t})})),ae.A.peekProjects().then((function(t){e.setState({projects:t})})),oe.A.peekOrders().then((function(t){e.setState({orders:t})})),this.props.params.emailAttachmentId&&re.A.downloadAttachment(this.props.params.emailAttachmentId).then((function(t){var a=[new File([t.data],t.headers["x-filename"])];a.name=t.headers["x-filename"],e.setState(ge(ge({},e.state),{},{document:ge(ge({},e.state.document),{},{attachment:a[0],filename:t.headers["x-filename"],contactId:t.headers["x-contactid"]?t.headers["x-contactid"]:""})}))})),this.props.params.quotationRequestId&&se.A.fetchQuotationRequestDetails(this.props.params.quotationRequestId).then((function(t){e.setState(ge(ge({},e.state),{},{document:ge(ge({},e.state.document),{},{contactId:t.opportunity.intake.contact.id,intakeId:t.opportunity.intake.id,opportunityId:t.opportunity.id,measureId:t.opportunity.measures&&1==t.opportunity.measures.length?t.opportunity.measures[0].id:"",campaignId:t.opportunity.intake.campaign.id})}))})).finally((function(){return e.callFetchContact()})),this.props.params.projectId&&this.setParticipants(this.props.params.projectId)}},{key:"callFetchContact",value:function(){var e=this;pe.A.getContactDetails(this.state.document.contactId).then((function(t){t&&e.setState(ge(ge({},e.state),{},{document:ge(ge({},e.state.document),{},{selectedContact:{id:t.id,fullName:t.fullName+" ("+t.number+")",primaryAddressId:t.primaryAddressId}})}))}))}},{key:"handleInputChange",value:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,n=t.name;this.setState(ge(ge({},this.state),{},{document:ge(ge({},this.state.document),{},(0,l.A)({},n,a))}))}},{key:"handleProjectChange",value:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,n=t.name;this.setState(ge(ge({},this.state),{},{document:ge(ge({},this.state.document),{},(0,l.A)({},n,a))})),this.setParticipants(a)}},{key:"setParticipants",value:function(e){var t=this;ne.A.peekParticipantsProjects().then((function(a){var n=[];a.forEach((function(t){t.projectId==e&&n.push({id:t.id,name:t.name,projectId:t.projectId})})),t.setState({participants:n})}))}},{key:"handleDocumentGroupChange",value:function(e){var t=this;this.setState(ge(ge({},this.state),{},{document:ge(ge({},this.state.document),{},{documentGroup:e,templateId:"",allowChangeHtmlBody:!1,htmlBody:"",initialHtmlBody:""})})),J.A.fetchDocumentTemplatesPeekGeneral().then((function(a){var n=[];a.forEach((function(t){t.group==e&&n.push({id:t.id,name:t.name})})),t.setState({templates:n})}))}},{key:"handleDocumentTemplateChange",value:function(e){var t=this;J.A.fetchDocumentTemplate(e).then((function(a){t.setState(ge(ge({},t.state),{},{document:ge(ge({},t.state.document),{},{templateId:e,allowChangeHtmlBody:a.allowChangeHtmlBody,htmlBody:a.htmlBody?a.htmlBody:t.state.document.htmlBody,initialHtmlBody:a.htmlBody?a.htmlBody:t.state.document.htmlBody})}))})).catch((function(a){t.setState(ge(ge({},t.state),{},{document:ge(ge({},t.state.document),{},{templateId:e,allowChangeHtmlBody:!1,htmlBody:"",initialHtmlBody:""})}))}))}},{key:"handleTextChange",value:function(e){this.setState(ge(ge({},this.state),{},{document:ge(ge({},this.state.document),{},{htmlBody:e})}))}},{key:"onDropAccepted",value:function(e){this.setState(ge(ge({},this.state),{},{document:ge(ge({},this.state.document),{},{attachment:e[0],filename:e[0].name})}))}},{key:"onDropRejected",value:function(){this.setState(ge(ge({},this.state),{},{errors:ge(ge({},this.state.errors),{},{uploadFailed:!0})}))}},{key:"setSearchTermContact",value:function(e){this.setState(ge(ge({},this.state),{},{searchTermContact:e}))}},{key:"setLoadingContact",value:function(e){this.setState(ge(ge({},this.state),{},{isLoadingContact:e}))}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.state.document,n=a.administrationId,o=a.contactId,r=a.contactGroupId,s=a.intakeId,c=a.opportunityId,l=a.documentCreatedFrom,i=a.documentType,d=a.description,p=a.documentGroup,h=a.templateId,g=a.htmlBody,C=a.freeText1,v=a.freeText2,f=a.filename,E=a.sentById,A=a.campaignId,y=a.housingFileId,I=a.quotationRequestId,b=a.measureId,N=a.taskId,T=a.projectId,D=a.participantId,k=a.orderId,j=a.attachment,q=a.showOnPortal,w={},S={},R=!1;if(u().isEmpty(o+"")&&u().isEmpty(r+"")&&u().isEmpty(N+"")&&u().isEmpty(T+"")&&u().isEmpty(D+"")&&u().isEmpty(k+"")&&u().isEmpty(n+"")&&u().isEmpty(b+"")&&u().isEmpty(A+"")&&(w.docLinkedAtAny=!0,S.docLinkedAtAny="Minimaal 1 van de volgende gegevens moet geselecteerd zijn: Contact, Groep, Taak, Project, Deelnemer, Order, Administratie, Maatregel of Campagne.",R=!0),u().isEmpty(d+"")&&(w.description=!0,S.description="Verplicht",R=!0),u().isEmpty(p+"")&&(w.documentGroup=!0,S.documentGroup="Verplicht",R=!0),u().isEmpty(h+"")&&"internal"==i&&(w.templateId=!0,S.templateId="Verplicht",R=!0),u().isEmpty(j+"")&&"upload"==i&&(w.noDocument=!0,S.noDocument="Verplicht",R=!0),this.setState(ge(ge({},this.state),{},{errors:w,errorMessage:S})),!R){var x=new FormData;x.append("administrationId",n),x.append("contactId",o),x.append("contactGroupId",r),x.append("intakeId",s),x.append("opportunityId",c),x.append("documentCreatedFromId",l.id),x.append("documentType",i),x.append("description",d),x.append("documentGroup",p),x.append("templateId",h),x.append("htmlBody",g),x.append("freeText1",C),x.append("freeText2",v),x.append("filename",f),x.append("sentById",E),x.append("campaignId",A),x.append("housingFileId",y),x.append("quotationRequestId",I),x.append("measureId",b),x.append("taskId",N),x.append("projectId",T),x.append("participantId",D),x.append("orderId",k),x.append("attachment",j),x.append("showOnPortal",q),V.A.newDocument(x).then((function(e){e.data.data.filename.toLowerCase().endsWith(".pdf")?m.RL.push("/document/inzien/".concat(e.data.data.id)):m.RL.push("/document/".concat(e.data.data.id))})).catch((function(e){t.props.setError(e.response.status)}))}}},{key:"render",value:function(){return i.createElement("div",{className:"row"},i.createElement("div",{className:"col-md-9"},i.createElement("div",{className:"col-md-12"},i.createElement(N.A,null,i.createElement(T.A,{className:"panel-small"},i.createElement(K,{handleSubmit:this.handleSubmit,documentCreatedFromName:this.state.document.documentCreatedFrom.name})))),i.createElement("div",{className:"col-md-12"},"project"===this.state.document.documentCreatedFrom.codeRef?i.createElement(le,{document:this.state.document,templates:this.state.templates,projects:this.state.projects,errors:this.state.errors,errorMessage:this.state.errorMessage,handleSubmit:this.handleSubmit,handleDocumentGroupChange:this.handleDocumentGroupChange,handleInputChange:this.handleInputChange,handleTextChange:this.handleTextChange,handleDocumentTemplateChange:this.handleDocumentTemplateChange,onDropAccepted:this.onDropAccepted,onDropRejected:this.onDropRejected}):"administration"===this.state.document.documentCreatedFrom.codeRef?i.createElement(me,{document:this.state.document,templates:this.state.templates,errors:this.state.errors,errorMessage:this.state.errorMessage,handleSubmit:this.handleSubmit,handleDocumentGroupChange:this.handleDocumentGroupChange,handleInputChange:this.handleInputChange,handleTextChange:this.handleTextChange,handleDocumentTemplateChange:this.handleDocumentTemplateChange,onDropAccepted:this.onDropAccepted,onDropRejected:this.onDropRejected}):"participant"===this.state.document.documentCreatedFrom.codeRef?i.createElement(ue,{document:this.state.document,templates:this.state.templates,projects:this.state.projects,participants:this.state.participants,errors:this.state.errors,errorMessage:this.state.errorMessage,handleSubmit:this.handleSubmit,handleProjectChange:this.handleProjectChange,handleDocumentGroupChange:this.handleDocumentGroupChange,handleInputChange:this.handleInputChange,handleTextChange:this.handleTextChange,handleDocumentTemplateChange:this.handleDocumentTemplateChange,onDropAccepted:this.onDropAccepted,onDropRejected:this.onDropRejected}):i.createElement(z,{document:this.state.document,contactGroups:this.state.contactGroups,intakes:this.state.intakes,opportunities:this.state.opportunities,templates:this.state.templates,tasks:this.state.tasks,measures:this.state.measures,quotationRequests:this.state.quotationRequests,housingFiles:this.state.housingFiles,campaigns:this.state.campaigns,projects:this.state.projects,participants:this.state.participants,orders:this.state.orders,errors:this.state.errors,errorMessage:this.state.errorMessage,handleSubmit:this.handleSubmit,handleProjectChange:this.handleProjectChange,handleDocumentGroupChange:this.handleDocumentGroupChange,handleInputChange:this.handleInputChange,handleTextChange:this.handleTextChange,handleDocumentTemplateChange:this.handleDocumentTemplateChange,onDropAccepted:this.onDropAccepted,onDropRejected:this.onDropRejected,handleInputChangeContactId:this.handleInputChangeContactId,searchTermContact:this.state.searchTermContact,isLoadingContact:this.state.isLoadingContact,setSearchTermContact:this.setSearchTermContact,setLoadingContact:this.setLoadingContact}))),i.createElement("div",{className:"col-md-3"}))}}])}(i.Component);const Ee=(0,C.Ng)((function(e){return{documentCreatedFroms:e.systemData.documentCreatedFroms}}),(function(e){return{setError:function(t){e((0,Z.N)(t))}}}))(fe)}}]);