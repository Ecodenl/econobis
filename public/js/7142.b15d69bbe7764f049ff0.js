"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[7142],{64872:(e,t,n)=>{n.d(t,{Go:()=>s,Tu:()=>a,Wl:()=>l,eM:()=>r,fs:()=>o,nj:()=>i,o8:()=>u,vA:()=>c});var r=function(e){return{type:"FETCH_TEAM_DETAILS",id:e}},o=function(e,t){return{type:"UPDATE_TEAM",team:e,switchToView:t}},a=function(e){return{type:"NEW_TEAM_USER",teamUser:e}},c=function(e,t){return{type:"DELETE_TEAM_USER",teamId:e,userId:t}},i=function(e){return{type:"NEW_TEAM_CONTACT_GROUP",teamContactGroup:e}},s=function(e,t){return{type:"DELETE_TEAM_CONTACT_GROUP",teamId:e,contactGroupId:t}},l=function(e){return{type:"NEW_TEAM_DOCUMENT_CREATED_FROM",teamDocumentCreatedFrom:e}},u=function(e,t){return{type:"DELETE_TEAM_DOCUMENT_CREATED_FROM",teamId:e,documentCreatedFromId:t}}},36283:(e,t,n)=>{n.d(t,{TD:()=>o,ZZ:()=>r,fC:()=>a});var r=function(){return{type:"FETCH_TEAMS"}},o=function(){return{type:"CLEAR_TEAMS"}},a=function(e){return{type:"DELETE_TEAM",id:e}}},57142:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Ne});var r=n(15671),o=n(43144),a=n(60136),c=n(82963),i=n(61120),s=n(67294),l=n(37974),u=n(64872),m=n(97326),f=n(4942),h=n(61409),d=n(55451),p=n(41355),v=n(36283);const g=(0,l.$j)(null,(function(e){return{deleteTeam:function(t){e((0,v.fC)(t))}}}))((function(e){return s.createElement(p.Z,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:e.closeDeleteItemModal,confirmAction:function(){return e.deleteTeam(e.id),e.closeDeleteItemModal(),void h.nA.push("/teams")},title:"Verwijderen"},"Verwijder team: ",s.createElement("strong",null," ",e.name," "))}));var E=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),t=l.call(this,e),(0,f.Z)((0,m.Z)(t),"toggleDelete",(function(){t.setState({showDelete:!t.state.showDelete})})),t.state={showDelete:!1},t}return(0,o.Z)(u,[{key:"render",value:function(){return s.createElement("div",{className:"row"},s.createElement("div",{className:"col-md-4"},s.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},s.createElement(d.Z,{iconName:"arrowLeft",onClickAction:h.mW.goBack}),s.createElement(d.Z,{iconName:"trash",onClickAction:this.toggleDelete}))),s.createElement("div",{className:"col-md-4"},s.createElement("h4",{className:"text-center"},"Team: ",this.props.name)),s.createElement("div",{className:"col-md-4"}),this.state.showDelete&&s.createElement(g,{closeDeleteItemModal:this.toggleDelete,name:this.props.name,id:this.props.id}))}}]),u}(s.Component);const y=(0,l.$j)((function(e){return{name:e.teamDetails.name,id:e.teamDetails.id}}),null)(E);var Z=n(96486),w=n(48966),b=n.n(w),D=n(26691),N=n(9181),C=n(49332),O=n(14309),T=n(98688);function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){(0,f.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var k=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),(t=l.call(this,e)).state={team:e.teamDetails,errors:{name:!1}},t.handleInputChange=t.handleInputChange.bind((0,m.Z)(t)),t.handleSubmit=t.handleSubmit.bind((0,m.Z)(t)),t}return(0,o.Z)(u,[{key:"handleInputChange",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,r=t.name;this.setState(j(j({},this.state),{},{team:j(j({},this.state.team),{},(0,f.Z)({},r,n))}))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state.team,n={},r=!1;b().isEmpty(t.name)&&(n.name=!0,r=!0),this.setState(j(j({},this.state),{},{errors:n})),!r&&this.props.updateTeam(t,this.props.switchToView)}},{key:"render",value:function(){var e=this.state.team.name;return s.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},s.createElement(O.Z,null,s.createElement(T.Z,null,s.createElement("div",{className:"row"},s.createElement(N.Z,{label:"Naam",name:"name",value:e,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.name}))),s.createElement(T.Z,null,s.createElement("div",{className:"pull-right btn-group",role:"group"},s.createElement(C.Z,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:this.props.switchToView}),s.createElement(C.Z,{buttonText:"Opslaan",onClickAction:this.handleSubmit,type:"submit",value:"Submit"})))))}}]),u}(s.Component);const R=(0,l.$j)((function(e){return{teamDetails:e.teamDetails}}),(function(e){return{updateTeam:function(t,n){e((0,u.fs)(t,n))}}}))(k);var I=n(7250);const L=(0,l.$j)((function(e){return{teamDetails:e.teamDetails}}))((function(e){var t=e.teamDetails.name;return s.createElement("div",{onClick:e.switchToEdit},s.createElement(O.Z,null,s.createElement(T.Z,null,s.createElement("div",{className:"row"},s.createElement(I.Z,{label:"Naam",value:t})))))}));var A=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),t=l.call(this,e),(0,f.Z)((0,m.Z)(t),"switchToEdit",(function(){t.setState({showEdit:!0})})),(0,f.Z)((0,m.Z)(t),"switchToView",(function(){t.setState({showEdit:!1,activeDiv:""})})),t.state={showEdit:!1,activeDiv:""},t}return(0,o.Z)(u,[{key:"onDivEnter",value:function(){this.setState({activeDiv:"panel-grey"})}},{key:"onDivLeave",value:function(){this.state.showEdit||this.setState({activeDiv:""})}},{key:"render",value:function(){var e=this,t=this.props.meDetails.permissions,n=void 0===t?{}:t;return s.createElement("div",{className:this.state.activeDiv,onMouseEnter:function(){return e.onDivEnter()},onMouseLeave:function(){return e.onDivLeave()}},this.state.showEdit&&n.createTeam?s.createElement(R,{switchToView:this.switchToView}):s.createElement(L,{switchToEdit:this.switchToEdit}))}}]),u}(s.Component);const P=(0,l.$j)((function(e){return{teamDetails:e.teamDetails,meDetails:e.meDetails,permissions:e.meDetails.permissions}}))(A);n(30381);var G=n(97894),B=n(77320);const F=(0,l.$j)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var t=e.user,n=(t.id,t.fullName);return s.createElement("div",{className:"row border ".concat(e.highlightLine),onMouseEnter:function(){return e.onLineEnter()},onMouseLeave:function(){return e.onLineLeave()}},s.createElement("div",{className:"col-sm-11"},n),s.createElement("div",{className:"col-sm-1"},e.showActionButtons&&e.permissions.createTeam?s.createElement("a",{role:"button",onClick:e.toggleDelete},s.createElement(G.ZP,{className:"mybtn-danger",size:14,icon:B._})):""))})),M=(0,l.$j)((function(e){return{teamId:e.teamDetails.id}}),(function(e){return{deleteTeamUser:function(t,n){e((0,u.vA)(t,n))}}}))((function(e){return s.createElement(p.Z,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:e.toggleDelete,confirmAction:function(){return e.deleteTeamUser(e.teamId,e.userId),void e.toggleDelete()},title:"Verwijderen"},s.createElement("p",null,"Wil je deze gebruiker ontkoppelen van dit team?"))}));var x=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),t=l.call(this,e),(0,f.Z)((0,m.Z)(t),"onLineEnter",(function(){t.setState({showActionButtons:!0,highlightLine:"highlight-line"})})),(0,f.Z)((0,m.Z)(t),"onLineLeave",(function(){t.setState({showActionButtons:!1,highlightLine:""})})),(0,f.Z)((0,m.Z)(t),"toggleDelete",(function(){t.setState({showDelete:!t.state.showDelete})})),t.state={showActionButtons:!1,highlightLine:"",showDelete:!1,user:e.user},t}return(0,o.Z)(u,[{key:"render",value:function(){return s.createElement("div",null,s.createElement(F,{highlightLine:this.state.highlightLine,showActionButtons:this.state.showActionButtons,onLineEnter:this.onLineEnter,onLineLeave:this.onLineLeave,toggleDelete:this.toggleDelete,user:this.state.user}),this.state.showDelete&&this.props.permissions.createTeam&&s.createElement(M,{toggleDelete:this.toggleDelete,userId:this.state.user.id}))}}]),u}(s.Component);const _=(0,l.$j)((function(e){return{permissions:e.meDetails.permissions}}))(x),$=(0,l.$j)((function(e){return{users:e.teamDetails.users}}))((function(e){return s.createElement("div",null,s.createElement("div",{className:"row border header"},s.createElement("div",{className:"col-sm-11"},"Naam"),s.createElement("div",{className:"col-sm-1"})),e.users.length>0?e.users.map((function(e){return s.createElement(_,{key:e.id,user:e})})):s.createElement("div",null,"Geen gebruikers gekoppeld."))}));var z=n(71840);function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function U(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?V(Object(n),!0).forEach((function(t){(0,f.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var W=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),(t=l.call(this,e)).state={userId:"",errors:{userId:!1,hasErrors:!0}},t.handleInputChange=t.handleInputChange.bind((0,m.Z)(t)),t.handleSubmit=t.handleSubmit.bind((0,m.Z)(t)),t}return(0,o.Z)(u,[{key:"handleInputChange",value:function(e){var t=e.target.value;this.setState({userId:t})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n={teamId:this.props.teamId,userId:this.state.userId},r={},o=!1;b().isEmpty(n.userId)&&(r.userId=!0,o=!0),this.setState(U(U({},this.state),{},{errors:r})),o||D.Z.newTeamUser(n).then((function(e){t.props.newTeamUser(e.data.data),t.props.toggleShowNew()})).catch((function(e){console.log(e.response)}))}},{key:"render",value:function(){return s.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},s.createElement(O.Z,{className:"panel-grey"},s.createElement(T.Z,null,s.createElement("div",{className:"row"},s.createElement(N.Z,{label:"Team",name:"team",value:this.props.teamName,readOnly:!0}),s.createElement(z.Z,{label:"Gebruiker",size:"col-sm-6",name:"userId",options:this.props.users,optionName:"fullName",value:this.state.userId,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.userId})),s.createElement("div",{className:"pull-right btn-group",role:"group"},s.createElement(C.Z,{buttonClassName:"btn-default",buttonText:"Annuleren",onClickAction:this.props.toggleShowNew}),s.createElement(C.Z,{buttonText:"Opslaan",onClickAction:this.handleSubmit,type:"submit",value:"Submit"})))))}}]),u}(s.Component);const q=(0,l.$j)((function(e){return{teamId:e.teamDetails.id,teamName:e.teamDetails.name,users:e.systemData.users}}),(function(e){return{newTeamUser:function(t){e((0,u.Tu)(t))}}}))(W);var H=n(80720),J=n(10055);var K=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),t=l.call(this,e),(0,f.Z)((0,m.Z)(t),"toggleShowNew",(function(){t.setState({showNew:!t.state.showNew})})),t.state={showNew:!1},t}return(0,o.Z)(u,[{key:"render",value:function(){return s.createElement(O.Z,null,s.createElement(H.Z,null,s.createElement("span",{className:"h5 text-bold"},"Gekoppelde gebruikers"),this.props.permissions.createTeam&&s.createElement("a",{role:"button",className:"pull-right",onClick:this.toggleShowNew},s.createElement(G.ZP,{size:14,icon:J.P}))),s.createElement(T.Z,null,s.createElement("div",{className:"col-md-12"},s.createElement($,null)),s.createElement("div",{className:"col-md-12 margin-10-top"},this.state.showNew&&s.createElement(q,{toggleShowNew:this.toggleShowNew}))))}}]),u}(s.Component);const Q=(0,l.$j)((function(e){return{permissions:e.meDetails.permissions}}))(K),X=(0,l.$j)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var t=e.contactGroup,n=(t.id,t.name);return s.createElement("div",{className:"row border ".concat(e.highlightLine),onMouseEnter:function(){return e.onLineEnter()},onMouseLeave:function(){return e.onLineLeave()}},s.createElement("div",{className:"col-sm-11"},n),s.createElement("div",{className:"col-sm-1"},e.showActionButtons&&e.permissions.createTeam?s.createElement("a",{role:"button",onClick:e.toggleDelete},s.createElement(G.ZP,{className:"mybtn-danger",size:14,icon:B._})):""))})),Y=(0,l.$j)((function(e){return{teamId:e.teamDetails.id}}),(function(e){return{deleteTeamContactGroup:function(t,n){e((0,u.Go)(t,n))}}}))((function(e){return s.createElement(p.Z,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:e.toggleDelete,confirmAction:function(){return e.deleteTeamContactGroup(e.teamId,e.contactGroupId),void e.toggleDelete()},title:"Verwijderen"},s.createElement("p",null,"Wil je deze groep ontkoppelen van dit team?"))}));var ee=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),t=l.call(this,e),(0,f.Z)((0,m.Z)(t),"onLineEnter",(function(){t.setState({showActionButtons:!0,highlightLine:"highlight-line"})})),(0,f.Z)((0,m.Z)(t),"onLineLeave",(function(){t.setState({showActionButtons:!1,highlightLine:""})})),(0,f.Z)((0,m.Z)(t),"toggleDelete",(function(){t.setState({showDelete:!t.state.showDelete})})),t.state={showActionButtons:!1,highlightLine:"",showDelete:!1,contactGroup:e.contactGroup},t}return(0,o.Z)(u,[{key:"render",value:function(){return s.createElement("div",null,s.createElement(X,{highlightLine:this.state.highlightLine,showActionButtons:this.state.showActionButtons,onLineEnter:this.onLineEnter,onLineLeave:this.onLineLeave,toggleDelete:this.toggleDelete,contactGroup:this.state.contactGroup}),this.state.showDelete&&this.props.permissions.createTeam&&s.createElement(Y,{toggleDelete:this.toggleDelete,contactGroupId:this.state.contactGroup.id}))}}]),u}(s.Component);const te=(0,l.$j)((function(e){return{permissions:e.meDetails.permissions}}))(ee),ne=(0,l.$j)((function(e){return{contactGroups:e.teamDetails.contactGroups}}))((function(e){return s.createElement("div",null,s.createElement("div",{className:"row border header"},s.createElement("div",{className:"col-sm-11"},"Groep naam"),s.createElement("div",{className:"col-sm-1"})),e.contactGroups&&e.contactGroups.length>0?e.contactGroups.map((function(e){return s.createElement(te,{key:e.id,contactGroup:e})})):s.createElement("div",null,"Geen groepen gekoppeld. Gebruikers van dit team geautoriseerd voor alle contacten!"))}));var re=n(60813);function oe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ae(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(n),!0).forEach((function(t){(0,f.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):oe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ce=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),(t=l.call(this,e)).state={contactGroupId:"",contactGroupsToSelect:[],errors:{contactGroupId:!1,hasErrors:!0}},t.handleInputChange=t.handleInputChange.bind((0,m.Z)(t)),t.handleSubmit=t.handleSubmit.bind((0,m.Z)(t)),t}return(0,o.Z)(u,[{key:"handleInputChange",value:function(e){var t=e.target.value;this.setState({contactGroupId:t})}},{key:"componentDidMount",value:function(){var e=this;re.Z.peekContactGroups().then((function(t){e.setState({contactGroupsToSelect:t})}))}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n={teamId:this.props.teamId,contactGroupId:this.state.contactGroupId},r={},o=!1;b().isEmpty(n.contactGroupId)&&(r.contactGroupId=!0,o=!0),this.setState(ae(ae({},this.state),{},{errors:r})),o||D.Z.newTeamContactGroup(n).then((function(e){t.props.newTeamContactGroup(e.data.data),t.props.toggleShowNew()})).catch((function(e){console.log(e.response)}))}},{key:"render",value:function(){return s.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},s.createElement(O.Z,{className:"panel-grey"},s.createElement(T.Z,null,s.createElement("div",{className:"row"},s.createElement(N.Z,{label:"Team",name:"team",value:this.props.teamName,readOnly:!0}),s.createElement(z.Z,{label:"Groep",size:"col-sm-6",name:"contactGroupId",options:this.state.contactGroupsToSelect,optionName:"name",value:this.state.contactGroupId,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.contactGroupId})),s.createElement("div",{className:"pull-right btn-group",role:"group"},s.createElement(C.Z,{buttonClassName:"btn-default",buttonText:"Annuleren",onClickAction:this.props.toggleShowNew}),s.createElement(C.Z,{buttonText:"Opslaan",onClickAction:this.handleSubmit,type:"submit",value:"Submit"})))))}}]),u}(s.Component);const ie=(0,l.$j)((function(e){return{teamId:e.teamDetails.id,teamName:e.teamDetails.name}}),(function(e){return{newTeamContactGroup:function(t){e((0,u.nj)(t))}}}))(ce);var se=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),t=l.call(this,e),(0,f.Z)((0,m.Z)(t),"toggleShowNew",(function(){t.setState({showNew:!t.state.showNew})})),t.state={showNew:!1},t}return(0,o.Z)(u,[{key:"render",value:function(){return s.createElement(O.Z,null,s.createElement(H.Z,null,s.createElement("span",{className:"h5 text-bold"},"Gekoppelde groepen"),this.props.permissions.createTeam&&s.createElement("a",{role:"button",className:"pull-right",onClick:this.toggleShowNew},s.createElement(G.ZP,{size:14,icon:J.P}))),s.createElement(T.Z,null,s.createElement("div",{className:"col-md-12"},s.createElement(ne,null)),s.createElement("div",{className:"col-md-12 margin-10-top"},this.state.showNew&&s.createElement(ie,{toggleShowNew:this.toggleShowNew}))))}}]),u}(s.Component);const le=(0,l.$j)((function(e){return{permissions:e.meDetails.permissions}}))(se);function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function me(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ue(Object(n),!0).forEach((function(t){(0,f.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var fe=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),(t=l.call(this,e)).state={documentCreatedFromId:"",errors:{documentCreatedFromId:!1,hasErrors:!0}},t.handleInputChange=t.handleInputChange.bind((0,m.Z)(t)),t.handleSubmit=t.handleSubmit.bind((0,m.Z)(t)),t}return(0,o.Z)(u,[{key:"handleInputChange",value:function(e){var t=e.target.value;this.setState({documentCreatedFromId:t})}},{key:"componentDidMount",value:function(){}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n={teamId:this.props.teamId,documentCreatedFromId:this.state.documentCreatedFromId},r={},o=!1;b().isEmpty(n.documentCreatedFromId)&&(r.documentCreatedFromId=!0,o=!0),this.setState(me(me({},this.state),{},{errors:r})),o||D.Z.newTeamDocumentCreatedFrom(n).then((function(e){t.props.newTeamDocumentCreatedFrom(e.data.data),t.props.toggleShowNew()})).catch((function(e){console.log(e.response)}))}},{key:"render",value:function(){return s.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},s.createElement(O.Z,{className:"panel-grey"},s.createElement(T.Z,null,s.createElement("div",{className:"row"},s.createElement(N.Z,{label:"Team",name:"team",value:this.props.teamName,readOnly:!0}),s.createElement(z.Z,{label:"Groep",size:"col-sm-6",name:"documentCreatedFromId",options:this.props.documentCreatedFroms,optionName:"name",value:this.state.documentCreatedFromId,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.documentCreatedFromId})),s.createElement("div",{className:"pull-right btn-group",role:"group"},s.createElement(C.Z,{buttonClassName:"btn-default",buttonText:"Annuleren",onClickAction:this.props.toggleShowNew}),s.createElement(C.Z,{buttonText:"Opslaan",onClickAction:this.handleSubmit,type:"submit",value:"Submit"})))))}}]),u}(s.Component);const he=(0,l.$j)((function(e){return{teamId:e.teamDetails.id,teamName:e.teamDetails.name,documentCreatedFroms:e.systemData.documentCreatedFroms}}),(function(e){return{newTeamDocumentCreatedFrom:function(t){e((0,u.Wl)(t))}}}))(fe),de=(0,l.$j)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var t=e.documentCreatedFrom,n=(t.id,t.name);return s.createElement("div",{className:"row border ".concat(e.highlightLine),onMouseEnter:function(){return e.onLineEnter()},onMouseLeave:function(){return e.onLineLeave()}},s.createElement("div",{className:"col-sm-11"},n),s.createElement("div",{className:"col-sm-1"},e.showActionButtons&&e.permissions.createTeam?s.createElement("a",{role:"button",onClick:e.toggleDelete},s.createElement(G.ZP,{className:"mybtn-danger",size:14,icon:B._})):""))})),pe=(0,l.$j)((function(e){return{teamId:e.teamDetails.id}}),(function(e){return{deleteTeamDocumentCreatedFrom:function(t,n){e((0,u.o8)(t,n))}}}))((function(e){return s.createElement(p.Z,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:e.toggleDelete,confirmAction:function(){return e.deleteTeamDocumentCreatedFrom(e.teamId,e.documentCreatedFromId),void e.toggleDelete()},title:"Verwijderen"},s.createElement("p",null,"Wil je dit document gemaakt vanuit ontkoppelen van dit team?"))}));var ve=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),t=l.call(this,e),(0,f.Z)((0,m.Z)(t),"onLineEnter",(function(){t.setState({showActionButtons:!0,highlightLine:"highlight-line"})})),(0,f.Z)((0,m.Z)(t),"onLineLeave",(function(){t.setState({showActionButtons:!1,highlightLine:""})})),(0,f.Z)((0,m.Z)(t),"toggleDelete",(function(){t.setState({showDelete:!t.state.showDelete})})),t.state={showActionButtons:!1,highlightLine:"",showDelete:!1,documentCreatedFrom:e.documentCreatedFrom},t}return(0,o.Z)(u,[{key:"render",value:function(){return s.createElement("div",null,s.createElement(de,{highlightLine:this.state.highlightLine,showActionButtons:this.state.showActionButtons,onLineEnter:this.onLineEnter,onLineLeave:this.onLineLeave,toggleDelete:this.toggleDelete,documentCreatedFrom:this.state.documentCreatedFrom}),this.state.showDelete&&this.props.permissions.createTeam&&s.createElement(pe,{toggleDelete:this.toggleDelete,documentCreatedFromId:this.state.documentCreatedFrom.id}))}}]),u}(s.Component);const ge=(0,l.$j)((function(e){return{permissions:e.meDetails.permissions}}))(ve),Ee=(0,l.$j)((function(e){return{documentCreatedFroms:e.teamDetails.documentCreatedFroms}}))((function(e){return s.createElement("div",null,s.createElement("div",{className:"row border header"},s.createElement("div",{className:"col-sm-11"},"Document gemaakt vanuit"),s.createElement("div",{className:"col-sm-1"})),e.documentCreatedFroms&&e.documentCreatedFroms.length>0?e.documentCreatedFroms.map((function(e){return s.createElement(ge,{key:e.id,documentCreatedFrom:e})})):s.createElement("div",null,"Geen documenten gemaakt vanuit gekoppeld. Gebruikers van dit team geautoriseerd voor alle documenten gemaakt vanuit!"))}));var ye=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,r.Z)(this,u),t=l.call(this,e),(0,f.Z)((0,m.Z)(t),"toggleShowNew",(function(){t.setState({showNew:!t.state.showNew})})),t.state={showNew:!1},t}return(0,o.Z)(u,[{key:"render",value:function(){return s.createElement(O.Z,null,s.createElement(H.Z,null,s.createElement("span",{className:"h5 text-bold"},"Gekoppelde documenten gemaakt vanuit"),this.props.permissions.createTeam&&s.createElement("a",{role:"button",className:"pull-right",onClick:this.toggleShowNew},s.createElement(G.ZP,{size:14,icon:J.P}))),s.createElement(T.Z,null,s.createElement("div",{className:"col-md-12"},s.createElement(Ee,null)),s.createElement("div",{className:"col-md-12 margin-10-top"},this.state.showNew&&s.createElement(he,{toggleShowNew:this.toggleShowNew}))))}}]),u}(s.Component);const Ze=(0,l.$j)((function(e){return{permissions:e.meDetails.permissions}}))(ye);var we=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){return(0,r.Z)(this,u),l.call(this,e)}return(0,o.Z)(u,[{key:"render",value:function(){var e="",t=!0;return this.props.hasError?e="Fout bij het ophalen van team.":this.props.isLoading?e="Gegevens aan het laden.":(0,Z.isEmpty)(this.props.teamDetails)?e="Geen team gevonden!":t=!1,t?s.createElement("div",null,e):s.createElement("div",null,s.createElement(P,null),s.createElement(Q,null),s.createElement(le,null),s.createElement(Ze,null))}}]),u}(s.Component);const be=(0,l.$j)((function(e){return{teamDetails:e.teamDetails,isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}),(function(e){return{fetchTeamDetails:function(t){e((0,u.eM)(t))}}}))(we);var De=function(e){(0,a.Z)(u,e);var t,n,l=(t=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){return(0,r.Z)(this,u),l.call(this,e)}return(0,o.Z)(u,[{key:"componentDidMount",value:function(){this.props.fetchTeamDetails(this.props.params.id)}},{key:"render",value:function(){return s.createElement("div",{className:"row"},s.createElement("div",{className:"col-md-9"},s.createElement("div",{className:"col-md-12 margin-10-top"},s.createElement(O.Z,null,s.createElement(T.Z,{className:"panel-small"},s.createElement(y,null)))),s.createElement("div",{className:"col-md-12 margin-10-top"},s.createElement(be,null))),s.createElement("div",{className:"col-md-3"}))}}]),u}(s.Component);const Ne=(0,l.$j)((function(e){return{teamDetails:e.teamDetails}}),(function(e){return{fetchTeamDetails:function(t){e((0,u.eM)(t))}}}))(De)}}]);