"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[3621],{23932:(e,t,a)=>{a.d(t,{A:()=>l});var r=a(61941);const l={fetchFreeFieldsFields:function(e,t,a){var l="".concat(URL_API,"/api/free-fields-field/grid");return r.A.get(l,{params:{filters:JSON.stringify(e),sorts:JSON.stringify(t),limit:a.limit,offset:a.offset}})},deleteFreeFieldsField:function(e){var t="".concat(URL_API,"/api/free-fields-field/").concat(e,"/delete");return r.A.post(t)},newFreeFieldsField:function(e){var t="".concat(URL_API,"/api/free-fields-field");return r.A.post(t,e).then((function(e){return e.data})).catch((function(e){console.log(e)}))},fetchFreeFieldDetails:function(e){var t="".concat(URL_API,"/api/free-fields-field/").concat(e);return r.A.get(t).then((function(e){return e.data.data}))},updateFreeFieldsField:function(e){return r.A.post("".concat(URL_API,"/api/free-fields-field/").concat(e.id,"/update"),e)},fetchFilterFreeFieldsFieldsContact:function(){var e="".concat(URL_API,"/api/free-fields-field/get-for-filter/contacts");return r.A.get(e)},fetchFilterFreeFieldsFieldsAddress:function(){var e="".concat(URL_API,"/api/free-fields-field/get-for-filter/addresses");return r.A.get(e)},peekFreeFieldsTables:function(){var e="".concat(URL_API,"/api/free-fields-field/free-fields-tables/peek");return r.A.get(e)},peekFreeFieldsFieldFormats:function(){var e="".concat(URL_API,"/api/free-fields-field/free-fields-field-formats/peek");return r.A.get(e)},fetchFreeFieldsFieldRecords:function(e,t){var a="".concat(URL_API,"/api/free-fields-field-records/get-values");return r.A.get(a,{params:{table:e,recordId:t}}).then((function(e){return e.data}))},updateFreeFieldsFieldRecords:function(e,t){var a="".concat(URL_API,"/api/free-fields-field-records/update-values");return r.A.post(a,{data:{records:e,recordId:t}})}}},16888:(e,t,a)=>{a.d(t,{A:()=>b});var r=a(5544),l=a(96540),n=a(5556),i=a.n(n),s=a(60801),o=a.n(s),d=a(95093),c=a.n(d),m=a(91385),u=a(4353),f=a(41904),p=a(26819),h=function(e){var t=e.className,a=e.divSize,n=e.sizeDate,i=e.sizeTime,s=e.label,d=e.id,h=e.name,b=e.value,v=e.onChangeActionDate,g=e.onChangeActionTime,E=e.readOnly,A=e.required,F=e.start,N=e.end,y=e.step,w=e.textToolTip,k=e.error,V=e.errorMessage,D=e.disabledBefore,C=e.disabledAfter,I=e.nullable,T=e.nullableLabel,x=(0,l.useState)(!1),M=(0,r.A)(x,2),O=M[0],P=M[1],S=b?c()(b).format("L"):"",_=b?c()(b).format("HH:mm"):"",j=(0,l.useState)({before:D?new Date(D):"",after:C?new Date(C):""}),R=(0,r.A)(j,2),L=R[0],q=(R[1],(0,l.useState)("00:00"==b)),W=(0,r.A)(q,2),z=W[0],H=W[1];return l.createElement("div",{className:"form-group ".concat(a)},l.createElement("label",{htmlFor:d,className:"col-sm-6 ".concat(A)},s),l.createElement("div",{className:"".concat(n)},l.createElement(m.default,{id:d,value:S,formatDate:u.formatDate,parseDate:u.parseDate,onDayChange:function(e){var t=e?c()(e).format("Y-MM-DD"):"",a=!1;t&&D&&c()(t).isBefore(D)&&(a=!0),t&&C&&c()(t).isAfter(C)&&(a=!0),P(a),!a&&v(t,h)},dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:u.default,disabledDays:L},inputProps:{className:"form-control input-sm ".concat(t)+(O||k?" has-error":""),name:h,onBlur:function(e){var t=c()(e.target.value,"DD-MM-YYYY",!0),a=!1;t.isValid()||""===e.target.value||(a=!0),D&&t.isBefore(D)&&(a=!0),C&&t.isAfter(C)&&(a=!0),P(a)},autoComplete:"off",readOnly:E,disabled:E},required:A,readOnly:E,placeholder:""})),l.createElement("div",{className:"".concat(i)},z?l.createElement("span",null,"Onbekend"):E?l.createElement("input",{name:h,value:_,className:"form-control input-sm",readOnly:!0,disabled:!0}):l.createElement(o(),{name:h,value:_,onChange:function(e){var t=c()("1900-01-01 00:00:00").add(e,"seconds").format("HH:mm");g(t,h)},start:F,end:N,step:y,format:24,className:"input-sm"})),l.createElement("div",{className:"col-sm-1"},I?l.createElement("label",null,l.createElement("input",{type:"checkbox",name:"nullableChecked",value:!0,title:z?"Vink uit: tijdstip zetten":"Vink aan: tijdstip onbekend",checked:z,onChange:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value;H(a),g(a?"00:00":"08:00",h)}})," ",T):"",w&&l.createElement(l.Fragment,null,l.createElement(f.__w,{color:"blue",size:"15px","data-tip":w,"data-for":"tooltip-".concat(h)}),l.createElement(p.A,{id:"tooltip-".concat(h),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"}))),k&&l.createElement("div",{className:"col-sm-offset-6 col-sm-6"},l.createElement("span",{className:"has-error-message"}," ",V)))};h.defaultProps={className:"",divSize:"col-sm-6",sizeDate:"col-sm-3",sizeTime:"col-sm-2",required:"",readOnly:!1,value:null,name:"",textToolTip:"",error:!1,errorMessage:"",disabledBefore:null,disabledAfter:null,start:"08:00",end:"23:00",step:15,nullable:!1,nullableLabel:"",nullableChecked:!1},h.propTypes={label:i().string.isRequired,className:i().string,divSize:i().string,sizeDate:i().string,sizeTime:i().string,id:i().string,name:i().string.isRequired,value:i().oneOfType([i().string]),onChangeActionDate:i().func,onChangeActionTime:i().func,start:i().string,end:i().string,step:i().number,readOnly:i().bool,textToolTip:i().string,error:i().bool,errorMessage:i().string,disabledBefore:i().string,disabledAfter:i().string,nullable:i().bool,nullableLabel:i().string,nullableChecked:i().bool};const b=h},8617:(e,t,a)=>{a.d(t,{A:()=>c});var r=a(96540),l=a(24179),n=a(5556),i=a.n(n),s=a(41904),o=a(26819),d=function(e){var t=e.label,a=e.id,n=e.value,i=e.link,d=e.hidden,c=e.name,m=e.textToolTip;return i.length>0?r.createElement("div",{className:"form-group col-sm-12",style:d?{display:"none"}:{}},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-sm-3"},r.createElement("label",{htmlFor:a,className:"col-sm-12"},t)),r.createElement("div",{className:"col-sm-6",id:a,onClick:null},r.createElement(l.N_,{to:i,className:"link-underline"},n)," ",m&&r.createElement("span",null,r.createElement(s.__w,{color:"blue",size:"15px","data-tip":m,"data-for":"tooltip-".concat(c)}),r.createElement(o.A,{id:"tooltip-".concat(c),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"}))))):r.createElement("div",{className:"form-group col-sm-12",style:d?{display:"none"}:{}},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-sm-3"},r.createElement("label",{htmlFor:a,className:"col-sm-12"},t)),r.createElement("div",{className:"col-sm-6",id:a},n," ",m&&r.createElement("span",null,r.createElement(s.__w,{color:"blue",size:"15px","data-tip":m,"data-for":"tooltip-".concat(c)}),r.createElement(o.A,{id:"tooltip-".concat(c),effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"})))))};d.defaultProps={label:"",value:"",name:"",textToolTip:"",link:"",hidden:!1},d.propTypes={label:i().oneOfType([i().string,i().object]).isRequired,id:i().string,name:i().string,textToolTip:i().string,value:i().oneOfType([i().string,i().number]),link:i().string,hidden:i().bool};const c=d},35692:(e,t,a)=>{a.d(t,{A:()=>d});var r=a(96540),l=a(54814),n=a(77465),i=a(73421),s=a(33579),o=a(16888);const d=function(e){var t=e.fieldFormatType,a=e.defaultValue,d=e.mandatory,c=e.errors,m=e.errorsMessage,u=e.handleInputChange,f=e.handleInputChangeDate,p=e.handleInputChangeDatetimeDate,h=e.handleInputChangeDatetimeTime;switch(t){case"boolean":return r.createElement(n.A,{label:"Standaard waarde",name:"defaultValue",value:a,onChangeAction:u,required:d?"required":"",error:c.defaultValue,errorMessage:m.defaultValue});case"text_short":return r.createElement(l.A,{label:"Standaard waarde",name:"defaultValue",value:a,onChangeAction:u,type:"text",required:d?"required":"",error:c.defaultValue,errorMessage:m.defaultValue});case"text_long":return r.createElement(s.A,{label:"Standaard waarde",name:"defaultValue",value:a,onChangeAction:u,required:d?"required":"",error:c.defaultValue,errorMessage:m.defaultValue});case"int":case"double_2_dec":case"amount_euro":return r.createElement(l.A,{label:"Standaard waarde",name:"defaultValue",value:a,onChangeAction:u,type:"number",required:d?"required":"",error:c.defaultValue,errorMessage:m.defaultValue});case"date":return r.createElement(i.A,{label:"Standaard waarde",name:"defaultValue",value:a,onChangeAction:f,required:d?"required":"",error:c.defaultValue,errorMessage:m.defaultValue});case"datetime":return r.createElement(o.A,{label:"Standaard waarde",name:"defaultValue",value:a,onChangeActionDate:p,onChangeActionTime:h,required:d?"required":"",error:c.defaultValue,errorMessage:m.defaultValue,nullable:!0})}}},93621:(e,t,a)=>{a.r(t),a.d(t,{default:()=>J});var r=a(5544),l=a(96540),n=a(23932),i=a(62493),s=a(55849),o=a(91858),d=a(24179),c=a(2543),m=a(58168),u=a(23029),f=a(92901),p=a(56822),h=a(53954),b=a(85501),v=a(64467),g=a(69733),E=a(57761),A=a.n(E),F=a(54814),N=a(55956),y=a(77465),w=a(31714),k=a(72505),V=a.n(k),D=a(96643),C=a(30483),I=a(35692),T=a(95093),x=a.n(T);function M(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function O(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?M(Object(a),!0).forEach((function(t){(0,v.A)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):M(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function P(e,t,a){return t=(0,h.A)(t),(0,p.A)(e,S()?Reflect.construct(t,a||[],(0,h.A)(e).constructor):t.apply(e,a))}function S(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(S=function(){return!!e})()}const _=function(e){function t(e){var a;(0,u.A)(this,t),a=P(this,t,[e]),(0,v.A)(a,"handleInputChange",(function(e){var t=e.target,r="checkbox"===t.type?t.checked:t.value,l=t.name;a.setState(O(O({},a.state),{},{freeField:O(O({},a.state.freeField),{},(0,v.A)({},l,r))}))})),(0,v.A)(a,"handleInputChangeDate",(function(e,t){var r=e?x()(e).format("Y-MM-DD"):"";a.setState(O(O({},a.state),{},{freeField:O(O({},a.state.freeField),{},(0,v.A)({},t,r))}))})),(0,v.A)(a,"handleInputChangeDatetimeDate",(function(e,t){var r=e||"",l="08:00";a.state.freeField.defaultValue&&(l=x()(a.state.freeField.defaultValue).format("HH:mm"));var n="";A().isEmpty(r)||(n=x()(r+" "+l+":00").format("YYYY-MM-DD HH:mm:ss")),a.setState(O(O({},a.state),{},{freeField:O(O({},a.state.freeField),{},(0,v.A)({},t,n))}))})),(0,v.A)(a,"handleInputChangeDatetimeTime",(function(e,t){var r="",l=e||"08:00";a.state.freeField.defaultValue&&(r=x()(a.state.freeField.defaultValue).format("Y-MM-DD"));var n="";A().isEmpty(r)||(n=x()(r+" "+l+":00").format("YYYY-MM-DD HH:mm:ss")),a.setState(O(O({},a.state),{},{freeField:O(O({},a.state.freeField),{},(0,v.A)({},t,n))}))})),(0,v.A)(a,"handleSubmit",(function(e){e.preventDefault();var t=a.state.freeField,r={},l={},i=!1,s=(0,D.m)({fieldFormatType:"defaultValue",defaultValue:a.state.freeField.defaultValue,mandatory:a.state.freeField.mandatory,mask:a.state.freeField.mask});s&&(l.defaultValue=s,r.defaultValue=!0,i=!0),A().isEmpty(t.tableId+"")&&(r.tableId=!0,l.tableId="verplicht",i=!0),A().isEmpty(t.fieldFormatId+"")&&(r.fieldFormatId=!0,l.fieldFormatId="verplicht",i=!0),A().isEmpty(t.fieldName)&&(r.fieldName=!0,l.fieldName="verplicht",i=!0),null==t.fieldNameWebform||A().isEmpty(t.fieldNameWebform)||t.fieldNameWebform.match(/^[a-z0-9_]+$/)||(r.fieldNameWebform=!0,l.fieldNameWebform="Waarde ongeldig",i=!0),t.mandatory&&A().isEmpty(""+t.defaultValue)&&(r.defaultValue=!0,l.defaultValue="verplicht",i=!0),A().isEmpty(t.sortOrder+"")&&(r.sortOrder=!0,l.sortOrder="verplicht",i=!0),a.setState(O(O({},a.state),{},{errors:r,errorsMessage:l})),!i&&n.A.updateFreeFieldsField(t).then((function(){a.props.fetchFreeField(),a.props.switchToView()})).catch((function(e){console.log(e),alert("Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.")}))}));var r=e.freeField,l=r.id,i=r.tableId,s=r.tablePrefixFieldNameWebform,o=(r.fieldFormat,r.fieldFormatId),d=r.fieldName,c=r.fieldNameWebform,m=r.visiblePortal,f=r.changePortal,p=r.mandatory,h=r.defaultValue,b=r.exportable,g=r.sortOrder,E=r.mask;return a.state={freeField:{id:l,tableId:i,tablePrefixFieldNameWebform:s,fieldFormatId:o,fieldName:d,fieldNameWebform:c,visiblePortal:m,changePortal:f,mandatory:p,defaultValue:h,exportable:b,sortOrder:g,mask:E},freeFieldsTables:[],freeFieldsFieldFormats:[],errors:{tableId:!1,fieldFormatId:!1,fieldName:!1,fieldNameWebform:!1,visiblePortal:!1,changePortal:!1,mandatory:!1,defaultValue:!1,exportable:!1,sortOrder:!1,mask:!1},errorsMessage:{tableId:"",fieldFormatId:"",fieldName:"",fieldNameWebform:"",visiblePortal:"",changePortal:"",mandatory:"",defaultValue:"",exportable:"",sortOrder:"",mask:""}},a.handleReactSelectChange=a.handleReactSelectChange.bind(a),a}return(0,b.A)(t,e),(0,f.A)(t,[{key:"componentDidMount",value:function(){var e=this;V().all([n.A.peekFreeFieldsTables(),n.A.peekFreeFieldsFieldFormats()]).then(V().spread((function(t,a){e.setState({freeFieldsTables:t.data.data,freeFieldsFieldFormats:a.data.data})})))}},{key:"handleReactSelectChange",value:function(e,t){this.setState(O(O({},this.state),{},{freeField:O(O({},this.state.freeField),{},(0,v.A)({},t,e))}))}},{key:"render",value:function(){var e=this.state.freeField,t=e.tableId,a=e.tablePrefixFieldNameWebform,r=e.fieldFormatId,n=e.fieldName,o=e.fieldNameWebform,d=e.visiblePortal,c=e.changePortal,m=e.mandatory,u=e.defaultValue,f=e.exportable,p=e.sortOrder,h=e.mask;return l.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},l.createElement(i.A,null,l.createElement(s.A,null,l.createElement("div",{className:"row"},l.createElement(w.A,{label:"Op onderdeel",id:"tableId",name:"tableId",options:this.state.freeFieldsTables,value:t,disabled:!0}),l.createElement(w.A,{label:"Type",id:"fieldFormatId",name:"fieldFormatId",options:this.state.freeFieldsFieldFormats,value:r,disabled:!0})),l.createElement("div",{className:"row"},l.createElement(F.A,{label:"Veldnaam",name:"fieldName",value:n,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.fieldName,errorMessage:this.state.errorsMessage.fieldName}),l.createElement(y.A,{label:"Verplicht",name:"mandatory",value:m,onChangeAction:this.handleInputChange,error:this.state.errors.mandatory,errorMessage:this.state.errorsMessage.mandatory})),l.createElement("div",{className:"row"},l.createElement(y.A,{label:"Zichtbaar in portaal",name:"visiblePortal",value:d,onChangeAction:this.handleInputChange,error:this.state.errors.visiblePortal,errorMessage:this.state.errorsMessage.visiblePortal}),l.createElement(y.A,{label:"Aan te passen in portaal",name:"changePortal",value:c,onChangeAction:this.handleInputChange,error:this.state.errors.changePortal,errorMessage:this.state.errorsMessage.changePortal})),l.createElement("div",{className:"row"},l.createElement(I.A,{fieldFormatType:this.props.freeField.fieldFormat.formatType,defaultValue:u,mandatory:m,errors:this.state.errors,errorsMessage:this.state.errorsMessage,handleInputChange:this.handleInputChange,handleInputChangeDate:this.handleInputChangeDate,handleInputChangeDatetimeDate:this.handleInputChangeDatetimeDate,handleInputChangeDatetimeTime:this.handleInputChangeDatetimeTime}),l.createElement(y.A,{label:"Exporteerbaar",name:"exportable",value:f,onChangeAction:this.handleInputChange,error:this.state.errors.exportable,errorMessage:this.state.errorsMessage.exportable})),l.createElement("div",{className:"row"},l.createElement(F.A,{label:"Volgorde",name:"sortOrder",value:p,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.sortOrder,errorMessage:this.state.errorsMessage.sortOrder,type:"number"})),null!=a?l.createElement("div",{className:"row"},l.createElement(C.A,{className:"form-group col-sm-6 ",label:"Veldnaam webformulier",value:o?a+o:""}),l.createElement(F.A,{label:"Wijzig veldnaam webformulier",name:"fieldNameWebform",value:o,size:"col-sm-5",onChangeAction:this.handleInputChange,error:this.state.errors.fieldNameWebform,errorMessage:this.state.errorsMessage.fieldNameWebform,textToolTip:"Te gebruiken veldnaam voor webformulier in snake_case notatie. Alleen kleine letters, cijfers en liggend streepje (undescore) toegestaan.Veldnamen voor webformulieren hebben altijd een vaste prefix, afhankelijk van onderdeel."})):null,l.createElement("hr",null),l.createElement("div",{className:"row"},l.createElement(F.A,{label:"Masker",name:"mask",value:h,onChangeAction:this.handleInputChange,error:this.state.errors.mask,errorMessage:this.state.errorsMessage.mask}),l.createElement("div",{className:"form-group col-sm-3 "},l.createElement("div",{className:"col-sm-12"},"Legenda:",l.createElement("br",null),"9 = nummer",l.createElement("br",null),"a = letter",l.createElement("br",null),"x = nummer / letter",l.createElement("br",null),"Alle andere karakters zullen letterlijk moeten worden gebruikt")),l.createElement("div",{className:"form-group col-sm-3"},l.createElement("div",{className:"col-sm-6"},"Voorbeelden:",l.createElement("br",null),"999-999",l.createElement("br",null),"9a9/999a",l.createElement("br",null),"999-99-9999",l.createElement("br",null),"xx.xx.xxxx.xx"),l.createElement("div",{className:"col-sm-6"},l.createElement("br",null),"123-760",l.createElement("br",null),"3q2/887w",l.createElement("br",null),"987-65-4329",l.createElement("br",null),"12.qq.12aw.3r")))),l.createElement(s.A,null,l.createElement("div",{className:"pull-right btn-group",role:"group"},l.createElement(N.A,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:this.props.switchToView}),l.createElement(N.A,{buttonText:"Opslaan",type:"submit",value:"Submit"})))))}}])}(l.Component);var j=a(60123),R=a(8617);const L=function(e){var t=e.fieldFormatType,a=e.defaultValue;switch(t){case"boolean":return l.createElement(C.A,{label:"Standaard waarde",value:1==a?"Ja":"Nee"});case"text_short":case"int":return l.createElement(C.A,{label:"Standaard waarde",value:a||""});case"text_long":return l.createElement(R.A,{label:"Standaard waarde",value:a||""});case"double_2_dec":return l.createElement(C.A,{label:"Standaard waarde",value:a?parseFloat(a).toFixed(2):""});case"amount_euro":return l.createElement(C.A,{label:"Standaard waarde",value:a?(0,j.A)(a):""});case"date":return l.createElement(C.A,{label:"Standaard waarde",value:a?x()(a).format("L"):""});case"datetime":var r=x()(a).format("HH:mm"),n=a?"00:00"===r?x()(a).format("L")+" (onbekend)":x()(a).format("L HH:mm"):"";return l.createElement(C.A,{label:"Standaard waarde",value:n})}},q=function(e){var t=e.fieldName,a=e.fieldNameWebform,r=e.mandatory,n=e.visiblePortal,o=e.changePortal,d=e.defaultValue,c=e.switchToEdit,m=e.table,u=e.tablePrefixFieldNameWebform,f=e.fieldFormat,p=e.exportable,h=e.sortOrder,b=e.mask;return l.createElement("div",{onClick:c},l.createElement(i.A,null,l.createElement(s.A,null,l.createElement("div",{className:"row"},l.createElement(C.A,{label:"Op onderdeel",value:m.name}),l.createElement(C.A,{label:"Type",value:f.formatName})),l.createElement("div",{className:"row"},l.createElement(C.A,{label:"Veldnaam",value:t}),l.createElement(C.A,{label:"Verplicht",value:r?"Ja":"Nee"})),l.createElement("div",{className:"row"},l.createElement(C.A,{label:"Zichtbaar in portaal",value:n?"Ja":"Nee"}),l.createElement(C.A,{label:"Aan te passen in portaal",value:o?"Ja":"Nee"})),l.createElement("div",{className:"row"},l.createElement(L,{fieldFormatType:f.formatType,defaultValue:d}),l.createElement(C.A,{label:"Exporteerbaar",value:p?"Ja":"Nee"})),l.createElement("div",{className:"row"},l.createElement(C.A,{label:"Volgorde",value:h})),null!=u?l.createElement("div",{className:"row"},l.createElement(C.A,{label:"Veldnaam webformulier",value:a?u+a:""})):null,l.createElement("div",{className:"row"},l.createElement(C.A,{label:"Masker",value:b})))))};function W(e,t,a){return t=(0,h.A)(t),(0,p.A)(e,z()?Reflect.construct(t,a||[],(0,h.A)(e).constructor):t.apply(e,a))}function z(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(z=function(){return!!e})()}var H=function(e){function t(e){var a;return(0,u.A)(this,t),a=W(this,t,[e]),(0,v.A)(a,"switchToEdit",(function(){a.setState({showEdit:!0})})),(0,v.A)(a,"switchToView",(function(){a.setState({showEdit:!1,activeDiv:""})})),a.state={showEdit:!1,activeDiv:""},a}return(0,b.A)(t,e),(0,f.A)(t,[{key:"onDivEnter",value:function(){this.setState({activeDiv:"panel-grey"})}},{key:"onDivLeave",value:function(){this.state.showEdit||this.setState({activeDiv:""})}},{key:"render",value:function(){var e=this,t=this.props.permissions,a=void 0===t?{}:t;return l.createElement("div",{className:this.state.activeDiv,onMouseEnter:function(){return e.onDivEnter()},onMouseLeave:function(){return e.onDivLeave()}},this.state.showEdit&&a.manageFreeFields?l.createElement(_,{freeField:this.props.freeField,switchToView:this.switchToView,fetchFreeField:this.props.fetchFreeField}):l.createElement(q,(0,m.A)({},this.props.freeField,{switchToEdit:this.switchToEdit})))}}])}(l.Component);const Y=(0,g.Ng)((function(e){return{permissions:e.meDetails.permissions}}))(H),B=function(e){var t=e.freeField,a=e.hasError,r=e.isLoading,n=e.fetchFreeField,i="",s=!0;return a?i="Fout bij het ophalen van het vrije veld.":r?i="Gegevens aan het laden.":(0,c.isEmpty)(t)?i="Geen vrij veld gevonden!":s=!1,s?l.createElement("div",null,i):l.createElement("div",null,l.createElement(Y,{freeField:t,fetchFreeField:n}))};var U=a(29008);const J=function(e){var t=(0,l.useState)(null),a=(0,r.A)(t,2),c=a[0],m=a[1],u=(0,l.useState)(!1),f=(0,r.A)(u,2),p=f[0],h=f[1];function b(){n.A.fetchFreeFieldDetails(e.params.id).then((function(e){m(e)})).catch((function(){alert("Er is iets misgegaan met ophalen van het vrije veld.")}))}return(0,l.useEffect)((function(){b()}),[]),c?l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-9"},l.createElement("div",{className:"col-md-12 margin-10-top"},l.createElement(i.A,null,l.createElement(s.A,{className:"panel-small"},l.createElement("div",{className:"row"},l.createElement("div",{className:"col-md-4"},l.createElement("div",{className:"btn-group",role:"group"},l.createElement(o.A,{iconName:"arrowLeft",onClickAction:d.Nc.goBack}),!c.hasFreeFieldsFieldRecords&&l.createElement(o.A,{iconName:"trash",onClickAction:function(){h(!0)}}))),l.createElement("div",{className:"col-md-4"},l.createElement("h4",{className:"text-center"},"Vrij veld: ",c.table.name," / ",c.fieldName)),l.createElement("div",{className:"col-md-4"}))))),l.createElement("div",{className:"col-md-12"},l.createElement(B,{freeField:c,fetchFreeField:b})),l.createElement("div",{className:"col-md-12 margin-10-top"})),p&&l.createElement(U.A,{closeDeleteItemModal:function(){h(!1)},deleteFreeFieldsField:function(e){n.A.deleteFreeFieldsField(e).then((function(){d.RL.push("/vrije-velden")})).catch((function(e){console.log(e),alert("Er is iets misgegaan bij verwijderen. Probeer het opnieuw.")}))},description:c.fieldName,id:c.id})):null}},29008:(e,t,a)=>{a.d(t,{A:()=>n});var r=a(96540),l=a(63750);const n=function(e){var t=e.deleteFreeFieldsField,a=e.closeDeleteItemModal,n=e.description,i=e.id;return r.createElement(l.A,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:a,confirmAction:function(){return t(i),void a()},title:"Verwijderen"},"Verwijder vrije veld: ",r.createElement("strong",null,n),"?")}},96643:(e,t,a)=>{a.d(t,{m:()=>n});var r=a(57761),l=a.n(r);function n(e){var t=null;switch(e.fieldFormatType){case"defaultValue":t=e.defaultValue;break;case"boolean":t=e.fieldRecordValueBoolean;break;case"text_short":case"text_long":t=e.fieldRecordValueText;break;case"int":t=e.fieldRecordValueInt;break;case"double_2_dec":case"amount_euro":t=e.fieldRecordValueDouble;break;case"date":case"datetime":t=e.fieldRecordValueDatetime}return 1!=e.mandatory||null!=t&&!l().isEmpty(t+"")?!function(e,t){if(null!=e&&!l().isEmpty(""+e)&&null!=t&&!l().isEmpty(""+t)){var a=t.split(""),r=e.split(""),n=0;if(!t.includes("?")&&t.length!=e.length)return!1;for(n in a)switch(a[n]){case"9":if(!r[n]||!r[n].match(/^[0-9]$/))return!1;break;case"a":if(!r[n]||!r[n].match(/^[a-zA-Z]$/))return!1;break;case"x":if(!r[n]||!r[n].match(/^[a-zA-Z0-9]$/))return!1;break;default:if(r[n]!=a[n])return!1}}return!0}(t,e.mask,e.mandatory)&&"voldoet niet aan het masker: "+e.mask:"verplicht"}},60123:(e,t,a)=>{a.d(t,{A:()=>r});const r=function(e){return e||(e=0),e=parseFloat(e),isNaN(e)?"Ongeldig bedrag":"€ ".concat(e.toLocaleString("nl",{minimumFractionDigits:2,maximumFractionDigits:2}))}}}]);