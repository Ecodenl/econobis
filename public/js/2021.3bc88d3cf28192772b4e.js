"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[2021],{60628:(e,t,n)=>{n.d(t,{G:()=>a});var a=function(e){return{type:"SET_BULK_EMAIL_TO_CONTACT_IDS",ids:e}}},78746:(e,t,n)=>{n.d(t,{A:()=>d});var a,r=n(57528),o=n(96540),s=n(5556),l=n.n(s),i=n(91385),c=n(4353),u=n(95093),m=n.n(u),p=n(17639);m().locale("nl");var h=function(e){var t=e.className,n=e.startDate,a=e.endDate,r=e.onChangeActionStart,s=e.onChangeActionEnd,l=(e.placeholder,n?m()(n).format("L"):""),u=a?m()(a).format("L"):"";return o.createElement("th",{className:"DayPicker-overflow ".concat(t)},o.createElement(f,null,o.createElement(i.default,{value:l,onDayChange:r,formatDate:c.formatDate,parseDate:c.parseDate,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:c.default},inputProps:{className:"form-control input-sm",placeholder:"Van"},placeholder:"Van"})," ","-"," ",o.createElement("span",{className:"InputFromTo-to"},o.createElement(i.default,{value:u,onDayChange:s,formatDate:c.formatDate,parseDate:c.parseDate,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:c.default},inputProps:{className:"form-control input-sm",placeholder:"tot"},placeholder:"tot"}))))};h.defaultProps={className:"",startDate:null,endDate:null,placeholder:""},h.propTypes={className:l().string,startDate:l().oneOfType([l().string,l().object]),endDate:l().oneOfType([l().string,l().object]),onChangeAction:l().func,placeholder:l().string};const d=h;var f=p.A.div(a||(a=(0,r.A)(["\n    display: flex;\n    //\n    //     // & .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {\n    //     //     background-color: #f0f8ff !important;\n    //     //     color: #4a90e2;\n    //     // }\n    //\n    //     & .DayPicker-Day {\n    //         border-radius: 0 !important;\n    //     }\n    //     & .DayPicker-Day--start {\n    //         border-top-left-radius: 50% !important;\n    //         border-bottom-left-radius: 50% !important;\n    //     }\n    //     & .DayPicker-Day--end {\n    //         border-top-right-radius: 50% !important;\n    //         border-bottom-right-radius: 50% !important;\n    //     }\n    //     // & .DayPickerInput-Overlay {\n    //     //     width: 200px;\n    //     // }\n    //     // .InputFromTo-to .DayPickerInput-Overlay {\n    //     //     margin-left: -198px;\n    //     // }\n"])))},9152:(e,t,n)=>{n.d(t,{A:()=>m});var a=n(96540),r=n(5556),o=n.n(r),s=n(87722),l=n(71866),i=n(34527),c=void 0,u=function(e){var t=e.RowClassName,n=e.setSorts,r=e.sortColumn,o=e.title,u=e.width;return a.createElement("th",{className:t,width:u},o,a.createElement(s.Ay,{className:"pull-right small",size:14,icon:i.m,role:"button",onClick:n.bind(c,r,"ASC")}),a.createElement(s.Ay,{className:"pull-right small",size:14,icon:l.b,role:"button",onClick:n.bind(c,r,"DESC")}))};u.defaultProps={RowClassName:""},u.propTypes={setSorts:o().func.isRequired,sortColumn:o().string.isRequired,title:o().string.isRequired,width:o().string.isRequired,RowClassName:o().string};const m=u},92021:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ue});var a=n(23029),r=n(92901),o=n(56822),s=n(53954),l=n(85501),i=n(64467),c=n(96540),u=n(69733),m=n(17375),p=function(e,t,n){return{type:"FETCH_INTAKES",filters:e,sorts:t,pagination:n}},h=function(e){return{type:"SET_CHECKED_INTAKE_ALL",checkedValue:e}},d=function(){return{type:"CLEAR_INTAKES"}},f=function(e){return{type:"SET_FILTER_INTAKE_DATE_START",createdAtStart:e}},k=function(e){return{type:"SET_FILTER_INTAKE_DATE_END",createdAtEnd:e}},E=function(e){return{type:"SET_FILTER_INTAKE_FULL_NAME",fullName:e}},A=function(e){return{type:"SET_FILTER_INTAKE_ADDRESS",address:e}},g=function(e){return{type:"SET_FILTER_INTAKE_AREA_NAME",areaName:e}},C=function(e){return{type:"SET_FILTER_INTAKE_CAMPAIGN",campaign:e}},v=function(e){return{type:"SET_FILTER_INTAKE_MEASURE_REQUESTED",measureRequested:e}},I=function(e){return{type:"SET_FILTER_INTAKE_STATUS",statusId:e}},y=function(){return{type:"CLEAR_FILTER_INTAKES"}},b=function(e){return{type:"SET_INTAKES_PAGINATION",pagination:e}},N=n(58168),D=n(42285),S=n(45403),T=n(93913),w=n(9152);n(26829);const x=(0,u.Ng)(null,(function(e){return{setIntakesSortsFilter:function(t,n){e(function(e,t){return{type:"SET_INTAKES_SORTS_FILTER",field:e,order:t}}(t,n))}}}))((function(e){var t=function(t,n){e.setIntakesSortsFilter(t,n),setTimeout((function(){e.refreshIntakesData()}),100)};return c.createElement("tr",{className:"thead-title"},e.showCheckbox?c.createElement("th",{width:"3%"}):null,c.createElement(w.A,{sortColumn:"createdAt",title:"Datum",width:"15%",setSorts:t}),c.createElement(w.A,{sortColumn:"fullName",title:"Contact",width:"20%",setSorts:t}),c.createElement(w.A,{sortColumn:"address",title:"Adres",width:"20%",setSorts:t}),c.createElement(w.A,{sortColumn:"areaName",title:"Buurt",width:"20%",setSorts:t}),c.createElement(w.A,{sortColumn:"measureRequestedId",title:"Interesse",width:"15%",setSorts:t}),c.createElement(w.A,{sortColumn:"statusId",title:"Status intakes",width:"15%",setSorts:t}),c.createElement(w.A,{sortColumn:"campaign",title:"Campagne",width:"10%",setSorts:t}),c.createElement("th",{width:"5%"}))}));var F=n(95093),R=n.n(F),_=(n(36939),n(78746));const L=(0,u.Ng)((function(e){return{filters:e.intakes.filters,intakeStatuses:e.systemData.intakeStatuses,measureCategories:e.systemData.measureCategories}}),(function(e){return(0,m.zH)({setIntakeStartDateFilter:f,setIntakeEndDateFilter:k,setFilterFullName:E,setFilterIntakeAddress:A,setFilterIntakeAreaName:g,setFilterIntakeCampaign:C,setFilterMeasureRequested:v,setFilterIntakeStatus:I},e)}))((function(e){return c.createElement("tr",{className:"thead-filter"},e.showCheckbox&&c.createElement("td",null,c.createElement("input",{type:"checkbox",value:e.checkedAllCheckboxes,onChange:e.selectAllCheckboxes})),c.createElement(_.A,{startDate:e.filters.createdAtStart.data&&e.filters.createdAtStart.data,endDate:e.filters.createdAtEnd.data&&e.filters.createdAtEnd.data,onChangeActionStart:function(t){void 0===t?e.setIntakeStartDateFilter(""):e.setIntakeStartDateFilter(R()(t).format("Y-MM-DD"))},onChangeActionEnd:function(t){void 0===t?e.setIntakeEndDateFilter(""):e.setIntakeEndDateFilter(R()(t).format("Y-MM-DD"))}}),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.fullName.data,onChange:function(t){e.setFilterFullName(t.target.value)}})),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.address.data,onChange:function(t){e.setFilterIntakeAddress(t.target.value)}})),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.areaName.data,onChange:function(t){e.setFilterIntakeAreaName(t.target.value)}})),c.createElement("th",null,c.createElement("select",{className:"form-control input-sm",value:e.filters.measureRequested.data,onChange:function(t){e.setFilterMeasureRequested(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}},c.createElement("option",null),e.measureCategories.map((function(e){return c.createElement("option",{key:e.id,value:e.id},e.name)})))),c.createElement("th",null,c.createElement("select",{className:"form-control input-sm",value:e.filters.statusId.data,onChange:function(t){e.setFilterIntakeStatus(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}},c.createElement("option",null),e.intakeStatuses.map((function(e){return c.createElement("option",{key:e.id,value:e.id},e.name)})))),c.createElement("th",null,c.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.campaign.data,onChange:function(t){e.setFilterIntakeCampaign(t.target.value)}})),c.createElement("th",null))}));var P=n(24179),K=n(87722),M=n(88505);function O(e,t,n){return t=(0,s.A)(t),(0,o.A)(e,U()?Reflect.construct(t,n||[],(0,s.A)(e).constructor):t.apply(e,n))}function U(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(U=function(){return!!e})()}var B=function(e){function t(e){var n;return(0,a.A)(this,t),(n=O(this,t,[e])).state={showActionButtons:!1,highlightRow:""},n}return(0,l.A)(t,e),(0,r.A)(t,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"setCheckedIntake",value:function(e){this.props.setCheckedIntake(e)}},{key:"openItem",value:function(e){P.RL.push("/intake/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.checked,a=t.id,r=t.fullName,o=t.createdAt,s=t.fullAddress,l=t.areaName,i=t.status,u=t.campaign,m=t.measuresRequestedNames,p=void 0===m?[]:m;return c.createElement("tr",{className:this.state.highlightRow,onDoubleClick:function(){return e.openItem(a)},onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},this.props.showCheckbox&&c.createElement("td",null,c.createElement("input",{type:"checkbox",checked:n,onChange:function(){return e.setCheckedIntake(a)}})),c.createElement("td",null,R()(o).format("DD-MM-Y")),c.createElement("td",null,r),c.createElement("td",null,s),c.createElement("td",null,l),c.createElement("td",null,p.join(", ")),c.createElement("td",null,i),c.createElement("td",null,u.name),c.createElement("td",null,this.state.showActionButtons?c.createElement("a",{role:"button",onClick:function(){return e.openItem(a)}},c.createElement(K.Ay,{className:"mybtn-success",size:14,icon:M.w})):""))}}])}(c.Component);const W=(0,u.Ng)(null,(function(e){return{setCheckedIntake:function(t){e(function(e){return{type:"SET_CHECKED_INTAKE",id:e}}(t))}}}))(B);var Y=n(74850);function q(e,t,n){return t=(0,s.A)(t),(0,o.A)(e,H()?Reflect.construct(t,n||[],(0,s.A)(e).constructor):t.apply(e,n))}function H(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(H=function(){return!!e})()}var z=function(e){function t(e){var n;return(0,a.A)(this,t),n=q(this,t,[e]),(0,i.A)(n,"handleKeyUp",(function(e){13===e.keyCode&&n.props.onSubmitFilter()})),n}return(0,l.A)(t,e),(0,r.A)(t,[{key:"render",value:function(){var e=this,t=this.props.intakes,n=t.data,a=void 0===n?[]:n,r=t.meta,o=void 0===r?{}:r,s="",l=!0;return this.props.hasError?s="Fout bij het ophalen van intakes.":this.props.isLoading?s="Gegevens aan het laden.":0===a.length?s="Geen intakes gevonden!":l=!1,c.createElement("form",{onKeyUp:this.handleKeyUp},c.createElement(D.A,null,c.createElement(S.A,null,c.createElement(x,{showCheckbox:this.props.showCheckboxList,refreshIntakesData:function(){return e.props.refreshIntakesData()}}),c.createElement(L,{showCheckbox:this.props.showCheckboxList,selectAllCheckboxes:function(){return e.props.selectAllCheckboxes()},onSubmitFilter:this.props.onSubmitFilter})),c.createElement(T.A,null,l?c.createElement("tr",null,c.createElement("td",{colSpan:6},s)):a.map((function(t){return c.createElement(W,(0,N.A)({key:t.id},t,{showCheckbox:e.props.showCheckboxList,checkedAllCheckboxes:e.props.checkedAllCheckboxes}))})))),c.createElement("div",{className:"col-md-4 col-md-offset-4"},c.createElement(Y.A,{onPageChangeAction:this.props.handlePageClick,totalRecords:o.total,initialPage:this.props.intakesPagination.page})))}}])}(c.Component);const G=(0,u.Ng)((function(e){return{isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}))(z);var j=n(91858),V=n(60628),Q=n(46161);function J(e,t,n){return t=(0,s.A)(t),(0,o.A)(e,X()?Reflect.construct(t,n||[],(0,s.A)(e).constructor):t.apply(e,n))}function X(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(X=function(){return!!e})()}var Z=function(e){function t(e){var n;return(0,a.A)(this,t),n=J(this,t,[e]),(0,i.A)(n,"bulkEmailContacts",(function(){var e=[];n.props.intakes.data.map((function(t){return!0===t.checked&&e.push(t.contactId)})),n.props.setBulkEmailToContactIds(e),P.RL.push("/email/nieuw/bulk")})),n}return(0,l.A)(t,e),(0,r.A)(t,[{key:"render",value:function(){var e=this.props.intakes.meta,t=void 0===e?{}:e;return c.createElement("div",{className:"row"},c.createElement("div",{className:"col-md-4"},c.createElement("div",{className:"btn-group",role:"group"},c.createElement(j.A,{iconName:"refresh",onClickAction:this.props.resetIntakeFilters}),c.createElement("div",{className:"nav navbar-nav btn-group",role:"group"},c.createElement("button",{className:"btn btn-success btn-sm","data-toggle":"dropdown"},c.createElement(K.Ay,{size:12,icon:Q.u})),c.createElement("ul",{className:"dropdown-menu"},c.createElement("li",null,c.createElement("a",{onClick:this.bulkEmailContacts},"Contacten emailen")))),c.createElement(j.A,{iconName:"check",onClickAction:this.props.toggleShowCheckboxList}),c.createElement(j.A,{iconName:"download",title:"Download unieke intakes",onClickAction:this.props.getExcel}),c.createElement(j.A,{iconName:"download",title:"Download intakes met kansen",onClickAction:this.props.getExcelWithOpportunities}))),c.createElement("div",{className:"col-md-4"},c.createElement("h3",{className:"text-center table-title"},"Intakes")),c.createElement("div",{className:"col-md-4"},c.createElement("div",{className:"pull-right"},"Resultaten: ",t.total||0)))}}])}(c.Component);const $=(0,u.Ng)((function(e){return{intakes:e.intakes.list}}),(function(e){return{setBulkEmailToContactIds:function(t){e((0,V.G)(t))}}}))(Z);var ee=n(19737),te=n(62493),ne=n(55849),ae=n(5419),re=n.n(ae),oe=n(48240),se=n(23138);function le(e,t,n){return t=(0,s.A)(t),(0,o.A)(e,ie()?Reflect.construct(t,n||[],(0,s.A)(e).constructor):t.apply(e,n))}function ie(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(ie=function(){return!!e})()}var ce=function(e){function t(e){var n;return(0,a.A)(this,t),n=le(this,t,[e]),(0,i.A)(n,"getExcel",(function(){n.props.blockUI(),setTimeout((function(){var e=(0,ee.A)(n.props.intakesFilters),t=n.props.intakesSorts;oe.A.getExcel({filters:e,sorts:t}).then((function(e){re()(e.data,"Intakes-"+R()().format("YYYY-MM-DD HH:mm:ss")+".xlsx"),n.props.unblockUI()})).catch((function(e){n.props.unblockUI()}))}),100)})),(0,i.A)(n,"getExcelWithOpportunities",(function(){n.props.blockUI(),setTimeout((function(){var e=(0,ee.A)(n.props.intakesFilters),t=n.props.intakesSorts;oe.A.getExcelWithOpportunities({filters:e,sorts:t}).then((function(e){re()(e.data,"Intakes-met-kansen-"+R()().format("YYYY-MM-DD HH:mm:ss")+".xlsx"),n.props.unblockUI()})).catch((function(e){n.props.unblockUI()}))}),100)})),(0,i.A)(n,"fetchIntakesData",(function(){setTimeout((function(){var e=(0,ee.A)(n.props.intakesFilters),t=n.props.intakesSorts,a={limit:20,offset:n.props.intakesPagination.offset};n.props.fetchIntakes(e,t,a)}),100)})),(0,i.A)(n,"resetIntakeFilters",(function(){n.props.clearFilterIntakes(),n.fetchIntakesData()})),(0,i.A)(n,"toggleShowCheckboxList",(function(){n.setState({showCheckboxList:!n.state.showCheckboxList})})),(0,i.A)(n,"selectAllCheckboxes",(function(){n.setState({checkedAllCheckboxes:!n.state.checkedAllCheckboxes}),n.props.setCheckedIntakeAll(!n.state.checkedAllCheckboxes)})),n.state={showCheckboxList:!1,checkedAllCheckboxes:!1},n.handlePageClick=n.handlePageClick.bind(n),n.getExcel=n.getExcel.bind(n),n.getExcelWithOpportunities=n.getExcelWithOpportunities.bind(n),n}return(0,l.A)(t,e),(0,r.A)(t,[{key:"componentDidMount",value:function(){this.fetchIntakesData()}},{key:"componentWillUnmount",value:function(){this.props.clearIntakes()}},{key:"onSubmitFilter",value:function(){var e=this;(0,ee.A)(this.props.intakesFilters),this.props.intakesSorts,this.props.setIntakesPagination({page:0,offset:0}),setTimeout((function(){e.fetchIntakesData()}),100)}},{key:"handlePageClick",value:function(e){var t=this,n=e.selected,a=Math.ceil(20*n);this.props.setIntakesPagination({page:n,offset:a}),setTimeout((function(){t.fetchIntakesData()}),100)}},{key:"render",value:function(){var e=this;return c.createElement(te.A,null,c.createElement(ne.A,null,c.createElement("div",{className:"col-md-12 margin-10-top"},c.createElement($,{toggleShowCheckboxList:function(){return e.toggleShowCheckboxList()},resetIntakeFilters:function(){return e.resetIntakeFilters()},getExcel:this.getExcel,getExcelWithOpportunities:this.getExcelWithOpportunities})),c.createElement("div",{className:"col-md-12 margin-10-top"},c.createElement(G,{intakes:this.props.intakes,intakesPagination:this.props.intakesPagination,onSubmitFilter:function(){return e.onSubmitFilter()},refreshIntakesData:function(){return e.fetchIntakesData()},handlePageClick:this.handlePageClick,showCheckboxList:this.state.showCheckboxList,selectAllCheckboxes:function(){return e.selectAllCheckboxes()},checkedAllCheckboxes:this.state.checkedAllCheckboxes}))))}}])}(c.Component);const ue=(0,u.Ng)((function(e){return{intakes:e.intakes.list,intakesFilters:e.intakes.filters,intakesSorts:e.intakes.sorts,intakesPagination:e.intakes.pagination}}),(function(e){return(0,m.zH)({fetchIntakes:p,clearIntakes:d,setIntakesPagination:b,clearFilterIntakes:y,setCheckedIntakeAll:h,blockUI:se.o,unblockUI:se.r},e)}))(ce)},19737:(e,t,n)=>{n.d(t,{A:()=>a});const a=function(e){var t=[];for(var n in e)""!==e[n].data&&t.push(e[n]);return t}}}]);