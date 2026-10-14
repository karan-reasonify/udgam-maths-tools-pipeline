import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
/* M1.S1.T2.C4.2D1 · tenths_builder · Tenths Builder — standalone build 2026-10-13, source 9b87e643:369494.
   One file: the react import below is the only one (the host strips it and injects React and five hooks);
   @use-gesture/react 10.3.1 (MIT) is inlined as __gesture; the mascot is an inline WebP; the lesson
   is silent (printed bubble lines and Web Audio sound effects, no speech); nothing is stored or fetched. */
const __gesture =(()=>{var N=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var gt=Object.getOwnPropertyNames;var _t=Object.prototype.hasOwnProperty;var vt=(s,t)=>{for(var e in t)N(s,e,{get:t[e],enumerable:!0})},yt=(s,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of gt(t))!_t.call(s,n)&&n!==e&&N(s,n,{get:()=>t[n],enumerable:!(i=mt(t,n))||i.enumerable});return s};var bt=s=>yt(N({},"__esModule",{value:!0}),s);var oe={};vt(oe,{useDrag:()=>ut});function wt(s,t,e){return Math.max(t,Math.min(s,e))}var f={toVector(s,t){return s===void 0&&(s=t),Array.isArray(s)?s:[s,s]},add(s,t){return[s[0]+t[0],s[1]+t[1]]},sub(s,t){return[s[0]-t[0],s[1]-t[1]]},addTo(s,t){s[0]+=t[0],s[1]+=t[1]},subTo(s,t){s[0]-=t[0],s[1]-=t[1]}};function H(s,t,e){return t===0||Math.abs(t)===1/0?Math.pow(s,e*5):s*t*e/(t+e*s)}function Y(s,t,e,i=.15){return i===0?wt(s,t,e):s<t?-H(t-s,e-t,i)+t:s>e?+H(s-e,e-t,i)+e:s}function G(s,[t,e],[i,n]){let[[r,o],[c,h]]=s;return[Y(t,r,o,i),Y(e,c,h,n)]}function Et(s,t){if(typeof s!="object"||s===null)return s;var e=s[Symbol.toPrimitive];if(e!==void 0){var i=e.call(s,t||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(s)}function Tt(s){var t=Et(s,"string");return typeof t=="symbol"?t:String(t)}function d(s,t,e){return t=Tt(t),t in s?Object.defineProperty(s,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):s[t]=e,s}function X(s,t){var e=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);t&&(i=i.filter(function(n){return Object.getOwnPropertyDescriptor(s,n).enumerable})),e.push.apply(e,i)}return e}function u(s){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?X(Object(e),!0).forEach(function(i){d(s,i,e[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(e)):X(Object(e)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(e,i))})}return s}var Q={pointer:{start:"down",change:"move",end:"up"},mouse:{start:"down",change:"move",end:"up"},touch:{start:"start",change:"move",end:"end"},gesture:{start:"start",change:"change",end:"end"}};function W(s){return s?s[0].toUpperCase()+s.slice(1):""}var At=["enter","leave"];function It(s=!1,t){return s&&!At.includes(t)}function Z(s,t="",e=!1){let i=Q[s],n=i&&i[t]||t;return"on"+W(s)+W(n)+(It(e,n)?"Capture":"")}var St=["gotpointercapture","lostpointercapture"];function tt(s){let t=s.substring(2).toLowerCase(),e=!!~t.indexOf("passive");e&&(t=t.replace("passive",""));let i=St.includes(t)?"capturecapture":"capture",n=!!~t.indexOf(i);return n&&(t=t.replace("capture","")),{device:t,capture:n,passive:e}}function et(s,t=""){let e=Q[s],i=e&&e[t]||t;return s+i}function y(s){return"touches"in s}function st(s){return y(s)?"touch":"pointerType"in s?s.pointerType:"mouse"}function kt(s){return Array.from(s.touches).filter(t=>{var e,i;return t.target===s.currentTarget||((e=s.currentTarget)===null||e===void 0||(i=e.contains)===null||i===void 0?void 0:i.call(e,t.target))})}function Dt(s){return s.type==="touchend"||s.type==="touchcancel"?s.changedTouches:s.targetTouches}function it(s){return y(s)?Dt(s)[0]:s}function nt(s){return kt(s).map(t=>t.identifier)}function L(s){let t=it(s);return y(s)?t.identifier:t.pointerId}function z(s){let t=it(s);return[t.clientX,t.clientY]}function xt(s){let t={};if("buttons"in s&&(t.buttons=s.buttons),"shiftKey"in s){let{shiftKey:e,altKey:i,metaKey:n,ctrlKey:r}=s;Object.assign(t,{shiftKey:e,altKey:i,metaKey:n,ctrlKey:r})}return t}function k(s,...t){return typeof s=="function"?s(...t):s}function Ot(){}function rt(...s){return s.length===0?Ot:s.length===1?s[0]:function(){let t;for(let e of s)t=e.apply(this,arguments)||t;return t}}function $(s,t){return Object.assign({},t,s||{})}var Pt=32,R=class{constructor(t,e,i){this.ctrl=t,this.args=e,this.key=i,this.state||(this.state={},this.computeValues([0,0]),this.computeInitial(),this.init&&this.init(),this.reset())}get state(){return this.ctrl.state[this.key]}set state(t){this.ctrl.state[this.key]=t}get shared(){return this.ctrl.state.shared}get eventStore(){return this.ctrl.gestureEventStores[this.key]}get timeoutStore(){return this.ctrl.gestureTimeoutStores[this.key]}get config(){return this.ctrl.config[this.key]}get sharedConfig(){return this.ctrl.config.shared}get handler(){return this.ctrl.handlers[this.key]}reset(){let{state:t,shared:e,ingKey:i,args:n}=this;e[i]=t._active=t.active=t._blocked=t._force=!1,t._step=[!1,!1],t.intentional=!1,t._movement=[0,0],t._distance=[0,0],t._direction=[0,0],t._delta=[0,0],t._bounds=[[-1/0,1/0],[-1/0,1/0]],t.args=n,t.axis=void 0,t.memo=void 0,t.elapsedTime=t.timeDelta=0,t.direction=[0,0],t.distance=[0,0],t.overflow=[0,0],t._movementBound=[!1,!1],t.velocity=[0,0],t.movement=[0,0],t.delta=[0,0],t.timeStamp=0}start(t){let e=this.state,i=this.config;e._active||(this.reset(),this.computeInitial(),e._active=!0,e.target=t.target,e.currentTarget=t.currentTarget,e.lastOffset=i.from?k(i.from,e):e.offset,e.offset=e.lastOffset,e.startTime=e.timeStamp=t.timeStamp)}computeValues(t){let e=this.state;e._values=t,e.values=this.config.transform(t)}computeInitial(){let t=this.state;t._initial=t._values,t.initial=t.values}compute(t){let{state:e,config:i,shared:n}=this;e.args=this.args;let r=0;if(t&&(e.event=t,i.preventDefault&&t.cancelable&&e.event.preventDefault(),e.type=t.type,n.touches=this.ctrl.pointerIds.size||this.ctrl.touchIds.size,n.locked=!!document.pointerLockElement,Object.assign(n,xt(t)),n.down=n.pressed=n.buttons%2===1||n.touches>0,r=t.timeStamp-e.timeStamp,e.timeStamp=t.timeStamp,e.elapsedTime=e.timeStamp-e.startTime),e._active){let _=e._delta.map(Math.abs);f.addTo(e._distance,_)}this.axisIntent&&this.axisIntent(t);let[o,c]=e._movement,[h,l]=i.threshold,{_step:a,values:g}=e;if(i.hasCustomTransform?(a[0]===!1&&(a[0]=Math.abs(o)>=h&&g[0]),a[1]===!1&&(a[1]=Math.abs(c)>=l&&g[1])):(a[0]===!1&&(a[0]=Math.abs(o)>=h&&Math.sign(o)*h),a[1]===!1&&(a[1]=Math.abs(c)>=l&&Math.sign(c)*l)),e.intentional=a[0]!==!1||a[1]!==!1,!e.intentional)return;let p=[0,0];if(i.hasCustomTransform){let[_,pt]=g;p[0]=a[0]!==!1?_-a[0]:0,p[1]=a[1]!==!1?pt-a[1]:0}else p[0]=a[0]!==!1?o-a[0]:0,p[1]=a[1]!==!1?c-a[1]:0;this.restrictToAxis&&!e._blocked&&this.restrictToAxis(p);let T=e.offset,A=e._active&&!e._blocked||e.active;A&&(e.first=e._active&&!e.active,e.last=!e._active&&e.active,e.active=n[this.ingKey]=e._active,t&&(e.first&&("bounds"in i&&(e._bounds=k(i.bounds,e)),this.setup&&this.setup()),e.movement=p,this.computeOffset()));let[I,S]=e.offset,[[C,ht],[lt,ft]]=e._bounds;e.overflow=[I<C?-1:I>ht?1:0,S<lt?-1:S>ft?1:0],e._movementBound[0]=e.overflow[0]?e._movementBound[0]===!1?e._movement[0]:e._movementBound[0]:!1,e._movementBound[1]=e.overflow[1]?e._movementBound[1]===!1?e._movement[1]:e._movementBound[1]:!1;let dt=e._active?i.rubberband||[0,0]:[0,0];if(e.offset=G(e._bounds,e.offset,dt),e.delta=f.sub(e.offset,T),this.computeMovement(),A&&(!e.last||r>Pt)){e.delta=f.sub(e.offset,T);let _=e.delta.map(Math.abs);f.addTo(e.distance,_),e.direction=e.delta.map(Math.sign),e._direction=e._delta.map(Math.sign),!e.first&&r>0&&(e.velocity=[_[0]/r,_[1]/r],e.timeDelta=r)}}emit(){let t=this.state,e=this.shared,i=this.config;if(t._active||this.clean(),(t._blocked||!t.intentional)&&!t._force&&!i.triggerAllEvents)return;let n=this.handler(u(u(u({},e),t),{},{[this.aliasKey]:t.values}));n!==void 0&&(t.memo=n)}clean(){this.eventStore.clean(),this.timeoutStore.clean()}};function Mt([s,t],e){let i=Math.abs(s),n=Math.abs(t);if(i>n&&i>e)return"x";if(n>i&&n>e)return"y"}var V=class extends R{constructor(...t){super(...t),d(this,"aliasKey","xy")}reset(){super.reset(),this.state.axis=void 0}init(){this.state.offset=[0,0],this.state.lastOffset=[0,0]}computeOffset(){this.state.offset=f.add(this.state.lastOffset,this.state.movement)}computeMovement(){this.state.movement=f.sub(this.state.offset,this.state.lastOffset)}axisIntent(t){let e=this.state,i=this.config;if(!e.axis&&t){let n=typeof i.axisThreshold=="object"?i.axisThreshold[st(t)]:i.axisThreshold;e.axis=Mt(e._movement,n)}e._blocked=(i.lockDirection||!!i.axis)&&!e.axis||!!i.axis&&i.axis!==e.axis}restrictToAxis(t){if(this.config.axis||this.config.lockDirection)switch(this.state.axis){case"x":t[1]=0;break;case"y":t[0]=0;break}}},Ct=s=>s,F=.15,ot={enabled(s=!0){return s},eventOptions(s,t,e){return u(u({},e.shared.eventOptions),s)},preventDefault(s=!1){return s},triggerAllEvents(s=!1){return s},rubberband(s=0){switch(s){case!0:return[F,F];case!1:return[0,0];default:return f.toVector(s)}},from(s){if(typeof s=="function")return s;if(s!=null)return f.toVector(s)},transform(s,t,e){let i=s||e.shared.transform;return this.hasCustomTransform=!!i,i||Ct},threshold(s){return f.toVector(s,0)}},Nt=0,b=u(u({},ot),{},{axis(s,t,{axis:e}){if(this.lockDirection=e==="lock",!this.lockDirection)return e},axisThreshold(s=Nt){return s},bounds(s={}){if(typeof s=="function")return r=>b.bounds(s(r));if("current"in s)return()=>s.current;if(typeof HTMLElement=="function"&&s instanceof HTMLElement)return s;let{left:t=-1/0,right:e=1/0,top:i=-1/0,bottom:n=1/0}=s;return[[t,e],[i,n]]}}),q={ArrowRight:(s,t=1)=>[s*t,0],ArrowLeft:(s,t=1)=>[-1*s*t,0],ArrowUp:(s,t=1)=>[0,-1*s*t],ArrowDown:(s,t=1)=>[0,s*t]},K=class extends V{constructor(...t){super(...t),d(this,"ingKey","dragging")}reset(){super.reset();let t=this.state;t._pointerId=void 0,t._pointerActive=!1,t._keyboardActive=!1,t._preventScroll=!1,t._delayed=!1,t.swipe=[0,0],t.tap=!1,t.canceled=!1,t.cancel=this.cancel.bind(this)}setup(){let t=this.state;if(t._bounds instanceof HTMLElement){let e=t._bounds.getBoundingClientRect(),i=t.currentTarget.getBoundingClientRect(),n={left:e.left-i.left+t.offset[0],right:e.right-i.right+t.offset[0],top:e.top-i.top+t.offset[1],bottom:e.bottom-i.bottom+t.offset[1]};t._bounds=b.bounds(n)}}cancel(){let t=this.state;t.canceled||(t.canceled=!0,t._active=!1,setTimeout(()=>{this.compute(),this.emit()},0))}setActive(){this.state._active=this.state._pointerActive||this.state._keyboardActive}clean(){this.pointerClean(),this.state._pointerActive=!1,this.state._keyboardActive=!1,super.clean()}pointerDown(t){let e=this.config,i=this.state;if(t.buttons!=null&&(Array.isArray(e.pointerButtons)?!e.pointerButtons.includes(t.buttons):e.pointerButtons!==-1&&e.pointerButtons!==t.buttons))return;let n=this.ctrl.setEventIds(t);e.pointerCapture&&t.target.setPointerCapture(t.pointerId),!(n&&n.size>1&&i._pointerActive)&&(this.start(t),this.setupPointer(t),i._pointerId=L(t),i._pointerActive=!0,this.computeValues(z(t)),this.computeInitial(),e.preventScrollAxis&&st(t)!=="mouse"?(i._active=!1,this.setupScrollPrevention(t)):e.delay>0?(this.setupDelayTrigger(t),e.triggerAllEvents&&(this.compute(t),this.emit())):this.startPointerDrag(t))}startPointerDrag(t){let e=this.state;e._active=!0,e._preventScroll=!0,e._delayed=!1,this.compute(t),this.emit()}pointerMove(t){let e=this.state,i=this.config;if(!e._pointerActive)return;let n=L(t);if(e._pointerId!==void 0&&n!==e._pointerId)return;let r=z(t);if(document.pointerLockElement===t.target?e._delta=[t.movementX,t.movementY]:(e._delta=f.sub(r,e._values),this.computeValues(r)),f.addTo(e._movement,e._delta),this.compute(t),e._delayed&&e.intentional){this.timeoutStore.remove("dragDelay"),e.active=!1,this.startPointerDrag(t);return}if(i.preventScrollAxis&&!e._preventScroll)if(e.axis)if(e.axis===i.preventScrollAxis||i.preventScrollAxis==="xy"){e._active=!1,this.clean();return}else{this.timeoutStore.remove("startPointerDrag"),this.startPointerDrag(t);return}else return;this.emit()}pointerUp(t){this.ctrl.setEventIds(t);try{this.config.pointerCapture&&t.target.hasPointerCapture(t.pointerId)&&t.target.releasePointerCapture(t.pointerId)}catch{}let e=this.state,i=this.config;if(!e._active||!e._pointerActive)return;let n=L(t);if(e._pointerId!==void 0&&n!==e._pointerId)return;this.state._pointerActive=!1,this.setActive(),this.compute(t);let[r,o]=e._distance;if(e.tap=r<=i.tapsThreshold&&o<=i.tapsThreshold,e.tap&&i.filterTaps)e._force=!0;else{let[c,h]=e._delta,[l,a]=e._movement,[g,p]=i.swipe.velocity,[T,A]=i.swipe.distance,I=i.swipe.duration;if(e.elapsedTime<I){let S=Math.abs(c/e.timeDelta),C=Math.abs(h/e.timeDelta);S>g&&Math.abs(l)>T&&(e.swipe[0]=Math.sign(c)),C>p&&Math.abs(a)>A&&(e.swipe[1]=Math.sign(h))}}this.emit()}pointerClick(t){!this.state.tap&&t.detail>0&&(t.preventDefault(),t.stopPropagation())}setupPointer(t){let e=this.config,i=e.device;e.pointerLock&&t.currentTarget.requestPointerLock(),e.pointerCapture||(this.eventStore.add(this.sharedConfig.window,i,"change",this.pointerMove.bind(this)),this.eventStore.add(this.sharedConfig.window,i,"end",this.pointerUp.bind(this)),this.eventStore.add(this.sharedConfig.window,i,"cancel",this.pointerUp.bind(this)))}pointerClean(){this.config.pointerLock&&document.pointerLockElement===this.state.currentTarget&&document.exitPointerLock()}preventScroll(t){this.state._preventScroll&&t.cancelable&&t.preventDefault()}setupScrollPrevention(t){this.state._preventScroll=!1,Lt(t);let e=this.eventStore.add(this.sharedConfig.window,"touch","change",this.preventScroll.bind(this),{passive:!1});this.eventStore.add(this.sharedConfig.window,"touch","end",e),this.eventStore.add(this.sharedConfig.window,"touch","cancel",e),this.timeoutStore.add("startPointerDrag",this.startPointerDrag.bind(this),this.config.preventScrollDelay,t)}setupDelayTrigger(t){this.state._delayed=!0,this.timeoutStore.add("dragDelay",()=>{this.state._step=[0,0],this.startPointerDrag(t)},this.config.delay)}keyDown(t){let e=q[t.key];if(e){let i=this.state,n=t.shiftKey?10:t.altKey?.1:1;this.start(t),i._delta=e(this.config.keyboardDisplacement,n),i._keyboardActive=!0,f.addTo(i._movement,i._delta),this.compute(t),this.emit()}}keyUp(t){t.key in q&&(this.state._keyboardActive=!1,this.setActive(),this.compute(t),this.emit())}bind(t){let e=this.config.device;t(e,"start",this.pointerDown.bind(this)),this.config.pointerCapture&&(t(e,"change",this.pointerMove.bind(this)),t(e,"end",this.pointerUp.bind(this)),t(e,"cancel",this.pointerUp.bind(this)),t("lostPointerCapture","",this.pointerUp.bind(this))),this.config.keys&&(t("key","down",this.keyDown.bind(this)),t("key","up",this.keyUp.bind(this))),this.config.filterTaps&&t("click","",this.pointerClick.bind(this),{capture:!0,passive:!1})}};function Lt(s){"persist"in s&&typeof s.persist=="function"&&s.persist()}var w=typeof window!="undefined"&&window.document&&window.document.createElement;function at(){return w&&"ontouchstart"in window}function Rt(){return at()||w&&window.navigator.maxTouchPoints>1}function Vt(){return w&&"onpointerdown"in window}function Kt(){return w&&"exitPointerLock"in window.document}function Ut(){try{return"constructor"in GestureEvent}catch{return!1}}var m={isBrowser:w,gesture:Ut(),touch:at(),touchscreen:Rt(),pointer:Vt(),pointerLock:Kt()},jt=250,Bt=180,Ht=.5,Yt=50,Gt=250,Xt=10,J={mouse:0,touch:0,pen:8},Wt=u(u({},b),{},{device(s,t,{pointer:{touch:e=!1,lock:i=!1,mouse:n=!1}={}}){return this.pointerLock=i&&m.pointerLock,m.touch&&e?"touch":this.pointerLock?"mouse":m.pointer&&!n?"pointer":m.touch?"touch":"mouse"},preventScrollAxis(s,t,{preventScroll:e}){if(this.preventScrollDelay=typeof e=="number"?e:e||e===void 0&&s?jt:void 0,!(!m.touchscreen||e===!1))return s||(e!==void 0?"y":void 0)},pointerCapture(s,t,{pointer:{capture:e=!0,buttons:i=1,keys:n=!0}={}}){return this.pointerButtons=i,this.keys=n,!this.pointerLock&&this.device==="pointer"&&e},threshold(s,t,{filterTaps:e=!1,tapsThreshold:i=3,axis:n=void 0}){let r=f.toVector(s,e?i:n?1:0);return this.filterTaps=e,this.tapsThreshold=i,r},swipe({velocity:s=Ht,distance:t=Yt,duration:e=Gt}={}){return{velocity:this.transform(f.toVector(s)),distance:this.transform(f.toVector(t)),duration:e}},delay(s=0){switch(s){case!0:return Bt;case!1:return 0;default:return s}},axisThreshold(s){return s?u(u({},J),s):J},keyboardDisplacement(s=Xt){return s}});var he=u(u({},ot),{},{device(s,t,{shared:e,pointer:{touch:i=!1}={}}){if(e.target&&!m.touch&&m.gesture)return"gesture";if(m.touch&&i)return"touch";if(m.touchscreen){if(m.pointer)return"pointer";if(m.touch)return"touch"}},bounds(s,t,{scaleBounds:e={},angleBounds:i={}}){let n=o=>{let c=$(k(e,o),{min:-1/0,max:1/0});return[c.min,c.max]},r=o=>{let c=$(k(i,o),{min:-1/0,max:1/0});return[c.min,c.max]};return typeof e!="function"&&typeof i!="function"?[n(),r()]:o=>[n(o),r(o)]},threshold(s,t,e){return this.lockDirection=e.axis==="lock",f.toVector(s,this.lockDirection?[.1,3]:0)},modifierKey(s){return s===void 0?"ctrlKey":s},pinchOnWheel(s=!0){return s}});var le=u(u({},b),{},{mouseOnly:(s=!0)=>s});var fe=u(u({},b),{},{mouseOnly:(s=!0)=>s}),D=new Map,E=new Map;function U(s){D.set(s.key,s.engine),E.set(s.key,s.resolver)}var j={key:"drag",engine:K,resolver:Wt};var Qt=React,x=Qt;function Zt(s,t){if(s==null)return{};var e={},i=Object.keys(s),n,r;for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&(e[n]=s[n]);return e}function te(s,t){if(s==null)return{};var e=Zt(s,t),i,n;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(s);for(n=0;n<r.length;n++)i=r[n],!(t.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(s,i)&&(e[i]=s[i])}return e}var ee={target(s){if(s)return()=>"current"in s?s.current:s},enabled(s=!0){return s},window(s=m.isBrowser?window:void 0){return s},eventOptions({passive:s=!0,capture:t=!1}={}){return{passive:s,capture:t}},transform(s){return s}},se=["target","eventOptions","window","enabled","transform"];function O(s={},t){let e={};for(let[i,n]of Object.entries(t))switch(typeof n){case"function":e[i]=n.call(e,s[i],i,s);break;case"object":e[i]=O(s[i],n);break;case"boolean":n&&(e[i]=s[i]);break}return e}function ie(s,t,e={}){let i=s,{target:n,eventOptions:r,window:o,enabled:c,transform:h}=i,l=te(i,se);if(e.shared=O({target:n,eventOptions:r,window:o,enabled:c,transform:h},ee),t){let a=E.get(t);e[t]=O(u({shared:e.shared},l),a)}else for(let a in l){let g=E.get(a);g&&(e[a]=O(u({shared:e.shared},l[a]),g))}return e}var P=class{constructor(t,e){d(this,"_listeners",new Set),this._ctrl=t,this._gestureKey=e}add(t,e,i,n,r){let o=this._listeners,c=et(e,i),h=this._gestureKey?this._ctrl.config[this._gestureKey].eventOptions:{},l=u(u({},h),r);t.addEventListener(c,n,l);let a=()=>{t.removeEventListener(c,n,l),o.delete(a)};return o.add(a),a}clean(){this._listeners.forEach(t=>t()),this._listeners.clear()}},B=class{constructor(){d(this,"_timeouts",new Map)}add(t,e,i=140,...n){this.remove(t),this._timeouts.set(t,window.setTimeout(e,i,...n))}remove(t){let e=this._timeouts.get(t);e&&window.clearTimeout(e)}clean(){this._timeouts.forEach(t=>{window.clearTimeout(t)}),this._timeouts.clear()}},M=class{constructor(t){d(this,"gestures",new Set),d(this,"_targetEventStore",new P(this)),d(this,"gestureEventStores",{}),d(this,"gestureTimeoutStores",{}),d(this,"handlers",{}),d(this,"config",{}),d(this,"pointerIds",new Set),d(this,"touchIds",new Set),d(this,"state",{shared:{shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1}}),ne(this,t)}setEventIds(t){if(y(t))return this.touchIds=new Set(nt(t)),this.touchIds;if("pointerId"in t)return t.type==="pointerup"||t.type==="pointercancel"?this.pointerIds.delete(t.pointerId):t.type==="pointerdown"&&this.pointerIds.add(t.pointerId),this.pointerIds}applyHandlers(t,e){this.handlers=t,this.nativeHandlers=e}applyConfig(t,e){this.config=ie(t,e,this.config)}clean(){this._targetEventStore.clean();for(let t of this.gestures)this.gestureEventStores[t].clean(),this.gestureTimeoutStores[t].clean()}effect(){return this.config.shared.target&&this.bind(),()=>this._targetEventStore.clean()}bind(...t){let e=this.config.shared,i={},n;if(!(e.target&&(n=e.target(),!n))){if(e.enabled){for(let o of this.gestures){let c=this.config[o],h=ct(i,c.eventOptions,!!n);if(c.enabled){let l=D.get(o);new l(this,t,o).bind(h)}}let r=ct(i,e.eventOptions,!!n);for(let o in this.nativeHandlers)r(o,"",c=>this.nativeHandlers[o](u(u({},this.state.shared),{},{event:c,args:t})),void 0,!0)}for(let r in i)i[r]=rt(...i[r]);if(!n)return i;for(let r in i){let{device:o,capture:c,passive:h}=tt(r);this._targetEventStore.add(n,o,"",i[r],{capture:c,passive:h})}}}};function v(s,t){s.gestures.add(t),s.gestureEventStores[t]=new P(s,t),s.gestureTimeoutStores[t]=new B}function ne(s,t){t.drag&&v(s,"drag"),t.wheel&&v(s,"wheel"),t.scroll&&v(s,"scroll"),t.move&&v(s,"move"),t.pinch&&v(s,"pinch"),t.hover&&v(s,"hover")}var ct=(s,t,e)=>(i,n,r,o={},c=!1)=>{var h,l;let a=(h=o.capture)!==null&&h!==void 0?h:t.capture,g=(l=o.passive)!==null&&l!==void 0?l:t.passive,p=c?i:Z(i,n,a);e&&g&&(p+="Passive"),s[p]=s[p]||[],s[p].push(r)};function re(s,t={},e,i){let n=x.useMemo(()=>new M(s),[]);if(n.applyHandlers(s,i),n.applyConfig(t,e),x.useEffect(n.effect.bind(n)),x.useEffect(()=>n.clean.bind(n),[]),t.target===void 0)return n.bind.bind(n)}function ut(s,t){return U(j),re({drag:s},t||{},"drag")}return bt(oe);})();
const useGestureDrag = __gesture.useDrag;
const T = { display: 72, xl: 56, speech: 44, prompt: 40, label: 32, micro: 28 };
const CONTENT = { hundred: "#0072B2", ten: "#E69F00", one: "#009E73", bead: "#CC79A7", pointer: "#D55E00", line: "#2B2B2B" };
const DEFAULT_CHROME = { paper: "#FFFDF7", panel: "#F2E4CE", ink: "#2B2B2B", rule: "#C9BCA6", dim: "#9AA4AC", accent: "#5B6770" };
const Z = {
  header: { x: 0, y: 0, w: 1600, h: 80 },
  canvas: { x: 40, y: 92, w: 1520, h: 654 },
  runs: { x: 64, y: 108, w: 330, h: 76 },
  work: { x: 64, y: 202, w: 1086, h: 528 },
  slot: { x: 1186, y: 250, w: 356, h: 92 },
  pad: { x: 1170, y: 368, w: 388, h: 363 },
  voice: { x: 28, y: 704, w: 204, h: 194 },
  bubble: { x: 254, y: 748, w: 656, h: 144 },
  bar: { x: 930, y: 782, w: 630, h: 58 }
};
const W = Z.work;
const ZCLASSIC = JSON.parse(JSON.stringify(Z));
const ZBOARD = {
  runs: { x: 64, y: 110, w: 330, h: 76 },
  work: { x: 64, y: 202, w: 1472, h: 528 },
  /* the widest the area gets, with the panel shut */
  slot: { x: 1180, y: 218, w: 340, h: 92 },
  pad: { x: 1180, y: 324, w: 340, h: 390 },
  ask: { x: 64, y: 104, w: 1472, h: 88 },
  drawer: { x: 1164, y: 202, w: 372, h: 528 }
};
const BOARD_OPEN_W = 1086;
let BOARD = false;
function setLayout(board) {
  const src = board ? ZBOARD : ZCLASSIC;
  for (const k of Object.keys(src)) {
    if (!Z[k]) Z[k] = {};
    Object.assign(Z[k], src[k]);
  }
  BOARD = board;
}
const MASCOT_BOX = { x: 28, y: 738, w: 204, h: 160 };
const HIT = 72;
const TOOL_API = ["getState", "gotoStep", "say", "answer", "check", "reset", "next", "prev", "highlight", "setParam", "playDemo"];
const FONT = "Poppins, 'Segoe UI', system-ui, -apple-system, sans-serif";
const RAD = { card: 28, panel: 20, key: 18, piece: 10 };
const EDGE = 5;
const POINTS = 5;
const AUDIO = {
  correct: { type: "triangle", notes: [659.25, 880, 1174.66], spacing: 0.075, sparkle: { at: 0.16, freq: 1567.98, type: "sine" } },
  win: { notes: [523.25, 659.25, 783.99, 1046.5], spacing: 0.13, tail: [1318.51, 1567.98] },
  wrong: { type: "sine", peak: 0.13, slides: [[392, 330], [294, 233]] }
};
const ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const under100 = (n) => n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "");
const under1000 = (n) => [Math.floor(n / 100) ? ONES[Math.floor(n / 100)] + " hundred" : "", n % 100 ? under100(n % 100) : ""].filter(Boolean).join(" ");
function words(v) {
  let n = Math.trunc(Number(v));
  if (!isFinite(n)) return "";
  if (n === 0) return "zero";
  if (n < 0) return "minus " + words(-n);
  const crore = Math.floor(n / 1e7), lakh = Math.floor(n / 1e5) % 100, thousand = Math.floor(n / 1e3) % 100, rest = n % 1e3;
  return [
    crore ? words(crore) + " crore" : "",
    lakh ? under100(lakh) + " lakh" : "",
    thousand ? under100(thousand) + " thousand" : "",
    rest ? under1000(rest) : ""
  ].filter(Boolean).join(" ");
}
function wordsIntl(v) {
  let n = Math.trunc(Number(v));
  if (!isFinite(n)) return "";
  if (n === 0) return "zero";
  if (n < 0) return "minus " + wordsIntl(-n);
  const parts = [];
  [["billion", 1e9], ["million", 1e6], ["thousand", 1e3]].forEach(([name, size]) => {
    const k = Math.floor(n / size) % 1e3;
    if (k) parts.push(under1000(k) + " " + name);
  });
  if (n % 1e3) parts.push(under1000(n % 1e3));
  return parts.join(" ");
}
function indian(v) {
  const s = String(Math.trunc(Math.abs(Number(v))));
  const head = s.slice(0, -3), tail = s.slice(-3);
  return (Number(v) < 0 ? "-" : "") + (head ? head.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," : "") + tail;
}
function intl(v) {
  return (Number(v) < 0 ? "-" : "") + String(Math.trunc(Math.abs(Number(v)))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function roman(v) {
  let n = Math.trunc(Number(v));
  const table = [
    [1e3, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];
  let out = "";
  for (const [k, r] of table) while (n >= k) {
    out += r;
    n -= k;
  }
  return out;
}
const ORDINAL = { 2: "half", 3: "third", 4: "quarter", 5: "fifth", 6: "sixth", 7: "seventh", 8: "eighth", 9: "ninth", 10: "tenth", 12: "twelfth" };
function fractionWords(a, b) {
  if (b === 1) return words(a) + " over one";
  const unit = ORDINAL[b] || sayOrdinal(b);
  const plural = a === 1 ? unit : unit === "half" ? "halves" : unit + "s";
  return words(a) + " " + plural;
}
function sayOrdinal(n) {
  const IRR = { one: "first", two: "second", three: "third", five: "fifth", eight: "eighth", nine: "ninth", twelve: "twelfth" };
  return words(n).replace(/([a-z]+)$/, (last) => IRR[last] || (last.endsWith("y") ? last.slice(0, -1) + "ieth" : last + "th"));
}
const SAY_UNIT = {
  km: ["kilometre", "kilometres"],
  m: ["metre", "metres"],
  cm: ["centimetre", "centimetres"],
  mm: ["millimetre", "millimetres"],
  kg: ["kilogram", "kilograms"],
  g: ["gram", "grams"],
  mg: ["milligram", "milligrams"],
  L: ["litre", "litres"],
  l: ["litre", "litres"],
  mL: ["millilitre", "millilitres"],
  ml: ["millilitre", "millilitres"],
  hr: ["hour", "hours"],
  hrs: ["hour", "hours"],
  min: ["minute", "minutes"],
  sec: ["second", "seconds"]
};
const sayNumOf = (x) => Number(String(x).replace(/,/g, ""));
const SAY_NUM = "(\\d{1,3}(?:,\\d{2,3})+|\\d+)";
function speakable(s) {
  if (s === null || s === void 0) return "";
  return String(s).replace(new RegExp("(?:₹|\\bRs\\.?)\\s?" + SAY_NUM + "(?:\\.(\\d{1,2}))?", "g"), (_m, r, p) => {
    const rs = sayNumOf(r), ps = p ? Number(p.length === 1 ? p + "0" : p) : 0;
    return [rs || !ps ? words(rs) + (rs === 1 ? " rupee" : " rupees") : "", ps ? words(ps) + " paise" : ""].filter(Boolean).join(" ");
  }).replace(/\b(\d{1,2}):(\d{2})\b/g, (_m, h, mm) => {
    const mi = Number(mm);
    return words(Number(h)) + " " + (mi === 0 ? "o'clock" : mi < 10 ? "oh " + words(mi) : words(mi));
  }).replace(/\b(\d+)(st|nd|rd|th)\b/g, (_m, n) => sayOrdinal(Number(n))).replace(/(\d+)\s?°/g, (_m, n) => words(Number(n)) + (Number(n) === 1 ? " degree" : " degrees")).replace(
    new RegExp(SAY_NUM + "(\\.\\d+)?\\s?(km|cm|mm|mg|kg|mL|ml|hrs|hr|min|sec|m|g|L|l)\\b", "g"),
    (_m, n, d, u) => n + (d || "") + " " + SAY_UNIT[u][!d && sayNumOf(n) === 1 ? 0 : 1]
  ).replace(/\s*×\s*/g, " times ").replace(/\s*÷\s*/g, " divided by ").replace(/\s*−\s*/g, " minus ").replace(/\s+=\s+/g, " equals ").replace(/(\d)=(?=\d)/g, "$1 equals ").replace(/\s+\+\s+/g, " plus ").replace(/(\d)\+(?=\d)/g, "$1 plus ").replace(/(\d)\s+-\s+(?=\d)/g, "$1 minus ").replace(/\b(\d+) (\d+)\s*\/\s*(\d+)/g, (_m, w, a, b) => words(Number(w)) + " and " + fractionWords(Number(a), Number(b))).replace(/(\d+)\s*\/\s*(\d+)/g, (_m, a, b) => fractionWords(Number(a), Number(b))).replace(/(\d{1,3}(?:,\d{2,3})+|\d+)(?:\.(\d+))?/g, (_m, int, dec) => {
    let w = words(Number(String(int).replace(/,/g, "")));
    if (dec) w += " point " + String(dec).split("").map((d) => ONES[Number(d)]).join(" ");
    return w;
  });
}
function mix(hex, toward, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = p(hex), b = p(toward);
  return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0")).join("");
}
const tint = (hex, t) => mix(hex, "#ffffff", t);
const shade = (hex, t) => mix(hex, "#000000", t);
function wrapText(s, max) {
  const out = [];
  let line = "";
  for (const w of String(s || "").split(/\s+/).filter(Boolean)) {
    if (!line) line = w;
    else if ((line + " " + w).length <= max) line += " " + w;
    else {
      out.push(line);
      line = w;
    }
  }
  if (line) out.push(line);
  return out;
}
function pieces(line, max = 80) {
  const out = [];
  const cut = (s, re) => s.replace(re, "$1").split("").map((x) => x.trim()).filter(Boolean);
  const balanced = (s) => {
    const target = Math.ceil(s.length / Math.ceil(s.length / max));
    const res = [];
    let cur = "";
    for (const w of s.split(/\s+/).filter(Boolean)) {
      if (cur && (cur + " " + w).length > target + 6) {
        res.push(cur);
        cur = w;
      } else cur = cur ? cur + " " + w : w;
    }
    if (cur) res.push(cur);
    return res;
  };
  for (const s of cut(String(line), /([.!?।])\s+/g)) {
    if (s.length <= max) {
      out.push(s);
      continue;
    }
    let cur = "";
    for (const part of cut(s, /(,)\s+/g)) {
      if (!cur && part.length <= max) cur = part;
      else if (cur && (cur + " " + part).length <= max) cur += " " + part;
      else {
        if (cur) out.push(cur);
        cur = "";
        if (part.length <= max) cur = part;
        else out.push(...balanced(part));
      }
    }
    if (cur) out.push(cur);
  }
  return out;
}
function leadNumber(s) {
  if (typeof s === "number") return s;
  const m = /-?\d{1,3}(?:,\d{2,3})+(?:\.\d+)?|-?\d+(?:\.\d+)?/.exec(String(s != null ? s : ""));
  return m ? Number(m[0].replace(/,/g, "")) : null;
}
function slotPartsOf(v, n) {
  const s = String(v != null ? v : "");
  const a = Array.isArray(v) ? v : s.includes("|") ? s.split("|") : s.match(/\d[\d,]*/g) || [];
  return Array.from({ length: n }, (_, k) => {
    var _a;
    return String((_a = a[k]) != null ? _a : "").replace(/[^0-9]/g, "");
  });
}
function judgeSlotParts(item, v) {
  const want = Array.isArray(item.answer) ? item.answer : [];
  const got = slotPartsOf(v, want.length);
  const none = (x) => x === null || x === void 0 || x === "";
  return want.length > 0 && want.some((x) => !none(x)) && want.every((x, k) => none(x) ? got[k] === "" : got[k] !== "" && Number(got[k]) === Number(x));
}
const SLOT_FRACTION = [{ label: "numerator", at: "top" }, { label: "denominator", at: "bottom" }];
const SLOT_MIXED = [
  { label: "whole", at: "whole", free: true },
  { label: "numerator", at: "top", free: true },
  { label: "denominator", at: "bottom", free: true }
];
const SLOT_DECIMAL = [{ label: "whole", at: "dwhole" }, { label: "decimal", at: "dpart" }];
function decimalPartsOf(v) {
  const digits = (x) => String(x != null ? x : "").replace(/[^0-9]/g, "");
  if (Array.isArray(v)) return [digits(v[0]), digits(v[1])];
  const s = String(v != null ? v : "");
  const a = s.includes("|") ? s.split("|") : s.split(".");
  return [digits(a[0]), digits(a[1])];
}
function judgeSlotDecimal(item, v) {
  const want = decimalPartsOf(item.answer), got = decimalPartsOf(v);
  return want[1] !== "" && got[0] !== "" && got[1] !== "" && Number(got[0]) === Number(want[0]) && got[1] === want[1];
}
function slotComplete(parts, ps) {
  if (ps.every((p) => p === "")) return false;
  const top = parts.findIndex((p) => p.at === "top"), bot = parts.findIndex((p) => p.at === "bottom");
  if (top >= 0 && bot >= 0 && ps[top] === "" !== (ps[bot] === "")) return false;
  return parts.every((p, k) => p.free || ps[k] !== "");
}
function makeSfx(mutedRef) {
  let ctx = null;
  const ac = () => {
    if (mutedRef.current) return null;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    } catch (e) {
      return null;
    }
  };
  const tone = (c, f, t0, dur, type, peak, fTo) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t0);
    if (fTo) o.frequency.exponentialRampToValueAtTime(fTo, t0 + dur);
    g.gain.setValueAtTime(1e-4, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.03);
  };
  return {
    correct() {
      const c = ac();
      if (!c) return;
      const t = c.currentTime + 0.01, A = AUDIO.correct;
      A.notes.forEach((f, i) => tone(c, f, t + i * A.spacing, 0.18, A.type, 0.11));
      tone(c, A.sparkle.freq, t + A.sparkle.at, 0.25, A.sparkle.type, 0.05);
    },
    wrong() {
      const c = ac();
      if (!c) return;
      const t = c.currentTime + 0.01, A = AUDIO.wrong;
      A.slides.forEach(([a, b], i) => tone(c, a, t + i * 0.17, 0.15, A.type, A.peak, b));
    },
    win() {
      const c = ac();
      if (!c) return;
      const t = c.currentTime + 0.01, A = AUDIO.win;
      A.notes.forEach((f, i) => tone(c, f, t + i * A.spacing, 0.24, "triangle", 0.1));
      A.tail.forEach((f, i) => tone(c, f, t + A.notes.length * A.spacing + i * 0.09, 0.3, "sine", 0.05));
    },
    tick() {
      const c = ac();
      if (!c) return;
      tone(c, 1320, c.currentTime + 5e-3, 0.05, "sine", 0.045);
    },
    /* the lesson has no voice (r30): these four are what a tool uses to feel physical. All Web Audio, no files. */
    /* a knife chop: a short burst of noise through a falling filter, with a low thud under it */
    cut() {
      const c = ac();
      if (!c) return;
      const t = c.currentTime + 5e-3, n = Math.floor(c.sampleRate * 0.09);
      const buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      src.buffer = buf;
      f.type = "bandpass";
      f.Q.value = 0.8;
      f.frequency.setValueAtTime(3200, t);
      f.frequency.exponentialRampToValueAtTime(700, t + 0.09);
      g.gain.setValueAtTime(0.16, t);
      g.gain.exponentialRampToValueAtTime(1e-4, t + 0.1);
      src.connect(f);
      f.connect(g);
      g.connect(c.destination);
      src.start(t);
      tone(c, 150, t, 0.08, "sine", 0.09, 70);
    },
    /* pieces coming to rest: two soft low clicks */
    settle() {
      const c = ac();
      if (!c) return;
      const t = c.currentTime + 5e-3;
      tone(c, 520, t, 0.07, "triangle", 0.07, 360);
      tone(c, 420, t + 0.07, 0.08, "triangle", 0.06, 300);
    },
    /* pieces closing into one: a rising sweep that lands on a click */
    trade() {
      const c = ac();
      if (!c) return;
      const t = c.currentTime + 5e-3;
      tone(c, 300, t, 0.28, "sine", 0.07, 900);
      tone(c, 1040, t + 0.27, 0.12, "triangle", 0.08);
    },
    /* a party popper: a sharp pop (a noise burst and a falling thump) just before the win chime */
    pop() {
      const c = ac();
      if (!c) return;
      const t = c.currentTime + 5e-3, n = Math.floor(c.sampleRate * 0.12);
      const buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
      const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      src.buffer = buf;
      f.type = "highpass";
      f.frequency.value = 900;
      g.gain.setValueAtTime(0.2, t);
      g.gain.exponentialRampToValueAtTime(1e-4, t + 0.13);
      src.connect(f);
      f.connect(g);
      g.connect(c.destination);
      src.start(t);
      tone(c, 220, t, 0.1, "sine", 0.1, 90);
    },
    /* a celebration: a quick run up and a sparkle on top (the summary page; a phase end has win) */
    cheer() {
      const c = ac();
      if (!c) return;
      const t = c.currentTime + 0.01;
      [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98].forEach((f, i) => tone(c, f, t + i * 0.08, 0.26, "triangle", 0.09));
      [2093, 2637, 3136].forEach((f, i) => tone(c, f, t + 0.5 + i * 0.07, 0.22, "sine", 0.04));
    }
  };
}
const SILENT_VOICE = true;
const readMs = (s) => Math.max(2400, String(s).length * 68);
const fireOnce = (fn) => {
  let gone = false;
  return () => {
    if (gone) return;
    gone = true;
    fn();
  };
};
function lineFor(say, lang, table) {
  var _a, _b, _c;
  if (say === null || say === void 0) return "";
  if (typeof say === "string") return lang !== "en" && table && table[lang] && table[lang][say] || say;
  return (_c = (_b = (_a = say[lang]) != null ? _a : say.en) != null ? _b : Object.values(say).find((v) => typeof v === "string")) != null ? _c : "";
}
const HI_0_99 = "शून्य एक दो तीन चार पाँच छह सात आठ नौ दस ग्यारह बारह तेरह चौदह पंद्रह सोलह सत्रह अठारह उन्नीस बीस इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस चालीस इकतालीस बयालीस तैंतालीस चवालीस पैंतालीस छियालीस सैंतालीस अड़तालीस उनचास पचास इक्यावन बावन तिरपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ साठ इकसठ बासठ तिरसठ चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर सतहत्तर अठहत्तर उन्यासी अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सत्तासी अट्ठासी नवासी नब्बे इक्यानवे बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे".split(" ");
const GU_0_99 = "શૂન્ય એક બે ત્રણ ચાર પાંચ છ સાત આઠ નવ દસ અગિયાર બાર તેર ચૌદ પંદર સોળ સત્તર અઢાર ઓગણીસ વીસ એકવીસ બાવીસ તેવીસ ચોવીસ પચ્ચીસ છવ્વીસ સત્તાવીસ અઠ્ઠાવીસ ઓગણત્રીસ ત્રીસ એકત્રીસ બત્રીસ તેત્રીસ ચોત્રીસ પાંત્રીસ છત્રીસ સાડત્રીસ આડત્રીસ ઓગણચાલીસ ચાલીસ એકતાલીસ બેતાલીસ તેતાલીસ ચુંમાલીસ પિસ્તાલીસ છેતાલીસ સુડતાલીસ અડતાલીસ ઓગણપચાસ પચાસ એકાવન બાવન ત્રેપન ચોપન પંચાવન છપ્પન સત્તાવન અઠ્ઠાવન ઓગણસાઠ સાઠ એકસઠ બાસઠ ત્રેસઠ ચોસઠ પાંસઠ છાસઠ સડસઠ અડસઠ ઓગણસિત્તેર સિત્તેર એકોતેર બોતેર તોતેર ચુમ્મોતેર પંચોતેર છોતેર સિત્યોતેર અઠ્યોતેર ઓગણએંસી એંસી એક્યાસી બ્યાસી ત્યાસી ચોર્યાસી પંચાસી છ્યાસી સિત્યાસી અઠ્યાસી નેવ્યાસી નેવું એકાણું બાણું ત્રાણું ચોરાણું પંચાણું છન્નું સત્તાણું અઠ્ઠાણું નવ્વાણું".split(" ");
const GU_HUNDREDS = ["", "એકસો", "બસો", "ત્રણસો", "ચારસો", "પાંચસો", "છસો", "સાતસો", "આઠસો", "નવસો"];
const BIG_WORDS = { hi: ["सौ", "हज़ार", "लाख", "करोड़", "ऋण"], gu: ["સો", "હજાર", "લાખ", "કરોડ", "ઋણ"] };
function wordsIn(v, lang) {
  if (lang !== "hi" && lang !== "gu") return words(v);
  const T2 = lang === "hi" ? HI_0_99 : GU_0_99, [H, TH, L, CR, NEG] = BIG_WORDS[lang];
  let n = Math.trunc(Number(v));
  if (!isFinite(n)) return "";
  if (n < 0) return NEG + " " + wordsIn(-n, lang);
  if (n < 100) return T2[n];
  const u1000 = (x) => {
    const h = Math.floor(x / 100), r = x % 100;
    return [h ? lang === "gu" ? GU_HUNDREDS[h] : T2[h] + " " + H : "", r ? T2[r] : ""].filter(Boolean).join(" ");
  };
  const crore = Math.floor(n / 1e7), lakh = Math.floor(n / 1e5) % 100, thou = Math.floor(n / 1e3) % 100, rest = n % 1e3;
  return [
    crore ? wordsIn(crore, lang) + " " + CR : "",
    lakh ? T2[lakh] + " " + L : "",
    thou ? T2[thou] + " " + TH : "",
    rest ? u1000(rest) : ""
  ].filter(Boolean).join(" ");
}
const OP_WORDS = { hi: ["गुणा", "भाग", "घटा", "जमा", "बराबर", "दशमलव"], gu: ["ગુણ્યા", "ભાગ્યા", "ઓછા", "વત્તા", "બરાબર", "દશાંશ"] };
function speakableIn(s, lang) {
  if (lang !== "hi" && lang !== "gu") return speakable(s);
  if (s === null || s === void 0) return "";
  const [TIMES, DIV, MINUS, PLUS, EQ, POINT] = OP_WORDS[lang], T2 = lang === "hi" ? HI_0_99 : GU_0_99;
  return String(s).replace(/\s*×\s*/g, " " + TIMES + " ").replace(/\s*÷\s*/g, " " + DIV + " ").replace(/\s*−\s*/g, " " + MINUS + " ").replace(/\s+=\s+/g, " " + EQ + " ").replace(/(\d)=(?=\d)/g, "$1 " + EQ + " ").replace(/\s+\+\s+/g, " " + PLUS + " ").replace(/(\d)\+(?=\d)/g, "$1 " + PLUS + " ").replace(/(\d)\s+-\s+(?=\d)/g, "$1 " + MINUS + " ").replace(/(\d{1,3}(?:,\d{2,3})+|\d+)(?:\.(\d+))?/g, (_m, int, dec) => wordsIn(Number(String(int).replace(/,/g, "")), lang) + (dec ? " " + POINT + " " + dec.split("").map((d) => T2[Number(d)]).join(" ") : ""));
}
const LANG_TAG = { en: "en-IN", hi: "hi-IN", gu: "gu-IN" };
function pickVoice(lang) {
  var _a, _b, _c;
  try {
    const all = window.speechSynthesis.getVoices() || [];
    const tag = LANG_TAG[lang || "en"] || LANG_TAG.en, base = tag.split("-")[0];
    if (base !== "en") {
      return (_c = (_b = (_a = all.find((v) => v.lang === tag)) != null ? _a : all.find((v) => String(v.lang || "").replace("_", "-").toLowerCase().startsWith(base + "-"))) != null ? _b : all.find((v) => String(v.lang || "").toLowerCase() === base)) != null ? _c : null;
    }
    const en = all.filter((v) => /^en([-_]|$)/i.test(v.lang || ""));
    if (!en.length) return null;
    const score = (v) => {
      const n = String(v.name || "").toLowerCase(), l = String(v.lang || "").toLowerCase().replace("_", "-");
      let s = l === "en-in" ? 100 : l === "en-gb" ? 40 : /^en-(au|ie|za|nz)$/.test(l) ? 30 : l === "en-us" ? 20 : 10;
      if (/natural|neural|online|premium|enhanced|wavenet/.test(n)) s += 25;
      if (/female|heera|neerja|veena|kalpana|zira|samantha|karen|moira|tessa|serena|google uk english female/.test(n)) s += 10;
      if (v.localService === false) s -= 5;
      if (/espeak|robot|whisper|novelty|bad news|bells|jester|zarvox/.test(n)) s -= 60;
      return s;
    };
    return en.slice().sort((a, b) => score(b) - score(a))[0];
  } catch (e) {
    return null;
  }
}
const voiceMap = () => typeof TOOL_VOICE !== "undefined" ? TOOL_VOICE : {};
const hasBakedVoice = (lang) => Object.keys(voiceMap()).some((t) => voicePieceLang(t) === (lang || "en"));
let voiceCtx = null;
const ensureVoiceCtx = () => {
  try {
    voiceCtx = voiceCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (voiceCtx.state === "suspended") voiceCtx.resume();
    return voiceCtx;
  } catch (e) {
    return null;
  }
};
const voiceBuf = {};
let voiceSrc = null;
const stopClip = () => {
  if (voiceSrc) {
    try {
      voiceSrc.onended = null;
      voiceSrc.stop();
    } catch (e) {
    }
    voiceSrc = null;
  }
};
const voiceBase = () => typeof TOOL_VOICE_BASE !== "undefined" ? TOOL_VOICE_BASE : "";
const voicePending = {};
const voiceDecode = (text) => {
  if (voiceBuf[text]) return Promise.resolve(voiceBuf[text]);
  if (voicePending[text]) return voicePending[text];
  const uri = voiceMap()[text];
  if (!uri) return Promise.reject(new Error("no clip for this piece"));
  const ctx = ensureVoiceCtx();
  if (!ctx) return Promise.reject(new Error("no audio context"));
  let bytes;
  if (/^data:/.test(uri)) {
    const b = atob(uri.slice(uri.indexOf(",") + 1)), a = new Uint8Array(b.length);
    for (let i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
    bytes = Promise.resolve(a.buffer);
  } else {
    bytes = fetch(voiceBase() + uri).then((res) => {
      if (!res.ok) throw new Error("voice clip " + res.status);
      return res.arrayBuffer();
    });
  }
  const p = bytes.then((ab) => ctx.decodeAudioData(ab)).then(
    (buf) => {
      voiceBuf[text] = buf;
      delete voicePending[text];
      return buf;
    },
    (e) => {
      delete voicePending[text];
      throw e;
    }
  );
  voicePending[text] = p;
  return p;
};
const voicePieceLang = (text) => /[઀-૿]/.test(text) ? "gu" : /[ऀ-ॿ]/.test(text) ? "hi" : "en";
let voiceWarm = "";
const warmVoice = (lang) => {
  const vm = voiceMap();
  if (voiceWarm === lang || !Object.keys(vm).length) return;
  voiceWarm = lang;
  const todo = Object.keys(vm).filter((text) => voicePieceLang(text) === lang);
  let next = 0;
  const pump = () => {
    if (voiceWarm !== lang || next >= todo.length) return;
    voiceDecode(todo[next++]).then(pump, pump);
  };
  for (let k = 0; k < 4; k++) pump();
};
function useVoice(mutedRef, langRef, cfg, holdRef) {
  const [line, setLine] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const token = useRef(0);
  const last = useRef([]);
  const lastOpts = useRef({});
  const parked = useRef(null);
  const [held, setHeld] = useState(false);
  const holding = () => !!(holdRef && holdRef.current);
  const park = (fn) => {
    parked.current = fn;
    setHeld(true);
  };
  const unpark = () => {
    parked.current = null;
    setHeld(false);
  };
  const cur = useRef(null);
  const timers = useRef([]);
  const blocked = useRef(false);
  const [needsTap, setNeedsTap] = useState(false);
  const waited = useRef(false);
  const synth = () => typeof window !== "undefined" && window.speechSynthesis || null;
  const later = (fn, ms) => {
    const t = setTimeout(() => {
      timers.current = timers.current.filter((x) => x !== t);
      fn();
    }, ms);
    timers.current.push(t);
  };
  const flush = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const stopEngine = () => {
    try {
      const s = synth();
      if (s) s.cancel();
    } catch (e) {
    }
    stopClip();
  };
  const reached = (r) => {
    const share = (Date.now() - r.t0) / Math.max(1, r.span);
    const byTime = r.base + Math.round(share * (r.text.length - r.base));
    return Math.max(0, Math.min(r.text.length, Math.max(r.mark, byTime)));
  };
  const restMs = (text, from) => Math.max(400, Math.round(readMs(text) * (1 - from / Math.max(1, text.length))));
  const wordStart = (text, at) => {
    let k = Math.min(at, text.length);
    while (k > 0 && /\S/.test(text[k - 1])) k--;
    return k;
  };
  const utter = (r, from) => {
    r.base = from;
    r.t0 = Date.now();
    r.span = restMs(r.text, from);
    r.mark = from;
    const quiet = (ms) => later(() => {
      if (cur.current === r) r.done();
    }, holding() && !r.last && !r.nopark ? 0 : ms);
    if (SILENT_VOICE) {
      setSpeaking(false);
      quiet(r.span);
      return;
    }
    if (hasBakedVoice(langRef.current)) {
      if (blocked.current && !mutedRef.current) {
        setSpeaking(false);
        setNeedsTap(true);
        return;
      }
      if (mutedRef.current) {
        setSpeaking(false);
        quiet(r.span);
        return;
      }
      const uri = voiceMap()[r.text];
      if (!uri) {
        setSpeaking(false);
        quiet(r.span);
        return;
      }
      const uid = r.uid = (r.uid || 0) + 1;
      const live = () => cur.current === r && r.uid === uid;
      let settled = false;
      const giveUp = () => {
        if (settled || !live()) return;
        settled = true;
        setSpeaking(false);
        quiet(r.span);
      };
      later(giveUp, 2500);
      voiceDecode(r.text).then((buf) => {
        if (settled || !live()) return;
        const ctx = ensureVoiceCtx();
        if (!ctx) {
          giveUp();
          return;
        }
        if (ctx.state !== "running") {
          settled = true;
          blocked.current = true;
          setSpeaking(false);
          setNeedsTap(true);
          return;
        }
        settled = true;
        const offset = Math.min(Math.max(from / Math.max(1, r.text.length), 0), 1) * buf.duration;
        r.t0 = Date.now();
        r.span = Math.max(200, (buf.duration - offset) * 1e3);
        r.mark = from;
        try {
          stopEngine();
          const src = ctx.createBufferSource();
          src.buffer = buf;
          src.connect(ctx.destination);
          src.onended = () => {
            if (live()) {
              setSpeaking(false);
              r.done();
            }
          };
          voiceSrc = src;
          src.start(0, offset);
          setSpeaking(true);
        } catch (e) {
          setSpeaking(false);
          quiet(r.span);
        }
      }, giveUp);
      return;
    }
    const s = synth();
    if (blocked.current && !mutedRef.current) {
      setSpeaking(false);
      setNeedsTap(true);
      return;
    }
    if (mutedRef.current || !s || typeof window.SpeechSynthesisUtterance === "undefined") {
      setSpeaking(false);
      quiet(r.span);
      return;
    }
    const v = pickVoice(langRef.current);
    if (!v) {
      setSpeaking(false);
      quiet(r.span);
      if (!waited.current) {
        waited.current = true;
        let fired = false;
        const go = () => {
          if (fired) return;
          fired = true;
          try {
            s.removeEventListener && s.removeEventListener("voiceschanged", go);
          } catch (e) {
          }
          if (cur.current === r && !mutedRef.current && pickVoice(langRef.current)) {
            flush();
            utter(r, wordStart(r.text, reached(r)));
          }
        };
        try {
          s.addEventListener && s.addEventListener("voiceschanged", go);
        } catch (e) {
        }
        later(go, 1500);
      }
      return;
    }
    try {
      stopEngine();
      const uid = r.uid = (r.uid || 0) + 1;
      const live = () => cur.current === r && r.uid === uid;
      const u = new window.SpeechSynthesisUtterance(r.text.slice(from));
      u.voice = v;
      u.lang = v.lang;
      u.rate = cfg.rate;
      u.pitch = cfg.pitch;
      u.onstart = () => {
        if (live()) setSpeaking(true);
      };
      u.onboundary = (e) => {
        if (live() && e && typeof e.charIndex === "number") r.mark = from + e.charIndex;
      };
      u.onend = () => {
        if (!live()) return;
        setSpeaking(false);
        r.done();
      };
      u.onerror = (e) => {
        if (!live()) return;
        setSpeaking(false);
        if (e && e.error === "not-allowed") {
          blocked.current = true;
          setNeedsTap(true);
          flush();
          return;
        }
        flush();
        quiet(restMs(r.text, r.base) - Math.min(Date.now() - r.t0, restMs(r.text, r.base) - 400));
      };
      s.speak(u);
      later(() => {
        if (live()) {
          setSpeaking(false);
          r.done();
        }
      }, r.span + 6e3);
    } catch (e) {
      setSpeaking(false);
      quiet(r.span);
    }
  };
  const hush = useCallback(() => {
    token.current++;
    cur.current = null;
    flush();
    stopEngine();
    setSpeaking(false);
    unpark();
  }, []);
  const speak = useCallback((lines, done, opts) => {
    const run = ++token.current;
    cur.current = null;
    flush();
    stopEngine();
    setSpeaking(false);
    unpark();
    if (!SILENT_VOICE && hasBakedVoice(langRef.current)) warmVoice(langRef.current);
    const list = (Array.isArray(lines) ? lines : [lines]).map((l) => speakableIn(l, langRef.current)).filter(Boolean).flatMap((l) => pieces(l));
    last.current = list;
    lastOpts.current = opts || {};
    const open = !!(opts && opts.open);
    let called = false;
    const fire = () => {
      if (called) return;
      called = true;
      if (done) done();
    };
    const gate = (k) => {
      if (run !== token.current) return;
      if (holding() && !(opts && opts.nopark) && k < list.length) {
        park(() => step(k));
        return;
      }
      step(k);
    };
    const step = (i) => {
      if (run !== token.current) return;
      if (i >= list.length) {
        cur.current = null;
        setSpeaking(false);
        fire();
        return;
      }
      const text = list[i];
      setLine(text);
      if (/\d/.test(text)) console.warn("[voice] a spoken line still contains a digit:", text);
      let spent = false;
      const r = {
        text,
        base: 0,
        t0: Date.now(),
        span: readMs(text),
        mark: 0,
        last: i === list.length - 1,
        nopark: !!(opts && opts.nopark),
        done: () => {
          if (spent || run !== token.current) return;
          spent = true;
          if (cur.current === r) cur.current = null;
          gate(i + 1);
        },
        /* a tap on the bubble while this piece is still going: cut it short and show the next at once */
        skip: () => {
          if (spent || run !== token.current) return;
          spent = true;
          r.uid = (r.uid || 0) + 1;
          if (cur.current === r) cur.current = null;
          flush();
          stopEngine();
          setSpeaking(false);
          step(i + 1);
        }
      };
      cur.current = r;
      utter(r, 0);
    };
    step(0);
  }, []);
  const release = useCallback((onlyParked = false) => {
    const f = parked.current;
    if (f) {
      parked.current = null;
      setHeld(false);
      f();
      return true;
    }
    if (onlyParked) return false;
    const r = cur.current;
    if (r && r.skip && holding()) {
      r.skip();
      return true;
    }
    return false;
  }, []);
  const pause = useCallback(() => {
    const r = cur.current;
    setSpeaking(false);
    setNeedsTap(false);
    if (!r) {
      stopEngine();
      return;
    }
    const at = reached(r);
    r.uid = (r.uid || 0) + 1;
    cur.current = null;
    stopEngine();
    flush();
    cur.current = r;
    r.base = at;
    r.t0 = Date.now();
    r.span = restMs(r.text, at);
    r.mark = at;
    later(() => {
      if (cur.current === r) r.done();
    }, holding() ? 0 : r.span);
  }, []);
  const resume = useCallback(() => {
    const r = cur.current;
    if (!r || mutedRef.current) return;
    blocked.current = false;
    const at = wordStart(r.text, reached(r));
    if (at >= r.text.length - 2) return;
    cur.current = null;
    stopEngine();
    flush();
    cur.current = r;
    utter(r, at);
  }, []);
  const unlock = useCallback(() => {
    if (!SILENT_VOICE && hasBakedVoice(langRef.current)) ensureVoiceCtx();
    if (!blocked.current) return;
    blocked.current = false;
    setNeedsTap(false);
    const r = cur.current;
    if (r && !mutedRef.current) {
      r.uid = (r.uid || 0) + 1;
      flush();
      utter(r, 0);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("pointerdown", unlock, true);
    window.addEventListener("keydown", unlock, true);
    return () => {
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("keydown", unlock, true);
    };
  }, [unlock]);
  const repeat = useCallback((done) => {
    if (last.current.length) speak(last.current, done, lastOpts.current);
  }, [speak]);
  const again = useCallback(() => repeat(), [repeat]);
  useEffect(() => () => hush(), [hush]);
  const state = () => ({ voice: SILENT_VOICE ? "silent" : hasBakedVoice(langRef.current) ? "baked clips" : (() => {
    const v = pickVoice(langRef.current);
    return v ? `${v.name} (${v.lang})` : null;
  })(), blocked: blocked.current, inFlight: cur.current ? cur.current.text : null });
  const reading = () => !!cur.current;
  return { line, speaking, needsTap, unlock, speak, hush, pause, resume, again, repeat, state, held, release, reading };
}
function bankFor(P, phase, fit) {
  var _a;
  const host = (_a = P.questions) != null ? _a : P.additionalProps && P.additionalProps.questions;
  if (Array.isArray(host) && host.length) {
    const mine = host.filter((q) => q && (q.phase === void 0 || q.phase === null || Number(q.phase) === Number(phase.n)));
    const norm = fit ? mine.map((q) => fit(q, phase)).filter(Boolean) : mine.map((q) => {
      var _a2, _b, _c;
      return {
        say: q.question || q.prompt || q.text || "",
        ask: q.ask || "",
        answer: leadNumber((_c = (_b = (_a2 = q.answer) != null ? _a2 : q.final_answer) != null ? _b : q.correct) != null ? _c : q.value),
        miss: q.miss || q.hint || "",
        host: true
      };
    }).filter((q) => q.answer !== null);
    if (norm.length) return norm;
  }
  return phase.items && phase.items.length ? phase.items : [{ say: "", ask: "", answer: null }];
}
function Defs({ C }) {
  const g = (id, top, bottom) => <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={top} />
      <stop offset="1" stopColor={bottom} />
    </linearGradient>;
  const shadow = (id, dy, sd, op) => <filter id={id} x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy={dy} stdDeviation={sd} floodColor="#3A2E1C" floodOpacity={op} />
    </filter>;
  return <defs>
      {g("gCard", "#FFFFFF", C.paper)}
      {g("gKey", "#FFFFFF", tint(C.panel, 0.3))}
      {g("gPanel", tint(C.panel, 0.45), C.panel)}
      {g("gAccent", tint(C.accent, 0.22), C.accent)}
      {g("gHundred", tint(CONTENT.hundred, 0.28), CONTENT.hundred)}
      {g("gTen", tint(CONTENT.ten, 0.3), CONTENT.ten)}
      {g("gOne", tint(CONTENT.one, 0.28), CONTENT.one)}
      {g("gBead", tint(CONTENT.bead, 0.28), CONTENT.bead)}
      {g("gPointer", tint(CONTENT.pointer, 0.28), CONTENT.pointer)}
      {THEME && THEME.key && g("gTkey", THEME.key[0], THEME.key[1])}
      {THEME && THEME.enter && g("gTenter", THEME.enter[0], THEME.enter[1])}
      {THEME && THEME.soft && g("gTsoft", THEME.soft[0], THEME.soft[1])}
      {THEME && THEME.panel && g("gTpanel", THEME.panel[0], THEME.panel[1])}
      {shadow("fShadow", 6, 7, 0.16)}
      {shadow("fShadowSoft", 3, 3, 0.14)}
      {shadow("fLift", 14, 10, 0.24)}
      {shadow("fBtnDown", 1, 1.5, 0.18)}
    </defs>;
}
function Invite({ x, y, r = 56, C }) {
  return <circle className="c4-pulse" cx={x} cy={y} r={r} fill="none" stroke={THEME && THEME.enter && THEME.enter[1] || C && C.accent || DEFAULT_CHROME.accent} strokeWidth={5} pointerEvents="none" />;
}
function BlinkRing({ x, y, w, h, rx, C, sw = 4, m = 2 }) {
  return <rect
    className="c4-nextblink"
    x={x - m}
    y={y - m}
    width={w + 2 * m}
    height={h + 2 * m}
    rx={(rx != null ? rx : RAD.key) + m}
    fill="none"
    strokeWidth={sw}
    stroke={THEME && THEME.enter && THEME.enter[1] || C && C.accent || DEFAULT_CHROME.accent}
    pointerEvents="none"
  />;
}
function NextBlink({ x, y, w, h, C }) {
  return <BlinkRing x={x} y={y} w={w} h={h + EDGE} rx={RAD.key} C={C} />;
}
function reducedMotion() {
  try {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  } catch (e) {
    return false;
  }
}
function useTimeline() {
  const token = useRef(0);
  const timers = useRef([]);
  const [busy, setBusy] = useState(false);
  const stop = useCallback(() => {
    token.current++;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setBusy(false);
  }, []);
  const run = useCallback((steps, done) => {
    token.current++;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const t = token.current, fast = reducedMotion();
    setBusy(true);
    let i = 0;
    const next = () => {
      if (t !== token.current) return;
      if (i >= steps.length) {
        setBusy(false);
        if (done) done();
        return;
      }
      const [ms, fn] = steps[i++];
      try {
        if (fn) fn();
      } catch (e) {
        console.error(e);
      }
      timers.current.push(setTimeout(next, fast ? Math.min(ms, 25) : ms));
    };
    next();
  }, []);
  useEffect(() => stop, [stop]);
  return { run, stop, busy };
}
function useSlide(target) {
  const [v, setV] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    if (cur.current === target) return;
    if (reducedMotion()) {
      cur.current = target;
      setV(target);
      return;
    }
    const from = cur.current, t0 = performance.now(), dur = 280;
    let raf = 0;
    const step = (now) => {
      const k = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
      cur.current = k >= 1 ? target : from + (target - from) * e;
      setV(cur.current);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}
function Skin({ name, x, y, w, h, clip, opacity = 1, fit = "slice" }) {
  const [bad, setBad] = useState(false);
  const src = typeof TOOL_IMAGES !== "undefined" ? TOOL_IMAGES[name] : "";
  if (!src || bad || !SKINS) return null;
  return <image
    data-role="skin"
    href={src}
    x={x}
    y={y}
    width={w}
    height={h}
    preserveAspectRatio={fit === "stretch" ? "none" : "xMidYMid slice"}
    clipPath={clip}
    opacity={opacity}
    pointerEvents="none"
    aria-hidden="true"
    onError={() => setBad(true)}
  />;
}
let SKINS = true;
let THEME = null;
const toneInk = (tone, d) => THEME && tone && THEME[tone] ? THEME[tone][3] : d;
const slotEdge = (C) => THEME && THEME.slot || C.accent;
function stagePoint(ev, x, y) {
  const el = ev && ev.target;
  const svg = el && (el.ownerSVGElement || el.closest && el.closest("svg"));
  if (!svg || !svg.getScreenCTM) return null;
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  const p = pt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: p.x, y: p.y };
}
const DRAGS = { live: 0 };
function useDrag(onDrop) {
  const [drag, setDrag] = useState(null);
  const dropRef = useRef(onDrop);
  dropRef.current = onDrop;
  const live = useRef(null);
  const bind = useGestureDrag(({ args, first, last, xy, event, canceled }) => {
    const payload = args && args[0];
    if (first) {
      const s = stagePoint(event, xy[0], xy[1]);
      if (!s) return;
      const p0 = { x: s.x - W.x, y: s.y - W.y };
      live.current = { payload, p0, p: p0, moved: false, svgEvent: event };
      DRAGS.live++;
      setDrag({ payload, x: p0.x, y: p0.y, moved: false });
    }
    const d = live.current;
    if (!d) return;
    if (!first) {
      const s = stagePoint(event, xy[0], xy[1]) || stagePoint(d.svgEvent, xy[0], xy[1]);
      if (s) d.p = { x: s.x - W.x, y: s.y - W.y };
      if (Math.hypot(d.p.x - d.p0.x, d.p.y - d.p0.y) > 8) d.moved = true;
      if (!last) setDrag({ payload: d.payload, x: d.p.x, y: d.p.y, moved: d.moved });
    }
    if (last) {
      live.current = null;
      DRAGS.live = Math.max(0, DRAGS.live - 1);
      setDrag(null);
      if (!canceled) dropRef.current(d.payload, d.p, d.moved);
      pointerBlur();
    }
  }, { pointer: { keys: false, capture: false } });
  const keys = (payload) => ({
    onKeyDown: (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      e.stopPropagation();
      dropRef.current(payload, { x: NaN, y: NaN }, false);
    }
  });
  return { drag, bind: (payload) => ({ ...bind(payload), "data-drag": "", onMouseDown: (e) => e.preventDefault() }), keys };
}
function pointerBlur() {
  const a = typeof document !== "undefined" ? document.activeElement : null;
  if (a && a !== document.body && typeof a.blur === "function") a.blur();
}
function usePress(onPress, enabled = true, keepFocus = false) {
  const [down, setDown] = useState(false);
  const act = useRef(onPress);
  act.current = onPress;
  const on = useRef(enabled);
  on.current = enabled;
  const gb = useGestureDrag(({ down: d, tap }) => {
    if (!on.current) {
      setDown(false);
      return;
    }
    setDown(d);
    if (tap) {
      act.current();
      pointerBlur();
    }
  }, { filterTaps: true, tapsThreshold: 12, pointer: { keys: false } });
  const bind = () => ({ ...gb(), onMouseDown: (e) => e.preventDefault() });
  const keys = (e) => {
    if (!on.current || e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    e.stopPropagation();
    setDown(true);
    setTimeout(() => setDown(false), 120);
    act.current();
    if (!keepFocus) pointerBlur();
  };
  return { down, bind, keys };
}
function Hit({ id, x, y, w, h, onPress, label, enabled = true, keep = false }) {
  const p = usePress(onPress, enabled, keep);
  return <rect
    className="c4-hit"
    data-control={id}
    role="button"
    tabIndex={0}
    aria-label={label || id}
    x={x}
    y={y}
    width={w}
    height={h}
    fill="transparent"
    {...p.bind()}
    onKeyDown={p.keys}
  />;
}
const control = (id, label) => ({ "data-control": id, role: "button", tabIndex: 0, "aria-label": label || id });
function Disc({ x, y, r = 18, paint, lift, ring, flat }) {
  return <g filter={flat ? void 0 : lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <circle cx={x} cy={y} r={r} fill={`url(#${paint})`} stroke={ring || "#00000022"} strokeWidth={ring ? 4 : 1.5} />
      <ellipse cx={x - r * 0.28} cy={y - r * 0.4} rx={r * 0.42} ry={r * 0.2} fill="#FFFFFF" fillOpacity={0.5} />
    </g>;
}
const BLOCK_SIZE = { one: { w: 36, h: 36 }, ten: { w: 36, h: 72 }, hundred: { w: 72, h: 72 }, thousand: { w: 88, h: 88 } };
function Block({ kind, x, y, paint, base, lift, label: labelled = true }) {
  const face = `url(#${paint})`, edge = shade(base, 0.25), rule = tint(base, 0.35);
  const label = { one: "1", ten: "10", hundred: "100", thousand: "1,000" }[kind];
  const txt = (cx, cy) => labelled && <text x={cx} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF" stroke={edge} strokeWidth={3} paintOrder="stroke">{label}</text>;
  const lines = (x0, y0, w, h, nx, ny) => <g stroke={rule} strokeWidth={1.2}>
      {Array.from({ length: nx - 1 }).map((_, i) => <line key={"v" + i} x1={x0 + w * (i + 1) / nx} y1={y0} x2={x0 + w * (i + 1) / nx} y2={y0 + h} />)}
      {Array.from({ length: ny - 1 }).map((_, i) => <line key={"h" + i} x1={x0} y1={y0 + h * (i + 1) / ny} x2={x0 + w} y2={y0 + h * (i + 1) / ny} />)}
    </g>;
  return <g filter={lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      {kind === "thousand" ? <g>
          <path d={`M ${x} ${y + 16} L ${x + 16} ${y} L ${x + 88} ${y} L ${x + 72} ${y + 16} Z`} fill={tint(base, 0.3)} stroke={edge} strokeWidth={2} />
          <path d={`M ${x + 72} ${y + 16} L ${x + 88} ${y} L ${x + 88} ${y + 72} L ${x + 72} ${y + 88} Z`} fill={shade(base, 0.12)} stroke={edge} strokeWidth={2} />
          <rect x={x} y={y + 16} width={72} height={72} fill={face} stroke={edge} strokeWidth={2} />
          {lines(x, y + 16, 72, 72, 10, 10)}
          {txt(x + 36, y + 52)}
        </g> : <g>
          <rect x={x} y={y} width={BLOCK_SIZE[kind].w} height={BLOCK_SIZE[kind].h} rx={kind === "one" ? 7 : 5} fill={face} stroke={edge} strokeWidth={2} />
          {kind === "ten" && lines(x, y, 36, 72, 1, 10)}
          {kind === "hundred" && lines(x, y, 72, 72, 10, 10)}
          {txt(x + BLOCK_SIZE[kind].w / 2, y + BLOCK_SIZE[kind].h / 2)}
        </g>}
    </g>;
}
function Key({ id, x, y, w, h, C, primary, onClick, children, rx = RAD.key, disabled, label, tone }) {
  const p = usePress(onClick || (() => {
  }), !disabled);
  const th = THEME && tone && THEME[tone] ? THEME[tone] : null;
  const base = th ? th[2] : primary ? shade(C.accent, 0.28) : shade(C.rule, 0.08);
  return <g
    className={"c4-ctl" + (disabled ? " is-off" : "") + (p.down ? " is-down" : "")}
    data-control={id}
    role="button"
    aria-label={label || id}
    aria-disabled={disabled ? "true" : void 0}
    tabIndex={disabled ? -1 : 0}
    {...disabled ? {} : p.bind()}
    onKeyDown={p.keys}
  >
      {!disabled && <rect x={x} y={y + EDGE} width={w} height={h} rx={rx} fill={base} />}
      <g className="c4-body" style={{ transform: `translateY(${!disabled && p.down ? EDGE : 0}px)` }}>
        <rect
    className="c4-face"
    x={x}
    y={y}
    width={w}
    height={h}
    rx={rx}
    fill={disabled ? tint(C.panel, 0.55) : th ? `url(#gT${tone})` : primary ? "url(#gAccent)" : "url(#gKey)"}
    stroke={disabled ? tint(C.rule, 0.35) : th ? th[2] : primary ? shade(C.accent, 0.18) : C.rule}
    strokeWidth={2}
  />
        {!disabled && <path d={`M ${x + rx} ${y + 3} H ${x + w - rx}`} stroke="#FFFFFF" strokeOpacity={th ? 0.42 : primary ? 0.4 : 0.95} strokeWidth={3} strokeLinecap="round" />}
        <g transform={`translate(${x + w / 2},${y + h / 2})`}>{children}</g>
      </g>
    </g>;
}
function RoundControl({ id, cx, cy, C, onClick, children, label }) {
  const p = usePress(onClick || (() => {
  }));
  return <g
    className={"c4-ctl" + (p.down ? " is-down" : "")}
    data-control={id}
    role="button"
    aria-label={label || id}
    tabIndex={0}
    {...p.bind()}
    onKeyDown={p.keys}
  >
      <circle cx={cx} cy={cy} r={HIT / 2} fill="transparent" />
      <circle cx={cx} cy={cy + 4} r={28} fill={shade(C.rule, 0.08)} />
      <g className="c4-body" style={{ transform: `translateY(${p.down ? 4 : 0}px)` }}>
        <circle className="c4-face" cx={cx} cy={cy} r={28} fill="url(#gKey)" stroke={C.rule} strokeWidth={2} />
        <path d={`M ${cx - 13} ${cy - 24} A 28 28 0 0 1 ${cx + 13} ${cy - 24}`} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" />
        <g transform={`translate(${cx},${cy})`}>{children}</g>
      </g>
    </g>;
}
const ICON = { fill: "none", strokeWidth: 4.5, strokeLinecap: "round", strokeLinejoin: "round" };
function IconHint({ c }) {
  return <g {...ICON} stroke={c}>
      <path d="M -6 12 h 12 M -4 19 h 8" />
      <path d="M -9 8 c 0 -5 -9 -8 -9 -17 a 13 13 0 0 1 26 0 c 0 9 -9 12 -9 17 z" />
    </g>;
}
function IconAgain({ c }) {
  return <g {...ICON} stroke={c}><path d="M -13 -9 h 26 a 5 5 0 0 1 5 5 v 11 a 5 5 0 0 1 -5 5 h -13 l -8 7 v -7 h -5 a 5 5 0 0 1 -5 -5 v -11 a 5 5 0 0 1 5 -5 z" /></g>;
}
function IconSound({ c, on }) {
  return <g {...ICON} stroke={c}>
      <path d="M -14 -5 h 7 l 9 -8 v 26 l -9 -8 h -7 z" />
      {on ? <path d="M 7 -7 a 10 10 0 0 1 0 14 M 11 -12 a 17 17 0 0 1 0 24" /> : <path d="M 6 -11 L 19 11" />}
    </g>;
}
function IconRestart({ c }) {
  return <g {...ICON} stroke={c}><path d="M 12 -8 a 14 14 0 1 0 2 12" /><path d="M 13 -16 v 9 h -9" /></g>;
}
function IconBack({ c }) {
  return <g {...ICON} stroke={c}><path d="M -20 0 l 10 -12 h 26 a 4 4 0 0 1 4 4 v 16 a 4 4 0 0 1 -4 4 h -26 z" /><path d="M 2 -5 l -7 5 l 7 5" /></g>;
}
function IconEnter({ c }) {
  return <g {...ICON} stroke={c}><path d="M 16 -12 v 8 a 6 6 0 0 1 -6 6 h -24" /><path d="M -8 -5 l -7 7 l 7 7" /></g>;
}
const CSS = `
.c4-frame{width:min(100vw,177.78vh);height:min(100vh,56.25vw)}
@supports (height:100dvh){.c4-frame{width:min(100vw,177.78dvh);height:min(100dvh,56.25vw)}}
.c4{display:block;font-family:${FONT};-webkit-tap-highlight-color:transparent}
.c4 text{font-family:${FONT}}
.c4-ctl,.c4-hit{cursor:pointer;outline:none}
.c4-ctl .c4-body{transition:transform 70ms ease-out}
.c4-fill{transition:width 480ms ease-out}
[data-drag],.c4-ctl,.c4-hit{touch-action:none;-webkit-user-select:none;user-select:none}
.c4-ctl.is-down .c4-face{filter:url(#fBtnDown)}
.c4-ctl.is-off,.c4-quiet .c4-ctl{cursor:default}
.c4-quiet .c4-ctl{pointer-events:none}
@media (hover:hover){.c4-ctl:not(.is-off):hover .c4-face{stroke:var(--c4-accent);stroke-width:3}}
.c4-ctl:focus,.c4-hit:focus{outline:none}
.c4-ctl:focus-visible .c4-face{stroke:var(--c4-focus);stroke-width:5}
.c4-hit:focus-visible,.c4-piece:focus-visible{outline:4px solid var(--c4-focus);outline-offset:2px}
.c4-piece{outline:none}
.c4-pulse{transform-box:fill-box;transform-origin:center;animation:c4pulse 1.8s ease-out infinite}
@keyframes c4pulse{0%{transform:scale(.92);opacity:.65}75%{transform:scale(1.22);opacity:0}100%{transform:scale(1.22);opacity:0}}
.c4-caret{animation:c4blink 1.1s steps(1) infinite}
@keyframes c4blink{50%{opacity:0}}
.c4-talk{transform-box:fill-box;transform-origin:50% 100%;animation:c4talk .9s ease-in-out infinite}
@keyframes c4talk{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-5px) rotate(-1.5deg)}}
.c4-hop{transform-box:fill-box;transform-origin:50% 100%;animation:c4hop .75s ease-out 1}
@keyframes c4hop{0%{transform:translateY(0)}35%{transform:translateY(-24px) rotate(-2deg)}70%{transform:translateY(0) scale(1.03,.97)}100%{transform:none}}
.c4-nod{transform-box:fill-box;transform-origin:50% 100%;animation:c4nod .6s ease-in-out 1}
@keyframes c4nod{0%,100%{transform:none}30%{transform:rotate(-4deg)}65%{transform:rotate(3deg)}}
.c4-cheer{transform-box:fill-box;transform-origin:50% 100%;animation:c4cheer 2.1s ease-in-out 1}
@keyframes c4cheer{0%{transform:none}8%{transform:scale(1.05,.93)}24%{transform:translateY(-26px) scale(.98,1.03) rotate(-3deg)}38%{transform:scale(1.05,.94)}54%{transform:translateY(-32px) scale(.98,1.03) rotate(3deg)}68%{transform:scale(1.05,.94)}84%{transform:translateY(-38px) scale(.98,1.03) rotate(-2deg)}96%{transform:scale(1.04,.95)}100%{transform:none}}
.c4-cheer1{transform-box:fill-box;transform-origin:50% 100%;animation:c4cheer1 .85s ease-out 1}
@keyframes c4cheer1{0%{transform:none}12%{transform:scale(1.05,.93)}40%{transform:translateY(-26px) scale(.98,1.03) rotate(-2deg)}70%{transform:scale(1.04,.95)}100%{transform:none}}
.c4-twinkle{transform-box:fill-box;transform-origin:center;animation:c4twinkle 1.1s ease-in-out 2 both}
@keyframes c4twinkle{0%{transform:scale(0) rotate(0);opacity:0}35%{transform:scale(1.15) rotate(45deg);opacity:1}70%{transform:scale(.8) rotate(90deg);opacity:1}100%{transform:scale(1.1) rotate(135deg);opacity:0}}
.c4-px{animation:c4px 1.9s cubic-bezier(.2,.7,.4,1) both}
.c4-py{animation:c4py 1.9s cubic-bezier(.3,0,.5,1) both}
.c4-pr{transform-box:fill-box;transform-origin:center;animation:c4pr 1.9s linear both,c4pf 1.9s ease-in both}
@keyframes c4px{0%{transform:translateX(0)}100%{transform:translateX(var(--dx))}}
@keyframes c4py{0%{transform:translateY(0)}42%{transform:translateY(var(--ay))}100%{transform:translateY(var(--by))}}
@keyframes c4pr{0%{transform:rotate(0)}100%{transform:rotate(var(--r))}}
@keyframes c4pf{0%,70%{opacity:1}100%{opacity:0}}
.c4-flash{transform-box:fill-box;transform-origin:50% 100%;animation:c4flash .4s ease-out both}
@keyframes c4flash{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.6);opacity:0}}
.c4-ring{animation:c4ring 1.2s ease-in-out infinite}
@keyframes c4ring{50%{stroke-opacity:.35}}
.c4-cue{animation:c4cue .8s ease-in-out infinite}
@keyframes c4cue{0%,100%{opacity:1}50%{opacity:.05}}
.c4-nextblink{animation:c4nextblink .9s ease-in-out infinite}
@keyframes c4nextblink{0%,100%{stroke-opacity:1}50%{stroke-opacity:.08}}
[data-control="next-key"] .c4-face{animation:c4nextface .9s ease-in-out infinite}
@keyframes c4nextface{0%,100%{filter:brightness(1)}50%{filter:brightness(1.3)}}
@media (prefers-reduced-motion:reduce){[data-control="next-key"] .c4-face{animation:none}.c4-pulse,.c4-caret,.c4-talk,.c4-hop,.c4-nod,.c4-cheer,.c4-cheer1,.c4-twinkle,.c4-ring,.c4-cue,.c4-nextblink,.c4-px,.c4-py,.c4-pr,.c4-flash{animation:none}.c4-ctl .c4-body{transition:none}.c4-fill{transition:none}}
`;
const UI_STRINGS = {
  en: {
    again: "Hint",
    soundOff: "Sound off",
    soundOn: "Sound on",
    restart: "Start this phase again",
    rubOut: "Rub out",
    enter: "Enter",
    point: "Point",
    freePlay: "Free play",
    playAgain: "Play again",
    wellDone: "Well done!",
    summaryLine: "Here is the summary of what you have learned.",
    tapToStart: "Tap to start",
    freePlayLine: "Free play.",
    rightFirstTime: (a, b) => `Right first time: ${a} / ${b}`,
    phaseOf: (n, N) => `Phase ${n} of ${N}`,
    questionOf: (i, total) => `Question ${i} of ${total}`,
    stepOf: (k, N) => `Step ${k} of ${N}`,
    word: { now: "now", done: "done", "not yet": "not yet" },
    bubbleNext: "Next line",
    answer: "Answer",
    answerClose: "Close",
    start: "Start",
    toStart: "Back to the start",
    typeIt: "Type your answer, then press Enter.",
    pickIt: "Choose your answer.",
    next: "Next",
    nextPhase: "Next phase",
    summaryKey: "Summary",
    tapCard: (c) => `Tap the blinking ${c} card.`,
    tapAnswer: "Tap the blinking Answer key."
  },
  hi: {
    again: "संकेत",
    soundOff: "ध्वनि बंद",
    soundOn: "ध्वनि चालू",
    restart: "यह चरण फिर से शुरू करें",
    rubOut: "मिटाएँ",
    enter: "दर्ज करें",
    point: "बिंदु",
    freePlay: "मुक्त खेल",
    playAgain: "फिर से खेलें",
    wellDone: "बहुत बढ़िया!",
    summaryLine: "यह रहा सारांश: तुमने क्या सीखा।",
    tapToStart: "शुरू करने के लिए स्पर्श करें",
    freePlayLine: "मुक्त खेल।",
    rightFirstTime: (a, b) => `पहली बार में सही: ${a} / ${b}`,
    phaseOf: (n, N) => `चरण ${n}, ${N} में से`,
    questionOf: (i, total) => `प्रश्न ${i}, ${total} में से`,
    stepOf: (k, N) => `चरण ${k}, ${N} में से`,
    word: { now: "अभी", done: "पूरा", "not yet": "अभी नहीं" },
    bubbleNext: "अगली पंक्ति",
    answer: "उत्तर",
    answerClose: "बंद करें",
    start: "शुरू करें",
    toStart: "शुरुआत पर लौटें",
    typeIt: "अपना उत्तर लिखो, फिर दर्ज करें दबाओ।",
    pickIt: "अपना उत्तर चुनो।",
    next: "आगे",
    nextPhase: "अगला चरण",
    summaryKey: "सारांश",
    tapCard: (c) => `चमकते ${c} कार्ड को छुओ।`,
    tapAnswer: "चमकती उत्तर कुंजी को छुओ।"
  },
  gu: {
    again: "સંકેત",
    soundOff: "અવાજ બંધ",
    soundOn: "અવાજ ચાલુ",
    restart: "આ તબક્કો ફરી શરૂ કરો",
    rubOut: "ભૂંસો",
    enter: "દાખલ કરો",
    point: "બિંદુ",
    freePlay: "મુક્ત રમત",
    playAgain: "ફરી રમો",
    wellDone: "ખૂબ સરસ!",
    summaryLine: "આ રહ્યો સારાંશ: તમે શું શીખ્યા.",
    tapToStart: "શરૂ કરવા સ્પર્શ કરો",
    freePlayLine: "મુક્ત રમત.",
    rightFirstTime: (a, b) => `પ્રથમ પ્રયાસમાં સાચા: ${a} / ${b}`,
    phaseOf: (n, N) => `તબક્કો ${n}, ${N} માંથી`,
    questionOf: (i, total) => `પ્રશ્ન ${i}, ${total} માંથી`,
    stepOf: (k, N) => `તબક્કો ${k}, ${N} માંથી`,
    word: { now: "હમણાં", done: "પૂર્ણ", "not yet": "હજી નહીં" },
    bubbleNext: "આગલી લીટી",
    answer: "જવાબ",
    answerClose: "બંધ કરો",
    start: "શરૂ કરો",
    toStart: "શરૂઆત પર પાછા જાઓ",
    typeIt: "તમારો જવાબ લખો, પછી દાખલ કરો દબાવો.",
    pickIt: "તમારો જવાબ પસંદ કરો.",
    next: "આગળ",
    nextPhase: "આગલો તબક્કો",
    summaryKey: "સારાંશ",
    tapCard: (c) => `ઝબકતા ${c} કાર્ડને સ્પર્શ કરો.`,
    tapAnswer: "ઝબકતી જવાબ કીને સ્પર્શ કરો."
  }
};
function Header({ C, name, title, soundOn, onAgain, onSound, onRestart, UI, toStart }) {
  const nameRef = useRef(null);
  const [nameW, setNameW] = useState(String(name).length * T.label * 0.56);
  useEffect(() => {
    try {
      const w = nameRef.current && nameRef.current.getComputedTextLength();
      if (w > 0) setNameW(w);
    } catch (e) {
    }
  }, [name]);
  const dotX = 40 + nameW + 22;
  const room = 1336 - (dotX + 22);
  const perChar = T.label * 0.55;
  const shown = String(title).length * perChar > room ? String(title).slice(0, Math.max(4, Math.floor(room / perChar) - 1)) + "…" : title;
  return <g data-zone="header">
      <text ref={nameRef} x={40} y={53} fontSize={T.label} fontWeight={600} fill={C.ink}>{name}</text>
      <circle cx={dotX} cy={42} r={6} fill={C.accent} />
      <text x={dotX + 22} y={53} fontSize={T.label} fontWeight={500} fill={C.accent}>{shown}</text>
      {
    /* the three header controls, the same in every Class 4 tool and in both modes; 72 apart, so
       their finger boxes tile and never overlap */
  }
      <RoundControl id="again" label={UI.again} cx={1388} cy={40} C={C} onClick={onAgain}><IconHint c={C.ink} /></RoundControl>
      <RoundControl id="sound" label={soundOn ? UI.soundOff : UI.soundOn} cx={1460} cy={40} C={C} onClick={onSound}><IconSound c={C.ink} on={soundOn} /></RoundControl>
      <RoundControl id="restart" label={toStart ? UI.toStart : UI.restart} cx={1532} cy={40} C={C} onClick={onRestart}><IconRestart c={C.ink} /></RoundControl>
    </g>;
}
function SlotPartBox({ id, label, x, y, w, h, on, enabled, onPick }) {
  const p = usePress(onPick, enabled);
  const keys = (e) => {
    if (e.key === "Enter" && on) return;
    p.keys(e);
  };
  return <rect
    className="c4-hit"
    data-control={id}
    role="button"
    tabIndex={0}
    aria-label={label}
    x={x}
    y={y}
    width={w}
    height={h}
    fill="transparent"
    {...p.bind()}
    onKeyDown={keys}
  />;
}
function shownIn(format, v, j, lang, TR2) {
  const tx = (x) => lineFor(x, lang, TR2);
  const out = String(format ? format(v, j, { lang, tx }) : v);
  return lang && lang !== "en" ? tx(out) : out;
}
function SlotStack({ C, parts, typed, active, live, format, part, onPart, lang, TR: TR2 }) {
  const np = parts.length, vals = slotPartsOf(typed, np);
  const k = (at) => parts.findIndex((p) => p.at === at);
  const iw = k("whole"), it = k("top"), ib = k("bottom");
  const cw = 132, ch = 38, ww = 110, gap = 30;
  const left = iw >= 0 ? Z.slot.x + (Z.slot.w - (ww + gap + cw)) / 2 : 0;
  const fx = iw >= 0 ? left + ww + gap : Z.slot.x + (Z.slot.w - cw) / 2;
  const split = iw >= 0 ? left + ww + gap / 2 : Z.slot.x;
  const barY = Z.slot.y + 46;
  const shownOf = (j) => shownIn(format, vals[j], j, lang, TR2);
  const cell = (j, x, y, w, h, size, hit) => {
    if (j < 0) return null;
    const on = active && j === part, shown = shownOf(j), nw = shown.length * size * 0.58;
    return <g key={j}>
        {
      /* an empty cell has to read as "write here" on its own, without waiting for the caret: the
         fraction cells are less than half the whole cell's height, so they carry its edge, not a thinner one */
    }
        <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={8}
      fill={mix(C.panel, "#FFFFFF", 0.3)}
      stroke={on ? slotEdge(C) : C.rule}
      strokeWidth={on ? 3 : 2.5}
    />
        <text x={x + w / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={600} fill={C.ink}>{shown}</text>
        {on && <rect className="c4-caret" x={x + w / 2 + nw / 2 + 4} y={y + (h - size * 0.8) / 2} width={3} height={size * 0.8} rx={1.5} fill={C.accent} />}
        <SlotPartBox
      id={"part-" + (j + 1)}
      label={parts[j].label + " box"}
      x={hit.x}
      y={hit.y}
      w={hit.w}
      h={hit.h}
      on={on}
      enabled={live != null ? live : active}
      onPick={() => onPart && onPart(j)}
    />
      </g>;
  };
  const fw = Z.slot.x + Z.slot.w - split;
  return <g>
      <rect
    x={Z.slot.x}
    y={Z.slot.y}
    width={Z.slot.w}
    height={Z.slot.h}
    rx={RAD.panel}
    fill="#FFFFFF"
    stroke={active ? slotEdge(C) : C.rule}
    strokeWidth={active ? 4 : 2}
    filter="url(#fShadowSoft)"
  />
      <rect x={fx - 12} y={barY - 2} width={cw + 24} height={4} rx={2} fill={C.ink} />
      {cell(iw, left, Z.slot.y + 4, ww, Z.slot.h - 8, T.speech, { x: Z.slot.x, y: Z.slot.y, w: split - Z.slot.x, h: Z.slot.h })}
      {cell(it, fx, barY - 4 - ch, cw, ch, T.label, { x: split, y: barY - HIT, w: fw, h: HIT })}
      {cell(ib, fx, barY + 4, cw, ch, T.label, { x: split, y: barY, w: fw, h: HIT })}
    </g>;
}
function SlotSide({ C, parts, typed, active, live, format, part, onPart, lang, TR: TR2 }) {
  const np = parts.length, vals = slotPartsOf(typed, np);
  const sepOf = (j) => parts[j].at === "top" ? "slash" : parts[j].at === "dwhole" ? "point" : null;
  const between = (j) => sepOf(j) ? 40 : 12;
  let fixed = 0;
  for (let j = 0; j < np - 1; j++) fixed += between(j);
  const pad = 10, bw = (Z.slot.w - 2 * pad - fixed) / np, bh = Z.slot.h - 16, by = Z.slot.y + 8;
  const sizeOf = (shown) => [T.speech, T.label, T.micro].find((s) => shown.length * s * 0.58 <= bw - 24) || T.micro;
  const nodes = [];
  let x = Z.slot.x + pad;
  for (let j = 0; j < np; j++) {
    const shown = shownIn(format, vals[j], j, lang, TR2), size = sizeOf(shown), nw = shown.length * size * 0.58;
    const on = active && j === part, mid = x + bw / 2;
    const hx = j === 0 ? Z.slot.x : x - between(j - 1) / 2, hr = j === np - 1 ? Z.slot.x + Z.slot.w : x + bw + between(j) / 2;
    nodes.push(
      <g key={j}>
        <rect x={x} y={by} width={bw} height={bh} rx={10} fill={mix(C.panel, "#FFFFFF", 0.3)} stroke={on ? slotEdge(C) : C.rule} strokeWidth={on ? 3 : 2.5} />
        <text x={mid} y={by + bh / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={600} fill={C.ink}>{shown}</text>
        {on && <rect className="c4-caret" x={mid + nw / 2 + 4} y={by + (bh - size * 0.8) / 2} width={3} height={size * 0.8} rx={1.5} fill={C.accent} />}
        <SlotPartBox
        id={"part-" + (j + 1)}
        label={parts[j].label + " box"}
        x={hx}
        y={Z.slot.y}
        w={hr - hx}
        h={Z.slot.h}
        on={on}
        enabled={live != null ? live : active}
        onPick={() => onPart && onPart(j)}
      />
      </g>
    );
    const sep = j < np - 1 ? sepOf(j) : null, sx = x + bw + between(j) / 2;
    if (sep === "slash") nodes.push(<path key={"s" + j} d={`M ${sx + 9} ${by + bh * 0.2} L ${sx - 9} ${by + bh * 0.8}`} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />);
    if (sep === "point") nodes.push(<circle key={"s" + j} cx={sx} cy={by + bh / 2 + T.speech * 0.36 - 7} r={6.5} fill={C.ink} />);
    x += bw + between(j);
  }
  return <g>
      <rect
    x={Z.slot.x}
    y={Z.slot.y}
    width={Z.slot.w}
    height={Z.slot.h}
    rx={RAD.panel}
    fill="#FFFFFF"
    stroke={active ? slotEdge(C) : C.rule}
    strokeWidth={active ? 4 : 2}
    filter="url(#fShadowSoft)"
  />
      {nodes}
    </g>;
}
function Slot({ C, ask, typed, active, live, format, parts, part, onPart, lang, TR: TR2, side }) {
  const lines = wrapText(ask || "", 15).slice(0, 3);
  const askLines = lines.map((ln, k) => <text key={k} x={Z.slot.x} y={236 - (lines.length - 1 - k) * 46} fontSize={T.prompt} fontWeight={500} fill={C.ink}>{ln}</text>);
  if (parts && parts.length && parts.some((p) => p.at)) return <g data-zone="slot">
      {askLines}
      {side || parts.some((p) => p.at === "dwhole") ? <SlotSide C={C} parts={parts} typed={typed} active={active} live={live} format={format} part={part} onPart={onPart} lang={lang} TR={TR2} /> : <SlotStack C={C} parts={parts} typed={typed} active={active} live={live} format={format} part={part} onPart={onPart} lang={lang} TR={TR2} />}
    </g>;
  if (parts && parts.length) {
    const np = parts.length, gap = 16, bw = (Z.slot.w - gap * (np - 1)) / np;
    const vals = slotPartsOf(typed, np);
    const quiet = mix(C.ink, "#FFFFFF", 0.3);
    return <g data-zone="slot">
        {askLines}
        {parts.map((p, k) => {
      const x = Z.slot.x + k * (bw + gap), cx2 = x + bw / 2, on = active && k === part;
      const shown2 = shownIn(format, vals[k], k, lang, TR2);
      const unit = p.unit ? lineFor(String(p.unit), lang, TR2) : "";
      const ugap = shown2 ? 24 : 0;
      const uw = unit ? unit.length * T.micro * 0.55 + ugap : 0;
      const size2 = shown2.length * T.prompt * 0.58 + uw <= bw - 28 ? T.prompt : T.label;
      const nw = shown2.length * size2 * 0.58, left = cx2 - (nw + uw) / 2;
      return <g key={k}>
              <rect
        x={x}
        y={Z.slot.y}
        width={bw}
        height={Z.slot.h}
        rx={RAD.panel}
        fill="#FFFFFF"
        stroke={on ? slotEdge(C) : C.rule}
        strokeWidth={on ? 4 : 2}
        filter="url(#fShadowSoft)"
      />
              <text x={x + 16} y={Z.slot.y + 31} fontSize={T.micro} fontWeight={500} fill={quiet}>{lineFor(p.label, lang, TR2)}</text>
              <text x={left} y={Z.slot.y + 77} fontSize={size2} fontWeight={600} fill={C.ink}>{shown2}
                {unit && <tspan dx={ugap} fontSize={T.micro} fontWeight={500} fill={quiet}>{unit}</tspan>}</text>
              {on && <rect className="c4-caret" x={left + nw + 4} y={Z.slot.y + 44} width={4} height={40} rx={2} fill={C.accent} />}
              <SlotPartBox
        id={"part-" + (k + 1)}
        label={p.label + " box"}
        x={x}
        y={Z.slot.y}
        w={bw}
        h={Z.slot.h}
        on={on}
        enabled={live != null ? live : active}
        onPick={() => onPart && onPart(k)}
      />
            </g>;
    })}
      </g>;
  }
  const shown = shownIn(format, typed, void 0, lang, TR2);
  const cx = Z.slot.x + Z.slot.w / 2;
  const size = shown.length * T.xl * 0.58 <= Z.slot.w - 40 ? T.xl : shown.length * T.speech * 0.58 <= Z.slot.w - 40 ? T.speech : T.prompt;
  const caretX = cx + shown.length * size * 0.3 + 6;
  return <g data-zone="slot">
      {askLines}
      <rect
    x={Z.slot.x}
    y={Z.slot.y}
    width={Z.slot.w}
    height={Z.slot.h}
    rx={RAD.panel}
    fill="#FFFFFF"
    stroke={active ? slotEdge(C) : C.rule}
    strokeWidth={active ? 4 : 2}
    filter="url(#fShadowSoft)"
  />
      <text x={cx} y={Z.slot.y + 46 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={600} fill={C.ink}>{shown}</text>
      {active && <rect className="c4-caret" x={caretX} y={Z.slot.y + 22} width={4} height={50} rx={2} fill={C.accent} />}
    </g>;
}
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0", "enter"];
function Pad({ C, enabled, digitsOff, onKey, choices, onChoice, point, pointOff, UI, lang, TR: TR2 }) {
  const gap = 12;
  const quiet = mix(C.ink, C.panel, 0.5);
  if (choices && choices.length) {
    const cols = 2, rows = Math.ceil(choices.length / cols);
    const cw = (Z.pad.w - gap) / cols, ch = Math.min(BOARD ? 150 : 110, (Z.pad.h - EDGE - gap * (rows - 1)) / rows);
    const top = BOARD ? Z.pad.y + Math.max(0, (Z.pad.h - EDGE - (rows * ch + (rows - 1) * gap)) / 2) : Z.pad.y;
    return <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
        {choices.map((c, j) => {
      const x = Z.pad.x + j % cols * (cw + gap), y = top + Math.floor(j / cols) * (ch + gap);
      const lines = wrapText(lineFor(c.label, lang, TR2), 10).slice(0, 2);
      return <Key key={c.id} id={"choice-" + c.id} label={lineFor(c.label, lang, TR2)} x={x} y={y} w={cw} h={ch} C={C} tone="key" disabled={!enabled} onClick={() => enabled && onChoice(c.id)}>
              {lines.map((ln, k) => <text key={k} y={11 + (k - (lines.length - 1) / 2) * 32} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={enabled ? toneInk("key", C.ink) : quiet}>{ln}</text>)}
            </Key>;
    })}
      </g>;
  }
  const kw = (Z.pad.w - 2 * gap) / 3, kh = (Z.pad.h - 3 * gap - EDGE) / 4;
  const NAMES = { back: UI.rubOut, enter: UI.enter, point: UI.point };
  if (point) {
    const pw = (Z.pad.w - 3 * gap) / 4;
    const at = [
      ["1", 0, 0],
      ["2", 1, 0],
      ["3", 2, 0],
      ["back", 3, 0],
      ["4", 0, 1],
      ["5", 1, 1],
      ["6", 2, 1],
      ["enter", 3, 1, 1, 3],
      ["7", 0, 2],
      ["8", 1, 2],
      ["9", 2, 2],
      ["0", 0, 3, 2],
      ["point", 2, 3]
    ];
    return <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
        {at.map(([k, c, r, cs = 1, rs = 1]) => {
      if (digitsOff && k !== "enter" && k !== "point") return null;
      const x = Z.pad.x + c * (pw + gap), y = Z.pad.y + r * (kh + gap);
      const w = cs * pw + (cs - 1) * gap, h = rs * kh + (rs - 1) * gap;
      const off = !enabled || digitsOff && k !== "enter" || k === "point" && pointOff;
      const tone = k === "enter" ? "enter" : k === "back" || k === "point" ? "soft" : "key";
      const ink = off ? quiet : toneInk(tone, C.ink);
      return <Key
        key={k}
        id={"key-" + k}
        label={NAMES[k] || k}
        x={x}
        y={y}
        w={w}
        h={h}
        C={C}
        tone={tone}
        primary={k === "enter" && !off}
        disabled={off}
        onClick={() => !off && onKey(k)}
      >
              {k === "back" ? <IconBack c={ink} /> : k === "enter" ? <IconEnter c={off ? quiet : toneInk("enter", "#FFFFFF")} /> : k === "point" ? <circle cx={0} cy={4} r={8} fill={ink} /> : <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={ink}>{k}</text>}
            </Key>;
    })}
      </g>;
  }
  return <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
      {KEYS.map((k, j) => {
    if (digitsOff && k !== "enter") return null;
    const x = Z.pad.x + j % 3 * (kw + gap), y = Z.pad.y + Math.floor(j / 3) * (kh + gap);
    const off = !enabled;
    const tone = k === "enter" ? "enter" : k === "back" ? "soft" : "key";
    const ink = off ? quiet : toneInk(tone, C.ink);
    return <Key
      key={k}
      id={"key-" + k}
      label={NAMES[k] || k}
      x={x}
      y={y}
      w={kw}
      h={kh}
      C={C}
      tone={tone}
      primary={k === "enter" && !off}
      disabled={off}
      onClick={() => !off && onKey(k)}
    >
            {k === "back" ? <IconBack c={ink} /> : k === "enter" ? <IconEnter c={off ? quiet : toneInk("enter", "#FFFFFF")} /> : <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={ink}>{k}</text>}
          </Key>;
  })}
    </g>;
}
function AskBar({ C, ask, hasRuns, mode, open, onKey, UI, nextLabel, choices, onChoice, lang, TR: TR2, quiet, blink }) {
  const x0 = hasRuns ? Z.runs.x + Z.runs.w + 16 : Z.ask.x;
  const bw = Z.ask.x + Z.ask.w - x0;
  const nCh = mode === "choices" ? (choices || []).length : 0;
  const cw = 150, cgap = 14;
  const kw = nCh ? nCh * cw + (nCh - 1) * cgap : 264, kh = 72, kx = x0 + bw - kw - 10, ky = Z.ask.y + (Z.ask.h - kh) / 2;
  const noKey = mode === "card" || quiet && mode === "off";
  const room = (noKey ? x0 + bw - 10 : kx) - x0 - 40;
  const pick = [[T.prompt, 1], [T.label, 2], [T.micro, 2]].map(([s, l]) => ({ s, l, w: wrapText(ask, Math.floor(room / (s * 0.58))) })).find((c) => c.w.length <= c.l) || { s: T.micro, w: wrapText(ask, Math.floor(room / (T.micro * 0.58))).slice(0, 2) };
  const lh = pick.s + 6, top = Z.ask.y + Z.ask.h / 2 - (pick.w.length - 1) * lh / 2 + pick.s * 0.36;
  const live = mode !== "off";
  const next = mode === "next";
  const label = next ? nextLabel : mode === "enter" ? UI.enter : open ? UI.answerClose : UI.answer;
  return <g data-zone="ask">
      <rect x={x0} y={Z.ask.y} width={bw} height={Z.ask.h} rx={RAD.panel + 4} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      {pick.w.map((ln, k) => <text key={k} x={x0 + 28} y={top + k * lh} fontSize={pick.s} fontWeight={500} fill={C.ink}>{ln}</text>)}
      {nCh > 0 && (choices || []).map((c, j) => {
    const x = kx + j * (cw + cgap), lab = lineFor(c.label, lang, TR2), size = lab.length * T.prompt * 0.6 <= cw - 20 ? T.prompt : T.label;
    return <g key={c.id}>
            <Key id={"choice-" + c.id} label={lab} x={x} y={ky} w={cw} h={kh} C={C} tone="key" onClick={() => onChoice && onChoice(c.id)}>
              <text y={size === T.prompt ? 14 : 11} textAnchor="middle" fontSize={size} fontWeight={600} fill={toneInk("key", C.ink)}>{lab}</text>
            </Key>
            <BlinkRing x={x} y={ky} w={cw} h={kh + EDGE} rx={RAD.key} C={C} />
          </g>;
  })}
      {!noKey && nCh === 0 && <Key
    id={next ? "next-key" : mode === "enter" ? "answer-enter" : "answer-open"}
    label={label}
    x={kx}
    y={ky}
    w={kw}
    h={kh}
    C={C}
    tone={next || mode === "enter" || !open ? "enter" : "soft"}
    primary={live && (next || !open)}
    disabled={!live}
    onClick={onKey}
  >
          {
    /* a long Next label (Gujarati "Next phase", 11 letters) is set one size down, so it never touches the key's edge */
  }
          <text y={next && String(label).length > 10 ? 11 : 14} textAnchor="middle" fontSize={next && String(label).length > 10 ? T.label : T.prompt} fontWeight={600} fill={!live ? mix(C.ink, C.panel, 0.5) : open && !next ? toneInk("soft", C.ink) : toneInk("enter", "#FFFFFF")}>{label}</text>
        </Key>}
      {next && <NextBlink x={kx} y={ky} w={kw} h={kh} C={C} />}
      {blink && !next && mode === "answer" && !open && <NextBlink x={kx} y={ky} w={kw} h={kh} C={C} />}
    </g>;
}
function StartPage({ C, name, hook, Art, UI, lang, tx, onStart, mascotOk, onMascotFail }) {
  const card = { x: 40, y: 40, w: 1520, h: 820 };
  const startRef = useRef(null);
  const [startW, setStartW] = useState(String(UI.start).length * T.speech * 0.6);
  useEffect(() => {
    try {
      const w = startRef.current && startRef.current.getComputedTextLength();
      if (w > 0) setStartW(w);
    } catch (e) {
    }
  }, [UI.start]);
  const titleSize = String(name).length * T.display * 0.6 <= 1300 ? T.display : T.xl;
  const text = String(hook || "");
  const pick = [[T.speech, 2], [T.label, 3]].map(([s, l]) => ({ s, l, w: wrapText(text, Math.floor(1180 / (s * 0.58))) })).find((c) => c.w.length <= c.l) || { s: T.micro, w: wrapText(text, Math.floor(1180 / (T.micro * 0.58))).slice(0, 3) };
  const lh = pick.s + (lang === "hi" || lang === "gu" ? 22 : 8), top = 636 - (pick.w.length - 1) * lh / 2 + pick.s * 0.36;
  return <g data-zone="start">
      <rect x={0} y={0} width={1600} height={900} fill={C.paper} />
      <rect x={card.x} y={card.y} width={card.w} height={card.h} rx={RAD.card} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} filter="url(#fShadow)" />
      <path d={`M ${card.x + 30} ${card.y + 4} H ${card.x + card.w - 30}`} stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" />
      <text x={800} y={150} textAnchor="middle" fontSize={titleSize} fontWeight={700} fill={THEME && THEME.key ? THEME.key[1] : shade(C.accent, 0.3)}>{name}</text>
      <rect x={740} y={176} width={120} height={8} rx={4} fill={THEME && THEME.enter ? THEME.enter[1] : C.accent} />
      {Art && <g data-role="start-art" transform="translate(200,205)"><Art box={{ w: 1200, h: 340 }} C={C} lang={lang} tx={tx} /></g>}
      {pick.w.map((ln, k) => <text key={k} x={800} y={top + k * lh} textAnchor="middle" fontSize={pick.s} fontWeight={600} fill={C.ink}>{ln}</text>)}
      <line x1={80} y1={848} x2={340} y2={848} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      {mascotOk && <image
    data-role="mascot"
    href={MASCOT_IMAGE}
    x={100}
    y={684}
    width={220}
    height={164}
    preserveAspectRatio="xMidYMax meet"
    aria-hidden="true"
    pointerEvents="none"
    onError={onMascotFail}
  />}
      <Key id="start" label={UI.start} x={590} y={724} w={420} h={112} C={C} tone="enter" primary onClick={onStart}>
        {
    /* a play triangle and the word, centred together by the word's MEASURED width (a Hindi or Gujarati word is not
       as wide as the character count says) */
  }
        <g transform={`translate(${-(34 + 22 + startW) / 2},0)`}>
          <path d="M 0 -20 L 34 0 L 0 20 Z" fill={toneInk("enter", "#FFFFFF")} stroke={toneInk("enter", "#FFFFFF")} strokeWidth={6} strokeLinejoin="round" />
          <text ref={startRef} x={56} y={14} textAnchor="start" fontSize={T.speech} fontWeight={700} fill={toneInk("enter", "#FFFFFF")}>{UI.start}</text>
        </g>
      </Key>
    </g>;
}
const NEXT_EARLY_MS = 500;
const PARTY_MS = 2300;
const SPARKS = [
  { x: 62, y: 752, s: 1, d: 0.05 },
  { x: 96, y: 722, s: 1, d: 0.12 },
  { x: 166, y: 716, s: 0.8, d: 0.27 },
  { x: 226, y: 812, s: 0.8, d: 0.2 },
  { x: 40, y: 806, s: 0.8, d: 0.35 },
  { x: 44, y: 866, s: 0.7, d: 0.42 },
  { x: 222, y: 868, s: 0.7, d: 0.3 }
];
function Party({ C, big, n }) {
  const pal = THEME && THEME.enter ? [THEME.enter[0], THEME.enter[1], THEME.soft ? THEME.soft[1] : "#F7C25A", "#F28C38", "#3FB6A8", THEME.enter[0]] : [C.accent, tint(C.accent, 0.35), "#E8B04B", "#6FB7B0", "#D96C8F", "#8E7CC3"];
  let seed = (n * 7919 + 13) % 2147483647;
  const rnd = () => {
    seed = seed * 48271 % 2147483647;
    return seed / 2147483647;
  };
  const origins = big ? [{ x: 186, y: 772, a0: -80, a1: -20 }, { x: 1500, y: 734, a0: -160, a1: -100 }] : [{ x: 186, y: 772, a0: -80, a1: -20 }];
  const per = big ? 44 : 56;
  const parts = [];
  origins.forEach((o) => {
    for (let k = 0; k < per; k++) {
      const a = (o.a0 + rnd() * (o.a1 - o.a0)) * Math.PI / 180, d = 260 + rnd() * 760;
      const dx = Math.max(60 - o.x, Math.min(1540 - o.x, Math.cos(a) * d));
      const ay = Math.max(112 - o.y, Math.sin(a) * d);
      const by = Math.min(840 - o.y, ay + 180 + rnd() * 260);
      parts.push({ o, dx, ay, by, dl: rnd() * 0.18, rot: (rnd() - 0.5) * 900, kind: Math.floor(rnd() * 4), col: pal[Math.floor(rnd() * pal.length)], s: 0.8 + rnd() * 0.6 });
    }
  });
  return <g data-zone="party" aria-hidden="true" pointerEvents="none">
      {origins.map((o, oi) => {
    const mid = (o.a0 + o.a1) / 2 + 90;
    return <g key={"p" + oi} transform={`translate(${o.x},${o.y}) rotate(${mid})`}>
            <polygon points="-6,0 6,0 22,-58 -22,-58" fill={pal[0]} stroke={shade(pal[0], 0.25)} strokeWidth={3} strokeLinejoin="round" />
            <polygon points="-11,-22 11,-22 14,-34 -14,-34" fill={pal[2]} />
            <ellipse cx={0} cy={-58} rx={22} ry={6} fill={shade(pal[0], 0.45)} />
            <polygon className="c4-flash" points="0,-58 7,-72 0,-66 -7,-72" fill={pal[3]} />
          </g>;
  })}
      {(typeof MASCOT_CHEER === "string" && MASCOT_CHEER ? SPARKS : []).map((s, k) => <g key={"s" + k} transform={`translate(${s.x},${s.y}) scale(${s.s * (big ? 1.25 : 1)})`}>
          <polygon
    className="c4-twinkle"
    style={{ animationDelay: s.d + "s" }}
    points="0,-16 4.5,-4.5 16,0 4.5,4.5 0,16 -4.5,4.5 -16,0 -4.5,-4.5"
    fill={pal[2 + k % 2]}
    stroke={shade(pal[2 + k % 2], 0.25)}
    strokeWidth={1.5}
    strokeLinejoin="round"
  />
        </g>)}
      {parts.map((p, k) => <g key={k} transform={`translate(${p.o.x},${p.o.y})`}>
          <g className="c4-px" style={{ ["--dx"]: p.dx + "px", animationDelay: p.dl + "s" }}>
            <g className="c4-py" style={{ ["--ay"]: p.ay + "px", ["--by"]: p.by + "px", animationDelay: p.dl + "s" }}>
              <g className="c4-pr" style={{ ["--r"]: p.rot + "deg", animationDelay: p.dl + "s" }}>
                {p.kind === 0 && <rect x={-8 * p.s} y={-4.5 * p.s} width={16 * p.s} height={9 * p.s} rx={2} fill={p.col} />}
                {p.kind === 1 && <circle r={6 * p.s} fill={p.col} />}
                {p.kind === 2 && <rect x={-2.5 * p.s} y={-13 * p.s} width={5 * p.s} height={26 * p.s} rx={2.5} fill={p.col} />}
                {p.kind === 3 && <rect x={-6 * p.s} y={-6 * p.s} width={12 * p.s} height={12 * p.s} rx={2} fill={p.col} transform="rotate(45)" />}
              </g>
            </g>
          </g>
        </g>)}
    </g>;
}
function Mascot({ C, speaking, react, ok, onFail, cheerOn, onCheerFail }) {
  const m = MASCOT_BOX;
  const mood = react && react.kind ? "c4-" + react.kind : void 0;
  const cheerSrc = typeof MASCOT_CHEER === "string" ? MASCOT_CHEER : "";
  const cheering = !!(cheerOn && cheerSrc && react && (react.kind === "cheer" || react.kind === "cheer1"));
  return <g data-zone="voice">
      <line x1={m.x + 8} y1={m.y + m.h - 2} x2={m.x + m.w - 8} y2={m.y + m.h - 2} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      {ok ? <image
    key={"m" + (react && react.n || 0)}
    data-role="mascot"
    className={speaking ? "c4-talk" : mood}
    href={cheering ? cheerSrc : MASCOT_IMAGE}
    data-pose={cheering ? "cheer" : void 0}
    x={m.x}
    y={m.y}
    width={m.w}
    height={m.h}
    preserveAspectRatio="xMidYMax meet"
    aria-hidden="true"
    pointerEvents="none"
    onError={cheering ? onCheerFail : onFail}
  /> : <g data-role="mascot-drawn">
          {speaking && <circle cx={m.x + m.w / 2} cy={820} r={40} fill="none" stroke={C.accent} strokeWidth={5} />}
          <circle cx={m.x + m.w / 2} cy={820} r={30} fill="url(#gAccent)" filter="url(#fShadowSoft)" />
        </g>}
    </g>;
}
function PhaseDot({ C, k, N, x, w, now, done, fill = 1, navigable, onGo, UI }) {
  const p = usePress(() => onGo(k), navigable);
  const face = done && !now ? "url(#gAccent)" : C.panel;
  const stroke = now || done ? shade(C.accent, 0.15) : C.rule;
  const y = Z.bar.y, h = 20;
  const f = now ? Math.min(Math.max(fill, 0), 1) : done ? 1 : 0;
  const fw = Math.max(h, w * f);
  const word = now ? "now" : done ? "done" : "not yet";
  const seg = <>
      <rect className={navigable ? "c4-face" : void 0} x={x} y={y} width={w} height={h} rx={10} fill={face} stroke={stroke} strokeWidth={2} />
      {now && <rect className="c4-fill" x={x} y={y} width={fw} height={h} rx={10} fill="url(#gAccent)" stroke={shade(C.accent, 0.15)} strokeWidth={2} style={{ width: fw }} pointerEvents="none" />}
    </>;
  const data = { "data-state": word === "not yet" ? "later" : word, "data-fill": f.toFixed(3) };
  if (!navigable)
    return <g role="img" aria-label={`${UI.stepOf(k + 1, N)}, ${UI.word[word]}`} {...data}>{seg}</g>;
  return <g
    className={"c4-ctl c4-dot" + (p.down ? " is-down" : "")}
    role="button"
    tabIndex={0}
    aria-label={UI.stepOf(k + 1, N)}
    aria-current={now ? "step" : void 0}
    data-control={"phase-" + (k + 1)}
    {...data}
    {...p.bind()}
    onKeyDown={p.keys}
  >
      <rect x={x - 6} y={y + h / 2 - HIT / 2} width={w + 12} height={HIT} fill="transparent" />
      <rect x={x} y={y + 4} width={w} height={h} rx={10} fill={shade(C.rule, 0.1)} />
      <g className="c4-body" style={{ transform: `translateY(${p.down ? 4 : 0}px)` }}>{seg}</g>
    </g>;
}
function Footer({ C, line, hint, speaking, react, n, N, i, total, navigable, done, onGo, mascotOk, onMascotFail, UI, onBubble, cue, board, lang, hintType, cheerOn, onCheerFail }) {
  const b = Z.bubble;
  const edge = board ? shade(C.accent, 0.1) : C.rule, edgeW = board ? 3 : 2;
  const hintS = String(hint || "");
  const dev = lang === "hi" || lang === "gu";
  const pit = (s, tight) => tight ? s + 1 : dev ? Math.round(s * 1.45) : s + 6;
  const gapOf = (tight) => tight || dev ? 4 : 6, padOf = (tight) => tight ? 0 : dev ? 4 : 8, topOf = dev ? 12 : 0;
  let hl = null;
  if (hintS) {
    const cw = (s, w) => Math.max(8, Math.floor(w / (s * 0.54)));
    const opts = [[32, 1, 32, 2, 0], [32, 2, 32, 1, 0], [32, 1, 32, 1, 0], [28, 1, 28, 2, 0], [28, 2, 28, 1, 0], [28, 1, 28, 1, 0], [28, 2, 28, 2, 1]];
    for (const [is, il, hs, hn, tight] of opts) {
      if (dev && tight) continue;
      const a = wrapText(line, cw(is, 612)), h = wrapText(hintS, cw(hs, 592));
      if (a.length > il || h.length > hn) continue;
      const need = a.length * pit(is, tight) + gapOf(tight) + h.length * pit(hs, tight) + padOf(tight) + topOf;
      if (need <= b.h - 6) {
        hl = { is, a, hs, h, tight };
        break;
      }
    }
  }
  const shown = hintS && !hl ? hintS : line;
  const big = wrapText(shown, 24);
  const size = big.length > 2 ? T.label : T.speech;
  const lines = big.length > 2 ? wrapText(shown, 32).slice(0, 3) : big;
  const lh = dev ? Math.round(size * 1.45) : big.length > 2 ? size + 6 : size + 8;
  const top = b.y + b.h / 2 - (lines.length - 1) * lh / 2 + size * 0.36;
  const hintInk = hintType ? C.ink : THEME && THEME.key ? THEME.key[2] : shade(C.accent, 0.3);
  const hintBand = hintType ? mix(C.panel, "#FFFFFF", 0.55) : THEME && THEME.soft ? mix(THEME.soft[0], "#FFFFFF", 0.6) : mix(C.accent, "#FFFFFF", 0.9);
  const hintBar = hintType ? C.dim : THEME && THEME.enter ? THEME.enter[1] : C.accent;
  const pitch = Z.bar.w / Math.max(N, 1);
  return <g>
      <Mascot C={C} speaking={speaking} react={react} ok={mascotOk} onFail={onMascotFail} cheerOn={cheerOn} onCheerFail={onCheerFail} />
      <g data-zone="bubble">
        <path d={`M ${b.x} ${b.y + 30} L ${b.x - 18} ${b.y + 44} L ${b.x} ${b.y + 58} Z`} fill="#FFFFFF" stroke={edge} strokeWidth={edgeW} />
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={24} fill="#FFFFFF" stroke={edge} strokeWidth={edgeW} filter="url(#fShadowSoft)" />
        <rect x={b.x + 1} y={b.y + 32} width={4} height={24} fill="#FFFFFF" />
        {hl ? (() => {
    const ilh = pit(hl.is, hl.tight), hlh = pit(hl.hs, hl.tight), gap = gapOf(hl.tight), pad = padOf(hl.tight);
    const H = hl.a.length * ilh + gap + hl.h.length * hlh + pad;
    const y0 = Math.max(b.y + (b.h - H) / 2, b.y + topOf);
    const hy0 = y0 + hl.a.length * ilh + gap;
    return <>
              <g data-role="instruction">
                {hl.a.map((ln, k) => <text key={k} x={b.x + 30} y={y0 + k * ilh + hl.is * 0.8} fontSize={hl.is} fontWeight={500} fill={C.ink}>{ln}</text>)}
              </g>
              <g data-role="hint">
                {!hl.tight && <rect x={b.x + 14} y={hy0 - 1} width={b.w - 28} height={hl.h.length * hlh + pad} rx={14} fill={hintBand} />}
                <rect x={b.x + 22} y={hy0 + (hl.tight ? 0 : 4)} width={5} height={hl.h.length * hlh - (hl.tight ? 0 : 2)} rx={2.5} fill={hintBar} />
                {hl.h.map((ln, k) => <text key={k} x={b.x + 40} y={hy0 + (hl.tight ? 0 : 4) + (dev ? 3 : 0) + k * hlh + hl.hs * 0.8} fontSize={hl.hs} fontWeight={600} fill={hintInk}>{ln}</text>)}
              </g>
            </>;
  })() : <g data-role="instruction">
            {lines.map((ln, k) => <text key={k} x={b.x + 30} y={top + k * lh} fontSize={size} fontWeight={500} fill={C.ink}>{ln}</text>)}
          </g>}
        {
    /* CLASSROOM mode only (onBubble set): the bubble is the teacher's "next" (a tap, Enter or Space), and
       a small arrow in its corner says that something is waiting for it. Off, none of this is drawn. */
  }
        {
    /* the cue is meant to be seen from the last bench: a big near-black arrow (44 x 60, right of the longest
       line) that blinks hard. Only the arrow blinks; the bubble and its words stay steady. It stands still
       under reduced motion. */
  }
        {onBubble && cue && <polygon className="c4-cue c4-cue-big" points={`${b.x + b.w - 74},${b.y + b.h / 2 - 30} ${b.x + b.w - 30},${b.y + b.h / 2} ${b.x + b.w - 74},${b.y + b.h / 2 + 30}`} fill={C.ink} stroke="#FFFFFF" strokeWidth={4} strokeLinejoin="round" pointerEvents="none" />}
        {onBubble && <Hit id="bubble" x={b.x} y={b.y} w={b.w} h={b.h} onPress={onBubble} label={UI.bubbleNext} keep />}
      </g>
      {
    /* the phase dots: which phase is on the stage, and (user mode) a way to go to another */
  }
      <g data-zone="bar" data-mode={navigable ? "user" : "ai"}>
        {Array.from({ length: N }).map((_, k) => <PhaseDot
    key={k}
    C={C}
    k={k}
    N={N}
    x={Z.bar.x + k * pitch + 6}
    w={pitch - 12}
    now={k === n - 1}
    done={k < n - 1 || done.includes(k + 1) && k !== n - 1}
    fill={Math.min(i + 1, total) / Math.max(total, 1)}
    navigable={navigable}
    onGo={onGo}
    UI={UI}
  />)}
        <text x={Z.bar.x} y={Z.bar.y + 60} fontSize={T.micro} fontWeight={600} fill={C.ink}>{UI.phaseOf(n, N)}</text>
        <text x={Z.bar.x + Z.bar.w} y={Z.bar.y + 60} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{UI.questionOf(Math.min(i + 1, total), total)}</text>
      </g>
    </g>;
}
function starPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return "M" + pts.join("L") + "Z";
}
function Summary({ C, phases, results, row, showScore, freePlay, onFree, onAgain, Thumb: Thumb2, UI, lang, TR: TR2 }) {
  const N = Math.max(phases.length, 1);
  const top = 188, rowH = Math.min(92, (560 - top) / N);
  const played = Object.keys(results).map(Number);
  const total = played.reduce((a, p) => a + (results[p].total || 0), 0);
  const first = played.reduce((a, p) => a + (results[p].firstTry || 0), 0);
  const ratio = total ? first / total : 0;
  const stars = !played.length ? 0 : ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
  const learnedInk = shade(C.accent, 0.25);
  return <g data-zone="summary">
      <rect x={Z.canvas.x} y={Z.canvas.y} width={Z.canvas.w} height={Z.canvas.h} rx={RAD.card} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} />
      <text x={800} y={156} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{UI.wellDone}</text>
      {phases.map((p, k) => {
    const y = top + k * rowH, r = results[k + 1];
    return <g key={k} data-row={k}>
            {row === k && <rect className="c4-ring" x={68} y={y - 4} width={1464} height={rowH - 4} rx={18} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
            <circle cx={100} cy={y + 29} r={10} fill={r ? C.accent : "#FFFFFF"} stroke={C.accent} strokeWidth={3} />
            <text x={128} y={y + 40} fontSize={T.label} fontWeight={700} fill={C.ink}>{lineFor(p.concept, lang, TR2)}</text>
            <text x={128} y={y + (lang === "hi" || lang === "gu" ? 80 : 74)} fontSize={T.micro} fontWeight={500} fill={learnedInk}>{lineFor(p.learned, lang, TR2)}</text>
            {r && r.last && Thumb2 && <g transform={`translate(1290,${y + 2})`}><Thumb2 n={k + 1} result={r} C={C} w={236} h={rowH - 10} lang={lang} tx={(v) => lineFor(v, lang, TR2)} /></g>}
          </g>;
  })}
      {showScore && played.length > 0 && <g role="img" aria-label={`Right first time: ${first} of ${total}`}>
          {[0, 1, 2].map((k) => <path
    key={k}
    d={starPath(704 + k * 62, 596, 24)}
    fill={k < stars ? CONTENT.ten : "#FFFFFF"}
    stroke={k < stars ? shade(CONTENT.ten, 0.3) : C.rule}
    strokeWidth={3}
    strokeLinejoin="round"
  />)}
          <text x={876} y={606} fontSize={T.micro} fontWeight={600} fill={C.ink}>{UI.rightFirstTime(first, total)}</text>
        </g>}
      {freePlay && <Key id="free-play" label={UI.freePlay} x={490} y={628} w={300} h={96} C={C} tone="enter" primary onClick={onFree}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={toneInk("enter", "#FFFFFF")}>{UI.freePlay}</text>
        </Key>}
      <Key id="play-again" label={UI.playAgain} x={freePlay ? 810 : 650} y={628} w={300} h={96} C={C} tone="soft" onClick={onAgain}>
        <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={toneInk("soft", C.ink)}>{UI.playAgain}</text>
      </Key>
    </g>;
}
const RING_KEYS = ["header", "runs", "work", "slot", "pad", "voice", "bubble", "bar"];
function ringBox(key, workW, panelOpen) {
  if (key === "work") return { x: W.x, y: W.y, w: workW || W.w, h: W.h };
  if (BOARD && (key === "slot" || key === "pad")) return panelOpen ? Z.drawer : Z.ask;
  if (key === "slot") return { x: Z.slot.x, y: 150, w: Z.slot.w, h: 192 };
  if (key === "voice") return MASCOT_BOX;
  if (key === "bar") return { x: Z.bar.x, y: Z.bar.y - 8, w: Z.bar.w, h: 76 };
  return Z[key];
}
function ToolFrame({ props, tool }) {
  var _a, _b, _c, _d;
  const P = props || {};
  const board = !!tool.board;
  if (board || BOARD) setLayout(board);
  SKINS = P.skins !== false;
  THEME = tool.THEME || (typeof TOOL_THEME !== "undefined" ? TOOL_THEME : null) || null;
  const phases = tool.PHASES || [];
  const N = Math.max(phases.length, 1);
  const [mountPhase] = useState(() => {
    const v = Number(P.phase);
    return P.phase === void 0 || P.phase === null || P.phase === "" || !isFinite(v) ? null : Math.min(Math.max(Math.round(v), 1), N);
  });
  const navigable = mountPhase === null || ((_a = P.navigableDots) != null ? _a : P.additionalProps && P.additionalProps.navigableDots) === true;
  const hasStart = !!(tool.StartArt || tool.START_HOOK);
  const showStart = hasStart && P.start !== false && (navigable || P.start === true);
  const [started, setStarted] = useState(!showStart);
  const startedRef = useRef(!showStart);
  const startNow = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
  };
  const [idx, setIdx] = useState((mountPhase || 1) - 1);
  const phase = phases[idx] || { n: 1, concept: "", items: [] };
  const n = idx + 1;
  const isLast = n === phases.length;
  const C = useMemo(() => ({ ...DEFAULT_CHROME, ...tool.CHROME || {} }), []);
  const items = useMemo(() => bankFor(P, phase, tool.fitHost), [idx]);
  const offsets = useMemo(() => {
    let a = 0;
    return phases.map((p) => {
      const o = a;
      a += Math.max((p.items || []).length, 1);
      return o;
    });
  }, []);
  const steps = phases.length ? offsets[phases.length - 1] + Math.max((phases[phases.length - 1].items || []).length, 1) : 1;
  const enterRef = useRef(null);
  const demoOpen = useRef(false);
  const skipTeach = useRef(null);
  const pendingAdvance = useRef(null);
  const [locked, setLocked] = useState(false);
  const classroom = ((_b = P.classroom) != null ? _b : P.additionalProps && P.additionalProps.classroom) === true;
  const holdRef = useRef(false);
  holdRef.current = classroom;
  const nextRef = useRef(null);
  const [heldNext, setHeldNext] = useState(false);
  const nextKeyOn = !!tool.nextKey && navigable && ((_c = P.autoNext) != null ? _c : P.additionalProps && P.additionalProps.autoNext) !== true;
  const exploreOf = useRef(null);
  const ringTimer = useRef(null);
  const hintsOf = useRef({ at: "", k: 0 });
  const mutedRef = useRef(P.muted === true || P.soundDefault === false);
  const [soundOn, setSoundOn] = useState(!mutedRef.current);
  const sfx = useMemo(() => makeSfx(mutedRef), []);
  const langRef = useRef("en");
  langRef.current = P.lang === "hi" || P.lang === "gu" ? P.lang : "en";
  const lang = langRef.current;
  const UI = UI_STRINGS[lang];
  const tx = (v) => lineFor(v, lang, tool.TR);
  const voice = useVoice(mutedRef, langRef, { rate: 0.92, pitch: 1.06, ...tool.VOICE || {} }, holdRef);
  const [mascotOk, setMascotOk] = useState(true);
  const mascotRef = useRef(true);
  const [cheerOk, setCheerOk] = useState(true);
  const [quick, setQuick] = useState({ n: 0, on: false });
  const quickNow = () => {
    if (reducedMotion()) return;
    setQuick((q) => ({ n: q.n + 1, on: true }));
  };
  useEffect(() => {
    if (!quick.on) return;
    const t = setTimeout(() => setQuick((q) => ({ ...q, on: false })), 900);
    return () => clearTimeout(t);
  }, [quick.n]);
  const [react, setReact] = useState({ kind: "", n: 0 });
  const mascotDo = (kind) => setReact((r) => ({ kind, n: r.n + 1 }));
  const [party, setParty] = useState({ n: 0, big: false, on: false });
  const partyAt = useRef(0);
  const partyNow = (big) => {
    if (reducedMotion()) return;
    partyAt.current = Date.now();
    setParty((p) => ({ n: p.n + 1, big, on: true }));
    mascotDo("cheer");
  };
  useEffect(() => {
    if (!party.on) return;
    const t = setTimeout(() => setParty((p) => ({ ...p, on: false })), PARTY_MS);
    return () => clearTimeout(t);
  }, [party.n]);
  const [ring, setRing] = useState(null);
  const [done, setDone] = useState([]);
  const [run, setRun] = useState(0);
  const [stage, setStage] = useState("teach");
  const [stepNo, setStepNo] = useState(0);
  const stepRef = useRef(0);
  const [hintText, setHintTextState] = useState("");
  const hintOn = useRef("");
  const hintKind = useRef("hint");
  const setHintText = (s, kind = "hint") => {
    const t = s ? speakableIn(s, langRef.current) : "";
    hintOn.current = t;
    hintKind.current = kind;
    setHintTextState(t);
  };
  const [i, setI] = useState(0);
  const [typed, setTypedState] = useState("");
  const typedRef = useRef("");
  const staleRef = useRef(false);
  const [part, setPartState] = useState(0);
  const partRef = useRef(0);
  const setPart = (k) => {
    partRef.current = k;
    setPartState(k);
    try {
      const a = document.activeElement;
      if (a && a.getAttribute && /^part-\d+$/.test(a.getAttribute("data-control") || "")) {
        later(() => {
          const el = document.querySelector(`[data-control="part-${k + 1}"]`);
          if (el && el !== document.activeElement) el.focus();
        }, 0);
      }
    } catch (e) {
    }
  };
  const staleParts = useRef([]);
  const captureRef = useRef(null);
  const [captured, setCaptured] = useState(false);
  const capture = (fn) => {
    captureRef.current = typeof fn === "function" ? fn : null;
    setCaptured(!!captureRef.current);
  };
  const [openWanted, setOpenWanted] = useState(false);
  const wantRef = useRef(false);
  const setPanel = (b) => {
    wantRef.current = b;
    setOpenWanted(b);
  };
  const setTyped = (v) => {
    const nv = typeof v === "function" ? v(typedRef.current) : String(v != null ? v : "");
    typedRef.current = nv;
    if (board && nv !== "" && live.current.stage === "ask" && !wantRef.current && !(cardAnswerOn && live.current.item && live.current.item.choices)) setPanel(true);
    staleRef.current = false;
    staleParts.current = [];
    if (nv === "") setPart(0);
    setTypedState(nv);
  };
  const [tries, setTries] = useState(0);
  const [wrong, setWrong] = useState(null);
  const firstTry = useRef(0);
  const answered = useRef(0);
  const fired = useRef(false);
  const shared = useRef({});
  const results = useRef({});
  const summaryTok = useRef(0);
  const [summaryRow, setSummaryRow] = useState(-1);
  const timers = useRef([]);
  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };
  const clearLater = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    nextRef.current = null;
    setHeldNext(false);
  };
  const holdNext = (fn, kind) => {
    nextRef.current = fn;
    setHeldNext(kind || true);
  };
  const takeNext = () => {
    const f = nextRef.current;
    if (!f) return false;
    nextRef.current = null;
    setHeldNext(false);
    f();
    return true;
  };
  const paceNext = (fn, ms) => {
    let gone = false, over = 0;
    const go = () => {
      if (gone) return;
      gone = true;
      if (nextRef.current === go) nextRef.current = null;
      fn();
    };
    if (holdRef.current) nextRef.current = go;
    const lastHere = live.current.i + 1 >= live.current.items.length;
    const due = () => {
      if (gone) return;
      if (!nextKeyOn && voice.reading() && over < 6e3) {
        over += 150;
        later(due, 150);
      } else if (nextKeyOn && !lastHere) holdNext(go, "next");
      else go();
    };
    later(due, nextKeyOn ? Math.max(ms - NEXT_EARLY_MS, 400) : ms);
  };
  const fallback = (fn, ms) => later(fn, holdRef.current ? ms * 4 : ms);
  const nudge = () => {
    if (!holdRef.current) return false;
    if (voice.release(true)) return true;
    const f = nextRef.current;
    if (f) {
      nextRef.current = null;
      setHeldNext(false);
      f();
      return true;
    }
    const pa = pendingAdvance.current;
    if (pa) {
      pa(true);
      return true;
    }
    return voice.release();
  };
  const item = items[Math.min(i, items.length - 1)] || {};
  const say = (it) => tx(it.say) || tx(it.ask) || "";
  const live = useRef({});
  const cardAnswerOn = !!tool.cardAnswer && board;
  const cardKindOf = (it) => !cardAnswerOn || !it || it.choices || !it.parts || !it.parts.some((p) => p.at) ? null : it.parts.some((p) => p.at === "dwhole") ? "decimal" : "fraction";
  const cardKind = cardKindOf(item);
  const answerOn = !cardAnswerOn || stage !== "ask" ? null : item.choices ? "choices" : cardKind ? "card" : item.pad === "enter" ? null : "key";
  const [cardReady, setCardReadyState] = useState(true);
  const cardReadyRef = useRef(true);
  const cardGateRef = useRef(false);
  const setCardReady = (b, gate) => {
    cardGateRef.current = !!gate;
    const v = !!b;
    if (cardReadyRef.current !== v) {
      cardReadyRef.current = v;
      setCardReadyState(v);
    }
  };
  const tapLine = () => answerOn === "card" ? cardReadyRef.current ? UI.tapCard(tx(item.cardName || (cardKind === "decimal" ? "Decimal" : "Fraction"))) : "" : answerOn === "choices" ? UI.pickIt : answerOn === "key" ? UI.tapAnswer : "";
  const showTap = () => {
    const l = tapLine();
    setHintText(l, l ? "type" : "hint");
  };
  const openAnswer = () => {
    const L = live.current;
    if (!board || L.stage !== "ask" || L.locked) return false;
    if (!wantRef.current) {
      setPanel(true);
      if (!hintOn.current || hintKind.current === "type") setHintText(L.item.choices ? UI.pickIt : UI.typeIt, "type");
    }
    return true;
  };
  const closeAnswer = () => {
    setPanel(false);
    if (hintKind.current === "type") showTap();
  };
  const emit = (name, detail) => {
    const d = { toolId: tool.TOOL_ID, mediaId: tool.MEDIA_ID, ...detail };
    try {
      window.dispatchEvent(new CustomEvent(name, { detail: d }));
    } catch (e) {
    }
    try {
      if (window.parent && window.parent !== window) window.parent.postMessage({ type: "event", name, detail: d }, "*");
    } catch (e) {
    }
  };
  const mascotFail = () => {
    if (!mascotRef.current) return;
    mascotRef.current = false;
    setMascotOk(false);
  };
  useEffect(() => {
    try {
      const Img = typeof window !== "undefined" ? window.Image : null;
      if (typeof Img !== "function") return;
      const im = new Img();
      im.onload = () => {
        if (!im.naturalWidth) mascotFail();
      };
      im.onerror = mascotFail;
      im.src = MASCOT_IMAGE;
      if (typeof MASCOT_CHEER === "string" && MASCOT_CHEER) {
        const cm = new Img();
        cm.onload = () => {
          if (!cm.naturalWidth) setCheerOk(false);
        };
        cm.onerror = () => setCheerOk(false);
        cm.src = MASCOT_CHEER;
      }
    } catch (e) {
    }
  }, []);
  useEffect(() => {
    if (!started) return;
    demoOpen.current = false;
    pendingAdvance.current = null;
    const jump = skipTeach.current;
    skipTeach.current = null;
    if (jump !== null) {
      setStage("ask");
      voice.speak(say(items[Math.min(jump, items.length - 1)] || {}));
      return () => {
        clearLater();
        voice.hush();
      };
    }
    if (phase.steps && phase.steps.length) {
      stepRef.current = 0;
      setStepNo(0);
      setStage("demo");
      voice.speak(tx(phase.steps[0].say));
      return () => {
        clearLater();
        voice.hush();
        pendingAdvance.current = null;
      };
    }
    setStage("teach");
    const lines = [...idx === 0 ? tool.OPENING || [] : [], ...phase.says || []].map((l) => tx(l));
    if (phase.demo) {
      const go = fireOnce(() => {
        demoOpen.current = true;
        setStage("demo");
        pendingAdvance.current = null;
      });
      pendingAdvance.current = go;
      voice.speak(lines, go, { open: true });
      fallback(go, lines.reduce((a, l) => a + readMs(speakable(l)), 0) + 6e3);
    } else {
      const full = [...lines, say(items[0] || {})];
      const go = fireOnce(() => {
        setStage("ask");
        pendingAdvance.current = null;
      });
      pendingAdvance.current = go;
      voice.speak(full, go, { open: true });
      fallback(go, full.reduce((a, l) => a + readMs(speakable(l)), 0) + 6e3);
    }
    return () => {
      clearLater();
      voice.hush();
      pendingAdvance.current = null;
    };
  }, [run, started]);
  const demoDone = (lines) => {
    if (!demoOpen.current) return;
    demoOpen.current = false;
    setStage("teach");
    const full = [...(lines ? Array.isArray(lines) ? lines : [lines] : []).map((l) => tx(l)), say(items[0] || {})];
    const go = fireOnce(() => {
      setStage("ask");
      pendingAdvance.current = null;
    });
    pendingAdvance.current = go;
    voice.speak(full, go, { open: true });
    fallback(go, full.reduce((a, l) => a + readMs(speakable(l)), 0) + 6e3);
  };
  const didAt = useRef(0);
  const did = (name) => {
    var _a2;
    const L = live.current, st = L.phase && L.phase.steps;
    didAt.current = Date.now();
    if (!st || !st.length || L.stage !== "demo") return false;
    const k = stepRef.current;
    if (!st[k]) return false;
    if (String(st[k].on) !== String(name)) {
      if (st[k].hint) setHintText(tx(st[k].hint));
      return false;
    }
    stepRef.current = k + 1;
    setStepNo(k + 1);
    if (k + 1 < st.length) {
      voice.speak(tx(st[k + 1].say));
      return true;
    }
    const open = () => {
      setStage("ask");
      voice.speak(say(L.items[0] || {}));
    };
    if (reducedMotion()) open();
    else later(open, (_a2 = L.phase.stepHold) != null ? _a2 : 1600);
    return true;
  };
  const didRef = useRef(null);
  didRef.current = did;
  const demoMiss = () => {
    const L = live.current, st = L.phase && L.phase.steps;
    if (L.stage !== "demo" || !st || !st[stepRef.current] || !st[stepRef.current].hint) return;
    if (Date.now() - didAt.current < 400) return;
    setHintText(tx(st[stepRef.current].hint));
  };
  const workTap = (e) => {
    const el = e && e.target;
    const ctl = el && el.closest ? el.closest("[data-control]") : null;
    if (ctl && ctl.getAttribute("aria-disabled") !== "true") return;
    demoMiss();
  };
  const rungOf = (it, ladder, k) => k <= 0 ? it.miss || ladder[0] : k === 1 ? ladder[0] || it.miss : ladder[1] || ladder[0];
  const rungShown = useRef(-1);
  useEffect(() => {
    rungShown.current = -1;
  }, [i, idx, run]);
  const askHint = () => {
    const L = live.current;
    if (L.stage === "demo" && L.phase.steps && L.phase.steps[stepRef.current]) {
      const st = L.phase.steps[stepRef.current];
      if (st.hint) {
        setHintText(tx(st.hint));
        return;
      }
    } else if (L.stage === "ask" && !L.locked) {
      const ladder = L.phase.ladder || [], it = L.item;
      const hinted = !!hintOn.current && hintKind.current === "hint";
      const k = hinted ? Math.min(rungShown.current + 1, 2) : Math.max(rungShown.current, L.tries > 0 ? L.tries : 0);
      const rung = rungOf(it, ladder, k);
      if (rung) {
        rungShown.current = Math.min(k, 2);
        setHintText(tx(rung));
        return;
      }
    }
    voice.repeat(pendingAdvance.current || void 0);
  };
  const judge2 = (it, v) => {
    var _a2;
    if (tool.judge) return !!tool.judge(it, v, { phase, n });
    if (typeof it.answer === "number") return leadNumber(v) === it.answer;
    return String(v).trim().toLowerCase() === String((_a2 = it.answer) != null ? _a2 : "").trim().toLowerCase();
  };
  const fire = (summary) => {
    if (fired.current) return;
    fired.current = true;
    const L = live.current;
    const played = summary ? Object.keys(results.current).map(Number).sort((a, b) => a - b) : [L.n];
    const get = (p, k) => (results.current[p] || {})[k] || 0;
    const total = played.reduce((a, p) => a + (get(p, "total") || ((phases[p - 1] || {}).items || []).length), 0);
    const ok = played.reduce((a, p) => a + get(p, "firstTry"), 0), ans = played.reduce((a, p) => a + get(p, "answered"), 0);
    const ratio = total ? ok / total : 0;
    const detail = {
      toolId: tool.TOOL_ID,
      mediaId: tool.MEDIA_ID,
      doneId: tool.MEDIA_ID + ".DONE",
      phase: L.n,
      conceptId: L.phase.conceptId,
      objectiveIds: L.phase.objectiveIds || [],
      score: ans * POINTS,
      maxScoreThisPhase: (L.items.length || 0) * POINTS,
      correctFirstTry: ok,
      itemsAnswered: ans,
      stars: ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1
    };
    if (summary && played.length > 1) {
      detail.phases = played;
      detail.maxScore = total * POINTS;
    }
    try {
      window.dispatchEvent(new CustomEvent("finished", { detail }));
    } catch (e) {
    }
    try {
      if (window.parent && window.parent !== window) window.parent.postMessage({ type: "event", name: "finished", detail }, "*");
    } catch (e) {
    }
    try {
      if (typeof P.onComplete === "function") P.onComplete(tool.TOOL_ID, detail);
    } catch (e) {
    }
  };
  const showSummary = () => {
    const tk = ++summaryTok.current;
    const send = () => {
      if (summaryTok.current === tk) fire(true);
    };
    clearLater();
    later(send, 5e3);
    enterRef.current = null;
    capture(null);
    setStage("summary");
    setSummaryRow(-1);
    pendingAdvance.current = null;
    voice.speak(UI.summaryLine, void 0, { nopark: true });
  };
  const phaseEnd = () => {
    const L = live.current;
    setDone((d) => d.includes(L.n) ? d : [...d, L.n]);
    const lastPhase = L.idx === phases.length - 1;
    if (lastPhase && !nextKeyOn) {
      showSummary();
      return;
    }
    setStage("idle");
    let gone = false;
    const walk = (now) => {
      if (gone) return;
      gone = true;
      pendingAdvance.current = null;
      nextRef.current = null;
      const go = () => {
        if (nextRef.current === go) nextRef.current = null;
        enterPhase(L.idx + 1, 0);
      };
      if (now === true) {
        go();
        return;
      }
      if (holdRef.current) nextRef.current = go;
      later(go, Math.max(1400, PARTY_MS + 150 - (Date.now() - partyAt.current)));
    };
    const closing = [tx(L.phase.closing)].filter(Boolean);
    if (nextKeyOn) {
      let skipped = false;
      const go = () => {
        if (skipped) return;
        skipped = true;
        if (nextRef.current === go) nextRef.current = null;
        pendingAdvance.current = null;
        if (lastPhase) showSummary();
        else enterPhase(L.idx + 1, 0);
      };
      pendingAdvance.current = null;
      if (holdRef.current) nextRef.current = go;
      voice.speak(closing, void 0, { nopark: true });
      later(() => {
        if (!skipped) holdNext(go, lastPhase ? "summary" : "phase");
      }, Math.max(0, PARTY_MS + 150 - (Date.now() - partyAt.current)));
      return;
    }
    pendingAdvance.current = walk;
    voice.speak(closing, walk, { nopark: true });
    fallback(walk, closing.reduce((a, l) => a + readMs(speakable(l)), 0) + 6e3);
  };
  const freePlay = () => {
    summaryTok.current++;
    clearLater();
    voice.hush();
    enterRef.current = null;
    capture(null);
    exploreOf.current = null;
    pendingAdvance.current = null;
    setSummaryRow(-1);
    setTyped("");
    setWrong(null);
    setLocked(false);
    setStage("free");
    voice.speak(tx(tool.FREE_LINE) || UI.freePlayLine, void 0, { nopark: true });
  };
  const playAgain = () => {
    summaryTok.current++;
    results.current = {};
    setDone([]);
    enterPhase(mountPhase === null ? 0 : mountPhase - 1, 0);
  };
  const advance = () => {
    const L = live.current;
    const next = L.i + 1;
    if (next < L.items.length) {
      capture(null);
      setI(next);
      setTyped("");
      setTries(0);
      setWrong(null);
      setStage("ask");
      voice.speak(say(L.items[next]));
    } else phaseEnd();
  };
  const submit = (v) => {
    var _a2, _b2;
    const L = live.current;
    if (L.stage !== "ask") return false;
    const value = v === void 0 ? typedRef.current : v;
    if (value === "" || value === null || value === void 0) return false;
    const it = L.item;
    if (it.parts && slotPartsOf(value, it.parts.length).every((p) => p === "")) return false;
    if (v !== void 0 && typeof v !== "object") setTyped(String(v));
    else if (it.parts && Array.isArray(v)) setTyped(slotPartsOf(v, it.parts.length).join("|"));
    const ok = judge2(it, value);
    emit("answer_checked", { phase: L.n, item: L.i + 1, correct: ok, value, tries: L.tries + (ok ? 0 : 1), conceptId: L.phase.conceptId });
    if (ok) {
      sfx.correct();
      mascotDo("cheer1");
      quickNow();
      if (L.i + 1 >= L.items.length) {
        const lastPhase = L.idx === phases.length - 1;
        setTimeout(() => sfx.pop(), 220);
        setTimeout(() => {
          if (lastPhase) sfx.cheer();
          else sfx.win();
        }, 420);
        partyNow(lastPhase);
      }
      if (L.tries === 0) firstTry.current += 1;
      answered.current += 1;
      const r = results.current[L.n] || { answered: 0, firstTry: 0, total: L.items.length };
      results.current[L.n] = {
        ...r,
        answered: r.answered + 1,
        firstTry: r.firstTry + (L.tries === 0 ? 1 : 0),
        total: L.items.length,
        last: { item: L.i, value, kind: it.kind, answer: it.answer, shared: { ...shared.current } }
      };
      L.stage = "win";
      setWrong(null);
      setStage("win");
      emit("question_done", { phase: L.n, item: L.i + 1, firstTry: L.tries === 0, conceptId: L.phase.conceptId });
      try {
        if (typeof P.onProgress === "function")
          P.onProgress({ activity: tool.TOOL_ID, done: answered.current, total: L.items.length, phase: L.n, conceptId: L.phase.conceptId, objectiveIds: L.phase.objectiveIds || [] });
      } catch (e) {
      }
      paceNext(advance, (_b2 = (_a2 = it.winMs) != null ? _a2 : tool.winMs) != null ? _b2 : 1600);
      return true;
    }
    sfx.wrong();
    mascotDo("nod");
    const t = L.tries + 1;
    L.tries = t;
    setTries(t);
    setWrong({ value, tries: t });
    staleRef.current = true;
    if (it.parts) {
      staleParts.current = it.parts.map(() => true);
      setPart(0);
    }
    const ladder = L.phase.ladder || [];
    const kRung = Math.min(Math.max(t - 1, rungShown.current), 2);
    const rung = rungOf(it, ladder, kRung);
    if (rung) {
      rungShown.current = kRung;
      setHintText(tx(rung));
    }
    return false;
  };
  const commit = (v) => enterRef.current ? enterRef.current(v) : submit(v);
  const press = (k) => {
    const L = live.current;
    if (k === "enter" && nextKeyOn && heldNext) {
      takeNext();
      return;
    }
    if (k === "enter" && L.stage === "demo") {
      if (L.phase.steps && L.phase.steps.length && stepRef.current >= L.phase.steps.length) return;
      if (enterRef.current) enterRef.current(void 0);
      return;
    }
    if (L.stage === "demo") {
      demoMiss();
      return;
    }
    if (captureRef.current && (L.stage === "ask" || L.stage === "free") && !L.locked) {
      captureRef.current(k);
      return;
    }
    if (L.stage !== "ask" || L.locked) return;
    if (answerOn === "card" && cardGateRef.current && k !== "enter") return;
    if (k === "point" && (!tool.pointKey || L.item.parts)) return;
    if (board && k !== "enter" && !wantRef.current && L.item.pad !== "enter" && !L.item.choices) {
      setPanel(true);
      if (!hintOn.current || hintKind.current === "type") setHintText(UI.typeIt, "type");
    }
    if (L.item.parts && L.item.pad !== "enter" && !L.item.choices) {
      pressPart(k, L.item.parts.length);
      return;
    }
    if (k === "enter") {
      if (staleRef.current && L.item.pad !== "enter") return;
      commit(L.item.pad === "enter" ? void 0 : typedRef.current);
      return;
    }
    if (L.item.pad === "enter" || L.item.choices) return;
    if (k === "back") setTyped((s) => s.slice(0, -1));
    else if (k === "point") setTyped((s) => staleRef.current ? "." : s.includes(".") || s.length >= 9 ? s : s + ".");
    else setTyped((s) => staleRef.current ? k : s.length >= 9 ? s : s + k);
  };
  const pressPart = (k, np) => {
    const ps = slotPartsOf(typedRef.current, np), at = Math.min(partRef.current, np - 1);
    const parts = live.current.item.parts;
    const fresh = !staleParts.current.length || staleParts.current.some((s) => !s);
    if (k === "enter" && parts.some((p) => p.free)) {
      if (ps[at] !== "" && at < np - 1) {
        setPart(at + 1);
        return;
      }
      if (fresh && slotComplete(parts, ps)) {
        commit(ps.join("|"));
        return;
      }
      const half = parts.findIndex((p, j) => (p.at === "top" || p.at === "bottom") && ps[j] === "" && parts.some((q, i2) => i2 !== j && (q.at === "top" || q.at === "bottom") && ps[i2] !== ""));
      if (half >= 0) setPart(half);
      else if (at < np - 1) setPart(at + 1);
      return;
    }
    if (k === "enter") {
      if (ps[at] === "") return;
      if (at < np - 1) {
        setPart(at + 1);
        return;
      }
      const empty = ps.findIndex((p) => p === "");
      if (empty >= 0) {
        setPart(empty);
        return;
      }
      if (!fresh) return;
      commit(ps.join("|"));
      return;
    }
    const stale = staleParts.current.slice();
    if (k === "back") {
      if (ps[at] === "" && at > 0) {
        setPart(at - 1);
        return;
      }
      ps[at] = ps[at].slice(0, -1);
    } else ps[at] = stale[at] ? k : ps[at].length >= 7 ? ps[at] : ps[at] + k;
    stale[at] = false;
    setTyped(ps.join("|"));
    staleParts.current = stale;
  };
  const pickPart = (k) => {
    const L = live.current;
    if (L.stage !== "ask" || L.locked || !L.item.parts) return;
    if (captureRef.current) capture(null);
    setPart(Math.min(Math.max(k, 0), L.item.parts.length - 1));
  };
  const enterPhase = (k, at = 0) => {
    const kk = Math.min(Math.max(Math.round(k), 0), N - 1);
    clearLater();
    voice.hush();
    setParty((p) => p.on ? { ...p, on: false } : p);
    exploreOf.current = null;
    hintsOf.current = { at: "", k: 0 };
    fired.current = false;
    firstTry.current = 0;
    answered.current = 0;
    summaryTok.current++;
    setSummaryRow(-1);
    delete results.current[kk + 1];
    enterRef.current = null;
    capture(null);
    skipTeach.current = at > 0 ? at : null;
    setIdx(kk);
    setI(at);
    setTyped("");
    setTries(0);
    setWrong(null);
    setLocked(false);
    setRing(null);
    setStage(at > 0 ? "ask" : "teach");
    setRun((r) => r + 1);
  };
  const restart = () => exploreOf.current !== null ? enterPhase(exploreOf.current, 0) : ["summary", "free"].includes(live.current.stage) ? playAgain() : enterPhase(live.current.idx, 0);
  const backToStart = () => {
    summaryTok.current++;
    results.current = {};
    setDone([]);
    clearLater();
    voice.hush();
    exploreOf.current = null;
    pendingAdvance.current = null;
    enterRef.current = null;
    capture(null);
    startedRef.current = false;
    setStarted(false);
    enterPhase(mountPhase === null ? 0 : mountPhase - 1, 0);
  };
  const enterItem = (at) => {
    const a = Math.min(Math.max(at, 0), live.current.items.length - 1);
    clearLater();
    voice.hush();
    exploreOf.current = null;
    hintsOf.current = { at: "", k: 0 };
    pendingAdvance.current = null;
    enterRef.current = null;
    capture(null);
    setI(a);
    setTyped("");
    setTries(0);
    setWrong(null);
    setLocked(false);
    setStage("ask");
    voice.speak(say(live.current.items[a] || {}));
  };
  const gotoStep = (s) => {
    const L = live.current;
    let t = Math.min(Math.max(Math.round(Number(s) || 0), 0), steps - 1);
    if (!navigable && mountPhase !== null) {
      const lo = offsets[L.idx], hi = lo + Math.max((phases[L.idx].items || []).length, 1) - 1;
      t = Math.min(Math.max(t, lo), hi);
    }
    let k = 0;
    while (k + 1 < phases.length && offsets[k + 1] <= t) k++;
    const at = t - offsets[k];
    if (k !== L.idx || at === 0) enterPhase(k, at);
    else enterItem(at);
    return true;
  };
  const goPhase = (k) => {
    if (navigable && k !== live.current.idx) enterPhase(k, 0);
  };
  const setMuted = (m) => {
    const was = mutedRef.current;
    mutedRef.current = !!m;
    setSoundOn(!mutedRef.current);
    void was;
  };
  const toggleSound = () => setMuted(!mutedRef.current);
  const prevMuted = useRef(P.muted);
  useEffect(() => {
    if (P.muted === prevMuted.current) return;
    prevMuted.current = P.muted;
    if (typeof P.muted === "boolean" && P.muted !== mutedRef.current) setMuted(P.muted);
  }, [P.muted]);
  const highlight = (id) => {
    const key = String(id);
    if (!RING_KEYS.includes(key)) return false;
    setRing(key);
    clearTimeout(ringTimer.current);
    ringTimer.current = setTimeout(() => setRing((r) => r === key ? null : r), 2400);
    return true;
  };
  useEffect(() => () => clearTimeout(ringTimer.current), []);
  const prevRoom = useRef(classroom);
  useEffect(() => {
    if (classroom === prevRoom.current) return;
    prevRoom.current = classroom;
    if (classroom) return;
    voice.release();
    const f = nextRef.current;
    if (f) {
      nextRef.current = null;
      setHeldNext(false);
      f();
    }
  }, [classroom]);
  useEffect(() => {
    if (!classroom) return;
    if (stage === "ask") highlight("work");
    else setRing((r) => r === "work" ? null : r);
  }, [classroom, stage, i, idx, run]);
  useEffect(() => {
    const h = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (!startedRef.current) {
        if (e.key === "Enter" || e.key === " ") {
          startNow();
          e.preventDefault();
        }
        return;
      }
      if (/^[0-9]$/.test(e.key)) {
        press(e.key);
        e.preventDefault();
        pointerBlur();
      } else if ((e.key === "." || e.code === "NumpadDecimal") && live.current.stage === "ask" && !captureRef.current && (live.current.item.parts || [])[partRef.current] && live.current.item.parts[partRef.current].at === "dwhole") {
        setPart(partRef.current + 1);
        e.preventDefault();
        pointerBlur();
      } else if (tool.pointKey && (e.key === "." || e.code === "NumpadDecimal")) {
        press("point");
        e.preventDefault();
        pointerBlur();
      } else if (e.key === "Enter") {
        press("enter");
        e.preventDefault();
      } else if (e.key === "Backspace") {
        press("back");
        e.preventDefault();
        pointerBlur();
      } else if (e.key === "Escape") {
        if (captureRef.current) press("clear");
        else if (live.current.stage === "ask" && !live.current.locked) setTyped("");
        e.preventDefault();
      } else if (holdRef.current && (e.key === "ArrowRight" || e.key === "PageDown")) {
        nudge();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });
  const alwaysOpen = ((_d = P.answerOpen) != null ? _d : P.additionalProps && P.additionalProps.answerOpen) === true;
  const panelOpen = board && !(cardAnswerOn && item.choices) && (openWanted || captured || alwaysOpen) && !locked && (stage === "ask" || stage === "free" && captured);
  const slide = useSlide(panelOpen ? 1 : 0);
  const workW = board ? Math.round(ZBOARD.work.w - (ZBOARD.work.w - BOARD_OPEN_W) * slide) : W.w;
  useEffect(() => {
    setHintText("");
  }, [stage, i, idx, run, stepNo]);
  useEffect(() => {
    if (!answerOn || locked || wantRef.current) return;
    if (hintOn.current && hintKind.current === "hint") return;
    const l = tapLine();
    if (l) setHintText(l, "type");
    else if (hintOn.current && hintKind.current === "type") setHintText("");
  }, [answerOn, i, idx, run, cardReady, locked]);
  useEffect(() => {
    if (board && wantRef.current) setPanel(false);
  }, [i, idx, run]);
  useEffect(() => {
    if (board && wantRef.current && stage !== "ask" && !(stage === "free" && captured)) setPanel(false);
  }, [stage, captured]);
  live.current = { idx, n, phase, i, item, stage, typed, tries, submit, setTyped, items, locked, board, panelOpen };
  const apiRef = useRef({});
  apiRef.current = {
    getState: () => {
      var _a2;
      return {
        toolId: tool.TOOL_ID,
        mediaId: tool.MEDIA_ID,
        mode: navigable ? "user" : "ai",
        mountPhase,
        lang,
        phase: n,
        phases: N,
        conceptId: phase.conceptId,
        objectiveIds: phase.objectiveIds || [],
        step: (offsets[idx] || 0) + i,
        steps,
        item: i + 1,
        items: items.length,
        stage,
        question: tx(item.ask) || "",
        questionText: say(item),
        choices: item.choices ? item.choices.map((c) => c.id) : null,
        typed: typedRef.current,
        keypadOpen: stage === "ask" && !locked,
        tries,
        ...board ? { board: true, answerPanel: panelOpen ? "open" : "closed", workWidth: workW } : {},
        ...hasStart ? { startPage: !started } : {},
        ...cardAnswerOn ? { answerOn, cardReady, hintKind: hintText ? hintKind.current : null } : {},
        ...nextKeyOn ? { nextKey: heldNext ? heldNext === "phase" ? UI.nextPhase : heldNext === "summary" ? UI.summaryKey : UI.next : null } : {},
        party: party.on,
        ...phase.steps && phase.steps.length ? { guideStep: stepNo, guideSteps: phase.steps.length, guideOn: stage === "demo" && phase.steps[stepNo] ? String(phase.steps[stepNo].on) : null } : {},
        parts: item.parts ? item.parts.map((p) => p.label) : null,
        part: partRef.current,
        padTo: captureRef.current ? "work" : "slot",
        answered: answered.current,
        firstTry: firstTry.current,
        score: answered.current * POINTS,
        maxScore: items.length * POINTS,
        answerShown: stage === "win" || stage === "idle" ? (_a2 = item.answer) != null ? _a2 : null : null,
        summaryRow,
        played: Object.keys(results.current).map(Number),
        questionCount: `${Math.min(i + 1, items.length)} / ${items.length}`,
        muted: mutedRef.current,
        speaking: voice.speaking,
        voice: voice.state().voice,
        mascot: mascotRef.current ? "image" : "drawn",
        classroom,
        held: classroom && voice.held,
        instruction: voice.line,
        hint: hintText || null,
        ...shared.current,
        /* the runtime owns `complete`: true once `finished` is sent. A tool's shared `complete` (the plan's
           field, often "stage is idle") would say it at every phase end, now that the tool walks on */
        complete: fired.current
      };
    },
    gotoStep,
    say: (text) => {
      voice.speak(String(text != null ? text : ""));
      return true;
    },
    answer: (v) => {
      const L = live.current;
      if (L.stage !== "ask" || L.locked) return false;
      if (tool.answer) {
        const r = tool.answer(L.item, v);
        if (r !== void 0) return !!r;
      }
      if (L.item.choices) {
        const c = L.item.choices.find((x) => x.id === String(v) || String(x.label).toLowerCase() === String(v).toLowerCase());
        if (!c) return false;
        setTyped(c.id);
        return true;
      }
      if (L.item.pad === "enter") return false;
      if (L.item.parts) {
        const ps = L.item.parts.some((p) => p.at === "dwhole") ? decimalPartsOf(v) : slotPartsOf(v, L.item.parts.length);
        if (L.item.parts.some((p) => p.free) ? !slotComplete(L.item.parts, ps) : ps.some((p) => p === "")) return false;
        setTyped(ps.map((p) => p.slice(0, 7)).join("|"));
        setPart(ps.length - 1);
        return true;
      }
      setTyped(String(v != null ? v : "").replace(/[^0-9]/g, "").slice(0, 9));
      return true;
    },
    /* a tool that makes its answer on the working area may take check() first (e.g. drop a token) */
    check: () => {
      const L = live.current;
      if (L.stage !== "ask" && L.stage !== "demo") return false;
      const steps2 = L.stage === "demo" && L.phase.steps && L.phase.steps.length;
      const r = !steps2 && tool.check ? tool.check(L.item) : void 0;
      if (r === void 0) press("enter");
      return true;
    },
    reset: () => {
      restart();
      return true;
    },
    next: () => {
      if (nextKeyOn && heldNext && takeNext()) return true;
      if (holdRef.current && nudge()) return true;
      const L = live.current, lastHere = L.i + 1 >= L.items.length;
      if (lastHere && (L.stage === "win" || L.stage === "idle" || !navigable && mountPhase !== null)) return false;
      return gotoStep((offsets[L.idx] || 0) + L.i + 1);
    },
    prev: () => gotoStep((offsets[live.current.idx] || 0) + live.current.i - 1),
    highlight,
    setParam: (name, value) => {
      if (name === "phase") return gotoStep(offsets[Math.min(Math.max(Math.round(Number(value) || 1), 1), N) - 1] || 0);
      if (name === "muted") {
        setMuted(!!value);
        return true;
      }
      return false;
    },
    playDemo: () => {
      enterPhase(live.current.idx, 0);
      return true;
    }
  };
  useEffect(() => {
    const w = window, proxy = {};
    const LIVE = ["gotoStep", "answer", "check", "next", "prev", "reset", "playDemo"];
    TOOL_API.forEach((m) => {
      proxy[m] = (...a) => {
        if (LIVE.includes(m)) startNow();
        return apiRef.current[m](...a);
      };
    });
    w.toolApi = proxy;
    if (tool.TOOL_ID) w[tool.TOOL_ID] = proxy;
    return () => {
      if (w.toolApi === proxy) delete w.toolApi;
      if (tool.TOOL_ID && w[tool.TOOL_ID] === proxy) delete w[tool.TOOL_ID];
    };
  }, []);
  const api = {
    /* a Work line goes through the tool's TR table like every other line the tool speaks */
    submit,
    setTyped,
    say: (lines, doneFn) => voice.speak(Array.isArray(lines) ? lines.map((l) => tx(l)) : tx(lines), doneFn, { nopark: true }),
    sfx,
    share: (o) => {
      shared.current = o || {};
    },
    onEnter: (fn) => {
      enterRef.current = fn || null;
    },
    /* always set: a Work callback may hold an older api whose `locked` is stale; React skips a no-op */
    lock: (b) => setLocked(!!b),
    capture,
    demoDone,
    did,
    C,
    W,
    /* r49 (cardAnswer): a tap on the card opens the keypad / a tap on a box of the card puts the caret in it; cardReady(false)
       while the picture still wants an act (a blinking card would send the child past it) */
    openAnswer,
    closeAnswer,
    pickPart,
    cardReady: setCardReady
  };
  const workProps = {
    phase,
    n,
    item,
    index: i,
    stage,
    wrong,
    typed,
    part,
    captured,
    api,
    MODEL: tool.MODEL,
    lang,
    tx,
    box: { w: workW, h: W.h, open: panelOpen, board },
    answerOn,
    cardKind,
    step: stepNo,
    stepOn: stage === "demo" && phase.steps && phase.steps[stepNo] ? String(phase.steps[stepNo].on) : null
  };
  const Work2 = tool.Work;
  const Runs = tool.Runs;
  const rz = ring ? ringBox(ring, workW, panelOpen) : null;
  return <div className="c4-frame" style={{ position: "relative", margin: "0 auto", touchAction: "none", userSelect: "none", WebkitUserSelect: "none" }}>
      <style>{CSS}</style>
      <svg
    className="c4"
    viewBox="0 0 1600 900"
    width="100%"
    height="100%"
    aria-label={tx(tool.TOOL_NAME)}
    style={{ ["--c4-accent"]: C.accent, ["--c4-focus"]: shade(C.accent, 0.4) }}
  >
        <Defs C={C} />
        <rect x={0} y={0} width={1600} height={900} fill={C.paper} />
        {!started ? <StartPage
    C={C}
    name={tx(tool.TOOL_NAME)}
    hook={tx(tool.START_HOOK)}
    Art={tool.StartArt}
    UI={UI}
    lang={lang}
    tx={tx}
    onStart={startNow}
    mascotOk={mascotOk}
    onMascotFail={mascotFail}
  /> : <>
        <Header
    C={C}
    name={tx(tool.TOOL_NAME)}
    title={tx(phase.concept)}
    soundOn={soundOn}
    onAgain={askHint}
    onSound={toggleSound}
    onRestart={showStart ? backToStart : restart}
    toStart={showStart}
    UI={UI}
  />
        <rect
    x={Z.canvas.x}
    y={Z.canvas.y}
    width={Z.canvas.w}
    height={Z.canvas.h}
    rx={RAD.card}
    fill="url(#gCard)"
    stroke={C.rule}
    strokeWidth={2}
    filter="url(#fShadow)"
  />
        <path d={`M ${Z.canvas.x + 30} ${Z.canvas.y + 4} H ${Z.canvas.x + Z.canvas.w - 30}`} stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" />
        {Runs && <g data-zone="runs">
            <rect x={Z.runs.x} y={Z.runs.y} width={Z.runs.w} height={Z.runs.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            <g transform={`translate(${Z.runs.x},${Z.runs.y})`}><Runs {...workProps} /></g>
          </g>}
        {
    /* under the summary card nothing else is drawn (hidden, not unmounted, so Free play keeps its state) */
  }
        <g display={stage === "summary" ? "none" : void 0}>
        <g data-zone="work" transform={`translate(${W.x},${W.y})`} onClick={workTap}>
          {
    /* r41: a transparent floor under Work, so a tap on EMPTY board lands inside the zone and counts as a wrong act in a guide step */
  }
          <rect data-role="work-floor" x={0} y={0} width={workW} height={W.h} fill="transparent" aria-hidden="true" />
          {Work2 && <Work2 key={run} {...workProps} />}
        </g>
        {(() => {
    const askText = stage === "teach" ? "" : stage === "free" ? UI.freePlay : tx(item.ask);
    const nextLabel = heldNext === "phase" ? UI.nextPhase : heldNext === "summary" ? UI.summaryKey : UI.next;
    const slotEl = <Slot
      C={C}
      ask={board ? "" : askText}
      typed={stage === "free" ? "" : typed}
      active={stage === "ask" && !captured}
      live={stage === "ask"}
      format={tool.format}
      lang={lang}
      TR={tool.TR}
      parts={stage === "free" ? null : item.parts}
      part={part}
      onPart={pickPart}
      side={!!tool.sideBySide}
    />;
    const padEl = <Pad
      C={C}
      enabled={(stage === "ask" || stage === "free" && captured) && !locked}
      digitsOff={stage !== "free" && item.pad === "enter" && !captured}
      onKey={press}
      point={!!tool.pointKey}
      pointOff={stage !== "free" && !!item.parts && !captured}
      choices={stage === "free" ? null : item.choices}
      onChoice={(id) => {
        if (!locked) commit(id);
      }}
      UI={UI}
      lang={lang}
      TR={tool.TR}
    />;
    if (!board) {
      if (nextKeyOn && heldNext) {
        return <>
                  <Key id="next-key" label={nextLabel} x={Z.slot.x} y={Z.slot.y} w={Z.slot.w} h={Z.slot.h} C={C} tone="enter" primary onClick={takeNext}>
                    <text y={String(nextLabel).length > 10 ? 11 : 14} textAnchor="middle" fontSize={String(nextLabel).length > 10 ? T.label : T.prompt} fontWeight={600} fill={toneInk("enter", "#FFFFFF")}>{nextLabel}</text>
                  </Key>
                  <NextBlink x={Z.slot.x} y={Z.slot.y} w={Z.slot.w} h={Z.slot.h} C={C} />
                </>;
      }
      return <>{slotEl}{padEl}</>;
    }
    const askMode = nextKeyOn && heldNext ? "next" : stage !== "ask" || locked ? "off" : item.pad === "enter" && !captured ? "enter" : answerOn === "choices" ? "choices" : answerOn === "card" ? "card" : "answer";
    return <>
              <AskBar
      C={C}
      ask={askText}
      hasRuns={!!Runs}
      mode={askMode}
      open={panelOpen}
      UI={UI}
      nextLabel={nextLabel}
      choices={item.choices}
      onChoice={(id) => {
        if (!locked) commit(id);
      }}
      lang={lang}
      TR={tool.TR}
      quiet={cardAnswerOn}
      blink={cardAnswerOn && !panelOpen}
      onKey={() => {
        if (askMode === "next") {
          takeNext();
          return;
        }
        if (askMode === "enter") {
          press("enter");
          return;
        }
        if (!wantRef.current) openAnswer();
        else closeAnswer();
      }}
    />
              <g data-zone="drawer" display={slide < 2e-3 ? "none" : void 0} transform={`translate(${((1 - slide) * (Z.drawer.w + 56)).toFixed(1)},0)`}>
                <rect x={Z.drawer.x} y={Z.drawer.y} width={Z.drawer.w} height={Z.drawer.h} rx={RAD.card - 4} fill={THEME && THEME.panel ? "url(#gTpanel)" : "url(#gPanel)"} stroke={THEME && THEME.panel ? THEME.slot || C.rule : C.rule} strokeWidth={2} filter="url(#fShadow)" />
                {cardKind ? <Key
      id="answer-open"
      label={UI.answerClose}
      x={Z.slot.x}
      y={Z.slot.y + 10}
      w={Z.slot.w}
      h={72}
      C={C}
      tone="soft"
      disabled={stage !== "ask" || locked}
      onClick={closeAnswer}
    >
                    <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={toneInk("soft", C.ink)}>{UI.answerClose}</text>
                  </Key> : slotEl}
                {padEl}
              </g>
            </>;
  })()}
        </g>
        {stage === "summary" && <Summary
    C={C}
    phases={phases}
    results={results.current}
    row={summaryRow}
    showScore={P.showScore !== false && !classroom}
    freePlay={!!tool.freePlay}
    onFree={freePlay}
    onAgain={playAgain}
    Thumb={tool.Thumb}
    UI={UI}
    lang={lang}
    TR={tool.TR}
  />}
        <Footer
    C={C}
    line={voice.line}
    hint={hintText}
    speaking={voice.speaking}
    react={react}
    n={n}
    N={N}
    i={i}
    total={items.length}
    navigable={navigable}
    done={done}
    onGo={goPhase}
    mascotOk={mascotOk}
    onMascotFail={mascotFail}
    cheerOn={(party.on || quick.on) && cheerOk}
    onCheerFail={() => setCheerOk(false)}
    UI={UI}
    onBubble={classroom ? nudge : void 0}
    cue={voice.held}
    board={board}
    lang={lang}
    hintType={!!hintText && hintKind.current === "type"}
  />
        {party.on && <Party key={party.n} C={C} big={party.big} n={party.n} />}
        {rz && <rect
    className="c4-ring"
    x={rz.x - 6}
    y={rz.y - 6}
    width={rz.w + 12}
    height={rz.h + 12}
    rx={24}
    fill="none"
    stroke={C.accent}
    strokeWidth={6}
    pointerEvents="none"
  />}
        </>}
        {
    /* only when the browser will not speak before a tap (sound stays on; the lesson waits for it) */
  }
        {voice.needsTap && soundOn && <g data-zone="cover">
            <rect x={0} y={0} width={1600} height={900} fill={C.paper} fillOpacity={0.86} />
            <Key id="tap-to-start" label={UI.tapToStart} x={560} y={372} w={480} h={130} C={C} primary onClick={() => voice.unlock()}>
              <g transform="translate(-150,0)"><IconSound c="#FFFFFF" on /></g>
              <text x={30} y={15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill="#FFFFFF">{UI.tapToStart}</text>
            </Key>
          </g>}
      </svg>
    </div>;
}
const MASCOT_IMAGE = "data:image/webp;base64,UklGRnRLAABXRUJQVlA4WAoAAAAwAAAAGAEAowEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIDw8AAAGgRtu2qqc5CdIkxHB3d6ji7lAcKrgTXOq4Fvd6C8UhFbzuOPUWd3fiLt/50fd9+d49cvszIiYA1Fhu8LqfL2PsqX2zOwbD/4gl5vyDvqbu6/d/wZOfYc4fzg3/H6DWPvRv4svBllduUzb6PX5iLovLvzIdXb3f29pejkPXTz1pZc9dRiM/r2Rd7X9DU7PXl7SqZw6i0esKWlPpnWh64uQ8VhS2KA0JXutmP7nG3EOix+paTtczSNezrYTFlPkaaWdMy2UpgVOSkPyNJ6yk1FHk0LM6l310ikEmLxWzjQXIZ2ozq3hsN3LqGWMREceRV89Sayh8BtmNtoTK15DhP3PbQNM4ZPlWpP5apSHTjwpqr2sGsh1XRHe9s5HxhBKaG4a8J5fX20TkPrWm1mYj/+lP6WwlSpjZSGMfooxZXdQVEI1SZvdVVq7dKKdnoKpyf4GSekYoKvgHFHaimnJ9i+JGKSlwF8rr6a+jHSixp4+G3kahO+pnAkqdVUs7jbPEwsRg3ZR6hIL/q5rgv1H09zXzIQrfXS99UPqMolopmywe3tTKX6jAHTpZiyrsp5EuqMPM4vqomKgEvK2OoJOoxu3a2IqKHKiLsajJrMqaeCZLFRiXVw9F76Ayj6kh93FU5wotfIz69HTSwWjUaEYZDTRGnd4Llq/wPaXgz+LlPopqnSfdO6hXTxvZXkTNpheVrECcavC4ZFtRuT3kaoPaTQoS66p6cLNUM1G/nooyFUtTEJ6TaQeqeIhETVDHSQIFnlUSbpDnZdSyp5w0RVPUhGel+RQVPViWFqjplCBJ8l5SFX4myUzUtaeeHGVR2zfliFYXRknxNOo7OVCIPxWGa2XohxrPipAg902V4R4JJqPOs0vzF/ZIaXiIvwWo9rrcFU7V2xnuPkLFt+OtcrbmbvN2AFU/grNmqPvE3IydUh6u5msoaj8rP1cht9WH33I1F/XvqcVTsTQLwAs8bUMr7M1RA7TDWI7+tAScz09/tMWMMG7y3rYG/JybV9Eiy/GS575N7OElCm3SE8lJwBWrwHc56YN2mcbJT5aBUXxUR9u8wcfb1oHPsJFgH19xMQTtMzucicMWgpN4qIw2eo2HpVaC9TkIeGAnWznojnaalpuBvZaC/egVRVv9l95r1oLFyV21l5XUWqC9JlDbZDHYjlZIms38QmsU2qwngtRxq8GZlKqj3d6htNhysDqdgPu2s5lOe7Td5EAyH1sPtiLzwH42UHkG7fc+lbkWhBWIHLShUUSSbGg9jdJow3/S6GhFSTTGWhGGkphmR6VILLajGiTesaMGJN6yo0Yk3rSjmiRet6NSJMbaURiJblaUCiQrW9FvNALTbOgjGvC3DU0l8o4NNSbSw4JSAomEZNrPZ0D1sP2MJDPJejILkonIsJ3PgW607XQm1N5y7gYQgnN2Mx0oD7KapHykAs/ZzEyg3cNiHuQlBt/YS1+gXiLFVvYD/X6WcrcAA/C+lWQ3AA5z/2wjQ4HHsDP2sRC4LHrBNtYCn0XP2MVa4LTAHzYxE3gN+cEasocAt7nWW0Jia2B4UpYNXK8KLLd8qL+f8gPTJX/T3qJAYDvPomzN3WkFrDe8qrftkcB8yJwUnZ1pBQKW2q6wR+NzgYyVVsXo6q/RISBo/2N62tIApK31XryG/h0TASL3/lI5d1c9AXIXiDqilqQt7UD6ctNOamRX7yBQ4eNLb+rihyERoMg229VwYVpp0GbEmNMa2N4MdNpqn3AJC4uBXuvsESxufiTotuyyBJlOjwgC/YZOS5HnZAdQctGZt2X5ui/oufI9WYqBnsMvoqwTFbUHhf1ZTy+huIW19GSmPBOUFHET5X0UqqO9KPFWFfVDmbsqqFi8UDHF9PM9Sv2deoah3AOVUzxesLjCuvkeJd+vmn4oe1/F5H8k3MNwvWxB6TeopRXK31QpwdcVcCVYJ8tQg4tVUht1WEMjvynhsEKiUIvD1VE0UQ2xBbQRjXrcoYyuqMkuqoi8q4o7YZr4CHX5niJaojZbqSHsljpu5tPCBtTn+0rogBptpYKweyq5Ga6BbajTjQrojVrtKl6xeLXEFJLuJ9TrV8JNQM1GiVYlVTWpFST7A3V7QrD5qN1ZYtXPVk/240KFXEL9XnxMpvdQw+tE6oQ6bidQsQdKelBUnm9Qy1+IMxn1PE6Y+hmKyqgtSvh11PSVcEm2oa63CNIXtd1bjGLx6oopJMVPqO+vhIhCjY8QoXiSyhJLSPA96vw7AUag1oezVyRRbYlFufsU9b6TuTao+XasBd1U3Y0gzt5Eg1OlSMs0COcyVjzNpLNS/H7BpNQSfO1Fk7+UIvo7k/BzrsK3o9Hvxwmx5COjcFM4T+fQ7MVXhIhabhaeZGklGj73TyE6LjIMFzNUE02f/aMQtReYhtX5ede4Vz8Xosgbxq3j56RxI9fL4IExxv3Fzz3jXlwtQwwMMO42P/8Y12mZDLHQ1bg/+NliXIWFMsRBNeM28jPctFswS4Z4gHumDeankmmb4HUZEgC2mVaOH7hlWDmYKkMiQIVUs64Aw1vM6gpSpABAT7M+4mi4SecbAsDrMmQBADS5ZNIAjiq55kl3erBrGPx3rQxYCf47cu8Dp3SPa0U5gjsu3RgCkL9Go6oR4PUfIbY7AEBE1cbVIwFG3HLpCrC83iXE6Dzgc4FsIdJCvDg+Fo1uv89TY9fwaLBPr6CUUT6FnkDXG/AEX7mGu3w6JMY3vgR8ha7vA6bDElzDl3x4LFOMtLw+TEfXY/JxNQbdjwnyVgflrOktItE9HMbVYQNwqrcWgjTyNgsNPMjVHRPOeyuSLkZKpLc7JtxkKi8aWdcLdBNjEHh9Bk305OKphhmzvA0SY5q3eUZgZZ7amrHX2yIxdno7YEZzngaZcdnbATHOertuxvM8vWoGersmBubzgmZO4GmuIYWcglHORk4lDXmNpwWGVHFqLEiUUx1D3uBpsSG1nYYL8o7TM4bM4Gm2IdWdVglyzOlJQ17iaagh1Zy+EyQ9wKjneWphSBmnO4JgRYcahjTkqYAh4Q75UdLODkUMieAJfjQiGxwbiTLVIcCM74Dp8UbcdRooyvsOcN+IKK4iU0w44TRXlB+cfjchMYIrWGPCJ07bRLnktMuEJcB2GRPmOR0WJdNpsQGpxfiCaQb0dbosCpZ0GGDAZOD8hG8/dlnjhypOmbI84VDHD2u6/uLbz8B6uRhf1gPAiBzdBsdIlLWVA8TmaAAA7PDlQUneoLUPH8J/d+TkfafywvRw2pqTj+C/0T40Be4HeDkAjoVu56CtUzVhOjn1yMG1MIfgo176Af+DHTaD1xa+/Q7OlYVp4AQnfWsMziFfO/QDCZ/5JP7wYPCx/kVf2ngJJ5Dy4OqpE/9ePHP9EYWqXjr4cr4e+DjySMyOeiBy8MpLTvf7g/cM8zYAAHR9FgC2ECjiBYY8dLqwNAi0GNp99uyJT4Kvl83DNwCgR0eAmWj+LfC1wcTZs7uFgGa3E0iNBOjdDgohwfd9UvBkAvgKQJM6MI3CWFXlOUvhB/jvQQpn82hqOVK87HCDAi5W1NNI8rbDQxL4hJoC/6VxxuEijX8CtfQK0jzi8BsNnKSkIilEdjp8SiSpsI5WItExDhOI4DIVlUCqZR0qUkkpqqFVVP4B5zNEcKmCIlOoTPMym0pCqH5mIFFPcS/lqeBr6skTQ+UH8H6Qyr082hmJVPv5MJgKDtHOaSoPwdcYKv8qpy1SXezTCirYQjf7yJT3qSKZXaop76GyH3z/koqnlGZWIdX2OehMBZcqJl8ilUuQ02tUYoP1MhapTs/RbCo4Qi/nyFTMUSUyJ9XSCqlegZzfoIIttPI5mXf98AGZT5VSCsn28kMfMlhcJwvIeML9EOEhM0cluR6SOQb+/J3M7QCN9EGy6/zyHhnsppFv6Ez2y8t0vlRIeaTb1S+96Hgq6OMtQjX9Uo8OrlZHaDKhvH4JIpQcrI2XkO5N8O99OjheG9cJHfTTEUIXldELCW/103ZC2FkXBym96acllL5TRV2kPNpP4yhhNU1sJtXJT91IrVdEkUxSlfxUjVRafj3MQcoZ4OeAdEo4Qw/3SR3zF5wgdU8Ng5D0Sr+tIYX9tPAXre5+603rdyW0RNKecL+Fe0hhMx3so3UI/H+M1i4VVEbab7gwkxZW0MDbxJ5w4SliqxUQmkwrFlwMSKSVHCrfy0j7MzdgFy2cKl7ATWJjXBlP7HqAdH2ReFVXahLDntKdIBYH7sYSOyhcAyT+lUvfE8MnZNtEbaFLS6l9LFpBpN7Tpb7UUvNL9jK5mi7Vo4ZTJLtOLsilAuQuCNYBqceC28nUsI1cn5H7x7XT5HaIFZFB7pBrx8ml5pNqLJI/4tqv5HCkVCfoHXftD3qHhaqG9E+7dpYeVpRpDgNZgS4FZjEwXaaTDGBFl6oig3+KVBo57O5SHw6wrESvsTDfpcUsTJXoEAtfufQ9Cz8IFJLFQqxLcSxk5pWnC/JYzpXKyGN7eZYz8bwrLzKxWJ4vmVjlylomvpTnMhPHXPmNiYviBCKTGQEu5M5mIitQmmpcYG0X6iGXlaR5lo0XXOjPRgdpprAxy4X5bIyTZiobH7mwiY0J0vRkY5cL+9joIk19NqJd+JSNWtJEsLHehU1s5JUGDnLxhguzuPgBxO3CRTMXWnPRQR44xcM1cPMmD/+CwP14iHJlPA8vSgQLODgA7n7JwTyQ+UV6X4e5FP4NvedB6DofJBKbDe7PI5bwTk2RIudeQtpxy6uAidVWxFFCxAuzIqUJnRWPpE+u6wnGBvV8+xQlxLjpoaKMfYhkk49ueLVrYTC9SNdXNxxLoYL4YJQctX9HyqebAc1WZ5Dy8epCdM9E4otILEHi6e1F6J6F5D8OMC5wC5JPby9AG+Rwt3F7kcNG7BV4yAKuNGw9sngzgrs9yORQoyYgk58xVxO5zKxuUJ1sLrAab5vYwBMGnUQ2P+LtIR/4mjHzkc8brJVHRtMrGVIjkxEszFkXTvCwIUeR09acDWMFXzLidWT1ec5e4QUbGNAceR3D2QJmfjbgD2be4GwvMxjsWilkNpqzVbxcHQXuT7vBywrOZrASB2bGszKds5dZuWXIPVYmc/YEK5sN2cZKPc5gIiO/FzCk0G+MjAPDAQBWUDggbjoAAHDIAJ0BKhkBpAE+KRSHQqGhCQVy3AwBQlN34+TFHgD+Z+pnIfAP+67Wzd/dv8N+3H5W/N7Yf61/af0N+93+D+WfbZ2L5jnkv6r/mf79+6H+E/////+8P+e/yH98/cD5Vfq//Se4F+n390/u/+C/3f91///zh/pX7sfMJ/Qf61/pf8J+6vy8/7n/o/633V/3v1Af6V/gf+P+eneMfu37AX9N/2H/x9b//1f5f99/o5/qv+o/7/+j/fr6Ef59/Zv+B+dPyAfv/7AH/A///sAepf1B/r343frZ84fB/79+Sv9w/2f9z7v7zD7L/33/rf5/n7PM/cj9B/bf2u/K/8Ff13e/2VfkC/HP59/h/yO/sv/n/5/HB2y/6XqC+3P1b/N/4z9tP9J+6v0h/X+aX2l+6P6Af1g/3P5af3X6L75n8n/2/YC/nH9//135cf475Nv9v/Rf6j/z/5T2+/Tf/T/1f7x/5////gV/Kv6l/rP7//l/+z/nP///4PvA//Ht+/cX/ze5r+sv/XLVpTOQQHjUULPbs/0Z28WcEULxawaddfjmkQNbKr2aFx96/6J1P/nqn2GPHA++f2/UKU4KH40CLj72aFnKb9H6CPuZhsV9c8+BRr0EnZiTZ3obK+Pu2c9rN9WV+W5G1ziVfJAf/pWDNADf/JP7khyuWRfSOVSxIcmK4MUgSWHeUbhYsD2MotvVnLIaDZHRrmOiaQ07wq7KYEgFFt+plCE185+X1RGDyoq7BICkevJF3A9Bv1wpucTnF1F84kYWrRZ4dmGxJLSvgN+Nnu+qnY1EsSXJZtSK/EuGm/Ug9DoWyHtuDe6+4nw4NCkCLZeKgMT3436tF4vlHoTkfwYvojTW2a4UNsoGVBt08NE8GBa1HPItpwGil23+7GTE3cD3YRqhOuDBLaAd4D83YZ2hru5cQNjj54ZRKFuEoVS/yw0PVhsqQTOsyYm6BETq3+Cbd6up3YTfT8z7BlboCA1ZnoDY+FoJ/bkHnsLcAn2LGA2RraUVPdLJVwq6EC3kVrk8L81ngi00EogeNhNIWslZhiz+4NiA618VrzokK+R4lpqZ32bEH2B16WuPZDTzBWFaWJ+aoDvvB66QO9kO0lLKearvfhitQUYH3Za0DgH8HtNFesvNg+tkIrstVxQ4xbIqNxI/a14rzzDlinpePOgOWVUbALIobgXjGXxJKWBEaOLatMcZpKKBLzYqVOAgEyQmDWZDHQrVlYNYdJDKzjO94DqlWQznz5KCtOXsH2vvWtTp8XOtkyV86FTuO06cXEbS3L/bZ21gT+9n7qnQZqzMr5iurcgvZsXhNA4EzxuWtHQY6PDhQ+y7vNVcmsPtT6ejyBUUryqL6+Ga+Pu4oaXVRymKAG1aa/vixV548+W55H+Ae/EYfT8Pltr4nQZr0R/Ugg5VUgo2/yy01+CLhae8FxyX5R82vNJyu8jPz+MW97Ls8nQZD7lhQGaHEKX/xBITCWKy8d/Jl1RN07d8d88cC+pGfh3UvcqFNqxKSGfajm3Xt37GM2EIitoqJWsKhe9ttTkrD9xgWj3VaUEC3qn2Dwmk81tk7bc9y5aLjEnf/CgNp7oPhu+IxEHY3075jAzykm6IA5VF2BgNC+hlMKlpXZgJXi+lOX4WyaivTEYHB4dy4967STIlsHqqi2qDesSiu0p/+G4lQ1Z7FmAKHbToJBcnjx2KCJcSa/xpmdZ1VBguThghcOl8hpDsZcX4IUxH2ShTx5pav7x45tJ2usE3NAuPlFfoprosLuiqXCKz8hSANz8mz8xsrGsN6s12xqN4vNz7kGkGyvj72EsYNlnXRCDSPdFV8Oe7aU+FX7kTPgp7leoh44v0Mr08R/aXCzIFqJ/f/SmgWiPtMWLj7R2c+u0vtvp1W1jIbihrkMxILyQP/L3JwsqKJPtOSnQZqTTUJjmRQgdgxgjz3MzlD+2CzrH1YLtmulvioJcLtVCT4CbIVgG78MZf9x4PwJaO8fHt1Vfs0LSapqb9XjjkNdeRrpni+fkTrmvcNpuKXhz8snrLx/ThT6ZUw8Sv7+f/yYd9wcV9qeVCLFoMjfyVdw8p07ZyXNQo6950FQmxyi3WBUfYhV/ft8Zv0a3kWhiaW8cfNQLM0LfqYU/Y31baP+tu7SvP75EnQ8gA/vETAzP7x8NUN1rZWAgELX1CmTUOa70wqY/5tTGbE0PI7WgrBwmwH/8giiwwbu2JoZ6pNpxjRsyFIFYhNul2M19u0ORC/gPJsSVq80GF0BkGvLy6R2teBxSjXzemULvk4J2sFrFrXt7qKilCfgijmEHbJ7ZKp20hnRWyQDQrSpeaVbyPIfZ1Ucw//PhSdgFT+jvuhf5Y+qdzQPcyr/5difgQsHH580+C2+JSFgriuDd38DiItuNsnSD7C7aBxISTywdtGX0Sg/ZFtSs4AGN/dQ4SoMN7YyO/YyAieexjs7b/u4jMLX+9ND+GHwQ3pszblia5uvbJwZU3uzOgNCRXcreRCdnk+oieg/KO+TtieHDxbj3ldrXyyCUhuJQH+YF2sAFN3FtC7wtiOV1NzNjI4nCE95CXrToVnHF3kYyO/W9U6aXAtbINkQMhcFe3Yr1QC2SzdyCa+iFwPAApv7qGN6a5Ult43nP++YSS426y2Pd/qVqcYtGWqbAl7N1vXSm6Z67rDzQj9DWucfFLn/zxsv+pOqEbXuYaHuh67uock2bngbk7JQQBGxi26X9UL8B4Jd39jXmajEQQ8aIh0Hab4Xd+o5PBl5vI7iE5qlXTn7kyjmFa76niqtBBvBwfvb7OXFrG7/rbPTmAhzBZ9P2ATlIR5gQBEhdgaQY+djjT+5tAerZmd4ALsStBanIdY3DLBIQVW2LDhIFHUgvW8V+bS3AvsKlrT4g82w6IMEwwz9m38uOUu8jHAAGmJGKEDJiDIX36sHL4WAAxP7qGENOqYEO/+6jHcM7UWr6PAXGCBzKElddF1/oJWBIPuxHcZETQG0aSmAT9uAGmVlYOhiVCbSSskhRYbA8QCciKCv0vzlbGIo+GKMvp0HpdU3ua3guaK77UeHsgyC3H6MMavZN6LYN0dgaSUojYzCHxLM29qqA0ShU21LQVWcC3GQMb/JclXjOrnZKAPckE4eothh2NV95GObXAVmK3DwbErwQJJf9XJNLdrA6n/rmxsufvyxbfxUV3hzoSDfarWoKd40PeDLGSFoqX4Hc7jvkjcbJd7ZwwXuPi/F+hSNUXmviNMGy4E4Hnw81oYkftmifhBfyiqi4HsJA+oqMkMK7qvMWjuV7hQfUnbJxBSmrhtajWkJ+Toz/xVs92FW6AWumiWkO13zpl6lJAXxQjw8fYZZj4ZdaQoKJX+PYzdC+IYRVJWWZhVfJsGr3iOPHKn/pqwiQIy5aP2HF+wb2cZalVGPP/2ZPUrnLNTJEVMFwdGKgoj21wQQDiddlUPZOOgQwdhmok99zDMO/DkoRAiBmnX77MLBvuCmUVotCAeC8azOUddcChdXOIJJ5E37Znt2my3eunUPXghaXQNzXFwZ6fcxkMULDquo/x3Lyefdr5LUdn7kW4I5IXSVywIN7IuB2P8RvTw068m1YmWhY5gmac1PxB3pdihPv29bXMOzUBz5gUw55OKrm48YRWZ4tFlf+3BiSApNc03jxhaZ9Q/jz4B8AAyPY6KoQggRjFiop9dZZJ1gO//8znblLuxPAckcPqiOTomvnD6naw26lC/P+C/+IO7efPn22IvvyVJRAWoIU/wfhEVOeoCVOkbLRNgLHFr0zTtYeDJdN7WCuEC3IyltOVbbDCtjXxqJlxGpBgL25QKS5M/7qMSGj1+MSakzRx2NwMeVjlVvwCiWZpJEVJ6Dk0n0qBh+6W+TUUF6INR51DLipfK9t3aic6HDEobuf7WZ+/3y8sptZdAk0/vQE+RQR2A0Mr0U5CsD/HR/l/ekXO3SipydBvL/yk8nKqmMM8BnfREZD/q5jTN0Zv9gaBRGb5RdFBkO7Qec8QEb4mwLjpua0I86WNRVXU7pSG4QbSn4Jr0ZVSKp6n38bbPcgym0UAMSAiRtYqHuyNyzeKYSmt8L4KbjZF3Hfgw23a4fVcYf9n33M0amwP7HTD4FnJ2Z3NrWtet7Z5+d2kH0Ta9r+Bc2QIdnrYzYAmJdedlMyQB0AAn2Gse2mUwd23++9EtQGC/RYcXcCg/sNEE9iq5oiQz8Z5eybr1tVqasfjk7Yy3bAmPlNtcXFejUz4obp1LeXYOBsKCkNvfTo5u9IpJ1ff50FsBerkMHFbtYPb8i5atSRePJBk2/EuBg7qJZ+H0qlcT7ULdWGuIcYSIoZWfM5svM0BYBBOkl1a9bLR/lpvGEd2LDO7vDnGMv2rsTRiFVlG5XJBQx/Dk4luF7lbq8tGsywGvXAl5Sr1jEo+Fw01xF2l5hqnQ8aH858wz9KI22MoGD42ZIvAdMZG8CGpAFr/dQ3YTk+nIsRTm+LPGSS5impyp3exn2W8WtboBtjPoK1E3rV5y64Bwc4SJzfsDuKkcVUrGrKpnc//7YsBO6iv0isvOBdWanQ8cmH46tozejOTpsEWDzxoJ5s4f0udfoIJDQkbVGE9fMYAnAc7kJNmmB135F3zfgVH0GX3vqa3UYavUX9JyXr818gDIjljvZRCMFOkFQ3NbDUGsz0XlMdWimUnmy3pFNrYZvzYg1mwIzvhubLa7mqLydxcH4w7N9NtubU3MO4hfToK4AtxKLdXt4CzsrfQEPoDmBcj9HHIeTj8E+kyDOEoAA2OZI5XELJZCHYJxj6VGD3Xl2O2fX88a5SXsOSI6l08/FTHXcmfo3Qu6kmzV2UgGcPj+QAXEg7l01Fsk0c/AFZ3CQ+cyMJpRLc4WVJsSmgzSiCcVfr20RDU7OhrH+LAvdXQefcYPfjTGe3+3NVI70nq4sIewmv7v2bba/rQN00k+0ty6/s7BYZ/ENvDpxQhDPQmByVz1GlKIUqGmD33dXmxr5lNMzDnlppKbgiZNqqkikcU9DylLNFYvmx8oS2uZhbp+JRPiVxMIa/Brwa54q7S0MQU2LXyfoXry+rzN5y4G/93FghMKpvf+Jz0eENi/MMrutCCFInU++Jf7t1LN4v/5JC55ZZ3+pbjuJpziOMtNdP0Lk1wgVYbeNP1Ra8E7HP6BfP+0lZytunAsqP18doq55Ap8i8Vm/KSBGf40CGalnvUdoSO7HmbM2Rkq7yhybEPsgUSanuDYriHqjUjmchQJOlQHHm/eH6omGxPov4YfOKgu9flfHDXGDNWow23QNsUqqf7lKsOaCPqtF3Dux8r+Q9AIIAMZRQVgabz8QVMUjzDGaSHAwL4uQyplzrhvlT8BzVMRtTgt4tF048iBX/vCwpYUkx/gsebtuZQfB77kqD90+jcm9mEfMe62cVSgAYUPLUEXXQNLZ1BnOkFmF/j9m1QL/Sam2eSoI3JSqSfzqGM+ONzl4AG0eNDdR9eH9KntWfNP1yj3bvjH0mB4IXae9pnN3wOd8wdDIMP2w6j/dPtHrSC2+TCAsTHO9KctcbphPanOdOtrEwxbxkVzSTCj2DB5QukV+L1JhJeso5syFsQTcdAGnjQNc5T2/mQzyoJZMTNlki15Cl9Y/2cZRRCHeTrDswKQB0Ee0z1VRa9RRvz39dvRso3/C2aNTsdOtG/PQ3SGaZ+E8VaLcB4Y8tqF07vg7ykTWsCvPaZUu1j7LNl4wROUEzkp7Ygwoai8zqkHZzL/+od5xMxrQgak/uyKaHGLq5tJ0A0Kt0La2S95b/cGwlCm+l4eHenfAf2Fz7I/WP8YjhnQ54xcgbvl2wQmI+UEEwCN1RwYyVxtrUoS3lXZR5Pd6z5k++wXpjXfaW1K1bLLiUYLBHrM5rHQes1rk4JvJAVzUxBElCg5mBulPL/55SURaIQev/WTaBZZVTEifV1GnW84mhSYO6W9Y2mGEL4yEiwqSCjr2axHtjalCyqm6NrnyCAuQZ4gk7FCtDA/LvhpQXVcJ/BUXd18HEj4UjNaBmzJ0Mzrd6ZVxDEIzQi23IMOP9/2QbeXX1r6+bzSXVrGecu4x1LUDZohbKx14iCGvm8Wy290vKyFySbXt0VQP/cibYdUkYjBsXtdpjTtu/p0jXbZxxmjY+HIiXyHpkZ24QL3bqL3EC5sbG5N6RgEZAsu+YJa8FdbmwRnqFU1lltjFOkql16iYo1V2BXM2v/O/9v5MI3+6jreChCUCZTu20EyA3KoweKPIpUo9ohnSVS6sdUfazgkhPjyy6ev5Dc/EydRsoTWnBHaGKhA6NK831wDuQ1joOJl00n13hJsEz4gJohJqVvEKMGUdMUsm4gBHv2bxt34MSBvY06QSLxMQFeOSBwQA0ab8NwY/99oSWM2tu0gNBMouZ6BhbeZ7d9TrZ3/6G2bhOGJ+pQ6Er8sl/GOu1DyRX52S9t49HiMMC5Dz2Cx0xIFUlX3Tm/xIJxdJrkAFZ+ZqE67OV6h/aWUoixqQprn4a9RHM/GlxxYzZCDVGP9Xvboav5FgxEshLOwOIiB0mTfmQLn58qSTbQ7l+Yje/qt2JhpqW2C03p5lbVVE/p51cVTIElKKNevRl+tEuxY52zJ9+hxtpndwFboVolhjnuYvk/xab9MwIgGNPTDdVD7+FsWd8elyCbsNhG7EZgU1qxrzPHGd0Y9JPLlAwBNKlUnx/Uaf7xVIQLY3ofnXe3FuP0R//61noH/nSDdffi18txac3/KvleaA3BybRoPT20IjyUSv2jEQ5b3SACnqHBwpWtkJ0hALwvvpDgKrhfC9D8dWWlMwCgd3VR2jxeeygEAqH+0gxj9SFoQm8RAk60yCGGwAkEY4z7q6Wwr4C9T1j+QvMTZOd0/0AHAr0DZ3G20eUoLenXqLBZiW73JalG/KwV148XGyN+ZekafI30fzvRP2/Uix4sytIsch3ChRg161xIHQWG+bGcu9vuqMQfIIXngorOl+tHS90wOiX9JRs8Hh2qsy1O7i8Bm0J72ry29zzaa+uXkiQkBQ/9tvhR2JvUh8iS7D80CyPSfzuZ+Z+7HZVPfVUKeXleQv6t3QdFW1nF5LE+yjLgmBBU6dNn9zSIJoWecrbg6k7NPZruQuDh8tz8YsS8haua7X0mtMHCtdpa0xng7KEFJqLRLv4thv4WkfwSrHVBIV5TV5X9o2OxU7VyUxv7MFc119pfM39GZJB8AEc4sn4S17OfYZxuSJDkQ5BU3EMObIVcYAS8WggEqksAghFnYV4/8ypSCECqS0GRWbtxWvTspzpt2VvPRhG76EIckPCnOzVtNJQQ+fOlHbpe1ZYNxLK1/jd1509g4oo2RZ8uNbrNbJKogFfwZHwt6spJhVfyoo0VBgAaPc6nqXXFkrY+j/TvG+ZQ/8UHgZoBoahzlkekZo8IINiE2aahxRjiujr+dy6ni7qqfezraH2E/gh5ldzETntbuETnCxja6N/tDD4Nzt4G5/aohxkGhqVy3XX1TFSUml4hXKF6O6NuJ1JZTAwZeJ7lMu9S0g/Dnm9QrO8ZY504HbcmjL3qyTvkxqx/8BZHEQezubGNrU3J+URCfjce7/t/ruvWUrgmvlv/+e4MlftXlgQurjKWJuGHAi+289/wdq8zvgC7MPnxjC/pTZroB64LYp8LXoIHzCKRhe6k8qvtkX+Xmwx/bWYSo7biwpJCVQz+Ph3Q+l6WUxqNhoNqHN1A3hvPMtg2yJ5B/BiNpST4/551hd/XUvhJzQ9hByHPcMDADEKYArddcgnjn/i9VkENvnqeTHGvS7YoXaqGlxAKW2JO1wCi2HwnOv0COadbJqUNmQsxa0Iotqf/JquUIn0kUSWnx0q1kFbO9Lmmzdn5PFfB5gHyCItzmp6+Ar7RqH+h4b4Xvg1QEipv2nABjCk9jBhlS3WfdpcbJQHDiP7lSEikXlKJ92eRGd+Mkq3yZuFTQnQTATlS7F9Gf9p2tDIMhw27cjkeTWK7RODIGsoiWQylMlvEdnxNaE9dP00nnYSAjxnpDBX26zQ8E/JwDhAH8A8mdxjFIkgYiXnCuRyfHggHQyZ8xDSSZcgSVoTl//0xK5HG2jUR06jjTHk0sHqWys8kPbHh6SEqnwhMZbLvpqpRr6GJrqYxG5sz5wnk9DjX9kAWF9oVOpSJfB06Si5bbBP0hNxkGaj+Ekku2eWcrOmO9oU5TYmDujK0rT36RmTcai2uBUJmlZU+BN29Nf8WCzSTq7Hu3bJJceeY/jaqlCxNt2sYECgKEyyy819dg/11tEmdJjnMUuPh57lGPEQjvujADj/HRMWYoVJGhd+C05IK/52m2Ia/S3kgYiVS+lvbOYHdX/yDwljBEE5vw1Ba/8MPTcH8Kj6i3pwVshDFp4gndaTJhkH8iEf0c4uj4rkmzuDJ4qpVFB2sVwbXhMcergmPqhcYWRWz2daVoDj52EvZKpzu8RPSlYbDoPnoK/oHmdETK3NOGbhk5elES0rU+xrQV1YcDwmlLz3qhD0UCiw6P0GUAtUWU7VvMd4viMfR17XW0O0ZlM5MS4erSCM82fOAGI2Nuee9RQG7oeAjCu1jB+soJ9/nLscfc87WWfxZ/6oNvZuZ2Bi6aaux6TvYhGmwmJNM3vCl4btlfbrWrqu2eXanPiHZe0ywWb4SqoTFleAuieKD7iMAv0O+vE6tSqG/JWW5QEP/nsPlS17QWcFXwtGP/nBZpg8CgvWJP7A6CDNrUBU/gGfFbk7aIJSyDtHhcmVl/VPwAZ9ihSEDRZcWzgrjNnKU3n6UmXlQK2NtbsCZIoXFupHhPDrHrNw6c2LcmqdZU2MknuZa+chAIRtAABAI5wn3XhRsa72a96JuDnuiwo1afg3qL/OfYzNywD+CsH++1Ab5eVpWME3AXFFW7fGy+EfRxIz1fhdzXlxTKvWHuqItN6KI9tGn17RzYt2Rxnfyxr+9e1v3+I5dqr+v1RejXi9+A3+Ox2UU+vJNjIXyLp8+dLdT61ZLarzvrL6t0tOeUbXA0P5cQBtYY0Ltv5uNwTIGC8ivBQcHfyYt/NU/Emwx31eDKwjcONxEE423OMFF5+mHUImLrkfi2LaHR4yX0ZyoiHaKfejy3ekpDI7N4Nzlhb6wAJrcmIqs7zDghu2B0n6e5BIXYOcekpCionjgM/owbo+buoqlANhafVx9SGFFpx5NxCOpDr0hMgwiFXDLXbGKf29XrcfVeyvTsWFSygOHsB10tSO/VlpKzQg0enMlC5YBxJZRFh95j2ZErZbzjXL90axTQr0ii8Wr4P3KhqUsvXAOwcyOljB3HU0uN7v6EsXqwfz5IeB547yY994MA8Ur1pN+CX+kSwGI7twwpFced7RYXOz66WlFxdGoxi8RME5vP6idblXdxPpFS6fXxr6WhEHMTtAmtRFPZ4yem1jEgPtIayYYW5pXVE4of6bWooHXZXFW+gqfgzWewnz/SfTcjJ8R9PjbCZLmXVXFKETWaPMknS2uTCTQLVyJ+b3qGmxT8vYBt/7lkvHg1K61WniKZxzw5UE6+GKkOm/gKrgiPyZz9nytSYoeJQopQlZERhHX6Vu0WceU+DmLMjgGaj5xQ25glx5lHsUXDOuHvDLDPWRM0mwSUZ5HD8NQl0O2AuKMxBAhmSld+akapvwwHzh7ALraaffq+y1aHQQvqQrGmXXnkLVabIMazppnwq/D4JAC2/xIjqw0GyewNI+Y1B+Qjdm+miAwMsUbkAkSLkZyjpYOpIWKYA+PIn1q4DYuYYK1jJmk5D9OiRNko2wkPYXmVURls4QtbF1uytwzKGGD0sn4cixqr39ksYsT97DX0RcdrqEj9i1MVBwL70msKxcHBVKxgeEoiXKv5hHn8LPmzE8AB0IjfwEbUvuHTGdB+bIh9cfQRnzv90DZf+pq6f7ZgzUej69cF+DkuVCPP57V1bmiWkONMKQyKoKyIClvGPNETjBCI8dQOS8EFWfCPW8lMGVBDI9/ToP1WKdaSzZZjLXLUNEpHqgaVDEexWfxWrXKrxVC6fi7ro05uD6r0SH+TSjRM8JBnDsllV0DMUw+h9mCF9QrFqLFPJto08iPhyQ2wG2REGAWJKir1Fnix9o7hytIlZPzIuZkfPGGLtS0DeXJMeIZQV4adcwuS5KCDmaXyNxZy1jVfi6qJAQ0KGbEhS21/4iUoR70HYc/XUpnH6X4yvORGnM/JKdntoGTR7pse7/F0t/YPbazgBk7g6dV3N+xs5UKbcyesOTedNaNP8yShuoDInvsaNrlXW/flybDfdzNUD2Q6atW+KBA0F90qoHOZk4tI41Rq4j9LU/S0jcEFYu9gX4uyvzGBTkBx5Vm6d4KP4GDVPyKIAHmmQrxHYwG01xsPzuqp1RCMGr49SkKO4slUNg0woiCTQAJHRFo50KBnNe3bwzXWjOIuyT8JicMZojbEMtyPm4zR99ymRKEFpUG+5UvlqRxZokUZDR6MMzN1j2ErSZqvl5WZ1oIk8InxH3N2g2Pg+vhgo7fzPeuTWr7l3Ab6btDMTRS6iJdDSalQ2rKYT9g4EBlmREeGvg0v5hHT9rO5DoqcIG175EPeTASdoZyfJ2fC+gr+Yln3QcOXy6VNoPWrPwIq57EnSj1198cBDAmBRbWovCu+93axVQ4Vgmo2eDaw03xEr+thzXuNPg0Z5UTmATRLL7qZnmPFdSCy0lC+ovUXSL4lfggaFC+/QZWrmf0+U5t/qb3cFco2PlJX4urn82gmRlkZ+4O5nEOQ4iv/KfxwSzmmVcWkXHvuiXp6deONVMpjC3hl9qGSJnHRYJ2FoD6IPsjfi9pDQ7gea3kFHhKYCKZQI+KQ1Ij5kmoXJZOgNmltnHFPzszSQkmb8uPGjAHyDKNGyd1MMtB9bG37YKpXxKvhVYm6YSZga8TemcG1TVTmzBZyA5rjL6dVviJ8gPlsY5lazKaP1nEtGpzZK/y0dRj/pnZwJl+xycl7ULOzqhK8o91zv9mct20P8A8rPfA+fl597MJtSS0cUxn6Jqu19oYwCo6XPZp6xAtymbRbZWfH7r+ir+QRQFi8ker5k+dVaX+yrKYuwyeYBbJ1n/l5CgeZiDZTxJhourdLkhSqQnhCjs1Q8MZeH8xhlgFz7DgEBFaX/DNEE2A7nzTRQgOHVD1j22tnJ5bLHDuPaHBIX5jlFehYA7c//SQ/OiONuWDniCU/j2Fxo90EOB9y6cW4Vu8Bn35/nvKy8HSQvP6UgoCDcJmSw7uwesa5ErC3Os4oQbEPCrFBU2ETsl84OcHALAWr/XMuhJ8COBJAWoHjTtZYDV9HbXyXsVBslFNPtkzFVOh2tF8cbORbSAFbGwNStBVoOJPLChhwhcridJNAfqeV/R1yV7u51cjcBwefN8Qx4GGrtoEVPPrS8+wYJRAC7Aj+VmTLE0bONETOSQ14nROhfm8UYC1zfw/aCiAu9SByKdKRnFjWG/7a0bw+PFn8DXomvFxCnQ4LG2m2+qUaNEmrs/tgIubLh7GnbdkeiTHGD1LpIG5As728OmTiDvQ49VSzUrMmKnOGG6bKLPXatHN1RjUZwnssjSSa9ZCwJzqohEBOmNWZU6IX36XJlYZpQDiSosGof/YgZw0OX50LryIk3ZYz6/P+eG3p5flfzTLormIV9eKmH82lyqjDTP6x9ddaBSJ/EBYU6MtKFKVJCt2TzR/9TtWDQLLniZuP6hwbfBAyn4E6hNcbWV1YhhNwpB+mdQYS9q9cLSp5AGVDd3PtBnLj8yinrKKxv+Pgq4DHAcV/8F7HteB1vfl0WqFuUQL4SvtRaH4XBkdhXhTQyjYsZSweuEEUnC8/yYQ1tFEPvnO8Eo1/1V9jD28O2xHs5/4eXEBLCyALcEYtMCL3X8tQiXcd9Zvp6MLb9htzmSWa/n717wqA7X98H9RmaDnijBq6cikFmU76AvsnYd1KxUK4IqBoObuj8xy6FEaUmQW6Gw/M5d+WCyybZq845/vGFV8Z5N+EZwbs2vgSiL8NFCTH8QnktZcscDgBfer9JOA902roRg3NJbVlq9yy/PlaZs5651avhGytysDWWXGtsKNoteqji8sKEX0Jeh1S8g+UfYt4aecV0yverkzT4/7B86d52iK92qKhF/vvWwwrbQ4KUrBM+XdtMX0Wb6iVzOGdMGgRrA0iLihnGFI+nvflMaHMazICEDZMggjxNalGwoYGigTJXymWNZ24TxQPai12Wa3+AeNSkT37U3q8VIv/cBNZDVN1jhBQQ3gnjdPe9zyVuyTvSq+Y7VNcndCwOkBBS4VA/dsLA2vKUmEn7OFYfFmFG5W55jc+Q2jRK61FOLAuXU8QE0mPWWY5qBHbttGj38dlWlyL64MYcJSU1kPjNRKlhQXxJivGMznaB2C8yay7Jpsxc6IP6EzZQlehBq/ama5Rwt/LitPi2ykK3Tv++T1eCHGOcx+ydetCsj5THNDEOZR6GBJb0PiGmQkVWat60Co1ptr0Bzw+3eHOXscNV3fdJ92g6/ff1gWL6MiWRlXnKWDERvbnW6VtiipQvMFj/4yGk8QnR6PqEvsdLv3R48PLPNndfuyPQCgABC/3UJYAH42PxPLapiqasvQFR0x/BO9x6ZRdajPjo8wal4P6QsWr3l0XVwKccS/G5cJcz56CwjkvuM+Yz9WtvBLdVILcLEw2ZUpKWEfhFf1dYgM6mJA99tUK0ADjFkfHHwZN9Hm5D2uf0NHzDJHDs8tuwRGMBvDnoLdjblsBou0BPprz/0gKcbHcv6E9u6XLcxi2svoTN7UF5Vd37nmhbeQ1+5EDwif5B70fD5JmoZjJfrD/DyaIb8vhooqV4mCcuHk1M28IQlQkFw/UYcqrYPmizl1w3NLsGqRMjzx4kd8PIEwoklUDb3ZAkKR3YnsLGxkXWxYIyOPgdrYMP2yVlDU2OCjSGeyV5hG3tA3cK56q4/SapbYVkheZarCN73ipI4Ogl2jD2pizN2pFxSqZp7s8FFcM/vOXFaoSl1Omv99OMoNAGS6gKiSsiuGIAdLSyeA4JHDk0/9PWrm+MUThB3dD2ozjnzmNgYt673gtjruUdvElwX8o9Giwo1lMDG+FwYXBED+mUlgF2PbUYqHrS4TcKagQ/6ILABUgKY3Ka4ZyE69EWGRGHt3du/710SET/jq0pC/0Kkoj4gQyOdsCBp7J74pNhAtuBcMu3Z/UDkoPlB8Am471ryTFX94E5EkHxMax5anhGs4eT/i4+TvntL4/jTitWUHnRSd5SPZXbpWTCH+E45iyJL2R6QawklT/p0oDZctUojjdRJ9i77UKx6CwfB98qSln78XmmIv176MDtkGxDxU5OTVMs9eUwsJZVtf4orIGkwcUG6ZjStX+uSBZA6wV03YbeQeAwvs4PfnoPuNwgFoq8Vl1Zek1VP+dT/p7yqGXhdaXzRggn1mVaJ9DQQqIhvT0oGe8EI419Du/j7rGNLcEX2lW5PMxk9YrIkc7ak6YIx3CMdhttluudBfMYs+IrdJ8sziZ1hWgjrwqaPuA4FtqHjsHy8UqDXAQ3Zbt/VRwAR4LhzXoNwNQ62AJQCk24+gaYUQm8mLFJ48C3d15QtRmMHo2PjrCUe9hQhN/3UMe6/zoVha0zm1Y9BrGzbFw1hmRY/EBt8kG7oFNqIaZmVXhvoDGROPVltxJ77g55yCcfGBNgZpERpi/jv8MKyoP70tetSaz1T0LKZESuUYR04cGWc7WJzin1sicDdz8OAER4hI5XeZ7Sf+spuCB8lA9pucUPAF+iHInV/WUrhSBF6mZfuVBKSywVyvc6jk4NJI/JJzMCmpaPDNexJHbUf7aEiO9mLC5az2n+/Yg+ce0aTDKnXgYJMUGv7K4Y7l3genN9QPuT5b2qvBJvI386soe/nXvS6w306BVChdylpDdPRd2FnTbQnM26DMNcmsatfKmPBl1VyisjqZNSLq5N2TJ25a3lUOMo/TYIrVFoCdyJhgZGeDaBW2Hvtd6D3M4xaw4Hx8L8DdNFD5zAncnS8s033aGeCs9vA63XVbp70zotC0/sVIEt1RJM8AR2WBrD22B6nhyMqIwg6G4ysmBfus+L7YB3O2EAAOVnV8vR6y1Dv8GRtoaPRAH8n86YAo9KS2VhDl4G8m6VNZeAcS7Cvd19uosHrXxLuMR7+8csuuoAFY2rUp64jgD5IM0zeZ/dR1t0Q7wSxlFIL3bqNjA0qjP++YE9XL3F0o6kEBwsJLzyGetjVNHzAoeDNTkxM4AoY8IqlDqTpxNjGSkhBgexnA1mPMsOkOXEZxeigGMI35LT+C9IHV4sFKgIL6kFg3Xazxy8mW1bJQ7VtavMOKawMe+MyaThHvqxX20IWteqBCBFdfYxYvpJfBTVZSot1YuId9DJ2xgMxhWvNqE24DhpADPIr4GfyniXLMuls01/6WkyYCFIC4l+NrfZThDNvo9s7hEc3bNw4HcM/jSKM0XxnQ/T9Dv/7Ipx8a4YKz9gtrlqkhrg7Ojrxp8KoJrMLWOzYYO0+JlXCtjDWjdzd2x75XIEbb9lWRYIXWqbd7SVefrDkrdmIrkdXr8TlIKn5dHD+uIf/BmfZBC/xw1Gs7gY1uMK67rUX3FP49P1K59HUoIBSGolUrVgZuTl+rGYe1znbm/NntDDk1X2JKdp/Xs2kJAvW4ArQsz0dekxr4Q0x26vlNQarBvMFqydEl2BiT6Vrp3TvewZzlXLXkgrcGBF9orc/iTjIUyksO2nJ867CVmOrvTtCnPr6DApBuSnfmfo0I2jM1t3qYm9Y9b1bMwVOqjxAO6sEEp0qnDZplQoQTB/Xd+DCFKhEpZ0JZh9k9qk4AVuBrU3OvmiDi4eQ3sXzKF8ABzGi+31nKg8zzj83xC9nK1EQrOWxI+nOJzcNiHmm3Evrcd5XR+bsTU37yGv3+bGWK2PdQNFyvk7ec45Xzy3jJW1UZwO4whxX8X4IJ3f+GhwQbdFbC3T6LSPpUcG4fnP5IE1syIWERlrhQMS6hA0ly6C2RBLETbOZ0Q+nJVmPbSyNZCLOjRlHbds/cg65nZhJu1dX1lSrnHF3mSBqFF/Q1MHjB2Le/pWvxBX0cE/5iSHPvy0xeeJOIogp2wpEzCpD9ZVmF1Yam6tM/Ddm0ERW/zaWZNDZdIGiRdgMa2c7H9HgmU88Z8PDPmjkGavzLtVc3vVyAQ2zspN+GYV/BQ5IsMPmFim8W0dryoj3F/YwIhRpzAOTweKLuqqKc/Qg+7k3jJkszhPlFXf1aS9j52JmoxyEgsmET6mXdek/gr+QQXR5NuWk7GpfMId/EOYD2N71XkjvSXuoDdYoFnbx9jup0+/lXOQ/kBNrJQr3/AN6z4mxSBAkaYKYDSAf//0J6GHF6i33IsV5HpChJQ/YsvXkYL179cxY/1XTG3z5mUO+2t/FiIbaf5nDFRtgwYr89EaC8rmVVjW2SL8n2Q+KSGEa/ayAUlnN6MRKAqNHEqaxsf2YdkEbwzSecJ+6xn/8kudhxF3yW5n2w6jrh9pl3p4lQwI6ANbcypEdQFNZk4rn4/xGm5RhLFiqr9xqQ0lYbhnmM0MMGj1bgfEUsEy6IFmeOEHRRnvdIsj/2Nhuv//l50GSqFjhwyWUVNwe0KrdoCwrbysjhtSoToouH0xhpf9kGvtujfbNFu83hrX6dFV2B0EsixgbuCHeep8tuH3wJTntp4bLX2ynxImpAVQag7A4v5oGUTGEPOCrvTZopPfySHfX5Akl7RVICiqUqen0TTxa6kSQtd8MijRebZaphL9Xf/dduYEoSgoAprMjVYq6iI1lIpFwguXo/zJxrkN2gNlnXyWXqIcCdVxJZggqbz0YS39QnIkKANlwdeaPhzjtqdTHOfdj5VPris2f/ApyJU/mPSlle36tvovEQdmBARibH2QckZX/CzjcAuRSY9Yv2frD6KiWrernIsPjfvA1qO46Ve7/gpWEyUqXc3l3aPxas2Wspn6s60jw196IF+MWV++C03d1adOCtOdj7f2Wl6vUy5u7+xrdlEhdLlVgroY+9ZDWZugtZcgF2Y9GhqFE1F1iJY0SwmBVRZI5y9Ka9k76VyjPr/kRufDcgkW60qpEm9ZNcVYbj6aUm4qN72BH7+loee3qwTMo8eOy3woO0JP8L2eBKB4Ur5j5hzQxjRtODOCxvYx1w7QVLo3L5mtFftWsvQqjXghh9xb3nnsPhX1BkXE6bnh1BI8FZ9iMxlB6kR4PNOy0TS5mUUjqZcRO9YjpqQGqCsvh/INpcCBWtHFLyfh3/Xf/9qW+h1ey6nJmRH0ZQQvKx/VY1LgQ8RE/AhnJBv92mlcns6CYvlf4Scf8iLP9NYMh0rIs24uJoyffvILNIYpdtl+YplIaa/jtK/8YRs3fFM9muZoqcKeOEeqTGO6HQntn7cE/ZmsDv4I/00nEgfCxvA192uZS5w2MtRbP2ne+q31Ahyrc/424T1vL0cxl498C//YepiagmHpAu7FtDL23g6e1Ll3VOqRWlIhbmMH0jLCrc+tOTukGbTzEutq3v7VxjBEgscqCaGezXLEvcZIPha5wwI/ZheWChGngT7bD3Q9W2LCibhPFAfygVn1zxrEtS2k2/LDRhpU2KLIKExiApsxtwhwMTKS9EpCmfmZuu/83j9C5xHiaoWaUu6wChwSpfItoSYFG/ydmCngdE0VlVOMKzb3uJABfBsL9lbUgvq+AMA4lQz+r9ZYcm1mxW02zlnwafvCCrEfgGV2emlU1aOVsMyeAKkGodXf1HKWHAuPmq500YFnV0mJxJp3y6wCpeJI+nPtq9GgmQfc1JHA+s+dn4AoBovDLdkDa6c+AXqH20ML1nVV0J2rleJ6Aq0KTq4sNLJhGc3PAFNQqGYBSN+RgGu+1+AxxiOdnyAdZ3ZUGNqjW+WKZii1K8UveUW+j5pOGBE+4t+x2X8UYC8oZIyt9bfLfUlA2EO2zrIsaLXXoEaiCwuJy2M3Poa8iCCEESRH8Ma6D5AMaId5/qnC6ZdLYOWx8Y5UaBQaj7OCaEN44VyNIwGN8o908OYfh1NR6tIXXoJQTOXu6872KaUd3pXJ2z+U7m0alpMB2Sv5NrN+qmMO3SxVGVVcVrkvcP/dQ/tKOjzPf1GEycI2UhNys7xEIyDOkH2dKkevC4rY/c2nsOSZSp8oiLSo0h8oO8QYEZP508+rfkPQrkrghAzxOsbexgpeCrDH15LLCPjDNHqzbkrxRrDmV7RttDkUFJ6GpbSW5WLmQAHUdRG5HvH2yU8UTyGBc5fE8b7DVouNClS0Kb6HvU10YqgPEnjSFa8xO8DyIW+Nd/roPl0HEuwKcX/gkaSzRN35qVE2OcuHBgJL89z9NI5wdhjttCPGtGGsp5hdDSS2s80EJGT8nJtn4du/U5zEiqQe1UZXyLN43Lee6UP8ki9I4Ot5bF0XS+crnh64lk8IiOKV9rwoAdINwMRST5arFEQAtKHOICpZaHXZ/hG7UtN74nPxCsNd1nuM6SijO1jKaxiMfhynunVue34e4AFhABff3UWteK2wkU2RLKjJOnX4r9FuJm63URVuleWYqEXotcG2w6F9QKGHmioRpfngZYJZ7/GhoK+UHiOHhYWPwN2zYno1pDDpSpsXrAEiFxPzLFo1rJLXaUGqrClQtqV0yJI929Y1ZD272ihP8p3FPh6A1VPqNVm+qofLLUvzqL3PTXn4GIz3ecKDzLfsuuQmLRB0CWKUc/gm+Xf///pP1UV3q6+li1Xbfgwl+K7u2vsmZsI11h607jElnf3afD2mH79tgLG2t8qbueE7zV/QLYRQu39LnvZHacu8F+U2/a9YM5sJnsamUmJvJZFbmtzehSKyYQukrh62yOoKmu+xeONqzmZUJEzKJ3jh+oZoYzqp9lxlpyrjEA4yBPrB4kxm+pluwzpCsbdmJhAXtPIF/aR97MH8Lb8GvfiVt3uz9qhpsLNVYkXHYn/kllb5FzK7sB8TyUCoWtv/FCEoyssOxF5fynNXzWvNT2I1PSEsxivPZhKFO4oI3/Tj2yOQtkoBRabgiDFT7cZ9YHX0z79vPek0vvBC8h5cUbW2Ie4Q110Jz1AKUIZejEwW2QnZBVXP5SlAYDObApzhOo1JegVpgBbHY5B2Z+jt0OBYuXk4f66rNelzQASHLoQXiKz5cm9jiJeAd+Z52tF9Wv106zywQaaqB9D8HQHpkotXcAIZdg/NSHUyfHeyWzUGiNjZiYTPAymJAMYyBIJM2vsHdVGXAaVaDkk0z6FxhtuRyOww5jnR+mdQJZrTxDDnHikCbzlXk9SC++PMORaieSZHUBlNXUXhEU7FruXE4d+7Nq5ytCpZcjPSv/i4717h+054LqJtjLGDSem8Nb9CMTEiTGTwaNcVt6wK8/qRnLY/RjWFkFQ98BcwFuhdNZseuMcuz+v9bcjghoH/ngd4FHWk4V1+CHkHWeyPxsIi1WtSqmROW8F6gUrz780U+pqEXtOsJSRj5tby3ojWTTkhPlXESEJSII9hlCKt9FStri9myQoBTBCTwGGhO3MraeBcHWt9ZSxGfbm6gqruutnybYvI0KM/7ByuhG3pIZId/JFiFGBtZB11KMbkI/YwIvL0ctfmupHAdc+UD+c89nxrX/QInS5geomziGCxxKNwLYNVTzxX62msHCMpNHI4kTEP+l6v5gxnIFMzyiBecB/akEfgV778q4dOMLwSfJgat2E/H8zpTjNmqAVwdq+jlAnobN/T6hWlPce6jRanT3hQNNFagDDLFdI/ffLRfQ5+nyCMaHK4+FgySC+Sg7eRyRX3SEnAnz2EOqXD+Z1a4qJTu9PSL+5CUj+fYvrLyNrBI+2raW1nNo6qvSQIenrkU9+WIwWE7Ctu85HrfcVZOfe21u3BnB3VAT9mfySIhG9IoOatRt2vjG2befRKEpJEZl+DEGvd3L1ZqYOVfwPjns0FExaUkisoIlSRTJwuBvnaqN25lxIQw0TEJxQWDgkYSksIOvD85nSxWaIQPCQ/+Jf768puUuV9qOd+fRTtD+NaCKgc2pYUJYJOwZFpiTbBS2Z0emcGdQsIrqdwgDMaUR0kCHPct/jyPf9TgWyPEURRwDcv0RlaRNrtLH2ZqKbE7cI5NUAyUJ/70bsJJnHh2lz1QP16xtuyyBsm2lOliY0XWkTvCCOqKyCl4T07v/+bTTu+3tDYS6+IqHYebV7j4oiAv0rbAzOrnE4iJQzNMNKEjbc7F8k2B6GMwos7YyZ/dczzYapEXTa4Pq4QQM/wXpHZ98/srg4JDfvWD9Aq4x1daXVOQX7Ti/DHwDqk7vC1R7Nkz8xNFZgpmvs1zASNopnwrVPIr7jhrVx1r4Z1f+g5NP6G4Xluj0N46NK6950lMSrTHSiLNIDEJCVVWjzeahfVQUiUtDR53Mk9ZmyeSkDx0lVhtzGrIlVDAIWKcR4VJA+OR3Tr16+YeRg4UXWVzxDDL7J890HKxO/oUpbfKiHxz/uijuh1v+1FPMuuN9Czvol3RLSI5WJlG4avGUYys6a8ADH1XM9FG9hAlTbSurD7LSKnoIHKnOhbWTwO12j2oPeKS4gGPkF26Qi00NqoUrZgHat137oqP6WeJdkqWAHGfp83Ru8lY1ZMc+8FoT/QeiMtJB9BRB8MlGIRckX8m7vESePAIC79rtBvHYbNwPQ2qDTmj08vyxaeAZWXEAnKhwzmiVZ3ONxEfMI9SEXUnIm0dn0jXzdYTD3wqYE93Juzqqpijah34PqzFQhNYP+EobLFakHP5XaOfHdm9Mds+EofDBnKnM1HGTuaPImv4j35gLyAshN971x7ABygft/FqT68T6K55EzdzakIJ9VyHAWeEFi9LEWiM62fY4HJ5m3EKtf6OTntw4fcs/XlJj+4FP/F5y7e70N0k6VGffUABcaFWm4Lxz7HOCPvgAqkeweice1R3o0t49Vh2MHVuWn+PxQnqBVq85anaKukGN1Pt+lIvD03JRJMRYOLrC/7IBkYcaF0vDNbUIoAAAAA==";
const MASCOT_CHEER = "data:image/webp;base64,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";
const MASCOT_SIZE = { w: 281, h: 420 };
const TOOL_IMAGES = {
  "piece": "data:image/webp;base64,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",
  "disc": "data:image/webp;base64,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"
};
const TOOL_THEME = { "key": ["#A45E3C", "#7A3F22", "#4E2410", "#FFF3DC"], "enter": ["#E0408F", "#BE1F78", "#8C0F55", "#FFFFFF"], "soft": ["#FFE29A", "#F7C25A", "#C48E1F", "#5B3410"], "panel": ["#FFF1D6", "#F3D9A8"], "slot": "#7A3F22" };
const TOOL_ID = "tenths_builder";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Tenths Builder";
const CHROME = { "dim": "#9AA4AC", "ink": "#2B2B2B", "rule": "#C9BCA6", "panel": "#F2E4CE", "paper": "#FFFDF7", "accent": "#5B6770" };
const VOICE = { "rate": 0.92, "pitch": 1.06 };
const OPENING = [];
const FINISH_LINE = "You cut, shaded and traded tenths, and counted every one.";
const FREE_LINE = "Free play. Cut, shade and trade as many strips as you like.";
const TR = {
  hi: {
    "Tenths Builder": "दशांश बनाओ",
    "One tenth": "एक दशांश",
    "Tenths as decimals": "दशांश, दशमलव रूप में",
    "Wholes and tenths together": "पूर्ण और दशांश एक साथ",
    "Ten tenths make one whole": "दस दशांश से एक पूर्ण",
    "You cut, shaded and traded tenths, and counted every one.": "तुमने दशांश काटे, रंगे और बदले, और हर एक को गिना।",
    "Free play. Cut, shade and trade as many strips as you like.": "मुक्त खेल। जितनी चाहो, पट्टियाँ काटो, रंगो और बदलो।",
    /* phase 1 */
    "Tap Cut to cut the strip into ten parts, all the same width.": "'काटो' दबाकर दस बराबर भाग करो।",
    "Count all the parts first, one by one.": "पहले सारे भाग एक-एक करके गिनो।",
    "A tenth comes only from ten parts of one size.": "दसों भाग एक नाप के हों, तभी दशांश।",
    "One of ten equal parts is one tenth, and it is written 0.1.": "दस बराबर भागों में से एक भाग, एक दशांश है। इसे 0.1 लिखते हैं।",
    "You learned: one of ten equal parts is one tenth, written 0.1": "तुमने सीखा: दस बराबर भागों में से एक, एक दशांश यानी 0.1",
    "What fraction of the strip is one part?": "एक भाग पट्टी का कौन-सा भिन्न है?",
    "One part, as a fraction?": "एक भाग का भिन्न?",
    "Which number goes on top: the part you take, or all the parts?": "ऊपर क्या आएगा: लिया भाग, या सारे भाग?",
    "Shade a part and write it as a decimal.": "एक भाग रंगो और उसे दशमलव में लिखो।",
    "Shaded part, as a decimal?": "रंगा भाग, दशमलव में?",
    "One part is less than a whole, so what goes before the point?": "भाग पूरे से छोटा है, पहले क्या आएगा?",
    "Is this shaded part a tenth?": "क्या यह रंगा भाग एक दशांश है?",
    "Is it a tenth?": "क्या यह दशांश है?",
    "Would ten parts the size of the shaded one fill this strip exactly?": "ऐसे दस भाग क्या पट्टी ठीक भरेंगे?",
    "Yes": "हाँ",
    "No": "नहीं",
    "yes": "हाँ",
    "no": "नहीं",
    "Yes, 1/10: one part out of ten.": "हाँ, 1 बटा 10: दस में से एक भाग।",
    "Yes, 0.1: the 0 before the point means no whole strips.": "हाँ, 0.1: बिंदु से पहले 0, पूरी पट्टी नहीं।",
    "Right, unequal parts are not tenths.": "सही, असमान भाग दशांश नहीं होते।",
    /* phase 2 */
    "Tap one part to shade it.": "एक भाग दबाकर रंगो।",
    "Tap another part and watch the digit after the point.": "दूसरा भाग दबाओ, बिंदु के बाद देखो।",
    "Shade the parts one at a time, and count as you go.": "एक-एक भाग रंगो, और साथ-साथ गिनो।",
    "Say the amount in tenths first, then write it.": "पहले बोलो कितने दशांश हैं, फिर लिखो।",
    "A number of tenths is written with that digit after the point.": "दशांश की गिनती बिंदु के बाद लिखते हैं।",
    "You learned: tenths are written as the digit after the point": "तुमने सीखा: दशांश बिंदु के बाद वाला अंक है",
    "Shade 8 parts and write the decimal.": "8 भाग रंगो और दशमलव लिखो।",
    "8 parts shaded: decimal?": "8 भाग रंगे: दशमलव?",
    "Count only the shaded parts, each one a tenth.": "केवल रंगे भाग गिनो, हर एक दशांश है।",
    "Write 9/10 as a decimal.": "9 बटा 10 को दशमलव में लिखो।",
    "This fraction as a decimal?": "यह भिन्न, दशमलव में?",
    "Shade that many tenths and count them.": "उतने दशांश रंगो और गिनो।",
    "Write 0.8 as a fraction.": "0.8 को भिन्न में लिखो।",
    "What fraction is it?": "यह कौन-सा भिन्न है?",
    "Shade the tenths in 0.8, then look at the whole strip.": "इतने दशांश रंगो, फिर पूरी पट्टी देखो।",
    "Yes, 0.8: eight of the ten parts are shaded.": "हाँ, 0.8: दस में से आठ भाग रंगे हैं।",
    "Right, 9 tenths and 0.9 are the same amount.": "सही, 9 दशांश और 0.9 एक ही मात्रा हैं।",
    "Yes, zero point eight means 8 tenths.": "हाँ, शून्य दशमलव आठ यानी 8 दशांश।",
    /* phase 3 */
    "Tap one part of the third strip.": "तीसरी पट्टी का एक भाग दबाओ।",
    "Tap another part and watch which side of the point changes.": "दूसरा भाग दबाओ, बिंदु की कौन ओर बदली?",
    "Look at the full strips, then at the shaded parts.": "पहले पूरी पट्टियाँ देखो, फिर रंगे भाग।",
    "Say the wholes, then the point, then the tenths.": "पहले पूर्ण बोलो, फिर बिंदु, फिर दशांश।",
    "Whole strips give the whole number part, and tenths give the decimal part.": "पूरी पट्टियों से पूर्ण संख्या भाग बनता है। दशांश से दशमलव भाग बनता है।",
    "You learned: wholes go before the point, tenths after it": "तुमने सीखा: पूर्ण बिंदु से पहले, दशांश उसके बाद",
    "Shade 9 tenths of the third strip.": "तीसरी पट्टी के 9 दशांश रंगो।",
    "2 wholes, 9 tenths: decimal?": "2 पूर्ण, 9 दशांश: दशमलव?",
    "Count the whole strips, and that count goes before the point.": "पूरी पट्टियों की गिनती बिंदु से पहले।",
    "Shade 1 tenth of the sixth strip.": "छठी पट्टी का 1 दशांश रंगो।",
    "5 wholes, 1 tenth: decimal?": "5 पूर्ण, 1 दशांश: दशमलव?",
    "The tenth on the last strip goes after the point.": "आखिरी पट्टी का दशांश बिंदु के बाद।",
    "Name both parts of 7.9.": "7.9 के दोनों भाग बताओ।",
    "Split 7.9 at the point.": "7.9 को बिंदु पर बाँटो।",
    "Digits before the point count whole strips.": "बिंदु से पहले का अंक पूर्ण गिनता है।",
    "whole part": "पूर्ण भाग",
    "tenths": "दशांश",
    "Yes, 2.9: the point sits between wholes and tenths.": "हाँ, 2.9: बिंदु पूर्ण और दशांश के बीच है।",
    "Yes, 5.1: five wholes, then one tenth.": "हाँ, 5.1: पाँच पूर्ण, फिर एक दशांश।",
    "Yes: whole number part 7, decimal part 9.": "हाँ: पूर्ण भाग 7, दशमलव भाग 9।",
    /* phase 4 */
    "Tap Lots of 9.": "'9 के समूह' दबाओ।",
    "Add one more lot of 9.": "9 का एक और समूह जोड़ो।",
    "Tap Trade to swap ten tenths for one whole strip.": "'बदलो' दबाकर दस दशांश की पट्टी लो।",
    "Fewer than ten tenths cannot make a whole, so they stay tenths.": "दस से कम दशांश, दशांश ही रहते हैं।",
    "Wholes go before the point, loose tenths after it.": "पूर्ण बिंदु से पहले, दशांश बाद में।",
    "Ten tenths make one whole. So a count of tenths is read as ones and tenths.": "दस दशांश से एक पूर्ण बनता है। इसलिए दशांश, इकाई और दशांश में पढ़े जाते हैं।",
    "You learned: ten tenths make one whole. Read wholes, then tenths.": "तुमने सीखा: दस दशांश से एक पूर्ण। पहले पूर्ण पढ़ो, फिर दशांश।",
    "Add 3 lots of 9, then trade.": "9 के 3 समूह जोड़ो, फिर बदलो।",
    "3 lots of 9 tenths: decimal?": "9 दशांश के 3 समूह: दशमलव?",
    "How many full strips of ten can you make from these tenths?": "इनसे कितनी पूरी पट्टियाँ बनेंगी?",
    "What decimal is 53 tenths?": "53 दशांश कौन-सी दशमलव संख्या है?",
    "53 tenths: decimal?": "53 दशांश: दशमलव?",
    "Keep tapping Trade while you can, then read wholes and tenths.": "'बदलो' दबाते रहो, फिर संख्या पढ़ो।",
    "Now try 4 lots of 6 tenths.": "अब 6 दशांश के 4 समूह आज़माओ।",
    "4 lots of 6 tenths: decimal?": "6 दशांश के 4 समूह: दशमलव?",
    "Find the tenths in 4 lots, then the wholes hiding in them.": "4 समूहों के दशांश गिनो, फिर पूर्ण।",
    "Yes, 2.7: two wholes and seven tenths.": "हाँ, 2.7: दो पूर्ण और सात दशांश।",
    "That is 5.3: five wholes, three tenths left.": "यह 5.3 है: पाँच पूर्ण, तीन दशांश बचे।",
    "Yes, 2.4: twenty tenths traded, four left.": "हाँ, 2.4: बीस दशांश बदले, चार बचे।",
    /* the working area and the summary drawing */
    "Fraction": "भिन्न",
    "Decimal": "दशमलव",
    "Whole number part": "पूर्ण भाग",
    "Decimal part": "दशमलव भाग",
    "Whole": "पूर्ण",
    "whole": "पूर्ण",
    "wholes": "पूर्ण",
    "Not a tenth": "दशांश नहीं",
    "A tenth": "एक दशांश",
    "Cut": "काटो",
    "Shape": "आकार",
    "Trade": "बदलो",
    "Lots of 9": "9 के समूह",
    "Lots of 6": "6 के समूह",
    "lot": "समूह",
    "lots": "समूह",
    "Tenths": "दशांश",
    /* the guide steps' hints (r34: shown under the instruction after another act) */
    "Tap the Cut key first.": "पहले 'काटो' दबाओ।",
    "Tap any chocolate piece on the strip.": "पट्टी का कोई भी चॉकलेट टुकड़ा दबाओ।",
    "Tap one more piece.": "एक और टुकड़ा दबाओ।",
    "The third strip is the cut one at the bottom.": "नीचे वाली कटी पट्टी तीसरी है।",
    "Tap one more piece of that strip.": "उसी पट्टी का एक और टुकड़ा दबाओ।",
    "The Lots of 9 key adds nine tenths.": "'9 के समूह' बटन नौ दशांश जोड़ता है।",
    "Use the Lots of 9 key again.": "'9 के समूह' बटन फिर से दबाओ।",
    "Now use the Trade key.": "अब 'बदलो' दबाओ।",
    /* the start page (printed, not spoken) */
    "One chocolate bar. Can you cut it so everyone gets the same?": "एक चॉकलेट बार। क्या तुम इसे ऐसे काट सकते हो कि सबको बराबर मिले?"
  },
  gu: {
    "Tenths Builder": "દશાંશ બનાવો",
    "One tenth": "એક દશાંશ",
    "Tenths as decimals": "દશાંશ, દશાંશ સંખ્યા રૂપે",
    "Wholes and tenths together": "પૂર્ણ અને દશાંશ સાથે",
    "Ten tenths make one whole": "દસ દશાંશથી એક પૂર્ણ",
    "You cut, shaded and traded tenths, and counted every one.": "તમે દશાંશ કાપ્યા, રંગ્યા અને બદલ્યા, અને દરેકને ગણ્યા.",
    "Free play. Cut, shade and trade as many strips as you like.": "મુક્ત રમત. ગમે તેટલી પટ્ટીઓ કાપો, રંગો અને બદલો.",
    /* phase 1 */
    "Tap Cut to cut the strip into ten parts, all the same width.": "'કાપો' દબાવી દસ સરખા ભાગ કરો.",
    "Count all the parts first, one by one.": "પહેલાં બધા ભાગ એક પછી એક ગણો.",
    "A tenth comes only from ten parts of one size.": "દસેય ભાગ એક માપના હોય તો જ દશાંશ બને.",
    "One of ten equal parts is one tenth, and it is written 0.1.": "એક દશાંશ એટલે દસ સરખા ભાગમાંથી એક. તેને 0.1 લખાય.",
    "You learned: one of ten equal parts is one tenth, written 0.1": "તમે શીખ્યા: દસ સરખા ભાગમાંથી એક, એક દશાંશ એટલે 0.1",
    "What fraction of the strip is one part?": "એક ભાગ પટ્ટીનો કયો અપૂર્ણાંક છે?",
    "One part, as a fraction?": "એક ભાગ, અપૂર્ણાંકમાં?",
    "Which number goes on top: the part you take, or all the parts?": "ઉપર શું આવે: લીધેલો ભાગ કે બધા?",
    "Shade a part and write it as a decimal.": "એક ભાગ રંગો, પછી દશાંશ સંખ્યા લખો.",
    "Shaded part, as a decimal?": "રંગેલો ભાગ, દશાંશ સંખ્યામાં?",
    "One part is less than a whole, so what goes before the point?": "ભાગ આખાથી નાનો છે, બિંદુ પહેલાં શું?",
    "Is this shaded part a tenth?": "શું આ રંગેલો ભાગ એક દશાંશ છે?",
    "Is it a tenth?": "શું આ દશાંશ છે?",
    "Would ten parts the size of the shaded one fill this strip exactly?": "આવા દસ ભાગ પટ્ટી બરાબર ભરશે?",
    "Yes": "હા",
    "No": "ના",
    "yes": "હા",
    "no": "ના",
    "Yes, 1/10: one part out of ten.": "હા, દસમાંથી 1 ભાગ, એટલે એક દશાંશ.",
    "Yes, 0.1: the 0 before the point means no whole strips.": "હા, 0.1: બિંદુ પહેલાં 0 એટલે એકેય આખી પટ્ટી નથી.",
    "Right, unequal parts are not tenths.": "સાચું, અસમાન ભાગ દશાંશ નથી.",
    /* phase 2 */
    "Tap one part to shade it.": "એક ભાગ દબાવીને રંગો.",
    "Tap another part and watch the digit after the point.": "બીજો ભાગ દબાવો, બિંદુ પછીનો અંક જુઓ.",
    "Shade the parts one at a time, and count as you go.": "એક એક ભાગ રંગો, અને સાથે સાથે ગણો.",
    "Say the amount in tenths first, then write it.": "પહેલાં બોલો કેટલા દશાંશ છે, પછી લખો.",
    "A number of tenths is written with that digit after the point.": "જેટલા દશાંશ હોય, બિંદુ પછી એ જ અંક લખાય.",
    "You learned: tenths are written as the digit after the point": "તમે શીખ્યા: દશાંશ બિંદુ પછીના અંકથી લખાય છે",
    "Shade 8 parts and write the decimal.": "8 ભાગ રંગો અને દશાંશ સંખ્યા લખો.",
    "8 parts shaded: decimal?": "8 ભાગ રંગ્યા: દશાંશ સંખ્યા?",
    "Count only the shaded parts, each one a tenth.": "ફક્ત રંગેલા ભાગ ગણો, દરેક એક દશાંશ.",
    "Write 9/10 as a decimal.": "દસમાંથી 9 ને દશાંશ સંખ્યામાં લખો.",
    "This fraction as a decimal?": "આ અપૂર્ણાંક, દશાંશ સંખ્યામાં?",
    "Shade that many tenths and count them.": "એટલા દશાંશ રંગો અને ગણો.",
    "Write 0.8 as a fraction.": "0.8 ને અપૂર્ણાંકમાં લખો.",
    "What fraction is it?": "એ કયો અપૂર્ણાંક છે?",
    "Shade the tenths in 0.8, then look at the whole strip.": "એટલા દશાંશ રંગો, પછી આખી પટ્ટી જુઓ.",
    "Yes, 0.8: eight of the ten parts are shaded.": "હા, 0.8: દસમાંથી આઠ ભાગ રંગેલા છે.",
    "Right, 9 tenths and 0.9 are the same amount.": "સાચું, 9 દશાંશ અને 0.9 એકસરખા છે.",
    "Yes, zero point eight means 8 tenths.": "હા, શૂન્ય દશાંશ આઠ એટલે 8 દશાંશ.",
    /* phase 3 */
    "Tap one part of the third strip.": "ત્રીજી પટ્ટીનો એક ભાગ દબાવો.",
    "Tap another part and watch which side of the point changes.": "બીજો ભાગ દબાવો, બિંદુની કઈ બાજુ બદલાય?",
    "Look at the full strips, then at the shaded parts.": "પહેલાં આખી પટ્ટીઓ જુઓ, પછી રંગેલા ભાગ.",
    "Say the wholes, then the point, then the tenths.": "પૂર્ણ બોલો, પછી બિંદુ, પછી દશાંશ.",
    "Whole strips give the whole number part, and tenths give the decimal part.": "આખી પટ્ટીઓથી પૂર્ણાંક ભાગ બને. દશાંશથી દશાંશ ભાગ બને.",
    "You learned: wholes go before the point, tenths after it": "તમે શીખ્યા: પૂર્ણ બિંદુની પહેલાં, દશાંશ એની પછી",
    "Shade 9 tenths of the third strip.": "ત્રીજી પટ્ટીના 9 દશાંશ રંગો.",
    "2 wholes, 9 tenths: decimal?": "2 પૂર્ણ, 9 દશાંશ: દશાંશ સંખ્યા?",
    "Count the whole strips, and that count goes before the point.": "આખી પટ્ટીઓની ગણતરી બિંદુ પહેલાં.",
    "Shade 1 tenth of the sixth strip.": "છઠ્ઠી પટ્ટીનો 1 દશાંશ રંગો.",
    "5 wholes, 1 tenth: decimal?": "5 પૂર્ણ, 1 દશાંશ: દશાંશ સંખ્યા?",
    "The tenth on the last strip goes after the point.": "છેલ્લી પટ્ટીનો દશાંશ બિંદુ પછી આવે.",
    "Name both parts of 7.9.": "7.9 ના બંને ભાગ કહો.",
    "Split 7.9 at the point.": "7.9 ને બિંદુ પાસે વહેંચો.",
    "Digits before the point count whole strips.": "બિંદુ પહેલાંના અંક આખી પટ્ટીઓ ગણે છે.",
    "whole part": "પૂર્ણ ભાગ",
    "tenths": "દશાંશ",
    "Yes, 2.9: the point sits between wholes and tenths.": "હા, 2.9: બિંદુ પૂર્ણ અને દશાંશની વચ્ચે છે.",
    "Yes, 5.1: five wholes, then one tenth.": "હા, 5.1: પાંચ પૂર્ણ, પછી એક દશાંશ.",
    "Yes: whole number part 7, decimal part 9.": "હા: પૂર્ણાંક ભાગ 7, દશાંશ ભાગ 9.",
    /* phase 4 */
    "Tap Lots of 9.": "'9 ના જૂથ' દબાવો.",
    "Add one more lot of 9.": "9 નું હજી એક જૂથ ઉમેરો.",
    "Tap Trade to swap ten tenths for one whole strip.": "'બદલો' દબાવી દસ દશાંશની આખી પટ્ટી લો.",
    "Fewer than ten tenths cannot make a whole, so they stay tenths.": "દસથી ઓછા દશાંશ, દશાંશ જ રહે.",
    "Wholes go before the point, loose tenths after it.": "પૂર્ણ બિંદુ પહેલાં, દશાંશ પછી.",
    "Ten tenths make one whole. So a count of tenths is read as ones and tenths.": "દસ દશાંશથી એક પૂર્ણ બને. તેથી દશાંશની સંખ્યા એકમ અને દશાંશમાં વંચાય.",
    "You learned: ten tenths make one whole. Read wholes, then tenths.": "તમે શીખ્યા: દસ દશાંશથી એક પૂર્ણ. પહેલાં પૂર્ણ વાંચો, પછી દશાંશ.",
    "Add 3 lots of 9, then trade.": "9 ના 3 જૂથ ઉમેરો, પછી બદલો.",
    "3 lots of 9 tenths: decimal?": "9 દશાંશના 3 જૂથ: દશાંશ સંખ્યા?",
    "How many full strips of ten can you make from these tenths?": "આમાંથી કેટલી આખી પટ્ટીઓ બને?",
    "What decimal is 53 tenths?": "53 દશાંશ કઈ દશાંશ સંખ્યા છે?",
    "53 tenths: decimal?": "53 દશાંશ: દશાંશ સંખ્યા?",
    "Keep tapping Trade while you can, then read wholes and tenths.": "'બદલો' દબાવતા રહો, પછી સંખ્યા વાંચો.",
    "Now try 4 lots of 6 tenths.": "હવે 6 દશાંશના 4 જૂથ અજમાવો.",
    "4 lots of 6 tenths: decimal?": "6 દશાંશના 4 જૂથ: દશાંશ સંખ્યા?",
    "Find the tenths in 4 lots, then the wholes hiding in them.": "4 જૂથના દશાંશ ગણો, પછી પૂર્ણ.",
    "Yes, 2.7: two wholes and seven tenths.": "હા, 2.7: બે પૂર્ણ અને સાત દશાંશ.",
    "That is 5.3: five wholes, three tenths left.": "એ 5.3 છે: પાંચ પૂર્ણ, ત્રણ દશાંશ બાકી.",
    "Yes, 2.4: twenty tenths traded, four left.": "હા, 2.4: વીસ દશાંશ બદલ્યા, ચાર બાકી.",
    /* the working area and the summary drawing */
    "Fraction": "અપૂર્ણાંક",
    "Decimal": "દશાંશ સંખ્યા",
    "Whole number part": "પૂર્ણાંક ભાગ",
    "Decimal part": "દશાંશ ભાગ",
    "Whole": "પૂર્ણ",
    "whole": "પૂર્ણ",
    "wholes": "પૂર્ણ",
    "Not a tenth": "દશાંશ નથી",
    "A tenth": "એક દશાંશ",
    "Cut": "કાપો",
    "Shape": "આકાર",
    "Trade": "બદલો",
    "Lots of 9": "9 ના જૂથ",
    "Lots of 6": "6 ના જૂથ",
    "lot": "જૂથ",
    "lots": "જૂથ",
    "Tenths": "દશાંશ",
    /* the guide steps' hints (r34: shown under the instruction after another act) */
    "Tap the Cut key first.": "પહેલાં 'કાપો' દબાવો.",
    "Tap any chocolate piece on the strip.": "પટ્ટીનો કોઈ પણ ચોકલેટ ટુકડો દબાવો.",
    "Tap one more piece.": "હજી એક ટુકડો દબાવો.",
    "The third strip is the cut one at the bottom.": "ત્રીજી પટ્ટી નીચેની કાપેલી પટ્ટી છે.",
    "Tap one more piece of that strip.": "એ જ પટ્ટીનો હજી એક ટુકડો દબાવો.",
    "The Lots of 9 key adds nine tenths.": "'9 ના જૂથ' બટન નવ દશાંશ ઉમેરે છે.",
    "Use the Lots of 9 key again.": "'9 ના જૂથ' બટન ફરી દબાવો.",
    "Now use the Trade key.": "હવે 'બદલો' દબાવો.",
    /* the start page (printed, not spoken) */
    "One chocolate bar. Can you cut it so everyone gets the same?": "એક ચોકલેટ બાર. શું તમે એને એવી રીતે કાપી શકો કે બધાને સરખું મળે?"
  }
};
const PHASES = [
  {
    n: 1,
    concept: "One tenth",
    conceptId: "M1.S1.T2.C4",
    objectiveIds: ["O1"],
    /* guide steps (PATTERNS §9b): each waits for ONE click of the control its `on` names; `hint` shows under the
       instruction after any other act, or on the Hint key */
    steps: [{ say: "Tap Cut to cut the strip into ten parts, all the same width.", on: "cut", hint: "Tap the Cut key first." }],
    /* the cut is reported on the click; the knife sweep (about 2 s) and the settle play out in the hold before the question */
    stepHold: 3200,
    ladder: ["Count all the parts first, one by one.", "A tenth comes only from ten parts of one size."],
    closing: "One of ten equal parts is one tenth, and it is written 0.1.",
    learned: "You learned: one of ten equal parts is one tenth, written 0.1",
    traceback: "The strip is cut and its parts counted one by one; one part lights up and the card fills with the whole right answer.",
    items: [
      /* practice 1: answer in the plan = All 10 parts make the whole strip, and one part is one tenth, 1/10 */
      {
        qid: "M1.S1.T2.C4:1",
        kind: "name",
        tenths: 1,
        parts: SLOT_FRACTION,
        answer: [1, 10],
        near: "1|1",
        say: "What fraction of the strip is one part?",
        ask: "One part, as a fraction?",
        miss: "Which number goes on top: the part you take, or all the parts?"
      },
      /* learn TB1: answer in the plan = 1/10, which is written 0.1 and read as zero point one */
      {
        qid: "M1.S1.T2.C4:TB1",
        kind: "dec1",
        tenths: 1,
        parts: SLOT_DECIMAL,
        answer: ["0", "1"],
        near: "1|0",
        say: "Shade a part and write it as a decimal.",
        ask: "Shaded part, as a decimal?",
        miss: "One part is less than a whole, so what goes before the point?"
      },
      /* authored: the phase has only two plan questions; this one tests its misconception (a part of a
         strip cut into unequal pieces is not a tenth) */
      {
        qid: null,
        kind: "unequal",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        answer: "no",
        near: "yes",
        say: "Is this shaded part a tenth?",
        ask: "Is it a tenth?",
        miss: "Would ten parts the size of the shaded one fill this strip exactly?"
      }
    ]
  },
  {
    n: 2,
    concept: "Tenths as decimals",
    conceptId: "M1.S1.T2.C5",
    objectiveIds: ["O1"],
    teachLive: true,
    /* stepHold (r33): the last act's result (0.3 on the cards) stays this long before the question opens and resets */
    /* every step is ONE click of one control (the same `on` may repeat: steps run in order) */
    steps: [
      { say: "Tap one part to shade it.", on: "shade", hint: "Tap any chocolate piece on the strip." },
      { say: "Tap another part and watch the digit after the point.", on: "shade", hint: "Tap one more piece." }
    ],
    stepHold: 1800,
    ladder: ["Shade the parts one at a time, and count as you go.", "Say the amount in tenths first, then write it."],
    closing: "A number of tenths is written with that digit after the point.",
    learned: "You learned: tenths are written as the digit after the point",
    traceback: "The shaded tenths are numbered one by one beside any wholes the answer claimed, and the decimal card fills with a 0 before the point.",
    items: [
      /* learn TB2: answer in the plan = 8/10, which is written 0.8 */
      {
        qid: "M1.S1.T2.C5:TB2",
        kind: "shade",
        tenths: 8,
        parts: SLOT_DECIMAL,
        answer: ["0", "8"],
        near: "8|0",
        say: "Shade 8 parts and write the decimal.",
        ask: "8 parts shaded: decimal?",
        miss: "Count only the shaded parts, each one a tenth."
      },
      /* practice 2: answer in the plan = 0.9 */
      {
        qid: "M1.S1.T2.C5:2",
        kind: "fracdec",
        tenths: 9,
        parts: SLOT_DECIMAL,
        answer: ["0", "9"],
        near: "9|0",
        say: "Write 9/10 as a decimal.",
        ask: "This fraction as a decimal?",
        miss: "Shade that many tenths and count them."
      },
      /* practice 3: answer in the plan = Zero point eight. It is 8 tenths, 8/10 */
      {
        qid: "M1.S1.T2.C5:3",
        kind: "decfrac",
        tenths: 8,
        parts: SLOT_FRACTION,
        answer: [8, 10],
        near: "2|10",
        say: "Write 0.8 as a fraction.",
        ask: "What fraction is it?",
        miss: "Shade the tenths in 0.8, then look at the whole strip."
      }
    ]
  },
  {
    n: 3,
    concept: "Wholes and tenths together",
    conceptId: "M1.S1.T2.C6",
    objectiveIds: ["O1"],
    teachLive: true,
    steps: [
      { say: "Tap one part of the third strip.", on: "shade", hint: "The third strip is the cut one at the bottom." },
      { say: "Tap another part and watch which side of the point changes.", on: "shade", hint: "Tap one more piece of that strip." }
    ],
    stepHold: 1800,
    ladder: ["Look at the full strips, then at the shaded parts.", "Say the wholes, then the point, then the tenths."],
    closing: "Whole strips give the whole number part, and tenths give the decimal part.",
    learned: "You learned: wholes go before the point, tenths after it",
    traceback: "The whole strips light one by one and their count moves before the point; then the tenths are numbered and their count goes after it.",
    items: [
      /* learn TB3: answer in the plan = 2.9 */
      {
        qid: "M1.S1.T2.C6:TB3",
        kind: "mixed",
        wholes: 2,
        tenths: 9,
        parts: SLOT_DECIMAL,
        answer: ["2", "9"],
        near: "0|29",
        say: "Shade 9 tenths of the third strip.",
        ask: "2 wholes, 9 tenths: decimal?",
        miss: "Count the whole strips, and that count goes before the point."
      },
      /* practice 4: answer in the plan = 5.1, because 5 + 1/10 = 5.1 */
      {
        qid: "M1.S1.T2.C6:4",
        kind: "mixed",
        wholes: 5,
        tenths: 1,
        parts: SLOT_DECIMAL,
        answer: ["5", "1"],
        near: "0|51",
        say: "Shade 1 tenth of the sixth strip.",
        ask: "5 wholes, 1 tenth: decimal?",
        miss: "The tenth on the last strip goes after the point."
      },
      /* practice 5: answer in the plan = The whole number part is 7 and the decimal part is 9 tenths */
      {
        qid: "M1.S1.T2.C6:5",
        kind: "split",
        wholes: 7,
        tenths: 9,
        parts: [{ label: "whole part" }, { label: "tenths" }],
        answer: [7, 9],
        near: "0|79",
        say: "Name both parts of 7.9.",
        ask: "Split 7.9 at the point.",
        miss: "Digits before the point count whole strips."
      }
    ]
  },
  {
    n: 4,
    concept: "Ten tenths make one whole",
    conceptId: "M1.S1.T2.C7",
    objectiveIds: ["O2"],
    steps: [
      { say: "Tap Lots of 9.", on: "lots", hint: "The Lots of 9 key adds nine tenths." },
      { say: "Add one more lot of 9.", on: "lots", hint: "Use the Lots of 9 key again." },
      { say: "Tap Trade to swap ten tenths for one whole strip.", on: "trade", hint: "Now use the Trade key." }
    ],
    /* the trade is reported on the click; its merge (650 ms) and the new whole then stay on the board in this hold */
    stepHold: 2300,
    ladder: ["Fewer than ten tenths cannot make a whole, so they stay tenths.", "Wholes go before the point, loose tenths after it."],
    closing: "Ten tenths make one whole. So a count of tenths is read as ones and tenths.",
    learned: "You learned: ten tenths make one whole. Read wholes, then tenths.",
    traceback: "The tenths slide together ten at a time into whole strips, and the decimal card fills its two sides as they close.",
    items: [
      /* learn TB4: answer in the plan = 27 tenths, which is 2 ones and 7 tenths, written 2.7 */
      {
        qid: "M1.S1.T2.C7:TB4",
        kind: "lots",
        lot: 9,
        lots: 3,
        parts: SLOT_DECIMAL,
        answer: ["2", "7"],
        near: "27|0",
        say: "Add 3 lots of 9, then trade.",
        ask: "3 lots of 9 tenths: decimal?",
        miss: "How many full strips of ten can you make from these tenths?"
      },
      /* practice 6: answer in the plan = 5 ones and 3 tenths, so 53/10 = 5.3 */
      {
        qid: "M1.S1.T2.C7:6",
        kind: "loose",
        total: 53,
        parts: SLOT_DECIMAL,
        answer: ["5", "3"],
        near: "53|0",
        say: "What decimal is 53 tenths?",
        ask: "53 tenths: decimal?",
        miss: "Keep tapping Trade while you can, then read wholes and tenths."
      },
      /* practice 7: answer in the plan = 24 tenths, which is 2 ones and 4 tenths, written 2.4 */
      {
        qid: "M1.S1.T2.C7:7",
        kind: "lots",
        lot: 6,
        lots: 4,
        parts: SLOT_DECIMAL,
        answer: ["2", "4"],
        near: "24|0",
        say: "Now try 4 lots of 6 tenths.",
        ask: "4 lots of 6 tenths: decimal?",
        miss: "Find the tenths in 4 lots, then the wholes hiding in them."
      }
      /* practice 8 (M1.S1.T2.C7:8, 6.1 has 61 tenths) is unused: three questions a phase, and the
         live Tenths tally would print its answer */
    ]
  }
];
const TB_UNEQUAL = [150, 40, 90, 50, 70, 60, 110, 45, 55, 50];
const MODEL = {
  tenthsPerStrip: 10,
  stripLength: 1040,
  cellWidth: 104,
  stripLengthOpen: 750,
  cellWidthOpen: 75,
  cutGap: 8,
  cutModel: "each piece inset gap/2 in its slot",
  unequalWidths: TB_UNEQUAL,
  unequalScale: "stripLength / 720",
  cards: ["fraction", "decimal"],
  controls: ["Cut", "Trade", "Lots of", "part tap"]
};
const tbModel = (it) => {
  const tot = !it ? 0 : it.kind === "lots" ? it.lot * it.lots : it.kind === "loose" ? it.total : (it.wholes || 0) * 10 + (it.tenths || 0);
  return { w: Math.floor(tot / 10), t: tot % 10, tot };
};
const judge = (item, v) => {
  if (item.parts === SLOT_FRACTION) {
    const [a, b] = slotPartsOf(v, 2);
    return a !== "" && b !== "" && Number(b) > 0 && Number(a) * item.answer[1] === Number(b) * item.answer[0];
  }
  if (item.parts === SLOT_DECIMAL) return judgeSlotDecimal(item, v);
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return /^\d+$/.test(String(v != null ? v : "").trim()) && Number(v) === item.answer;
  return String(v != null ? v : "").trim().toLowerCase() === String(item.answer).toLowerCase();
};
const oracle = () => PHASES.every((p) => p.items.every((it) => {
  const tenthsInAll = it.kind === "lots" ? it.lot * it.lots : it.kind === "loose" ? it.total : (it.wholes || 0) * 10 + (it.tenths || 0);
  if (it.kind === "unequal") return TB_UNEQUAL.length === 10 && new Set(TB_UNEQUAL).size > 1 && it.answer === "no";
  if (it.kind === "split") return it.answer[0] * 10 + it.answer[1] === tenthsInAll;
  if (it.parts === SLOT_FRACTION) return it.answer[0] * 10 === tenthsInAll * it.answer[1];
  const [i, f] = it.answer;
  return it.parts === SLOT_DECIMAL && /^\d+$/.test(i) && /^\d$/.test(f) && Number(i) * 10 + Number(f) === tenthsInAll;
}));
const nearMiss = (item) => item.near;
const tbWritten = (item) => item.answer[0] + "." + item.answer[1];
const answerForms = (item) => item.parts === SLOT_FRACTION ? [`${item.answer[0]}/${item.answer[1]}`, fractionWords(item.answer[0], item.answer[1])] : item.parts === SLOT_DECIMAL ? [tbWritten(item), speakable(tbWritten(item))] : item.parts ? [] : typeof item.answer === "number" ? [String(item.answer), words(item.answer)] : item.choices ? [String(item.answer)] : [String(item.answer), speakable(item.answer)];
const agentKey = (item) => item.answer;
const solve = (item, T2) => T2.submit(item.answer);
const answer = () => void 0;
const check = () => void 0;
const tbFormat = (v) => v === "yes" ? "Yes" : v === "no" ? "No" : v;
const TB_BLUE = CONTENT.hundred, TB_GREEN = CONTENT.one, TB_AMBER = CONTENT.ten, TB_VERM = CONTENT.pointer;
const TB_INK = "#2B2B2B", TB_GREY = "#767676", TB_CHIP = "#FFFDF7";
const TB_CHOC = "#8C4E32", TB_CHOC_RIM = "#5A2C18", TB_CHOC_IN = "#7E4329", TB_CHOC_HI = "#BC7E5E", TB_CUT = "#2E1B10";
const TB_CAKE = "#E9B566", TB_CRUST = "#C4823F", TB_CAKE_RIM = "#8A5A2B";
const TB_GAP = 10, TB_PAD = 24, TB_TOP = 8, TB_BY = 448, TB_HUG = 36;
const TB_LIFT = 6, TB_TINT = 0.85;
function tbLay(bw) {
  const t = Math.max(0, Math.min(1, (bw - 1086) / 386));
  const cell = Math.max(56, Math.min(104, Math.floor((bw - 6 - (262 + 96 * t) - 20 - 2 * TB_PAD) / 10)));
  const len = cell * 10, boardW = len + 2 * TB_PAD, cx = boardW + 20;
  return { t, cell, len, x0: TB_PAD, boardW, cx, cw: bw - 6 - cx, r: Math.round(150 + 20 * t) };
}
const tbDeep = (c) => shade(c, 0.25);
const tbR = (w, h) => Math.max(3, Math.min(9, w * 0.1, h * 0.12));
const tbChoc = (x, y, w, h, key) => {
  const r = tbR(w, h), i = Math.min(12, Math.max(5, Math.min(w, h) * 0.15)), inner = w > 2 * i + 8 && h > 2 * i + 8;
  return <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={TB_CHOC} stroke={TB_CHOC_RIM} strokeWidth={1.5} />
      {inner && <rect x={x + i} y={y + i} width={w - 2 * i} height={h - 2 * i} rx={Math.max(2, r * 0.6)} fill={TB_CHOC_IN} />}
      {inner && <path d={`M ${x + i + 2} ${y + h - i} H ${x + w - i - 2}`} stroke={TB_CHOC_HI} strokeOpacity={0.55} strokeWidth={2} strokeLinecap="round" />}
      <path d={`M ${x + r} ${y + 2.5} H ${x + w - r} M ${x + 2.5} ${y + r} V ${y + h - r}`} fill="none" stroke={TB_CHOC_HI} strokeWidth={2.5} strokeLinecap="round" />
    </g>;
};
const tbTile = (x, y, w, h, key) => <Skin key={key} name="piece" fit="stretch" x={x} y={y} w={w} h={h} />;
const tbTint = (x, y, w, h, r, fill) => <g>
    <rect
  x={x + 1}
  y={y + 1}
  width={Math.max(1, w - 2)}
  height={Math.max(1, h - 2)}
  rx={Math.max(2, r - 1)}
  fill={fill}
  fillOpacity={TB_TINT}
  stroke={shade(fill, 0.3)}
  strokeWidth={1.5}
/>
    {w > 16 && h > 16 && <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={Math.max(2, r - 3)} fill="none" stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={2.5} />}
  </g>;
const tbPiece = (x, y, w, h, fill, key, skin = true, lift = true) => fill ? <g key={key} transform={lift ? `translate(0,${-TB_LIFT})` : void 0} filter={lift ? "url(#fLift)" : void 0}>
    {tbChoc(x, y, w, h)}
    {tbTint(x, y, w, h, tbR(w, h), fill)}
  </g> : <g key={key}>
    {tbChoc(x, y, w, h)}
    {skin && tbTile(x, y, w, h)}
  </g>;
const tbSlabGrad = (id) => <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor="#A2603E" />
    <stop offset="1" stopColor="#77401F" />
  </linearGradient>;
const tbSlab = (x, y, w, h, fill, key, gid = "tbChocG", lift = true) => {
  const r = Math.max(4, Math.min(12, h * 0.16)), i = Math.min(12, Math.max(5, h * 0.16)), inner = h > 2 * i + 8;
  const body = <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={`url(#${gid})`} stroke={TB_CHOC_RIM} strokeWidth={1.5} />
      {inner && <rect x={x + 3} y={y + 3} width={w - 6} height={i - 3} rx={Math.max(2, r * 0.6)} fill={TB_CHOC_HI} fillOpacity={0.3} />}
      {inner && <rect x={x + i} y={y + i} width={w - 2 * i} height={h - 2 * i} rx={Math.max(2, r * 0.6)} fill={TB_CHOC_IN} fillOpacity={0.6} stroke={TB_CHOC_RIM} strokeOpacity={0.35} strokeWidth={1.5} />}
      {inner && <path d={`M ${x + i + 2} ${y + h - i} H ${x + w - i - 2}`} stroke={TB_CHOC_HI} strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />}
      <path d={`M ${x + r} ${y + 2.5} H ${x + w - r} M ${x + 2.5} ${y + r} V ${y + h - r}`} fill="none" stroke={TB_CHOC_HI} strokeWidth={2.5} strokeLinecap="round" />
      <path d={`M ${x + r} ${y + h - 2.5} H ${x + w - r} M ${x + w - 2.5} ${y + r} V ${y + h - r}`} fill="none" stroke={TB_CHOC_RIM} strokeOpacity={0.6} strokeWidth={2.5} strokeLinecap="round" />
      {h > 24 && <rect x={x + w * 0.04} y={y + h * 0.17} width={w * 0.46} height={Math.max(3, h * 0.09)} rx={Math.max(1.5, h * 0.045)} fill="#FFFFFF" fillOpacity={0.16} />}
    </g>;
  return fill ? <g key={key} transform={lift ? `translate(0,${-TB_LIFT})` : void 0} filter={lift ? "url(#fLift)" : void 0}>{body}{tbTint(x, y, w, h, r, fill)}</g> : <g key={key}>{body}</g>;
};
const tbChip = (x, yMid, text, ink, anchor, key, hh = 38) => {
  const w = Math.round(String(text).length * T.micro * 0.6) + 18;
  const x1 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return <g key={key}>
      <rect x={x1} y={yMid - hh / 2} width={w} height={hh} rx={Math.min(12, hh / 2)} fill={TB_CHIP} fillOpacity={0.95} />
      <text x={x1 + w / 2} y={yMid + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{text}</text>
    </g>;
};
const tbKnife = (X, y, h) => {
  const top = y - 40, tip = y + h + 18;
  return <g filter="url(#fShadowSoft)" pointerEvents="none">
      <rect x={X - 6} y={top - 90} width={42} height={78} rx={13} fill="#4A3426" stroke={TB_INK} strokeWidth={2} />
      <circle cx={X + 15} cy={top - 68} r={4.5} fill="#D9C8A8" />
      <circle cx={X + 15} cy={top - 34} r={4.5} fill="#D9C8A8" />
      <rect x={X - 4} y={top - 14} width={38} height={16} rx={4} fill="#A9B1B8" stroke={TB_INK} strokeWidth={2} />
      <path
    d={`M ${X} ${top + 2} L ${X} ${tip - 12} Q ${X} ${tip} ${X + 10} ${tip - 6} L ${X + 30} ${tip - 40} L ${X + 30} ${top + 2} Z`}
    fill="#E4E9ED"
    stroke={TB_INK}
    strokeWidth={2}
    strokeLinejoin="round"
  />
      <path d={`M ${X + 6} ${top + 8} V ${tip - 20}`} stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
    </g>;
};
const tbCount = (cells) => cells.filter(Boolean).length;
const tbPack = (count) => Array.from({ length: Math.max(10, Math.ceil(count / 10) * 10) }, (_, k) => k < count);
const tbChunks = (count) => {
  const a = [];
  let c = count;
  while (c > 10) {
    a.push(10);
    c -= 10;
  }
  a.push(c);
  return a;
};
const tbCut = (count, extra = {}) => ({ kind: "cut", cells: Array.from({ length: 10 }, (_, j) => j < count), ...extra });
const tbNums = (upto) => Array.from({ length: 10 }, (_, j) => j < upto ? String(j + 1) : null);
const tbWholes = (w, lit = 0) => Array.from({ length: w }, (_, j) => ({ kind: "whole", ring: j < lit, n: j < lit ? String(j + 1) : null }));
const TB_SHOW = {
  name: ["ask", "whole"],
  dec1: ["live", "ask"],
  unequal: ["off", "off"],
  shade: ["live", "ask"],
  fracdec: ["given", "ask"],
  decfrac: ["ask", "given"],
  mixed: ["live", "ask"],
  split: ["off", "given"],
  lots: ["live", "ask"],
  loose: ["live", "ask"]
};
const tbSetup = (it, asking = true) => {
  const base = { cut: true, shape: "strip", wholes: 0, cells: tbPack(0), whole: false, lots: 0 };
  if (!it || !it.kind) return { ...base, cut: false };
  if (it.kind === "name") return { ...base, cut: asking };
  if (it.kind === "mixed" || it.kind === "split") return { ...base, wholes: it.wholes };
  if (it.kind === "loose") return { ...base, cells: tbPack(it.total) };
  return base;
};
const tbFree = () => ({ cut: false, shape: "strip", wholes: 0, cells: tbPack(0), whole: false, lots: 0 });
const tbUnequalEnd = () => [{ kind: "unequal", ring: true, note: { text: "Not a tenth" } }, tbCut(1, { hi: [0], note: { text: "A tenth" } })];
function tbTrace(it, v, put) {
  const M = tbModel(it), steps = [];
  const k = it.kind;
  if (k === "name") {
    steps.push([350, () => put({ strips: [tbCut(0)] })]);
    for (let j = 1; j <= 10; j++) steps.push([220, () => put({ strips: [tbCut(0, { nums: tbNums(j) })] })]);
    steps.push([450, () => put({ strips: [tbCut(1, { hi: [0], nums: tbNums(10) })], frac: { show: true, a: 1, b: 10, role: "work" } })]);
    steps.push([300, () => put({ strips: [tbCut(1, { hi: [0], nums: tbNums(10) })], frac: { show: true, a: 1, b: 10, role: "result" } })]);
  } else if (k === "dec1") {
    const view = [{ kind: "whole", ring: true }, tbCut(1, { hi: [0] })];
    steps.push([500, () => put({ strips: view })]);
    steps.push([450, () => put({ strips: view, dec: { show: true, w: 0, t: 1, role: "work" } })]);
    steps.push([300, () => put({ strips: view, dec: { show: true, w: 0, t: 1, role: "result" } })]);
  } else if (k === "unequal") {
    steps.push([500, () => put({ strips: [{ kind: "unequal", ring: true }] })]);
    steps.push([500, () => put({ strips: [{ kind: "unequal", ring: true }, tbCut(1, { hi: [0] })] })]);
    steps.push([300, () => put({ strips: tbUnequalEnd() })]);
  } else if (k === "shade" || k === "fracdec") {
    const typedN = Math.floor(Number(slotPartsOf(v, 2)[0]) || 0);
    const u = typedN >= 1 && typedN <= 9 ? typedN : 0;
    const thin = Array.from({ length: u }, (_, j) => j === 0 ? { kind: "thin", note: { text: u === 1 ? "whole" : "wholes", num: u } } : { kind: "thin" });
    const hi = Array.from({ length: M.t }, (_, j) => j);
    const frac = { show: true, a: M.t, b: 10, role: "given" };
    steps.push([450, () => put({ strips: [...thin, tbCut(M.t, { hi })], frac })]);
    for (let j = 1; j <= M.t; j++) steps.push([220, () => put({ strips: [...thin, tbCut(M.t, { hi, nums: tbNums(j) })], frac })]);
    steps.push([450, () => put({ strips: [...thin, tbCut(M.t, { hi, nums: tbNums(M.t) })], frac, dec: { show: true, w: 0, t: M.t, role: "work" } })]);
    steps.push([300, () => put({ strips: [...thin, tbCut(M.t, { hi, nums: tbNums(M.t) })], frac, dec: { show: true, w: 0, t: M.t, role: "result" } })]);
  } else if (k === "decfrac") {
    steps.push([350, () => put({ strips: [tbCut(M.t)] })]);
    for (let j = 1; j <= M.t; j++) steps.push([220, () => put({ strips: [tbCut(M.t, { nums: tbNums(j) })] })]);
    steps.push([450, () => put({ strips: [tbCut(M.t, { nums: tbNums(M.t) })], frac: { show: true, a: M.t, b: 10, role: "work" } })]);
    steps.push([300, () => put({ strips: [tbCut(M.t, { nums: tbNums(M.t) })], frac: { show: true, a: M.t, b: 10, role: "result" } })]);
  } else if (k === "mixed" || k === "split") {
    const end = k === "split" ? "given" : "result";
    steps.push([350, () => put({ strips: [...tbWholes(M.w), tbCut(M.t)], labels: "hi" })]);
    for (let j = 1; j <= M.w; j++) steps.push([280, () => put({ strips: [...tbWholes(M.w, j), tbCut(M.t)], labels: "hi" })]);
    steps.push([400, () => put({ strips: [...tbWholes(M.w, M.w), tbCut(M.t)], labels: "hi", dec: { show: true, w: M.w, t: null, role: k === "split" ? "given" : "work" } })]);
    for (let j = 1; j <= M.t; j++) steps.push([200, () => put({ strips: [...tbWholes(M.w, M.w), tbCut(M.t, { nums: tbNums(j) })], labels: "hi", dec: { show: true, w: M.w, t: null, role: k === "split" ? "given" : "work" } })]);
    steps.push([400, () => put({ strips: [...tbWholes(M.w, M.w), tbCut(M.t, { nums: tbNums(M.t) })], labels: "hi", dec: { show: true, w: M.w, t: M.t, role: k === "split" ? "given" : "work" } })]);
    steps.push([300, () => put({
      strips: [...tbWholes(M.w, M.w), tbCut(M.t, { nums: tbNums(M.t) })],
      labels: "hi",
      dec: { show: true, w: M.w, t: M.t, role: end },
      frac: { show: true, w: M.w, a: M.t, b: 10, role: "given" }
    })]);
  } else if (k === "lots" || k === "loose") {
    const view = (w, loose, flash) => [...tbWholes(w), ...tbChunks(loose).map((c, j) => tbCut(c, j === 0 && flash ? { flash: true } : {}))];
    steps.push([450, () => put({ strips: view(0, M.tot, false), tally: M.tot })]);
    for (let w = 1; w <= M.w; w++) {
      const before = w - 1, left = M.tot - 10 * before;
      steps.push([650, () => put({ strips: view(before, left, true), tally: M.tot, dec: before ? { show: true, w: before, t: null, role: "work" } : void 0 })]);
      steps.push([300, () => put({ strips: view(w, left - 10, false), tally: M.tot, dec: { show: true, w, t: null, role: "work" } })]);
    }
    steps.push([450, () => put({ strips: view(M.w, M.t, false), tally: M.tot, dec: { show: true, w: M.w, t: M.t, role: "work" } })]);
    steps.push([300, () => put({
      strips: view(M.w, M.t, false),
      tally: M.tot,
      dec: { show: true, w: M.w, t: M.t, role: "result" },
      frac: { show: true, a: M.tot, b: 10, role: "given" }
    })]);
  }
  return steps;
}
function tbPlace(specs, avail, cell = 96) {
  const nThin = specs.filter((q) => q.kind === "thin").length, nNorm = specs.length - nThin;
  const noted = specs.some((q) => q.note) ? 40 : 0;
  const gT = 6, hT = 22, gN = nNorm <= 2 ? noted ? 60 : 20 : nNorm <= 4 ? 12 : 8;
  const thinAll = nThin ? nThin * hT + (nThin - 1) * gT + (nNorm ? 18 : 0) : 0;
  const cap = nNorm <= 2 ? Math.min(nThin ? 80 : 110, Math.max(72, Math.round(cell * 1.06))) : nNorm <= 4 ? 64 : 44;
  const hN = nNorm ? Math.min(cap, Math.floor((avail - noted - thinAll - (nNorm - 1) * gN) / nNorm)) : 0;
  const total = noted + thinAll + nNorm * hN + Math.max(0, nNorm - 1) * gN;
  let y = TB_TOP + Math.max(0, (avail - total) / 2) + noted;
  return specs.map((q, j) => {
    const thin = q.kind === "thin", h = thin ? hT : hN, r = { y, h };
    const next = specs[j + 1];
    y += h + (thin ? next && next.kind !== "thin" ? 18 : gT : gN);
    return r;
  });
}
const TB_RUNS = { on: false, set: null };
function TbRuns() {
  return null;
}
function TbSlice({ j, cx, cy, r, enabled, onPress }) {
  const p = usePress(onPress, enabled);
  const pt = (deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
  const [x1, y1] = pt(-90 + 36 * j), [x2, y2] = pt(-90 + 36 * (j + 1));
  return <path
    {...control("slice-" + (j + 1), "Shade or clear slice " + (j + 1))}
    className="c4-hit"
    {...p.bind()}
    onKeyDown={p.keys}
    d={`M ${cx.toFixed(1)} ${cy.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`}
    fill="transparent"
  />;
}
function Work({ phase, n, item, index, stage, wrong, typed, part, answerOn, cardKind, api, MODEL: MODEL2, box, step, stepOn, lang = "en", tx = (v) => v }) {
  const C = api.C;
  const tl = useTimeline();
  const act = useTimeline();
  const [s, setS] = useState(() => stage === "free" ? tbFree() : tbSetup(item, stage !== "teach" && stage !== "demo"));
  const [demo, setDemo] = useState(null);
  const [anim, setAnim] = useState({});
  const [veil, setVeil] = useState(1);
  const prevStage = useRef(stage);
  const staleTyped = useRef(null);
  const closing = !!anim.knife || !!anim.trade || !!(demo && demo.strips && demo.strips.some((q) => q.flash));
  const sl = useSlide(closing ? 0 : 1);
  const L = tbLay(box && box.w ? box.w : BOARD_OPEN_W);
  const k = stage === "free" ? "free" : item.kind;
  const free = stage === "free";
  const won = !free && (stage === "win" || stage === "idle");
  const live = stage === "teach" || stage === "demo" || stage === "ask" || free;
  const busy = tl.busy || act.busy;
  const M = tbModel(item);
  const sayWin = (q) => {
    if (q === "M1.S1.T2.C4:1") api.say("Yes, 1/10: one part out of ten.");
    else if (q === "M1.S1.T2.C4:TB1") api.say("Yes, 0.1: the 0 before the point means no whole strips.");
    else if (q === null) api.say("Right, unequal parts are not tenths.");
    else if (q === "M1.S1.T2.C5:TB2") api.say("Yes, 0.8: eight of the ten parts are shaded.");
    else if (q === "M1.S1.T2.C5:2") api.say("Right, 9 tenths and 0.9 are the same amount.");
    else if (q === "M1.S1.T2.C5:3") api.say("Yes, zero point eight means 8 tenths.");
    else if (q === "M1.S1.T2.C6:TB3") api.say("Yes, 2.9: the point sits between wholes and tenths.");
    else if (q === "M1.S1.T2.C6:4") api.say("Yes, 5.1: five wholes, then one tenth.");
    else if (q === "M1.S1.T2.C6:5") api.say("Yes: whole number part 7, decimal part 9.");
    else if (q === "M1.S1.T2.C7:TB4") api.say("Yes, 2.7: two wholes and seven tenths.");
    else if (q === "M1.S1.T2.C7:6") api.say("That is 5.3: five wholes, three tenths left.");
    else if (q === "M1.S1.T2.C7:7") api.say("Yes, 2.4: twenty tenths traded, four left.");
  };
  useEffect(() => {
    staleTyped.current = null;
    setS(stage === "free" ? tbFree() : tbSetup(item, stage !== "teach" && stage !== "demo"));
    setDemo(null);
    setAnim({});
    setVeil(1);
  }, [index]);
  useEffect(() => {
    const was = prevStage.current;
    prevStage.current = stage;
    if (stage === "free") {
      tl.stop();
      act.stop();
      setDemo(null);
      setAnim({});
      setVeil(1);
      setS(tbFree());
      api.lock(false);
    } else if (stage === "ask" && (was === "teach" || was === "demo") && (phase.steps ? !phase.steps.some((st) => st.on === "cut") : phase.teachLive)) {
      act.stop();
      tl.stop();
      setS(tbSetup(item));
      setDemo(null);
      setAnim({});
      api.sfx.tick();
      if (!reducedMotion()) act.run([[60, () => setVeil(0.35)], [70, () => setVeil(0.65)], [70, () => setVeil(0.9)]], () => setVeil(1));
    } else if (stage === "ask" && (was === "teach" || was === "demo") && item.kind === "name") setS((o) => o.cut ? o : { ...o, cut: true, whole: false });
    else if (stage === "win") {
      tl.stop();
      act.stop();
      setDemo(null);
      setAnim({});
      setVeil(1);
      api.lock(false);
      sayWin(item.qid);
    }
  }, [stage]);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    staleTyped.current = wrong.value;
    api.lock(true);
    act.stop();
    setAnim({});
    setVeil(1);
    tl.run(tbTrace(item, wrong.value, setDemo), () => api.lock(false));
  }, [wrong]);
  useEffect(() => {
    if (!demo || staleTyped.current === null || stage !== "ask" || tl.busy) return;
    if (String(typed) === String(staleTyped.current)) return;
    if (demo.frac === void 0 && demo.dec === void 0) return;
    setDemo((d) => d ? { ...d, frac: void 0, dec: void 0 } : d);
  }, [typed]);
  const count = tbCount(s.cells);
  const can = live && !busy;
  const report = (name) => {
    if (stage === "demo") api.did(name);
  };
  const doCut = () => {
    if (!can || s.cut) return;
    setDemo(null);
    api.sfx.tick();
    const steps = Array.from({ length: 9 }, (_, j) => [160, () => {
      setAnim({ knife: j + 1 });
      api.sfx.cut();
    }]);
    steps.push([160, () => setAnim({ knife: 9, lift: true })]);
    steps.push([400, () => {
      setS((o) => ({ ...o, cut: true, cells: o.whole ? tbPack(10) : o.cells, whole: false }));
      setAnim({ settle: true });
    }]);
    act.run(steps, () => {
      setAnim({});
      api.sfx.settle();
    });
    report("cut");
  };
  const doTap = (j) => {
    if (!can) return;
    setDemo(null);
    api.sfx.tick();
    setS((o) => {
      if (!o.cut) return { ...o, whole: !o.whole };
      const c = o.cells.slice();
      c[j] = !c[j];
      return { ...o, cells: c };
    });
    report(s.cut && s.cells[j] ? "clear" : "shade");
  };
  const doShape = () => {
    if (!can || !s.cut) return;
    setDemo(null);
    api.sfx.tick();
    setS((o) => ({ ...o, shape: o.shape === "strip" ? "circle" : "strip" }));
    report("shape");
  };
  const doLots = () => {
    if (!can || k !== "lots" || s.lots >= item.lots) return;
    setDemo(null);
    api.sfx.tick();
    setS((o) => ({ ...o, lots: o.lots + 1, cells: tbPack(tbCount(o.cells) + item.lot) }));
    report("lots");
  };
  const canTrade = count >= 10 && (!free || s.wholes < 9);
  const doTrade = () => {
    if (!can || !canTrade) return;
    setDemo(null);
    api.sfx.tick();
    setS((o) => ({ ...o, cells: tbPack(tbCount(o.cells)), shape: "strip" }));
    act.run([[650, () => setAnim({ trade: true })]], () => {
      setAnim({});
      api.sfx.trade();
      setS((o) => free ? { ...o, wholes: o.wholes + 1, cut: false, cells: tbPack(0), shape: "strip" } : { ...o, wholes: o.wholes + 1, cells: tbPack(tbCount(o.cells) - 10) });
    });
    report("trade");
  };
  const stepAct = (on) => {
    if (on === "cut") doCut();
    else if (on === "trade") doTrade();
    else if (on === "lots") doLots();
    else if (on === "shade" && s.cut) {
      const j = s.cells.indexOf(false);
      doTap(j < 0 ? 0 : j);
    }
  };
  api.onEnter(stage === "demo" && stepOn ? () => stepAct(stepOn) : null);
  const tallyOwn = s.wholes * 10 + (s.cut ? count : s.whole ? 10 : 0);
  const partStrips = Math.max(1, Math.ceil(s.cells.length / 10));
  api.share({ cut: s.cut, shape: s.shape, wholes: s.wholes, shaded: count, strips: s.wholes + partStrips, lots: s.lots, tenths: tallyOwn });
  const phase1 = n === 1 && (k === "name" || k === "dec1");
  const hasCut = free || phase1;
  const hasShape = false;
  const hasLots = !free && k === "lots";
  const hasTrade = free || k === "lots" || k === "loose";
  const anyBtn = free || phase1 || hasLots || hasTrade;
  const avail = anyBtn ? 416 : 504;
  const boardH = avail + 2 * TB_TOP;
  const bScale = 1 + 0.1 * L.t, bGap = Math.round(24 + 40 * L.t);
  const BW = { cut: Math.round(180 * bScale), shape: Math.round(200 * bScale), trade: Math.round(200 * bScale), lots: Math.round(240 * bScale), count: 120 };
  const footRow = free ? ["cut", "trade"] : phase1 ? ["cut"] : hasLots ? ["lots", "count", "trade"] : hasTrade ? ["trade"] : [];
  const footW = footRow.reduce((a, id) => a + BW[id], 0) + Math.max(0, footRow.length - 1) * bGap;
  const BX = {};
  footRow.reduce((x, id) => {
    BX[id] = Math.round(x);
    return x + BW[id] + bGap;
  }, Math.max(0, (L.boardW - footW) / 2));
  const ownSpecs = () => {
    if (!free && k === "unequal") return [{ kind: "unequal" }];
    if (!s.cut) return [...tbWholes(s.wholes), { kind: "uncut", on: s.whole }];
    const parts = [];
    for (let j = 0; j < s.cells.length; j += 10) parts.push({ kind: "cut", cells: s.cells.slice(j, j + 10), own: true, flash: !!anim.trade && j === 0 });
    return [...tbWholes(s.wholes), ...parts];
  };
  const winSpecs = () => k === "unequal" ? tbUnequalEnd() : [...tbWholes(M.w), tbCut(M.t)];
  const specs = demo && demo.strips ? demo.strips : won ? winSpecs() : ownSpecs();
  const showCircle = !demo && !won && s.cut && s.shape === "circle" && s.wholes === 0 && s.cells.length === 10 && k !== "unequal";
  const place = tbPlace(specs, avail, L.cell);
  const skinsOn = stage !== "summary";
  const bare = !showCircle && specs.length === 0;
  const CX = bare ? Math.round((box && box.w || BOARD_OPEN_W) / 2 - L.cw / 2) : L.cx;
  const nothing = !s.wholes && !s.whole && (!s.cut || count === 0);
  const liveFrac = nothing ? { show: false } : n === 4 && !free ? { show: true, a: tallyOwn, b: 10, role: "given" } : s.wholes && count === 0 && !s.whole ? { show: true, w: s.wholes, a: null, b: 10, role: "given" } : { show: true, w: s.wholes || void 0, a: s.cut ? count : s.whole ? 10 : 0, b: 10, role: "given" };
  const liveDec = nothing ? { show: false } : { show: true, w: Math.floor(tallyOwn / 10), t: tallyOwn % 10, role: "given" };
  const modeCard = (which) => {
    const mode = free ? "live" : (stage === "teach" || stage === "demo") && phase.teachLive ? "live" : (TB_SHOW[k] || ["off", "off"])[which];
    if (won) {
      if (k === "unequal") return { show: false };
      const asked = (TB_SHOW[k] || []).indexOf("ask"), nx = phase.items && phase.items[index + 1];
      if (which !== asked && nx && nx.kind && (TB_SHOW[nx.kind] || []).indexOf("ask") === which) {
        const nm = tbModel(nx);
        if (nm.w === M.w && nm.t === M.t) return { show: false };
      }
      const role = (TB_SHOW[k] || [])[which] === "ask" ? "result" : "given";
      return which === 0 ? { show: true, w: n === 3 ? M.w : void 0, a: n === 4 ? M.tot : M.t, b: 10, role } : { show: true, w: M.w, t: M.t, role };
    }
    if (mode === "ask") return { show: false, ask: stage === "ask" };
    if (mode === "off") return { show: false };
    if (mode === "whole") return s.whole && !s.cut ? { show: true, w: 1, t: 0, role: "given" } : { show: false };
    if (mode === "given") return which === 0 ? { show: true, a: item.tenths, b: 10, role: "given" } : { show: true, w: M.w, t: M.t, role: "given" };
    return which === 0 ? liveFrac : liveDec;
  };
  let frac = modeCard(0), dec = modeCard(1);
  if (demo && demo.frac !== void 0) frac = demo.frac;
  if (demo && demo.dec !== void 0) dec = demo.dec;
  const labelsOn = !(k === "split" && !won && !(demo && demo.labels));
  const labelsHi = !!(demo && demo.labels === "hi") || won && k === "split";
  const roleInk = (role) => role === "result" ? tbDeep(TB_GREEN) : role === "work" ? shade(TB_AMBER, 0.3) : tbDeep(TB_BLUE);
  const showTally = (free || n === 4) && stage !== "summary";
  const tally = demo && demo.tally !== void 0 ? demo.tally : won ? M.tot : tallyOwn;
  useEffect(() => {
    TB_RUNS.on = showTally;
    if (TB_RUNS.set) TB_RUNS.set(showTally);
  }, [showTally]);
  const noteText = (nt) => (nt.num !== void 0 ? nt.num + " " : "") + tx(nt.text);
  const stripG = (q, y, h, key) => {
    const x0 = L.x0, c = L.cell, len = L.len;
    const note = q.note ? tbChip(x0 + 2, y - 27, noteText(q.note), shade(TB_AMBER, 0.45), "start") : null;
    if (q.kind === "whole" || q.kind === "thin") {
      const yl = y - TB_LIFT;
      return <g key={key}>
          {note}
          {tbSlab(x0, y, len, h, TB_BLUE)}
          {q.ring && <rect x={x0 - 4} y={yl - 4} width={len + 8} height={h + 8} rx={12} fill="none" stroke={TB_AMBER} strokeWidth={5} />}
          {q.kind === "whole" && h >= 36 && tbChip(x0 + 12, yl + h / 2, tx("Whole"), tbDeep(TB_BLUE), "start", void 0, Math.min(38, h - 10))}
          {q.n && h >= 36 && tbChip(x0 + len - 12, yl + h / 2, q.n, tbDeep(TB_BLUE), "end", void 0, Math.min(38, h - 10))}
        </g>;
    }
    if (q.kind === "uncut") {
      const kn = anim.knife || 0, swapped = anim.lift ? 10 : kn;
      return <g key={key}>
          {tbSlab(x0, y, len, h, q.on ? TB_BLUE : null)}
          {Array.from({ length: swapped }, (_, j) => tbPiece(x0 + j * c, y, c, h, q.on ? TB_BLUE : null, "p" + j, skinsOn))}
          {Array.from({ length: kn }, (_, j) => <line key={"k" + j} x1={x0 + (j + 1) * c} y1={y - 3} x2={x0 + (j + 1) * c} y2={y + h + 3} stroke={TB_CUT} strokeWidth={3} strokeLinecap="round" />)}
          {kn > 0 && !anim.lift && tbKnife(x0 + kn * c, y, h)}
        </g>;
    }
    if (q.kind === "unequal") {
      const sc = len / 720;
      const xs = TB_UNEQUAL.reduce((a, wd, j) => [...a, j ? a[j - 1] + TB_UNEQUAL[j - 1] * sc : x0], []);
      const g2 = TB_GAP / 2;
      return <g key={key}>
          {note}
          {TB_UNEQUAL.map((wd, j) => tbPiece(xs[j] + g2, y, wd * sc - TB_GAP, h, j === 0 ? TB_BLUE : null, j, skinsOn))}
          {q.ring && <rect x={xs[0] + g2 - 5} y={y - TB_LIFT - 5} width={TB_UNEQUAL[0] * sc - TB_GAP + 10} height={h + 10} rx={12} fill="none" stroke={TB_AMBER} strokeWidth={6} />}
        </g>;
    }
    const ap = q.flash || q.own && anim.settle ? sl : 1;
    const ins = TB_GAP / 2 * ap, pw = c - 2 * ins;
    const hi = q.hi || [];
    const up = (j) => q.cells[j] ? TB_LIFT : 0;
    return <g key={key}>
        {note}
        {q.cells.map((on, j) => tbPiece(x0 + j * c + ins, y, pw, h, on ? TB_BLUE : null, j, skinsOn))}
        {hi.map((j) => <rect key={"h" + j} x={x0 + j * c + ins + 4} y={y + 4 - up(j)} width={pw - 8} height={h - 8} rx={6} fill="none" stroke={TB_AMBER} strokeWidth={5} />)}
        {q.nums && h >= 36 && q.nums.map((t, j) => t && tbChip(x0 + j * c + c / 2, y + h / 2 - up(j), t, q.cells[j] ? tbDeep(TB_BLUE) : TB_INK, "middle", "n" + j))}
        {q.flash && <g>
            {
      /* the brief: "each ten lights amber until it is traded" (amber, the tool's highlight colour; never a red cue) */
    }
            <rect x={x0 - 5} y={y - TB_LIFT - 5} width={len + 10} height={h + TB_LIFT + 10} rx={12} fill="none" stroke={TB_AMBER} strokeWidth={6} />
            <rect x={x0 + len / 2 - 70} y={y + h / 2 - 25} width={140} height={44} rx={22} fill={shade(TB_AMBER, 0.45)} />
            <text x={x0 + len / 2} y={y + h / 2 + 7} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("Trade")}</text>
          </g>}
      </g>;
  };
  const circ = { cx: L.x0 + L.len / 2, cy: TB_TOP + avail / 2, r: L.r };
  const circleG = () => {
    const { cx, cy, r } = circ;
    const pt = (deg, rr = r) => [cx + rr * Math.cos(deg * Math.PI / 180), cy + rr * Math.sin(deg * Math.PI / 180)];
    const sec = (j, rr = r) => {
      const [x1, y1] = pt(-90 + 36 * j, rr), [x2, y2] = pt(-90 + 36 * (j + 1), rr);
      return `M ${cx.toFixed(1)} ${cy.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${rr} ${rr} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
    };
    const cells = s.cells.slice(0, 10);
    return <g>
        <defs>{cells.map((_, j) => <clipPath key={j} id={"tbSec" + j}><path d={sec(j)} /></clipPath>)}</defs>
        <circle cx={cx} cy={cy} r={r} fill={TB_CAKE} filter="url(#fShadow)" />
        <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke={TB_CRUST} strokeWidth={16} />
        <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={tint(TB_CAKE, 0.25)} strokeWidth={10} strokeOpacity={0.6} />
        {skinsOn && cells.map((on, j) => !on && <Skin key={"s" + j} name="disc" x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip={`url(#tbSec${j})`} />)}
        {cells.map((on, j) => on && <g key={"t" + j}>
            <path d={sec(j)} fill={TB_BLUE} fillOpacity={TB_TINT} />
            <path d={sec(j, r - 7)} fill="none" stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={2.5} strokeLinejoin="round" />
          </g>)}
        {cells.map((_, j) => {
      const [x1, y1] = pt(-90 + 36 * j);
      return <line key={"c" + j} x1={cx} y1={cy} x2={x1} y2={y1} stroke={TB_CUT} strokeWidth={2.5} strokeLinecap="round" />;
    })}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={TB_CAKE_RIM} strokeWidth={3} />
      </g>;
  };
  const wood = mix(mix(C.panel, C.rule, 0.3), TB_AMBER, 0.07);
  const thinN = specs.filter((q) => q.kind === "thin").length;
  const half = !showCircle && thinN > 0 ? (() => {
    const unit = (L.len - 12) / 2, rows = Math.ceil(thinN / 2), bh = 44, gp = 12;
    const total = 40 + rows * bh + (rows - 1) * gp + 18 + bh;
    const y0 = TB_TOP + Math.max(0, (avail - total) / 2) + 40, ys = y0 + rows * (bh + gp) - gp + 18;
    return { unit, rows, bh, gp, y0, ys, top: y0 - 46 - TB_LIFT, bot: ys + bh };
  })() : null;
  const halfG = () => {
    const { unit, rows, bh, gp, y0, ys } = half;
    const thin = specs.filter((q) => q.kind === "thin"), cut = specs.find((q) => q.kind === "cut");
    const c = unit / 10, ins = 3, up = (_j) => 0;
    return <g>
        {thin[0] && thin[0].note && tbChip(L.x0 + 2, y0 - 27, noteText(thin[0].note), shade(TB_AMBER, 0.45), "start")}
        {thin.map((_, i) => {
      const col = i < rows ? 0 : 1, row = col ? i - rows : i;
      return tbSlab(L.x0 + col * (unit + gp), y0 + row * (bh + gp), unit, bh, TB_BLUE, "w" + i, "tbChocG", false);
    })}
        {cut && cut.cells.map((on, j) => tbPiece(L.x0 + j * c + ins, ys, c - 2 * ins, bh, on ? TB_BLUE : null, "c" + j, skinsOn, false))}
        {cut && (cut.hi || []).map((j) => <rect key={"h" + j} x={L.x0 + j * c + ins + 2} y={ys + 2 - up(j)} width={c - 2 * ins - 4} height={bh - 4} rx={5} fill="none" stroke={TB_AMBER} strokeWidth={4} />)}
        {cut && cut.nums && cut.nums.map((t, j) => t && tbChip(L.x0 + j * c + c / 2, ys + bh / 2 - up(j), t, cut.cells[j] ? tbDeep(TB_BLUE) : TB_INK, "middle", "n" + j))}
      </g>;
  };
  const boardG = () => {
    if (bare) return null;
    const top = showCircle ? circ.cy - circ.r : half ? half.top : Math.min(...specs.map((q, j) => place[j].y - (q.note ? 46 : 0) - TB_LIFT));
    const bot = showCircle ? circ.cy + circ.r : half ? half.bot : Math.max(...specs.map((_, j) => place[j].y + place[j].h));
    const by = Math.max(0, Math.round(top - TB_HUG)), bh = Math.min(boardH, Math.round(bot + TB_HUG)) - by;
    return <g>
        <rect x={0} y={by + 8} width={L.boardW} height={bh} rx={26} fill={shade(wood, 0.16)} filter="url(#fShadow)" />
        <rect x={0} y={by} width={L.boardW} height={bh} rx={26} fill={wood} stroke={shade(C.rule, 0.1)} strokeWidth={2} />
        <rect x={7} y={by + 7} width={L.boardW - 14} height={bh - 14} rx={20} fill="none" stroke={tint(wood, 0.5)} strokeWidth={3} />
        {[0.2, 0.5, 0.8].map((f, j) => {
      const gy = by + bh * f;
      return <path
        key={j}
        d={`M 30 ${gy.toFixed(1)} C ${(L.boardW * 0.3).toFixed(1)} ${(gy - 12).toFixed(1)} ${(L.boardW * 0.62).toFixed(1)} ${(gy + 14).toFixed(1)} ${(L.boardW - 30).toFixed(1)} ${(gy + 2).toFixed(1)}`}
        fill="none"
        stroke={shade(wood, 0.08)}
        strokeWidth={2}
        strokeLinecap="round"
      />;
    })}
      </g>;
  };
  const cardWhich = cardKind === "fraction" ? 0 : cardKind === "decimal" ? 1 : -1;
  const asking = stage === "ask" && cardWhich >= 0;
  const cardOpen = asking && !!(box && box.open);
  const tv = slotPartsOf(typed, 2);
  const showTyped = asking && String(typed || "") !== "" && !(demo && staleTyped.current !== null && String(typed) === String(staleTyped.current));
  const typedLen = Math.max(String(tv[0] || "").length, String(tv[1] || "").length);
  const boxSize = (which, w) => (which === 0 ? [T.xl, T.speech, T.prompt, T.label, T.micro] : [T.display, T.xl, T.speech, T.prompt, T.label]).find((sz) => typedLen * sz * 0.58 <= w - 12) || T.micro;
  const aBox = (which, j, x, y, w, h, ask) => {
    const mine = asking && which === cardWhich;
    const val = mine && showTyped ? String(tv[j] || "") : "";
    const on = mine && cardOpen && part === j && !busy;
    const size = boxSize(which, w);
    return <g key={"ab" + which + j}>
        <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={10}
      fill={on ? tint(TB_AMBER, 0.88) : "none"}
      stroke={mine && cardOpen ? on ? shade(TB_AMBER, 0.15) : TB_AMBER : ask ? TB_AMBER : C.rule}
      strokeWidth={on ? 5 : 3}
      strokeDasharray={mine && cardOpen ? void 0 : "8 7"}
    />
        {val && <text x={x + w / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={TB_INK}>{val}</text>}
        {on && <rect className="c4-caret" x={x + w / 2 + val.length * size * 0.29 + 5} y={y + h / 2 - size * 0.4} width={3} height={size * 0.8} rx={1.5} fill={C.accent} />}
      </g>;
  };
  const cardHits = (x, y, w, h, halves) => {
    if (!asking || busy) return null;
    if (!cardOpen) {
      if (!cardReadyNow) return null;
      return <g>
          <SlotPartBox id="answer-open" label={tx(cardWhich === 0 ? "Fraction" : "Decimal") + " card"} x={x} y={y} w={w} h={h} on={false} enabled onPick={() => api.openAnswer && api.openAnswer()} />
          <BlinkRing x={x} y={y} w={w} h={h} rx={18} C={C} sw={5} m={4} />
        </g>;
    }
    return <g>
        {halves.map((r, j) => <SlotPartBox key={j} id={"part-" + (j + 1)} label={item.parts[j].label + " box"} x={r.x} y={r.y} w={r.w} h={r.h} on={part === j} enabled onPick={() => api.pickPart && api.pickPart(j)} />)}
      </g>;
  };
  const fracCard = () => {
    const X = CX, fx = X + Math.round(L.cw * 0.62), ask = !!frac.ask;
    const col = roleInk(frac.role);
    return <g>
        <rect x={X} y={8} width={L.cw} height={192} rx={18} fill="#FFFFFF" stroke={ask ? TB_AMBER : C.rule} strokeWidth={ask ? 4 : 2} filter="url(#fShadowSoft)" />
        <text x={X + 20} y={44} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Fraction")}</text>
        {frac.show && frac.a === null ? (
      /* wholes and no tenth shaded yet: just the whole number */
      <text x={X + L.cw / 2} y={142} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={col}>{String(frac.w)}</text>
    ) : frac.show ? <g>
            {frac.w ? <text x={fx - 104} y={142} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={col}>{frac.w + " +"}</text> : null}
            <text x={fx} y={104} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={col}>{String(frac.a)}</text>
            <line x1={fx - 48} y1={122} x2={fx + 48} y2={122} stroke={TB_INK} strokeWidth={5} strokeLinecap="round" />
            <text x={fx} y={180} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={col}>{String(frac.b)}</text>
          </g> : <g>
            {aBox(0, 0, fx - 42, 56, 84, 56, ask)}
            <line x1={fx - 48} y1={122} x2={fx + 48} y2={122} stroke={TB_INK} strokeWidth={5} strokeLinecap="round" />
            {aBox(0, 1, fx - 42, 132, 84, 56, ask)}
          </g>}
        {cardWhich === 0 && cardHits(X, 8, L.cw, 192, [{ x: X, y: 8, w: L.cw, h: 114 }, { x: X, y: 122, w: L.cw, h: 78 }])}
      </g>;
  };
  const decCard = () => {
    const sp = Math.round(60 + 16 * L.t), px = Math.round(CX + L.cw / 2 + 4), wx = px - sp, tx2 = px + sp, base = 348;
    const lab0 = lang === "en" ? 398 : 392, labH = lang === "en" ? 30 : 36;
    const ask = !!dec.ask;
    const col = roleInk(dec.role);
    const box2 = (x) => <rect x={x - 34} y={278} width={68} height={82} rx={10} fill="none" stroke={ask ? TB_AMBER : C.rule} strokeWidth={3} strokeDasharray="8 7" />;
    const abox = (j, x) => aBox(1, j, x - 42, 282, 84, 80, ask);
    const labelInk = labelsHi ? shade(TB_AMBER, 0.45) : shade(C.accent, 0.2);
    return <g>
        <rect x={CX} y={216} width={L.cw} height={264} rx={18} fill="#FFFFFF" stroke={ask ? TB_AMBER : C.rule} strokeWidth={ask ? 4 : 2} filter="url(#fShadowSoft)" />
        <text x={CX + 20} y={252} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Decimal")}</text>
        {dec.show ? <g>
            <text y={base} textAnchor="middle" fontSize={T.display} fontWeight={700}>
              <tspan x={wx} fill={dec.w === 0 ? TB_GREY : col}>{String(dec.w)}</tspan>
              <tspan x={px} fill={TB_INK}>.</tspan>
              {dec.t !== null && dec.t !== void 0 && <tspan x={tx2} fill={dec.t === 0 ? TB_GREY : col}>{String(dec.t)}</tspan>}
            </text>
            {(dec.t === null || dec.t === void 0) && box2(tx2)}
          </g> : <g>
            {abox(0, wx)}
            <text x={px} y={base} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={TB_INK}>.</text>
            {abox(1, tx2)}
          </g>}
        <circle cx={px} cy={base - 7} r={8} fill={TB_INK} />
        {
      /* Hindi and Gujarati lines need more room than English at the same size (matras above and below) */
    }
        {labelsOn && wrapText(tx("Whole number part"), 7).map((l, j) => <text key={"w" + j} x={wx} y={lab0 + j * labH} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={labelInk}>{l}</text>)}
        {labelsOn && wrapText(tx("Decimal part"), 7).map((l, j) => <text key={"d" + j} x={tx2} y={lab0 + j * labH} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={labelInk}>{l}</text>)}
        {cardWhich === 1 && cardHits(CX, 216, L.cw, 264, [{ x: CX, y: 216, w: px - CX, h: 264 }, { x: px, y: 216, w: CX + L.cw - px, h: 264 }])}
      </g>;
  };
  const btn = (id, x, w, label, on, fn, aria) => <Key key={id} id={id} x={x} y={TB_BY} w={w} h={72} C={C} disabled={!on} onClick={fn} label={aria}>
      <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? C.ink : tint(C.ink, 0.34)}>{label}</text>
    </Key>;
  let invite = null;
  if (live && !busy && !demo) {
    if (stage === "demo" && stepOn) invite = stepOn === "cut" ? s.cut ? null : "cut" : stepOn === "trade" ? canTrade ? "trade" : null : stepOn === "lots" ? s.lots < item.lots ? "lots" : null : stepOn === "shade" ? "part" : null;
    else if (stage === "demo") invite = null;
    else if (hasCut && !s.cut) invite = "cut";
    else if (hasTrade && canTrade) invite = "trade";
    else if (hasLots && s.lots < item.lots) invite = "lots";
    else if (stage === "ask" && (k === "dec1" || k === "shade" || k === "mixed") && count < M.t) invite = "part";
  }
  const cardReadyNow = !invite && !busy;
  useEffect(() => {
    if (api.cardReady) api.cardReady(cardReadyNow, !!invite);
  }, [cardReadyNow, !!invite]);
  const tapRow = (() => {
    for (let j = specs.length - 1; j >= 0; j--) if (specs[j].kind === "cut" || specs[j].kind === "uncut") return j;
    return -1;
  })();
  const tappable = live && (free || n <= 3) && k !== "unequal" && !showCircle && !half && tapRow >= 0;
  const btnOn = live && !busy;
  const lotsNow = won || demo ? item.lots : s.lots;
  const hitY = tapRow >= 0 ? place[tapRow].y + place[tapRow].h / 2 - Math.max(72, place[tapRow].h) / 2 : 0;
  const hitH = tapRow >= 0 ? Math.max(72, place[tapRow].h) : 72;
  const pitch = L.cell;
  return <g>
      {showTally && <g data-zone="runs">
          <rect x={0} y={-92} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={22} y={-43} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Tenths")}</text>
          <text x={308} y={-38} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={tbDeep(TB_BLUE)}>{String(tally)}</text>
        </g>}
      <defs>{tbSlabGrad("tbChocG")}</defs>
      {
    /* the board, the bars and the cards are plain drawing (no data-control): a tap on them reaches the working area
       as an inert tap, which the runtime answers with the waiting step's hint (r41) */
  }
      <g opacity={veil < 1 ? veil : void 0}>
        {boardG()}
        {showCircle ? circleG() : half ? halfG() : specs.map((q, j) => stripG(q, place[j].y, place[j].h, j))}
      </g>
      <g opacity={veil < 1 ? veil : void 0}>
        {fracCard()}
        {decCard()}
      </g>
      {hasCut && btn("cut", BX.cut, BW.cut, tx("Cut"), btnOn && !s.cut, doCut, "Cut the strip into ten equal parts")}
      {hasShape && btn("shape", BX.shape, BW.shape, tx("Shape"), btnOn && s.cut && s.wholes === 0 && s.cells.length === 10, doShape, "Show the whole as a strip or a circle")}
      {hasLots && btn("lots", BX.lots, BW.lots, item.lot === 9 ? tx("Lots of 9") : tx("Lots of 6"), btnOn && s.lots < item.lots, doLots, "Add " + item.lot + " more tenths")}
      {hasTrade && btn("trade", BX.trade, BW.trade, tx("Trade"), btnOn && canTrade, doTrade, "Trade ten tenths for one whole")}
      {hasLots && <text x={BX.count + BW.count / 2} y={TB_BY + 47} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{lotsNow + " " + tx(lotsNow === 1 ? "lot" : "lots")}</text>}
      {tappable && specs[tapRow].kind === "uncut" && <Hit id="strip" x={L.x0} y={hitY} w={L.len} h={hitH} onPress={() => doTap(0)} label="Shade the whole strip" enabled={!busy} />}
      {tappable && specs[tapRow].kind === "cut" && Array.from({ length: 10 }).map((_, j) => <Hit
    key={j}
    id={"tenth-" + (j + 1)}
    x={L.x0 + j * pitch}
    y={hitY}
    w={pitch}
    h={hitH}
    onPress={() => doTap(j)}
    label={"Shade or clear tenth " + (j + 1)}
    enabled={!busy}
  />)}
      {
    /* the cake: each slice is its own control; a tap shades THAT slice, a second tap clears it */
  }
      {live && showCircle && Array.from({ length: 10 }).map((_, j) => <TbSlice key={j} j={j} cx={circ.cx} cy={circ.cy} r={circ.r} enabled={can && s.cut} onPress={() => doTap(j)} />)}
      {
    /* the one pulse (Invite's own class), drawn round the button so it never crosses its label */
  }
      {invite && invite !== "part" && BX[invite] !== void 0 && <rect
    className="c4-pulse"
    x={BX[invite] - 7}
    y={TB_BY - 7}
    width={BW[invite] + 14}
    height={86}
    rx={RAD.key + 6}
    fill="none"
    stroke={C.accent}
    strokeWidth={5}
    pointerEvents="none"
  />}
      {
    /* a shading step: the pulse goes round the next part to tap */
  }
      {invite === "part" && tappable && specs[tapRow].kind === "cut" && (() => {
    const j = specs[tapRow].cells.indexOf(false);
    if (j < 0) return null;
    const p = place[tapRow];
    return <rect
      className="c4-pulse"
      x={L.x0 + j * L.cell - 3}
      y={p.y - 7}
      width={L.cell + 6}
      height={p.h + 14}
      rx={RAD.key}
      fill="none"
      stroke={C.accent}
      strokeWidth={5}
      pointerEvents="none"
    />;
  })()}
    </g>;
}
function Thumb({ result, C, w, h, n, lang = "en", tx = (v) => v }) {
  const L = result && result.last;
  if (!L) return null;
  const ph = PHASES[(n || 1) - 1];
  const it = ph && ph.items[n === 1 ? 0 : L.item];
  if (!it) return null;
  const M = tbModel(it);
  const ink = tbDeep(TB_GREEN);
  const bh = 5, bg = 2, top = M.w ? M.w * (bh + bg) + 2 : 0;
  const y0 = Math.round(h / 2 - (top + 22) / 2);
  let x = 10;
  return <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {it.kind === "unequal" ? <g>{TB_UNEQUAL.map((wd, j) => {
    const ww = wd / 720 * 120;
    const r = <rect key={j} x={x} y={h / 2 - 12} width={ww - 1.5} height={24} rx={2} fill={j === 0 ? TB_BLUE : TB_CHOC} stroke={TB_CHOC_RIM} strokeWidth={1.2} />;
    x += ww;
    return r;
  })}</g> : <g>
          {Array.from({ length: M.w }).map((_, j) => <rect key={"w" + j} x={10} y={y0 + j * (bh + bg)} width={118.5} height={bh} rx={2} fill={TB_BLUE} />)}
          {Array.from({ length: 10 }).map((_, j) => <rect key={j} x={10 + j * 12} y={y0 + top} width={10.5} height={22} rx={2} fill={j < M.t ? TB_BLUE : TB_CHOC} stroke={TB_CHOC_RIM} strokeWidth={1.2} />)}
        </g>}
      {it.parts === SLOT_FRACTION ? <g>
          <text x={w - 40} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(it.answer[0])}</text>
          <line x1={w - 62} y1={h / 2} x2={w - 18} y2={h / 2} stroke={TB_INK} strokeWidth={3} />
          <text x={w - 40} y={h / 2 + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(it.answer[1])}</text>
        </g> : <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ink}>
          {it.choices ? tx("No") : Array.isArray(it.answer) ? it.answer[0] + "." + it.answer[1] : String(it.answer)}
        </text>}
    </g>;
}
function TbStartArt({ C }) {
  const wood = mix(mix(C.panel, C.rule, 0.3), TB_AMBER, 0.07);
  return <g>
      <defs>{tbSlabGrad("tbChocGS")}</defs>
      {
    /* the cutting board: its edge, its face, a soft inner rim, the grain, a hanging hole */
  }
      <rect x={40} y={46} width={970} height={270} rx={36} fill={shade(wood, 0.16)} filter="url(#fShadow)" />
      <rect x={40} y={36} width={970} height={270} rx={36} fill={wood} stroke={shade(C.rule, 0.1)} strokeWidth={2} />
      <rect x={50} y={46} width={950} height={250} rx={28} fill="none" stroke={tint(wood, 0.5)} strokeWidth={3} />
      {[86, 171, 258].map((gy, j) => <path key={j} d={`M 76 ${gy} C 330 ${gy - 16} 640 ${gy + 18} 974 ${gy + 2}`} fill="none" stroke={shade(wood, 0.08)} strokeWidth={2.5} strokeLinecap="round" />)}
      <circle cx={972} cy={74} r={13} fill={C.paper} stroke={shade(wood, 0.2)} strokeWidth={3} />
      {
    /* the whole bar, one slab, with a soft shadow */
  }
      <g filter="url(#fShadowSoft)">{tbSlab(95, 113, 860, 116, null, "slab", "tbChocGS")}</g>
      {
    /* the knife, resting beside the board */
  }
      <g transform="translate(1110,180) rotate(-58)" filter="url(#fShadowSoft)">
        <rect x={0} y={-17} width={104} height={34} rx={14} fill="#4A3426" stroke={TB_INK} strokeWidth={2} />
        <circle cx={30} cy={0} r={4.5} fill="#D9C8A8" />
        <circle cx={74} cy={0} r={4.5} fill="#D9C8A8" />
        <rect x={-14} y={-20} width={16} height={40} rx={4} fill="#A9B1B8" stroke={TB_INK} strokeWidth={2} />
        <path d="M -14 -16 L -170 -16 Q -186 -14 -184 2 L -150 14 L -14 14 Z" fill="#E4E9ED" stroke={TB_INK} strokeWidth={2} strokeLinejoin="round" />
        <path d="M -22 -9 L -160 -9" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
      </g>
    </g>;
}
const START_HOOK = "One chocolate bar. Can you cut it so everyone gets the same?";
function TenthsBuilder(props) {
  const [runsOn, setRunsOn] = useState(() => {
    TB_RUNS.on = false;
    return false;
  });
  useEffect(() => {
    TB_RUNS.set = setRunsOn;
    setRunsOn(TB_RUNS.on);
    return () => {
      TB_RUNS.set = null;
    };
  }, []);
  return <ToolFrame props={props} tool={{
    TOOL_ID,
    MEDIA_ID,
    TOOL_NAME,
    CHROME,
    VOICE,
    OPENING,
    FINISH_LINE,
    FREE_LINE,
    TR,
    freePlay: true,
    sideBySide: true,
    board: true,
    nextKey: true,
    cardAnswer: true,
    StartArt: TbStartArt,
    START_HOOK,
    Runs: runsOn ? TbRuns : void 0,
    Thumb,
    PHASES,
    MODEL,
    Work,
    judge,
    oracle,
    nearMiss,
    answerForms,
    agentKey,
    solve,
    answer,
    check,
    format: tbFormat,
    winMs: 3e3,
    fitHost: () => null
  }} />;
}
var stdin_default = TenthsBuilder;
export default stdin_default;
