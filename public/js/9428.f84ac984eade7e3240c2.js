(self.webpackChunkeco=self.webpackChunkeco||[]).push([[9428],{40394:(e,t,a)=>{"use strict";a.d(t,{Z:()=>c});var n=a(15671),i=a(43144),o=a(60136),l=a(82963),r=a(61120),s=a(67294),d=a(41355);var m=a(88601).Z;const c=function(e){(0,o.Z)(p,e);var t,a,c=(t=p,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,r.Z)(t);if(a){var i=(0,r.Z)(this).constructor;e=Reflect.construct(n,arguments,i)}else e=n.apply(this,arguments);return(0,l.Z)(this,e)});function p(e){var t;return(0,n.Z)(this,p),(t=c.call(this,e)).state={error:!1,errorMaxSize:!1},t}return(0,i.Z)(p,[{key:"onDropAccepted",value:function(e){var t=this;this.props.addAttachment(e),setTimeout((function(){t.props.closeUploadImage()}),500)}},{key:"onDropRejected",value:function(){this.setState({errorMaxSize:!0})}},{key:"render",value:function(){return s.createElement(d.Z,{closeModal:this.props.closeUploadImage,showConfirmAction:!1,title:"Upload bestand"},s.createElement("div",{className:"upload-file-content"},s.createElement(m,{accept:"image/jpeg, image/png, image/jpg",multiple:!1,className:"dropzone",onDropAccepted:this.onDropAccepted.bind(this),onDropRejected:this.onDropRejected.bind(this),maxSize:6291456},s.createElement("p",null,"Klik hier voor het uploaden van een bestand"),s.createElement("p",null,s.createElement("strong",null,"of")," sleep het bestand hierheen"))),this.state.error&&s.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Probeer nogmaals een bestand te uploaden."),this.state.errorMaxSize&&s.createElement("p",{className:"has-error-message"},"Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn."))}}]),p}(s.Component)},99428:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>j});var n=a(67294),i=a(15671),o=a(43144),l=a(97326),r=a(60136),s=a(82963),d=a(61120),m=a(4942),c=a(61409),p=a(48966),u=a.n(p),f=a(59687),h=a(9669),g=a.n(h),v=a(9181),C=a(49332),b=a(98688),w=a(14309),I=a(94307),y=a(37974),E=a(71840),N=a(40394),S=a(19789),T=a(82084),A=a(90329),Z=a(21606),x=a(7250),k=a(54138),O=a(30381),P=a.n(O),D=a(58492),M=a.n(D),z=a(778);function R(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function L(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?R(Object(a),!0).forEach((function(t){(0,m.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):R(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var B=function(e){(0,r.Z)(h,e);var t,a,p=(t=h,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,d.Z)(t);if(a){var i=(0,d.Z)(this).constructor;e=Reflect.construct(n,arguments,i)}else e=n.apply(this,arguments);return(0,s.Z)(this,e)});function h(e){var t;return(0,i.Z)(this,h),t=p.call(this,e),(0,m.Z)((0,l.Z)(t),"closeUploadImage",(function(){t.setState({showModalUploadImage:!1})})),(0,m.Z)((0,l.Z)(t),"toggleUploadImage",(function(e){t.setState({showModalUploadImage:!t.state.showModalUploadImage,imageItemName:e})})),(0,m.Z)((0,l.Z)(t),"addImage",(function(e,a,n){t.setState(L(L({},t.state),{},{image:e[0],useAutoCropper:n,showModalCropImage:!0}))})),(0,m.Z)((0,l.Z)(t),"closeShowCrop",(function(){t.setState({showModalCropImage:!1})})),(0,m.Z)((0,l.Z)(t),"cropImage",(function(e){t.setState(L(L({},t.state),{},{administration:L(L({},t.state.administration),{},{attachment:e,filename:e.name,logoName:e.name,src:e.name}),showModalCropImage:!1}))})),(0,m.Z)((0,l.Z)(t),"handleInputChange",(function(e){var a=e.target,n="checkbox"===a.type?a.checked:a.value,i=a.name;t.setState(L(L({},t.state),{},{administration:L(L({},t.state.administration),{},(0,m.Z)({},i,n))}))})),(0,m.Z)((0,l.Z)(t),"handleInputChangeDate",(function(e,a){t.setState(L(L({},t.state),{},(0,m.Z)({},a,e)))})),(0,m.Z)((0,l.Z)(t),"handleSubmit",(function(e){e.preventDefault();var a=t.state.administration,n={},i=!1;u().isEmpty(a.name+"")&&(n.name=!0,i=!0);var o=a.countryId;if(u().isEmpty(a.countryId+"")&&(o="NL"),u().isEmpty(a.postalCode+"")||("NL"==o?u().isPostalCode(a.postalCode,"NL"):u().isPostalCode(a.postalCode,"any"))||(n.postalCode=!0,n.countryId=!0,i=!0),u().isEmpty(a.administrationCode+"")||/^([\x2D0-9A-Z\\_a-z]+)$/.test(a.administrationCode)||(n.administrationCode=!0,i=!0),u().isEmpty(a.kvkNumber+"")||u().isInt(a.kvkNumber+"")||(n.kvkNumber=!0,i=!0),u().isEmpty(a.IBAN+"")||f.isValidIBAN(a.IBAN+"")||(n.IBAN=!0,i=!0),u().isEmpty(a.email+"")||u().isEmail(a.email+"")||(n.email=!0,i=!0),u().isEmpty(a.emailBccNotas+"")||u().isEmail(a.emailBccNotas+"")||(n.emailBccNotas=!0,i=!0),u().isEmpty(a.website+"")||u().isURL(a.website+"")||(n.website=!0,i=!0),a.usesTwinfield){u().isEmpty(a.twinfieldConnectionType+"")&&(n.twinfieldConnectionType=!0,i=!0),"openid"===a.twinfieldConnectionType&&(u().isEmpty(a.twinfieldClientId+"")&&(n.twinfieldClientId=!0,i=!0),u().isEmpty(a.twinfieldClientSecret+"")&&(n.twinfieldClientSecret=!0,i=!0)),u().isEmpty(a.twinfieldOfficeCode+"")&&(n.twinfieldOfficeCode=!0,i=!0),u().isEmpty(a.twinfieldOrganizationCode+"")&&(n.twinfieldOrganizationCode=!0,i=!0);var l=!1;u().isEmpty(a.administrationCode+"")||t.props.administrationsPeek.map((function(e){return e.id!==a.id&&null!==e.administrationCode&&!u().isEmpty(e.administrationCode+"")&&e.administrationCode&&a.administrationCode&&e.administrationCode.toUpperCase()===a.administrationCode.toUpperCase()&&(l=!0)})),l&&(n.administrationCode=!0,i=!0);var r=!1;t.state.twinfieldInfoAdministrations.map((function(e){return e.twinfieldOfficeCode&&a.twinfieldOfficeCode&&e.twinfieldOfficeCode.toUpperCase()===a.twinfieldOfficeCode.toUpperCase()&&e.twinfieldOrganizationCode&&a.twinfieldOrganizationCode&&e.twinfieldOrganizationCode.toUpperCase()===a.twinfieldOrganizationCode.toUpperCase()&&e.id!==a.id&&(r=!0)})),r&&(n.twinfieldOfficeCode=!0,i=!0)}if(t.setState(L(L({},t.state),{},{errors:n})),!i){var s="Aan het laden";a.usesTwinfield&&(s="De koppeling Econobis Twinfield wordt gemaakt. Dit kan enige tijd duren"),t.setState(L(L({},t.state),{},{loadingText:s,isSaving:!0}));var d=new FormData;d.append("name",a.name),d.append("administrationCode",a.administrationCode),d.append("address",a.address),d.append("postalCode",a.postalCode),d.append("city",a.city),d.append("countryId",a.countryId),d.append("kvkNumber",a.kvkNumber),d.append("btwNumber",a.btwNumber),d.append("IBAN",a.IBAN),d.append("ibanAttn",a.ibanAttn),d.append("email",a.email),d.append("website",a.website),d.append("bic",a.bic),d.append("sepaContractName",a.sepaContractName),d.append("sepaCreditorId",a.sepaCreditorId),d.append("rsinNumber",a.rsinNumber),d.append("defaultPaymentTerm",a.defaultPaymentTerm),d.append("numberOfInvoiceReminders",a.numberOfInvoiceReminders),d.append("emailTemplateIdCollection",a.emailTemplateIdCollection),d.append("emailTemplateIdTransfer",a.emailTemplateIdTransfer),d.append("emailTemplateReminderId",a.emailTemplateReminderId),d.append("emailTemplateExhortationId",a.emailTemplateExhortationId),d.append("emailTemplateFinancialOverviewId",a.emailTemplateFinancialOverviewId),d.append("attachment",a.attachment),d.append("usesTwinfield",a.usesTwinfield),d.append("twinfieldConnectionType",a.twinfieldConnectionType),d.append("twinfieldUsername",a.twinfieldUsername),d.append("twinfieldPassword",a.twinfieldPassword),d.append("twinfieldClientId",a.twinfieldClientId),d.append("twinfieldClientSecret",a.twinfieldClientSecret),d.append("twinfieldOrganizationCode",a.twinfieldOrganizationCode),d.append("twinfieldOfficeCode",a.twinfieldOfficeCode),d.append("dateSyncTwinfieldContacts",a.dateSyncTwinfieldContacts),d.append("dateSyncTwinfieldPayments",a.dateSyncTwinfieldPayments),d.append("dateSyncTwinfieldInvoices",a.dateSyncTwinfieldInvoices),d.append("prefixInvoiceNumber",a.prefixInvoiceNumber),d.append("usesVat",a.usesVat),d.append("emailBccNotas",a.emailBccNotas),d.append("portalSettingsLayoutId",a.portalSettingsLayoutId),d.append("logoName",a.logoName),d.append("usesMollie",a.usesMollie),d.append("mollieApiKey",a.mollieApiKey),I.Z.newAdministration(d).then((function(e){c.nA.push("/administratie/".concat(e.data.id))})).catch((function(e){console.log(e)}))}})),t.state={showPreviewInvoice:!1,image:"",imageItemName:"",showModalUploadImage:!1,showModalCropImage:!1,useAutoCropper:!0,emailTemplates:[],mailboxAddresses:[],isSaving:!1,loadingText:"Aan het opslaan",administration:{name:"",administrationCode:"",address:"",postalCode:"",city:"",countryId:"",kvkNumber:"",btwNumber:"",IBAN:"",ibanAttn:"",email:"",website:"",bic:"",sepaContractName:"",sepaCreditorId:"",rsinNumber:"",defaultPaymentTerm:"",numberOfInvoiceReminders:3,logoName:"",emailTemplateIdCollection:"",emailTemplateIdTransfer:"",emailTemplateReminderId:"",emailTemplateExhortationId:"",emailTemplateFinancialOverviewId:"",attachment:"",mailboxId:"",usesTwinfield:!1,twinfieldConnectionType:"",twinfieldUsername:"",twinfieldPassword:"",twinfieldClientId:"",twinfieldClientSecret:"",twinfieldOrganizationCode:"",twinfieldOfficeCode:"",dateSyncTwinfieldContacts:"",dateSyncTwinfieldPayments:P()("2019-01-01").format("YYYY-MM-DD"),dateSyncTwinfieldInvoices:P()("2019-01-01").format("YYYY-MM-DD"),pendingInvoicesPresent:!1,oldestUnpaidInvoiceDate:"",oldestTwinfieldInvoiceDate:"",prefixInvoiceNumber:"F",usesVat:!0,emailBccNotas:"",portalSettingsLayoutId:"",usesMollie:!1,mollieApiKey:""},errors:{name:!1,administrationCode:!1,postalCode:!1,kvkNumber:!1,IBAN:!1,email:!1,website:!1,twinfieldConnectionType:!1,twinfieldUsername:!1,twinfieldPassword:!1,twinfieldClientId:!1,twinfieldClientSecret:!1,twinfieldOrganizationCode:!1,twinfieldOfficeCode:!1,dateSyncTwinfieldContacts:!1,dateSyncTwinfieldPayments:!1,dateSyncTwinfieldInvoices:!1,prefixInvoiceNumber:!1,mailboxId:!1,emailBccNotas:!1,countryId:!1},peekLoading:{emailTemplates:!0}},t.handleReactSelectChange=t.handleReactSelectChange.bind((0,l.Z)(t)),t}return(0,o.Z)(h,[{key:"componentDidMount",value:function(){var e=this;g().all([S.Z.fetchEmailTemplatesPeek(),A.Z.fetchMailboxesLoggedInUserPeek()]).then(g().spread((function(t,a){e.setState({emailTemplates:t,mailboxAddresses:a.data.data,peekLoading:L(L({},e.state.peekLoading),{},{emailTemplates:!1})})})))}},{key:"handleReactSelectChange",value:function(e,t){this.setState(L(L({},this.state),{},{administration:L(L({},this.state.administration),{},(0,m.Z)({},t,e))}))}},{key:"render",value:function(){var e=this,t=this.state.administration,a=t.name,i=t.administrationCode,o=t.address,l=t.postalCode,r=t.city,s=t.countryId,d=t.kvkNumber,m=t.btwNumber,c=t.IBAN,p=t.email,u=t.website,f=t.bic,h=t.sepaContractName,g=t.sepaCreditorId,I=t.rsinNumber,y=t.defaultPaymentTerm,S=t.numberOfInvoiceReminders,A=t.attachment,O=t.logoName,D=t.emailTemplateIdCollection,R=t.emailTemplateIdTransfer,L=t.emailTemplateReminderId,B=t.emailTemplateExhortationId,_=t.emailTemplateFinancialOverviewId,Y=t.ibanAttn,U=t.mailboxId,j=t.usesTwinfield,q=t.twinfieldConnectionType,F=t.twinfieldUsername,W=t.twinfieldPassword,K=t.twinfieldClientId,V=t.twinfieldClientSecret,G=t.twinfieldOrganizationCode,J=t.twinfieldOfficeCode,$=t.dateSyncTwinfieldContacts,H=t.dateSyncTwinfieldPayments,X=t.dateSyncTwinfieldInvoices,Q=t.pendingInvoicesPresent,ee=t.oldestUnpaidInvoiceDate,te=t.oldestTwinfieldInvoiceDate,ae=t.prefixInvoiceNumber,ne=t.usesVat,ie=t.emailBccNotas,oe=t.portalSettingsLayoutId,le=t.usesMollie,re=t.mollieApiKey,se=P()(P()("2019-01-01").format("YYYY-MM-DD")).format("YYYY-MM-DD"),de=P()(P()("2019-01-01").format("YYYY-MM-DD")).format("YYYY-MM-DD"),me=P()(P()("2019-01-01").format("YYYY-MM-DD")).format("YYYY-MM-DD");return n.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},n.createElement(w.Z,null,n.createElement(b.Z,null,n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"Naam",name:"name",value:a,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.name}),n.createElement(v.Z,{label:"Administratie code",name:"administrationCode",value:i,maxLength:5,onChangeAction:this.handleInputChange,error:this.state.errors.administrationCode})),n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"Adres",name:"address",value:o,onChangeAction:this.handleInputChange}),n.createElement(v.Z,{label:"Postcode",name:"postalCode",value:l,onChangeAction:this.handleInputChange,error:this.state.errors.postalCode})),n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"Plaats",name:"city",value:r,onChangeAction:this.handleInputChange}),n.createElement(E.Z,{label:"Land",id:"countryId",size:"col-sm-6",name:"countryId",options:this.props.countries,value:s,onChangeAction:this.handleInputChange,error:this.state.errors.countryId})),n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"KvK",name:"kvkNumber",value:d,onChangeAction:this.handleInputChange,error:this.state.errors.kvkNumber}),n.createElement(v.Z,{label:"BTW nummer",name:"btwNumber",value:m,onChangeAction:this.handleInputChange})),n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"IBAN",name:"IBAN",value:c,onChangeAction:this.handleInputChange,error:this.state.errors.IBAN}),n.createElement(v.Z,{label:"IBAN t.n.v.",name:"ibanAttn",value:Y,onChangeAction:this.handleInputChange})),n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"Website",name:"website",value:u,onChangeAction:this.handleInputChange,error:this.state.errors.website}),n.createElement(v.Z,{label:"Bic",name:"bic",value:f,onChangeAction:this.handleInputChange})),n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"Sepa contractnaam",name:"sepaContractName",value:h,onChangeAction:this.handleInputChange}),n.createElement(v.Z,{label:"Sepa crediteur id",name:"sepaCreditorId",value:g,onChangeAction:this.handleInputChange})),n.createElement("div",{className:"row"},n.createElement(T.Z,{label:"E-mail template nota incasso",name:"emailTemplateIdCollection",options:this.state.emailTemplates,value:D,onChangeAction:this.handleReactSelectChange,isLoading:this.state.peekLoading.emailTemplates}),n.createElement(v.Z,{label:"E-mail",name:"email",value:p,onChangeAction:this.handleInputChange,error:this.state.errors.email})),n.createElement("div",{className:"row"},n.createElement(T.Z,{label:"E-mail template nota overboeken",name:"emailTemplateIdTransfer",options:this.state.emailTemplates,value:R,onChangeAction:this.handleReactSelectChange,isLoading:this.state.peekLoading.emailTemplates}),n.createElement(v.Z,{label:"RSIN nummer",name:"rsinNumber",value:I,onChangeAction:this.handleInputChange})),n.createElement("div",{className:"row"},n.createElement(T.Z,{label:"E-mail template herinnering",name:"emailTemplateReminderId",options:this.state.emailTemplates,value:L,onChangeAction:this.handleReactSelectChange,isLoading:this.state.peekLoading.emailTemplates}),n.createElement(v.Z,{label:"Standaard betalingstermijn(dagen)",type:"number",min:"0",max:"9999",name:"defaultPaymentTerm",value:y,onChangeAction:this.handleInputChange})),n.createElement("div",{className:"row"},n.createElement(T.Z,{label:"E-mail template aanmaning",name:"emailTemplateExhortationId",options:this.state.emailTemplates,value:B,onChangeAction:this.handleReactSelectChange,isLoading:this.state.peekLoading.emailTemplates}),n.createElement(E.Z,{label:"Aantal keer herinneringen nota",id:"numberOfInvoiceReminders",size:"col-sm-6",name:"numberOfInvoiceReminders",options:[{id:"1",name:"1x"},{id:"2",name:"2x"},{id:"3",name:"3x"}],value:S,onChangeAction:this.handleInputChange,emptyOption:!1})),n.createElement("div",{className:"row"},n.createElement(T.Z,{label:"E-mail template waardestaat",name:"emailTemplateFinancialOverviewId",options:this.state.emailTemplates,value:_,onChangeAction:this.handleReactSelectChange,isLoading:this.state.peekLoading.emailTemplates}),n.createElement(v.Z,{label:"Prefix nota nummer",name:"prefixInvoiceNumber",value:ae,maxLength:5,onChangeAction:this.handleInputChange,error:this.state.errors.prefixInvoiceNumber})),n.createElement("div",{className:"row"},n.createElement(E.Z,{label:"Afzender van Rapportages en nota's is e-mail adres",id:"mailboxId",size:"col-sm-6",name:"mailboxId",options:this.state.mailboxAddresses,optionName:"email",value:U,onChangeAction:this.handleInputChange}),n.createElement(v.Z,{label:"Logo",divSize:"col-sm-6",value:A?A.name:O,onClickAction:function(){e.toggleUploadImage("logo-administration")},onChangeaction:function(){}})),n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"Nota's ook mailen in BCC naar",name:"emailBccNotas",value:ie,onChangeAction:this.handleInputChange,error:this.state.errors.emailBccNotas}),n.createElement("div",{className:"col-sm-6"},n.createElement("label",{className:"col-sm-6"}),n.createElement("div",{className:"col-sm-6"},n.createElement(M(),{src:A&&A.preview?A.preview:"",style:{border:"1px solid #999",display:"inline-block",padding:"1px",borderRadius:"1px",minWidth:"50px",height:"50px",boxShadow:"0 0 0 1px #fff inset"}})))),n.createElement("div",{className:"row"},n.createElement(T.Z,{label:"Portal instellingen layout",name:"portalSettingsLayoutId",options:this.props.portalSettingsLayouts,optionName:"description",value:oe,onChangeAction:this.handleReactSelectChange}),n.createElement(x.Z,{label:"Gebruikt BTW",value:ne?"Ja":"Nee",className:"col-sm-6 form-group",hidden:!0})),("support@econobis.nl"===this.props.meDetails.email||"software@xaris.nl"===this.props.meDetails.email)&&n.createElement("div",{className:"row"},n.createElement(Z.Z,{label:"Gebruikt Mollie",name:"usesMollie",value:le,onChangeAction:this.handleInputChange}),le&&n.createElement(v.Z,{label:"Mollie API key",name:"mollieApiKey",value:re,onChangeAction:this.handleInputChange})),n.createElement("div",{className:"row"},n.createElement("div",{className:"panel-part panel-heading"},n.createElement("span",{className:"h5 text-bold"},"Twinfield"))),n.createElement("div",{className:"row"},n.createElement(Z.Z,{label:"Gebruikt Twinfield",name:"usesTwinfield",value:j,onChangeAction:this.handleInputChange}),1==j&&n.createElement(E.Z,{label:"API connection type",id:"twinfieldConnectionType",name:"twinfieldConnectionType",options:this.props.twinfieldConnectionTypes,value:q,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.twinfieldConnectionType})),1==j&&n.createElement(n.Fragment,null,n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"Gebruikersnaam",name:"twinfieldUsername",value:F,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.twinfieldUsername}),n.createElement(v.Z,{label:"Wachtwoord",name:"twinfieldPassword",value:W,onChangeAction:this.handleInputChange,error:this.state.errors.twinfieldPassword,required:"required"})),n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"Client Id",name:"twinfieldClientId",value:K,onChangeAction:this.handleInputChange,error:this.state.errors.twinfieldClientId}),n.createElement(v.Z,{label:"Client Secret",name:"twinfieldClientSecret",value:V,onChangeAction:this.handleInputChange,error:this.state.errors.twinfieldClientSecret})),n.createElement("div",{className:"row"},n.createElement(v.Z,{label:"Omgeving",name:"twinfieldOrganizationCode",value:G,onChangeAction:this.handleInputChange,required:"required",error:this.state.errors.twinfieldOrganizationCode}),n.createElement(v.Z,{label:"Code",name:"twinfieldOfficeCode",value:J,onChangeAction:this.handleInputChange,error:this.state.errors.twinfieldOfficeCode,required:"required"})),n.createElement("div",{className:"row"},n.createElement(k.Z,{label:"Synchroniseer contacten vanaf",name:"dateSyncTwinfieldContacts",value:$,onChangeAction:this.handleInputChangeDate,disabledBefore:se,disabledAfter:X,readOnly:0==j,error:this.state.errors.dateSyncTwinfieldContacts,size:"col-sm-5",textToolTip:"Na het maken van de koppeling worden contacten met een nota in Econobis\n                                            aangemaakt in Twinfield vanaf deze datum (op basis van nota datum). De nota’s\n                                            uit Econobis worden niet overgezet. In Twinfield kunnen vervolgens oude nota’s\n                                            worden gekoppeld. Als deze datum leeg blijft dan begint de synchronisatie vanaf\n                                            de eerste datum van niet betaald nota’s synchroniseren. Deze synchronisatie\n                                            draait ook automatisch nachts."}),n.createElement(x.Z,{className:"col-sm-6 form-group",label:"Nota's in behandeling",value:Q?"Ja":"Nee",name:"pendingInvoicesPresent",textToolTip:"Nota's in behandeling zijn nota's met status 'Wordt definitief gemaakt',\n                                         'Fout bij maken', 'Wordt verstuurd', 'Opnieuw te verzenden' of 'Wordt opnieuw verstuurd'.\n                                          Zolang er nota's in behandeling zijn kunnen de datums \"Synchroniseer nota's vanaf\"\n                                          en \"Synchroniseer betalingen vanaf\" niet gewijzigd worden."})),n.createElement("div",{className:"row"},n.createElement(k.Z,{label:"Synchroniseer nota's vanaf",name:"dateSyncTwinfieldInvoices",value:X,onChangeAction:this.handleInputChangeDate,disabledBefore:de,disabledAfter:te,readOnly:0==j||Q,error:this.state.errors.dateSyncTwinfieldInvoices,size:"col-sm-5",textToolTip:"Niet betaalde nota’s, incl. de contacten worden vanaf deze datum (op basis van\n                                            nota datum) gesynchroniseerd met Twinfield. De datum kan niet liggen na de datum van de oudste gesynchroniseerde\n                                            nota. Deze synchronisatie moet handmatig aangevraagd worden."}),n.createElement(x.Z,{className:"col-sm-6 form-group",label:"Oudste nota datum gesynchroniseerd met Twinfield",value:te?P()(te).format("L"):""})),n.createElement("div",{className:"row"},n.createElement(k.Z,{label:"Synchroniseer betalingen vanaf",name:"dateSyncTwinfieldPayments",value:H,onChangeAction:this.handleInputChangeDate,disabledBefore:me,disabledAfter:ee,readOnly:0==j||Q,error:this.state.errors.dateSyncTwinfieldPayments,size:"col-sm-5",textToolTip:"In de nacht worden betalingen gesynchroniseerd. Dit gebeurt vanaf deze datum (op\n                                            basis van nota datum). De datum kan niet liggen na de datum van de oudste nog\n                                            niet betaalde nota."}),n.createElement(x.Z,{className:"col-sm-6 form-group",label:"Oudste nota datum met status niet betaald",value:ee?P()(ee).format("L"):""}))),this.state.showModalUploadImage&&n.createElement(N.Z,{closeUploadImage:this.closeUploadImage,addAttachment:this.addImage,imageItemName:this.state.imageItemName}),this.state.showModalCropImage&&n.createElement(z.Z,{closeShowCrop:this.closeShowCrop,useAutoCropper:this.state.useAutoCropper,image:this.state.image,imageItemName:this.state.imageItemName,cropImage:this.cropImage})),n.createElement(b.Z,null,n.createElement("div",{className:"pull-right btn-group",role:"group"},n.createElement(C.Z,{loading:this.state.isSaving,loadText:this.state.loadingText,buttonText:"Opslaan",onClickAction:this.handleSubmit,type:"submit",value:"Submit"})))))}}]),h}(n.Component);const _=(0,y.$j)((function(e){return{countries:e.systemData.countries,portalSettingsLayouts:e.systemData.portalSettingsLayouts,twinfieldConnectionTypes:e.systemData.twinfieldConnectionTypes,administrationsPeek:e.systemData.administrationsPeek,meDetails:e.meDetails}}))(B);var Y=a(55451);const U=function(){return n.createElement("div",{className:"row"},n.createElement("div",{className:"col-md-4"},n.createElement("div",{className:"btn-group btn-group-flex margin-small",role:"group"},n.createElement(Y.Z,{iconName:"arrowLeft",onClickAction:c.mW.goBack}))),n.createElement("div",{className:"col-md-4"},n.createElement("h4",{className:"text-center margin-small"},"Nieuwe administratie")),n.createElement("div",{className:"col-md-4"}))},j=function(){return n.createElement("div",{className:"row"},n.createElement("div",{className:"col-md-9"},n.createElement("div",{className:"col-md-12 margin-10-top"},n.createElement(w.Z,null,n.createElement(b.Z,{className:"panel-small"},n.createElement(U,null)))),n.createElement("div",{className:"col-md-12 margin-10-top"},n.createElement(_,null))),n.createElement("div",{className:"col-md-3"}))}},58492:(e,t,a)=>{"use strict";var n=a(82569);t.__esModule=!0,t.default=void 0;var i=n(a(66660)),o=n(a(50914)),l=n(a(69471)),r=n(a(94184)),s=n(a(67294)),d=n(a(45697)),m=a(38078),c={responsive:d.default.bool,rounded:d.default.bool,circle:d.default.bool,thumbnail:d.default.bool},p=function(e){function t(){return e.apply(this,arguments)||this}return(0,l.default)(t,e),t.prototype.render=function(){var e,t=this.props,a=t.responsive,n=t.rounded,l=t.circle,d=t.thumbnail,c=t.className,p=(0,o.default)(t,["responsive","rounded","circle","thumbnail","className"]),u=(0,m.splitBsProps)(p),f=u[0],h=u[1],g=((e={})[(0,m.prefix)(f,"responsive")]=a,e[(0,m.prefix)(f,"rounded")]=n,e[(0,m.prefix)(f,"circle")]=l,e[(0,m.prefix)(f,"thumbnail")]=d,e);return s.default.createElement("img",(0,i.default)({},h,{className:(0,r.default)(c,g)}))},t}(s.default.Component);p.propTypes=c,p.defaultProps={responsive:!1,rounded:!1,circle:!1,thumbnail:!1};var u=(0,m.bsClass)("img",p);t.default=u,e.exports=t.default},55670:(e,t)=>{"use strict";t.__esModule=!0,t.Style=t.State=t.DEVICE_SIZES=t.SIZE_MAP=t.Size=void 0,t.Size={LARGE:"large",SMALL:"small",XSMALL:"xsmall"},t.SIZE_MAP={large:"lg",medium:"md",small:"sm",xsmall:"xs",lg:"lg",md:"md",sm:"sm",xs:"xs"},t.DEVICE_SIZES=["lg","md","sm","xs"],t.State={SUCCESS:"success",WARNING:"warning",DANGER:"danger",INFO:"info"},t.Style={DEFAULT:"default",PRIMARY:"primary",LINK:"link",INVERSE:"inverse"}},38078:(e,t,a)=>{"use strict";var n=a(82569);t.__esModule=!0,t.prefix=d,t.getClassSet=function(e){var t,a=((t={})[d(e)]=!0,t);return e.bsSize&&(a[d(e,r.SIZE_MAP[e.bsSize]||e.bsSize)]=!0),e.bsStyle&&(a[d(e,e.bsStyle)]=!0),a},t.splitBsProps=function(e){var t={};return(0,i.default)(e).forEach((function(e){var a=e[0],n=e[1];f(a)||(t[a]=n)})),[u(e),t]},t.splitBsPropsAndOmit=function(e,t){var a={};t.forEach((function(e){a[e]=!0}));var n={};return(0,i.default)(e).forEach((function(e){var t=e[0],i=e[1];f(t)||a[t]||(n[t]=i)})),[u(e),n]},t.addStyle=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];c(a)(e)},t._curry=t.bsSizes=t.bsStyles=t.bsClass=void 0;var i=n(a(43562)),o=n(a(66660)),l=(n(a(41143)),n(a(45697))),r=a(55670);function s(e){return function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return"function"==typeof a[a.length-1]?e.apply(void 0,a):function(t){return e.apply(void 0,a.concat([t]))}}}function d(e,t){var a=(e.bsClass||"").trim();return null==a&&invariant(!1),a+(t?"-"+t:"")}var m=s((function(e,t){var a=t.propTypes||(t.propTypes={}),n=t.defaultProps||(t.defaultProps={});return a.bsClass=l.default.string,n.bsClass=e,t}));t.bsClass=m;var c=s((function(e,t,a){"string"!=typeof t&&(a=t,t=void 0);var n=a.STYLES||[],i=a.propTypes||{};e.forEach((function(e){-1===n.indexOf(e)&&n.push(e)}));var r=l.default.oneOf(n);return a.STYLES=n,r._values=n,a.propTypes=(0,o.default)({},i,{bsStyle:r}),void 0!==t&&((a.defaultProps||(a.defaultProps={})).bsStyle=t),a}));t.bsStyles=c;var p=s((function(e,t,a){"string"!=typeof t&&(a=t,t=void 0);var n=a.SIZES||[],i=a.propTypes||{};e.forEach((function(e){-1===n.indexOf(e)&&n.push(e)}));var s=[];n.forEach((function(e){var t=r.SIZE_MAP[e];t&&t!==e&&s.push(t),s.push(e)}));var d=l.default.oneOf(s);return d._values=s,a.SIZES=n,a.propTypes=(0,o.default)({},i,{bsSize:d}),void 0!==t&&(a.defaultProps||(a.defaultProps={}),a.defaultProps.bsSize=t),a}));function u(e){return{bsClass:e.bsClass,bsSize:e.bsSize,bsStyle:e.bsStyle,bsRole:e.bsRole}}function f(e){return"bsClass"===e||"bsSize"===e||"bsStyle"===e||"bsRole"===e}t.bsSizes=p;var h=s;t._curry=h},66660:(e,t,a)=>{var n=a(18428);function i(){return e.exports=i=n?n.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,i.apply(this,arguments)}e.exports=i,e.exports.__esModule=!0,e.exports.default=e.exports},69471:(e,t,a)=>{var n=a(5940),i=a(58791);e.exports=function(e,t){e.prototype=n(t.prototype),e.prototype.constructor=e,i(e,t)},e.exports.__esModule=!0,e.exports.default=e.exports},82569:e=>{e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports},50914:(e,t,a)=>{var n=a(26243);e.exports=function(e,t){if(null==e)return{};var a,i,o={},l=n(e);for(i=0;i<l.length;i++)a=l[i],t.indexOf(a)>=0||(o[a]=e[a]);return o},e.exports.__esModule=!0,e.exports.default=e.exports},58791:(e,t,a)=>{var n=a(22863);function i(t,a){return e.exports=i=n?n.bind():function(e,t){return e.__proto__=t,e},e.exports.__esModule=!0,e.exports.default=e.exports,i(t,a)}e.exports=i,e.exports.__esModule=!0,e.exports.default=e.exports}}]);