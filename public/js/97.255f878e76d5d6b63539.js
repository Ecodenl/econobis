(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{1610:function(t,e,a){"use strict";a.r(e);var n=a(14),c=a.n(n),o=a(15),r=a.n(o),i=a(9),s=a.n(i),l=a(16),u=a.n(l),m=a(17),p=a.n(m),f=a(12),h=a.n(f),g=a(0),d=a.n(g),v=a(19),E=a(4),y=a(50),w=Object(v.b)((function(t){return{permissions:t.meDetails.permissions,campaigns:t.campaigns.list}}))((function(t){var e=t.permissions,a=void 0===e?{}:e,n=t.campaigns.meta,c=void 0===n?{}:n;return d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"col-md-4"},d.a.createElement("div",{className:"btn-group",role:"group"},d.a.createElement(y.a,{iconName:"glyphicon-arrow-left",onClickAction:E.e.goBack}),a.manageMarketing&&d.a.createElement(y.a,{iconName:"glyphicon-plus",onClickAction:function(){E.f.push("campagne/nieuw")}}))),d.a.createElement("div",{className:"col-md-4"},d.a.createElement("h3",{className:"text-center table-title"},"Campagnes")),d.a.createElement("div",{className:"col-md-4"},d.a.createElement("div",{className:"pull-right"},"Resultaten: ",c.total||0)))})),C=a(143),b=a.n(C),D=a(5),k=a.n(D),O=a(223),P=a(224),R=a(285),I=a(162),N=a(7),j=a.n(N);function A(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var a,n=h()(t);if(e){var c=h()(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return p()(this,a)}}j.a.locale("nl");var M=function(t){u()(a,t);var e=A(a);function a(t){var n;return c()(this,a),(n=e.call(this,t)).state={showActionButtons:!1,highlightRow:""},n}return r()(a,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(t){E.f.push("campagne/".concat(t))}},{key:"render",value:function(){var t=this,e=this.props,a=e.id,n=e.number,c=e.startDate,o=e.endDate,r=e.name,i=e.type,s=e.status,l=e.amountResponses;return d.a.createElement("tr",{className:this.state.highlightRow,onDoubleClick:function(){return t.openItem(a)},onMouseEnter:function(){return t.onRowEnter()},onMouseLeave:function(){return t.onRowLeave()}},d.a.createElement("td",null,n),d.a.createElement("td",null,c?j()(c).format("L"):""),d.a.createElement("td",null,o?j()(o).format("L"):""),d.a.createElement("td",null,r),d.a.createElement("td",null,i),d.a.createElement("td",null,s),d.a.createElement("td",null,l),d.a.createElement("td",null,this.state.showActionButtons?d.a.createElement("a",{role:"button",onClick:function(){return t.openItem(a)}},d.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):"",(this.state.showActionButtons&&this.props.permissions.manageMarketing,"")))}}]),a}(g.Component),B=Object(v.b)((function(t){return{permissions:t.meDetails.permissions}}))(M),S=a(35),L=a(951),G=function(t){return d.a.createElement(S.a,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:t.closeDeleteItemModal,confirmAction:function(){return L.a.deleteCampaign(t.id).then((function(){t.fetchCampaignsData()})),void t.closeDeleteItemModal()},title:"Verwijderen"},"Verwijder campagne ",d.a.createElement("strong",null,t.name),"?")},T=a(164);function x(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function _(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?x(Object(a),!0).forEach((function(e){k()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):x(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function V(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var a,n=h()(t);if(e){var c=h()(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return p()(this,a)}}var F=function(t){u()(a,t);var e=V(a);function a(t){var n;return c()(this,a),n=e.call(this,t),k()(s()(n),"showDeleteItemModal",(function(t,e){n.setState(_(_({},n.state),{},{showDeleteItem:!0,deleteItem:_(_({},n.state.deleteItem),{},{id:t,name:e})}))})),k()(s()(n),"closeDeleteItemModal",(function(){n.setState(_(_({},n.state),{},{showDeleteItem:!1,deleteItem:_(_({},n.state.deleteItem),{},{id:"",name:""})}))})),n.state={showDeleteItem:!1,deleteItem:{id:"",name:""}},n}return r()(a,[{key:"render",value:function(){var t=this,e=this.props.campaigns,a=e.data,n=void 0===a?[]:a,c=e.meta,o=void 0===c?{}:c,r="",i=!0;return this.props.hasError?r="Fout bij het ophalen van campagnes.":this.props.isLoading?r="Gegevens aan het laden.":0===n.length?r="Geen campagnes gevonden!":i=!1,d.a.createElement("div",null,d.a.createElement(O.a,null,d.a.createElement(P.a,null,d.a.createElement("tr",{className:"thead-title-quaternary"},d.a.createElement(I.a,{title:"Nummer",width:"10%"}),d.a.createElement(I.a,{title:"Begindatum",width:"10%"}),d.a.createElement(I.a,{title:"Einddatum",width:"10%"}),d.a.createElement(I.a,{title:"Naam",width:"20%"}),d.a.createElement(I.a,{title:"Type",width:"20%"}),d.a.createElement(I.a,{title:"Status",width:"10%"}),d.a.createElement(I.a,{title:"Aantal responses",width:"14%"}),d.a.createElement(I.a,{title:"",width:"6%"}))),d.a.createElement(R.a,null,i?d.a.createElement("tr",null,d.a.createElement("td",{colSpan:9},r)):n.map((function(e){return d.a.createElement(B,b()({key:e.id},e,{showDeleteItemModal:t.showDeleteItemModal}))})))),d.a.createElement("div",{className:"col-md-6 col-md-offset-3"},d.a.createElement(T.a,{onPageChangeAction:this.props.handlePageClick,totalRecords:o.total,initialPage:this.props.campaignsPagination.page})),this.state.showDeleteItem&&d.a.createElement(G,b()({closeDeleteItemModal:this.closeDeleteItemModal,fetchCampaignsData:this.props.fetchCampaignsData},this.state.deleteItem)))}}]),a}(g.Component),J=Object(v.b)((function(t){return{campaigns:t.campaigns.list,campaignsPagination:t.campaigns.pagination,isLoading:t.loadingData.isLoading,hasError:t.loadingData.hasError}}),null)(F);function q(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var a,n=h()(t);if(e){var c=h()(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return p()(this,a)}}var H=function(t){u()(a,t);var e=q(a);function a(t){var n;return c()(this,a),(n=e.call(this,t)).fetchCampaignsData=n.fetchCampaignsData.bind(s()(n)),n.handlePageClick=n.handlePageClick.bind(s()(n)),n}return r()(a,[{key:"componentDidMount",value:function(){this.fetchCampaignsData()}},{key:"componentWillUnmount",value:function(){this.props.clearCampaigns()}},{key:"fetchCampaignsData",value:function(){var t=this;setTimeout((function(){var e={limit:20,offset:t.props.campaignsPagination.offset};t.props.fetchCampaigns(e)}),100)}},{key:"handlePageClick",value:function(t){var e=t.selected,a=Math.ceil(20*e);this.props.setCampaignsPagination({page:e,offset:a}),this.fetchCampaignsData()}},{key:"render",value:function(){return d.a.createElement("div",null,d.a.createElement("div",{className:"panel panel-default col-md-12"},d.a.createElement("div",{className:"panel-body"},d.a.createElement("div",{className:"col-md-12 margin-10-top"},d.a.createElement(w,null)),d.a.createElement("div",{className:"col-md-12 margin-10-top"},d.a.createElement(J,{handlePageClick:this.handlePageClick,fetchCampaignsData:this.fetchCampaignsData})))))}}]),a}(g.Component);e.default=Object(v.b)((function(t){return{campaignsPagination:t.campaigns.pagination}}),(function(t){return{fetchCampaigns:function(e){t(function(t){return{type:"FETCH_CAMPAIGNS",pagination:t}}(e))},clearCampaigns:function(){t({type:"CLEAR_CAMPAIGNS"})},setCampaignsPagination:function(e){t(function(t){return{type:"SET_CAMPAIGNS_PAGINATION",pagination:t}}(e))}}}))(H)},951:function(t,e,a){"use strict";var n=a(2);e.a={fetchCampaign:function(t){var e=t.id,a="".concat("/campaign","/").concat(e);return n.a.get(a)},fetchCampaignIntakes:function(t){var e=t.id,a=t.page,c="".concat("/campaign","/").concat(e,"/intakes?page=").concat(a);return n.a.get(c)},fetchCampaignOpportunities:function(t){var e=t.id,a=t.page,c="".concat("/campaign","/").concat(e,"/opportunities?page=").concat(a);return n.a.get(c)},updateCampaign:function(t,e){var a="".concat("/campaign","/").concat(t);return n.a.post(a,e)},storeCampaign:function(t){var e="".concat("/campaign");return n.a.post(e,t)},deleteCampaign:function(t){var e="".concat("/campaign","/").concat(t,"/delete");return n.a.post(e)},attachResponse:function(t,e){var a="".concat("/campaign","/").concat(t,"/response/").concat(e,"/attach");return n.a.post(a)},detachResponse:function(t,e){var a="".concat("/campaign","/").concat(t,"/response/").concat(e,"/detach");return n.a.post(a)},attachOrganisation:function(t,e){var a="".concat("/campaign","/").concat(t,"/organisation/").concat(e,"/attach");return n.a.post(a)},detachOrganisation:function(t,e){var a="".concat("/campaign","/").concat(t,"/organisation/").concat(e,"/detach");return n.a.post(a)},attachCoach:function(t,e){var a="".concat("/campaign","/").concat(t,"/coach/").concat(e,"/attach");return n.a.post(a)},detachCoach:function(t,e){var a="".concat("/campaign","/").concat(t,"/coach/").concat(e,"/detach");return n.a.post(a)},updateCampaignOwner:function(t,e){var a="".concat("/campaign","/").concat(t,"/owner/").concat(e,"/associate");return n.a.post(a)}}}}]);