"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[2209],{34250:(e,t,a)=>{a.d(t,{Z:()=>p});var n=a(67294),r=a(96561),i=a(45697),s=a.n(i),c=a(14309),l=a(49332),o=function(e){var t=e.label,a=e.className,i=e.id,s=e.value,o=e.switchToEdit;return n.createElement("div",{className:a},n.createElement("label",{htmlFor:i,className:"col-sm-3"},t,o?n.createElement("span",null,n.createElement("br",null),n.createElement(l.Z,{buttonClassName:"btn-success btn-padding-small",buttonText:"Wijzig",onClickAction:o})):""),n.createElement(c.Z,{className:"col-sm-9"},n.createElement(r.Z,null,n.createElement("div",{id:i,dangerouslySetInnerHTML:{__html:s}}))))};o.defaultProps={className:"col-sm-12",value:""},o.propTypes={label:s().string.isRequired,className:s().string,id:s().string,value:s().oneOfType([s().string,s().number])};const p=o},22209:(e,t,a)=>{a.r(t),a.d(t,{default:()=>C});var n=a(15671),r=a(43144),i=a(97326),s=a(60136),c=a(82963),l=a(61120),o=a(4942),p=a(67294),u=a(61409),m=a(14309),d=a(98688),h=a(5154);const f=function(e){(0,s.Z)(o,e);var t,a,i=(t=o,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,l.Z)(t);if(a){var r=(0,l.Z)(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return(0,c.Z)(this,e)});function o(e){return(0,n.Z)(this,o),i.call(this,e)}return(0,r.Z)(o,[{key:"render",value:function(){var e=this;return p.createElement("nav",{className:"payment-invoices-list open sticky"},p.createElement("div",{className:"send-payment-invoices-sidebar-menu",style:{color:"$brand-primary"}},p.createElement(h.ZP,{highlightColor:"$brand-primary",highlightBgColor:"#e5e5e5",hoverBgColor:"#F1EFF0",defaultSelected:"order"},this.props.participants.length>0?this.props.participants.map((function(t,a){return p.createElement(h.JL,{onNavClick:function(){return e.props.changeParticipant(t.id)},key:a,id:"administration-".concat(t.id)},p.createElement(h.lh,null,p.createElement(u.rU,{className:"send-payment-invoices-list-link"},t.id," - ",t.name)))})):p.createElement(h.JL,{id:"order"},p.createElement(h.lh,null,this.props.isLoading?p.createElement(u.rU,{className:"send-payment-invoices-list-link"},"Gegevens aan het laden."):p.createElement(u.rU,{className:"send-payment-invoices-list-link"},"Geen opbrengstverdeling beschikbaar."))))))}}]),o}(p.Component);var v=a(7002),E=a(64876),g=a(1114);const y=function(e){(0,s.Z)(o,e);var t,a,i=(t=o,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,l.Z)(t);if(a){var r=(0,l.Z)(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return(0,c.Z)(this,e)});function o(e){var t;return(0,n.Z)(this,o),(t=i.call(this,e)).state={file:null},t}return(0,r.Z)(o,[{key:"componentDidUpdate",value:function(e){e.participantId!==this.props.participantId&&this.props.participantId&&this.downloadFile(this.props.participantId)}},{key:"downloadFile",value:function(e){var t=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;g.Z.previewPDF(this.props.documentTemplateId,e).then((function(e){t.setState({file:e.data})})).catch((function(){a<2&&setTimeout((function(){t.downloadFile(e,a)}),500),a++}))}},{key:"render",value:function(){return this.props.isLoading?p.createElement("div",null,"Gegevens aan het laden."):this.state.file?p.createElement("div",null,p.createElement(E.Z,{file:this.state.file})):this.props.amountOfParticipants>0?p.createElement("div",null,"Selecteer links in het scherm een contact om een preview te zien."):p.createElement("div",null,"Geen gegevens gevonden.")}}]),o}(p.Component);var Z=a(34250);const P=function(e){(0,s.Z)(o,e);var t,a,i=(t=o,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,l.Z)(t);if(a){var r=(0,l.Z)(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return(0,c.Z)(this,e)});function o(e){var t;return(0,n.Z)(this,o),(t=i.call(this,e)).state={email:null},t}return(0,r.Z)(o,[{key:"componentDidUpdate",value:function(e){e.participantId!==this.props.participantId&&this.props.participantId&&this.downloadEmail(this.props.participantId)}},{key:"downloadEmail",value:function(e){var t=this;g.Z.previewEmail(this.props.emailTemplateId,e).then((function(e){t.setState({email:e})}))}},{key:"render",value:function(){return this.props.isLoading?p.createElement("div",null,"Gegevens aan het laden."):this.state.email?p.createElement("div",null,p.createElement("div",{className:"row margin-10-top"},p.createElement("div",{className:"col-sm-12"},p.createElement("div",{className:"row"},p.createElement("div",{className:"col-sm-3"},p.createElement("label",{className:"col-sm-12"},"Aan")),p.createElement("div",{className:"col-sm-9"},this.state.email.to)))),p.createElement("div",{className:"row margin-10-top"},p.createElement("div",{className:"col-sm-12"},p.createElement("div",{className:"row"},p.createElement("div",{className:"col-sm-3"},p.createElement("label",{className:"col-sm-12"},"Onderwerp")),p.createElement("div",{className:"col-sm-9"},this.props.subject)))),p.createElement("div",{className:"row"},p.createElement(Z.Z,{label:"Tekst",value:this.state.email.htmlBody}))):this.props.amountOfParticipants>0&&null==this.state.email?p.createElement("div",null,"Selecteer links in het scherm een contact om een preview te zien."):p.createElement("div",null,"Geen gegevens gevonden.")}}]),o}(p.Component);var w=a(55451),N=a(49332);const b=function(e){(0,s.Z)(o,e);var t,a,i=(t=o,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,l.Z)(t);if(a){var r=(0,l.Z)(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return(0,c.Z)(this,e)});function o(e){var t;return(0,n.Z)(this,o),(t=i.call(this,e)).state={showCreate:!1},t}return(0,r.Z)(o,[{key:"render",value:function(){var e=this;return p.createElement("div",{className:"row"},p.createElement("div",{className:"col-md-4"},p.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},p.createElement(w.Z,{iconName:"arrowLeft",onClickAction:u.mW.goBack}),this.props.amountOfParticipants>0&&p.createElement(N.Z,{buttonText:"Rapportage versturen",onClickAction:function(){e.props.createParticipantReports()}}))),p.createElement("div",{className:"col-md-4"},p.createElement("h4",{className:"text-center"},"Rapportage aanmaken (",this.props.amountOfParticipants,")"),this.props.showOnPortal?p.createElement("div",{className:"text-center text-success"},"Deze rapportage zal ook beschikbaar/zichtbaar worden op de Portal"):p.createElement("div",{className:"text-center text-danger"},"Deze rapportage zal NIET beschikbaar/zichtbaar worden op de Portal")),p.createElement("div",{className:"col-md-4"}))}}]),o}(p.Component);var k=a(86706),R=a(15690),I=a(41355);var B=function(e){(0,s.Z)(E,e);var t,a,h=(t=E,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,l.Z)(t);if(a){var r=(0,l.Z)(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return(0,c.Z)(this,e)});function E(e){var t;return(0,n.Z)(this,E),t=h.call(this,e),(0,o.Z)((0,i.Z)(t),"changeParticipant",(function(e){t.setState({participantId:e})})),(0,o.Z)((0,i.Z)(t),"createParticipantReports",(function(){document.body.style.cursor="wait",t.setState({isBusy:!0}),g.Z.createParticipantReport(t.props.reportPreview.templateId,t.props.reportPreview.emailTemplateId,t.props.reportPreview.subject,t.props.reportPreview.participantIds,t.props.reportPreview.showOnPortal).then((function(e){document.body.style.cursor="default",e.data?t.setState({errorMessage:"Fouten bij verzenden rapporten",isBusy:!1}):t.setState({successMessage:"De rapporten zijn aangeboden voor verzenden.",isBusy:!1})}))})),(0,o.Z)((0,i.Z)(t),"redirect",(function(){t.state.redirect?u.nA.push(t.state.redirect):u.mW.goBack()})),t.state={participants:[],participantId:"",successMessage:"",errorMessage:"",redirect:"",isBusy:!1,isLoading:!1},t}return(0,r.Z)(E,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0}),v.Z.peekParticipantsById(this.props.reportPreview.participantIds).then((function(t){e.setState({participants:t.data,isLoading:!1})})).catch((function(t){e.setState({isLoading:!1})}))}},{key:"componentWillUnmount",value:function(){this.props.clearPreviewParticipantReport()}},{key:"render",value:function(){var e="",t=!0;return this.state.isBusy?e="Bezig met versturen rapportage. Dit kan enige tijd duren.":t=!1,t?p.createElement("div",null,e):p.createElement("div",null,p.createElement("div",{className:"row"},p.createElement("div",{className:"col-md-12 margin-10-top"},p.createElement("div",{className:"col-md-12 margin-10-top"},p.createElement(m.Z,null,p.createElement(d.Z,{className:"panel-small"},p.createElement(b,{createParticipantReports:this.createParticipantReports,amountOfParticipants:this.state.participants?this.state.participants.length:0,administrationId:this.props.params.id,showOnPortal:this.props.reportPreview.showOnPortal})))))),p.createElement("div",{className:"row"},p.createElement("div",{className:"col-md-2"},p.createElement("div",{className:"col-md-12 margin-10-top"},p.createElement(m.Z,null,p.createElement(d.Z,{className:"panel-invoice-payments-list"},p.createElement(f,{participants:this.state.participants,isLoading:this.state.isLoading,changeParticipant:this.changeParticipant}))))),p.createElement("div",{className:"col-md-5"},p.createElement("div",{className:"col-md-12 margin-10-top"},p.createElement(m.Z,null,p.createElement(d.Z,null,this.state.isLoading?p.createElement("div",null,"Gegevens aan het laden."):this.props.reportPreview.templateId?p.createElement(y,{subject:this.props.reportPreview.subject,documentTemplateId:this.props.reportPreview.templateId,emailTemplateId:this.props.reportPreview.emailTemplateId,participantId:this.state.participantId,isLoading:this.state.isLoading,amountOfParticipants:this.state.participants?this.state.participants.length:-1}):p.createElement("div",{className:"text-center text-danger"},"Er is geen document template gekozen, er zal alleen een e-mail worden verstuurd zonder PDF bijlage"))))),p.createElement("div",{className:"col-md-5"},p.createElement("div",{className:"col-md-12 margin-10-top"},p.createElement(m.Z,null,p.createElement(d.Z,null,this.state.isLoading?p.createElement("div",null,"Gegevens aan het laden."):p.createElement(P,{subject:this.props.reportPreview.subject,documentTemplateId:this.props.reportPreview.templateId,emailTemplateId:this.props.reportPreview.emailTemplateId,participantId:this.state.participantId,isLoading:this.state.isLoading,amountOfParticipants:this.state.participants?this.state.participants.length:-1})))))),this.state.successMessage&&p.createElement(I.Z,{closeModal:this.redirect,buttonCancelText:"Ok",showConfirmAction:!1,title:"Succes"},this.state.successMessage),this.state.errorMessage&&p.createElement(I.Z,{closeModal:this.redirect,buttonCancelText:"Ok",showConfirmAction:!1,title:"Waarschuwing"},p.createElement("h4",null,this.state.errorMessage)))}}]),E}(p.Component);const C=(0,k.$j)((function(e){return{reportPreview:e.projectParticipantReportPreview}}),(function(e){return{clearPreviewParticipantReport:function(){e((0,R.Uo)())}}}))(B)}}]);