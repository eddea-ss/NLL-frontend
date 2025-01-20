import{A as Z,C as H,E as J,c as U,m as O,o as q,p as m,q as z,r as $,u as D,w as j,x as B,y as Q,z as Y}from"./chunk-QQUCLDFE.js";import{B as _,C as x,D as h,Ea as F,Fa as R,Ha as E,N as o,V as g,Wa as k,X as n,Xa as G,Ya as I,Za as T,_a as N,cb as P,ea as s,fa as a,ga as c,ha as y,ia as w,ib as V,jb as A,ka as C,ma as b,mb as L,na as l,pb as M,v,w as S,wa as p,ya as f}from"./chunk-BKSLIME4.js";var X=()=>[1,2,3,4,5],ee=(t,i)=>({"text-yellow-500":t,"text-gray-300":i});function te(t,i){if(t&1&&c(0,"input",24),t&2){let e=l().$implicit;n("formControlName",e.name)("id",e.name)("placeholder",e.placeholder)}}function ie(t,i){if(t&1&&c(0,"input",25),t&2){let e=l().$implicit;n("formControlName",e.name)("id",e.name)("placeholder",e.placeholder)}}function re(t,i){t&1&&(h(),c(0,"path",35))}function oe(t,i){t&1&&(h(),c(0,"path",36))}function ne(t,i){t&1&&(h(),c(0,"path",37))}function ae(t,i){t&1&&(h(),c(0,"path",38))}function se(t,i){if(t&1&&(s(0,"div",39)(1,"div",40),c(2,"span",41),p(3," Al menos 8 caracteres "),a(),s(4,"div",40),c(5,"span",41),p(6," Una letra may\xFAscula "),a(),s(7,"div",40),c(8,"span",41),p(9," Un car\xE1cter especial "),a(),s(10,"div",40),c(11,"span",41),p(12," Un n\xFAmero "),a()()),t&2){let e=l(3);o(2),n("ngClass",e.hasLength?"bg-green-500":"bg-gray-300"),o(3),n("ngClass",e.hasUppercase?"bg-green-500":"bg-gray-300"),o(3),n("ngClass",e.hasSpecialChar?"bg-green-500":"bg-gray-300"),o(3),n("ngClass",e.hasNumber?"bg-green-500":"bg-gray-300")}}function le(t,i){if(t&1){let e=C();s(0,"div")(1,"div",26),c(2,"input",27),s(3,"button",28),b("click",function(){_(e);let d=l().$implicit,u=l();return x(d.name==="password"?u.togglePasswordVisibility():u.toggleConfirmPasswordVisibility())}),h(),s(4,"svg",29),g(5,re,1,0,"path",30)(6,oe,1,0,"path",31)(7,ne,1,0,"path",32)(8,ae,1,0,"path",33),a()()(),g(9,se,13,4,"div",34),a()}if(t&2){let e=l().$implicit,r=l();o(2),n("type",e.name==="password"?r.isPasswordVisible?"text":"password":r.isConfirmPasswordVisible?"text":"password")("formControlName",e.name)("id",e.name)("placeholder",e.placeholder),o(2),n("ngClass",e.name==="password"&&r.isPasswordVisible||e.name==="password_confirm"&&r.isConfirmPasswordVisible?"text-gray-700":"text-gray-500"),o(),n("ngIf",e.name==="password"&&r.isPasswordVisible||e.name==="password_confirm"&&r.isConfirmPasswordVisible),o(),n("ngIf",e.name==="password"&&r.isPasswordVisible||e.name==="password_confirm"&&r.isConfirmPasswordVisible),o(),n("ngIf",e.name==="password"&&!r.isPasswordVisible||e.name==="password_confirm"&&!r.isConfirmPasswordVisible),o(),n("ngIf",e.name==="password"&&!r.isPasswordVisible||e.name==="password_confirm"&&!r.isConfirmPasswordVisible),o(),n("ngIf",e.name==="password")}}function pe(t,i){if(t&1&&(s(0,"option",45),p(1),a()),t&2){let e=i.$implicit;n("value",e.value),o(),f(" ",e.label," ")}}function de(t,i){if(t&1&&(s(0,"div")(1,"select",42)(2,"option",43),p(3),a(),g(4,pe,2,2,"option",44),a()()),t&2){let e=l().$implicit;o(),n("formControlName",e.name)("id",e.name),o(2),f(" ",e.placeholder," "),o(),n("ngForOf",e.options)}}function me(t,i){if(t&1){let e=C();y(0),h(),s(1,"svg",49),b("click",function(){let d=_(e).$implicit,u=l(2).$implicit,W=l();return x(W.rate(u.name,d))}),c(2,"path",50),a(),w()}if(t&2){let e,r=i.$implicit,d=l(2).$implicit,u=l();o(),n("ngClass",E(1,ee,((e=u.formGroup.get(d.name))==null?null:e.value)>=r,((e=u.formGroup.get(d.name))==null?null:e.value)<r))}}function ce(t,i){if(t&1&&(s(0,"div",51),p(1),a()),t&2){let e=l(2).$implicit;o(),f(" ",e.error," ")}}function ue(t,i){if(t&1&&(s(0,"div",46)(1,"div",47),g(2,me,3,4,"ng-container",48),a(),g(3,ce,2,1,"div",23),a()),t&2){let e,r=l().$implicit,d=l();o(2),n("ngForOf",R(2,X)),o(),n("ngIf",((e=d.formGroup.get(r.name))==null?null:e.invalid)&&((e=d.formGroup.get(r.name))==null?null:e.touched))}}function ge(t,i){if(t&1&&(s(0,"div",52),c(1,"span",41),p(2," Las contrase\xF1as coinciden "),a()),t&2){let e=l(2);o(),n("ngClass",e.passwordsMatch?"bg-green-500":"bg-gray-300")}}function fe(t,i){if(t&1&&(s(0,"div",51),p(1),a()),t&2){let e=l(2);o(),f(" ",e.errorGeneral," ")}}function ve(t,i){if(t&1&&(s(0,"div",51),p(1),a()),t&2){let e=l().$implicit;o(),f(" ",e.error," ")}}function he(t,i){if(t&1&&(s(0,"div",8)(1,"div",9)(2,"label",16),p(3),a(),y(4,17),g(5,te,1,3,"input",18)(6,ie,1,3,"input",19)(7,le,10,10,"div",20)(8,de,5,4,"div",20)(9,ue,4,3,"div",21),w(),g(10,ge,3,1,"div",22)(11,fe,2,1,"div",23)(12,ve,2,1,"div",23),a()()),t&2){let e,r=i.$implicit,d=l();o(2),n("for",r.name),o(),f(" ",r.label," "),o(),n("ngSwitch",r.type),o(),n("ngSwitchCase","text"),o(),n("ngSwitchCase","email"),o(),n("ngSwitchCase","password"),o(),n("ngSwitchCase","select"),o(),n("ngSwitchCase","rating"),o(),n("ngIf",r.name==="password_confirm"),o(),n("ngIf",r.name==="password_confirm"&&d.errorGeneral),o(),n("ngIf",((e=d.formGroup.get(r.name))==null?null:e.invalid)&&((e=d.formGroup.get(r.name))==null?null:e.touched))}}var K=class t{fb=v(H);route=v(L);registroService=v(U);title=v(A);meta=v(V);snackbar=v(O);selectedFile=null;formGroup;formFields=[];tipoRegistro;errorGeneral="";typeUser;formGeneral=[{type:"email",label:"Correo electr\xF3nico",name:"mail",placeholder:"********@*****.**",error:"Este campo es obligatorio.",validator:[m.required,m.email]},{type:"password",label:"Contrase\xF1a",name:"password",placeholder:"",error:"Este campo es obligatorio.",validator:[m.required]},{type:"password",label:"Confirmar contrase\xF1a",name:"password_confirm",placeholder:"",error:"Este campo es obligatorio.",validator:[m.required]}];formPersona=[{type:"text",label:"Nombre",name:"name",placeholder:"",error:"Este campo es obligatorio.",validator:[m.required]},{type:"text",label:"Rut",name:"rut",placeholder:"example 11111111-1",error:null,validator:[m.required]}];formIndustria4=[{type:"text",label:"Nombre de la Empresa",name:"name",placeholder:"",error:"Este campo es obligatorio.",validator:[m.required]},{type:"text",label:"RUT de la Empresa",name:"rut",placeholder:"example 11111111-1",error:"Este campo es obligatorio.",validator:[m.required]},{type:"text",label:"Nombre de Representante",name:"nameRepresentative",placeholder:"",error:null,validator:[m.required]},{type:"text",label:"RUT del Representante",name:"rutRepresentative",placeholder:"example 11111111-1",error:null,validator:[m.required]},{type:"rating",label:"\xBFQu\xE9 tan clara es la estrategia digital de tu organizaci\xF3n?",name:"questionStrategy",error:"Este campo es obligatorio.",validator:[m.required]},{type:"rating",label:"\xBFQu\xE9 tan complejos son los desaf\xEDos para implementar soluciones de la Industria 4.0 en tu organizaci\xF3n?",name:"questionSolution",error:"Este campo es obligatorio.",validator:[m.required]},{type:"rating",label:"\xBFQu\xE9 tan alta es la prioridad de la adopci\xF3n de tecnolog\xEDas digitales y la integraci\xF3n de la Industria 4.0 en tu organizaci\xF3n?",name:"questionAdoption",error:"Este campo es obligatorio.",validator:[m.required]}];SECTOR_OPTIONS=[{value:"ACUICULTURA",label:"Acuicultura"},{value:"CONSTRUCCION",label:"Construcci\xF3n"},{value:"ASTILLEROS",label:"Astilleros"},{value:"CARNICO",label:"C\xE1rnico"},{value:"LACTEO",label:"L\xE1cteo"},{value:"MAESTRANZA",label:"Maestranza"},{value:"TURISMO",label:"Turismo"},{value:"GENERAL",label:"General"}];formSector=[{type:"select",label:"Sector",name:"sector",options:this.SECTOR_OPTIONS,placeholder:"Selecciona un sector",error:"Este campo es obligatorio.",validator:[m.required]}];hasLength=!1;hasUppercase=!1;hasSpecialChar=!1;hasNumber=!1;passwordsMatch=!1;isPasswordVisible=!1;isConfirmPasswordVisible=!1;ngOnInit(){this.route.url.subscribe(i=>{this.tipoRegistro=i[0].path,this.initializeForm()}),this.title.setTitle("Registro | Nuevo Los Lagos"),this.meta.updateTag({name:"description",content:"Reg\xEDstrate ahora y forma parte de una red colaborativa. Descubre nuevas oportunidades de negocio y haz crecer tu impacto en la regi\xF3n de Los Lagos."})}initializeForm(){switch(this.tipoRegistro){case"registro-persona":this.formFields=[...this.formPersona,...this.formGeneral],this.tipoRegistro="usuario",this.typeUser="STARTUP";break;case"registro-industria":this.formFields=[...this.formIndustria4,...this.formSector,...this.formGeneral],this.tipoRegistro="empresa",this.typeUser="COMPANY";break;case"registro-proveedor":this.formFields=[...this.formIndustria4,...this.formSector,...this.formGeneral],this.tipoRegistro="proveedor",this.typeUser="SUPPLIER";break}this.formGroup=this.fb.group(this.formFields.reduce((i,e)=>(i[e.name]=["",e.validator],i),{})),this.formGroup.get("password")?.valueChanges.subscribe(i=>{this.validatePassword(i),this.checkPasswordsMatch()}),this.formGroup.get("password_confirm")?.valueChanges.subscribe(()=>this.checkPasswordsMatch())}rate(i,e){this.formGroup.get(i)?.setValue(e)}onSubmit(){if(!this.passwordsMatch){this.errorGeneral="Las contrase\xF1as no coinciden";return}if(!(this.hasLength&&this.hasUppercase&&this.hasSpecialChar&&this.hasNumber)){this.snackbar.show("La contrase\xF1a debe ser correcta",4e3);return}if(this.formGroup.valid){this.errorGeneral="";let i=this.typeUser==="STARTUP"?"INDEFINIDO":this.formGroup.get("sector")?.value,e=new FormData;e.append("mail",this.formGroup.value.mail),e.append("password",this.formGroup.value.password),e.append("rut",this.formGroup.value.rut),e.append("name",this.formGroup.value.name),e.append("role",this.typeUser||""),e.append("type",this.typeUser||""),e.append("sector",i),(this.typeUser==="COMPANY"||this.typeUser==="SUPPLIER")&&(e.append("nameRepresentative",this.formGroup.value.nameRepresentative),e.append("rutRepresentative",this.formGroup.value.rutRepresentative),e.append("questionStrategy",this.formGroup.value.questionStrategy?.toString()||"0"),e.append("questionSolution",this.formGroup.value.questionSolution?.toString()||"0"),e.append("questionAdoption",this.formGroup.value.questionAdoption?.toString()||"0")),this.selectedFile&&e.append("logo",this.selectedFile,this.selectedFile.name),this.registroService.register(e).subscribe({next:()=>{console.log("Registro exitoso")},error:r=>{console.error(r)}})}}checkPasswordsMatch(){let i=this.formGroup.get("password")?.value,e=this.formGroup.get("password_confirm")?.value;this.passwordsMatch=i===e&&i!==""}validatePassword(i){this.hasLength=i.length>=8,this.hasUppercase=/[A-Z]/.test(i),this.hasSpecialChar=/[!@#$%^&*(),.?":{}|<>]/.test(i),this.hasNumber=/[0-9]/.test(i)}togglePasswordVisibility(){this.isPasswordVisible=!this.isPasswordVisible}toggleConfirmPasswordVisibility(){this.isConfirmPasswordVisible=!this.isConfirmPasswordVisible}onFileSelected(i){let e=i.target;e.files&&e.files.length>0&&(this.selectedFile=e.files[0])}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=S({type:t,selectors:[["app-form-register"]],standalone:!0,features:[F],decls:23,vars:5,consts:[[1,"max-w-screen-lg","mx-auto",2,"padding","0px","align-content","center","min-height","100vh"],[1,"grid","grid-cols-1","md:grid-cols-12"],[1,"bg-gray-900","md:col-span-4","p-10","text-white"],[1,"mt-4","text-sm","leading-7","font-regular","uppercase"],[1,"text-3xl","sm:text-4xl","leading-normal","font-extrabold","tracking-tight"],[1,"mt-4","leading-7","text-gray-200",2,"margin-top","24px"],[1,"md:col-span-8","p-10",2,"overflow-y","auto","height","auto","max-height","95vh",3,"ngSubmit","formGroup"],["class","flex flex-wrap -mx-3 mb-6",4,"ngFor","ngForOf"],[1,"flex","flex-wrap","-mx-3","mb-6"],[1,"w-full","px-3"],["for","logo",1,"block","uppercase","tracking-wide","text-gray-700","text-xs","font-bold","mb-2"],["type","file","accept","image/*","id","logo",1,"appearance-none","block","w-full","bg-gray-200","text-gray-700","border","border-gray-200","rounded","py-3","px-4","mb-3","leading-tight","focus:outline-none","focus:bg-white","focus:border-gray-500",3,"change"],[1,"text-gray-600"],[1,"flex","justify-between","w-full","px-3"],["type","button","routerLink","/registro","href","/registro",1,"border","border-blue-100","text-blue","bg-blue-white","hover:bg-white-800","focus:ring-4","focus:outline-none","focus:ring-blue-300","font-medium","rounded-lg","text-sm","px-5","py-2.5","text-center","inline-flex","items-center",2,"gap","6px","padding","8px 16px"],["type","submit",1,"text-center","bg-gray-800","text-white","py-2","px-4","rounded-lg","hover:bg-yellow-600","transition","duration-300",2,"margin-left","auto","cursor","pointer",3,"disabled"],[1,"block","uppercase","tracking-wide","text-gray-700","text-xs","font-bold","mb-2",3,"for"],[3,"ngSwitch"],["class","appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",3,"formControlName","id","placeholder",4,"ngSwitchCase"],["type","email","class","appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",3,"formControlName","id","placeholder",4,"ngSwitchCase"],[4,"ngSwitchCase"],["class","mb-3",4,"ngSwitchCase"],["class","mt-4 flex items-center text-sm",4,"ngIf"],["class","text-red-500 text-xs italic",4,"ngIf"],[1,"appearance-none","block","w-full","bg-gray-200","text-gray-700","border","border-gray-200","rounded","py-3","px-4","mb-3","leading-tight","focus:outline-none","focus:bg-white","focus:border-gray-500",3,"formControlName","id","placeholder"],["type","email",1,"appearance-none","block","w-full","bg-gray-200","text-gray-700","border","border-gray-200","rounded","py-3","px-4","mb-3","leading-tight","focus:outline-none","focus:bg-white","focus:border-gray-500",3,"formControlName","id","placeholder"],[1,"relative"],[1,"appearance-none","block","w-full","bg-gray-200","text-gray-700","border","border-gray-200","rounded","py-3","px-4","leading-tight","focus:outline-none","focus:bg-white","focus:border-gray-500",3,"type","formControlName","id","placeholder"],["type","button",1,"absolute","inset-y-0","right-0","pr-3","flex","items-center","text-sm","leading-5",3,"click"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke","currentColor",1,"h-5","w-5",3,"ngClass"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M15 12a3 3 0 11-6 0 3 3 0 016 0z",4,"ngIf"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",4,"ngIf"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.977 9.977 0 014.058-5.642M15 12a3 3 0 11-6 0 3 3 0 016 0z",4,"ngIf"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M3 3l18 18",4,"ngIf"],["class","mt-4 grid grid-cols-2 gap-4",4,"ngIf"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M15 12a3 3 0 11-6 0 3 3 0 016 0z"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.977 9.977 0 014.058-5.642M15 12a3 3 0 11-6 0 3 3 0 016 0z"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M3 3l18 18"],[1,"mt-4","grid","grid-cols-2","gap-4"],[1,"flex","items-center","text-sm"],[1,"w-4","h-4","inline-block","rounded-full","mr-2",3,"ngClass"],[1,"appearance-none","block","w-full","bg-gray-200","text-gray-700","border","border-gray-200","rounded","py-3","px-4","mb-3","leading-tight","focus:outline-none","focus:bg-white","focus:border-gray-500",3,"formControlName","id"],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"mb-3"],[1,"flex","items-center",2,"gap","12px"],[4,"ngFor","ngForOf"],["xmlns","http://www.w3.org/2000/svg","fill","currentColor","viewBox","0 0 24 24",1,"h-6","w-6","cursor-pointer",3,"click","ngClass"],["d","M12 .587l3.668 7.568L24 9.748l-6 5.848 1.42 8.304L12 18.897l-7.42 4.003L6 15.596 0 9.748l8.332-1.593L12 .587z"],[1,"text-red-500","text-xs","italic"],[1,"mt-4","flex","items-center","text-sm"]],template:function(e,r){e&1&&(s(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),p(4),a(),s(5,"h3",4),p(6," NuevoLosLagos "),a(),s(7,"p",5),p(8),a()(),s(9,"form",6),b("ngSubmit",function(){return r.onSubmit()}),g(10,he,13,11,"div",7),s(11,"div",8)(12,"div",9)(13,"label",10),p(14," Logo de la Empresa o Perfil (Opcional) "),a(),s(15,"input",11),b("change",function(u){return r.onFileSelected(u)}),a(),s(16,"small",12),p(17,"Formato aceptado: JPG, PNG. Tama\xF1o m\xE1ximo: 200KB."),a()()(),s(18,"div",13)(19,"button",14),p(20," Volver "),a(),s(21,"button",15),p(22," Registrar "),a()()()()()),e&2&&(o(4),f(" Registro | ",r.tipoRegistro==="proveedor"?"Proveedor":r.tipoRegistro==="empresa"?"Industria 4.0":"Startup - Emprendedor"," "),o(4),f(" ",r.tipoRegistro==="proveedor"?"Accede a nuestra plataforma como proveedor y conecta con empresas de la Industria 4.0 para ofrecer tus productos o servicios especializados. \xDAnete a una red de colaboraci\xF3n y aprovecha oportunidades de negocio en crecimiento.":r.tipoRegistro==="empresa"?"\xDAnete como empresa de la regi\xF3n de Los Lagos para aumentar tu visibilidad y competitividad en la Industria 4.0. Accede a recursos exclusivos, oportunidades de financiamiento y contacto directo con proveedores e innovadores.":"Reg\xEDstrate como Startup o Emprendedor, y explora oportunidades de desarrollo, empleo y formaci\xF3n en el ecosistema de la Industria 4.0. Conecta con empresas, accede a cursos en l\xEDnea y mantente actualizado sobre las \xFAltimas tendencias del sector"," "),o(),n("formGroup",r.formGroup),o(),n("ngForOf",r.formFields),o(11),n("disabled",r.formGroup.invalid))},dependencies:[P,k,G,I,T,N,J,D,Y,Z,q,Q,z,$,j,B,M]})};export{K as a};