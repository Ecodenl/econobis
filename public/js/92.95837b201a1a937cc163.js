(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{1649:function(e,t,n){"use strict";n.r(t);var a=n(15),r=n.n(a),o=n(16),c=n.n(o),u=n(17),i=n.n(u),l=n(18),s=n.n(l),d=n(13),p=n.n(d),f=n(0),m=n.n(f),E=n(20),h=n(158),y=n(932),b=n(12),g=n.n(b),v=n(5),D=n.n(v),N=n(4),I=n(7),S=n.n(I),A=n(171),T=n(122),_=n(39),O=n(36),R=n(89);function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){D()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function L(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=p()(e);if(t){var r=p()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return s()(this,n)}}S.a.locale("nl");var w=function(e){i()(n,e);var t=L(n);function n(e){var a;return r()(this,n),a=t.call(this,e),D()(g()(a),"handleInputChange",(function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,r=t.name;a.setState(P(P({},a.state),{},{housingFile:P(P({},a.state.housingFile),{},D()({},r,n))}))})),D()(g()(a),"handleSubmit",(function(e){e.preventDefault();var t=a.state.housingFile;A.a.newHousingFile(t).then((function(e){N.f.push("/woningdossier/".concat(e.data.id))}))})),a.state={housingFile:{contactId:e.contactId,addressId:e.addressId,buildingTypeId:"",buildYear:"",isHouseForSale:"",surface:"",roofTypeId:"",energyLabelId:"",floors:0,energyLabelStatusId:"",isMonument:!1}},a}return c()(n,[{key:"render",value:function(){var e=this.state.housingFile,t=e.addressId,n=e.buildingTypeId,a=e.buildYear,r=e.isHouseForSale,o=e.surface,c=e.roofTypeId,u=e.energyLabelId,i=e.floors,l=e.energyLabelStatusId,s=e.isMonument,d=this.props.contactDetails,p=d.addresses,f=void 0===p?[]:p,E=d.fullName;return m.a.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},m.a.createElement("div",{className:"row"},m.a.createElement(O.a,{label:"Contact",name:"fullName",value:E,onChange:function(){},readOnly:!0}),m.a.createElement("div",{className:"form-group col-sm-6"},m.a.createElement("label",{htmlFor:"addressId",className:"col-sm-6"},"Adres"),m.a.createElement("div",{className:"col-sm-6"},m.a.createElement("select",{className:"form-control input-sm",id:"addressId",name:"addressId",value:t,onChange:this.handleInputChange},f.map((function(e,t){var n=e.street+" "+e.number+(e.addition?"-"+e.addition:"");return m.a.createElement("option",{key:t,value:e.id},"".concat(n))})))))),m.a.createElement("div",{className:"row"},m.a.createElement(T.a,{label:"Woningtype",size:"col-sm-6",name:"buildingTypeId",value:n,options:this.props.buildingTypes,onChangeAction:this.handleInputChange}),m.a.createElement(O.a,{type:"number",label:"Bouwjaar",name:"buildYear",value:a,min:"1500",max:"3000",onChangeAction:this.handleInputChange})),m.a.createElement("div",{className:"row"},m.a.createElement(O.a,{type:"number",label:"Gebruiksoppervlakte",name:"surface",value:o,min:"0",onChangeAction:this.handleInputChange}),m.a.createElement(T.a,{label:"Daktype",size:"col-sm-6",name:"roofTypeId",value:c,options:this.props.roofTypes,onChangeAction:this.handleInputChange})),m.a.createElement("div",{className:"row"},m.a.createElement(T.a,{label:"Energielabel",size:"col-sm-6",name:"energyLabelId",value:u,options:this.props.energyLabels,onChangeAction:this.handleInputChange}),m.a.createElement(O.a,{type:"number",label:"Aantal bouwlagen",name:"floors",value:i,min:"0",onChangeAction:this.handleInputChange})),m.a.createElement("div",{className:"row"},m.a.createElement(T.a,{label:"Status energielabel",size:"col-sm-6",name:"energyLabelStatusId",value:l,options:this.props.energyLabelStatus,onChangeAction:this.handleInputChange}),m.a.createElement(R.a,{label:"Monument",name:"isMonument",value:s,onChangeAction:this.handleInputChange})),m.a.createElement("div",{className:"row"},m.a.createElement(R.a,{label:"Koophuis",name:"isHouseForSale",value:r,onChangeAction:this.handleInputChange})),m.a.createElement("div",{className:"panel-footer"},m.a.createElement("div",{className:"pull-right btn-group",role:"group"},m.a.createElement(_.a,{buttonText:"Opslaan",onClickAction:this.handleSubmit}))))}}]),n}(f.Component),U=Object(E.b)((function(e){return{buildingTypes:e.systemData.buildingTypes,roofTypes:e.systemData.roofTypes,energyLabels:e.systemData.energyLabels,energyLabelStatus:e.systemData.energyLabelStatus,contactDetails:e.contactDetails}}),null)(w),j=n(28),M=n(31),k=function(e){return m.a.createElement("div",null,m.a.createElement(j.a,null,m.a.createElement(M.a,null,m.a.createElement(U,{contactId:e.contactId,addressId:e.addressId}))))},F=n(51),B=function(e){return m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-md-4"},m.a.createElement("div",{className:"btn-group",role:"group"},m.a.createElement(F.a,{iconName:"glyphicon-arrow-left",onClickAction:N.e.goBack}))),m.a.createElement("div",{className:"col-md-4"},m.a.createElement("h4",{className:"text-center"},"Nieuw woningdossier")),m.a.createElement("div",{className:"col-md-4"}))};function H(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=p()(e);if(t){var r=p()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return s()(this,n)}}var Y=function(e){i()(n,e);var t=H(n);function n(e){return r()(this,n),t.call(this,e)}return c()(n,[{key:"componentDidMount",value:function(){Object(h.isEmpty)(this.props.contactDetails)&&this.props.fetchContactDetails(this.props.params.contactId)}},{key:"render",value:function(){return m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-md-9"},m.a.createElement("div",{className:"col-md-12 margin-10-top"},m.a.createElement(B,{contactId:this.props.params.contactId})),m.a.createElement("div",{className:"col-md-12 margin-10-top"},m.a.createElement(k,{contactId:this.props.params.contactId,addressId:this.props.params.addressId}))),m.a.createElement("div",{className:"col-md-3"}))}}]),n}(f.Component);t.default=Object(E.b)((function(e){return{contactDetails:e.contactDetails}}),(function(e){return{fetchContactDetails:function(t){e(Object(y.h)(t))}}}))(Y)},932:function(e,t,n){"use strict";n.d(t,"h",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"v",(function(){return o})),n.d(t,"u",(function(){return c})),n.d(t,"x",(function(){return u})),n.d(t,"g",(function(){return i})),n.d(t,"i",(function(){return l})),n.d(t,"q",(function(){return s})),n.d(t,"a",(function(){return d})),n.d(t,"l",(function(){return p})),n.d(t,"w",(function(){return f})),n.d(t,"f",(function(){return m})),n.d(t,"j",(function(){return E})),n.d(t,"s",(function(){return h})),n.d(t,"d",(function(){return y})),n.d(t,"k",(function(){return b})),n.d(t,"t",(function(){return g})),n.d(t,"e",(function(){return v})),n.d(t,"n",(function(){return D})),n.d(t,"p",(function(){return N})),n.d(t,"o",(function(){return I})),n.d(t,"m",(function(){return S})),n.d(t,"y",(function(){return A})),n.d(t,"b",(function(){return T})),n.d(t,"r",(function(){return _}));var a=function(e){return{type:"FETCH_CONTACT_DETAILS",payload:e}},r=function(e){return{type:"DELETE_CONTACT",id:e}},o=function(e){return{type:"UPDATE_PERSON",contactDetails:e}},c=function(e){return{type:"UPDATE_ORGANISATION",contactDetails:e}},u=function(e){return{type:"UPDATE_PORTAL_USER",portalUser:e}},i=function(e){return{type:"DELETE_PORTAL_USER",id:e}},l=function(e){return{type:"NEW_ADDRESS",address:e}},s=function(e){return{type:"UPDATE_ADDRESS",address:e}},d=function(e){return{type:"DELETE_ADDRESS",id:e}},p=function(e){return{type:"NEW_PHONE_NUMBER",phoneNumber:e}},f=function(e){return{type:"UPDATE_PHONE_NUMBER",phoneNumber:e}},m=function(e){return{type:"DELETE_PHONE_NUMBER",id:e}},E=function(e){return{type:"NEW_EMAIL_ADDRESS",emailAddress:e}},h=function(e){return{type:"UPDATE_EMAIL_ADDRESS",emailAddress:e}},y=function(e){return{type:"DELETE_EMAIL_ADDRESS",id:e}},b=function(e){return{type:"NEW_CONTACT_NOTE",note:e}},g=function(e){return{type:"UPDATE_CONTACT_NOTE",note:e}},v=function(e){return{type:"DELETE_CONTACT_NOTE",id:e}},D=function(){return{type:"UNSET_PRIMARY_ADDRESSES"}},N=function(){return{type:"UNSET_PRIMARY_PHONE_NUMBERS"}},I=function(){return{type:"UNSET_PRIMARY_EMAIL_ADDRESSES"}},S=function(e){return{type:"NEW_ADDRESS_ENERGY_SUPPLIER",addressEnergySupplier:e}},A=function(e){return{type:"UPDATE_ADDRESS_ENERGY_SUPPLIER",addressEnergySupplier:e}},T=function(e){return{type:"DELETE_ADDRESS_ENERGY_SUPPLIER",id:e}},_=function(e){return{type:"UPDATE_HOOM_ACCOUNT_ID",hoomAccountId:e}}}}]);