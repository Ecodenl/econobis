"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[5468],{95468:(e,t,r)=>{r.r(t),r.d(t,{default:()=>O});var n=r(15671),a=r(43144),l=r(97326),o=r(60136),c=r(82963),s=r(61120),i=r(4942),u=r(67294),m=r(48966),p=r.n(m),d=r(61409),v=r(14309),h=r(98688),f=r(55451);const g=function(e){(0,o.Z)(i,e);var t,r,l=(t=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,s.Z)(t);if(r){var a=(0,s.Z)(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return(0,c.Z)(this,e)});function i(e){return(0,n.Z)(this,i),l.call(this,e)}return(0,a.Z)(i,[{key:"render",value:function(){return u.createElement("div",{className:"row"},u.createElement("div",{className:"col-sm-12"},u.createElement(v.Z,null,u.createElement(h.Z,{className:"panel-small"},u.createElement("div",{className:"col-md-4"},u.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},u.createElement(f.Z,{iconName:"arrowLeft",onClickAction:d.mW.goBack}))),u.createElement("div",{className:"col-md-4"},u.createElement("h3",{className:"text-center table-title"},"Rapportage Energie Leverancier naar Excel")),u.createElement("div",{className:"col-md-4"})))))}}]),i}(u.Component);var E=r(30381),b=r.n(E),N=r(49332),y=r(25626),S=r(9181),R=r(7250);b().locale("nl");const w=function(e){return u.createElement("form",{className:"form-horizontal col-md-12",onSubmit:e.handleSubmit},u.createElement("div",{className:"row"},u.createElement(S.Z,{label:"Bestandsnaam",name:"documentName",value:e.documentName,onChangeAction:e.handleInputChange,required:"required",error:e.errors.documentName,errorMessage:e.errorMessage.documentName,divSize:"col-sm-12",labelSize:"col-sm-3",size:"col-sm-9"}),u.createElement(R.Z,{className:"form-group col-sm-12",labelSize:"col-sm-3",valueSize:"col-sm-9",label:"",value:"(Bestandsnaam wordt aangevuld met afkorting leverancier en ingestelde bestandsformaat)"})),u.createElement("div",{className:"row"},e.revenuePartsKwhForReport&&e.revenuePartsKwhForReport.distributionForReportEnergySupplier&&0==e.revenuePartsKwhForReport.distributionForReportEnergySupplier.length&&e.revenuePartsKwhForReport.distributionForReportEnergySupplier.length>100?u.createElement(u.Fragment,null,u.createElement(R.Z,{className:"form-group col-sm-12",labelSize:"col-sm-3",valueSize:"col-sm-9",label:"Rapportage voor deelnames",value:"Alle (aantal: "+e.revenuePartsKwhForReport.distributionForReportEnergySupplier.length+")"})):e.revenuePartsKwhForReport&&e.revenuePartsKwhForReport.distributionForReportEnergySupplier&&e.revenuePartsKwhForReport.distributionForReportEnergySupplier.length>0?u.createElement(u.Fragment,null,u.createElement(R.Z,{className:"form-group col-sm-12",labelSize:"col-sm-3",valueSize:"col-sm-9",label:"Rapportage voor deelnames",value:e.revenuePartsKwhForReport.distributionForReportEnergySupplier.map((function(e,t){return u.createElement(u.Fragment,null,u.createElement("strong",null,e.contactName),0!=e.deliveredKwhUpTo?u.createElement(u.Fragment,null," kWh te verwerken:  ",e.deliveredKwhUpTo.toLocaleString("nl",{minimumFractionDigits:2,maximumFractionDigits:2})):e.isLastPart?" (Op verwerkt zetten)":"",u.createElement("br",null))}))})):u.createElement(u.Fragment,null,u.createElement(R.Z,{className:"form-group col-sm-12",labelSize:"col-sm-3",valueSize:"col-sm-9",label:"Rapportage voor deelnames",value:"Geen"}))),u.createElement(y.Z,null,u.createElement("div",{className:"pull-right btn-group",role:"group"},u.createElement(N.Z,{buttonClassName:"btn-default",buttonText:"Annuleren",onClickAction:e.cancel}),u.createElement(N.Z,{buttonText:"Opslaan",onClickAction:e.handleSubmit,type:"submit",value:"Submit"}))))};var Z=r(29923);function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(Object(r),!0).forEach((function(t){(0,i.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}const O=function(e){(0,o.Z)(f,e);var t,r,m=(t=f,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,s.Z)(t);if(r){var a=(0,s.Z)(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return(0,c.Z)(this,e)});function f(e){var t;return(0,n.Z)(this,f),t=m.call(this,e),(0,i.Z)((0,l.Z)(t),"handleInputChange",(function(e){var r=e.target,n="checkbox"===r.type?r.checked:r.value,a=r.name;t.setState(F(F({},t.state),{},{excel:F(F({},t.state.excel),{},(0,i.Z)({},a,n))}))})),(0,i.Z)((0,l.Z)(t),"cancel",(function(e){e.preventDefault(),d.nA.push("project/opbrengst-kwh/".concat(t.state.revenuePartsKwhForReport.revenueId,"/deelperiode/").concat(t.props.params.revenuePartId))})),(0,i.Z)((0,l.Z)(t),"handleSubmit",(function(e){e.preventDefault();var r=t.state.excel,n={},a={},l=!1;p().isEmpty(r.documentName+"")&&(n.documentName=!0,a.documentName="Bestandsnaam mag niet leeg zijn",l=!0),l?t.setState(F(F({},t.state),{},{errors:n,errorMessage:a})):(t.setState(F(F({},t.state),{},{isCreating:!0,errors:n,errorMessage:a})),Z.Z.createEnergySupplierExcel(r.revenuePartId,r.documentName).then((function(e){t.setState(F(F({},t.state),{},{isCreating:!1})),d.nA.push("/documenten")})).catch((function(e){t.setState({isCreating:!1})})))})),t.state={revenuePartsKwhForReport:{},excel:{revenuePartId:e.params.revenuePartId,documentName:""},isLoading:!1,isCreating:!1,errors:{energySupplierId:!1,documentName:!1},errorMessage:{energySupplierId:"",documentName:""}},t}return(0,a.Z)(f,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0}),Z.Z.fetchRevenuePartsKwhForReport(this.props.params.revenuePartId).then((function(t){e.setState(F(F({},e.state),{},{revenuePartsKwhForReport:t,excel:F(F({},e.state.excel),{},{documentName:t.defaultDocumentName}),isLoading:!1}))})).catch((function(t){e.setState({isLoading:!1})}))}},{key:"render",value:function(){return u.createElement("div",{className:"row"},u.createElement("div",{className:"col-md-9"},u.createElement("div",{className:"col-md-12"},u.createElement(g,null)),u.createElement("div",{className:"col-md-12"},u.createElement(u.Fragment,null,this.state.isCreating?u.createElement("div",null,"Bezig met verwerken..."):this.state.isLoading?u.createElement("div",null,"Bezig met laden..."):u.createElement(v.Z,null,u.createElement(h.Z,null,u.createElement("div",{className:"col-md-12"},u.createElement(w,{revenuePartsKwhForReport:this.state.revenuePartsKwhForReport,documentName:this.state.excel.documentName,errors:this.state.errors,errorMessage:this.state.errorMessage,handleInputChange:this.handleInputChange,handleSubmit:this.handleSubmit,cancel:this.cancel}))))))),u.createElement("div",{className:"col-md-3"}))}}]),f}(u.Component)}}]);