(window.webpackJsonp=window.webpackJsonp||[]).push([[139],{1638:function(e,t,a){"use strict";a.r(t);var n=a(18),r=a.n(n),o=a(19),i=a.n(o),s=a(12),l=a.n(s),c=a(20),u=a.n(c),m=a(21),f=a.n(m),h=a(14),p=a.n(h),g=a(6),d=a.n(g),E=a(0),v=a.n(E),y=a(30),C=a(33),w=a(11),R=function(){return w.a.get("jory/measure-category",{params:{jory:{fld:["id","name","usesWfCreateOpportunity","measureIdWfCreateOpportunity","opportunityStatusIdWfCreateOpportunity","usesWfCreateQuotationRequest","organisationIdWfCreateQuotationRequest","usesWfEmailQuotationRequest","emailTemplateIdWfCreateQuotationRequest"]}}})},k=a(16),N=a(48),b=Object(k.b)((function(e){return{permissions:e.meDetails.permissions}}),null)((function(e){var t=e.measureCategoriesCount,a=e.refreshMeasureCategoriesData;e.permissions;return v.a.createElement("div",{className:"row"},v.a.createElement("div",{className:"col-md-4"},v.a.createElement("div",{className:"btn-group",role:"group"},v.a.createElement(N.a,{iconName:"glyphicon-refresh",onClickAction:a}))),v.a.createElement("div",{className:"col-md-4"},v.a.createElement("h3",{className:"text-center table-title"},"Workflows op Maatregel categorieën")),v.a.createElement("div",{className:"col-md-4"},v.a.createElement("div",{className:"pull-right"},"Resultaten: ",t)))})),M=a(234),O=a.n(M),W=a(179),L=a(180),D=a(236),B=a(129),I=a(3);function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=p()(e);if(t){var r=p()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return f()(this,a)}}var j=function(e){u()(a,e);var t=S(a);function a(e){var n;return r()(this,a),(n=t.call(this,e)).state={showActionButtons:!1,highlightRow:""},n}return i()(a,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){I.f.push("/maatregel-categorie/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,a=t.id,n=t.name,r=t.usesWfCreateOpportunity,o=t.usesWfCreateQuotationRequest,i=t.usesWfEmailQuotationRequest,s=t.permissions;return v.a.createElement("tr",{className:this.state.highlightRow,onDoubleClick:s.manageFinancial?function(){return e.openItem(a)}:null,onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},v.a.createElement("td",null,n),v.a.createElement("td",null,r?"Ja":"Nee"),v.a.createElement("td",null,r?o?"Ja":"Nee":""),v.a.createElement("td",null,o?i?"Ja":"Nee":""),v.a.createElement("td",null,this.state.showActionButtons&&s.manageFinancial?v.a.createElement("a",{role:"button",onClick:function(){return e.openItem(a)}},v.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):""))}}]),a}(E.Component),q=Object(k.b)((function(e){return{permissions:e.meDetails.permissions}}))(j),F=function(e){var t=e.measureCategories,a=e.hasError,n=e.isLoading,r="",o=!0;return a?r="Fout bij het ophalen van maatregel categorieën.":n?r="Gegevens aan het laden.":0===t.length?r="Geen maatregel categorieën gevonden!":o=!1,v.a.createElement("div",null,v.a.createElement(W.a,null,v.a.createElement(L.a,null,v.a.createElement("tr",{className:"thead-title"},v.a.createElement(B.a,{title:"Omschrijving",width:"30%"}),v.a.createElement(B.a,{title:"Maak kans",width:"20%"}),v.a.createElement(B.a,{title:"Maak Offerteverzoek",width:"20%"}),v.a.createElement(B.a,{title:"Email Offerteverzoek",width:"20%"}),v.a.createElement(B.a,{title:"",width:"10%"}))),v.a.createElement(D.a,null,o?v.a.createElement("tr",null,v.a.createElement("td",{colSpan:5},r)):t.map((function(e){return v.a.createElement(q,O()({key:e.id},e))})))))};function Q(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=p()(e);if(t){var r=p()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return f()(this,a)}}var A=function(e){u()(a,e);var t=Q(a);function a(e){var n;return r()(this,a),n=t.call(this,e),d()(l()(n),"callFetchMeasureCategoriesData",(function(){n.setState({isLoading:!0,hasError:!1}),R().then((function(e){n.setState({isLoading:!1,measureCategories:e.data.data})})).catch((function(e){n.setState({isLoading:!1,hasError:!0})}))})),n.state={measureCategories:[],isLoading:!1,hasError:!1},n}return i()(a,[{key:"componentDidMount",value:function(){this.callFetchMeasureCategoriesData()}},{key:"render",value:function(){return v.a.createElement(y.a,null,v.a.createElement(C.a,null,v.a.createElement("div",{className:"col-md-12 margin-10-top"},v.a.createElement(b,{measureCategoriesCount:this.state.measureCategories?this.state.measureCategories.length:0,refreshMeasureCategoriesData:this.callFetchMeasureCategoriesData})),v.a.createElement("div",{className:"col-md-12 margin-10-top"},v.a.createElement(F,{measureCategories:this.state.measureCategories,isLoading:this.state.isLoading,hasError:this.state.hasError}))))}}]),a}(E.Component);t.default=A}}]);