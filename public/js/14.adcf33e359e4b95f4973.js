(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1132:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(32),l=t(695),i=t(697),s=t(701),c=t(694),m=t(692),u=t(699),p=t(691),d=t(1129),g=t(1130),f=g.a().shape({name:g.b().required("Verplicht"),email:g.b().email("Ongeldige e-mail").required("Verplicht")}),v=t(904),b=t.n(v),y=t(1133);var E=function(e){var a,t,n,o=e.values,i=e.handleChange,s=e.handleBlur;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,null,r.a.createElement("span",{className:"h5"},r.a.createElement("strong",null,"Gmail api instellingen"))),r.a.createElement(m.a,null,r.a.createElement("div",{className:"row"},r.a.createElement(l.a,{label:"Project id",name:"gmailApiSettings.projectId",value:null===(a=o.gmailApiSettings)||void 0===a?void 0:a.projectId,onChangeAction:i,onBlurAction:s}),r.a.createElement("div",{className:"form-group col-sm-6"},r.a.createElement("label",{className:"col-sm-6"},"Redirect url"),r.a.createElement("div",{className:"col-sm-6",style:{paddingRight:"5px"},onClick:null},y.a,r.a.createElement(b.a,{text:y.a},r.a.createElement("span",{className:"glyphicon glyphicon-copy mybtn-success pull-right",style:{top:"5px"},role:"button",onClick:null,title:"Kopieer sleutel"}))))),r.a.createElement("div",{className:"row"},r.a.createElement(l.a,{label:"Client id",name:"gmailApiSettings.clientId",value:null===(t=o.gmailApiSettings)||void 0===t?void 0:t.clientId,onChangeAction:i,onBlurAction:s}),r.a.createElement(l.a,{label:"Client secret",name:"gmailApiSettings.clientSecret",value:null===(n=o.gmailApiSettings)||void 0===n?void 0:n.clientSecret,onChangeAction:i,onBlurAction:s}))))},h=t(696),C=t(9),N=t.n(C);a.a=Object(o.b)((function(e){return{mailboxServerTypes:e.systemData.mailboxServerTypes,mailgunDomain:e.systemData.mailgunDomain}}))((function(e){var a=e.initialValues,t=e.processSubmit,n=e.mailgunDomain,o=e.mailboxServerTypes,g=e.switchToView,v=Object(d.a)({initialValues:a,validationSchema:f,onSubmit:function(e,a){var n=a.setSubmitting;t(e,n)}}),b=v.values,y=v.errors,C=v.touched,A=v.handleChange,S=v.handleSubmit,w=v.setFieldValue,O=v.handleBlur,T=v.isSubmitting;return r.a.createElement("form",{className:"form-horizontal",onSubmit:S},r.a.createElement(p.a,null,r.a.createElement(m.a,null,r.a.createElement("div",{className:"row"},r.a.createElement(l.a,{label:"Weergave Naam",name:"name",value:b.name,onChangeAction:A,onBlurAction:O,required:"required",error:y.name&&C.name,errorMessage:y.name}),r.a.createElement(l.a,{label:"E-mail",name:"email",value:b.email,onChangeAction:A,onBlurAction:O,required:"required",error:y.email&&C.email,errorMessage:y.email})),"gmail"===b.incomingServerType&&"gmail"===b.outgoingServerType?null:r.a.createElement("div",{className:"row"},r.a.createElement(l.a,{label:"Gebruikersnaam",name:"username",value:b.username,onChangeAction:A,onBlurAction:O,error:y.username&&C.username,errorMessage:y.username}),r.a.createElement(l.a,{label:"Wachtwoord",name:"password",value:b.password,onChangeAction:A,onBlurAction:O,error:y.password&&C.password,errorMessage:y.password})),r.a.createElement("div",{className:"row"},r.a.createElement(s.a,{label:"Actief",name:"isActive",value:b.isActive,onChangeAction:function(e){e.persist(),w(e.target.name,e.target.checked)},disabled:b.primary}),r.a.createElement(s.a,{label:"Primair (verzend wachtwoord mails)",name:"primary",value:b.primary,onChangeAction:function(e){e.persist(),w(e.target.name,e.target.checked)},disabled:!b.isActive})),r.a.createElement("div",{className:"row"},r.a.createElement(s.a,{label:r.a.createElement("span",null,"Koppel contact op email ",r.a.createElement("u",null,"aan")," adres",r.a.createElement("br",null),r.a.createElement("small",{style:{color:"#ccc",fontWeight:"normal"}},"Koppeling contact standaard op email ",r.a.createElement("u",null,"afzender")," adres")),name:"linkContactFromEmailToAddress",value:b.linkContactFromEmailToAddress,onChangeAction:function(e){e.persist(),w(e.target.name,e.target.checked)}}))),r.a.createElement(u.a,null,r.a.createElement("span",{className:"h5"},r.a.createElement("strong",null,"Servergegevens"))),r.a.createElement(m.a,null,r.a.createElement("div",{className:"row"},r.a.createElement(i.a,{label:"Inkomende mail type",name:"incomingServerType",value:b.incomingServerType,options:o.incomingServerTypes,onChangeAction:A,emptyOption:!1}),r.a.createElement(i.a,{label:"Uitgaande mail type",name:"outgoingServerType",value:b.outgoingServerType,options:o.outgoingServerTypes,onChangeAction:A,emptyOption:!1})),r.a.createElement("div",{className:"row"},"imap"===b.incomingServerType?r.a.createElement(l.a,{label:"Inkomend",name:"imapHost",value:b.imapHost,onChangeAction:A,onBlurAction:O,error:y.imapHost&&C.imapHost,errorMessage:y.imapHost}):r.a.createElement("div",{className:"form-group col-sm-6"}),"smtp"===b.outgoingServerType?r.a.createElement(l.a,{label:"Uitgaand",name:"smtpHost",value:b.smtpHost,onChangeAction:A,onBlurAction:O,error:y.smtpHost&&C.smtpHost,errorMessage:y.smtpHost}):null,"mailgun"===b.outgoingServerType?r.a.createElement(i.a,{label:"Uitgaand",name:"mailgunDomainId",value:b.mailgunDomainId,options:n,optionName:"domain",onChangeAction:A,error:y.mailgunDomainId&&C.mailgunDomainId,errorMessage:y.mailgunDomainId}):null)),("gmail"===b.incomingServerType||"gmail"===b.outgoingServerType)&&r.a.createElement(E,{values:b,handleChange:A,handleBlur:O}),r.a.createElement(u.a,null,r.a.createElement("span",{className:"h5"},r.a.createElement("strong",null,"Extra instellingen"))),r.a.createElement(m.a,null,"imap"!==b.incomingServerType&&"smtp"!==b.outgoingServerType?null:r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row"},"imap"===b.incomingServerType?r.a.createElement(l.a,{label:"Imap poort",name:"imapPort",value:b.imapPort,onChangeAction:A,onBlurAction:O,error:y.imapPort&&C.imapPort,errorMessage:y.imapPort}):r.a.createElement("div",{className:"form-group col-sm-6"}),"smtp"===b.outgoingServerType&&r.a.createElement(l.a,{label:"Smtp poort",name:"smtpPort",value:b.smtpPort,onChangeAction:A,onBlurAction:O,error:y.smtpPort&&C.smtpPort,errorMessage:y.smtpPort})),r.a.createElement("div",{className:"row"},"imap"===b.incomingServerType?r.a.createElement(i.a,{label:"Imap versleutelde verbinding",name:"imapEncryption",value:b.imapEncryption,options:[{id:"ssl",name:"SSL"},{id:"ssl/novalidate-cert",name:"SSL - self-signed certificate"},{id:"tls",name:"TLS"}],onChangeAction:A,onBlurAction:O}):r.a.createElement("div",{className:"form-group col-sm-6"}),"smtp"===b.outgoingServerType&&r.a.createElement(i.a,{label:"Smtp versleutelde verbinding",name:"smtpEncryption",value:b.smtpEncryption,options:[{id:"ssl",name:"SSL"},{id:"tls",name:"TLS"}],onChangeAction:function(e,a){return w(a,e)},onBlurAction:O}))),r.a.createElement("div",{className:"row"},r.a.createElement(l.a,{label:"Inbox prefix",name:"imapInboxPrefix",value:b.imapInboxPrefix,onChangeAction:A,onBlurAction:O,error:y.imapInboxPrefix&&C.imapInboxPrefix,errorMessage:y.imapInboxPrefix}),r.a.createElement(s.a,{label:"Zet email als gelezen op server",name:"emailMarkAsSeen",value:b.emailMarkAsSeen,onChangeAction:A,onBlurAction:O}))),b.id&&r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,null,r.a.createElement("span",{className:"h5"},r.a.createElement("strong",null,"Log"))),r.a.createElement(m.a,null,r.a.createElement("div",{className:"row"},r.a.createElement(h.a,{label:"Datum email laatst opgehaald",value:b.dateLastFetched?N()(b.dateLastFetched).format("L HH:mm:ss"):"Nog niet bepaald",className:"form-group col-sm-6"}),r.a.createElement(h.a,{label:"UID email laatst opgehaald",value:b.imapIdLastFetched,className:"form-group col-sm-6"})))),r.a.createElement(m.a,null,r.a.createElement("div",{className:"pull-right btn-group",role:"group"},b.id?r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:g}),r.a.createElement(c.a,{buttonText:"Opslaan",onClickAction:S,type:"submit",value:"Submit",loading:T})):r.a.createElement(c.a,{buttonText:"Opslaan",onClickAction:S,type:"submit",value:"Submit",loading:T})))))}))},1133:function(e,a,t){"use strict";t.d(a,"a",(function(){return n}));var n="".concat(window.URL_API,"/oauth/gmail/callback")},691:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(7),l=t.n(o),i=function(e){var a=e.children,t=e.className,n=e.onMouseEnter,o=e.onMouseLeave;return r.a.createElement("div",{className:"panel panel-default ".concat(t),onMouseEnter:n,onMouseLeave:o},a)};i.defaultProps={className:"",onMouseEnter:function(){},onMouseLeave:function(){}},i.propTypes={className:l.a.string,onMouseEnter:l.a.func,onMouseLeave:l.a.func},a.a=i},692:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(7),l=t.n(o),i=function(e){var a=e.className,t=e.children;return r.a.createElement("div",{className:"panel-body ".concat(a)},t)};i.defaultProps={className:""},i.propTypes={className:l.a.string},a.a=i},693:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(7),l=t.n(o),i=function(e){var a=e.buttonClassName,t=e.iconName,n=e.onClickAction,o=e.title,l=e.disabled;return r.a.createElement("button",{type:"button",className:"btn ".concat(a),onClick:n,disabled:l,title:o},r.a.createElement("span",{className:"glyphicon ".concat(t)}))};i.defaultProps={buttonClassName:"btn-success btn-sm",title:"",disabled:!1},i.propTypes={buttonClassName:l.a.string,iconName:l.a.string.isRequired,onClickAction:l.a.func,title:l.a.string,disabled:l.a.bool},a.a=i},694:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(7),l=t.n(o),i=function(e){var a=e.buttonClassName,t=e.buttonText,n=e.onClickAction,o=e.type,l=e.value,i=e.loading,s=e.loadText,c=e.disabled;return i?r.a.createElement("button",{type:o,className:"btn btn-sm btn-loading ".concat(a),value:l,disabled:i},r.a.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"})," ",s):r.a.createElement("button",{type:o,className:"btn btn-sm ".concat(a),onClick:n,value:l,disabled:c},t)};i.defaultProps={buttonClassName:"btn-success",type:"button",value:"",loading:!1,loadText:"Aan het laden",disabled:!1},i.propTypes={buttonClassName:l.a.string,buttonText:l.a.string.isRequired,onClickAction:l.a.func,type:l.a.string,value:l.a.string,loading:l.a.bool,loadText:l.a.string,disabled:l.a.bool},a.a=i},695:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(7),l=t.n(o),i=function(e){var a=e.label,t=e.type,n=e.className,o=e.size,l=e.id,i=e.placeholder,s=e.name,c=e.value,m=e.onClickAction,u=e.onChangeAction,p=e.onBlurAction,d=e.required,g=e.readOnly,f=e.maxLength,v=e.error,b=e.min,y=e.max,E=e.step,h=e.errorMessage,C=e.divSize,N=e.divClassName,A=e.autoComplete;return r.a.createElement("div",{className:"form-group ".concat(C," ").concat(N)},r.a.createElement("label",{htmlFor:l,className:"col-sm-6 ".concat(d)},a),r.a.createElement("div",{className:"".concat(o)},r.a.createElement("input",{type:t,className:"form-control input-sm ".concat(n)+(v?"has-error":""),id:l,placeholder:i,name:s,value:c||"",onClick:m,onChange:u,onBlur:p,readOnly:g,maxLength:f,min:b,max:y,autoComplete:A,step:E})),v&&r.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},r.a.createElement("span",{className:"has-error-message"}," ",h)))};i.defaultProps={divClassName:"",className:"",size:"col-sm-6",divSize:"col-sm-6",name:"",type:"text",value:"",required:"",readOnly:!1,maxLength:null,error:!1,min:"",max:"",step:"",errorMessage:"",autoComplete:"off",onBlurAction:function(){},onClickAction:function(){},onChangeAction:function(){}},i.propTypes={label:l.a.oneOfType([l.a.string,l.a.object]).isRequired,type:l.a.string,className:l.a.string,divClassName:l.a.string,size:l.a.string,divSize:l.a.string,id:l.a.string,placeholder:l.a.string,name:l.a.string.isRequired,value:l.a.oneOfType([l.a.string,l.a.number]),onClickAction:l.a.func,onChangeAction:l.a.func,onBlurAction:l.a.func,required:l.a.string,readOnly:l.a.bool,maxLength:l.a.string,error:l.a.bool,min:l.a.string,max:l.a.string,step:l.a.string,errorMessage:l.a.string,autoComplete:l.a.string},a.a=i},696:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(4),l=t(7),i=t.n(l),s=function(e){var a=e.label,t=e.className,n=e.id,l=e.value,i=e.link,s=e.hidden;return i.length>0?r.a.createElement("div",{className:t,style:s?{display:"none"}:{}},r.a.createElement("label",{htmlFor:n,className:"col-sm-6"},a),r.a.createElement("div",{className:"col-sm-6",id:n,onClick:null},r.a.createElement(o.b,{to:i,className:"link-underline"},l))):r.a.createElement("div",{className:t,style:s?{display:"none"}:{}},r.a.createElement("label",{htmlFor:n,className:"col-sm-6"},a),r.a.createElement("div",{className:"col-sm-6",id:n},l))};s.defaultProps={className:"col-sm-6",value:"",link:"",hidden:!1},s.propTypes={label:i.a.oneOfType([i.a.string,i.a.object]).isRequired,className:i.a.string,id:i.a.string,value:i.a.oneOfType([i.a.string,i.a.number]),link:i.a.string,hidden:i.a.bool},a.a=s},697:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(7),l=t.n(o),i=function(e){var a=e.label,t=e.className,n=e.size,o=e.id,l=e.name,i=e.value,s=e.options,c=e.onChangeAction,m=e.onBlurAction,u=e.required,p=e.error,d=e.errorMessage,g=e.optionValue,f=e.optionName,v=e.readOnly,b=e.placeholder,y=e.divClassName,E=e.emptyOption;return r.a.createElement("div",{className:"form-group ".concat(n," ").concat(y)},r.a.createElement("label",{htmlFor:o,className:"col-sm-6 ".concat(u)},a),r.a.createElement("div",{className:"col-sm-6"},r.a.createElement("select",{className:"form-control input-sm ".concat(t)+(p&&" has-error"),id:o,name:l,value:i||"",onChange:c,onBlur:m,readOnly:v},E&&r.a.createElement("option",{value:""},b),s.map((function(e){return r.a.createElement("option",{key:e[g],value:e[g]},e[f])})))),p&&r.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},r.a.createElement("span",{className:"has-error-message"}," ",d)))};i.defaultProps={divClassName:"",className:"",size:"col-sm-6",readOnly:!1,required:"",error:!1,errorMessage:"",value:"",optionValue:"id",optionName:"name",placeholder:"",emptyOption:!0},i.propTypes={label:l.a.string.isRequired,className:l.a.string,size:l.a.string,id:l.a.string,name:l.a.string.isRequired,options:l.a.array,value:l.a.oneOfType([l.a.string,l.a.number]),onChangeAction:l.a.func,onBlurAction:l.a.func,required:l.a.string,readOnly:l.a.bool,error:l.a.bool,errorMessage:l.a.string,emptyOption:l.a.bool,optionValue:l.a.string,optionName:l.a.string,placeholder:l.a.string},a.a=i},699:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(7),l=t.n(o),i=function(e){var a=e.className,t=e.children;return r.a.createElement("div",{className:"panel-heading ".concat(a)},t)};i.defaultProps={className:""},i.propTypes={className:l.a.string},a.a=i},701:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(7),l=t.n(o),i=t(704),s=t.n(i),c=function(e){var a=e.label,t=e.size,n=e.id,o=e.name,l=e.value,i=e.onChangeAction,c=e.required,m=e.divSize,u=e.className,p=e.disabled;return r.a.createElement("div",{className:"form-group ".concat(m," ").concat(u)},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:n,className:"col-sm-6 ".concat(c)},a)),r.a.createElement("div",{className:"".concat(t)},r.a.createElement(s.a,{id:n,name:o,onChange:i,defaultChecked:l,disabled:p})))};c.defaultProps={className:"",size:"col-sm-6",divSize:"col-sm-6",required:"",disabled:!1,value:""},c.propTypes={label:l.a.string.isRequired,type:l.a.string,size:l.a.string,divSize:l.a.string,id:l.a.string,name:l.a.string.isRequired,value:l.a.bool,onChangeAction:l.a.func,required:l.a.string,disabled:l.a.bool},a.a=c},712:function(e,a,t){var n;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var t={}.hasOwnProperty;function r(){for(var e=[],a=0;a<arguments.length;a++){var n=arguments[a];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var l=r.apply(null,n);l&&e.push(l)}else if("object"===o)for(var i in n)t.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(a,[]))||(e.exports=n)}()},752:function(e,a,t){"use strict";t.d(a,"c",(function(){return n})),t.d(a,"f",(function(){return r})),t.d(a,"e",(function(){return o})),t.d(a,"b",(function(){return l})),t.d(a,"d",(function(){return i})),t.d(a,"a",(function(){return s}));var n=function(e){return{type:"FETCH_MAILBOX_DETAILS",id:e}},r=function(e){return{type:"UPDATE_MAILBOX_DETAILS",mailbox:e}},o=function(e){return{type:"NEW_MAILBOX_USER",mailboxUser:e}},l=function(e,a){return{type:"DELETE_MAILBOX_USER",mailboxId:e,userId:a}},i=function(e){return{type:"NEW_MAILBOX_IGNORE",ignore:e}},s=function(e){return{type:"DELETE_MAILBOX_IGNORE",ignoreId:e}}},904:function(e,a,t){"use strict";var n=t(977).CopyToClipboard;n.CopyToClipboard=n,e.exports=n},977:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.CopyToClipboard=void 0;var n=o(t(0)),r=o(t(978));function o(e){return e&&e.__esModule?e:{default:e}}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function s(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}function c(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function m(e,a){for(var t=0;t<a.length;t++){var n=a[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e,a){return!a||"object"!==l(a)&&"function"!=typeof a?d(e):a}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,a){return(g=Object.setPrototypeOf||function(e,a){return e.__proto__=a,e})(e,a)}function f(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}var v=function(e){function a(){var e,t;c(this,a);for(var o=arguments.length,l=new Array(o),i=0;i<o;i++)l[i]=arguments[i];return f(d(t=u(this,(e=p(a)).call.apply(e,[this].concat(l)))),"onClick",(function(e){var a=t.props,o=a.text,l=a.onCopy,i=a.children,s=a.options,c=n.default.Children.only(i),m=(0,r.default)(o,s);l&&l(o,m),c&&c.props&&"function"==typeof c.props.onClick&&c.props.onClick(e)})),t}var t,o,l;return function(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),a&&g(e,a)}(a,e),t=a,(o=[{key:"render",value:function(){var e=this.props,a=(e.text,e.onCopy,e.options,e.children),t=s(e,["text","onCopy","options","children"]),r=n.default.Children.only(a);return n.default.cloneElement(r,function(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?i(t,!0).forEach((function(a){f(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(t).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}({},t,{onClick:this.onClick}))}}])&&m(t.prototype,o),l&&m(t,l),a}(n.default.PureComponent);a.CopyToClipboard=v,f(v,"defaultProps",{onCopy:void 0,options:void 0})},978:function(e,a,t){"use strict";var n=t(979),r={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,a){var t,o,l,i,s,c,m=!1;a||(a={}),t=a.debug||!1;try{if(l=n(),i=document.createRange(),s=document.getSelection(),(c=document.createElement("span")).textContent=e,c.style.all="unset",c.style.position="fixed",c.style.top=0,c.style.clip="rect(0, 0, 0, 0)",c.style.whiteSpace="pre",c.style.webkitUserSelect="text",c.style.MozUserSelect="text",c.style.msUserSelect="text",c.style.userSelect="text",c.addEventListener("copy",(function(n){if(n.stopPropagation(),a.format)if(n.preventDefault(),void 0===n.clipboardData){t&&console.warn("unable to use e.clipboardData"),t&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var o=r[a.format]||r.default;window.clipboardData.setData(o,e)}else n.clipboardData.clearData(),n.clipboardData.setData(a.format,e);a.onCopy&&(n.preventDefault(),a.onCopy(n.clipboardData))})),document.body.appendChild(c),i.selectNodeContents(c),s.addRange(i),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");m=!0}catch(n){t&&console.error("unable to copy using execCommand: ",n),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(a.format||"text",e),a.onCopy&&a.onCopy(window.clipboardData),m=!0}catch(n){t&&console.error("unable to copy using clipboardData: ",n),t&&console.error("falling back to prompt"),o=function(e){var a=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,a)}("message"in a?a.message:"Copy to clipboard: #{key}, Enter"),window.prompt(o,e)}}finally{s&&("function"==typeof s.removeRange?s.removeRange(i):s.removeAllRanges()),c&&document.body.removeChild(c),l()}return m}},979:function(e,a){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var a=document.activeElement,t=[],n=0;n<e.rangeCount;n++)t.push(e.getRangeAt(n));switch(a.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":a.blur();break;default:a=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||t.forEach((function(a){e.addRange(a)})),a&&a.focus()}}}}]);