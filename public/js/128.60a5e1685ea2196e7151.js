(window.webpackJsonp=window.webpackJsonp||[]).push([[128],{1660:function(t,e,n){"use strict";n.r(e);var a=n(24),r=n.n(a),o=n(25),c=n.n(o),i=n(26),u=n.n(i),s=n(27),l=n.n(s),f=n(16),d=n.n(f),m=n(0),p=n.n(m),h=n(799),v=n(800),b=n(691),g=n(692),y=n(204),E=n(949);var D=function(t){u()(n,t);var e=function(t){function e(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}return function(){var n,a=d()(t);if(e()){var r=d()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return l()(this,n)}}(n);function n(t){var a;return r()(this,n),(a=e.call(this,t)).state={chartData:[],amountOfDataPoints:[],code:""},a}return c()(n,[{key:"componentDidMount",value:function(){var t=this;y.a.getChartData(this.props.id).then((function(e){for(var n=0,a=0;a<e.data.length;a++)n+=parseInt(e.data[a].count);t.setState({chartData:e.data,amountOfDataPoints:n,code:e.code})}))}},{key:"renderChartsData",value:function(){var t=[],e=this.state.chartData,n=void 0===e?[]:e,a=n.map((function(t){return t.name})),r=n.map((function(t){return t.count}));return t.data={labels:a,datasets:[{data:r,backgroundColor:["rgba(48, 129, 95, 0.8)","rgba(39, 174, 96, 0.8)","rgba(41, 128, 185, 0.8)","rgba(142, 68, 173, 0.8)","rgba(203, 185, 86, 0.8)","rgba(230, 74, 74, 0.8)"],hoverBackgroundColor:["rgba(48, 129, 95,1)","rgba(39, 174, 96, 1)","rgba(41, 128, 185, 1)","rgba(142, 68, 173, 1)","rgba(203, 185, 86,  1)","rgba(230, 74, 74, 1)"]}]},t.options={legend:{display:!0,position:"right"},maintainAspectRatio:!1,responsive:!0,tooltips:{mode:"label",callbacks:{label:function(t,e){var n=e.datasets[t.datasetIndex],a=n._meta[Object.keys(n._meta)[0]].total,r=n.data[t.index];return r+" ("+parseFloat((r/a*100).toFixed(1))+"%)"},title:function(t,e){return e.labels[t[0].index]}}},tooltipTemplate:"'<%=label%>: <%= numeral(value).format('($00[.]00)') %> - <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>'"},t}},{key:"render",value:function(){var t=this.renderChartsData(),e=t.data,n=t.options,a=this.state.amountOfDataPoints;return p.a.createElement("div",null,p.a.createElement("h4",null,"Deelnemers status in project ",this.state.code),p.a.createElement("div",null,0===a?p.a.createElement("span",null,"Geen deelnemers gevonden."):p.a.createElement(E.a,{data:e,options:n,width:250,height:250})))}}]),n}(m.Component);var R=function(t){u()(n,t);var e=function(t){function e(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}return function(){var n,a=d()(t);if(e()){var r=d()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return l()(this,n)}}(n);function n(t){var a;return r()(this,n),(a=e.call(this,t)).state={chartData:[],amountOfDataPoints:[],code:""},a}return c()(n,[{key:"componentDidMount",value:function(){var t=this;y.a.getChartContactStatusData(this.props.id).then((function(e){for(var n=0,a=0;a<e.data.length;a++)n+=parseInt(e.data[a].count);t.setState({chartData:e.data,amountOfDataPoints:n,code:e.code})}))}},{key:"renderChartsData",value:function(){var t=[],e=this.state.chartData,n=void 0===e?[]:e,a=n.map((function(t){return t.name})),r=n.map((function(t){return t.count}));return t.data={labels:a,datasets:[{data:r,backgroundColor:["rgba(48, 129, 95, 0.8)","rgba(39, 174, 96, 0.8)","rgba(41, 128, 185, 0.8)","rgba(142, 68, 173, 0.8)","rgba(203, 185, 86, 0.8)","rgba(230, 74, 74, 0.8)"],hoverBackgroundColor:["rgba(48, 129, 95,1)","rgba(39, 174, 96, 1)","rgba(41, 128, 185, 1)","rgba(142, 68, 173, 1)","rgba(203, 185, 86,  1)","rgba(230, 74, 74, 1)"]}]},t.options={legend:{display:!0,position:"right"},maintainAspectRatio:!1,responsive:!0,tooltips:{mode:"label",callbacks:{label:function(t,e){var n=e.datasets[t.datasetIndex],a=n._meta[Object.keys(n._meta)[0]].total,r=n.data[t.index];return r+" ("+parseFloat((r/a*100).toFixed(1))+"%)"},title:function(t,e){return e.labels[t[0].index]}}},tooltipTemplate:"'<%=label%>: <%= numeral(value).format('($00[.]00)') %> - <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>'"},t}},{key:"render",value:function(){var t=this.renderChartsData(),e=t.data,n=t.options,a=this.state.amountOfDataPoints;return p.a.createElement("div",null,p.a.createElement("h4",null,"Deelnemers contact status in project ",this.state.code),p.a.createElement("div",null,0===a?p.a.createElement("span",null,"Geen contacten gevonden."):p.a.createElement(E.a,{data:e,options:n,width:250,height:250})))}}]),n}(m.Component);var k=function(t){u()(n,t);var e=function(t){function e(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}return function(){var n,a=d()(t);if(e()){var r=d()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return l()(this,n)}}(n);function n(t){var a;return r()(this,n),(a=e.call(this,t)).state={chartData:[],amountOfDataPoints:[],code:""},a}return c()(n,[{key:"componentDidMount",value:function(){var t=this;y.a.getChartParticipationsData(this.props.id).then((function(e){for(var n=0,a=0;a<e.data.length;a++)n+=parseInt(e.data[a].count);t.setState({chartData:e.data,amountOfDataPoints:n,code:e.code})}))}},{key:"renderChartsData",value:function(){var t=[],e=this.state.chartData,n=void 0===e?[]:e,a=n.map((function(t){return t.name})),r=n.map((function(t){return t.count}));return t.data={labels:a,datasets:[{data:r,backgroundColor:["rgba(48, 129, 95, 0.8)","rgba(39, 174, 96, 0.8)","rgba(41, 128, 185, 0.8)","rgba(142, 68, 173, 0.8)","rgba(203, 185, 86, 0.8)","rgba(230, 74, 74, 0.8)"],hoverBackgroundColor:["rgba(48, 129, 95,1)","rgba(39, 174, 96, 1)","rgba(41, 128, 185, 1)","rgba(142, 68, 173, 1)","rgba(203, 185, 86,  1)","rgba(230, 74, 74, 1)"]}]},t.options={legend:{display:!0,position:"right"},maintainAspectRatio:!1,responsive:!0,tooltips:{mode:"label",callbacks:{label:function(t,e){var n=e.datasets[t.datasetIndex],a=n._meta[Object.keys(n._meta)[0]].total,r=n.data[t.index];return r+" ("+parseFloat((r/a*100).toFixed(1))+"%)"},title:function(t,e){return e.labels[t[0].index]}}},tooltipTemplate:"'<%=label%>: <%= numeral(value).format('($00[.]00)') %> - <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>'"},t}},{key:"render",value:function(){var t=this.renderChartsData(),e=t.data,n=t.options,a=this.state.amountOfDataPoints;return p.a.createElement("div",null,p.a.createElement("h4",null,"Deelnames status in project ",this.state.code),p.a.createElement("div",null,0===a?p.a.createElement("span",null,"Geen deelnames gevonden."):p.a.createElement(E.a,{data:e,options:n,width:250,height:250})))}}]),n}(m.Component);var x=function(t){u()(n,t);var e=function(t){function e(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}return function(){var n,a=d()(t);if(e()){var r=d()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return l()(this,n)}}(n);function n(t){var a;return r()(this,n),(a=e.call(this,t)).state={activeProjectsIds:[]},a}return c()(n,[{key:"componentWillMount",value:function(){var t=this;y.a.getActive().then((function(e){t.setState({activeProjectsIds:e})}))}},{key:"render",value:function(){var t=this.state.activeProjectsIds;return p.a.createElement("div",{className:"row"},t.map((function(t){return p.a.createElement("div",null,p.a.createElement("div",{className:"col-md-4"},p.a.createElement(b.a,null,p.a.createElement(g.a,null,p.a.createElement(D,{id:t})))),p.a.createElement("div",{className:"col-md-4"},p.a.createElement(b.a,null,p.a.createElement(g.a,null,p.a.createElement(k,{id:t})))),p.a.createElement("div",{className:"col-md-4"},p.a.createElement(b.a,null,p.a.createElement(g.a,null,p.a.createElement(R,{id:t})))))})))}}]),n}(m.Component);var C=function(t){u()(n,t);var e=function(t){function e(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}return function(){var n,a=d()(t);if(e()){var r=d()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return l()(this,n)}}(n);function n(t){return r()(this,n),e.call(this,t)}return c()(n,[{key:"render",value:function(){return p.a.createElement("div",null,p.a.createElement("div",{className:"row"},p.a.createElement(h.a,{size:"col-xs-2"}),p.a.createElement(v.a,{size:"col-xs-2"})),p.a.createElement(x,null))}}]),n}(m.Component);e.default=C},691:function(t,e,n){"use strict";var a=n(0),r=n.n(a),o=n(7),c=n.n(o),i=function(t){var e=t.children,n=t.className,a=t.onMouseEnter,o=t.onMouseLeave;return r.a.createElement("div",{className:"panel panel-default ".concat(n),onMouseEnter:a,onMouseLeave:o},e)};i.defaultProps={className:"",onMouseEnter:function(){},onMouseLeave:function(){}},i.propTypes={className:c.a.string,onMouseEnter:c.a.func,onMouseLeave:c.a.func},e.a=i},692:function(t,e,n){"use strict";var a=n(0),r=n.n(a),o=n(7),c=n.n(o),i=function(t){var e=t.className,n=t.children;return r.a.createElement("div",{className:"panel-body ".concat(e)},n)};i.defaultProps={className:""},i.propTypes={className:c.a.string},e.a=i},799:function(t,e,n){"use strict";var a=n(24),r=n.n(a),o=n(25),c=n.n(o),i=n(26),u=n.n(i),s=n(27),l=n.n(s),f=n(16),d=n.n(f),m=n(0),p=n.n(m),h=n(4),v=n(150);var b=function(t){u()(n,t);var e=function(t){function e(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}return function(){var n,a=d()(t);if(e()){var r=d()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return l()(this,n)}}(n);function n(t){var a;return r()(this,n),(a=e.call(this,t)).state={amountOpenEmails:"-"},a}return c()(n,[{key:"componentWillMount",value:function(){var t=this;v.a.getAmountOpen().then((function(e){t.setState({amountOpenEmails:e})}))}},{key:"render",value:function(){return p.a.createElement("div",{className:this.props.size,onClick:function(){return h.f.push("/emails/inbox/eigen")}},p.a.createElement("div",{className:"panel panel-default",id:"dashboardbutton-1"},p.a.createElement("div",{className:"panel-body"},p.a.createElement("h4",{className:"text-center text-bold"},"E-MAIL"),p.a.createElement("h4",{className:"text-center text-bold"},this.state.amountOpenEmails))))}}]),n}(m.Component);e.a=b},800:function(t,e,n){"use strict";var a=n(24),r=n.n(a),o=n(25),c=n.n(o),i=n(26),u=n.n(i),s=n(27),l=n.n(s),f=n(16),d=n.n(f),m=n(0),p=n.n(m),h=n(4),v=n(108);var b=function(t){u()(n,t);var e=function(t){function e(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}return function(){var n,a=d()(t);if(e()){var r=d()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return l()(this,n)}}(n);function n(t){var a;return r()(this,n),(a=e.call(this,t)).state={amountActiveTasks:"-"},a}return c()(n,[{key:"componentWillMount",value:function(){var t=this;v.a.getAmountActive().then((function(e){t.setState({amountActiveTasks:e})}))}},{key:"render",value:function(){return p.a.createElement("div",{className:this.props.size,onClick:function(){return h.f.push("/taken/eigen")}},p.a.createElement("div",{className:"panel panel-default",id:"dashboardbutton-4"},p.a.createElement("div",{className:"panel-body"},p.a.createElement("h4",{className:"text-center text-bold"},"OPEN TAKEN"),p.a.createElement("h4",{className:"text-center text-bold"},this.state.amountActiveTasks))))}}]),n}(m.Component);e.a=b}}]);