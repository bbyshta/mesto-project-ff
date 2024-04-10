(()=>{"use strict";function e(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function t(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",e)}function n(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",e)}function r(e){e.classList.toggle("card__like-button_is-active")}function o(e,t,n){var r=e.querySelector("".concat(n.inputErrorTypeClass).concat(t.name));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)}function c(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function a(e,t){var n=e.querySelector(t.submitButtonSelector);Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){o(e,n,t)})),n.disabled=!0,n.classList.add(t.inactiveButtonClass)}var i={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-10",headers:{authorization:"459f3f15-9abd-42cb-bef4-24dbba45bbab","Content-Type":"application/json"}};function u(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function l(e,t,n){e.querySelector(".popup__button").textContent=n}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d=document.querySelector("#card-template").content,f=document.querySelector(".places__list"),p=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),v=document.querySelector(".profile__image"),h=document.forms["edit-profile"],b=document.forms["new-place"],S=document.querySelector(".profile__add-button"),g=document.querySelector(".popup_type_new-card"),C=Array.from(document.querySelectorAll(".popup")),E=document.querySelector(".popup_type_image"),q=E.querySelector(".popup__image"),L=E.querySelector(".popup__caption"),k=document.querySelector(".popup_type_confirm"),A=k.querySelector(".popup__form"),x=document.querySelector(".profile__image-edit-button"),w=document.querySelector(".popup_type_new-avatar"),T=w.querySelector(".popup__form"),U={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",inputErrorTypeClass:".popup__input-error_type_",errorClass:"popup__input-error_active"},j={},O={};function B(e,n){f.prepend(function(e,t,n,o,c,a){var i=e.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__delete-button"),l=i.querySelector(".card__image"),s=i.querySelector(".card__like-button"),d=i.querySelector(".card__like-counter");return l.src=t.link,l.alt=t.name,i.querySelector(".card__title").textContent=t.name,d.textContent=t.likes.length,n===t.owner._id?u.addEventListener("click",(function(){o(i)})):u.remove(),t.likes.some((function(e){return e._id===n}))&&r(s),s.addEventListener("click",(function(){c(s,d)})),l.addEventListener("click",a),i}(d,e,n,(function(n){O._id=e._id,O.cardCopy=n,t(k)}),(function(t,n){var o;t.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:i.headers}).then((function(e){return u(e)}))}(e._id).then((function(e){n.textContent=e.likes.length,r(t)})).catch((function(e){alert(e),console.log(e)})):(o=e._id,fetch("".concat(i.baseUrl,"/cards/likes/").concat(o),{method:"PUT",headers:i.headers}).then((function(e){return u(e)}))).then((function(e){n.textContent=e.likes.length,r(t)})).catch((function(e){alert(e),console.log(e)}))}),D))}function D(e){t(E),q.src=e.target.src,q.alt=e.target.alt,L.textContent=e.target.alt}C.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&n(e),t.target.classList.contains("popup__close")&&n(e)}))})),p.addEventListener("click",(function(){t(m),a(h,U),h.elements.name.value=y.textContent,h.elements.description.value=_.textContent})),x.addEventListener("click",(function(){t(w),T.reset(),a(T,U)})),T.addEventListener("submit",(function(e){var t;e.preventDefault(),l(T,0,"Сохранение..."),(t=T.elements.avatar.value,fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:t})}).then((function(e){return u(e)}))).then((function(e){v.style="background-image: url(".concat(e.avatar,")"),n(w)})).catch((function(e){alert(e),console.log(e)})).finally((function(){l(T,0,"Сохранить")}))})),A.addEventListener("submit",(function(e){var t;e.preventDefault(),l(A,0,"Удаляется..."),(t=O._id,fetch("".concat(i.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:i.headers}).then((function(e){return u(e)}))).then((function(){O.cardCopy.remove()})).then((function(){n(k)})).catch((function(e){alert(e),console.log(e)})).finally((function(){l(A,0,"Да")}))})),h.addEventListener("submit",(function(e){var t,r;e.preventDefault(),l(h,0,"Сохранение..."),(t=h.elements.name.value,r=h.elements.description.value,fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:t,about:r})}).then((function(e){return u(e)}))).then((function(){y.textContent=h.elements.name.value,_.textContent=h.elements.description.value,n(m)})).catch((function(e){alert(e),console.log(e)})).finally((function(){l(h,0,"Сохранить")}))})),S.addEventListener("click",(function(){t(g),a(b,U),b.reset()})),b.addEventListener("submit",(function(e){e.preventDefault(),l(b,0,"Сохранение...");var t={};t.name=b.elements["place-name"].value,t.link=b.elements.link.value,function(e){return fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return u(e)}))}(t).then((function(e){B(e,j.id),n(g)})).catch((function(e){alert(e),console.log(e)})).finally((function(){l(b,0,"Сохранить")}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){(function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);c(n,r,t),n.forEach((function(a){a.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?o(e,t,n):function(e,t,n,r){var o=e.querySelector("".concat(r.inputErrorTypeClass).concat(t.name));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,a,t),c(n,r,t)}))}))})(t,e),t.addEventListener("submit",(function(e){e.preventDefault()}))}))}(U),Promise.all([fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then((function(e){return u(e)})),fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then((function(e){return u(e)}))]).then((function(e){var t,n,r,o,c=(o=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(r,o)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],i=c[1];j.id=a._id,function(e,t,n,r){e.textContent=r.name,t.textContent=r.about,n.style="background-image: url(".concat(r.avatar,")")}(y,_,v,a),t=i,n=a._id,t.reverse().forEach((function(e){B(e,n)}))})).catch((function(e){alert(e),console.log(e)}))})();
//# sourceMappingURL=main.js.map