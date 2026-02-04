@import url('https://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic,Droid%20Sans:400,700,Inconsolata:400,700');

:root {
--portal-main-background-color: {{ (!empty($defaultPortalSettingsLayout->portal_main_background_color) ? $defaultPortalSettingsLayout->portal_main_background_color : '#f5f5f5') }};
--portal-main-text-color: {{ (!empty($defaultPortalSettingsLayout->portal_main_text_color) ? $defaultPortalSettingsLayout->portal_main_text_color : '#000000') }};
--portal-background-color: {{ (!empty($defaultPortalSettingsLayout->portal_background_color) ? $defaultPortalSettingsLayout->portal_background_color : '#034b8c') }};
--portal-background-text-color: {{ (!empty($defaultPortalSettingsLayout->portal_background_text_color) ? $defaultPortalSettingsLayout->portal_background_text_color : '#ffffff') }};
--main-primary-rgba: {{ (!empty($defaultPortalSettingsLayout->login_header_background_color) ? $defaultPortalSettingsLayout->login_header_background_color : 'rgba(3, 75, 140, 0.9)') }};
--main-primary-rgba-text-color: {{ (!empty($defaultPortalSettingsLayout->login_header_background_text_color) ? $defaultPortalSettingsLayout->login_header_background_text_color : '#333333') }};
--main-header-portal-icon-color: {{ (!empty($defaultPortalSettingsLayout->header_icons_color) ? $defaultPortalSettingsLayout->header_icons_color : '#ffffff') }};
--main-secondary-color: {{ (!empty($defaultPortalSettingsLayout->login_field_background_color) ? $defaultPortalSettingsLayout->login_field_background_color : '#3898EC') }};
--main-secondary-text-color: {{ (!empty($defaultPortalSettingsLayout->login_field_background_text_color) ? $defaultPortalSettingsLayout->login_field_background_text_color : '#ffffff') }};
--button-primary-color: {{ (!empty($defaultPortalSettingsLayout->button_color) ? $defaultPortalSettingsLayout->button_color : '#3898EC') }};
--button-primary-text-color: {{ (!empty($defaultPortalSettingsLayout->button_text_color) ? $defaultPortalSettingsLayout->button_text_color : '#ffffff') }};
--main-warning-color: #dc3545;
--black-color: #252525;
--main-login-background-image-url: url({{ (!empty($defaultPortalSettingsLayout->portal_image_bg_file_name_login) ? 'images/' . $defaultPortalSettingsLayout->portal_image_bg_file_name_login . '?v=' . $imageHash : 'images/page-head5.png?v=' . $imageHash ) }});
--main-header-background-image-url: url({{ (!empty($defaultPortalSettingsLayout->portal_image_bg_file_name_header) ? 'images/' . $defaultPortalSettingsLayout->portal_image_bg_file_name_header . '?v=' . $imageHash : 'images/page-head5.png?v=' . $imageHash ) }});
}

/* ----------------- LOGIN STYLING -----------------*/
.authorization-container {
background-color: #ffffff;
background-image: -webkit-gradient(linear, left top, left bottom, from(var(--main-primary-rgba)), to(var(--main-primary-rgba))), var(--main-login-background-image-url);
background-image: linear-gradient(180deg, var(--main-primary-rgba), var(--main-primary-rgba)), var(--main-login-background-image-url);
background-position: 0px 0px, 50% 50%;
background-size: auto, cover;
font-family: Montserrat, sans-serif;
color: var(--main-primary-rgba-text-color);
height: 100%;
width: 100vw;
position: fixed;
left: 0;
right: 0;
top: 0;
bottom: 0;
overflow: auto;
}

.authorization-button.authorization-button {
width: 100%;
border-radius: 7px;
background-color: var(--button-primary-color);
border-color: var(--button-primary-color);
color: var(--button-primary-text-color);
font-weight: 600;
text-align: center;
}

.authorization-button.btn-primary:hover, .authorization-button.btn-primary:active, .authorization-button.btn-primary:focus, .authorization-button.btn-primary:disabled {
background-color: white;
border-color: var(--button-primary-color);
color: black;
outline: none;
opacity: 1;
}

.fixed-height {
height: 100%;
}

.authorization-input {
border: 1px solid hsla(0, 0%, 100%, 0.5);
border-radius: 7px;
background-color: transparent;
color: #fff;
}

#name-new-acount[type="text"]{
text-align: left;
}
#first_name-new-acount[type="text"]{
text-align: left;
}
#last_name-new-acount[type="text"]{
text-align: left;
}
#email-new-acount[type="text"]{
text-align: left;
}

.authorization-link {
display: inline-block;
margin-top: 10px;
color: var(--main-primary-rgba-text-color);
text-align: center;
}

.authorization-link:hover, .authorization-link:active {
color: var(--main-primary-rgba-text-color);
}

@font-face {
font-family: "password-mask";
src: url(data:font/woff;charset:utf-8;base64,d09GRgABAAAAAAusAAsAAAAAMGgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAPgAAAFZjRmM5Y21hcAAAAYQAAAgCAAArYmjjYVVnbHlmAAAJiAAAAEEAAABQiOYj2mhlYWQAAAnMAAAALgAAADYOxVFUaGhlYQAACfwAAAAcAAAAJAqNAyNobXR4AAAKGAAAAAgAAAAIAyAAAGxvY2EAAAogAAAABgAAAAYAKAAAbWF4cAAACigAAAAeAAAAIAEOACJuYW1lAAAKSAAAAUIAAAKOcN63t3Bvc3QAAAuMAAAAHQAAAC5lhHRpeJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGScwDiBgZWBgSGVtYKBgVECQjMfYEhiYmFgYGJgZWbACgLSXFMYHIAq/rNfAHK3gEmgASACAIekCT4AAHic7dhl0zDVmUXh5+XFHYK7E0IguFtwt4QQgmtwd3d3d7cED+4SXIO7u7vbsNfaUzU1fyGcu66u1adOf+6uHhgYGGpgYGDwL37/iyEHBoZZcWDQLzUw9NK/7A5if/DA8OwPOfQknBky+0P8/PPPOcd1UJ785frr/Dq/zq/z6/w3zsCgoX/xX74GRsxbcYpRB1iDB/7PGvT/DFGDenBwe8hKD1XpoSs9TKWHrfRwlR6+0iNUesRKj1TpkSs9SqVHrfRolR690r+p9BiVHrPSY1V67EqPU+lxKz1epcev9ASVnrDSE1V64kpPUulJKz1ZpSev9BSVnrLSU1V66kr/ttLTVPp3lZ62/KJSerpKT1/pP1R6hkrPWOmZKj1zpWep9KyVnq3Ss1d6jkrPWem5Kj13peep9LyVnq/S81d6gUr/sdILVnqhSi9c6UUqvWilF6v04pVeotJLVnqpSi9d6WUqvWyll6v08pVeodIrVvpPlf5zpVeq9F8qvXKl/1rpVSr9t0qvWunVKr16pdeo9JqVXqvSa1d6nUqvW+n1Kr1+pTeo9N8rvWGlN6r0xpXepNKbVnqzSm9e6S0qvWWlt6r01pXeptLbVnq7Sm9f6R0qvWOld6r0zpXepdK7Vnq3Su9e6T0qvWel96r03pXep9L7Vnq/Su9f6QMqfWClD6r0wZU+pNKHVvqwSh9e6SMqfWSlj6r00ZU+ptLHVvq4Sh9f6RMqfWKlT6r0yZU+pdKnVvq0Sp9e6TMqfWalz6r02ZU+p9LnVvq8Sp9f6QsqfWGl/1Hpf1b6okpfXOlLKn1ppS+r9OWVvqLS/6r0lZW+qtJXV/qaSl9b6esqfX2lb6j0jZW+qdI3V/qWSt9a6dsqfXul76j0vyt9Z6XvqvTdlb6n0vdW+r5K31/pByr9YKUfqvTDlX6k0v+p9KOVfqzSj1f6iUo/WemnKv10pZ+p9LOVfq7Sz1f6hUq/WOmXKv1ypV+p9KuVfq3Sr1f6jUq/Wem3Kv12pd+p9LuVfq/S71f6g0p/WOmPKv1xpT+p9KeV/qzSn1f6i0p/WemvKv11pb+p9LeV/q7S31f6h0r/WOmfKv1zDfI26KKHED1Y9JCihxI9tOhhRA8rejjRw4seQfSIokcSPbLoUUSPKno00aOL/o3oMUSPKXos0WOLHkf0uKLHEz2+6AlETyh6ItETi55E9KSiJxM9uegpRE8peirRU4v+rehpRP9O9LSify96OtHTi/6D6BlEzyh6JtEzi55F9KyiZxM9u+g5RM8pei7Rc4ueR/S8oucTPb/oBUT/UfSCohcSvbDoRUQvKnox0YuLXkL0kqKXEr206GVELyt6OdHLi15B9Iqi/yT6z6JXEv0X0SuL/qvoVUT/TfSqolcTvbroNUSvKXot0WuLXkf0uqLXE72+6A1E/130hqI3Er2x6E1Ebyp6M9Gbi95C9JaitxK9tehtRG8rejvR24veQfSOoncSvbPoXUTvKno30buL3kP0nqL3Er236H1E7yt6P9H7iz5A9IGiDxJ9sOhDRB8q+jDRh4s+QvSRoo8SfbToY0QfK/o40ceLPkH0iaJPEn2y6FNEnyr6NNGniz5D9JmizxJ9tuhzRJ8r+jzR54u+QPSFov8h+p+iLxJ9sehLRF8q+jLRl4u+QvS/RF8p+irRV4u+RvS1oq8Tfb3oG0TfKPom0TeLvkX0raJvE3276DtE/1v0naLvEn236HtE3yv6PtH3i35A9IOiHxL9sOhHRP9H9KOiHxP9uOgnRD8p+inRT4t+RvSzop8T/bzoF0S/KPol0S+LfkX0q6JfE/266DdEvyn6LdFvi35H9Lui3xP9vugPRH8o+iPRH4v+RPSnoj8T/bnoL0R/Kfor0V+L/kb0t6K/E/296B9E/yj6J9E/K/2/v/npoocQPVj0kKKHEj206GFEDyt6ONHDix5B9IiiRxI9suhRRI8qejTRo4v+jegxRI8peizRY4seR/S4oscTPb7oCURPKHoi0ROLnkT0pKInEz256ClETyl6KtFTi/6t6GlE/070tKJ/L3o60dOL/oPoGUTPKHom0TOLnkX0rKJnEz276DlEzyl6LtFzi55H9Lyi5xM9v+gFRP9R9IKiFxK9sOhFRC8qejHRi4teQvSSopcSvbToZUQvK3o50cuLXkH0iqL/JPrPolcS/RfRK4v+q+hVRP9N9KqiVxO9uug1RK8pei3Ra4teR/S6otcTvb7oDUT/XfSGojcSvbHoTURvKnoz0ZuL3kL0lqK3Er216G1Ebyt6O9Hbi95B9I6idxK9s+hdRO8qejfRu4veQ/SeovcSvbfofUTvK3o/0fuLPkD0gaIPEn2w6ENEHyr6MNGHiz5C9JGijxJ9tOhjRB8r+jjRx4s+QfSJok8SfbLoU0SfKvo00aeLPkP0maLPEn226HNEnyv6PNHni75A9IWi/yH6n6IvEn2x6EtEXyr6MtGXi75C9L9EXyn6KtFXi75G9LWirxN9vegbRN8o+ibRN4u+RfStom8TfbvoO0T/W/Sdou8Sfbfoe0TfK/o+0feLfkD0g6IfEv2w6EdE/0f0o6IfE/246CdEPyn6KdFPi35G9LOinxP9vOgXRL8o+iXRL4t+RfSrol8T/broN0S/Kfot0W+Lfkf0u6LfE/2+6A9Efyj6I9Efi/5E9KeiPxP9uegvRH8p+ivRX4v+RvS3or8T/b3oH0T/KPon0T9rYND/AOaSEScAAHicY2BiAAKmPSy+QEqUgYFRUURcTFzMyNzM3MxEXU1dTYmdjZ2NccK/K5oaLm6L3Fw0NOEMZoVAFD6IAQD4PA9iAAAAeJxjYGRgYADirq+zjOP5bb4ycLNfAIowXCttkUWmmfaw+AIpDgYmEA8ANPUJwQAAeJxjYGRgYL/AAATMCiCSaQ8DIwMqYAIAK/QBvQAAAAADIAAAAAAAAAAoAAB4nGNgZGBgYGIQA2IGMIuBgQsIGRj+g/kMAArUATEAAHicjY69TsMwFIWP+4doJYSKhMTmoUJIqOnPWIm1ZWDq0IEtTZw2VRpHjlu1D8A7MPMczAw8DM/AifFEl9qS9d1zzr3XAK7xBYHqCHTdW50aLlj9cZ1057lBfvTcRAdPnlvUnz23mXj13MEN3jhBNC6p9PDuuYYrfHquU//23CD/eG7iVnQ9t9ATD57bWIgXzx3ciw+rDrZfqmhnUnvsx2kZzdVql4Xm1DhVFsqUqc7lKBiemjOVKxNaFcvlUZb71djaRCZGb+VU51ZlmZaF0RsV2WBtbTEZDBKvB5HewkLhwLePkhRhB4OU9ZFKTCqpzems6GQI6Z7TcU5mQceQUmjkkBghwPCszhmd3HWHLh+ze8mEpLvnT8dULRLWCTMaW9LUbanSGa+mUjhv47ZY7l67rgITDHiTf/mAKU76BTuXfk8AAHicY2BigAARBuyAiZGJkZmBJSWzOJmBAQALQwHHAAAA) format("woff");
}
.numeric-password {
font-family: password-mask;
}
.numeric-password::placeholder {
font-family: initial;
}

/* ----------------- GENERAL STYLING -----------------*/
:focus {outline:none;}
::-moz-focus-inner {border:0;}

.portal-body{
background-color: var(--portal-main-background-color) !important;
color: var(--portal-main-text-color) !important;
}

.content-section {
padding-top: 100px;
padding-bottom: 60px;
}

.content-heading {
color: var(--portal-background-color);
font-size: 24px;
font-weight: 400;
text-shadow: none;
}

.content-subheading {
color: var(--portal-background-color);
font-size: 20px;
font-weight: 200;
text-shadow: none;
margin-bottom: 15px;
}

.card-header_title {
color: var(--portal-background-color);
font-size: 18px;
font-weight: 400;
}

h5.card-title {
line-height: 0px;
margin-top: 0px;
}

.text-block {
padding-top: .375rem;
padding-bottom: .375rem;
min-height: 28px;
}

.text-block.placeholder {
padding: 2px 12px;
}

.text-block > .placeholder-message {
color: #999;
background: rgba(0, 0, 0, 0.04);
border-radius: 4px;
padding: 4px 3px;
min-height: 28px;
}

.image {
display: block;
max-width: 80%;
margin-right: auto;
margin-bottom: 40px;
margin-left: auto;
}

.full-height {
height: 100vh;
}

.dropdown-link:hover, .dropdown-link:active {
text-decoration: none;
}

/* ----------------- HEADER STYLING -----------------*/
.header-portal {
position: relative;
height: 128px;
background-image: -webkit-gradient(linear, left top, left bottom, from(var(--main-primary-rgba)), to(var(--main-primary-rgba))), var(--main-header-background-image-url);
background-image: linear-gradient(180deg, var(--main-primary-rgba), var(--main-primary-rgba)), var(--main-header-background-image-url);
background-position: 0px 0px, 50% 50%;
background-size: auto, cover;
background-repeat: repeat, no-repeat;
color: var(--main-primary-rgba-text-color);

}

.header-portal .profile-pic .dropdown-toggle{
color: var(--button-primary-text-color) !important;
}

.header-portal .bm-burger-bars {
background-color: var(--main-header-portal-icon-color) !important;
}

.header-portal .dropdown-toggle{
color: var(--main-header-portal-icon-color) !important;
}

.header-portal .dropdown-toggle .account-dropdown-text{
color: var(--main-primary-rgba-text-color) !important;
}


/* ----------------- INPUT STYLING -----------------*/
.has-error {
border: 1px solid var(--main-warning-color) !important;
background-color: white !important;
color: red !important;
}

.error-message {
color: var(--main-warning-color);
font-size: 11px;
font-weight: normal;
}

/* ----------------- LABEL STYLING -----------------*/
.field-label {
margin-top: 20px;
/*font-family: 'Droid Sans', sans-serif;*/
/*color: rgba(29, 29, 29, 0.5);*/
/*font-size: 12px;*/
/*text-shadow: none;*/
}
.field-label-text
{
padding-top: .375rem;
padding-bottom: .375rem;
min-height: 28px;
}
label.required:after {
content: " *";
color: red;
font-size: 18px;
}
/* ----------------- BUTTON STYLING -----------------*/
.btn-group .btn {
margin: 5px;
}

.w-button-group {
margin-bottom: 10px;
}

.w-button-group-left {
float: left !important;
left: 15px;
}

button.w-button {
background-color: var(--button-primary-color);
border-color: var(--button-primary-color);
color: var(--button-primary-text-color);
}

.save-btn {
background-color: #00d371;
border: #00ac5c;
}

.save-btn:hover, .save-btn:active {
background-color: #00ac5c !important;
border: #00ac5c !important;
color: white;
}

/* ----------------- Start HEADING MENU STYLING -----------------*/
.heading.in-menu {
margin-top: 100px;
padding-left: 20px;
font-family: 'Droid Sans', sans-serif;
color: hsla(0, 0%, 100%, 0.5);
text-align: left;
text-shadow: none;
}

.nav-link {
color: var(--portal-background-text-color) !important;
font-size: 1.15em;
}

.nav-link.w--current {
border-left: 1px solid var(--portal-background-text-color) !important;
color: var(--portal-background-text-color);
}

.nav-link:hover {
background-color: var(--portal-background-text-color) !important;
color: var(--portal-background-color) !important;
text-shadow: none;
}



/* ----------------- Start HAMBURGER MENU STYLING -----------------*/
/* Position and sizing of burger button */
.bm-burger-button {
position: relative;
width: 24px;
height: 20px;
margin: 20px;
z-index: 1000;
cursor: pointer;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
position: absolute;
height: 3px;
left: 0px;
right: 0px;
opacity: 1;
background: white;
border-radius: 5px;
}

.bm-burger-bar-1 {
top: 0;
}

.bm-burger-bar-2 {
top: 40%;
}

.bm-burger-bar-3 {
top: 80%;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
background: rgba(255, 255, 255, 0.9);
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
height: 24px;
width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
background: white;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
position: fixed;
height: 100%;
}

/* General sidebar styles */
.bm-menu {
background-color: var(--portal-background-color);
color: var(--portal-background-text-color);
padding: 0.5em 1.5em 0;
/*font-size: 1.15em;*/
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
color: #b8b7ad;
padding: 0.8em;
}

/* Individual item */
.bm-item {
display: inline-block;
}

.bm-overlay {
top: 0;
left: 0;
background: transparent !important;
z-index: 9999;
}
.bm-menu-wrap {
top: 0;
}


/* ----------------- End HAMBURGER MENU STYLING -----------------*/

/* ----------------- Start ARROW STEPS STYLING -----------------*/
/* Arrows CSS https://codepen.io/polinovskyi/pen/embZmw */

.arrow-steps .step {
font-size: 14px;
text-align: center;
color: #666;
cursor: default;
margin: 0 3px;
padding: 10px 10px 10px 30px;
min-width: 200px;
float: left;
position: relative;
background-color: #d9e3f7;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
transition: background-color 0.2s ease;
margin-bottom: 4px;
}

.arrow-steps .step:after,
.arrow-steps .step:before {
content: " ";
position: absolute;
top: 0;
right: -17px;
width: 0;
height: 0;
border-top: 19px solid transparent;
border-bottom: 21px solid transparent;
border-left: 17px solid #d9e3f7;
z-index: 2;
transition: border-color 0.2s ease;
}

.arrow-steps .step:before {
right: auto;
left: 0;
border-left: 17px solid white;
z-index: 0;
}

.arrow-steps .step:first-child:before {
border: none;
}

.arrow-steps .step:first-child {
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
}

.arrow-steps .step span {
position: relative;
}

.arrow-steps .step span:before {
opacity: 0;
content: "✔";
position: absolute;
top: -2px;
left: -20px;
}

.arrow-steps .step.done span:before {
opacity: 1;
-webkit-transition: opacity 0.3s ease 0.5s;
-moz-transition: opacity 0.3s ease 0.5s;
-ms-transition: opacity 0.3s ease 0.5s;
transition: opacity 0.3s ease 0.5s;
}

.arrow-steps .step.current {
background-color: var(--portal-background-color);
color: var(--portal-background-text-color);
}

.arrow-steps .step.current:after {
border-left: 17px solid var(--portal-background-color);
}

@media screen and (max-width: 992px) {
.arrow-steps .step {
font-size: 13px;
padding: 8px 8px 8px 24px;
min-width: 140px;
}

.arrow-steps .step:after,
.arrow-steps .step:before {
border-bottom: 17px solid transparent;
}
}

@media screen and (max-width: 768px) {
.arrow-steps .step {
font-size: 11px;
padding: 8px 8px 8px 18px;
min-width: 80px;
}

.arrow-steps .step:after,
.arrow-steps .step:before {
border-bottom: 17px solid transparent;
}
}

@media screen and (max-width: 576px) {
.arrow-steps .step {
font-size: 10px;
padding: 8px 8px 8px 18px;
min-width: 70px;
}

.arrow-steps .step:after,
.arrow-steps .step:before {
border-bottom: 17px solid transparent;
}
}

{{--@media (max-width: 479px) {--}}
{{--.body {--}}
{{--background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(3, 75, 140, 0.9)), to(rgba(3, 75, 140, 0.9))), var(--main-header-background-image-url);--}}
{{--background-image: linear-gradient(180deg, rgba(3, 75, 140, 0.9), rgba(3, 75, 140, 0.9)), var(--main-header-background-image-url);--}}
{{--background-position: 0px 0px, 100% 50%;--}}
{{--}--}}
{{--.div-block {--}}
{{--padding-right: 20px;--}}
{{--padding-left: 20px;--}}
{{--}--}}
{{--.text-input {--}}
{{--min-width: 240px;--}}
{{--}--}}
{{--.text-input.content._w-40 {--}}
{{--width: 100%;--}}
{{--}--}}
{{--.text-input.content._w-40._w-40-mob {--}}
{{--width: 25%;--}}
{{--}--}}
{{--.text-input.content._w-90 {--}}
{{--width: 100%;--}}
{{--}--}}
{{--.text-input.content._w-90._w-90-mob {--}}
{{--width: 91%;--}}
{{--}--}}
{{--.text-input.content._w-70 {--}}
{{--width: 100%;--}}
{{--}--}}
{{--.text-input.content._w-70._w-70-mob {--}}
{{--width: 71%;--}}
{{--}--}}
{{--.text-input.content._w-50 {--}}
{{--display: inline-block;--}}
{{--}--}}
{{--.button {--}}
{{--margin-bottom: 10px;--}}
{{--}--}}
{{--.login-button {--}}
{{--cursor: pointer;--}}
{{--}--}}
{{--.header-portal {--}}
{{--position: relative;--}}
{{--height: 128px;--}}
{{--}--}}
{{--.navbar {--}}
{{--position: fixed;--}}
{{--width: 100%;--}}
{{--background-color: transparent;--}}
{{--}--}}
{{--.container {--}}
{{--background-color: rgba(3, 75, 140, 0);--}}
{{--}--}}
{{--.icon {--}}
{{--color: #fff;--}}
{{--}--}}
{{--.nav-menu {--}}
{{--width: 100%;--}}
{{--background-color: #034b8c;--}}
{{--}--}}
{{--.nav-link {--}}
{{--display: block;--}}
{{--margin-left: 40px;--}}
{{--line-height: 32px;--}}
{{--}--}}
{{--.nav-link.w--current {--}}
{{--border-left: 1px solid #fff;--}}
{{--color: #fff;--}}
{{--}--}}
{{--.heading {--}}
{{--margin-left: 40px;--}}
{{--padding-left: 20px;--}}
{{--text-align: left;--}}
{{--}--}}
{{--.heading.in-menu {--}}
{{--margin-top: 100px;--}}
{{--}--}}
{{--.menu-button.w--open {--}}
{{--background-color: #034b8c;--}}
{{--}--}}
{{--.profile-pic {--}}
{{--position: absolute;--}}
{{--left: 50%;--}}
{{--top: auto;--}}
{{--right: auto;--}}
{{--bottom: -60px;--}}
{{--min-width: 120px;--}}
{{--height: 120px;--}}
{{--border: 4px solid #fff;--}}
{{--border-radius: 50%;--}}
{{---webkit-transform: translate(-50%, 0px);--}}
{{---ms-transform: translate(-50%, 0px);--}}
{{--transform: translate(-50%, 0px);--}}
{{--padding: 10px 20px;--}}
{{--z-index: 1000;--}}
{{--}--}}
{{--.heading-content {--}}
{{--margin-bottom: 0px;--}}
{{--}--}}
{{--}--}}

/* ----------------- End ARROW STEPS STYLING -----------------*/

/* ----------------- End DAY PICKER STYLING -----------------*/
.DayPickerInput-Overlay {
z-index: 99;
position: absolute;
left: 0;
z-index: 1;

background: white;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.DataTableDateFilter > .DayPickerInput > .DayPickerInput-OverlayWrapper {
position: absolute;
}

.DayPicker-overflow {
overflow: visible;
}

.DayPickerInput {
display: inline;
}

.DayPicker-Caption > div {
font-size: 1.2em;
}

.DayPicker {
display: inline-block;
font-size: .9em;
}

/* ----------------- End DAY PICKER STYLING -----------------*/

/* ----------------- PROFILE PIC STYLING -----------------*/
.profile-pic {
position: absolute;
left: 50%;
bottom: -60px;
min-width: 120px;
height: 120px;
border: 4px solid white;
background-color: var(--button-primary-color);
background-position: 50% 50%;
background-size: contain;
background-repeat: no-repeat;
color: var(--button-primary-text-color);
box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
-webkit-transform: translate(-50%, 0px);
-ms-transform: translate(-50%, 0px);
transform: translate(-50%, 0px);
justify-content: center;
align-items: center;
border-radius: 100%;
text-align: center;
display: flex;
text-wrap: normal;
z-index: 1000;
}

.alert-wrapper{
margin-top: 10px;
}

.profile-pic .profile-title {
color: var(--button-primary-text-color);
font-weight: bold;
white-space: nowrap;
margin: 20px;
}

.profile-pic .profile-sub-title {
font-size: 11px;
font-weight: normal;
white-space: nowrap;
}

/* ----------------- LOGO STYLING -----------------*/
header .header-logo {
max-width: 450px;
padding: 14px 0;
}
@media only screen and (max-width: 480px) {
header .header-logo {
max-width: 100px;
}
}
.header-logo img {
max-height: 100px;
}
.logo-container {
max-width: 200px;
}
.logo-container-small {
max-width: 150px;
margin-bottom: 10px;
}

/* ----------------- DROPDOWN USER STYLING -----------------*/
.dropdown-toggle {
margin-top: 10px;
background: transparent;
border: 0;
}

.dropdown-toggle:hover, .dropdown-toggle:active, .dropdown-toggle:hover {
background: transparent;
border: 0;
}

.btn-primary.dropdown-toggle {
background: transparent !important;
border: 0;
}

.btn-primary.dropdown-toggle:focus {
box-shadow: none !important;
}

.dropdown-menu {
font-size: 14px;
}

.dropdown-header {
color: var(--portal-background-color);
font-weight: bold;
}

.dropdown-item.disabled {
color: #999;
}

.dropdown-item > a {
color: var(--black-color);
}

{{--.dropdown-item:hover {--}}
{{--text-decoration: none;--}}
{{--background: var(--main-secondary-color);--}}
{{--color: var(--main-secondary-text-color);--}}
{{--}--}}

{{--.dropdown-item.active {--}}
{{--background: var(--main-secondary-color);--}}
{{--color: var(--main-secondary-text-color);--}}
{{--}--}}

/* ----------------- INPUT STYLING -----------------*/
.w-input,
.w-input-date,
.w-select {
display: block;
width: 100%;
padding: .375rem;
min-height: 28px;
margin-bottom: 10px;
font-size: 14px;
line-height: 1.428571429;
color: #333333;
vertical-align: middle;
background-color: white;
border: 1px solid #cccccc;
}
.w-input:focus,
.w-input-date:focus,
.w-select:focus {
{{--border-color: var(--main-secondary-color);--}}
outline: 0;
}
.w-input:-moz-placeholder,
.w-input-date:-moz-placeholder,
.w-select:-moz-placeholder {
{{--color: var(--main-secondary-text-color);--}}
}
.w-input::-moz-placeholder,
.w-input-date::-moz-placeholder,
.w-select::-moz-placeholder {
{{--color: var(--main-secondary-text-color);--}}
opacity: 1;
}
.w-input:-ms-input-placeholder,
.w-input-date:-ms-input-placeholder,
.w-select:-ms-input-placeholder {
{{--color: var(--main-secondary-text-color);--}}
}
.w-input::-webkit-input-placeholder,
.w-input-date::-webkit-input-placeholder,
.w-select::-webkit-input-placeholder {
{{--color: var(--main-secondary-text-color);--}}
}

.text-input {
width: 100%;
border-style: solid;
border-width: 1px;
border-color: hsla(0, 0%, 100%, 0.5);
border-radius: 7px;
background-color: var(--main-secondary-color);
color: var(--main-secondary-text-color);
font-weight: 500;
text-align: left;
}

.text-input.content {
border-style: none;
background-color: rgba(0, 0, 0, 0.03);
color: #1d1d1d;
font-weight: 500;
text-align: left;
}

.select-field-transparent {
background-color: var(--main-secondary-color);
color: var(--main-secondary-text-color);
border: 1px solid #fff !important;
border-radius: 7px !important;
text-align: left;
}
.select-field-transparent option {
background-color: white;
color: black;
}

.select-field {
border: 1px none #000;
}


.w-input[disabled],
.w-input-date[disabled],
.w-select[disabled],
.w-input[readonly],
.w-select[readonly],
fieldset[disabled] .w-input,
fieldset[disabled] .w-input-date,
fieldset[disabled] .w-select {
cursor: not-allowed;
background-color: #eeeeee;
}
textarea.w-input,
textarea.w-input-date,
textarea.w-select {
height: auto;
}
.w-select[multiple] {
height: auto;
}

/* ----------------- CHECKBOX STYLING -----------------*/
.checkbox {
position: absolute;
opacity: 0;
visibility: hidden;
}
.checkbox+span {
position: relative;
cursor: pointer;
padding: 0;
}
/* Box */
.checkbox+span:before {
content: "";
margin-right: 10px;
display: inline-block;
vertical-align: text-top;
width: 15px;
height: 15px;
background: transparent;
border: solid 2px #003F79;
border-radius: 3px;
}
/* Box hover */
.checkbox:hover+span:before {
}
/* Box checked */
.checkbox:checked+span:before {
background: #003F79;
}
/* Disabled state label */
.checkbox:disabled+span {
cursor: default;
}
/* Disabled box */
.checkbox:disabled+span:before {
cursor: default;
}

.checkbox-disabled {
pointer-events: none;
}
/* Checkmark */
.checkbox:checked+span:after {
content: "";
position: absolute;
left: 4px;
top: 10px;
background: white;
width: 2px;
height: 2px;
box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
-webkit-transform: rotate(45deg);
transform: rotate(45deg);
}

/* ----------------- IFRAME STYLING -----------------*/
iframe {
width: 100%;
height: 300px;
border: 1px solid #cccccc;
border-radius: 5px;
background-color: #d9e3f7;
margin-bottom: 10px;
}

/* ----------------- PDF PREVIEW STYLING -----------------*/

.pdf_viewer_wrapper {
text-align: center;
}
.pdf-viewer-page {
background-color: var(--portal-main-background-color) !important;
}
.pdf-viewer-page canvas {
display: inline-block !important;
}