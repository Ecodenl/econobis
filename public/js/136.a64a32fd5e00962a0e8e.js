(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{1585:function(e,t,a){"use strict";a.r(t);var n=a(24),s=a.n(n),r=a(25),c=a.n(r),l=a(22),o=a.n(l),i=a(26),u=a.n(i),m=a(27),p=a.n(m),f=a(16),d=a.n(f),h=a(6),E=a.n(h),y=a(0),v=a.n(y),k=a(698),g=a(699),T=a(11),N=function(){return T.a.get("jory/task-type",{params:{jory:{fld:["id","name","usesWfCompletedTask","emailTemplateIdWfCompletedTask","numberOfDaysToSendEmailCompletedTask","usesWfExpiredTask","emailTemplateIdWfExpiredTask","usesWfNewTask","emailTemplateIdWfNewTask"]}}})},w=a(31),b=a(700),R=Object(w.b)((function(e){return{permissions:e.meDetails.permissions}}),null)((function(e){var t=e.taskTypesCount,a=e.refreshTaskTypesData;e.permissions;return v.a.createElement("div",{className:"row"},v.a.createElement("div",{className:"col-md-4"},v.a.createElement("div",{className:"btn-group",role:"group"},v.a.createElement(b.a,{iconName:"glyphicon-refresh",onClickAction:a}))),v.a.createElement("div",{className:"col-md-4"},v.a.createElement("h3",{className:"text-center table-title"},"Workflows op Taak types")),v.a.createElement("div",{className:"col-md-4"},v.a.createElement("div",{className:"pull-right"},"Resultaten: ",t)))})),C=a(198),D=a.n(C),L=a(149),M=a(150),S=a(200),W=a(104),A=a(4);function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var s=d()(this).constructor;a=Reflect.construct(n,arguments,s)}else a=n.apply(this,arguments);return p()(this,a)}}var x=function(e){u()(a,e);var t=j(a);function a(e){var n;return s()(this,a),(n=t.call(this,e)).state={showActionButtons:!1,highlightRow:""},n}return c()(a,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){A.f.push("/taak-type/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,a=t.id,n=t.name,s=t.usesWfExpiredTask,r=t.usesWfCompletedTask,c=t.numberOfDaysToSendEmailCompletedTask,l=t.usesWfNewTask,o=t.permissions;return v.a.createElement("tr",{className:this.state.highlightRow,onDoubleClick:o.manageFinancial?function(){return e.openItem(a)}:null,onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},v.a.createElement("td",null,n),v.a.createElement("td",null,s?"Ja":"Nee"),v.a.createElement("td",null,r?"Ja":"Nee"),v.a.createElement("td",null,r?c:""),v.a.createElement("td",null,l?"Ja":"Nee"),v.a.createElement("td",null,this.state.showActionButtons&&o.manageFinancial?v.a.createElement("a",{role:"button",onClick:function(){return e.openItem(a)}},v.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):""))}}]),a}(y.Component),F=Object(w.b)((function(e){return{permissions:e.meDetails.permissions}}))(x),I=function(e){var t=e.taskTypes,a=e.hasError,n=e.isLoading,s="",r=!0;return a?s="Fout bij het ophalen van taak types.":n?s="Gegevens aan het laden.":0===t.length?s="Geen taak types gevonden!":r=!1,v.a.createElement("div",null,v.a.createElement(L.a,null,v.a.createElement(M.a,null,v.a.createElement("tr",{className:"thead-title"},v.a.createElement(W.a,{title:"Omschrijving",width:"30%"}),v.a.createElement(W.a,{title:"Verlopen taak actief",width:"15%"}),v.a.createElement(W.a,{title:"Afgehandelde taak actief",width:"15%"}),v.a.createElement(W.a,{title:"Aantal dagen email",width:"15%"}),v.a.createElement(W.a,{title:"Nieuw taak actief",width:"15%"}),v.a.createElement(W.a,{title:"",width:"10%"}))),v.a.createElement(S.a,null,r?v.a.createElement("tr",null,v.a.createElement("td",{colSpan:6},s)):t.map((function(e){return v.a.createElement(F,D()({key:e.id},e))})))))};function J(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var s=d()(this).constructor;a=Reflect.construct(n,arguments,s)}else a=n.apply(this,arguments);return p()(this,a)}}var O=function(e){u()(a,e);var t=J(a);function a(e){var n;return s()(this,a),n=t.call(this,e),E()(o()(n),"callFetchTaskTypesData",(function(){n.setState({isLoading:!0,hasError:!1}),N().then((function(e){n.setState({isLoading:!1,taskTypes:e.data.data})})).catch((function(e){n.setState({isLoading:!1,hasError:!0})}))})),n.state={taskTypes:[],isLoading:!1,hasError:!1},n}return c()(a,[{key:"componentDidMount",value:function(){this.callFetchTaskTypesData()}},{key:"render",value:function(){return v.a.createElement(k.a,null,v.a.createElement(g.a,null,v.a.createElement("div",{className:"col-md-12 margin-10-top"},v.a.createElement(R,{taskTypesCount:this.state.taskTypes?this.state.taskTypes.length:0,refreshTaskTypesData:this.callFetchTaskTypesData})),v.a.createElement("div",{className:"col-md-12 margin-10-top"},v.a.createElement(I,{taskTypes:this.state.taskTypes,isLoading:this.state.isLoading,hasError:this.state.hasError}))))}}]),a}(y.Component);t.default=O},698:function(e,t,a){"use strict";var n=a(0),s=a.n(n),r=a(8),c=a.n(r),l=function(e){var t=e.children,a=e.className,n=e.onMouseEnter,r=e.onMouseLeave;return s.a.createElement("div",{className:"panel panel-default ".concat(a),onMouseEnter:n,onMouseLeave:r},t)};l.defaultProps={className:"",onMouseEnter:function(){},onMouseLeave:function(){}},l.propTypes={className:c.a.string,onMouseEnter:c.a.func,onMouseLeave:c.a.func},t.a=l},699:function(e,t,a){"use strict";var n=a(0),s=a.n(n),r=a(8),c=a.n(r),l=function(e){var t=e.className,a=e.children;return s.a.createElement("div",{className:"panel-body ".concat(t)},a)};l.defaultProps={className:""},l.propTypes={className:c.a.string},t.a=l},700:function(e,t,a){"use strict";var n=a(0),s=a.n(n),r=a(8),c=a.n(r),l=function(e){var t=e.buttonClassName,a=e.iconName,n=e.onClickAction,r=e.title,c=e.disabled;return s.a.createElement("button",{type:"button",className:"btn ".concat(t),onClick:n,disabled:c,title:r},s.a.createElement("span",{className:"glyphicon ".concat(a)}))};l.defaultProps={buttonClassName:"btn-success btn-sm",title:"",disabled:!1},l.propTypes={buttonClassName:c.a.string,iconName:c.a.string.isRequired,onClickAction:c.a.func,title:c.a.string,disabled:c.a.bool},t.a=l}}]);