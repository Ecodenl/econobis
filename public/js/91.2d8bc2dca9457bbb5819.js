(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{1613:function(t,e,n){"use strict";n.r(e);var o=n(14),r=n.n(o),a=n(15),c=n.n(a),s=n(9),i=n.n(s),l=n(16),u=n.n(l),p=n(17),d=n.n(p),m=n(12),f=n.n(m),h=n(5),g=n.n(h),E=n(0),b=n.n(E),v=n(19),y=n(24),I=function(t){return{type:"FETCH_CONTACTS_IN_GROUP",contactGroup:t}},G=function(){return{type:"CLEAR_CONTACTS_IN_GROUP"}},w=n(985),C=n(142),O=n.n(C),D=n(228),T=n(229),N=n(289),R=n(161),P=function(t){return b.a.createElement("tr",{className:"thead-title-quaternary"},t.isUsedInLaposta?b.a.createElement(b.a.Fragment,null,b.a.createElement(R.a,{RowClassName:"hidden-xs",title:"#",width:"10%"}),b.a.createElement(R.a,{RowClassName:"hidden-xs hidden-sm",title:"Type",width:"10%"}),b.a.createElement(R.a,{sortColumn:"fullName",title:"Naam",width:"25%"}),b.a.createElement(R.a,{RowClassName:"hidden-xs",title:"E-mail",width:"25%"}),b.a.createElement(R.a,{RowClassName:"hidden-xs",title:"Laposta status",width:"10%"}),b.a.createElement(R.a,{RowClassName:"hidden-xs hidden-sm",title:"Toegevoegd aan groep op",width:"10%"}),b.a.createElement("th",{width:"10%"})):b.a.createElement(b.a.Fragment,null,b.a.createElement(R.a,{RowClassName:"hidden-xs",title:"#",width:"15%"}),b.a.createElement(R.a,{RowClassName:"hidden-xs hidden-sm",title:"Type",width:"15%"}),b.a.createElement(R.a,{sortColumn:"fullName",title:"Naam",width:"30%"}),b.a.createElement(R.a,{RowClassName:"hidden-xs",title:"E-mail",width:"30%"}),b.a.createElement(R.a,{RowClassName:"hidden-xs hidden-sm",title:"Toegevoegd aan groep op",width:"10%"}),b.a.createElement("th",{width:"10%"})))},A=n(4),S=n(7),k=n.n(S);function M(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=f()(t);if(e){var r=f()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return d()(this,n)}}var j=function(t){u()(n,t);var e=M(n);function n(t){var o;return r()(this,n),(o=e.call(this,t)).state={showActionButtons:!1,highlightRow:""},o}return c()(n,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(t){A.f.push("/contact/".concat(t))}},{key:"render",value:function(){var t=this,e=this.props,n=e.id,o=e.number,r=e.typeName,a=e.fullName,c=e.emailAddress,s=e.lapostaMemberId,i=e.lapostaMemberState,l=e.memberToGroupSince,u=e.permissions,p=e.isUsedInLaposta,d="";switch(i){case"active":d="Actief";break;case"unsubscribed":d="Uitgeschreven";break;case"unknown":d="Niet bekend in Laposta";break;case"inprogress":d="Wordt bijgewerkt";break;default:d=""}var m=!p||null!==s&&"unknown"!==i?null:"missing-data-row",f=!p||null!==s&&"unknown"!==i?"":"Koppeling niet gevonden in Laposta";return b.a.createElement("tr",{title:f,className:this.state.highlightRow+" "+m?m:"",onDoubleClick:function(){return t.openItem(n)},onMouseEnter:function(){return t.onRowEnter()},onMouseLeave:function(){return t.onRowLeave()}},b.a.createElement("td",{className:"hidden-xs"},o),b.a.createElement("td",{className:"hidden-xs hidden-sm"},r," "),b.a.createElement("td",null,a),b.a.createElement("td",{className:"hidden-xs"},c),p&&b.a.createElement("td",{className:"hidden-xs"},d),b.a.createElement("td",{className:"hidden-xs hidden-sm"},l?k()(l).format("DD-MM-Y"):""),b.a.createElement("td",null,this.state.showActionButtons&&u.updatePerson&&u.updateOrganisation&&(p&&null!==s||this.props.contactGroupType&&"static"===this.props.contactGroupType.id)?b.a.createElement("a",{role:"button",onClick:this.props.showEditItemModal.bind(this,n,c,l)},b.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):"",this.state.showActionButtons&&u.updatePerson&&u.updateOrganisation&&this.props.contactGroupType&&"static"===this.props.contactGroupType.id?b.a.createElement("a",{role:"button",onClick:this.props.showDeleteItemModal.bind(this,n,a)},b.a.createElement("span",{className:"glyphicon glyphicon-trash mybtn-danger"})," "):""))}}]),n}(E.Component),L=Object(v.b)((function(t){return{permissions:t.meDetails.permissions,contactGroupType:t.contactGroupDetails.type}}))(j),_=n(35),x=Object(v.b)(null,(function(t){return{deleteContactInGroup:function(e,n){t(function(t,e){return{type:"DELETE_CONTACT_IN_GROUP",contactGroup:t,id:e}}(e,n))}}}))((function(t){return b.a.createElement(_.a,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:t.closeDeleteItemModal,confirmAction:function(){return t.deleteContactInGroup(t.groupId,t.id),void t.closeDeleteItemModal()},title:"Verwijderen"},"Verwijder contact uit groep: ",b.a.createElement("strong",null," ",t.fullName," "))})),U=n(51),B=n(36);function z(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function V(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?z(Object(n),!0).forEach((function(e){g()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):z(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function H(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=f()(t);if(e){var r=f()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return d()(this,n)}}var Y=function(t){u()(n,t);var e=H(n);function n(t){var o;return r()(this,n),o=e.call(this,t),g()(i()(o),"handleChangeDate",(function(t){var e=t?k()(t).format("Y-MM-DD"):"";o.setState(V(V({},o.state),{},{memberToGroupSince:e}))})),o.state={memberToGroupSince:t.memberToGroupSince},o}return c()(n,[{key:"render",value:function(){var t=this;return b.a.createElement(_.a,{buttonConfirmText:"Opslaan",buttonClassName:"btn-danger",closeModal:this.props.closeEditItemModal,confirmAction:function(){return t.props.updateContactInGroup(t.props.groupId,t.props.id,{memberToGroupSince:t.state.memberToGroupSince}),void t.props.closeEditItemModal()},title:"Wijzigen"},b.a.createElement("div",{className:"row"},b.a.createElement(B.a,{label:"Contact email",divSize:"col-xs-12",name:"emailAddress",value:this.props.emailAddress,readOnly:!0})),b.a.createElement("div",{className:"row"},b.a.createElement(U.a,{label:"Wijzig datum toegevoegd aan groep op",divSize:"col-xs-12",name:"memberToGroupSince",value:this.props.memberToGroupSince,onChangeAction:this.handleChangeDate})),b.a.createElement("br",null))}}]),n}(b.a.Component),F=Object(v.b)(null,(function(t){return{updateContactInGroup:function(e,n,o){t(function(t,e,n){return{type:"UPDATE_CONTACT_IN_GROUP",contactGroup:t,id:e,memberToGroupSince:n}}(e,n,o))}}}))(Y);function W(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function K(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?W(Object(n),!0).forEach((function(e){g()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):W(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function J(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=f()(t);if(e){var r=f()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return d()(this,n)}}var X=function(t){u()(n,t);var e=J(n);function n(t){var o;return r()(this,n),o=e.call(this,t),g()(i()(o),"showDeleteItemModal",(function(t,e){o.setState(K(K({},o.state),{},{showDeleteItem:!0,deleteItem:K(K({},o.state.deleteItem),{},{id:t,fullName:e})}))})),g()(i()(o),"closeDeleteItemModal",(function(){o.setState(K(K({},o.state),{},{showDeleteItem:!1,deleteItem:K(K({},o.state.deleteItem),{},{id:"",fullName:""})}))})),g()(i()(o),"showEditItemModal",(function(t,e,n){o.setState(K(K({},o.state),{},{showEditItem:!0,editItem:K(K({},o.state.editItem),{},{id:t,emailAddress:e,memberToGroupSince:n})}))})),g()(i()(o),"closeEditItemModal",(function(){o.setState(K(K({},o.state),{},{showEditItem:!1,editItem:K(K({},o.state.editItem),{},{id:"",emailAddress:"",memberToGroupSince:""})}))})),o.state={showDeleteItem:!1,showEditItem:!1,deleteItem:{id:"",fullName:""},editItem:{id:"",emailAddress:"",memberToGroupSince:""}},o}return c()(n,[{key:"render",value:function(){var t=this,e="",n=!0;return this.props.hasError?e="Fout bij het ophalen van contact in groep.":this.props.isLoading?e="Gegevens aan het laden.":0===this.props.contactsInGroup.length?e="Geen contact in groep gevonden!":n=!1,b.a.createElement("div",null,b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-xs-12"},b.a.createElement("span",null,"Totaal leden in groep: ",b.a.createElement("strong",null,this.props.contactsInGroup.length)))),b.a.createElement("form",{onKeyUp:this.handleKeyUp},b.a.createElement(D.a,null,b.a.createElement(T.a,null,b.a.createElement(P,{showCheckbox:this.props.showCheckboxList,refreshContactsInGroupData:this.props.refreshContactsInGroupData,isUsedInLaposta:this.props.contactGroupDetails.isUsedInLaposta})),b.a.createElement(N.a,null,n?b.a.createElement("tr",null,b.a.createElement("td",{colSpan:10},e)):this.props.contactsInGroup.map((function(e){return console.log(e),b.a.createElement(L,O()({key:e.id},e,{showDeleteItemModal:t.showDeleteItemModal,showEditItemModal:t.showEditItemModal,groupId:t.props.groupId,isUsedInLaposta:t.props.contactGroupDetails.isUsedInLaposta}))}))))),this.state.showDeleteItem&&b.a.createElement(x,O()({closeDeleteItemModal:this.closeDeleteItemModal,groupId:this.props.groupId},this.state.deleteItem)),this.state.showEditItem&&b.a.createElement(F,O()({closeEditItemModal:this.closeEditItemModal,groupId:this.props.groupId},this.state.editItem,{refreshContactsInGroupData:this.props.refreshContactsInGroupData})))}}]),n}(E.Component),q=Object(v.b)((function(t){return{isLoading:t.loadingData.isLoading,hasError:t.loadingData.hasError,contactGroupDetails:t.contactGroupDetails}}))(X),Q=n(165),Z=n(290);function $(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function tt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?$(Object(n),!0).forEach((function(e){g()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function et(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=f()(t);if(e){var r=f()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return d()(this,n)}}var nt=function(t){u()(n,t);var e=et(n);function n(t){var o;return r()(this,n),(o=e.call(this,t)).state={people:[],personId:"",peekLoading:{people:!0}},o.handleReactSelectChange=o.handleReactSelectChange.bind(i()(o)),o}return c()(n,[{key:"componentDidMount",value:function(){var t=this;Q.a.getPerson().then((function(e){t.setState(tt(tt({},t.state),{},{people:e,peekLoading:tt(tt({},t.state.peekLoading),{},{people:!1})}))}))}},{key:"handleReactSelectChange",value:function(t){this.setState(tt(tt({},this.state),{},{personId:t}))}},{key:"render",value:function(){var t=this;return b.a.createElement(_.a,{buttonConfirmText:"Toevoegen",closeModal:this.props.closeModalAddToGroup,confirmAction:function(){return t.props.addPersonToGroup(t.state.personId)},title:"Contact toevoegen aan groep: ".concat(this.props.groupName)},this.props.sendEmailNewContactLink?b.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Na toevoegen zal er automatisch een email verzonden worden naar dit contact."):null,b.a.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},b.a.createElement("div",{className:"row"},b.a.createElement(Z.a,{label:"Voeg bestaand contact toe",divSize:"col-sm-12",size:"col-sm-6",id:"personId",name:"personId",value:this.state.personId,onChangeAction:this.handleReactSelectChange,options:this.state.people,optionId:"id",optionName:"fullName",isLoading:this.state.peekLoading.people}))))}}]),n}(E.Component),ot=Object(v.b)((function(t){return{id:t.contactDetails.id}}),(function(t){return{fetchContactDetails:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(e){t(fetchContactDetails(e))}))}}))(nt),rt=n(58),at=n(50),ct=n(162),st=n.n(ct),it=n(130);function lt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=f()(t);if(e){var r=f()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return d()(this,n)}}var ut=function(t){u()(n,t);var e=lt(n);function n(t){var o;return r()(this,n),o=e.call(this,t),g()(i()(o),"closeModalAddToGroup",(function(){o.setState({showModalAddToGroup:!1})})),g()(i()(o),"addPersonToGroup",(function(t){var e={groupId:o.props.groupId,contactId:t};rt.a.addContactToGroup(e).then((function(t){o.setState({showModalAddToGroup:!1}),o.props.refreshContactsInGroupData()}))})),g()(i()(o),"toggleModalAddToGroup",(function(){o.setState({showModalAddToGroup:!o.state.showModalAddToGroup})})),g()(i()(o),"sendEmail",(function(){A.f.push("/email/nieuw/groep/".concat(o.props.groupId,"/to"))})),g()(i()(o),"newContact",(function(){A.f.push("/contact/nieuw")})),g()(i()(o),"getCSV",(function(){o.props.blockUI(),rt.a.getCsv(o.props.groupId).then((function(t){st()(t.data,"Groep-"+o.props.contactGroupDetails.name.substring(0,20)+"-"+k()().format("YYYY-MM-DD HH:mm:ss")+".csv"),o.props.unblockUI()})).catch((function(t){o.props.unblockUI()}))})),o.state={showModalAddToGroup:!1,showModalEmail:!1},o}return c()(n,[{key:"openGroupDetails",value:function(){A.f.push("/contact-groep/".concat(this.props.groupId))}},{key:"render",value:function(){var t=this,e=this.props,n=e.permissions,o=e.contactGroupDetails;return b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"col-md-4"},b.a.createElement("div",{className:"btn-group",role:"group"},b.a.createElement(at.a,{iconName:"glyphicon-refresh",onClickAction:this.props.refreshContactsInGroupData}),n.updatePerson&&n.updateOrganisation&&o.type&&"static"===o.type.id&&b.a.createElement("div",{className:"nav navbar-nav btn-group"},b.a.createElement("button",{onClick:this.toggleModalAddToGroup,className:"btn btn-success btn-sm"},b.a.createElement("span",{className:"glyphicon glyphicon-plus"}))),b.a.createElement(at.a,{iconName:"glyphicon-download-alt",onClickAction:this.getCSV}),b.a.createElement(at.a,{iconName:"glyphicon-envelope",onClickAction:this.sendEmail}))),b.a.createElement("div",{className:"col-md-4"},b.a.createElement("h3",{className:"text-center table-title",onClick:function(){return t.openGroupDetails()},role:"button"},"Contacten in groep: ",o.name)),b.a.createElement("div",{className:"col-md-4"}),this.state.showModalAddToGroup&&b.a.createElement(ot,{closeModalAddToGroup:this.closeModalAddToGroup,addPersonToGroup:this.addPersonToGroup,groupName:o.name,sendEmailNewContactLink:o.sendEmailNewContactLink}))}}]),n}(E.Component),pt=Object(v.b)((function(t){return{permissions:t.meDetails.permissions,contactGroupDetails:t.contactGroupDetails}}),(function(t){return Object(y.b)({blockUI:it.a,unblockUI:it.b},t)}))(ut);function dt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=f()(t);if(e){var r=f()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return d()(this,n)}}var mt=function(t){u()(n,t);var e=dt(n);function n(t){var o;return r()(this,n),o=e.call(this,t),g()(i()(o),"refreshContactsInGroupData",(function(){o.props.clearContactsInGroup(),o.props.fetchContactsInGroup(o.props.params.contactGroup)})),o}return c()(n,[{key:"componentDidMount",value:function(){this.props.fetchContactsInGroup(this.props.params.contactGroup),this.props.fetchContactGroupDetails(this.props.params.contactGroup)}},{key:"componentWillUnmount",value:function(){this.props.clearContactsInGroup(),this.props.clearContactGroupDetails()}},{key:"render",value:function(){return b.a.createElement("div",null,b.a.createElement("div",{className:"panel panel-default"},b.a.createElement("div",{className:"panel-body"},b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement(pt,{refreshContactsInGroupData:this.refreshContactsInGroupData,groupId:this.props.params.contactGroup})),b.a.createElement("div",{className:"col-md-12 margin-10-top"},b.a.createElement(q,{contactsInGroup:this.props.contactsInGroup,groupId:this.props.params.contactGroup,refreshContactsInGroupData:this.refreshContactsInGroupData})))))}}]),n}(E.Component);e.default=Object(v.b)((function(t){return{contactsInGroup:t.contactsInGroup}}),(function(t){return Object(y.b)({fetchContactsInGroup:I,clearContactsInGroup:G,fetchContactGroupDetails:w.g,clearContactGroupDetails:w.c},t)}))(mt)},985:function(t,e,n){"use strict";n.d(e,"g",(function(){return o})),n.d(e,"h",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"f",(function(){return c})),n.d(e,"b",(function(){return s})),n.d(e,"e",(function(){return i})),n.d(e,"a",(function(){return l})),n.d(e,"i",(function(){return u})),n.d(e,"d",(function(){return p}));var o=function(t){return{type:"FETCH_CONTACT_GROUP_DETAILS",id:t}},r=function(t){return{type:"UPDATE_CONTACT_GROUP_DETAILS",contactGroupDetails:t}},a=function(){return{type:"CLEAR_CONTACT_GROUP_DETAILS"}},c=function(t,e){return{type:"DELETE_COMPOSED_GROUP",contactGroupId:t,contactGroupToDetachId:e}},s=function(t,e){return{type:"ATTACH_COMPOSED_GROUP",contactGroupId:t,contactGroupToAttachId:e}},i=function(t,e){return{type:"DELETE_COMPOSED_EXCEPT_GROUP",contactGroupId:t,contactGroupToDetachId:e}},l=function(t,e){return{type:"ATTACH_COMPOSED_EXCEPT_GROUP",contactGroupId:t,contactGroupToAttachId:e}},u=function(t){return{type:"UPDATE_LAPOSTA_LIST_ID",lapostaListId:t}},p=function(t){return{type:"DEACTIVATE_LAPOSTA_LIST_ID",lapostaListId:t}}}}]);