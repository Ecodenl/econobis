"use strict";(self.webpackChunkeco=self.webpackChunkeco||[]).push([[7414],{87414:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var l=a(15671),r=a(43144),n=a(60136),c=a(82963),s=a(61120),o=a(67294),i=a(9669),m=a.n(i);const u=function(e){(0,n.Z)(u,e);var t,a,i=(t=u,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,l=(0,s.Z)(t);if(a){var r=(0,s.Z)(this).constructor;e=Reflect.construct(l,arguments,r)}else e=l.apply(this,arguments);return(0,c.Z)(this,e)});function u(e){var t;return(0,l.Z)(this,u),(t=i.call(this,e)).state={email:""},t}return(0,r.Z)(u,[{key:"onSubmit",value:function(e){var t=this;e.preventDefault();var a=this.state.email;m().post("".concat(URL_API,"/api/password/email"),{email:a}).then((function(e){t.refs.email.value="",t.setState({err:!1})})).catch((function(e){t.setState({err:!0}),t.refs.email.value=""}))}},{key:"onChange",value:function(e){var t=e.target.value;this.setState({email:t})}},{key:"render",value:function(){var e=this.state.err,t=e?"E-mail bestaat niet.":"We hebben je een e-mail gestuurd met een wachtwoord reset link!",a=e?"alert alert-danger":"alert alert-success";return o.createElement("div",null,o.createElement("div",{className:"container"},o.createElement("div",{className:"row"},o.createElement("div",{className:"col-md-8 col-md-offset-2"},o.createElement("div",{className:"panel panel-default"},o.createElement("div",{className:"panel-heading"},"Reset wachtwoord"),o.createElement("div",{className:"panel-body"},o.createElement("div",{className:"col-md-offset-2 col-md-8 col-md-offset-2"},null!=e&&o.createElement("div",{className:a,role:"alert"},t)),o.createElement("form",{className:"form-horizontal",role:"form",method:"POST",onSubmit:this.onSubmit.bind(this)},o.createElement("div",{className:"form-group"},o.createElement("label",{htmlFor:"email",className:"col-md-4 control-label"},"E-mailadres"),o.createElement("div",{className:"col-md-6"},o.createElement("input",{id:"email",type:"email",ref:"email",className:"form-control",name:"email",onChange:this.onChange.bind(this),required:!0}))),o.createElement("div",{className:"form-group"},o.createElement("div",{className:"col-md-6 col-md-offset-4"},o.createElement("button",{type:"submit",className:"btn btn-primary"},"Verstuur wachtwoord reset link"))))))))))}}]),u}(o.Component)}}]);