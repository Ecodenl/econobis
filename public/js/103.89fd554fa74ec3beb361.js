(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{1035:function(e,t,n){"use strict";var r=n(2);t.a={fetchLedgerDetails:function(e){var t="jory/ledger/".concat(e);return r.a.get(t,{params:{jory:{fld:["id","description","vatCodeId","twinfieldLedgerCode"],rlt:{vatCode:{fld:["id","description"]}}}}})},newLedger:function(e){return e.jory=JSON.stringify({fld:["id"]}),r.a.post("ledger",e)},updateLedger:function(e){var t="".concat("ledger","/").concat(e.id);return r.a.post(t,e)},deleteLedger:function(e){var t="".concat("ledger","/").concat(e,"/delete");return r.a.post(t)}}},1628:function(e,t,n){"use strict";n.r(t);var r=n(14),a=n.n(r),o=n(15),i=n.n(o),c=n(9),l=n.n(c),s=n(16),u=n.n(s),d=n(17),f=n.n(d),h=n(12),m=n.n(h),p=n(5),g=n.n(p),v=n(0),y=n.n(v),E=n(143),w=n.n(E),b=n(223),L=n(224),R=n(285),k=n(162),D=n(4),O=n(19);function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m()(e);if(t){var a=m()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return f()(this,n)}}var I=function(e){u()(n,e);var t=j(n);function n(e){var r;return a()(this,n),(r=t.call(this,e)).state={showActionButtons:!1,highlightRow:""},r}return i()(n,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){D.f.push("/grootboekrekening/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,r=t.description,a=t.vatCode,o=t.twinfieldLedgerCode,i=t.permissions;return y.a.createElement("tr",{className:this.state.highlightRow,onDoubleClick:i.manageFinancial?function(){return e.openItem(n)}:null,onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},y.a.createElement("td",null,r),y.a.createElement("td",null,a&&a.description),y.a.createElement("td",null,o),y.a.createElement("td",null,this.state.showActionButtons&&i.manageFinancial?y.a.createElement("a",{role:"button",onClick:function(){return e.openItem(n)}},y.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):"",this.state.showActionButtons&&i.manageFinancial?y.a.createElement("a",{role:"button",onClick:this.props.showDeleteItemModal.bind(this,n,r)},y.a.createElement("span",{className:"glyphicon glyphicon-trash mybtn-danger"})," "):""))}}]),n}(v.Component),C=Object(O.b)((function(e){return{permissions:e.meDetails.permissions}}))(I),N=n(35),B=function(e){var t=e.deleteLedger,n=e.closeDeleteItemModal,r=e.description,a=e.id;return y.a.createElement(N.a,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:n,confirmAction:function(){return t(a),void n()},title:"Verwijderen"},"Verwijder grootboek: ",y.a.createElement("strong",null,r),"?")},M=n(3);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){g()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m()(e);if(t){var a=m()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return f()(this,n)}}var F=function(e){u()(n,e);var t=A(n);function n(e){var r;return a()(this,n),r=t.call(this,e),g()(l()(r),"showDeleteItemModal",(function(e,t){r.setState(S(S({},r.state),{},{showDeleteItem:!0,deleteItem:S(S({},r.state.deleteItem),{},{id:e,description:t})}))})),g()(l()(r),"closeDeleteItemModal",(function(){r.setState(S(S({},r.state),{},{showDeleteItem:!1,deleteItem:S(S({},r.state.deleteItem),{},{id:"",description:""})}))})),r.state={showDeleteItem:!1,deleteItem:{id:"",description:""}},r}return i()(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.ledgers,r=t.hasError,a=t.isLoading,o="",i=!0;return r?o="Fout bij het ophalen van grootboekrekeningen.":a?o="Gegevens aan het laden.":0===n.length?o="Geen grootboekrekeningen gevonden!":i=!1,y.a.createElement("div",null,y.a.createElement(b.a,null,y.a.createElement(L.a,null,y.a.createElement("tr",{className:"thead-title"},y.a.createElement(k.a,{title:"Omschrijving",width:"35%"}),y.a.createElement(k.a,{title:"BTW code",width:"30%"}),y.a.createElement(k.a,{title:"Nummer",width:"30%"}),y.a.createElement(k.a,{title:"",width:"5%"}))),y.a.createElement(R.a,null,i?y.a.createElement("tr",null,y.a.createElement("td",{colSpan:5},o)):n.map((function(t){return y.a.createElement(C,w()({key:t.id,showDeleteItemModal:e.showDeleteItemModal},t))})))),this.state.showDeleteItem&&y.a.createElement(B,w()({closeDeleteItemModal:this.closeDeleteItemModal},this.state.deleteItem,{deleteLedger:this.props.deleteLedger})))}}]),n}(v.Component);F.propTypes={ledgers:M.any,hasError:M.any,isLoading:M.any};var x=F,T=n(50);function G(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m()(e);if(t){var a=m()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return f()(this,n)}}var J=function(e){u()(n,e);var t=G(n);function n(){return a()(this,n),t.apply(this,arguments)}return i()(n,[{key:"render",value:function(){var e=this.props,t=e.ledgersCount,n=e.refreshLedgersData,r=e.permissions;return y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-md-4"},y.a.createElement("div",{className:"btn-group",role:"group"},y.a.createElement(T.a,{iconName:"glyphicon-refresh",onClickAction:n}),r.manageFinancial&&y.a.createElement(T.a,{iconName:"glyphicon-plus",onClickAction:function(){D.f.push("/grootboekrekening/nieuw")}}))),y.a.createElement("div",{className:"col-md-4"},y.a.createElement("h3",{className:"text-center table-title"},"Grootboekrekeningen")),y.a.createElement("div",{className:"col-md-4"},y.a.createElement("div",{className:"pull-right"},"Resultaten: ",t)))}}]),n}(v.Component);J.propTypes={ledgersCount:M.any,refreshLedgersData:M.any,permissions:M.any};var V=Object(O.b)((function(e){return{permissions:e.meDetails.permissions}}),null)(J),W=n(27),q=n(30),z=n(2),H=function(){return z.a.get("jory/ledger",{params:{jory:{fld:["id","description","vatCodeId","twinfieldLedgerCode"],rlt:{vatCode:{fld:["id","description"]}}}}})},K=n(1035),Q=n(91);function U(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m()(e);if(t){var a=m()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return f()(this,n)}}var X=function(e){u()(n,e);var t=U(n);function n(e){var r;return a()(this,n),r=t.call(this,e),g()(l()(r),"callFetchLedgersData",(function(){r.setState({isLoading:!0,hasError:!1}),H().then((function(e){r.setState({isLoading:!1,ledgers:e.data.data})})).catch((function(e){r.setState({isLoading:!1,hasError:!0})}))})),g()(l()(r),"deleteLedger",(function(e){K.a.deleteLedger(e).then((function(t){r.setState({ledgers:r.state.ledgers.filter((function(t){return t.id!==e}))})})).catch((function(e){r.props.setError(e.response.status,e.response.data.message)}))})),r.state={ledgers:[],isLoading:!1,hasError:!1},r}return i()(n,[{key:"componentDidMount",value:function(){this.callFetchLedgersData()}},{key:"render",value:function(){return y.a.createElement(W.a,null,y.a.createElement(q.a,null,y.a.createElement("div",{className:"col-md-12 margin-10-top"},y.a.createElement(V,{ledgersCount:this.state.ledgers?this.state.ledgers.length:0,refreshLedgersData:this.callFetchLedgersData})),y.a.createElement("div",{className:"col-md-12 margin-10-top"},y.a.createElement(x,{ledgers:this.state.ledgers,isLoading:this.state.isLoading,hasError:this.state.hasError,deleteLedger:this.deleteLedger}))))}}]),n}(v.Component);t.default=Object(O.b)(null,(function(e){return{setError:function(t,n){e(Object(Q.b)(t,n))}}}))(X)}}]);