(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{1641:function(e,a,t){"use strict";t.r(a);var n=t(24),r=t.n(n),l=t(25),o=t.n(l),c=t(22),s=t.n(c),i=t(26),u=t.n(i),m=t(27),p=t.n(m),d=t(16),f=t.n(d),g=t(6),v=t.n(g),b=t(0),h=t.n(b),y=t(708),N=t.n(y),E=t(4),C=t(693),O=t(694),x=t(695);function S(e){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,n=f()(e);if(a){var r=f()(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return p()(this,t)}}var k=function(e){u()(t,e);var a=S(t);function t(e){return r()(this,t),a.call(this,e)}return o()(t,[{key:"render",value:function(){return h.a.createElement("div",{className:"row"},h.a.createElement("div",{className:"col-sm-12"},h.a.createElement(C.a,null,h.a.createElement(O.a,{className:"panel-small"},h.a.createElement("div",{className:"col-md-4"},h.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},h.a.createElement(x.a,{iconName:"glyphicon-arrow-left",onClickAction:E.e.goBack}))),h.a.createElement("div",{className:"col-md-4"},h.a.createElement("h3",{className:"text-center table-title"},"Rapportage Energie Leverancier naar Excel")),h.a.createElement("div",{className:"col-md-4"})))))}}]),t}(b.Component),A=t(31),T=t(7),w=t.n(T),I=t(702),P=t(696),R=t(727),q=t(697);w.a.locale("nl");var z=Object(A.b)((function(e){return{energySuppliers:e.systemData.energySuppliers}}))((function(e){var a=e.excel,t=a.energySupplierId,n=a.documentName,r=[];return r.push({id:0,name:"** Alle energie leveranciers **"}),e.energySuppliers.map((function(e){r.push({id:e.id,name:e.name})})),h.a.createElement("form",{className:"form-horizontal col-md-12",onSubmit:e.handleSubmit},h.a.createElement("div",{className:"row"},h.a.createElement(I.a,{label:"Contacten van Energie Leverancier",name:"energySupplierId",options:r,emptyOption:!1,value:t,onChangeAction:e.handleInputChange,required:"required",error:e.errors.energySupplierId}),"Maak overzicht per leverancier voor alle leveranciers (bestand per leverancier) of een specifieke leverancier"),h.a.createElement("div",{className:"row"},h.a.createElement(q.a,{label:"Bestandsnaam",name:"documentName",value:n,onChangeAction:e.handleInputChange,required:"required",error:e.errors.documentName}),0==t?"(Bestandsnaam wordt aangevuld met afkorting leverancier en ingestelde bestandsformaat)":"(Bestandsnaam wordt aangevuld met ingestelde bestandsformaat bij leverancier)"),h.a.createElement(R.a,null,h.a.createElement("div",{className:"pull-right btn-group",role:"group"},h.a.createElement(P.a,{buttonClassName:"btn-default",buttonText:"Annuleren",onClickAction:e.switchToView}),h.a.createElement(P.a,{buttonText:"Opslaan",onClickAction:e.handleSubmit,type:"submit",value:"Submit"}))))})),B=t(66);function M(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function j(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?M(Object(t),!0).forEach((function(a){v()(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):M(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function L(e){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,n=f()(e);if(a){var r=f()(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return p()(this,t)}}var D=function(e){u()(t,e);var a=L(t);function t(e){var n;return r()(this,t),n=a.call(this,e),v()(s()(n),"handleInputChange",(function(e){var a=e.target,t="checkbox"===a.type?a.checked:a.value,r=a.name;n.setState(j(j({},n.state),{},{excel:j(j({},n.state.excel),{},v()({},r,t))}))})),v()(s()(n),"handleSubmit",(function(e){e.preventDefault();var a=n.state.excel,t={},r=!1;N.a.isEmpty(a.energySupplierId+"")&&(t.energySupplierId=!0,r=!0),N.a.isEmpty(a.documentName+"")&&(t.documentName=!0,r=!0),n.setState(j(j({},n.state),{},{errors:t})),!r&&B.a.createEnergySupplierExcel(a.revenueId,a.energySupplierId,a.documentName).then((function(e){E.f.push("/documenten")}))})),n.state={excel:{revenueId:e.params.revenueId,energySupplierId:0,documentName:""},errors:{energySupplierId:!1,documentName:!1}},n}return o()(t,[{key:"render",value:function(){return h.a.createElement("div",{className:"row"},h.a.createElement("div",{className:"col-md-9"},h.a.createElement("div",{className:"col-md-12"},h.a.createElement(k,null)),h.a.createElement("div",{className:"col-md-12"},h.a.createElement(C.a,null,h.a.createElement(O.a,null,h.a.createElement("div",{className:"col-md-12"},h.a.createElement(z,{excel:this.state.excel,errors:this.state.errors,handleInputChange:this.handleInputChange,handleSubmit:this.handleSubmit})))))),h.a.createElement("div",{className:"col-md-3"}))}}]),t}(b.Component);a.default=D},693:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(8),o=t.n(l),c=function(e){var a=e.children,t=e.className,n=e.onMouseEnter,l=e.onMouseLeave;return r.a.createElement("div",{className:"panel panel-default ".concat(t),onMouseEnter:n,onMouseLeave:l},a)};c.defaultProps={className:"",onMouseEnter:function(){},onMouseLeave:function(){}},c.propTypes={className:o.a.string,onMouseEnter:o.a.func,onMouseLeave:o.a.func},a.a=c},694:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(8),o=t.n(l),c=function(e){var a=e.className,t=e.children;return r.a.createElement("div",{className:"panel-body ".concat(a)},t)};c.defaultProps={className:""},c.propTypes={className:o.a.string},a.a=c},695:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(8),o=t.n(l),c=function(e){var a=e.buttonClassName,t=e.iconName,n=e.onClickAction,l=e.title,o=e.disabled;return r.a.createElement("button",{type:"button",className:"btn ".concat(a),onClick:n,disabled:o,title:l},r.a.createElement("span",{className:"glyphicon ".concat(t)}))};c.defaultProps={buttonClassName:"btn-success btn-sm",title:"",disabled:!1},c.propTypes={buttonClassName:o.a.string,iconName:o.a.string.isRequired,onClickAction:o.a.func,title:o.a.string,disabled:o.a.bool},a.a=c},696:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(8),o=t.n(l),c=function(e){var a=e.buttonClassName,t=e.buttonText,n=e.onClickAction,l=e.type,o=e.value,c=e.loading,s=e.loadText,i=e.disabled;return c?r.a.createElement("button",{type:l,className:"btn btn-sm btn-loading ".concat(a),value:o,disabled:c},r.a.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"})," ",s):r.a.createElement("button",{type:l,className:"btn btn-sm ".concat(a),onClick:n,value:o,disabled:i},t)};c.defaultProps={buttonClassName:"btn-success",type:"button",value:"",loading:!1,loadText:"Aan het laden",disabled:!1},c.propTypes={buttonClassName:o.a.string,buttonText:o.a.string.isRequired,onClickAction:o.a.func,type:o.a.string,value:o.a.string,loading:o.a.bool,loadText:o.a.string,disabled:o.a.bool},a.a=c},697:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(8),o=t.n(l),c=t(700),s=t(701),i=function(e){var a,t=e.label,n=e.type,l=e.className,o=e.size,i=e.id,u=e.placeholder,m=e.name,p=e.value,d=e.onClickAction,f=e.onChangeAction,g=e.onBlurAction,v=e.required,b=e.readOnly,h=e.maxLength,y=e.error,N=e.min,E=e.max,C=e.step,O=e.textToolTip,x=e.errorMessage,S=e.divSize,k=e.labelSize,A=e.divClassName,T=e.autoComplete,w=e.disabled;e.attribute;return r.a.createElement("div",{className:"form-group ".concat(S," ").concat(A)},!!t&&r.a.createElement("label",{htmlFor:i,className:"".concat(k," ").concat(v)},t),r.a.createElement("div",{className:"".concat(o)},r.a.createElement("input",{type:n,className:"form-control input-sm ".concat(l)+(y?"has-error":""),id:i,placeholder:u,name:m,value:p||"",onClick:d,onChange:f,onBlur:g,readOnly:b,maxLength:h,min:N,max:E,autoComplete:T,step:C,disabled:w,"data-item-id":null!==(a=e.itemId)&&void 0!==a?a:""}))," ",O&&r.a.createElement("div",{className:"col-sm-1"},r.a.createElement(c.a,{color:"blue",size:"15px","data-tip":O,"data-for":"tooltip-".concat(m)}),r.a.createElement(s.a,{id:"tooltip-".concat(m),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"})),y&&r.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},r.a.createElement("span",{className:"has-error-message"}," ",x)))};i.defaultProps={divClassName:"",className:"",size:"col-sm-6",divSize:"col-sm-6",labelSize:"col-sm-6",name:"",type:"text",value:"",required:"",readOnly:!1,maxLength:null,error:!1,min:"",max:"",step:"",textToolTip:"",errorMessage:"",autoComplete:"off",disabled:!1,onBlurAction:function(){},onClickAction:function(){},onChangeAction:function(){}},i.propTypes={label:o.a.oneOfType([o.a.string,o.a.object]),type:o.a.string,className:o.a.string,divClassName:o.a.string,size:o.a.string,divSize:o.a.string,labelSize:o.a.string,id:o.a.string,placeholder:o.a.string,name:o.a.string.isRequired,value:o.a.oneOfType([o.a.string,o.a.number]),onClickAction:o.a.func,onChangeAction:o.a.func,onBlurAction:o.a.func,required:o.a.string,readOnly:o.a.bool,maxLength:o.a.string,error:o.a.bool,min:o.a.string,max:o.a.string,step:o.a.string,textToolTip:o.a.string,errorMessage:o.a.string,autoComplete:o.a.string,disabled:o.a.bool},a.a=i},702:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(8),o=t.n(l),c=function(e){var a=e.label,t=e.className,n=e.size,l=e.id,o=e.name,c=e.value,s=e.options,i=e.onChangeAction,u=e.onBlurAction,m=e.required,p=e.error,d=e.errorMessage,f=e.optionValue,g=e.optionName,v=e.readOnly,b=e.placeholder,h=e.divClassName,y=e.emptyOption;return r.a.createElement("div",{className:"form-group ".concat(n," ").concat(h)},r.a.createElement("label",{htmlFor:l,className:"col-sm-6 ".concat(m)},a),r.a.createElement("div",{className:"col-sm-6"},r.a.createElement("select",{className:"form-control input-sm ".concat(t)+(p&&" has-error"),id:l,name:o,value:c||"",onChange:i,onBlur:u,readOnly:v},y&&r.a.createElement("option",{value:""},b),s.map((function(e){return r.a.createElement("option",{key:e[f],value:e[f]},e[g])})))),p&&r.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},r.a.createElement("span",{className:"has-error-message"}," ",d)))};c.defaultProps={divClassName:"",className:"",size:"col-sm-6",readOnly:!1,required:"",error:!1,errorMessage:"",value:"",optionValue:"id",optionName:"name",placeholder:"",emptyOption:!0},c.propTypes={label:o.a.string.isRequired,className:o.a.string,size:o.a.string,id:o.a.string,name:o.a.string.isRequired,options:o.a.array,value:o.a.oneOfType([o.a.string,o.a.number]),onChangeAction:o.a.func,onBlurAction:o.a.func,required:o.a.string,readOnly:o.a.bool,error:o.a.bool,errorMessage:o.a.string,emptyOption:o.a.bool,optionValue:o.a.string,optionName:o.a.string,placeholder:o.a.string},a.a=c},727:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(8),o=t.n(l),c=function(e){var a=e.className,t=e.children;return r.a.createElement("div",{className:"panel-footer ".concat(a)},t)};c.defaultProps={className:""},c.propTypes={className:o.a.string},a.a=c}}]);