"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[3931],{38404:(t,e,n)=>{n.d(e,{Z:()=>m});var a=n(67294),o=n(45697),r=n.n(o),s=n(86733),i=n(30071),l=n(30381),u=n.n(l);u().locale("nl");var c=function(t){var e=t.className,n=t.value,o=t.onChangeAction,r=t.placeholder,l=n?u()(n).format("L"):"";return a.createElement("th",{className:"DayPicker-overflow ".concat(e)},a.createElement(s.default,{value:l,onDayChange:o,formatDate:i.formatDate,parseDate:i.parseDate,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:i.default},inputProps:{className:"form-control input-sm",placeholder:r},placeholder:""}))};c.defaultProps={className:"",value:null,placeholder:""},c.propTypes={className:r().string,value:r().oneOfType([r().string,r().object]),onChangeAction:r().func,placeholder:r().string};const m=c},5007:(t,e,n)=>{n.d(e,{Z:()=>p});var a,o=n(30168),r=n(67294),s=n(45697),i=n.n(s),l=n(86733),u=n(30071),c=n(30381),m=n.n(c),d=n(80395);m().locale("nl");var f=function(t){var e=t.className,n=t.startDate,a=t.endDate,o=t.onChangeActionStart,s=t.onChangeActionEnd,i=(t.placeholder,n?m()(n).format("L"):""),c=a?m()(a).format("L"):"";return r.createElement("th",{className:"DayPicker-overflow ".concat(e)},r.createElement(h,null,r.createElement(l.default,{value:i,onDayChange:o,formatDate:u.formatDate,parseDate:u.parseDate,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:u.default},inputProps:{className:"form-control input-sm",placeholder:"Van"},placeholder:"Van"})," ","-"," ",r.createElement("span",{className:"InputFromTo-to"},r.createElement(l.default,{value:c,onDayChange:s,formatDate:u.formatDate,parseDate:u.parseDate,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:u.default},inputProps:{className:"form-control input-sm",placeholder:"tot"},placeholder:"tot"}))))};f.defaultProps={className:"",startDate:null,endDate:null,placeholder:""},f.propTypes={className:i().string,startDate:i().oneOfType([i().string,i().object]),endDate:i().oneOfType([i().string,i().object]),onChangeAction:i().func,placeholder:i().string};const p=f;var h=d.Z.div(a||(a=(0,o.Z)(["\n    display: flex;\n    //\n    //     // & .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {\n    //     //     background-color: #f0f8ff !important;\n    //     //     color: #4a90e2;\n    //     // }\n    //\n    //     & .DayPicker-Day {\n    //         border-radius: 0 !important;\n    //     }\n    //     & .DayPicker-Day--start {\n    //         border-top-left-radius: 50% !important;\n    //         border-bottom-left-radius: 50% !important;\n    //     }\n    //     & .DayPicker-Day--end {\n    //         border-top-right-radius: 50% !important;\n    //         border-bottom-right-radius: 50% !important;\n    //     }\n    //     // & .DayPickerInput-Overlay {\n    //     //     width: 200px;\n    //     // }\n    //     // .InputFromTo-to .DayPickerInput-Overlay {\n    //     //     margin-left: -198px;\n    //     // }\n"])))},69025:(t,e,n)=>{n.d(e,{Z:()=>m});var a=n(67294),o=n(45697),r=n.n(o),s=n(97894),i=n(75987),l=n(75495),u=void 0,c=function(t){var e=t.RowClassName,n=t.setSorts,o=t.sortColumn,r=t.title,c=t.width;return a.createElement("th",{className:e,width:c},r,a.createElement(s.ZP,{className:"pull-right small",size:14,icon:l.D,role:"button",onClick:n.bind(u,o,"ASC")}),a.createElement(s.ZP,{className:"pull-right small",size:14,icon:i.z,role:"button",onClick:n.bind(u,o,"DESC")}))};c.defaultProps={RowClassName:""},c.propTypes={setSorts:r().func.isRequired,sortColumn:r().string.isRequired,title:r().string.isRequired,width:r().string.isRequired,RowClassName:r().string};const m=c},33931:(t,e,n)=>{n.r(e),n.d(e,{default:()=>nt});var a=n(15671),o=n(43144),r=n(97326),s=n(60136),i=n(82963),l=n(61120),u=n(4942),c=n(67294),m=n(37974),d=n(83920),f=function(t,e,n){return{type:"FETCH_QUOTATION_REQUESTS",filters:t,sorts:e,pagination:n}},p=function(){return{type:"CLEAR_QUOTATION_REQUESTS"}},h=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_ORGANISATION_OR_COACH",organisationOrCoach:t}},E=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_CONTACT",contact:t}},R=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_ADDRESS",address:t}},q=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_CAMPAIGN",campaign:t}},g=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_MEASURE",measure:t}},v=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_CREATED_AT_START",createdAtStart:t}},D=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_CREATED_AT_END",createdAtEnd:t}},T=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_DATE_PLANNED",datePlanned:t}},y=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_DATE_RECORDED",dateRecorded:t}},S=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_STATUS",statusId:t}},C=function(t){return{type:"SET_FILTER_QUOTATION_REQUEST_DATE_RELEASED",dateReleased:t}},Q=function(){return{type:"CLEAR_FILTER_QUOTATION_REQUESTS"}},A=function(t){return{type:"SET_QUOTATION_REQUESTS_PAGINATION",pagination:t}},N=n(87462),_=n(96498),k=n(75286),F=n(24480),Z=n(69025);const O=(0,m.$j)(null,(function(t){return{setQuotationRequestsSortsFilter:function(e,n){t(function(t,e){return{type:"SET_QUOTATION_REQUESTS_SORTS_FILTER",field:t,order:e}}(e,n))}}}))((function(t){var e=function(e,n){t.setQuotationRequestsSortsFilter(e,n),setTimeout((function(){t.refreshQuotationRequestsData()}),100)};return c.createElement("tr",{className:"thead-title"},c.createElement(Z.Z,{sortColumn:"organisationOrCoach",title:"Organisatie/Coach",width:"10%",setSorts:e}),c.createElement(Z.Z,{sortColumn:"contact",title:"Contact",width:"10%",setSorts:e}),c.createElement(Z.Z,{sortColumn:"address",title:"Adres",width:"15%",setSorts:e}),c.createElement(Z.Z,{sortColumn:"measure",title:"Maatregel",width:"10%",setSorts:e}),c.createElement(Z.Z,{sortColumn:"createdAt",title:"Datum",width:"8%",setSorts:e}),c.createElement(Z.Z,{sortColumn:"datePlanned",title:"Afspraak",width:"8%",setSorts:e}),c.createElement(Z.Z,{sortColumn:"dateRecorded",title:"Opname",width:"8%",setSorts:e}),c.createElement(Z.Z,{sortColumn:"statusId",title:"Status kansactie",width:"8%",setSorts:e}),c.createElement(Z.Z,{sortColumn:"dateReleased",title:"Uitgebracht",width:"8%",setSorts:e}),c.createElement(Z.Z,{sortColumn:"campaign",title:"Campagne",width:"10%",setSorts:e}),c.createElement("th",{width:"5%"}))}));var P=n(30381),I=n.n(P),U=(n(20794),n(5007)),b=n(38404);const w=(0,m.$j)((function(t){return{filters:t.quotationRequests.filters,quotationRequestStatus:t.systemData.quotationRequestStatus}}),(function(t){return(0,d.DE)({setFilterQuotationRequestStatus:S,clearFilterQuotationRequests:Q,setQuotationRequestAddressFilter:R,setQuotationRequestCampaignFilter:q,setQuotationRequestContactFilter:E,setQuotationRequestCreatedAtStartFilter:v,setQuotationRequestCreatedAtEndFilter:D,setQuotationRequestDatePlannedFilter:T,setQuotationRequestDateRecordedFilter:y,setQuotationRequestDateReleasedFilter:C,setQuotationRequestMeasureFilter:g,setQuotationRequestOrganisationOrCoachFilter:h},t)}))((function(t){return c.createElement("tr",{className:"thead-filter"},c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:t.filters.organisationOrCoach.data,onChange:function(e){t.setQuotationRequestOrganisationOrCoachFilter(e.target.value)}})),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:t.filters.contact.data,onChange:function(e){t.setQuotationRequestContactFilter(e.target.value)}})),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:t.filters.address.data,onChange:function(e){t.setQuotationRequestAddressFilter(e.target.value)}})),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:t.filters.measure.data,onChange:function(e){t.setQuotationRequestMeasureFilter(e.target.value)}})),c.createElement(U.Z,{startDate:t.filters.createdAtStart.data&&t.filters.createdAtStart.data,endDate:t.filters.createdAtEnd.data&&t.filters.createdAtEnd.data,onChangeActionStart:function(e){void 0===e?t.setQuotationRequestCreatedAtStartFilter(""):t.setQuotationRequestCreatedAtStartFilter(I()(e).format("Y-MM-DD"))},onChangeActionEnd:function(e){void 0===e?t.setQuotationRequestCreatedAtEndFilter(""):t.setQuotationRequestCreatedAtEndFilter(I()(e).format("Y-MM-DD"))}}),c.createElement(b.Z,{value:t.filters.datePlanned.data&&t.filters.datePlanned.data,onChangeAction:function(e){void 0===e?t.setQuotationRequestDatePlannedFilter(""):t.setQuotationRequestDatePlannedFilter(I()(e).format("Y-MM-DD"))}}),c.createElement(b.Z,{value:t.filters.dateRecorded.data&&t.filters.dateRecorded.data,onChangeAction:function(e){void 0===e?t.setQuotationRequestDateRecordedFilter(""):t.setQuotationRequestDateRecordedFilter(I()(e).format("Y-MM-DD"))}}),c.createElement("th",null,c.createElement("select",{className:"form-control input-sm",value:t.filters.statusId.data,onChange:function(e){t.setFilterQuotationRequestStatus(e.target.value),setTimeout((function(){t.onSubmitFilter()}),100)}},c.createElement("option",null),t.quotationRequestStatus.map((function(t){return c.createElement("option",{key:t.id,value:t.id},t.opportunityActionName," - ",t.name)})))),c.createElement(b.Z,{value:t.filters.dateReleased.data&&t.filters.dateReleased.data,onChangeAction:function(e){void 0===e?t.setQuotationRequestDateReleasedFilter(""):t.setQuotationRequestDateReleasedFilter(I()(e).format("Y-MM-DD"))}}),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:t.filters.campaign.data,onChange:function(e){t.setQuotationRequestCampaignFilter(e.target.value)}})),c.createElement("th",null))}));var M=n(61409),L=n(97894),Y=n(75502);const x=function(t){(0,s.Z)(u,t);var e,n,r=(e=u,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,a=(0,l.Z)(e);if(n){var o=(0,l.Z)(this).constructor;t=Reflect.construct(a,arguments,o)}else t=a.apply(this,arguments);return(0,i.Z)(this,t)});function u(t){var e;return(0,a.Z)(this,u),(e=r.call(this,t)).state={showActionButtons:!1,highlightRow:""},e}return(0,o.Z)(u,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(t){M.nA.push("/offerteverzoek/".concat(t))}},{key:"render",value:function(){var t=this,e=this.props,n=e.id,a=e.organisationOrCoach,o=e.opportunity,r=e.createdAt,s=e.dateRecorded,i=e.status,l=e.datePlanned,u=e.dateReleased;return c.createElement("tr",{className:this.state.highlightRow,onDoubleClick:function(){return t.openItem(n)},onMouseEnter:function(){return t.onRowEnter()},onMouseLeave:function(){return t.onRowLeave()}},c.createElement("td",null,a&&a.fullName),c.createElement("td",null,o&&o.intake.contact.fullName),c.createElement("td",null,o&&o.intake.fullAddress),c.createElement("td",null,o&&o.measureCategory.name),c.createElement("td",null,I()(r).format("DD-MM-Y")),c.createElement("td",null,l&&I()(l).format("DD-MM-Y HH:mm")),c.createElement("td",null,s&&I()(s).format("DD-MM-Y HH:mm")),c.createElement("td",null,i?i.name:"Onbekend"),c.createElement("td",null,u&&I()(u).format("DD-MM-Y HH:mm")),c.createElement("td",null,o&&o.intake.campaign.name),c.createElement("td",null,this.state.showActionButtons?c.createElement("a",{role:"button",onClick:function(){return t.openItem(n)}},c.createElement(L.ZP,{className:"mybtn-success",size:14,icon:Y.r})):""))}}]),u}(c.Component);var B=n(51910);var H=function(t){(0,s.Z)(d,t);var e,n,m=(e=d,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,a=(0,l.Z)(e);if(n){var o=(0,l.Z)(this).constructor;t=Reflect.construct(a,arguments,o)}else t=a.apply(this,arguments);return(0,i.Z)(this,t)});function d(t){var e;return(0,a.Z)(this,d),e=m.call(this,t),(0,u.Z)((0,r.Z)(e),"handleKeyUp",(function(t){13===t.keyCode&&e.props.onSubmitFilter()})),e}return(0,o.Z)(d,[{key:"render",value:function(){var t=this,e=this.props.quotationRequests,n=e.data,a=void 0===n?[]:n,o=e.meta,r=void 0===o?{}:o,s="",i=!0;return this.props.hasError?s="Fout bij het ophalen van kansacties.":this.props.isLoading?s="Gegevens aan het laden.":0===a.length?s="Geen kansacties gevonden!":i=!1,c.createElement("form",{onKeyUp:this.handleKeyUp},c.createElement(_.Z,null,c.createElement(k.Z,null,c.createElement(O,{refreshQuotationRequestsData:function(){return t.props.refreshQuotationRequestsData()}}),c.createElement(w,{onSubmitFilter:this.props.onSubmitFilter})),c.createElement(F.Z,null,i?c.createElement("tr",null,c.createElement("td",{colSpan:11},s)):a.map((function(t){return c.createElement(x,(0,N.Z)({key:t.id},t))})))),c.createElement("div",{className:"col-md-4 col-md-offset-4"},c.createElement(B.Z,{onPageChangeAction:this.props.handlePageClick,totalRecords:r.total,initialPage:this.props.quotationRequestsPagination.page})))}}]),d}(c.Component);const j=(0,m.$j)((function(t){return{isLoading:t.loadingData.isLoading,hasError:t.loadingData.hasError}}))(H);var V=n(55451);const W=(0,m.$j)((function(t){return{quotationRequests:t.quotationRequests.list}}),null)((function(t){var e=t.quotationRequests.meta,n=void 0===e?{}:e;return c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-4"},c.createElement("div",{className:"btn-group",role:"group"},c.createElement(V.Z,{iconName:"refresh",onClickAction:t.resetQuotationRequestFilters}),c.createElement(V.Z,{iconName:"download",onClickAction:t.getCSV}))),c.createElement("div",{className:"col-md-4"},c.createElement("h3",{className:"text-center table-title"},"Kansacties")),c.createElement("div",{className:"col-md-4"},c.createElement("div",{className:"pull-right"},"Resultaten: ",n.total||0)))}));var z=n(4257),G=n(14309),$=n(98688),K=n(35823),J=n.n(K),X=n(96536),tt=n(72506);var et=function(t){(0,s.Z)(d,t);var e,n,m=(e=d,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,a=(0,l.Z)(e);if(n){var o=(0,l.Z)(this).constructor;t=Reflect.construct(a,arguments,o)}else t=a.apply(this,arguments);return(0,i.Z)(this,t)});function d(t){var e;return(0,a.Z)(this,d),e=m.call(this,t),(0,u.Z)((0,r.Z)(e),"getCSV",(function(){e.props.blockUI(),setTimeout((function(){var t=(0,z.Z)(e.props.quotationRequestsFilters),n=e.props.quotationRequestsSorts;X.Z.getCSV({filters:t,sorts:n}).then((function(t){J()(t.data,"kansacties-"+I()().format("YYYY-MM-DD HH:mm:ss")+".csv"),e.props.unblockUI()})).catch((function(t){e.props.unblockUI()}))}),100)})),(0,u.Z)((0,r.Z)(e),"fetchQuotationRequestsData",(function(){setTimeout((function(){var t=(0,z.Z)(e.props.quotationRequestsFilters),n=e.props.quotationRequestsSorts,a={limit:20,offset:e.props.quotationRequestsPagination.offset};e.props.fetchQuotationRequests(t,n,a)}),100)})),(0,u.Z)((0,r.Z)(e),"resetQuotationRequestFilters",(function(){e.props.clearFilterQuotationRequests(),e.fetchQuotationRequestsData()})),e.handlePageClick=e.handlePageClick.bind((0,r.Z)(e)),e.getCSV=e.getCSV.bind((0,r.Z)(e)),e}return(0,o.Z)(d,[{key:"componentDidMount",value:function(){this.fetchQuotationRequestsData()}},{key:"componentWillUnmount",value:function(){this.props.clearQuotationRequests()}},{key:"onSubmitFilter",value:function(){var t=this;(0,z.Z)(this.props.quotationRequestsFilters),this.props.quotationRequestsSorts,this.props.setQuotationRequestsPagination({page:0,offset:0}),setTimeout((function(){t.fetchQuotationRequestsData()}),100)}},{key:"handlePageClick",value:function(t){var e=this,n=t.selected,a=Math.ceil(20*n);this.props.setQuotationRequestsPagination({page:n,offset:a}),setTimeout((function(){e.fetchQuotationRequestsData()}),100)}},{key:"render",value:function(){var t=this;return c.createElement(G.Z,null,c.createElement($.Z,null,c.createElement("div",{className:"col-md-12 margin-10-top"},c.createElement(W,{resetQuotationRequestFilters:function(){return t.resetQuotationRequestFilters()},getCSV:this.getCSV})),c.createElement("div",{className:"col-md-12 margin-10-top"},c.createElement(j,{quotationRequests:this.props.quotationRequests,quotationRequestsPagination:this.props.quotationRequestsPagination,onSubmitFilter:function(){return t.onSubmitFilter()},refreshQuotationRequestsData:function(){return t.fetchQuotationRequestsData()},handlePageClick:this.handlePageClick}))))}}]),d}(c.Component);const nt=(0,m.$j)((function(t){return{quotationRequests:t.quotationRequests.list,quotationRequestsFilters:t.quotationRequests.filters,quotationRequestsSorts:t.quotationRequests.sorts,quotationRequestsPagination:t.quotationRequests.pagination}}),(function(t){return(0,d.DE)({fetchQuotationRequests:f,clearQuotationRequests:p,setQuotationRequestsPagination:A,clearFilterQuotationRequests:Q,blockUI:tt.Q,unblockUI:tt.e},t)}))(et)},4257:(t,e,n)=>{n.d(e,{Z:()=>a});const a=function(t){var e=[];for(var n in t)""!==t[n].data&&e.push(t[n]);return e}}}]);