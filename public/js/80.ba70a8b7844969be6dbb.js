(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{1533:function(e,t,n){"use strict";n.r(t);var a=n(18),o=n.n(a),r=n(19),l=n.n(r),i=n(12),s=n.n(i),c=n(20),u=n.n(c),m=n(21),f=n.n(m),p=n(14),h=n.n(p),d=n(0),E=n.n(d),N=n(16),v=n(22),y=function(e,t,n){return{type:"FETCH_NOTES",filters:e,sorts:t,pagination:n}},g=function(){return{type:"CLEAR_NOTES"}},b=function(e){return{type:"SET_FILTER_NOTE_CREATED_AT",createdAt:e}},T=function(e){return{type:"SET_FILTER_NOTE_TYPE_ID",typeId:e}},D=function(e){return{type:"SET_FILTER_NOTE_NOTE",note:e}},S=function(e){return{type:"SET_FILTER_NOTE_CONTACT_FULL_NAME",contactFullName:e}},w=function(e){return{type:"SET_FILTER_NOTE_DATE_PLANNED_START",datePlannedStart:e}},C=function(e){return{type:"SET_FILTER_NOTE_RESPONSIBLE_NAME",responsibleName:e}},F=function(){return{type:"CLEAR_FILTER_NOTES"}},O=function(e){return{type:"SET_NOTES_PAGINATION",pagination:e}},k=n(234),R=n.n(k),P=n(5),I=n.n(P),A=n(179),_=n(180),j=n(236),L=n(838),M=Object(N.b)(null,(function(e){return{setNotesSortsFilter:function(t,n){e(function(e,t){return{type:"SET_NOTES_SORTS",field:e,order:t}}(t,n))}}}))((function(e){var t=function(t,n){e.setNotesSortsFilter(t,n),setTimeout((function(){e.fetchNotesData()}),100)};return E.a.createElement("tr",{className:"thead-title"},E.a.createElement(L.a,{sortColumn:"createdAt",title:"Datum",width:"8%",setSorts:t}),E.a.createElement(L.a,{sortColumn:"typeName",title:"Type taak",width:"10%",setSorts:t}),E.a.createElement(L.a,{sortColumn:"note",title:"Taak / notitie",width:"20%",setSorts:t}),E.a.createElement(L.a,{sortColumn:"contactFullName",title:"Contact",width:"17%",setSorts:t}),E.a.createElement(L.a,{sortColumn:"datePlannedStart",title:"Datum afhandelen",width:"8%",setSorts:t}),E.a.createElement(L.a,{sortColumn:"responsibleName",title:"Verantwoordelijke",width:"15%",setSorts:t}),E.a.createElement("th",{width:"5%"}))})),B=n(7),x=n.n(B),U=n(842),K=Object(N.b)((function(e){return{filters:e.notes.filters,taskTypes:e.systemData.taskTypes}}),(function(e){return Object(v.b)({setFilterNoteCreatedAt:b,setFilterNoteTypeId:T,setFilterNoteNote:D,setFilterNoteContactFullName:S,setFilterNoteDatePlannedStart:w,setFilterNoteResponsibleName:C},e)}))((function(e){return E.a.createElement("tr",{className:"thead-filter"},E.a.createElement(U.a,{value:e.filters.createdAt.data&&e.filters.createdAt.data,onChangeAction:function(t){void 0===t?e.setFilterNoteCreatedAt(""):e.setFilterNoteCreatedAt(x()(t).format("Y-MM-DD"))}}),E.a.createElement("th",null,E.a.createElement("select",{className:"form-control input-sm",value:e.filters.typeId.data,onChange:function(t){e.setFilterNoteTypeId(t.target.value),setTimeout((function(){e.onSubmitFilter()}),100)}},E.a.createElement("option",null),e.taskTypes.map((function(e){return E.a.createElement("option",{key:e.id,value:e.id},e.name)})))),E.a.createElement("th",null,E.a.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.note.data,onChange:function(t){e.setFilterNoteNote(t.target.value)}})),E.a.createElement("th",null,E.a.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.contactFullName.data,onChange:function(t){e.setFilterNoteContactFullName(t.target.value)}})),E.a.createElement(U.a,{value:e.filters.datePlannedStart.data&&e.filters.datePlannedStart.data,onChangeAction:function(t){void 0===t?e.setFilterNoteDatePlannedStart(""):e.setFilterNoteDatePlannedStart(x()(t).format("Y-MM-DD"))}}),E.a.createElement("th",null,E.a.createElement("input",{type:"text",className:"form-control input-sm",value:e.filters.responsibleName.data,onChange:function(t){e.setFilterNoteResponsibleName(t.target.value)}})),E.a.createElement("th",null))})),q=n(3);function V(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=h()(e);if(t){var o=h()(this).constructor;n=Reflect.construct(a,arguments,o)}else n=a.apply(this,arguments);return f()(this,n)}}var G=function(e){u()(n,e);var t=V(n);function n(e){var a;return o()(this,n),(a=t.call(this,e)).state={showActionButtons:!1,highlightRow:""},a.openItem=a.openItem.bind(s()(a)),a}return l()(n,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(){q.f.push("/taak/".concat(this.props.id))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,a=t.createdAt,o=t.typeName,r=t.noteSummary,l=t.contactFullName,i=t.datePlannedStart,s=t.responsibleName;return E.a.createElement("tr",{className:this.state.highlightRow,onDoubleClick:function(){return e.openItem(n)},onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},E.a.createElement("td",null,x()(a).format("L")),E.a.createElement("td",null,o),E.a.createElement("td",null,r),E.a.createElement("td",null,l),E.a.createElement("td",null,i&&x()(i).format("L")),E.a.createElement("td",null,s),E.a.createElement("td",null,this.state.showActionButtons?E.a.createElement("a",{role:"button",onClick:this.openItem},E.a.createElement("span",{className:"glyphicon glyphicon-pencil mybtn-success"})," "):"",this.state.showActionButtons&&this.props.permissions.manageNote?E.a.createElement("a",{role:"button",onClick:this.props.showDeleteItemModal.bind(this,n,name)},E.a.createElement("span",{className:"glyphicon glyphicon-trash mybtn-danger"})," "):""))}}]),n}(d.Component),W=Object(N.b)((function(e){return{permissions:e.meDetails.permissions}}),null)(G),Y=n(41),H=n(914),J=Object(N.b)(null,(function(e){return{deleteTask:function(t){e(Object(H.a)(t))}}}))((function(e){return E.a.createElement(Y.a,{buttonConfirmText:"Verwijder",buttonClassName:"btn-danger",closeModal:e.closeDeleteItemModal,confirmAction:function(){return e.deleteTask(e.id),void e.closeDeleteItemModal()},title:"Verwijderen"},"Verwijder taak: ",E.a.createElement("strong",null," ",e.name," "))})),z=n(132);function Q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function X(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Q(Object(n),!0).forEach((function(t){I()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Z(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=h()(e);if(t){var o=h()(this).constructor;n=Reflect.construct(a,arguments,o)}else n=a.apply(this,arguments);return f()(this,n)}}var $=function(e){u()(n,e);var t=Z(n);function n(e){var a;return o()(this,n),a=t.call(this,e),I()(s()(a),"handleKeyUp",(function(e){13===e.keyCode&&a.props.onSubmitFilter()})),I()(s()(a),"showDeleteItemModal",(function(e,t){a.setState(X(X({},a.state),{},{showDeleteItem:!0,deleteItem:X(X({},a.state.deleteItem),{},{id:e,name:t})}))})),I()(s()(a),"closeDeleteItemModal",(function(){a.setState(X(X({},a.state),{},{showDeleteItem:!1,deleteItem:X(X({},a.state.deleteItem),{},{id:"",name:""})}))})),a.state={showDeleteItem:!1,deleteItem:{id:"",name:""}},a}return l()(n,[{key:"render",value:function(){var e=this,t=this.props.notes,n=t.data,a=void 0===n?[]:n,o=t.meta,r=void 0===o?{}:o,l="",i=!0;return this.props.hasError?l="Fout bij het ophalen van notities.":this.props.isLoading?l="Gegevens aan het laden.":0===a.length?l="Geen notities gevonden!":i=!1,E.a.createElement("div",null,E.a.createElement("form",{onKeyUp:this.handleKeyUp},E.a.createElement(A.a,null,E.a.createElement(_.a,null,E.a.createElement(M,{fetchNotesData:function(){return e.props.fetchNotesData()}}),E.a.createElement(K,{onSubmitFilter:this.props.onSubmitFilter})),E.a.createElement(j.a,null,i?E.a.createElement("tr",null,E.a.createElement("td",{colSpan:7},l)):a.map((function(t){return E.a.createElement(W,R()({key:t.id},t,{showDeleteItemModal:e.showDeleteItemModal}))})))),E.a.createElement("div",{className:"col-md-6 col-md-offset-3"},E.a.createElement(z.a,{onPageChangeAction:this.props.handlePageClick,totalRecords:r.total,initialPage:this.props.notesPagination.page}))),this.state.showDeleteItem&&E.a.createElement(J,R()({closeDeleteItemModal:this.closeDeleteItemModal},this.state.deleteItem)))}}]),n}(d.Component),ee=Object(N.b)((function(e){return{isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}))($),te=n(48),ne=Object(N.b)((function(e){return{permissions:e.meDetails.permissions,notes:e.notes.list}}),null)((function(e){var t=e.permissions,n=void 0===t?{}:t,a=e.notes.meta,o=void 0===a?{}:a;return E.a.createElement("div",{className:"row"},E.a.createElement("div",{className:"col-md-4"},E.a.createElement("div",{className:"btn-group",role:"group"},E.a.createElement(te.a,{iconName:"glyphicon-refresh",onClickAction:e.resetNoteFilters}),n.manageNote&&E.a.createElement(te.a,{iconName:"glyphicon-plus",onClickAction:function(){q.f.push("taak/nieuw/afgesloten")}}))),E.a.createElement("div",{className:"col-md-4"},E.a.createElement("h3",{className:"text-center table-title"},"Notities")),E.a.createElement("div",{className:"col-md-4"},E.a.createElement("div",{className:"pull-right"},"Resultaten: ",o.total||0)))})),ae=n(839),oe=n(30),re=n(32);function le(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=h()(e);if(t){var o=h()(this).constructor;n=Reflect.construct(a,arguments,o)}else n=a.apply(this,arguments);return f()(this,n)}}var ie=function(e){u()(n,e);var t=le(n);function n(e){var a;return o()(this,n),(a=t.call(this,e)).fetchNotesData=a.fetchNotesData.bind(s()(a)),a.resetNoteFilters=a.resetNoteFilters.bind(s()(a)),a.handlePageClick=a.handlePageClick.bind(s()(a)),a}return l()(n,[{key:"componentDidMount",value:function(){this.fetchNotesData()}},{key:"componentWillUnmount",value:function(){this.props.clearNotes()}},{key:"fetchNotesData",value:function(){var e=this;setTimeout((function(){var t=Object(ae.a)(e.props.notesFilters),n=e.props.notesSorts,a={limit:20,offset:e.props.notesPagination.offset};e.props.fetchNotes(t,n,a)}),100)}},{key:"resetNoteFilters",value:function(){this.props.clearFilterNotes(),this.fetchNotesData()}},{key:"onSubmitFilter",value:function(){this.props.clearNotes(),this.props.setNotesPagination({page:0,offset:0}),this.fetchNotesData()}},{key:"handlePageClick",value:function(e){var t=e.selected,n=Math.ceil(20*t);this.props.setNotesPagination({page:t,offset:n}),this.fetchNotesData()}},{key:"render",value:function(){var e=this;return E.a.createElement(oe.a,null,E.a.createElement(re.a,null,E.a.createElement("div",{className:"col-md-12 margin-10-top"},E.a.createElement(ne,{resetNoteFilters:function(){return e.resetNoteFilters()}})),E.a.createElement("div",{className:"col-md-12 margin-10-top"},E.a.createElement(ee,{notes:this.props.notes,notesPagination:this.props.notesPagination,onSubmitFilter:function(){return e.onSubmitFilter()},fetchNotesData:function(){return e.fetchNotesData()},handlePageClick:this.handlePageClick}))))}}]),n}(d.Component);t.default=Object(N.b)((function(e){return{notes:e.notes.list,notesFilters:e.notes.filters,notesSorts:e.notes.sorts,notesPagination:e.notes.pagination}}),(function(e){return Object(v.b)({fetchNotes:y,clearNotes:g,clearFilterNotes:F,setNotesPagination:O},e)}))(ie)},838:function(e,t,n){"use strict";var a=n(0),o=n.n(a),r=n(6),l=n.n(r),i=function(e){var t=e.RowClassName,n=e.setSorts,a=e.sortColumn,r=e.title,l=e.width;return o.a.createElement("th",{className:t,width:l},r,o.a.createElement("span",{className:"glyphicon glyphicon-arrow-down pull-right small",role:"button",onClick:n.bind(void 0,a,"ASC")}),o.a.createElement("span",{className:"glyphicon glyphicon-arrow-up pull-right small",role:"button",onClick:n.bind(void 0,a,"DESC")}))};i.defaultProps={RowClassName:""},i.propTypes={setSorts:l.a.func.isRequired,sortColumn:l.a.string.isRequired,title:l.a.string.isRequired,width:l.a.string.isRequired,RowClassName:l.a.string},t.a=i},839:function(e,t,n){"use strict";t.a=function(e){var t=[];for(var n in e)""!==e[n].data&&t.push(e[n]);return t}},842:function(e,t,n){"use strict";var a=n(0),o=n.n(a),r=n(6),l=n.n(r),i=n(238),s=n.n(i),c=n(133),u=n.n(c),m=n(7),f=n.n(m);f.a.locale("nl");var p=function(e){var t=e.className,n=e.value,a=e.onChangeAction,r=e.placeholder,l=n?f()(n).format("L"):"";return o.a.createElement("th",{className:"DayPicker-overflow ".concat(t)},o.a.createElement(s.a,{value:l,onDayChange:a,formatDate:c.formatDate,parseDate:c.parseDate,dayPickerProps:{showWeekNumbers:!0,locale:"nl",firstDayOfWeek:1,localeUtils:u.a},inputProps:{className:"form-control input-sm",placeholder:r},placeholder:""}))};p.defaultProps={className:"",value:null,placeholder:""},p.propTypes={className:l.a.string,value:l.a.oneOfType([l.a.string,l.a.object]),onChangeAction:l.a.func,placeholder:l.a.string},t.a=p},914:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var a=function(e){return{type:"FETCH_TASK_DETAILS",id:e}},o=function(e){return{type:"UPDATE_TASK_DETAILS",task:e}},r=function(e){return{type:"DELETE_TASK",id:e}}}}]);