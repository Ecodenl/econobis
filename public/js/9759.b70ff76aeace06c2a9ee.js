(self.webpackChunkeco=self.webpackChunkeco||[]).push([[9759],{56170:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var r=n(67294),a=n(45697),s=n.n(a),o=function(e){var t=e.label,n=e.className,a=e.size,s=e.divSize,o=e.id,l=e.name,i=e.value,c=e.optionsInGroups,u=e.onChangeAction,m=e.onBlurAction,p=e.required,d=e.error,h=e.readOnly;return r.createElement("div",{className:"form-group ".concat(s)},r.createElement("label",{htmlFor:o,className:"col-sm-6 ".concat(p)},t),r.createElement("div",{className:"".concat(a)},r.createElement("select",{className:"form-control input-sm ".concat(n)+(d&&" has-error"),id:o,name:l,value:i,onChange:u,onBlur:m,disabled:h},r.createElement("option",{value:""}),c.map((function(e,t){var n=e.optionName||"name";return r.createElement("optgroup",{key:t,label:e.label},e.options.map((function(t){return r.createElement("option",{key:t.id,value:e.name+t.id},t[n])})))})))))};o.defaultProps={className:"",size:"col-sm-6",divSize:"col-sm-6",readOnly:!1,required:"",error:!1,value:""},o.propTypes={label:s().string.isRequired,className:s().string,size:s().string,divSize:s().string,id:s().string,name:s().string.isRequired,optionsInGroups:s().array,value:s().oneOfType([s().string,s().number]),onChangeAction:s().func,onBlurAction:s().func,required:s().string,readOnly:s().bool,error:s().bool,optionName:s().string};const l=o},19759:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>R});var r=n(67294),a=n(4942),s=n(15671),o=n(43144),l=n(97326),i=n(60136),c=n(82963),u=n(61120),m=n(37974),p=n(61409),d=n(48966),h=n.n(d),f=n(55877),v=n.n(f),b=n(30381),g=n.n(b),y=n(9181),E=n(49332),w=n(98688),C=n(14309),N=n(53062),Z=n(56170),O=n(54138);function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}g().locale("nl");var S=function(e){(0,i.Z)(d,e);var t,n,m=(t=d,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,u.Z)(t);if(n){var a=(0,u.Z)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function d(e){var t;return(0,s.Z)(this,d),(t=m.call(this,e)).state={webform:{id:"",name:"",apiKey:v()(),maxRequestsPerMinute:"",dateStart:"",dateEnd:"",responsible:""},errors:{name:!1,maxRequestsPerMinute:!1,responsible:!1}},t.handleInputChange=t.handleInputChange.bind((0,l.Z)(t)),t.handleInputChangeDate=t.handleInputChangeDate.bind((0,l.Z)(t)),t.handleSubmit=t.handleSubmit.bind((0,l.Z)(t)),t}return(0,o.Z)(d,[{key:"handleInputChange",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,r=t.name;this.setState(q(q({},this.state),{},{webform:q(q({},this.state.webform),{},(0,a.Z)({},r,n))}))}},{key:"handleInputChangeDate",value:function(e,t){this.setState(q(q({},this.state),{},{webform:q(q({},this.state.webform),{},(0,a.Z)({},t,e))}))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state.webform,n={},r=!1;h().isEmpty(t.name)&&(n.name=!0,r=!0),h().isEmpty(t.maxRequestsPerMinute)&&(n.maxRequestsPerMinute=!0,r=!0),h().isEmpty(t.responsible)&&(n.responsible=!0,r=!0),t.responsible.search("user")>=0&&(t.responsibleUserId=t.responsible.replace("user",""),t.responsibleTeamId=""),t.responsible.search("team")>=0&&(t.responsibleUserId="",t.responsibleTeamId=t.responsible.replace("team","")),this.setState(q(q({},this.state),{},{errors:n})),!r&&N.Z.newWebform(t).then((function(e){p.nA.push("/webformulier/".concat(e.data.data.id))})).catch((function(e){console.log(e),alert("Er is iets mis gegaan met opslaan!")}))}},{key:"render",value:function(){var e=this.state.webform,t=e.name,n=e.apiKey,a=e.maxRequestsPerMinute,s=e.dateStart,o=e.dateEnd,l=e.responsible;return r.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},r.createElement(C.Z,null,r.createElement(w.Z,null,r.createElement("div",{className:"row"},r.createElement(y.Z,{label:"Naam",name:"name",value:t,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.name}),r.createElement(y.Z,{label:"Sleutel",name:"apiKey",value:n,onChangeAction:this.handleInputChange,readOnly:!0})),r.createElement("div",{className:"row"},r.createElement(y.Z,{label:"Aanvragen per minuut",type:"number",name:"maxRequestsPerMinute",value:a,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.maxRequestsPerMinute}),r.createElement(y.Z,{label:"Datum sleutel",name:"apiKeyDate",value:g()().format("L"),onChangeAction:function(){},readOnly:!0})),r.createElement("div",{className:"row"},r.createElement(O.Z,{label:"Startdatum",name:"dateStart",value:s,onChangeAction:this.handleInputChangeDate}),r.createElement(O.Z,{label:"Einddatum",name:"dateEnd",value:o,onChangeAction:this.handleInputChangeDate})),r.createElement("div",{className:"row"},r.createElement(Z.Z,{label:"Verantwoordelijke",size:"col-sm-6",name:"responsible",optionsInGroups:[{name:"user",label:"Gebruikers",options:this.props.users,optionName:"fullName"},{name:"team",label:"Team",options:this.props.teams}],value:l,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.responsible}))),r.createElement(w.Z,null,r.createElement("div",{className:"pull-right btn-group",role:"group"},r.createElement(E.Z,{buttonText:"Opslaan",onClickAction:this.handleSubmit,type:"submit",value:"Submit"})))))}}]),d}(r.Component);const I=(0,m.$j)((function(e){return{teams:e.systemData.teams,users:e.systemData.users}}),null)(S);var x=n(55451);const A=function(){return r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-4"},r.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},r.createElement(x.Z,{iconName:"arrowLeft",onClickAction:p.mW.goBack}))),r.createElement("div",{className:"col-md-4"},r.createElement("h4",{className:"text-center margin-small"},"Nieuw webformulier")),r.createElement("div",{className:"col-md-4"}))},R=function(){return r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-9"},r.createElement("div",{className:"col-md-12 margin-10-top"},r.createElement(C.Z,null,r.createElement(w.Z,{className:"panel-small"},r.createElement(A,null)))),r.createElement("div",{className:"col-md-12 margin-10-top"},r.createElement(I,null))),r.createElement("div",{className:"col-md-3"}))}},55877:(e,t,n)=>{var r=n(23570),a=n(71171),s=a;s.v1=r,s.v4=a,e.exports=s},45327:e=>{for(var t=[],n=0;n<256;++n)t[n]=(n+256).toString(16).substr(1);e.exports=function(e,n){var r=n||0,a=t;return[a[e[r++]],a[e[r++]],a[e[r++]],a[e[r++]],"-",a[e[r++]],a[e[r++]],"-",a[e[r++]],a[e[r++]],"-",a[e[r++]],a[e[r++]],"-",a[e[r++]],a[e[r++]],a[e[r++]],a[e[r++]],a[e[r++]],a[e[r++]]].join("")}},85217:e=>{var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(t){var n=new Uint8Array(16);e.exports=function(){return t(n),n}}else{var r=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),r[t]=e>>>((3&t)<<3)&255;return r}}},23570:(e,t,n)=>{var r,a,s=n(85217),o=n(45327),l=0,i=0;e.exports=function(e,t,n){var c=t&&n||0,u=t||[],m=(e=e||{}).node||r,p=void 0!==e.clockseq?e.clockseq:a;if(null==m||null==p){var d=s();null==m&&(m=r=[1|d[0],d[1],d[2],d[3],d[4],d[5]]),null==p&&(p=a=16383&(d[6]<<8|d[7]))}var h=void 0!==e.msecs?e.msecs:(new Date).getTime(),f=void 0!==e.nsecs?e.nsecs:i+1,v=h-l+(f-i)/1e4;if(v<0&&void 0===e.clockseq&&(p=p+1&16383),(v<0||h>l)&&void 0===e.nsecs&&(f=0),f>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");l=h,i=f,a=p;var b=(1e4*(268435455&(h+=122192928e5))+f)%4294967296;u[c++]=b>>>24&255,u[c++]=b>>>16&255,u[c++]=b>>>8&255,u[c++]=255&b;var g=h/4294967296*1e4&268435455;u[c++]=g>>>8&255,u[c++]=255&g,u[c++]=g>>>24&15|16,u[c++]=g>>>16&255,u[c++]=p>>>8|128,u[c++]=255&p;for(var y=0;y<6;++y)u[c+y]=m[y];return t||o(u)}},71171:(e,t,n)=>{var r=n(85217),a=n(45327);e.exports=function(e,t,n){var s=t&&n||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var o=(e=e||{}).random||(e.rng||r)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t)for(var l=0;l<16;++l)t[s+l]=o[l];return t||a(o)}}}]);