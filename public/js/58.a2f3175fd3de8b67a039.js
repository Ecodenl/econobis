(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{1014:function(e,a,t){"use strict";t.d(a,"a",(function(){return n})),t.d(a,"b",(function(){return r}));var n="".concat(window.URL_API,"/oauth/gmail/callback"),r="".concat(window.URL_API,"/api/oauth/ms-azure/callback")},1172:function(e,a,t){"use strict";var n=t(560),r=t.n(n),i=t(0),l=t.n(i),o=t(19),m=t(36),c=t(124),s=t(90),u=t(38),d=t(30),p=t(53),g=t(27),v=t(1169),E=t(1170),h=E.a().shape({name:E.b().required("Verplicht"),email:E.b().email("Ongeldige e-mail").required("Verplicht")}),S=E.a().shape({imapHost:E.b().required("Verplicht"),imapPort:E.b().required("Verplicht"),username:E.b().required("Verplicht")}),b=E.a().shape({smtpHost:E.b().required("Verplicht"),smtpPort:E.b().required("Verplicht"),username:E.b().required("Verplicht")}),A=E.a().shape({password:E.b().required("Verplicht")}),f=E.a().shape({mailgunDomainId:E.b().required("Verplicht").typeError("Verplicht")}),y=E.a().shape({gmailApiSettings:E.a().shape({projectId:E.b().trim().required("Verplicht"),clientId:E.b().trim().required("Verplicht"),clientSecret:E.b().trim().required("Verplicht")})}),I=E.a().shape({gmailApiSettings:E.a().shape({clientId:E.b().trim().required("Verplicht"),clientSecret:E.b().trim().required("Verplicht"),projectId:E.b().trim().required("Verplicht")})}),N=t(1014),q=t(21);var w=function(e){var a,t,n,r,i,o,c,s,u,g,v,E,h=e.values,S=e.errors,b=e.touched,A=e.handleChange,f=e.handleBlur;return l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,null,l.a.createElement("span",{className:"h5"},l.a.createElement("strong",null,"Gmail api instellingen"))),l.a.createElement(d.a,null,l.a.createElement("div",{className:"row"},l.a.createElement(m.a,{label:"Project id",name:"gmailApiSettings.projectId",value:null===(a=h.gmailApiSettings)||void 0===a?void 0:a.projectId,onChangeAction:A,onBlurAction:f,required:"required",error:(null===(t=S.gmailApiSettings)||void 0===t?void 0:t.projectId)&&(null===(n=b.gmailApiSettings)||void 0===n?void 0:n.projectId),errorMessage:null===(r=S.gmailApiSettings)||void 0===r?void 0:r.projectId}),l.a.createElement(q.a,{className:"form-group col-sm-6",label:"Redirect url",value:N.a})),l.a.createElement("div",{className:"row"},l.a.createElement(m.a,{label:"Client id",name:"gmailApiSettings.clientId",value:null===(i=h.gmailApiSettings)||void 0===i?void 0:i.clientId,onChangeAction:A,onBlurAction:f,required:"required",error:(null===(o=S.gmailApiSettings)||void 0===o?void 0:o.clientId)&&(null===(c=b.gmailApiSettings)||void 0===c?void 0:c.clientId),errorMessage:null===(s=S.gmailApiSettings)||void 0===s?void 0:s.clientId}),l.a.createElement(m.a,{label:"Client secret",name:"gmailApiSettings.clientSecret",value:null===(u=h.gmailApiSettings)||void 0===u?void 0:u.clientSecret,onChangeAction:A,onBlurAction:f,required:"required",error:(null===(g=S.gmailApiSettings)||void 0===g?void 0:g.clientSecret)&&(null===(v=b.gmailApiSettings)||void 0===v?void 0:v.clientSecret),errorMessage:null===(E=S.gmailApiSettings)||void 0===E?void 0:E.clientSecret}))))},T=t(7),C=t.n(T);var x=function(e){var a,t,n,r,i,o,c,s,u,g,v,E,h=e.values,S=e.errors,b=e.touched,A=e.handleChange,f=e.handleBlur;return l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,null,l.a.createElement("span",{className:"h5"},l.a.createElement("strong",null,"Microsoft Azure api instellingen"))),l.a.createElement(d.a,null,l.a.createElement("div",{className:"row"},l.a.createElement(m.a,{label:"Client id",name:"gmailApiSettings.clientId",value:null===(a=h.gmailApiSettings)||void 0===a?void 0:a.clientId,onChangeAction:A,onBlurAction:f,required:"required",error:(null===(t=S.gmailApiSettings)||void 0===t?void 0:t.clientId)&&(null===(n=b.gmailApiSettings)||void 0===n?void 0:n.clientId),errorMessage:null===(r=S.gmailApiSettings)||void 0===r?void 0:r.clientId}),l.a.createElement(m.a,{label:"Object ID",name:"gmailApiSettings.projectId",value:null===(i=h.gmailApiSettings)||void 0===i?void 0:i.projectId,onChangeAction:A,onBlurAction:f,required:"required",error:(null===(o=S.gmailApiSettings)||void 0===o?void 0:o.projectId)&&(null===(c=b.gmailApiSettings)||void 0===c?void 0:c.projectId),errorMessage:null===(s=S.gmailApiSettings)||void 0===s?void 0:s.projectId})),l.a.createElement("div",{className:"row"},l.a.createElement(q.a,{className:"form-group col-sm-6",label:"Redirect url",value:N.b}),l.a.createElement(m.a,{type:"text",label:"Client secret waarde",name:"gmailApiSettings.clientSecret",value:null===(u=h.gmailApiSettings)||void 0===u?void 0:u.clientSecret,className:"numeric-password",placeholder:"**********",onChangeAction:A,onBlurAction:f,required:"required",error:(null===(g=S.gmailApiSettings)||void 0===g?void 0:g.clientSecret)&&(null===(v=b.gmailApiSettings)||void 0===v?void 0:v.clientSecret),errorMessage:null===(E=S.gmailApiSettings)||void 0===E?void 0:E.clientSecret}))))};a.a=Object(o.b)((function(e){return{mailboxServerTypes:e.systemData.mailboxServerTypes,mailgunDomain:e.systemData.mailgunDomain}}))((function(e){var a=e.initialValues,t=e.processSubmit,n=e.mailgunDomain,o=e.mailboxServerTypes,E=e.switchToView,N=e.isNew,T=Object(i.useState)(a.incomingServerType),M=r()(T,2),B=M[0],P=M[1],j=Object(i.useState)(a.outgoingServerType),D=r()(j,2),L=D[0],V=D[1],k=Object(v.a)({initialValues:a,validationSchema:function(){var e=h;"imap"===B&&(e=e.concat(S),N&&(e=e.concat(A)));"smtp"===L&&(e=e.concat(b),N&&(e=e.concat(A)));"mailgun"===L&&(e=e.concat(f));"gmail"!==B&&"gmail"!==L||(e=e.concat(y));"ms-oauth"!==B&&"ms-oauth"!==L||(e=e.concat(I));return e}(),onSubmit:function(e,a){var n=a.setSubmitting;t(e,n)}}),O=k.values,H=k.errors,_=k.touched,F=k.handleChange,U=k.handleSubmit,R=k.setFieldValue,z=k.handleBlur,X=k.isSubmitting;return Object(i.useEffect)((function(){O.incomingServerType&&P(O.incomingServerType),O.outgoingServerType&&V(O.outgoingServerType)}),[O.incomingServerType,O.outgoingServerType]),l.a.createElement("form",{className:"form-horizontal",onSubmit:U},l.a.createElement(g.a,null,l.a.createElement(d.a,null,l.a.createElement("div",{className:"row"},l.a.createElement(m.a,{label:"Weergave Naam",name:"name",value:O.name,onChangeAction:F,onBlurAction:z,required:"required",error:H.name&&_.name,errorMessage:H.name}),l.a.createElement(m.a,{label:"E-mail",name:"email",value:O.email,onChangeAction:F,onBlurAction:z,required:"required",error:H.email&&_.email,errorMessage:H.email})),l.a.createElement("div",{className:"row"},l.a.createElement(s.a,{label:"Actief",name:"isActive",value:O.isActive,onChangeAction:function(e){e.persist(),R(e.target.name,e.target.checked)},disabled:O.primary}),l.a.createElement(s.a,{label:"Primair (verzend wachtwoord mails)",name:"primary",value:O.primary,onChangeAction:function(e){e.persist(),R(e.target.name,e.target.checked)},disabled:!O.isActive})),l.a.createElement("div",{className:"row"},l.a.createElement(s.a,{label:l.a.createElement("span",null,"Koppel contact op email ",l.a.createElement("u",null,"aan")," adres",l.a.createElement("br",null),l.a.createElement("small",{style:{color:"#ccc",fontWeight:"normal"}},"Koppeling contact standaard op email ",l.a.createElement("u",null,"afzender")," adres")),name:"linkContactFromEmailToAddress",value:O.linkContactFromEmailToAddress,onChangeAction:function(e){e.persist(),R(e.target.name,e.target.checked)}}))),l.a.createElement(p.a,null,l.a.createElement("span",{className:"h5"},l.a.createElement("strong",null,"Servergegevens"))),l.a.createElement(d.a,null,l.a.createElement("div",{className:"row"},l.a.createElement(c.a,{label:"Inkomende mail type",name:"incomingServerType",value:O.incomingServerType,options:o.incomingServerTypes,onChangeAction:F,emptyOption:!1,required:"required"}),l.a.createElement(c.a,{label:"Uitgaande mail type",name:"outgoingServerType",value:O.outgoingServerType,options:o.outgoingServerTypes,onChangeAction:F,emptyOption:!1,required:"required"})),l.a.createElement("div",{className:"row"},"imap"===O.incomingServerType?l.a.createElement(m.a,{label:"Inkomende IMAP host",name:"imapHost",value:O.imapHost,onChangeAction:F,onBlurAction:z,required:"required",error:H.imapHost&&_.imapHost,errorMessage:H.imapHost}):l.a.createElement("div",{className:"form-group col-sm-6"}),"smtp"===O.outgoingServerType?l.a.createElement(m.a,{label:"Uitgaande SMTP host",name:"smtpHost",value:O.smtpHost,onChangeAction:F,onBlurAction:z,required:"required",error:H.smtpHost&&_.smtpHost,errorMessage:H.smtpHost}):null,"mailgun"===O.outgoingServerType?l.a.createElement(c.a,{label:"Uitgaand Mailgun domein",name:"mailgunDomainId",value:O.mailgunDomainId,options:n,optionName:"domain",onChangeAction:F,required:"required",error:H.mailgunDomainId&&_.mailgunDomainId,errorMessage:H.mailgunDomainId}):null)),("imap"===O.incomingServerType||"smtp"===O.outgoingServerType)&&l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,null,l.a.createElement("span",{className:"h5"},l.a.createElement("strong",null,"Instellingen"))),l.a.createElement(d.a,null,l.a.createElement("div",{className:"row"},l.a.createElement(m.a,{label:"Gebruikersnaam",name:"username",value:O.username,onChangeAction:F,onBlurAction:z,required:"required",error:H.username&&_.username,errorMessage:H.username}),l.a.createElement(m.a,{type:"text",label:"Wachtwoord",name:"password",value:O.password,className:"numeric-password",placeholder:"**********",onChangeAction:F,onBlurAction:z,required:"required",error:H.password&&_.password,errorMessage:H.password})),l.a.createElement("div",{className:"row"},"imap"===O.incomingServerType?l.a.createElement(m.a,{label:"Imap poort",name:"imapPort",value:O.imapPort,onChangeAction:F,onBlurAction:z,required:"required",error:H.imapPort&&_.imapPort,errorMessage:H.imapPort}):l.a.createElement("div",{className:"form-group col-sm-6"}),"smtp"===O.outgoingServerType&&l.a.createElement(m.a,{label:"Smtp poort",name:"smtpPort",value:O.smtpPort,onChangeAction:F,onBlurAction:z,required:"required",error:H.smtpPort&&_.smtpPort,errorMessage:H.smtpPort})),l.a.createElement("div",{className:"row"},"imap"===O.incomingServerType?l.a.createElement(c.a,{label:"Imap versleutelde verbinding",name:"imapEncryption",value:O.imapEncryption,options:[{id:"ssl",name:"SSL"},{id:"ssl/novalidate-cert",name:"SSL - self-signed certificate"},{id:"tls",name:"TLS"}],onChangeAction:F}):l.a.createElement("div",{className:"form-group col-sm-6"}),"smtp"===O.outgoingServerType&&l.a.createElement(c.a,{label:"Smtp versleutelde verbinding",name:"smtpEncryption",value:O.smtpEncryption,options:[{id:"ssl",name:"SSL"},{id:"tls",name:"TLS"}],onChangeAction:F})),"imap"===O.incomingServerType&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"row"},l.a.createElement(m.a,{label:"Inbox prefix",name:"imapInboxPrefix",value:O.imapInboxPrefix,onChangeAction:F,onBlurAction:z,error:H.imapInboxPrefix&&_.imapInboxPrefix,errorMessage:H.imapInboxPrefix})),l.a.createElement("div",{className:"row"},l.a.createElement(s.a,{label:"Zet email als gelezen op server",name:"emailMarkAsSeen",value:O.emailMarkAsSeen,onChangeAction:F,onBlurAction:z}))))),("gmail"===O.incomingServerType||"gmail"===O.outgoingServerType)&&l.a.createElement(w,{values:O,errors:H,touched:_,handleChange:F,handleBlur:z}),("ms-oauth"===O.incomingServerType||"ms-oauth"===O.outgoingServerType)&&l.a.createElement(x,{values:O,errors:H,touched:_,handleChange:F,handleBlur:z}),O.id&&l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,null,l.a.createElement("span",{className:"h5"},l.a.createElement("strong",null,"Log"))),l.a.createElement(d.a,null,l.a.createElement("div",{className:"row"},l.a.createElement(q.a,{label:"Datum email laatst opgehaald",value:O.dateLastFetched?C()(O.dateLastFetched).format("L HH:mm:ss"):"Nog niet bepaald",className:"form-group col-sm-6"}),l.a.createElement(q.a,{label:"UID email laatst opgehaald",value:O.imapIdLastFetched,className:"form-group col-sm-6"})))),l.a.createElement(d.a,null,l.a.createElement("div",{className:"pull-right btn-group",role:"group"},O.id?l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:E}),l.a.createElement(u.a,{buttonText:"Opslaan",onClickAction:U,type:"submit",value:"Submit",loading:X})):l.a.createElement(u.a,{buttonText:"Opslaan",onClickAction:U,type:"submit",value:"Submit",loading:X})))))}))},1679:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=t(4),l=t(1172),o=t(103),m=t(24),c=(t(975),t(292)),s=t(19);var u=Object(s.b)(null,(function(e){return Object(m.b)({fetchSystemData:c.a},e)}))((function(e){var a=e.fetchSystemData;return r.a.createElement(l.a,{initialValues:{id:"",name:"",email:"",username:"",password:"",smtpHost:"",smtpPort:"",smtpEncryption:"",imapHost:"",imapPort:"",imapEncryption:"",imapInboxPrefix:"",incomingServerType:"imap",outgoingServerType:"smtp",mailgunDomainId:"",primary:!1,isActive:!0,linkContactFromEmailToAddress:!1,emailMarkAsSeen:!0,gmailApiSettings:{projectId:"",clientId:"",clientSecret:""}},processSubmit:function(e,t){o.a.newMailbox(e).then((function(e){a(),i.f.push("/mailbox/".concat(e.data.data.id))})).catch((function(e){401!==e.response.status||"gmail_unauthorised"!==e.response.data.message&&"ms_oauth_unauthorised"!==e.response.data.message||(window.location=e.response.data.authUrl),t(!1),alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))},isNew:!0})})),d=t(50),p=function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-4"},r.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},r.a.createElement(d.a,{iconName:"glyphicon-arrow-left",onClickAction:i.e.goBack}))),r.a.createElement("div",{className:"col-md-4"},r.a.createElement("h4",{className:"text-center margin-small"},"Nieuw mailbox")),r.a.createElement("div",{className:"col-md-4"}))},g=t(27),v=t(30);a.default=function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-9"},r.a.createElement("div",{className:"col-md-12 margin-10-top"},r.a.createElement(g.a,null,r.a.createElement(v.a,{className:"panel-small"},r.a.createElement(p,null)))),r.a.createElement("div",{className:"col-md-12 margin-10-top"},r.a.createElement(u,null))),r.a.createElement("div",{className:"col-md-3"}))}},975:function(e,a,t){"use strict";t.d(a,"c",(function(){return n})),t.d(a,"f",(function(){return r})),t.d(a,"e",(function(){return i})),t.d(a,"b",(function(){return l})),t.d(a,"d",(function(){return o})),t.d(a,"a",(function(){return m}));var n=function(e){return{type:"FETCH_MAILBOX_DETAILS",id:e}},r=function(e){return{type:"UPDATE_MAILBOX_DETAILS",mailbox:e}},i=function(e){return{type:"NEW_MAILBOX_USER",mailboxUser:e}},l=function(e,a){return{type:"DELETE_MAILBOX_USER",mailboxId:e,userId:a}},o=function(e){return{type:"NEW_MAILBOX_IGNORE",ignore:e}},m=function(e){return{type:"DELETE_MAILBOX_IGNORE",ignoreId:e}}}}]);