"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[1107],{61107:(e,t,n)=>{n.r(t),n.d(t,{default:()=>I});var a=n(23029),l=n(92901),r=n(56822),o=n(53954),c=n(85501),i=n(64467),s=n(96540),u=n(69733),m=n(58168),p=n(42285),h=n(45403),f=n(93913),E=n(26829),d=n(24179),v=n(87722),A=n(88505);function g(e,t,n){return t=(0,o.A)(t),(0,r.A)(e,w()?Reflect.construct(t,n||[],(0,o.A)(e).constructor):t.apply(e,n))}function w(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(w=function(){return!!e})()}const y=function(e){function t(e){var n;return(0,a.A)(this,t),(n=g(this,t,[e])).state={showActionButtons:!1,highlightRow:""},n}return(0,c.A)(t,e),(0,l.A)(t,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){d.RL.push("/email-template/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,a=t.name,l=t.subject,r=t.createdBy;return s.createElement("tr",{className:this.state.highlightRow,onDoubleClick:function(){return e.openItem(n)},onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},s.createElement("td",null,a),s.createElement("td",null,l),s.createElement("td",null,r?r.fullName:""),s.createElement("td",null,this.state.showActionButtons?s.createElement("a",{role:"button",onClick:function(){return e.openItem(n)}},s.createElement(v.Ay,{className:"mybtn-success",size:14,icon:A.w})):""))}}])}(s.Component);function T(e,t,n){return t=(0,o.A)(t),(0,r.A)(e,N()?Reflect.construct(t,n||[],(0,o.A)(e).constructor):t.apply(e,n))}function N(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(N=function(){return!!e})()}var k=function(e){function t(e){var n;return(0,a.A)(this,t),(n=T(this,t,[e])).state={showDeleteItem:!1,deleteItem:{id:"",name:""}},n}return(0,c.A)(t,e),(0,l.A)(t,[{key:"render",value:function(){var e="",t=!0;return this.props.hasError?e="Fout bij het ophalen van e-mailtemplates.":this.props.isLoading?e="Gegevens aan het laden.":0===this.props.emailTemplates.length?e="Geen e-mailtemplates gevonden!":t=!1,s.createElement("div",null,s.createElement(p.A,null,s.createElement(h.A,null,s.createElement("tr",{className:"thead-title"},s.createElement(E.A,{title:"Naam",width:"30%"}),s.createElement(E.A,{title:"Onderwerp",width:"30%"}),s.createElement(E.A,{title:"Gemaakt door",width:"35%"}),s.createElement(E.A,{title:"",width:"5%"}))),s.createElement(f.A,null,t?s.createElement("tr",null,s.createElement("td",{colSpan:4},e)):this.props.emailTemplates.map((function(e){return s.createElement(y,(0,m.A)({key:e.id},e))})))))}}])}(s.Component);const R=(0,u.Ng)((function(e){return{isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}))(k);var L=n(91858);const B=function(e){return s.createElement("div",{className:"row"},s.createElement("div",{className:"col-md-4"},s.createElement("div",{className:"btn-group",role:"group"},s.createElement(L.A,{iconName:"refresh",onClickAction:e.refreshEmailTemplatesData}),s.createElement(L.A,{iconName:"plus",onClickAction:function(){d.RL.push("/email-template/nieuw")}}))),s.createElement("div",{className:"col-md-4"},s.createElement("h3",{className:"text-center table-title"},"E-mail templates")),s.createElement("div",{className:"col-md-4"}))};function C(e,t,n){return t=(0,o.A)(t),(0,r.A)(e,b()?Reflect.construct(t,n||[],(0,o.A)(e).constructor):t.apply(e,n))}function b(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(b=function(){return!!e})()}var D=function(e){function t(e){var n;return(0,a.A)(this,t),n=C(this,t,[e]),(0,i.A)(n,"refreshEmailTemplatesData",(function(){n.props.clearEmailTemplates(),n.props.fetchEmailTemplates()})),n}return(0,c.A)(t,e),(0,l.A)(t,[{key:"componentDidMount",value:function(){this.props.fetchEmailTemplates()}},{key:"componentWillUnmount",value:function(){this.props.clearEmailTemplates()}},{key:"render",value:function(){var e=this;return s.createElement("div",null,s.createElement("div",{className:"panel panel-default"},s.createElement("div",{className:"panel-body"},s.createElement("div",{className:"col-md-12 margin-10-top"},s.createElement(B,{refreshEmailTemplatesData:function(){return e.refreshEmailTemplatesData()}})),s.createElement("div",{className:"col-md-12 margin-10-top"},s.createElement(R,{emailTemplates:this.props.emailTemplates})))))}}])}(s.Component);const I=(0,u.Ng)((function(e){return{emailTemplates:e.emailTemplates}}),(function(e){return{fetchEmailTemplates:function(){e({type:"FETCH_EMAIL_TEMPLATES"})},clearEmailTemplates:function(){e({type:"CLEAR_EMAIL_TEMPLATES"})}}}))(D)}}]);