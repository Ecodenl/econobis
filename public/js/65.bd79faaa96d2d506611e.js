(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{1595:function(e,t,n){"use strict";n.r(t);var a=n(14),i=n.n(a),r=n(15),l=n.n(r),o=n(9),s=n.n(o),u=n(16),c=n.n(u),f=n(17),m=n.n(f),p=n(12),h=n.n(p),g=n(5),d=n.n(g),E=n(0),F=n.n(E),y=n(19),v=n(24),b=function(e,t,n){return{type:"FETCH_HOUSING_FILES",filters:e,sorts:t,pagination:n}},S=function(){return{type:"CLEAR_HOUSING_FILES"}},C=function(e){return{type:"SET_FILTER_HOUSING_FILE_DATE",createdAt:e}},N=function(e){return{type:"SET_FILTER_HOUSING_FILE_ADDRESS",address:e}},T=function(e){return{type:"SET_FILTER_HOUSING_FILE_FULL_NAME",fullName:e}},R=function(e){return{type:"SET_FILTER_POSTAL_CODE",postalCode:e}},H=function(e){return{type:"SET_FILTER_CITY",city:e}},w=function(e){return{type:"SET_FILTER_HOUSING_FILE_BUILDING_TYPE",buildingTypeId:e}},L=function(e){return{type:"SET_FILTER_HOUSING_FILE_ENERGY_LABEL",energyLabelId:e}},_=function(){return{type:"CLEAR_FILTER_HOUSING_FILES"}},I=function(e){return{type:"SET_HOUSING_FILES_PAGINATION",pagination:e}},D=n(143),k=n.n(D),P=n(223),A=n(224),O=n(285),U=n(933),G=Object(y.b)(null,(function(e){return{setHousingFilesSortsFilter:function(t,n){e(function(e,t){return{type:"SET_HOUSING_FILES_SORTS_FILTER",field:e,order:t}}(t,n))}}}))((function(e){var t=function(t,n){e.setHousingFilesSortsFilter(t,n),setTimeout((function(){e.refreshHousingFilesData()}),100)};return F.a.createElement("tr",{className:"thead-title"},F.a.createElement(U.a,{sortColumn:"createdAt",title:"Datum",width:"20%",setSorts:t}),F.a.createElement(U.a,{sortColumn:"address",title:"Adres",width:"20%",setSorts:t}),F.a.createElement(U.a,{sortColumn:"postalCode",title:"Postcode",width:"10%",setSorts:t}),F.a.createElement(U.a,{sortColumn:"city",title:"Woonplaats",width:"10%",setSorts:t}),F.a.createElement(U.a,{sortColumn:"fullName",title:"Contact",width:"10%",setSorts:t}),F.a.createElement(U.a,{sortColumn:"buildingType",title:"Type woning",width:"20%",setSorts:t}),F.a.createElement(U.a,{sortColumn:"energyLabel",title:"Energielabel",width:"5%",setSorts:t}),F.a.createElement("th",{width:"5%"}))})),B=n(7),j=n.n(B),M=n(939),x=Object(y.b)((function(e){return{filters:e.housingFiles.filters,energyLabels:e.systemData.energyLabels,buildingTypes:e.systemData.buildingTypes}}),(function(e){return Object(v.b)({setFilterBuildingType:w,clearFilterHousingFiles:_,setFilterFullName:T,setFilterPostalCode:R,setFilterCity:H,setFilterHousingFileAddress:N,setFilterHousingFileEnergyLabel:L,setHousingFileDateFilter:C},e)}))((function(e){return F.a.createElement("tr",{className:"thead-filter"},F.a.createElement(M.a,{value:e.filters.createdAt.data&&e.filters.createdAt.data,onChangeAction:function(t){void 0===t?e.setHousingFileDateFilter(""):e.setHousingFileDateFilter(j()(t).format("Y-MM-DD"))}}),F.a.createElement("th",null,F.a.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.address.data,onChange:function(t){e.setFilterHousingFileAddress(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}})),F.a.createElement("th",null,F.a.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.postalCode.data,onChange:function(t){e.setFilterPostalCode(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}})),F.a.createElement("th",null,F.a.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.city.data,onChange:function(t){e.setFilterCity(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}})),F.a.createElement("th",null,F.a.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.fullName.data,onChange:function(t){e.setFilterFullName(t.target.value)}})),F.a.createElement("th",null,F.a.createElement("select",{className:"form-control input-sm",value:e.filters.buildingTypeId.data,onChange:function(t){e.setFilterBuildingType(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}},F.a.createElement("option",null),e.buildingTypes.map((function(e){return F.a.createElement("option",{key:e.id,value:e.id},e.name)})))),F.a.createElement("th",null,F.a.createElement("select",{className:"form-control input-sm",value:e.filters.energyLabelId.data,onChange:function(t){e.setFilterHousingFileEnergyLabel(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}},F.a.createElement("option",null),e.energyLabels.map((function(e){return F.a.createElement("option",{key:e.id,value:e.id},e.name)})))),F.a.createElement("th",null))})),W=n(4);function Y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=h()(e);if(t){var i=h()(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return m()(this,n)}}var q=function(e){c()(n,e);var t=Y(n);function n(e){var a;return i()(this,n),(a=t.call(this,e)).state={showActionButtons:!1,highlightRow:""},a}return l()(n,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){W.f.push("/woningdossier/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,a=t.fullName,i=t.createdAt,r=t.fullAddress,l=t.postalCode,o=t.city,s=t.buildingType,u=t.energyLabel;return F.a.createElement("tr",{className:this.state.highlightRow,onDoubleClick:function(){return e.openItem(n)},onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},F.a.createElement("td",null,j()(i).format("DD-MM-Y")),F.a.createElement("td",null,r),F.a.createElement("td",null,l),F.a.createElement("td",null,o),F.a.createElement("td",null,a),F.a.createElement("td",null,s||""),F.a.createElement("td",null,u||""),F.a.createElement("td",null,this.state.showActionButtons?F.a.createElement("a",{role:"button",onClick:function(){return e.openItem(n)}},F.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):""))}}]),n}(E.Component),K=n(164);function J(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=h()(e);if(t){var i=h()(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return m()(this,n)}}var z=function(e){c()(n,e);var t=J(n);function n(e){var a;return i()(this,n),a=t.call(this,e),d()(s()(a),"handleKeyUp",(function(e){13===e.keyCode&&a.props.onSubmitFilter()})),a}return l()(n,[{key:"render",value:function(){var e=this,t=this.props.housingFiles,n=t.data,a=void 0===n?[]:n,i=t.meta,r=void 0===i?{}:i,l="",o=!0;return this.props.hasError?l="Fout bij het ophalen van woningdossiers.":this.props.isLoading?l="Gegevens aan het laden.":0===a.length?l="Geen woningdossiers gevonden!":o=!1,F.a.createElement("form",{onKeyUp:this.handleKeyUp},F.a.createElement(P.a,null,F.a.createElement(A.a,null,F.a.createElement(G,{refreshHousingFilesData:function(){return e.props.refreshHousingFilesData()}}),F.a.createElement(x,{onSubmitFilter:this.props.onSubmitFilter})),F.a.createElement(O.a,null,o?F.a.createElement("tr",null,F.a.createElement("td",{colSpan:6},l)):a.map((function(e){return F.a.createElement(q,k()({key:e.id},e))})))),F.a.createElement("div",{className:"col-md-4 col-md-offset-4"},F.a.createElement(K.a,{onPageChangeAction:this.props.handlePageClick,totalRecords:r.total,initialPage:this.props.housingFilesPagination.page})))}}]),n}(E.Component),Q=Object(y.b)((function(e){return{isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}))(z),V=n(50),X=Object(y.b)((function(e){return{housingFiles:e.housingFiles.list}}),null)((function(e){var t=e.housingFiles.meta,n=void 0===t?{}:t;return F.a.createElement("div",{className:"row"},F.a.createElement("div",{className:"col-md-4"},F.a.createElement("div",{className:"btn-group",role:"group"},F.a.createElement(V.a,{iconName:"glyphicon-refresh",onClickAction:e.resetHousingFileFilters}))),F.a.createElement("div",{className:"col-md-4"},F.a.createElement("h3",{className:"text-center table-title"},"Woningdossiers")),F.a.createElement("div",{className:"col-md-4"},F.a.createElement("div",{className:"pull-right"},"Resultaten: ",n.total||0)))})),Z=n(935),$=n(27),ee=n(30);function te(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=h()(e);if(t){var i=h()(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return m()(this,n)}}var ne=function(e){c()(n,e);var t=te(n);function n(e){var a;return i()(this,n),a=t.call(this,e),d()(s()(a),"fetchHousingFilesData",(function(){setTimeout((function(){var e=Object(Z.a)(a.props.housingFilesFilters),t=a.props.housingFilesSorts,n={limit:20,offset:a.props.housingFilesPagination.offset};a.props.fetchHousingFiles(e,t,n)}),100)})),d()(s()(a),"resetHousingFileFilters",(function(){a.props.clearFilterHousingFiles(),a.fetchHousingFilesData()})),a.handlePageClick=a.handlePageClick.bind(s()(a)),a}return l()(n,[{key:"componentDidMount",value:function(){this.fetchHousingFilesData()}},{key:"componentWillUnmount",value:function(){this.props.clearHousingFiles()}},{key:"onSubmitFilter",value:function(){var e=this;Object(Z.a)(this.props.housingFilesFilters),this.props.housingFilesSorts;this.props.setHousingFilesPagination({page:0,offset:0}),setTimeout((function(){e.fetchHousingFilesData()}),100)}},{key:"handlePageClick",value:function(e){var t=this,n=e.selected,a=Math.ceil(20*n);this.props.setHousingFilesPagination({page:n,offset:a}),setTimeout((function(){t.fetchHousingFilesData()}),100)}},{key:"render",value:function(){var e=this;return F.a.createElement($.a,null,F.a.createElement(ee.a,null,F.a.createElement("div",{className:"col-md-12 margin-10-top"},F.a.createElement(X,{resetHousingFileFilters:function(){return e.resetHousingFileFilters()}})),F.a.createElement("div",{className:"col-md-12 margin-10-top"},F.a.createElement(Q,{housingFiles:this.props.housingFiles,housingFilesPagination:this.props.housingFilesPagination,onSubmitFilter:function(){return e.onSubmitFilter()},refreshHousingFilesData:function(){return e.fetchHousingFilesData()},handlePageClick:this.handlePageClick}))))}}]),n}(E.Component);t.default=Object(y.b)((function(e){return{housingFiles:e.housingFiles.list,housingFilesFilters:e.housingFiles.filters,housingFilesSorts:e.housingFiles.sorts,housingFilesPagination:e.housingFiles.pagination}}),(function(e){return Object(v.b)({fetchHousingFiles:b,clearHousingFiles:S,setHousingFilesPagination:I,clearFilterHousingFiles:_},e)}))(ne)},933:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(3),l=n.n(r),o=function(e){var t=e.RowClassName,n=e.setSorts,a=e.sortColumn,r=e.title,l=e.width;return i.a.createElement("th",{className:t,width:l},r,i.a.createElement("span",{className:"glyphicon glyphicon-arrow-down pull-right small",role:"button",onClick:n.bind(void 0,a,"ASC")}),i.a.createElement("span",{className:"glyphicon glyphicon-arrow-up pull-right small",role:"button",onClick:n.bind(void 0,a,"DESC")}))};o.defaultProps={RowClassName:""},o.propTypes={setSorts:l.a.func.isRequired,sortColumn:l.a.string.isRequired,title:l.a.string.isRequired,width:l.a.string.isRequired,RowClassName:l.a.string},t.a=o},935:function(e,t,n){"use strict";t.a=function(e){var t=[];for(var n in e)""!==e[n].data&&t.push(e[n]);return t}},939:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(3),l=n.n(r),o=n(290),s=n.n(o),u=n(165),c=n.n(u),f=n(7),m=n.n(f);m.a.locale("nl");var p=function(e){var t=e.className,n=e.value,a=e.onChangeAction,r=e.placeholder,l=n?m()(n).format("L"):"";return i.a.createElement("th",{className:"DayPicker-overflow ".concat(t)},i.a.createElement(s.a,{value:l,onDayChange:a,formatDate:u.formatDate,parseDate:u.parseDate,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:c.a},inputProps:{className:"form-control input-sm",placeholder:r},placeholder:""}))};p.defaultProps={className:"",value:null,placeholder:""},p.propTypes={className:l.a.string,value:l.a.oneOfType([l.a.string,l.a.object]),onChangeAction:l.a.func,placeholder:l.a.string},t.a=p}}]);