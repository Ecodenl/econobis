(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{1665:function(e,t,a){"use strict";a.r(t);var n=a(15),r=a.n(n),o=a(16),i=a.n(o),s=a(12),c=a.n(s),l=a(17),u=a.n(l),p=a(18),m=a.n(p),d=a(13),f=a.n(d),h=a(5),g=a.n(h),v=a(0),b=a.n(v),y=(a(158),a(4)),O=a(28),E=a(31),C=a(51);function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=f()(e);if(t){var r=f()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return m()(this,a)}}var w=function(e){u()(a,e);var t=j(a);function a(e){var n;return r()(this,a),(n=t.call(this,e)).state={showDelete:!1},n}return i()(a,[{key:"render",value:function(){return b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-sm-12"},b.a.createElement("div",{className:"col-md-4"},b.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},b.a.createElement(C.a,{iconName:"glyphicon-arrow-left",onClickAction:y.e.goBack}))),b.a.createElement("div",{className:"col-md-4"},b.a.createElement("h3",{className:"text-center margin-small"},"Nieuwe kans")),b.a.createElement("div",{className:"col-md-4"})))}}]),a}(v.Component),I=a(20),D=a(122),N=a(52),k=a(39),S=a(123),P=a(36),A=a(164),R=a(997),L=a(938),M=Object(I.b)((function(e){return{status:e.systemData.opportunityStatus,measures:e.systemData.measures,measureCategories:e.systemData.measureCategories}}))((function(e){var t=e.opportunity,a=t.statusId,n=t.quotationText,r=t.evaluationAgreedDate,o=t.desiredDate,i=t.measureCategoryId,s=(t.measureIds,t.measureIdsSelected),c=Object(R.a)(e.measures,i),l=e.measureCategories.find((function(e){return e.id==i}));return b.a.createElement("form",{className:"form-horizontal col-md-12",onSubmit:e.handleSubmit},b.a.createElement("div",{className:"row"},b.a.createElement(P.a,{label:"Contact",name:"contact",value:e.intake.contact?e.intake.contact.fullName:"",readOnly:!0}),b.a.createElement(P.a,{label:"Adres",name:"address",value:e.intake?e.intake.fullAddress:"",readOnly:!0})),b.a.createElement("div",{className:"row"},b.a.createElement(P.a,{label:"Maatregel - categorie",name:"measureCategory",value:l?l.name:"",readOnly:!0}),b.a.createElement(P.a,{label:"Campagne",name:"campaign",value:e.intake.campaign?e.intake.campaign.name:"",readOnly:!0})),b.a.createElement("div",{className:"row"},b.a.createElement(L.a,{label:"Maatregel - specifiek",name:"measureIds",options:c,value:s,onChangeAction:e.handleMeasureIds}),b.a.createElement(D.a,{label:"Status",size:"col-sm-6",name:"statusId",options:e.status.filter((function(e){return 1==e.active})),value:a,onChangeAction:e.handleInputChange,required:"required",error:e.errors.statusId})),b.a.createElement("div",{className:"row"},b.a.createElement(A.a,{label:"Toelichting op maatregel",name:"quotationText",value:n,onChangeAction:e.handleInputChange})),b.a.createElement("div",{className:"row"},b.a.createElement(N.a,{label:"Datum uitvoering",name:"desiredDate",value:o,onChangeAction:e.handleInputChangeDate,error:e.errors.desiredDate}),b.a.createElement(N.a,{label:"Datum evaluatie",name:"evaluationAgreedDate",value:r,onChangeAction:e.handleInputChangeDate})),b.a.createElement(S.a,null,b.a.createElement("div",{className:"pull-right btn-group",role:"group"},b.a.createElement(k.a,{buttonText:"Opslaan",onClickAction:e.handleSubmit,type:"submit",value:"Submit"}))))})),x=a(170),q=a(168),z=a(33),T=a.n(z);function V(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function B(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?V(Object(a),!0).forEach((function(t){g()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):V(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function _(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=f()(e);if(t){var r=f()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return m()(this,a)}}var W=function(e){u()(a,e);var t=_(a);function a(e){var n;return r()(this,a),n=t.call(this,e),g()(c()(n),"handleInputChange",(function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,r=t.name;n.setState(B(B({},n.state),{},{opportunity:B(B({},n.state.opportunity),{},g()({},r,a))}))})),g()(c()(n),"handleSubmit",(function(e){e.preventDefault();var t=n.state.opportunity,a={},r=!1;T.a.isEmpty(t.statusId)?(a.statusId=!0,r=!0):"Uitvoering"===n.state.status.find((function(e){return e.id==t.statusId})).name&&T.a.isEmpty(t.desiredDate)&&(a.desiredDate=!0,r=!0);n.setState(B(B({},n.state),{},{errors:a})),!r&&x.a.storeOpportunity(t).then((function(e){y.f.push("/kans/"+e.id)}))})),g()(c()(n),"handleMeasureIds",(function(e){var t=e?e.map((function(e){return e.id})).join(","):"";n.setState(B(B({},n.state),{},{opportunity:B(B({},n.state.opportunity),{},{measureIds:t,measureIdsSelected:e})}))})),n.state={measure:[],intake:[],status:e.status,opportunity:{intakeId:"",measureCategoryId:e.params.measureCategoryId,measureIds:"",measureIdsSelected:[],statusId:"1",quotationText:"",evaluationAgreedDate:"",desiredDate:""},errors:{statusId:!1,desiredDate:!1}},n.handleInputChangeDate=n.handleInputChangeDate.bind(c()(n)),n}return i()(a,[{key:"componentWillMount",value:function(){var e=this;q.a.fetchIntakeDetails(this.props.params.intakeId).then((function(t){e.setState(B(B({},e.state),{},{intake:t,opportunity:B(B({},e.state.opportunity),{},{intakeId:t.id})}))}))}},{key:"handleInputChangeDate",value:function(e,t){this.setState(B(B({},this.state),{},{opportunity:B(B({},this.state.opportunity),{},g()({},t,e))}))}},{key:"render",value:function(){return b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-md-9"},b.a.createElement("div",{className:"col-md-12"},b.a.createElement(O.a,null,b.a.createElement(E.a,{className:"panel-small"},b.a.createElement(w,null)))),b.a.createElement("div",{className:"col-md-12"},b.a.createElement(O.a,null,b.a.createElement(E.a,null,b.a.createElement(M,{handleInputChange:this.handleInputChange,handleInputChangeDate:this.handleInputChangeDate,handleMeasureIds:this.handleMeasureIds,intake:this.state.intake,measureCategoryId:this.state.measureCategoryId,opportunity:this.state.opportunity,handleSubmit:this.handleSubmit,errors:this.state.errors}))))),b.a.createElement("div",{className:"col-md-3"}))}}]),a}(v.Component);t.default=Object(I.b)((function(e){return{status:e.systemData.opportunityStatus}}))(W)},934:function(e,t,a){"use strict";a.d(t,"b",(function(){return O}));a(548);var n=a(24),r=(a(545),a(291)),o=a(47),i=a(56),s=a(55),c=(a(12),a(57)),l=a(64),u=a(45),p=a(0),m=a.n(p),d=(a(23),a(83),a(90),a(27)),f=a(124),h=(a(84),a(546),a(224),a(286));function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(l.a)(this,a)}}function v(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,a=String(e).toLowerCase(),n=String(t.value).toLowerCase(),r=String(t.label).toLowerCase();return n===a||r===a},y=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?v(Object(a),!0).forEach((function(t){Object(o.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):v(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({allowCreateWhileLoading:!1,createOptionPosition:"last"},{formatCreateLabel:function(e){return'Create "'.concat(e,'"')},isValidNewOption:function(e,t,a){return!(!e||t.some((function(t){return b(e,t)}))||a.some((function(t){return b(e,t)})))},getNewOptionData:function(e,t){return{label:t,value:e,__isNew__:!0}}}),O=function(e){var t,a;return a=t=function(t){Object(c.a)(o,t);var a=g(o);function o(e){var t;Object(i.a)(this,o),(t=a.call(this,e)).select=void 0,t.onChange=function(e,a){var n=t.props,o=n.getNewOptionData,i=n.inputValue,s=n.isMulti,c=n.onChange,l=n.onCreateOption,u=n.value,p=n.name;if("select-option"!==a.action)return c(e,a);var m=t.state.newOption,f=Array.isArray(e)?e:[e];if(f[f.length-1]!==m)c(e,a);else if(l)l(i);else{var h=o(i,i),g={action:"create-option",name:p};c(s?[].concat(Object(r.a)(Object(d.c)(u)),[h]):h,g)}};var n=e.options||[];return t.state={newOption:void 0,options:n},t}return Object(s.a)(o,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=e.allowCreateWhileLoading,a=e.createOptionPosition,n=e.formatCreateLabel,o=e.getNewOptionData,i=e.inputValue,s=e.isLoading,c=e.isValidNewOption,l=e.value,u=e.options||[],p=this.state.newOption;p=c(i,Object(d.c)(l),u)?o(i,n(i)):void 0,this.setState({newOption:p,options:!t&&s||!p?u:"first"===a?[p].concat(Object(r.a)(u)):[].concat(Object(r.a)(u),[p])})}},{key:"focus",value:function(){this.select.focus()}},{key:"blur",value:function(){this.select.blur()}},{key:"render",value:function(){var t=this,a=this.state.options;return m.a.createElement(e,Object(n.a)({},this.props,{ref:function(e){t.select=e},options:a,onChange:this.onChange}))}}]),o}(p.Component),t.defaultProps=y,a},E=O(f.a),C=Object(h.a)(E);t.a=C},938:function(e,t,a){"use strict";var n=a(5),r=a.n(n),o=a(0),i=a.n(o),s=a(3),c=a.n(s),l=a(934);function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var m=function(e){var t=e.label,a=e.size,n=e.id,r=e.name,o=e.value,s=e.options,c=e.optionId,u=e.optionName,m=e.onChangeAction,d=e.required,f=e.multi,h=e.error,g=e.errorMessage,v=e.isLoading,b=e.disabled,y=e.placeholder,O=e.clearable,E={option:function(e){return p(p({},e),{},{fontSize:"12px"})},singleValue:function(e){return p(p({},e),{},{fontSize:"12px"})},menu:function(e){return p(p({},e),{},{zIndex:20})}};return i.a.createElement("div",{className:"form-group col-sm-12"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-sm-3"},i.a.createElement("label",{htmlFor:n,className:"col-sm-12 ".concat(d)},t)),i.a.createElement("div",{className:"".concat(a)},i.a.createElement(l.a,{id:n,name:r,onChange:function(e){return m(e)},value:o,options:s,getOptionLabel:function(e){return e[u]},getOptionValue:function(e){return e[c]},placeholder:y,noOptionsMessage:function(){return"Geen opties gevonden"},loadingMessage:function(){return"Laden"},isMulti:f,simpleValue:!0,removeSelected:!0,className:h?" has-error":"",isLoading:v,isDisabled:b,styles:E,isClearable:O,theme:function(e){return p(p({},e),{},{colors:p({},e.colors),spacing:p(p({},e.spacing),{},{baseUnit:2,controlHeight:24,menuGutter:4})})}})),h&&i.a.createElement("div",{className:"col-sm-offset-3 col-sm-8"},i.a.createElement("span",{className:"has-error-message"}," ",g))))};m.defaultProps={allowCreate:!1,size:"col-sm-6",optionId:"id",optionName:"name",disabled:!1,required:"",error:!1,errorMessage:"",value:"",multi:!0,isLoading:!1,placeholder:"",clearable:!1},m.propTypes={label:c.a.string.isRequired,size:c.a.string,id:c.a.string,name:c.a.string.isRequired,options:c.a.array,optionId:c.a.string,optionName:c.a.string,value:c.a.oneOfType([c.a.string,c.a.number]),onChangeAction:c.a.func,onBlurAction:c.a.func,required:c.a.string,disabled:c.a.bool,error:c.a.bool,errorMessage:c.a.string,multi:c.a.bool,isLoading:c.a.bool,placeholder:c.a.string,clearable:c.a.bool},t.a=m},997:function(e,t,a){"use strict";t.a=function(e,t){return e.filter((function(e){return t?Number(e.measureCategoryId)===Number(t):e.measureCategoryId}))}}}]);