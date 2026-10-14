import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
/* M2.S4.T7.C24.2D1 · scale_bench · Scale Bench — standalone build 2026-10-14, source 46ff89e6:395610.
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
const ZBOARD_BIG = {
  slot: { x: 996, y: 218, w: 524, h: 92 },
  pad: { x: 996, y: 324, w: 524, h: 390 },
  drawer: { x: 980, y: 202, w: 556, h: 528 }
};
const BOARD_OPEN_W_BIG = 900;
let BOARD = false;
let BIGPAD = false;
function setLayout(board, big = false) {
  const src = board ? ZBOARD : ZCLASSIC;
  for (const k of Object.keys(src)) {
    if (!Z[k]) Z[k] = {};
    Object.assign(Z[k], src[k]);
  }
  if (board && big) for (const k of Object.keys(ZBOARD_BIG)) Object.assign(Z[k], ZBOARD_BIG[k]);
  BOARD = board;
  BIGPAD = !!(board && big);
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
      {
    /* the header's three buttons (head of 2026-10-13, the owner's picture): a cream disc on a tan bevelled rim, a bulb, a speaker, a refresh arrow */
  }
      {g("hcRim", "#E6D5B3", "#BFA37A")}
      {g("hcBulb", "#FFE56B", "#F2A100")}
      {g("hcBase", "#8A90B0", "#5A5F80")}
      <radialGradient id="hcFace" cx="38%" cy="30%" r="80%">
        <stop offset="0" stopColor="#FFFEF9" /><stop offset="0.55" stopColor="#F8EDD6" /><stop offset="1" stopColor="#EBD9B8" />
      </radialGradient>
      <linearGradient id="hcSpk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7CC4FF" /><stop offset="1" stopColor="#2E78D6" /></linearGradient>
      <linearGradient id="hcWave" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFD24D" /><stop offset="1" stopColor="#F08A00" /></linearGradient>
      <linearGradient id="hcGrn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8EE07C" /><stop offset="1" stopColor="#2F9A41" /></linearGradient>
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
const DEFAULT_THEME = {
  key: ["#A45E3C", "#7A3F22", "#4E2410", "#FFF3DC"],
  enter: ["#E0408F", "#BE1F78", "#8C0F55", "#FFFFFF"],
  soft: ["#FFE29A", "#F7C25A", "#C48E1F", "#5B3410"],
  panel: ["#FFF1D6", "#F3D9A8"],
  slot: "#7A3F22"
};
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
    if (e.repeat) return;
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
function HeaderControl({ id, cx, cy, onClick, children, label }) {
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
      <g transform={`translate(${cx},${cy})`}>
        <circle cx={0} cy={4} r={28} fill="#C2A67C" />
        <g className="c4-body" style={{ transform: `translateY(${p.down ? 4 : 0}px)` }}>
          <circle className="c4-face" cx={0} cy={0} r={28} fill="url(#hcRim)" stroke="#B39A72" strokeWidth={1.2} />
          <circle cx={0} cy={0} r={24.2} fill="url(#hcFace)" stroke="#E9DBBE" strokeWidth={0.8} />
          <ellipse cx={-12.5} cy={-13.5} rx={6.6} ry={2.6} transform="rotate(-38 -12.5 -13.5)" fill="#FFFFFF" opacity={0.9} />
          <circle cx={-17.6} cy={-6.2} r={1.3} fill="#FFFFFF" opacity={0.8} />
          <path d="M -19 12 A 22 22 0 0 0 14 19" fill="none" stroke="#D9C49C" strokeWidth={1.6} strokeLinecap="round" opacity={0.7} />
          {children}
        </g>
      </g>
    </g>;
}
function IconBulb() {
  const ray = (x1, y1, x2, y2, k) => <g key={k} strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C98400" strokeWidth={3.8} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFCB2E" strokeWidth={2.2} />
    </g>;
  return <g>
      {ray(0, -21, 0, -17, "t")}{ray(-14.5, -16.2, -11.8, -13.3, "tl")}{ray(14.5, -16.2, 11.8, -13.3, "tr")}{ray(-20.5, -4, -16.5, -4, "l")}{ray(20.5, -4, 16.5, -4, "r")}
      <path d="M -6.6 8 C -6.6 3 -10.6 0.5 -10.6 -5.5 A 10.6 10.6 0 0 1 10.6 -5.5 C 10.6 0.5 6.6 3 6.6 8 Z" fill="url(#hcBulb)" stroke="#6B3D1A" strokeWidth={1.7} strokeLinejoin="round" />
      <path d="M -3 7 C -3.4 3 -2 1 0 -1 C 2 1 3.4 3 3 7" fill="none" stroke="#D98A00" strokeWidth={1.1} strokeLinecap="round" opacity={0.75} />
      <ellipse cx={-4.6} cy={-8.2} rx={2.6} ry={4} transform="rotate(25 -4.6 -8.2)" fill="#FFFFFF" opacity={0.75} />
      <rect x={-6.4} y={7.6} width={12.8} height={3.8} rx={1.6} fill="url(#hcBase)" stroke="#2E3350" strokeWidth={1.5} />
      <rect x={-6} y={11.4} width={12} height={3.8} rx={1.6} fill="url(#hcBase)" stroke="#2E3350" strokeWidth={1.5} />
      <path d="M -3.2 15.2 h 6.4 a 1.2 1.2 0 0 1 -1.2 2.4 h -4 a 1.2 1.2 0 0 1 -1.2 -2.4 z" fill="#4C506E" stroke="#2E3350" strokeWidth={1.4} strokeLinejoin="round" />
    </g>;
}
function IconSpeaker({ on }) {
  const wave = (d, w, k) => <g key={k} fill="none" strokeLinecap="round">
      <path d={d} stroke="#C4700A" strokeWidth={w + 1.8} />
      <path d={d} stroke="url(#hcWave)" strokeWidth={w} />
    </g>;
  return <g>
      <path d="M -19 -4.6 h 6.6 l 10.2 -9.6 v 28.4 l -10.2 -9.6 h -6.6 z" fill="url(#hcSpk)" stroke="#1D3F78" strokeWidth={1.9} strokeLinejoin="round" />
      <path d="M -17.4 -3 h 6 l 9 -8.4" fill="none" stroke="#FFFFFF" strokeWidth={1.3} strokeLinecap="round" opacity={0.6} />
      {on ? [wave("M 4.8 -6.2 a 9 9 0 0 1 0 12.4", 3.4, "w1"), wave("M 10.6 -11.6 a 16 16 0 0 1 0 23.2", 3.8, "w2")] : <g fill="none" strokeLinecap="round">
          <path d="M 6 -6 L 17 6 M 17 -6 L 6 6" stroke="#6F695A" strokeWidth={5.6} />
          <path d="M 6 -6 L 17 6 M 17 -6 L 6 6" stroke="#B7B0A0" strokeWidth={3} />
        </g>}
    </g>;
}
function IconRefresh() {
  return <g>
      <path d="M 10.42 4.86 A 11.5 11.5 0 1 1 3.93 -10.8" fill="none" stroke="#1E6A31" strokeWidth={8.4} strokeLinecap="round" />
      <path d="M 10.42 4.86 A 11.5 11.5 0 1 1 3.93 -10.8" fill="none" stroke="url(#hcGrn)" strokeWidth={5.4} strokeLinecap="round" />
      <path d="M -9.6 -4.6 A 11.5 11.5 0 0 1 -1 -11.2" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" opacity={0.55} />
      <path d="M 15.7 -6.5 L 5.4 -17.2 L 1 -5 Z" fill="url(#hcGrn)" stroke="#1E6A31" strokeWidth={2.4} strokeLinejoin="round" />
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
.c4-tdot{animation:c4tdot 2.1s ease-in-out infinite}
@keyframes c4tdot{0%,60%,100%{opacity:.22}15%,45%{opacity:1}}
.c4-bulb{transform-box:fill-box;transform-origin:50% 100%;animation:c4bulb 1s ease-out 1 both}
@keyframes c4bulb{0%{transform:scale(.2);opacity:0}18%{transform:scale(1.18);opacity:1}32%{transform:scale(1);opacity:1}82%{transform:scale(1);opacity:1}100%{transform:scale(.9);opacity:0}}
@media (prefers-reduced-motion:reduce){[data-control="next-key"] .c4-face{animation:none}.c4-pulse,.c4-caret,.c4-talk,.c4-hop,.c4-nod,.c4-cheer,.c4-cheer1,.c4-twinkle,.c4-ring,.c4-cue,.c4-nextblink,.c4-px,.c4-py,.c4-pr,.c4-flash,.c4-tdot,.c4-bulb{animation:none}.c4-ctl .c4-body{transition:none}.c4-fill{transition:none}}
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
    starsLabel: (a, b) => `Right first time: ${a} of ${b}`,
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
    starsLabel: (a, b) => `पहली बार में सही: ${b} में से ${a}`,
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
    starsLabel: (a, b) => `પ્રથમ પ્રયાસમાં સાચા: ${b} માંથી ${a}`,
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
      <HeaderControl id="again" label={UI.again} cx={1388} cy={40} onClick={onAgain}><IconBulb /></HeaderControl>
      <HeaderControl id="sound" label={soundOn ? UI.soundOff : UI.soundOn} cx={1460} cy={40} onClick={onSound}><IconSpeaker on={soundOn} /></HeaderControl>
      <HeaderControl id="restart" label={toStart ? UI.toStart : UI.restart} cx={1532} cy={40} onClick={onRestart}><IconRefresh /></HeaderControl>
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
    const longest = Math.max(...choices.map((c) => Math.max(...wrapText(lineFor(c.label, lang, TR2), 10).slice(0, 2).map((s) => s.length))));
    const tooWide = longest * T.label * 0.6 + 24 > (Z.pad.w - gap) / 2;
    const cols = tooWide && choices.length <= 4 && (Z.pad.h - EDGE - gap * (choices.length - 1)) / choices.length >= HIT ? 1 : 2, rows = Math.ceil(choices.length / cols);
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
function AskBar({ C, ask, hasRuns, mode, open, onKey, UI, nextLabel, choices, onChoice, lang, TR: TR2, quiet, blink, onTap }) {
  const x0 = hasRuns ? Z.runs.x + Z.runs.w + 16 : Z.ask.x;
  const bw = Z.ask.x + Z.ask.w - x0;
  const nCh = mode === "choices" ? (choices || []).length : 0;
  const longest = nCh ? Math.max(...(choices || []).map((c) => lineFor(c.label, lang, TR2).length)) : 0;
  const cw = Math.min(236, Math.max(150, Math.ceil(longest * T.label * 0.6 + 28))), cgap = 14;
  const kw = nCh ? nCh * cw + (nCh - 1) * cgap : 264, kh = 72, kx = x0 + bw - kw - 10, ky = Z.ask.y + (Z.ask.h - kh) / 2;
  const noKey = mode === "card" || quiet && mode === "off";
  const room = (noKey ? x0 + bw - 10 : kx) - x0 - 40;
  const pick = [[T.prompt, 1], [T.label, 2], [T.micro, 2]].map(([s, l]) => ({ s, l, w: wrapText(ask, Math.floor(room / (s * 0.58))) })).find((c) => c.w.length <= c.l) || { s: T.micro, w: wrapText(ask, Math.floor(room / (T.micro * 0.58))).slice(0, 2) };
  const lh = pick.s + 6, top = Z.ask.y + Z.ask.h / 2 - (pick.w.length - 1) * lh / 2 + pick.s * 0.36;
  const live = mode !== "off";
  const next = mode === "next";
  const label = next ? nextLabel : mode === "enter" ? UI.enter : open ? UI.answerClose : UI.answer;
  return <g data-zone="ask" onClick={onTap}>
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
          <text y={next && String(label).length > 10 ? 11 : 14} textAnchor="middle" fontSize={next && String(label).length > 10 ? T.label : T.prompt} fontWeight={600} fill={!live ? mix(C.ink, C.panel, 0.5) : open && !next && !(mode === "enter" && THEME && THEME.enter) ? toneInk("soft", C.ink) : toneInk("enter", "#FFFFFF")}>{label}</text>
        </Key>}
      {next && <NextBlink x={kx} y={ky} w={kw} h={kh} C={C} />}
      {
    /* r24: the ring rides the key only while the child must press it: the Answer key with the keypad shut, or the Enter key once the answer is ready */
  }
      {blink && !next && (mode === "answer" ? !open : mode === "enter") && <NextBlink x={kx} y={ky} w={kw} h={kh} C={C} />}
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
function Mascot({ C, speaking, react, ok, onFail, cheerOn, onCheerFail, thinkOn, onThinkFail, bulbN }) {
  const m = MASCOT_BOX;
  const mood = react && react.kind ? "c4-" + react.kind : void 0;
  const cheerSrc = typeof MASCOT_CHEER === "string" ? MASCOT_CHEER : "";
  const cheering = !!(cheerOn && cheerSrc && react && (react.kind === "cheer" || react.kind === "cheer1"));
  const thinkSrc = typeof MASCOT_THINK === "string" ? MASCOT_THINK : "";
  const thinking = !cheering && !!(thinkOn && thinkSrc);
  return <g data-zone="voice">
      <line x1={m.x + 8} y1={m.y + m.h - 2} x2={m.x + m.w - 8} y2={m.y + m.h - 2} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      {ok ? <image
    key={"m" + (react && react.n || 0)}
    data-role="mascot"
    className={speaking ? "c4-talk" : mood}
    href={cheering ? cheerSrc : thinking ? thinkSrc : MASCOT_IMAGE}
    data-pose={cheering ? "cheer" : thinking ? "think" : void 0}
    x={m.x}
    y={m.y}
    width={m.w}
    height={m.h}
    preserveAspectRatio="xMidYMax meet"
    aria-hidden="true"
    pointerEvents="none"
    onError={cheering ? onCheerFail : thinking ? onThinkFail : onFail}
  /> : <g data-role="mascot-drawn">
          {speaking && <circle cx={m.x + m.w / 2} cy={820} r={40} fill="none" stroke={C.accent} strokeWidth={5} />}
          <circle cx={m.x + m.w / 2} cy={820} r={30} fill="url(#gAccent)" filter="url(#fShadowSoft)" />
        </g>}
      {ok && thinking && <ThinkPuff />}
      {ok && bulbN > 0 && !cheering && <HintBulb key={"b" + bulbN} />}
    </g>;
}
const THINK_BUMPS = [[154, 48, 2.6], [161, 41, 4], [166, 25, 9.5], [176.5, 17.5, 11.5], [187, 25, 8.5]];
const THINK_DOTS = [167, 175.5, 184];
function ThinkPuff() {
  const m = MASCOT_BOX;
  const body = (fill, stroke) => <g fill={fill} stroke={stroke} strokeWidth={stroke ? 2.2 : void 0} strokeLinejoin="round">
      {THINK_BUMPS.map((b, k) => <circle key={k} cx={b[0]} cy={b[1]} r={b[2]} />)}
      <rect x={156} y={23} width={39} height={12} rx={6} />
    </g>;
  return <g data-role="think-puff" transform={`translate(${m.x},${m.y})`} aria-hidden="true" pointerEvents="none">
      {body("#C9BCA6", "#C9BCA6")}
      {body("#FFF4E0")}
      <g fill="#B3A284">
        {THINK_DOTS.map((cx, k) => <circle key={k} className="c4-tdot" style={{ animationDelay: k * 0.35 + "s" }} cx={cx} cy={26.5} r={2.3} />)}
      </g>
    </g>;
}
function HintBulb() {
  const m = MASCOT_BOX;
  return <g data-role="hint-bulb" transform={`translate(${m.x + 176},${m.y + 28})`} aria-hidden="true" pointerEvents="none">
      <g className="c4-bulb"><g transform="scale(0.8)"><IconBulb /></g></g>
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
function Footer({ C, line, hint, speaking, react, n, N, i, total, navigable, done, onGo, mascotOk, onMascotFail, UI, onBubble, cue, board, lang, hintType, cheerOn, onCheerFail, thinkOn, onThinkFail, bulbN }) {
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
      <Mascot C={C} speaking={speaking} react={react} ok={mascotOk} onFail={onMascotFail} cheerOn={cheerOn} onCheerFail={onCheerFail} thinkOn={thinkOn} onThinkFail={onThinkFail} bulbN={bulbN} />
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
        <text x={Z.bar.x} y={Z.bar.y + 60} fontSize={T.micro} fontWeight={dev ? 500 : 600} fill={C.ink}>{UI.phaseOf(n, N)}</text>
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
            {r && r.last && Thumb2 && <g data-role="thumb" transform={`translate(1290,${y + 2})`}><Thumb2 n={k + 1} result={r} it={r.last.it} C={C} w={236} h={rowH - 10} lang={lang} tx={(v) => lineFor(v, lang, TR2)} /></g>}
          </g>;
  })}
      {showScore && played.length > 0 && <g role="img" aria-label={UI.starsLabel ? UI.starsLabel(first, total) : `Right first time: ${first} of ${total}`}>
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
  if (board || BOARD) setLayout(board, !!tool.bigPad);
  SKINS = P.skins !== false;
  THEME = tool.THEME || (typeof TOOL_THEME !== "undefined" ? TOOL_THEME : null) || DEFAULT_THEME;
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
  const changeAt = useRef(0);
  const startNow = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    changeAt.current = Date.now();
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
  const lockedRef = useRef(false);
  const lockNow = (b) => {
    lockedRef.current = b;
    setLocked(b);
  };
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
  const [thinkOk, setThinkOk] = useState(true);
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
  const actedRef = useRef("");
  const [actedKey, setActedKey] = useState("");
  const markActed = () => {
    if (!startedRef.current) return;
    if (live.current && live.current.stage !== "ask") return;
    if (lockedRef.current && live.current && live.current.tries > 0) return;
    const k = String(live.current && live.current.qKey || "");
    if (actedRef.current !== k) {
      actedRef.current = k;
      setActedKey(k);
    }
  };
  const forgetActed = () => {
    if (actedRef.current) {
      actedRef.current = "";
      setActedKey("");
    }
  };
  const [bulb, setBulb] = useState({ n: 0, on: false });
  const bulbNow = () => setBulb((b) => ({ n: b.n + 1, on: true }));
  useEffect(() => {
    if (!bulb.on) return;
    const t = setTimeout(() => setBulb((b) => ({ ...b, on: false })), 1e3);
    return () => clearTimeout(t);
  }, [bulb.n]);
  const [party, setParty] = useState({ n: 0, big: false, on: false });
  const partyAt = useRef(0);
  const partyNow = (big) => {
    if (reducedMotion()) return;
    partyAt.current = Date.now();
    setParty((p) => ({ n: p.n + 1, big, on: true }));
    mascotDo("cheer");
  };
  const endCelebration = () => {
    partyAt.current = 0;
    setParty((p) => p.on ? { ...p, on: false } : p);
    setQuick((q) => q.on ? { ...q, on: false } : q);
    setReact((r) => r.kind === "cheer" || r.kind === "cheer1" ? { kind: "", n: r.n + 1 } : r);
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
    if (board && nv !== "" && live.current.stage === "ask" && !wantRef.current && !(cardAnswerOn && live.current.item && live.current.item.choices) && !(live.current.item && live.current.item.pad === "enter" && !captureRef.current)) setPanel(true);
    if (nv !== "") markActed();
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
    changeAt.current = Date.now();
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
      endCelebration();
      nextRef.current = null;
      setHeldNext(false);
      f();
      return true;
    }
    const pa = pendingAdvance.current;
    if (pa) {
      endCelebration();
      pa(true);
      return true;
    }
    const cut = voice.release();
    if (cut) endCelebration();
    return cut;
  };
  const item = items[Math.min(i, items.length - 1)] || {};
  const qKey = idx + "." + i + "." + run;
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
  const keyAskOn = cardAnswerOn ? answerOn === "key" : board && stage === "ask" && item.pad !== "enter";
  const [readyKey, setReadyKey] = useState("");
  const answerReady = (b) => {
    const k = b ? String(live.current && live.current.qKey || "") : "";
    setReadyKey((o) => o === k ? o : k);
  };
  const tapLine = () => answerOn === "card" ? cardReadyRef.current ? UI.tapCard(tx(item.cardName || (cardKind === "decimal" ? "Decimal" : "Fraction"))) : "" : answerOn === "choices" ? UI.pickIt : keyAskOn && cardReadyRef.current ? UI.tapAnswer : "";
  const showTap = () => {
    const l = lockedRef.current ? "" : tapLine();
    setHintText(l, l ? "type" : "hint");
  };
  const openedAt = useRef(0);
  const openAnswer = () => {
    const L = live.current;
    if (!board || L.stage !== "ask" || L.locked) return false;
    markActed();
    if (!wantRef.current) {
      setPanel(true);
      openedAt.current = Date.now();
      if (!hintOn.current || hintKind.current === "type") setHintText(L.item.choices ? UI.pickIt : UI.typeIt, "type");
    }
    return true;
  };
  const closeAnswer = () => {
    if (wantRef.current && Date.now() - openedAt.current < 300) return;
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
      if (typeof MASCOT_THINK === "string" && MASCOT_THINK) {
        const tm = new Img();
        tm.onload = () => {
          if (!tm.naturalWidth) setThinkOk(false);
        };
        tm.onerror = () => setThinkOk(false);
        tm.src = MASCOT_THINK;
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
  const lastRight = useRef({ name: "", at: 0 });
  const did = (name) => {
    var _a2;
    const L = live.current, st = L.phase && L.phase.steps;
    didAt.current = Date.now();
    if (!st || !st.length || L.stage !== "demo") return false;
    const k = stepRef.current;
    if (!st[k]) return false;
    if (String(st[k].on) !== String(name)) {
      if (lastRight.current.name === String(name) && Date.now() - lastRight.current.at < 500) return false;
      if (st[k].hint) setHintText(tx(st[k].hint));
      return false;
    }
    lastRight.current = { name: String(name), at: Date.now() };
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
  const rungOf = (it, phaseLadder, k) => {
    const ladder = it && Array.isArray(it.ladder) && it.ladder.length ? it.ladder : phaseLadder || [];
    return k <= 0 ? it.miss || ladder[0] : k === 1 ? ladder[0] || it.miss : ladder[1] || ladder[0];
  };
  const rungShown = useRef(-1);
  useEffect(() => {
    rungShown.current = -1;
  }, [i, idx, run]);
  const askHint = () => {
    const L = live.current;
    markActed();
    bulbNow();
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
    lockNow(false);
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
        last: { item: L.i, it, value, kind: it.kind, answer: it.answer, shared: { ...shared.current } }
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
    forgetActed();
    setReadyKey("");
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
    endCelebration();
    changeAt.current = Date.now();
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
    lockNow(false);
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
    lockNow(false);
    forgetActed();
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
      if (e.repeat && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        return;
      }
      if (startedRef.current && e.key !== "Tab" && e.key !== "Shift") markActed();
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
        if (live.current.stage === "demo" && Date.now() - changeAt.current < 400) {
          e.preventDefault();
          return;
        }
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
  const panelOpen = board && !(cardAnswerOn && item.choices) && !(item.pad === "enter" && !captured && !alwaysOpen) && (openWanted || captured || alwaysOpen) && !locked && (stage === "ask" || stage === "free" && captured);
  const slide = useSlide(panelOpen ? 1 : 0);
  const workW = board ? Math.round(ZBOARD.work.w - (ZBOARD.work.w - (BIGPAD ? BOARD_OPEN_W_BIG : BOARD_OPEN_W)) * slide) : W.w;
  useEffect(() => {
    setHintText("");
  }, [stage, i, idx, run, stepNo]);
  useEffect(() => {
    if (locked || lockedRef.current) {
      if (!wantRef.current && hintOn.current && hintKind.current === "type") setHintText("");
      return;
    }
    if (!answerOn && !keyAskOn || wantRef.current || panelOpen) return;
    if (hintOn.current && hintKind.current === "hint") return;
    const l = tapLine();
    if (l) setHintText(l, "type");
    else if (hintOn.current && hintKind.current === "type") setHintText("");
  }, [answerOn, keyAskOn, i, idx, run, cardReady, locked, panelOpen]);
  useEffect(() => {
    if (board && wantRef.current) setPanel(false);
  }, [i, idx, run]);
  useEffect(() => {
    if (board && wantRef.current && stage !== "ask" && !(stage === "free" && captured)) setPanel(false);
  }, [stage, captured]);
  live.current = { idx, n, phase, i, item, stage, typed, tries, submit, setTyped, items, locked, board, panelOpen, qKey };
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
        hintKind: hintText ? hintKind.current : null,
        /* r24: for every tool (the built-in "tap the Answer key" line is a "type" line) */
        ...cardAnswerOn ? { answerOn, cardReady } : {},
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
    lock: (b) => lockNow(!!b),
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
    cardReady: setCardReady,
    /* r24: a question answered on the working area (pad "enter") says when its answer is ready to send: the Enter key in the bar then
       blinks (api.answerReady(true)); (false), a new question or a miss makes it steady again. A tool that never calls it keeps a steady key. */
    answerReady
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
  return <div
    className="c4-frame"
    style={{ position: "relative", margin: "0 auto", touchAction: "none", userSelect: "none", WebkitUserSelect: "none" }}
    onPointerDownCapture={markActed}
    onKeyDownCapture={(e) => {
      if (e.key !== "Tab" && e.key !== "Shift") markActed();
    }}
  >
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
      onTap={workTap}
      blink={askMode === "answer" ? keyAskOn && !locked && !panelOpen && cardReady : askMode === "enter" ? readyKey === qKey && readyKey !== "" && !locked : false}
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
    thinkOn={thinkOk && stage === "ask" && !(locked && tries > 0) && actedKey !== qKey && !(nextKeyOn && heldNext)}
    onThinkFail={() => setThinkOk(false)}
    bulbN={bulb.on ? bulb.n : 0}
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
const MASCOT_THINK = "data:image/webp;base64,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";
const MASCOT_SIZE = { w: 281, h: 420 };
const TOOL_IMAGES = {
  "scale": "data:image/webp;base64,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",
  "bag": "data:image/webp;base64,UklGRvQLAABXRUJQVlA4WAoAAAAQAAAAbwAAiwAAQUxQSBUFAAABoIZteyHJSqoxXtv2DvZobdu2bdu2bdu2be941jue3kYh35/Zrq7UV0e/ImICyN9lmq5cl75df7MYRsCoF8lOlzNubzFqBELR0dEMUo/o5Y9fppHPXOBm3JZSFB+aamrevd8xUBnZxYwKzd123SMbS3l7c/vsGTPmn/7MQL14e1yjskGBgYGBRTMJugsY/MAGHLLkmLDQ0NDQN3c2VjDpq8BxGXiPqk31lOGsDNwrV9PpqVQs8M/eZtGT/xmZP+dUs55I5VDu2N3iRNfWcQ7eknuY9UVynFX4kranJzqnwa8ZT8rVPET/nZJ4iqlOEEy3VuFHnOKHAS31mvEiH89OUKRVv3PC3hcmSJon2/j41pliQXKeZjwoGzMQNGn5SKYde1GIIGrulaRdZH0BE+K/UdbKOd1KUKUVPmjErhUkyKY9x7QRZ3kjI7SPA41jalJcLPMlrRzDTbhY52rmnGxBhbaOBc2/VETFa42knXOggInQx65d9F8EU0vNWM3Y7WAzIrnGvVE0A+nF8OxYmCo9EYFL182yAgZC0FoHcJsyqwDVXZpBzyXg2HGzk4++aO79InDuWJxBTwHtXirAvXStvq9uMqyIAz2yT/PS6sMcfFcBncoXiwg6sLR/xUC37EFjE3f+U38w0DH7PMqbs+yrRdC5Y3IGrvIftIHuk1dm4CjfTQUQFHek56bAURlQdKzMzEmW0yIgmbLIh4t0O2RAU5zqxYFlXBIg+qm1oBmt9xUwZU+LaFYonKECyvmMGqVdpQCyrtHe2jT+Aei++UOTgAsMH3mtRQOhix0Q/lJeg2xvGUbKET+Pmfs5AOXE2tRTmU8xnOQVvp4q/w2QflzIQ3S8hFVKaw/532NYKVvMninrBLSjcnpEGCPj5azvEe+DDC95rtkTOd4A3uxUGk+U/YwYvM3nAdouCbMvFT0gDHFgltSeqrMuZZi5xpnU+WxDTVlsVZfuCmpsp6+6XK8AtQvp1RWMQA0eZlP3mwO3D/nUNZZwi/1dXS/kbFXUzVJwE9uqW4uc3F2V+QDDTZlK1fjexG6NoOo2cmyfRU3GH4DcTV81WezY3fNXk8+BHPzIpaaiiF1cbqOx/6amuYSdVFFNfwW9SmoGoCd3oe5ZFjL0+qlZjl9/NSvQU+ab3fM5hB5bbnHP7woYzVX8VlkNBo4FGM25tP+zYDt8jGa5xT3fk0ZjXc2wU6aY3LMsR0/uS90zz0ZPaqqCDFTQq0hU9v+3SRjPsJNbUfd89gP2ylSze/meoMdOpXOvSSx6EF7WLWGjjJ9zAnUnMBYM8Hk2N/yPMCOQZnv9grYXwRCTy/0i7w0wRrYnQ2pD7AYBP1qlkvYtGOZNf0KIaTwzDrELJSRXOBjozfSENP9pJAl/EtMo0UgcnalptGQk4kiT0MtpJLZWlBR6bSDsXm5CaJUww2AvS1BCCCm2/kOiCABMcsR9CwsNDQ375mT6Y84fEaGhoWHf4l0SAwA5+f3KQiR171INe06dMWNSr3a1qgYFBgYGV+m69HY805MSf2tp1+ohgYGBQVXrdOoxbsaMGYOblvImmtKsrfd+UfShfNnbOqtAdJmu3OANl94lyNww19dX5zcMLpeOEh1bMxev2m3O8TcpslZKwoujU5r/VSSjlRIUTRlDmo7fdeZVZGx8ss320+lyuVwOmy0lMf576Kszu8c3DckgEIQFr7T5C5WvVatB9759+/btUKdWzdIFcvl6CeRvLQBWUDgguAYAADApAJ0BKnAAjAA+eTKTRqSjLyEuOJxR4A8JYm1/WXUxr99u/0nNkG1gLc7+RH10eYBzuvMV+vPrG/4f1Vf4ffAPQA6U7+4f9n0h8kApOiLDib2d/QD6KHoAfsAnCCLND18tZWeWTrYafDSP5+POqNXXDe7aPBjmtsQ/XQbAHwmqFfwVvpwyGdG6wMcs9b3n2n1zsViTtY+VHfOqYsEvqnX06p6lkCHxxJlV3r8Ye1ax64UXAGY51IDRdHMIgdaQQP/hNtMnChOYa1zaDABspJycZpaHUPUSNNeWSRoYQyzYv9R/2MWN9V/odVroG31KS19BIrKf9ToN/LPtk3hZPMeUROIhsBlaCfUNL24SGtt+FEW/QgdPSHNH5VlKaDpvK40LkOEvCRrezRtdBqGo5jNWNvL1h94DUmUM9bobdFhCFRYJtyQVnjhAN20Li2wef9S4AP79Nm6LSc/Y53U5rD3QaXu4evA9Z5HaxSNkeIBIwXn0eErgqTf1wvVFwoAKemHIXraWb0hwq/kYa4//P3FlMd6aZcbvQGVmSXqGsFGixQDILs16/ZQC0ekLHh7pdkLkyW6N+9XUFfhpUkVkzxEj6Xi3lbJui2O7foPyrrrNFsr6NH0yBOYO8ErW5CC4/uNfnJsDnGZbHvy1yWS1kN0fEAY2tlQ4L15adn8Qxfh6RTljIRDSDceZ1zkb6kg00W2auJWlugp/7cj39icRCbXLX96L//1rLui//uxnAN/W8M/fupJlIqNMgFFgT8ouF/AlaQElIl99nrNmk/zEiacY2+Du84vOribYRapOC56FF+TFnBuSIuRpNKjNgauMjR7IvmVthfTH/9PKYTv/1Zjzwrza5M7FdWj7gtoxd56+8/76IrZML/ugQszAXDOMaWNxFUCCG6DQHXTrHNDvVhG/VRt5wWJ/2et2ppo6dPj1RfHX7McEis4zRe0Sakbrb/9NafwmumJl/9xb/+Yf8q2yMj//BND/qrr+amqmNuxqgfdNexbM9o0Md8Brj0PhYpbpPUKoO4gVaJZbC0RTjSQJlhLobj+k5QXVfznzqBL9OFU2IJLkAn+ptLdj3y6E491A4ceARLpsT0Rr4QaPVhQsb3r4IhOQcBDmVUNtvkCxpXMkHHN1JNIl2fzuJNuuThoTeu/xtajSJj+cqaX/PImmScRubYvaQLkAGIXsctR0jH/3F+ispeNaIi8F6K9mRJlwHm4WSDSzD+AYt1mQguxJpSdCgKWanrulL0IoSCOB3bWzyugfDmxpnS9uRQE8ftQoFGdq3DQSZHUZZWsDP63cw3q8s0pmXx2LaBUUv77tpuxEWm+mEM8cq96gAmi+GUTGX1E2t7adyqpvZxhxs2GYfe+S5MCVGEVpkve+8xdxlzpFuFyNVUiS2qit9VhL4ly31Y+eV0b5fP1ow4ImfQ/w0M4AXNruwGLHd5B7v50ehS+Ew0wRstq/CMJXFISXuKiQGxX0mo2jX7FJzaOWgHtjbJ2ojSlbkhvHrBPeWgtLqKKuPJ8+Zv7n5//w8Mdv+UIi7zfoKjpgxe0Na0ubd/Bd5NlPcgcCUQzMK2JksRpt2c7ryhOB39e49J77NHdrxALATv6NA83pwn585zE1l9oruXDpQkwVAQrLX+K1xcNr39d484t9FPYLG8db0W1f+12cp+V9F9a97tvf01/aJDOxPeF8B9ZX4L+E5JCAMNHdqenL7tDqx8Y4oHJg2GUTj1KIEjw7aBJweSJwBafhOkgAD7uPdip/k6a7RlRO/uiUSk+YzjvacE6LnL68EcZa+x7ABNghudrAXjDuu+68xdbA+/umTqZQBFybcMBQUozQH9K0j4UklAutc4MjyyyhxvCUItqEKRceu1aWIXNQlUe9EKRnme5kzmWZbXkrnJolBQnBcnD7fVFti3jsS84ekfzQIxMRbXKhfLyB+XSppeq0d8ZxFC8t8SSvUoTjleLs9rmWLDdZF7RmSMhV6+4Ts8gnNaXzQIS8Hl/b7nzEn9F4fAs/oImcsz7B//gkLNsuYJ+U/l/iS01Bw0gAe0QNJPZFPmNlAWU5B5uYdfvYtEP/1hBE5iXiECcgrRq94qHPHXjESipRjpFyhpEft7FtfL9pKcVrsDb8PsrlU6zp7ldpJkjK9G3mOtgpLl+5PCL1QkPsY8nX48NrGRS4PzHSGViRph839L+bnwerb9fS194hno/GWnPtv0u3fHgLkZP9ZNctSeTDBfl0dSxD0QkW0Xe50zEjVebRHohnm4WTf+0viwLX0nHk7n2GZcbNmYXJLswFVDcAAAA="
};
const TOOL_THEME = { "key": ["#A16E21", "#7F571A", "#4E340E", "#FFF6E0"], "enter": ["#E04287", "#CA216A", "#871245", "#FFFFFF"], "soft": ["#FFE9C7", "#F7CF94", "#C99A4E", "#5A2E12"], "panel": ["#FDF5E3", "#F5E4BC"], "slot": "#7F571A" };
const TOOL_ID = "scale_bench";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Scale Bench";
const CHROME = { "dim": "#9AA4AC", "ink": "#2B2B2B", "rule": "#C9BCA6", "panel": "#F2E4CE", "paper": "#FFFDF7", "accent": "#5B6770" };
const VOICE = { "rate": 0.92, "pitch": 1.06 };
const OPENING = ["Read the display exactly as it stands, last zero and all."];
const FINISH_LINE = "Every weight read as printed, and a level beam under two written answers that are not the same.";
const FREE_LINE = "Free play. Press New weight, then tidy it and hang both on the beam.";
const START_HOOK = "Read the display exactly as it stands, last zero and all.";
function StartArt({ box, C, lang, tx = (v) => v }) {
  const sx = 160, sy = 72, d = sbWin(sx, sy, 230), bx = 640, cx = 960;
  return <g>
      {
    /* the kitchen scale with its sack of rice, printing a weight exactly as it reads */
  }
      {sbScale(sx, sy, 230, 64, C, "sa")}
      {sbWeightRow("2.750", d.x + d.w / 2, d.y + 64, T.speech, 0, "sw")}
      <rect x={d.x + d.w / 2 - 50} y={d.y + d.h + 6} width={100} height={38} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={d.x + d.w / 2} y={d.y + d.h + 35} textAnchor="middle" fontSize={lang === "en" ? T.label : T.micro} fontWeight={600} fill={C.ink}>{tx("kg")}</text>
      {
    /* the balance beam, level and unloaded */
  }
      <rect x={bx - 170} y={96} width={340} height={16} rx={8} fill={shade(C.rule, 0.25)} />
      <path d={`M ${bx - 22} ${146} L ${bx + 22} ${146} L ${bx} ${112} Z`} fill={shade(C.rule, 0.35)} />
      <rect x={bx - 9} y={146} width={18} height={170} fill={shade(C.rule, 0.2)} />
      <rect x={bx - 80} y={316} width={160} height={16} rx={6} fill={shade(C.rule, 0.3)} />
      {[-1, 1].map((sg) => <g key={sg}>
          <line x1={bx + sg * 150} y1={112} x2={bx + sg * 150 - 50} y2={176} stroke={shade(C.rule, 0.3)} strokeWidth={3} />
          <line x1={bx + sg * 150} y1={112} x2={bx + sg * 150 + 50} y2={176} stroke={shade(C.rule, 0.3)} strokeWidth={3} />
          <rect x={bx + sg * 150 - 62} y={176} width={124} height={70} rx={14} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
        </g>)}
      {
    /* an empty fraction card */
  }
      <rect x={cx} y={40} width={200} height={290} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={cx + 100} y={84} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Fraction")}</text>
      <rect x={cx + 20} y={100} width={160} height={84} rx={RAD.key} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />
      <rect x={cx + 20} y={196} width={160} height={6} rx={3} fill={C.ink} />
      <rect x={cx + 20} y={214} width={160} height={84} rx={RAD.key} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />
    </g>;
}
const TR = {
  hi: {
    "Scale Bench": "तराज़ू बेंच",
    "Read the display exactly as it stands, last zero and all.": "स्क्रीन पर जो छपा है, वैसा ही पढ़ो, आखिरी शून्य के साथ।",
    "Free play. Press New weight, then tidy it and hang both on the beam.": "मुक्त खेल। नया वज़न दबाओ, फिर साफ़ करो और दोनों को डंडी पर टाँगो।",
    "Dropping the point to get the top": "दशमलव बिंदु हटाकर ऊपर की संख्या पाना",
    "Tap the scale display to carry the weight to the bench.": "वज़न बेंच पर लाने के लिए स्क्रीन छुओ।",
    "Tap the white display on the scale.": "तराज़ू की सफ़ेद स्क्रीन छुओ।",
    "Now tap the point to lift it out and leave the top number.": "दशमलव बिंदु छुओ, ऊपर की संख्या बचेगी।",
    "Tap the point between the digits.": "अंकों के बीच का दशमलव बिंदु छुओ।",
    "Count every digit on the display.": "स्क्रीन के सारे अंक गिनो।",
    "Write the digits in order, no point.": "अंक क्रम से लिखो, बिना दशमलव बिंदु।",
    "The numerator is the digits with the point taken out and nothing else changed.": "अंश वही अंक हैं जिनमें से दशमलव बिंदु हटा दिया गया है और कुछ और नहीं बदला।",
    "You learned: the top number is the digits with the point taken out.": "तुमने सीखा: दशमलव बिंदु हटाकर बचे अंक ही ऊपर की संख्या हैं।",
    "Write 6.3 kg as a fraction.": "इस वज़न का भिन्न लिखो।",
    "This weight as a fraction": "इस वज़न का भिन्न",
    "Every digit goes into the top number.": "हर अंक ऊपर की संख्या में जाता है।",
    "What fraction does 8.4 kg give?": "इस नए वज़न से कौन-सा भिन्न बनता है?",
    "8.4 kg as a fraction": "8.4 किलोग्राम का भिन्न",
    "Did a digit stay behind with the point?": "क्या दशमलव के साथ कोई अंक छूटा?",
    "Turn 15.7 kg into a fraction.": "इस वज़न को भी भिन्न में बदलो।",
    "15.7 kg as a fraction": "15.7 किलोग्राम का भिन्न",
    "Is there a digit after the point too?": "क्या दशमलव के बाद भी कोई अंक है?",
    "Building the bottom from the places": "स्थानों से नीचे की संख्या बनाना",
    "Tap Count to light each place after the point.": "गिनो दबाकर दशमलव के बाद के स्थान जलाओ।",
    "The Count key is under the bench.": "गिनो कुंजी बेंच के नीचे है।",
    "Tap Build to write the bottom number.": "नीचे की संख्या के लिए बनाओ दबाओ।",
    "Now press Build, beside Count.": "अब गिनो के पास वाली बनाओ कुंजी दबाओ।",
    "As many zeros as there are places.": "जितने स्थान, उतने शून्य।",
    "Write a one, then those zeros after it.": "पहले एक लिखो, फिर उसके बाद वे शून्य।",
    "The denominator is one followed by a zero for every decimal place.": "हर में पहले एक होता है, फिर हर दशमलव स्थान के लिए एक शून्य।",
    "You learned: a one, then one zero for every place after the point.": "तुमने सीखा: पहले एक, फिर दशमलव के बाद हर स्थान का एक शून्य।",
    "Write 45.28 kg as a fraction.": "इस वज़न को भिन्न में लिखो।",
    "How many digits stand after the point?": "दशमलव के बाद कितने अंक हैं?",
    "Now try 30.62 kg the same way.": "अब इस वज़न के साथ भी ऐसा ही करो।",
    "30.62 kg as a fraction": "30.62 किलोग्राम का भिन्न",
    "A zero for each place after the point.": "दशमलव के बाद हर स्थान का एक शून्य।",
    "What fraction is 7.209 kg?": "इस वज़न का भिन्न क्या है?",
    "7.209 kg as a fraction": "7.209 किलोग्राम का भिन्न",
    "Count to the very last digit.": "आखिरी अंक तक गिनो।",
    "A zero on the end still counts": "आखिरी शून्य भी गिना जाता है",
    "Tap the zero on the end of the weight.": "वज़न के आखिरी शून्य को छुओ।",
    "It is the last digit on the bench.": "यह बेंच पर आखिरी अंक है।",
    "Now tap Count and watch each place light up.": "अब गिनो दबाओ और हर स्थान जलता देखो।",
    "Count is the key below the bench.": "बेंच के नीचे गिनो कुंजी है।",
    "Tap Build for a one and a zero under each place.": "बनाओ दबाकर एक और हर स्थान का शून्य लिखो।",
    "Build sits beside Count.": "बनाओ, गिनो के पास है।",
    "Each digit after the point is a place.": "दशमलव के बाद हर अंक एक स्थान है।",
    "Count the end zero as a place too.": "आखिरी शून्य को भी एक स्थान गिनो।",
    "A trailing zero takes a decimal place of its own, so the denominator comes out one zero longer.": "आखिर का शून्य अपना एक दशमलव स्थान लेता है, इसलिए हर में एक शून्य ज़्यादा आता है।",
    "You learned: a printed zero on the end takes a place of its own.": "तुमने सीखा: आखिर में छपा शून्य अपना एक स्थान लेता है।",
    "A scale prints 1.450 kg; write it as a fraction.": "तराज़ू जो छापता है, उसका भिन्न लिखो।",
    "What is the last digit printed?": "आखिरी छपा अंक कौन-सा है?",
    "A label reads 2.60 m; what is its printed fraction?": "लेबल पर जो छपा है, उसका भिन्न क्या है?",
    "2.60 m as a fraction": "2.60 मीटर का भिन्न",
    "Nothing was tidied; read every digit.": "कुछ साफ़ नहीं किया; हर अंक पढ़ो।",
    "The bench made this fraction; what weight did the scale print?": "इस भिन्न से तराज़ू ने कौन-सा वज़न छापा?",
    "The weight it came from": "जिस वज़न से यह बना",
    "Count the zeros after the one.": "एक के बाद वाले शून्य गिनो।",
    "The right amount can still be the wrong answer": "सही मात्रा भी गलत उत्तर हो सकती है",
    "Tap Tidy to drop the end zero and run the bench again.": "साफ़ करो दबाकर आखिरी शून्य हटाओ।",
    "Tidy is the key under the rows.": "साफ़ करो कुंजी पंक्तियों के नीचे है।",
    "Now tap the beam to hang both fractions on it.": "अब डंडी छुओ, दोनों भिन्न उस पर टँगेंगे।",
    "Tap the balance beam at the right.": "दाईं ओर वाली तुला की डंडी छुओ।",
    "Count the places in the asked row.": "पूछी गई पंक्ति के स्थान गिनो।",
    "Put one zero per place after a one.": "एक के बाद हर स्थान का एक शून्य लिखो।",
    "A trailing zero leaves the amount alone. It changes the denominator, not the weight.": "आखिर का शून्य मात्रा नहीं बदलता। वह हर बदलता है, वज़न नहीं।",
    "You learned: the same weight can be written as two different fractions.": "तुमने सीखा: एक ही वज़न दो अलग भिन्नों में लिखा जा सकता है।",
    "A child tidies it to 1.45 kg; what do they write?": "साफ़ करने के बाद बच्चा क्या लिखेगा?",
    "The tidied weight as a fraction": "साफ़ किए वज़न का भिन्न",
    "Count the places left after tidying.": "साफ़ करने के बाद बचे स्थान गिनो।",
    "Write 1.30 m as a fraction, just as printed.": "छपे हुए रूप जैसा ही भिन्न लिखो।",
    "1.30 m as printed": "छपा हुआ 1.30 मीटर",
    "Read the top row, end zero and all.": "ऊपर की पंक्ति पढ़ो, आखिरी शून्य समेत।",
    "What fraction is the printed 5.250 kg?": "थैले पर छपे वज़न का भिन्न क्या है?",
    "5.250 kg as printed": "छपा हुआ 5.250 किलोग्राम",
    "Did you count the zero on the end?": "क्या तुमने आखिरी शून्य गिना?",
    /* the win lines (api.say) */
    "Two digits came across to the top.": "दोनों अंक ऊपर की संख्या में आ गए।",
    "Only the point was left out of the top.": "ऊपर की संख्या से सिर्फ़ दशमलव बिंदु हटा।",
    "All three digits made the top, and the point rests above.": "तीनों अंक ऊपर की संख्या बने, और बिंदु ऊपर रखा है।",
    "Two places lit, so the bottom has three digits.": "दो स्थान जले, इसलिए नीचे की संख्या में तीन अंक हैं।",
    "Each zero sits right under its place.": "हर शून्य अपने स्थान के ठीक नीचे है।",
    "Three places gave the longest bottom yet.": "तीन स्थानों से अब तक की सबसे लंबी नीचे की संख्या बनी।",
    "Three places counted, the end zero as well.": "तीन स्थान गिने, आखिरी शून्य भी।",
    "Two zeros after the one make a bottom of three digits.": "एक के बाद दो शून्य, तो नीचे की संख्या तीन अंकों की बनी।",
    "Three zeros, so three digits after the point.": "तीन शून्य, इसलिए दशमलव के बाद तीन अंक।",
    "Same weight, but a different written fraction.": "वज़न वही, पर लिखा हुआ भिन्न अलग।",
    "That is the form the label printed.": "यही वह रूप है जो लेबल पर छपा था।",
    "The bag keeps all three printed places in its fraction.": "थैले का भिन्न तीनों छपे स्थान रखता है।",
    /* the words the working area draws (tx) and the answer boxes' names */
    "kg": "कि.ग्रा.",
    "m": "मी.",
    "Fraction": "भिन्न",
    "Decimal": "दशमलव",
    "top number": "ऊपर की संख्या",
    "bottom number": "नीचे की संख्या",
    "whole part": "पूर्ण भाग",
    "decimal part": "दशमलव भाग",
    "numerator": "अंश",
    "denominator": "हर",
    "whole": "पूर्ण",
    "decimal": "दशमलव",
    "Count": "गिनो",
    "Build": "बनाओ",
    "Tidy": "साफ़ करो",
    "New weight": "नया वज़न",
    "scale display": "तराज़ू की स्क्रीन",
    "the point": "दशमलव बिंदु",
    "the end zero": "आखिरी शून्य",
    "balance beam": "तुला की डंडी",
    "printed": "छपा हुआ",
    "tidied": "साफ़ किया",
    "written differently": "अलग लिखा हुआ",
    "same weight": "वही वज़न",
    "same length": "वही लंबाई",
    "place": "स्थान",
    "places": "स्थान"
  },
  gu: {
    "Scale Bench": "વજનકાંટો બેન્ચ",
    "Read the display exactly as it stands, last zero and all.": "સ્ક્રીન પર જે છપાયું છે તે એમ જ વાંચો, છેલ્લા શૂન્ય સાથે.",
    "Free play. Press New weight, then tidy it and hang both on the beam.": "મુક્ત રમત. નવું વજન દબાવો, પછી સાફ કરો અને બંનેને દાંડી પર લટકાવો.",
    "Dropping the point to get the top": "દશાંશ ચિહ્ન કાઢીને ઉપરની સંખ્યા મેળવવી",
    "Tap the scale display to carry the weight to the bench.": "વજન બેન્ચ પર લાવવા સ્ક્રીનને સ્પર્શ કરો.",
    "Tap the white display on the scale.": "વજનકાંટાની સફેદ સ્ક્રીનને સ્પર્શ કરો.",
    "Now tap the point to lift it out and leave the top number.": "દશાંશ ચિહ્ન સ્પર્શો, ઉપરની સંખ્યા રહેશે.",
    "Tap the point between the digits.": "અંકો વચ્ચેના દશાંશ ચિહ્નને સ્પર્શ કરો.",
    "Count every digit on the display.": "સ્ક્રીન પરના બધા અંકો ગણો.",
    "Write the digits in order, no point.": "અંકો ક્રમમાં લખો, દશાંશ ચિહ્ન વિના.",
    "The numerator is the digits with the point taken out and nothing else changed.": "અંશ એટલે દશાંશ ચિહ્ન કાઢી નાખ્યા પછીના અંકો, બીજું કંઈ બદલાયા વિના.",
    "You learned: the top number is the digits with the point taken out.": "તમે શીખ્યા: દશાંશ ચિહ્ન કાઢ્યા પછીના અંકો જ ઉપરની સંખ્યા છે.",
    "Write 6.3 kg as a fraction.": "આ વજનનો અપૂર્ણાંક લખો.",
    "This weight as a fraction": "આ વજનનો અપૂર્ણાંક",
    "Every digit goes into the top number.": "દરેક અંક ઉપરની સંખ્યામાં જાય છે.",
    "What fraction does 8.4 kg give?": "આ નવા વજનથી કયો અપૂર્ણાંક બને છે?",
    "8.4 kg as a fraction": "8.4 કિલોગ્રામનો અપૂર્ણાંક",
    "Did a digit stay behind with the point?": "શું કોઈ અંક દશાંશ ચિહ્ન સાથે રહી ગયો?",
    "Turn 15.7 kg into a fraction.": "આ વજનને પણ અપૂર્ણાંકમાં ફેરવો.",
    "15.7 kg as a fraction": "15.7 કિલોગ્રામનો અપૂર્ણાંક",
    "Is there a digit after the point too?": "શું દશાંશ ચિહ્ન પછી પણ કોઈ અંક છે?",
    "Building the bottom from the places": "સ્થાનો પરથી નીચેની સંખ્યા બનાવવી",
    "Tap Count to light each place after the point.": "ગણો દબાવીને દશાંશ પછીના સ્થાન ચમકાવો.",
    "The Count key is under the bench.": "ગણો કી બેન્ચની નીચે છે.",
    "Tap Build to write the bottom number.": "નીચેની સંખ્યા માટે બનાવો દબાવો.",
    "Now press Build, beside Count.": "હવે ગણો પાસેની બનાવો કી દબાવો.",
    "As many zeros as there are places.": "જેટલા સ્થાન, તેટલા શૂન્ય.",
    "Write a one, then those zeros after it.": "પહેલા એક લખો, પછી તે શૂન્ય.",
    "The denominator is one followed by a zero for every decimal place.": "છેદમાં પહેલા એક, પછી દરેક દશાંશ સ્થાન માટે એક શૂન્ય.",
    "You learned: a one, then one zero for every place after the point.": "તમે શીખ્યા: પહેલા એક, પછી દશાંશ પછીના દરેક સ્થાનનું એક શૂન્ય.",
    "Write 45.28 kg as a fraction.": "આ વજનને અપૂર્ણાંકમાં લખો.",
    "How many digits stand after the point?": "દશાંશ ચિહ્ન પછી કેટલા અંકો છે?",
    "Now try 30.62 kg the same way.": "હવે આ વજન માટે પણ એમ જ કરો.",
    "30.62 kg as a fraction": "30.62 કિલોગ્રામનો અપૂર્ણાંક",
    "A zero for each place after the point.": "દશાંશ પછી દરેક સ્થાનનું એક શૂન્ય.",
    "What fraction is 7.209 kg?": "આ વજનનો અપૂર્ણાંક શું છે?",
    "7.209 kg as a fraction": "7.209 કિલોગ્રામનો અપૂર્ણાંક",
    "Count to the very last digit.": "છેલ્લા અંક સુધી ગણો.",
    "A zero on the end still counts": "છેલ્લું શૂન્ય પણ ગણાય છે",
    "Tap the zero on the end of the weight.": "વજનના છેલ્લા શૂન્યને સ્પર્શ કરો.",
    "It is the last digit on the bench.": "તે બેન્ચ પરનો છેલ્લો અંક છે.",
    "Now tap Count and watch each place light up.": "હવે ગણો દબાવો, દરેક સ્થાન ચમકતું જુઓ.",
    "Count is the key below the bench.": "બેન્ચની નીચે ગણો કી છે.",
    "Tap Build for a one and a zero under each place.": "બનાવો દબાવો: એક અને દરેક સ્થાને શૂન્ય.",
    "Build sits beside Count.": "બનાવો, ગણોની બાજુમાં છે.",
    "Each digit after the point is a place.": "દશાંશ ચિહ્ન પછીનો દરેક અંક એક સ્થાન છે.",
    "Count the end zero as a place too.": "છેલ્લા શૂન્યને પણ એક સ્થાન ગણો.",
    "A trailing zero takes a decimal place of its own, so the denominator comes out one zero longer.": "છેલ્લું શૂન્ય પોતાનું એક દશાંશ સ્થાન લે છે, એટલે છેદમાં એક શૂન્ય વધુ આવે છે.",
    "You learned: a printed zero on the end takes a place of its own.": "તમે શીખ્યા: છેલ્લે છપાયેલું શૂન્ય પોતાનું એક સ્થાન લે છે.",
    "A scale prints 1.450 kg; write it as a fraction.": "વજનકાંટો જે છાપે છે તેનો અપૂર્ણાંક લખો.",
    "What is the last digit printed?": "છેલ્લો છપાયેલો અંક કયો છે?",
    "A label reads 2.60 m; what is its printed fraction?": "લેબલ પર જે છપાયું છે તેનો અપૂર્ણાંક શું?",
    "2.60 m as a fraction": "2.60 મીટરનો અપૂર્ણાંક",
    "Nothing was tidied; read every digit.": "કંઈ સાફ કર્યું નથી; દરેક અંક વાંચો.",
    "The bench made this fraction; what weight did the scale print?": "આ અપૂર્ણાંક કયા છપાયેલા વજનનો છે?",
    "The weight it came from": "જે વજનમાંથી બન્યો",
    "Count the zeros after the one.": "એક પછીના શૂન્ય ગણો.",
    "The right amount can still be the wrong answer": "સાચો જથ્થો પણ ખોટો જવાબ હોઈ શકે",
    "Tap Tidy to drop the end zero and run the bench again.": "સાફ કરો દબાવીને છેલ્લું શૂન્ય કાઢો.",
    "Tidy is the key under the rows.": "સાફ કરો કી હરોળોની નીચે છે.",
    "Now tap the beam to hang both fractions on it.": "હવે દાંડીને સ્પર્શ કરી બંને લટકાવો.",
    "Tap the balance beam at the right.": "જમણી બાજુની દાંડીને સ્પર્શ કરો.",
    "Count the places in the asked row.": "પૂછેલી હરોળના સ્થાન ગણો.",
    "Put one zero per place after a one.": "એક પછી દરેક સ્થાનનું એક શૂન્ય લખો.",
    "A trailing zero leaves the amount alone. It changes the denominator, not the weight.": "છેલ્લું શૂન્ય જથ્થો બદલતું નથી. તે છેદ બદલે છે, વજન નહીં.",
    "You learned: the same weight can be written as two different fractions.": "તમે શીખ્યા: એક જ વજન બે અલગ અપૂર્ણાંકમાં લખી શકાય.",
    "A child tidies it to 1.45 kg; what do they write?": "સાફ કર્યા પછી બાળક શું લખશે?",
    "The tidied weight as a fraction": "સાફ કરેલા વજનનો અપૂર્ણાંક",
    "Count the places left after tidying.": "સાફ કર્યા પછી બચેલા સ્થાન ગણો.",
    "Write 1.30 m as a fraction, just as printed.": "છપાયેલા રૂપ જેવો જ અપૂર્ણાંક લખો.",
    "1.30 m as printed": "છપાયેલું 1.30 મીટર",
    "Read the top row, end zero and all.": "ઉપરની હરોળ વાંચો, છેલ્લા શૂન્ય સાથે.",
    "What fraction is the printed 5.250 kg?": "થેલી પર છપાયેલા વજનનો અપૂર્ણાંક શું?",
    "5.250 kg as printed": "છપાયેલું 5.250 કિલોગ્રામ",
    "Did you count the zero on the end?": "શું તમે છેલ્લું શૂન્ય ગણ્યું?",
    /* the win lines (api.say) */
    "Two digits came across to the top.": "બંને અંકો ઉપરની સંખ્યામાં આવ્યા.",
    "Only the point was left out of the top.": "ઉપરની સંખ્યામાંથી ફક્ત દશાંશ ચિહ્ન નીકળ્યું.",
    "All three digits made the top, and the point rests above.": "ત્રણેય અંકો ઉપરની સંખ્યા બન્યા, અને ચિહ્ન ઉપર રહ્યું.",
    "Two places lit, so the bottom has three digits.": "બે સ્થાન ચમક્યા, એટલે નીચેની સંખ્યામાં ત્રણ અંકો છે.",
    "Each zero sits right under its place.": "દરેક શૂન્ય પોતાના સ્થાનની બરાબર નીચે છે.",
    "Three places gave the longest bottom yet.": "ત્રણ સ્થાનોથી અત્યાર સુધીની સૌથી લાંબી નીચેની સંખ્યા બની.",
    "Three places counted, the end zero as well.": "ત્રણ સ્થાન ગણ્યા, છેલ્લું શૂન્ય પણ.",
    "Two zeros after the one make a bottom of three digits.": "એક પછી બે શૂન્ય, એટલે નીચેની સંખ્યા ત્રણ અંકોની બની.",
    "Three zeros, so three digits after the point.": "ત્રણ શૂન્ય, એટલે દશાંશ ચિહ્ન પછી ત્રણ અંકો.",
    "Same weight, but a different written fraction.": "વજન એ જ, પણ લખેલો અપૂર્ણાંક અલગ.",
    "That is the form the label printed.": "આ જ રૂપ લેબલ પર છપાયું હતું.",
    "The bag keeps all three printed places in its fraction.": "થેલીનો અપૂર્ણાંક ત્રણેય છપાયેલા સ્થાન રાખે છે.",
    /* the words the working area draws (tx) and the answer boxes' names */
    "kg": "કિ.ગ્રા.",
    "m": "મી.",
    "Fraction": "અપૂર્ણાંક",
    "Decimal": "દશાંશ",
    "top number": "ઉપરની સંખ્યા",
    "bottom number": "નીચેની સંખ્યા",
    "whole part": "પૂર્ણ ભાગ",
    "decimal part": "દશાંશ ભાગ",
    "numerator": "અંશ",
    "denominator": "છેદ",
    "whole": "પૂર્ણ",
    "decimal": "દશાંશ",
    "Count": "ગણો",
    "Build": "બનાવો",
    "Tidy": "સાફ કરો",
    "New weight": "નવું વજન",
    "scale display": "વજનકાંટાની સ્ક્રીન",
    "the point": "દશાંશ ચિહ્ન",
    "the end zero": "છેલ્લું શૂન્ય",
    "balance beam": "ત્રાજવાની દાંડી",
    "printed": "છપાયેલું",
    "tidied": "સાફ કરેલું",
    "written differently": "અલગ રીતે લખેલું",
    "same weight": "સમાન વજન",
    "same length": "સમાન લંબાઈ",
    "place": "સ્થાન",
    "places": "સ્થાન"
  }
};
const PHASES = [
  {
    n: 1,
    concept: "Dropping the point to get the top",
    conceptId: "M2.S4.T7.C24",
    objectiveIds: ["O11"],
    says: ["Take the point out and leave the digits alone. What have you got?"],
    steps: [
      { say: "Tap the scale display to carry the weight to the bench.", on: "carry", hint: "Tap the white display on the scale." },
      { say: "Now tap the point to lift it out and leave the top number.", on: "drop", hint: "Tap the point between the digits." }
    ],
    stepHold: 2200,
    ladder: ["Count every digit on the display.", "Write the digits in order, no point."],
    closing: "The numerator is the digits with the point taken out and nothing else changed.",
    learned: "You learned: the top number is the digits with the point taken out.",
    traceback: "The weight is carried to the bench, the point lifts out to its rest and the digits close up into the top number.",
    items: [
      /* learn ML1: answer in the plan = 63/10, and the top number is the digits with the point taken out.
         Answered on the Fraction card, like phases 2 to 4 (the owner's word); the near miss keeps only the whole part. */
      {
        qid: "M2.S4.T7.C24:ML1",
        kind: "top",
        weight: "6.3",
        unit: "kg",
        parts: SLOT_FRACTION,
        answer: [63, 10],
        near: "6|10",
        winMs: 3500,
        say: "Write 6.3 kg as a fraction.",
        ask: "This weight as a fraction",
        miss: "Every digit goes into the top number."
      },
      /* practice 1: answer in the plan = 84/10 */
      {
        qid: "M2.S4.T7.C24:1",
        kind: "top",
        weight: "8.4",
        unit: "kg",
        parts: SLOT_FRACTION,
        answer: [84, 10],
        near: "8|10",
        winMs: 3500,
        say: "What fraction does 8.4 kg give?",
        ask: "8.4 kg as a fraction",
        miss: "Did a digit stay behind with the point?"
      },
      /* practice 2: answer in the plan = 157, which is the digits with the point taken out */
      {
        qid: "M2.S4.T7.C24:2",
        kind: "top",
        weight: "15.7",
        unit: "kg",
        parts: SLOT_FRACTION,
        answer: [157, 10],
        near: "15|10",
        winMs: 3500,
        say: "Turn 15.7 kg into a fraction.",
        ask: "15.7 kg as a fraction",
        miss: "Is there a digit after the point too?"
      }
    ]
  },
  {
    n: 2,
    concept: "Building the bottom from the places",
    conceptId: "M2.S4.T7.C25",
    objectiveIds: ["O11"],
    says: ["Count the places after the point. Now write one and that many zeros."],
    steps: [
      { say: "Tap Count to light each place after the point.", on: "count", hint: "The Count key is under the bench." },
      { say: "Tap Build to write the bottom number.", on: "build", hint: "Now press Build, beside Count." }
    ],
    stepHold: 2400,
    ladder: ["As many zeros as there are places.", "Write a one, then those zeros after it."],
    closing: "The denominator is one followed by a zero for every decimal place.",
    learned: "You learned: a one, then one zero for every place after the point.",
    traceback: "The point drops out, the places light one at a time from the point outwards, and the bottom is built a zero at a time under them.",
    items: [
      /* learn ML2: answer in the plan = 4528/100 */
      {
        qid: "M2.S4.T7.C25:ML2",
        kind: "frac",
        weight: "45.28",
        unit: "kg",
        parts: SLOT_FRACTION,
        answer: [4528, 100],
        near: "4528|10",
        winMs: 3800,
        say: "Write 45.28 kg as a fraction.",
        ask: "This weight as a fraction",
        miss: "How many digits stand after the point?"
      },
      /* practice 3: answer in the plan = 3062/100 (near: the count written underneath) */
      {
        qid: "M2.S4.T7.C25:3",
        kind: "frac",
        weight: "30.62",
        unit: "kg",
        parts: SLOT_FRACTION,
        answer: [3062, 100],
        near: "3062|2",
        winMs: 3800,
        say: "Now try 30.62 kg the same way.",
        ask: "30.62 kg as a fraction",
        miss: "A zero for each place after the point."
      },
      /* practice 4: answer in the plan = 7209/1000, because three decimal places give one followed by three zeros */
      {
        qid: "M2.S4.T7.C25:4",
        kind: "frac",
        weight: "7.209",
        unit: "kg",
        parts: SLOT_FRACTION,
        answer: [7209, 1e3],
        near: "7209|10",
        winMs: 4500,
        say: "What fraction is 7.209 kg?",
        ask: "7.209 kg as a fraction",
        miss: "Count to the very last digit."
      }
    ]
  },
  {
    n: 3,
    concept: "A zero on the end still counts",
    conceptId: "M2.S4.T7.C26",
    objectiveIds: ["O12"],
    says: ["There is a zero on the end. Does it take a place or not?"],
    steps: [
      { say: "Tap the zero on the end of the weight.", on: "zero", hint: "It is the last digit on the bench." },
      { say: "Now tap Count and watch each place light up.", on: "count", hint: "Count is the key below the bench." },
      { say: "Tap Build for a one and a zero under each place.", on: "build", hint: "Build sits beside Count." }
    ],
    stepHold: 2400,
    ladder: ["Each digit after the point is a place.", "Count the end zero as a place too."],
    closing: "A trailing zero takes a decimal place of its own, so the denominator comes out one zero longer.",
    learned: "You learned: a printed zero on the end takes a place of its own.",
    traceback: "The weight is read as printed, the last zero lights like every other place, and the bottom is built a zero longer.",
    items: [
      /* learn ML3: answer in the plan = Three decimal places, so 1450/1000 kg */
      {
        qid: "M2.S4.T7.C26:ML3",
        kind: "frac",
        weight: "1.450",
        unit: "kg",
        parts: SLOT_FRACTION,
        answer: [1450, 1e3],
        near: "145|100",
        winMs: 4500,
        say: "A scale prints 1.450 kg; write it as a fraction.",
        ask: "This weight as a fraction",
        miss: "What is the last digit printed?"
      },
      /* practice 5: answer in the plan = 260/100 */
      {
        qid: "M2.S4.T7.C26:5",
        kind: "frac",
        weight: "2.60",
        unit: "m",
        parts: SLOT_FRACTION,
        answer: [260, 100],
        near: "26|10",
        winMs: 3800,
        say: "A label reads 2.60 m; what is its printed fraction?",
        ask: "2.60 m as a fraction",
        miss: "Nothing was tidied; read every digit."
      },
      /* practice 6: the plan asks whether 4.500 is the same amount as 4.5 and the same written form (the same amount,
         not the same written form: 4.500 has three places, 4.5 one). Run backwards so the child answers it on the
         scale's Decimal display: the bench holds 4500/1000 and the child writes the weight it came from; a tidier
         writes 4.5 and loses two printed places (the amount half is phase 4's beam). */
      {
        qid: "M2.S4.T7.C26:6",
        kind: "back",
        weight: "4.500",
        unit: "kg",
        given: [4500, 1e3],
        parts: SLOT_DECIMAL,
        answer: ["4", "500"],
        near: "4|5",
        winMs: 3300,
        say: "The bench made this fraction; what weight did the scale print?",
        ask: "The weight it came from",
        miss: "Count the zeros after the one."
      }
    ]
  },
  {
    n: 4,
    concept: "The right amount can still be the wrong answer",
    conceptId: "M2.S4.T7.C27",
    objectiveIds: ["O12"],
    says: ["Tidy it first and run it again. Same amount? Same writing?"],
    steps: [
      { say: "Tap Tidy to drop the end zero and run the bench again.", on: "tidy", hint: "Tidy is the key under the rows." },
      { say: "Now tap the beam to hang both fractions on it.", on: "beam", hint: "Tap the balance beam at the right." }
    ],
    stepHold: 2200,
    ladder: ["Count the places in the asked row.", "Put one zero per place after a one."],
    closing: "A trailing zero leaves the amount alone. It changes the denominator, not the weight.",
    learned: "You learned: the same weight can be written as two different fractions.",
    traceback: "The asked row is run, both fractions hang on the beam, which stays level, and the two written forms stand apart.",
    items: [
      /* learn ML4: answer in the plan = They write 145/100, which is the same weight and not the number that was printed
         (near: the printed row's fraction kept, as if the two cannot both be right) */
      {
        qid: "M2.S4.T7.C27:ML4",
        kind: "rows",
        row: "t",
        weight: "1.450",
        unit: "kg",
        parts: SLOT_FRACTION,
        answer: [145, 100],
        near: "1450|1000",
        winMs: 3e3,
        say: "A child tidies it to 1.45 kg; what do they write?",
        ask: "The tidied weight as a fraction",
        miss: "Count the places left after tidying."
      },
      /* practice 7: answer in the plan = The first one (130/100), because the printed number has two decimal places;
         the tidied 13/10 stands in the lower row and the child writes the printed one */
      {
        qid: "M2.S4.T7.C27:7",
        kind: "rows",
        row: "p",
        tPre: true,
        weight: "1.30",
        unit: "m",
        parts: SLOT_FRACTION,
        answer: [130, 100],
        near: "13|10",
        winMs: 3e3,
        say: "Write 1.30 m as a fraction, just as printed.",
        ask: "1.30 m as printed",
        miss: "Read the top row, end zero and all."
      },
      /* practice 8: answer in the plan = 5250/1000, and a child who tidied to 5.25 first would have written 525/100
         (the win runs the tidied row too and hangs both on the beam) */
      {
        qid: "M2.S4.T7.C27:8",
        kind: "rows",
        row: "p",
        weight: "5.250",
        unit: "kg",
        parts: SLOT_FRACTION,
        answer: [5250, 1e3],
        near: "525|100",
        winMs: 5e3,
        say: "What fraction is the printed 5.250 kg?",
        ask: "5.250 kg as printed",
        miss: "Did you count the zero on the end?"
      }
    ]
  }
];
const SB_WARM = { 1: { weight: "9.2", unit: "kg" }, 2: { weight: "6.25", unit: "kg" }, 3: { weight: "3.70", unit: "kg" }, 4: { weight: "2.750", unit: "kg" } };
const SB_FREE = [{ weight: "2.750", unit: "kg" }, { weight: "1.50", unit: "kg" }, { weight: "6.800", unit: "kg" }, { weight: "3.20", unit: "kg" }, { weight: "9.40", unit: "kg" }];
const MODEL = {
  warmUps: [1, 2, 3, 4].map((k) => SB_WARM[k].weight + " " + SB_WARM[k].unit),
  freeWeights: SB_FREE.map((f) => f.weight + " " + f.unit),
  method: [
    "the digits without the point are the numerator",
    "count the printed places, an end zero included",
    "write one and a zero for every counted place underneath"
  ]
};
const sbDecs = (s) => String(s).split(".")[1] || "";
const sbTop = (s) => String(s).replace(".", "").replace(/^0+(?=\d)/, "");
const sbBot = (s) => "1" + new Array(sbDecs(s).length).fill("0").join("");
const sbTidy = (s) => /\.\d*0$/.test(String(s)) ? String(s).slice(0, -1) : String(s);
const judge = (item, v) => {
  if (item.parts === SLOT_DECIMAL) return judgeSlotDecimal(item, v);
  if (item.parts) return judgeSlotParts(item, v);
  const t = String(v != null ? v : "").trim();
  return /^\d+$/.test(t) && Number(t) === item.answer;
};
const oracle = () => PHASES.every((p) => p.items.every((it) => {
  const walk = (s) => {
    let num = 0, after = false, places = 0;
    for (const ch of String(s)) {
      if (ch === ".") {
        if (after) return null;
        after = true;
        continue;
      }
      const d = "0123456789".indexOf(ch);
      if (d < 0) return null;
      num = num * 10 + d;
      if (after) places += 1;
    }
    let den = 1;
    for (let q = 0; q < places; q++) den *= 10;
    return [num, den];
  };
  if (it.kind === "back") {
    const r2 = walk(it.weight), g = it.given || [];
    if (!r2 || r2[0] !== g[0] || r2[1] !== g[1]) return false;
    let z = 0, q = g[1];
    while (q > 1) {
      q = q / 10;
      z += 1;
    }
    const ds = String(g[0]);
    return ds.slice(0, ds.length - z) === String(it.answer[0]) && ds.slice(ds.length - z) === String(it.answer[1]);
  }
  const w = it.row === "t" ? String(it.weight).replace(/0$/, "") : it.weight;
  const r = walk(w);
  return !!r && r[0] === it.answer[0] && r[1] === it.answer[1];
}));
const nearMiss = (item) => item.near;
const answerForms = (item) => item.parts === SLOT_DECIMAL ? [item.answer[0] + "." + item.answer[1], speakable(item.answer[0] + "." + item.answer[1])] : item.parts ? item.answer.filter((x) => x >= 10).flatMap((x) => [String(x), indian(x), words(x)]) : [String(item.answer), indian(item.answer), words(item.answer)];
const agentKey = (item) => item.answer;
const HOOK = {};
const solve = (item, T2) => T2.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T2.submit(item.answer);
const answer = (item, v) => item.pad === "enter" && HOOK.set ? HOOK.set(v) : void 0;
const check = () => HOOK.check ? HOOK.check() : void 0;
const SB_CSS = `
.sb-move{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.sb-ring{transform-box:fill-box;transform-origin:center;animation:sbring 1.6s ease-out infinite}
@keyframes sbring{0%{opacity:.95;transform:scale(1)}100%{opacity:.2;transform:scale(1.06)}}
@media (prefers-reduced-motion:reduce){.sb-move{transition:none}.sb-ring{animation:none}}
`;
const SB_P = 88, SB_TW = 78, SB_TH = 88;
const SB_LEFT = shade(CONTENT.hundred, 0.25), SB_RIGHT = shade(CONTENT.one, 0.25), SB_DOT = shade(CONTENT.pointer, 0.25), SB_ZERO = "#767676";
const sbHue = (k) => [CONTENT.ten, CONTENT.bead, "#56B4E9"][Math.min(Math.max(k, 0), 2)];
const sbInk = (s, j) => {
  const ch = s[j], di = s.indexOf(".");
  return ch === "." ? SB_DOT : ch === "0" ? SB_ZERO : di >= 0 && j > di ? SB_RIGHT : SB_LEFT;
};
const sbAdv = (ch, size) => (ch === "." ? 0.36 : 0.6) * size;
function sbWeightRow(str, cx, base, size, lit, kp) {
  const s = String(str), di = s.indexOf(".");
  const total = s.split("").reduce((a, ch) => a + sbAdv(ch, size), 0);
  let x = cx - total / 2;
  const out = [];
  s.split("").forEach((ch, j) => {
    const a = sbAdv(ch, size), place = di >= 0 && j > di ? j - di - 1 : -1;
    if (place >= 0 && place < lit) out.push(<rect key={kp + "l" + j} x={x - 1} y={base - size * 0.86} width={a + 2} height={size * 1.04} rx={8} fill={tint(sbHue(place), 0.5)} />);
    out.push(<text key={kp + "t" + j} x={x + a / 2} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={sbInk(s, j)}>{ch}</text>);
    x += a;
  });
  return out;
}
function sbMini(cx, base, a, b, size, C, kp) {
  const wd = Math.max(String(a).length, String(b).length) * size * 0.6 + 14;
  return <g key={kp}>
      <text x={cx} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{String(a)}</text>
      <rect x={cx - wd / 2} y={base + size * 0.26} width={wd} height={4} rx={2} fill={C.ink} />
      <text x={cx} y={base + size * 1.22} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{String(b)}</text>
    </g>;
}
const SB_SCALE_R = 200 / 172, SB_BAG_R = 112 / 140;
const sbWin = (x, y, sw) => ({ x: x + 0.15 * sw, y: y + 0.47 * sw * SB_SCALE_R, w: 0.7 * sw, h: 0.38 * sw * SB_SCALE_R });
function sbScale(x, y, sw, bagH, C, kp) {
  const sh = sw * SB_SCALE_R, bw = bagH * SB_BAG_R, bx = x + sw / 2 - bw / 2, by = y + 0.05 * sh - bagH + 25 * sw / 270, wn = sbWin(x, y, sw);
  return <g key={kp}>
      {
    /* plain: a bowl, its neck and the body, kept inside the picture's outline so none of it peeks out round the skin */
  }
      <path
    d={`M ${x + 0.1 * sw} ${y + 0.1 * sh} L ${x + 0.9 * sw} ${y + 0.1 * sh} Q ${x + 0.82 * sw} ${y + 0.24 * sh} ${x + 0.5 * sw} ${y + 0.24 * sh} Q ${x + 0.18 * sw} ${y + 0.24 * sh} ${x + 0.1 * sw} ${y + 0.1 * sh} Z`}
    fill={tint(C.rule, 0.45)}
    stroke={C.rule}
    strokeWidth={2}
  />
      <rect x={x + 0.44 * sw} y={y + 0.24 * sh} width={0.12 * sw} height={0.16 * sh} fill={tint(C.rule, 0.3)} />
      <rect x={x + 0.16 * sw} y={y + 0.42 * sh} width={0.68 * sw} height={0.53 * sh} rx={RAD.card} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <Skin name="scale" x={x} y={y} w={sw} h={sh} fit="stretch" />
      <path
    d={`M ${bx + 0.32 * bw} ${by + 0.4 * bagH} Q ${bx + 0.2 * bw} ${by + 0.7 * bagH} ${bx + 0.26 * bw} ${by + 0.9 * bagH} L ${bx + 0.74 * bw} ${by + 0.9 * bagH} Q ${bx + 0.8 * bw} ${by + 0.7 * bagH} ${bx + 0.68 * bw} ${by + 0.4 * bagH} Z`}
    fill={tint(C.rule, 0.15)}
  />
      <path
    d={`M ${bx + 0.4 * bw} ${by + 0.4 * bagH} L ${bx + 0.43 * bw} ${by + 0.2 * bagH} L ${bx + 0.57 * bw} ${by + 0.2 * bagH} L ${bx + 0.6 * bw} ${by + 0.4 * bagH} Z`}
    fill={tint(C.rule, 0.25)}
  />
      <Skin name="bag" x={bx} y={by} w={bw} h={bagH} fit="stretch" />
      <rect x={wn.x} y={wn.y} width={wn.w} height={wn.h} rx={RAD.key} fill="#EEF1EA" stroke={shade(C.rule, 0.3)} strokeWidth={2} />
    </g>;
}
function sbTape(x, y, w, h, C, kp) {
  const sy = y + h * 0.24, sh = h * 0.52, sx0 = x + h * 0.8, sx1 = x + w - 4, marks = [];
  for (let px = sx0 + 10, k = 0; px < sx1 - 10; px += 12, k++) marks.push(<line key={kp + k} x1={px} y1={sy} x2={px} y2={sy + (k % 5 === 0 ? sh * 0.5 : sh * 0.25)} stroke="#4A4030" strokeWidth={2} />);
  return <g key={kp}>
      <rect x={sx0} y={sy} width={sx1 - sx0} height={sh} rx={6} fill="#F6D860" stroke="#B8962E" strokeWidth={2} />
      {marks}
      <rect x={sx1 - 6} y={sy - 6} width={10} height={sh + 12} rx={3} fill="#6B6B6B" />
      <rect x={x} y={y} width={h} height={h} rx={h * 0.24} fill="#F2C94C" stroke="#B8962E" strokeWidth={3} />
      <circle cx={x + h / 2} cy={y + h / 2} r={h * 0.22} fill="#FFFFFF" stroke="#B8962E" strokeWidth={3} />
    </g>;
}
function sbKeyRing(x, y, w, h, C) {
  return <rect
    className="sb-ring"
    x={x - 5}
    y={y - 5}
    width={w + 10}
    height={h + EDGE + 10}
    rx={RAD.key + 5}
    fill="none"
    stroke={THEME && THEME.enter && THEME.enter[1] || C.accent}
    strokeWidth={5}
    pointerEvents="none"
  />;
}
function Work({ phase, n, item, index, stage, wrong, typed, part, api, step, stepOn, box, lang = "en", tx = (v) => v }) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const demo = stage === "demo";
  const w = box ? box.w : W.w;
  const open = !!(box && box.open);
  const [fk, setFk] = useState(0);
  const [S, setS] = useState({});
  const [fixAt, setFixAt] = useState(null);
  const [fixing, setFixing] = useState(false);
  const lastAct = useRef({ name: "", t: 0 });
  const it = free ? { kind: "free", ...SB_FREE[fk % SB_FREE.length] } : demo ? { kind: "warm", ...SB_WARM[n] } : item || {};
  const k = free ? "free" : demo ? "warm" : it.kind;
  const rows = free || n === 4;
  const s = String(it.weight || "");
  const nd = sbDecs(s).length;
  const full = (x) => ({ shown: true, lit: sbDecs(x).length, top: sbTop(x), bot: sbBot(x) });
  const none = { shown: false, lit: 0, top: null, bot: null };
  const opening = () => {
    if (rows) {
      if (k === "free" || k === "warm") return { p: full(s), t: none, hung: false };
      if (it.row === "t") return { p: full(s), t: { ...none, shown: true }, hung: false };
      return { p: { ...none, shown: true }, t: it.tPre ? full(sbTidy(s)) : { ...none, shown: true }, hung: false };
    }
    if (k === "warm") return n === 1 ? {} : { carried: true, dropped: true };
    if (k === "back") return { carried: true, dropped: true, built: 0, lit: 0, cardTop: String(it.given[0]), cardBot: String(it.given[1]) };
    if (k === "top") return {};
    return { carried: true };
  };
  const group = free ? "free" : demo ? "demo" : "q";
  const setupKey = group + "|" + n + "|" + (group === "q" ? index : "") + "|" + (group === "free" ? fk : "");
  const fresh = () => ({ ...opening(), key: setupKey });
  const V = S.key === setupKey ? S : fresh();
  useEffect(() => {
    tl.stop();
    setS(fresh());
    setFixAt(null);
    setFixing(false);
  }, [setupKey]);
  useEffect(() => {
    if (demo && step === 0) {
      tl.stop();
      setS(fresh());
    }
  }, [demo, step]);
  const put = (o) => setS((x) => ({ ...x.key === setupKey ? x : fresh(), ...o }));
  const putRow = (row, o) => setS((x) => {
    const b = x.key === setupKey ? x : fresh();
    return { ...b, [row]: { ...b[row], ...o } };
  });
  const benchSeq = (name) => {
    const top = sbTop(s), bot = sbBot(s), Q = [];
    if (name === "carry") {
      Q.push([520, () => {
        put({ carried: true, carry: true });
        api.sfx.settle();
      }]);
      Q.push([0, () => put({ carry: false })]);
    }
    if (name === "drop") {
      Q.push([480, () => {
        put({ carried: true, dropped: true });
        api.sfx.tick();
      }]);
      Q.push([220, () => {
        put({ cardTop: top });
        api.sfx.settle();
      }]);
    }
    if (name === "zero") Q.push([300, () => {
      put({ zero: true });
      api.sfx.tick();
    }]);
    if (name === "count") {
      Q.push([340, () => put({ carried: true, dropped: true, cardTop: top, lit: 0 })]);
      for (let q = 1; q <= nd; q++) Q.push([380, () => {
        put({ lit: q });
        api.sfx.tick();
      }]);
    }
    if (name === "build") {
      Q.push([300, () => put({ carried: true, dropped: true, cardTop: top, lit: nd, built: 0 })]);
      for (let q = 1; q <= nd + 1; q++) Q.push([300, () => {
        put({ built: q });
        api.sfx.tick();
      }]);
      Q.push([0, () => {
        put({ cardBot: bot });
        api.sfx.settle();
      }]);
    }
    return Q;
  };
  const backSeq = () => {
    const Q = [[300, () => put({ lit: 0, built: 0, dotIn: false, disp: null })], [420, () => {
      put({ built: 1 });
      api.sfx.tick();
    }]];
    for (let q = 1; q <= nd; q++) Q.push([420, () => {
      put({ lit: q, built: q + 1 });
      api.sfx.tick();
    }]);
    Q.push([520, () => {
      put({ dotIn: true });
      api.sfx.settle();
    }]);
    Q.push([0, () => put({ disp: s })]);
    return Q;
  };
  const rowSeq = (row, x, first) => {
    const m = sbDecs(x).length, Q = [];
    Q.push([380, () => {
      putRow(row, { shown: true, lit: 0, top: null, bot: null });
      if (row === "t") put({ hung: false });
      if (first) first();
    }]);
    for (let q = 1; q <= m; q++) Q.push([340, () => {
      putRow(row, { lit: q });
      api.sfx.tick();
    }]);
    Q.push([320, () => putRow(row, { top: sbTop(x) })]);
    Q.push([320, () => {
      putRow(row, { bot: sbBot(x) });
      api.sfx.settle();
    }]);
    return Q;
  };
  const beamSeq = () => [[650, () => {
    setS((x) => {
      const b = x.key === setupKey ? x : fresh();
      return { ...b, t: b.t && b.t.bot ? b.t : full(sbTidy(s)), hung: true };
    });
    api.sfx.settle();
  }]];
  const seqOf = (name) => {
    if (!rows) return benchSeq(name);
    if (name === "tidy") return rowSeq("t", sbTidy(s), () => api.sfx.cut());
    if (name === "beam") return beamSeq();
    return [];
  };
  const doAct = (name) => {
    const now = Date.now();
    if (lastAct.current.name === name && now - lastAct.current.t < 600) return;
    lastAct.current = { name, t: now };
    if (demo) {
      if (api.did(name)) tl.run(seqOf(name));
      return;
    }
    if (free) {
      if (name === "weight") {
        tl.stop();
        setFk((f) => (f + 1) % SB_FREE.length);
        api.sfx.settle();
        return;
      }
      if (name === "beam" && !(V.t && V.t.bot)) return;
      tl.run(seqOf(name));
    }
  };
  api.onEnter(demo && stepOn ? () => doAct(stepOn) : null);
  HOOK.demo = () => {
    if (stepOn) doAct(stepOn);
  };
  const workSeq = (slow) => {
    if (k === "top") return [...benchSeq("carry"), ...benchSeq("drop"), ...benchSeq("count"), ...benchSeq("build")];
    if (k === "frac") return [...benchSeq("drop"), ...benchSeq("count"), ...benchSeq("build")];
    if (k === "back") return backSeq();
    if (k === "rows") {
      if (it.row === "t") return [...rowSeq("t", sbTidy(s), () => api.sfx.cut()), ...beamSeq()];
      if (it.tPre) return [...rowSeq("p", s), ...beamSeq()];
      return [...rowSeq("p", s), ...rowSeq("t", sbTidy(s), () => api.sfx.cut()), ...beamSeq()];
    }
    return [];
  };
  useEffect(() => {
    if (stage !== "win" || free) return;
    setFixing(false);
    const key = n + "-" + index;
    if (key === "1-0") api.say("Two digits came across to the top.");
    else if (key === "1-1") api.say("Only the point was left out of the top.");
    else if (key === "1-2") api.say("All three digits made the top, and the point rests above.");
    else if (key === "2-0") api.say("Two places lit, so the bottom has three digits.");
    else if (key === "2-1") api.say("Each zero sits right under its place.");
    else if (key === "2-2") api.say("Three places gave the longest bottom yet.");
    else if (key === "3-0") api.say("Three places counted, the end zero as well.");
    else if (key === "3-1") api.say("Two zeros after the one make a bottom of three digits.");
    else if (key === "3-2") api.say("Three zeros, so three digits after the point.");
    else if (key === "4-0") api.say("Same weight, but a different written fraction.");
    else if (key === "4-1") api.say("That is the form the label printed.");
    else if (key === "4-2") api.say("The bag keeps all three printed places in its fraction.");
    tl.run([[200, () => setS(fresh())], ...workSeq(false)]);
  }, [stage]);
  useEffect(() => {
    var _a, _b;
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    setFixing(true);
    setFixAt(String((_b = (_a = wrong.value) != null ? _a : typed) != null ? _b : ""));
    tl.run([[420, () => setS(fresh())], ...workSeq(true), [700, () => {
    }]], () => {
      setFixing(false);
      api.lock(false);
    });
  }, [wrong]);
  const fixShow = !!wrong && fixAt !== null && String(typed != null ? typed : "") === fixAt;
  useEffect(() => {
    if (!fixShow || fixing) return;
    const clear = (e) => {
      const hit = e.type === "keydown" ? /^([0-9.]|Backspace|Escape)$/.test(String(e.key)) : !!(e.target && e.target.closest && e.target.closest('[data-control^="key-"]'));
      if (hit) setFixAt(null);
    };
    window.addEventListener("keydown", clear, true);
    window.addEventListener("pointerdown", clear, true);
    return () => {
      window.removeEventListener("keydown", clear, true);
      window.removeEventListener("pointerdown", clear, true);
    };
  }, [fixShow, fixing]);
  const tp = slotPartsOf(typed, 2);
  const typedIn = !!(tp[0] || tp[1]);
  const fracAsked = !free && !demo && !!item && !!item.parts && item.parts !== SLOT_DECIMAL;
  const decAsked = !free && !demo && !!item && item.parts === SLOT_DECIMAL;
  const asking = stage === "ask" && !fixing;
  const cardVals = (asked, a, b) => {
    if (asked && stage === "ask") return fixShow ? [a, b] : [tp[0] || null, tp[1] || null];
    if (asked && (stage === "win" || stage === "idle") && typedIn) return [tp[0] || null, tp[1] || null];
    return [a, b];
  };
  const reveal = stage !== "ask" || !!wrong;
  const ar = rows ? it.row === "t" ? "t" : "p" : "";
  api.share({
    phase: n,
    printed: k === "back" && !reveal ? null : s,
    numerator: rows ? reveal ? V[ar] && V[ar].top || null : null : reveal || k === "back" ? V.cardTop || null : null,
    placesCounted: rows ? V[ar] ? V[ar].lit : 0 : V.lit || 0,
    denominator: rows ? reveal ? V[ar] && V[ar].bot || null : null : reveal || k === "back" ? V.cardBot || null : null,
    tidiedRow: rows ? !!(V.t && V.t.shown) : false,
    balanced: rows ? !!V.hung : false,
    complete: stage === "idle"
  });
  const fracCard = (x, y, cw, ch, vals, asked, size, head, kp) => {
    const hTop = head ? 44 : 10, bh = (ch - hTop - 26) / 2, bw = cw - 36;
    const y1 = y + hTop, yb = y1 + bh + 7, y2 = yb + 13;
    const typing = asked && asking && open;
    const box1 = (yy, v, j) => {
      const on = typing && part === j, has = v !== null && v !== void 0 && v !== "";
      const tw = has ? String(v).length * size * 0.6 : 0;
      return <g key={kp + "b" + j}>
          <rect
        x={x + 18}
        y={yy}
        width={bw}
        height={bh}
        rx={RAD.key}
        fill="#FFFFFF"
        stroke={on ? C.accent : C.rule}
        strokeWidth={on ? 4 : 2}
        strokeDasharray={has || typing ? void 0 : "8 8"}
      />
          {has && <text x={x + cw / 2} y={yy + bh / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{String(v)}</text>}
          {on && <rect className="c4-caret" x={x + cw / 2 + tw / 2 + 6} y={yy + bh / 2 - size * 0.4} width={4} height={size * 0.8} rx={2} fill={C.accent} />}
        </g>;
    };
    return <g key={kp}>
        <rect x={x} y={y} width={cw} height={ch} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        {head && <text x={x + cw / 2} y={y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Fraction")}</text>}
        {box1(y1, vals[0], 0)}
        <rect x={x + 18} y={yb} width={bw} height={6} rx={3} fill={C.ink} />
        {box1(y2, vals[1], 1)}
        {asked && asking && !open && <g>
            <BlinkRing x={x} y={y} w={cw} h={ch} rx={RAD.card} C={C} />
            <SlotPartBox id="answer-open" label={tx("Fraction")} x={x} y={y} w={cw} h={ch} on={false} enabled onPick={() => api.openAnswer()} />
          </g>}
        {typing && <g>
            <SlotPartBox id="part-1" label={tx("top number")} x={x} y={y} w={cw} h={yb - y + 3} on={part === 0} enabled onPick={() => api.pickPart(0)} />
            <SlotPartBox id="part-2" label={tx("bottom number")} x={x} y={yb + 3} w={cw} h={y + ch - yb - 3} on={part === 1} enabled onPick={() => api.pickPart(1)} />
          </g>}
      </g>;
  };
  const invite = (on) => demo && stepOn === on;
  const uS = lang === "en" ? T.label : T.micro, uW = lang === "en" ? 80 : 112;
  const bench = () => {
    var _a, _b;
    const m = Math.max(30, Math.min(80, (w - 930) / 4));
    const scX = m, bL = scX + 270 + m, R = bL + 5 * SB_P, cardX = R + m - 10;
    const scY = 110, d = sbWin(scX, scY, 270), isLen = it.unit === "m";
    const di = s.indexOf("."), chars = s.split("");
    const dropped = !!V.dropped && !V.dotIn;
    const nT = dropped ? chars.length - 1 : chars.length;
    const tileY = 64, botY = 184;
    const parked = k === "back" && !V.dotIn;
    const restX = parked ? bL + SB_TW / 2 : R - nd * SB_P - 5, restY = 30;
    const built = V.built || 0;
    const lit = V.lit || 0;
    const dispAsked = decAsked && (stage === "ask" || stage === "win" || stage === "idle");
    const dParts = dispAsked ? stage === "ask" ? fixShow ? null : tp : typedIn ? tp : null : null;
    const dText = dispAsked ? dParts ? null : V.disp : s;
    const dTyping = decAsked && asking && open;
    const pv0 = dParts || ["", ""], nW = Math.max(1, pv0[0].length), nD = Math.max(2, pv0[1].length), room = d.w - 16 - 22;
    const wB = Math.max(54, Math.round(room * nW / (nW + nD))), wD = room - wB, xP = d.x + 8 + wB + 2, xD = xP + 20;
    const dbY = d.y + 22, dbH = 76;
    const pv = dParts || ["", ""];
    const dSize = [T.xl, T.speech, T.prompt, T.label, T.micro].find((z) => pv[0].length * z * 0.6 <= wB - 10 && pv[1].length * z * 0.6 <= wD - 10) || T.micro;
    const dBox = (bx, bw, v, j) => {
      const on = dTyping && part === j, has = !!v, tw = has ? v.length * dSize * 0.6 : 0;
      return <g key={"db" + j}>
          <rect
        x={bx}
        y={dbY}
        width={bw}
        height={dbH}
        rx={RAD.key}
        fill="#FFFFFF"
        stroke={on ? C.accent : C.rule}
        strokeWidth={on ? 4 : 2}
        strokeDasharray={has || dTyping ? void 0 : "8 8"}
      />
          {has && <text x={bx + bw / 2} y={dbY + dbH / 2 + dSize * 0.36} textAnchor="middle" fontSize={dSize} fontWeight={700} fill={j === 0 ? SB_LEFT : SB_RIGHT}>{v}</text>}
          {on && <rect className="c4-caret" x={bx + bw / 2 + tw / 2 + 4} y={dbY + dbH / 2 - dSize * 0.4} width={4} height={dSize * 0.8} rx={2} fill={C.accent} />}
        </g>;
    };
    return <g>
        {
      /* the kitchen scale, the sack of rice on its pan, the display window */
    }
        {isLen ? sbTape(scX, 104, 270, 110, C, "tp") : sbScale(scX, scY, 270, 70, C, "sc")}
        {isLen && <rect x={d.x} y={d.y} width={d.w} height={d.h} rx={RAD.key} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={2} />}
        <rect x={d.x + d.w / 2 - 70} y={d.y - 42} width={140} height={36} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={d.x + d.w / 2} y={d.y - 14} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Decimal")}</text>
        {dText ? sbWeightRow(dText, d.x + d.w / 2, d.y + d.h / 2 + 20, T.xl, 0, "dw") : null}
        {dispAsked && !dText && <g>
            {dBox(d.x + 8, wB, pv[0], 0)}
            <text x={xP + 9} y={dbY + dbH / 2 + 18} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={SB_DOT}>.</text>
            {dBox(xD, wD, pv[1], 1)}
          </g>}
        <rect x={scX + 135 - uW / 2} y={d.y + d.h + 6} width={uW} height={38} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={scX + 135} y={d.y + d.h + 36} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(it.unit || "kg")}</text>
        {decAsked && asking && !open && <g>
            <BlinkRing x={d.x} y={d.y} w={d.w} h={d.h} rx={RAD.panel} C={C} />
            <SlotPartBox id="answer-open" label={tx("Decimal")} x={d.x} y={d.y} w={d.w} h={d.h} on={false} enabled onPick={() => api.openAnswer()} />
          </g>}
        {dTyping && <g>
            <SlotPartBox id="part-1" label={tx("whole part")} x={d.x} y={d.y} w={xP + 9 - d.x} h={d.h} on={part === 0} enabled onPick={() => api.pickPart(0)} />
            <SlotPartBox id="part-2" label={tx("decimal part")} x={xP + 9} y={d.y} w={d.x + d.w - xP - 9} h={d.h} on={part === 1} enabled onPick={() => api.pickPart(1)} />
          </g>}
        {
      /* the carry: the display's weight comes across to the bench, unchanged on the way */
    }
        <path
      d={`M ${scX + 272} ${d.y + 30} C ${scX + 272 + m / 2} ${d.y + 30}, ${bL - m / 2 - 8} ${tileY + 44}, ${bL - 10} ${tileY + 44}`}
      fill="none"
      stroke={V.carry ? C.accent : C.rule}
      strokeWidth={V.carry ? 5 : 3}
      strokeDasharray={V.carry ? void 0 : "8 10"}
    />
        {!V.carried && <rect x={R - 5 * SB_P - 4} y={tileY - 6} width={5 * SB_P - 2} height={SB_TH + 12} rx={RAD.card} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 12" />}
        {
      /* the weight's tiles (the top number once the dot is out), each a printed character, keyed by where it was printed */
    }
        {V.carried && chars.map((ch, j) => {
      if (ch === ".") {
        const inRow = !dropped;
        const cx = inRow ? R - (nT - j) * SB_P + SB_TW / 2 : restX, cy = inRow ? tileY + SB_TH / 2 : restY;
        return <g key={"t" + j} className="sb-move" style={{ transform: `translate(${cx}px, ${cy}px)` }}>
                {inRow && <rect x={-SB_TW / 2} y={-SB_TH / 2} width={SB_TW} height={SB_TH} rx={RAD.key} fill={tint(CONTENT.pointer, 0.85)} stroke={C.rule} strokeWidth={2} />}
                {!inRow && <circle cx={0} cy={0} r={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="5 5" />}
                <circle cx={0} cy={inRow ? 18 : 0} r={9} fill={SB_DOT} />
              </g>;
      }
      const q = dropped && j > di ? j - 1 : j;
      const place = j > di ? j - di - 1 : -1;
      const on = place >= 0 && place < lit;
      const hue = sbHue(place);
      const x = R - (nT - q) * SB_P;
      return <g key={"t" + j} className="sb-move" style={{ transform: `translate(${x}px, ${tileY}px)` }}>
              <rect x={0} y={0} width={SB_TW} height={SB_TH} rx={RAD.key} fill={on ? tint(hue, 0.55) : "#FFFFFF"} stroke={on ? shade(hue, 0.3) : C.rule} strokeWidth={on ? 3 : 2} />
              <text x={SB_TW / 2} y={64} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={parked ? C.ink : sbInk(s, j)}>{ch}</text>
              {on && <g>
                  <circle cx={SB_TW - 12} cy={2} r={17} fill="#FFFFFF" stroke={shade(hue, 0.3)} strokeWidth={3} />
                  <text x={SB_TW - 12} y={12} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{place + 1}</text>
                </g>}
              {V.zero && j === chars.length - 1 && <rect x={-7} y={-7} width={SB_TW + 14} height={SB_TH + 14} rx={RAD.key + 6} fill="none" stroke={C.accent} strokeWidth={4} />}
            </g>;
    })}
        {
      /* the bottom number: a one, then a zero under every counted place */
    }
        {built > 0 && <rect x={R - Math.max(nT, nd + 1) * SB_P} y={botY - 16} width={Math.max(nT, nd + 1) * SB_P - 10} height={6} rx={3} fill={C.ink} />}
        {new Array(Math.min(built, nd + 1)).fill(0).map((_, q) => {
      const x = R - (nd + 1 - q) * SB_P, hue = sbHue(q - 1), tinted = q > 0 && q - 1 < lit;
      return <g key={"b" + q}>
              <rect x={x} y={botY} width={SB_TW} height={SB_TH} rx={RAD.key} fill={tinted ? tint(hue, 0.55) : "#FFFFFF"} stroke={tinted ? shade(hue, 0.3) : C.rule} strokeWidth={tinted ? 3 : 2} />
              <text x={x + SB_TW / 2} y={botY + 64} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{q === 0 ? "1" : "0"}</text>
            </g>;
    })}
        {lit > 0 && <text x={bL + 5 * SB_P / 2} y={322} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{lit + " " + tx(lit === 1 ? "place" : "places")}</text>}
        {
      /* the step keys (phases 2 and 3): live in a guide step, quiet while a question is asked */
    }
        {n !== 1 && <g>
            <Key id="count" label={tx("Count")} x={bL} y={420} w={200} h={72} C={C} tone="key" disabled={!demo} onClick={() => doAct("count")}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={demo ? toneInk("key", C.ink) : mix(C.ink, C.panel, 0.35)}>{tx("Count")}</text>
            </Key>
            <Key id="build" label={tx("Build")} x={bL + 240} y={420} w={200} h={72} C={C} tone="key" disabled={!demo} onClick={() => doAct("build")}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={demo ? toneInk("key", C.ink) : mix(C.ink, C.panel, 0.35)}>{tx("Build")}</text>
            </Key>
          </g>}
        {
      /* the step pieces: the display (carry), the dot (drop), the end zero (zero) */
    }
        {demo && n === 1 && !V.carried && <Hit id="carry" x={d.x} y={d.y} w={d.w} h={d.h} label={tx("scale display")} onPress={() => doAct("carry")} />}
        {demo && n === 1 && V.carried && !dropped && di >= 0 && <Hit id="drop" x={R - (nT - di) * SB_P} y={tileY} w={SB_TW} h={SB_TH} label={tx("the point")} onPress={() => doAct("drop")} />}
        {demo && n === 3 && <Hit id="zero" x={R - SB_TW - 10} y={tileY} w={SB_TW} h={SB_TH} label={tx("the end zero")} onPress={() => doAct("zero")} />}
        {invite("carry") && <Invite x={d.x + d.w / 2} y={d.y + d.h / 2} r={52} C={C} />}
        {invite("drop") && V.carried && <Invite x={R - (nT - di) * SB_P + SB_TW / 2} y={tileY + SB_TH / 2} r={52} C={C} />}
        {invite("zero") && <Invite x={R - SB_TW / 2 - 10} y={tileY + SB_TH / 2} r={52} C={C} />}
        {invite("count") && sbKeyRing(bL, 420, 200, 72, C)}
        {invite("build") && sbKeyRing(bL + 240, 420, 200, 72, C)}
        {
      /* the Fraction card */
    }
        {fracCard(cardX, 40, 220, 330, cardVals(fracAsked, (_a = V.cardTop) != null ? _a : null, (_b = V.cardBot) != null ? _b : null), fracAsked, T.xl, true, "fc")}
      </g>;
  };
  const twoRows = () => {
    const m4 = Math.max(30, Math.min(90, (w - 830) / 4));
    const rL = m4, cX = rL + 300, bx = cX + 190 + m4 + 215;
    const asked = (row) => !free && !demo && fracAsked && (it.row === "t" ? "t" : "p") === row;
    const P = V.p || none, Tr = V.t || none;
    const pw = sbWin(rL, 40, 190), pMid = pw.y + pw.h / 2, isLen = it.unit === "m";
    const pVals = cardVals(asked("p"), P.top, P.bot);
    const tVals = cardVals(asked("t"), Tr.top, Tr.bot), ts = sbTidy(s);
    const arrow = (x0, x1, y) => <path d={`M ${x0} ${y} H ${x1 - 2} M ${x1 - 14} ${y - 10} L ${x1} ${y} L ${x1 - 14} ${y + 10}`} fill="none" stroke={C.rule} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />;
    const hung = !!V.hung;
    return <g>
        {isLen ? sbTape(rL, 34, 240, 84, C, "pt") : sbScale(rL, 40, 190, 56, C, "ps")}
        {isLen && <rect x={pw.x} y={pw.y} width={pw.w} height={pw.h} rx={RAD.key} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={2} />}
        <text x={rL + 132} y={30} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("printed")}</text>
        {sbWeightRow(s, pw.x + pw.w / 2, pw.y + pw.h / 2 + 15, T.prompt, P.lit, "pw")}
        <text x={rL + 198} y={pMid - 4} fontSize={uS} fontWeight={600} fill={C.ink}>{tx(it.unit || "kg")}</text>
        {P.lit > 0 && <text x={rL + 95} y={288} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{P.lit + " " + tx(P.lit === 1 ? "place" : "places")}</text>}
        {arrow(rL + 198, cX - 10, pMid + 24)}
        {fracCard(cX, pMid - 75, 190, 150, pVals, asked("p"), T.speech, false, "pc")}
        {hung && <text x={cX + 95} y={294} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("written differently")}</text>}

        <text x={rL} y={326} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tidied")}</text>
        <rect x={rL} y={334} width={214} height={64} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray={Tr.shown ? void 0 : "10 12"} />
        {Tr.shown && sbWeightRow(ts, rL + (lang === "en" ? 88 : 76), 382, T.speech, Tr.lit, "tw")}
        {Tr.shown && <text x={rL + 204} y={382} textAnchor="end" fontSize={uS} fontWeight={600} fill={C.ink}>{tx(it.unit || "kg")}</text>}
        {Tr.shown && Tr.lit > 0 && <text x={rL + 107} y={428} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{Tr.lit + " " + tx(Tr.lit === 1 ? "place" : "places")}</text>}
        {arrow(rL + 224, cX - 10, 366)}
        {fracCard(cX, 320, 190, 150, tVals, asked("t"), T.speech, false, "tc")}

        {
      /* the balance beam: it is about how much, so it is level, always */
    }
        <rect x={bx - 170} y={120} width={340} height={16} rx={8} fill={shade(C.rule, 0.25)} />
        <path d={`M ${bx - 24} ${172} L ${bx + 24} ${172} L ${bx} ${136} Z`} fill={shade(C.rule, 0.35)} />
        <rect x={bx - 9} y={172} width={18} height={228} fill={shade(C.rule, 0.2)} />
        <rect x={bx - 80} y={400} width={160} height={16} rx={6} fill={shade(C.rule, 0.3)} />
        {[["p", -1], ["t", 1]].map(([row, sg]) => {
      const r = V[row] || none, px = bx + sg * 150;
      return <g key={"pan" + row}>
              <line x1={px} y1={136} x2={px - 52} y2={194} stroke={shade(C.rule, 0.3)} strokeWidth={3} />
              <line x1={px} y1={136} x2={px + 52} y2={194} stroke={shade(C.rule, 0.3)} strokeWidth={3} />
              <rect x={px - 65} y={194} width={130} height={112} rx={16} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
              {hung && r.bot && sbMini(px, 236, r.top, r.bot, T.label, C, "m" + row)}
            </g>;
    })}
        {hung && <text x={bx} y={92} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(it.unit === "m" ? "same length" : "same weight")}</text>}
        {(demo || free && V.t && V.t.bot) && <Hit id="beam" x={bx - 215} y={76} w={430} h={340} label={tx("balance beam")} onPress={() => doAct("beam")} />}
        <Key id="tidy" label={tx("Tidy")} x={rL} y={446} w={214} h={72} C={C} tone="key" disabled={!(demo || free)} onClick={() => doAct("tidy")}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={demo || free ? toneInk("key", C.ink) : mix(C.ink, C.panel, 0.35)}>{tx("Tidy")}</text>
        </Key>
        {free && <Key id="weight" label={tx("New weight")} x={bx - 110} y={446} w={220} h={72} C={C} tone="key" onClick={() => doAct("weight")}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={toneInk("key", C.ink)}>{tx("New weight")}</text>
          </Key>}
        {invite("tidy") && sbKeyRing(rL, 446, 214, 72, C)}
        {invite("beam") && <Invite x={bx} y={230} r={60} C={C} />}
      </g>;
  };
  return <g>
      <style>{SB_CSS}</style>
      {rows ? twoRows() : bench()}
    </g>;
}
function Thumb({ n, result, C, w, h, lang = "en", tx = (v) => v }) {
  const last = result && result.last;
  if (!last) return null;
  const ph = PHASES[(n || 1) - 1] || PHASES[0];
  const it = (typeof last.item === "number" ? ph.items[last.item] : last.item) || {};
  const s = String(it.weight || ""), mid = h / 2;
  const ws = it.row === "t" ? sbTidy(s) : s;
  const ans = last.answer !== void 0 && last.answer !== null ? last.answer : it.answer;
  const pair = Array.isArray(ans) && ans.length === 2 && it.kind !== "back" ? ans : [sbTop(ws), sbBot(ws)];
  const arrow = <path d={`M 104 ${mid} H 124 M 116 ${mid - 8} L 126 ${mid} L 116 ${mid + 8}`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />;
  return <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {it.kind === "back" ? <g>
          {sbMini(54, mid - 6, sbTop(s), sbBot(s), T.micro, C, "tg")}
          {arrow}
          <text x={142} y={mid + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>{s}</text>
        </g> : <g>
          <text x={12} y={mid + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>{ws}</text>
          {arrow}
          {sbMini(142 + (Math.max(String(pair[0]).length, String(pair[1]).length) * T.micro * 0.6 + 14) / 2, mid - 6, pair[0], pair[1], T.micro, C, "tf")}
        </g>}
    </g>;
}
function ScaleBench(props) {
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
    fitHost: () => null,
    /* no point key: every answer is written in boxes (a fraction on the Fraction card, a weight on the Decimal display,
       whose point is already drawn), so a single-box decimal never comes up */
    /* the board layout (LAYOUT.md §1b): the question on a bar across the top, the working area the whole card until
       the keypad opens, the keypad in a panel that slides in from the right */
    board: true,
    /* answering on the card (PATTERNS.md 9e): a fraction is written on the Fraction card, a weight on the scale's
       Decimal display; phase 1's top number keeps the blinking Answer key */
    cardAnswer: true,
    /* the Next key (PATTERNS.md 9d): nothing moves on by itself; the win picture waits for the child's tap on Next */
    nextKey: true,
    /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
    StartArt,
    START_HOOK
  }} />;
}
var stdin_default = ScaleBench;
export default stdin_default;
