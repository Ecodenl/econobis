(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{1658:function(e,t,a){"use strict";a.r(t);var n=a(18),r=a.n(n),l=a(19),c=a.n(l),o=a(12),s=a.n(o),m=a(20),i=a.n(m),u=a(21),p=a.n(u),d=a(14),f=a.n(d),h=a(6),v=a.n(h),g=a(0),b=a.n(g),E=a(31),N=a.n(E),y=(a(235),a(3)),w=a(30),C=a(33),T=a(48);function O(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=f()(e);if(t){var r=f()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return p()(this,a)}}var k=function(e){i()(a,e);var t=O(a);function a(e){var n;return r()(this,a),(n=t.call(this,e)).state={showDelete:!1},n}return c()(a,[{key:"render",value:function(){return b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-sm-12"},b.a.createElement(w.a,null,b.a.createElement(C.a,{className:"panel-small"},b.a.createElement("div",{className:"col-md-4"},b.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},b.a.createElement(T.a,{iconName:"glyphicon-arrow-left",onClickAction:y.e.goBack}))),b.a.createElement("div",{className:"col-md-4"},b.a.createElement("h3",{className:"text-center table-title"},"Nieuwe e-mail template")),b.a.createElement("div",{className:"col-md-4"})))))}}]),a}(g.Component),j=(a(7),a(40)),x=a(103),S=a(902),R=function(e){var t=e.emailTemplate,a=t.name,n=t.subject,r=t.htmlBody;return b.a.createElement("form",{className:"form-horizontal col-md-12",onSubmit:e.handleSubmit},b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"form-group col-sm-12"},b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-sm-3"},b.a.createElement("label",{htmlFor:"name",className:"col-sm-12 required"},"Naam")),b.a.createElement("div",{className:"col-sm-8"},b.a.createElement("input",{name:"name",value:a,onChange:e.handleInputChange,className:"form-control input-sm "+(e.errors.name?"has-error":"")}))))),b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"form-group col-sm-12"},b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-sm-3"},b.a.createElement("label",{htmlFor:"subject",className:"col-sm-12"},"Standaard onderwerp")),b.a.createElement("div",{className:"col-sm-8"},b.a.createElement("input",{name:"subject",value:n,onChange:e.handleInputChange,className:"form-control input-sm"}))))),b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"form-group col-sm-12"},b.a.createElement("div",{className:"row"},b.a.createElement(S.a,{label:"Tekst",value:r,onChangeAction:e.handleTextChange})))),b.a.createElement(x.a,null,b.a.createElement("div",{className:"pull-right btn-group",role:"group"},b.a.createElement(j.a,{buttonText:"Opslaan",onClickAction:e.handleSubmit,type:"submit",value:"Submit"}))))},P=a(64);function B(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function D(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?B(Object(a),!0).forEach((function(t){v()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):B(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=f()(e);if(t){var r=f()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return p()(this,a)}}var I=function(e){i()(a,e);var t=A(a);function a(e){var n;return r()(this,a),n=t.call(this,e),v()(s()(n),"handleInputChange",(function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,r=t.name;n.setState(D(D({},n.state),{},{emailTemplate:D(D({},n.state.emailTemplate),{},v()({},r,a))}))})),v()(s()(n),"handleSubmit",(function(e){e.preventDefault();var t=n.state.emailTemplate,a={},r=!1;N.a.isEmpty(t.name)&&(a.name=!0,r=!0),n.setState(D(D({},n.state),{},{errors:a})),!r&&P.a.storeEmailTemplate(t).then((function(e){y.f.push("/email-template/".concat(e.id))}))})),n.state={emailTemplate:{name:"",subject:"",htmlBody:""},errors:{name:!1,hasErrors:!1}},n.handleTextChange=n.handleTextChange.bind(s()(n)),n}return c()(a,[{key:"handleTextChange",value:function(e){this.setState(D(D({},this.state),{},{emailTemplate:D(D({},this.state.emailTemplate),{},{htmlBody:e.target.getContent({format:"raw"})})}))}},{key:"render",value:function(){return b.a.createElement("div",null,b.a.createElement("div",{className:"panel panel-default"},b.a.createElement("div",{className:"panel-body"},b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement(k,null)),b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement(R,{emailTemplate:this.state.emailTemplate,errors:this.state.errors,handleInputChange:this.handleInputChange,handleTextChange:this.handleTextChange,handleSubmit:this.handleSubmit})))))}}]),a}(g.Component);t.default=I},902:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(5),c=a.n(l),o=(a(935),a(936),a(937),a(938),a(939),a(940),a(941),a(942),a(943),a(944),a(945),a(946),a(961)),s=function(e){var t=e.label,a=e.value,n=e.onChangeAction;return r.a.createElement("div",null,r.a.createElement("div",{className:"col-sm-3"},r.a.createElement("label",{htmlFor:"quotationText",className:"col-sm-12"},t)),r.a.createElement("div",{className:"col-sm-9"},r.a.createElement(o.a,{initialValue:a,init:{skin:!1,content_css:!1,branding:!1,language:"nl",menubar:!1,plugins:"paste lists advlist link image code table pagebreak",toolbar:"undo redo | formatselect fontselect | bold italic forecolor | alignleft aligncenter alignright | pagebreak | bullist numlist outdent indent | table | link image | code",contextmenu:!1,height:"300",browser_spellcheck:!0,font_formats:"Courier New=courier new;Tahoma=tahoma;Times New Roman=times new roman;Verdana=verdana;"},onChange:n})))};s.defaultProps={value:"",errorMessage:""},s.propTypes={label:c.a.string.isRequired,type:c.a.string,id:c.a.string,placeholder:c.a.string,value:c.a.string,onChangeAction:c.a.func},t.a=s}}]);