"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[5806],{55806:(e,a,t)=>{t.r(a),t.d(a,{default:()=>E});var n=t(96540),c=t(24179),l=t(11640),m=t(83873),s=t(17375),r=t(26062);const i=(0,t(69733).Ng)(null,(function(e){return(0,s.zH)({fetchSystemData:r.u},e)}))((function(e){var a=e.fetchSystemData;return n.createElement(l.A,{initialValues:{id:"",name:"",email:"",username:"",password:"",smtpHost:"",smtpPort:"",smtpEncryption:"",imapHost:"",imapPort:"",imapEncryption:"",imapInboxPrefix:"",incomingServerType:"imap",outgoingServerType:"smtp",mailgunDomainId:"",primary:!1,isActive:!0,linkContactFromEmailToAddress:!1,emailMarkAsSeen:!0,oauthApiSettings:{projectId:"",clientId:"",clientSecret:"",tenantId:""}},processSubmit:function(e,t){m.A.newMailbox(e).then((function(e){a(),c.RL.push("/mailbox/".concat(e.data.data.id))})).catch((function(e){401===e.response.status&&"ms_oauth_unauthorised"===e.response.data.message&&(window.location=e.response.data.authUrl),t(!1),alert("Er is iets misgegaan met opslaan. Probeer het nogmaals")}))},isNew:!0})}));var o=t(91858);const u=function(){return n.createElement("div",{className:"row"},n.createElement("div",{className:"col-md-4"},n.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},n.createElement(o.A,{iconName:"arrowLeft",onClickAction:c.Nc.goBack}))),n.createElement("div",{className:"col-md-4"},n.createElement("h4",{className:"text-center margin-small"},"Nieuw mailbox")),n.createElement("div",{className:"col-md-4"}))};var d=t(62493),p=t(55849);const E=function(){return n.createElement("div",{className:"row"},n.createElement("div",{className:"col-md-9"},n.createElement("div",{className:"col-md-12 margin-10-top"},n.createElement(d.A,null,n.createElement(p.A,{className:"panel-small"},n.createElement(u,null)))),n.createElement("div",{className:"col-md-12 margin-10-top"},n.createElement(i,null))),n.createElement("div",{className:"col-md-3"}))}}}]);