(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1602:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(18),c=a.n(o),i=a(19),s=a.n(i),l=a(12),u=a.n(l),d=a(20),p=a.n(d),m=a(21),h=a.n(m),f=a(14),v=a.n(f),g=a(6),b=a.n(g),y=a(16),O=a(3),E=a(31),C=a.n(E),k=a(7),N=a.n(k),w=a(187),j=a(57),S=a(37),P=a(44),T=a(40),D=a(816),G=a(843),I=a(237),L=a(831),M=(a(23),a(33)),x=a(66);function R(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function _(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?R(Object(a),!0).forEach((function(t){b()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):R(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function z(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=v()(e);if(t){var r=v()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return h()(this,a)}}var A=function(e){p()(a,e);var t=z(a);function a(e){var n;return c()(this,a),n=t.call(this,e),b()(u()(n),"handleInputChange",(function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,r=t.name;n.setState(_(_({},n.state),{},{contactGroup:_(_({},n.state.contactGroup),{},b()({},r,a))}))})),b()(u()(n),"handleSubmit",(function(e){e.preventDefault();var t=n.state.contactGroup,a={},r=!1,o=!1;C.a.isEmpty(t.name)&&(a.name=!0,r=!0);var c=!1;n.state.contactGroups.map((function(e){return e.name==t.name&&(c=!0)})),c&&(o="Naam moet uniek zijn.",a.name=!0,r=!0),1==t.sendEmailNewContactLink&&(t.emailTemplateIdNewContactLink||(a.emailTemplateIdNewContactLink=!0,r=!0)),n.setState(_(_({},n.state),{},{errors:a,errorMessage:o})),!r&&j.a.newContactGroup(t).then((function(e){n.props.fetchSystemData(),O.f.push("/contact-groep/"+e.id)}))})),b()(u()(n),"handleChangeStartedDate",(function(e){var t=e?N()(e).format("Y-MM-DD"):"";n.setState(_(_({},n.state),{},{contactGroup:_(_({},n.state.contactGroup),{},{dateStarted:t})}))})),b()(u()(n),"handleChangeFinishedDate",(function(e){var t=e?N()(e).format("Y-MM-DD"):"";n.setState(_(_({},n.state),{},{contactGroup:_(_({},n.state.contactGroup),{},{dateFinished:t})}))})),b()(u()(n),"handleContactGroupIds",(function(e){var t=e?e.map((function(e){return e.id})).join(","):"";n.setState(_(_({},n.state),{},{contactGroup:_(_({},n.state.contactGroup),{},{contactGroupIds:t,contactGroupIdsSelected:e})}))})),b()(u()(n),"handleChangeComposedGroupType",(function(e){n.setState(_(_({},n.state),{},{contactGroup:_(_({},n.state.contactGroup),{},{contactGroupComposedType:e})}))})),n.state={contactsWithPermission:[],contactGroups:[],emailTemplates:[],contactGroup:{id:"",name:"",description:"",closed:!1,responsibleUserId:"",dateStarted:"",dateFinished:"",showContactForm:!1,showPortal:!1,editPortal:!1,contactGroupIds:"",contactGroupIdsSelected:[],contactGroupComposedType:"",sendEmailNewContactLink:!1,emailTemplateIdNewContactLink:""},errors:{name:!1,nameUnique:!1,emailTemplateIdNewContactLink:!1},peekLoading:{emailTemplates:!0}},n.handleReactSelectChange=n.handleReactSelectChange.bind(u()(n)),n}return s()(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.permissions;w.a.fetchUsersWithPermission(t.find((function(e){return"manage_group"===e.name})).id).then((function(t){e.setState({contactsWithPermission:t})})),j.a.peekContactGroups().then((function(t){e.setState({contactGroups:t})})),x.a.fetchEmailTemplatesPeek().then((function(t){return e.setState({emailTemplates:t,peekLoading:_(_({},e.state.peekLoading),{},{emailTemplates:!1})})}))}},{key:"handleReactSelectChange",value:function(e,t){this.setState(_(_({},this.state),{},{contactGroup:_(_({},this.state.contactGroup),{},b()({},t,e))}))}},{key:"render",value:function(){var e=this,t=this.state.contactGroup,a=t.name,n=t.description,o=t.responsibleUserId,c=t.closed,i=t.dateStarted,s=t.dateFinished,l=t.showPortal,u=t.editPortal,d=t.showContactForm,p=t.contactGroupIds,m=t.contactGroupIdsSelected,h=t.sendEmailNewContactLink,f=t.emailTemplateIdNewContactLink;return r.a.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},r.a.createElement("div",{className:"row"},r.a.createElement(S.a,{label:"Naam",name:"name",value:a,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.name})),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-sm-12"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-3"},r.a.createElement("label",{htmlFor:"description",className:"col-sm-12"},"Omschrijving")),r.a.createElement("div",{className:"col-sm-9"},r.a.createElement("textarea",{name:"description",value:n,onChange:this.handleInputChange,className:"form-control input-sm"}))))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-sm-6"},r.a.createElement("label",{htmlFor:"responsibleUserId",className:"col-sm-6"},"Verantwoordelijke"),r.a.createElement("div",{className:"col-sm-6"},r.a.createElement("select",{className:"form-control input-sm",id:"responsibleUserId",name:"responsibleUserId",value:o,onChange:this.handleInputChange},r.a.createElement("option",{value:""}),this.state.contactsWithPermission.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.fullName)}))))),r.a.createElement(D.a,{label:"Gesloten",name:"closed",value:c,onChangeAction:this.handleInputChange})),r.a.createElement("div",{className:"row"},r.a.createElement(P.a,{label:"Startdatum",size:"col-sm-6",name:"dateStarted",value:i,onChangeAction:this.handleChangeStartedDate}),r.a.createElement(P.a,{label:"Datum gereed",size:"col-sm-6",name:"dateFinished",value:s,onChangeAction:this.handleChangeFinishedDate})),r.a.createElement("div",{className:"row"},r.a.createElement(D.a,{label:"Zichtbaar op portaal",name:"showPortal",value:l,onChangeAction:this.handleInputChange}),r.a.createElement(D.a,{label:"Veranderen op portaal",name:"editPortal",value:u,onChangeAction:this.handleInputChange})),r.a.createElement("div",{className:"row"},r.a.createElement(D.a,{label:"Zichtbaar bij contact",name:"showContactForm",value:d,onChangeAction:this.handleInputChange})),r.a.createElement("div",{className:"row"},r.a.createElement(D.a,{label:"Verstuur e-mail bij nieuwe contactkoppeling",name:"sendEmailNewContactLink",value:h,onChangeAction:this.handleInputChange}),1==h&&r.a.createElement(L.a,{label:"Template email nieuwe contactkoppeling",divSize:"col-sm-6",name:"emailTemplateIdNewContactLink",options:this.state.emailTemplates,value:f,onChangeAction:this.handleReactSelectChange,isLoading:this.state.peekLoading.emailTemplates,required:h?"required":"",error:this.state.errors.emailTemplateIdNewContactLink})),r.a.createElement("div",{className:"row"},r.a.createElement(S.a,{label:"Gemaakt op",name:"createdAt",value:N()().format("DD-MM-Y"),readOnly:!0}),r.a.createElement(S.a,{label:"Gemaakt door",name:"createdBy",value:this.props.meDetails.fullName,readOnly:!0})),r.a.createElement("div",{className:"row"},r.a.createElement(G.a,{label:"Samengesteld uit",name:"contactGroupsIds",options:this.state.contactGroups,value:m,onChangeAction:this.handleContactGroupIds}),p&&r.a.createElement("div",{className:"col-xs-6"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-xs-6"},r.a.createElement("input",{onChange:function(){return e.handleChangeComposedGroupType("one")},type:"radio",name:"composedGroupType",value:"one",defaultChecked:!0}),"In één van de groepen"),r.a.createElement("div",{className:"col-xs-6"},r.a.createElement("input",{onChange:function(){return e.handleChangeComposedGroupType("all")},type:"radio",name:"composedGroupType",value:"all"}),"In alle groepen")))),this.state.errorMessage&&r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-10 col-md-offset-1 alert alert-danger"},this.state.errorMessage)),r.a.createElement("div",{className:"panel-footer"},r.a.createElement("div",{className:"pull-right btn-group",role:"group"},r.a.createElement(T.a,{buttonText:"Opslaan",onClickAction:this.handleSubmit}))))}}]),a}(n.Component),F=Object(y.b)((function(e){return{meDetails:e.meDetails,permissions:e.systemData.permissions}}),(function(e){return{fetchSystemData:function(){e(Object(I.a)())}}}))(A),q=a(48),B=a(30),V=function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12"},r.a.createElement(B.a,null,r.a.createElement(M.a,{className:"panel-small"},r.a.createElement("div",{className:"col-md-4"},r.a.createElement("div",{className:"btn-group",role:"group"},r.a.createElement(q.a,{iconName:"glyphicon-arrow-left",onClickAction:O.e.goBack}))),r.a.createElement("div",{className:"col-md-4"},r.a.createElement("h4",{className:"text-center"},"Nieuwe groep")),r.a.createElement("div",{className:"col-md-4"})))))};t.default=function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-9"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement(V,null)),r.a.createElement("div",{className:"col-md-12"},r.a.createElement(B.a,null,r.a.createElement(M.a,null,r.a.createElement("div",{className:"col-md-12"},r.a.createElement(F,null)))))),r.a.createElement("div",{className:"col-md-3"}))}},816:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(5),c=a.n(o),i=a(822),s=a.n(i),l=a(64),u=a(65),d=function(e){var t=e.label,a=e.size,n=e.id,o=e.name,c=e.value,i=e.onChangeAction,d=e.textToolTip,p=e.required,m=e.divSize,h=e.className,f=e.disabled;return r.a.createElement("div",{className:"form-group ".concat(m," ").concat(h)},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:n,className:"col-sm-6 ".concat(p)},t)),r.a.createElement("div",{className:"".concat(a)},r.a.createElement(s.a,{id:n,name:o,onChange:i,defaultChecked:c,disabled:f})),d&&r.a.createElement("div",{className:"col-sm-1"},r.a.createElement(l.c,{color:"blue",size:"15px","data-tip":d,"data-for":"tooltip-".concat(o)}),r.a.createElement(u.a,{id:"tooltip-".concat(o),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"})))};d.defaultProps={className:"",size:"col-sm-6",divSize:"col-sm-6",required:"",disabled:!1,value:!1,textToolTip:""},d.propTypes={label:c.a.string.isRequired,type:c.a.string,size:c.a.string,divSize:c.a.string,id:c.a.string,name:c.a.string.isRequired,textToolTip:c.a.string,value:c.a.bool,onChangeAction:c.a.func,required:c.a.string,disabled:c.a.bool},t.a=d},818:function(e,t,a){var n;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var c=r.apply(null,n);c&&e.push(c)}else if("object"===o)for(var i in n)a.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},822:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(0),c=p(o),i=p(a(818)),s=p(a(5)),l=p(a(828)),u=p(a(829)),d=a(830);function p(e){return e&&e.__esModule?e:{default:e}}var m=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleClick=a.handleClick.bind(a),a.handleTouchStart=a.handleTouchStart.bind(a),a.handleTouchMove=a.handleTouchMove.bind(a),a.handleTouchEnd=a.handleTouchEnd.bind(a),a.handleFocus=a.handleFocus.bind(a),a.handleBlur=a.handleBlur.bind(a),a.previouslyChecked=!(!e.checked&&!e.defaultChecked),a.state={checked:!(!e.checked&&!e.defaultChecked),hasFocus:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidUpdate",value:function(e){e.checked!==this.props.checked&&this.setState({checked:!!this.props.checked})}},{key:"handleClick",value:function(e){if(!this.props.disabled){var t=this.input;if(e.target!==t&&!this.moved)return this.previouslyChecked=t.checked,e.preventDefault(),t.focus(),void t.click();var a=this.props.hasOwnProperty("checked")?this.props.checked:t.checked;this.setState({checked:a})}}},{key:"handleTouchStart",value:function(e){this.props.disabled||(this.startX=(0,d.pointerCoord)(e).x,this.activated=!0)}},{key:"handleTouchMove",value:function(e){if(this.activated&&(this.moved=!0,this.startX)){var t=(0,d.pointerCoord)(e).x;this.state.checked&&t+15<this.startX?(this.setState({checked:!1}),this.startX=t,this.activated=!0):t-15>this.startX&&(this.setState({checked:!0}),this.startX=t,this.activated=t<this.startX+5)}}},{key:"handleTouchEnd",value:function(e){if(this.moved){var t=this.input;if(e.preventDefault(),this.startX){var a=(0,d.pointerCoord)(e).x;!0===this.previouslyChecked&&this.startX+4>a?this.previouslyChecked!==this.state.checked&&(this.setState({checked:!1}),this.previouslyChecked=this.state.checked,t.click()):this.startX-4<a&&this.previouslyChecked!==this.state.checked&&(this.setState({checked:!0}),this.previouslyChecked=this.state.checked,t.click()),this.activated=!1,this.startX=null,this.moved=!1}}}},{key:"handleFocus",value:function(e){var t=this.props.onFocus;t&&t(e),this.setState({hasFocus:!0})}},{key:"handleBlur",value:function(e){var t=this.props.onBlur;t&&t(e),this.setState({hasFocus:!1})}},{key:"getIcon",value:function(e){var a=this.props.icons;return a?void 0===a[e]?t.defaultProps.icons[e]:a[e]:null}},{key:"render",value:function(){var e=this,t=this.props,a=t.className,r=(t.icons,function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(t,["className","icons"])),o=(0,i.default)("react-toggle",{"react-toggle--checked":this.state.checked,"react-toggle--focus":this.state.hasFocus,"react-toggle--disabled":this.props.disabled},a);return c.default.createElement("div",{className:o,onClick:this.handleClick,onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},c.default.createElement("div",{className:"react-toggle-track"},c.default.createElement("div",{className:"react-toggle-track-check"},this.getIcon("checked")),c.default.createElement("div",{className:"react-toggle-track-x"},this.getIcon("unchecked"))),c.default.createElement("div",{className:"react-toggle-thumb"}),c.default.createElement("input",n({},r,{ref:function(t){e.input=t},onFocus:this.handleFocus,onBlur:this.handleBlur,className:"react-toggle-screenreader-only",type:"checkbox"})))}}]),t}(o.PureComponent);t.default=m,m.displayName="Toggle",m.defaultProps={icons:{checked:c.default.createElement(l.default,null),unchecked:c.default.createElement(u.default,null)}},m.propTypes={checked:s.default.bool,disabled:s.default.bool,defaultChecked:s.default.bool,onChange:s.default.func,onFocus:s.default.func,onBlur:s.default.func,className:s.default.string,name:s.default.string,value:s.default.string,id:s.default.string,"aria-labelledby":s.default.string,"aria-label":s.default.string,icons:s.default.oneOfType([s.default.bool,s.default.shape({checked:s.default.node,unchecked:s.default.node})])}},823:function(e,t,a){"use strict";a(836),a(234),a(815),a(13),a(6);var n=a(832),r=a(826),o=(a(12),a(835)),c=a(833),i=a(834),s=a(0),l=a.n(s),u=a(825),d=a(820),p=(a(128),a(83),a(814)),m=(a(821),a(819),a(824),a(827)),h=a(841);function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(i.a)(e);if(t){var r=Object(i.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(c.a)(this,a)}}s.Component;var v=Object(m.a)(p.a);t.a=v},828:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),o=(n=r)&&n.__esModule?n:{default:n};t.default=function(){return o.default.createElement("svg",{width:"14",height:"11",viewBox:"0 0 14 11"},o.default.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}))}},829:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),o=(n=r)&&n.__esModule?n:{default:n};t.default=function(){return o.default.createElement("svg",{width:"10",height:"10",viewBox:"0 0 10 10"},o.default.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"}))}},830:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pointerCoord=function(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var a=t[0];return{x:a.clientX,y:a.clientY}}var n=e.pageX;if(void 0!==n)return{x:n,y:e.pageY}}return{x:0,y:0}}},831:function(e,t,a){"use strict";var n=a(6),r=a.n(n),o=a(0),c=a.n(o),i=a(5),s=a.n(i),l=a(823);function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var p=function(e){var t=e.label,a=e.divSize,n=e.size,r=e.id,o=e.name,i=e.value,s=e.options,u=e.optionId,p=e.optionName,m=e.onChangeAction,h=e.required,f=e.error,v=e.errorMessage,g=e.isLoading,b=e.disabled,y=e.placeholder,O=e.clearable,E={option:function(e){return d(d({},e),{},{fontSize:"12px"})},singleValue:function(e){return d(d({},e),{},{fontSize:"12px"})},menu:function(e){return d(d({},e),{},{zIndex:20})}};return c.a.createElement("div",{className:"form-group ".concat(a)},c.a.createElement("label",{htmlFor:r,className:"col-sm-6 ".concat(h)},t),c.a.createElement("div",{className:"".concat(n)},c.a.createElement(l.a,{id:r,name:o,value:s&&i?s.find((function(e){return e[u]===i})):"",onChange:function(e){return m(e?e[u]:"",o)},options:s,getOptionLabel:function(e){return e[p]},getOptionValue:function(e){return e[u]},placeholder:y,noOptionsMessage:function(){return"Geen opties gevonden"},loadingMessage:function(){return"Laden"},isMulti:!1,simpleValue:!0,removeSelected:!0,className:f?" has-error":"",isLoading:g,isDisabled:b,styles:E,isClearable:O,theme:function(e){return d(d({},e),{},{colors:d({},e.colors),spacing:d(d({},e.spacing),{},{baseUnit:2,controlHeight:24,menuGutter:4})})}})),f&&c.a.createElement("div",{className:"col-sm-offset-3 col-sm-8"},c.a.createElement("span",{className:"has-error-message"}," ",v)))};p.defaultProps={size:"col-sm-6",divSize:"col-sm-6",optionId:"id",optionName:"name",disabled:!1,required:"",error:!1,errorMessage:"",value:"",isLoading:!1,placeholder:"",clearable:!1},p.propTypes={label:s.a.string.isRequired,size:s.a.string,divSize:s.a.string,id:s.a.string,name:s.a.string.isRequired,options:s.a.array,optionId:s.a.string,optionName:s.a.string,value:s.a.oneOfType([s.a.string,s.a.number]),onChangeAction:s.a.func,onBlurAction:s.a.func,required:s.a.string,disabled:s.a.bool,error:s.a.bool,errorMessage:s.a.string,isLoading:s.a.bool,placeholder:s.a.string,clearable:s.a.bool},t.a=p},840:function(e,t,a){"use strict";a.d(t,"b",(function(){return O}));a(836);var n=a(84),r=(a(815),a(855)),o=a(846),c=a(832),i=a(826),s=(a(12),a(835)),l=a(833),u=a(834),d=a(0),p=a.n(d),m=(a(820),a(128),a(83),a(817)),h=a(814),f=(a(821),a(819),a(824),a(827));function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(l.a)(this,a)}}function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,a=String(e).toLowerCase(),n=String(t.value).toLowerCase(),r=String(t.label).toLowerCase();return n===a||r===a},y=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(Object(a),!0).forEach((function(t){Object(o.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({allowCreateWhileLoading:!1,createOptionPosition:"last"},{formatCreateLabel:function(e){return'Create "'.concat(e,'"')},isValidNewOption:function(e,t,a){return!(!e||t.some((function(t){return b(e,t)}))||a.some((function(t){return b(e,t)})))},getNewOptionData:function(e,t){return{label:t,value:e,__isNew__:!0}}}),O=function(e){var t,a;return a=t=function(t){Object(s.a)(o,t);var a=v(o);function o(e){var t;Object(c.a)(this,o),(t=a.call(this,e)).select=void 0,t.onChange=function(e,a){var n=t.props,o=n.getNewOptionData,c=n.inputValue,i=n.isMulti,s=n.onChange,l=n.onCreateOption,u=n.value,d=n.name;if("select-option"!==a.action)return s(e,a);var p=t.state.newOption,h=Array.isArray(e)?e:[e];if(h[h.length-1]!==p)s(e,a);else if(l)l(c);else{var f=o(c,c),v={action:"create-option",name:d};s(i?[].concat(Object(r.a)(Object(m.c)(u)),[f]):f,v)}};var n=e.options||[];return t.state={newOption:void 0,options:n},t}return Object(i.a)(o,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=e.allowCreateWhileLoading,a=e.createOptionPosition,n=e.formatCreateLabel,o=e.getNewOptionData,c=e.inputValue,i=e.isLoading,s=e.isValidNewOption,l=e.value,u=e.options||[],d=this.state.newOption;d=s(c,Object(m.c)(l),u)?o(c,n(c)):void 0,this.setState({newOption:d,options:!t&&i||!d?u:"first"===a?[d].concat(Object(r.a)(u)):[].concat(Object(r.a)(u),[d])})}},{key:"focus",value:function(){this.select.focus()}},{key:"blur",value:function(){this.select.blur()}},{key:"render",value:function(){var t=this,a=this.state.options;return p.a.createElement(e,Object(n.a)({},this.props,{ref:function(e){t.select=e},options:a,onChange:this.onChange}))}}]),o}(d.Component),t.defaultProps=y,a},E=O(h.a),C=Object(f.a)(E);t.a=C},843:function(e,t,a){"use strict";var n=a(6),r=a.n(n),o=a(0),c=a.n(o),i=a(5),s=a.n(i),l=a(840);function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var p=function(e){var t=e.label,a=e.size,n=e.id,r=e.name,o=e.value,i=e.options,s=e.optionId,u=e.optionName,p=e.onChangeAction,m=e.required,h=e.multi,f=e.error,v=e.errorMessage,g=e.isLoading,b=e.disabled,y=e.placeholder,O=e.clearable,E={option:function(e){return d(d({},e),{},{fontSize:"12px"})},singleValue:function(e){return d(d({},e),{},{fontSize:"12px"})},menu:function(e){return d(d({},e),{},{zIndex:20})}};return c.a.createElement("div",{className:"form-group col-sm-12"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-3"},c.a.createElement("label",{htmlFor:n,className:"col-sm-12 ".concat(m)},t)),c.a.createElement("div",{className:"".concat(a)},c.a.createElement(l.a,{id:n,name:r,onChange:function(e){return p(e)},value:o,options:i,getOptionLabel:function(e){return e[u]},getOptionValue:function(e){return e[s]},placeholder:y,noOptionsMessage:function(){return"Geen opties gevonden"},loadingMessage:function(){return"Laden"},isMulti:h,simpleValue:!0,removeSelected:!0,className:f?" has-error":"",isLoading:g,isDisabled:b,styles:E,isClearable:O,theme:function(e){return d(d({},e),{},{colors:d({},e.colors),spacing:d(d({},e.spacing),{},{baseUnit:2,controlHeight:24,menuGutter:4})})}})),f&&c.a.createElement("div",{className:"col-sm-offset-3 col-sm-8"},c.a.createElement("span",{className:"has-error-message"}," ",v))))};p.defaultProps={allowCreate:!1,size:"col-sm-6",optionId:"id",optionName:"name",disabled:!1,required:"",error:!1,errorMessage:"",value:"",multi:!0,isLoading:!1,placeholder:"",clearable:!1},p.propTypes={label:s.a.string.isRequired,size:s.a.string,id:s.a.string,name:s.a.string.isRequired,options:s.a.array,optionId:s.a.string,optionName:s.a.string,value:s.a.oneOfType([s.a.string,s.a.number]),onChangeAction:s.a.func,onBlurAction:s.a.func,required:s.a.string,disabled:s.a.bool,error:s.a.bool,errorMessage:s.a.string,multi:s.a.bool,isLoading:s.a.bool,placeholder:s.a.string,clearable:s.a.bool},t.a=p}}]);