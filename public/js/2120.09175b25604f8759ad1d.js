"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[2120],{21523:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(61941),o="ledger";const a={fetchLedgerDetails:function(e){var t="jory/ledger/".concat(e);return r.A.get(t,{params:{jory:{fld:["id","description","vatCodeId","twinfieldLedgerCode"],rlt:{vatCode:{fld:["id","description"]}}}}})},newLedger:function(e){var t=o;return e.jory=JSON.stringify({fld:["id"]}),r.A.post(t,e)},updateLedger:function(e){var t="".concat(o,"/").concat(e.id);return r.A.post(t,e)},deleteLedger:function(e){var t="".concat(o,"/").concat(e,"/delete");return r.A.post(t)}}},64588:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(61941),o="vat-code";const a={fetchVatCodeDetails:function(e){var t="jory/vat-code/".concat(e);return r.A.get(t,{params:{jory:{fld:["id","startDate","description","percentage","twinfieldCode","twinfieldLedgerCode"]}}})},newVatCode:function(e){var t=o;return e.jory=JSON.stringify({fld:["id"]}),r.A.post(t,e)},updateVatCode:function(e){var t="".concat(o,"/").concat(e.id);return r.A.post(t,e)}}},82120:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ee});var r=n(23029),o=n(92901),a=n(56822),i=n(53954),c=n(85501),s=n(64467),l=n(96540),d=n(24179),u=n(91858),p=n(5556),f=n(63750);const m=function(e){var t=e.deleteLedger,n=e.closeDeleteItemModal,r=e.description,o=e.id;return l.createElement(f.A,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:n,confirmAction:function(){return t(o),void n()},title:"Verwijderen"},"Verwijder grootboek: ",l.createElement("strong",null,r),"?")};function g(e,t,n){return t=(0,i.A)(t),(0,a.A)(e,h()?Reflect.construct(t,n||[],(0,i.A)(e).constructor):t.apply(e,n))}function h(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(h=function(){return!!e})()}var v=function(e){function t(e){var n;return(0,r.A)(this,t),n=g(this,t,[e]),(0,s.A)(n,"toggleDelete",(function(){n.setState({showDelete:!n.state.showDelete})})),n.state={showDelete:!1},n}return(0,c.A)(t,e),(0,o.A)(t,[{key:"render",value:function(){var e=this.props,t=e.description,n=e.id;return l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-4"},l.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},l.createElement(u.A,{iconName:"arrowLeft",onClickAction:d.Nc.goBack}),l.createElement(u.A,{iconName:"trash",onClickAction:this.toggleDelete}))),l.createElement("div",{className:"col-md-4"},l.createElement("h4",{className:"text-center"},"Grootboekrekening: ",t)),l.createElement("div",{className:"col-md-4"}),this.state.showDelete&&l.createElement(m,{closeDeleteItemModal:this.toggleDelete,description:t,id:n,deleteLedger:this.props.deleteLedger}))}}])}(l.Component);v.propTypes={description:p.any};const A=v;var E=n(2543),w=n(58168),y=n(69733),C=n(57761),b=n.n(C),L=n(95093),D=n.n(L),k=n(54814),N=n(55956),S=n(62493),O=n(55849),j=(n(64588),n(14809)),T=n(21523),B=n(17375),I=n(26062);function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){(0,s.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function P(e,t,n){return t=(0,i.A)(t),(0,a.A)(e,M()?Reflect.construct(t,n||[],(0,i.A)(e).constructor):t.apply(e,n))}function M(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(M=function(){return!!e})()}D().locale("nl");var x=function(e){function t(e){var n;return(0,r.A)(this,t),n=P(this,t,[e]),(0,s.A)(n,"handleInputChange",(function(e){var t=e.target,r="checkbox"===t.type?t.checked:t.value,o=t.name;n.setState(V(V({},n.state),{},{ledger:V(V({},n.state.ledger),{},(0,s.A)({},o,r))}))})),(0,s.A)(n,"handleSubmit",(function(e){e.preventDefault();var t=n.state.ledger,r={},o=!1;b().isEmpty(t.description)&&(r.description=!0,o=!0),t.twinfieldLedgerCode&&t.twinfieldLedgerCode!==n.props.ledger.twinfieldLedgerCode&&n.props.ledgers.map((function(e){e.twinfieldLedgerCode==t.twinfieldLedgerCode&&(o=!0,r.twinfieldLedgerCode=!0)})),n.setState(V(V({},n.state),{},{errors:r})),!o&&T.A.updateLedger(t).then((function(e){n.props.updateState(t),n.props.fetchSystemData(),n.props.switchToView()})).catch((function(e){alert("Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.")}))})),n.state={ledger:V({},e.ledger),errors:{description:!1,vatCodeId:!1}},n}return(0,c.A)(t,e),(0,o.A)(t,[{key:"render",value:function(){var e=this.state.ledger,t=e.description,n=e.vatCodeId,r=e.twinfieldLedgerCode;return l.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},l.createElement(S.A,null,l.createElement(O.A,null,l.createElement("div",{className:"row"},l.createElement(k.A,{label:"Omschrijving",name:"description",value:t,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.description}),l.createElement(j.A,{label:"BTW code",name:"vatCodeId",value:n,options:this.props.vatCodes,optionName:"description",onChangeAction:this.handleInputChange,placeholder:"BTW geen"})),l.createElement("div",{className:"row"},l.createElement(k.A,{label:"Twinfield grootboekcode",name:"twinfieldLedgerCode",value:r,onChangeAction:this.handleInputChange,error:this.state.errors.twinfieldLedgerCode,errorMessage:"Deze grootboekcode wordt al gebruikt."}))),l.createElement(O.A,null,l.createElement("div",{className:"pull-right btn-group",role:"group"},l.createElement(N.A,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:this.props.switchToView}),l.createElement(N.A,{buttonText:"Opslaan",type:"submit",value:"Submit"})))))}}])}(l.Component);const F=(0,y.Ng)(null,(function(e){return(0,B.zH)({fetchSystemData:I.u},e)}))(x);var W=n(30483);const z=function(e){var t=e.description,n=e.vatCodeId,r=e.twinfieldLedgerCode,o=e.switchToEdit,a=e.vatCodes;return l.createElement("div",{onClick:o},l.createElement(S.A,null,l.createElement(O.A,null,l.createElement("div",{className:"row"},l.createElement(W.A,{label:"Omschrijving",value:t}),l.createElement(W.A,{label:"BTW code",value:n?a.find((function(e){return e.id==n})).description:"BTW geen"})),l.createElement("div",{className:"row"},l.createElement(W.A,{label:"Twinfield grootboek code",value:r})))))};function G(e,t,n){return t=(0,i.A)(t),(0,a.A)(e,q()?Reflect.construct(t,n||[],(0,i.A)(e).constructor):t.apply(e,n))}function q(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(q=function(){return!!e})()}var H=function(e){function t(e){var n;return(0,r.A)(this,t),n=G(this,t,[e]),(0,s.A)(n,"switchToEdit",(function(){n.setState({showEdit:!0})})),(0,s.A)(n,"switchToView",(function(){n.setState({showEdit:!1,activeDiv:""})})),n.state={showEdit:!1,activeDiv:""},n}return(0,c.A)(t,e),(0,o.A)(t,[{key:"onDivEnter",value:function(){this.setState({activeDiv:"panel-grey"})}},{key:"onDivLeave",value:function(){this.state.showEdit||this.setState({activeDiv:""})}},{key:"render",value:function(){var e=this,t=this.props.meDetails.permissions,n=void 0===t?{}:t;return l.createElement("div",{className:this.state.activeDiv,onMouseEnter:function(){return e.onDivEnter()},onMouseLeave:function(){return e.onDivLeave()}},this.state.showEdit&&n.manageFinancial?l.createElement(F,{ledger:this.props.ledger,vatCodes:this.props.vatCodes,ledgers:this.props.ledgers,switchToView:this.switchToView,updateState:this.props.updateState}):l.createElement(z,(0,w.A)({},this.props.ledger,{switchToEdit:this.switchToEdit,vatCodes:this.props.vatCodes})))}}])}(l.Component);const J=(0,y.Ng)((function(e){return{meDetails:e.meDetails,permissions:e.meDetails.permissions,vatCodes:e.systemData.vatCodes,ledgers:e.systemData.ledgers}}))(H);function K(e,t,n){return t=(0,i.A)(t),(0,a.A)(e,Q()?Reflect.construct(t,n||[],(0,i.A)(e).constructor):t.apply(e,n))}function Q(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(Q=function(){return!!e})()}var U=function(e){function t(e){return(0,r.A)(this,t),K(this,t,[e])}return(0,c.A)(t,e),(0,o.A)(t,[{key:"render",value:function(){var e=this.props,t=e.ledger,n=e.hasError,r=e.isLoading,o=e.updateState,a="",i=!0;return n?a="Fout bij het ophalen van grootboek.":r?a="Gegevens aan het laden.":(0,E.isEmpty)(t)?a="Geen grootboek gevonden!":i=!1,i?l.createElement("div",null,a):l.createElement("div",null,l.createElement(J,{ledger:t,updateState:o}))}}])}(l.Component);U.propTypes={ledger:p.any,hasError:p.any,isLoading:p.any,updateState:p.any};const X=U;var Y=n(46749);function Z(e,t,n){return t=(0,i.A)(t),(0,a.A)(e,$()?Reflect.construct(t,n||[],(0,i.A)(e).constructor):t.apply(e,n))}function $(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return($=function(){return!!e})()}var _=function(e){function t(e){var n;return(0,r.A)(this,t),n=Z(this,t,[e]),(0,s.A)(n,"callFetchLedgerDetails",(function(){n.setState({isLoading:!0,hasError:!1}),T.A.fetchLedgerDetails(n.props.params.id).then((function(e){n.setState({isLoading:!1,ledger:e.data.data})})).catch((function(e){n.setState({isLoading:!1,hasError:!0})}))})),(0,s.A)(n,"deleteLedger",(function(e){T.A.deleteLedger(e).then((function(e){d.RL.push("/grootboekrekeningen")})).catch((function(e){n.props.setError(e.response.status,e.response.data.message)}))})),(0,s.A)(n,"updateState",(function(e){n.setState({ledger:e})})),n.state={ledger:{},isLoading:!1,hasError:!1},n}return(0,c.A)(t,e),(0,o.A)(t,[{key:"componentDidMount",value:function(){this.callFetchLedgerDetails()}},{key:"render",value:function(){return l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-9"},l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(S.A,null,l.createElement(O.A,{className:"panel-small"},l.createElement(A,{description:this.state.ledger.description||"",id:this.state.ledger.id,deleteLedger:this.deleteLedger})))),l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(X,{ledger:this.state.ledger,isLoading:this.state.isLoading,hasError:this.state.hasError,updateState:this.updateState}))),l.createElement("div",{className:"col-md-3"}))}}])}(l.Component);const ee=(0,y.Ng)(null,(function(e){return{setError:function(t,n){e((0,Y.N)(t,n))}}}))(_)}}]);