(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{1513:function(e,t,n){"use strict";n.r(t);var a=n(24),r=n.n(a),o=n(25),s=n.n(o),i=n(22),c=n.n(i),l=n(26),u=n.n(l),p=n(27),d=n.n(p),m=n(16),f=n.n(m),h=n(6),g=n.n(h),b=n(0),v=n.n(b),y=n(31),E=n(14),C=function(e){return{type:"FETCH_CONTACTS_IN_GROUP",contactGroup:e}},w=function(){return{type:"CLEAR_CONTACTS_IN_GROUP"}},I=n(785),D=n(200),N=n.n(D),O=n(148),G=n(149),T=n(201),R=n(102),A=function(e){return v.a.createElement("tr",{className:"thead-title-quaternary"},e.isUsedInLaposta?v.a.createElement(v.a.Fragment,null,v.a.createElement(R.a,{RowClassName:"hidden-xs",title:"#",width:"10%"}),v.a.createElement(R.a,{RowClassName:"hidden-xs hidden-sm",title:"Type",width:"10%"}),v.a.createElement(R.a,{sortColumn:"fullName",title:"Naam",width:"25%"}),v.a.createElement(R.a,{RowClassName:"hidden-xs",title:"E-mail",width:"25%"}),v.a.createElement(R.a,{RowClassName:"hidden-xs",title:"Laposta status",width:"10%"}),v.a.createElement(R.a,{RowClassName:"hidden-xs hidden-sm",title:"Toegevoegd op",width:"10%"}),v.a.createElement("th",{width:"10%"})):v.a.createElement(v.a.Fragment,null,v.a.createElement(R.a,{RowClassName:"hidden-xs",title:"#",width:"15%"}),v.a.createElement(R.a,{RowClassName:"hidden-xs hidden-sm",title:"Type",width:"15%"}),v.a.createElement(R.a,{sortColumn:"fullName",title:"Naam",width:"30%"}),v.a.createElement(R.a,{RowClassName:"hidden-xs",title:"E-mail",width:"30%"}),v.a.createElement(R.a,{RowClassName:"hidden-xs hidden-sm",title:"Toegevoegd op",width:"10%"}),v.a.createElement("th",{width:"10%"})))},S=n(4),P=n(7),k=n.n(P);function M(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=f()(e);if(t){var r=f()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return d()(this,n)}}var j=function(e){u()(n,e);var t=M(n);function n(e){var a;return r()(this,n),(a=t.call(this,e)).state={showActionButtons:!1,highlightRow:""},a}return s()(n,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){S.f.push("/contact/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,a=t.number,r=t.typeName,o=t.fullName,s=t.emailAddress,i=t.lapostaMemberId,c=t.lapostaMemberState,l=t.memberToGroupSince,u=t.permissions,p=t.isUsedInLaposta,d="";switch(c){case"active":d="Actief";break;case"unsubscribed":d="Uitgeschreven";break;case"unknown":d="Niet bekend in Laposta";break;case"inprogress":d="Wordt bijgewerkt";break;default:d=""}var m=!p||null!==i&&"unknown"!==c?null:"missing-data-row",f=!p||null!==i&&"unknown"!==c?"":"Koppeling niet gevonden in Laposta";return v.a.createElement("tr",{title:f,className:this.state.highlightRow+" "+m?m:"",onDoubleClick:function(){return e.openItem(n)},onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},v.a.createElement("td",{className:"hidden-xs"},a),v.a.createElement("td",{className:"hidden-xs hidden-sm"},r," "),v.a.createElement("td",null,o),v.a.createElement("td",{className:"hidden-xs"},s),p&&v.a.createElement("td",{className:"hidden-xs"},d),v.a.createElement("td",{className:"hidden-xs hidden-sm"},l?k()(l).format("DD-MM-Y"):""),v.a.createElement("td",null,this.state.showActionButtons&&u.updatePerson&&u.updateOrganisation&&(p&&null!==i||this.props.contactGroupType&&"static"===this.props.contactGroupType.id)?v.a.createElement("a",{role:"button",onClick:this.props.showEditItemModal.bind(this,n,s,l)},v.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):"",this.state.showActionButtons&&u.updatePerson&&u.updateOrganisation&&this.props.contactGroupType&&"static"===this.props.contactGroupType.id?v.a.createElement("a",{role:"button",onClick:this.props.showDeleteItemModal.bind(this,n,o)},v.a.createElement("span",{className:"glyphicon glyphicon-trash mybtn-danger"})," "):""))}}]),n}(b.Component),L=Object(y.b)((function(e){return{permissions:e.meDetails.permissions,contactGroupType:e.contactGroupDetails.type}}))(j),U=n(101),x=Object(y.b)(null,(function(e){return{deleteContactInGroup:function(t,n){e(function(e,t){return{type:"DELETE_CONTACT_IN_GROUP",contactGroup:e,id:t}}(t,n))}}}))((function(e){return v.a.createElement(U.a,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:e.closeDeleteItemModal,confirmAction:function(){return e.deleteContactInGroup(e.groupId,e.id),void e.closeDeleteItemModal()},title:"Verwijderen"},"Verwijder contact uit groep: ",v.a.createElement("strong",null," ",e.fullName," "))})),_=n(708),z=n(703);function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(Object(n),!0).forEach((function(t){g()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function F(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=f()(e);if(t){var r=f()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return d()(this,n)}}var Y=function(e){u()(n,e);var t=F(n);function n(e){var a;return r()(this,n),a=t.call(this,e),g()(c()(a),"handleChangeDate",(function(e){var t=e?k()(e).format("Y-MM-DD"):"";a.setState(q(q({},a.state),{},{memberToGroupSince:t}))})),console.log(e),a.state={memberToGroupSince:e.memberToGroupSince},a}return s()(n,[{key:"render",value:function(){var e=this;return v.a.createElement(U.a,{buttonConfirmText:"Opslaan",buttonClassName:"btn-danger",closeModal:this.props.closeEditItemModal,confirmAction:function(){return e.props.updateContactInGroup(e.props.groupId,e.props.id,{memberToGroupSince:e.state.memberToGroupSince}),void e.props.closeEditItemModal()},title:"Wijzigen"},v.a.createElement("div",{className:"row"},v.a.createElement(z.a,{label:"Contact email",divSize:"col-xs-12",name:"emailAddress",value:this.props.emailAddress,readOnly:!0})),v.a.createElement("div",{className:"row"},v.a.createElement(_.a,{label:"Wijzig datum toegevoegd op",divSize:"col-xs-12",name:"memberToGroupSince",value:this.props.memberToGroupSince,onChangeAction:this.handleChangeDate})),v.a.createElement("br",null))}}]),n}(v.a.Component),V=Object(y.b)(null,(function(e){return{updateContactInGroup:function(t,n,a){e(function(e,t,n){return{type:"UPDATE_CONTACT_IN_GROUP",contactGroup:e,id:t,memberToGroupSince:n}}(t,n,a))}}}))(Y);function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(Object(n),!0).forEach((function(t){g()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function W(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=f()(e);if(t){var r=f()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return d()(this,n)}}var J=function(e){u()(n,e);var t=W(n);function n(e){var a;return r()(this,n),a=t.call(this,e),g()(c()(a),"showDeleteItemModal",(function(e,t){a.setState(H(H({},a.state),{},{showDeleteItem:!0,deleteItem:H(H({},a.state.deleteItem),{},{id:e,fullName:t})}))})),g()(c()(a),"closeDeleteItemModal",(function(){a.setState(H(H({},a.state),{},{showDeleteItem:!1,deleteItem:H(H({},a.state.deleteItem),{},{id:"",fullName:""})}))})),g()(c()(a),"showEditItemModal",(function(e,t,n){a.setState(H(H({},a.state),{},{showEditItem:!0,editItem:H(H({},a.state.editItem),{},{id:e,emailAddress:t,memberToGroupSince:n})}))})),g()(c()(a),"closeEditItemModal",(function(){a.setState(H(H({},a.state),{},{showEditItem:!1,editItem:H(H({},a.state.editItem),{},{id:"",emailAddress:"",memberToGroupSince:""})}))})),a.state={showDeleteItem:!1,showEditItem:!1,deleteItem:{id:"",fullName:""},editItem:{id:"",emailAddress:"",memberToGroupSince:""}},a}return s()(n,[{key:"render",value:function(){var e=this,t="",n=!0;return this.props.hasError?t="Fout bij het ophalen van contact in groep.":this.props.isLoading?t="Gegevens aan het laden.":0===this.props.contactsInGroup.length?t="Geen contact in groep gevonden!":n=!1,v.a.createElement("div",null,v.a.createElement("div",{className:"row"},v.a.createElement("div",{className:"col-xs-12"},v.a.createElement("span",null,"Totaal leden in groep: ",v.a.createElement("strong",null,this.props.contactsInGroup.length)))),v.a.createElement("form",{onKeyUp:this.handleKeyUp},v.a.createElement(O.a,null,v.a.createElement(G.a,null,v.a.createElement(A,{showCheckbox:this.props.showCheckboxList,refreshContactsInGroupData:this.props.refreshContactsInGroupData,isUsedInLaposta:this.props.contactGroupDetails.isUsedInLaposta})),v.a.createElement(T.a,null,n?v.a.createElement("tr",null,v.a.createElement("td",{colSpan:10},t)):this.props.contactsInGroup.map((function(t){return v.a.createElement(L,N()({key:t.id},t,{showDeleteItemModal:e.showDeleteItemModal,showEditItemModal:e.showEditItemModal,groupId:e.props.groupId,isUsedInLaposta:e.props.contactGroupDetails.isUsedInLaposta}))}))))),this.state.showDeleteItem&&v.a.createElement(x,N()({closeDeleteItemModal:this.closeDeleteItemModal,groupId:this.props.groupId},this.state.deleteItem)),this.state.showEditItem&&v.a.createElement(V,N()({closeEditItemModal:this.closeEditItemModal,groupId:this.props.groupId},this.state.editItem,{refreshContactsInGroupData:this.props.refreshContactsInGroupData})))}}]),n}(b.Component),X=Object(y.b)((function(e){return{isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError,contactGroupDetails:e.contactGroupDetails}}))(J),Q=n(104),Z=n(716);function $(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function ee(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?$(Object(n),!0).forEach((function(t){g()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function te(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=f()(e);if(t){var r=f()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return d()(this,n)}}var ne=function(e){u()(n,e);var t=te(n);function n(e){var a;return r()(this,n),(a=t.call(this,e)).state={people:[],personId:"",peekLoading:{people:!0}},a.handleReactSelectChange=a.handleReactSelectChange.bind(c()(a)),a}return s()(n,[{key:"componentDidMount",value:function(){var e=this;Q.a.getPerson().then((function(t){e.setState(ee(ee({},e.state),{},{people:t,peekLoading:ee(ee({},e.state.peekLoading),{},{people:!1})}))}))}},{key:"handleReactSelectChange",value:function(e){this.setState(ee(ee({},this.state),{},{personId:e}))}},{key:"render",value:function(){var e=this;return v.a.createElement(U.a,{buttonConfirmText:"Toevoegen",closeModal:this.props.closeModalAddToGroup,confirmAction:function(){return e.props.addPersonToGroup(e.state.personId)},title:"Contact toevoegen aan groep: ".concat(this.props.groupName)},this.props.sendEmailNewContactLink?v.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Na toevoegen zal er automatisch een email verzonden worden naar dit contact."):null,v.a.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},v.a.createElement("div",{className:"row"},v.a.createElement(Z.a,{label:"Voeg bestaand contact toe",divSize:"col-sm-12",size:"col-sm-6",id:"personId",name:"personId",value:this.state.personId,onChangeAction:this.handleReactSelectChange,options:this.state.people,optionId:"id",optionName:"fullName",multi:!1,isLoading:this.state.peekLoading.people}))))}}]),n}(b.Component),ae=Object(y.b)((function(e){return{id:e.contactDetails.id}}),(function(e){return{fetchContactDetails:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(t){e(fetchContactDetails(t))}))}}))(ne),re=n(44),oe=n(701),se=n(719),ie=n.n(se),ce=n(737);function le(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=f()(e);if(t){var r=f()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return d()(this,n)}}var ue=function(e){u()(n,e);var t=le(n);function n(e){var a;return r()(this,n),a=t.call(this,e),g()(c()(a),"closeModalAddToGroup",(function(){a.setState({showModalAddToGroup:!1})})),g()(c()(a),"addPersonToGroup",(function(e){var t={groupId:a.props.groupId,contactId:e};re.a.addContactToGroup(t).then((function(e){a.setState({showModalAddToGroup:!1}),a.props.refreshContactsInGroupData()}))})),g()(c()(a),"toggleModalAddToGroup",(function(){a.setState({showModalAddToGroup:!a.state.showModalAddToGroup})})),g()(c()(a),"sendEmail",(function(){S.f.push("/email/nieuw/groep/".concat(a.props.groupId,"/to"))})),g()(c()(a),"newContact",(function(){S.f.push("/contact/nieuw")})),g()(c()(a),"getCSV",(function(){a.props.blockUI(),re.a.getCsv(a.props.groupId).then((function(e){ie()(e.data,"Groep-"+a.props.contactGroupDetails.name.substring(0,20)+"-"+k()().format("YYYY-MM-DD HH:mm:ss")+".csv"),a.props.unblockUI()})).catch((function(e){a.props.unblockUI()}))})),a.state={showModalAddToGroup:!1,showModalEmail:!1},a}return s()(n,[{key:"openGroupDetails",value:function(){S.f.push("/contact-groep/".concat(this.props.groupId))}},{key:"render",value:function(){var e=this,t=this.props,n=t.permissions,a=t.contactGroupDetails;return v.a.createElement("div",{className:"row"},v.a.createElement("div",{className:"col-md-4"},v.a.createElement("div",{className:"btn-group",role:"group"},v.a.createElement(oe.a,{iconName:"glyphicon-refresh",onClickAction:this.props.refreshContactsInGroupData}),n.updatePerson&&n.updateOrganisation&&a.type&&"static"===a.type.id&&v.a.createElement("div",{className:"nav navbar-nav btn-group"},v.a.createElement("button",{onClick:this.toggleModalAddToGroup,className:"btn btn-success btn-sm"},v.a.createElement("span",{className:"glyphicon glyphicon-plus"}))),v.a.createElement(oe.a,{iconName:"glyphicon-download-alt",onClickAction:this.getCSV}),v.a.createElement(oe.a,{iconName:"glyphicon-envelope",onClickAction:this.sendEmail}))),v.a.createElement("div",{className:"col-md-4"},v.a.createElement("h3",{className:"text-center table-title",onClick:function(){return e.openGroupDetails()},role:"button"},"Contacten in groep: ",a.name)),v.a.createElement("div",{className:"col-md-4"}),this.state.showModalAddToGroup&&v.a.createElement(ae,{closeModalAddToGroup:this.closeModalAddToGroup,addPersonToGroup:this.addPersonToGroup,groupName:a.name,sendEmailNewContactLink:a.sendEmailNewContactLink}))}}]),n}(b.Component),pe=Object(y.b)((function(e){return{permissions:e.meDetails.permissions,contactGroupDetails:e.contactGroupDetails}}),(function(e){return Object(E.b)({blockUI:ce.a,unblockUI:ce.b},e)}))(ue);function de(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=f()(e);if(t){var r=f()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return d()(this,n)}}var me=function(e){u()(n,e);var t=de(n);function n(e){var a;return r()(this,n),a=t.call(this,e),g()(c()(a),"refreshContactsInGroupData",(function(){a.props.clearContactsInGroup(),a.props.fetchContactsInGroup(a.props.params.contactGroup)})),a}return s()(n,[{key:"componentDidMount",value:function(){this.props.fetchContactsInGroup(this.props.params.contactGroup),this.props.fetchContactGroupDetails(this.props.params.contactGroup)}},{key:"componentWillUnmount",value:function(){this.props.clearContactsInGroup(),this.props.clearContactGroupDetails()}},{key:"render",value:function(){return v.a.createElement("div",null,v.a.createElement("div",{className:"panel panel-default"},v.a.createElement("div",{className:"panel-body"},v.a.createElement("div",{className:"col-md-12 margin-10-top"},v.a.createElement(pe,{refreshContactsInGroupData:this.refreshContactsInGroupData,groupId:this.props.params.contactGroup})),v.a.createElement("div",{className:"col-md-12 margin-10-top"},v.a.createElement(X,{contactsInGroup:this.props.contactsInGroup,groupId:this.props.params.contactGroup,refreshContactsInGroupData:this.refreshContactsInGroupData})))))}}]),n}(b.Component);t.default=Object(y.b)((function(e){return{contactsInGroup:e.contactsInGroup}}),(function(e){return Object(E.b)({fetchContactsInGroup:C,clearContactsInGroup:w,fetchContactGroupDetails:I.f,clearContactGroupDetails:I.c},e)}))(me)},701:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(8),s=n.n(o),i=function(e){var t=e.buttonClassName,n=e.iconName,a=e.onClickAction,o=e.title,s=e.disabled;return r.a.createElement("button",{type:"button",className:"btn ".concat(t),onClick:a,disabled:s,title:o},r.a.createElement("span",{className:"glyphicon ".concat(n)}))};i.defaultProps={buttonClassName:"btn-success btn-sm",title:"",disabled:!1},i.propTypes={buttonClassName:s.a.string,iconName:s.a.string.isRequired,onClickAction:s.a.func,title:s.a.string,disabled:s.a.bool},t.a=i},703:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(8),s=n.n(o),i=function(e){var t=e.label,n=e.type,a=e.className,o=e.size,s=e.id,i=e.placeholder,c=e.name,l=e.value,u=e.onClickAction,p=e.onChangeAction,d=e.onBlurAction,m=e.required,f=e.readOnly,h=e.maxLength,g=e.error,b=e.min,v=e.max,y=e.step,E=e.errorMessage,C=e.divSize,w=e.divClassName,I=e.autoComplete;return r.a.createElement("div",{className:"form-group ".concat(C," ").concat(w)},r.a.createElement("label",{htmlFor:s,className:"col-sm-6 ".concat(m)},t),r.a.createElement("div",{className:"".concat(o)},r.a.createElement("input",{type:n,className:"form-control input-sm ".concat(a)+(g?"has-error":""),id:s,placeholder:i,name:c,value:l||"",onClick:u,onChange:p,onBlur:d,readOnly:f,maxLength:h,min:b,max:v,autoComplete:I,step:y})),g&&r.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},r.a.createElement("span",{className:"has-error-message"}," ",E)))};i.defaultProps={divClassName:"",className:"",size:"col-sm-6",divSize:"col-sm-6",name:"",type:"text",value:"",required:"",readOnly:!1,maxLength:null,error:!1,min:"",max:"",step:"",errorMessage:"",autoComplete:"off",onBlurAction:function(){},onClickAction:function(){},onChangeAction:function(){}},i.propTypes={label:s.a.oneOfType([s.a.string,s.a.object]).isRequired,type:s.a.string,className:s.a.string,divClassName:s.a.string,size:s.a.string,divSize:s.a.string,id:s.a.string,placeholder:s.a.string,name:s.a.string.isRequired,value:s.a.oneOfType([s.a.string,s.a.number]),onClickAction:s.a.func,onChangeAction:s.a.func,onBlurAction:s.a.func,required:s.a.string,readOnly:s.a.bool,maxLength:s.a.string,error:s.a.bool,min:s.a.string,max:s.a.string,step:s.a.string,errorMessage:s.a.string,autoComplete:s.a.string},t.a=i},708:function(e,t,n){"use strict";var a=n(24),r=n.n(a),o=n(25),s=n.n(o),i=n(22),c=n.n(i),l=n(26),u=n.n(l),p=n(27),d=n.n(p),m=n(16),f=n.n(m),h=n(6),g=n.n(h),b=n(0),v=n.n(b),y=n(8),E=n.n(y),C=n(717),w=n.n(C),I=n(718),D=n.n(I),N=n(7),O=n.n(N);function G(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=f()(e);if(t){var r=f()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return d()(this,n)}}O.a.locale("nl");var T=function(e){u()(n,e);var t=G(n);function n(e){var a;return r()(this,n),a=t.call(this,e),g()(c()(a),"validateDate",(function(e){var t=O()(e.target.value,"DD-MM-YYYY",!0),n=!1;t.isValid()||""===e.target.value||(n=!0),a.props.disabledBefore&&t.isBefore(a.props.disabledBefore)&&(n=!0),a.props.disabledAfter&&t.isAfter(a.props.disabledAfter)&&(n=!0),a.setState({errorDateFormat:n})})),g()(c()(a),"onDateChange",(function(e){var t=e?O()(e).format("Y-MM-DD"):"",n=!1;t&&a.props.disabledBefore&&O()(t).isBefore(a.props.disabledBefore)&&(n=!0),t&&a.props.disabledAfter&&O()(t).isAfter(a.props.disabledAfter)&&(n=!0),a.setState({errorDateFormat:n}),!n&&a.props.onChangeAction(t,a.props.name)})),a.state={errorDateFormat:!1},a}return s()(n,[{key:"render",value:function(){var e=this.props,t=e.label,n=e.className,a=e.size,r=e.divSize,o=e.id,s=e.value,i=e.required,c=e.readOnly,l=e.name,u=e.error,p=e.errorMessage,d=e.disabledBefore,m=e.disabledAfter,f=s?O()(s).format("L"):"",h={};return d&&(h.before=new Date(d)),m&&(h.after=new Date(m)),v.a.createElement("div",{className:"form-group ".concat(r)},v.a.createElement("div",null,v.a.createElement("label",{htmlFor:o,className:"col-sm-6 ".concat(i)},t)),v.a.createElement("div",{className:"".concat(a)},v.a.createElement(w.a,{id:o,value:f,formatDate:I.formatDate,parseDate:I.parseDate,onDayChange:this.onDateChange,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:D.a,disabledDays:h},inputProps:{className:"form-control input-sm ".concat(n)+(this.state.errorDateFormat||u?" has-error":""),name:l,onBlur:this.validateDate,autoComplete:"off",readOnly:c,disabled:c},required:i,readOnly:c,placeholder:""})),u&&v.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},v.a.createElement("span",{className:"has-error-message"}," ",p)))}}]),n}(b.Component);T.defaultProps={className:"",size:"col-sm-6",divSize:"col-sm-6",required:"",readOnly:!1,value:null,error:!1,errorMessage:"",disabledBefore:null,disabledAfter:null},T.propTypes={label:E.a.string.isRequired,type:E.a.string,className:E.a.string,size:E.a.string,divSize:E.a.string,id:E.a.string,name:E.a.string,value:E.a.oneOfType([E.a.string,E.a.object]),onChangeAction:E.a.func,required:E.a.string,readOnly:E.a.bool,error:E.a.bool,errorMessage:E.a.string,disabledBefore:E.a.string,disabledAfter:E.a.string},t.a=T},716:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(8),s=n.n(o),i=n(721),c=(n(722),function(e){var t=e.label,n=e.divSize,a=e.size,o=e.id,s=e.name,c=e.value,l=e.options,u=e.optionId,p=e.optionName,d=e.onChangeAction,m=e.required,f=e.multi,h=e.error,g=e.isLoading,b=e.disabled;return r.a.createElement("div",{className:"form-group ".concat(n)},r.a.createElement("label",{htmlFor:o,className:"col-sm-6 ".concat(m)},t),r.a.createElement("div",{className:"".concat(a)},r.a.createElement(i.a,{id:o,name:s,value:c,onChange:function(e){d(e||"",s)},options:l,valueKey:u,labelKey:p,placeholder:"",noResultsText:"Geen resultaat gevonden",multi:f,simpleValue:!0,removeSelected:!0,className:h?" has-error":"",isLoading:g,disabled:b})))});c.defaultProps={className:"",size:"col-sm-6",divSize:"col-sm-6",optionId:"id",optionName:"name",disabled:!1,required:"",error:!1,value:"",multi:!0,isLoading:!1},c.propTypes={label:s.a.string.isRequired,className:s.a.string,size:s.a.string,divSize:s.a.string,id:s.a.string,name:s.a.string.isRequired,options:s.a.array.isRequired,optionId:s.a.string,optionName:s.a.string,value:s.a.oneOfType([s.a.string,s.a.number]),onChangeAction:s.a.func,onBlurAction:s.a.func,required:s.a.string,disabled:s.a.bool,error:s.a.bool,multi:s.a.bool,isLoading:s.a.bool},t.a=c},719:function(e,t){e.exports=function(e,t,n,a){var r=new Blob(void 0!==a?[a,e]:[e],{type:n||"application/octet-stream"});if(void 0!==window.navigator.msSaveBlob)window.navigator.msSaveBlob(r,t);else{var o=window.URL&&window.URL.createObjectURL?window.URL.createObjectURL(r):window.webkitURL.createObjectURL(r),s=document.createElement("a");s.style.display="none",s.href=o,s.setAttribute("download",t),void 0===s.download&&s.setAttribute("target","_blank"),document.body.appendChild(s),s.click(),setTimeout((function(){document.body.removeChild(s),window.URL.revokeObjectURL(o)}),200)}}},737:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r}));var a=function(){return{type:"BLOCK_UI"}},r=function(){return{type:"UNBLOCK_UI"}}},785:function(e,t,n){"use strict";n.d(t,"f",(function(){return a})),n.d(t,"g",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"e",(function(){return s})),n.d(t,"b",(function(){return i})),n.d(t,"d",(function(){return c})),n.d(t,"a",(function(){return l})),n.d(t,"h",(function(){return u}));var a=function(e){return{type:"FETCH_CONTACT_GROUP_DETAILS",id:e}},r=function(e){return{type:"UPDATE_CONTACT_GROUP_DETAILS",contactGroupDetails:e}},o=function(){return{type:"CLEAR_CONTACT_GROUP_DETAILS"}},s=function(e,t){return{type:"DELETE_COMPOSED_GROUP",contactGroupId:e,contactGroupToDetachId:t}},i=function(e,t){return{type:"ATTACH_COMPOSED_GROUP",contactGroupId:e,contactGroupToAttachId:t}},c=function(e,t){return{type:"DELETE_COMPOSED_EXCEPT_GROUP",contactGroupId:e,contactGroupToDetachId:t}},l=function(e,t){return{type:"ATTACH_COMPOSED_EXCEPT_GROUP",contactGroupId:e,contactGroupToAttachId:t}},u=function(e){return{type:"UPDATE_LAPOSTA_LIST_ID",lapostaListId:e}}}}]);