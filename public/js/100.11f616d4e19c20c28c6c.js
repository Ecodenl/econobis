(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{1037:function(e,t,n){"use strict";var r=n(2);t.a={fetchCostCenterDetails:function(e){var t="jory/cost-center/".concat(e);return r.a.get(t,{params:{jory:{fld:["id","description","twinfieldCostCenterCode"]}}})},newCostCenter:function(e){return e.jory=JSON.stringify({fld:["id"]}),r.a.post("cost-center",e)},updateCostCenter:function(e){var t="".concat("cost-center","/").concat(e.id);return r.a.post(t,e)},deleteCostCenter:function(e){var t="".concat("cost-center","/").concat(e,"/delete");return r.a.post(t)}}},1629:function(e,t,n){"use strict";n.r(t);var r=n(14),o=n.n(r),a=n(15),s=n.n(a),c=n(9),i=n.n(c),l=n(16),u=n.n(l),f=n(17),h=n.n(f),p=n(12),m=n.n(p),d=n(5),C=n.n(d),v=n(0),y=n.n(v),g=n(143),E=n.n(g),w=n(223),b=n(224),R=n(285),D=n(162),O=n(4),j=n(19);function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m()(e);if(t){var o=m()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h()(this,n)}}var I=function(e){u()(n,e);var t=k(n);function n(e){var r;return o()(this,n),(r=t.call(this,e)).state={showActionButtons:!1,highlightRow:""},r}return s()(n,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){O.f.push("/kostenplaats/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,r=t.description,o=t.twinfieldCostCenterCode,a=t.permissions;return y.a.createElement("tr",{className:this.state.highlightRow,onDoubleClick:a.manageFinancial?function(){return e.openItem(n)}:null,onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},y.a.createElement("td",null,r),y.a.createElement("td",null,o),y.a.createElement("td",null,this.state.showActionButtons&&a.manageFinancial?y.a.createElement("a",{role:"button",onClick:function(){return e.openItem(n)}},y.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):"",this.state.showActionButtons&&a.manageFinancial?y.a.createElement("a",{role:"button",onClick:this.props.showDeleteItemModal.bind(this,n,r)},y.a.createElement("span",{className:"glyphicon glyphicon-trash mybtn-danger"})," "):""))}}]),n}(v.Component),N=Object(j.b)((function(e){return{permissions:e.meDetails.permissions}}))(I),B=n(35),M=function(e){var t=e.deleteCostCenter,n=e.closeDeleteItemModal,r=e.description,o=e.id;return y.a.createElement(B.a,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:n,confirmAction:function(){return t(o),void n()},title:"Verwijderen"},"Verwijder kostenplaats: ",y.a.createElement("strong",null,r),"?")},P=n(3);function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function L(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){C()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m()(e);if(t){var o=m()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h()(this,n)}}var F=function(e){u()(n,e);var t=A(n);function n(e){var r;return o()(this,n),r=t.call(this,e),C()(i()(r),"showDeleteItemModal",(function(e,t){r.setState(L(L({},r.state),{},{showDeleteItem:!0,deleteItem:L(L({},r.state.deleteItem),{},{id:e,description:t})}))})),C()(i()(r),"closeDeleteItemModal",(function(){r.setState(L(L({},r.state),{},{showDeleteItem:!1,deleteItem:L(L({},r.state.deleteItem),{},{id:"",description:""})}))})),r.state={showDeleteItem:!1,deleteItem:{id:"",description:""}},r}return s()(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.costCenters,r=t.hasError,o=t.isLoading,a="",s=!0;return r?a="Fout bij het ophalen van kostenplaatsen.":o?a="Gegevens aan het laden.":0===n.length?a="Geen kostenplaatsen gevonden!":s=!1,y.a.createElement("div",null,y.a.createElement(w.a,null,y.a.createElement(b.a,null,y.a.createElement("tr",{className:"thead-title"},y.a.createElement(D.a,{title:"Omschrijving",width:"60%"}),y.a.createElement(D.a,{title:"Nummer",width:"30%"}),y.a.createElement(D.a,{title:"",width:"10%"}))),y.a.createElement(R.a,null,s?y.a.createElement("tr",null,y.a.createElement("td",{colSpan:5},a)):n.map((function(t){return y.a.createElement(N,E()({key:t.id,showDeleteItemModal:e.showDeleteItemModal},t))})))),this.state.showDeleteItem&&y.a.createElement(M,E()({closeDeleteItemModal:this.closeDeleteItemModal},this.state.deleteItem,{deleteCostCenter:this.props.deleteCostCenter})))}}]),n}(v.Component);F.propTypes={costCenters:P.any,hasError:P.any,isLoading:P.any};var x=F,J=n(50);function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m()(e);if(t){var o=m()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h()(this,n)}}var V=function(e){u()(n,e);var t=T(n);function n(){return o()(this,n),t.apply(this,arguments)}return s()(n,[{key:"render",value:function(){var e=this.props,t=e.costCentersCount,n=e.refreshCostCentersData,r=e.permissions;return y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-md-4"},y.a.createElement("div",{className:"btn-group",role:"group"},y.a.createElement(J.a,{iconName:"glyphicon-refresh",onClickAction:n}),r.manageFinancial&&y.a.createElement(J.a,{iconName:"glyphicon-plus",onClickAction:function(){O.f.push("/kostenplaats/nieuw")}}))),y.a.createElement("div",{className:"col-md-4"},y.a.createElement("h3",{className:"text-center table-title"},"Kostenplaatsen")),y.a.createElement("div",{className:"col-md-4"},y.a.createElement("div",{className:"pull-right"},"Resultaten: ",t)))}}]),n}(v.Component);V.propTypes={costCentersCount:P.any,refreshCostCentersData:P.any,permissions:P.any};var G=Object(j.b)((function(e){return{permissions:e.meDetails.permissions}}),null)(V),K=n(27),q=n(30),z=n(2),H=function(){return z.a.get("jory/cost-center",{params:{jory:{fld:["id","description","twinfieldCostCenterCode"]}}})},Q=n(1037),U=n(91);function W(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m()(e);if(t){var o=m()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h()(this,n)}}var X=function(e){u()(n,e);var t=W(n);function n(e){var r;return o()(this,n),r=t.call(this,e),C()(i()(r),"callFetchCostCentersData",(function(){r.setState({isLoading:!0,hasError:!1}),H().then((function(e){r.setState({isLoading:!1,costCenters:e.data.data})})).catch((function(e){r.setState({isLoading:!1,hasError:!0})}))})),C()(i()(r),"deleteCostCenter",(function(e){Q.a.deleteCostCenter(e).then((function(t){r.setState({costCenters:r.state.costCenters.filter((function(t){return t.id!==e}))})})).catch((function(e){r.props.setError(e.response.status,e.response.data.message)}))})),r.state={costCenters:[],isLoading:!1,hasError:!1},r}return s()(n,[{key:"componentDidMount",value:function(){this.callFetchCostCentersData()}},{key:"render",value:function(){return y.a.createElement(K.a,null,y.a.createElement(q.a,null,y.a.createElement("div",{className:"col-md-12 margin-10-top"},y.a.createElement(G,{costCentersCount:this.state.costCenters?this.state.costCenters.length:0,refreshCostCentersData:this.callFetchCostCentersData})),y.a.createElement("div",{className:"col-md-12 margin-10-top"},y.a.createElement(x,{costCenters:this.state.costCenters,isLoading:this.state.isLoading,hasError:this.state.hasError,deleteCostCenter:this.deleteCostCenter}))))}}]),n}(v.Component);t.default=Object(j.b)(null,(function(e){return{setError:function(t,n){e(Object(U.b)(t,n))}}}))(X)}}]);