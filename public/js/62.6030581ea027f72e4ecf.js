(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{1590:function(e,t,n){"use strict";n.r(t);var i=n(15),a=n.n(i),r=n(16),l=n.n(r),o=n(12),s=n.n(o),u=n(17),c=n.n(u),f=n(18),m=n.n(f),h=n(13),p=n.n(h),g=n(5),d=n.n(g),F=n(0),E=n.n(F),v=n(20),y=n(25),b=function(e,t,n){return{type:"FETCH_HOUSING_FILES",filters:e,sorts:t,pagination:n}},N=function(){return{type:"CLEAR_HOUSING_FILES"}},S=function(e){return{type:"SET_FILTER_HOUSING_FILE_DATE",createdAt:e}},H=function(e){return{type:"SET_FILTER_HOUSING_FILE_ADDRESS",address:e}},R=function(e){return{type:"SET_FILTER_HOUSING_FILE_FULL_NAME",fullName:e}},w=function(e){return{type:"SET_FILTER_HOUSING_FILE_BUILDING_TYPE",buildingTypeId:e}},C=function(e){return{type:"SET_FILTER_HOUSING_FILE_ENERGY_LABEL",energyLabelId:e}},L=function(){return{type:"CLEAR_FILTER_HOUSING_FILES"}},T=function(e){return{type:"SET_HOUSING_FILES_PAGINATION",pagination:e}},I=n(141),_=n.n(I),D=n(222),k=n(223),A=n(284),P=n(931),O=Object(v.b)(null,(function(e){return{setHousingFilesSortsFilter:function(t,n){e(function(e,t){return{type:"SET_HOUSING_FILES_SORTS_FILTER",field:e,order:t}}(t,n))}}}))((function(e){var t=function(t,n){e.setHousingFilesSortsFilter(t,n),setTimeout((function(){e.refreshHousingFilesData()}),100)};return E.a.createElement("tr",{className:"thead-title"},E.a.createElement(P.a,{sortColumn:"createdAt",title:"Datum",width:"20%",setSorts:t}),E.a.createElement(P.a,{sortColumn:"address",title:"Adres",width:"20%",setSorts:t}),E.a.createElement(P.a,{sortColumn:"fullName",title:"Contact",width:"10%",setSorts:t}),E.a.createElement(P.a,{sortColumn:"buildingType",title:"Type woning",width:"30%",setSorts:t}),E.a.createElement(P.a,{sortColumn:"energyLabel",title:"Energielabel",width:"15%",setSorts:t}),E.a.createElement("th",{width:"5%"}))})),U=n(7),G=n.n(U),B=n(935),j=Object(v.b)((function(e){return{filters:e.housingFiles.filters,energyLabels:e.systemData.energyLabels,buildingTypes:e.systemData.buildingTypes}}),(function(e){return Object(y.b)({setFilterBuildingType:w,clearFilterHousingFiles:L,setFilterFullName:R,setFilterHousingFileAddress:H,setFilterHousingFileEnergyLabel:C,setHousingFileDateFilter:S},e)}))((function(e){return E.a.createElement("tr",{className:"thead-filter"},E.a.createElement(B.a,{value:e.filters.createdAt.data&&e.filters.createdAt.data,onChangeAction:function(t){void 0===t?e.setHousingFileDateFilter(""):e.setHousingFileDateFilter(G()(t).format("Y-MM-DD"))}}),E.a.createElement("th",null,E.a.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.address.data,onChange:function(t){e.setFilterHousingFileAddress(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}})),E.a.createElement("th",null,E.a.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.fullName.data,onChange:function(t){e.setFilterFullName(t.target.value)}})),E.a.createElement("th",null,E.a.createElement("select",{className:"form-control input-sm",value:e.filters.buildingTypeId.data,onChange:function(t){e.setFilterBuildingType(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}},E.a.createElement("option",null),e.buildingTypes.map((function(e){return E.a.createElement("option",{key:e.id,value:e.id},e.name)})))),E.a.createElement("th",null,E.a.createElement("select",{className:"form-control input-sm",value:e.filters.energyLabelId.data,onChange:function(t){e.setFilterHousingFileEnergyLabel(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}},E.a.createElement("option",null),e.energyLabels.map((function(e){return E.a.createElement("option",{key:e.id,value:e.id},e.name)})))),E.a.createElement("th",null))})),M=n(4);function x(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=p()(e);if(t){var a=p()(this).constructor;n=Reflect.construct(i,arguments,a)}else n=i.apply(this,arguments);return m()(this,n)}}var q=function(e){c()(n,e);var t=x(n);function n(e){var i;return a()(this,n),(i=t.call(this,e)).state={showActionButtons:!1,highlightRow:""},i}return l()(n,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){M.f.push("/woningdossier/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,i=t.fullName,a=t.createdAt,r=t.fullAddress,l=t.buildingType,o=t.energyLabel;return E.a.createElement("tr",{className:this.state.highlightRow,onDoubleClick:function(){return e.openItem(n)},onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},E.a.createElement("td",null,G()(a).format("DD-MM-Y")),E.a.createElement("td",null,r),E.a.createElement("td",null,i),E.a.createElement("td",null,l||""),E.a.createElement("td",null,o||""),E.a.createElement("td",null,this.state.showActionButtons?E.a.createElement("a",{role:"button",onClick:function(){return e.openItem(n)}},E.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):""))}}]),n}(F.Component),W=n(161);function Y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=p()(e);if(t){var a=p()(this).constructor;n=Reflect.construct(i,arguments,a)}else n=i.apply(this,arguments);return m()(this,n)}}var K=function(e){c()(n,e);var t=Y(n);function n(e){var i;return a()(this,n),i=t.call(this,e),d()(s()(i),"handleKeyUp",(function(e){13===e.keyCode&&i.props.onSubmitFilter()})),i}return l()(n,[{key:"render",value:function(){var e=this,t=this.props.housingFiles,n=t.data,i=void 0===n?[]:n,a=t.meta,r=void 0===a?{}:a,l="",o=!0;return this.props.hasError?l="Fout bij het ophalen van woningdossiers.":this.props.isLoading?l="Gegevens aan het laden.":0===i.length?l="Geen woningdossiers gevonden!":o=!1,E.a.createElement("form",{onKeyUp:this.handleKeyUp},E.a.createElement(D.a,null,E.a.createElement(k.a,null,E.a.createElement(O,{refreshHousingFilesData:function(){return e.props.refreshHousingFilesData()}}),E.a.createElement(j,{onSubmitFilter:this.props.onSubmitFilter})),E.a.createElement(A.a,null,o?E.a.createElement("tr",null,E.a.createElement("td",{colSpan:6},l)):i.map((function(e){return E.a.createElement(q,_()({key:e.id},e))})))),E.a.createElement("div",{className:"col-md-4 col-md-offset-4"},E.a.createElement(W.a,{onPageChangeAction:this.props.handlePageClick,totalRecords:r.total,initialPage:this.props.housingFilesPagination.page})))}}]),n}(F.Component),J=Object(v.b)((function(e){return{isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}))(K),z=n(51),Q=Object(v.b)((function(e){return{housingFiles:e.housingFiles.list}}),null)((function(e){var t=e.housingFiles.meta,n=void 0===t?{}:t;return E.a.createElement("div",{className:"row"},E.a.createElement("div",{className:"col-md-4"},E.a.createElement("div",{className:"btn-group",role:"group"},E.a.createElement(z.a,{iconName:"glyphicon-refresh",onClickAction:e.resetHousingFileFilters}))),E.a.createElement("div",{className:"col-md-4"},E.a.createElement("h3",{className:"text-center table-title"},"Woningdossiers")),E.a.createElement("div",{className:"col-md-4"},E.a.createElement("div",{className:"pull-right"},"Resultaten: ",n.total||0)))})),V=n(933),X=n(28),Z=n(31);function $(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=p()(e);if(t){var a=p()(this).constructor;n=Reflect.construct(i,arguments,a)}else n=i.apply(this,arguments);return m()(this,n)}}var ee=function(e){c()(n,e);var t=$(n);function n(e){var i;return a()(this,n),i=t.call(this,e),d()(s()(i),"fetchHousingFilesData",(function(){setTimeout((function(){var e=Object(V.a)(i.props.housingFilesFilters),t=i.props.housingFilesSorts,n={limit:20,offset:i.props.housingFilesPagination.offset};i.props.fetchHousingFiles(e,t,n)}),100)})),d()(s()(i),"resetHousingFileFilters",(function(){i.props.clearFilterHousingFiles(),i.fetchHousingFilesData()})),i.handlePageClick=i.handlePageClick.bind(s()(i)),i}return l()(n,[{key:"componentDidMount",value:function(){this.fetchHousingFilesData()}},{key:"componentWillUnmount",value:function(){this.props.clearHousingFiles()}},{key:"onSubmitFilter",value:function(){var e=this;Object(V.a)(this.props.housingFilesFilters),this.props.housingFilesSorts;this.props.setHousingFilesPagination({page:0,offset:0}),setTimeout((function(){e.fetchHousingFilesData()}),100)}},{key:"handlePageClick",value:function(e){var t=this,n=e.selected,i=Math.ceil(20*n);this.props.setHousingFilesPagination({page:n,offset:i}),setTimeout((function(){t.fetchHousingFilesData()}),100)}},{key:"render",value:function(){var e=this;return E.a.createElement(X.a,null,E.a.createElement(Z.a,null,E.a.createElement("div",{className:"col-md-12 margin-10-top"},E.a.createElement(Q,{resetHousingFileFilters:function(){return e.resetHousingFileFilters()}})),E.a.createElement("div",{className:"col-md-12 margin-10-top"},E.a.createElement(J,{housingFiles:this.props.housingFiles,housingFilesPagination:this.props.housingFilesPagination,onSubmitFilter:function(){return e.onSubmitFilter()},refreshHousingFilesData:function(){return e.fetchHousingFilesData()},handlePageClick:this.handlePageClick}))))}}]),n}(F.Component);t.default=Object(v.b)((function(e){return{housingFiles:e.housingFiles.list,housingFilesFilters:e.housingFiles.filters,housingFilesSorts:e.housingFiles.sorts,housingFilesPagination:e.housingFiles.pagination}}),(function(e){return Object(y.b)({fetchHousingFiles:b,clearHousingFiles:N,setHousingFilesPagination:T,clearFilterHousingFiles:L},e)}))(ee)},931:function(e,t,n){"use strict";var i=n(0),a=n.n(i),r=n(3),l=n.n(r),o=function(e){var t=e.RowClassName,n=e.setSorts,i=e.sortColumn,r=e.title,l=e.width;return a.a.createElement("th",{className:t,width:l},r,a.a.createElement("span",{className:"glyphicon glyphicon-arrow-down pull-right small",role:"button",onClick:n.bind(void 0,i,"ASC")}),a.a.createElement("span",{className:"glyphicon glyphicon-arrow-up pull-right small",role:"button",onClick:n.bind(void 0,i,"DESC")}))};o.defaultProps={RowClassName:""},o.propTypes={setSorts:l.a.func.isRequired,sortColumn:l.a.string.isRequired,title:l.a.string.isRequired,width:l.a.string.isRequired,RowClassName:l.a.string},t.a=o},933:function(e,t,n){"use strict";t.a=function(e){var t=[];for(var n in e)""!==e[n].data&&t.push(e[n]);return t}},935:function(e,t,n){"use strict";var i=n(0),a=n.n(i),r=n(3),l=n.n(r),o=n(288),s=n.n(o),u=n(162),c=n.n(u),f=n(7),m=n.n(f);m.a.locale("nl");var h=function(e){var t=e.className,n=e.value,i=e.onChangeAction,r=e.placeholder,l=n?m()(n).format("L"):"";return a.a.createElement("th",{className:"DayPicker-overflow ".concat(t)},a.a.createElement(s.a,{value:l,onDayChange:i,formatDate:u.formatDate,parseDate:u.parseDate,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:c.a},inputProps:{className:"form-control input-sm",placeholder:r},placeholder:""}))};h.defaultProps={className:"",value:null,placeholder:""},h.propTypes={className:l.a.string,value:l.a.oneOfType([l.a.string,l.a.object]),onChangeAction:l.a.func,placeholder:l.a.string},t.a=h}}]);