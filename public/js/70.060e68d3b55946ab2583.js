(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{1660:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(24),l=a.n(r),s=a(25),i=a.n(s),c=a(22),u=a.n(c),d=a(26),p=a.n(d),f=a(27),m=a.n(f),h=a(16),g=a.n(h),v=a(6),y=a.n(v),b=a(31),k=a(14),N=a(4),E=a(708),C=a.n(E),O=a(7),S=a.n(O),T=a(697),x=a(696),P=a(694),w=a(693),j=a(961),L=a(199);a(702),a(718);function M(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function A(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?M(Object(a),!0).forEach((function(t){y()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):M(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function B(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=g()(e);if(t){var o=g()(this).constructor;a=Reflect.construct(n,arguments,o)}else a=n.apply(this,arguments);return m()(this,a)}}S.a.locale("nl");var _=function(e){p()(a,e);var t=B(a);function a(e){var n;return l()(this,a),n=t.call(this,e),y()(u()(n),"handleInputChange",(function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,o=t.name;n.setState(A(A({},n.state),{},{portalSettingsLayout:A(A({},n.state.portalSettingsLayout),{},y()({},o,a))}))})),y()(u()(n),"handleInputChangeDate",(function(e,t){n.setState(A(A({},n.state),{},{portalSettingsLayout:A(A({},n.state.portalSettingsLayout),{},y()({},t,e))}))})),y()(u()(n),"handleSubmit",(function(e){e.preventDefault();var t=n.state.portalSettingsLayout,a={},o=!1;C.a.isEmpty(t.description)&&(a.description=!0,o=!0),t.twinfieldPortalSettingsLayoutCode&&n.props.portalSettingsLayouts.map((function(e){e.twinfieldPortalSettingsLayoutCode==t.twinfieldPortalSettingsLayoutCode&&(o=!0,a.twinfieldPortalSettingsLayoutCode=!0)})),n.setState(A(A({},n.state),{},{errors:a})),!o&&j.a.newPortalSettingsLayout(t).then((function(e){n.props.fetchSystemData(),N.f.push("/portal-instellingen-layout/".concat(e.data.data.id))})).catch((function(e){alert("Er is iets mis gegaan met opslaan!")}))})),n.state={portalSettingsLayout:{description:""},errors:{description:!1}},n}return i()(a,[{key:"render",value:function(){var e=this.state.portalSettingsLayout.description;return o.a.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},o.a.createElement(w.a,null,o.a.createElement(P.a,null,o.a.createElement("div",{className:"row"},o.a.createElement(T.a,{label:"Omschrijving",name:"description",value:e,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.description}))),o.a.createElement(P.a,null,o.a.createElement("div",{className:"pull-right btn-group",role:"group"},o.a.createElement(x.a,{buttonText:"Opslaan",onClickAction:this.handleSubmit,type:"submit",value:"Submit"})))))}}]),a}(n.Component),F=Object(b.b)((function(e){return{portalSettingsLayouts:e.systemData.portalSettingsLayouts}}),(function(e){return Object(k.b)({fetchSystemData:L.a},e)}))(_),q=a(695),z=function(){return o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-4"},o.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},o.a.createElement(q.a,{iconName:"glyphicon-arrow-left",onClickAction:N.e.goBack}))),o.a.createElement("div",{className:"col-md-4"},o.a.createElement("h4",{className:"text-center margin-small"},"Nieuw portal instellingen layout")),o.a.createElement("div",{className:"col-md-4"}))};t.default=function(){return o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-9"},o.a.createElement("div",{className:"col-md-12 margin-10-top"},o.a.createElement(w.a,null,o.a.createElement(P.a,{className:"panel-small"},o.a.createElement(z,null)))),o.a.createElement("div",{className:"col-md-12 margin-10-top"},o.a.createElement(F,null))),o.a.createElement("div",{className:"col-md-3"}))}},693:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(8),l=a.n(r),s=function(e){var t=e.children,a=e.className,n=e.onMouseEnter,r=e.onMouseLeave;return o.a.createElement("div",{className:"panel panel-default ".concat(a),onMouseEnter:n,onMouseLeave:r},t)};s.defaultProps={className:"",onMouseEnter:function(){},onMouseLeave:function(){}},s.propTypes={className:l.a.string,onMouseEnter:l.a.func,onMouseLeave:l.a.func},t.a=s},694:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(8),l=a.n(r),s=function(e){var t=e.className,a=e.children;return o.a.createElement("div",{className:"panel-body ".concat(t)},a)};s.defaultProps={className:""},s.propTypes={className:l.a.string},t.a=s},695:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(8),l=a.n(r),s=function(e){var t=e.buttonClassName,a=e.iconName,n=e.onClickAction,r=e.title,l=e.disabled;return o.a.createElement("button",{type:"button",className:"btn ".concat(t),onClick:n,disabled:l,title:r},o.a.createElement("span",{className:"glyphicon ".concat(a)}))};s.defaultProps={buttonClassName:"btn-success btn-sm",title:"",disabled:!1},s.propTypes={buttonClassName:l.a.string,iconName:l.a.string.isRequired,onClickAction:l.a.func,title:l.a.string,disabled:l.a.bool},t.a=s},696:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(8),l=a.n(r),s=function(e){var t=e.buttonClassName,a=e.buttonText,n=e.onClickAction,r=e.type,l=e.value,s=e.loading,i=e.loadText,c=e.disabled;return s?o.a.createElement("button",{type:r,className:"btn btn-sm btn-loading ".concat(t),value:l,disabled:s},o.a.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"})," ",i):o.a.createElement("button",{type:r,className:"btn btn-sm ".concat(t),onClick:n,value:l,disabled:c},a)};s.defaultProps={buttonClassName:"btn-success",type:"button",value:"",loading:!1,loadText:"Aan het laden",disabled:!1},s.propTypes={buttonClassName:l.a.string,buttonText:l.a.string.isRequired,onClickAction:l.a.func,type:l.a.string,value:l.a.string,loading:l.a.bool,loadText:l.a.string,disabled:l.a.bool},t.a=s},697:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(8),l=a.n(r),s=a(700),i=a(701),c=function(e){var t,a=e.label,n=e.type,r=e.className,l=e.size,c=e.id,u=e.placeholder,d=e.name,p=e.value,f=e.onClickAction,m=e.onChangeAction,h=e.onBlurAction,g=e.required,v=e.readOnly,y=e.maxLength,b=e.error,k=e.min,N=e.max,E=e.step,C=e.textToolTip,O=e.errorMessage,S=e.divSize,T=e.divClassName,x=e.autoComplete,P=e.disabled;e.attribute;return o.a.createElement("div",{className:"form-group ".concat(S," ").concat(T)},!!a&&o.a.createElement("label",{htmlFor:c,className:"".concat(S," ").concat(g)},a),o.a.createElement("div",{className:"".concat(l)},o.a.createElement("input",{type:n,className:"form-control input-sm ".concat(r)+(b?"has-error":""),id:c,placeholder:u,name:d,value:p||"",onClick:f,onChange:m,onBlur:h,readOnly:v,maxLength:y,min:k,max:N,autoComplete:x,step:E,disabled:P,"data-item-id":null!==(t=e.itemId)&&void 0!==t?t:""}))," ",C&&o.a.createElement("div",{className:"col-sm-1"},o.a.createElement(s.a,{color:"blue",size:"15px","data-tip":C,"data-for":"tooltip-".concat(d)}),o.a.createElement(i.a,{id:"tooltip-".concat(d),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"})),b&&o.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},o.a.createElement("span",{className:"has-error-message"}," ",O)))};c.defaultProps={divClassName:"",className:"",size:"col-sm-6",divSize:"col-sm-6",name:"",type:"text",value:"",required:"",readOnly:!1,maxLength:null,error:!1,min:"",max:"",step:"",textToolTip:"",errorMessage:"",autoComplete:"off",disabled:!1,onBlurAction:function(){},onClickAction:function(){},onChangeAction:function(){}},c.propTypes={label:l.a.oneOfType([l.a.string,l.a.object]),type:l.a.string,className:l.a.string,divClassName:l.a.string,size:l.a.string,divSize:l.a.string,id:l.a.string,placeholder:l.a.string,name:l.a.string.isRequired,value:l.a.oneOfType([l.a.string,l.a.number]),onClickAction:l.a.func,onChangeAction:l.a.func,onBlurAction:l.a.func,required:l.a.string,readOnly:l.a.bool,maxLength:l.a.string,error:l.a.bool,min:l.a.string,max:l.a.string,step:l.a.string,textToolTip:l.a.string,errorMessage:l.a.string,autoComplete:l.a.string,disabled:l.a.bool},t.a=c},702:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(8),l=a.n(r),s=function(e){var t=e.label,a=e.className,n=e.size,r=e.id,l=e.name,s=e.value,i=e.options,c=e.onChangeAction,u=e.onBlurAction,d=e.required,p=e.error,f=e.errorMessage,m=e.optionValue,h=e.optionName,g=e.readOnly,v=e.placeholder,y=e.divClassName,b=e.emptyOption;return o.a.createElement("div",{className:"form-group ".concat(n," ").concat(y)},o.a.createElement("label",{htmlFor:r,className:"col-sm-6 ".concat(d)},t),o.a.createElement("div",{className:"col-sm-6"},o.a.createElement("select",{className:"form-control input-sm ".concat(a)+(p&&" has-error"),id:r,name:l,value:s||"",onChange:c,onBlur:u,readOnly:g},b&&o.a.createElement("option",{value:""},v),i.map((function(e){return o.a.createElement("option",{key:e[m],value:e[m]},e[h])})))),p&&o.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},o.a.createElement("span",{className:"has-error-message"}," ",f)))};s.defaultProps={divClassName:"",className:"",size:"col-sm-6",readOnly:!1,required:"",error:!1,errorMessage:"",value:"",optionValue:"id",optionName:"name",placeholder:"",emptyOption:!0},s.propTypes={label:l.a.string.isRequired,className:l.a.string,size:l.a.string,id:l.a.string,name:l.a.string.isRequired,options:l.a.array,value:l.a.oneOfType([l.a.string,l.a.number]),onChangeAction:l.a.func,onBlurAction:l.a.func,required:l.a.string,readOnly:l.a.bool,error:l.a.bool,errorMessage:l.a.string,emptyOption:l.a.bool,optionValue:l.a.string,optionName:l.a.string,placeholder:l.a.string},t.a=s},718:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(8),l=a.n(r),s=a(727),i=a.n(s),c=function(e){var t=e.label,a=e.size,n=e.id,r=e.name,l=e.value,s=e.onChangeAction,c=e.required,u=e.divSize,d=e.className,p=e.disabled,f=e.itemId;return o.a.createElement("div",{className:"form-group ".concat(u," ").concat(d)},o.a.createElement("div",null,o.a.createElement("label",{htmlFor:n,className:"col-sm-6 ".concat(c)},t)),o.a.createElement("div",{className:"".concat(a)},o.a.createElement(i.a,{id:n,name:r,onChange:s,defaultChecked:l,disabled:p,"data-item-id":null!=f?f:""})))};c.defaultProps={className:"",size:"col-sm-6",divSize:"col-sm-6",required:"",disabled:!1,value:""},c.propTypes={label:l.a.string.isRequired,type:l.a.string,size:l.a.string,divSize:l.a.string,id:l.a.string,name:l.a.string.isRequired,value:l.a.bool,onChangeAction:l.a.func,required:l.a.string,disabled:l.a.bool},t.a=c},719:function(e,t,a){var n;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=typeof n;if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var l=o.apply(null,n);l&&e.push(l)}else if("object"===r)for(var s in n)a.call(n,s)&&n[s]&&e.push(s)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},727:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},o=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(0),l=p(r),s=p(a(719)),i=p(a(8)),c=p(a(728)),u=p(a(729)),d=a(730);function p(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleClick=a.handleClick.bind(a),a.handleTouchStart=a.handleTouchStart.bind(a),a.handleTouchMove=a.handleTouchMove.bind(a),a.handleTouchEnd=a.handleTouchEnd.bind(a),a.handleFocus=a.handleFocus.bind(a),a.handleBlur=a.handleBlur.bind(a),a.previouslyChecked=!(!e.checked&&!e.defaultChecked),a.state={checked:!(!e.checked&&!e.defaultChecked),hasFocus:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidUpdate",value:function(e){e.checked!==this.props.checked&&this.setState({checked:!!this.props.checked})}},{key:"handleClick",value:function(e){if(!this.props.disabled){var t=this.input;if(e.target!==t&&!this.moved)return this.previouslyChecked=t.checked,e.preventDefault(),t.focus(),void t.click();var a=this.props.hasOwnProperty("checked")?this.props.checked:t.checked;this.setState({checked:a})}}},{key:"handleTouchStart",value:function(e){this.props.disabled||(this.startX=(0,d.pointerCoord)(e).x,this.activated=!0)}},{key:"handleTouchMove",value:function(e){if(this.activated&&(this.moved=!0,this.startX)){var t=(0,d.pointerCoord)(e).x;this.state.checked&&t+15<this.startX?(this.setState({checked:!1}),this.startX=t,this.activated=!0):t-15>this.startX&&(this.setState({checked:!0}),this.startX=t,this.activated=t<this.startX+5)}}},{key:"handleTouchEnd",value:function(e){if(this.moved){var t=this.input;if(e.preventDefault(),this.startX){var a=(0,d.pointerCoord)(e).x;!0===this.previouslyChecked&&this.startX+4>a?this.previouslyChecked!==this.state.checked&&(this.setState({checked:!1}),this.previouslyChecked=this.state.checked,t.click()):this.startX-4<a&&this.previouslyChecked!==this.state.checked&&(this.setState({checked:!0}),this.previouslyChecked=this.state.checked,t.click()),this.activated=!1,this.startX=null,this.moved=!1}}}},{key:"handleFocus",value:function(e){var t=this.props.onFocus;t&&t(e),this.setState({hasFocus:!0})}},{key:"handleBlur",value:function(e){var t=this.props.onBlur;t&&t(e),this.setState({hasFocus:!1})}},{key:"getIcon",value:function(e){var a=this.props.icons;return a?void 0===a[e]?t.defaultProps.icons[e]:a[e]:null}},{key:"render",value:function(){var e=this,t=this.props,a=t.className,o=(t.icons,function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(t,["className","icons"])),r=(0,s.default)("react-toggle",{"react-toggle--checked":this.state.checked,"react-toggle--focus":this.state.hasFocus,"react-toggle--disabled":this.props.disabled},a);return l.default.createElement("div",{className:r,onClick:this.handleClick,onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},l.default.createElement("div",{className:"react-toggle-track"},l.default.createElement("div",{className:"react-toggle-track-check"},this.getIcon("checked")),l.default.createElement("div",{className:"react-toggle-track-x"},this.getIcon("unchecked"))),l.default.createElement("div",{className:"react-toggle-thumb"}),l.default.createElement("input",n({},o,{ref:function(t){e.input=t},onFocus:this.handleFocus,onBlur:this.handleBlur,className:"react-toggle-screenreader-only",type:"checkbox"})))}}]),t}(r.PureComponent);t.default=f,f.displayName="Toggle",f.defaultProps={icons:{checked:l.default.createElement(c.default,null),unchecked:l.default.createElement(u.default,null)}},f.propTypes={checked:i.default.bool,disabled:i.default.bool,defaultChecked:i.default.bool,onChange:i.default.func,onFocus:i.default.func,onBlur:i.default.func,className:i.default.string,name:i.default.string,value:i.default.string,id:i.default.string,"aria-labelledby":i.default.string,"aria-label":i.default.string,icons:i.default.oneOfType([i.default.bool,i.default.shape({checked:i.default.node,unchecked:i.default.node})])}},728:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=a(0),r=(n=o)&&n.__esModule?n:{default:n};t.default=function(){return r.default.createElement("svg",{width:"14",height:"11",viewBox:"0 0 14 11"},r.default.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}))}},729:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=a(0),r=(n=o)&&n.__esModule?n:{default:n};t.default=function(){return r.default.createElement("svg",{width:"10",height:"10",viewBox:"0 0 10 10"},r.default.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"}))}},730:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pointerCoord=function(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var a=t[0];return{x:a.clientX,y:a.clientY}}var n=e.pageX;if(void 0!==n)return{x:n,y:e.pageY}}return{x:0,y:0}}},961:function(e,t,a){"use strict";var n=a(11);t.a={fetchPortalSettingsLayoutDetails:function(e){var t="jory/portal-settings-layout/".concat(e);return n.a.get(t,{params:{jory:{fld:["id","description","isDefault","portalLogoFileName","portalFaviconFileName","portalBackgroundColor","portalBackgroundTextColor","loginHeaderBackgroundColor","loginHeaderBackgroundTextColor","headerIconsColor","loginFieldBackgroundColor","loginFieldBackgroundTextColor","buttonColor","buttonTextColor"]}}})},newPortalSettingsLayout:function(e){return e.jory=JSON.stringify({fld:["id"]}),n.a.post("portal-settings-layout",e)},updatePortalSettingsLayout:function(e,t){var a="".concat("portal-settings-layout","/").concat(e);return n.a.post(a,t)},deletePortalSettingsLayout:function(e){var t="".concat("portal-settings-layout","/").concat(e,"/delete");return n.a.post(t)}}}}]);