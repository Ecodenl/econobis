"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[4817],{23932:(e,t,a)=>{a.d(t,{A:()=>l});var r=a(61941);const l={fetchFreeFieldsFields:function(e,t,a){var l="".concat(URL_API,"/api/free-fields-field/grid");return r.A.get(l,{params:{filters:JSON.stringify(e),sorts:JSON.stringify(t),limit:a.limit,offset:a.offset}})},deleteFreeFieldsField:function(e){var t="".concat(URL_API,"/api/free-fields-field/").concat(e,"/delete");return r.A.post(t)},newFreeFieldsField:function(e){var t="".concat(URL_API,"/api/free-fields-field");return r.A.post(t,e).then((function(e){return e.data})).catch((function(e){console.log(e)}))},fetchFreeFieldDetails:function(e){var t="".concat(URL_API,"/api/free-fields-field/").concat(e);return r.A.get(t).then((function(e){return e.data.data}))},updateFreeFieldsField:function(e){return r.A.post("".concat(URL_API,"/api/free-fields-field/").concat(e.id,"/update"),e)},fetchFilterFreeFieldsFieldsContact:function(){var e="".concat(URL_API,"/api/free-fields-field/get-for-filter/contacts");return r.A.get(e)},fetchFilterFreeFieldsFieldsAddress:function(){var e="".concat(URL_API,"/api/free-fields-field/get-for-filter/addresses");return r.A.get(e)},peekFreeFieldsTables:function(){var e="".concat(URL_API,"/api/free-fields-field/free-fields-tables/peek");return r.A.get(e)},peekFreeFieldsFieldFormats:function(){var e="".concat(URL_API,"/api/free-fields-field/free-fields-field-formats/peek");return r.A.get(e)},fetchFreeFieldsFieldRecords:function(e,t){var a="".concat(URL_API,"/api/free-fields-field-records/get-values");return r.A.get(a,{params:{table:e,recordId:t}}).then((function(e){return e.data}))},updateFreeFieldsFieldRecords:function(e,t){var a="".concat(URL_API,"/api/free-fields-field-records/update-values");return r.A.post(a,{data:{records:e,recordId:t}})}}},44817:(e,t,a)=>{a.r(t),a.d(t,{default:()=>q});var r=a(5544),l=a(96540),n=a(23932),i=a(62493),s=a(55849),o=a(91858),c=a(24179),d=a(2543),u=a(58168),m=a(23029),f=a(92901),h=a(56822),p=a(53954),v=a(85501),b=a(64467),E=a(69733),F=a(57761),g=a.n(F),A=a(54814),N=a(55956),y=a(77465),w=a(31714),k=a(72505),I=a.n(k),V=a(96643);function P(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function O(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?P(Object(a),!0).forEach((function(t){(0,b.A)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):P(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function C(e,t,a){return t=(0,p.A)(t),(0,h.A)(e,x()?Reflect.construct(t,a||[],(0,p.A)(e).constructor):t.apply(e,a))}function x(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(x=function(){return!!e})()}const R=function(e){function t(e){var a;(0,m.A)(this,t),a=C(this,t,[e]),(0,b.A)(a,"handleInputChange",(function(e){var t=e.target,r="checkbox"===t.type?t.checked:t.value,l=t.name;a.setState(O(O({},a.state),{},{freeField:O(O({},a.state.freeField),{},(0,b.A)({},l,r))}))})),(0,b.A)(a,"handleSubmit",(function(e){e.preventDefault();var t=a.state.freeField,r={},l={},i=!1,s=(0,V.m)({fieldFormatType:"defaultValue",defaultValue:a.state.freeField.defaultValue,mandatory:a.state.freeField.mandatory,mask:a.state.freeField.mask});s&&(l.defaultValue=s,r.defaultValue=!0,i=!0),g().isEmpty(t.tableId+"")&&(r.tableId=!0,l.tableId="verplicht",i=!0),g().isEmpty(t.fieldFormatId+"")&&(r.fieldFormatId=!0,l.fieldFormatId="verplicht",i=!0),g().isEmpty(t.fieldName)&&(r.fieldName=!0,l.fieldName="verplicht",i=!0),t.mandatory&&g().isEmpty(t.defaultValue)&&(r.defaultValue=!0,l.defaultValue="verplicht",i=!0),g().isEmpty(t.sortOrder+"")&&(r.sortOrder=!0,l.sortOrder="verplicht",i=!0),a.setState(O(O({},a.state),{},{errors:r,errorsMessage:l})),!i&&n.A.updateFreeFieldsField(t).then((function(){a.props.fetchFreeField(),a.props.switchToView()})).catch((function(e){console.log(e),alert("Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.")}))}));var r=e.freeField,l=r.id,i=r.tableId,s=r.fieldFormatId,o=r.fieldName,c=r.visiblePortal,d=r.changePortal,u=r.mandatory,f=r.defaultValue,h=r.exportable,p=r.sortOrder,v=r.mask;return a.state={freeField:{id:l,tableId:i,fieldFormatId:s,fieldName:o,visiblePortal:c,changePortal:d,mandatory:u,defaultValue:f,exportable:h,sortOrder:p,mask:v},freeFieldsTables:[],freeFieldsFieldFormats:[],errors:{tableId:!1,fieldFormatId:!1,fieldName:!1,visiblePortal:!1,changePortal:!1,mandatory:!1,defaultValue:!1,exportable:!1,sortOrder:!1,mask:!1},errorsMessage:{tableId:!1,fieldFormatId:!1,fieldName:!1,visiblePortal:!1,changePortal:!1,mandatory:!1,defaultValue:!1,exportable:!1,sortOrder:!1,mask:!1}},a.handleReactSelectChange=a.handleReactSelectChange.bind(a),a}return(0,v.A)(t,e),(0,f.A)(t,[{key:"componentDidMount",value:function(){var e=this;I().all([n.A.peekFreeFieldsTables(),n.A.peekFreeFieldsFieldFormats()]).then(I().spread((function(t,a){e.setState({freeFieldsTables:t.data.data,freeFieldsFieldFormats:a.data.data})})))}},{key:"handleReactSelectChange",value:function(e,t){this.setState(O(O({},this.state),{},{freeField:O(O({},this.state.freeField),{},(0,b.A)({},t,e))}))}},{key:"render",value:function(){var e=this.state.freeField,t=e.tableId,a=e.fieldFormatId,r=e.fieldName,n=e.visiblePortal,o=e.changePortal,c=e.mandatory,d=e.defaultValue,u=e.exportable,m=e.sortOrder,f=e.mask;return l.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},l.createElement(i.A,null,l.createElement(s.A,null,l.createElement("div",{className:"row"},l.createElement(w.A,{label:"Op onderdeel",id:"tableId",name:"tableId",options:this.state.freeFieldsTables,value:t,disabled:!0}),l.createElement(w.A,{label:"Type",id:"fieldFormatId",name:"fieldFormatId",options:this.state.freeFieldsFieldFormats,value:a,disabled:!0}),"/>"),l.createElement("div",{className:"row"},l.createElement(A.A,{label:"Veld naam",name:"fieldName",value:r,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.fieldName,errorMessage:this.state.errorsMessage.fieldName}),l.createElement(y.A,{label:"Verplicht",name:"mandatory",value:c,onChangeAction:this.handleInputChange,error:this.state.errors.mandatory,errorMessage:this.state.errorsMessage.mandatory})),l.createElement("div",{className:"row"},l.createElement(y.A,{label:"Zichtbaar in portaal",name:"visiblePortal",value:n,onChangeAction:this.handleInputChange,error:this.state.errors.visiblePortal,errorMessage:this.state.errorsMessage.visiblePortal}),l.createElement(y.A,{label:"Aan te passen in portaal",name:"changePortal",value:o,onChangeAction:this.handleInputChange,error:this.state.errors.changePortal,errorMessage:this.state.errorsMessage.changePortal})),l.createElement("div",{className:"row"},l.createElement(A.A,{label:"Standaard waarde",name:"defaultValue",value:d,onChangeAction:this.handleInputChange,required:c?"required":"",error:this.state.errors.defaultValue,errorMessage:this.state.errorsMessage.defaultValue}),l.createElement(y.A,{label:"Exporteerbaar",name:"exportable",value:u,onChangeAction:this.handleInputChange,error:this.state.errors.exportable,errorMessage:this.state.errorsMessage.exportable})),l.createElement("div",{className:"row"},l.createElement(A.A,{label:"Volgorde",name:"sortOrder",value:m,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.sortOrder,errorMessage:this.state.errorsMessage.sortOrder,type:"number"})),l.createElement("hr",null),l.createElement("div",{className:"row"},l.createElement(A.A,{label:"Masker",name:"mask",value:f,onChangeAction:this.handleInputChange,error:this.state.errors.mask,errorMessage:this.state.errorsMessage.mask}),l.createElement("div",{className:"form-group col-sm-3 "},l.createElement("div",{className:"col-sm-12"},"Legenda:",l.createElement("br",null),"9 = nummer",l.createElement("br",null),"a = letter",l.createElement("br",null),"x = nummer / letter",l.createElement("br",null),"Alle andere karakters zullen letterlijk moeten worden gebruikt")),l.createElement("div",{className:"form-group col-sm-3"},l.createElement("div",{className:"col-sm-6"},"Voorbeelden:",l.createElement("br",null),"999-999",l.createElement("br",null),"9a9/999a",l.createElement("br",null),"999-99-9999",l.createElement("br",null),"xx.xx.xxxx.xx"),l.createElement("div",{className:"col-sm-6"},l.createElement("br",null),"123-760",l.createElement("br",null),"3q2/887w",l.createElement("br",null),"987-65-4329",l.createElement("br",null),"12.qq.12aw.3r")))),l.createElement(s.A,null,l.createElement("div",{className:"pull-right btn-group",role:"group"},l.createElement(N.A,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:this.props.switchToView}),l.createElement(N.A,{buttonText:"Opslaan",type:"submit",value:"Submit"})))))}}])}(l.Component);a(95093);var M=a(30483);const j=function(e){var t=e.fieldName,a=e.mandatory,r=e.visiblePortal,n=e.changePortal,o=e.defaultValue,c=e.switchToEdit,d=e.table,u=e.fieldFormat,m=e.exportable,f=e.sortOrder,h=e.mask;return l.createElement("div",{onClick:c},l.createElement(i.A,null,l.createElement(s.A,null,l.createElement("div",{className:"row"},l.createElement(M.A,{label:"Op onderdeel",value:d.name}),l.createElement(M.A,{label:"Type",value:u.formatName})),l.createElement("div",{className:"row"},l.createElement(M.A,{label:"Veld naam",value:t}),l.createElement(M.A,{label:"Verplicht",value:a?"Ja":"Nee"})),l.createElement("div",{className:"row"},l.createElement(M.A,{label:"Zichtbaar in portaal",value:r?"Ja":"Nee"}),l.createElement(M.A,{label:"Aan te passen in portaal",value:n?"Ja":"Nee"})),l.createElement("div",{className:"row"},l.createElement(M.A,{label:"Standaard waarde",value:o}),l.createElement(M.A,{label:"Exporteerbaar",value:m?"Ja":"Nee"})),l.createElement("div",{className:"row"},l.createElement(M.A,{label:"Volgorde",value:f})),l.createElement("div",{className:"row"},l.createElement(M.A,{label:"Masker",value:h})))))};function S(e,t,a){return t=(0,p.A)(t),(0,h.A)(e,D()?Reflect.construct(t,a||[],(0,p.A)(e).constructor):t.apply(e,a))}function D(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(D=function(){return!!e})()}var T=function(e){function t(e){var a;return(0,m.A)(this,t),a=S(this,t,[e]),(0,b.A)(a,"switchToEdit",(function(){a.setState({showEdit:!0})})),(0,b.A)(a,"switchToView",(function(){a.setState({showEdit:!1,activeDiv:""})})),a.state={showEdit:!0,activeDiv:""},a}return(0,v.A)(t,e),(0,f.A)(t,[{key:"onDivEnter",value:function(){this.setState({activeDiv:"panel-grey"})}},{key:"onDivLeave",value:function(){this.state.showEdit||this.setState({activeDiv:""})}},{key:"render",value:function(){var e=this,t=this.props.permissions,a=void 0===t?{}:t;return l.createElement("div",{className:this.state.activeDiv,onMouseEnter:function(){return e.onDivEnter()},onMouseLeave:function(){return e.onDivLeave()}},this.state.showEdit&&a.manageFreeFields?l.createElement(R,{freeField:this.props.freeField,switchToView:this.switchToView,fetchFreeField:this.props.fetchFreeField}):l.createElement(j,(0,u.A)({},this.props.freeField,{switchToEdit:this.switchToEdit})))}}])}(l.Component);const L=(0,E.Ng)((function(e){return{permissions:e.meDetails.permissions}}))(T),_=function(e){var t=e.freeField,a=e.hasError,r=e.isLoading,n=e.fetchFreeField,i="",s=!0;return a?i="Fout bij het ophalen van het vrije veld.":r?i="Gegevens aan het laden.":(0,d.isEmpty)(t)?i="Geen vrij veld gevonden!":s=!1,s?l.createElement("div",null,i):l.createElement("div",null,l.createElement(L,{freeField:t,fetchFreeField:n}))};var U=a(29008);const q=function(e){var t=(0,l.useState)(null),a=(0,r.A)(t,2),d=a[0],u=a[1],m=(0,l.useState)(!1),f=(0,r.A)(m,2),h=f[0],p=f[1];function v(){n.A.fetchFreeFieldDetails(e.params.id).then((function(e){u(e)})).catch((function(){alert("Er is iets misgegaan met ophalen van het vrije veld.")}))}return(0,l.useEffect)((function(){v()}),[]),d?l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-9"},l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(i.A,null,l.createElement(s.A,{className:"panel-small"},l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-4"},l.createElement("div",{className:"btn-group",role:"group"},l.createElement(o.A,{iconName:"arrowLeft",onClickAction:c.Nc.goBack}),!d.hasFreeFieldsFieldRecords&&l.createElement(o.A,{iconName:"trash",onClickAction:function(){p(!0)}}))),l.createElement("div",{className:"col-md-4"},l.createElement("h4",{className:"text-center"},"Vrij veld: ",d.table.name," / ",d.fieldName)),l.createElement("div",{className:"col-md-4"}))))),l.createElement("div",{className:"col-md-12"},l.createElement(_,{freeField:d,fetchFreeField:v})),l.createElement("div",{className:"col-md-12 margin-10-top"})),h&&l.createElement(U.A,{closeDeleteItemModal:function(){p(!1)},deleteFreeFieldsField:function(e){n.A.deleteFreeFieldsField(e).then((function(){c.RL.push("/vrije-velden")})).catch((function(e){console.log(e),alert("Er is iets misgegaan bij verwijderen. Probeer het opnieuw.")}))},description:d.fieldName,id:d.id})):null}},29008:(e,t,a)=>{a.d(t,{A:()=>n});var r=a(96540),l=a(63750);const n=function(e){var t=e.deleteFreeFieldsField,a=e.closeDeleteItemModal,n=e.description,i=e.id;return r.createElement(l.A,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:a,confirmAction:function(){return t(i),void a()},title:"Verwijderen"},"Verwijder vrije veld: ",r.createElement("strong",null,n),"?")}},96643:(e,t,a)=>{a.d(t,{m:()=>n});var r=a(57761),l=a.n(r);function n(e){var t=null;switch(e.fieldFormatType){case"defaultValue":t=e.defaultValue;break;case"boolean":t=e.fieldRecordValueBoolean;break;case"text_short":case"text_long":t=e.fieldRecordValueText;break;case"int":t=e.fieldRecordValueInt;break;case"double_2_dec":case"amount_euro":t=e.fieldRecordValueDouble;break;case"date":case"datetime":t=e.fieldRecordValueDatetime}return 1!=e.mandatory||null!=t&&!l().isEmpty(t+"")?!function(e,t){if(null!=e&&!l().isEmpty(""+e)&&null!=t&&!l().isEmpty(""+t)){var a=t.split(""),r=e.split(""),n=0;if(!t.includes("?")&&t.length!=e.length)return!1;for(n in a)switch(a[n]){case"9":if(!r[n]||!r[n].match(/^[0-9]$/))return!1;break;case"a":if(!r[n]||!r[n].match(/^[a-zA-Z]$/))return!1;break;case"x":if(!r[n]||!r[n].match(/^[a-zA-Z0-9]$/))return!1;break;default:if(r[n]!=a[n])return!1}}return!0}(t,e.mask,e.mandatory)&&"voldoet niet aan het masker: "+e.mask:"verplicht"}}}]);