"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[5910],{65910:(e,t,a)=>{a.r(t),a.d(t,{default:()=>He});var o=a(23029),r=a(92901),n=a(56822),l=a(53954),s=a(85501),i=a(64467),c=a(96540),u=a(24179),d=a(91858);function g(e,t,a){return t=(0,l.A)(t),(0,n.A)(e,h()?Reflect.construct(t,a||[],(0,l.A)(e).constructor):t.apply(e,a))}function h(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(h=function(){return!!e})()}const p=function(e){function t(e){return(0,o.A)(this,t),g(this,t,[e])}return(0,s.A)(t,e),(0,r.A)(t,[{key:"render",value:function(){return c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-4"},c.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},c.createElement(d.A,{iconName:"arrowLeft",onClickAction:u.Nc.goBack}))),c.createElement("div",{className:"col-md-4"},c.createElement("h4",{className:"text-center"},"Portal dashboard instellingen")),c.createElement("div",{className:"col-md-4"}))}}])}(c.Component);var m=a(69733),f=a(2543),b=a(95093),P=a.n(b),v=a(55956),w=a(62493),S=a(55849),E=a(46749),y=a(26062),A=a(32293),C=a(33579),k=a(3954),D=a(49627),x=a(88221);function L(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function B(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?L(Object(a),!0).forEach((function(t){(0,i.A)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):L(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function N(e,t,a){return t=(0,l.A)(t),(0,n.A)(e,M()?Reflect.construct(t,a||[],(0,l.A)(e).constructor):t.apply(e,a))}function M(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(M=function(){return!!e})()}P().locale("nl");var T=function(e){function t(e){var a;return(0,o.A)(this,t),a=N(this,t,[e]),(0,i.A)(a,"handleInputChange",(function(e){var t=e.target,o="checkbox"===t.type?t.checked:t.value,r=t.name;a.setState(B(B({},a.state),{},{dashboardSettings:B(B({},a.state.dashboardSettings),{},(0,i.A)({},r,o))}))})),(0,i.A)(a,"togglePreviewPortalDashboardPagePc",(function(){a.state.showPreviewPortalDashboardPagePc&&document.documentElement.removeAttribute("style"),a.setState({showPreviewPortalDashboardPagePc:!a.state.showPreviewPortalDashboardPagePc})})),(0,i.A)(a,"togglePreviewPortalDashboardPageMobile",(function(){a.state.showPreviewPortalDashboardPageMobile&&document.documentElement.removeAttribute("style"),a.setState({showPreviewPortalDashboardPageMobile:!a.state.showPreviewPortalDashboardPageMobile})})),(0,i.A)(a,"setShowMenu",(function(){a.setState({showMenu:!a.state.showMenu})})),(0,i.A)(a,"handleSubmit",(function(e){e.preventDefault();var t=a.state.dashboardSettings;a.setState(B(B({},a.state),{},{errors:{},errorMessage:{}})),A.A.updatePortalSettingsDashboard(t).then((function(e){a.props.updateState(e.data.data),a.props.switchToView()})).catch((function(e){e.response?a.props.setError(e.response.status,e.response.data.message):(console.log(e),alert("Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals."))}))})),a.state={showPreviewPortalDashboardPagePc:!1,showPreviewPortalDashboardPageMobile:!1,showMenu:!1,imageHash:Date.now(),dashboardSettings:B({},e.dashboardSettings),errors:{welcomeTitle:"",welcomeMessage:""},errorMessage:{}},a}return(0,s.A)(t,e),(0,r.A)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0,hasError:!1}),A.A.fetchPortalSettingsDashboardDetails(1).then((function(t){e.setState({isLoading:!1,dashboardSettings:B({},t.data.data)})})).catch((function(t){e.setState({isLoading:!1,hasError:!0})}))}},{key:"render",value:function(){var e=this.state.dashboardSettings,t=e.welcomeTitle,a=e.welcomeMessage,o=e.defaultWidgetBackgroundColor,r=e.defaultWidgetTextColor,n="".concat(URL_API,"/portal/images/logo-header.png?").concat(this.props.imageHash),l="".concat(URL_API,"/portal/images/background-header.png?").concat(this.props.imageHash);return c.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},c.createElement(w.A,null,c.createElement(S.A,null,c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-6"},c.createElement("div",{className:"btn-group btn-group-flex",role:"group"},c.createElement(v.A,{buttonText:"Preview dashboard pagina PC",onClickAction:this.togglePreviewPortalDashboardPagePc}),c.createElement(v.A,{buttonText:"Preview dashboard pagina mobiel",onClickAction:this.togglePreviewPortalDashboardPageMobile})))))),c.createElement(w.A,null,c.createElement(S.A,null,c.createElement("div",{className:"row"},c.createElement(C.A,{label:"Welkomsttitel",divSize:"col-sm-8",name:"welcomeTitle",value:t,onChangeAction:this.handleInputChange,error:!!this.state.errors.welcomeTitle})),c.createElement("div",{className:"row"},c.createElement(C.A,{label:"Welkomstbericht",divSize:"col-sm-8",name:"welcomeMessage",value:a,onChangeAction:this.handleInputChange,error:!!this.state.errors.welcomeMessage})),c.createElement("div",{className:"row"},c.createElement(x.A,{label:"Default widget achtergrond kleur",divSize:"col-sm-8",name:"defaultWidgetBackgroundColor",value:o,onChangeAction:this.handleInputChange,required:"required"}),c.createElement("span",{className:"rc-color-picker-trigger",unselectable:"unselectable",style:{backgroundColor:o,color:r,border:"1px solid #999",display:"inline-block",padding:"2px",borderRadius:"2px",width:"150px",height:"30px",boxShadow:"0 0 0 2px #fff inset"}},"Algemene tekst")),c.createElement("div",{className:"row"},c.createElement(x.A,{label:"Default widget tekst kleur",divSize:"col-sm-8",name:"defaultWidgetTextColor",value:r,onChangeAction:this.handleInputChange}))),c.createElement(S.A,null,c.createElement("div",{className:"pull-right btn-group",role:"group"},c.createElement(v.A,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:this.props.switchToView}),c.createElement(v.A,{buttonText:"Opslaan",type:"submit",value:"Submit",onClickAction:this.handleSubmit})))),this.state.showPreviewPortalDashboardPagePc&&c.createElement(k.A,{closeModal:this.togglePreviewPortalDashboardPagePc,setShowMenu:this.setShowMenu,showMenu:this.state.showMenu,imageHash:this.state.imageHash,attachmentLogoHeader:"",logoHeaderUrl:n,attachmentImageBgHeader:"",imageBgHeaderUrl:l,portalMainBackgroundColor:this.props.defaultPortalSettingsLayout.portalMainBackgroundColor,portalMainTextColor:this.props.defaultPortalSettingsLayout.portalMainTextColor,portalBackgroundColor:this.props.defaultPortalSettingsLayout.portalBackgroundColor,portalBackgroundTextColor:this.props.defaultPortalSettingsLayout.portalBackgroundTextColor,loginHeaderBackgroundColor:this.props.defaultPortalSettingsLayout.loginHeaderBackgroundColor,loginHeaderBackgroundTextColor:this.props.defaultPortalSettingsLayout.loginHeaderBackgroundTextColor,headerIconsColor:this.props.defaultPortalSettingsLayout.headerIconsColor,loginFieldBackgroundColor:this.props.defaultPortalSettingsLayout.loginFieldBackgroundColor,loginFieldBackgroundTextColor:this.props.defaultPortalSettingsLayout.loginFieldBackgroundTextColor,buttonColor:this.props.defaultPortalSettingsLayout.buttonColor,buttonTextColor:this.props.defaultPortalSettingsLayout.buttonTextColor,dashboardSettings:this.state.dashboardSettings}),this.state.showPreviewPortalDashboardPageMobile&&c.createElement(D.A,{closeModal:this.togglePreviewPortalDashboardPageMobile,setShowMenu:this.setShowMenu,showMenu:this.state.showMenu,imageHash:this.state.imageHash,attachmentLogoHeader:"",logoHeaderUrl:n,attachmentImageBgHeader:"",imageBgHeaderUrl:l,portalMainBackgroundColor:this.props.defaultPortalSettingsLayout.portalMainBackgroundColor,portalMainTextColor:this.props.defaultPortalSettingsLayout.portalMainTextColor,portalBackgroundColor:this.props.defaultPortalSettingsLayout.portalBackgroundColor,portalBackgroundTextColor:this.props.defaultPortalSettingsLayout.portalBackgroundTextColor,loginHeaderBackgroundColor:this.props.defaultPortalSettingsLayout.loginHeaderBackgroundColor,loginHeaderBackgroundTextColor:this.props.defaultPortalSettingsLayout.loginHeaderBackgroundTextColor,headerIconsColor:this.props.defaultPortalSettingsLayout.headerIconsColor,loginFieldBackgroundColor:this.props.defaultPortalSettingsLayout.loginFieldBackgroundColor,loginFieldBackgroundTextColor:this.props.defaultPortalSettingsLayout.loginFieldBackgroundTextColor,buttonColor:this.props.defaultPortalSettingsLayout.buttonColor,buttonTextColor:this.props.defaultPortalSettingsLayout.buttonTextColor,dashboardSettings:this.state.dashboardSettings}))}}])}(c.Component);const H=(0,m.Ng)(null,(function(e){return{setError:function(t,a){e((0,E.N)(t,a))},fetchSystemData:function(){e((0,y.u)())}}}))(T);var O=a(30483);function j(e,t,a){return t=(0,l.A)(t),(0,n.A)(e,R()?Reflect.construct(t,a||[],(0,l.A)(e).constructor):t.apply(e,a))}function R(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(R=function(){return!!e})()}var I=function(e){function t(e){var a;return(0,o.A)(this,t),a=j(this,t,[e]),(0,i.A)(a,"togglePreviewPortalDashboardPagePc",(function(){a.setState({showPreviewPortalDashboardPagePc:!a.state.showPreviewPortalDashboardPagePc})})),(0,i.A)(a,"togglePreviewPortalDashboardPageMobile",(function(){a.setState({showPreviewPortalDashboardPageMobile:!a.state.showPreviewPortalDashboardPageMobile})})),(0,i.A)(a,"setShowMenu",(function(){a.setState({showMenu:!a.state.showMenu})})),a.state={showPreviewPortalDashboardPagePc:!1,showPreviewPortalDashboardPageMobile:!1,showMenu:!1,imageHash:Date.now()},a}return(0,s.A)(t,e),(0,r.A)(t,[{key:"render",value:function(){var e=this.props.dashboardSettings,t=e.welcomeTitle,a=e.welcomeMessage,o=e.defaultWidgetBackgroundColor,r=e.defaultWidgetTextColor,n="".concat(URL_API,"/portal/images/logo-header.png?").concat(this.props.imageHash),l="".concat(URL_API,"/portal/images/background-header.png?").concat(this.props.imageHash);return c.createElement(c.Fragment,null,c.createElement("div",null,c.createElement(w.A,null,c.createElement(S.A,null,c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-6"},c.createElement("div",{className:"btn-group btn-group-flex",role:"group"},c.createElement(v.A,{buttonText:"Preview dashboard pagina PC",onClickAction:this.togglePreviewPortalDashboardPagePc}),c.createElement(v.A,{buttonText:"Preview dashboard pagina mobiel",onClickAction:this.togglePreviewPortalDashboardPageMobile})))))),this.state.showPreviewPortalDashboardPagePc&&c.createElement(k.A,{closeModal:this.togglePreviewPortalDashboardPagePc,setShowMenu:this.setShowMenu,showMenu:this.state.showMenu,imageHash:this.state.imageHash,attachmentLogoHeader:"",logoHeaderUrl:n,attachmentImageBgHeader:"",imageBgHeaderUrl:l,portalMainBackgroundColor:this.props.defaultPortalSettingsLayout.portalMainBackgroundColor,portalMainTextColor:this.props.defaultPortalSettingsLayout.portalMainTextColor,portalBackgroundColor:this.props.defaultPortalSettingsLayout.portalBackgroundColor,portalBackgroundTextColor:this.props.defaultPortalSettingsLayout.portalBackgroundTextColor,loginHeaderBackgroundColor:this.props.defaultPortalSettingsLayout.loginHeaderBackgroundColor,loginHeaderBackgroundTextColor:this.props.defaultPortalSettingsLayout.loginHeaderBackgroundTextColor,headerIconsColor:this.props.defaultPortalSettingsLayout.headerIconsColor,loginFieldBackgroundColor:this.props.defaultPortalSettingsLayout.loginFieldBackgroundColor,loginFieldBackgroundTextColor:this.props.defaultPortalSettingsLayout.loginFieldBackgroundTextColor,buttonColor:this.props.defaultPortalSettingsLayout.buttonColor,buttonTextColor:this.props.defaultPortalSettingsLayout.buttonTextColor,dashboardSettings:this.props.dashboardSettings}),this.state.showPreviewPortalDashboardPageMobile&&c.createElement(D.A,{closeModal:this.togglePreviewPortalDashboardPageMobile,setShowMenu:this.setShowMenu,showMenu:this.state.showMenu,imageHash:this.state.imageHash,attachmentLogoHeader:"",logoHeaderUrl:n,attachmentImageBgHeader:"",imageBgHeaderUrl:l,portalMainBackgroundColor:this.props.defaultPortalSettingsLayout.portalMainBackgroundColor,portalMainTextColor:this.props.defaultPortalSettingsLayout.portalMainTextColor,portalBackgroundColor:this.props.defaultPortalSettingsLayout.portalBackgroundColor,portalBackgroundTextColor:this.props.defaultPortalSettingsLayout.portalBackgroundTextColor,loginHeaderBackgroundColor:this.props.defaultPortalSettingsLayout.loginHeaderBackgroundColor,loginHeaderBackgroundTextColor:this.props.defaultPortalSettingsLayout.loginHeaderBackgroundTextColor,headerIconsColor:this.props.defaultPortalSettingsLayout.headerIconsColor,loginFieldBackgroundColor:this.props.defaultPortalSettingsLayout.loginFieldBackgroundColor,loginFieldBackgroundTextColor:this.props.defaultPortalSettingsLayout.loginFieldBackgroundTextColor,buttonColor:this.props.defaultPortalSettingsLayout.buttonColor,buttonTextColor:this.props.defaultPortalSettingsLayout.buttonTextColor,dashboardSettings:this.props.dashboardSettings})),c.createElement("div",{onClick:this.props.switchToEdit},c.createElement(w.A,null,c.createElement(S.A,null,c.createElement("div",{className:"row"},c.createElement(O.A,{label:"Welkomsttitel",divSize:"col-sm-8",value:t,className:"col-sm-8 form-group"})),c.createElement("div",{className:"row"},c.createElement(O.A,{label:"Welkomstbericht",divSize:"col-sm-8",value:a,className:"col-sm-8 form-group"})),c.createElement("div",{className:"row"},c.createElement(O.A,{label:"Default widget achtergrond kleur",divSize:"col-sm-8",value:o,className:"col-sm-8 form-group"}),c.createElement("span",{className:"rc-color-picker-trigger",unselectable:"unselectable",style:{backgroundColor:o,color:r,border:"1px solid #999",display:"inline-block",padding:"2px",borderRadius:"2px",width:"150px",height:"30px",boxShadow:"0 0 0 2px #fff inset"}},"Algemene tekst")),c.createElement("div",{className:"row"},c.createElement(O.A,{label:"Default widget tekst kleur",divSize:"col-sm-8",value:r,className:"col-sm-8 form-group"}))))))}}])}(c.Component);const F=(0,m.Ng)(null,(function(e){return{setError:function(t,a){e((0,E.N)(t,a))}}}))(I);var W=a(9041);function z(e,t,a){return t=(0,l.A)(t),(0,n.A)(e,U()?Reflect.construct(t,a||[],(0,l.A)(e).constructor):t.apply(e,a))}function U(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(U=function(){return!!e})()}var _=function(e){function t(e){var a;return(0,o.A)(this,t),a=z(this,t,[e]),(0,i.A)(a,"switchToEdit",(function(){a.setState({showEdit:!0})})),(0,i.A)(a,"switchToView",(function(){a.setState({showEdit:!1})})),a.state={showEdit:!1,imageHash:Date.now(),activeDiv:""},a}return(0,s.A)(t,e),(0,r.A)(t,[{key:"onDivEnter",value:function(){this.setState({activeDiv:"panel-grey"})}},{key:"onDivLeave",value:function(){this.state.showEdit||this.setState({activeDiv:""})}},{key:"render",value:function(){var e=this,t=this.props.meDetails.permissions,a=void 0===t?{}:t;return a.managePortalSettings?c.createElement("div",{className:this.state.activeDiv,onMouseEnter:function(){return e.onDivEnter()},onMouseLeave:function(){return e.onDivLeave()}},this.state.showEdit&&a.managePortalSettings?c.createElement(H,{defaultPortalSettingsLayout:this.props.defaultPortalSettingsLayout,dashboardSettings:this.props.dashboardSettings,updateState:this.props.updateState,switchToView:this.switchToView,imageHash:this.state.imageHash}):(0,f.isEmpty)(this.props.dashboardSettings)?c.createElement("p",null,"Nog geen dashboard instellingen opgeslagen."):c.createElement(F,{defaultPortalSettingsLayout:this.props.defaultPortalSettingsLayout,dashboardSettings:this.props.dashboardSettings,updateState:this.props.updateState,switchToEdit:this.switchToEdit,imageHash:this.state.imageHash})):c.createElement(W.A,null)}}])}(c.Component);const V=(0,m.Ng)((function(e){return{meDetails:e.meDetails}}))(_);var G=a(5556),q=a(13366),J=a(9392),$=a(58168),Q=a(5544),K=a(32885),X=a(55659),Y=a(8909),Z=a(96829),ee=a(31728),te=a(9786),ae=a(87722),oe=a(88505),re=a(87696),ne=a(90641),le=a(20145),se="row";const ie=function(e){var t=e.row,a=e.index,o=e.moveRow,r=e.showEditSort,n=e.deletePortalSettingsDashboardWidget,l=e.imageHash,s=(0,c.useRef)(null),i=(0,c.useRef)(null),d=(0,c.useState)(!1),g=(0,Q.A)(d,2),h=g[0],p=g[1],m=(0,c.useState)(!1),f=(0,Q.A)(m,2),b=f[0],P=f[1],v=(0,c.useState)(""),w=(0,Q.A)(v,2),S=w[0],E=w[1],y=["over-ons","project-schrijf-je-in","huidige-deelnames"],A=(0,Z.H)({accept:se,hover:function(e,t){if(s.current){var r=e.index,n=a;if(r!==n){var l=s.current.getBoundingClientRect(),i=(l.bottom-l.top)/2,c=t.getClientOffset().y-l.top;r<n&&c<i||r>n&&c>i||(o(r,n),e.index=n)}}}}),C=(0,Q.A)(A,2)[1],k=(0,ee.i)({type:se,item:{type:se,index:a},collect:function(e){return{isDragging:e.isDragging()}}}),D=(0,Q.A)(k,3),x=D[0].isDragging,L=D[1],B=x?0:1;return(0,D[2])(C(s)),L(i),c.createElement(c.Fragment,null,c.createElement("tr",{ref:s,style:{opacity:B},className:S,onDoubleClick:function(){return u.RL.push("/portal-instellingen-dashboard-widget/".concat(t.id))},onMouseEnter:function(){P(!0),E("highlight-row")},onMouseLeave:function(){P(!1),E("")}},t.cells.map((function(e){switch(e.column.id){case"order":return!0===r?c.createElement("td",{ref:i},c.createElement(ae.Ay,{icon:te.s})):null;case"title":return c.createElement("td",e.getCellProps(),e.render("Cell"));case"widgetImageFileName":var a=e.value&&"".concat(URL_API,"/portal/images/").concat(e.value,"?").concat(l);return c.createElement("td",{key:e.column.id},c.createElement(ne.A,{src:a,thumbnail:!0,style:{border:"1px solid #999",display:"inline-block",padding:"1px",borderRadius:"1px",height:"auto",width:"100px",boxShadow:"0 0 0 1px #fff inset"}}));case"active":return c.createElement("td",e.getCellProps(),e.value?"Ja":"Nee");case"codeRef":return r?null:c.createElement("td",null,b&&c.createElement("a",{role:"button",onClick:function(){return u.RL.push("/portal-instellingen-dashboard-widget/".concat(t.id))}},c.createElement(ae.Ay,{className:"mybtn-success",size:14,icon:oe.w}))," ",!y.includes(e.value)&&b?c.createElement("a",{role:"button",onClick:function(){return p(!0)}},c.createElement(ae.Ay,{className:"mybtn-danger",size:14,icon:re.d})):null)}}))),h&&c.createElement(le.A,{closeDeleteItemModal:function(){return p(!1)},description:t.cells.find((function(e){return"title"===e.column.id})).value,id:t.id,deletePortalSettingsDashboardWidget:n}))};var ce=a(46894),ue=a.n(ce),de=a(41904),ge=a(26819);function he(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,o=new Array(t);a<t;a++)o[a]=e[a];return o}const pe=function(e){var t=e.columns,a=e.data,o=e.showEditSort,r=e.handleInputChange,n=e.deletePortalSettingsDashboardWidget,l=e.imageHash,s=(0,c.useState)(a),i=(0,Q.A)(s,2),u=i[0],d=i[1];(0,c.useEffect)((function(){d(a)}),[a]),(0,c.useEffect)((function(){var e,t=function(e,t){var a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=function(e,t){if(e){if("string"==typeof e)return he(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?he(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,l=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return l=e.done,e},e:function(e){s=!0,n=e},f:function(){try{l||null==a.return||a.return()}finally{if(s)throw n}}}}(u.entries());try{for(t.s();!(e=t.n()).done;){var a=(0,Q.A)(e.value,2),o=a[0];a[1].order=o+1}}catch(e){t.e(e)}finally{t.f()}}),[u]);var g=c.useCallback((function(e){return e.id}),[]),h=(0,K.useTable)({data:u,columns:t,getRowId:g}),p=h.getTableProps,m=h.getTableBodyProps,f=h.headerGroups,b=h.rows,P=h.prepareRow,v=function(e,t){var a=u[e];d(ue()(u,{$splice:[[e,1],[t,0,a]]}))};return c.createElement(X.Q,{backend:Y.t2},c.createElement("table",(0,$.A)({},p(),{className:"table table-condensed table-hover table-striped col-xs-12"}),c.createElement("thead",null,f.map((function(e){return c.createElement("tr",(0,$.A)({},e.getHeaderGroupProps(),{className:"thead-title"}),e.headers.map((function(e){return c.createElement(c.Fragment,null,"order"===e.fieldName&&!0===o?c.createElement("th",e.getHeaderProps({style:{width:e.width}}),c.createElement("span",null,c.createElement(de.__w,{color:"white",size:"15px","data-tip":"Je kunt de volgorde van de widgets aanpassen door deze te slepen.","data-for":"tooltip-order"}),c.createElement(ge.A,{id:"tooltip-order",effect:"float",place:"right",multiline:!0,"aria-haspopup":"true"}))):"title"===e.fieldName||"widgetImageFileName"===e.fieldName||"active"===e.fieldName?c.createElement("th",e.getHeaderProps({style:{width:e.width}}),e.render("Header")):"codeRef"===e.fieldName&&!0!==o?c.createElement("th",e.getHeaderProps({style:{width:e.width}})):null)})))}))),c.createElement("tbody",m(),b.map((function(e,t){return P(e)||c.createElement(ie,(0,$.A)({index:t,row:e,moveRow:v,showEditSort:o,handleInputChange:r,deletePortalSettingsDashboardWidget:n},e.getRowProps(),{imageHash:l}))})))))};var me=a(23384);function fe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function be(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?fe(Object(a),!0).forEach((function(t){(0,i.A)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):fe(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function Pe(e,t,a){return t=(0,l.A)(t),(0,n.A)(e,ve()?Reflect.construct(t,a||[],(0,l.A)(e).constructor):t.apply(e,a))}function ve(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(ve=function(){return!!e})()}var we=function(e){function t(e){var a;return(0,o.A)(this,t),a=Pe(this,t,[e]),(0,i.A)(a,"newWidget",(function(){u.RL.push("/portal-instellingen-dashboard-widget/nieuw")})),(0,i.A)(a,"deletePortalSettingsDashboardWidget",(function(e){A.A.deletePortalSettingsDashboardWidget(e).then((function(e){a.setState(be(be({},a.state),{},{dashboardSettings:e.data.data}))})).catch((function(e){e.response?a.props.setError(e.response.status,e.response.data.message):(console.log(e),alert("Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals."))}))})),(0,i.A)(a,"setShowEditSort",(function(){a.setState({showEditSort:!0})})),(0,i.A)(a,"closeShowEditSort",(function(){a.props.updateState(a.state.dashboardSettings),a.setState({showEditSort:!1})})),(0,i.A)(a,"updateSortWidgets",(function(e){A.A.updatePortalSettingsDashboard(a.state.dashboardSettings).then((function(e){a.setState(be(be({},a.state),{},{dashboardSettings:e.data.data})),a.closeShowEditSort()})).catch((function(e){e.response?a.props.setError(e.response.status,e.response.data.message):(console.log(e),alert("Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals."))}))})),a.state={dashboardSettings:e.dashboardSettings,showEditSort:!1,isLoading:!1,hasError:!1,imageHash:Date.now()},a}return(0,s.A)(t,e),(0,r.A)(t,[{key:"render",value:function(){var e=this.state.showEditSort,t=this.state.dashboardSettings.widgets;return c.createElement(w.A,null,c.createElement(J.A,null,c.createElement("span",{className:"h5 text-bold"},"Widgets"),!e&&c.createElement("a",{role:"button",className:"pull-right",onClick:this.newWidget},c.createElement(ae.Ay,{size:14,icon:me.t,title:"Toevoegen widget"}))),c.createElement(S.A,null,!e&&c.createElement("div",{className:"col-md-12"},c.createElement("div",{className:"row"},c.createElement("div",{className:"btn-group btn-group-flex",role:"group"},c.createElement("div",{className:"col-md-6"},c.createElement(v.A,{buttonText:"Sorteren widgets",onClickAction:this.setShowEditSort}))))),c.createElement("div",{className:"col-md-12 margin-10-top"},t?c.createElement(pe,{columns:[{Header:"Order",fieldName:"order",accessor:"order",width:"10%"},{Header:"Titel",fieldName:"title",accessor:"title",width:"40%"},{Header:"Afbeelding",fieldName:"widgetImageFileName",accessor:"widgetImageFileName",width:"20%"},{Header:"Actief",fieldName:"active",accessor:"active",width:"20%"},{Header:"",fieldName:"codeRef",accessor:"codeRef",width:"10%"}],data:t.sort((function(e,t){return e.order>t.order?1:-1})),showEditSort:e,deletePortalSettingsDashboardWidget:this.deletePortalSettingsDashboardWidget,imageHash:this.state.imageHash}):c.createElement("p",null,"Laden widgets..."))),e&&c.createElement(S.A,null,c.createElement("div",{className:"pull-right btn-group",role:"group"},c.createElement(v.A,{buttonClassName:"btn-default",buttonText:"Sluiten",onClickAction:this.closeShowEditSort}),c.createElement(v.A,{buttonText:"Opslaan",onClickAction:this.updateSortWidgets}))))}}])}(c.Component);const Se=(0,m.Ng)((function(e){return{permissions:e.meDetails.permissions}}),(function(e){return{setError:function(t,a){e((0,E.N)(t,a))}}}))(we);function Ee(e,t,a){return t=(0,l.A)(t),(0,n.A)(e,ye()?Reflect.construct(t,a||[],(0,l.A)(e).constructor):t.apply(e,a))}function ye(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(ye=function(){return!!e})()}var Ae=function(e){function t(e){return(0,o.A)(this,t),Ee(this,t,[e])}return(0,s.A)(t,e),(0,r.A)(t,[{key:"render",value:function(){var e=this.props,t=e.defaultPortalSettingsLayout,a=e.dashboardSettings,o=e.hasError,r=e.isLoading,n=e.updateState,l="",s=!0;return o?l="Fout bij het ophalen van portal dashboard instellingen.":r?l="Gegevens aan het laden.":s=!1,s?c.createElement("div",null,l):c.createElement("div",null,c.createElement(V,{defaultPortalSettingsLayout:t,dashboardSettings:a,updateState:n}),c.createElement(Se,{dashboardSettings:a,updateState:n}))}}])}(c.Component);q.A.propTypes={dashboardSettings:G.any,hasError:G.any,isLoading:G.any,updateState:G.any};const Ce=Ae;var ke=a(72505),De=a.n(ke),xe=a(42603);function Le(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function Be(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Le(Object(a),!0).forEach((function(t){(0,i.A)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Le(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function Ne(e,t,a){return t=(0,l.A)(t),(0,n.A)(e,Me()?Reflect.construct(t,a||[],(0,l.A)(e).constructor):t.apply(e,a))}function Me(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(Me=function(){return!!e})()}var Te=function(e){function t(e){var a;return(0,o.A)(this,t),a=Ne(this,t,[e]),(0,i.A)(a,"callFetchPortalSettingsDashboardDetails",(function(){a.setState({isLoading:!0,hasError:!1}),De().all([xe.A.fetchDefaultPortalSettingsLayoutDetails(),A.A.fetchPortalSettingsDashboardDetails(1)]).then(De().spread((function(e,t){a.setState({isLoading:!1,defaultPortalSettingsLayout:e.data.data,dashboardSettings:Be({},t.data.data)})}))).catch((function(e){a.setState({isLoading:!1,hasError:!0})}))})),(0,i.A)(a,"updateState",(function(e){a.setState({dashboardSettings:Be({},e)})})),a.state={defaultPortalSettingsLayout:{},dashboardSettings:{},isLoading:!1,hasError:!1},a}return(0,s.A)(t,e),(0,r.A)(t,[{key:"componentDidMount",value:function(){this.callFetchPortalSettingsDashboardDetails()}},{key:"render",value:function(){return c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-9"},c.createElement("div",{className:"col-md-12 margin-10-top"},c.createElement(w.A,null,c.createElement(S.A,{className:"panel-small"},c.createElement(p,null)))),c.createElement("div",{className:"col-md-12 margin-10-top"},c.createElement(Ce,{defaultPortalSettingsLayout:this.state.defaultPortalSettingsLayout,dashboardSettings:this.state.dashboardSettings,isLoading:this.state.isLoading,hasError:this.state.hasError,updateState:this.updateState}))),c.createElement("div",{className:"col-md-3"}))}}])}(c.Component);const He=(0,m.Ng)((function(e){return{permissions:e.meDetails.permissions}}),(function(e){return{setError:function(t,a){e((0,E.N)(t,a))}}}))(Te)}}]);