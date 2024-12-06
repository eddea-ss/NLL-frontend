import{F as A,q as R,s as V,t as M}from"./chunk-FGPVZFHG.js";import{b as k,c as L,f as T,g as F,j as z}from"./chunk-RTCM3YN2.js";import{B as m,C as u,D as g,Ea as E,L as c,Q as f,S,Ta as w,U as _,Ua as y,Y as t,Z as n,_ as d,ba as v,ca as b,da as s,ja as r,la as C,ra as h,v as p,w as x}from"./chunk-CPTTIT7F.js";function I(i,l){if(i&1){let e=v();t(0,"button",14),b("click",function(){m(e);let a=s(2);return u(a.openLink())}),r(1," Modelo de formaci\xF3n realizado "),g(),t(2,"svg",15),d(3,"path",16),n()()}}function D(i,l){if(i&1){let e=v();t(0,"div",10)(1,"button",17),b("click",function(){m(e);let a=s(2);return u(a.openLink())}),r(2," Realizar Modelo de Formaci\xF3n para emprendedores "),n()()}}function P(i,l){if(i&1){let e=v();t(0,"button",18),b("click",function(){m(e);let a=s(2);return u(a.openLink())}),r(1," Modelo de Startup | Emprendimiento realizado "),g(),t(2,"svg",15),d(3,"path",16),n()()}}function N(i,l){if(i&1){let e=v();t(0,"div",13)(1,"button",19),b("click",function(){m(e);let a=s(2);return u(a.openLinkStartup())}),r(2," Realizar Modelo de Startup "),n(),t(3,"button",19),b("click",function(){m(e);let a=s(2);return u(a.openLinkEmprendimiento())}),r(4," Realizar Modelo de Emprendimiento "),n()()}}function O(i,l){if(i&1&&(t(0,"section",1)(1,"h1",2),d(2,"strong"),r(3),n(),t(4,"div",3)(5,"div",4)(6,"div",5)(7,"h2",6),r(8," Completa modelo de formaci\xF3n de emprendedores "),n(),t(9,"p",7),r(10," Actualmente, tu Modelo de formaci\xF3n de emprendedores no ha sido completado. Te invitamos a contestar este modelo y a conocer las acciones necesarias para alcanzar la madurez tecnol\xF3gica. Para completar el modelo y acceder a todas sus funcionalidades. "),n(),t(11,"p",7),r(12," Por favor, haz clic en el bot\xF3n a continuaci\xF3n: "),n()()(),t(13,"div",8),f(14,I,4,0,"button",9)(15,D,3,0,"div",10),n()(),t(16,"div",11)(17,"div",5)(18,"h2",6),r(19," Completa modelo para Startups o Emprendedores "),n(),t(20,"p",7),r(21," Actualmente, tu Modelo de formaci\xF3n de emprendedores o de Startup no ha sido completado. Te invitamos a contestar este modelo y a conocer las acciones necesarias para alcanzar la madurez tecnol\xF3gica. Para completar el modelo y acceder a todas sus funcionalidades. "),n(),t(22,"p",7),r(23," Por favor, haz clic en el bot\xF3n a continuaci\xF3n: "),n()(),t(24,"div"),f(25,P,4,0,"button",12)(26,N,5,0,"div",13),n()()()),i&2){let e,o=s();c(3),C(" ",(e=(e=o.currentUser())==null||e.nombreRepresentante==null?null:e.nombreRepresentante.toLocaleUpperCase())!==null&&e!==void 0?e:"No disponible"," "),c(11),_(o.formacionEmprendedores()?14:15),c(11),_(o.startup()?25:26)}}function j(i,l){if(i&1&&(t(0,"section",20),d(1,"app-title-section",21),n(),t(2,"section"),d(3,"app-step-register",22),n()),i&2){let e=s();c(),S("title","Modelo de Formaci\xF3n para emprendedores")("description","Completa tu modelo de Formaci\xF3n para emprendedores o startup y te ayudaremos a crecer en la region de los Lagos.")("buttonText","Haz clic en el bot\xF3n a continuaci\xF3n y comienza ahora.")("buttonLink","/registro-persona")("imageSrc","assets/hero.webp")("imageAlt","mockup"),c(2),S("steps",e.steps)}}var U=class i{loginService=p(T);formacionEmprendedoresService=p(z);startupService=p(F);title=p(y);meta=p(w);authState=this.loginService.authState;currentUser=this.loginService.currentUser;AuthState=L;Role=k;breadcrumbs=A;steps=[{title:"Reg\xEDstrate",description:"Haz clic en el bot\xF3n Registrarse en la barra de navegaci\xF3n y selecciona la opci\xF3n Cuenta Startup o Emprendedor. \xA1Empieza ahora y con\xE9ctate con la regi\xF3n!"},{title:"Completa tu Modelo",description:"Completa tu modelo de Formaci\xF3n para emprendedores y comparte los datos necesarios para que podamos conectarte con la regi\xF3n. \xA1Empieza ahora y abre la puerta a nuevas oportunidades!"},{title:"Descubre",description:" Descubre las acciones clave para promoverte en la Regi\xF3n de los Lagos. Accede a cursos, art\xEDculos, opciones de financiamiento y muchos otros recursos informativos dise\xF1ados para tu \xE9xito. \xA1Empieza hoy mismo y lleva tu negocio al siguiente nivel!"}];formacionEmprendedores=this.formacionEmprendedoresService.formacionEmprendedores;startup=this.startupService.startupEmprendedores;constructor(){E(()=>{let l=this.authState(),e=this.currentUser();l==="LOGGED_IN"&&e?.rol.nombreRol.toLocaleLowerCase()==="usuario".toLowerCase()&&(this.formacionEmprendedoresService.recheckData(),this.formacionEmprendedoresService.recheckData())})}ngOnInit(){this.title.setTitle("Modelo Startup y Emprendedores | Nuevo Los Lagos"),this.meta.updateTag({name:"description",content:"Completa tu modelo de Formaci\xF3n para emprendedores o startup y te ayudaremos a crecer en la region de los Lagos."})}openLink(){this.formacionEmprendedoresService.openLink()}openLinkStartup(){this.startupService.openLink("STARTUP")}openLinkEmprendimiento(){this.startupService.openLink("EMPRENDIMIENTO")}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=x({type:i,selectors:[["app-evaluaciones-startup"]],standalone:!0,features:[h],decls:4,vars:3,consts:[[3,"breadcrumbs"],[1,"max-w-7xl","mx-auto","px-4","py-8"],[1,"text-4xl","font-bold","text-gray-700","mb-8"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-8"],[1,"lg:col-span-2"],[1,"mb-8"],[1,"text-2xl","text-gray-600","mb-4"],[1,"text-gray-500","mb-6"],[1,"lg:col-span-1",2,"align-self","flex-end"],["disabled","",1,"my-1","w-full","border","border-blue-700","p-8","bg-white-700","flex","text-blue-700"],[1,"lg:col-span-1"],[1,"lg:col-span-2",2,"margin-top","3em"],["disabled","",1,"my-1","w-full","border","border-blue-700","p-8","bg-white-700","flex","text-blue-700",2,"max-width","350px"],[1,"lg:col-span-1","flex",2,"gap","20px","justify-content","center"],["disabled","",1,"my-1","w-full","border","border-blue-700","p-8","bg-white-700","flex","text-blue-700",3,"click"],["aria-hidden","true","fill","currentColor","viewBox","0 0 20 20","xmlns","http://www.w3.org/2000/svg",1,"w-5","h-5","text-blue-700"],["fill-rule","evenodd","d","M16.707 5.293a1 1 0 010 1.414L8.414 15 5 11.586a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z","clip-rule","evenodd"],[1,"my-1","w-full","border","border-blue-700","p-8","bg-white-700","flex","text-blue-700","hover:bg-gray-100","transition",3,"click"],["disabled","",1,"my-1","w-full","border","border-blue-700","p-8","bg-white-700","flex","text-blue-700",2,"max-width","350px",3,"click"],[1,"my-1","w-full","border","border-blue-700","p-8","bg-white-700","flex","text-blue-700","hover:bg-gray-100","transition",2,"max-width","350px",3,"click"],[1,"relative","overflow-hidden","bg-white-50"],[3,"title","description","buttonText","buttonLink","imageSrc","imageAlt"],[3,"steps"]],template:function(e,o){if(e&1&&(d(0,"app-breadcrumbs",0),t(1,"div"),f(2,O,27,3,"section",1)(3,j,4,7),n()),e&2){let a;S("breadcrumbs",o.breadcrumbs),c(2),_(o.authState()===o.AuthState.LoggedIn&&((a=o.currentUser())==null||a.rol==null?null:a.rol.nombreRol)===o.Role.Usuario?2:-1),c(),_(o.authState()===o.AuthState.LoggedOut?3:-1)}},dependencies:[R,V,M]})};export{U as a};