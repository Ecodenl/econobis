(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{1663:function(e,n,t){"use strict";t.r(n);var a=t(14),o=t.n(a),c=t(15),i=t.n(c),r=t(9),l=t.n(r),u=t(16),s=t.n(u),d=t(17),m=t.n(d),p=t(12),f=t.n(p),h=t(5),v=t.n(h),g=t(0),E=t.n(g),y=t(19),k=t(999),b=t(27),N=t(30),D=t(4),R=t(50),w=Object(y.b)((function(e){return{documentFilename:e.documentDetails.filename,documentId:e.documentDetails.id}}),null)((function(e){return E.a.createElement("div",{className:"row"},E.a.createElement("div",{className:"col-md-4"},E.a.createElement("div",{className:"btn-group",role:"group"},E.a.createElement(R.a,{iconName:"glyphicon-arrow-left",onClickAction:D.e.goBack}),E.a.createElement(R.a,{iconName:"glyphicon-download-alt",onClickAction:e.download}),E.a.createElement(R.a,{iconName:"glyphicon-envelope",onClickAction:function(){return D.f.push("/email/nieuw/document/".concat(e.documentId))}}),E.a.createElement(R.a,{iconName:"glyphicon-zoom-in",onClickAction:e.zoomIn}),E.a.createElement(R.a,{iconName:"glyphicon-zoom-out",onClickAction:e.zoomOut}))),E.a.createElement("div",{className:"col-md-4"},E.a.createElement("h4",{className:"text-center"},"Document: "+e.documentFilename)),E.a.createElement("div",{className:"col-md-4"}))})),C=t(161),T=t(943),O=t(230);function q(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,a=f()(e);if(n){var o=f()(this).constructor;t=Reflect.construct(a,arguments,o)}else t=a.apply(this,arguments);return m()(this,t)}}var z=function(e){s()(t,e);var n=q(t);function t(e){var a;return o()(this,t),(a=n.call(this,e)).state={file:null},a}return i()(t,[{key:"componentDidMount",value:function(){this.downloadFile()}},{key:"downloadFile",value:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;O.a.download(this.props.documentId).then((function(n){e.setState({file:n.data})})).catch((function(){n<2&&setTimeout((function(){e.downloadFile(n)}),500),n++}))}},{key:"render",value:function(){var e="",n=!0;return this.props.hasError?e="Fout bij het ophalen van document.":this.props.isLoading?e="Gegevens aan het laden.":Object(C.isEmpty)(this.props.documentDetails)?e="Geen document gevonden!":this.state.file?n=!1:e="Document van Alfresco halen.",n?E.a.createElement("div",null,e):E.a.createElement("div",null,E.a.createElement(T.a,{file:this.state.file,scale:this.props.scale}))}}]),t}(g.Component),I=Object(y.b)((function(e){return{documentDetails:e.documentDetails,isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}),null)(z),P=t(163),A=t.n(P);function x(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,a=f()(e);if(n){var o=f()(this).constructor;t=Reflect.construct(a,arguments,o)}else t=a.apply(this,arguments);return m()(this,t)}}var F=function(e){s()(t,e);var n=x(t);function t(e){var a;return o()(this,t),a=n.call(this,e),v()(l()(a),"zoomIn",(function(){a.setState({scale:a.state.scale+.2})})),v()(l()(a),"zoomOut",(function(){a.setState({scale:a.state.scale-.2})})),a.state={scale:1},a.download=a.download.bind(l()(a)),a}return i()(t,[{key:"componentDidMount",value:function(){this.props.fetchDocumentDetails(this.props.params.id)}},{key:"download",value:function(){var e=this;O.a.download(this.props.documentDetails.id).then((function(n){A()(n.data,e.props.documentDetails.filename)}))}},{key:"render",value:function(){return E.a.createElement("div",{className:"row"},E.a.createElement("div",{className:"col-md-12"},E.a.createElement("div",{className:"col-md-12 margin-10-top"},E.a.createElement(b.a,null,E.a.createElement(N.a,{className:"panel-small"},E.a.createElement(w,{zoomIn:this.zoomIn,zoomOut:this.zoomOut,download:this.download})))),E.a.createElement("div",{className:"col-md-12 margin-10-top"},E.a.createElement(I,{documentId:this.props.params.id,scale:this.state.scale}))))}}]),t}(g.Component);n.default=Object(y.b)((function(e){return{documentDetails:e.documentDetails}}),(function(e){return{fetchDocumentDetails:function(n){e(Object(k.a)(n))}}}))(F)},943:function(e,n,t){"use strict";var a=t(0),o=t.n(a),c=t(3),i=t.n(c),r=t(959),l=t.n(r),u=function(e){var n=e.page,t=(e.pages,e.handlePrevClick);return 1===n?o.a.createElement("div",null):o.a.createElement("h3",{style:{cursor:"pointer",display:"inline-block",marginRight:24,marginTop:0},onClick:t},"<")};u.propTypes={page:i.a.number.isRequired,pages:i.a.number.isRequired,handlePrevClick:i.a.func.isRequired};var s=function(e){var n=e.page,t=e.pages,a=e.handleNextClick;return n===t?o.a.createElement("div",null):o.a.createElement("h3",{style:{cursor:"pointer",display:"inline-block",marginLeft:24,marginTop:0},onClick:a},">")};s.propTypes={page:i.a.number.isRequired,pages:i.a.number.isRequired,handleNextClick:i.a.func.isRequired};var d=function(e){var n=e.page,t=e.pages;return o.a.createElement("h3",{style:{display:"inline-block",marginTop:0}},"Pagina ",n," van ",t)};d.propTypes={page:i.a.number.isRequired,pages:i.a.number.isRequired};var m=function(e){var n=e.page,t=e.pages,a=e.handlePrevClick,c=e.handleNextClick;return o.a.createElement("div",{className:"customWrapper"},o.a.createElement(u,{page:n,pages:t,handlePrevClick:a}),o.a.createElement(d,{page:n,pages:t}),o.a.createElement(s,{page:n,pages:t,handleNextClick:c}))};m.propTypes={page:i.a.number.isRequired,pages:i.a.number.isRequired,handlePrevClick:i.a.func.isRequired,handleNextClick:i.a.func.isRequired};var p=m;l.a.defaultProps={file:"",scale:1},l.a.propTypes={file:i.a.string,scale:i.a.number};n.a=function(e){var n=e.file,t=e.scale;return o.a.createElement("div",{className:"panel-heading"},o.a.createElement(l.a,{document:{file:n},navigation:p,scale:t}))}},961:function(e,n){},962:function(e,n){},963:function(e,n){},964:function(e,n){},965:function(e,n){},999:function(e,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return o}));var a=function(e){return{type:"FETCH_DOCUMENT_DETAILS",id:e}},o=function(e){return{type:"UPDATE_DOCUMENT_DETAILS",document:e}}}}]);