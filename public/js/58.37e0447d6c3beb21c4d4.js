(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{1603:function(e,t,n){"use strict";n.r(t);var a=n(24),r=n.n(a),o=n(25),i=n.n(o),l=n(22),c=n.n(l),s=n(26),u=n.n(s),d=n(27),f=n.n(d),m=n(16),p=n.n(m),h=n(6),v=n.n(h),g=n(0),y=n.n(g),b=n(693),E=n(694),N=n(31),C=(n(198),n(10)),k=n.n(C),w=n(4);function R(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=p()(e);if(t){var r=p()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var O=function(e){u()(n,e);var t=R(n);function n(e){return r()(this,n),t.call(this,e)}return i()(n,[{key:"render",value:function(){var e=this;return y.a.createElement("nav",{className:"orders-list open sticky"},y.a.createElement("div",{className:"send-orders-sidebar-menu",style:{color:"$brand-primary"}},y.a.createElement(k.a,{highlightColor:"$brand-primary",highlightBgColor:"#e5e5e5",hoverBgColor:"#F1EFF0",defaultSelected:"order"},this.props.orders.length>0?this.props.orders.map((function(t,n){return y.a.createElement(C.Nav,{onNavClick:function(){return e.props.changeOrder(t.id)},key:n,id:"administration-".concat(t.id)},y.a.createElement(C.NavText,null,y.a.createElement(w.b,{className:"".concat(t.totalInclVatInclReduction<0?"send-orders-list-link-error":"send-orders-list-link")},t.number," - ",t.contactName)))})):y.a.createElement(C.Nav,{id:"order"},y.a.createElement(C.NavText,null,y.a.createElement(w.b,{className:"send-orders-list-link"},"Geen orders beschikbaar."))))))}}]),n}(g.Component),T=Object(N.b)((function(e){return{administrationDetails:e.administrationDetails}}))(O),_=n(209),P=n(767),I=n(93);function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=p()(e);if(t){var r=p()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var M=function(e){u()(n,e);var t=j(n);function n(e){var a;return r()(this,n),(a=t.call(this,e)).state={file:null},a}return i()(n,[{key:"componentWillReceiveProps",value:function(e){this.props.orderId!==e.orderId&&e.orderId&&this.downloadFile(e.orderId)}},{key:"downloadFile",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;I.a.downloadPreview(e).then((function(e){t.setState({file:e.data})})).catch((function(){n<2&&setTimeout((function(){t.downloadFile(e,n)}),500),n++}))}},{key:"render",value:function(){return this.props.isLoading?y.a.createElement("div",null,"Gegevens aan het laden."):this.state.file?y.a.createElement("div",null,y.a.createElement(P.a,{file:this.state.file})):this.props.amountOfOrders>0?y.a.createElement("div",null,"Selecteer links in het scherm een contact om een preview te zien."):y.a.createElement("div",null,"Geen gegevens gevonden.")}}]),n}(g.Component),D=n(780);function x(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=p()(e);if(t){var r=p()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var A=function(e){u()(n,e);var t=x(n);function n(e){var a;return r()(this,n),(a=t.call(this,e)).state={email:null},a}return i()(n,[{key:"componentWillReceiveProps",value:function(e){this.props.orderId!==e.orderId&&e.orderId&&this.downloadEmail(e.orderId)}},{key:"downloadEmail",value:function(e){var t=this;I.a.getEmailPreview(e).then((function(e){t.setState({email:e})}))}},{key:"render",value:function(){return this.props.isLoading?y.a.createElement("div",null,"Gegevens aan het laden."):this.state.email?y.a.createElement("div",null,y.a.createElement("div",{className:"row margin-10-top"},y.a.createElement("div",{className:"col-sm-12"},y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-sm-3"},y.a.createElement("label",{className:"col-sm-12"},"Aan")),y.a.createElement("div",{className:"col-sm-9"},this.state.email.to)))),y.a.createElement("div",{className:"row margin-10-top"},y.a.createElement("div",{className:"col-sm-12"},y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-sm-3"},y.a.createElement("label",{className:"col-sm-12"},"Onderwerp")),y.a.createElement("div",{className:"col-sm-9"},this.state.email.subject)))),y.a.createElement("div",{className:"row"},y.a.createElement(D.a,{label:"Tekst",value:this.state.email.htmlBody}))):this.props.amountOfOrders>0?y.a.createElement("div",null,"Selecteer links in het scherm een contact om een preview te zien."):y.a.createElement("div",null,"Geen gegevens gevonden.")}}]),n}(g.Component),q=n(695),L=n(101);function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=p()(e);if(t){var r=p()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var B=function(e){u()(n,e);var t=S(n);function n(e){var a;return r()(this,n),a=t.call(this,e),v()(c()(a),"confirmAction",(function(e){a.setState({loading:!0}),e.preventDefault(),I.a.createAll(a.props.orderIds).then((function(e){w.f.push("/financieel/".concat(a.props.administrationId,"/notas/te-verzenden-incasso"))}))})),a=t.call(this,e),v()(c()(a),"confirmAction",(function(e){a.setState({loading:!0}),e.preventDefault(),I.a.createAll(a.props.orderIds).then((function(e){w.f.push("/financieel/".concat(a.props.administrationId,"/notas/te-verzenden-incasso"))}))})),a.state={loading:!1},a}return i()(n,[{key:"render",value:function(){return y.a.createElement(L.a,{modalClassName:"modal-lg",closeModal:this.props.closeModal,confirmAction:this.confirmAction,title:"Nota aanmaken",buttonConfirmText:"Aanmaken",loading:this.state.loading},y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-sm-12 margin-10-bottom"},y.a.createElement("span",null,"Wilt u alle concept nota's (",this.props.amountOfOrders,") aanmaken? Let op. Nadat je op \"maak concept nota's\" hebt geklikt staan de concept nota's klaar om te verzenden. Je kunt geen wijzigingen aanmaken in de order. Dit kan pas weer, nadat de aangemaakte nota werkelijk is verzonden. Zorg er daarom voor dat je order juist is.",y.a.createElement("br",null),y.a.createElement("br",null),"De aangemaakte concept nota's komen in de map “Te verzenden - incasso nota's” of “Te verzenden – overboek nota's”. Vanuit deze mappen kun je de nota's definitief maken en verzenden.",y.a.createElement("br",null),y.a.createElement("br",null),'Deze orders gaan van de order map "Actief - te factureren orders" naar de order map “Actief – te verzenden orders”.'))))}}]),n}(g.Component),z=n(696);function F(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=p()(e);if(t){var r=p()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var W=function(e){u()(n,e);var t=F(n);function n(e){var a;return r()(this,n),a=t.call(this,e),v()(c()(a),"showCreate",(function(){a.setState({showCreate:!a.state.showCreate})})),a.state={showCreate:!1},a}return i()(n,[{key:"render",value:function(){return y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-md-4"},y.a.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},y.a.createElement(q.a,{iconName:"glyphicon-arrow-left",onClickAction:w.e.goBack}),this.props.amountOfOrders>0&&y.a.createElement(z.a,{buttonText:"Maak concept nota's",onClickAction:this.showCreate}))),y.a.createElement("div",{className:"col-md-4"},y.a.createElement("h4",{className:"text-center"},"Concept nota's aanmaken (",this.props.amountOfOrders,")")),y.a.createElement("div",{className:"col-md-4"}),this.state.showCreate&&y.a.createElement(B,{closeModal:this.showCreate,administrationId:this.props.administrationId,amountOfOrders:this.props.amountOfOrders,orderIds:this.props.orderIds}))}}]),n}(g.Component),U=n(911);function V(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=p()(e);if(t){var r=p()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f()(this,n)}}var G=function(e){u()(n,e);var t=V(n);function n(e){var a;return r()(this,n),a=t.call(this,e),v()(c()(a),"changeOrder",(function(e){a.setState({orderId:e})})),a.state={orders:[],orderId:"",isLoading:!1},a}return i()(n,[{key:"componentWillUnmount",value:function(){this.props.clearPreviewCreate()}},{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0}),_.a.getOrdersForCreating(this.props.orderPreviewCreate).then((function(t){e.setState({orders:t.data,isLoading:!1})})).catch((function(t){e.setState({isLoading:!1})}))}},{key:"render",value:function(){return y.a.createElement("div",null,y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-md-12 margin-10-top"},y.a.createElement("div",{className:"col-md-12 margin-10-top"},y.a.createElement(b.a,null,y.a.createElement(E.a,{className:"panel-small"},y.a.createElement(W,{orderIds:this.props.orderPreviewCreate,amountOfOrders:this.state.orders?this.state.orders.length:0,administrationId:this.props.params.id})))))),y.a.createElement("div",{className:"row"},y.a.createElement("div",{className:"col-md-2"},y.a.createElement("div",{className:"col-md-12 margin-10-top"},y.a.createElement(b.a,null,y.a.createElement(E.a,{className:"panel-orders-list"},y.a.createElement(T,{orders:this.state.orders,isLoading:this.state.isLoading,changeOrder:this.changeOrder}))))),y.a.createElement("div",{className:"col-md-5"},y.a.createElement("div",{className:"col-md-12 margin-10-top"},y.a.createElement(b.a,null,y.a.createElement(E.a,null,y.a.createElement(M,{orderId:this.state.orderId,isLoading:this.state.isLoading,amountOfOrders:this.state.orders?this.state.orders.length:0}))))),y.a.createElement("div",{className:"col-md-5"},y.a.createElement("div",{className:"col-md-12 margin-10-top"},y.a.createElement(b.a,null,y.a.createElement(E.a,null,y.a.createElement(A,{orderId:this.state.orderId,isLoading:this.state.isLoading,amountOfOrders:this.state.orders?this.state.orders.length:0})))))))}}]),n}(g.Component);t.default=Object(N.b)((function(e){return{orderPreviewCreate:e.orderPreviewCreate}}),(function(e){return{clearPreviewCreate:function(){e(Object(U.b)())}}}))(G)},693:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(8),i=n.n(o),l=function(e){var t=e.children,n=e.className,a=e.onMouseEnter,o=e.onMouseLeave;return r.a.createElement("div",{className:"panel panel-default ".concat(n),onMouseEnter:a,onMouseLeave:o},t)};l.defaultProps={className:"",onMouseEnter:function(){},onMouseLeave:function(){}},l.propTypes={className:i.a.string,onMouseEnter:i.a.func,onMouseLeave:i.a.func},t.a=l},694:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(8),i=n.n(o),l=function(e){var t=e.className,n=e.children;return r.a.createElement("div",{className:"panel-body ".concat(t)},n)};l.defaultProps={className:""},l.propTypes={className:i.a.string},t.a=l},695:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(8),i=n.n(o),l=function(e){var t=e.buttonClassName,n=e.iconName,a=e.onClickAction,o=e.title,i=e.disabled;return r.a.createElement("button",{type:"button",className:"btn ".concat(t),onClick:a,disabled:i,title:o},r.a.createElement("span",{className:"glyphicon ".concat(n)}))};l.defaultProps={buttonClassName:"btn-success btn-sm",title:"",disabled:!1},l.propTypes={buttonClassName:i.a.string,iconName:i.a.string.isRequired,onClickAction:i.a.func,title:i.a.string,disabled:i.a.bool},t.a=l},696:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(8),i=n.n(o),l=function(e){var t=e.buttonClassName,n=e.buttonText,a=e.onClickAction,o=e.type,i=e.value,l=e.loading,c=e.loadText,s=e.disabled;return l?r.a.createElement("button",{type:o,className:"btn btn-sm btn-loading ".concat(t),value:i,disabled:l},r.a.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"})," ",c):r.a.createElement("button",{type:o,className:"btn btn-sm ".concat(t),onClick:a,value:i,disabled:s},n)};l.defaultProps={buttonClassName:"btn-success",type:"button",value:"",loading:!1,loadText:"Aan het laden",disabled:!1},l.propTypes={buttonClassName:i.a.string,buttonText:i.a.string.isRequired,onClickAction:i.a.func,type:i.a.string,value:i.a.string,loading:i.a.bool,loadText:i.a.string,disabled:i.a.bool},t.a=l},767:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(8),i=n.n(o),l=n(817),c=n.n(l),s=function(e){var t=e.page,n=(e.pages,e.handlePrevClick);return 1===t?r.a.createElement("div",null):r.a.createElement("h3",{style:{cursor:"pointer",display:"inline-block",marginRight:24,marginTop:0},onClick:n},"<")};s.propTypes={page:i.a.number.isRequired,pages:i.a.number.isRequired,handlePrevClick:i.a.func.isRequired};var u=function(e){var t=e.page,n=e.pages,a=e.handleNextClick;return t===n?r.a.createElement("div",null):r.a.createElement("h3",{style:{cursor:"pointer",display:"inline-block",marginLeft:24,marginTop:0},onClick:a},">")};u.propTypes={page:i.a.number.isRequired,pages:i.a.number.isRequired,handleNextClick:i.a.func.isRequired};var d=function(e){var t=e.page,n=e.pages;return r.a.createElement("h3",{style:{display:"inline-block",marginTop:0}},"Pagina ",t," van ",n)};d.propTypes={page:i.a.number.isRequired,pages:i.a.number.isRequired};var f=function(e){var t=e.page,n=e.pages,a=e.handlePrevClick,o=e.handleNextClick;return r.a.createElement("div",{className:"customWrapper"},r.a.createElement(s,{page:t,pages:n,handlePrevClick:a}),r.a.createElement(d,{page:t,pages:n}),r.a.createElement(u,{page:t,pages:n,handleNextClick:o}))};f.propTypes={page:i.a.number.isRequired,pages:i.a.number.isRequired,handlePrevClick:i.a.func.isRequired,handleNextClick:i.a.func.isRequired};var m=f;c.a.defaultProps={file:"",scale:1},c.a.propTypes={file:i.a.string,scale:i.a.number};t.a=function(e){var t=e.file,n=e.scale;return r.a.createElement("div",{className:"panel-heading"},r.a.createElement(c.a,{document:{file:t},navigation:m,scale:n}))}},780:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(785),i=n.n(o),l=n(8),c=n.n(l),s=n(693),u=n(696),d=function(e){var t=e.label,n=e.className,a=e.id,o=e.value,l=e.switchToEdit;return r.a.createElement("div",{className:n},r.a.createElement("label",{htmlFor:a,className:"col-sm-3"},t,l?r.a.createElement("span",null,r.a.createElement("br",null),r.a.createElement(u.a,{buttonClassName:"btn-success btn-padding-small",buttonText:"Wijzig",onClickAction:l})):""),r.a.createElement(s.a,{className:"col-sm-9"},r.a.createElement(i.a,null,r.a.createElement("div",{id:a,dangerouslySetInnerHTML:{__html:o}}))))};d.defaultProps={className:"col-sm-12",value:""},d.propTypes={label:c.a.string.isRequired,className:c.a.string,id:c.a.string,value:c.a.oneOfType([c.a.string,c.a.number])},t.a=d},785:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=n(786),o=(a=r)&&a.__esModule?a:{default:a};t.default=o.default},786:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(0),i=u(o),l=u(n(102)),c=u(n(8)),s=u(n(787));function u(e){return e&&e.__esModule?e:{default:e}}var d,f="undefined"!=typeof window&&window.console,m=function(){},p=m,h=m;f&&(d=console.error,p=function(){console.error=function(e){/<head>/.test(e)||d.call(console,e)}},h=function(){return console.error=d});var v=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a._isMounted=!1,a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.renderFrameContents()}},{key:"componentDidUpdate",value:function(){this.renderFrameContents()}},{key:"componentWillUnmount",value:function(){this._isMounted=!1;var e=this.getDoc(),t=this.getMountTarget();e&&t&&l.default.unmountComponentAtNode(t)}},{key:"getDoc",value:function(){return l.default.findDOMNode(this).contentDocument}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(this._isMounted){var e=this.getDoc();if(e&&"complete"===e.readyState){null===e.querySelector("div")&&(this._setInitialContent=!1);var t=e.defaultView||e.parentView,n=!this._setInitialContent,a=i.default.createElement(s.default,{document:e,window:t},i.default.createElement("div",{className:"frame-content"},this.props.head,this.props.children));n&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close(),this._setInitialContent=!0),p();var r=n?this.props.contentDidMount:this.props.contentDidUpdate,o=this.getMountTarget();l.default.unstable_renderSubtreeIntoContainer(this,a,o,r),h()}else setTimeout(this.renderFrameContents.bind(this),0)}}},{key:"render",value:function(){var e=a({},this.props,{children:void 0});return delete e.head,delete e.initialContent,delete e.mountTarget,delete e.contentDidMount,delete e.contentDidUpdate,i.default.createElement("iframe",e)}}]),t}(o.Component);v.propTypes={style:c.default.object,head:c.default.node,initialContent:c.default.string,mountTarget:c.default.string,contentDidMount:c.default.func,contentDidUpdate:c.default.func,children:c.default.oneOfType([c.default.element,c.default.arrayOf(c.default.element)])},v.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=v},787:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),o=(i(r),i(n(8)));function i(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var s=function(e){function t(){return l(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"getChildContext",value:function(){return{document:this.props.document,window:this.props.window}}},{key:"render",value:function(){return r.Children.only(this.props.children)}}]),t}(r.Component);s.propTypes={document:o.default.object.isRequired,window:o.default.object.isRequired,children:o.default.element.isRequired},s.childContextTypes={document:o.default.object.isRequired,window:o.default.object.isRequired},t.default=s},818:function(e,t){},819:function(e,t){},820:function(e,t){},821:function(e,t){},822:function(e,t){},911:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"a",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"e",(function(){return i})),n.d(t,"b",(function(){return l}));var a=function(e,t,n,a){return{type:"FETCH_ORDERS",filters:e,sorts:t,pagination:n,administrationId:a}},r=function(){return{type:"CLEAR_ORDERS"}},o=function(e){return{type:"DELETE_ORDER",id:e}},i=function(e){return{type:"ORDER_PREVIEW_CREATE",data:e}},l=function(){return{type:"CLEAR_ORDER_PREVIEW_CREATE"}}}}]);