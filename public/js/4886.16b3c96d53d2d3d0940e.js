"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[4886],{14956:(e,t,a)=>{a.d(t,{Z:()=>m});var n=a(29439),s=a(67294),i=a(45697),o=a.n(i),c=a(32574),r=a.n(c),l=a(30381),d=a.n(l),p=function(e){var t=e.label,a=e.size,i=e.id,o=e.name,c=e.value,l=e.onChangeAction,p=e.start,m=e.end,h=e.step,u=e.readOnly,g=e.nullable,k=e.nullableLabel,b=e.nullableSize,I=(0,s.useState)("00:00"==c),v=(0,n.Z)(I,2),f=v[0],E=v[1];return s.createElement("div",{className:"form-group col-sm-6"},s.createElement("label",{htmlFor:i,className:"col-sm-6"},t),s.createElement("div",{className:"".concat(a)},u||f?s.createElement("input",{name:o,value:c,className:"form-control input-sm",readOnly:!0,disabled:!0}):s.createElement(r(),{name:o,value:c,onChange:function(e){var t=d()("1900-01-01 00:00:00").add(e,"seconds").format("HH:mm");l(t,o)},start:p,end:m,step:h,format:24,className:"input-sm"})),g?s.createElement("div",{className:"".concat(b)},s.createElement("label",{className:"col-sm"},s.createElement("input",{type:"checkbox",name:"nullableChecked",value:!0,checked:f,onChange:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value;E(a),l(a?"00:00":"08:00",o)},disabled:u})," ",k)):"")};p.defaultProps={className:"",size:"col-sm-6",value:"",start:"08:00",end:"23:00",step:15,readOnly:!1,nullable:!1,nullableLabel:"",nullableSize:"col-sm-3",nullableChecked:!1},p.propTypes={label:o().string.isRequired,id:o().string,name:o().string.isRequired,value:o().oneOfType([o().string,o().number]),onChangeAction:o().func,start:o().string,end:o().string,step:o().number,readOnly:o().bool,nullable:o().bool,nullableLabel:o().string,nullableSize:o().string,nullableChecked:o().bool};const m=p},34886:(e,t,a)=>{a.r(t),a.d(t,{default:()=>V});var n=a(4942),s=a(15671),i=a(43144),o=a(97326),c=a(60136),r=a(82963),l=a(61120),d=a(67294),p=a(96486),m=(a(30381),a(61409)),h=a(48966),u=a.n(h),g=a(72898),k=a(55359),b=a(4850),I=a(86706),v=a(71840),f=a(54138),E=a(49332),C=a(82084),N=a(14956),y=a(85129),S=a(21606),Z=a(80720);const L=function(e){var t=e.task,a=e.campaigns,n=e.intakes,s=e.contactGroups,i=e.opportunities,o=e.housingFiles,c=e.projects,r=e.participants,l=e.orders,p=e.invoices,m=e.handleReactSelectChange,h=e.peekLoading,u=t.intakeId,g=t.contactGroupId,k=t.opportunityId,b=t.campaignId,I=t.housingFileId,v=t.projectId,f=t.participantId,E=t.orderId,N=t.invoiceId;return d.createElement("div",null,d.createElement("div",{className:"row"},d.createElement(C.Z,{label:"Campagne",name:"campaignId",options:a,value:b,onChangeAction:m,isLoading:h.campaigns}),d.createElement(C.Z,{label:"Intake",size:"col-sm-6",name:"intakeId",options:n,value:u,onChangeAction:m,isLoading:h.intakes})),d.createElement("div",{className:"row"},d.createElement(C.Z,{label:"Groep",size:"col-sm-6",name:"contactGroupId",options:s,value:g,onChangeAction:m,isLoading:h.contactGroups}),d.createElement(C.Z,{label:"Kans",size:"col-sm-6",name:"opportunityId",options:i,value:k,onChangeAction:m,isLoading:h.opportunities})),d.createElement("div",{className:"row"},d.createElement(C.Z,{label:"Woningdossier",size:"col-sm-6",name:"housingFileId",options:o,value:I,onChangeAction:m,isLoading:h.housingFiles}),d.createElement(C.Z,{label:"Project",size:"col-sm-6",name:"projectId",options:c,value:v,onChangeAction:m,isLoading:h.projects})),d.createElement("div",{className:"row"},d.createElement(C.Z,{label:"Participant project",size:"col-sm-6",name:"participantId",options:r,value:f,onChangeAction:m,isLoading:h.participants}),d.createElement(C.Z,{label:"Order",size:"col-sm-6",name:"orderId",options:l,value:E,onChangeAction:m,isLoading:h.orders})),d.createElement("div",{className:"row"},d.createElement(C.Z,{label:"Nota",size:"col-sm-6",name:"invoiceId",options:p,value:N,onChangeAction:m,isLoading:h.invoices})))};var w=a(56170),j=a(97894),P=a(96497),O=a(32042);const A=(0,I.$j)((function(e){return{meDetails:e.meDetails,permissions:e.systemData.permissions,taskStatuses:e.systemData.taskStatuses,taskTypes:e.systemData.taskTypes,teams:e.systemData.teams,users:e.systemData.users}}),null)((function(e){var t=e.task,a=t.note,n=t.typeId,s=t.contactId,i=t.finished,o=t.dateFinished,c=t.finishedById,r=t.datePlannedStart,l=t.datePlannedFinish,p=t.startTimePlanned,m=t.endTimePlanned,h=t.responsible;return d.createElement("form",{className:"form-horizontal",onSubmit:e.handleSubmit},d.createElement("div",{className:"row"},d.createElement(v.Z,{label:i?"Type notitie":"Type taak",size:"col-sm-6",name:"typeId",options:e.taskTypes,value:n,onChangeAction:e.handleInputChange})),d.createElement("div",{className:"row"},d.createElement(y.Z,{label:i?"Notitie":"Taak",name:"note",value:a,onChangeAction:e.handleInputChange,required:"required",error:e.errors.note})),d.createElement("div",{className:"row margin-20-top"},d.createElement(f.Z,{label:"Datum afhandelen",size:"col-sm-6",name:"datePlannedStart",value:r,onChangeAction:e.handleInputChangeDate}),d.createElement(N.Z,{label:"Begin tijd",name:"startTimePlanned",value:p,onChangeAction:e.handleInputChangeTime})),d.createElement("div",{className:"row"},d.createElement(f.Z,{label:"Einddatum",size:"col-sm-6",name:"datePlannedFinish",value:l,onChangeAction:e.handleInputChangeDate}),d.createElement(N.Z,{label:"Eind tijd",name:"endTimePlanned",value:m,onChangeAction:e.handleInputChangeTime})),d.createElement("div",{className:"row"},d.createElement(S.Z,{label:"Afgehandeld?",name:"finished",value:i,onChangeAction:e.handleInputChange}),d.createElement(w.Z,{label:"Verantwoordelijke",size:"col-sm-6",name:"responsible",optionsInGroups:[{name:"user",label:"Gebruikers",options:e.users,optionName:"fullName"},{name:"team",label:"Teams",options:e.teams}],value:h,onChangeAction:e.handleInputChange,required:"required",error:e.errors.responsible})),d.createElement("div",{className:"row"},d.createElement(f.Z,{label:"Datum gereed",name:"dateFinished",value:o,onChangeAction:e.handleInputChangeDate}),d.createElement(v.Z,{label:"Afgerond door",name:"finishedById",options:e.users,value:c,onChangeAction:e.handleInputChange,optionName:"fullName"})),d.createElement("div",{className:"row margin-20-top"},d.createElement(C.Z,{label:"Contact",name:"contactId",options:e.contacts,value:s,onChangeAction:e.handleReactSelectChange,optionName:"fullName",isLoading:e.peekLoading.contacts})),d.createElement("div",{className:"margin-10-top"},d.createElement(Z.Z,null,d.createElement("div",{className:"row",onClick:e.toggleExtraConnections},e.showExtraConnections?d.createElement(j.ZP,{size:21,icon:O.z}):d.createElement(j.ZP,{size:21,icon:P.n}),d.createElement("span",{className:"h5"},"Overige koppelingen"))),e.showExtraConnections&&d.createElement(L,{task:e.task,intakes:e.intakes,contactGroups:e.contactGroups,opportunities:e.opportunities,housingFiles:e.housingFiles,campaigns:e.campaigns,projects:e.projects,participants:e.participants,orders:e.orders,invoices:e.invoices,handleReactSelectChange:e.handleReactSelectChange,peekLoading:e.peekLoading})),d.createElement("div",{className:"panel-footer"},d.createElement("div",{className:"pull-right btn-group",role:"group"},d.createElement(E.Z,{buttonText:"Opslaan",onClickAction:e.handleSubmit}))))}));var T=a(55451),z=a(14309),D=a(98688);const F=function(e){var t=e.finished;return d.createElement("div",{className:"row"},d.createElement("div",{className:"col-sm-12"},d.createElement(z.Z,null,d.createElement(D.Z,{className:"panel-small"},d.createElement("div",{className:"col-md-4"},d.createElement("div",{className:"btn-group btn-group-flex",role:"group"},d.createElement(T.Z,{iconName:"arrowLeft",onClickAction:m.mW.goBack}))),d.createElement("div",{className:"col-md-4"},d.createElement("h3",{className:"text-center table-title margin-small"},t?"Nieuwe notitie":"Nieuwe taak")),d.createElement("div",{className:"col-md-4"})))))};var x=a(83100),q=a(60813),G=a(44246),R=a(74006),B=a(7002),H=a(1114),M=a(33761),W=a(77071);function U(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function K(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?U(Object(a),!0).forEach((function(t){(0,n.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):U(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}const V=function(e){(0,c.Z)(I,e);var t,a,h=(t=I,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,l.Z)(t);if(a){var s=(0,l.Z)(this).constructor;e=Reflect.construct(n,arguments,s)}else e=n.apply(this,arguments);return(0,r.Z)(this,e)});function I(e){var t;return(0,s.Z)(this,I),(t=h.call(this,e)).state={contacts:[],intakes:[],contactGroups:[],opportunities:[],campaigns:[],housingFiles:[],projects:[],participants:[],orders:[],invoices:[],task:{id:"",note:"",typeId:"",contactId:"",campaignId:"",intakeId:"",opportunityId:"",contactGroupId:"",housingFileId:"",projectId:"",participantId:"",orderId:"",invoiceId:"",datePlannedStart:"",datePlannedFinish:"",startTimePlanned:"",endTimePlanned:"",finished:!1,dateFinished:"",finishedById:"",responsible:""},errors:{note:!1,responsible:!1},showExtraConnections:!1,peekLoading:{contacts:!0,intakes:!0,contactGroups:!0,opportunities:!0,campaigns:!0,housingFiles:!0,projects:!0,participants:!0,orders:!0,invoices:!0}},t.updateStateByChangeParams=t.updateStateByChangeParams.bind((0,o.Z)(t)),t.handleInputChange=t.handleInputChange.bind((0,o.Z)(t)),t.handleInputChangeDate=t.handleInputChangeDate.bind((0,o.Z)(t)),t.handleInputChangeTime=t.handleInputChangeTime.bind((0,o.Z)(t)),t.handleSubmit=t.handleSubmit.bind((0,o.Z)(t)),t.handleReactSelectChange=t.handleReactSelectChange.bind((0,o.Z)(t)),t.toggleExtraConnections=t.toggleExtraConnections.bind((0,o.Z)(t)),t}return(0,i.Z)(I,[{key:"componentDidMount",value:function(){var e=this;(0,p.isEmpty)(this.props.params)||this.updateStateByChangeParams(this.props.params),g.Z.getContactsPeek().then((function(t){e.setState({contacts:t,peekLoading:K(K({},e.state.peekLoading),{},{contacts:!1})})})),x.Z.peekIntakes().then((function(t){e.setState({intakes:t,peekLoading:K(K({},e.state.peekLoading),{},{intakes:!1})})})),q.Z.peekContactGroups().then((function(t){e.setState({contactGroups:t,peekLoading:K(K({},e.state.peekLoading),{},{contactGroups:!1})})})),G.Z.peekOpportunities().then((function(t){e.setState({opportunities:t,peekLoading:K(K({},e.state.peekLoading),{},{opportunities:!1})})})),k.Z.peekCampaigns().then((function(t){e.setState({campaigns:t,peekLoading:K(K({},e.state.peekLoading),{},{campaigns:!1})})})),R.Z.peekHousingFiles().then((function(t){e.setState({housingFiles:t,peekLoading:K(K({},e.state.peekLoading),{},{housingFiles:!1})})})),B.Z.peekProjects().then((function(t){e.setState({projects:t,peekLoading:K(K({},e.state.peekLoading),{},{projects:!1})})})),H.Z.peekParticipantsProjects().then((function(t){e.setState({participants:t,peekLoading:K(K({},e.state.peekLoading),{},{participants:!1})})})),M.Z.peekOrders().then((function(t){e.setState({orders:t,peekLoading:K(K({},e.state.peekLoading),{},{orders:!1})})})),W.Z.peekInvoices().then((function(t){e.setState({invoices:t,peekLoading:K(K({},e.state.peekLoading),{},{invoices:!1})})}))}},{key:"componentWillReceiveProps",value:function(e){this.props.params.id===e.params.id&&this.props.params.type===e.params.type||this.updateStateByChangeParams(e.params)}},{key:"updateStateByChangeParams",value:function(e){if(!(0,p.isEmpty)(e)){var t=!1;if("afgehandeld"===e.closed&&(t=!0,this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t})}))),e.contactId&&e.projectId&&e.participantId)this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,contactId:Number(e.contactId),projectId:Number(e.projectId),participantId:Number(e.participantId)})}));else if(e.opportunityId&&e.intakeId&&e.campaignId&&e.contactId)this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,contactId:Number(e.contactId),intakeId:Number(e.intakeId),campaignId:Number(e.campaignId),opportunityId:Number(e.opportunityId)})}));else if(e.intakeId&&e.campaignId&&e.contactId)this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,contactId:Number(e.contactId),intakeId:Number(e.intakeId),campaignId:Number(e.campaignId)})}));else if(e.invoiceId&&e.orderId&&e.contactId)this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,contactId:Number(e.contactId),orderId:Number(e.orderId),invoiceId:Number(e.invoiceId)})}));else if(e.orderId&&e.contactId)this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,contactId:Number(e.contactId),orderId:Number(e.orderId)})}));else if(e.housingFileId&&e.contactId)this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,contactId:Number(e.contactId),housingFileId:Number(e.housingFileId)})}));else switch(e.type){case"campagne":this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,campaignId:Number(e.id)})}));break;case"contact":this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,contactId:Number(e.id)})}));break;case"contact-groep":this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,contactGroupId:Number(e.id)})}));break;case"project":this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},{finished:t,projectId:Number(e.id)})}))}}}},{key:"handleInputChange",value:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,s=t.name;this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},(0,n.Z)({},s,a))}))}},{key:"handleReactSelectChange",value:function(e,t){this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},(0,n.Z)({},t,e))}))}},{key:"handleInputChangeTime",value:function(e,t){this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},(0,n.Z)({},t,e))}))}},{key:"handleInputChangeDate",value:function(e,t){this.setState(K(K({},this.state),{},{task:K(K({},this.state.task),{},(0,n.Z)({},t,e))}))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state.task,a={},n=!1;u().isEmpty(t.note)&&(a.note=!0,n=!0),u().isEmpty(t.responsible)&&(a.responsible=!0,n=!0),t.responsible.search("user")>=0&&(t.responsibleUserId=t.responsible.replace("user",""),t.responsibleTeamId=""),t.responsible.search("team")>=0&&(t.responsibleUserId="",t.responsibleTeamId=t.responsible.replace("team","")),this.setState(K(K({},this.state),{},{errors:a})),!n&&b.Z.newTask(t).then((function(e){var t=e.data.data.id;m.nA.push("/taak/".concat(t))})).catch((function(e){console.log(e)}))}},{key:"toggleExtraConnections",value:function(){this.setState({showExtraConnections:!this.state.showExtraConnections})}},{key:"render",value:function(){return d.createElement("div",{className:"row"},d.createElement("div",{className:"col-md-9"},d.createElement("div",{className:"col-md-12"},d.createElement(F,{finished:this.state.task.finished})),d.createElement("div",{className:"col-md-12"},d.createElement(z.Z,null,d.createElement(D.Z,null,d.createElement("div",{className:"col-md-12"},d.createElement(A,{task:this.state.task,contacts:this.state.contacts,intakes:this.state.intakes,contactGroups:this.state.contactGroups,opportunities:this.state.opportunities,campaigns:this.state.campaigns,housingFiles:this.state.housingFiles,projects:this.state.projects,participants:this.state.participants,orders:this.state.orders,invoices:this.state.invoices,errors:this.state.errors,meDetails:this.props.meDetails,handleInputChange:this.handleInputChange,handleInputChangeDate:this.handleInputChangeDate,handleInputChangeTime:this.handleInputChangeTime,handleSubmit:this.handleSubmit,handleReactSelectChange:this.handleReactSelectChange,toggleExtraConnections:this.toggleExtraConnections,showExtraConnections:this.state.showExtraConnections,peekLoading:this.state.peekLoading})))))),d.createElement("div",{className:"col-md-3"}))}}]),I}(d.Component)},32042:(e,t)=>{t.z=void 0,t.z={viewBox:"0 0 1152 1792",children:[{name:"path",attribs:{d:"M1075 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"}}]}},96497:(e,t)=>{t.n=void 0,t.n={viewBox:"0 0 640 1792",children:[{name:"path",attribs:{d:"M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"}}]}}}]);