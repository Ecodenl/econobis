(window.webpackJsonp=window.webpackJsonp||[]).push([[133],{1583:function(e,t,a){"use strict";a.r(t);var n=a(24),r=a.n(n),o=a(25),s=a.n(o),i=a(22),c=a.n(i),l=a(26),u=a.n(l),m=a(27),f=a.n(m),h=a(16),p=a.n(h),d=a(6),g=a.n(d),E=a(0),v=a.n(E),y=a(701),C=a(702),N=a(11),b=function(){return N.a.get("jory/measure-category",{params:{jory:{fld:["id","name","usesWfCreateOpportunity","measureIdWfCreateOpportunity","opportunityStatusIdWfCreateOpportunity","usesWfCreateQuotationRequest","organisationIdWfCreateQuotationRequest","usesWfEmailQuotationRequest","emailTemplateIdWfCreateQuotationRequest"]}}})},w=a(31),R=a(703),k=Object(w.b)((function(e){return{permissions:e.meDetails.permissions}}),null)((function(e){var t=e.measureCategoriesCount,a=e.refreshMeasureCategoriesData;e.permissions;return v.a.createElement("div",{className:"row"},v.a.createElement("div",{className:"col-md-4"},v.a.createElement("div",{className:"btn-group",role:"group"},v.a.createElement(R.a,{iconName:"glyphicon-refresh",onClickAction:a}))),v.a.createElement("div",{className:"col-md-4"},v.a.createElement("h3",{className:"text-center table-title"},"Workflows op Maatregel categorieën")),v.a.createElement("div",{className:"col-md-4"},v.a.createElement("div",{className:"pull-right"},"Resultaten: ",t)))})),M=a(199),L=a.n(M),O=a(149),W=a(150),D=a(201),B=a(104),q=a(4);function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=p()(e);if(t){var r=p()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return f()(this,a)}}var I=function(e){u()(a,e);var t=A(a);function a(e){var n;return r()(this,a),(n=t.call(this,e)).state={showActionButtons:!1,highlightRow:""},n}return s()(a,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){q.f.push("/maatregel-categorie/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,a=t.id,n=t.name,r=t.usesWfCreateOpportunity,o=t.usesWfCreateQuotationRequest,s=t.usesWfEmailQuotationRequest,i=t.permissions;return v.a.createElement("tr",{className:this.state.highlightRow,onDoubleClick:i.manageFinancial?function(){return e.openItem(a)}:null,onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},v.a.createElement("td",null,n),v.a.createElement("td",null,r?"Ja":"Nee"),v.a.createElement("td",null,r?o?"Ja":"Nee":""),v.a.createElement("td",null,o?s?"Ja":"Nee":""),v.a.createElement("td",null,this.state.showActionButtons&&i.manageFinancial?v.a.createElement("a",{role:"button",onClick:function(){return e.openItem(a)}},v.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):""))}}]),a}(E.Component),S=Object(w.b)((function(e){return{permissions:e.meDetails.permissions}}))(I),j=function(e){var t=e.measureCategories,a=e.hasError,n=e.isLoading,r="",o=!0;return a?r="Fout bij het ophalen van maatregel categorieën.":n?r="Gegevens aan het laden.":0===t.length?r="Geen maatregel categorieën gevonden!":o=!1,v.a.createElement("div",null,v.a.createElement(O.a,null,v.a.createElement(W.a,null,v.a.createElement("tr",{className:"thead-title"},v.a.createElement(B.a,{title:"Omschrijving",width:"30%"}),v.a.createElement(B.a,{title:"Maak kans",width:"20%"}),v.a.createElement(B.a,{title:"Maak Offerteverzoek",width:"20%"}),v.a.createElement(B.a,{title:"Email Offerteverzoek",width:"20%"}),v.a.createElement(B.a,{title:"",width:"10%"}))),v.a.createElement(D.a,null,o?v.a.createElement("tr",null,v.a.createElement("td",{colSpan:5},r)):t.map((function(e){return v.a.createElement(S,L()({key:e.id},e))})))))};function F(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=p()(e);if(t){var r=p()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return f()(this,a)}}var Q=function(e){u()(a,e);var t=F(a);function a(e){var n;return r()(this,a),n=t.call(this,e),g()(c()(n),"callFetchMeasureCategoriesData",(function(){n.setState({isLoading:!0,hasError:!1}),b().then((function(e){n.setState({isLoading:!1,measureCategories:e.data.data})})).catch((function(e){n.setState({isLoading:!1,hasError:!0})}))})),n.state={measureCategories:[],isLoading:!1,hasError:!1},n}return s()(a,[{key:"componentDidMount",value:function(){this.callFetchMeasureCategoriesData()}},{key:"render",value:function(){return v.a.createElement(y.a,null,v.a.createElement(C.a,null,v.a.createElement("div",{className:"col-md-12 margin-10-top"},v.a.createElement(k,{measureCategoriesCount:this.state.measureCategories?this.state.measureCategories.length:0,refreshMeasureCategoriesData:this.callFetchMeasureCategoriesData})),v.a.createElement("div",{className:"col-md-12 margin-10-top"},v.a.createElement(j,{measureCategories:this.state.measureCategories,isLoading:this.state.isLoading,hasError:this.state.hasError}))))}}]),a}(E.Component);t.default=Q},701:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),i=function(e){var t=e.children,a=e.className,n=e.onMouseEnter,o=e.onMouseLeave;return r.a.createElement("div",{className:"panel panel-default ".concat(a),onMouseEnter:n,onMouseLeave:o},t)};i.defaultProps={className:"",onMouseEnter:function(){},onMouseLeave:function(){}},i.propTypes={className:s.a.string,onMouseEnter:s.a.func,onMouseLeave:s.a.func},t.a=i},702:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),i=function(e){var t=e.className,a=e.children;return r.a.createElement("div",{className:"panel-body ".concat(t)},a)};i.defaultProps={className:""},i.propTypes={className:s.a.string},t.a=i},703:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),i=function(e){var t=e.buttonClassName,a=e.iconName,n=e.onClickAction,o=e.title,s=e.disabled;return r.a.createElement("button",{type:"button",className:"btn ".concat(t),onClick:n,disabled:s,title:o},r.a.createElement("span",{className:"glyphicon ".concat(a)}))};i.defaultProps={buttonClassName:"btn-success btn-sm",title:"",disabled:!1},i.propTypes={buttonClassName:s.a.string,iconName:s.a.string.isRequired,onClickAction:s.a.func,title:s.a.string,disabled:s.a.bool},t.a=i}}]);