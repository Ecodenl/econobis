"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[2840],{82840:(e,t,n)=>{n.r(t),n.d(t,{default:()=>O});var r=n(23029),o=n(92901),s=n(56822),c=n(53954),l=n(85501),a=n(64467),i=n(96540),u=n(69733),m=n(17375),h=function(){return{type:"FETCH_USERS"}},f=function(){return{type:"CLEAR_USERS"}},p=n(58168),E=n(42285),d=n(45403),v=n(93913),A=n(26829),g=n(24179),k=n(95093),R=n.n(k),w=n(87722),y=n(88505);function b(e,t,n){return t=(0,c.A)(t),(0,s.A)(e,N()?Reflect.construct(t,n||[],(0,c.A)(e).constructor):t.apply(e,n))}function N(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(N=function(){return!!e})()}const C=function(e){function t(e){var n;return(0,r.A)(this,t),(n=b(this,t,[e])).state={showActionButtons:!1,highlightRow:""},n}return(0,l.A)(t,e),(0,o.A)(t,[{key:"onRowEnter",value:function(){this.setState({showActionButtons:!0,highlightRow:"highlight-row"})}},{key:"onRowLeave",value:function(){this.setState({showActionButtons:!1,highlightRow:""})}},{key:"openItem",value:function(e){g.RL.push("/gebruiker/".concat(e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,r=t.firstName,o=t.fullLastName,s=t.email,c=t.status;return i.createElement("tr",{className:this.state.highlightRow,onDoubleClick:function(){return e.openItem(n)},onMouseEnter:function(){return e.onRowEnter()},onMouseLeave:function(){return e.onRowLeave()}},i.createElement("td",null,r),i.createElement("td",null,o),i.createElement("td",null,s),i.createElement("td",null,c),i.createElement("td",null,this.state.showActionButtons?i.createElement("a",{role:"button",onClick:function(){return e.openItem(n)}},i.createElement(w.Ay,{className:"mybtn-success",size:14,icon:y.w})):""))}}])}(i.Component);function U(e,t,n){return t=(0,c.A)(t),(0,s.A)(e,D()?Reflect.construct(t,n||[],(0,c.A)(e).constructor):t.apply(e,n))}function D(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(D=function(){return!!e})()}var x=function(e){function t(e){return(0,r.A)(this,t),U(this,t,[e])}return(0,l.A)(t,e),(0,o.A)(t,[{key:"render",value:function(){var e="",t=!0;return this.props.hasError?e="Fout bij het ophalen van gebruikers.":this.props.isLoading?e="Gegevens aan het laden.":0===this.props.users.length?e="Geen gebruikers gevonden!":t=!1,i.createElement("div",null,i.createElement(E.A,null,i.createElement(d.A,null,i.createElement("tr",{className:"thead-title"},i.createElement(A.A,{title:"Voornaam",width:"30%"}),i.createElement(A.A,{title:"Achternaam",width:"25%"}),i.createElement(A.A,{title:"E-mail",width:"30%"}),i.createElement(A.A,{title:"Status",width:"10%"}),i.createElement(A.A,{title:"",width:"5%"}))),i.createElement(v.A,null,t?i.createElement("tr",null,i.createElement("td",{colSpan:11},e)):this.props.users.map((function(e){return i.createElement(C,(0,p.A)({key:e.id},e))})))))}}])}(i.Component);const B=(0,u.Ng)((function(e){return{isLoading:e.loadingData.isLoading,hasError:e.loadingData.hasError}}))(x);var L=n(91858);const I=(0,u.Ng)((function(e){return{permissions:e.meDetails.permissions}}))((function(e){var t=e.permissions,n=void 0===t?{}:t;return i.createElement("div",{className:"row"},i.createElement("div",{className:"col-md-4"},i.createElement("div",{className:"btn-group",role:"group"},i.createElement(L.A,{iconName:"refresh",onClickAction:e.refreshContactsData,title:"Vernieuwen scherm"}),n.manageUser?i.createElement(i.Fragment,null,i.createElement(L.A,{iconName:"cog",onClickAction:e.getRolesPermissionsExcel,title:"Downloaden roles/permissions naar Excel"}),i.createElement(L.A,{iconName:"plus",onClickAction:function(){g.RL.push("/gebruiker/nieuw")},title:"Toevoegen gebruiker"})):null)),i.createElement("div",{className:"col-md-4"},i.createElement("h3",{className:"text-center table-title"},"Gebruikers")),i.createElement("div",{className:"col-md-4"}))}));var P=n(5419),S=n.n(P),M=n(94689),H=n(23138);function Y(e,t,n){return t=(0,c.A)(t),(0,s.A)(e,F()?Reflect.construct(t,n||[],(0,c.A)(e).constructor):t.apply(e,n))}function F(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(F=function(){return!!e})()}var G=function(e){function t(e){var n;return(0,r.A)(this,t),n=Y(this,t,[e]),(0,a.A)(n,"refreshContactsData",(function(){n.props.clearUsers(),n.props.fetchUsers()})),(0,a.A)(n,"getRolesPermissionsExcel",(function(){n.props.blockUI(),setTimeout((function(){M.A.getRolesPermissionsExcel().then((function(e){S()(e.data,"Permissions-"+R()().format("YYYY-MM-DD HH:mm:ss")+".xlsx"),n.props.unblockUI()})).catch((function(e){n.props.unblockUI()}))}),100)})),n.getRolesPermissionsExcel=n.getRolesPermissionsExcel.bind(n),n}return(0,l.A)(t,e),(0,o.A)(t,[{key:"componentDidMount",value:function(){this.props.fetchUsers()}},{key:"componentWillUnmount",value:function(){this.props.clearUsers()}},{key:"render",value:function(){var e=this;return i.createElement("div",null,i.createElement("div",{className:"panel panel-default"},i.createElement("div",{className:"panel-body"},i.createElement("div",{className:"col-md-12 margin-10-top"},i.createElement(I,{getRolesPermissionsExcel:this.getRolesPermissionsExcel,refreshContactsData:function(){return e.refreshContactsData()}})),i.createElement("div",{className:"col-md-12 margin-10-top"},i.createElement(B,{users:this.props.users})))))}}])}(i.Component);const O=(0,u.Ng)((function(e){return{users:e.users}}),(function(e){return(0,m.zH)({fetchUsers:h,clearUsers:f,blockUI:H.o,unblockUI:H.r},e)}))(G)}}]);