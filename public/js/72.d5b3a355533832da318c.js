(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{1011:function(e,t,a){"use strict";var n=a(546),r=a.n(n),c=a(0);t.a=function(e){var t=Object(c.useState)(!1),a=r()(t,2),n=a[0],l=a[1];function o(t){t.key===e&&l(!0)}function s(t){t.key===e&&l(!1)}return Object(c.useEffect)((function(){return window.addEventListener("keydown",o),window.addEventListener("keyup",s),function(){window.removeEventListener("keydown",o),window.removeEventListener("keyup",s)}}),[]),n}},1645:function(e,t,a){"use strict";a.r(t);var n=a(143),r=a.n(n),c=a(13),l=a.n(c),o=a(5),s=a.n(o),i=a(546),u=a.n(i),m=a(0),d=a.n(m),f=a(7),p=a.n(f);var g=function(e){var t=e.createdAt,a=e.messageText,n=e.isError,r=e.twinfieldLogMessageTypeName;return d.a.createElement("tr",{className:"border ".concat(n?"warning-row":"")},d.a.createElement("td",null,p()(t).format("l LTS")),d.a.createElement("td",null,r),d.a.createElement("td",null,a))},v=a(2);function E(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function h(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?E(Object(a),!0).forEach((function(t){s()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):E(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var y=function(e,t,a){return v.a.get("jory/twinfield-log",{params:{jory:h({fld:["id","invoiceId","contactId","messageText","messageType","userId","isError","createdAt","updatedAt","twinfieldLogMessageTypeName"],srt:t,flt:e},a),meta:["total"]}})},w=a(27),b=a(30),O=a(4),j=a(50);var N=function(e){var t=e.countTotal,a=e.reloadTwinfieldlogs;return d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"col-md-4"},d.a.createElement("div",{className:"btn-group",role:"group"},d.a.createElement(j.a,{iconName:"glyphicon-arrow-left",onClickAction:O.e.goBack}),d.a.createElement(j.a,{iconName:"glyphicon-refresh",onClickAction:a}))),d.a.createElement("div",{className:"col-md-4"},d.a.createElement("h3",{className:"text-center table-title"},"Twinfield logs")),d.a.createElement("div",{className:"col-md-4"},d.a.createElement("div",{className:"pull-right"},"Resultaten: ",t||0)))},C=a(164),T=a(223),D=a(222),P=a(933),k=a(285),S=a(939),A=[{code:"contact",name:"Contacten synchronisatie"},{code:"invoice",name:"Nota's synchronisatie"},{code:"payment",name:"Betalingen synchronisatie"}];var Y=function(e){var t=e.filter,a=e.handleChangeFilter;return d.a.createElement("tr",{className:"thead-filter"},d.a.createElement(S.a,{value:t.createdAt?t.createdAt:null,onChangeAction:function(e){return a("createdAt",e?p()(e).format("YYYY-MM-DD"):null)}}),d.a.createElement("th",null,d.a.createElement("select",{className:"form-control input-sm",value:t.messageType,onChange:function(e){return a("messageType",e.target.value)}},d.a.createElement("option",null),A.map((function(e){return d.a.createElement("option",{key:e.code,value:e.code},e.name)})))),d.a.createElement("th",null,d.a.createElement("input",{type:"text",className:"form-control input-sm",value:t.value,onChange:function(e){return a("value",e.target.value)}})))},M=a(1011);function R(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function x(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?R(Object(a),!0).forEach((function(t){s()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):R(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var L={createdAt:p()().format("YYYY-MM-DD"),value:"",messageType:null};t.default=function(){var e=Object(m.useState)([]),t=u()(e,2),a=t[0],n=t[1],c=Object(m.useState)(!0),o=u()(c,2),i=o[0],f=o[1],v=Object(m.useState)({total:0}),E=u()(v,2),h=E[0],O=E[1],j=Object(m.useState)(L),S=u()(j,2),A=S[0],R=S[1],q=Object(m.useState)(["-createdAt","-id"]),B=u()(q,2),I=B[0],F=B[1],J=Object(m.useState)({offset:0,limit:20}),W=u()(J,2),z=W[0],G=W[1],U=Object(M.a)("Enter");function H(){f(!0),y(function(){var e={and:[]};A.createdAt&&e.and.push({field:"createdAt",operator:"like",data:"".concat(p()(A.createdAt).format("YYYY-MM-DD"),"%")});A.messageText&&e.and.push({field:"messageText",operator:"like",data:"%".concat(A.messageText,"%")});A.messageType&&e.and.push({field:"messageType",data:A.messageType});return e}(),I,z).then((function(e){n(e.data.data),O(e.data.meta),f(!1)})).catch((function(e){console.log(e),alert("Er is iets misgegaan met ophalen van de gegevens.")}))}function K(e,t){var a=I;3===a.length&&a.pop(),F("DESC"===t?["-".concat(e)].concat(l()(a)):[e].concat(l()(a)))}return Object(m.useEffect)((function(){H()}),[z.offset,I,A.createdAt,A.messageType]),Object(m.useEffect)((function(){U&&H()}),[U]),d.a.createElement(w.a,null,d.a.createElement(b.a,null,d.a.createElement(N,{countTotal:h.total,reloadTwinfieldlogs:function(){R(L),H()}}),d.a.createElement("div",{className:"margin-10-top"},d.a.createElement(D.a,null,d.a.createElement(T.a,null,d.a.createElement("tr",{className:"thead-title"},d.a.createElement(P.a,{title:"Datum",width:"20%",setSorts:K,sortColumn:"createdAt"}),d.a.createElement(P.a,{title:"Categorie",width:"20%",setSorts:K,sortColumn:"messageType"}),d.a.createElement(P.a,{title:"Melding",width:"60%",setSorts:K,sortColumn:"messageText"})),d.a.createElement(Y,{filter:A,handleChangeFilter:function(e,t){R(x(x({},A),{},s()({},e,t)))}})),d.a.createElement(k.a,null,i?d.a.createElement("tr",null,d.a.createElement("td",{colSpan:3},"Bezig met gegevens laden")):a.length>0?a.map((function(e){return d.a.createElement(g,r()({key:e.id},e))})):d.a.createElement("tr",null,d.a.createElement("td",{colSpan:3},"Geen resultaten!")))),d.a.createElement("div",{className:"col-md-6 col-md-offset-3"},d.a.createElement(C.a,{onPageChangeAction:function(e){var t=Math.ceil(20*e.selected);G(x(x({},z),{},{offset:t}))},totalRecords:h.total,initialPage:0})))))}},933:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(3),l=a.n(c),o=function(e){var t=e.RowClassName,a=e.setSorts,n=e.sortColumn,c=e.title,l=e.width;return r.a.createElement("th",{className:t,width:l},c,r.a.createElement("span",{className:"glyphicon glyphicon-arrow-down pull-right small",role:"button",onClick:a.bind(void 0,n,"ASC")}),r.a.createElement("span",{className:"glyphicon glyphicon-arrow-up pull-right small",role:"button",onClick:a.bind(void 0,n,"DESC")}))};o.defaultProps={RowClassName:""},o.propTypes={setSorts:l.a.func.isRequired,sortColumn:l.a.string.isRequired,title:l.a.string.isRequired,width:l.a.string.isRequired,RowClassName:l.a.string},t.a=o},939:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(3),l=a.n(c),o=a(289),s=a.n(o),i=a(165),u=a.n(i),m=a(7),d=a.n(m);d.a.locale("nl");var f=function(e){var t=e.className,a=e.value,n=e.onChangeAction,c=e.placeholder,l=a?d()(a).format("L"):"";return r.a.createElement("th",{className:"DayPicker-overflow ".concat(t)},r.a.createElement(s.a,{value:l,onDayChange:n,formatDate:i.formatDate,parseDate:i.parseDate,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:u.a},inputProps:{className:"form-control input-sm",placeholder:c},placeholder:""}))};f.defaultProps={className:"",value:null,placeholder:""},f.propTypes={className:l.a.string,value:l.a.oneOfType([l.a.string,l.a.object]),onChangeAction:l.a.func,placeholder:l.a.string},t.a=f}}]);