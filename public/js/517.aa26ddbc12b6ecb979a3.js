"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[517],{20517:(e,t,n)=>{n.r(t),n.d(t,{default:()=>A});var r=n(15671),o=n(43144),a=n(97326),l=n(60136),c=n(82963),i=n(61120),s=n(4942),u=n(67294),m=n(86706),f=n(87462),h=n(96498),p=n(75286),d=n(24480),v=n(52822),E=n(61409),y=(n(30381),n(97894)),Z=n(75502);const g=function(e){(0,l.Z)(s,e);var t,n,a=(t=s,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function s(e){var t;return(0,r.Z)(this,s),(t=a.call(this,e)).state={showActionButtons:!1,highlightRow:""},t}return(0,o.Z)(s,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){E.nA.push("/mailbox/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,r=t.name,o=t.email,a=t.incomingServerType,l=t.incomingServerTypeName,c=t.outgoingServerType,i=t.outgoingServerTypeName,s=t.imapHost,m=t.imapPort,f=t.smtpHost,h=t.smtpPort,p=t.mailgunDomain,d=t.valid,v=t.primary,E=t.isActive;return u.createElement("tr",{className:"".concat(this.state.highlightRow,"  ").concat(d?"":"has-error"),onDoubleClick:function(){return e.openItem(n)},onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},u.createElement("td",null,r),u.createElement("td",null,o),"imap"===a?u.createElement("td",null,l," ",s," (",m,")"):u.createElement("td",null,l),"smtp"===c?u.createElement("td",null,i," ",f," (",h,")"):"mailgun"===c?u.createElement("td",null,i," ",p):u.createElement("td",null,i),u.createElement("td",null,v?"Primair":""),u.createElement("td",null,E?"Ja":"Nee"),u.createElement("td",null,this.state.showActionButtons?u.createElement("a",{role:"button",onClick:function(){return e.openItem(n)}},u.createElement(y.ZP,{className:"mybtn-success",size:14,icon:Z.r})):""))}}]),s}(u.Component);var b=function(e){(0,l.Z)(s,e);var t,n,a=(t=s,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function s(e){return(0,r.Z)(this,s),a.call(this,e)}return(0,o.Z)(s,[{key:"render",value:function(){var e="",t=!0;return this.props.hasError?e="Fout bij het ophalen van mailboxen.":this.props.isLoading?e="Gegevens aan het laden.":0===this.props.mailboxes.length?e="Geen mailboxen gevonden!":t=!1,u.createElement("div",null,u.createElement(h.Z,null,u.createElement(p.Z,null,u.createElement("tr",{className:"thead-title"},u.createElement(v.Z,{title:"Weergavenaam",width:"15%"}),u.createElement(v.Z,{title:"E-mail",width:"15%"}),u.createElement(v.Z,{title:"Inkomend",width:"15%"}),u.createElement(v.Z,{title:"Uitgaand",width:"15%"}),u.createElement(v.Z,{title:"Primair",width:"5%"}),u.createElement(v.Z,{title:"Actief",width:"5%"}),u.createElement(v.Z,{title:"",width:"5%"}))),u.createElement(d.Z,null,t?u.createElement("tr",null,u.createElement("td",{colSpan:7},e)):this.props.mailboxes.map((function(e){return u.createElement(g,(0,f.Z)({key:e.id},e))})))))}}]),s}(u.Component);const w=(0,m.$j)((function(e){return{mailboxes:e.mailboxes,usesMailgun:e.systemData.usesMailgun,isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}),null)(b);var R=n(55451);const x=(0,m.$j)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var t=e.permissions,n=void 0===t?{}:t;return u.createElement("div",{className:"row"},u.createElement("div",{className:"col-md-4"},u.createElement("div",{className:"btn-group",role:"group"},u.createElement(R.Z,{iconName:"refresh",onClickAction:e.refreshData}),n.createMailbox&&u.createElement(R.Z,{iconName:"plus",onClickAction:function(){E.nA.push("/mailbox/nieuw")}}))),u.createElement("div",{className:"col-md-4"},u.createElement("h3",{className:"text-center table-title"},"Mailboxen")),u.createElement("div",{className:"col-md-4"}))}));var k=n(14309),N=n(98688);var M=function(e){(0,l.Z)(f,e);var t,n,m=(t=f,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function f(e){var t;return(0,r.Z)(this,f),t=m.call(this,e),(0,s.Z)((0,a.Z)(t),"refreshData",(function(){t.props.clearMailboxes(),t.props.fetchMailboxes()})),t}return(0,o.Z)(f,[{key:"componentDidMount",value:function(){this.props.fetchMailboxes()}},{key:"componentWillUnmount",value:function(){this.props.clearMailboxes()}},{key:"render",value:function(){var e=this;return u.createElement(k.Z,{className:"col-md-12"},u.createElement(N.Z,null,u.createElement("div",{className:"col-md-12 margin-10-top"},u.createElement(x,{refreshData:function(){return e.refreshData()}})),u.createElement("div",{className:"col-md-12 margin-10-top"},u.createElement(w,null))))}}]),f}(u.Component);const A=(0,m.$j)(null,(function(e){return{fetchMailboxes:function(){e({type:"FETCH_MAILBOXES"})},clearMailboxes:function(){e({type:"CLEAR_MAILBOXES"})}}}))(M)}}]);