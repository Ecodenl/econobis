(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{1521:function(e,t,a){"use strict";a.r(t);var n=a(24),r=a.n(n),o=a(25),s=a.n(o),l=a(26),i=a.n(l),c=a(27),u=a.n(c),m=a(16),d=a.n(m),f=a(0),p=a.n(f),h=a(31),v=function(e){return{type:"FETCH_QUOTATION_REQUEST_DETAILS",payload:e}},g=a(22),E=a.n(g),b=a(6),y=a.n(b),N=a(4),D=a(702),R=a(102),q=Object(h.b)(null,(function(e){return{deleteQuotationRequest:function(t){e(function(e){return{type:"DELETE_QUOTATION_REQUEST",id:e}}(t))}}}))((function(e){return p.a.createElement(R.a,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:e.closeDeleteItemModal,confirmAction:function(){return e.deleteQuotationRequest(e.id),void e.closeDeleteItemModal()},title:"Verwijderen"},p.a.createElement("p",null,"Verwijder offerteverzoek: ",p.a.createElement("strong",null," ","".concat(e.id)," ")))})),w=a(700),k=a(701);function O(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var r=d()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return u()(this,a)}}var C=function(e){i()(a,e);var t=O(a);function a(e){var n;return r()(this,a),n=t.call(this,e),y()(E()(n),"toggleDelete",(function(){n.setState({showDelete:!n.state.showDelete})})),y()(E()(n),"sendMail",(function(){N.f.push("/email/nieuw/offerteverzoek/".concat(n.props.quotationRequestDetails.id,"/").concat(n.props.quotationRequestDetails.organisation.contactId))})),n.state={showDelete:!1},n}return s()(a,[{key:"render",value:function(){var e=this.props.quotationRequestDetails.opportunity,t=void 0===e?{}:e,a=t.measure,n=void 0===a?{}:a,r=t.intake,o=void 0===r?{}:r,s=n.name||"",l=o&&o.contact?o.contact.fullName:"",i=o.fullAddress||"";return p.a.createElement("div",{className:"row"},p.a.createElement("div",{className:"col-sm-12"},p.a.createElement(w.a,null,p.a.createElement(k.a,{className:"panel-small"},p.a.createElement("div",{className:"col-md-2"},p.a.createElement("div",{className:"btn-group",role:"group"},p.a.createElement(D.a,{iconName:"glyphicon-arrow-left",onClickAction:N.e.goBack}),this.props.permissions.manageQuotationRequest&&p.a.createElement(D.a,{iconName:"glyphicon-trash",onClickAction:this.toggleDelete}),p.a.createElement(D.a,{iconName:"glyphicon-envelope",onClickAction:this.sendMail}))),p.a.createElement("div",{className:"col-md-8"},p.a.createElement("h4",{className:"text-center"},"Offerteverzoek ".concat(s," voor ").concat(l," op ").concat(i))),p.a.createElement("div",{className:"col-md-2"})))),this.state.showDelete&&p.a.createElement(q,{closeDeleteItemModal:this.toggleDelete,id:this.props.id}))}}]),a}(f.Component),S=Object(h.b)((function(e){return{quotationRequestDetails:e.quotationRequestDetails,permissions:e.meDetails.permissions}}))(C),T=a(200),A=a(7),x=a.n(A),L=a(159),P=(a(790),a(709)),j=a(703),z=a(704),I=a(719),M=a(791),B=a(715),V=a.n(B);function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Q(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(Object(a),!0).forEach((function(t){y()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function W(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var r=d()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return u()(this,a)}}x.a.locale("nl");var U=function(e){i()(a,e);var t=W(a);function a(e){var n;r()(this,a),n=t.call(this,e),y()(E()(n),"handleInputChange",(function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,r=t.name;n.setState(Q(Q({},n.state),{},{quotationRequest:Q(Q({},n.state.quotationRequest),{},y()({},r,a))}))})),y()(E()(n),"handleSubmit",(function(e){e.preventDefault();var t=n.state.quotationRequest,a={},r=!1;V.a.isEmpty(t.statusId+"")&&(a.status=!0,r=!0),V.a.isEmpty(t.organisationId+"")&&(a.organisation=!0,r=!0),n.setState(Q(Q({},n.state),{},{errors:a})),!r&&L.a.updateQuotationRequest(t).then((function(e){n.props.fetchQuotationRequestDetails(t.id),n.props.switchToView()}))}));var o=e.quotationRequestDetails,s=o.id,l=o.organisation,i=o.dateRecorded,c=o.status,u=o.datePlannedToSendWfEmailStatus,m=o.dateReleased,d=o.quotationText,f=o.opportunity;return n.state={opportunity:{fullName:f.intake?f.intake.contact.fullName:"",fullAddress:f.intake?f.intake.fullAddress:"",measureNames:f.measures&&f.measures.map((function(e){return e.name})).join(", "),measureCategoryName:f.measureCategory.name,organisations:f.intake&&f.intake.campaign?f.intake.campaign.organisations:""},quotationRequest:{id:s,opportunityId:f.id,organisationId:l.id,dateRecorded:i||"",statusId:c.id,statusUsesWf:!!c&&c.usesWf,datePlannedToSendWfEmailStatus:u?x()(u).format("L"):"",dateReleased:m||"",quotationText:d||""},errors:{organisation:!1,status:!1}},n.handleInputChangeDate=n.handleInputChangeDate.bind(E()(n)),n}return s()(a,[{key:"handleInputChangeDate",value:function(e,t){this.setState(Q(Q({},this.state),{},{quotationRequest:Q(Q({},this.state.quotationRequest),{},y()({},t,e))}))}},{key:"render",value:function(){var e=this.state.quotationRequest,t=e.organisationId,a=e.dateRecorded,n=e.statusId,r=e.statusUsesWf,o=e.datePlannedToSendWfEmailStatus,s=e.dateReleased,l=e.quotationText,i=this.state.opportunity,c=i.fullName,u=i.fullAddress,m=i.organisations,d=i.measureNames,f=i.measureCategoryName;return p.a.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},p.a.createElement("div",{className:"row"},p.a.createElement(P.a,{label:"Organisatie",size:"col-sm-6",name:"organisationId",value:t,options:m,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.organisation}),p.a.createElement(z.a,{label:"Verzoek voor",name:"fullName",value:c,onChange:function(){},readOnly:!0})),p.a.createElement("div",{className:"row"},p.a.createElement(z.a,{label:"Adres voor",name:"address",value:u,onChange:function(){},readOnly:!0}),p.a.createElement(z.a,{label:"Maatregel - categorie",name:"measureCategory",value:f,onChange:function(){},readOnly:!0})),p.a.createElement("div",{className:"row"},p.a.createElement(z.a,{label:"Maatregel - specifiek",name:"measure",value:d,onChange:function(){},readOnly:!0}),p.a.createElement(I.a,{label:"Datum opname",size:"col-sm-6",name:"dateRecorded",value:a,onChangeAction:this.handleInputChangeDate})),p.a.createElement("div",{className:"row"},p.a.createElement(P.a,{label:"Offerte status",size:"col-sm-6",name:"statusId",value:n,options:this.props.quotationRequestStatus,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.status}),r?p.a.createElement(z.a,{label:"Datum workflow email",name:"datePlannedToSendWfEmailStatus",value:o,onChange:function(){},readOnly:!0}):""),p.a.createElement("div",{className:"row"},p.a.createElement(I.a,{label:"Offerte uitgebracht",size:"col-sm-6",name:"dateReleased",value:s,onChangeAction:this.handleInputChangeDate})),p.a.createElement("div",{className:"row"},p.a.createElement(M.a,{label:"Offerte omschrijving",name:"quotationText",value:l,onChangeAction:this.handleInputChange})),p.a.createElement("div",{className:"panel-footer"},p.a.createElement("div",{className:"pull-right btn-group",role:"group"},p.a.createElement(j.a,{buttonText:"Opslaan",onClickAction:this.handleSubmit}))))}}]),a}(f.Component),_=Object(h.b)((function(e){return{quotationRequestStatus:e.systemData.quotationRequestStatus,quotationRequestDetails:e.quotationRequestDetails}}),(function(e){return{fetchQuotationRequestDetails:function(t){e(v(t))}}}))(U),G=a(706);x.a.locale("nl");var Y=Object(h.b)((function(e){return{quotationRequestDetails:e.quotationRequestDetails}}))((function(e){var t=e.quotationRequestDetails,a=t.organisation,n=t.dateRecorded,r=t.status,o=t.datePlannedToSendWfEmailStatus,s=t.dateReleased,l=t.quotationText,i=t.opportunity;return p.a.createElement("div",{onClick:e.switchToEdit},p.a.createElement("div",{className:"row"},p.a.createElement(G.a,{label:"Organisatie",value:a&&a.name,link:a?"contact/"+a.contact.id:""}),p.a.createElement(G.a,{label:"Verzoek voor",value:i.intake&&i.intake.contact.fullName})),p.a.createElement("div",{className:"row"},p.a.createElement(G.a,{label:"Organisatie contactpersoon",value:a.contact.contactPerson?a.contact.contactPerson.contact.fullName:"",link:a.contact.contactPerson?"contact/"+a.contact.contactPerson.contact.id:""})),p.a.createElement("div",{className:"row"},p.a.createElement(G.a,{label:"Adres voor",value:i.intake&&i.intake.fullAddress}),p.a.createElement(G.a,{label:"Maatregel categorie",value:i.measureCategory&&i.measureCategory.name})),p.a.createElement("div",{className:"row"},p.a.createElement(G.a,{label:"Maatregelen specifiek",value:i.measures&&i.measures.map((function(e){return e.name})).join(", ")}),p.a.createElement(G.a,{label:"Datum opname",value:n?x()(n).format("L"):""})),p.a.createElement("div",{className:"row"},p.a.createElement(G.a,{label:"Offerte status",value:r&&r.name}),r&&r.usesWf?p.a.createElement(G.a,{label:"Datum workflow email",value:o?x()(o).format("L"):""}):"",";"),p.a.createElement("div",{className:"row"},p.a.createElement(G.a,{label:"Offerte uitgebracht",value:s?x()(s).format("L"):""})),p.a.createElement("div",{className:"row"},p.a.createElement("div",{className:"col-sm-3"},p.a.createElement("label",{htmlFor:"quotationText",className:"col-sm-12"},"Offerte omschrijving")),p.a.createElement("div",{className:"col-sm-9",id:"quotationText"},l)))}));function J(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var r=d()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return u()(this,a)}}var H=function(e){i()(a,e);var t=J(a);function a(e){var n;return r()(this,a),n=t.call(this,e),y()(E()(n),"switchToEdit",(function(){n.setState({showEdit:!0})})),y()(E()(n),"switchToView",(function(){n.setState({showEdit:!1,activeDiv:""})})),n.state={showEdit:!1,activeDiv:""},n}return s()(a,[{key:"onDivEnter",value:function(){this.setState({activeDiv:"panel-grey"})}},{key:"onDivLeave",value:function(){this.state.showEdit||this.setState({activeDiv:""})}},{key:"render",value:function(){var e=this;return p.a.createElement(w.a,{className:this.state.activeDiv,onMouseEnter:function(){return e.onDivEnter()},onMouseLeave:function(){return e.onDivLeave()}},p.a.createElement(k.a,null,p.a.createElement("div",{className:"col-md-12"},this.state.showEdit&&this.props.permissions.manageQuotationRequest?p.a.createElement(_,{switchToView:this.switchToView}):p.a.createElement(Y,{switchToEdit:this.switchToEdit}))))}}]),a}(f.Component),Z=Object(h.b)((function(e){return{permissions:e.meDetails.permissions}}),null)(H);x.a.locale("nl");var K=Object(h.b)((function(e){return{quotationRequestDetails:e.quotationRequestDetails}}))((function(e){var t=e.quotationRequestDetails,a=t.createdAt,n=t.updatedAt,r=t.updatedBy,o=t.createdBy;return p.a.createElement("div",null,p.a.createElement("div",{className:"row"},p.a.createElement(G.a,{label:"Gemaakt door",value:o?o.fullName:"Onbekend",link:o?"gebruiker/"+o.id:""}),p.a.createElement(G.a,{label:"Laatste update door",value:r?r.fullName:"Onbekend",link:r?"gebruiker/"+r.id:""})),p.a.createElement("div",{className:"row"},p.a.createElement(G.a,{label:"Gemaakt op",value:a?x()(a).format("L"):"Onbekend"}),p.a.createElement(G.a,{label:"Laatste update op",value:n?x()(n).format("L"):"Onbekend"})))})),X=a(718),$=function(e){return p.a.createElement(w.a,null,p.a.createElement(X.a,null,p.a.createElement("span",{className:"h5 text-bold"},"Afsluiting gegevens")),p.a.createElement(k.a,null,p.a.createElement("div",{className:"col-md-12"},p.a.createElement(K,null))))};function ee(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var r=d()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return u()(this,a)}}var te=function(e){i()(a,e);var t=ee(a);function a(e){return r()(this,a),t.call(this,e)}return s()(a,[{key:"render",value:function(){var e="",t=!0;return this.props.hasError?e="Fout bij het ophalen van offerteverzoek.":this.props.isLoading?e="Gegevens aan het laden.":Object(T.isEmpty)(this.props.quotationRequestDetails)?e="Geen offerteverzoek gevonden!":t=!1,t?p.a.createElement("div",null,e):p.a.createElement("div",null,p.a.createElement(Z,null),p.a.createElement($,null))}}]),a}(f.Component),ae=Object(h.b)((function(e){return{quotationRequestDetails:e.quotationRequestDetails,isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}),null)(te);function ne(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var r=d()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return u()(this,a)}}var re=function(e){i()(a,e);var t=ne(a);function a(e){var n;return r()(this,a),n=t.call(this,e),y()(E()(n),"openItem",(function(e){N.f.push("/document/".concat(e))})),n.state={relatedDocuments:""},n}return s()(a,[{key:"render",value:function(){var e=this,t=this.props.relatedDocuments;return p.a.createElement("div",null,""==t&&p.a.createElement("div",null,"Geen documenten gevonden."),""!=t&&p.a.createElement("table",{className:"table harmonica-table"},p.a.createElement("tbody",null,t.map((function(t,a){return p.a.createElement("tr",{onClick:function(){return e.openItem(t.id)},key:a},p.a.createElement("td",{className:"col-xs-5 clickable"},x()(t.createdAt).format("L")),p.a.createElement("td",{className:"col-xs-6 clickable"},t.filename))})))))}}]),a}(f.Component),oe=Object(h.b)((function(e){return{relatedDocuments:e.quotationRequestDetails.relatedDocuments}}))(re),se=Object(h.b)((function(e){return{permissions:e.meDetails.permissions}}),null)((function(e){var t=e.toggleShowList,a=e.showDocumentsList,n=e.newDocument,r=e.documentCount,o=e.permissions;return p.a.createElement(w.a,{className:"harmonica-button"},p.a.createElement(k.a,null,p.a.createElement("div",{className:"col-sm-10",onClick:t,role:"button"},p.a.createElement("span",null,"DOCUMENTEN ",p.a.createElement("span",{className:"badge"},r))),p.a.createElement("div",{className:"col-sm-2"},o.createDocument&&p.a.createElement("div",{className:"pull-right"},p.a.createElement("span",{className:"glyphicon glyphicon-plus glyphicon-white","data-toggle":"dropdown",role:"button"}),p.a.createElement("ul",{className:"dropdown-menu"},p.a.createElement("li",null,p.a.createElement("a",{className:"btn",onClick:function(){return n("internal")}},"Maak document")),p.a.createElement("li",null,p.a.createElement("a",{className:"btn",onClick:function(){return n("upload")}},"Upload document"))))),p.a.createElement("div",{className:"col-sm-12"},a&&p.a.createElement(oe,null))))}));function le(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var r=d()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return u()(this,a)}}var ie=function(e){i()(a,e);var t=le(a);function a(e){var n;return r()(this,a),n=t.call(this,e),y()(E()(n),"openItem",(function(e){N.f.push("/email/".concat(e))})),n.state={relatedOpportunities:""},n}return s()(a,[{key:"render",value:function(){var e=this,t=this.props.relatedEmailsSent;return p.a.createElement("div",null,""==t&&p.a.createElement("div",null,"Geen e-mails gevonden."),""!=t&&p.a.createElement("table",{className:"table harmonica-table"},p.a.createElement("tbody",null,t.map((function(t,a){return p.a.createElement("tr",{key:a},p.a.createElement("td",{className:"col-xs-4 clickable",onClick:function(){return e.openItem(t.id)}},x()(t.date_sent).format("L")),p.a.createElement("td",{className:"col-xs-8 clickable",onClick:function(){return e.openItem(t.id)}},t.subject))})))))}}]),a}(f.Component),ce=Object(h.b)((function(e){return{relatedEmailsSent:e.quotationRequestDetails.relatedEmailsSent}}))(ie),ue=function(e){var t=e.toggleShowList,a=e.showEmailsSentList,n=e.newEmail,r=e.emailSentCount;return p.a.createElement(w.a,{className:"harmonica-button"},p.a.createElement(k.a,null,p.a.createElement("div",{className:"col-sm-10",onClick:t,role:"button"},p.a.createElement("span",{onClick:t,className:""},"E-MAIL VERZONDEN ",p.a.createElement("span",{className:"badge"},r))),p.a.createElement("div",{className:"col-sm-2"},p.a.createElement("a",{role:"button",className:"pull-right",onClick:n},p.a.createElement("span",{className:"glyphicon glyphicon-plus glyphicon-white"}))),p.a.createElement("div",{className:"col-sm-12"},a&&p.a.createElement(ce,null))))};function me(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function de(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?me(Object(a),!0).forEach((function(t){y()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):me(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function fe(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var r=d()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return u()(this,a)}}var pe=function(e){i()(a,e);var t=fe(a);function a(e){var n;return r()(this,a),(n=t.call(this,e)).state={toggleShowList:{documents:!1,emailsSent:!1}},n.newDocument=n.newDocument.bind(E()(n)),n.newEmail=n.newEmail.bind(E()(n)),n.toggleShowList=n.toggleShowList.bind(E()(n)),n}return s()(a,[{key:"newEmail",value:function(){N.f.push("/email/nieuw/offerteverzoek/".concat(this.props.id,"/").concat(this.props.quotationRequestDetails.organisation.contactId))}},{key:"newDocument",value:function(e){N.f.push("/document/nieuw/".concat(e,"/offerteverzoek/").concat(this.props.id))}},{key:"toggleShowList",value:function(e){this.setState(de(de({},this.state),{},{toggleShowList:de(de({},this.state.toggleShowList),{},y()({},e,!this.state.toggleShowList[e]))}))}},{key:"render",value:function(){var e=this;return p.a.createElement("div",{className:"col-md-12 margin-10-top"},p.a.createElement(ue,{toggleShowList:function(){return e.toggleShowList("emailsSent")},showEmailsSentList:this.state.toggleShowList.emailsSent,newEmail:this.newEmail,emailSentCount:this.props.quotationRequestDetails.emailSentCount}),p.a.createElement(se,{toggleShowList:function(){return e.toggleShowList("documents")},showDocumentsList:this.state.toggleShowList.documents,newDocument:this.newDocument,documentCount:this.props.quotationRequestDetails.documentCount}))}}]),a}(f.Component),he=Object(h.b)((function(e){return{quotationRequestDetails:e.quotationRequestDetails,permissions:e.meDetails.permissions}}))(pe);function ve(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=d()(e);if(t){var r=d()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return u()(this,a)}}var ge=function(e){i()(a,e);var t=ve(a);function a(e){return r()(this,a),t.call(this,e)}return s()(a,[{key:"componentWillMount",value:function(){this.props.fetchQuotationRequestDetails(this.props.params.id)}},{key:"render",value:function(){return p.a.createElement("div",{className:"row"},p.a.createElement("div",{className:"col-md-9"},p.a.createElement("div",{className:"col-md-12"},p.a.createElement(S,{id:this.props.params.id})),p.a.createElement("div",{className:"col-md-12"},p.a.createElement(ae,null))),p.a.createElement(w.a,{className:"col-md-3 harmonica"},p.a.createElement(k.a,null,p.a.createElement(he,{id:this.props.params.id}))))}}]),a}(f.Component);t.default=Object(h.b)(null,(function(e){return{fetchQuotationRequestDetails:function(t){e(v(t))}}}))(ge)},700:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),l=function(e){var t=e.children,a=e.className,n=e.onMouseEnter,o=e.onMouseLeave;return r.a.createElement("div",{className:"panel panel-default ".concat(a),onMouseEnter:n,onMouseLeave:o},t)};l.defaultProps={className:"",onMouseEnter:function(){},onMouseLeave:function(){}},l.propTypes={className:s.a.string,onMouseEnter:s.a.func,onMouseLeave:s.a.func},t.a=l},701:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),l=function(e){var t=e.className,a=e.children;return r.a.createElement("div",{className:"panel-body ".concat(t)},a)};l.defaultProps={className:""},l.propTypes={className:s.a.string},t.a=l},702:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),l=function(e){var t=e.buttonClassName,a=e.iconName,n=e.onClickAction,o=e.title,s=e.disabled;return r.a.createElement("button",{type:"button",className:"btn ".concat(t),onClick:n,disabled:s,title:o},r.a.createElement("span",{className:"glyphicon ".concat(a)}))};l.defaultProps={buttonClassName:"btn-success btn-sm",title:"",disabled:!1},l.propTypes={buttonClassName:s.a.string,iconName:s.a.string.isRequired,onClickAction:s.a.func,title:s.a.string,disabled:s.a.bool},t.a=l},703:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),l=function(e){var t=e.buttonClassName,a=e.buttonText,n=e.onClickAction,o=e.type,s=e.value,l=e.loading,i=e.loadText,c=e.disabled;return l?r.a.createElement("button",{type:o,className:"btn btn-sm btn-loading ".concat(t),value:s,disabled:l},r.a.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"})," ",i):r.a.createElement("button",{type:o,className:"btn btn-sm ".concat(t),onClick:n,value:s,disabled:c},a)};l.defaultProps={buttonClassName:"btn-success",type:"button",value:"",loading:!1,loadText:"Aan het laden",disabled:!1},l.propTypes={buttonClassName:s.a.string,buttonText:s.a.string.isRequired,onClickAction:s.a.func,type:s.a.string,value:s.a.string,loading:s.a.bool,loadText:s.a.string,disabled:s.a.bool},t.a=l},704:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),l=a(707),i=a(708),c=function(e){var t=e.label,a=e.type,n=e.className,o=e.size,s=e.id,c=e.placeholder,u=e.name,m=e.value,d=e.onClickAction,f=e.onChangeAction,p=e.onBlurAction,h=e.required,v=e.readOnly,g=e.maxLength,E=e.error,b=e.min,y=e.max,N=e.step,D=e.textToolTip,R=e.errorMessage,q=e.divSize,w=e.divClassName,k=e.autoComplete;return r.a.createElement("div",{className:"form-group ".concat(q," ").concat(w)},r.a.createElement("label",{htmlFor:s,className:"col-sm-6 ".concat(h)},t),r.a.createElement("div",{className:"".concat(o)},r.a.createElement("input",{type:a,className:"form-control input-sm ".concat(n)+(E?"has-error":""),id:s,placeholder:c,name:u,value:m||"",onClick:d,onChange:f,onBlur:p,readOnly:v,maxLength:g,min:b,max:y,autoComplete:k,step:N}))," ",D&&r.a.createElement("div",{className:"col-sm-1"},r.a.createElement(l.a,{color:"blue",size:"15px","data-tip":D,"data-for":"tooltip-".concat(u)}),r.a.createElement(i.a,{id:"tooltip-".concat(u),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"})),E&&r.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},r.a.createElement("span",{className:"has-error-message"}," ",R)))};c.defaultProps={divClassName:"",className:"",size:"col-sm-6",divSize:"col-sm-6",name:"",type:"text",value:"",required:"",readOnly:!1,maxLength:null,error:!1,min:"",max:"",step:"",textToolTip:"",errorMessage:"",autoComplete:"off",onBlurAction:function(){},onClickAction:function(){},onChangeAction:function(){}},c.propTypes={label:s.a.oneOfType([s.a.string,s.a.object]).isRequired,type:s.a.string,className:s.a.string,divClassName:s.a.string,size:s.a.string,divSize:s.a.string,id:s.a.string,placeholder:s.a.string,name:s.a.string.isRequired,value:s.a.oneOfType([s.a.string,s.a.number]),onClickAction:s.a.func,onChangeAction:s.a.func,onBlurAction:s.a.func,required:s.a.string,readOnly:s.a.bool,maxLength:s.a.string,error:s.a.bool,min:s.a.string,max:s.a.string,step:s.a.string,textToolTip:s.a.string,errorMessage:s.a.string,autoComplete:s.a.string},t.a=c},706:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(4),s=a(8),l=a.n(s),i=a(707),c=a(708),u=function(e){var t=e.label,a=e.className,n=e.id,s=e.value,l=e.link,u=e.hidden,m=e.name,d=e.textToolTip;return l.length>0?r.a.createElement("div",{className:a,style:u?{display:"none"}:{}},r.a.createElement("label",{htmlFor:n,className:"col-sm-6"},t),r.a.createElement("div",{className:"col-sm-6",id:n,onClick:null},r.a.createElement(o.b,{to:l,className:"link-underline"},s)," ",d&&r.a.createElement("span",null,r.a.createElement(i.a,{color:"blue",size:"15px","data-tip":d,"data-for":"tooltip-".concat(m)}),r.a.createElement(c.a,{id:"tooltip-".concat(m),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"})))):r.a.createElement("div",{className:a,style:u?{display:"none"}:{}},r.a.createElement("label",{htmlFor:n,className:"col-sm-6"},t),r.a.createElement("div",{className:"col-sm-6",id:n},s," ",d&&r.a.createElement("span",null,r.a.createElement(i.a,{color:"blue",size:"15px","data-tip":d,"data-for":"tooltip-".concat(m)}),r.a.createElement(c.a,{id:"tooltip-".concat(m),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"}))))};u.defaultProps={className:"col-sm-6",value:"",name:"",textToolTip:"",link:"",hidden:!1},u.propTypes={label:l.a.oneOfType([l.a.string,l.a.object]).isRequired,className:l.a.string,id:l.a.string,name:l.a.string,textToolTip:l.a.string,value:l.a.oneOfType([l.a.string,l.a.number]),link:l.a.string,hidden:l.a.bool},t.a=u},709:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),l=function(e){var t=e.label,a=e.className,n=e.size,o=e.id,s=e.name,l=e.value,i=e.options,c=e.onChangeAction,u=e.onBlurAction,m=e.required,d=e.error,f=e.errorMessage,p=e.optionValue,h=e.optionName,v=e.readOnly,g=e.placeholder,E=e.divClassName,b=e.emptyOption;return r.a.createElement("div",{className:"form-group ".concat(n," ").concat(E)},r.a.createElement("label",{htmlFor:o,className:"col-sm-6 ".concat(m)},t),r.a.createElement("div",{className:"col-sm-6"},r.a.createElement("select",{className:"form-control input-sm ".concat(a)+(d&&" has-error"),id:o,name:s,value:l||"",onChange:c,onBlur:u,readOnly:v},b&&r.a.createElement("option",{value:""},g),i.map((function(e){return r.a.createElement("option",{key:e[p],value:e[p]},e[h])})))),d&&r.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},r.a.createElement("span",{className:"has-error-message"}," ",f)))};l.defaultProps={divClassName:"",className:"",size:"col-sm-6",readOnly:!1,required:"",error:!1,errorMessage:"",value:"",optionValue:"id",optionName:"name",placeholder:"",emptyOption:!0},l.propTypes={label:s.a.string.isRequired,className:s.a.string,size:s.a.string,id:s.a.string,name:s.a.string.isRequired,options:s.a.array,value:s.a.oneOfType([s.a.string,s.a.number]),onChangeAction:s.a.func,onBlurAction:s.a.func,required:s.a.string,readOnly:s.a.bool,error:s.a.bool,errorMessage:s.a.string,emptyOption:s.a.bool,optionValue:s.a.string,optionName:s.a.string,placeholder:s.a.string},t.a=l},718:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),l=function(e){var t=e.className,a=e.children;return r.a.createElement("div",{className:"panel-heading ".concat(t)},a)};l.defaultProps={className:""},l.propTypes={className:s.a.string},t.a=l},719:function(e,t,a){"use strict";var n=a(24),r=a.n(n),o=a(25),s=a.n(o),l=a(22),i=a.n(l),c=a(26),u=a.n(c),m=a(27),d=a.n(m),f=a(16),p=a.n(f),h=a(6),v=a.n(h),g=a(0),E=a.n(g),b=a(8),y=a.n(b),N=a(742),D=a.n(N),R=a(743),q=a.n(R),w=a(7),k=a.n(w),O=a(707),C=a(708);function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=p()(e);if(t){var r=p()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return d()(this,a)}}k.a.locale("nl");var T=function(e){u()(a,e);var t=S(a);function a(e){var n;return r()(this,a),n=t.call(this,e),v()(i()(n),"validateDate",(function(e){var t=k()(e.target.value,"DD-MM-YYYY",!0),a=!1;t.isValid()||""===e.target.value||(a=!0),n.props.disabledBefore&&t.isBefore(n.props.disabledBefore)&&(a=!0),n.props.disabledAfter&&t.isAfter(n.props.disabledAfter)&&(a=!0),n.setState({errorDateFormat:a})})),v()(i()(n),"onDateChange",(function(e){var t=e?k()(e).format("Y-MM-DD"):"",a=!1;t&&n.props.disabledBefore&&k()(t).isBefore(n.props.disabledBefore)&&(a=!0),t&&n.props.disabledAfter&&k()(t).isAfter(n.props.disabledAfter)&&(a=!0),n.setState({errorDateFormat:a}),!a&&n.props.onChangeAction(t,n.props.name)})),n.state={errorDateFormat:!1},n}return s()(a,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.className,n=e.size,r=e.divSize,o=e.id,s=e.value,l=e.required,i=e.readOnly,c=e.name,u=e.textToolTip,m=e.error,d=e.errorMessage,f=e.disabledBefore,p=e.disabledAfter,h=s?k()(s).format("L"):"",v={};return f&&(v.before=new Date(f)),p&&(v.after=new Date(p)),E.a.createElement("div",{className:"form-group ".concat(r)},E.a.createElement("div",null,E.a.createElement("label",{htmlFor:o,className:"col-sm-6 ".concat(l)},t)),E.a.createElement("div",{className:"".concat(n)},E.a.createElement(D.a,{id:o,value:h,formatDate:R.formatDate,parseDate:R.parseDate,onDayChange:this.onDateChange,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:q.a,disabledDays:v},inputProps:{className:"form-control input-sm ".concat(a)+(this.state.errorDateFormat||m?" has-error":""),name:c,onBlur:this.validateDate,autoComplete:"off",readOnly:i,disabled:i},required:l,readOnly:i,placeholder:""})),u&&E.a.createElement("div",{className:"col-sm-1"},E.a.createElement(O.a,{color:"blue",size:"15px","data-tip":u,"data-for":"tooltip-".concat(c)}),E.a.createElement(C.a,{id:"tooltip-".concat(c),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"})),m&&E.a.createElement("div",{className:"col-sm-offset-6 col-sm-6"},E.a.createElement("span",{className:"has-error-message"}," ",d)))}}]),a}(g.Component);T.defaultProps={className:"",size:"col-sm-6",divSize:"col-sm-6",required:"",readOnly:!1,value:null,name:"",textToolTip:"",error:!1,errorMessage:"",disabledBefore:null,disabledAfter:null},T.propTypes={label:y.a.string.isRequired,type:y.a.string,className:y.a.string,size:y.a.string,divSize:y.a.string,id:y.a.string,name:y.a.string,textToolTip:y.a.string,value:y.a.oneOfType([y.a.string,y.a.object]),onChangeAction:y.a.func,required:y.a.string,readOnly:y.a.bool,error:y.a.bool,errorMessage:y.a.string,disabledBefore:y.a.string,disabledAfter:y.a.string},t.a=T},790:function(e,t,a){"use strict";var n=a(2),r=a.n(n),o="".concat(URL_API,"/api/organisation");t.a={newOrganisation:function(e){var t="".concat(o),a="Bearer "+localStorage.getItem("access_token");return r.a.defaults.headers.common.Authorization=a,r.a.post(t,e)},updateOrganisation:function(e){var t="".concat(o,"/").concat(e.id),a="Bearer "+localStorage.getItem("access_token");return r.a.defaults.headers.common.Authorization=a,r.a.post(t,e)},getOrganisationPeek:function(){var e="".concat(o,"/peek"),t="Bearer "+localStorage.getItem("access_token");return r.a.defaults.headers.common.Authorization=t,r.a.get(e).then((function(e){return e.data.data})).catch((function(e){console.log(e)}))}}},791:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(8),s=a.n(o),l=function(e){var t=e.label,a=e.size,n=e.sizeLabel,o=e.sizeInput,s=e.id,l=e.name,i=e.value,c=e.onChangeAction,u=e.required,m=e.error,d=e.rows;return r.a.createElement("div",{className:"form-group ".concat(a)},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:n},r.a.createElement("label",{htmlFor:s,className:"col-sm-12 ".concat(u)},t)),r.a.createElement("div",{className:o},r.a.createElement("textarea",{name:l,value:i,onChange:c,className:"form-control input-sm "+(m?"has-error":""),rows:d}))))};l.defaultProps={size:"col-sm-12",sizeLabel:"col-sm-3",sizeInput:"col-sm-9",value:"",required:"",error:!1,rows:"5"},l.propTypes={label:s.a.string.isRequired,type:s.a.string,size:s.a.string,sizeLabel:s.a.string,sizeInput:s.a.string,id:s.a.string,name:s.a.string.isRequired,value:s.a.oneOfType([s.a.string,s.a.number]),onChangeAction:s.a.func,required:s.a.string,error:s.a.bool},t.a=l}}]);