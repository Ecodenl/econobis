"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[5723],{95723:(e,t,n)=>{n.r(t),n.d(t,{default:()=>re});var a=n(60436),l=n(64467),r=n(5544),c=n(96540),o=n(61941);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var i="".concat(URL_API,"/api/email-splitview");const m={fetchSelectList:function(e){var t=e.filter,n=e.sorts,a=e.limit,l=e.offset;return o.A.get("".concat(i,"/select-list"),{params:{jory:{fld:[],flt:t,srt:n,lmt:a,ofs:l}}})},fetchEmail:function(e){return o.A.get("".concat(i,"/").concat(e)).then((function(e){return e.data}))},update:function(e,t){return o.A.post("".concat(i,"/").concat(e),t)},updateMultiple:function(e,t){return o.A.post("".concat(i,"/update-multiple"),function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,l.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({ids:e},t))},storeReply:function(e){return o.A.post("".concat(i,"/").concat(e,"/store-reply"))},storeReplyAll:function(e){return o.A.post("".concat(i,"/").concat(e,"/store-reply-all"))},storeForward:function(e){return o.A.post("".concat(i,"/").concat(e,"/store-forward"))},deleteMultiple:function(e){return o.A.post("".concat(i,"/delete-multiple"),{ids:e})}};var u=n(87722),d=n(93755),p=n(81524),f=n(82606),E=n(87696),b=n(25795),h=n(88505),v=n(24179),g=n(69733),y=n(14809),N=n(44926),A=n(20349),O=n(8373),w=n(9293),x=n(64476);function j(e){var t,n=e.email,l=e.updateEmailAttributes,r=e.deleted,o=(0,c.useContext)(w.t),s=o.openEmailDetailsModal,i=o.openEmailSendModal,m=(0,g.d4)((function(e){return(0,x.o)(e.systemData.emailStatuses)}));return c.createElement("div",{className:"panel panel-default"},c.createElement("div",{className:"panel-body panel-small"},c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-6",style:{paddingLeft:"25px"}},"concept"!==n.folder&&c.createElement("div",{className:"btn-group margin-small margin-10-right",role:"group"},c.createElement("button",{type:"button",title:"Beantwoorden",className:"btn btn-success btn-sm",onClick:function(){N.A.storeReply(n.id).then((function(e){i(e.data.id)}))}},c.createElement(u.Ay,{icon:d.E,size:13})),c.createElement("button",{type:"button",title:"Allen beantwoorden",className:"btn btn-success btn-sm",onClick:function(){N.A.storeReplyAll(n.id).then((function(e){i(e.data.id)}))}},c.createElement(u.Ay,{icon:p.d,size:13})),c.createElement("button",{type:"button",title:"Doorsturen",className:"btn btn-success btn-sm",onClick:function(){N.A.storeForward(n.id).then((function(e){i(e.data.id)}))}},c.createElement(u.Ay,{icon:f.H,size:13}))),"concept"===n.folder&&c.createElement("div",{className:"btn-group margin-small margin-10-right",role:"group"},c.createElement("button",{type:"button",title:"Openen",className:"btn btn-success btn-sm",onClick:function(){return i(n.id)}},c.createElement(u.Ay,{icon:h.w,size:13}))),c.createElement("div",{className:"btn-group margin-small",role:"group"},c.createElement("button",{type:"button",title:"Verwijderen",className:"btn btn-sm "+("removed"===n.folder?"btn-danger":" btn-success"),onClick:function(){return"removed"===n.folder?void(confirm("Weet je zeker dat je dit e-mailbericht permanent wilt verwijderen?")&&N.A.deleteMultiple([n.id]).then((function(){r()}))):l({folder:"removed"})}},c.createElement(u.Ay,{icon:E.d,size:13})),"concept"!==n.folder&&c.createElement("button",{type:"button",title:"Openen",className:"btn btn-success btn-sm",onClick:function(){return s(n.id)}},c.createElement(u.Ay,{icon:b.u,size:13})))),c.createElement("div",{className:"col-sm-6"},c.createElement("label",{className:"col-sm-6"},"Aan"),c.createElement("div",{className:"col-sm-6"},c.createElement(A.A,{emailAddresses:(t=(0,a.A)(n.toAddresses),n.contactGroup&&t.push({email:null,name:n.contactGroup.name}),t)})))),c.createElement("div",{className:"row",style:{marginTop:"12px"}},c.createElement("div",{className:"col-sm-6"},c.createElement("label",{className:"col-sm-6"},"Gekoppeld contact"),c.createElement("div",{className:"col-sm-6"},n&&[].concat((0,a.A)(n.contacts),(0,a.A)(n.manualContacts)).map((function(e){return c.createElement("span",{key:e.id},c.createElement(v.N_,{to:"/contact/".concat(e.id),className:"link-underline"},e.fullName)," ",c.createElement("br",null))})))),c.createElement(y.A,{label:"Status",size:"col-sm-6",name:"status",options:m,value:n.status,onChangeAction:function(e){return l({status:e.target.value})},emptyOption:!1})),c.createElement("div",{className:"row"},c.createElement("div",{className:"col-sm-6"},c.createElement("label",{className:"col-sm-6"},"CC"),c.createElement("div",{className:"col-sm-6"},c.createElement(A.A,{emailAddresses:n.ccAddresses}))),c.createElement(O.A,{values:{responsibleUserId:n.responsibleUserId,responsibleTeamId:n.responsibleTeamId},onChangeAction:l})),c.createElement("div",{className:"row"},c.createElement("div",{className:"col-sm-3"},c.createElement("label",{className:"col-sm-12"},"Opmerking")),c.createElement("div",{className:"col-sm-9"},n.note))))}var S=n(84161),k=n(96522);function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){(0,l.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function q(e){var t=e.emailId,n=e.updatedEmailHandler,a=e.deleted,l=e.folder,o=(0,c.useContext)(w.t),s=o.isEmailDetailsModalOpen,i=o.isEmailSendModalOpen,u=o.modalEmailId,d=(0,c.useState)({attachments:[],toAddresses:[],contacts:[],manualContacts:[]}),p=(0,r.A)(d,2),f=p[0],E=p[1];(0,c.useContext)(w.t).openEmailSendModal,(0,c.useEffect)((function(){s||f.id!==u||b()}),[s]),(0,c.useEffect)((function(){i||b()}),[i]),(0,c.useEffect)((function(){b()}),[t]);var b=function(){t&&m.fetchEmail(t).then((function(e){E(e)}))},h=function(e){E(I(I({},f),e)),N.A.update(t,e).then((function(){n()}))};return f?c.createElement("div",null,"removed"===f.folder&&"removed"!==l&&c.createElement("div",{className:"panel panel-default"},c.createElement("div",{className:"panel-body panel-small"},c.createElement("div",{className:"row",style:{marginLeft:"-5px"}},c.createElement("div",{className:"col-md-12"},c.createElement("span",{className:"h5",style:{color:"#e64a4a"}},"Deze e-mail is verwijderd. ",c.createElement("a",{style:{color:"#e64a4a",cursor:"pointer"},onClick:function(){return h({folder:l})}},c.createElement("strong",null,"Klik hier om verwijderen ongedaan te maken."))))))),c.createElement(j,{email:f,updateEmailAttributes:h,deleted:a}),c.createElement("div",{className:"panel panel-default"},c.createElement("div",{className:"panel-body panel-small",style:{padding:"20px"},id:"split-view-email-html"},c.createElement(k.A,{style:{height:"calc(100vh - 550px)"}},c.createElement("div",{dangerouslySetInnerHTML:{__html:f.htmlBodyWithEmbeddedImages}})))),c.createElement(S.A,{email:f})):c.createElement(c.Fragment,null)}var M=n(95093),P=n.n(M),D=n(73158),z=n(63750),T=n(8426);function U(e){var t=e.emailIds,n=e.onSaved,l=(0,g.d4)((function(e){return e.systemData.emailStatuses})),o=(0,g.d4)((function(e){return e.systemData.teams})),s=(0,g.d4)((function(e){return e.systemData.users})),i=(0,c.useState)(!1),m=(0,r.A)(i,2),d=m[0],p=m[1],f=(0,c.useState)(-1),E=(0,r.A)(f,2),b=E[0],v=E[1],A=(0,c.useState)(-1),O=(0,r.A)(A,2),w=O[0],x=O[1],j=(0,c.useState)(-1),S=(0,r.A)(j,2),k=S[0],C=S[1];return c.createElement(c.Fragment,null,c.createElement("button",{type:"button",title:"Bewerken",className:"btn btn-success btn-sm",onClick:function(){p(!0)}},c.createElement(u.Ay,{icon:h.w,size:13})),d&&c.createElement(z.A,{buttonConfirmText:"Opslaan",closeModal:function(){return p(!1)},confirmAction:function(){var e={};-1!==parseInt(b)&&(e.status=b),-1!==w&&(e.responsibleUserId=w),-1!==k&&(e.responsibleTeamId=k),N.A.updateMultiple(t,e).then((function(){p(!1),n()}))},title:"Bulk bewerken",modalClassName:"modal-lg"},c.createElement("div",{className:"row",style:{marginTop:"12px"}},c.createElement(y.A,{label:"Status",size:"col-sm-6",name:"status",options:[{id:-1,name:"--- niet wijzigen ---"}].concat((0,a.A)(l)),value:b,onChangeAction:function(e){return v(e.target.value)},emptyOption:!1}),c.createElement(T.A,{label:"Verantwoordelijke",size:"col-sm-6",name:"responsible",optionsInGroups:[{name:"general",label:"Algemeen",options:[{id:"-1",name:"--- niet wijzigen ---"},{id:"0",name:"--- geen ---"}]},{name:"user",label:"Gebruikers",options:s,optionName:"fullName"},{name:"team",label:"Teams",options:o}],value:-1===w&&-1===k?"general-1":w?"user"+w:k?"team"+k:"general0",onChangeAction:function(e){return function(e){if("general-1"===e)return x(-1),void C(-1);x(null),C(null),0===e.indexOf("user")&&x(e.replace("user","")),0===e.indexOf("team")&&C(e.replace("team",""))}(e.target.value)},emptyOption:!1}))))}function L(e){var t=e.emails,n=e.folder,l=e.emailCount,o=e.fetchMoreEmails,s=e.selectedEmailId,i=e.setSelectedEmailId,m=e.onUpdated,d=e.multiselectEnabled,p=e.setMultiselectEnabled,f=(0,c.useState)([]),b=(0,r.A)(f,2),h=b[0],v=b[1],g=function(e){localStorage.setItem("lastOpenedEmailId",e.id),i(e.id)};return(0,c.useEffect)((function(){if(!s&&0!==t.length){var e=t.findIndex((function(e){return e.id===parseInt(localStorage.getItem("lastOpenedEmailId"))}));g(t[-1===e?0:e])}}),[t]),(0,c.useEffect)((function(){v([]),p(!1)}),[n]),c.createElement("div",{className:"panel panel-default"},c.createElement("div",{className:"panel-body panel-small",style:{height:"calc(100vh - 190px)",overflow:"auto"},onScroll:function(e){e.target.scrollHeight-e.target.scrollTop-e.target.clientHeight<10&&(t.length>=l||o())}},d&&c.createElement("div",{className:"row"},c.createElement("div",{className:"col-xs-12",style:{display:"flex",justifyContent:"space-between"}},c.createElement("div",{style:{flex:"none",display:"flex",marginLeft:"6px",alignItems:"center"},onClick:function(){h.length===t.length?v([]):v(t.map((function(e){return e.id})))}},c.createElement("input",{type:"checkbox",checked:h.length===t.length,style:{marginRight:"5px"}}),"Selecteer alles"),c.createElement("div",{className:"btn-group margin-small",role:"group"},c.createElement(U,{emailIds:h,onSaved:function(){v([]),p(!1),m()}}),c.createElement("button",{type:"button",title:"Verwijderen",className:"btn btn-sm "+("removed"===n?"btn-danger":"btn-success"),onClick:function(){"removed"===n?confirm("Weet je zeker dat je deze e-mails permanent wilt verwijderen?")&&N.A.deleteMultiple(h).then((function(){v([]),m()})):N.A.updateMultiple(h,{folder:"removed"}).then((function(){v([]),m()}))}},c.createElement(u.Ay,{icon:E.d,size:13}))))),c.createElement("table",{className:"table table-condensed table-hover table-striped col-xs-12"},c.createElement("thead",null,c.createElement("tr",{className:"thead-title"},c.createElement("th",null,c.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},c.createElement("div",null,function(){switch(n){case"inbox":return"Inbox";case"sent":return"Verzonden";case"concept":return"Concepten";case"removed":return"Verwijderd";default:return"Onbekend"}}()," (",l,")"))))),c.createElement("tbody",null,0===t.length?c.createElement("tr",null,c.createElement("td",null,"Geen e-mails gevonden!")):t.map((function(e){return c.createElement("tr",{key:e.id,style:{cursor:"pointer"}},c.createElement("td",{style:{borderRadius:"5px",backgroundColor:e.id===s?"#d6e1f3":"#fff",fontWeight:"unread"===e.status?"bold":"normal"}},c.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},d&&c.createElement("div",{style:{flex:"none",display:"flex",marginRight:"10px"},onClick:function(){return function(e){h.includes(e.id)?v(h.filter((function(t){return t!==e.id}))):v([].concat((0,a.A)(h),[e.id]))}(e)}},c.createElement("input",{type:"checkbox",checked:h.includes(e.id)})),c.createElement("div",{style:{flex:1},onClick:function(){return g(e)}},c.createElement("span",{style:{fontSize:"15px"}},(0,x.c)(e.status)," ",function(e){return"sent"===e.folder?0===e.to.length?"Geen ontvanger":1===e.to.length?e.to[0]:e.to[0]+" (+"+(e.to.length-1)+")":e.from}(e))," ",c.createElement("span",{style:{fontSize:"12px"}},"(",e.mailbox.name,")"),c.createElement("br",null),c.createElement("span",null,e.subject)),c.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"end"},onClick:function(){return g(e)}},c.createElement("span",{style:{fontSize:"12px"}},function(e){return"concept"===e.folder?e.createdAt&&P()(e.createdAt).format("DD-MM-YYYY HH:mm"):e.date&&P()(e.date).format("DD-MM-YYYY HH:mm")}(e)),c.createElement("div",null,c.createElement("span",{style:{color:"#999"}},function(e){return"sent"===e.folder?e.sentByUserName:e.responsibleName}(e)),e.hasAttachments&&c.createElement(u.Ay,{icon:D.$,size:18}))))))})),t.length<l&&c.createElement("tr",null,c.createElement("td",null,c.createElement("button",{className:"btn btn-link pull-right",onClick:function(){return o()}},"meer laden...")))))))}function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function F(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(Object(n),!0).forEach((function(t){(0,l.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function R(e){var t=e.filters,n=e.setFilters,a=e.activeMailboxes,l=(0,g.d4)((function(e){return e.systemData.emailStatuses})),o=(0,g.d4)((function(e){return e.systemData.teams})),s=(0,g.d4)((function(e){return e.systemData.users})),i=(0,c.useState)(t.responsibleUserId?t.responsibleUserId:""),m=(0,r.A)(i,2),u=m[0],d=m[1],p=(0,c.useState)(t.responsibleTeamId?t.responsibleTeamId:""),f=(0,r.A)(p,2),E=f[0],b=f[1];return c.createElement("div",{className:"panel panel-default"},c.createElement("div",{className:"panel-body panel-small"},c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-12"},c.createElement("table",{className:"table table-condensed table-hover table-striped col-xs-12",style:{marginBottom:"0px"}},c.createElement("thead",null,c.createElement("tr",{className:"thead-title"},c.createElement("th",{className:"",width:"10%"},"Van e-mail"),c.createElement("th",{className:"",width:"10%"},"Gekoppeld contact"),c.createElement("th",{className:"",width:"15%"},"Onderwerp"),c.createElement("th",{className:"",width:"7%"},"Van"),c.createElement("th",{className:"",width:"7%"},"T/m"),c.createElement("th",{className:"",width:"10%"},"Status"),c.createElement("th",{className:"",width:"10%"},"Verantwoordelijke"),c.createElement("th",{className:"",width:"11%"},"Mailbox"),c.createElement("th",{className:"",width:"10%"},"Aan"),c.createElement("th",{className:"",width:"5%"},"Bijlage")),c.createElement("tr",{className:"thead-filter"},c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:t.from,onChange:function(e){n(F(F({},t),{},{from:e.target.value}))}})),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:t.contact,onChange:function(e){n(F(F({},t),{},{contact:e.target.value}))}})),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:t.subject,onChange:function(e){n(F(F({},t),{},{subject:e.target.value}))}})),c.createElement("th",null,c.createElement("input",{type:"date",className:"form-control input-sm",value:t.dateSentStart,onChange:function(e){n(F(F({},t),{},{dateSentStart:e.target.value,fetch:!0}))}})),c.createElement("th",null,c.createElement("input",{type:"date",className:"form-control input-sm",value:t.dateSentEnd,onChange:function(e){n(F(F({},t),{},{dateSentEnd:e.target.value,fetch:!0}))}})),c.createElement("th",null,c.createElement("select",{className:"form-control input-sm",value:t.status,onChange:function(e){n(F(F({},t),{},{status:e.target.value,fetch:!0}))}},c.createElement("option",null),l.map((function(e){return c.createElement("option",{key:e.id,value:e.id},e.name)})))),c.createElement("th",null,c.createElement("select",{className:"form-control input-sm",name:"responsible",value:u?"user"+u:E?"team"+E:"",onChange:function(e){return a=e.target.value,d(""),b(""),0!==a.indexOf("user")&&0!==a.indexOf("team")&&n(F(F({},t),{},{responsibleUserId:"",responsibleTeamId:"",fetch:!0})),0===a.indexOf("user")&&(d(a.replace("user","")),n(F(F({},t),{},{responsibleUserId:a.replace("user",""),responsibleTeamId:"",fetch:!0}))),void(0===a.indexOf("team")&&(b(a.replace("team","")),n(F(F({},t),{},{responsibleUserId:"",responsibleTeamId:a.replace("team",""),fetch:!0}))));var a}},c.createElement("option",{value:""}),c.createElement("optgroup",{key:1,label:"Gebruikers"},s.map((function(e){return c.createElement("option",{key:e.id,value:"user"+e.id},e.fullName)}))),c.createElement("optgroup",{key:1,label:"Teams"},o.map((function(e){return c.createElement("option",{key:e.id,value:"team"+e.id},e.name)}))))),c.createElement("th",null,c.createElement("select",{className:"form-control input-sm",value:t.mailbox,onChange:function(e){n(F(F({},t),{},{mailbox:e.target.value,fetch:!0}))}},c.createElement("option",null),a.map((function(e){return c.createElement("option",{key:e.id,value:e.id},e.name)})))),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:t.to,onChange:function(e){n(F(F({},t),{},{to:e.target.value}))}})),c.createElement("th",null,c.createElement("select",{className:"form-control input-sm",value:t.attachment,onChange:function(e){n(F(F({},t),{},{attachment:e.target.value,fetch:!0}))}},c.createElement("option",null),c.createElement("option",{value:1},"Ja"))))))))))}function H(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?H(Object(n),!0).forEach((function(t){(0,l.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function G(e){localStorage.setItem("emailFilters",JSON.stringify(e))}function V(){var e=localStorage.getItem("emailFilters");return e?Y(Y({},W),JSON.parse(e)):Y({},W)}var W={from:"",contact:"",subject:"",mailboxId:"",status:"",responsibleUserId:"",responsibleTeamId:"",to:"",attachment:"",dateSentStart:"",dateSentEnd:""},_=n(83873),J=n(91858),$=n(45298),K=n(42285),Q=n(45403),X=n(93913),Z=n(55956);function ee(e){var t=e.activeMailboxes,n=(0,c.useState)(!0),a=(0,r.A)(n,2),l=a[0],o=a[1],s=(0,c.useState)(!1),i=(0,r.A)(s,2),m=i[0],u=i[1];return l?c.createElement("div",{className:"row"},c.createElement("div",{className:"col-xs-12"},c.createElement("div",{className:"alert alert-info",style:{display:"flex",justifyContent:"space-between"},role:"alert"},m?c.createElement("div",null,c.createElement("div",{style:{flex:"1 1 auto"}},c.createElement(Z.A,{buttonText:"Status mailboxen (verbergen)",onClickAction:function(){return u(!1)}})),c.createElement("div",null," "),c.createElement("div",{style:{flex:"1 1 auto"}},c.createElement(K.A,null,c.createElement(Q.A,null,c.createElement("th",null,"Mailbox"),c.createElement("th",null,"Email laatst opgehaald"),c.createElement("th",null,"Meldingen")),c.createElement(X.A,null,t.map((function(e){return c.createElement("tr",{key:e.id},c.createElement("td",null,e.name),c.createElement("td",null,e.date_last_fetched?P()(e.date_last_fetched).format("DD-MM-YYYY HH:mm:ss"):""),c.createElement("td",null,e.valid?"":c.createElement("span",{style:{color:"red",fontWeight:"bold"}},"Fout in configuratie")))})))," "))):c.createElement("div",{style:{flex:"1 1 auto"}},c.createElement(Z.A,{buttonText:"Status mailboxen (tonen)",onClickAction:function(){return u(!0)}})),c.createElement("div",null,c.createElement("a",{onClick:function(){return o(!1)},className:"btn btn-sm"},"x"))))):null}var te=n(72505),ne=n.n(te);function ae(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ae(Object(n),!0).forEach((function(t){(0,l.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ae(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function re(e){var t=e.router,n=(0,c.useState)([]),l=(0,r.A)(n,2),o=l[0],s=l[1],i=(0,c.useState)(!1),d=(0,r.A)(i,2),p=d[0],f=d[1],E=(0,c.useState)([]),b=(0,r.A)(E,2),h=b[0],g=b[1],y=(0,c.useState)(0),A=(0,r.A)(y,2),O=A[0],x=A[1],j=(0,c.useState)(null),S=(0,r.A)(j,2),k=S[0],C=S[1],I=(0,c.useState)(!1),M=(0,r.A)(I,2),P=M[0],D=M[1],T=(0,c.useState)(!1),U=(0,r.A)(T,2),B=U[0],F=U[1],H=(0,c.useState)(null),Y=(0,r.A)(H,2),K=Y[0],Q=Y[1],X=(0,c.useState)(le({},W)),Z=(0,r.A)(X,2),te=Z[0],ae=Z[1],re=(0,c.useContext)(w.t),oe=re.isEmailDetailsModalOpen,se=re.isEmailSendModalOpen,ie=re.openEmailSendModal,me=h.length>0,ue=(0,c.useState)(!1),de=(0,r.A)(ue,2),pe=de[0],fe=de[1],Ee=(0,c.useState)("Nieuwe e-mails worden opgehaald ..."),be=(0,r.A)(Ee,2),he=be[0],ve=be[1];(0,c.useEffect)((function(){ye(!0)}),[]),(0,c.useEffect)((function(){!oe&&O>0&&ge()}),[oe]),(0,c.useEffect)((function(){!se&&O>0&&ge()}),[se]),(0,c.useEffect)((function(){ae(le(le({},V()),{},{fetch:!0})),C(null)}),[t.params.folder]),(0,c.useEffect)((function(){ae(le(le({},V()),{},{fetch:!0})),t.location.query.contact?ce(t.location.query.contact).then((function(e){Q(e.data.data)})):Q(null)}),[t.location.query.contact]),(0,c.useEffect)((function(){te.fetch&&(ae(le(le({},te),{},{fetch:!1})),G(te),m.fetchSelectList({filter:Ne(),limit:50,offset:0,sorts:Ae()}).then((function(e){s(e.data.items),x(e.data.total)})))}),[te.fetch]);var ge=function(){return m.fetchSelectList({filter:Ne(),limit:Math.max(o.length,50),offset:0,sorts:Ae()}).then((function(e){s(e.data.items),x(e.data.total)}))},ye=function(e){f(!0),ne().all([_.A.fetchMailboxesLoggedInUser()]).then(ne().spread((function(t){g(t.data.data),e&&t.data.meta.activateAutomaticRefreshEmailData&&we(),f(!1)}))).catch((function(e){console.log(e),f(!1)}))},Ne=function(){return function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],l={and:[{f:"folder",d:t}]};return e.subject&&l.and.push({f:"subjectForFilter",o:"like",d:"%".concat(e.subject,"%")}),e.from&&l.and.push({f:"from",o:"like",d:"%".concat(e.from,"%")}),e.contact&&l.and.push({or:[{f:"contacts.fullName",o:"like",d:"%".concat(e.contact,"%")},{f:"manualContacts.fullName",o:"like",d:"%".concat(e.contact,"%")}]}),e.mailbox&&l.and.push({f:"mailboxId",d:e.mailbox}),e.status&&l.and.push({f:"status",d:e.status}),e.responsibleUserId&&1!==e.responsibleUserId&&l.and.push({f:"responsibleUserId",d:e.responsibleUserId}),e.responsibleTeamId&&1!==e.responsibleTeamId&&l.and.push({f:"responsibleTeamId",d:e.responsibleTeamId}),e.to&&l.and.push({f:"to",o:"like",d:"%".concat(e.to,"%")}),e.attachment&&l.and.push({f:"attachmentsWithoutCids.id",o:">",d:0}),e.attachment&&l.and.push({f:"attachmentsWithoutCids.id",o:">",d:0}),e.dateSentStart&&l.and.push({f:"dateSent",o:">=",d:e.dateSentStart}),e.dateSentEnd&&l.and.push({f:"dateSent",o:"<=",d:e.dateSentEnd+" 23:59:59"}),n&&l.and.push({or:[{f:"contacts.contactId",d:n},{f:"manualContacts.contactId",d:n}]}),a&&l.and.push({f:"eigenOpenstaand"}),l}(te,t.params.folder,t.location.query.contact,t.location.query.eigen)},Ae=function(){return"concept"===t.params.folder?["-createdAt"]:["-dateSent"]},Oe=function(){if(t.location.query.contact)return G(W),void v.RL.push(t.location.pathname);ae(le(le({},W),{},{fetch:!0}))},we=function(){P||(D(!0),_.A.receiveMailFromMailboxesUser().then((function(){ve("Ophalen nieuwe e-mails is voltooid."),ge(),ye(!1),setTimeout(xe,5e3)})).catch((function(e){ve("Er ging iets mis bij ophalen nieuwe e-mails.")})))};function xe(){D(!1)}var je=function(){return Object.keys(te).some((function(e){return!!te[e]&&"fetch"!==e}))};return c.createElement("div",null,p?c.createElement("div",{className:"row"},c.createElement("div",{className:"col-xs-12"},c.createElement("div",{className:"alert alert-info",role:"alert"},"Bezig met ophalen mailbox statussen ..."))):me?c.createElement(c.Fragment,null,c.createElement(ee,{activeMailboxes:h}),c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-4",style:{paddingLeft:"17px",marginTop:"-10px",marginBottom:"5px"}},c.createElement("div",{className:"btn-group",role:"group"},c.createElement(J.A,{iconName:"refresh",onClickAction:we,title:"Alle mappen ontvangen"}),c.createElement(J.A,{iconName:"plus",onClickAction:function(){N.A.storeNew().then((function(e){ie(e.data.id)}))},title:"Nieuwe e-mail"}),c.createElement(J.A,{iconName:"check",onClickAction:function(){return fe(!pe)},title:"Contactselectie maken"}))),c.createElement("div",{className:"col-md-4",style:{marginTop:"-10px",marginBottom:"5px"}},K&&c.createElement("span",{style:{marginLeft:"6px"}},"Email voor contact ",c.createElement("strong",null,null==K?void 0:K.fullName),c.createElement("a",{role:"button",style:{marginLeft:"10px"},className:"btn btn-success btn-sm",onClick:function(){return v.RL.push(t.location.pathname)}},"Filter wissen"))),c.createElement("div",{className:"col-md-4",style:{marginTop:"-10px",marginBottom:"5px"}},je()&&c.createElement("button",{type:"button",className:"btn btn-success pull-right btn-sm",style:{marginRight:"4px"},onClick:Oe},"Wis alle filters")),P&&c.createElement(z.A,{buttonClassName:"btn-danger",closeModal:xe,buttonCancelText:"Sluiten",showConfirmAction:!1,title:"Alle mappen ontvangen"},c.createElement("p",null,he)))):c.createElement("div",{className:"row"},c.createElement("div",{className:"col-xs-12"},c.createElement("div",{className:"alert alert-info",role:"alert"},"U heeft nog geen toegang tot een mailbox toegekend gekregen."))),c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-12"},c.createElement("form",{onKeyUp:function(e){13===e.keyCode&&ae(le(le({},te),{},{fetch:!0}))}},c.createElement(R,{filters:te,setFilters:ae,activeMailboxes:h})))),c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-4 margin-10-top",style:{paddingRight:"0px"}},je()&&c.createElement("div",{className:"panel panel-default"},c.createElement("div",{className:"panel-body panel-small"},"Let op: filters actief  ",c.createElement("a",{role:"button",onClick:Oe},c.createElement(u.Ay,{size:16,icon:$.t})))),c.createElement(L,{emails:o,folder:t.params.folder,emailCount:O,fetchMoreEmails:function(){if(!B)return F(!0),m.fetchSelectList({filter:Ne(),limit:50,offset:o.length,sorts:Ae()}).then((function(e){s([].concat((0,a.A)(o),(0,a.A)(e.data.items))),F(!1)}))},selectedEmailId:k,setSelectedEmailId:C,updateEmailAttributes:function(e,t){var n=o.map((function(n){return n.id===e?le(le({},n),t):n}));s(n)},onUpdated:ge,multiselectEnabled:pe,setMultiselectEnabled:fe})),c.createElement("div",{className:"col-md-8 margin-10-top"},c.createElement(q,{emailId:k,updatedEmailHandler:ge,folder:t.params.folder,deleted:function(){localStorage.setItem("lastOpenedEmailId",null),C(null),ge()}}))))}var ce=function(e){return o.A.get("/jory/contact/"+e,{params:{jory:{fld:["fullName"]}}})}},25795:(e,t)=>{t.u=void 0,t.u={viewBox:"0 0 1792 1792",children:[{name:"path",attribs:{d:"M1408 928v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zM1792 64v512q0 26-19 45t-45 19-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45 45-19h512q26 0 45 19t19 45z"}}]}},73158:(e,t)=>{t.$=void 0,t.$={viewBox:"0 0 1408 1792",children:[{name:"path",attribs:{d:"M1404 1385q0 117-79 196t-196 79q-135 0-235-100l-777-776q-113-115-113-271 0-159 110-270t269-111q158 0 273 113l605 606q10 10 10 22 0 16-30.5 46.5t-46.5 30.5q-13 0-23-10l-606-607q-79-77-181-77-106 0-179 75t-73 181q0 105 76 181l776 777q63 63 145 63 64 0 106-42t42-106q0-82-63-145l-581-581q-26-24-60-24-29 0-48 19t-19 48q0 32 25 59l410 410q10 10 10 22 0 16-31 47t-47 31q-12 0-22-10l-410-410q-63-61-63-149 0-82 57-139t139-57q88 0 149 63l581 581q100 98 100 235z"}}]}},45298:(e,t)=>{t.t=void 0,t.t={viewBox:"0 0 1536 1792",children:[{name:"path",attribs:{d:"M1536 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z"}}]}}}]);