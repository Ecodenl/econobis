"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[340],{35714:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(4942),l=n(67294),s=n(45697),r=n.n(s),o=n(55519);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=function(e){var t=e.label,n=e.id,a=e.name,s=e.value,r=e.options,c=e.optionId,d=e.optionName,m=e.onChangeAction,u=e.required,h=e.error,p=e.errorMessage,f=e.isLoading,g=e.disabled,b=e.placeholder,v=e.clearable,y={option:function(e){return i(i({},e),{},{fontSize:"12px"})},singleValue:function(e){return i(i({},e),{},{fontSize:"12px"})},menu:function(e){return i(i({},e),{},{zIndex:20})}};return l.createElement("div",{className:"form-group col-sm-12"},l.createElement("div",{className:"row"},l.createElement("div",{className:"col-sm-3"},l.createElement("label",{htmlFor:n,className:"col-sm-12 ".concat(u)},t)),l.createElement("div",{className:"col-sm-8"},l.createElement(o.ZP,{id:n,name:a,value:r&&s?r.find((function(e){return e[c]===s})):"",onChange:function(e){return m(e?e[c]:"",a)},options:r,getOptionLabel:function(e){return e[d]},getOptionValue:function(e){return e[c]},placeholder:b,noOptionsMessage:function(){return"Geen opties gevonden"},loadingMessage:function(){return"Laden"},isMulti:!1,simpleValue:!0,removeSelected:!0,className:h?" has-error":"",isLoading:f,isDisabled:g,styles:y,isClearable:v,theme:function(e){return i(i({},e),{},{colors:i({},e.colors),spacing:i(i({},e.spacing),{},{baseUnit:2,controlHeight:24,menuGutter:4})})}})),h&&l.createElement("div",{className:"col-sm-offset-3 col-sm-8"},l.createElement("span",{className:"has-error-message"}," ",p))))};d.defaultProps={optionId:"id",optionName:"name",disabled:!1,required:"",error:!1,errorMessage:"",value:"",isLoading:!1,placeholder:"",clearable:!1},d.propTypes={label:r().string.isRequired,id:r().string,name:r().string.isRequired,options:r().array,optionId:r().string,optionName:r().string,value:r().oneOfType([r().string,r().number]),onChangeAction:r().func,onBlurAction:r().func,required:r().string,disabled:r().bool,error:r().bool,errorMessage:r().string,isLoading:r().bool,placeholder:r().string,clearable:r().bool};const m=d},30340:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ee});var a=n(93433),l=n(15671),s=n(43144),r=n(97326),o=n(60136),c=n(82963),i=n(61120),d=n(4942),m=n(67294),u=n(48966),h=n.n(u),p=(n(96486),n(14309)),f=n(37974),g=n(59227),b=n(35823),v=n.n(b),y=n(97894),E=n(77320);const A=(0,f.$j)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var t=e.attachment,n=t.id,a=t.name;return m.createElement("div",{className:"row border ".concat(e.highlightLine),onMouseEnter:function(){return e.onLineEnter()},onMouseLeave:function(){return e.onLineLeave()}},m.createElement("div",{onClick:function(){return function(e,t){g.Z.downloadAttachment(e).then((function(e){v()(e.data,t)}))}(n,a)},className:"col-sm-11"},a),m.createElement("div",{className:"col-sm-1"},e.showActionButtons?m.createElement("a",{role:"button",onClick:e.toggleDelete},m.createElement(y.ZP,{className:"mybtn-danger",size:14,icon:E._})):""))}));var S=n(41355);const Z=function(e){return m.createElement(S.Z,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:e.toggleDelete,confirmAction:function(){return e.deleteAttachment(e.attachment.name),void e.toggleDelete()},title:"Verwijderen"},m.createElement("p",null,"Wil je deze bijlage verwijderen?"))};const I=function(e){(0,o.Z)(u,e);var t,n,a=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=(0,i.Z)(t);if(n){var l=(0,i.Z)(this).constructor;e=Reflect.construct(a,arguments,l)}else e=a.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,l.Z)(this,u),t=a.call(this,e),(0,d.Z)((0,r.Z)(t),"onLineEnter",(function(){t.setState({showActionButtons:!0,highlightLine:"highlight-line"})})),(0,d.Z)((0,r.Z)(t),"onLineLeave",(function(){t.setState({showActionButtons:!1,highlightLine:""})})),(0,d.Z)((0,r.Z)(t),"toggleDelete",(function(){t.setState({showDelete:!t.state.showDelete})})),t.state={showActionButtons:!1,highlightLine:"",showDelete:!1},t}return(0,s.Z)(u,[{key:"render",value:function(){return m.createElement("div",null,m.createElement(A,{highlightLine:this.state.highlightLine,showActionButtons:this.state.showActionButtons,onLineEnter:this.onLineEnter,onLineLeave:this.onLineLeave,toggleDelete:this.toggleDelete,attachment:this.props.attachment}),this.state.showDelete&&m.createElement(Z,{toggleDelete:this.toggleDelete,attachment:this.props.attachment,deleteAttachment:this.props.deleteAttachment}))}}]),u}(m.Component),N=function(e){var t=e.attachments,n=e.deleteAttachment;return t=t&&t.filter((function(e){return!e.cid})),m.createElement("div",null,m.createElement("div",{className:"row border header"},m.createElement("div",{className:"col-sm-11"},"Naam"),m.createElement("div",{className:"col-sm-1"})),t.length>0?t.map((function(e){return m.createElement(I,{key:e.name,attachment:e,deleteAttachment:n})})):m.createElement("div",null,"Geen bijlages bekend."))};var w=n(88601).Z;const C=function(e){(0,o.Z)(r,e);var t,n,a=(t=r,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=(0,i.Z)(t);if(n){var l=(0,i.Z)(this).constructor;e=Reflect.construct(a,arguments,l)}else e=a.apply(this,arguments);return(0,c.Z)(this,e)});function r(e){var t;return(0,l.Z)(this,r),(t=a.call(this,e)).state={error:!1,errorMaxSize:!1},t}return(0,s.Z)(r,[{key:"onDropAccepted",value:function(e){this.props.addAttachment(e),this.props.toggleShowNew()}},{key:"onDropRejected",value:function(){this.setState({errorMaxSize:!0})}},{key:"render",value:function(){return m.createElement(S.Z,{closeModal:this.props.toggleShowNew,showConfirmAction:!1,title:"Upload bestand"},m.createElement("div",{className:"upload-file-content"},m.createElement(w,{className:"dropzone",onDropAccepted:this.onDropAccepted.bind(this),onDropRejected:this.onDropRejected.bind(this),maxSize:21495808},m.createElement("p",null,"Klik hier voor het uploaden van een bestand"),m.createElement("p",null,m.createElement("strong",null,"of")," sleep het bestand hierheen"))),this.state.error&&m.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Probeer nogmaals een bestand te uploaden."),this.state.errorMaxSize&&m.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Het bestand mag maximaal 20MB groot zijn."))}}]),r}(m.Component);var B=n(98688),T=n(80720),x=n(10055);var j=function(e){(0,o.Z)(u,e);var t,n,a=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=(0,i.Z)(t);if(n){var l=(0,i.Z)(this).constructor;e=Reflect.construct(a,arguments,l)}else e=a.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,l.Z)(this,u),t=a.call(this,e),(0,d.Z)((0,r.Z)(t),"toggleShowNew",(function(){t.setState({showNew:!t.state.showNew})})),t.state={showNew:!1},t}return(0,s.Z)(u,[{key:"render",value:function(){return m.createElement("div",null,m.createElement(T.Z,null,m.createElement("span",{className:"h5 text-bold"},"Bijlages"),m.createElement("a",{role:"button",className:"pull-right",onClick:this.toggleShowNew},m.createElement(y.ZP,{size:14,icon:x.P}))),m.createElement(B.Z,null,m.createElement("div",{className:"col-md-12"},m.createElement(N,{attachments:this.props.attachments,deleteAttachment:this.props.deleteAttachment})),m.createElement("div",{className:"col-md-12 margin-10-top"},this.state.showNew&&m.createElement(C,{toggleShowNew:this.toggleShowNew,addAttachment:this.props.addAttachment}))))}}]),u}(m.Component);const O=(0,f.$j)((function(e){return{permissions:e.meDetails.permissions}}))(j);var k=n(15861),L=n(29439),D=n(64687),P=n.n(D),R=n(75856),M=n(45697),z=n(4428),F=n(71515),W=n(35714);function q(e){var t=(0,m.useState)(""),n=(0,L.Z)(t,2),a=n[0],l=n[1],s=(0,m.useState)(!1),r=(0,L.Z)(s,2),o=r[0],c=r[1],i=(0,m.useState)([]),d=(0,L.Z)(i,2),u=d[0],h=d[1],p=(0,m.useState)([]),f=(0,L.Z)(p,2),g=f[0],b=f[1],v=(0,m.useState)([]),y=(0,L.Z)(v,2),E=y[0],A=y[1],S=(0,m.useState)(""),Z=(0,L.Z)(S,2),I=Z[0],N=Z[1],w=(0,m.useState)(!1),C=(0,L.Z)(w,2),T=C[0],x=C[1],j=(0,m.useState)(!1),O=(0,L.Z)(j,2),D=O[0],M=O[1],q=e.email,G=e.emailAddressesToSelected,H=e.emailAddressesCcSelected,V=e.emailAddressesBccSelected,U=e.mailboxAddresses,J=e.errors,$=e.hasLoaded,K=e.handleToIds,_=e.handleCcIds,Q=e.handleBccIds,X=e.handleInputChange,Y=e.handleTextChange,ee=e.emailTemplates,te=e.handleEmailTemplates,ne=e.handleFromIds,ae=q.mailboxId,le=q.to,se=q.cc,re=q.bcc,oe=q.subject,ce=q.initialHtmlBody,ie=q.emailTemplateId;(0,m.useEffect)((function(){Y(I)}),[I]),(0,m.useEffect)((function(){h(function(){var e=[];e=Array.isArray(le)?le:le.split(",");var t=[],n=!1;return e.map((function(e){if(e&&e.includes("@")&&(n=!0,t.push({id:e,name:e,email:e})),e&&!isNaN(e)){var a=G.find((function(t){return t.id===Number(e)}));t.push(a)}})),M(n),(t+"").split(",").length>1?x(!0):x(!1),t}())}),[le]),(0,m.useEffect)((function(){b(function(){var e=[];e=Array.isArray(se)?se:se.split(",");var t=[];return e.map((function(e){if(e&&e.includes("@")&&t.push({id:e,name:e,email:e}),e&&!isNaN(e)){var n=H.find((function(t){return t.id===Number(e)}));t.push(n)}})),t}())}),[se]),(0,m.useEffect)((function(){A(function(){var e=[];e=Array.isArray(re)?re:re.split(",");var t=[];return e.map((function(e){if(e&&e.includes("@")&&t.push({id:e,name:e,email:e}),e&&!isNaN(e)){var n=V.find((function(t){return t.id===Number(e)}));t.push(n)}})),t}())}),[re]);var de=function(){var e=(0,k.Z)(P().mark((function e(){var t;return P().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a.length<=1)){e.next=2;break}return e.abrupt("return");case 2:return c(!0),e.prev=3,e.next=6,z.Z.fetchEmailAddressessSearch(a);case 6:return t=e.sent,c(!1),e.abrupt("return",t.data);case 11:e.prev=11,e.t0=e.catch(3),c(!1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(){return e.apply(this,arguments)}}();function me(e){l(e)}return m.createElement(B.Z,null,m.createElement("div",{className:"row"},m.createElement(W.Z,{label:"Van selecteren",name:"mailboxId",value:ae,options:U,optionName:"email",onChangeAction:ne,required:"required",error:J.mailboxId})),m.createElement("div",{className:"row"},m.createElement(F.Z,{label:m.createElement("span",null,"Aan selecteren",T?m.createElement(m.Fragment,null,m.createElement("br",null),m.createElement("small",{style:{color:"red",fontWeight:"normal"}},"Meer dan 1 geselecteerd."),m.createElement("br",null),m.createElement("small",{style:{color:"red",fontWeight:"normal"}},"Samenvoegvelden contact niet mogelijk.")):D?m.createElement(m.Fragment,null,m.createElement("br",null),m.createElement("small",{style:{color:"red",fontWeight:"normal"}},'Geen contact geselecteerd, maar "los" emailadres ingevuld.'),m.createElement("br",null),m.createElement("small",{style:{color:"red",fontWeight:"normal"}},"Samenvoegvelden contact niet mogelijk.")):""),name:"to",value:u,loadOptions:de,optionName:"name",onChangeAction:K,allowCreate:!0,required:"required",error:J.to,isLoading:o,handleInputChange:me})),m.createElement("div",{className:"row"},m.createElement(F.Z,{label:"Cc selecteren",name:"cc",value:g,loadOptions:de,optionName:"name",onChangeAction:_,allowCreate:!0,error:J.cc,isLoading:o,handleInputChange:me})),m.createElement("div",{className:"row"},m.createElement(F.Z,{label:"Bcc selecteren",name:"bcc",value:E,loadOptions:de,optionName:"name",onChangeAction:Q,allowCreate:!0,error:J.bcc,isLoading:o,handleInputChange:me})),m.createElement("div",{className:"row"},m.createElement(W.Z,{label:"Template",name:"emailTemplateId",value:ie,options:ee,onChangeAction:te})),m.createElement("div",{className:"row"},m.createElement("div",{className:"form-group col-sm-12"},m.createElement("div",{className:"row"},m.createElement("div",{className:"col-sm-3"},m.createElement("label",{className:"col-sm-12 required"},"Onderwerp")),m.createElement("div",{className:"col-sm-9"},m.createElement("input",{type:"text",className:"form-control input-sm ".concat(J.subject?"has-error":""),name:"subject",value:oe,onChange:X}))))),m.createElement("div",{className:"row"},m.createElement("div",{className:"form-group col-sm-12"},m.createElement("div",{className:"row"},$&&m.createElement(R.Z,{label:"Tekst",initialValue:ce,value:""!=I?I:ce,onChangeAction:function(e,t){return N(e)}})))))}q.propTypes={email:M.any,emailAddressesToSelected:M.any,emailAddressesCcSelected:M.any,emailAddressesBccSelected:M.any,mailboxAddresses:M.any,errors:M.any,hasLoaded:M.any,handleToIds:M.any,handleCcIds:M.any,handleBccIds:M.any,handleInputChange:M.any,handleTextChange:M.any,emailTemplates:M.any,handleEmailTemplates:M.any,handleFromIds:M.any};const G=q,H=function(e){var t=e.emailTemplates,n=e.mailboxAddresses,a=e.handleFromIds,l=e.handleEmailTemplates,s=e.email,r=e.emailAddressesToSelected,o=e.emailAddressesCcSelected,c=e.emailAddressesBccSelected,i=e.errors,d=e.hasLoaded,u=e.handleSubmit,h=e.handleToIds,f=e.handleCcIds,g=e.handleBccIds,b=e.handleInputChange,v=e.handleTextChange,y=e.addAttachment,E=e.deleteAttachment;return m.createElement("form",{className:"form-horizontal",onSubmit:u},m.createElement(p.Z,null,m.createElement(G,{email:s,emailAddressesToSelected:r,emailAddressesCcSelected:o,emailAddressesBccSelected:c,errors:i,hasLoaded:d,handleSubmit:u,handleToIds:h,handleCcIds:f,handleBccIds:g,handleInputChange:b,handleTextChange:v,emailTemplates:t,handleEmailTemplates:l,handleFromIds:a,mailboxAddresses:n}),m.createElement(O,{attachments:s.attachments,addAttachment:y,deleteAttachment:E})))};var V=n(61409),U=n(55451),J=n(49332);const $=function(e){var t=e.handleSubmit,n=e.loading;return m.createElement("div",{className:"row"},m.createElement("div",{className:"col-md-4"},m.createElement("div",{className:"btn-group margin-small margin-10-right",role:"group"},m.createElement(U.Z,{iconName:"arrowLeft",onClickAction:V.mW.goBack})),m.createElement("div",{className:"btn-group margin-small",role:"group"},m.createElement(J.Z,{buttonText:"Opslaan als concept",onClickAction:function(e){t(e,!0)}}),m.createElement(J.Z,{buttonText:"Verstuur e-mail",onClickAction:t,loading:n,loadText:"E-mail verzenden"}))),m.createElement("div",{className:"col-md-4"},m.createElement("h4",{className:"text-center margin-small"},"E-mail versturen")),m.createElement("div",{className:"col-md-4"}))};var K=n(19789),_=n(90329),Q=n(91842);function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?X(Object(n),!0).forEach((function(t){(0,d.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}const ee=function(e){(0,o.Z)(f,e);var t,n,u=(t=f,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=(0,i.Z)(t);if(n){var l=(0,i.Z)(this).constructor;e=Reflect.construct(a,arguments,l)}else e=a.apply(this,arguments);return(0,c.Z)(this,e)});function f(e){var t;return(0,l.Z)(this,f),t=u.call(this,e),(0,d.Z)((0,r.Z)(t),"setButtonLoading",(function(){t.setState({buttonLoading:!0})})),(0,d.Z)((0,r.Z)(t),"toggleButtonLoading",(function(){t.setState({buttonLoading:!t.state.buttonLoading})})),t.state={buttonLoading:!1,oldEmailId:null,emailAddressesToSelected:[],emailAddressesCcSelected:[],emailAddressesBccSelected:[],mailboxAddresses:[],originalHtmlBody:"",emailTemplates:[],email:{from:"",mailboxId:"",replyTypeId:"",oldEmailId:"",contactGroupId:"",to:"",cc:"",bcc:"",subject:"",htmlBody:"",attachments:[]},errors:{to:!1,subject:!1},hasLoaded:!1},t.handleInputChange=t.handleInputChange.bind((0,r.Z)(t)),t.handleFromIds=t.handleFromIds.bind((0,r.Z)(t)),t.handleEmailTemplates=t.handleEmailTemplates.bind((0,r.Z)(t)),t.handleToIds=t.handleToIds.bind((0,r.Z)(t)),t.handleCcIds=t.handleCcIds.bind((0,r.Z)(t)),t.handleBccIds=t.handleBccIds.bind((0,r.Z)(t)),t.handleTextChange=t.handleTextChange.bind((0,r.Z)(t)),t.addAttachment=t.addAttachment.bind((0,r.Z)(t)),t.deleteAttachment=t.deleteAttachment.bind((0,r.Z)(t)),t.handleSubmit=t.handleSubmit.bind((0,r.Z)(t)),t}return(0,s.Z)(f,[{key:"componentDidMount",value:function(){var e=this,t="";switch(this.props.params.type){case"beantwoorden":default:t="reply";break;case"allenbeantwoorden":t="reply-all";break;case"doorsturen":t="forward";break;case"groep":t="group"}g.Z.fetchEmailByType(this.props.params.id,t).then((function(t){e.setState(Y(Y({},e.state),{},{oldEmailId:t.id,originalHtmlBody:t.htmlBody?t.htmlBody:"",email:{mailboxId:t.mailboxId,replyTypeId:t.replyTypeId?t.replyTypeId:"",oldEmailId:t.id?t.id:"",contactGroupId:t.contactGroupId?t.contactGroupId:"",to:t.to?t.to.join(","):"",cc:t.cc?t.cc.join(","):"",bcc:t.bcc?t.bcc.join(","):"",subject:t.subject?t.subject:"",htmlBody:t.htmlBodyWithEmbeddedImages?t.htmlBodyWithEmbeddedImages:"",initialHtmlBody:t.htmlBodyWithEmbeddedImages?t.htmlBodyWithEmbeddedImages:"",attachments:t.attachments?t.attachments:""},emailAddressesToSelected:t.emailAddressesToSelected,emailAddressesCcSelected:t.emailAddressesCcSelected,emailAddressesBccSelected:t.emailAddressesBccSelected,hasLoaded:!0}))})),K.Z.fetchEmailTemplatesPeek().then((function(t){e.setState({emailTemplates:t})})),_.Z.fetchMailboxesLoggedInUserPeek().then((function(t){e.setState({mailboxAddresses:t.data.data})})).catch((function(e){console.log(e)}))}},{key:"handleEmailTemplates",value:function(e){var t=this;this.setState(Y(Y({},this.state),{},{email:Y(Y({},this.state.email),{},{emailTemplateId:e})})),K.Z.fetchEmailTemplateWithUser(e).then((function(e){t.setState(Y(Y({},t.state),{},{email:Y(Y({},t.state.email),{},{htmlBody:e.htmlBody?e.htmlBody+t.state.originalHtmlBody:t.state.email.htmlBody,initialHtmlBody:e.htmlBody?e.htmlBody+t.state.originalHtmlBody:t.state.email.htmlBody})})),e.defaultAttachmentDocument&&t.addDocumentAsAttachment(e.defaultAttachmentDocument.id)}))}},{key:"handleInputChange",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,a=t.name;this.setState(Y(Y({},this.state),{},{email:Y(Y({},this.state.email),{},(0,d.Z)({},a,n))}))}},{key:"handleFromIds",value:function(e){this.setState(Y(Y({},this.state),{},{email:Y(Y({},this.state.email),{},{mailboxId:e})}))}},{key:"handleToIds",value:function(e){var t=e?e.map((function(e){return e.id})).join(","):"";this.setState(Y(Y({},this.state),{},{email:Y(Y({},this.state.email),{},{to:t}),emailAddressesToSelected:e}))}},{key:"handleCcIds",value:function(e){var t=e?e.map((function(e){return e.id})).join(","):"";this.setState(Y(Y({},this.state),{},{email:Y(Y({},this.state.email),{},{cc:t}),emailAddressesCcSelected:e}))}},{key:"handleBccIds",value:function(e){var t=e?e.map((function(e){return e.id})).join(","):"";this.setState(Y(Y({},this.state),{},{email:Y(Y({},this.state.email),{},{bcc:t}),emailAddressesBccSelected:e}))}},{key:"handleTextChange",value:function(e){this.setState(Y(Y({},this.state),{},{email:Y(Y({},this.state.email),{},{htmlBody:e})}))}},{key:"addAttachment",value:function(e){this.setState(Y(Y({},this.state),{},{email:Y(Y({},this.state.email),{},{attachments:[].concat((0,a.Z)(this.state.email.attachments),(0,a.Z)(e))})}))}},{key:"addDocumentAsAttachment",value:function(e){var t=this;e&&Q.Z.fetchDocumentDetails(e).then((function(n){var a=n.data.data.filename?n.data.data.filename:"bijlage.pdf";Q.Z.download(e).then((function(e){t.addAttachment([new File([e.data],a)])}))}))}},{key:"deleteAttachment",value:function(e){this.setState(Y(Y({},this.state),{},{email:Y(Y({},this.state.email),{},{attachments:this.state.email.attachments.filter((function(t){return t.name!==e}))})}))}},{key:"handleSubmit",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.preventDefault();var a=this.state.email,l={},s=!1;if(h().isEmpty(a.to)&&(l.to=!0,s=!0),(h().isEmpty(""+a.mailboxId)||null===a.mailboxId)&&(l.mailboxId=!0,s=!0),h().isEmpty(""+a.subject)&&(l.subject=!0,s=!0),this.setState(Y(Y({},this.state),{},{errors:l})),!s){a.to.length>0&&(a.to=a.to.split(",")),a.cc.length>0&&(a.cc=a.cc.split(",")),a.bcc.length>0&&(a.bcc=a.bcc.split(","));var r=window.tinymce.EditorManager.get("tinyMCEUpdateable");void 0!==r&&(a.htmlBody=r.getContent({format:"raw"}));var o=new FormData;o.append("to",JSON.stringify(a.to)),o.append("cc",JSON.stringify(a.cc)),o.append("bcc",JSON.stringify(a.bcc)),o.append("oldEmailId",this.state.oldEmailId),o.append("replyTypeId",a.replyTypeId),o.append("contactGroupId",a.contactGroupId),a.attachments&&a.attachments.filter((function(e){return!e.cid})).map((function(e,t){e.id?o.append("oldAttachments["+t+"]",JSON.stringify(e)):o.append("attachments["+t+"]",e)})),n?g.Z.newConcept(a,a.mailboxId).then((function(e){!function(e,t,n,a){g.Z.newConcept2(e,t,n).then((function(){a?g.Z.setStatus(a,"closed").then((function(){V.nA.push("/emails/inbox")})):V.nA.push("/emails/concept")})).catch((function(e){}))}(o,a.mailboxId,e.data,t.state.oldEmailId)})).catch((function(e){console.log(e)})):(this.setButtonLoading(),g.Z.newConcept(a,a.mailboxId).then((function(e){!function(e,t,n,a){g.Z.newEmail(e,t,n).then((function(){a?g.Z.setStatus(a,"closed").then((function(){V.nA.push("/emails/inbox")})):V.nA.push("/emails/inbox")})).catch((function(e){console.log(e)}))}(o,a.mailboxId,e.data,t.state.oldEmailId)})).catch((function(e){console.log(e),this.toggleButtonLoading()})))}}},{key:"render",value:function(){return m.createElement("div",{className:"row"},m.createElement("div",{className:"col-md-9"},m.createElement("div",{className:"col-md-12 margin-10-top"},m.createElement(p.Z,null,m.createElement(B.Z,{className:"panel-small"},m.createElement($,{loading:this.state.buttonLoading,handleSubmit:this.handleSubmit,type:this.props.params.type})))),m.createElement("div",{className:"col-md-12 margin-10-top"},m.createElement(H,{email:this.state.email,emailAddressesToSelected:this.state.emailAddressesToSelected,emailAddressesCcSelected:this.state.emailAddressesCcSelected,emailAddressesBccSelected:this.state.emailAddressesBccSelected,errors:this.state.errors,hasLoaded:this.state.hasLoaded,handleSubmit:this.handleSubmit,handleToIds:this.handleToIds,handleCcIds:this.handleCcIds,handleBccIds:this.handleBccIds,handleInputChange:this.handleInputChange,handleTextChange:this.handleTextChange,addAttachment:this.addAttachment,emailTemplates:this.state.emailTemplates,handleEmailTemplates:this.handleEmailTemplates,deleteAttachment:this.deleteAttachment,mailboxAddresses:this.state.mailboxAddresses,handleFromIds:this.handleFromIds}))),m.createElement("div",{className:"col-md-3"}))}}]),f}(m.Component)}}]);