(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{1595:function(e,t,n){"use strict";n.r(t);var a=n(18),r=n.n(a),o=n(19),c=n.n(o),i=n(20),l=n.n(i),s=n(21),u=n.n(s),d=n(14),h=n.n(d),f=n(0),p=n.n(f),m=n(16),v=n(235),E=n(837),y=n(12),g=n.n(y),b=n(5),k=n.n(b),N=n(3),T=n(7),S=n.n(T),_=n(141),C=n(104),O=n(33),D=n(38),I=n(816);function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(Object(n),!0).forEach((function(t){k()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function R(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=h()(e);if(t){var r=h()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return u()(this,n)}}S.a.locale("nl");var w=function(e){l()(n,e);var t=R(n);function n(e){var a;return r()(this,n),a=t.call(this,e),k()(g()(a),"handleInputChange",(function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,r=t.name;a.setState(P(P({},a.state),{},{housingFile:P(P({},a.state.housingFile),{},k()({},r,n))}))})),k()(g()(a),"handleSubmit",(function(e){e.preventDefault();var t=a.state.housingFile;_.a.newHousingFile(t).then((function(e){N.f.push("/woningdossier/".concat(e.data.id))}))})),a.state={housingFile:{contactId:e.contactId,addressId:e.addressId,buildingTypeId:"",buildYear:"",isHouseForSale:"",surface:"",roofTypeId:"",energyLabelId:"",floors:0,energyLabelStatusId:"",isMonument:!1}},a}return c()(n,[{key:"render",value:function(){var e=this.state.housingFile,t=e.addressId,n=e.buildingTypeId,a=e.buildYear,r=e.isHouseForSale,o=e.surface,c=e.roofTypeId,i=e.energyLabelId,l=e.floors,s=e.energyLabelStatusId,u=e.isMonument,d=this.props.contactDetails,h=d.addresses,f=void 0===h?[]:h,m=d.fullName;return p.a.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},p.a.createElement("div",{className:"row"},p.a.createElement(D.a,{label:"Contact",name:"fullName",value:m,onChange:function(){},readOnly:!0}),p.a.createElement("div",{className:"form-group col-sm-6"},p.a.createElement("label",{htmlFor:"addressId",className:"col-sm-6"},"Adres"),p.a.createElement("div",{className:"col-sm-6"},p.a.createElement("select",{className:"form-control input-sm",id:"addressId",name:"addressId",value:t,onChange:this.handleInputChange},f.map((function(e,t){var n=e.street+" "+e.number+(e.addition?"-"+e.addition:"");return p.a.createElement("option",{key:t,value:e.id},"".concat(n))})))))),p.a.createElement("div",{className:"row"},p.a.createElement(C.a,{label:"Woningtype",size:"col-sm-6",name:"buildingTypeId",value:n,options:this.props.buildingTypes,onChangeAction:this.handleInputChange}),p.a.createElement(D.a,{type:"number",label:"Bouwjaar",name:"buildYear",value:a,min:"1500",max:"3000",onChangeAction:this.handleInputChange})),p.a.createElement("div",{className:"row"},p.a.createElement(D.a,{type:"number",label:"Gebruiksoppervlakte",name:"surface",value:o,min:"0",onChangeAction:this.handleInputChange}),p.a.createElement(C.a,{label:"Daktype",size:"col-sm-6",name:"roofTypeId",value:c,options:this.props.roofTypes,onChangeAction:this.handleInputChange})),p.a.createElement("div",{className:"row"},p.a.createElement(C.a,{label:"Energielabel",size:"col-sm-6",name:"energyLabelId",value:i,options:this.props.energyLabels,onChangeAction:this.handleInputChange}),p.a.createElement(D.a,{type:"number",label:"Aantal bouwlagen",name:"floors",value:l,min:"0",onChangeAction:this.handleInputChange})),p.a.createElement("div",{className:"row"},p.a.createElement(C.a,{label:"Status energielabel",size:"col-sm-6",name:"energyLabelStatusId",value:s,options:this.props.energyLabelStatus,onChangeAction:this.handleInputChange}),p.a.createElement(I.a,{label:"Monument",name:"isMonument",value:u,onChangeAction:this.handleInputChange})),p.a.createElement("div",{className:"row"},p.a.createElement(I.a,{label:"Koophuis",name:"isHouseForSale",value:r,onChangeAction:this.handleInputChange})),p.a.createElement("div",{className:"panel-footer"},p.a.createElement("div",{className:"pull-right btn-group",role:"group"},p.a.createElement(O.a,{buttonText:"Opslaan",onClickAction:this.handleSubmit}))))}}]),n}(f.Component),L=Object(m.b)((function(e){return{buildingTypes:e.systemData.buildingTypes,roofTypes:e.systemData.roofTypes,energyLabels:e.systemData.energyLabels,energyLabelStatus:e.systemData.energyLabelStatus,contactDetails:e.contactDetails}}),null)(w),j=n(29),M=n(32),U=function(e){return p.a.createElement("div",null,p.a.createElement(j.a,null,p.a.createElement(M.a,null,p.a.createElement(L,{contactId:e.contactId,addressId:e.addressId}))))},F=n(49),x=function(e){return p.a.createElement("div",{className:"row"},p.a.createElement("div",{className:"col-md-4"},p.a.createElement("div",{className:"btn-group",role:"group"},p.a.createElement(F.a,{iconName:"glyphicon-arrow-left",onClickAction:N.e.goBack}))),p.a.createElement("div",{className:"col-md-4"},p.a.createElement("h4",{className:"text-center"},"Nieuw woningdossier")),p.a.createElement("div",{className:"col-md-4"}))};function B(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=h()(e);if(t){var r=h()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return u()(this,n)}}var X=function(e){l()(n,e);var t=B(n);function n(e){return r()(this,n),t.call(this,e)}return c()(n,[{key:"componentDidMount",value:function(){Object(v.isEmpty)(this.props.contactDetails)&&this.props.fetchContactDetails(this.props.params.contactId)}},{key:"render",value:function(){return p.a.createElement("div",{className:"row"},p.a.createElement("div",{className:"col-md-9"},p.a.createElement("div",{className:"col-md-12 margin-10-top"},p.a.createElement(x,{contactId:this.props.params.contactId})),p.a.createElement("div",{className:"col-md-12 margin-10-top"},p.a.createElement(U,{contactId:this.props.params.contactId,addressId:this.props.params.addressId}))),p.a.createElement("div",{className:"col-md-3"}))}}]),n}(f.Component);t.default=Object(m.b)((function(e){return{contactDetails:e.contactDetails}}),(function(e){return{fetchContactDetails:function(t){e(Object(E.h)(t))}}}))(X)},816:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(6),c=n.n(o),i=n(823),l=n.n(i),s=function(e){var t=e.label,n=e.size,a=e.id,o=e.name,c=e.value,i=e.onChangeAction,s=e.required,u=e.divSize,d=e.className,h=e.disabled;return r.a.createElement("div",{className:"form-group ".concat(u," ").concat(d)},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:a,className:"col-sm-6 ".concat(s)},t)),r.a.createElement("div",{className:"".concat(n)},r.a.createElement(l.a,{id:a,name:o,onChange:i,defaultChecked:c,disabled:h})))};s.defaultProps={className:"",size:"col-sm-6",divSize:"col-sm-6",required:"",disabled:!1,value:""},s.propTypes={label:c.a.string.isRequired,type:c.a.string,size:c.a.string,divSize:c.a.string,id:c.a.string,name:c.a.string.isRequired,value:c.a.bool,onChangeAction:c.a.func,required:c.a.string,disabled:c.a.bool},t.a=s},818:function(e,t,n){var a;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var o=typeof a;if("string"===o||"number"===o)e.push(a);else if(Array.isArray(a)&&a.length){var c=r.apply(null,a);c&&e.push(c)}else if("object"===o)for(var i in a)n.call(a,i)&&a[i]&&e.push(i)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},823:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(0),c=h(o),i=h(n(818)),l=h(n(6)),s=h(n(828)),u=h(n(829)),d=n(830);function h(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleClick=n.handleClick.bind(n),n.handleTouchStart=n.handleTouchStart.bind(n),n.handleTouchMove=n.handleTouchMove.bind(n),n.handleTouchEnd=n.handleTouchEnd.bind(n),n.handleFocus=n.handleFocus.bind(n),n.handleBlur=n.handleBlur.bind(n),n.previouslyChecked=!(!e.checked&&!e.defaultChecked),n.state={checked:!(!e.checked&&!e.defaultChecked),hasFocus:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidUpdate",value:function(e){e.checked!==this.props.checked&&this.setState({checked:!!this.props.checked})}},{key:"handleClick",value:function(e){if(!this.props.disabled){var t=this.input;if(e.target!==t&&!this.moved)return this.previouslyChecked=t.checked,e.preventDefault(),t.focus(),void t.click();var n=this.props.hasOwnProperty("checked")?this.props.checked:t.checked;this.setState({checked:n})}}},{key:"handleTouchStart",value:function(e){this.props.disabled||(this.startX=(0,d.pointerCoord)(e).x,this.activated=!0)}},{key:"handleTouchMove",value:function(e){if(this.activated&&(this.moved=!0,this.startX)){var t=(0,d.pointerCoord)(e).x;this.state.checked&&t+15<this.startX?(this.setState({checked:!1}),this.startX=t,this.activated=!0):t-15>this.startX&&(this.setState({checked:!0}),this.startX=t,this.activated=t<this.startX+5)}}},{key:"handleTouchEnd",value:function(e){if(this.moved){var t=this.input;if(e.preventDefault(),this.startX){var n=(0,d.pointerCoord)(e).x;!0===this.previouslyChecked&&this.startX+4>n?this.previouslyChecked!==this.state.checked&&(this.setState({checked:!1}),this.previouslyChecked=this.state.checked,t.click()):this.startX-4<n&&this.previouslyChecked!==this.state.checked&&(this.setState({checked:!0}),this.previouslyChecked=this.state.checked,t.click()),this.activated=!1,this.startX=null,this.moved=!1}}}},{key:"handleFocus",value:function(e){var t=this.props.onFocus;t&&t(e),this.setState({hasFocus:!0})}},{key:"handleBlur",value:function(e){var t=this.props.onBlur;t&&t(e),this.setState({hasFocus:!1})}},{key:"getIcon",value:function(e){var n=this.props.icons;return n?void 0===n[e]?t.defaultProps.icons[e]:n[e]:null}},{key:"render",value:function(){var e=this,t=this.props,n=t.className,r=(t.icons,function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(t,["className","icons"])),o=(0,i.default)("react-toggle",{"react-toggle--checked":this.state.checked,"react-toggle--focus":this.state.hasFocus,"react-toggle--disabled":this.props.disabled},n);return c.default.createElement("div",{className:o,onClick:this.handleClick,onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},c.default.createElement("div",{className:"react-toggle-track"},c.default.createElement("div",{className:"react-toggle-track-check"},this.getIcon("checked")),c.default.createElement("div",{className:"react-toggle-track-x"},this.getIcon("unchecked"))),c.default.createElement("div",{className:"react-toggle-thumb"}),c.default.createElement("input",a({},r,{ref:function(t){e.input=t},onFocus:this.handleFocus,onBlur:this.handleBlur,className:"react-toggle-screenreader-only",type:"checkbox"})))}}]),t}(o.PureComponent);t.default=f,f.displayName="Toggle",f.defaultProps={icons:{checked:c.default.createElement(s.default,null),unchecked:c.default.createElement(u.default,null)}},f.propTypes={checked:l.default.bool,disabled:l.default.bool,defaultChecked:l.default.bool,onChange:l.default.func,onFocus:l.default.func,onBlur:l.default.func,className:l.default.string,name:l.default.string,value:l.default.string,id:l.default.string,"aria-labelledby":l.default.string,"aria-label":l.default.string,icons:l.default.oneOfType([l.default.bool,l.default.shape({checked:l.default.node,unchecked:l.default.node})])}},828:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=n(0),o=(a=r)&&a.__esModule?a:{default:a};t.default=function(){return o.default.createElement("svg",{width:"14",height:"11",viewBox:"0 0 14 11"},o.default.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}))}},829:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=n(0),o=(a=r)&&a.__esModule?a:{default:a};t.default=function(){return o.default.createElement("svg",{width:"10",height:"10",viewBox:"0 0 10 10"},o.default.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"}))}},830:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pointerCoord=function(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var n=t[0];return{x:n.clientX,y:n.clientY}}var a=e.pageX;if(void 0!==a)return{x:a,y:e.pageY}}return{x:0,y:0}}},837:function(e,t,n){"use strict";n.d(t,"h",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"v",(function(){return o})),n.d(t,"u",(function(){return c})),n.d(t,"x",(function(){return i})),n.d(t,"g",(function(){return l})),n.d(t,"i",(function(){return s})),n.d(t,"q",(function(){return u})),n.d(t,"a",(function(){return d})),n.d(t,"l",(function(){return h})),n.d(t,"w",(function(){return f})),n.d(t,"f",(function(){return p})),n.d(t,"j",(function(){return m})),n.d(t,"s",(function(){return v})),n.d(t,"d",(function(){return E})),n.d(t,"k",(function(){return y})),n.d(t,"t",(function(){return g})),n.d(t,"e",(function(){return b})),n.d(t,"n",(function(){return k})),n.d(t,"p",(function(){return N})),n.d(t,"o",(function(){return T})),n.d(t,"m",(function(){return S})),n.d(t,"y",(function(){return _})),n.d(t,"b",(function(){return C})),n.d(t,"r",(function(){return O}));var a=function(e){return{type:"FETCH_CONTACT_DETAILS",payload:e}},r=function(e){return{type:"DELETE_CONTACT",id:e}},o=function(e){return{type:"UPDATE_PERSON",contactDetails:e}},c=function(e){return{type:"UPDATE_ORGANISATION",contactDetails:e}},i=function(e){return{type:"UPDATE_PORTAL_USER",portalUser:e}},l=function(e){return{type:"DELETE_PORTAL_USER",id:e}},s=function(e){return{type:"NEW_ADDRESS",address:e}},u=function(e){return{type:"UPDATE_ADDRESS",address:e}},d=function(e){return{type:"DELETE_ADDRESS",id:e}},h=function(e){return{type:"NEW_PHONE_NUMBER",phoneNumber:e}},f=function(e){return{type:"UPDATE_PHONE_NUMBER",phoneNumber:e}},p=function(e){return{type:"DELETE_PHONE_NUMBER",id:e}},m=function(e){return{type:"NEW_EMAIL_ADDRESS",emailAddress:e}},v=function(e){return{type:"UPDATE_EMAIL_ADDRESS",emailAddress:e}},E=function(e){return{type:"DELETE_EMAIL_ADDRESS",id:e}},y=function(e){return{type:"NEW_CONTACT_NOTE",note:e}},g=function(e){return{type:"UPDATE_CONTACT_NOTE",note:e}},b=function(e){return{type:"DELETE_CONTACT_NOTE",id:e}},k=function(){return{type:"UNSET_PRIMARY_ADDRESSES"}},N=function(){return{type:"UNSET_PRIMARY_PHONE_NUMBERS"}},T=function(){return{type:"UNSET_PRIMARY_EMAIL_ADDRESSES"}},S=function(e){return{type:"NEW_ADDRESS_ENERGY_SUPPLIER",addressEnergySupplier:e}},_=function(e){return{type:"UPDATE_ADDRESS_ENERGY_SUPPLIER",addressEnergySupplier:e}},C=function(e){return{type:"DELETE_ADDRESS_ENERGY_SUPPLIER",id:e}},O=function(e){return{type:"UPDATE_HOOM_ACCOUNT_ID",hoomAccountId:e}}}}]);