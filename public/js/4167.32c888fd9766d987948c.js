"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[4167],{27516:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(61941),o="cost-center";const s={fetchCostCenterDetails:function(e){var t="jory/cost-center/".concat(e);return r.A.get(t,{params:{jory:{fld:["id","description","twinfieldCostCenterCode"]}}})},newCostCenter:function(e){var t=o;return e.jory=JSON.stringify({fld:["id"]}),r.A.post(t,e)},updateCostCenter:function(e){var t="".concat(o,"/").concat(e.id);return r.A.post(t,e)},deleteCostCenter:function(e){var t="".concat(o,"/").concat(e,"/delete");return r.A.post(t)}}},24167:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Q});var r=n(23029),o=n(92901),s=n(56822),a=n(53954),c=n(85501),i=n(64467),l=n(96540),u=n(58168),m=n(42285),d=n(45403),h=n(93913),f=n(26829),p=n(24179),C=n(69733),v=n(87722),A=n(88505),E=n(87696);function y(e,t,n){return t=(0,a.A)(t),(0,s.A)(e,g()?Reflect.construct(t,n||[],(0,a.A)(e).constructor):t.apply(e,n))}function g(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(g=function(){return!!e})()}var w=function(e){function t(e){var n;return(0,r.A)(this,t),(n=y(this,t,[e])).state={showActionButtons:!1,highlightRow:""},n}return(0,c.A)(t,e),(0,o.A)(t,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){p.RL.push("/kostenplaats/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,r=t.description,o=t.twinfieldCostCenterCode,s=t.permissions;return l.createElement("tr",{className:this.state.highlightRow,onDoubleClick:s.manageFinancial?function(){return e.openItem(n)}:null,onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},l.createElement("td",null,r),l.createElement("td",null,o),l.createElement("td",null,this.state.showActionButtons&&s.manageFinancial?l.createElement("a",{role:"button",onClick:function(){return e.openItem(n)}},l.createElement(v.Ay,{className:"mybtn-success",size:14,icon:A.w})):""," ",this.state.showActionButtons&&s.manageFinancial?l.createElement("a",{role:"button",onClick:this.props.showDeleteItemModal.bind(this,n,r)},l.createElement(v.Ay,{className:"mybtn-danger",size:14,icon:E.d})):""))}}])}(l.Component);const b=(0,C.Ng)((function(e){return{permissions:e.meDetails.permissions}}))(w);var D=n(63750);const k=function(e){var t=e.deleteCostCenter,n=e.closeDeleteItemModal,r=e.description,o=e.id;return l.createElement(D.A,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:n,confirmAction:function(){return t(o),void n()},title:"Verwijderen"},"Verwijder kostenplaats: ",l.createElement("strong",null,r),"?")};var O=n(5556);function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach((function(t){(0,i.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function I(e,t,n){return t=(0,a.A)(t),(0,s.A)(e,R()?Reflect.construct(t,n||[],(0,a.A)(e).constructor):t.apply(e,n))}function R(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(R=function(){return!!e})()}var B=function(e){function t(e){var n;return(0,r.A)(this,t),n=I(this,t,[e]),(0,i.A)(n,"showDeleteItemModal",(function(e,t){n.setState(j(j({},n.state),{},{showDeleteItem:!0,deleteItem:j(j({},n.state.deleteItem),{},{id:e,description:t})}))})),(0,i.A)(n,"closeDeleteItemModal",(function(){n.setState(j(j({},n.state),{},{showDeleteItem:!1,deleteItem:j(j({},n.state.deleteItem),{},{id:"",description:""})}))})),n.state={showDeleteItem:!1,deleteItem:{id:"",description:""}},n}return(0,c.A)(t,e),(0,o.A)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.costCenters,r=t.hasError,o=t.isLoading,s="",a=!0;return r?s="Fout bij het ophalen van kostenplaatsen.":o?s="Gegevens aan het laden.":0===n.length?s="Geen kostenplaatsen gevonden!":a=!1,l.createElement("div",null,l.createElement(m.A,null,l.createElement(d.A,null,l.createElement("tr",{className:"thead-title"},l.createElement(f.A,{title:"Omschrijving",width:"60%"}),l.createElement(f.A,{title:"Nummer",width:"30%"}),l.createElement(f.A,{title:"",width:"10%"}))),l.createElement(h.A,null,a?l.createElement("tr",null,l.createElement("td",{colSpan:5},s)):n.map((function(t){return l.createElement(b,(0,u.A)({key:t.id,showDeleteItemModal:e.showDeleteItemModal},t))})))),this.state.showDeleteItem&&l.createElement(k,(0,u.A)({closeDeleteItemModal:this.closeDeleteItemModal},this.state.deleteItem,{deleteCostCenter:this.props.deleteCostCenter})))}}])}(l.Component);B.propTypes={costCenters:O.any,hasError:O.any,isLoading:O.any};const L=B;var M=n(91858);function S(e,t,n){return t=(0,a.A)(t),(0,s.A)(e,F()?Reflect.construct(t,n||[],(0,a.A)(e).constructor):t.apply(e,n))}function F(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(F=function(){return!!e})()}var P=function(e){function t(){return(0,r.A)(this,t),S(this,t,arguments)}return(0,c.A)(t,e),(0,o.A)(t,[{key:"render",value:function(){var e=this.props,t=e.costCentersCount,n=e.refreshCostCentersData,r=e.permissions;return l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-4"},l.createElement("div",{className:"btn-group",role:"group"},l.createElement(M.A,{iconName:"refresh",onClickAction:n}),r.manageFinancial&&l.createElement(M.A,{iconName:"plus",onClickAction:function(){p.RL.push("/kostenplaats/nieuw")}}))),l.createElement("div",{className:"col-md-4"},l.createElement("h3",{className:"text-center table-title"},"Kostenplaatsen")),l.createElement("div",{className:"col-md-4"},l.createElement("div",{className:"pull-right"},"Resultaten: ",t)))}}])}(l.Component);P.propTypes={costCentersCount:O.any,refreshCostCentersData:O.any,permissions:O.any};const T=(0,C.Ng)((function(e){return{permissions:e.meDetails.permissions}}),null)(P);var V=n(62493),x=n(55849),z=n(61941);var G=n(27516),J=n(46749);function K(e,t,n){return t=(0,a.A)(t),(0,s.A)(e,q()?Reflect.construct(t,n||[],(0,a.A)(e).constructor):t.apply(e,n))}function q(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(q=function(){return!!e})()}var H=function(e){function t(e){var n;return(0,r.A)(this,t),n=K(this,t,[e]),(0,i.A)(n,"callFetchCostCentersData",(function(){n.setState({isLoading:!0,hasError:!1}),z.A.get("jory/cost-center",{params:{jory:{fld:["id","description","twinfieldCostCenterCode"]}}}).then((function(e){n.setState({isLoading:!1,costCenters:e.data.data})})).catch((function(e){n.setState({isLoading:!1,hasError:!0})}))})),(0,i.A)(n,"deleteCostCenter",(function(e){G.A.deleteCostCenter(e).then((function(t){n.setState({costCenters:n.state.costCenters.filter((function(t){return t.id!==e}))})})).catch((function(e){n.props.setError(e.response.status,e.response.data.message)}))})),n.state={costCenters:[],isLoading:!1,hasError:!1},n}return(0,c.A)(t,e),(0,o.A)(t,[{key:"componentDidMount",value:function(){this.callFetchCostCentersData()}},{key:"render",value:function(){return l.createElement(V.A,null,l.createElement(x.A,null,l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(T,{costCentersCount:this.state.costCenters?this.state.costCenters.length:0,refreshCostCentersData:this.callFetchCostCentersData})),l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(L,{costCenters:this.state.costCenters,isLoading:this.state.isLoading,hasError:this.state.hasError,deleteCostCenter:this.deleteCostCenter}))))}}])}(l.Component);const Q=(0,C.Ng)(null,(function(e){return{setError:function(t,n){e((0,J.N)(t,n))}}}))(H)}}]);