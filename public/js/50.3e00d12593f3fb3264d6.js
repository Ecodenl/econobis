(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{1557:function(e,t,n){"use strict";n.r(t);var a=n(24),r=n.n(a),i=n(25),o=n.n(i),c=n(22),l=n.n(c),s=n(26),u=n.n(s),d=n(27),f=n.n(d),p=n(16),v=n.n(p),m=n(6),h=n.n(m),y=n(0),b=n.n(y),g=n(693),w=n(694),O=n(10),E=n.n(O),C=n(4);function N(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=v()(e);if(t){var r=v()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var k=function(e){u()(n,e);var t=N(n);function n(e){return r()(this,n),t.call(this,e)}return o()(n,[{key:"render",value:function(){var e=this;return b.a.createElement("nav",{className:"financialOverviewContacts-list open sticky"},b.a.createElement("div",{className:"send-financial-overview-contacts-sidebar-menu",style:{color:"$brand-primary"}},b.a.createElement(E.a,{highlightColor:"$brand-primary",highlightBgColor:"#e5e5e5",hoverBgColor:"#F1EFF0",defaultSelected:"financialOverviewContact"},this.props.financialOverviewContacts.length>0?this.props.financialOverviewContacts.map((function(t,n){return b.a.createElement(O.Nav,{onNavClick:function(){return e.props.changeFinancialOverviewContact(t.id)},key:n,id:"foc-".concat(t.id)},b.a.createElement(O.NavText,null,b.a.createElement(C.b,{className:"".concat("Geen e-mail bekend"===t.emailed_to?"send-financial-overview-contacts-list-link-error":"send-financial-overview-contacts-list-link")},t.contactNumber," -"," ",t.contactName)))})):b.a.createElement(O.Nav,{id:"financialOverviewContact"},b.a.createElement(O.NavText,null,this.props.isLoading?b.a.createElement(C.b,{className:"send-financial-overview-contacts-list-link"},"Gegevens aan het laden."):b.a.createElement(C.b,{className:"send-financial-overview-contacts-list-link"},"Geen waardestaten beschikbaar."))))))}}]),n}(y.Component),R=n(798),P=n(764);function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=v()(e);if(t){var r=v()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var T=function(e){u()(n,e);var t=j(n);function n(e){var a;return r()(this,n),(a=t.call(this,e)).state={file:null},a}return o()(n,[{key:"componentDidUpdate",value:function(e){this.props.financialOverviewContactId!==e.financialOverviewContactId&&this.props.financialOverviewContactId&&this.downloadFile(this.props.financialOverviewContactId)}},{key:"downloadFile",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;R.a.download(e).then((function(e){t.setState({file:e.data})})).catch((function(){n<2&&setTimeout((function(){t.downloadFile(e,n)}),500),n++}))}},{key:"render",value:function(){return this.props.isLoading?b.a.createElement("div",null,"Gegevens aan het laden."):this.state.file?b.a.createElement("div",null,b.a.createElement(P.a,{file:this.state.file})):this.props.amountOfFinancialOverviewContacts>0?b.a.createElement("div",null,"Selecteer links in het scherm een contact om een preview te zien."):b.a.createElement("div",null,"Geen gegevens gevonden.")}}]),n}(y.Component),D=(n(198),n(775));function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=v()(e);if(t){var r=v()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var I=function(e){u()(n,e);var t=S(n);function n(e){var a;return r()(this,n),(a=t.call(this,e)).state={email:null},a}return o()(n,[{key:"componentWillReceiveProps",value:function(e){this.props.financialOverviewContactId!==e.financialOverviewContactId&&e.financialOverviewContactId&&this.downloadEmail(e.financialOverviewContactId)}},{key:"downloadEmail",value:function(e){var t=this;R.a.getEmailPreview(e).then((function(e){t.setState({email:e.data})}))}},{key:"render",value:function(){return this.props.isLoading?b.a.createElement("div",null,"Gegevens aan het laden."):this.state.email?b.a.createElement("div",null,b.a.createElement("div",{className:"row margin-10-top"},b.a.createElement("div",{className:"col-sm-12"},b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-sm-3"},b.a.createElement("label",{className:"col-sm-12"},"Aan")),b.a.createElement("div",{className:"col-sm-9"},this.state.email.to)))),this.state.email.bcc?b.a.createElement("div",{className:"row margin-10-top"},b.a.createElement("div",{className:"col-sm-12"},b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-sm-3"},b.a.createElement("label",{className:"col-sm-12"},"Bcc")),b.a.createElement("div",{className:"col-sm-9"},this.state.email.bcc)))):null,b.a.createElement("div",{className:"row margin-10-top"},b.a.createElement("div",{className:"col-sm-12"},b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-sm-3"},b.a.createElement("label",{className:"col-sm-12"},"Onderwerp")),b.a.createElement("div",{className:"col-sm-9"},this.state.email.subject)))),b.a.createElement("div",{className:"row"},b.a.createElement(D.a,{label:"Tekst",value:this.state.email.htmlBody}))):this.props.amountOfFinancialOverviewContacts>0?b.a.createElement("div",null,"Selecteer links in het scherm een contact om een preview te zien."):b.a.createElement("div",null,"Geen gegevens gevonden.")}}]),n}(y.Component),F=n(695),M=n(101),x=n(741),_=n.n(x),A=n(201),B=n(31);function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){h()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function U(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=v()(e);if(t){var r=v()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var z=function(e){u()(n,e);var t=U(n);function n(e){var a;return r()(this,n),a=t.call(this,e),h()(l()(a),"confirmAction",(function(e){e.preventDefault(),a.setState({loading:!0}),R.a.sendAll(a.props.financialOverviewId,a.props.financialOverviewContactIds,null).then((function(e){e&&e.headers&&e.headers["x-filename"]&&_()(e.data,e.headers["x-filename"])})),C.f.push("/waardestaat/".concat(a.props.financialOverviewId))})),h()(l()(a),"handleInputChangeDate",(function(e,t){a.setState(q(q({},a.state),{},h()({},t,e)))})),a.state={loading:!1},a}return o()(n,[{key:"render",value:function(){return b.a.createElement(M.a,{closeModal:this.props.closeModal,confirmAction:this.confirmAction,title:"Waardestaten verzenden",buttonConfirmText:"Verzenden",loading:this.state.loading},b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-sm-12 margin-10-bottom"},b.a.createElement("span",null,"Wilt u alle geselecteerde definitieve waardestaten (",this.props.financialOverviewContactIds.length,") verzenden?"))))}}]),n}(y.Component),W=Object(B.b)(null,(function(e){return{setError:function(t,n){e(Object(A.b)(t,n))}}}))(z),G=n(696);n(712),n(708),n(7);function J(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?J(Object(n),!0).forEach((function(t){h()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):J(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function V(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=v()(e);if(t){var r=v()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var $=function(e){u()(n,e);var t=V(n);function n(e){var a;return r()(this,n),a=t.call(this,e),h()(l()(a),"confirmAction",(function(e){e.preventDefault(),a.setState({loading:!0}),R.a.sendAllPost(a.props.financialOverviewId,a.props.financialOverviewContactIds,null).then((function(e){e&&e.headers&&e.headers["x-filename"]&&_()(e.data,e.headers["x-filename"])})),C.f.push("/waardestaat/".concat(a.props.financialOverviewId))})),h()(l()(a),"handleInputChangeDate",(function(e,t){a.setState(Y(Y({},a.state),{},h()({},t,e)))})),a.state={loading:!1},a}return o()(n,[{key:"render",value:function(){return b.a.createElement(M.a,{closeModal:this.props.closeModal,confirmAction:this.confirmAction,title:"Waardestaten downloaden",buttonConfirmText:"Downloaden",loading:this.state.loading},b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-sm-12 margin-10-bottom"},b.a.createElement("span",null,"Wilt u alle geselecteerde definitieve waardestaten (",this.props.financialOverviewContactIds.length,") downloaden en doorzetten naar status verzonden?"))))}}]),n}(y.Component);function H(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=v()(e);if(t){var r=v()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var K=function(e){u()(n,e);var t=H(n);function n(e){var a;return r()(this,n),a=t.call(this,e),h()(l()(a),"showSend",(function(){a.setState({showSend:!a.state.showSend})})),a.state={showSend:!1},a}return o()(n,[{key:"render",value:function(){return b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-md-4"},b.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},b.a.createElement(F.a,{iconName:"glyphicon-arrow-left",onClickAction:C.e.goBack}),this.props.amountOfFinancialOverviewContacts>0&&"email"===this.props.type&&b.a.createElement(G.a,{buttonText:"Waardestaten e-mailen",onClickAction:this.showSend}),this.props.amountOfFinancialOverviewContacts>0&&"post"===this.props.type&&b.a.createElement(G.a,{buttonText:"Waardestaten downloaden",onClickAction:this.showSend}))),b.a.createElement("div",{className:"col-md-4"},b.a.createElement("h4",{className:"text-center"},"Te verzenden waardestaten versturen (",this.props.amountOfFinancialOverviewContacts,")")),b.a.createElement("div",{className:"col-md-4"}),this.state.showSend&&"email"===this.props.type&&b.a.createElement(W,{type:this.props.type,financialOverviewContactIds:this.props.selectedIds,closeModal:this.showSend,financialOverviewId:this.props.financialOverviewId}),this.state.showSend&&"post"===this.props.type&&b.a.createElement($,{type:this.props.type,financialOverviewContactIds:this.props.selectedIds,closeModal:this.showSend,financialOverviewId:this.props.financialOverviewId}))}}]),n}(y.Component);function Q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function X(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Q(Object(n),!0).forEach((function(t){h()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Z(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=v()(e);if(t){var r=v()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var ee=function(e){u()(n,e);var t=Z(n);function n(e){var a;return r()(this,n),a=t.call(this,e),h()(l()(a),"callGetFinancialOverviewContactsForSending",(function(){a.setState({isLoading:!0}),R.a.getFinancialOverviewContactsForSending(a.props.params.id,a.props.selectedIds,a.props.params.type).then((function(e){a.setState({financialOverviewContacts:e.data.data,isLoading:!1})})).catch((function(e){a.setState({isLoading:!1})}))})),h()(l()(a),"changeFinancialOverviewContact",(function(e){a.setState(X(X({},a.state),{},{financialOverviewContactId:e}))})),a.state={financialOverviewContacts:[],financialOverviewContactId:"",isLoading:!1},a}return o()(n,[{key:"componentDidMount",value:function(){this.callGetFinancialOverviewContactsForSending()}},{key:"render",value:function(){return b.a.createElement("div",null,b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement(g.a,null,b.a.createElement(w.a,{className:"panel-small"},b.a.createElement(K,{type:this.props.params.type,selectedIds:this.props.selectedIds,amountOfFinancialOverviewContacts:this.state.financialOverviewContacts?this.state.financialOverviewContacts.length:0,financialOverviewId:this.props.params.id})))))),b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-md-2"},b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement(g.a,null,b.a.createElement(w.a,{className:"panel-financial-overview-contacts-list"},b.a.createElement(k,{financialOverviewContacts:this.state.financialOverviewContacts,isLoading:this.state.isLoading,changeFinancialOverviewContact:this.changeFinancialOverviewContact}))))),"email"==this.props.params.type?b.a.createElement(b.a.Fragment,null,b.a.createElement("div",{className:"col-md-5"},b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement(g.a,null,b.a.createElement(w.a,null,b.a.createElement(T,{financialOverviewContactId:this.state.financialOverviewContactId,isLoading:this.state.isLoading,amountOfFinancialOverviewContacts:this.state.financialOverviewContacts?this.state.financialOverviewContacts.length:-1}))))),b.a.createElement("div",{className:"col-md-5"},b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement(g.a,null,b.a.createElement(w.a,null,b.a.createElement(I,{financialOverviewContactId:this.state.financialOverviewContactId,isLoading:this.state.isLoading,amountOfFinancialOverviewContacts:this.state.financialOverviewContacts?this.state.financialOverviewContacts.length:-1})))))):b.a.createElement(b.a.Fragment,null,b.a.createElement("div",{className:"col-md-6"},b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement(g.a,null,b.a.createElement(w.a,null,b.a.createElement(T,{financialOverviewContactId:this.state.financialOverviewContactId}))))))))}}]),n}(y.Component);t.default=Object(B.b)((function(e){return{selectedIds:e.financialOverviewPreview.selectedIds}}),null)(ee)},693:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(8),o=n.n(i),c=function(e){var t=e.children,n=e.className,a=e.onMouseEnter,i=e.onMouseLeave;return r.a.createElement("div",{className:"panel panel-default ".concat(n),onMouseEnter:a,onMouseLeave:i},t)};c.defaultProps={className:"",onMouseEnter:function(){},onMouseLeave:function(){}},c.propTypes={className:o.a.string,onMouseEnter:o.a.func,onMouseLeave:o.a.func},t.a=c},694:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(8),o=n.n(i),c=function(e){var t=e.className,n=e.children;return r.a.createElement("div",{className:"panel-body ".concat(t)},n)};c.defaultProps={className:""},c.propTypes={className:o.a.string},t.a=c},695:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(8),o=n.n(i),c=function(e){var t=e.buttonClassName,n=e.iconName,a=e.onClickAction,i=e.title,o=e.disabled;return r.a.createElement("button",{type:"button",className:"btn ".concat(t),onClick:a,disabled:o,title:i},r.a.createElement("span",{className:"glyphicon ".concat(n)}))};c.defaultProps={buttonClassName:"btn-success btn-sm",title:"",disabled:!1},c.propTypes={buttonClassName:o.a.string,iconName:o.a.string.isRequired,onClickAction:o.a.func,title:o.a.string,disabled:o.a.bool},t.a=c},696:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(8),o=n.n(i),c=function(e){var t=e.buttonClassName,n=e.buttonText,a=e.onClickAction,i=e.type,o=e.value,c=e.loading,l=e.loadText,s=e.disabled;return c?r.a.createElement("button",{type:i,className:"btn btn-sm btn-loading ".concat(t),value:o,disabled:c},r.a.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"})," ",l):r.a.createElement("button",{type:i,className:"btn btn-sm ".concat(t),onClick:a,value:o,disabled:s},n)};c.defaultProps={buttonClassName:"btn-success",type:"button",value:"",loading:!1,loadText:"Aan het laden",disabled:!1},c.propTypes={buttonClassName:o.a.string,buttonText:o.a.string.isRequired,onClickAction:o.a.func,type:o.a.string,value:o.a.string,loading:o.a.bool,loadText:o.a.string,disabled:o.a.bool},t.a=c},712:function(e,t,n){"use strict";var a=n(24),r=n.n(a),i=n(25),o=n.n(i),c=n(22),l=n.n(c),s=n(26),u=n.n(s),d=n(27),f=n.n(d),p=n(16),v=n.n(p),m=n(6),h=n.n(m),y=n(0),b=n.n(y),g=n(8),w=n.n(g),O=n(735),E=n.n(O),C=n(736),N=n.n(C),k=n(7),R=n.n(k),P=n(700),j=n(701);function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=v()(e);if(t){var r=v()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}R.a.locale("nl");var D=function(e){u()(n,e);var t=T(n);function n(e){var a;return r()(this,n),a=t.call(this,e),h()(l()(a),"validateDate",(function(e){var t=R()(e.target.value,"DD-MM-YYYY",!0),n=!1;t.isValid()||""===e.target.value||(n=!0),a.props.disabledBefore&&t.isBefore(a.props.disabledBefore)&&(n=!0),a.props.disabledAfter&&t.isAfter(a.props.disabledAfter)&&(n=!0),a.setState({errorDateFormat:n})})),h()(l()(a),"onDateChange",(function(e){var t=e?R()(e).format("Y-MM-DD"):"",n=!1;t&&a.props.disabledBefore&&R()(t).isBefore(a.props.disabledBefore)&&(n=!0),t&&a.props.disabledAfter&&R()(t).isAfter(a.props.disabledAfter)&&(n=!0),a.setState({errorDateFormat:n}),!n&&a.props.onChangeAction(t,a.props.name)})),a.state={errorDateFormat:!1},a}return o()(n,[{key:"render",value:function(){var e=this.props,t=e.label,n=e.className,a=e.size,r=e.divSize,i=e.id,o=e.value,c=e.required,l=e.readOnly,s=e.name,u=e.textToolTip,d=e.error,f=e.errorMessage,p=e.disabledBefore,v=e.disabledAfter,m=o?R()(o).format("L"):"",h={};return p&&(h.before=new Date(p)),v&&(h.after=new Date(v)),b.a.createElement("div",{className:"form-group ".concat(r)},b.a.createElement("div",null,b.a.createElement("label",{htmlFor:i,className:"col-sm-6 ".concat(c)},t)),b.a.createElement("div",{className:"".concat(a)},b.a.createElement(E.a,{id:i,value:m,formatDate:C.formatDate,parseDate:C.parseDate,onDayChange:this.onDateChange,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:N.a,disabledDays:h},inputProps:{className:"form-control input-sm ".concat(n)+(this.state.errorDateFormat||d?" has-error":""),name:s,onBlur:this.validateDate,autoComplete:"off",readOnly:l,disabled:l},required:c,readOnly:l,placeholder:""})),u&&b.a.createElement("div",{className:"col-sm-1"},b.a.createElement(P.a,{color:"blue",size:"15px","data-tip":u,"data-for":"tooltip-".concat(s)}),b.a.createElement(j.a,{id:"tooltip-".concat(s),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"})),d&&b.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},b.a.createElement("span",{className:"has-error-message"}," ",f)))}}]),n}(y.Component);D.defaultProps={className:"",size:"col-sm-6",divSize:"col-sm-6",required:"",readOnly:!1,value:null,name:"",textToolTip:"",error:!1,errorMessage:"",disabledBefore:null,disabledAfter:null},D.propTypes={label:w.a.string.isRequired,type:w.a.string,className:w.a.string,size:w.a.string,divSize:w.a.string,id:w.a.string,name:w.a.string,textToolTip:w.a.string,value:w.a.oneOfType([w.a.string,w.a.object]),onChangeAction:w.a.func,required:w.a.string,readOnly:w.a.bool,error:w.a.bool,errorMessage:w.a.string,disabledBefore:w.a.string,disabledAfter:w.a.string},t.a=D},741:function(e,t){e.exports=function(e,t,n,a){var r=new Blob(void 0!==a?[a,e]:[e],{type:n||"application/octet-stream"});if(void 0!==window.navigator.msSaveBlob)window.navigator.msSaveBlob(r,t);else{var i=window.URL&&window.URL.createObjectURL?window.URL.createObjectURL(r):window.webkitURL.createObjectURL(r),o=document.createElement("a");o.style.display="none",o.href=i,o.setAttribute("download",t),void 0===o.download&&o.setAttribute("target","_blank"),document.body.appendChild(o),o.click(),setTimeout((function(){document.body.removeChild(o),window.URL.revokeObjectURL(i)}),200)}}},764:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(8),o=n.n(i),c=n(801),l=n.n(c),s=function(e){var t=e.page,n=(e.pages,e.handlePrevClick);return 1===t?r.a.createElement("div",null):r.a.createElement("h3",{style:{cursor:"pointer",display:"inline-block",marginRight:24,marginTop:0},onClick:n},"<")};s.propTypes={page:o.a.number.isRequired,pages:o.a.number.isRequired,handlePrevClick:o.a.func.isRequired};var u=function(e){var t=e.page,n=e.pages,a=e.handleNextClick;return t===n?r.a.createElement("div",null):r.a.createElement("h3",{style:{cursor:"pointer",display:"inline-block",marginLeft:24,marginTop:0},onClick:a},">")};u.propTypes={page:o.a.number.isRequired,pages:o.a.number.isRequired,handleNextClick:o.a.func.isRequired};var d=function(e){var t=e.page,n=e.pages;return r.a.createElement("h3",{style:{display:"inline-block",marginTop:0}},"Pagina ",t," van ",n)};d.propTypes={page:o.a.number.isRequired,pages:o.a.number.isRequired};var f=function(e){var t=e.page,n=e.pages,a=e.handlePrevClick,i=e.handleNextClick;return r.a.createElement("div",{className:"customWrapper"},r.a.createElement(s,{page:t,pages:n,handlePrevClick:a}),r.a.createElement(d,{page:t,pages:n}),r.a.createElement(u,{page:t,pages:n,handleNextClick:i}))};f.propTypes={page:o.a.number.isRequired,pages:o.a.number.isRequired,handlePrevClick:o.a.func.isRequired,handleNextClick:o.a.func.isRequired};var p=f;l.a.defaultProps={file:"",scale:1},l.a.propTypes={file:o.a.string,scale:o.a.number};t.a=function(e){var t=e.file,n=e.scale;return r.a.createElement("div",{className:"panel-heading"},r.a.createElement(l.a,{document:{file:t},navigation:p,scale:n}))}},775:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(780),o=n.n(i),c=n(8),l=n.n(c),s=n(693),u=n(696),d=function(e){var t=e.label,n=e.className,a=e.id,i=e.value,c=e.switchToEdit;return r.a.createElement("div",{className:n},r.a.createElement("label",{htmlFor:a,className:"col-sm-3"},t,c?r.a.createElement("span",null,r.a.createElement("br",null),r.a.createElement(u.a,{buttonClassName:"btn-success btn-padding-small",buttonText:"Wijzig",onClickAction:c})):""),r.a.createElement(s.a,{className:"col-sm-9"},r.a.createElement(o.a,null,r.a.createElement("div",{id:a,dangerouslySetInnerHTML:{__html:i}}))))};d.defaultProps={className:"col-sm-12",value:""},d.propTypes={label:l.a.string.isRequired,className:l.a.string,id:l.a.string,value:l.a.oneOfType([l.a.string,l.a.number])},t.a=d},780:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=n(781),i=(a=r)&&a.__esModule?a:{default:a};t.default=i.default},781:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(0),o=u(i),c=u(n(102)),l=u(n(8)),s=u(n(782));function u(e){return e&&e.__esModule?e:{default:e}}var d,f="undefined"!=typeof window&&window.console,p=function(){},v=p,m=p;f&&(d=console.error,v=function(){console.error=function(e){/<head>/.test(e)||d.call(console,e)}},m=function(){return console.error=d});var h=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a._isMounted=!1,a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.renderFrameContents()}},{key:"componentDidUpdate",value:function(){this.renderFrameContents()}},{key:"componentWillUnmount",value:function(){this._isMounted=!1;var e=this.getDoc(),t=this.getMountTarget();e&&t&&c.default.unmountComponentAtNode(t)}},{key:"getDoc",value:function(){return c.default.findDOMNode(this).contentDocument}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(this._isMounted){var e=this.getDoc();if(e&&"complete"===e.readyState){null===e.querySelector("div")&&(this._setInitialContent=!1);var t=e.defaultView||e.parentView,n=!this._setInitialContent,a=o.default.createElement(s.default,{document:e,window:t},o.default.createElement("div",{className:"frame-content"},this.props.head,this.props.children));n&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close(),this._setInitialContent=!0),v();var r=n?this.props.contentDidMount:this.props.contentDidUpdate,i=this.getMountTarget();c.default.unstable_renderSubtreeIntoContainer(this,a,i,r),m()}else setTimeout(this.renderFrameContents.bind(this),0)}}},{key:"render",value:function(){var e=a({},this.props,{children:void 0});return delete e.head,delete e.initialContent,delete e.mountTarget,delete e.contentDidMount,delete e.contentDidUpdate,o.default.createElement("iframe",e)}}]),t}(i.Component);h.propTypes={style:l.default.object,head:l.default.node,initialContent:l.default.string,mountTarget:l.default.string,contentDidMount:l.default.func,contentDidUpdate:l.default.func,children:l.default.oneOfType([l.default.element,l.default.arrayOf(l.default.element)])},h.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=h},782:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),i=(o(r),o(n(8)));function o(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var s=function(e){function t(){return c(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"getChildContext",value:function(){return{document:this.props.document,window:this.props.window}}},{key:"render",value:function(){return r.Children.only(this.props.children)}}]),t}(r.Component);s.propTypes={document:i.default.object.isRequired,window:i.default.object.isRequired,children:i.default.element.isRequired},s.childContextTypes={document:i.default.object.isRequired,window:i.default.object.isRequired},t.default=s},798:function(e,t,n){"use strict";var a=n(11);n(2);t.a={fetchFinancialOverviewContacts:function(e,t,n,r,i,o){var c="".concat("financial-overview-contact","/grid");return a.a.get(c,{params:{financialOverviewId:JSON.stringify(r),onlyEmailFinancialOverviewContacts:JSON.stringify(i),onlyPostFinancialOverviewContacts:JSON.stringify(o),filters:JSON.stringify(e),sorts:JSON.stringify(t),limit:n.limit,offset:n.offset}})},fetchFinancialOverviewContactDetails:function(e){var t="".concat("financial-overview-contact","/").concat(e,"/get");return a.a.get(t)},getFinancialOverviewContactsForSending:function(e,t,n){var r="".concat("financial-overview-contact","/").concat(e,"/sending/").concat(n);return a.a.post(r,{ids:t})},sendAll:function(e,t){var n="".concat("financial-overview-contact","/").concat(e,"/send-all");document.body.style.cursor="wait";var r=a.a.post(n,{ids:t},{responseType:"blob"});return document.body.style.cursor="default",r},sendAllPost:function(e,t){var n="".concat("financial-overview-contact","/").concat(e,"/send-all-post");document.body.style.cursor="wait";var r=a.a.post(n,{ids:t},{responseType:"blob"});return document.body.style.cursor="default",r},download:function(e){var t="".concat("financial-overview-contact","/").concat(e,"/download");return a.a.get(t,{responseType:"blob"})},downloadPreview:function(e){var t="".concat("financial-overview-contact","/").concat(e,"}/download-preview");return a.a.get(t,{responseType:"blob"})},getEmailPreview:function(e){var t="".concat("financial-overview-contact","/").concat(e,"/email-preview");return a.a.get(t)}}},802:function(e,t){},803:function(e,t){},804:function(e,t){},805:function(e,t){},806:function(e,t){}}]);