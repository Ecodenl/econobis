"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[1887],{70057:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(69265),a="cost-center";const o={fetchCostCenterDetails:function(e){var t="jory/cost-center/".concat(e);return r.Z.get(t,{params:{jory:{fld:["id","description","twinfieldCostCenterCode"]}}})},newCostCenter:function(e){var t=a;return e.jory=JSON.stringify({fld:["id"]}),r.Z.post(t,e)},updateCostCenter:function(e){var t="".concat(a,"/").concat(e.id);return r.Z.post(t,e)},deleteCostCenter:function(e){var t="".concat(a,"/").concat(e,"/delete");return r.Z.post(t)}}},31887:(e,t,n)=>{n.r(t),n.d(t,{default:()=>P});var r=n(67294),a=n(15671),o=n(43144),c=n(97326),s=n(60136),l=n(82963),i=n(61120),u=n(4942),m=n(86706),d=n(83920),f=n(61409),p=n(48966),C=n.n(p),h=n(30381),v=n.n(h),g=n(9181),E=n(49332),b=n(98688),Z=n(14309),y=n(70057),w=n(25725);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){(0,u.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}n(71840),v().locale("nl");var j=function(e){(0,s.Z)(d,e);var t,n,m=(t=d,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,i.Z)(t);if(n){var a=(0,i.Z)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return(0,l.Z)(this,e)});function d(e){var t;return(0,a.Z)(this,d),t=m.call(this,e),(0,u.Z)((0,c.Z)(t),"handleInputChange",(function(e){var n=e.target,r="checkbox"===n.type?n.checked:n.value,a=n.name;t.setState(N(N({},t.state),{},{costCenter:N(N({},t.state.costCenter),{},(0,u.Z)({},a,r))}))})),(0,u.Z)((0,c.Z)(t),"handleInputChangeDate",(function(e,n){t.setState(N(N({},t.state),{},{costCenter:N(N({},t.state.costCenter),{},(0,u.Z)({},n,e))}))})),(0,u.Z)((0,c.Z)(t),"handleSubmit",(function(e){e.preventDefault();var n=t.state.costCenter,r={},a=!1;C().isEmpty(n.description)&&(r.description=!0,a=!0),n.twinfieldCostCenterCode&&t.props.costCenters.map((function(e){e.twinfieldCostCenterCode==n.twinfieldCostCenterCode&&(a=!0,r.twinfieldCostCenterCode=!0)})),t.setState(N(N({},t.state),{},{errors:r})),!a&&y.Z.newCostCenter(n).then((function(e){t.props.fetchSystemData(),f.nA.push("/kostenplaats/".concat(e.data.data.id))})).catch((function(e){alert("Er is iets mis gegaan met opslaan!")}))})),t.state={costCenter:{description:"",twinfieldCostCenterCode:""},errors:{description:!1}},t}return(0,o.Z)(d,[{key:"render",value:function(){var e=this.state.costCenter,t=e.description,n=e.twinfieldCostCenterCode;return r.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},r.createElement(Z.Z,null,r.createElement(b.Z,null,r.createElement("div",{className:"row"},r.createElement(g.Z,{label:"Omschrijving",name:"description",value:t,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.description})),r.createElement("div",{className:"row"},r.createElement(g.Z,{label:"Twinfield kostenplaats code",name:"twinfieldCostCenterCode",value:n,onChangeAction:this.handleInputChange,error:this.state.errors.twinfieldCostCenterCode,errorMessage:"Deze kostenplaats code wordt al gebruikt."}))),r.createElement(b.Z,null,r.createElement("div",{className:"pull-right btn-group",role:"group"},r.createElement(E.Z,{buttonText:"Opslaan",onClickAction:this.handleSubmit,type:"submit",value:"Submit"})))))}}]),d}(r.Component);const k=(0,m.$j)((function(e){return{costCenters:e.systemData.costCenters}}),(function(e){return(0,d.DE)({fetchSystemData:w.P},e)}))(j);var S=n(55451);const D=function(){return r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-4"},r.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},r.createElement(S.Z,{iconName:"arrowLeft",onClickAction:f.mW.goBack}))),r.createElement("div",{className:"col-md-4"},r.createElement("h4",{className:"text-center margin-small"},"Nieuw kostenplaats")),r.createElement("div",{className:"col-md-4"}))},P=function(){return r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-9"},r.createElement("div",{className:"col-md-12 margin-10-top"},r.createElement(Z.Z,null,r.createElement(b.Z,{className:"panel-small"},r.createElement(D,null)))),r.createElement("div",{className:"col-md-12 margin-10-top"},r.createElement(k,null))),r.createElement("div",{className:"col-md-3"}))}}}]);