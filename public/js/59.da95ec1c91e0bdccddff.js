(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{1626:function(e,t,n){"use strict";n.r(t);var a=n(18),i=n.n(a),c=n(19),r=n.n(c),o=n(12),l=n.n(o),s=n(20),u=n.n(s),v=n(21),f=n.n(v),p=n(14),d=n.n(p),m=n(6),h=n.n(m),w=n(0),g=n.n(w),y=n(30),C=n(33),O=n(235),E=n(844),b=n(878);function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=d()(e);if(t){var i=d()(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return f()(this,n)}}var R=function(e){u()(n,e);var t=k(n);function n(e){var a;return i()(this,n),(a=t.call(this,e)).state={file:null},a}return r()(n,[{key:"componentDidMount",value:function(){this.downloadFile()}},{key:"downloadFile",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;b.a.download(this.props.financialOverviewContactId).then((function(t){e.setState({file:t.data})})).catch((function(){t<2&&setTimeout((function(){e.downloadFile(t)}),500),t++}))}},{key:"render",value:function(){return Object(O.isEmpty)(this.props.financialOverviewContactDetails)||!this.state.file?g.a.createElement("div",null,"Geen gegevens gevonden."):g.a.createElement("div",null,g.a.createElement(E.a,{file:this.state.file,scale:this.props.scale}))}}]),n}(w.Component),N=n(3),D=n(48);function F(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=d()(e);if(t){var i=d()(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return f()(this,n)}}var P=function(e){u()(n,e);var t=F(n);function n(e){return i()(this,n),t.call(this,e)}return r()(n,[{key:"render",value:function(){return g.a.createElement("div",{className:"row"},g.a.createElement("div",{className:"col-md-3"},g.a.createElement("div",{className:"btn-group",role:"group"},g.a.createElement(D.a,{iconName:"glyphicon-arrow-left",onClickAction:N.e.goBack}),g.a.createElement(D.a,{iconName:"glyphicon-download-alt",onClickAction:this.props.download}),g.a.createElement(D.a,{iconName:"glyphicon-zoom-in",onClickAction:this.props.zoomIn}),g.a.createElement(D.a,{iconName:"glyphicon-zoom-out",onClickAction:this.props.zoomOut}))),g.a.createElement("div",{className:"col-md-6"},g.a.createElement("h4",{className:"text-center"},"Contact: "+(this.props.financialOverviewContactDetails&&this.props.financialOverviewContactDetails.financialOverviewContact&&this.props.financialOverviewContactDetails.financialOverviewContact.contact?this.props.financialOverviewContactDetails.financialOverviewContact.contact.full_name:""),g.a.createElement("br",null),"Waardestaat: "+(this.props.financialOverviewContactDetails&&this.props.financialOverviewContactDetails.financialOverviewContact&&this.props.financialOverviewContactDetails.financialOverviewContact.financial_overview?this.props.financialOverviewContactDetails.financialOverviewContact.financial_overview.description:""),g.a.createElement("br",null),"Status: "+(this.props.financialOverviewContactDetails&&this.props.financialOverviewContactDetails.financialOverviewContact?this.props.financialOverviewContactDetails.financialOverviewContact.status:""))),g.a.createElement("div",{className:"col-md-3"}))}}]),n}(w.Component),S=n(130),T=n.n(S);function q(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=d()(e);if(t){var i=d()(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return f()(this,n)}}var x=function(e){u()(n,e);var t=q(n);function n(e){var a;return i()(this,n),a=t.call(this,e),h()(l()(a),"callFetchFinancialOverviewContactDetails",(function(){a.setState({isLoading:!0,hasError:!1}),b.a.fetchFinancialOverviewContactDetails(a.props.params.id).then((function(e){a.setState({isLoading:!1,financialOverviewContactDetails:e.data})})).catch((function(e){a.setState({isLoading:!1,hasError:!0})}))})),h()(l()(a),"zoomIn",(function(){a.setState({scale:a.state.scale+.2})})),h()(l()(a),"zoomOut",(function(){a.setState({scale:a.state.scale-.2})})),a.state={financialOverviewContactDetails:{},isLoading:!1,hasError:!1,scale:1},a.download=a.download.bind(l()(a)),a}return r()(n,[{key:"componentDidMount",value:function(){this.callFetchFinancialOverviewContactDetails()}},{key:"download",value:function(){b.a.download(this.props.params.id).then((function(e){T()(e.data,e.headers["x-filename"])}))}},{key:"render",value:function(){return g.a.createElement("div",{className:"row"},g.a.createElement("div",{className:"col-md-12"},g.a.createElement("div",{className:"col-md-12 margin-10-top"},g.a.createElement(y.a,null,g.a.createElement(C.a,{className:"panel-small"},g.a.createElement(P,{financialOverviewContactDetails:this.state.financialOverviewContactDetails,zoomIn:this.zoomIn,zoomOut:this.zoomOut,download:this.download})))),g.a.createElement("div",{className:"col-md-12 margin-10-top"},g.a.createElement(R,{financialOverviewContactDetails:this.state.financialOverviewContactDetails,financialOverviewContactId:this.props.params.id,scale:this.state.scale}))))}}]),n}(w.Component);t.default=x},844:function(e,t,n){"use strict";var a=n(0),i=n.n(a),c=n(5),r=n.n(c),o=n(869),l=n.n(o),s=function(e){var t=e.page,n=(e.pages,e.handlePrevClick);return 1===t?i.a.createElement("div",null):i.a.createElement("h3",{style:{cursor:"pointer",display:"inline-block",marginRight:24,marginTop:0},onClick:n},"<")};s.propTypes={page:r.a.number.isRequired,pages:r.a.number.isRequired,handlePrevClick:r.a.func.isRequired};var u=function(e){var t=e.page,n=e.pages,a=e.handleNextClick;return t===n?i.a.createElement("div",null):i.a.createElement("h3",{style:{cursor:"pointer",display:"inline-block",marginLeft:24,marginTop:0},onClick:a},">")};u.propTypes={page:r.a.number.isRequired,pages:r.a.number.isRequired,handleNextClick:r.a.func.isRequired};var v=function(e){var t=e.page,n=e.pages;return i.a.createElement("h3",{style:{display:"inline-block",marginTop:0}},"Pagina ",t," van ",n)};v.propTypes={page:r.a.number.isRequired,pages:r.a.number.isRequired};var f=function(e){var t=e.page,n=e.pages,a=e.handlePrevClick,c=e.handleNextClick;return i.a.createElement("div",{className:"customWrapper"},i.a.createElement(s,{page:t,pages:n,handlePrevClick:a}),i.a.createElement(v,{page:t,pages:n}),i.a.createElement(u,{page:t,pages:n,handleNextClick:c}))};f.propTypes={page:r.a.number.isRequired,pages:r.a.number.isRequired,handlePrevClick:r.a.func.isRequired,handleNextClick:r.a.func.isRequired};var p=f;l.a.defaultProps={file:"",scale:1},l.a.propTypes={file:r.a.string,scale:r.a.number};t.a=function(e){var t=e.file,n=e.scale;return i.a.createElement("div",{className:"panel-heading"},i.a.createElement(l.a,{document:{file:t},navigation:p,scale:n}))}},871:function(e,t){},872:function(e,t){},873:function(e,t){},874:function(e,t){},875:function(e,t){},878:function(e,t,n){"use strict";var a=n(11);n(2);t.a={fetchFinancialOverviewContacts:function(e,t,n,i,c,r){var o="".concat("financial-overview-contact","/grid");return a.a.get(o,{params:{financialOverviewId:JSON.stringify(i),onlyEmailFinancialOverviewContacts:JSON.stringify(c),onlyPostFinancialOverviewContacts:JSON.stringify(r),filters:JSON.stringify(e),sorts:JSON.stringify(t),limit:n.limit,offset:n.offset}})},fetchFinancialOverviewContactDetails:function(e){var t="".concat("financial-overview-contact","/").concat(e,"/get");return a.a.get(t)},getFinancialOverviewContactsForSending:function(e,t,n){var i="".concat("financial-overview-contact","/").concat(e,"/sending/").concat(n);return a.a.post(i,{ids:t})},sendAll:function(e,t){var n="".concat("financial-overview-contact","/").concat(e,"/send-all");document.body.style.cursor="wait";var i=a.a.post(n,{ids:t},{responseType:"blob"});return document.body.style.cursor="default",i},sendAllPost:function(e,t){var n="".concat("financial-overview-contact","/").concat(e,"/send-all-post");document.body.style.cursor="wait";var i=a.a.post(n,{ids:t},{responseType:"blob"});return document.body.style.cursor="default",i},download:function(e){var t="".concat("financial-overview-contact","/").concat(e,"/download");return a.a.get(t,{responseType:"blob"})},downloadPreview:function(e){var t="".concat("financial-overview-contact","/").concat(e,"}/download-preview");return a.a.get(t,{responseType:"blob"})},getEmailPreview:function(e){var t="".concat("financial-overview-contact","/").concat(e,"/email-preview");return a.a.get(t)}}}}]);