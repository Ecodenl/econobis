"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[9149],{99149:(e,a,t)=>{t.r(a),t.d(a,{default:()=>Q});var l=t(23029),n=t(92901),s=t(56822),r=t(53954),o=t(85501),i=t(64467),m=t(96540),c=t(24179),p=t(91858);const u=function(e){var a=e.name;return m.createElement("div",{className:"row"},m.createElement("div",{className:"col-md-4"},m.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},m.createElement(p.A,{iconName:"arrowLeft",onClickAction:c.Nc.goBack}))),m.createElement("div",{className:"col-md-4"},m.createElement("h4",{className:"text-center"},"Taak type: ",a)),m.createElement("div",{className:"col-md-4"}))};var d=t(2543),f=t(58168),k=t(69733),v=t(95093),T=t.n(v),h=t(54814),E=t(55956),w=t(62493),g=t(55849),b=t(61941),y={fld:["id","name","usesWfCompletedTask","emailTemplateIdWfCompletedTask","numberOfDaysToSendEmailCompletedTask","usesWfExpiredTask","emailTemplateIdWfExpiredTask","usesWfNewTask","emailTemplateIdWfNewTask"],rlt:{emailTemplateWorkflowCompletedTask:[],emailTemplateWorkflowExpiredTask:[],emailTemplateWorkflowNewTask:[]}};var N=t(17375),A=t(26062),S=t(77465),W=t(31714),C=t(30483),O=t(6438),D=t(57761),x=t.n(D);function j(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);a&&(l=l.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,l)}return t}function z(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?j(Object(t),!0).forEach((function(a){(0,i.A)(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):j(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function I(e,a,t){return a=(0,r.A)(a),(0,s.A)(e,L()?Reflect.construct(a,t||[],(0,r.A)(e).constructor):a.apply(e,t))}function L(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(L=function(){return!!e})()}T().locale("nl");var P=function(e){function a(e){var t;return(0,l.A)(this,a),t=I(this,a,[e]),(0,i.A)(t,"handleInputChange",(function(e){var a=e.target,l="checkbox"===a.type?a.checked:a.value,n=a.name;t.setState(z(z({},t.state),{},{taskType:z(z({},t.state.taskType),{},(0,i.A)({},n,l))}))})),(0,i.A)(t,"handleSubmit",(function(e){e.preventDefault();var a=t.state.taskType,l={},n=!1;1==a.usesWfCompletedTask&&(a.emailTemplateIdWfCompletedTask||(l.emailTemplateIdWfCompletedTask=!0,n=!0),x().isEmpty(a.numberOfDaysToSendEmailCompletedTask.toString())&&(l.numberOfDaysToSendEmailCompletedTask=!0,n=!0)),1==a.usesWfExpiredTask&&(a.emailTemplateIdWfExpiredTask||(l.emailTemplateIdWfExpiredTask=!0,n=!0)),1==a.usesWfNewTask&&(a.emailTemplateIdWfNewTask||(l.emailTemplateIdWfNewTask=!0,n=!0)),t.setState(z(z({},t.state),{},{errors:l})),!n&&function(e){var a="".concat("task-type","/").concat(e.id);return b.A.post(a,e,{params:{jory:y}})}(a).then((function(e){t.props.updateState(e.data.data),t.props.fetchSystemData(),t.props.switchToView()})).catch((function(e){alert("Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.")}))})),t.state={emailTemplates:[],taskType:z({},e.taskType),errors:{usesWfCompletedTask:!1,emailTemplateIdWfCompletedTask:!1,numberOfDaysToSendEmailCompletedTask:!1,usesWfExpiredTask:!1,emailTemplateIdWfExpiredTask:!1,usesWfNewTask:!1,emailTemplateIdWfNewTask:!1},peekLoading:{emailTemplates:!0}},t.handleReactSelectChange=t.handleReactSelectChange.bind(t),t}return(0,o.A)(a,e),(0,n.A)(a,[{key:"handleReactSelectChange",value:function(e,a){this.setState(z(z({},this.state),{},{taskType:z(z({},this.state.taskType),{},(0,i.A)({},a,e))}))}},{key:"componentDidMount",value:function(){var e=this;O.A.fetchEmailTemplatesPeek().then((function(a){return e.setState({emailTemplates:a,peekLoading:z(z({},e.state.peekLoading),{},{emailTemplates:!1})})}))}},{key:"render",value:function(){var e=this.state.taskType,a=e.name,t=e.usesWfCompletedTask,l=e.emailTemplateIdWfCompletedTask,n=e.numberOfDaysToSendEmailCompletedTask,s=e.usesWfExpiredTask,r=e.emailTemplateIdWfExpiredTask,o=e.usesWfNewTask,i=e.emailTemplateIdWfNewTask;return m.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},m.createElement(w.A,null,m.createElement(g.A,null,m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Omschrijving",divSize:"col-sm-10",value:a,className:"col-sm-10 form-group"})),m.createElement("div",{className:"row"},m.createElement(S.A,{label:"Gebruikt workflow verlopen taak",divSize:"col-sm-10",name:"usesWfExpiredTask",value:s,onChangeAction:this.handleInputChange})),1==s&&m.createElement(m.Fragment,null,m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Uitleg workflow verlopen taak",divSize:"col-sm-10",value:this.props.explanationWfExpiredTask,className:"col-sm-10 form-group"})),m.createElement("div",{className:"row"},m.createElement(W.A,{label:"Template email verlopen taak",divSize:"col-sm-10",name:"emailTemplateIdWfExpiredTask",options:this.state.emailTemplates,value:r,onChangeAction:this.handleReactSelectChange,isLoading:this.state.peekLoading.emailTemplates,required:"required",error:this.state.errors.emailTemplateIdWfExpiredTask}))),m.createElement("div",{className:"row"},m.createElement(S.A,{label:"Gebruikt workflow afgehandelde taak",divSize:"col-sm-10",name:"usesWfCompletedTask",value:t,onChangeAction:this.handleInputChange})),1==t&&m.createElement(m.Fragment,null,m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Uitleg workflow afgehandelde taak",divSize:"col-sm-10",value:this.props.explanationWfCompletedTask,className:"col-sm-10 form-group"})),m.createElement("div",{className:"row"},m.createElement(W.A,{label:"Template email afgehandelde taak",divSize:"col-sm-10",name:"emailTemplateIdWfCompletedTask",options:this.state.emailTemplates,value:l,onChangeAction:this.handleReactSelectChange,isLoading:this.state.peekLoading.emailTemplates,required:"required",error:this.state.errors.emailTemplateIdWfCompletedTask})),m.createElement("div",{className:"row"},m.createElement(h.A,{label:"Aantal dagen email na afgehandelde taak",divSize:"col-sm-10",type:"number",min:"1",id:"numberOfDaysToSendEmailCompletedTask",name:"numberOfDaysToSendEmailCompletedTask",value:n,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.numberOfDaysToSendEmailCompletedTask}))),m.createElement("div",{className:"row"},m.createElement(S.A,{label:"Gebruikt workflow nieuwe taak",divSize:"col-sm-10",name:"usesWfNewTask",value:o,onChangeAction:this.handleInputChange})),1==o&&m.createElement(m.Fragment,null,m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Uitleg workflow nieuwe taak",divSize:"col-sm-10",value:this.props.explanationWfNewTask,className:"col-sm-10 form-group"})),m.createElement("div",{className:"row"},m.createElement(W.A,{label:"Template email nieuwe taak",divSize:"col-sm-10",name:"emailTemplateIdWfNewTask",options:this.state.emailTemplates,value:i,onChangeAction:this.handleReactSelectChange,isLoading:this.state.peekLoading.emailTemplates,required:"required",error:this.state.errors.emailTemplateIdWfNewTask})))),m.createElement(g.A,null,m.createElement("div",{className:"pull-right btn-group",role:"group"},m.createElement(E.A,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:this.props.switchToView}),m.createElement(E.A,{buttonText:"Opslaan",type:"submit",value:"Submit"})))))}}])}(m.Component);const R=(0,k.Ng)(null,(function(e){return(0,N.zH)({fetchSystemData:A.u},e)}))(P),F=function(e){var a=e.name,t=e.usesWfCompletedTask,l=e.emailTemplateWorkflowCompletedTask,n=e.numberOfDaysToSendEmailCompletedTask,s=e.usesWfExpiredTask,r=e.emailTemplateWorkflowExpiredTask,o=e.usesWfNewTask,i=e.emailTemplateWorkflowNewTask,c=e.switchToEdit,p=e.explanationWfExpiredTask,u=e.explanationWfNewTask,d=e.explanationWfCompletedTask;return m.createElement("div",{onClick:c},m.createElement(w.A,null,m.createElement(g.A,null,m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Omschrijving",divSize:"col-sm-10",value:a,className:"col-sm-10 form-group"})),m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Gebruikt workflow verlopen taak",divSize:"col-sm-10",value:s?"Ja":"Nee",className:"col-sm-10 form-group"})),1==s&&m.createElement(m.Fragment,null,m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Uitleg workflow verlopen taak",divSize:"col-sm-10",value:p,className:"col-sm-10 form-group"})),m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Template email verlopen taak",divSize:"col-sm-10",value:r?r.name:"",className:"col-sm-10 form-group"}))),m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Gebruikt workflow afgehandelde taak",divSize:"col-sm-10",value:t?"Ja":"Nee",className:"col-sm-10 form-group"})),1==t&&m.createElement(m.Fragment,null,m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Uitleg workflow afgehandelde taak",divSize:"col-sm-10",value:d,className:"col-sm-10 form-group"})),m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Template email afgehandelde taak",divSize:"col-sm-10",value:l?l.name:"",className:"col-sm-10 form-group"})),m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Aantal dagen email na afgehandelde taak",divSize:"col-sm-10",value:n,className:"col-sm-10 form-group"}))),m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Gebruikt workflow nieuwe taak",divSize:"col-sm-10",value:o?"Ja":"Nee",className:"col-sm-10 form-group"})),1==o&&m.createElement(m.Fragment,null,m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Uitleg workflow nieuwe taak",divSize:"col-sm-10",value:u,className:"col-sm-10 form-group"})),m.createElement("div",{className:"row"},m.createElement(C.A,{label:"Template email nieuwe taak",divSize:"col-sm-10",value:i?i.name:"",className:"col-sm-10 form-group"}))))))};function q(e,a,t){return a=(0,r.A)(a),(0,s.A)(e,G()?Reflect.construct(a,t||[],(0,r.A)(e).constructor):a.apply(e,t))}function G(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(G=function(){return!!e})()}var B=function(e){function a(e){var t;return(0,l.A)(this,a),t=q(this,a,[e]),(0,i.A)(t,"switchToEdit",(function(){t.setState({showEdit:!0})})),(0,i.A)(t,"switchToView",(function(){t.setState({showEdit:!1,activeDiv:""})})),t.state={showEdit:!1,activeDiv:""},t}return(0,o.A)(a,e),(0,n.A)(a,[{key:"onDivEnter",value:function(){this.setState({activeDiv:"panel-grey"})}},{key:"onDivLeave",value:function(){this.state.showEdit||this.setState({activeDiv:""})}},{key:"render",value:function(){var e=this,a=this.props.meDetails.permissions,t=void 0===a?{}:a,l=m.createElement("span",null,"Er zal automatisch eenmalig een e-mail verstuurd worden naar de verantwoordelijke als deze taak is verlopen."),n=m.createElement("span",null,"Er zal automatisch eenmalig een e-mail verstuurd worden naar contact taak als deze taak is afgehandeld is, rekening houdend met het opgegeven aantal dagen."),s=m.createElement("span",null,"Er zal automatisch een e-mail verstuurd worden naar de verantwoordelijke als de nieuwe taak wordt opgeslagen.");return m.createElement("div",{className:this.state.activeDiv,onMouseEnter:function(){return e.onDivEnter()},onMouseLeave:function(){return e.onDivLeave()}},this.state.showEdit&&t.manageFinancial?m.createElement(R,{taskType:this.props.taskType,switchToView:this.switchToView,updateState:this.props.updateState,explanationWfExpiredTask:l,explanationWfNewTask:s,explanationWfCompletedTask:n}):m.createElement(F,(0,f.A)({},this.props.taskType,{switchToEdit:this.switchToEdit,explanationWfExpiredTask:l,explanationWfNewTask:s,explanationWfCompletedTask:n})))}}])}(m.Component);const U=(0,k.Ng)((function(e){return{meDetails:e.meDetails,permissions:e.meDetails.permissions}}))(B),V=function(e){var a=e.taskType,t=e.hasError,l=e.isLoading,n=e.updateState,s="",r=!0;return t?s="Fout bij het ophalen van taak type.":l?s="Gegevens aan het laden.":(0,d.isEmpty)(a)?s="Geen taak type gevonden!":r=!1,r?m.createElement("div",null,s):m.createElement("div",null,m.createElement(U,{taskType:a,updateState:n}))};function M(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);a&&(l=l.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,l)}return t}function J(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?M(Object(t),!0).forEach((function(a){(0,i.A)(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):M(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function H(e,a,t){return a=(0,r.A)(a),(0,s.A)(e,K()?Reflect.construct(a,t||[],(0,r.A)(e).constructor):a.apply(e,t))}function K(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(K=function(){return!!e})()}const Q=function(e){function a(e){var t;return(0,l.A)(this,a),t=H(this,a,[e]),(0,i.A)(t,"callFetchTaskTypeDetails",(function(){var e,a;t.setState({isLoading:!0,hasError:!1}),(e=t.props.params.id,a="jory/task-type/".concat(e),b.A.get(a,{params:{jory:y}})).then((function(e){t.setState({isLoading:!1,taskType:J({},e.data.data)})})).catch((function(e){t.setState({isLoading:!1,hasError:!0})}))})),(0,i.A)(t,"updateState",(function(e){t.setState({taskType:e})})),t.state={taskType:{},isLoading:!1,hasError:!1},t}return(0,o.A)(a,e),(0,n.A)(a,[{key:"componentDidMount",value:function(){this.callFetchTaskTypeDetails()}},{key:"render",value:function(){return m.createElement("div",{className:"row"},m.createElement("div",{className:"col-md-9"},m.createElement("div",{className:"col-md-12 margin-10-top"},m.createElement(w.A,null,m.createElement(g.A,{className:"panel-small"},m.createElement(u,{name:this.state.taskType.name||""})))),m.createElement("div",{className:"col-md-12 margin-10-top"},m.createElement(V,{taskType:this.state.taskType,isLoading:this.state.isLoading,hasError:this.state.hasError,updateState:this.updateState}))),m.createElement("div",{className:"col-md-3"}))}}])}(m.Component)}}]);