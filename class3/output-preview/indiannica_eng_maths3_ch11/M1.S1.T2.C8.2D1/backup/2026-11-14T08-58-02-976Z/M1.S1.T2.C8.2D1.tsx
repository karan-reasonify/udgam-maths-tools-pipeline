import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
/* M1.S1.T2.C8.2D1 · count_the_money · Count the Money — standalone build 2026-11-11, source 74355364:802247.
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
const ZKEY = {
  canvas: { x: 40, y: 92, w: 1520, h: 548 },
  work: { x: 64, y: 108, w: 1472, h: 520 },
  drawer: { x: 1164, y: 108, w: 372, h: 520 },
  slot: { x: 1180, y: 198, w: 340, h: 92 },
  pad: { x: 1180, y: 298, w: 340, h: 318 }
};
const ZKEY_BIG = {
  drawer: { x: 980, y: 108, w: 556, h: 520 },
  slot: { x: 996, y: 198, w: 524, h: 92 },
  pad: { x: 996, y: 298, w: 524, h: 318 }
};
const KEY_CORNER = { x: 1254, y: 108, w: 282, h: 88 };
function choiceKeyW(choices, lang, TR2) {
  const longest = Math.max(...(choices || []).map((c) => lineFor(c.label, lang, TR2).length));
  return Math.min(236, Math.max(150, Math.ceil(longest * T.label * 0.6 + 28)));
}
function footerBoxes(keyOnly, navDots, N) {
  const bx = keyOnly ? 343 : 254, by = keyOnly ? 656 : 748, bh = keyOnly ? 236 : 144, n = Math.max(N, 1), dx = 1564 - n * HIT;
  return { bubble: { x: bx, y: by, w: navDots ? dx - 20 - bx : keyOnly ? 910 - bx : 656, h: bh }, dots: { x: dx, y: by + bh / 2 - HIT / 2, w: n * HIT, h: HIT } };
}
const FIT_CLASSIC = {
  hint: [[32, 1, 32, 2, 0], [32, 2, 32, 1, 0], [32, 1, 32, 1, 0], [28, 1, 28, 2, 0], [28, 2, 28, 1, 0], [28, 1, 28, 1, 0], [28, 2, 28, 2, 1]],
  plain: [[44, 2, 24], [32, 3, 32]]
};
const FIT_KEY = {
  devEm: 0.5,
  devPit: 1.6,
  devTop: 0.3,
  inkEn: [0.78, 0.27],
  inkDev: [1.09, 0.4],
  hint: [[48, 1, 48, 2, 0], [48, 2, 48, 1, 0], [48, 2, 48, 2, 0], [44, 1, 44, 2, 0], [44, 2, 44, 1, 0], [44, 2, 44, 2, 0], [40, 2, 40, 2, 0], [40, 3, 40, 2, 1]],
  plain: [[56, 2, 1022 / 56], [50, 3, 1022 / 50], [46, 3, 1022 / 46], [46, 4, 1022 / 46, "en"], [40, 5, 1022 / 40, "en"]]
};
let BOARD = false;
let BIGPAD = false;
let KEYONLY = false;
let NAVDOTS = false;
function setLayout(board, big = false, key = false, nav = false, N = 1) {
  const src = board ? ZBOARD : ZCLASSIC;
  for (const k of Object.keys(src)) {
    if (!Z[k]) Z[k] = {};
    Object.assign(Z[k], src[k]);
  }
  if (board && big) for (const k of Object.keys(ZBOARD_BIG)) Object.assign(Z[k], ZBOARD_BIG[k]);
  if (KEYONLY || NAVDOTS || key || nav) for (const k of ["canvas", "bubble", "bar"]) Object.assign(Z[k], ZCLASSIC[k]);
  const keyOnly = !!(board && key);
  if (keyOnly) {
    for (const k of Object.keys(ZKEY)) Object.assign(Z[k], ZKEY[k]);
    if (big) for (const k of Object.keys(ZKEY_BIG)) Object.assign(Z[k], ZKEY_BIG[k]);
  }
  if (keyOnly || nav) {
    const f = footerBoxes(keyOnly, nav, N);
    Object.assign(Z.bubble, f.bubble);
    if (nav) Object.assign(Z.bar, f.dots);
  }
  BOARD = board;
  BIGPAD = !!(board && big);
  KEYONLY = keyOnly;
  NAVDOTS = !!nav;
}
const MASCOT_BOX = { x: 28, y: 738, w: 204, h: 160 };
const MASCOT_SCALE_KEY = 1.45;
const MASCOT_T_KEY = `translate(${MASCOT_BOX.x} ${MASCOT_BOX.y + MASCOT_BOX.h}) scale(${MASCOT_SCALE_KEY}) translate(${-MASCOT_BOX.x} ${-(MASCOT_BOX.y + MASCOT_BOX.h)})`;
function mascotBoxOf(keyOnly) {
  const m = MASCOT_BOX, k = keyOnly ? MASCOT_SCALE_KEY : 1;
  return { x: m.x, y: m.y + m.h - m.h * k, w: m.w * k, h: m.h * k };
}
const HIT = 72;
const TOOL_API = ["getState", "gotoStep", "say", "answer", "check", "reset", "next", "prev", "highlight", "setParam", "playDemo"];
const FONT = "'C4 Poppins', Poppins, 'Segoe UI', system-ui, -apple-system, 'Noto Sans Devanagari', 'Noto Sans Gujarati', sans-serif";
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
function wrapWords(s) {
  const out = [];
  for (const w of String(s || "").split(/[ \t\n\r]+/)) {
    if (!w) continue;
    if (out.length && /^[-−]?\d[\d,]*(\.\d+)?$/.test(out[out.length - 1])) out[out.length - 1] += " " + w;
    else out.push(w);
  }
  return out;
}
function wrapText(s, max) {
  const out = [];
  let line = "";
  for (const w of wrapWords(s)) {
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
    for (const w of wrapWords(s)) {
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
    const list = (Array.isArray(lines) ? lines : [lines]).map((l) => SILENT_VOICE && KEYONLY ? String(l == null ? "" : l) : speakableIn(l, langRef.current)).filter(Boolean).flatMap((l) => pieces(l));
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
      if (/\d/.test(text) && !(SILENT_VOICE && KEYONLY)) console.warn("[voice] a spoken line still contains a digit:", text);
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
function Invite({ x, y, r = 56, w, h, rx, C }) {
  const stroke = THEME && THEME.enter && THEME.enter[1] || C && C.accent || DEFAULT_CHROME.accent;
  if (w && h) return <rect className="c4-pulse" x={x - w / 2 - 6} y={y - h / 2 - 6} width={w + 12} height={h + 12} rx={(rx != null ? rx : RAD.key) + 6} fill="none" stroke={stroke} strokeWidth={5} pointerEvents="none" />;
  return <circle className="c4-pulse" cx={x} cy={y} r={r} fill="none" stroke={stroke} strokeWidth={5} pointerEvents="none" />;
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
      if (e.repeat) return;
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
let FONT_KIT_STYLE = null;
function fontKitCss(base) {
  if (!FONT_KIT_STYLE || FONT_KIT_STYLE.base !== base) {
    const k = typeof FONT_KIT !== "undefined" && FONT_KIT && FONT_KIT.css ? FONT_KIT.css : "";
    FONT_KIT_STYLE = { base, out: k ? base + k : base };
  }
  return FONT_KIT_STYLE.out;
}
function useFontKit() {
  const [gen, setGen] = useState(0);
  useEffect(() => {
    const k = typeof FONT_KIT !== "undefined" && FONT_KIT, fonts = typeof document !== "undefined" && document.fonts;
    if (!k || !fonts) return;
    let live = true;
    Promise.all((k.weights || []).map((w) => fonts.load(`${w} 32px '${k.family}'`).catch(() => null))).then(() => fonts.ready).then(() => {
      if (live) setGen(1);
    }).catch(() => {
    });
    return () => {
      live = false;
    };
  }, []);
  return gen;
}
const ACT_SFX = { slice: "cut", snip: "cut", slide: "trade", draw: "tick", rub: "tick", tap: "tick", push: "settle", carry: "trade", sweep: "settle" };
const ACT_TRAVEL = { slide: 1, draw: 1, push: 1, carry: 1, sweep: 1 };
const ACT_TEMPO = 1.5, ACT_BEAT = 400;
const ACT_IN = Math.round(240 * ACT_TEMPO), ACT_OUT = Math.round(220 * ACT_TEMPO), ACT_MAX = Math.round(1500 * ACT_TEMPO);
const ACT_OFF = { knife: [0, -170], scissors: [0, 170], pencil: [150, -150], eraser: [150, -90], hand: [130, 150] };
const actOk = (p) => !!p && isFinite(p.x) && isFinite(p.y);
function actPic(k) {
  const src = typeof ACTION_KIT !== "undefined" && ACTION_KIT ? ACTION_KIT[k] : "";
  if (!src || k === "hand") return null;
  const fit = typeof ACTION_KIT_FIT !== "undefined" && ACTION_KIT_FIT && ACTION_KIT_FIT[k];
  return { src, fit: fit || { w: 1, h: 1, len: 140, ax: 0.5, ay: 0.5, rot: 0 } };
}
function actPlan(o) {
  if (String(o.moves || o.move || "") === "write") return penPlan(o);
  const move = String(o.moves || o.move || "tap"), tool = String(o.tool || "hand");
  const at = (o.at || []).filter(actOk), path = [o.from, ...at, o.to].filter(actOk);
  if (!path.length) return null;
  const travel = !!ACT_TRAVEL[move] && path.length > 1, pts = travel ? path : at.length ? at : path;
  const total = Math.round(Math.min(ACT_MAX, Math.max(700 * ACT_TEMPO, ACT_TEMPO * (Number(o.ms) || 1100 + 100 * Math.max(0, pts.length - 2)))));
  const mid = total - ACT_IN - ACT_OUT, cum = [0];
  for (let k = 1; k < path.length; k++) cum.push(cum[k - 1] + Math.hypot(path[k].x - path[k - 1].x, path[k].y - path[k - 1].y));
  const len = cum[cum.length - 1] || 1, first = actOk(o.from) ? 1 : 0, pic = actPic(tool);
  const hits = at.map((_, i) => Math.round(ACT_IN + mid * (!travel ? (i + 0.65) / at.length : move === "slide" && pic ? 0.4 + 0.6 * cum[i + first] / len : cum[i + first] / len)));
  const a = path[0], b = path[path.length - 1], dl = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const off = move === "slide" && pic ? [-(b.x - a.x) / dl * 160, -(b.y - a.y) / dl * 160] : ACT_OFF[pic ? tool : "hand"] || ACT_OFF.hand;
  return { move, tool, pic, total, mid, hits, pts, path, cum, len, travel, off, first, at };
}
function actPose(p, t) {
  const cl = (v) => Math.max(0, Math.min(1, v)), tm = cl((t - ACT_IN) / p.mid);
  let x = p.path[0].x, y = p.path[0].y, u = -1, dir = [1, 0];
  if (p.travel && !(p.move === "slide" && p.pic)) {
    const s = tm * p.len;
    let j = 1;
    while (j < p.cum.length - 1 && p.cum[j] < s) j++;
    const a = p.path[j - 1], b = p.path[j], seg = p.cum[j] - p.cum[j - 1] || 1, f = cl((s - p.cum[j - 1]) / seg);
    x = a.x + (b.x - a.x) * f;
    y = a.y + (b.y - a.y) * f;
    dir = [(b.x - a.x) / seg, (b.y - a.y) / seg];
  } else if (!p.travel) {
    const n = p.pts.length, k = Math.min(n - 1, Math.floor(tm * n)), f = tm * n - k;
    const a = p.pts[Math.max(0, k - 1)], b = p.pts[k], g = k > 0 ? cl(f / 0.3) : 1, e = g * g * (3 - 2 * g);
    x = a.x + (b.x - a.x) * e;
    y = a.y + (b.y - a.y) * e;
    u = f < 0.3 ? -1 : cl((f - 0.3) / 0.7);
  }
  const lead = t < ACT_IN ? 1 - cl(t / ACT_IN) : t > p.total - ACT_OUT ? 1 - cl((p.total - t) / ACT_OUT) : 0;
  return { x: x + p.off[0] * lead * lead, y: y + p.off[1] * lead * lead, o: 1 - lead, u, tm, dir };
}
function ActHand({ pose, ink }) {
  const s = { fill: "#FBF8F2", stroke: ink, strokeWidth: 4, strokeLinejoin: "round" };
  const cuff = { fill: "#E8E1D4", stroke: ink, strokeWidth: 4 };
  if (pose === "open") return <g data-role="act-hand" data-pose="open">
      <rect x={-30} y={36} width={60} height={26} rx={8} {...cuff} />
      <ellipse cx={-42} cy={8} rx={11} ry={24} transform="rotate(-35 -42 8)" {...s} />
      {[[-34, 52], [-16, 60], [2, 56], [20, 46]].map(([fx, fh], k) => <rect key={k} x={fx} y={-10 - fh} width={16} height={fh + 14} rx={8} {...s} />)}
      <rect x={-36} y={-22} width={72} height={62} rx={24} {...s} />
    </g>;
  if (pose === "grip") return <g data-role="act-hand" data-pose="grip">
      <rect x={-28} y={30} width={56} height={24} rx={8} {...cuff} />
      <rect x={-36} y={-20} width={72} height={56} rx={24} {...s} />
      {[-25, -9, 7, 23].map((fx, k) => <circle key={k} cx={fx} cy={-18} r={10} {...s} />)}
      <rect x={-32} y={0} width={46} height={18} rx={9} {...s} />
    </g>;
  return <g data-role="act-hand" data-pose="point">
      <rect x={-34} y={98} width={68} height={26} rx={8} {...cuff} />
      <ellipse cx={-34} cy={72} rx={12} ry={22} transform="rotate(-30 -34 72)" {...s} />
      <rect x={-36} y={42} width={74} height={62} rx={26} {...s} />
      <rect x={8} y={42} width={30} height={20} rx={10} {...s} />
      <rect x={10} y={60} width={28} height={18} rx={9} {...s} />
      <rect x={10} y={76} width={26} height={17} rx={8} {...s} />
      <rect x={-12} y={0} width={24} height={62} rx={12} {...s} />
    </g>;
}
function ActLayer({ play, w, h, C }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const step = () => {
      setT(performance.now() - play.t0);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [play]);
  if (play.move === "write") return penWriteLayer(play, Math.min(t, performance.now() - play.t0), w, h, C);
  const q = actPose(play, t), d = q.u >= 0 ? Math.sin(Math.PI * q.u) : 0, m = play.move, pic = play.pic;
  let dx = 0, dy = 0, rot = 0, sx = 1;
  if (m === "slice") dy = -56 + 86 * d;
  else if (m === "snip") {
    dy = 14 * (1 - d);
    sx = 1 - 0.3 * d;
  } else if (m === "rub") dx = q.u >= 0 ? 24 * Math.sin(q.u * Math.PI * 6) : 0;
  else if (m === "tap") sx = 1 - 0.12 * d;
  else if (m === "sweep") rot = 14 * Math.sin(q.tm * Math.PI * 4);
  else if (m === "carry") dy = -16 * Math.sin(Math.PI * q.tm);
  const x = q.x + dx, y = q.y + dy;
  let body = null;
  if (pic && m === "slide") {
    const a = play.path[0], b = play.path[play.path.length - 1], L = Math.hypot(b.x - a.x, b.y - a.y) || pic.fit.len;
    const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI, th = pic.fit.h / pic.fit.w * pic.fit.len, ux = (b.x - a.x) / L, uy = (b.y - a.y) / L;
    body = <g transform={`translate(${q.x} ${q.y}) rotate(${ang + (pic.fit.rot || 0)})`}>
        <image data-role="act" href={pic.src} x={-24} y={0} width={L + 48} height={th} preserveAspectRatio="none" />
        {play.at.map((p, i) => t >= play.hits[i] ? <line key={i} x1={(p.x - a.x) * ux + (p.y - a.y) * uy} y1={0} x2={(p.x - a.x) * ux + (p.y - a.y) * uy} y2={22} stroke={C.ink} strokeWidth={4} strokeLinecap="round" /> : null)}
      </g>;
  } else if (pic) {
    const f = pic.fit, k = f.len / Math.max(f.w, f.h), pw = f.w * k, ph = f.h * k;
    body = <g transform={`translate(${x} ${y}) rotate(${(f.rot || 0) + rot}) scale(${sx} 1)`}>
        <image data-role="act" href={pic.src} x={-f.ax * pw} y={-f.ay * ph} width={pw} height={ph} preserveAspectRatio="none" />
      </g>;
  } else {
    const pose = m === "carry" ? "grip" : m === "push" || m === "sweep" ? "open" : "point";
    const back = pose === "open" ? 72 : 0, hx = x - q.dir[0] * back, hy = pose === "grip" ? y - 48 : y - q.dir[1] * back;
    body = <g transform={`translate(${hx} ${hy}) rotate(${(pose === "point" ? -18 : 10 * Math.sign(q.dir[0] || 1)) + rot}) scale(${1.4 * sx})`}>
        <ActHand pose={pose} ink={C.ink} />
      </g>;
  }
  let trail = null;
  if (m === "draw" && play.travel && t > ACT_IN) {
    const s = q.tm * play.len, ps = play.path.filter((_, j) => play.cum[j] <= s).map((p) => `${p.x},${p.y}`);
    trail = <polyline points={[...ps, `${q.x},${q.y}`].join(" ")} fill="none" stroke="#4A4A4A" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />;
  }
  return <g opacity={q.o}>
      <clipPath id="c4ActClip"><rect x={0} y={0} width={w} height={h} /></clipPath>
      <g clipPath="url(#c4ActClip)" filter="url(#fShadowSoft)">
        {trail}
        {m === "tap" && d > 0 ? <circle cx={q.x} cy={q.y} r={14 + 26 * q.u} fill="none" stroke={C.ink} strokeWidth={4} strokeOpacity={0.35 * (1 - q.u)} /> : null}
        {play.hold ? <g transform={`translate(${q.x} ${q.y + (m === "carry" ? dy : 0)})`}>{play.hold}</g> : null}
        {body}
      </g>
    </g>;
}
function useActionKit(lockNow, lockedRef, sfx, key) {
  const [play, setPlay] = useState(null);
  const cur = useRef(null);
  const end = (ok) => {
    const c = cur.current;
    if (!c) return;
    cur.current = null;
    c.timers.forEach(clearTimeout);
    setPlay(null);
    if (!c.was) lockNow(false);
    c.resolve(ok);
  };
  useEffect(() => () => end(false), [key]);
  const act = (o) => new Promise((resolve) => {
    o = o || {};
    if (cur.current) {
      resolve(false);
      return;
    }
    const p = actPlan(o), onPoint = typeof o.onPoint === "function" ? o.onPoint : null;
    const hit = (i) => {
      try {
        if (onPoint) onPoint(i);
      } catch (e) {
        console.error(e);
      }
    };
    if (!p || reducedMotion()) {
      if (p) (p.move === "write" ? p.hits : p.at).forEach((_, i) => hit(i));
      resolve(true);
      return;
    }
    const c = { timers: [], resolve, was: !!lockedRef.current };
    cur.current = c;
    lockNow(true);
    const pen = p.tool === "pencil", fx = sfx && sfx[pen ? "tick" : ACT_SFX[p.move]];
    let tickAt = -1e9;
    const tick = () => {
      const n = performance.now();
      if (fx && n - tickAt > 150) {
        tickAt = n;
        fx();
      }
    };
    const writing = p.move === "write";
    if (fx && p.travel) c.timers.push(setTimeout(() => fx(), ACT_IN));
    if (writing) p.ticks.forEach((ms) => c.timers.push(setTimeout(tick, ms)));
    p.hits.forEach((ms, i) => c.timers.push(setTimeout(() => {
      hit(i);
      if (writing) return;
      if (pen) tick();
      else if (fx && !p.travel) fx();
    }, ms)));
    c.timers.push(setTimeout(() => end(true), p.total + (pen && !writing ? ACT_BEAT : 0)));
    setPlay({ ...p, hold: o.hold || null, t0: performance.now() });
  });
  return { act, play, busy: () => !!cur.current };
}
const PEN_H = 0.72, PEN_X0 = 0.12, PEN_W = 0.1, PEN_INK = "#3F3F3F";
const PEN_IN = 150, PEN_OUT = 150, PEN_NUM = 500, PEN_LINE = 180, PEN_DAB = 110, PEN_MIN = 40, PEN_HOP = 22, PEN_GAP = 40, PEN_TILT = -12, PEN_WMIN = 3.2;
function penSw(size) {
  return Math.max(size * PEN_W, PEN_WMIN);
}
function penEll(cx, cy, rx, ry, a0, a1, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (a0 + (a1 - a0) * i / (n - 1)) * Math.PI / 180;
    out.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return out;
}
const PEN_GLYPHS = (function() {
  const g = {};
  const make = (adv, x0, strokes) => ({ a: adv, s: strokes.map((st) => ({ k: st[0], p: st[1].map((q) => [q[0] + x0, q[1]]) })) });
  const dig = (strokes) => make(0.84, PEN_X0, strokes);
  g["0"] = dig([[2, penEll(0.3, 0.5, 0.29, 0.5, -90, -90 - 324, 10)]]);
  g["1"] = dig([[0, [[0.1, 0.22], [0.32, 0], [0.32, 1]]]]);
  g["2"] = dig([
    [1, [[0.02, 0.24], [0.1, 0.07], [0.28, 0], [0.46, 0.05], [0.56, 0.2], [0.52, 0.38], [0.38, 0.54], [0.16, 0.76], [0, 1]]],
    [0, [[0, 1], [0.6, 1]]]
  ]);
  g["3"] = dig([[1, [[0.02, 0.18], [0.14, 0.04], [0.32, 0], [0.48, 0.07], [0.54, 0.22], [0.46, 0.38], [0.3, 0.47], [0.2, 0.49], [0.34, 0.5], [0.52, 0.6], [0.58, 0.78], [0.48, 0.94], [0.3, 1], [0.12, 0.96], [0, 0.84]]]]);
  g["4"] = dig([
    [0, [[0.46, 0], [0, 0.72], [0.62, 0.72]]],
    [0, [[0.46, 0], [0.46, 1]]]
  ]);
  g["5"] = dig([
    [0, [[0.54, 0], [0.08, 0], [0.04, 0.46]]],
    [1, [[0.04, 0.46], [0.2, 0.4], [0.38, 0.4], [0.52, 0.5], [0.58, 0.68], [0.54, 0.86], [0.4, 0.98], [0.24, 1], [0.08, 0.95], [0, 0.86]]]
  ]);
  g["6"] = dig([[1, [[0.52, 0.06], [0.36, 0], [0.18, 0.1], [0.06, 0.34], [0.02, 0.62], [0.07, 0.86], [0.22, 0.99], [0.38, 0.98], [0.52, 0.86], [0.57, 0.7], [0.5, 0.55], [0.36, 0.48], [0.2, 0.5], [0.08, 0.6]]]]);
  g["7"] = dig([[0, [[0, 0], [0.6, 0], [0.22, 1]]]]);
  g["8"] = dig([[1, [[0.46, 0.1], [0.32, 0], [0.16, 0.05], [0.08, 0.22], [0.16, 0.38], [0.3, 0.47], [0.46, 0.58], [0.54, 0.76], [0.46, 0.93], [0.3, 1], [0.13, 0.94], [0.05, 0.77], [0.13, 0.59], [0.3, 0.47], [0.44, 0.36], [0.52, 0.2], [0.46, 0.08]]]]);
  g["9"] = dig([[1, [[0.54, 0.3], [0.46, 0.1], [0.3, 0], [0.14, 0.08], [0.04, 0.28], [0.1, 0.48], [0.26, 0.58], [0.42, 0.54], [0.54, 0.36], [0.56, 0.58], [0.5, 0.82], [0.38, 0.96], [0.22, 1], [0.08, 0.93]]]]);
  g[","] = make(0.4, 0, [[1, [[0.13, 0.88], [0.14, 0.97], [0.08, 1.1], [0.02, 1.16]]]]);
  g["."] = make(0.4, 0, [[0, [[0.13, 0.965], [0.135, 0.97]]]]);
  g["="] = dig([[0, [[0.04, 0.34], [0.56, 0.34]]], [0, [[0.04, 0.66], [0.56, 0.66]]]]);
  g["-"] = dig([[0, [[0.06, 0.5], [0.54, 0.5]]]]);
  g["+"] = dig([[0, [[0.3, 0.2], [0.3, 0.8]]], [0, [[0.04, 0.5], [0.56, 0.5]]]]);
  g["×"] = dig([[0, [[0.06, 0.28], [0.54, 0.76]]], [0, [[0.54, 0.28], [0.06, 0.76]]]]);
  g["÷"] = dig([[0, [[0.04, 0.5], [0.56, 0.5]]], [0, [[0.3, 0.26], [0.305, 0.265]]], [0, [[0.3, 0.74], [0.305, 0.745]]]]);
  g["/"] = make(0.6, 0, [[0, [[0.46, 0], [0.06, 1]]]]);
  const cap = (strokes) => make(0.84, PEN_X0, strokes);
  const ell = (cx, cy, rx, ry, n) => penEll(cx, cy, rx, ry, -90, -90 - 360 * (n - 1) / n, n);
  const bowl = (y0, y1) => [[0.04, y0], [0.3, y0], [0.5, y0 + (y1 - y0) * 0.16], [0.56, y0 + (y1 - y0) * 0.5], [0.46, y0 + (y1 - y0) * 0.86], [0.28, y1], [0.04, y1]];
  g["A"] = cap([[0, [[0, 1], [0.3, 0], [0.6, 1]]], [0, [[0.1, 0.68], [0.5, 0.68]]]]);
  g["B"] = cap([[0, [[0.04, 0], [0.04, 1]]], [1, bowl(0, 0.5)], [1, [[0.04, 0.5], [0.34, 0.5], [0.54, 0.6], [0.58, 0.78], [0.5, 0.94], [0.3, 1], [0.04, 1]]]]);
  g["C"] = cap([[1, [[0.56, 0.18], [0.44, 0.04], [0.28, 0], [0.1, 0.1], [0.02, 0.35], [0.02, 0.65], [0.1, 0.9], [0.28, 1], [0.44, 0.96], [0.56, 0.82]]]]);
  g["D"] = cap([[0, [[0.04, 0], [0.04, 1]]], [1, [[0.04, 0], [0.3, 0.02], [0.5, 0.14], [0.58, 0.4], [0.58, 0.62], [0.5, 0.86], [0.3, 0.98], [0.04, 1]]]]);
  g["E"] = cap([[0, [[0.56, 0], [0.04, 0], [0.04, 1], [0.56, 1]]], [0, [[0.04, 0.5], [0.46, 0.5]]]]);
  g["F"] = cap([[0, [[0.56, 0], [0.04, 0], [0.04, 1]]], [0, [[0.04, 0.5], [0.46, 0.5]]]]);
  g["G"] = cap([[1, [[0.56, 0.18], [0.44, 0.04], [0.28, 0], [0.1, 0.1], [0.02, 0.35], [0.02, 0.65], [0.1, 0.9], [0.28, 1], [0.46, 0.94], [0.56, 0.78], [0.56, 0.55]]], [0, [[0.56, 0.55], [0.32, 0.55]]]]);
  g["H"] = cap([[0, [[0.04, 0], [0.04, 1]]], [0, [[0.56, 0], [0.56, 1]]], [0, [[0.04, 0.5], [0.56, 0.5]]]]);
  g["I"] = make(0.56, 0.06, [[0, [[0.04, 0], [0.4, 0]]], [0, [[0.22, 0], [0.22, 1]]], [0, [[0.04, 1], [0.4, 1]]]]);
  g["J"] = cap([[1, [[0.5, 0], [0.5, 0.45], [0.48, 0.75], [0.38, 0.94], [0.24, 1], [0.1, 0.94], [0.02, 0.8]]]]);
  g["K"] = cap([[0, [[0.04, 0], [0.04, 1]]], [0, [[0.56, 0], [0.04, 0.56], [0.58, 1]]]]);
  g["L"] = cap([[0, [[0.04, 0], [0.04, 1], [0.54, 1]]]]);
  g["M"] = make(0.98, 0.08, [[0, [[0.04, 1], [0.04, 0], [0.42, 0.7], [0.8, 0], [0.8, 1]]]]);
  g["N"] = cap([[0, [[0.04, 1], [0.04, 0], [0.56, 1], [0.56, 0]]]]);
  g["O"] = cap([[2, ell(0.3, 0.5, 0.3, 0.5, 12)]]);
  g["P"] = cap([[0, [[0.04, 0], [0.04, 1]]], [1, [[0.04, 0], [0.32, 0], [0.52, 0.1], [0.56, 0.3], [0.46, 0.48], [0.28, 0.55], [0.04, 0.55]]]]);
  g["Q"] = cap([[2, ell(0.3, 0.5, 0.3, 0.5, 12)], [0, [[0.36, 0.72], [0.62, 1.04]]]]);
  g["R"] = cap([[0, [[0.04, 0], [0.04, 1]]], [1, [[0.04, 0], [0.32, 0], [0.52, 0.1], [0.56, 0.3], [0.46, 0.48], [0.28, 0.55], [0.04, 0.55]]], [0, [[0.3, 0.55], [0.58, 1]]]]);
  g["S"] = cap([[1, [[0.54, 0.16], [0.42, 0.04], [0.26, 0], [0.1, 0.08], [0.05, 0.25], [0.16, 0.4], [0.32, 0.5], [0.5, 0.6], [0.56, 0.76], [0.48, 0.93], [0.3, 1], [0.12, 0.95], [0.02, 0.82]]]]);
  g["T"] = cap([[0, [[0, 0], [0.6, 0]]], [0, [[0.3, 0], [0.3, 1]]]]);
  g["U"] = cap([[1, [[0.04, 0], [0.04, 0.55], [0.1, 0.85], [0.3, 1], [0.5, 0.85], [0.56, 0.55], [0.56, 0]]]]);
  g["V"] = cap([[0, [[0, 0], [0.3, 1], [0.6, 0]]]]);
  g["W"] = make(0.98, 0.08, [[0, [[0, 0], [0.2, 1], [0.41, 0.3], [0.62, 1], [0.82, 0]]]]);
  g["X"] = cap([[0, [[0.04, 0], [0.56, 1]]], [0, [[0.56, 0], [0.04, 1]]]]);
  g["Y"] = cap([[0, [[0, 0], [0.3, 0.52]]], [0, [[0.6, 0], [0.3, 0.52], [0.3, 1]]]]);
  g["Z"] = cap([[0, [[0.02, 0], [0.58, 0], [0.02, 1], [0.58, 1]]]]);
  g[" "] = { a: 0.4, s: [] };
  g["x"] = g["×"];
  g["−"] = g["-"];
  return g;
})();
function penRand(i, c) {
  const s = Math.sin(i * 12.9898 + c * 78.233) * 43758.5453;
  return s - Math.floor(s);
}
function penFlat(k, p) {
  if (k === 0) return p.map((q) => [q[0], q[1]]);
  const n = p.length, closed = k === 2, per = 7;
  const P = (i) => closed ? p[(i % n + n) % n] : p[Math.max(0, Math.min(n - 1, i))];
  const out = [[p[0][0], p[0][1]]];
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    for (let s = 1; s <= per; s++) {
      const t = s / per, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  return out;
}
function penStroke(pts) {
  const cum = [0];
  for (let j = 1; j < pts.length; j++) cum.push(cum[j - 1] + Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]));
  return { pts, cum, len: cum[cum.length - 1] || 1e-3 };
}
const PEN_CACHE = {};
function penLayout(text, x, y, size, anchor, step) {
  const key = text + "|" + x + "|" + y + "|" + size + "|" + anchor + "|" + (step || 0);
  if (PEN_CACHE[key]) return PEN_CACHE[key];
  const u = size * PEN_H;
  let adv = 0;
  for (let i = 0; i < text.length; i++) adv += (PEN_GLYPHS[text[i]] || { a: 0.84 }).a;
  const w = step ? step * text.length : adv * u, ox = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  const chars = [];
  let cx = ox;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], gl = PEN_GLYPHS[ch], code = ch.charCodeAt(0), a = gl ? gl.a : 0.84;
    const cell = step || a * u, gx = cx + (cell - a * u) / 2;
    const rot = (penRand(i + 1, code) - 0.5) * 3.6 * Math.PI / 180, sc = 0.97 + 0.06 * penRand(i + 7, code), dy = (penRand(i + 13, code) - 0.5) * 0.024 * u;
    const mx = gx + a * u / 2, my = y - u / 2, co = Math.cos(rot), si = Math.sin(rot);
    const strokes = (gl ? gl.s : []).map((st) => penStroke(penFlat(st.k, st.p).map((q) => {
      const px = gx + q[0] * u - mx, py = y - u + q[1] * u - my;
      return [mx + (px * co - py * si) * sc, my + dy + (px * si + py * co) * sc];
    })));
    chars.push({ ch, i, strokes, cx: gx, adv: a * u, known: !!gl });
    cx += cell;
  }
  const out = { chars, w, ox, u, size };
  PEN_CACHE[key] = out;
  return out;
}
function penCut(st, f) {
  const fmt = (q) => q[0].toFixed(1) + "," + q[1].toFixed(1);
  if (f >= 1) return st.pts.map(fmt).join(" ");
  const s = f * st.len, out = [];
  for (let j = 0; j < st.pts.length; j++) {
    if (st.cum[j] <= s) out.push(st.pts[j]);
    else {
      const a = st.pts[j - 1], b = st.pts[j], k = (s - st.cum[j - 1]) / (st.cum[j] - st.cum[j - 1] || 1);
      out.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
      break;
    }
  }
  if (out.length < 2) out.push([out[0][0] + 0.01, out[0][1]]);
  return out.map(fmt).join(" ");
}
function penAt(st, f) {
  const s = Math.max(0, Math.min(1, f)) * st.len;
  for (let j = 1; j < st.pts.length; j++) {
    if (st.cum[j] >= s) {
      const a = st.pts[j - 1], b = st.pts[j], k = (s - st.cum[j - 1]) / (st.cum[j] - st.cum[j - 1] || 1);
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    }
  }
  const e = st.pts[st.pts.length - 1];
  return [e[0], e[1]];
}
function penPlan(o) {
  const texts = Array.isArray(o.text) ? o.text : [o.text], ats = o.at || [];
  const alignOf = (k) => String((Array.isArray(o.align) ? o.align[k] : o.align) || o.anchor || "start"), colorOf = (k) => String((Array.isArray(o.color) ? o.color[k] : o.color) || PEN_INK);
  const toks = [];
  let lastSize = 48;
  texts.forEach((tx, k) => {
    const size = Number(Array.isArray(o.size) ? o.size[k] : o.size) || tx && typeof tx === "object" && Number(tx.size) || lastSize;
    if (tx && typeof tx === "object" && Array.isArray(tx.dab)) {
      const D = tx.dab.map(Number);
      if (D.length < 2 || !D.every(isFinite)) return;
      toks.push({ text: ".", size, color: colorOf(k), dab: true, lay: { u: size * PEN_H, chars: [{ ch: ".", i: 0, strokes: [penStroke([[D[0], D[1]], [D[0], D[1]]])], known: true, cx: D[0], adv: 0 }] } });
      return;
    }
    if (tx && typeof tx === "object" && Array.isArray(tx.line)) {
      const L = tx.line.map(Number);
      if (L.length < 4 || !L.every(isFinite)) return;
      toks.push({ text: "|", size, color: colorOf(k), line: true, lay: { u: size * PEN_H, chars: [{ ch: "|", i: 0, strokes: [penStroke([[L[0], L[1]], [L[2], L[3]]])], known: true, cx: L[0], adv: Math.abs(L[2] - L[0]) }] } });
      return;
    }
    const s = String(tx == null ? "" : tx), a = ats[k] || ats[ats.length - 1];
    if (!s || !actOk(a)) return;
    lastSize = size;
    toks.push({ text: s, size, color: colorOf(k), lay: penLayout(s, a.x, a.y, size, alignOf(k), Number(Array.isArray(o.step) ? o.step[k] : o.step) || 0) });
  });
  if (!toks.length) return null;
  const strokes = [], hits = [], ticks = [];
  let t = PEN_IN;
  toks.forEach((tk, ti) => {
    const chars = tk.lay.chars, flat = [];
    chars.forEach((c, ci) => c.strokes.forEach((st) => flat.push({ st, ci })));
    const gaps = flat.map((e, j) => {
      if (!j) return 0;
      const a = flat[j - 1].st.pts[flat[j - 1].st.pts.length - 1], b = e.st.pts[0];
      return e.ci !== flat[j - 1].ci || Math.hypot(a[0] - b[0], a[1] - b[1]) > 0.05 * tk.lay.u ? PEN_HOP : 0;
    });
    const B = tk.dab ? PEN_DAB : tk.line ? PEN_LINE : PEN_NUM + 80 * Math.max(0, tk.text.length - 4), hopSum = gaps.reduce((s, g) => s + g, 0);
    const drawMs = Math.max(B * 0.5, B - hopSum), base = PEN_MIN * flat.length, lenSum = flat.reduce((s, e) => s + e.st.len, 0) || 1;
    const ends = chars.map(() => null), tokStart = t;
    flat.forEach((e, j) => {
      const d = drawMs >= base ? PEN_MIN + (drawMs - base) * e.st.len / lenSum : drawMs / flat.length;
      t += gaps[j];
      strokes.push({ st: e.st, t0: t, t1: t + d, sw: penSw(tk.size), color: tk.color, dab: !!tk.dab });
      ticks.push(Math.round(t));
      t += d;
      ends[e.ci] = t;
    });
    let prev = tokStart;
    chars.forEach((_, ci) => {
      if (ends[ci] != null) prev = ends[ci];
      hits.push(Math.round(prev));
    });
    if (ti < toks.length - 1) t += PEN_GAP;
  });
  if (!strokes.length) return null;
  const total = Math.round(t + PEN_OUT), first = strokes[0].st.pts[0];
  return { move: "write", tool: "pencil", pic: actPic("pencil"), total, hits, ticks, strokes, at: ats.filter(actOk), off: ACT_OFF.pencil, path: [{ x: first[0], y: first[1] }] };
}
function penTip(p, t) {
  const S = p.strokes;
  let pt = S[0].st.pts[0], j = -1;
  for (let k = 0; k < S.length; k++) if (S[k].t0 <= t) j = k;
  if (j >= 0) {
    const s = S[j];
    if (t <= s.t1) pt = penAt(s.st, (t - s.t0) / (s.t1 - s.t0 || 1));
    else {
      const a = s.st.pts[s.st.pts.length - 1];
      if (j + 1 < S.length) {
        const b = S[j + 1].st.pts[0], k = Math.min(1, (t - s.t1) / (S[j + 1].t0 - s.t1 || 1));
        pt = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
      } else pt = a;
    }
  }
  const lead = t < PEN_IN ? 1 - Math.max(0, Math.min(1, t / PEN_IN)) : t > p.total - PEN_OUT ? 1 - Math.max(0, Math.min(1, (p.total - t) / PEN_OUT)) : 0;
  return { x: pt[0] + p.off[0] * lead * lead, y: pt[1] + p.off[1] * lead * lead, o: 1 - lead };
}
function penWriteLayer(p, t, w, h, C) {
  const q = penTip(p, t), pic = p.pic;
  const ink = [];
  p.strokes.forEach((e, j) => {
    const f = Math.max(0, Math.min(1, (t - e.t0) / (e.t1 - e.t0 || 1)));
    if (f > 0 && !e.dab) ink.push(<polyline key={j} data-role="pen-ink" points={penCut(e.st, f)} fill="none" stroke={e.color} strokeWidth={e.sw} strokeLinecap="round" strokeLinejoin="round" />);
  });
  let body;
  if (pic) {
    const f = pic.fit, k = f.len / Math.max(f.w, f.h), pw = f.w * k, ph = f.h * k;
    body = <g transform={`translate(${q.x} ${q.y}) rotate(${(f.rot || 0) + PEN_TILT + 3 * Math.sin(t / 55)})`}>
        <image data-role="act" href={pic.src} x={-f.ax * pw} y={-f.ay * ph} width={pw} height={ph} preserveAspectRatio="none" />
      </g>;
  } else {
    body = <g transform={`translate(${q.x} ${q.y}) rotate(-18) scale(1.4)`}>
        <ActHand pose="point" ink={C.ink} />
      </g>;
  }
  return <g>
      <g data-role="pen-writing">{ink}</g>
      <g opacity={q.o}>
        <clipPath id="c4ActClip"><rect x={0} y={0} width={w} height={h} /></clipPath>
        <g clipPath="url(#c4ActClip)" filter="url(#fShadowSoft)">{body}</g>
      </g>
    </g>;
}
function PencilLine({ x1, y1, x2, y2, size, color, width, opacity }) {
  const st = penStroke([[x1, y1], [x2, y2]]);
  return <polyline data-role="pencil-line" points={penCut(st, 1)} fill="none" stroke={color || PEN_INK} strokeWidth={width || penSw(size)} strokeLinecap="round" strokeLinejoin="round" opacity={opacity == null ? 1 : opacity} />;
}
function PencilText({ text, x, y, size, align, anchor, step, color, chars, width, opacity }) {
  const s = String(text == null ? "" : text), L = penLayout(s, x, y, size, String(align || anchor || "start"), Number(step) || 0);
  const n = chars == null ? s.length : Math.max(0, Math.min(s.length, chars)), sw = width || penSw(size), col = color || PEN_INK, out = [];
  L.chars.forEach((c) => {
    if (c.i >= n) return;
    if (!c.known) out.push(<text key={c.i} x={c.cx + c.adv / 2} y={y} textAnchor="middle" fontSize={size} fontWeight={500} fill={col}>{c.ch}</text>);
    c.strokes.forEach((st, j) => out.push(<polyline key={c.i + "." + j} points={penCut(st, 1)} fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />));
  });
  return <g data-role="pencil-text" opacity={opacity == null ? 1 : opacity}>{out}</g>;
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
    cardFrac: "Fraction",
    cardDec: "Decimal",
    box: { numerator: "numerator box", denominator: "denominator box", whole: "whole part box", decimal: "decimal part box" },
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
    cardFrac: "भिन्न",
    cardDec: "दशमलव",
    box: { numerator: "अंश का खाना", denominator: "हर का खाना", whole: "पूर्ण भाग का खाना", decimal: "दशमलव भाग का खाना" },
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
    cardFrac: "અપૂર્ણાંક",
    cardDec: "દશાંશ",
    box: { numerator: "અંશનું ખાનું", denominator: "છેદનું ખાનું", whole: "પૂર્ણ ભાગનું ખાનું", decimal: "દશાંશ ભાગનું ખાનું" },
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
      label={((UI_STRINGS[lang] || UI_STRINGS.en).box || {})[parts[j].label] || lineFor(parts[j].label + " box", lang, TR2)}
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
        label={((UI_STRINGS[lang] || UI_STRINGS.en).box || {})[parts[j].label] || lineFor(parts[j].label + " box", lang, TR2)}
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
      const ugap = 24;
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
              {
        /* r58: the digits END at left + nw (anchored there, whatever their real width) and the unit starts a fixed gap after
           it, so the caret between them never touches either ("11 |%" touched, "45|" overlapped the 5 on r57) */
      }
              <text x={left + nw} y={Z.slot.y + 77} textAnchor="end" fontSize={size2} fontWeight={600} fill={C.ink}>{shown2}</text>
              {unit && <text x={left + nw + ugap} y={Z.slot.y + 77} fontSize={T.micro} fontWeight={500} fill={quiet}>{unit}</text>}
              {on && <rect className="c4-caret" x={left + nw + 4} y={Z.slot.y + 44} width={4} height={40} rx={2} fill={C.accent} />}
              <SlotPartBox
        id={"part-" + (k + 1)}
        label={((UI_STRINGS[lang] || UI_STRINGS.en).box || {})[p.label] || lineFor(p.label + " box", lang, TR2)}
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
  const endX = cx + shown.length * size * 0.29, caretX = endX + 6;
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
      <text x={endX} y={Z.slot.y + 46 + size * 0.36} textAnchor="end" fontSize={size} fontWeight={600} fill={C.ink}>{shown}</text>
      {active && <rect className="c4-caret" x={caretX} y={Z.slot.y + 22} width={4} height={50} rx={2} fill={C.accent} />}
    </g>;
}
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0", "enter"];
function Pad({ C, enabled, digitsOff, onKey, choices, onChoice, point, pointOff, UI, lang, TR: TR2 }) {
  const gap = KEYONLY ? 8 : 12;
  const quiet = mix(C.ink, C.panel, 0.5);
  if (choices && choices.length) {
    const longest = Math.max(...choices.map((c) => Math.max(...wrapText(lineFor(c.label, lang, TR2), 10).slice(0, 2).map((s) => s.length))));
    const tooWide = longest * T.label * 0.6 + 24 > (Z.pad.w - gap) / 2;
    const cols = tooWide && choices.length <= 4 && (Z.pad.h - EDGE - gap * (choices.length - 1)) / choices.length >= HIT ? 1 : 2, rows = Math.ceil(choices.length / cols);
    const cw = (Z.pad.w - gap) / cols, ch = Math.min(BOARD ? 150 : 110, (Z.pad.h - EDGE - gap * (rows - 1)) / rows);
    const top = BOARD ? Z.pad.y + Math.max(0, (Z.pad.h - EDGE - (rows * ch + (rows - 1) * gap)) / 2) : Z.pad.y;
    const dev = lang === "hi" || lang === "gu", lbls = choices.map((c) => lineFor(c.label, lang, TR2));
    const pitchOf = (s) => Math.round(s * (dev ? 1.45 : 1.15));
    const wrapAt = (s) => Math.max(4, Math.floor((cw - 24) / (s * 0.6)));
    const fitsAt = (s, n) => lbls.every((l) => wrapText(l, wrapAt(s)).length <= n) && n * pitchOf(s) <= ch - 16;
    const [lsz, lmax] = [[T.prompt, 1], [T.label, 1], [T.prompt, 2], [T.label, 2]].find(([s, n]) => fitsAt(s, n)) || [T.label, 2];
    return <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
        {choices.map((c, j) => {
      const x = Z.pad.x + j % cols * (cw + gap), y = top + Math.floor(j / cols) * (ch + gap);
      const lines = wrapText(lineFor(c.label, lang, TR2), wrapAt(lsz)).slice(0, lmax);
      return <Key key={c.id} id={"choice-" + c.id} label={lineFor(c.label, lang, TR2)} x={x} y={y} w={cw} h={ch} C={C} tone="key" disabled={!enabled} onClick={() => enabled && onChoice(c.id)}>
              {lines.map((ln, k) => <text key={k} y={Math.round(lsz * 0.35) + (k - (lines.length - 1) / 2) * pitchOf(lsz)} textAnchor="middle" fontSize={lsz} fontWeight={600} fill={enabled ? toneInk("key", C.ink) : quiet}>{ln}</text>)}
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
function AskBar({ C, ask, hasRuns, mode, open, onKey, UI, nextLabel, choices, onChoice, lang, TR: TR2, quiet, blink, onTap, keyOnly }) {
  const x0 = hasRuns ? Z.runs.x + Z.runs.w + 16 : Z.ask.x;
  const bw = Z.ask.x + Z.ask.w - x0;
  const nCh = mode === "choices" ? (choices || []).length : 0;
  const cw = nCh ? choiceKeyW(choices, lang, TR2) : 150, cgap = 14;
  const kw = nCh ? nCh * cw + (nCh - 1) * cgap : 264, kh = 72, kx = x0 + bw - kw - 10, ky = Z.ask.y + (Z.ask.h - kh) / 2;
  const noKey = mode === "card" || quiet && mode === "off";
  const room = (noKey ? x0 + bw - 10 : kx) - x0 - 40;
  const pick = [[T.prompt, 1], [T.label, 2], [T.micro, 2]].map(([s, l]) => ({ s, l, w: wrapText(ask, Math.floor(room / (s * 0.58))) })).find((c) => c.w.length <= c.l) || { s: T.micro, w: wrapText(ask, Math.floor(room / (T.micro * 0.58))).slice(0, 2) };
  const lh = pick.s + 6, top = Z.ask.y + Z.ask.h / 2 - (pick.w.length - 1) * lh / 2 + pick.s * 0.36;
  const live = mode !== "off";
  const next = mode === "next";
  const label = next ? nextLabel : mode === "enter" ? UI.enter : open ? UI.answerClose : UI.answer;
  return <g data-zone="ask" onClick={onTap}>
      {!keyOnly && <rect x={x0} y={Z.ask.y} width={bw} height={Z.ask.h} rx={RAD.panel + 4} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />}
      {!keyOnly && pick.w.map((ln, k) => <text key={k} x={x0 + 28} y={top + k * lh} fontSize={pick.s} fontWeight={500} fill={C.ink}>{ln}</text>)}
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
  const hand = KEYONLY ? { x: Math.round(28 + 158 * MASCOT_SCALE_KEY), y: Math.round(898 - 126 * MASCOT_SCALE_KEY) } : { x: 186, y: 772 };
  const origins = big ? [{ ...hand, a0: -80, a1: -20 }, { x: 1500, y: 734, a0: -160, a1: -100 }] : [{ ...hand, a0: -80, a1: -20 }];
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
      {(() => {
    const sparks = (typeof MASCOT_CHEER === "string" && MASCOT_CHEER ? SPARKS : []).map((s, k) => <g key={"s" + k} transform={`translate(${s.x},${s.y}) scale(${s.s * (big ? 1.25 : 1)})`}>
          <polygon
      className="c4-twinkle"
      style={{ animationDelay: s.d + "s" }}
      points="0,-16 4.5,-4.5 16,0 4.5,4.5 0,16 -4.5,4.5 -16,0 -4.5,-4.5"
      fill={pal[2 + k % 2]}
      stroke={shade(pal[2 + k % 2], 0.25)}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
        </g>);
    return KEYONLY ? <g transform={MASCOT_T_KEY}>{sparks}</g> : sparks;
  })()}
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
  const body = <>
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
    </>;
  return <g data-zone="voice">{KEYONLY ? <g transform={MASCOT_T_KEY}>{body}</g> : body}</g>;
}
const THINK_BUMPS = [[154, 48, 2.6], [161, 41, 4], [166, 25, 9.5], [176.5, 17.5, 11.5], [187, 25, 8.5]];
const THINK_DOTS = [167, 175.5, 184];
function ThinkPuff() {
  if (KEYONLY) return null;
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
  if (KEYONLY) return null;
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
function NavDot({ C, k, N, cx, cy, now, done, onGo, UI }) {
  const p = usePress(() => onGo(k), true);
  const word = now ? "now" : done ? "done" : "not yet";
  const on = now || done;
  return <g
    className={"c4-ctl c4-dot" + (p.down ? " is-down" : "")}
    role="button"
    tabIndex={0}
    aria-label={UI.stepOf(k + 1, N)}
    aria-current={now ? "step" : void 0}
    data-control="phase-dot"
    data-phase={k + 1}
    data-state={word === "not yet" ? "later" : word}
    data-fill={on ? "1.000" : "0.000"}
    {...p.bind()}
    onKeyDown={p.keys}
  >
      <rect x={cx - HIT / 2} y={cy - HIT / 2} width={HIT} height={HIT} fill="transparent" />
      <g className="c4-body" style={{ transform: `translateY(${p.down ? 3 : 0}px)` }}>
        {now && <circle cx={cx} cy={cy} r={25} fill="none" stroke={shade(C.accent, 0.15)} strokeWidth={4} />}
        <circle className="c4-face" cx={cx} cy={cy} r={now ? 16 : 11} fill={on ? "url(#gAccent)" : C.panel} stroke={on ? shade(C.accent, 0.15) : C.rule} strokeWidth={3} />
      </g>
    </g>;
}
function Footer({ C, line, hint, speaking, react, n, N, i, total, navigable, done, onGo, mascotOk, onMascotFail, UI, onBubble, cue, board, lang, hintType, cheerOn, onCheerFail, thinkOn, onThinkFail, bulbN, onDot }) {
  const b = Z.bubble;
  const em = KEYONLY && (lang === "hi" || lang === "gu") ? FIT_KEY.devEm : 0.54;
  const fit = KEYONLY ? FIT_KEY : FIT_CLASSIC, ty = KEYONLY ? Math.round(MASCOT_BOX.y + MASCOT_BOX.h - (MASCOT_BOX.h - 54) * MASCOT_SCALE_KEY) : b.y + 44;
  const edge = board ? shade(C.accent, 0.1) : C.rule, edgeW = board ? 3 : 2;
  const hintS = KEYONLY && hintType ? "" : String(hint || "");
  const dev = lang === "hi" || lang === "gu";
  const pit = (s, tight) => tight ? s + 1 : dev ? Math.round(s * (KEYONLY ? FIT_KEY.devPit : 1.45)) : s + 6;
  const gapOf = (tight) => tight || dev ? 4 : 6, padOf = (tight) => tight ? 0 : dev ? 4 : 8;
  const topAt = (s) => !dev ? 0 : KEYONLY ? Math.round(s * FIT_KEY.devTop) + 4 : 12;
  let hl = null;
  if (hintS && !KEYONLY) {
    const cw = (s, w) => Math.max(8, Math.floor(w / (s * em)));
    const opts = fit.hint;
    for (const [is, il, hs, hn, tight] of opts) {
      if (dev && tight) continue;
      const a = wrapText(line, cw(is, b.w - 44)), h = wrapText(hintS, cw(hs, b.w - 64));
      if (a.length > il || h.length > hn) continue;
      const need = a.length * pit(is, tight) + gapOf(tight) + h.length * pit(hs, tight) + padOf(tight) + topAt(is);
      if (need <= b.h - 6) {
        hl = { is, a, hs, h, tight };
        break;
      }
    }
  }
  const shown = hintS && !hl ? hintS : line;
  const popts = fit.plain.filter((o) => !o[3] || o[3] === (dev ? "dev" : "en"));
  const per = (c) => Math.floor(c * (b.w - 104) * (0.54 / em) / 552);
  const lhOf = (s, k) => dev ? Math.round(s * (KEYONLY ? FIT_KEY.devPit : 1.45)) : k > 0 ? s + 6 : s + 8;
  const inkFits = (o, k, n2) => {
    if (!KEYONLY) return true;
    const [up, down] = dev ? FIT_KEY.inkDev : FIT_KEY.inkEn;
    return (n2 - 1) * lhOf(o[0], k) + (up + down) * o[0] <= b.h - 8;
  };
  let pk = popts.findIndex((o, k) => {
    const n2 = wrapText(shown, per(o[2])).length;
    return n2 <= o[1] && inkFits(o, k, n2);
  });
  const over = pk < 0;
  if (over) pk = popts.length - 1;
  const size = popts[pk][0];
  const lines = over && !KEYONLY ? wrapText(shown, per(popts[pk][2])).slice(0, popts[pk][1]) : wrapText(shown, per(popts[pk][2]));
  const lh = lhOf(size, pk);
  const top = b.y + b.h / 2 - (lines.length - 1) * lh / 2 + size * 0.36;
  const hintInk = hintType ? C.ink : THEME && THEME.key ? THEME.key[2] : shade(C.accent, 0.3);
  const hintBand = hintType ? mix(C.panel, "#FFFFFF", 0.55) : THEME && THEME.soft ? mix(THEME.soft[0], "#FFFFFF", 0.6) : mix(C.accent, "#FFFFFF", 0.9);
  const hintBar = hintType ? C.dim : THEME && THEME.enter ? THEME.enter[1] : C.accent;
  const pitch = Z.bar.w / Math.max(N, 1);
  return <g>
      <Mascot C={C} speaking={speaking} react={react} ok={mascotOk} onFail={onMascotFail} cheerOn={cheerOn} onCheerFail={onCheerFail} thinkOn={thinkOn} onThinkFail={onThinkFail} bulbN={bulbN} />
      <g data-zone="bubble" {...KEYONLY || NAVDOTS ? { "data-box": [b.x, b.y, b.w, b.h].join(",") } : {}}>
        <path d={`M ${b.x} ${ty - 14} L ${b.x - 18} ${ty} L ${b.x} ${ty + 14} Z`} fill="#FFFFFF" stroke={edge} strokeWidth={edgeW} />
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={24} fill="#FFFFFF" stroke={edge} strokeWidth={edgeW} filter="url(#fShadowSoft)" />
        <rect x={b.x + 1} y={ty - 12} width={4} height={24} fill="#FFFFFF" />
        {hl ? (() => {
    const ilh = pit(hl.is, hl.tight), hlh = pit(hl.hs, hl.tight), gap = gapOf(hl.tight), pad = padOf(hl.tight);
    const H = hl.a.length * ilh + gap + hl.h.length * hlh + pad;
    const topOf = topAt(hl.is);
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
  })() : <g data-role={KEYONLY && hintS ? "hint" : "instruction"}>
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
      {NAVDOTS ? <g data-zone="bar" data-mode={navigable ? "user" : "ai"}>
          {Array.from({ length: N }).map((_, k) => <NavDot
    key={k}
    C={C}
    k={k}
    N={N}
    cx={Z.bar.x + k * HIT + HIT / 2}
    cy={Z.bar.y + HIT / 2}
    now={k === n - 1}
    done={k < n - 1 || done.includes(k + 1) && k !== n - 1}
    onGo={onDot}
    UI={UI}
  />)}
        </g> : <g data-zone="bar" data-mode={navigable ? "user" : "ai"}>
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
      </g>}
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
  const K = KEYONLY, dev = lang === "hi" || lang === "gu";
  const top = K ? 166 : 188, rowH = Math.min(92, ((K ? 470 : 560) - top) / N);
  const played = Object.keys(results).map(Number);
  const total = played.reduce((a, p) => a + (results[p].total || 0), 0);
  const first = played.reduce((a, p) => a + (results[p].firstTry || 0), 0);
  const ratio = total ? first / total : 0;
  const stars = !played.length ? 0 : ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
  const learnedInk = shade(C.accent, 0.25);
  return <g data-zone="summary">
      <rect x={Z.canvas.x} y={Z.canvas.y} width={Z.canvas.w} height={Z.canvas.h} rx={RAD.card} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} />
      <text x={800} y={K ? 142 : 156} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{UI.wellDone}</text>
      {phases.map((p, k) => {
    const y = top + k * rowH, r = results[k + 1];
    return <g key={k} data-row={k}>
            {row === k && <rect className="c4-ring" x={68} y={y - 4} width={1464} height={rowH - 4} rx={18} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
            <circle cx={100} cy={y + (K ? 24 : 29)} r={10} fill={r ? C.accent : "#FFFFFF"} stroke={C.accent} strokeWidth={3} />
            <text x={128} y={y + (K ? 34 : 40)} fontSize={T.label} fontWeight={700} fill={C.ink}>{lineFor(p.concept, lang, TR2)}</text>
            <text x={128} y={y + (K ? dev ? 70 : 66 : dev ? 80 : 74)} fontSize={T.micro} fontWeight={500} fill={learnedInk}>{lineFor(p.learned, lang, TR2)}</text>
            {r && r.last && Thumb2 && <g data-role="thumb" transform={`translate(1290,${y + 2})`}><Thumb2 n={k + 1} result={r} it={r.last.it} C={C} w={236} h={rowH - 10} lang={lang} tx={(v) => lineFor(v, lang, TR2)} /></g>}
          </g>;
  })}
      {showScore && played.length > 0 && <g role="img" aria-label={UI.starsLabel ? UI.starsLabel(first, total) : `Right first time: ${first} of ${total}`}>
          {[0, 1, 2].map((k) => <path
    key={k}
    d={starPath(704 + k * 62, K ? 504 : 596, 24)}
    fill={k < stars ? CONTENT.ten : "#FFFFFF"}
    stroke={k < stars ? shade(CONTENT.ten, 0.3) : C.rule}
    strokeWidth={3}
    strokeLinejoin="round"
  />)}
          <text x={876} y={K ? 514 : 606} fontSize={T.micro} fontWeight={600} fill={C.ink}>{UI.rightFirstTime(first, total)}</text>
        </g>}
      {freePlay && <Key id="free-play" label={UI.freePlay} x={490} y={K ? 544 : 628} w={300} h={K ? 80 : 96} C={C} tone="enter" primary onClick={onFree}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={toneInk("enter", "#FFFFFF")}>{UI.freePlay}</text>
        </Key>}
      <Key id="play-again" label={UI.playAgain} x={freePlay ? 810 : 650} y={K ? 544 : 628} w={300} h={K ? 80 : 96} C={C} tone="soft" onClick={onAgain}>
        <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={toneInk("soft", C.ink)}>{UI.playAgain}</text>
      </Key>
    </g>;
}
const RING_KEYS = ["header", "runs", "work", "slot", "pad", "voice", "bubble", "bar"];
function ringBox(key, workW, panelOpen) {
  if (key === "work") return { x: W.x, y: W.y, w: workW || W.w, h: W.h };
  if (BOARD && (key === "slot" || key === "pad")) return panelOpen ? Z.drawer : KEYONLY ? KEY_CORNER : Z.ask;
  if (key === "slot") return { x: Z.slot.x, y: 150, w: Z.slot.w, h: 192 };
  if (key === "voice") return KEYONLY ? mascotBoxOf(true) : MASCOT_BOX;
  if (key === "bar") return NAVDOTS ? Z.bar : { x: Z.bar.x, y: Z.bar.y - 8, w: Z.bar.w, h: 76 };
  return Z[key];
}
function ToolFrame({ props, tool }) {
  var _a, _b, _c, _d;
  const P = props || {};
  const board = !!tool.board;
  const phases = tool.PHASES || [];
  const N = Math.max(phases.length, 1);
  const keyOnly = board && !!tool.keyOnly, navDots = !!tool.navDots;
  if (board || BOARD || keyOnly || navDots || KEYONLY || NAVDOTS) setLayout(board, !!tool.bigPad, keyOnly, navDots, N);
  SKINS = P.skins !== false;
  THEME = tool.THEME || (typeof TOOL_THEME !== "undefined" ? TOOL_THEME : null) || DEFAULT_THEME;
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
  const [workN, setWorkN] = useState(0);
  const [stage, setStage] = useState("teach");
  const [stepNo, setStepNo] = useState(0);
  const stepRef = useRef(0);
  const [hintText, setHintTextState] = useState("");
  const hintOn = useRef("");
  const hintKind = useRef("hint");
  const setHintText = (s, kind = "hint") => {
    const t = s ? SILENT_VOICE && KEYONLY ? String(s) : speakableIn(s, langRef.current) : "";
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
  const qKey = idx + "." + i + "." + run + "." + workN;
  const say = (it) => tx(it.say) || tx(it.ask) || "";
  const live = useRef({});
  const cardAnswerOn = !!tool.cardAnswer && board;
  const cardKindOf = (it) => !cardAnswerOn || !it || it.choices || !it.parts || !it.parts.some((p) => p.at) ? null : it.parts.some((p) => p.at === "dwhole") ? "decimal" : "fraction";
  const cardKind = cardKindOf(item);
  if (KEYONLY && cardKind) Object.assign(Z.pad, { y: Z.slot.y, h: Z.pad.y + Z.pad.h - Z.slot.y });
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
  const tapLine = () => answerOn === "card" ? cardReadyRef.current ? UI.tapCard(item.cardName ? tx(item.cardName) : cardKind === "decimal" ? UI.cardDec : UI.cardFrac) : "" : answerOn === "choices" ? UI.pickIt : keyAskOn && cardReadyRef.current ? UI.tapAnswer : "";
  const showTap = () => {
    const l = lockedRef.current ? "" : tapLine();
    setHintText(l, l ? "type" : "hint");
  };
  const openedAt = useRef(0);
  const choiceAt = useRef(0);
  const chooseNow = (id) => {
    if (lockedRef.current || live.current.locked) return;
    const t = Date.now();
    if (t - choiceAt.current < 400 || t - changeAt.current < 600) return;
    choiceAt.current = t;
    commit(id);
  };
  const closedAt = useRef(0);
  const openAnswer = () => {
    const L = live.current;
    if (!board || L.stage !== "ask" || L.locked) return false;
    if (Date.now() - changeAt.current < 400) return false;
    if (Date.now() - closedAt.current < 350) return false;
    markActed();
    if (KEYONLY && hintOn.current && hintKind.current === "hint") setHintText("");
    if (!wantRef.current) {
      setPanel(true);
      openedAt.current = Date.now();
      if (!hintOn.current || hintKind.current === "type") setHintText(L.item.choices ? UI.pickIt : UI.typeIt, "type");
    }
    return true;
  };
  const closeAnswer = () => {
    if (wantRef.current && Date.now() - openedAt.current < 300) return;
    closedAt.current = Date.now();
    if (captureRef.current) capture(null);
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
    if (actor.busy()) return;
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
  const hintAt = useRef(0);
  const askHint = () => {
    const L = live.current;
    if (Date.now() - hintAt.current < 200) return;
    hintAt.current = Date.now();
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
      const r = results.current[L.n] || { answered: 0, firstTry: 0, total: L.items.length };
      const once = !(r.done || []).includes(L.i);
      if (once && L.tries === 0) firstTry.current += 1;
      if (once) answered.current += 1;
      results.current[L.n] = {
        ...r,
        done: once ? [...r.done || [], L.i] : r.done,
        answered: r.answered + (once ? 1 : 0),
        firstTry: r.firstTry + (once && L.tries === 0 ? 1 : 0),
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
    const lent = captureRef.current;
    if (lent) later(() => {
      if (captureRef.current === lent) {
        try {
          lent("clear");
        } catch (e) {
        }
      }
    }, 0);
    setTyped("");
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
    if (actor.busy()) return;
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
    if (k === "enter" && staleRef.current && L.item.pad !== "enter") return;
    if (k !== "enter" && (L.item.pad === "enter" || L.item.choices)) return;
    if (KEYONLY && hintOn.current && hintKind.current === "hint" && !(k === "enter" && L.item.pad === "enter")) setHintText("");
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
    if (Date.now() - openedAt.current < 300) return;
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
    const same = a === live.current.i && (live.current.stage !== "ask" || live.current.tries > 0 || live.current.locked);
    setI(a);
    setTyped("");
    setTries(0);
    setWrong(null);
    lockNow(false);
    forgetActed();
    setStage("ask");
    if (same) setWorkN((n2) => n2 + 1);
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
  const actor = useActionKit(lockNow, lockedRef, sfx, `${run}.${workN}:${idx}:${i}:${stage === "demo" ? "demo" : ""}`);
  const fontGen = useFontKit();
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
        ...KEYONLY ? { keyOnly: true } : {},
        ...NAVDOTS ? { navDots: true } : {},
        ...nextKeyOn ? { nextKey: heldNext ? heldNext === "phase" ? UI.nextPhase : heldNext === "summary" ? UI.summaryKey : UI.next : null } : {},
        party: party.on,
        acting: actor.busy(),
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
    say: (lines, doneFn) => {
      const L = live.current;
      if (KEYONLY && L && L.stage === "win" && L.items && L.i === L.items.length - 1 && L.phase && L.phase.closing) lines = L.phase.closing;
      return voice.speak(Array.isArray(lines) ? lines.map((l) => tx(l)) : tx(lines), doneFn, { nopark: true });
    },
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
    answerReady,
    /* 2026-10-16: a real tool performs the act on screen (the ACTION_KIT_HELPER block) */
    act: actor.act
  };
  const keyW = cardAnswerOn && item.choices ? item.choices.length * choiceKeyW(item.choices, lang, tool.TR) + (item.choices.length - 1) * 14 : 264;
  const keyBox = KEYONLY ? { x: KEY_CORNER.x + KEY_CORNER.w - (keyW + 18) - W.x, y: KEY_CORNER.y - W.y, w: keyW + 18, h: KEY_CORNER.h } : null;
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
    box: { w: workW, h: W.h, open: panelOpen, board, ...keyBox ? { key: keyBox } : {} },
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
      <style>{fontKitCss(CSS)}</style>
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
    key={"f" + fontGen}
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
    key={"f" + fontGen}
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
        <g data-zone="work" transform={`translate(${W.x},${W.y})`} onClick={workTap} pointerEvents={actor.play ? "none" : void 0}>
          {
    /* r41: a transparent floor under Work, so a tap on EMPTY board lands inside the zone and counts as a wrong act in a guide step */
  }
          <rect data-role="work-floor" x={0} y={0} width={workW} height={W.h} fill="transparent" aria-hidden="true" />
          {Work2 && <Work2 key={run + "." + workN} {...workProps} />}
        </g>
        {actor.play && <g data-role="act-layer" transform={`translate(${W.x},${W.y})`} pointerEvents="none" aria-hidden="true">
            <ActLayer play={actor.play} w={workW} h={W.h} C={C} />
          </g>}
        {(() => {
    const askText = stage === "teach" ? "" : stage === "free" ? UI.freePlay : tx(item.ask);
    const nextLabel = heldNext === "phase" ? UI.nextPhase : heldNext === "summary" ? UI.summaryKey : UI.next;
    const slotEl = <Slot
      C={C}
      ask={board ? "" : askText}
      typed={stage === "free" ? "" : typed}
      active={stage === "ask" && !captured}
      live={stage === "ask"}
      lang={lang}
      TR={tool.TR}
      format={tool.format || (item.choices ? (v) => {
        const c = item.choices.find((c2) => String(c2.id) === String(v));
        return c ? c.label : v;
      } : void 0)}
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
      choices={stage === "free" || KEYONLY && cardAnswerOn && item.choices ? null : item.choices}
      onChoice={chooseNow}
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
    const askMode = nextKeyOn && heldNext ? "next" : stage !== "ask" || locked ? "off" : item.pad === "enter" && !captured ? "enter" : answerOn === "choices" ? "choices" : answerOn === "card" ? KEYONLY && panelOpen ? "answer" : "card" : "answer";
    const askEl = <AskBar
      C={C}
      ask={askText}
      hasRuns={!!Runs}
      mode={askMode}
      open={panelOpen}
      UI={UI}
      nextLabel={nextLabel}
      keyOnly={KEYONLY}
      choices={item.choices}
      onChoice={chooseNow}
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
        if (!wantRef.current && !captureRef.current) openAnswer();
        else closeAnswer();
      }}
    />;
    return <>
              {!KEYONLY && askEl}
              <g data-zone="drawer" display={slide < 2e-3 ? "none" : void 0} transform={`translate(${((1 - slide) * (Z.drawer.w + 56)).toFixed(1)},0)`}>
                <rect x={Z.drawer.x} y={Z.drawer.y} width={Z.drawer.w} height={Z.drawer.h} rx={RAD.card - 4} fill={THEME && THEME.panel ? "url(#gTpanel)" : "url(#gPanel)"} stroke={THEME && THEME.panel ? THEME.slot || C.rule : C.rule} strokeWidth={2} filter="url(#fShadow)" />
                {cardKind ? KEYONLY ? null : <Key
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
              {KEYONLY && askEl}
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
    onDot={(k) => enterPhase(k, 0)}
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
const MASCOT_IMAGE = "data:image/webp;base64,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";
const MASCOT_CHEER = "data:image/webp;base64,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";
const MASCOT_THINK = "data:image/webp;base64,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";
const MASCOT_SIZE = { w: 281, h: 420 };
const ACTION_KIT = {
  "knife": "data:image/webp;base64,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",
  "scissors": "data:image/webp;base64,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",
  "ruler": "data:image/webp;base64,UklGRmYDAABXRUJQVlA4WAoAAAAQAAAAxwAAKQAAQUxQSOEAAAANgKPtfyLll2R2F3f31t21dC/3CFyAO2jPwwHcWrfK3Z3K3WEmTwZtMzgRMQF4kzJCIOdCCB3vUrOTd6I/5Fw/3t06u1PFK8XNmuOocUmDd4jPYW/TJQeIV6UGeSegjmF5ou5ch7mCQ/bNVvt6Dt9MyL+5cOQE2Q8GACHOc0jSjIA5dQQKNwLE6RL//v9GzBUjoF8RjMczA6COAgNhPgZg9xw4mshRpO+xywRodSHlJsl7bFAIIA6rbIuizIRImi7U2VY3BgD8srF7LzSMSpq6uO5mIXhTqLeniytC0syM4E0AVlA4IF4CAABQEACdASrIACoAPnk8mUkko6KhI1v6uJAPCWVsif+8jdAIgCBo3Azre9ra30wAcuEKRRDse0dqkw4zlub03rNSdJIfvl0HBR/L3bGm8tPyIdMwz02Qh2MEyU5cFGBJfEsljCkKc7EPoLMJ6Un2Dv5T33xHCdDc3HGiZskJAV26HAz6XwNUp/VEgyYAAP76R/d8aOa5EdtN8crcoAtsgCJ4Ov+DezDnbOz8cL9OJKX8u/PBLpz4UVh0xIDmOa2+ja0NxgB0SjFtTCjAA/7/iaGfz2MedQ9wz9i1L1tn8JMvV78SfTofcqA7JXCif0NOfKOOcXfxzqWRVPHkOTxFwCuky01AcdPInm++BoVKSxK9QHnUNnwA7O4fBd7ujZBueartInR2U7u3EP+/Hbyva7GJUN6H+9sfdcFZcfANSz7H/KcYf+ItSVMCG8T6bdb+4/5tsCesg//QxH+hONiXAUi+L81Ub9ECctEDWeBy4JCqenyTu4XhmrZl+RT/8glDYlLZ3lwH5OVrL5x6YACUXH8VAujoq5dGqQo0x5LRL5sPXmKE5TQV9AWPqpSpeCrTxOn0QhciH4bfs0dFGX+6wzIt1pZVnH+aWmRJHRX2TK7GgCv+DPVchajXgH7F7jaUCDr7OL8f/obDjZp0pKG/JoOkIOZ7kuUl+qWIfWQCi+glWi2ubdvvMHY8jv+6UQoeEBpPzTMRRyns+snf5OEdZJQLuaHh6ROOZZP2pfmjlFLJSUu1MMSv7FF4m4iV8FnU0OJsVlf6XP6cPnbimHT0U2E+kH+V/pEdm2+C0BwDAAA=",
  "pencil": "data:image/webp;base64,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",
  "eraser": "data:image/webp;base64,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"
};
const ACTION_KIT_FIT = { "knife": { "w": 200, "h": 37, "len": 210, "ax": 0.02, "ay": 0.6, "rot": -90 }, "scissors": { "w": 111, "h": 140, "len": 170, "ax": 0.55, "ay": 0.02, "rot": 0 }, "ruler": { "w": 200, "h": 42, "len": 400, "ax": 0, "ay": 0, "rot": 0 }, "pencil": { "w": 190, "h": 40, "len": 190, "ax": 0.01, "ay": 0.5, "rot": -45 }, "eraser": { "w": 110, "h": 90, "len": 100, "ax": 0.5, "ay": 0.5, "rot": 0 } };
const FONT_KIT = { "family": "C4 Poppins", "weights": [500, 600, 700], "licence": "Copyright 2020 The Poppins Project Authors (https://github.com/itfoundry/Poppins); SIL Open Font License 1.1", "css": "@font-face{font-family:'C4 Poppins';font-style:normal;font-weight:500;font-display:swap;src:url(data:font/woff2;base64,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) format('woff2');unicode-range:U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201D,U+2022,U+2026,U+20B9,U+00D7,U+00F7,U+2212,U+0900-097F,U+1CD0-1CFF,U+200C-200D,U+25CC,U+A8E0-A8FF}@font-face{font-family:'C4 Poppins';font-style:normal;font-weight:600;font-display:swap;src:url(data:font/woff2;base64,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) format('woff2');unicode-range:U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201D,U+2022,U+2026,U+20B9,U+00D7,U+00F7,U+2212,U+0900-097F,U+1CD0-1CFF,U+200C-200D,U+25CC,U+A8E0-A8FF}@font-face{font-family:'C4 Poppins';font-style:normal;font-weight:700;font-display:swap;src:url(data:font/woff2;base64,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) format('woff2');unicode-range:U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201D,U+2022,U+2026,U+20B9,U+00D7,U+00F7,U+2212,U+0900-097F,U+1CD0-1CFF,U+200C-200D,U+25CC,U+A8E0-A8FF}" };
const TOOL_IMAGES = {
  "purse": "data:image/webp;base64,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",
  "note10": "data:image/webp;base64,UklGRmQZAABXRUJQVlA4WAoAAAAQAAAA2wAAaAAAQUxQSJAAAAANcFpr29q8Kf5ZoEwLMLcuKhOUNkQdW5YMPuSyAA3xuv4RMQEAkvqyU1XBpG8+V0YEANkL6BS11qI3coHsC5xmbhMneQGtV00Hr+XBkhhMO8zUq8yUVGYEpP+l/6X/pf//ovcFMYFZI8Z5toj5rRbE7IxehhZvH41utIwAd3ItU+KNAMDRBtN6SVAROL/dHgBWUDggrhgAANBTAJ0BKtwAaQA+dS6SRiSioaExuS1wkA6JZwDFwN6SxGn9y/6fwN8onxXQ5xD9emoj3r/x/W//Sd6vyd1FPaXoIfe9m3bX0BfcX7N5tf2XmZ9k/+h7gP6s/9L1i/6vhh/if97+zHwF/1H/Gf931gf/XzN/s3+79gn9g/+z69fs+9KAzw36ItfxmGKRimpEjbN4DHMgXQ8U/6UmuQLc8cvX+9aesVXg5lZGr9HncNFIuQPc087LCZE9r4LJVpqnDqTqQ1FkG+TYq34D1bH3UM/KkuMrCrZjMN3M2x6hqzG7wBDOtHat2kYwQqAf1QleE9VyyFtq440mhXxJErFxmjL9RTpyo5tnSdGdBPlMWQVTDTrsIRqUP2078bD39EUk5hgzGqxECGeK9GqEV4JvbYkIHff0JTVvysYjKYiYgUA6Nxv64NdJDPCppuX2p/20f6zanDcAsmeCrmv4M9uyXN5z+UhvL4OXmrf9XGYrAR608YGuwgUXAf3k2vuXlbBstcHt/70mcJsVDhdsuXfj8SJAyJXl1/DlDhK/VdyjsOWVvXktfM53ecINO8gDey6g/utfIKqcnRJO1xd1xRhY3UhuuLB2mgJ6CflAePH748mQTqhvmxPfPcCiMePGfsVFBXK/e7qY7z4BDT2TvjFiI3BnxCe7F+9FoUIEREefHZX24ugY+vUeRreUK4WuzEWqD7BJvqPzHaeS0NLkyk5Qkglgg7FW0C/ssMwwZKX7vMNJ7I0cLWCKTrLocd3VYTdXSvzxTdGqWqRbxTwC5VBVGKr7eoha85Q7iHzCkwPRCR5DeYj8BaGqrV7Pt6lweRthbYdLWILqq+FIeRU/B/UYFsqNnBgRPhgk2Iuvi9t+pN+lXloKMCbWtoJP3qCe/06iz9WYToscIwAA/HtwnwSNyOgQWrx5ot66ykRSF+sbqIQISTVNPdGsrJAE2M8EysW+ZjPxWsRMlp3rbFqr1+E2jQ3U/0XGd+T9n+R4P1aK7CwuPt02upujzX9FkOIrjrFNlLjiUQJWL2YRbsnHWkO/SjcQOF6Kr4T0063OF0prbEXzkfxHuwB0thmuul+TROk7H0YA5ixQpxe4TIKoU7aHs51rPSiMtg/o25O12Ywqd8HHSSk1OlqSb3Cjwdr/GbR6AleLEG+mgi8+djBay3JAReoeMQ0wfX/V1iocynJH4AQBj5U3rLRWkrhWQWmsOXkxaJkaXv+8HLWdKhFQufahPGUgMwYXy4yBVPSlPy1MEkXuq83hea7ngD/hWB7DRu6uZKDRsNQ0QlWwDmwr5zJLIsgfr1ywrLnvg4sWBo5+qvSONdtanwSIPXS4Sjxxaig6/zqG1vHVOucoC7S21SmcwD+ARz4BxefpZO4RmhQz5o8yKCTGccMU9ExUvPlSHGxE3o/4G8vGHJm5sOqgdVEr69omSYSuV/uLhId4hg2SjhZhfI6l86S0QaxYD28HEzJLbhKlf2QfMAGOPvQ/YsXLxzKKXubmhDqOhuAnsScyIKiFttGzkOgCMSs/PXZ/4K3JEP50RfyjGJ5pMlPceC9L0SATAnd5lt4j46hmuROIO0eKQ0K9HKGIcgO7QBdffgjfS+CmZmw+Vd7ERJzca1yby1rOxDXFI1d01O8PIo4tbq85OBPq7BI1zBIQeHgsfjwHDzPVETrwX3PpTyWEbGQ7obj7HV84kf535+m2QBzYgpbGNoVZz+Z00rWXTFDAXL3LIWUEedLWdQe/uIiZWTT0vr0dre29OK2tKiS5rhaBh6wyVlOMeCX1nYRFODEy3TQ6fPkWasLSYb8aTZt7zwHSFKetx7d0HCa67kKyrWGVRZnM2Lw8XJZAKXhgC15uhtYAXmiOottP3RYFmQKMrn/JmNTEMq6qFbPRNGWXa2cW8/j/On8h2nwIdRuotcAcnqOANpyYHuMTTN8AcuPCL5ivaPyjOHyx10J/YmteGMRdXPfD8CazekK1hKAkBmpBgiRVz/RhgywVsV1OIgQSWrbRljDYekK69s5vphMMj41SvshIJcsjkHytSlEGBDKEP2vmtCZAiAW/cd0pBMUo5/nAzwmnuZ/BOgo0WdE/cKec7syYyF08dA1u7kEy94p3lIsTla8PrLyadh/fI469Sl8QsD1VU326z72nYZuhCMOKc03wfTjeMGf0yPTXrpAd+y975GZcivn/T9tlZ7njZu84tinivP44DDYecbjOBDJAE4UnmNi+DxTNpOO8EB0A7uC2Hv3T4UGRiM3HQRZ55UZcN1IrrLpw4iUxzTw0yN/+X7dpqk+AbljsneDPaRk/jJiJ6Bc8sW8fjt2dsNN+LK8/c7oeSthUOonsOEaNZBWCzfkH4Bi4C9Z3cEfz3Rn6l2iTn9vxZfbWpTzSQbKzOlH/pYQGP80MTb2/f+qRhGXx7h/CgTbt/fQeeoyUwGmBsrIiaOHAUEfGdz+vox6xoJiWkBoZcrAjNbU+/3mI9mBNcfztDQAvE9COWpNRQG7PYJTBl8TPqNoyU+ZjCHSyUxmOencNd4j+DvIZy+GpQcNFUueDHduVEZugFo/gFZv4FuVIuaEUtZ4E+WdFwR5EfpPfGzlW5GklOfCc0oseRY0oN+O/dwEFzQXRYKFsGXyOSn+oAlsxEGFkIAZfoq6k9mZEO8zCIH/33088y4EaKRbapt6kVg8sh+kFvwtAaUqhhdNc7srqZVIy9AXaXGKCv+rhLonp7y+10uqLJ447ou4p71J+7XmHe881GAIiLbFw6BoOipbS+Ut2Tb8PjDaKmLP/yFjb5aKme/TNZT5Ek11+o353tXvm1QrZZAHVsgVv5tqElP4Vvmz+L8mVpj0M0QdpECYklyqnpBVajkdXwqur3t3GI+O6t55KDijNTfiNxhSvyrK+rnRnf13ShOhPmMy+cLLvOdp2Tz30zaACgRTDn0DiG4WK+QDA0ToOb8+Xo+hlY7n5i6XpMZ91vbHASYCzJPre4yrg3Rljr0EVb5kf0r4SB+5dgO505VxLIDW7MxrXvjumXBh3Tvbpz9w8qh7dzr20qlrLaSzFcJ0JsOE5OQPlYXywnGIxWbI5lcKAoyBB8I/a0NiX+IvJog3BJgWPknjw9eBYO9GoFrikiR5Gugi0zqlIKzCz1qaZDgWb5x+YzkjKzisCTjmdINYxmNB/LsWZaAVVr29cNcIHCDo1vfm2HUUg2PRgYxsh9O+YxrzrjuSExSLI6e9PBTlnjrnD3QD/8P0riEFGlH5IAjRis1LvnJiOPWdY5C5zv46Mgn+gtC1kSGYPYs68866pauW5wfR9OaPEI7UBTKY2u61xYH2bLxC8AWfZDE+zOaU60PN7VU1aOAsIydL90m1bUP1FtCODURh/nFHpzcodYwiHPUiYNq+JS/aGV4h+vC68FcK+K3tYOpZ3GrUVgWmrDI7aSB4LrZSF5HEeORQWeOoX92fuSK09zVGMn3c1UYJwlQIiEnPfhOO6AVpeWyeWNYo/lsm808FmNsGUBVWpFhQ5dop0VjaMN823pqhM6NViPCuGo49lXmjYFTXjv9iPXN2jhEPOZNDWmAfa9BrH4U7HX6ZxGpyweNPfCmEclH+U9HqDsQYZ9adZZiiSgfXDdcKLsizIXPN11AcP1WqGXhS6gSX5BwUaZA47AP+kNjIsrVKEdtpwOgHLdBejcsoVi126Ajq+gTFabUQWQgOXvEMvjxtM1Y4px7VfmZ2NCiwvFRC9nZBKhdI2s6HkGW/jiLJWsx5pFUpgz2Dpo6Vbo05pPuVu8J5oN2yHaT6w516kBNbk0ve7cfqv3cx6zqkCJsoIjl7pzIfqKi1G3Lp6+3QB9L7tLRvfhJEb2XevDyOBx2EqUd40OnT7hUCaKjlPGuwUMtUXa13GNvunojKeH6j0MH4NXv2mTSC6amvHih32xpTywLXL1giSVmKlM4BEbH/rIVzhkgVU3L1GxbilsB7c99lg+DaEFKBX2s9GqOlXA3COu7OAhKFQCvK7wjhJKQ5zEW7vYCFJMkQy2nz5811zgmptuPl1Yhnbbiy7OGIGRuzUg5Rr+WvlRsZclmEcJzytbMAX/WSkDhDvAmes0BQq1qXAfDAkMt39YWgjzOgdnXhlJvPMMLofhKMFiAmEkWZJox9QL1lRhiEd68RwtcIYiXEAmBQPdlEDAnSqiJd8NG0D961Lyn1xr0q9ERVFEQAl1qkCReLV88UzoWWFzdN6pCotgPONyW4muhwybP1gFzvGYjQokYbs9m2R98Wh1lewtGRUpjpKWc3RronKvLu+sQVdmklUPNj5+1laB27Ho3As2FOvRD1Jn/mHqJ9oa8wlisfDL6rItnC5U1yw8tmpQHm5BK4YYdzuKRAiL5P0BSwCHyxWMAjOKdz0mZ3X9xPqZK3AOO8yhMS9wP+HLPnUNtvY4/7KS1MFBQomMcKfHJmA1P+Bh4spVvOy6KsVNVwKc5lxmSpfoK0LYSQSTZ05HnVLJrjcK5ruM1whEZR1z6Roj8Xt9bbPufPmLsRRLZHcy+VHr2gykRrG6YUnZlYq9s1sP0v9LPfKhQYfiSxnbEAgAxBdQwwSkWLFYI6GesO8ZqmrRQPvner4/Xt3MWGC2wIXMKspH7pYDBIGiwWix1byEoXCYgK3DoNapgWizr+vvPQ/r9MjnebMr9lqboBG3i3/l26mPnLfqBvexg+Vu8ha6vFeTDIUg1CwQoF64GXRuWWBEyH9iAdsdUQxYC8h2FaT01KWNUbZE2BuYXNQTQTsQFCPvqQc84FHDlUMA6L+Bgco0uCeVbCXUu+Smm8VfiyvQFAnnbcMZ+g6/CcanLF8qOsJ6WCXHPsC7ygwdUNUCPYjYBaDKCdGvqsAEx6+vnqDYPMKe+eipub1ow4OZSHY9GBzpxL8Qrc8MmjXX9ruseaLzC721M4Q85coDjkTVK+w/Ci2L9j9Kfm53ex/C49YMHpGjGgQUkR2Yepz3c5OVUIlC64Uf8/H/Aex8dmMskIu1K7bebltmc/6FxhxpBuLfJLNUpJy/I78ijQXChd5E/Q0q6PkLx1ZSMvmvHAEVoV5W1TAaJeCJ0wn7DdyXJjbJ0FUnIL6Oh3a6Qi9zJlFhSTNgI7BKOe6PAJwMmv+ExVV0iV19NT15hAokC+LJcujRxHZn8MFnjL008Y5C/XXzh1/maA9l89lhVdK/HU1NFhq6Mkp6xScUhnChFXjIFpMZkqnikAOqgMwnhreVYuiWx1ggZgiN+nm6LRf9Wsp6jZvWlVl9wZbz7fh+/5kKVHqh/7wUFv2t+DWmBIS59EG4CImD9YLkNIU1GVYXWZnwwQgS+HB0M3u8no4Mnhl+489FiTqh2pwJHkhLE3gpM/xlqwaOuhhMR+9LuedY6wpVvTrzz2ZjPqxUZd0ZJV6pCuZKuMXcgn7xpoovIdCyZ+v0oVraZiySXVupDVGd9erYIE3mF6ganAXJt1H9dppBefj9YNVHs5bFhCTUZTRWc25btRwcnuzrh7wGBqsrh+PfAWA7bUQkYB1gjaIe3ZKzMD+hwceQKn1odGYg7cku6Ye39pViJ0ofpczERXo0OiJLuDObQT2439Z2NM9k/mSduV5oz2L2f6ovJffQkttBnVvvSHiXNXUK3LBv29WZoxMdBZogO0NDf2L0OHNt+u+WTSG7bFqPTM3M39bPl0h21eQI4wm+zBG1q45a5dm9KQ0hvl/9eJxeWdbxexuQT2nwjFJsip7BEamUU0H1Brqj789XxTcmfiK4Ya1hYrhGqO5k+DT1rL+GnM9U7o0Yyc80BBv+8c4D5Km7OstPf5dpAeK2eQHswbnJaKo7624aDqzwbnab3Dqt/wOHNX+9KMlRwCn30jQEpZWDywrFUWzbJMMVTU1LIrENQXp/aN+W2CcR+rxWrH05dG++UjiT+iptynYPp+WzExk3FL1YHyWBCBDQhG6fai8yPs5h7K+3ZAMaE8p54KYIGV+9Rf0HxiI9/y0uwZbfX4/+cUfzurf7H/5Fykgp4erRxNTv1659WXDXjY2/LsqfizIXsn1WdCxGt/rpKv+Zq7U5OM4n/632M8je7ol/qP7pb31lxX+895/jqi6JIHg7uCMyaso7WXVhRhG9vydwH6IcpUFSx91yXygpZR5g/eMq2YNmmO3b9n8AsMANSZHhkqI/bwS4KdjZ7BxTXsXLQtpljzUx4A0SNSfRNgxLrsGrNtkGoPOAA2/KFIVxouXo4++E5Esrye+tlFrBhz6fFBF6vVQ0g4BkG7e+kWqypXIW/8acF7xhN88cwIlzHRQqYLlbBd7EhGDK1reLWsxeAS6bCxqb2xnoHANWn75TqFpK8iBMvm5QEjmVDeKW/8BMCKsl32kiAxGBgZfRR3nyX/CLauVbdh8A5oKk46oFx0ObDQ+ARHfwMtW/hMt918koQjQGTMmrSYxhTTsvqLPjQDGZeqqgNDlCVS546XB5r0ymulohCRMZZG6AcueJEK14KNLNoRo2HPxl2Zi/d0C0wMjOtwCMkddRo2C0N4UfjuqUtGQ5AhCEDtqt5PaOMs/67NAvyRryYxhsy/Av0VAJGTPKciPYJgD7rpicc8WquRh+tRfGrmjlj9vAoC/KByjLVeWmZKRvUr/yTUR0kHQOJyRV4GsZxb6q+fYk8Gc80IrKzcaZmmOovzGBvPrr9AGcpOgQurTHPCLkZAk+cTM9esRjn0AZ5AF5eArvQbGHWhoeGfgQdFTbpa8Dre2x1iewMKUSbAmUNFaT10QW3xmGkF7jtF0tNnwnRLZPgjiavfEffnKQFKm79UzIMb6ciogUfrKVlh70iqlcuZquOHfd9FScUHDIiH7MQ5IH3wPBvfyzLtXqSzPgg22E4jF8XTlVn6OWstD9vl3vz5kN7Sj83LkYojj70EfrWBVU8PuVPJqFediwrXvUbeI0HedByk9BduL5gbS0VYVAEqWEbsHyOYCLYroeW2WdfsTRqVy4lB1goCIeFdiyxbhJ+i+zGdl0lWpHZpI2V5bc5Emaf/wtBGrDRTLeIy+wS18eXzIJ991R7nXYeamkJtj0eae7H32PYX17XHaaaKwrSPkQ6JkSI902yw9EG01NbPaJ9SeqVvCGoJgIhExJcGdhPm1ESCPgVdyt6U5yN6RyFEUBI2zHivKY3/2JqeOy57qNRxXsi2gcTAj5JEhh3OEpQDbhyVp4q11gEh7HVgFybUoAHzl6GvZZp/5bgG69/0BYHBgQnvzDj8PG+a1jWYVo+P6rcAeJf/DVAONk4iugKIKMKDrY1Jvat+E3XapsT6ptqR8rT0Tuz/gri32Lvb+XJzLaBvrsLRmwHwhwnjD96WPP79pZuv8kwK0+2mk2cIz01b3Wm9dv//UPq9Yo33WMCw3MXvgxJUaD8t7krMWZDzKkGk4ONIuAkd+0B/YQtZQTOdGvuDAgd12JyvkU4rr0fk0p98Oj4tCfI/Okc3WPVfJOI+/Ay2/1/50n9ulFkTOZSLPLrvm9CcsMWB+Q40EA3EY3VWIvX74+7pKAsfUE47H/Yret9kyDZ+7K8v1IMgdUP0YRTHW5t4wpBYlVBHEcx1fpt2RnfAY/+/UTvviY2uw2NX/EtSiwc75gBZ49hKy9SqOs6IamQGV6LTWSbEyESmsKkjJ/I+/ocQPN0SekUw/AO7UTfpoaxTJVmKL5VaA0X19Eg/54WPAk7AFGlDk9QEHDTBJDsVYNOcID3jnfvGrDIgNZyL5tulJACtRz4nryhKeH1wRPGfJN+lA1Gi0DNZHpJPDdAjcJ/nrVmP5n493dosxTcH1xevK76BZ/gSHaFB+y+kiwgAGjZ8Gu48fFxasgEiUQqQAC2b3NOTfM+QOXwn87quwQrCeuyRkY59O7Op+FNFw74IrgFCkCYZPDLCXisvSjRfyRHtNlFOIVG+aTnu+2Ejlj/zsjY/0+8iFbs5JgFGVgUlVgoo/LfLcefdSbyvd66emvQ8FcxnsA5Hnztx33she7KrPXakt9rH+nYdtfBoL9TX9v5rWvOtjPN3+dGuXHGnErfK/+NEK1zuQTyZd53U8+oEkO+fDDpkuOdZqZieaE06vObOyCtwnuNpRN15+SzcSHG/dd8C+MIraO0hWjDQqNGGcEPDf4IbW5R573QyPr7ypXHR6uM4bZ3fzVuUOoo4paquTDZn0uw8BfSMU/kDz4w6FaK0w+4/iNBiKUqaAPLqs6ub5sDBCMLWRkv8/5J+PzmTiwXTeP3UIH8hTb6F9X/Y1zQp85/e0NEDcAZrUUKddQUoMqXB6atLocRqK2eir9s/gcLvg7jc01DN8OefERZL/8t4Fn3anYW15nuWtB4Nh8MzaKiT3b0LP52lFKO+cAdnILtqMdE+peCFwYu9GWods4iRiLoIqzQ4d+2FlaiNPRec+h/86yBXdQCfd3x2AHpHBgMp8atANU46qeCa3JgUMNWeAVw7M8wbxmB0Ehs8gjO+QPCYAAA==",
  "note20": "data:image/webp;base64,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",
  "note50": "data:image/webp;base64,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",
  "note100": "data:image/webp;base64,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",
  "note200": "data:image/webp;base64,UklGRqwZAABXRUJQVlA4WAoAAAAQAAAA2wAAYAAAQUxQSGQAAAABV2Cmbdt087dvNQKDsmsRESq3POOAbW3bsO6iCpkSpFrQgB7kmniZpYVZrzfyh4j+TwBsXoekRAXUQ9TDHaq6cDGNSxhc0uIi5/f/7/+renGRwSU1LqFwMY6LRmXiAZsXC4kKVlA4ICIZAACwVwCdASrcAGEAPnEukUYkoqGhtjcbuJAOCWIAwB/MTffR+bRyL3afD8nPa72T5iXTXyq/Lz/o+tnybuj15wftA9079Y+pV6qD0Lf0z66j9zLbBaT6t/svNFxZ9mGov3f53v67vf+V+oX7K9Ab77s/ACfpH9g84n6/zS+zvsAfrJ6X/9fww/v3/a9gP+l/4r/s+z//s+Sr9p/3/sFfsZ1x/Rp/cg1u4zG1YCw3csMeo2S/Opl+OMrEwIb5rSJMkPse8n9iqnieOf5huR19IcOyPGI5mya1ibG8SEsHbbMsYL3ZZX2LqdHWSS8Y9nMrGbEkMzDeU7ANE+OigEWvggyViaPcuDKxjrRi71uAb26nzd9xjHEEUMxc1BOCzG+r3GhfG/OkiOcLh/H8MUD2bWw0YL4IJWqbUhQqR+Efhq75KZ9iqeU4FW98LpqrTxVxFtXohF4Pr79D2nJwjuDRxD11NljEaxwA5OhdbuG7FfwW9MtgJun8F1DdHpfLRAlQwz9N1aiuYjJ3lJrTOsJMVQuOii6OBtJd4TNKRYUobtH9Bw/qIeVFAODGSG5Q0Q67Ddsme97Oksafs/rStL91ayQtSpPhvxDlM+gUPwr1BRJuNMeEoU5R4Azj0cd9k2X1uO2J8XRbukziOvf2phrcBK7kSyxstFzNIlWQNaY/0SaPGKX2FN/PQGkmSCxcVkGwkg1DZX4al5FUmCh6FgztFpyptz36UlRpNEO/tjIy30uzHuWzNR/blsTQcOc8ZK44WMVFQzKNQKFNEYlPm2o+U/P3uUppNy/wC3fC7+f0PI3HxKSFdxlef7bYc2RItHRJUgiL0g9xkvYhmkEz90rV2bxMS5of4hFuCzIvH/DwXeMJ5/s/Jc6LiQnudOzaJ6wC+N7xBA1RtH3UpHWYwFQ/mjzqXUKrMIy9GdoBs4ykE9q9emna0hKmgAD+fAsStrL8qd4u3yAy56vHU8zCfe3KZVKKIMxpuNPeFh80NB7fGU5WgVbu+Ks/Zef3AgzmbpKnXYX/+a9faiviW/ewn8wkeVmkH/57Esclx1D9rf78Tn8cVV2qc7mD2E+VOioFJW43OEVKJdNvE9Uq8MvPH0UdXPp8eEWbj2chpBFAvN8hfFCBS4Q1plGVkhsvuTVYQte7bss3+DTllRle023wTeOuJOjwIZck4LwhVLPbB18Uo3dV3iAFoh++2cynMmIXFACdGAo+j5t4PfyRU11tBG6ohelE9GvJwFKR1AY1fScprCUZZ0KYfp7m2yIEcc+B/XPbRDlO0/bIE0ZqkCLWj/cMMFe2Rcsz+tZWpFzDe0fu47v6x5ynThW4Ia31pvqyr1e9IMg4mD6lJ+RxbWENzmC2xPlcJyN1p/3qyxP8rYL+V3tk1RwRc5lzyStSBRP4pE413x4wKyvagof6uheoS4kvncjtNMcnwfQ0wIyqKmdBWG9nd1g8PMBdg8yUZuMYxfvOLYecq11TtqKEqmLJV35uFh/cybC6DRehnMilacl0i63xu+0TPo4ZU4gY8QFqe+JfFGlwC3UFuqIZRD7mOLOQlJ9niCVhV9q+/j/QipyjXjGQ1C0iEHZVnoaJMikzrVAVS4lojEutBDdVNXJzTr3Shl5z4UwxAaaNGp/9soQCA/4h/ETfAdzTvKX0jGhRif1JcznQRtot4rmgcpTzDoTPWMxn9v86Z9nh/zMr5xZkm3Uakx1qcAkv3HXOcv7EngeSkDToRr/Vob76FHszmiEy157ApyPSHjI9OkvarQRAhySvJdHD1wRQ7lVNwz9eWEDDIGTPPZdVUn3Rg6HwtfouFFbPHSglOfJ872IikXFqVRz60M4WyrQ2FxiI3WdWSHQnCM1i30S5yvWAB2XgUX4YVtIWHedTbuUGEJ9X84U6B9l/+PlumtKc1/ThVelscM1pPgDROXz+lOe0TbT+BZyooZbWJCbLPEjq/1gfL+sTUFdHvPbU5cI1P3APxi7RPijuzKT0JNxykhadxf+M0waX0X3AB3IE2yNK5onKZPhdshbDXc5j3ostFXzGdaOLiPx9bEJTzwbfUFAXjof9/AdWF9TX6BaPoRf4/mD635W4yyYWDdh1uOs/tT964w6VtOHgKw+yTAGUjBX4RPksqQR6td7ZGw+yc3IW6K4x75Zx79zX5d5jP7RsSFYnKdfvDfGwGSNEQwUs5/FiZL64nL3ZJJid4aAS4zkDNG939VEb7yfSiTnw2g/0JD8ztA7nNBOaTr1cM07B7r9gRko8k8LtevKBZlU15+cPevUYltptN2O3XwhJKWJK2S2hNsJemOHA4NuhGBH+XwaeSuGlMjC2mCBgIlfOhonuxZtaBOywHFVH7xTKMZII0vg8G2qxmjL+WokoKIZ1oZs+7V1ouGHj9SDRmwso1cBZHiJ6n/a8v/zgcHRH07sV5xOr1wnEHM0mRAcekjlCh54hPk32DPTfYR6pJJ5A0ooA4iTib7thjenPTBgrT6hEum1bvbjAC0qZFbPt7P37Kk2JjGHTtdU9vmekV31fG0Cwv6usKmZ27d8bTmQjqwxzgu5Hi7mnmVsw5iEgg+cIZEMlfZgfD1O/Y71rcFdMtQ08fIOFqTlYqnQVD1HdGB9lFPf3hlOMLtK/tqcNBvaWMY/y53wHmmjRzDWbhsBdxCcWdwNIRQPoDDD7ILQV2wZoBks1QyC9SuvywQUX5EoPji+GmU0GHG9kpZ7pBDSqwNLsEIckeDfkyEPJaGjdgvle3kx5Ao58VDy2eX57Kdar0UjgV/JcuQ/gfRWortwj11aUi+fbgwRp6zZFgJYyF45r4gHWyuEa+3LQYSZZyZz2ONBTxjc1GBXce2BnonlQCbvvSYG2x47eGxX0v+l//ZTTZOeb9DpoReFqRXme8KlKPBiMXZ3j56kjVI9qdMjezutDcmuC835wCkFQtkOQOQbCNnWqcgItHe/1sN+VW8VezFvW5vq8pL2/vTZqhhfL85+Ixxp4A89W9OCKYwjpbCMdkROJGLD/mUz9UPcD2XwWoMg3C3rnNdidZgzQEm+LrBCj6w4Q56JHFyMUXkNnMxFS4qRijcAsgQzX2E5qfMFbi69hx7Nf4hUn8KnZTwqCEQc6MAwV5XdTY64VHSKifyWhNfxFjcIleopBSaTUiv98KQsrhHx0IME0WQJ74ClagRSKpjzbXlNgtn56JRgbQ9aAYlTbwZsIvIe7ZCI8VcZz/AghlpjC5ucCG9kaEvq6zbdAVrKfuszvOwAvwZrH8wywRT4RR7pCYTKgBCuBumqgwxv8CvvoYNNaTSLQbhCblmd1+sbuUF1FkIBUahEsEVRZqYO9jaD07HsFMd3/mqGrD+d+O9clwpM8GT9OwRjRJBXw3eR2rmxrv6carnRu8EpkvHO5IruvGtv3qQuoUHMlTiPRjEAE1LY13eBqDwzeEuQ9jIBUF5AcUmw1VHyTjrjB+vmSldqrKJhnnuEakA6Uf3VGPnb1pb5pEKBthe87i8xv5G+c0YdgtbtjpmgegG7izZau9iNwFYoXUmsQju83ZdquOF1bF5Hgq5s7Uu7Wl7jrRVuXVKu9Ly3FqRW+KSexWTHS6LELaDtKzvkwR2KvKpOswznPqiTLr946IiRV3uuu0RjugXsEC+LWtuPAs0O0rnRJ5iUz2jiDB5Dt59zSy0MKDfP/u0jg1L0RooNZYF/qYJU9n2R+v/OBXHd24IizYMjyA/66ktt40vTrKjbMqWy0zJerrJwbBPB2HX5BLkpGrdilBDJn4dxaDZAdQ6+ViIjTqKNk44ItC/Ig5kXmov1lB9sbFMcew8MWCkgcog28djpNZqzJW4675bQg7dbGBhsE1fIaD9BDWnIH6AFl4D4AX1zfL+c7ueifjHc+FYVXobHg9zSTzb4TMcIzpDnHGFuu1WWXCnfXEfC7DV3f4jvWEMhlLmR8ilh6DeaEROXAC85m0kjBLVhZljrP9qkrHFfo4hu+kOC01kEw4wnbqNimW3SZvGK4MfGd13mGqHXkxC2JbJtjHLYekIqLT528mgfsk6PTZRa3fZJJfpS2dGa7P13hwm5tD89roKscQdJBq89GQhm+gWV7/9kEGIbl/ELRaq4vLwk/KD0BQnX8HWD4YB6hqZWZj9B+zqYk2BEmvxMmP7C4TrOrNwlKAocb2HoFucx+FmnrnaZNNk/j2WbxRVMnYE1AG2YGp+sv9vBFu5VwGUDEMSAXkqR4KuMtVJpWe/PbuXZLNPsut+t3fLxZvxPhlgeHue/Phi62W6eeI49w4F1eFvUbID+RPj/9wjLPHF/Aj4oj0PuBGDc2McRcA3LNh9SI4CTQFyIMyw9V1N30YL2dSFPqTv8rHKszyECpMyNGXH+IocPFczwdlLrJqc53bST4Zma5VdF+Mar4YxZKVqEfyIA5GpbDMhhnASau7a2lFy/FU4tgmHdvaw2OHOXOj93gZ6C4WSed1H4q8Rm+e8jtpd8Zw+d0j6I1wTqIPWN5RKhmdLFBjIPuqmkPpXnHmSvLmb4bPJCjP+IpRpZBNjQVXuIIjEr4IwR7zlBdWYrv4ae0GImaVgiWELPUdlinZNVqjfJitylu+csZl3l8vzCE42MrwNC74eYxfwBGvcXIYAD7UoT8CWoVNLsPpCc1zotvxp6Lke7DhW7Bj2mWhLvroZIjIgWd0O5YkUYCW2Zj5uFOqDY090KMAMc8NhgpEHq9dwrPI9IHY9j2Vrn4Tif3yVeWLIG36ng6Eb6Z/XaM8CwDvbpX8bZ/HOGmvIu5PvVfwdVyT0JUqwPOsiNO41JkOBYhI1osushl/ZnzJLsd+m1IdA3NkBj3tmVzGaYth0UPACbWcAJERsALL5qn2wug7lUi5pBW+SMxCuB6ioJUg1W4O2d1hc37X4bwZVYocL/YflP8MDgerPaMWRu+SSV1yCTnGud+RNsN5ZBevVZrRIxf5wqw41alQ0T/PsD+r9BO1Nb1EiCvp7ou/kUAd5WxVQwlYvnXZlb7UtgxYNgYY+3LF/8yo23GFEEtKLKNgfNpWBcYS10GJj3Eqy355BP/IqRv0ksdaAIxpf5jzQrmaNgfXpQY3Km3abSiv0W9RvWGrFB63YsB1pnIjHHfAaacy9nOuwkhQ/YuMjYDYXZODlFmds9A6r6SB5dpug8rDs3hSIu+O6U90R9cl2POceWADulm9OdOBCIf3nu6tv5hRLXiytBfMwBiGuK+Da5eymDnJKqhF4EbenRphBqXoSfi7YuvSLyXOZHCko+VWCmnNFzddo6+f8u4LOQSYTkPTzH4m22Mw3Z5w7okEK77cBLtTu6saJsx0Dh5SnQauvgIAaEsnqkR2/XM2HfmKWOe20FRryMuZSadDvVFjxxdaGu3pGWP2GuEdHhCAx8yO1FjyvaeSm8TMyJvdYApDAZiKGU9mz9y2Bq9rEBTEfwMNQW7TBKCu97fHpuC7Wv5t21YJONos65Z3DN0jTKlPFXWSyWt8OlK/Ha5COrbSWgkt2swdfMW9ygAJP8G5+ueevFQTWZGxfxHEA+x8MJYnpKrf30q/n6YSAeA6Z+2dAkqZeiTiNvGgema9h/eKJXCPypcI1Iv4dF6u3N+V0Nvp1r6zUD+SZ5t0zbKfcq/W75x95BTr5ob75pD9rtXvIR3X/aiB3Xlp0or0lnZbgdSa5ozMfhsPCZB+KULhouYBNMxMEOS0tA04HBYxsqS59jZYqAVASimc8bHr2ULcFum9ly/6D2LAx1JmNBCA5BkWTMNX8/kep//6d9sTd/gPd2iIsHcFd8mE77HJ4xcVZHG5P8mMKZUGC7KIlAe0PwDy8ve/6HSdeqDRk7o0Nv8HbwAVkspyDWHQUTIvErZxqxqVpCnbegq0MIQBP5cEtRmK43Vg7jROPmWqyCCZnj0yEXstA9n/CJeLROmEJeibt+9383qmW6dyJvHNpPyIExNlTtUsy/n1cgX4nNckYHDc+vbaonsxWsvuGO06Xox0UDGoTY2wN8Vqq3iXwQkpv9WyBvA0PRWp3O9pJtIqv+PHh4N0N2pblAxUxnIILYwP7qL8BeDWvCsW5grFtf4I9ga1zqKuDSEdFH5Hq2yrC1galW9JN8lSWBsYJA6B8sL8qcuSqyMuYZ+dzGIPn+MQ+2WQWx6B3d7Bi7PlskYt6O/mRG0fQBOXnyEZnBKDWMzn6Wh80G3DYNT+L4cK6JBd/tOLbWVuxvTq9JCKB+mQTzPpteINeyJGasNJyoW0BmBZVkUStjvGWiV+auxfRURhcxepG/67E5ac5BgjDLWi2FXj7Vw87rZ44Q/6MIiTM3TwzTqpEkgEWRC7APLgv2ROIy8i8uQ7YqldXS5wqxbwRWjJjWUBsYdrwVZ8e1VLPSCLGHfQiYlHHAXX5Nt2Ct12EeAOzrvK+3KKU2ArEi170RSde1bpeu5jma5DzO5kIRcGhR/85yebCNZPaQmmSQ/VD1QanbaNP5MMq2Kr9y+P+edg7RG09f6vg0pnmra45qmLIeAdSdAsxwwSJzI4ldcq60U9f2sBr0JGXzYg+R4HKKB5ThCi9KFSPtIfmATKg9P6tWgUnBYKRkwgvb8Rj7Kd1rbbi9V67jzvp0zvfT4eYdag4/RCk+om9bT/5ejNpiXlThc/NE0oV0NSvoQifUgBeVS0FyjTCavpdlQw7sQJCVjdL9yaiA+6yqsvDfGd6OZk/8GaeeZ0YSVEebVYXQkdKoo9ilc1yE3S1A/2Y/ONiIGUO1GV7ujIw31yRQzsgwfu6L3cFZk1Y1bXGxu8pi2gHxqivaMiBB99QLRfB6PgC436iDTftS82Taete5v0zgMXgxNZIy4K7z3zyGFUHcf+h3cfEnPvlCadkU+S5lOXo2KKIqQZDczCn+Mg+T4LtbICMar13tx7yrW78ocbELaRwkWRby0LTRz+kieIh2qKdtTij5VZZO0qdv2JPTLY2I6dzNbnA0PvhUWK58rTt5IbI/sHGNrb0WWNnngd9ntzDzCdCL81csqDO4qchMxC+j7Zu7nVKUa1fP9tTKnlkgcjDdpB5SVQguBNonotScPunbdeR3cMfvG/Q29EoaIZvlZZWJ7cQSR+aLguO9gYsE2562QnpntFuef0Y91yPXybgkhO3m5vYb+DWhjf/FomeptlfINjzMl+OaWvGwu2veYexiKPRYpO8B7eRM6I/xeMuAEXGm3j80y4TZGjAfeUX9GZsaRcRe0Usr8AEvr70cpK5e4G+QcB/aS/4ngkAK9iPinHGHMaWndEd0nILWkOQaQqPdzPSWCumSshdieEl20obMb/sjC3LU4mgvSOaanHxzXkDGQD0yPbwdL6sKb67OvP4+1dY+k/k9pqi9lu0TnPgyJhwYMnh3Ha8nOEQe9zEtn/vNMYhp0BPqa8z07OfQsb/FBriEDj0kuqvX4cUsJToIF0cvzRtjiJPLx1TVhe/wU6PYxdsyYgwjx9TqRVEDsZpt6OG1VmvARhuWvYxIfz8LZDL1a+uaJ68uUchhTHJEma/cxXmhW1MZHmo7yd/FzGjR9M+zeu3Ur1jqBWOKUXYGdePnsDpqjjllHyyQY1HA8Udb70LKWkoUsj5jeXFiqRgEP8gs9k15Han36NEUmSClLaSbzSPRSGSQJKTCnlREF5anD0e3hO6vwlK35iFiMJFeequzhSpNR5bd3qDBd0r7Ab3sB0Yh2Rtup16S2rZG6gpukMWIhUKV46dloDkWb1EjYZ60cKotdpLf9yMtvkUnPsUxnz6ECtdg712h1of6hMT5lgE5ddRir2YDjhfQjPE7zBXRhyo8NXTglyQueRF+secCXCy/lbjZUwSl/ja3M7nsPdcX+UC/q/xAUgz5u0jglWdEWr1YEKQ7d8PoeQEGcmzOYWopkI5IKtPkdMUb21c9xPbEKYyMsA83xCyqW9ZtS+0H0zv1fkLJkYu0qhCO0At79BdxHc2Ltr9ncEQQq8A0i5qQ4QQLiiM5ZgNXE0gtfO1QgVLQQ6ipq9f3RaQjZVZC+lMBQ9Pvw9h3YBrtJK+8SoKI3GlT2GCePHKIHIygMd/qSzoTprfgTKB85NnS4gGFPugejQH6lzEMwk66hivZV/fkOT+h6wByrUZ18grJMG4TTWRnqSK/+QcXn0Ielszka36bA5L1antA2NnrP2jnjq4jHSuiCvmJkdF5tWX21dyk1bhNmYUvdH4iIB+ZpQNYyp8w9CmqsQhEcBAAefiol8AsvvfxH1sysgM9c22YbAA/kas20mPn/SSSsEpaUlGOe+82GcP9al1BxWewivjamUHDbBK2LxAd8Q48Yy1Sn2r2V6YjT9lyjsxq1G55BPJNbV7m4+gyVSGbTGy8qRikL9P5yDM/jZTDe+CZs+N6G+/qHKwkmgSWKkMEIukOfc+487ZNkrCeMZ644MM5jYU5hzZEkA62C6iqXeTgUHOJGB0rHlbCKCBl75x3IohycoMqWM0cStSdWI+stQfoRubSE1WzaqZB23DAAAzc5XAfiWgDzosyMswCeUHxfrvKJv9SkCE2hYCHBAHwj1sDkK8hLk7OWzpzfevoeAE8AsGRTP970cu+gINyQCneQB5b5TMdJgPIf0PaAOrssKTq+JFtKFDpx+wiQ4AAAAA==",
  "note500": "data:image/webp;base64,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",
  "coin": "data:image/webp;base64,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",
  "counter": "data:image/webp;base64,UklGRhpHAABXRUJQVlA4WAoAAAAAAAAAfwIA7wAAVlA4IPxGAAAQaQGdASqAAvAAPnk4lkikoyIhJtMbqJAPCWlXusL5+2L+hVKNM8DP4jU+z+ZjceXSHwQtVUAZQZ/Jaix/leKAKWj2nnwpFdTXLhe0Uj6z4aPp/W7+qe/h/a/8n4Rf+rFP95/8+bX+i/2+d/7///J47/rv1vcvnD+5+mqP/DR1/6dPni6/4+ih/+f369rn71/8vZc/zn/mAhSj82zT74x+/LcoKMkrF60tdmflK2P+BX1kzyKYD3aK5+g5APMXr8/Ibf8TvaoV43rux0/B3vGDyfNuPRWvKT5f9W0V4h7yKsEAAee/UVxGqJJbYrl4GmZMYdpc4q1jg2sZmZAA6DzRp8/640r2NPpMtmsPkyGKMpmKw93andf1X2/Lx2POyHy1kPYRVTm8/69KbyUxokaKPB12xzYfoO1KaifjWTKzrZ/iLTMNJodrTSbyI6KTOgNGKHCWoL8/dia/2JA5OE7j+HTKGOcjVlab+Jgx2nTBBVjggEz9Srfdzrb3k845EH2qnYlA8TXTi8rz3UwWU9Pie5/3KjOSPcn4qKFMCouB0156/aqDeVJb2UtwnkOjH/Kd4qUtx4XnPj8B2L2YcgIX8RkDRHftZLQ79MOmE1ZHq8eaztPtzcy6RBMT4CujMXLTsA1e/54arOrjHJZwVBQUYXh5EV5v9IvmdrQ4+lwsxkwu29xUgzHDgExkRizFCKr6qCmysp1aaGwc1x0oV3C585ECuGJNe0mKET0oBAePnLfYbz/J/UCat9qsV51C3Uhc+3e64sbuUmEZ+l4YCr9jScZs4/ORN73j9lAF6PZ1o1MysINq+WxbxmKA2MZgaKSTrwF+T95/7F8cGAnvgtam24oPYRpCr+E8kNNAvbvR0YNjXfTTGfe53fz44xAoEJZsIrwzfKefT+yRmdfez2pedQXoUOuzG/pMnviLg/PogFh6UN/YR4T8b0ayKsEwzjp+D04bGsgeThH6FdH/u1YBBE7Ho/rOczoZthJvFFj9ReRlX2KWKqxf797u31o8wu0okumYhD0afM126orerO+FXzAqu3CHZL4/q1nQHx0tTqWefy3hcgIfbv1pakIViM8lKv4IOC2qB/LX+NMvEPr8S08pnG3gqESVqnK7veMhNPFcyM/NGRKaYMgOxMsF6scXqlxF7CLUf2YAMnRr8Yotk3iCzVa/JtBkSF5ccZWemOr+xabyO89AV+iziq1icRbXNdNh/7cZFkURlT7fe9Mp1N6D9CFXi/hthtINeMPPR6ssi2yVeWaUBzbO7DfhugtOmNrcYQq71sW3xIyxgUe54ekkODxcLv+cY4Tb1800NXk0ZIKGyoPg9RjQf87ae7WwbM0iiM/sn/eYxq++kEk6AprXV+bGTKtJ4Ty53kdIKRoi0g4G8jQHj+Hz8S6AvFbj7enVCTqL27EPazvoAkcYmjPmCaaE6tCT9U/RYwbVKWaWz2GFOZ6dirKW9VvJJqgJRxRa2KaxUS6QJhX2404yoLVwkLewXWBY3CJxvZKJ7Q6Iha973PcmBkcj0FIZmNf/vRVAgB8PS1ReS4NrnIIBpYbrsvu8MoMieDUeCGstm+d8oPAFOfC6t+aPRiZkCIEzt9F3HrCYm8Nv8pMXplZzakMYM81Gz2dgYtVHN6D9DYwPWrX073rjoBySpoqK4u2cqivrftxJzncHw+2Vp+rb5zG8O6UmuHs6RMv/VTYBn+PmR86Xky3Hlrg3p6pWsOMJhOTYmMxTJzgUky9/MyI5wR2o0kjHXSe0Km+iqOB9MWZ+QPTS7HjVTwcGMgDoM6QUKlPX6R0d/GU3AcEpLosmPyNZBEyiAaKA9Jql4RmSJEtZHZGarRkRWsGg2syDjVdTDvjzA7WkqJgR2R/TBQBh9j7QHdWovVSXyeWQWbvRL8YAQdROe4EaGetKJYYXiwmhomsMGG61Lp8sONsYyHvwgXEf87TkcAooQb1+B6BvUvVVvjlpSBrKlhgRw8Db2dQwOdYXUZ7tNK8AW3Mcpyfv51ykO1MiJOzdnDPzVo4WY9frrivkkpy4XHaMzfW+IdLw1/hWSTPp7XhbdyodibPaJe/rvXiJZ/g8F+z4IW9eWpuH3XOdQEGRLr5ifnERSQR2yOlkJ30E+FyCNSf23Uj9oOPT5utmkm1FYLQ38UF5KACv1XdkMurxzWUdevjM5LJM7truoHfID2VfrQ+7gx4uteXjGTxW0QoE9zrR5+2pFHTgR1n4KPHoIQEtIySTMmBx6CIXXHtRn6Lo61ul4M4sZDVabHSejUS9/S69WXhj4w+jYWD177gt7ABuVNX8SMoiuv2NIqNM+VT8eYhwg0VD03XnG+BnprmnhdQsyKR4UEkY61mPTmJ2hrSLBfvfum+TwbtupbB8cAcLzqscvmM88GV1pKGHU/K3YBljQ1j8Zwyd8LDpNhN4vK/TOD2y9r3g8nPNG6d3UOHOQw3DGP5Yz3LQJuRoCnVpB3jhvRvtJLTaPmdQS8EKsT+EJV6E4FO+e/8HGVUCjVIhIC7T7t6Itx1oyL9RRVXl6Oq2N0alpldEK6jJyW0TDkvQqiIpKYQJC1SxDjHXgezsjpf5SEa0RoBdbQA3s5f6ZhQ5iKrYjxaU8M6UUSH0PsIyNPEi2oyZ6exK1MbiUetZgR6yrmZy7wBAcUZXc53LCRemQOAeZMHOXN2mJ7Nzq2zolIzpsF30DEvMQXIez4yEokaNWyBGtOj9uxiVzK00LMgMnSUDcAFoba11Zi6tjCNOa6xku+AGInd9+SJubjrxZhfaY3PEy9bBdYBc6FbRjzaKGx7HnBtFvazOXCD16vHVWp+Ud6HNcfrcsdVzoz9+dCUvFPNGBnp4jCNYB5VZI4npr6MArCwFqHyJvJaF5HTo5/QCH5xWqPE9YXcALENlbG5WgUkzoWEzWjVeRbOXdA3HXTT7iFNGoFiPx8Gs7IhhWrDy5kYsUQSN/7WKOTS5MJjWTJHuLCmQtCjpLdbNZqdBOm0EaAQay2CYWkSSEL4w39rY7IJn9b8nKPKWQEIu/TC5c9vDszWmF9NK8ibUE7Y0SejTcKE9tod9SmnwQG4tinFSfGk7THmJh1X4V10obeCvOrrQGlf99uWi13NUiFCXu673g6Et7ny4l9lc81CbHbwqH1OpXchceIJnrZXpKrxkq/KN3txgthefEkuWE2N/6XvLHoySuPTLP/rIKwUgU6gYBvG+nlEt3oFUJLYYIpmMzeuFNTHN4pfB7Fz0LbeleIckMs6Hfkh7/KWlpcZckilB0AF3orgMvmrxnCP7/voz9dfPZWRupF6uicPIIVLb+KALlu4J8lhknvyLR3BrrwcJK0Hpj7UpOt71ktSJBHkfXeYU8sb1wxNz9tbUV87u97wrPQGlm9htTDr7sOXlOmIvKbnYeky8wt5iVHmvfBmuX1EXK3io+FfxOMwViFpa33TEt7ZoA8b/U2OsjA+VsCO79+pGW9+nZ8LVLVZ6lX8cPKTPRWaYz6kgI0TJ9YW2Qn+wkn91+88grgoy38JqGKZF6K7dqOW+Znm42A+uD5i8TztomXj7LK5iRisyYUn2LNQv9QB6+KyyAE9bS6NWnYDNq6J6lEGd884JRHisaeyFrCV3ubv0MQH2x2hqHnYJXXiY95aG7YSI/X4zfBB6Zt5Zjrde2alb4ezeLETrZxt34qu9o79/lOLSlg1iKZgtP4JQU+mHWE0N3kSxZle6G29tsXgAZsAygPaHmNz7L/DzXTbLdvH5jaw9fZKEJSLt0HTk3UASGpJFbGV+D5/XUrwCnq3qbIk1QH/FEUPt/cJvq6/HLCnuYLvp9hVCT0eGHxzozwroAaL5srPIbFv/witVKhLfReZf1Xpv8ROsNzRanzXr+AD+Kx3SYo9VJv4tviH+X4l8T9f/5Bj/rQ/6GvEP/6r/q7+p/Mb7zTccbecbql1hWv33hbBdCokli2tmb7fVve4dKzbeIph0eP5qIImoJj6PFqIYz/kd4/bkEBtS67FEA2UJDSUWA9xdydg/WUjKT6xP9vZYSjZkyyGXnbDoIraduw8UiAPwSBGFM8fl52Hp9GsPl4NAIBA/SoqA9ExscFhKnfD1eWIhpcj9ydNuxQz2KAVQnY/ZwOxTAktN9e/NYCcxW1PEIDUjcH2GHYcivepdGQpuhV2bhzN34SyJErA5iL0YTvmu3hdaXsQjubSTholz4iOrcBlH0jn1UA8+EM9Cb32vtTS6KRE3DyTenbzDlhcAV7h/NlCLiCx/UYjuVckflOjuYcIoYNNZGkIEwk/V0PZjE9HvnyOJc//fivoFQJtAbiRtGV+rMmig2BcWxXn8byWKZ9Ptqv5Fzrz8Ts+exp33+l2H7lbU+EAOqmbRc4SvTWjqSAvnJCJ0pcpHSe7FrWn7wXPfzxmcP9CUxr7BmvS3BmjadiVN8T/BKvFmo/RlLKVDbV6bP7CONy4bR6nF+sC/rYxmzgV5lBf0hkisTgMAeLKmLfHYuzNXMYX9asugnTJAkeDwG6K6HN/97yJqVmDD0uZjLeOz9FlvkqWiEXP1IBYDDU/Cn2jSQ7pHiShFx90AigGePDzjEYR99Kk5u4GQFExAcYn5+ZVTduVp1j1ylUKwVR3SeCPCgjzaA+MFYEi+9FYJp9VoF/k49nzOkmYWjO6+ukjtBHCUwHQ+z+Q+F07AUfVu79+Pyx77lsUBVeGnOvAMBIW4IWMAinqdzqvIsgih9cTtBv5iqtjeN8Hdl0h3Z8L+hsbX1hvkQ0Oy9XUs30fov1/dkqxkN0edN4qBElMZBMl8hsbKC5tOI9d9hQyKIEIGGaRFvjn0aFYvjakVd8aYwgr2fHEoCZYye6DOrc4dUajUH0jdUZiv+/T/kqA6vqauwh4C3gHSC1wLoVGDkynsT7fabEsUUVdZzx+R+riRQ+bzccVcAlpfmJPoHLo1U/7MsVfCphTuSfY413d++KrWmZaK9SA3LQMk19ozdH/KWOlE0XOIteNINiM/S8YDCvQIjI5ti5P0TQX3OvIN/1pdHDyln5yB88M35iCywZcWAJW7sbJEwOcBpA7Ti0NqkvhfylWG7QN3pcAcBg2qIjLHree33kHULJzNROhjLAzM3qARyi7wT1ILYu5fdmlcQVIrdnxV+iDPQGH6mL8dwyGmJCFa9EyjF7hG3xxAQqPpa294gECJIv2IZmdzxhXLdQ64g7e7vzAzDdSNavk6Dz7gNKtC/WlMipkKn+Ev2X0Dgo17WfRl7jVTtsnXb/syVCCT/J8x91N6l0w6ZhenhNdhYznCrTMhmM3ggBYJDjN7vU0Afkfqwzi5MnxZc8l/32anycVc1wgWeNyqNF5te0LXL26KEkdOfg4FcW97nFf0SjbdC7fomebk6NIm2iwIg/JVKfcwfEiRbvz2Vf13q04FMC7RUl7ECeCErRS6p8LD/L9LOzBEo4uxkrr9ClGfBT2NzF96MxFs4fUoMRhfYlBlE9ygE5WAlOF+zKfeyQpdUIN5iVWwnfIH5ha9Dy34EZMLHRVLXyhf5JmFF4+HJOxVRchFgtm5rIWOYImSlng/L2QvJMAC3RmCQYfDZraMhnXxVt1SDGKg/E/RwNH3G26hrV4F3HP4nJ4Y9E6pA2eW9tIGydSeIdFvPtiviLNoq5xGgIRQ4VFNpWS7YiGO2H/tfuF7PlvkpT215n4L2W5pIEZpaLw/SJw/KH8GHjZ1wFl4ro3BxC8DUZpOQSe9t7o40WQ22RPuCla2cnu+WWXu5PKZpoiK61PnmBrxb+GAaREGBxnjYrwyqXP3zG9+qPILqIpEUXDx0facRDSm9PsIKhBTHd6+oVXPtfzhx5NnrwwINIcsFyrLk5KpdAf44x7TfJcklLwSql8KOwhHXnfawEmOTg0EV6oWSSTgWVyEF7z9wcEwYx3jGfrFRePI0LiLjQjc/4/k8NeR6B0gAqBMzYf1EQ9qZj0PBrLqaccCmlUBykwgdo9e+7ik/HBnBQyVJvHcyz+4DRL9lTOzFaHiVD86t/eJyJYSSFusyiN3VSpOthxQ0iZcxRDnKIKuYivOepJb5QmWvlfTSezlYcHlJ7A8xe7amUxFH+S6TIH2fawqDyeXz05f7/Wit+9ZEiu/TmLd1DzGAtzxED53de9IL/dNoGx0TIVXwzah6zKgLLHbKHkGsKLia+vJ/xEgFx6f/jpy0NQ6G1C/HMm6rpmz9Vjpx7pL6tVWrwfpLOznuqGBcN7DvQnWdo9joUsgSh/w6DJQRoemP1MDHDvkAHspcEa0d0TDdV9XfGui2oAV/jQe6jrbSbliWRgPLp9LudeFjCiUpSYHqsy0dKcSPCw+hKT+7en5xjXMT53uGjlYP22ovpeBD/QJo8TmGeT6XMXQFppIkZ3gqgFA5q78JkE9kwWSo2knYW+chnJIpQBHcE29RoVsOvE1SgAB0maunRHO3f+qkddEyKKcio+c8Ne3K7dMcev93G6MgFWZXdRdqFgcvCBDcfF32bIqIOEdxzI9I1rUxbL/Q21bXg/ZewLkDHuSO4QvQrJ8MschkawoziBDdsQ6x68x/UUqUABqdKI5JFMTiaP7SdEO6H87RhtQsg3jnZkmm9enIKSAUypP3tjbTa4bhiZp19WT5amDYe3Qy4iZSLu4IiCwfzY309E7MDdRn85ZQaVKNHv7xhMM1BENHIZVJGHOA7ROQxMPLL4u5RTS+QKC917PIxnUHAGjjkVyD585j8lYVnRzyx1QvJac2f0An7jvwZKxkoJ73c8ab12o0hzjWX+qqjC2yejWoIkJRryXN7eEYFX1t+yjZvRy+rt4UhB4joG9N+dvAmrb8VUJ6MHGrY2jbVw6JcGbqJPKgBTeatWgunf0K4ZroN5FMyhz4KyqgoyZbB15/u+rma+lEBEkhBqdIjG29rYvAchj9+3QGdO+6WsiqWGk6erny69ge1O9Vrp9EAya69mLmwbhTxSR6mEOo9Vlc5lXE6g/ScGpdScomn7LSkAhAER0HroXJwLyK+JdwHoXHRbd+T+HsX6Bt2mQl0ORoYJ+vct53eacNBMLm0g7L7DOgHXMofQLL3Nf91LWoAzVeODRz4WgddTItcWjcCmDhd5/be3QJENmskdSAO27J0XDSJe4qNJ5eRliS9bC3LpN3R+/f7Y2LbinQgxssC5jtrrUoI4PSdPSla55ERYdpXzEmTkNzY9Tw58MIJhBsUWj0WiUNhyLVYaUIiSix7j+LEbOnP3q7sGmyY44+68JtCtdKDDKbZF7eY/4ia8Hq5AeiorXHvfe/sYM1oMN/gMA+QEpC20vvz4ybc7XEfQrJpJoc2LlWFbTkSfmXSBdp3OVUgwVzsF9Pmg2/t0w0nuRZfZ4zP/6CB+EDiM4OlwSwIe5+Q6IHS+LduHw96anQzAGdTETz0E2puKg8Ps37VF27c2D9t2hyex8VlG1bLBPdOGXvXsJpK3zEumZRQgX2EVFkn0GgMvBcxeNWdXI5vkmhDMaQcpQDjuH5X8Nih4ik9IQvyhjcpFdCoM2zUn5Fs/x3yXux3Uhu1T4ZaoJ3HD5MAl7Z1Bkh1aPtRqWxaH4JUGtPz8fs5MwLP83CqTdSKgrGV7WAHpGm48YUJgxtMbpfBej1/roz9RmUHERFnPgxmXflmT1Cg4zz14///FoWc7mELswlmEuvjjK6p8FovthPoMvE8qKOvjMtkNME4zEdS1ho2evd/PZzAOxudmCJkuvZctcfiEtmBCHcsNWZEGdtmDgsZQUy7k0y7+so63eu4TKAhX9i30WocMZnR0JdH1K54PmtgWrZnd6zu/lWc0IEUTfFQ4dTLlE230wxDkACV6/25iUax9/4dalb195C87uJSHIx0cTf+oQJRkhAEOeyyBjCZP2+bFoYoxt9pAtunLV6AtYx+6k+y3ETRrZatYrQ12Vyk87Scypoon5rYQEC0NsSdA5z57oHqclZM/hi5Xfqx/5+Srs9hpVVymVQ0/w46sI/9QJyBYonbE5LcDAopOKtRmmLsfR3i/op7TXYoiaveaDhqNaDyg8hdw1G7SA4mTO7sHjb+Zuverrts74QnwiOUtwqMXnMtC2frnD5C1pGxu6YRgxtXmgcnGT/i7CD/qKqVXzHWnTxWb1EDer+0hHiqYC/yqjD/Ch48xiEpFx3r/jMBR+5Nohp2I3G1iH6PTrC71MYtJbtrj3fKqEYcqVBSs6pnMb+OYXgypezpGfOnzwg/VPatmEKnPqw+dzi5L/DFpdNmYad1SGGzjL6fdlVcwHlFml3AoiRLslKo6liibXVcHxpcDUi4i/9a3jePzZ6t2vCYwkCmS/SIB2XpNiRRgZ91+O2+d+vbBeSSamJ815LOTQWd6Z8GcA51SyG9Tr20QM4R5U8NyRy/x66E+jbcShM3nlrno3lhvrRIMhqO/Wa9KaU/EfJrBh7yJ0rhtbgK5bEkDkovmHgHgyB8YOiFz+V3pMIUEGQLpD2PUn5ZSv0iJlc2eQT9/BF6jY1h24F8WcKGdXpGeFgVMLxqVf/ZYEH/3lVDH1q7l/nmIw412vzdSWHLQMnQRD845fraHQl7P0SmV8C+CbDV+z/tXPYCl64QnTfuBHFzadQNtPiknkqO/gkPIFJEmc8W2yFLlVhtfVXKkd3/01cx/o0jzeVtxZf7i/mHGee2SJsS9FbrAzqGHdRRwKGVOFW9r5xREPZ1ZrqoA4NEv+e+YUIbBsajuGHBYXPRmNkdWigCDvXJa+gRGHjZ0XV84lDUajvHH+VvRCLW0eDxxqlQLIVFd3YsVAUM7of6saBpAzLE/WhRvdsIMBFaAPapNt4JzRn8J0h0jxu9aKVedzarHNhFOvQGX1LaJe7vXDI0o19OQbkGQt5Yw994JzZq6mEhH1ZfU1S+0sBm+j8N03K0OWiX2oDU9OG85qprJNy/Xm6XX138HDvjgR958Qe1bV2AURs9Zns1WCNXrJ6e1xRqXH3k2Kym6fAo8QO2Z54ZuYH/VGyf/vbxigY6/YQRA/EgjHBKnxYleUBwL+ZJPFACGnfzpvkVNLsesUGhled0YgQoXV/aQRnl93zvnZTeLQVYbJjHFMbMMCqxWvrKYWMFu5rsVpWfS+2wpCksRP2P9ZCINLwwbQb6K/7e/0WeifNzzawbiNPpymUGV795oZbJ8h5gr89OINBK4a99QZ3QFwAM9SKbBTgQ7jlusIsWT4JuQb/ILEpaWKmnMuFTh98EUIjn+pwezOxzWP/KN5tjtjUWkjDV/aQR134qSZz6QFvusrVTmvunYyHgCug82oQRm51Z4zXbxecG5+DDyjyYNpTATYhmo4c0Ab2YxLDGKy8Rsb4LHzD4t15f7htaoGe4r2oQ6nR+M87tjEKyqvaWkBMnVPochxKWTs+Rrc4yjsDrgw6dnMqozWT2gDq+PtITx2F8kn0vsxOLpcKA/4tOLTjcBwdJRejnFVKlbMNmAwAZaicYB0upyRKgonf185KpaUPf0wOn86PowUOGeBCmpn6czft5tye+Th4omHgMyM506WS2wRdXZD8jLuiomE/W+RUOQ9Esn7zgztutBrM7wUD41jjB2DWwt+b/KU/wjp9InDMyprMUyrpFxp/Dhne9eMdER30HO0QR8Zkchm1579Z9RVPOT9ZCH+tDJG2JFrzPE2Y+nQZ+VXcQh9Lzxb8A7IP0hy2iw5c/4ZSa1YxVyMFW4/FRhkD5iidx8YZYMrsFbPTR4KvD/nTcj5e97PcJEY+Cg4kYlCCrBcKSletBOi+vL+KVSwVujigGCJD1m4qHEFgS3GCM4v1uveQdBak99Xk8a3Fv2iPH48OQY17MSJw/YoUVMggo1xjhTB4R6QOACC4+EJv/WUJuhxq6zAolg3YYv7Iy9r+RCQ/E0TFkth3V6hdiL93HrOAgF4ZkdbIry67QSKfsr6AmwqUK29f6hpeAJHphkW9sGq8nxAQwqiFxDVkCnt6+F0o7CLdgEm6P2o+JYzoUR4Rm97IjUi1PCM+GPdsmfSS9zPQb1jpUT7igKIjOQqPEwGJo18qHCwL5j9hCQfvlETToLaL4mI1oTxA6wjOMBoP/58PjEjZ3PDmi3xK6DVe5QlpaxrFzHmQr/fv1SnR+9MqEL01LUy3WKtsQ/bwI/CgBgD1bUGfYYji+jPXwGqH177wdLHw7Aa0SR4C38eONjSGR0jtlJVSp8LBTPoET7wP4OaWdQxNwvqjdC1uLCN5b4wVVnwFocP5QXBcP1GLEI20Fb5gBCYhs40JlZiH3qBRNMkoh883apadkA1jKNzhsUkMJncusMmUNADOMxvgF+o9bUKAalzn7Jv8JAzgu6iTvmKsOxbnjPylxi4d6ulrBHSWRgys7Hv3KSbolQx66Z/aay6bJ2epAAVkOSViJDkEh7Kq094WgeZC0tktqlRwea+sU8D7JURSYmyakWTAjOcbgFtcnuJwhJcyaqqDxCuB3CJgnw1CCcZQKbRigZakS8ScgmbsykH2ikWgXupKUmIBm/wHiFPyEHNHWsYnE56yRijgR6RK16VtkPCyUoYg5fJH93agIgS6h0Q9sUvVQRHdjcEHDdTVEtrlNXjhgeB7AP25uwSYNn05tkyc3lpub2R3KZf0xKm93J4nNt8vTlfMHu4h5/7gLiZcwKTreNkeyXFtgMyCkzoOQKRaHWR1dEeRn221oNiSkzA6PBncJEMw8yiaDHveZvhiEXg8NtFn3s5QgrAPtQEcR0eHvzTNJfJS9Q0H0k9615e2lKREn0G+ONThFcs4USN58+QsxO5Rdmepc+3UGdQDHi4xXs0Pl8rez1V1t+1brVfBHu0HBga3xJgMciC8f/cG42oJBHLH6+1AsUCTlYhVOiB4oO9P6d4XK+X2ng3lWHCjvyixUDw1jzloUCr5ALKTKv3Gbn8s6pTYoy2aqwVLRi0Ki7Fq0O5Oz0NQtegotbqzepvx50e+6OyeJ/gGnf/ZoYJBUw4GU8hSuUhX69/Mma6uNh+Ogb6ZUAgpNT4yG1ZPL9SvNLaKfwZ26b/D49SjEJZcv37iUxB63xqfELg0UI6GDgMdWsfl/84xo9TltMnH6OZ3qhP+JzH/QiwWHjIChHNW0Wpw0MJatzy4gflNwT92yxHeV2jd62QdFU3UQ8ewApfTNgW5/RPaQH7YI6UyBsY2BWyFR3Svzh77ZH6QqgwGVXD5+5LDeKDbRaqRO+hxONqM13jtB0QIyJzLHmut3kIGSgy2diIrUK9CLX7AaJZCntNg4UNIUUx0GfcjwmQp+JZ0zrx6tHqR1TPNsEaU4K2GOi/n3xlBHrKzCJlDVZ/dmuB1sDC4nA8sD+xVIK1Xk4MapXPw1qo0lt1CipDuxyLVTxHLM/wAv9DzE3KES2+zYgdmHIh39Mvc2NRjMyk8J6T0q6g5+ePAwtFBl4dwVna8jdro8LfbWJsvcNS1MWcsvt+booprP3vtJWc/BHvr//ObHcXYns6IJcX+Z2Cm9bFHPCrcJ5rBZeOym8LzQpuMC+GEiEaOeeGouDtI0mPUji2U+8J+iUDAGUXAZEK7jUHBQUQr9vTrMuV/xjBtC4WdW0TQsjcTThuriZOiR2KD4LYBJWj9Nrsz7HwNERJBlTVLFwo+kjnOaeaP97KKZzK3yweLDPx50B7YJnpmffwuTLFEUVc30e23MAcKvnD7JvwIvxr+oOek4Zs9YO0FT91FRA0jIZAtpJX5mCIKjA/NnD3eA/heJFpLM9oNik5BZqzhvcE5dsK/1XIoiaw/nOdR1Rqj6/Y/wGFlmCrT07KmSqB2pvsBw256at0s0jGEkNG2hJZj4+WkuH4PfhxF7UFbHn64Ab7JW8Moz62T9AS/saOlL+JDe8/J3kmybp02wx5d2YTq50Fn5uyQohOb3TS0rfe2W+iFCvJnuD9JUTYIFr4bcTldzzro3WIEYkLOh1Yz5fNLQRp3stkqPnoVO3xpaG/Mlnun+oreBRuv8pZNI1FhhduPV4lqezrKYJGfI+RjFMDlSYEbC6oMJHMAQgg2IkIGomL7TmVfVCyzD9gRPRd+OGyPWrQs+m2RCedvlibO176iDJs1IWCxDydGtCiS/he/uXJUOJiPgbs34rGFHBDPWl9tdsBCRwhl3RsAcFGboV3+DwKQM7UzyVCePDwSgbjzumeTWAqNSCZXLyn6VNe8VaC7J7s5mWrYjXTcWkiCIILaHVO+bWRI+322VJcXeVwHNSEbU32gcm/d+xLMlfIDYKCu4GqVaemEhjNeVIXBof1WpUIrkt+tAv77nlrC7OPMmxrLFB70qLnXR8tJnmG2aLNnWXxc3AcREPA9+lrqOa8uDAbnKye+WhbZGL5PBrOeBpsLWdvcjAIAclxsiOIv1sJEOwiuZ5Hmgk30VULPGoNmntctbQP1QUJXEgggtedEbkRjk0jrXftSYKuF0Sk8d0C4rDLwSPd9dv9vY2J5zUw7T2XhB+M+NIPJfoqgT2U6lOguO6+O6J6JvcFI6cxG93ZCKBxVOGX+7q9BsM6lplRkY/liUfYEH5GzI521rmn+MrR9xdV4mwsETCaVDI8YYQudljXXQtl6qrsEB6Wxj3qfU4/M/mQnfMtFBhRJyQdoV/H3Utwjpvqd8cK+ZAOMWGz9ZPoSTMNcCWnxsImPacWD9PyM7mkdjjPd9feAikPSdK+Gl4txxbPPE0itt0ZhgZtTkt1+8Jp7+PE8lA1Zpt1T0iE3y+ALty8G9OBUSDM4pnj78gJh6SdZNQbC6lmzl9PodwxKtMJyP/xIF+LvYgOFvewn56e4WsQQW7jNuWIlnmQQOw5CTZxSPdvlrgjGueWdTqGNqSsESdvnpOQz1HkAdvmcL3YXv8aRqzotJdGEe8IST5DV2WIOBbCgRVtDodW3itFEjWZnJEiV7Mo1w0tJjrOUYVNKcsHuSrs4ZL0gdd2HyoIVK0vPuZ5hjg72ykcuT2t/s2tDcasvTsjd213KJfrZs72Hehn4Jg3Vh8QgyUQmcL535eeWMOfQe+Li1RNId2MAhoYWJ1crTSUJi3QKL8VDCUQjSRRFqTlXfVjCvI3xXLY+fUYpgtf7t/CS7StYd2U7GENZ/tkhvhwo9RUjH16EMX22odXhgiOQey3n72zJ5yfKlKRmeY0w7cP8IBIY8Rw3FIEMH+xF6jtpYOAa8tQKQaFdnRfYa5vhXE/74DM16vt+2HLw1IAXR3JMfvKvQI+Amk1lurQn9QYnYproDpZ7kXs7ePFEk2CRXoPT3JdowYxaEixNNA6486Yg3M3sy0JxJqCDsEJSPfLm9MxXGZdYcbotyD8VUdjKhHSZR7ewRFRxVEdBwVEccJwLRR7GvPoGNr2pli84xUz3sBQr/e2bHU0ku63yBFy1u7WQE8n1pvCMDRVe8DevOw7Eq6bI+tfrUXnXsTKfdb4F/aL0sbZ6YaVkeFS9VKDV7UWkSjWn+atpr7dRcOrmUJByD6XhU/rdp/QCNh6J/8UsEMEsNKCj06BjRSoFXbMZEHC5dum2xi1Q72vKmXZkHtrqiCFIb4gSyTX4CMCb85L0pq/lxBXRVzc09mVjcMqeoQn2lLSTl/p6X1meOP60iQkM88cifF0uDnttsgHqTth1bNE7ELJbeFbbLBi3wFk5GEGV8N3wTiECiEfWBm0fg7+aniidtcvBoPSIJ4R5AmIHXvqWetT1kY9epJcV/hbheNM6mvCIpEVMXDg3vn6cnxYeNZZHYxLKVMF2M0jmIHKwjIpS92eMC7fE/yqLxZGWdUj7UresowD6FWJMQmdFrkljIUU180Z0Chcx0Q0kzeKno9nA/5NLcDvicMPJMFebsJzglsTRSeoeYQvyldNc8xCUq3UHzXoestvHHFXePLEUnxbptLSDhrwIrfqMy4dy3RzqSiuBekzsfY+EavOqU+qtTxYXvGTD2Y4/oEqvKSWD4Rmo8g8jbjkmif44prGZHLROtuXrmz+7kdw/oYdhv2inhzu58asguqU13bBlTM7gJ6nbpmpAy6sZ84GBT/Unksk65RxVrLHgvnpCY7CJUBurPx3mFq12JV9pRSIPYkyz+ugcq2BwyxSTb1wX4FSau4zUOcwjDI+ey8HgjoMDjDI5qGxYtFaY/0pZLVEXchFu4Zsd2s2MN3480L0raqbHp7d+1fHQAjVluOO7IGHdL0swR5E7e+mxWNXRuU0FMjVL1QoSlW++cSQBioLruSrVnjcVyeJdGxxqO6x7gUuL4ba0jk4kPNA4U+3NSMaEul6dsi19d2sEJKrKzf0B0rbrXJRK4dVeso4F5vOkupUA7TR0kKrMBiRcc3GYhvifkSTMCTcgCkpMUeHo6gRs+KDZrwEzuZnTAn0yKgAAbcU8PoTLJHGCrmk1chxpOF9r5O1GfRGQwB+OrD5k49pvX4UVAY8P0wA0ebRBLOsA0sX4J3ov8jbZ3ZQPXmrqSWfeBZOTxqeFBaehIui0aOYwzhGqCtUgRXdrTJz8VVYjkxb25zZuSDm6zzeDrt6LubCRSVmDKPF1jtgn4QxUWc25RC6rFdT7SMfvYKhAq9QzwzABF2rkY7dZR6FnalPGSONNyed/zV8hZpjqMOon5qlsEo/yVBFQrOq/Qk3YZQBQ57NSIhQCn2wwhSMGqCK7tQiorCES9Fx3UjfF0fqYL3pxPwEsgqA5C3VG4bw11J98B4zzz6JPv8MSaJhSC1IL5jj/pVGEfLZAOU4CD4QLq12DgLR/yU+5PPQLy6xVd30EgRaa5SOzrvFoPNdYiKnfnvo89W9X38g0bJfId7dZV5TqMseKdKw/CCSY9s0zH563izVi6uhHbCidWj6VEVxucp5C9ICDygbvlsZ7GtDLHxcxGo+icsXe+FfbfiS37xBElOqYR3w5d/JLqSM06V5+HyaWJiZ9zCDQSwi2CpnBFEhqXpmhkySSKc+vvmPRX8jE8xc+sSsU1r3n2rZvY67JryZpvMahnEI/mDw70E/RUpV2p2HzDZtIIx6St3FA/LOrDF9+YCWf8Wo6LpaJCf+pPj/Q1wrYqZaoIKnptp07CqZ56DXZC9uu4HRSPWwQmF5337USQRORAoYiZw0DBTJ4VqoKIr3AcoHZg5Tv99sJfuPB9lKFL270v6Vse5s7JFMRyH5tBkJgdlxboUf1bya5RvKhsCV50aJnAFejGTXBwCaqSv955Fj+D2NbH8tGmuYh5rwAfXJ56pymnTCOQLoxGyXcHBLemzHuj7+kubTVfIFPvkLc3jXa4nNhg44Z1IqPVBOFFKH+63/MSywJgSfeNxrAfkCkSVHm6o18ycOPptMqR/z4ibE9KP4ptAM7VKv15f/HYD60ufVodMpmz8JUB+S8/4U6I+5iUsrCPrP71gWOT6Xmu8yh83Ovk+0y+GhMDsrLC52p1HNB/MVIj/idtqEaTVHAurHb0ceweEB3uDP0UjnJ1cjzzvi2d1zA+I2Mc168rhqFTyopcPOHzQUzk0iMsq7lmCna6Cg3eTToLJkMrP8rqqW1iU3ZAa+G8Q7e7mqTHjovWjK/8VBKqjTaPWo/biQsfpMWJ9sAPNxfjIAkKGc0c+6fUi1ay4cN2L8ECUaZSesER7CQTuAFw6OANQbcH1iE9QjrD4fv8iiuHIrpasomQ32ioZ/Pb7jwE/bfmMkfcqsXWzJRjto6PygAW2qYqr7cMh6+eC2PjVOEaAUWLJi2aEKPaBxjUcOQEcdFj1Za7Bxaln435FzgHyuPlC8iy5rJdsQ3n+gxQgZ9ZZ48AuGbu4B7n96s9bXSfsnUgEmSCYn0sphMKZSiAkeo1oAoFUKaAtw+PKpEVaV2ccD1UTFLzroSHKP/Rq8Tn4lyKRCFp0vSxMBU1W3sQWbPUaHh1zPqBS7FcXsLcx33E2ZF9pDWNewtTIKuwGJNkgbQlDB72kcbgJhw3xkkE0LbQ0/HYbxiGZsDaJ1YVikJn/vUELyIqAVIgruIxa7efpAqJ9aB8YgKTdOq+soYsh9BgaiJHaKtTtL6A4xQOyeqSSc8nxcHUROOaFN7myQIoCjGUrltJAMEOSejXn8zkSXV+XDRtVnizTQ+X/Zc4c0Z/Vdi7Ep9LrHmRB5rdOA3JcE5nKAX830vcG3Ljd7p44/8FpT+7a6F0+fSFuFg9Ey0ulsSF6cq+8E3J92bhuIhkR7etHAaxJHXQxXmPrXxWnvZ95KjWg/eUsiVHVS4rFEn8gMVtrtgxtjw5zM4vJmymiVyT0hmW6EEGkYHJ3ry5ztpbYYsz0xp9AMAxuwzE6Vdpq4Px2uFWIYYtnjsbGIiOMwRHhOsxRndkFolpc9Y7ASE0vKOi0uIFJjtTLIL88a/bcwxQrJvOzQfUcOT5sMjdV61TH+Ln/ULv0GImAotvcfd8SQanF5IaSoL9FqON+VZkTA+N7YNFmC5ee1Z4QfBOo9ywpW+sqCCQ4w6VoWcidaE89ipFo+jibO2amH66M3KjJYVuLDN+iRKsVidgAKZlBfbC4w6rNWj1FD4TSwY3ENZhRU08/JKirPB9vD820HoBmDN+kDs4MfSUuRec1N2rz8w0aseQmuv3UmC9HkN255rOys2ZEnQLFcEDgbDDFLGcmoeyDUJjZ2nhDLcKFj5QQjeTA83TFV6LmKQAdk9X8BOWdeIdDZ6S/TRJNkn60oHsOCozDIDEOoYRzTUmSJn2/EGmVpmfh7jtNODEzkeiw1jWBye1WBVpnDQIkhkWhkllTdIGHen2wAdU6bUGtJid4z7b4FfvwFlby925JNLYt0YnAGgT8B9J3t6Fptyc7XiemIjmNLZ6ZZXAxO2uZuI9k3A7gmRjvUIxE57Aq0td7IK8DVVKQ7HoDvWWitQRWVjiDHqAxAKCiLW0Gbuls0TdL+boG7GhRVInSdqoJkU8DKjlAiWuCco+vA/+QXkNFo6ouv34OyRMsKH+h8yMoMhOeA+WWZcWesw4txk4olU0sBmYFKXvbcIsKY/3MLY/j9H4j9PGyukPxRro+hU3zBybOrZv/84MzOTJ7HrmP/o3DO/02/mnOpJpZOJj4hIXpkFClzVK1jAsOngascnqtJHuw49JmNPiG8KNzRIAOJJRpzkp42czvxcnxj+WW/3nXVD162Qp2qJgRSZoGDW+V2xHti9e5oaaJbxJfm1VAZ4Ratf4z+v16M12vQ6kOGtIlXS5RYXexe7oh6EJbdvNRlXgh4yfmot/3+Ip3BwSABv0M+efqS6vaYuOwWpWlfscXklP/sdZoHNeszesLGKmJOWMlpRF9fK6c9xNHrJDxtyxIJFpdPnl97xA6kVnEzyRkH4NF8ECuXvEv5c/RsI6ueklZNOXO2ql+GdhNc7YiTeXvBDOw58itB6Dc+fnO4vTueGfMFhibMBVJXVq0lYTOf6YVeMVgH4NlzwbU7rEQ6fw9An8T0GL93C1mZdjmYXZlk2fGLETIVp6hMwSltCcx6GXy/8SLWgcRGzi+fUBp83f/B82ngg5DtuizV3cqTDh8desldJTDHSq4NoETSfsDSZQdOKYfC5WjU70YUBwTFOahzFKga5g2mfJZzb2a5ESU5hXuBRjwvnx6uc4Ex08Vw9pN97xllUW0K/ocJJzKJBHYnnjIpHTrvleZB5HvFtX3BRvxrMVcfF87qrdT5GsvHQWvhR4I+zjRduzf90x7q8nZZO7CqavX+oYkI4x0FydGhgQj4A8uApGe9FA9Luu0oHU2OK3QADggYOQxdY+idP27s8f8DJO/8TgRw5ROqoffWcE7KwLRjcVd6zbOmb/PfsK6VH67MKUfi7Zgcrrd6GTaERqViZx8iYJAkok7Qv9QIxDaKe4zkebGowRDH5TYzAYgflQtCy09hiws2Y3G5p2AJGNbS6ml7oS+SLqWt197wmkThx2RnNE9z2K/lSUF9x9E8RzpCQfo1VxcDpM/m9kuIadGoNSMXdE8xdfITffsubynssyAhwiq+/GkxfluH+onAN943pcV6jxG0mo5DO1O+mPx8Kkshuqrdoc3HuYSvdRQykYk4kzzQYCQeTPLxFg91zgVdAtkLOaojyedVpZrtxL6GuY4ewL5Jd1OH+BA0EYS+h9WWWmLow5Cb1ifXPxrmjaLztxln7wBvLObbWFgebhhxkqXGR/BnvLVkcefzfp+R0yOtzdq2c3tGlVJpuSs0I3Y2QUOR25cvLSN2lETbPD1DLeYBdCqxooVJ2hfYbW7IKDfxQTtsIexAgBHw9cYBmdRMzbDWFtw4M78+TBRz5TY5iN2XGwvoqpOzQBFmxMPC/uftr3fekXhQkJIZGB7psbYgXs1Zm/LHgwUbO84BgU6z4xO9xjwzjqkSUdKpmH61Yh6FDk+yGEUx3KuA+DmhG4C6e6PWMws389yWQMAst1jVI0+qe8vQe35tSlyXkzUGC442Y0KfCKDWUxkeayvIxm3EDHF9l1pP+nZNkrWMyKYsKdH4B0C+X2vAq69SUpAbxMxHgGqnKPuqEPSqN4erOYf/1HQgZzJh8ovV5ruXZLnpnyLyzBRp1rpiSaJ1PT2RJkZnlmtCuqhlRBxVRQPRMMQS8SBd/TmMLLNZiHaHqbO35/LtxNd4YtxZSIt5o8j1RHbTHOqUlLbcMYv0Csw6rdLfEYZzoh6Mr60gi6AdepUC+Pg+sJUhTsC5P1RTADy32tBTeYRs1Ie2gTN5jitGLXRluj+sYEvdpIpOLvlw7u5lNraA2iGHKDBz6IOd7UIURSvYVkdToAnZ8D315kS8pVNRZE5uLn+8V5t93sFWzftfz3zNHv6iPR8YvGCNuF89AccBIFovx6OoDWbRFkKgqJ8lcwLSx9rDWnus/rQaI6A9/hGieudk+Q1Ibt/pFIV9fLoT+LeGJwLEaC99A6vgQruBBBRrgZreoEZejmAX0Rg73+DLlu5AJ82vxL7wNdWZGL8wICYDx3gDrxCwggZFhCagYbrNa4TMOkjlZ7pFZGTgK1cMuyVUz9ieS9VdAGRvrkF6Lp9kmVitpTLUAnGtrXdVuCm2m6+Q9iB/8HbYm8fFxCCjx0OABDFSGVrlizjalMTEIjkxLkysFVjNJrj1XogXNpzOA6pnSCROH9J5LSIAMtYKMdP/lGPPqJV31BnTN3wztz81Y/EzSBr4/oHTSIL9DgW1a2/Xx07KGzOW7nQ8OXyIcoK06I8OY27HX2eJ74j8mdEYWsxgas7wlv2z5ULAmMnoyP42C0t5ObE7eRsIqBMQoGvbcPf6at/6iEx9DXH0K/MCOtX15X4kZIbm7EMjQ0ln0jSxXegBmPZ1YRS368fzyL8PZqyO2u3JYqHFCzZv6lCsRFF6R3JaTUHudgzzok3ge+zF1qexHE4acphhqoS0L0OPpzIkxJjEnqe0rkO3YPEDbam8ULks28wXnXaVDpiPwNCFjhnMVHt73k84ZHllg5LGcxmPMNskLieDfSLHmbht8c1Rq2eqzEGViYkq6r4UnO8NWcJzhdKd7tjaMhe8jgfrIX+Q/x1nbwIoN09gu+IAUg/jAHiaBvl2IFxgZSms7Vvs5kVHYyqmP9AKnouUfIbEWLk7ijTMSwCRhEFFDEZYkXmyEnKEvqAEMYWhpi4IM3MU7Dn4MkkWsetqd1oU1L0xdz9KD5YJoHDmkbt1wksqsXc7Q4yNfmFTF8ioourRzaghECRyxDhX0xbm348A4+st6/Z6eJmSa2XjMDUp6D3PyhKnAsrY6bNsrYlqeLTC09xcsd73ffIZXxiUxL/pdyXdj6IguHsGWKHhupT8qSpzKkTUEydnE6YWaZvdUMJVsB1mg0RywC4MR047tEqQZEHOLw3BUVyU4Gqgh40sx9uxs6PO052JWP3YQfMSL2qe3hsACW5Ex/DTYbvBoM5bYC9ekmDfO6dcEFhF85HjffQkG18gZvruyh5pisFJDe0nSw5hmmXsXE0vB9Lv1dHQ7Jspez2oIfnYpYkPXwh7eJ6zthmgT4cVzHPlq3ymDn4Vw5Izq5Pugfg9dovE/suvUdIEHdZmPQtTlhmqr2qaHk902L5zV9aHQ2Z4J6WEevj5eUpef/SJhVRiSFG1VVpG9hVNZwyQmJfup+yCP3acI/GBF6Yql5n+RApyY0f5RW94BO9yJuBhVZ8mSSZLYSf6OFn6UAbxu3KJ8lmbIjAr2Iq/JlPp5isS0a/49VO4YWA+lY1i77tTs50v5V9G5WsvJliCYettlxl6IBeeoqM1ejdu9tuQCpK+kyBiZgyNcc0TxLavVeLz5iUPVv0+6JnYk0LEoqPkZLNd0K/3bl43PiSbgPMg1m5fapwfAsQiax9fnYX/ZmZkZF2BBQKVOiH5WCrpIa0SuFyHR09SL6lDrAIz1IwY06g+2L5CzOduke0CwsoWm4FGs9eTs8KLjXx8/Q0BjmpoXqhVZ3g9YiOv5bsstlU4CYPmWCMPiJ6PYjaMVR/qwli8WGk7pEZqVlhGU6C2FW57arDO3T4G7W893UBuj2VRST++Ms0Ch1d06TjVdArGWFIvSWoPafY2Lx3n/d0/LHf+yHKDHcUk5bJs5vdZ1O4e7afSjgTl8VcFa6TI0yeTQ9pYj1kTtv5t6knh3/6wnrOoa+dRUXHpGXsD92S8mLwac6fZ1vxGcg6g7T6n5qZvAvRhKKH+ekCTes7ulFRByW0tXNvOFhnSSqt3AYmNRiY0J989IoduGzZa9o/fW/AIugPGPAwaZHUaaAJhayCrShOV7yLQvVQVeJbLemGEkwtipPCAKP3t8PIOwmLSfHErsP/XmMyeMWKekIB1pFEONLvUO/fhCdEmd7h+jiNlw2wvlGG86i5n84n6sajMo58m1LiGhVHZ3olTrZJuID7TPC/LrbGbzKhCpJgMTmZEZSldSQjEoX+EfTm9nefI4qjPERChpyy6931kDHASzLwoqGBleK6Dpvni4mEsGnaxwiTRXEm8TQCqPsqIdP9xm9sq/r6sqAH2wz0kqhmQcqAZhE5oKf8HOI+hJGgI2mFP6VYHmmjFMoMLyMCzlmUHNh+4zaBOFHU8XxH2XQvClvA8tKzD7qQD2PHukOZZBjS4nHfiVDI+RvehPfDpsC+Nd1oNyOPzSVev9P8z4DkYyAyiT3LCLEUlbKQxbSIaratiVqVT47sRxVIHazs/LGgwcrbR5aRegM0qeW8rxsdw+MPLke8DSlYnIPZBRzSVmao20LXiUp5lY5xfU2waX4UMSRCP5S0/8AH8ERlkGlxxq1f+/XUnBiMoQtZVkqEoChjayU4Tgfax5z2u8y8j0yrASyhC1MlqKVuQ1hi9AvnwpdMi+lGnFshFywAtnId1P0nJahoP/K1lBHCwQfEGogItp0j9fl/iJ0XJ0QaVRPKunQSkobiXD2XAClRgV7BFS+0ef9g6vwe9iwsA4gHcocoyhDcZOMmhB6Zss79XHZ28J3Ygtkgbb2iChv+WiC4pfLjNOCpRL6wjebx95kLtQU53OAiMtxTvqKR5NPLdV4xm9CE2KrdRoiIFPhKg6och4vZ22/IT2Dm9js/lk9rzTXUeYI/5Yy01jpwAhVmDXwXVzEzy1nQW7rWQ5AvIrviLdxnBRERhppGl3Wi7WhuvarIMUc5BLKTWkaspSAriNWKyxhfOF9ktrR0tB7FOyGvey+ol/RBnk3tb1fhUypvTgntdR36glg8RwUU35g46LFS3Bkk5DLQndxLJsxdyGy4mE3CrP4jRifX5ZZAp3N3mxWwU1v6ZqSbcDGZIceBz4A4rBeLSe+uZAr5kZqOBs5ai3HzdmTNANxzDm0rnUryQ6/egqtt04VoLE9xKFnGQkYLgYCENakHC+8/2esEejvrOdbWRhKcp4v0Hkbxj3qu0U7XtvIpAYwTQYsRTfTjfFDS11fvoJe2R2bZP+7CMc5/GIAg44QPCiVb6LfNil6B0d3ONOL30jx8v4B5l7oG4W4YEjqjaUDm4jfUo6/2xqSfldwkfz8KQBleqwhKySNDsINtT5tJgn4a3jpa8povaQpeBFDE2g6RNfhFId4ZKEnrVZ4doYPM7C1//njxo4jj8dp0C8nCB0SpBzPFYk1jFZaGHIQULY5O5IFaM6d7Ig0Sf1aWR/vu3FeYX/6m/xwwVX/E26lEo01VqfsqtBBcLGVzwNVCUA+w/ZJO8rh9G2Vhtd+3cnJ8u+W+V5n/PAokMgNG/TymqSDoI31uxo7WJk78YC/wq1ngDHQnqjvqKrpIkM0D9nnXwDqHr/7yAGrhRq0DJoob8Nha3XVIXYGEV6LGrh1fTRxNb/mILwYDK4jDPalDdEk457CemJegN1WJHO6+z3VuvCESjPgIC2riukJZRm3Zaxzr39mPugy2H8uqRpGwwSB3qPM06tBaJ3mTlV9zyG8Pr9x4+ocbEpY+Eq5AiSSD3hTrBozWmyEibo1gpM929NJIr0o3tBt3Ad/hYiIij45DvN9uoip0/sU6v48cHWlilTyvv8nD56N4gD856+4bNkphQLrqhQnJm2F9z9B4Gr4U5gnq17s2jcmoBE8MMc0Bjg+0oDwc4KefkIaNqkwmLBS3CFTaJ9WVgVRkoJhDkT61osw5Ynu1ODRVgmZOiJ8N+kVTuPzC+ktaAXjrLTVEJxoP/PbzY/iefVHxbhNfv+4P1TZJahztfAEt9rlZ5BMASNXJyFdObTolXeD/Azb3kb6c9jGzGdQDP4GDYt52y26DGFOqBMDim2x5G8euV1Exl3nFzCZmxNy3dMHCKd3UAOAm8XpmKR7wduyq67Hrh0xONdrVVmIXKpAQgdwYiALft7MAZRIvGhlp0npKJv8aapzZaKDINLRlRfqcNEgLafgFxLdSbHZidoImam4f5Tnp3l4wpaeHkmqldAkBH+7pmxdt12JqqcROEYWNIExY5C6kxG80hO+5R1HLtD4NDhQ+vILh6f9TP0eKXSNoSf9DZkTWHqI53Aqsk84kRDHNEmOKBSxBpp+TqmLFocTGRGHN1jUe6OjgG4f4igVsLs96JPE6hwppKjjotztfBvKqh0MwtIFe7HPFfNcbQQMGQ0ZWrCRsZ7muxS2sjrUDgXTdBPB2NP0xZlgbe/0rYq/P3QienpzybdcFhzuDi7pJmSSv0hTQ1611uJFmhmMQdO+j6XehsxcuUMgeEyWLwOX8YDbxqR5bMg1vzfFr3AfrDvVzN8yCwSojRQo1N7AK1HZwaAQxsJ/KlOLCLHvNanck0Rxf82h31S5KjsMIFg8CA1ZE1LksWerZQpJZRhH/1jO7OBKgT4cCmrdBzyUP/l4J4AGXW+IWHxyrLQ4omDMDj6OEr2C05E90OKTu5zhss2IF9GrmkSAZxrAZLGOlCInJcFMh15yUttwh2TjOJ2HD7ahNb5fRJT8iZ2o7GVu4NFbrOIR5NNh41aLAFl6gZLXjYGntuF+pc+uprFgHDKpV3tgx44FER9uXDZvfpuJi3BdSGV9l7O3DLGRnAU8OvtXZ+uEcVROJIjZxg2tniQPQD2NZth4/W9LhCsIOn8tU81muhgXaPHiTllC/S64lHTLg6exczdaQM0xWIK4Lhq2f2Vytp6rDsUTlJokBhXzR9OMiCH7QSvSzzZoUBxhqalVi4w81DqUTtXJU1sqXsGhn2Qymao1SyPA1c8GJY91eR1AQh92Dp9/9MPH1fC40hGxs5rrAzr+qWlZdYj0EoGsxAytqOXaRhDf3GmiYlC+BBQz2Bccwr6okCw43igO3VPmrYczasdQN8AnNM8ZNex9k73GOJxN2wwx9G6lse2i+/GJnRxSWgK8mojZBqhIg9qsgESng6SfbXtdF42OjxyddpetJZLLLiod99TJoAn0b/KDWclGuaps9QzffcsxYn16W0OPSk2cQZJp3L1cSyfh2FTtNaH5Tnu/G4pBmccLloeCChW/sinHlRRE4aBDdOw+FkP0+kOlfy8k9uV1HYLVyl8VvEyD66gRP/ZYXdO3hPH0KGrzQgba9yguN0uuzZXVCiWOqIYzHBzcBfWDYjG2PGDFhPHCQikfXOLL7QQ7b3q8WqWz5TiMMT5100hdZ1nbG31IuMKKAXHiIjp+5D0HOfNO/C0SqoX9IYtMqnhU0ihOSH9kio1uSya16ExheacRK44XinU9pWf2tfJuLSDGRNjIm7UugoWVcI5euPiZ/lBgQ3UVrVtpl030Y1kXmtjpRVM651MCPFKSItl4T/bKIrjun0UbWXB6J+MdecZrONKuCpGBLC7H0aYnBMLZrDpYfcQPV2+bbKciG+LZLGYACs9jqMh0lymcbIp1fvk5lKVLlcjVbeLCm+Ql8l4aYyHfsYgZUfiiKUmeIetZZ/FDJZa/KS/XbWLJNZld0qYvT128xHgg5EE6PaHFT/7ObDSkpDfTCRQhmIzmLpFMBjaqjKAAAA",
  "openpurse": "data:image/webp;base64,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",
  "coin1": "data:image/webp;base64,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",
  "coin2": "data:image/webp;base64,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",
  "coin5": "data:image/webp;base64,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",
  "coin10": "data:image/webp;base64,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",
  "coin20": "data:image/webp;base64,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",
  "pricetag": "data:image/webp;base64,UklGRjYKAABXRUJQVlA4WAoAAAAQAAAAVgAAlQAAQUxQSN0FAAABoIZt29lIa2pOO7Zt72fbtm3btm3bNtfesdWMbRRJ3iOTdPbJ+7z7PyIcOJIUN72ci8Ebh51H6FDNqOc4HXumdxy/V3xRFHMDznnrxGTjxMdRJo4lj8FoP2hWIkRafKjYzjGypjeYbGGRRzdKRDGp/yBGhuaE0lNfb+zzE9nUZfXuZgbuhzX95n5fQJAkMeALqofC6G1ZVj3uyFn2cENAUn7CfM/zt305shCUhKAoBVoerIqwcWgvsSTcMyUoI3Gp+9FMo8Gyx7ObR7f/wC+KRFjccGGCzWzgMC6da/ctQaKM/NN/pRrUn82SbTNlfDErEEKCOy7O8FjoF0P8p4vqq7Hw+wH2nYTkOL1XUIW0UHuelXZxHvCPvEsZ+dvvDdPv9AMaT2j1S6oPOHZWhJnqrbFcOSEoI9/QS2lmDqJKGd/OCKoy3/VCul1PbYepskF1RWZ/rJRzDhiZ4/IhcTl/lNd13B9ObUdFr6iqrzq1fMfLB/wiIVIgKIwerh31PYv8WVDq9L3afr5p97+UG/7r6tnXLJR87lcUhRDqT5MzTWN8YVcPSMHn4q4roHXCGQsSIYGevYyqS6vNedmoMH8stY0x6yRCgg37GGiEaDu1te2okPi0//QjJgkRRy4z0JLASAOtUxLWS4QsXKpBdNGE7fgpQqR/4nXIQBL3IR+RBvY0MEfUP6Lke8iqY25+7DgR2xI59uYv+ElwtawVlKGSAd8FyeLNRqpQuv95g5I0VE1zTk0zT10g4ha3jr2VG31E+NZCFVqKcbOPCD+7OeZOtd7hJ2TmdOaS0HVDh6LFr1PMQloKf/KkRAiR+ksZ60pb5apY8D0Xh/4vhppOxxnOmCUySjdzilUpSjhKTPQ9RkuYx+NxedxhLqvDE/1OkIRYS77TarO7PW6b0+1xUU926+Hfbqmp2bFpx/Ytm//6c0fDAglF7Nrw/+p122q2rd20veb/o/R0iXh8XhBDTRBESbUesiiuZMHug0w0Vx0PLcjxa7OVvllnsZmemDmumVmu1Er9oRZa1Xn/IoW64n/ReqCZzqr99iUiG9XSub+Bo6EOd88TtVFc7DvKxGmvV8zKq/TL0BV2TuuLHpsQiWK0F4dPtXGaTrNer5yGUkbOtGgaH6PoI1LxHqEhH+03K6ehlb4jwC7TzcurOKaW6n9cUNzbV64Ih/fEQLvIWiKDOR1IhlLQj8xkMVSc75DFAtemSqFcvITdlEA5H7uZrmaUxdPNwAcvUUBNmG8OscDdyMvbooENPluBnLeIzupwGFVjBDthDgSK516T2P1oBnBb9RTBzsNsONgalwKkEn3SmwgkvY/RSc4gNlNQikcZJYVHn2QByUB3d8cBKRphlDTsidgeq4NRgv2I8LUdSLIXm89l2NzWHgN0Z/bjw+hBw2lAUnlGlTN7AJsJaHZXTaFrUR6zygnWeWZBV85sRvNlKJUDikYPAw1QNLz4bkab8UyOTYnjE6CNl1F3Ug++aIDBlzhGGcsCu5lNQ1YfYSBfGKUrnlHR6E+BuhnIF7BooEsc+JFORknowIfVCav5MsiqFvUlAYltYlQ0ErvR3bsYUQ3ogpwGJKYZm8ZosMShC3IWVOK86NtYTcMBVtNwNAPqZnWSN8RovpRPMErxKDq50DRsZLRJ5Rkla4BRKibR2cUOKhxhlPxBRklowQeqRTyz2c0oJWOMUjWFzXgWo4ykA6lGpz+ZUSZy4CDbdJGeTXwHMosBuA0d/6FACkawCZxthJEziM3iQUCyBrARX7TBqJzEJniTBdj0Y6eh7wjgJK4N2dfzfhYwX+x/SLi7X/XIPQzjEyIqS9fLYyDcwbgPzpwiCxzUHJfOYp6yKQ2O3nXiDyM+v29mhOdbvb282rwtnTzPd7d61UF0q4LpaPHyfE9NzWggEJhoqNvy692pyjrYZXLHJe2xT1J8XGxsbFyIxcbGLO+Tn1NHEROrPkkVS3R0xkUnHp8bExXptoasa3l0J4FpD9JoNHDaItMBAFZQOCAyBAAA8BYAnQEqVwCWAD55NphJJKKiIiX0apiQDwllANF0hU+5BL0R7a7np/SR/x99V9ADpUvuA9ojMXforgkSzZM4VbNvuoL0mfQA/U0sGOwDKvfpUqdIRxX84UYIF+60ahl6v8Gv516TiiKZ2Sptm9/Cx3KQm6oRULOyMuJW4dWeyaIo7/a+gRA1FQ/3hCGy9bkG9wSw6/36fHSF9iBZRFz7c6eLo0UR+WoWs7MqTIIfjG3c0qrrn9ZKPffVzTuRvY8AAP78XNr5KXgq8IJIPQZRA4nVBcHac2OKB3ZlxYzZQshKc/dxp80UQOdr3kNud6YgAHR946Gutve3PJn+b29i+RUayabkUdbhUgt22Tig/xwENawZ/6EHdCU+uuYDc58UEIY/l0Ng5kb6Aat17hhzqudbOc/bOYeiYeQJpecBUS/4ArvYiTXCCdVIjUYYHpv73+4kZiJ+lRuyZWT/1Ttw/LEjefwNyYOuPwKh95kW2SniCCQP2CB0YVZ/8FqDv3pIS6Au0PM/nYy/JO/DP74J8NFCwLzyb9HnQCpeb8LiaVZdpUbSTZ255L0CM+SpCq7d36+HS7plFYyJTfw/Q7l4iXl5rANy5EN+HRxCwXfyw2VXEkoena1S55482c1oZLK4VYLplW14G0IIvtyTlMiNWA8y+HH264238nUZdj56vsYV59443nGd7y9lgieRAAkW6QGDc4v+h1qNto15gs6RTtj6qpkrfqAUrJa2p8UXoO8CuEMq/g2AkzfQ9yeyufa54LRVYeFDItf0rz//9px1M/JCIi/+cwdVMqANe1yVVvR9dK1glfIhltTo6j4SXCIcmUSKsbf1+7rXRGwJN6Wbonn4Y60RxZrkrMArBQfy2JaZJzJmBCuDKa55Db1BbF39gs0O4advfucQbfWCZabUZVZlYibJHLFiyhDOr03FrR2AOOhoJEMbNbem+997sTVgTAZiY8G/J3wLBxB6E5X2YxEwJEzq9wXKKTWJdBIuMEo2Yt+Cn8AJbIF/eI8XsNvx5OVPCbM0w1crNdQ74dkWc7Wfzed5MTmCn1GVF0UTZRpUhH9Ku/2p8XSYtwTOU+O+e6g9GURjfH40Y9th5frwRIdliShLkiKitJpFB8saQ0BopXH+rkByAxOLdsmkENQrNNz6Zyc4yNNBdCi+D6XTUMvJ2wyjLlk5a4gpQA84uZq44slBrxF28yIWriRAvKK++5fAQ/9uw3pyD8fX/rwhrIpk9ZU5CcXYZo3qLlP3evdF69JgaUexIUE7HH0EAY9vDsgEBXrEjw/QE8gZOZhdD7mCr3MiC2skfiUEeqCSZlVDFDbd/sEvOXpiZ0nlTXsF2R7uxqk0hxX/93kvv6Iyzgfb52C5yV13099Jdvwz+zfxYR9eYYm2dfLvjYhoOvBQWthXYU45z7Vlca2X5r14AAAA"
};
const TOOL_THEME = { "key": ["#A15F36", "#7E4A2A", "#4D2D1A", "#FFF6E6"], "enter": ["#D93A8F", "#B82373", "#811850", "#FFFFFF"], "soft": ["#FBD5A7", "#F6B96F", "#B87A2E", "#492812"], "panel": ["#F7EEE8", "#EDD7C9"], "slot": "#7E4A2A" };
const TOOL_ID = "count_the_money";
const MEDIA_ID = "M1.S1.T2.C8.2D1";
const TOOL_NAME = "Count the Money";
const CHROME = { "dim": "#9AA4AC", "ink": "#2B2B2B", "rule": "#C9BCA6", "panel": "#F2E4CE", "paper": "#FFFDF7", "accent": "#5B6770" };
const VOICE = { "rate": 0.92, "pitch": 1.06 };
const OPENING = ["A shop counter, an open purse and a tray for the money."];
const FINISH_LINE = "You counted every group by its values.";
const FREE_LINE = "Free play. Tap the price tag to change the amount, then pay it.";
const START_HOOK = "You run the shop. Can you count the money?";
const ML_KINDS = ["n500", "n200", "n100", "n50", "n20", "n10", "c20", "c10", "c5", "c2", "c1"];
const ML_V = { n500: 500, n200: 200, n100: 100, n50: 50, n20: 20, n10: 10, c20: 20, c10: 10, c5: 5, c2: 2, c1: 1 };
const NOTE_A = { 10: 105 / 220, 20: 98 / 220, 50: 104 / 220, 100: 94 / 220, 200: 97 / 220, 500: 101 / 220 };
const ML_NW = 136, ML_NH = 72, ML_CD = 88;
const COIN_R = { c1: 0.73, c2: 0.86, c5: 0.93, c10: 1, c20: 1.03 };
const ML_AMB = "#E69F00", ML_SKY = "#56B4E9", ML_GRN = "#009E73";
const mlNote = (id) => id.charAt(0) === "n";
const KS = [...ML_KINDS].sort((a, b) => ML_V[b] - ML_V[a] || (mlNote(a) ? -1 : mlNote(b) ? 1 : 0));
const mlSum = (m) => Object.keys(m).reduce((s, k) => s + (ML_V[k] || 0) * (m[k] || 0), 0);
const mlCnt = (m, pre) => Object.keys(m).reduce((s, k) => k.charAt(0) === pre ? s + (m[k] || 0) : s, 0);
const mlSig = (m) => ML_KINDS.filter((k) => (m[k] || 0) > 0).map((k) => k + (m[k] > 1 ? "x" + m[k] : "")).join(",");
const mlParse = (s) => {
  const m = {};
  String(s).split(",").forEach((t) => {
    const p = t.split("x");
    if (ML_V[p[0]]) m[p[0]] = (m[p[0]] || 0) + (p[1] ? +p[1] : 1);
  });
  return m;
};
const mlFresh = (qk) => ({ qk, carry: "", read: {}, hit: [], placed: [], tray: qk === "w4" ? { n20: 1, c10: 1 } : {}, counted: 0, ways: [], touched: false, done: false, note: "", lastSent: "", cand: "", slotN: "", slotC: "", ring: false, fly: null, fp: 0, freeMsg: false, keptHint: false });
let ML_SK = 0;
const FREE_PRICES = [30, 85, 130, 175];
function RenderDefs() {
  return <defs>
      <filter id="udgam-shadow-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1F150A" floodOpacity="0.25" />
      </filter>
      <filter id="udgam-shadow-piece" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.32" />
      </filter>
      <filter id="udgam-shadow-deep" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0A0502" floodOpacity="0.38" />
      </filter>

      {
    /* Rich metallic coin gradients */
  }
      <linearGradient id="udgam-grad-coin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B8" />
        <stop offset="40%" stopColor="#E6BA39" />
        <stop offset="85%" stopColor="#B88A1D" />
        <stop offset="100%" stopColor="#87600E" />
      </linearGradient>
      <linearGradient id="udgam-grad-coin-inner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF2" />
        <stop offset="100%" stopColor="#FCE496" />
      </linearGradient>
      <radialGradient id="udgam-coin-shine" cx="30%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>

      {
    /* Note texture fallback gradient */
  }
      <linearGradient id="udgam-grad-note" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF7" />
        <stop offset="50%" stopColor="#F7EEDC" />
        <stop offset="100%" stopColor="#E6D7BD" />
      </linearGradient>

      {
    /* Wood & Counter Gradients */
  }
      <linearGradient id="udgam-grad-wood" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E2A669" />
        <stop offset="40%" stopColor="#C9884B" />
        <stop offset="100%" stopColor="#A4652E" />
      </linearGradient>

      {
    /* Ambient Lighting Vignette */
  }
      <radialGradient id="udgam-light" cx="30%" cy="10%" r="80%">
        <stop offset="0%" stopColor="#FFF8ED" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#FFF8ED" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="udgam-edge" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#241304" stopOpacity="0" />
        <stop offset="100%" stopColor="#241304" stopOpacity="0.45" />
      </linearGradient>
    </defs>;
}
function mlPiece(id, x, y, s, o = {}) {
  const note = mlNote(id), cf = o.uni ? 1 : COIN_R[id] || 1, w = (note ? ML_NW : ML_CD) * s * (note ? 1 : cf), h = (note ? ML_NH : ML_CD) * s * (note ? 1 : cf);
  if (!note) {
    x += (ML_CD * s - w) / 2;
    y += (ML_CD * s - h) / 2;
  }
  const fs = Math.max(28, Math.round(34 * s));
  const sk = o.skin !== false && ML_SK < 30;
  if (sk) ML_SK += 1;
  const ink = o.lit ? "#542D00" : "#2B2B2B";
  const label = o.label !== false;
  if (note) {
    const hn = w * NOTE_A[ML_V[id]], yy = y + (h - hn) / 2;
    return <g filter="url(#udgam-shadow-piece)">
        <rect x={x} y={yy} width={w} height={hn} rx={8 * s} fill="url(#udgam-grad-note)" />
        {
      /* Decorative inner security frame for note fallback */
    }
        <rect x={x + 3 * s} y={yy + 3 * s} width={w - 6 * s} height={hn - 6 * s} rx={5 * s} fill="none" stroke="#C4B090" strokeWidth={1.5 * s} strokeDasharray="6 4" />
        <line x1={x + w * 0.3} y1={yy + 2 * s} x2={x + w * 0.3} y2={yy + hn - 2 * s} stroke="#8C7A5C" strokeWidth={2 * s} strokeOpacity={0.4} />
        {!sk && label && <text x={x + w / 2} y={yy + hn / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#2B2B2B" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>
            ₹{ML_V[id]}
          </text>}
        {sk && <Skin name={"note" + ML_V[id]} x={x} y={yy} w={w} h={hn} />}
        <rect x={x} y={yy} width={w} height={hn} rx={8 * s} fill="none" stroke={o.lit ? ML_AMB : "#594F43"} strokeWidth={o.lit ? 5.5 : 2.5} />
      </g>;
  }
  const ccx = x + w / 2, ccy = y + h / 2;
  return <g filter="url(#udgam-shadow-piece)">
      <circle cx={ccx} cy={ccy} r={w / 2} fill="#C9A24A" />
      {sk && <Skin name={"coin" + ML_V[id]} x={x} y={y} w={w} h={h} />}
      {!sk && label && <text x={ccx} y={ccy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#2B2B2B" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{ML_V[id]}</text>}
      {o.lit && <circle cx={ccx} cy={ccy} r={w / 2 + 2} fill="none" stroke={ML_AMB} strokeWidth={5} />}
    </g>;
}
function mlFan(id, n, x, y, w, h, smax = 1) {
  const bw = mlNote(id) ? ML_NW : ML_CD, bh = mlNote(id) ? ML_NH : ML_CD;
  let s = Math.min(smax, h / bh);
  const ms = mlNote(id) ? n > 5 ? 0.42 : 0.7 : 0.62;
  for (let k = 0; k < 16 && n > 1 && s > 0.38; k++) {
    if ((w - bw * s) / (n - 1) >= bw * s * ms) break;
    s *= 0.93;
  }
  const step = n > 1 ? Math.max(0, Math.min(bw * s * 1.1, (w - bw * s) / (n - 1))) : 0;
  const pw = bw * s, ph = bh * s, oy = y + (h - ph) / 2;
  const cs = Array.from({ length: n }, (_, i) => ({ x: x + i * step, y: oy, cx: x + i * step + pw / 2, cy: oy + ph / 2 }));
  return { s, step, pw, ph, cs, x, y, w, h };
}
const mlDraw = (id, fan, n, lit = 0) => fan.cs.map((c, i) => <g key={"p" + i}>{mlPiece(id, c.x, c.y, fan.s, { label: !mlNote(id) || i === n - 1, lit: i < lit, skin: i >= n - 8 })}</g>);
const mlTag = (x, y, w, h, col, text, fs, solid = true, halo = false, dy = 0) => <g filter={solid ? "url(#udgam-shadow-soft)" : void 0}>
    <rect x={x} y={y} width={w} height={h} rx={14} fill={solid ? tint(col, 0.78) : "none"} stroke={col} strokeWidth={solid ? 3 : 2.5} strokeDasharray={solid ? void 0 : "8 8"} />
    {text !== null && text !== void 0 && <text x={x + w / 2} y={y + h / 2 + fs * 0.36 + dy} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#2B2B2B" stroke={halo ? "#FFF6DC" : void 0} strokeWidth={halo ? 4 : void 0} paintOrder={halo ? "stroke" : void 0} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>
        {text}
      </text>}
  </g>;
function mlRowGeom(x, w, tight = false) {
  const cmp = w < 560, g = cmp ? 8 : 10, big = w >= 800, tagW = cmp ? 92 : tight ? 116 : big ? 130 : 108, cW = cmp ? 76 : tight ? 100 : big ? 120 : 92, tW = cmp ? 118 : tight ? 140 : big ? 170 : 134;
  const fw = w - tagW - cW - tW - 3 * g;
  return { g, tagW, cW, tW, fw, tagX: x, fanX: x + tagW + g, cX: x + tagW + g + fw + g, tX: x + tagW + g + fw + g + cW + g };
}
function mlRow(id, cnt, x, y, w, h, o) {
  const g = mlRowGeom(x, w, !!o.tight), th = Math.min(64, h - 8), ty = y + (h - th) / 2, fs = th >= 60 ? T.prompt : th >= 52 ? 36 : T.label;
  const fan = mlFan(id, cnt, g.fanX, y + 3, g.fw, h - 6, o.smax || 1);
  const cs = o.cshow !== void 0 ? o.cshow : cnt, empty = cnt <= 0;
  const totTag = o.tot === null || o.tot === void 0 || empty ? mlTag(g.tX, ty, g.tW, th, ML_GRN, empty ? null : "₹?", fs, false) : <g data-reveals={o.reveal ? "answer" : void 0}>{mlTag(g.tX, ty, g.tW, th, ML_GRN, "₹" + o.tot, fs)}</g>;
  return {
    fan,
    g,
    th,
    ty,
    el: <g key={"row" + id + (o.k || "")}>
        {mlTag(g.tagX, ty, g.tagW, th, ML_AMB, "₹" + ML_V[id], fs)}
        {mlDraw(id, fan, cnt, o.lit || 0)}
        {mlTag(g.cX, ty, g.cW, th, ML_SKY, cs > 0 ? "× " + cs : null, fs, cs > 0)}
        {totTag}
      </g>
  };
}
const ML_WARM = {
  1: { k: "all11" },
  2: { k: "pile", kind: "n20", n: 4, warm: true },
  3: { k: "purse", has: { n50: 1, c10: 1 }, warm: true },
  4: { k: "pay", price: 30, mode: "warm", warm: true }
};
const ML_FREE = { k: "free" };
function mlPurse(pX, pY, pW, cid) {
  const pH = Math.round(pW * 180 / 277), k = pW / 277;
  return <g key="openpurse" pointerEvents="none">
      <ellipse cx={pX + pW / 2} cy={pY + pH - 8} rx={pW * 0.44} ry={7} fill="#241304" fillOpacity={0.35} />
      <rect x={pX + pW * 0.04} y={pY + pH * 0.12} width={pW * 0.92} height={pH * 0.8} rx={pW * 0.14} fill="#563215" stroke="#3A1F09" strokeWidth={3} />
      <Skin name="openpurse" x={pX} y={pY} w={pW} h={pH} />
      <clipPath id={cid}><rect x={pX} y={pY} width={pW} height={pH * 0.6} /></clipPath>
      <g clipPath={"url(#" + cid + ")"}>
        <g transform={`rotate(-7 ${pX + 95 * k} ${pY + 60 * k})`}>{mlPiece("n500", pX + 62 * k, pY + 14 * k, 0.78 * k * 1.2, { label: false })}</g>
        <g transform={`rotate(3 ${pX + 140 * k} ${pY + 60 * k})`}>{mlPiece("n200", pX + 100 * k, pY + 24 * k, 0.78 * k * 1.2, { label: false })}</g>
        {mlPiece("c10", pX + 168 * k, pY + 40 * k, 0.62 * k * 1.2, { label: false })}
        {mlPiece("c5", pX + 76 * k, pY + 50 * k, 0.55 * k * 1.2, { label: false })}
      </g>
    </g>;
}
function StartArt({ box, C, lang, tx }) {
  ML_SK = 0;
  return <g>
      <RenderDefs />
      <rect x={10} y={120} width={box.w - 20} height={box.h - 140} rx={24} fill="url(#udgam-grad-wood)" stroke="#6E4018" strokeWidth={4} />
      <Skin name="counter" x={10} y={120} w={(box.w - 20) / 2} h={(box.w - 20) / 2 * 240 / 640} />
      <g transform={`translate(${box.w - 10} 120) scale(-1 1)`}><Skin name="counter" x={0} y={0} w={(box.w - 20) / 2} h={(box.w - 20) / 2 * 240 / 640} /></g>
      {mlPurse(60, 110, 330, "udg-mouth-s")}
      {mlPiece("n500", 440, 190, 1.45, { skin: true })}
      {mlPiece("n50", 650, 200, 1.45, { skin: true })}
      {mlPiece("c20", 860, 200, 1.1, {})}
      {mlPiece("c10", 960, 200, 1.1, {})}
      {mlPiece("c5", 1060, 200, 1.1, {})}
    </g>;
}
const TR = {
  hi: {
    "So far": "अब तक",
    "Total": "कुल",
    "A shop counter, an open purse and a tray for the money.": "दुकान का काउंटर, एक खुला बटुआ और पैसों के लिए एक ट्रे।",
    "Free play. Tap the price tag to change the amount, then pay it.": "खुला खेल। कीमत का टैग छुओ और रकम बदलो, फिर उसे चुकाओ।",
    "The tray is empty for the new amount.": "नई रकम के लिए ट्रे खाली है।",
    "Pay the amount on the tag, press Pay again, then pay it another way.": "टैग की रकम चुकाओ, फिर चुकाओ दबाओ, फिर दूसरे तरीके से चुकाओ।",
    "Look at the price tag and pay that amount with notes and coins.": "कीमत का टैग देखो और उतनी रकम नोट और सिक्कों से चुकाओ।",
    "Pay the amount": "रकम चुकाओ",
    "Yes, that money pays the amount on the tag.": "हाँ, इन पैसों से टैग की रकम चुक गई।",
    "Pay the tag amount with exactly 3 notes and 1 coin.": "ठीक 3 नोट और 1 सिक्के से टैग की रकम चुकाओ।",
    "Yes, the tag is paid with just those pieces.": "हाँ, बस इन्हीं टुकड़ों से टैग की रकम चुक गई।",
    "Paid the exact price!": "कीमत ठीक चुकाई!",
    "That is more than the price.": "यह कीमत से ज़्यादा है।",
    "Count the Money": "पैसे गिनो",
    "You counted every group by its values.": "तुमने हर समूह को उसके मूल्य से गिना।",
    "You run the shop. Can you count the money?": "दुकान तुम चलाते हो। क्या तुम पैसे गिन सकते हो?",
    "Every note and coin has a value": "हर नोट और सिक्के का एक मूल्य होता है",
    "Look at the number on each note and coin.": "हर नोट और सिक्के पर लिखा अंक देखो।",
    "Tap the note with 50 on it to read its value.": "50 वाले नोट को छुओ और उसका मूल्य पढ़ो।",
    "Find the note with the big 50.": "बड़े 50 वाला नोट ढूँढो।",
    "Now tap the coin with 5 on it.": "अब 5 वाले सिक्के को छुओ।",
    "Find the small round coin with a 5.": "5 वाला छोटा गोल सिक्का ढूँढो।",
    "Put the two pieces side by side and compare their numbers.": "दोनों को साथ रखो और उनके अंकों की तुलना करो।",
    "Ignore the colour and the shine, and read only the big number.": "रंग और चमक छोड़ो, बस बड़ा अंक पढ़ो।",
    "Money is worth its printed number, never its colour or size.": "पैसे का मूल्य उस पर छपा अंक है, रंग या आकार नहीं।",
    "You learned: the number on a note or a coin is its value": "तुमने सीखा: नोट या सिक्के पर लिखा अंक उसका मूल्य है",
    "Looking at the number on each piece, what is each one worth in rupees?": "हर टुकड़े पर लिखा अंक देखो, हर एक कितने रुपये का है?",
    "Each is worth?": "हर एक का मूल्य?",
    "Tap each piece and read the number on it.": "हर एक को छुओ और उस पर लिखा अंक पढ़ो।",
    "Yes, each piece is worth what is printed on it.": "हाँ, हर एक उतने का है जितना उस पर छपा है।",
    "Tap the four notes in order, from the least to the greatest.": "चारों नोट कम से ज़्यादा के क्रम में छुओ।",
    "Least to greatest": "कम से ज़्यादा",
    "Find the note with the smallest number first.": "पहले सबसे छोटे अंक वाला नोट ढूँढो।",
    "Yes, the notes now go from the least to the greatest.": "हाँ, अब नोट कम से ज़्यादा के क्रम में हैं।",
    "The note": "नोट",
    "The coin": "सिक्का",
    "The same": "बराबर",
    "Which is worth more, this note or this coin?": "कौन ज़्यादा मूल्य का है, यह नोट या यह सिक्का?",
    "Which is worth more?": "किसका मूल्य ज़्यादा?",
    "Read the number on each piece, not how it looks.": "हर एक पर लिखा अंक पढ़ो, उसका रूप नहीं।",
    "Yes, the note and the coin are worth exactly the same.": "हाँ, नोट और सिक्का बिल्कुल बराबर मूल्य के हैं।",
    "Counting notes or coins of one kind": "एक ही तरह के नोट या सिक्के गिनना",
    "Tap each one and watch the total climb.": "हर एक को छुओ और देखो कुल कैसे बढ़ता है।",
    "Tap a note on the counter to count it.": "काउंटर पर रखा एक नोट छुओ और उसे गिनो।",
    "Tap any note in the row.": "कतार में कोई भी नोट छुओ।",
    "Tap another note and watch the total jump.": "दूसरा नोट छुओ और देखो कुल कैसे बढ़ता है।",
    "Tap a note that is not counted yet.": "जो नोट अभी नहीं गिना, उसे छुओ।",
    "Tap the third note and keep counting.": "तीसरा नोट छुओ और गिनते रहो।",
    "Two notes are still waiting.": "दो नोट अभी बाकी हैं।",
    "Tap the last note to finish the count.": "आख़िरी नोट छुओ और गिनती पूरी करो।",
    "One note is still waiting.": "एक नोट अभी बाकी है।",
    "Say the value of one piece, then count on by that much.": "एक का मूल्य बोलो, फिर उतना-उतना जोड़ते जाओ।",
    "Count the pieces one by one, with one jump for each.": "टुकड़ों को एक-एक करके गिनो, हर एक के साथ एक छलाँग।",
    "Notes or coins of one kind are counted in jumps of their value.": "एक ही तरह के नोट या सिक्के उनके मूल्य की छलाँग में गिने जाते हैं।",
    "You learned: count notes or coins of one kind in jumps of value": "तुमने सीखा: एक तरह के नोट या सिक्के मूल्य की छलाँग में गिनो",
    "Tap the notes on the counter, then type the money there.": "काउंटर के नोट छुओ, फिर लिखो वहाँ कितने पैसे हैं।",
    "Money on the counter?": "काउंटर पर कितने पैसे?",
    "Read the number on a note, then count on from it.": "नोट का अंक पढ़ो, फिर वहाँ से आगे गिनो।",
    "Yes, each note added the same amount to the total.": "हाँ, हर नोट ने कुल में उतना ही जोड़ा।",
    "Now tap the coins on the counter, then type how much they make.": "अब काउंटर के सिक्के छुओ, फिर लिखो वे कितने बनते हैं।",
    "Total of the coins?": "सिक्कों का कुल?",
    "Count the coins by their value, not by how many there are.": "सिक्कों को उनके मूल्य से गिनो, उनकी संख्या से नहीं।",
    "Yes, seven coins of the same value make that much.": "हाँ, एक ही मूल्य के सात सिक्के इतने बनाते हैं।",
    "Tap every note onto the counter, then type how much more the bigger pile has.": "हर नोट काउंटर पर रखो, फिर लिखो बड़े ढेर में कितना ज़्यादा है।",
    "How much more?": "कितना ज़्यादा?",
    "Compare the two totals, pile against pile.": "दोनों कुल की तुलना करो, ढेर से ढेर।",
    "Yes, the bigger pile holds that much more.": "हाँ, बड़े ढेर में इतना ज़्यादा है।",
    "Counting a mixed handful": "मिले-जुले नोट-सिक्के गिनना",
    "Begin with the biggest value. Add one kind at a time. What is the total now?": "सबसे बड़े मूल्य से शुरू करो। एक-एक किस्म जोड़ो। अब कुल कितना है?",
    "Drag the biggest note into the tray.": "सबसे बड़ा नोट खींचकर ट्रे में रखो।",
    "Start with the note.": "नोट से शुरू करो।",
    "Now drag the coin into the tray.": "अब सिक्के को खींचकर ट्रे में रखो।",
    "Drag the coin next.": "अब सिक्के को खींचो।",
    "Tap the top row to add it to the total.": "ऊपर की पंक्ति छुओ और उसे कुल में जोड़ो।",
    "The top row is the biggest.": "ऊपर की पंक्ति सबसे बड़ी है।",
    "Tap the next row to add it as well.": "अगली पंक्ति छुओ और उसे भी जोड़ो।",
    "Tap the row below.": "नीचे की पंक्ति छुओ।",
    "Point to the row with the biggest value and count it first.": "सबसे बड़े मूल्य वाली पंक्ति दिखाओ और उसे पहले गिनो।",
    "Say the total after that row and after the next one.": "उस पंक्ति के बाद और अगली के बाद कुल बोलो।",
    "A mixed handful is counted one kind at a time, starting with the biggest value.": "मिले-जुले पैसे एक-एक किस्म से गिनो, सबसे बड़े से शुरू।",
    "You learned: count a mixed handful one kind at a time, biggest first": "तुमने सीखा: मिले पैसे एक-एक किस्म करके, सबसे बड़े से गिनो",
    "Move every piece into the tray, count the rows, then type the total.": "हर टुकड़ा ट्रे में रखो, पंक्तियाँ गिनो, फिर कुल लिखो।",
    "Money in the purse?": "बटुए में कितने पैसे?",
    "Look at the numbers and start with the largest one.": "अंक देखो और सबसे बड़े से शुरू करो।",
    "Yes, every kind is in the total.": "हाँ, हर किस्म कुल में आ गई।",
    "Add each piece to the tray, then count the rows and type the purse total.": "हर टुकड़ा ट्रे में जोड़ो, पंक्तियाँ गिनो, फिर बटुए का कुल लिखो।",
    "Purse total?": "बटुए का कुल?",
    "Keep the total so far in your head as each row is counted.": "हर पंक्ति गिनते समय अब तक का कुल याद रखो।",
    "Yes, the notes and coins all count.": "हाँ, सारे नोट और सिक्के गिने गए।",
    "Fill the tray, tap the rows from the top, then type what the purse holds.": "ट्रे भरो, ऊपर से पंक्तियाँ छुओ, फिर लिखो बटुए में कितना है।",
    "How much inside?": "अंदर कितना?",
    "Count how many pieces of each kind there are, too.": "हर किस्म के कितने टुकड़े हैं, यह भी गिनो।",
    "Yes, nothing was left out of the total.": "हाँ, कुल में कुछ भी छूटा नहीं।",
    "Start with the biggest.": "सबसे बड़े से शुरू करो।",
    "Put all the money in the tray first.": "पहले सारे पैसे ट्रे में रखो।",
    "One amount, many ways to pay": "एक रकम, चुकाने के कई तरीके",
    "Pay the price on the tag. Can you pay it a different way?": "टैग पर लिखी कीमत चुकाओ। क्या दूसरे तरीके से भी चुका सकते हो?",
    "The tray already pays the price, so tap Pay again to clear it.": "ट्रे में कीमत पूरी है, फिर चुकाओ दबाकर उसे खाली करो।",
    "Tap the Pay again key.": "फिर चुकाओ बटन को छुओ।",
    "Now tap a coin with 20 on it to put it in the tray.": "अब 20 वाला सिक्का छुओ और ट्रे में रखो।",
    "Find the coin with the 20.": "20 वाला सिक्का ढूँढो।",
    "Tap a coin with 10 on it to reach the price again.": "10 वाला सिक्का छुओ, फिर कीमत पूरी हो जाएगी।",
    "Find the coin with the 10.": "10 वाला सिक्का ढूँढो।",
    "Say the price and what the tray holds, then compare them.": "कीमत और ट्रे में रखे पैसे बोलो, फिर उनकी तुलना करो।",
    "The Total must equal the price, with any notes and coins.": "कोई भी नोट-सिक्के लगाओ, कुल कीमत के बराबर होना चाहिए।",
    "One price can be paid with different notes and coins.": "एक कीमत अलग-अलग नोट और सिक्कों से चुकाई जा सकती है।",
    "You learned: one price can be paid in many ways": "तुमने सीखा: एक कीमत कई तरीकों से चुकाई जा सकती है",
    "Pay it two ways": "दो तरीकों से चुकाओ",
    "Press Pay again after one way, then find a second way.": "एक तरीके के बाद फिर चुकाओ दबाओ, फिर दूसरा तरीका ढूँढो।",
    "Yes, both ways pay the same price.": "हाँ, दोनों तरीके एक ही कीमत चुकाते हैं।",
    "Each way must make the Total equal to the price.": "हर तरीके में कुल कीमत के बराबर होना चाहिए।",
    "A second way uses different notes and coins, so press Pay again first.": "दूसरे तरीके में अलग नोट-सिक्के लगते हैं, पहले फिर चुकाओ दबाओ।",
    "Compare the Total tag with the price tag.": "कुल की पट्टी को कीमत की पट्टी से मिलाओ।",
    "3 notes, 1 coin": "3 नोट, 1 सिक्का",
    "Count the notes and the coin you have used so far.": "अब तक लगाए नोट और सिक्के गिनो।",
    "Start with the biggest note that fits under the price.": "कीमत से कम का सबसे बड़ा नोट पहले लगाओ।",
    "Add up the notes first, then pick one coin to finish.": "पहले नोट जोड़ो, फिर पूरा करने के लिए एक सिक्का चुनो।",
    "The tray is full, press Pay again.": "ट्रे भर गई है, फिर चुकाओ दबाओ।",
    "That is one way. Now press Pay again and pay it another way.": "यह एक तरीका है। अब फिर चुकाओ दबाओ और दूसरे तरीके से चुकाओ।",
    "One way is kept, so pay the price a different way.": "एक तरीका रखा है, कीमत दूसरे तरीके से चुकाओ।",
    "That is the same way, so try a different set of notes and coins.": "यह वही तरीका है, नोट और सिक्कों का दूसरा सेट आज़माओ।",
    "Put all four notes in the row first.": "पहले चारों नोट कतार में रखो।",
    "Put some notes or coins in the tray first.": "पहले ट्रे में कुछ नोट या सिक्के रखो।",
    "Note": "नोट",
    "Coin": "सिक्का",
    "Least": "सबसे कम",
    "Greatest": "सबसे ज़्यादा",
    "Tray": "ट्रे",
    "Pay again": "फिर चुकाओ",
    "Needs more": "और चाहिए",
    "Too much": "ज़्यादा है",
    "Way 1": "तरीका 1",
    "3 notes + 1 coin": "3 नोट + 1 सिक्का"
  },
  gu: {
    "So far": "અત્યાર સુધી",
    "Total": "કુલ",
    "A shop counter, an open purse and a tray for the money.": "દુકાનનું કાઉન્ટર, એક ખુલ્લું પાકીટ અને પૈસા માટે એક ટ્રે.",
    "Free play. Tap the price tag to change the amount, then pay it.": "મુક્ત રમત. કિંમતના ટેગને અડો અને રકમ બદલો, પછી તે ચૂકવો.",
    "The tray is empty for the new amount.": "નવી રકમ માટે ટ્રે ખાલી છે.",
    "Pay the amount on the tag, press Pay again, then pay it another way.": "ટેગની રકમ ચૂકવો, ફરી ચૂકવો દબાવો, પછી બીજી રીતે ચૂકવો.",
    "Look at the price tag and pay that amount with notes and coins.": "કિંમતનો ટેગ જુઓ અને તેટલી રકમ નોટ અને સિક્કાથી ચૂકવો.",
    "Pay the amount": "રકમ ચૂકવો",
    "Yes, that money pays the amount on the tag.": "હા, આ પૈસાથી ટેગની રકમ ચૂકવાઈ ગઈ.",
    "Pay the tag amount with exactly 3 notes and 1 coin.": "બરાબર 3 નોટ અને 1 સિક્કાથી ટેગની રકમ ચૂકવો.",
    "Yes, the tag is paid with just those pieces.": "હા, બસ આ ટુકડાથી ટેગની રકમ ચૂકવાઈ ગઈ.",
    "Paid the exact price!": "કિંમત બરાબર ચૂકવી!",
    "That is more than the price.": "આ કિંમત કરતાં વધારે છે.",
    "Count the Money": "પૈસા ગણો",
    "You counted every group by its values.": "તમે દરેક સમૂહ તેની કિંમતથી ગણ્યો.",
    "You run the shop. Can you count the money?": "દુકાન તમે ચલાવો છો. શું તમે પૈસા ગણી શકો?",
    "Every note and coin has a value": "દરેક નોટ અને સિક્કાની એક કિંમત હોય છે",
    "Look at the number on each note and coin.": "દરેક નોટ અને સિક્કા પરનો અંક જુઓ.",
    "Tap the note with 50 on it to read its value.": "50 વાળી નોટને અડો અને તેની કિંમત વાંચો.",
    "Find the note with the big 50.": "મોટા 50 વાળી નોટ શોધો.",
    "Now tap the coin with 5 on it.": "હવે 5 વાળા સિક્કાને અડો.",
    "Find the small round coin with a 5.": "5 વાળો નાનો ગોળ સિક્કો શોધો.",
    "Put the two pieces side by side and compare their numbers.": "બંનેને સાથે મૂકો અને તેમના અંકોની સરખામણી કરો.",
    "Ignore the colour and the shine, and read only the big number.": "રંગ અને ચમક છોડો, ફક્ત મોટો અંક વાંચો.",
    "Money is worth its printed number, never its colour or size.": "પૈસાની કિંમત તેના પર છપાયેલો અંક છે, રંગ કે કદ નહીં.",
    "You learned: the number on a note or a coin is its value": "તમે શીખ્યા: નોટ કે સિક્કા પરનો અંક તેની કિંમત છે",
    "Looking at the number on each piece, what is each one worth in rupees?": "દરેક પર લખેલો અંક જુઓ, દરેક કેટલા રૂપિયાનું છે?",
    "Each is worth?": "દરેકની કિંમત?",
    "Tap each piece and read the number on it.": "દરેકને અડો અને તેના પરનો અંક વાંચો.",
    "Yes, each piece is worth what is printed on it.": "હા, દરેક તેના પર છપાયેલા જેટલાનું છે.",
    "Tap the four notes in order, from the least to the greatest.": "ચારેય નોટને ઓછીથી વધુના ક્રમમાં અડો.",
    "Least to greatest": "ઓછીથી વધુ",
    "Find the note with the smallest number first.": "પહેલા સૌથી નાના અંકવાળી નોટ શોધો.",
    "Yes, the notes now go from the least to the greatest.": "હા, હવે નોટ ઓછીથી વધુના ક્રમમાં છે.",
    "The note": "નોટ",
    "The coin": "સિક્કો",
    "The same": "સરખી",
    "Which is worth more, this note or this coin?": "કયું વધુ કિંમતનું છે, આ નોટ કે આ સિક્કો?",
    "Which is worth more?": "કોની કિંમત વધુ?",
    "Read the number on each piece, not how it looks.": "દરેક પરનો અંક વાંચો, તેનો દેખાવ નહીં.",
    "Yes, the note and the coin are worth exactly the same.": "હા, નોટ અને સિક્કો બરાબર સરખી કિંમતના છે.",
    "Counting notes or coins of one kind": "એક જ પ્રકારની નોટ કે સિક્કા ગણવા",
    "Tap each one and watch the total climb.": "દરેકને અડો અને જુઓ કુલ કેવી રીતે વધે છે.",
    "Tap a note on the counter to count it.": "કાઉન્ટર પરની એક નોટને અડો અને તેને ગણો.",
    "Tap any note in the row.": "હરોળમાંની કોઈ પણ નોટને અડો.",
    "Tap another note and watch the total jump.": "બીજી નોટને અડો અને જુઓ કુલ કેવો વધે છે.",
    "Tap a note that is not counted yet.": "જે નોટ હજી ગણી નથી તેને અડો.",
    "Tap the third note and keep counting.": "ત્રીજી નોટને અડો અને ગણતા રહો.",
    "Two notes are still waiting.": "બે નોટ હજી બાકી છે.",
    "Tap the last note to finish the count.": "છેલ્લી નોટને અડો અને ગણતરી પૂરી કરો.",
    "One note is still waiting.": "એક નોટ હજી બાકી છે.",
    "Say the value of one piece, then count on by that much.": "એકની કિંમત બોલો, પછી એટલું-એટલું ઉમેરતા જાઓ.",
    "Count the pieces one by one, with one jump for each.": "ટુકડાને એક-એક કરીને ગણો, દરેક સાથે એક કૂદકો.",
    "Notes or coins of one kind are counted in jumps of their value.": "એક જ પ્રકારની નોટ કે સિક્કા તેમની કિંમતના કૂદકામાં ગણાય છે.",
    "You learned: count notes or coins of one kind in jumps of value": "તમે શીખ્યા: એક પ્રકારની નોટ કે સિક્કા કિંમતના કૂદકામાં ગણો",
    "Tap the notes on the counter, then type the money there.": "કાઉન્ટર પરની નોટને અડો, પછી લખો ત્યાં કેટલા પૈસા છે.",
    "Money on the counter?": "કાઉન્ટર પર કેટલા પૈસા?",
    "Read the number on a note, then count on from it.": "નોટનો અંક વાંચો, પછી ત્યાંથી આગળ ગણો.",
    "Yes, each note added the same amount to the total.": "હા, દરેક નોટે કુલમાં એટલું જ ઉમેર્યું.",
    "Now tap the coins on the counter, then type how much they make.": "હવે કાઉન્ટર પરના સિક્કા અડો, પછી લખો તે કેટલા થાય છે.",
    "Total of the coins?": "સિક્કાનો કુલ?",
    "Count the coins by their value, not by how many there are.": "સિક્કાને તેમની કિંમતથી ગણો, સંખ્યાથી નહીં.",
    "Yes, seven coins of the same value make that much.": "હા, એક જ કિંમતના સાત સિક્કા આટલા થાય છે.",
    "Tap every note onto the counter, then type how much more the bigger pile has.": "દરેક નોટ કાઉન્ટર પર મૂકો, પછી લખો મોટા ઢગલામાં કેટલું વધુ છે.",
    "How much more?": "કેટલું વધુ?",
    "Compare the two totals, pile against pile.": "બંને કુલની સરખામણી કરો, ઢગલા સાથે ઢગલો.",
    "Yes, the bigger pile holds that much more.": "હા, મોટા ઢગલામાં આટલું વધુ છે.",
    "Counting a mixed handful": "મિશ્ર નોટ-સિક્કા ગણવા",
    "Begin with the biggest value. Add one kind at a time. What is the total now?": "સૌથી મોટી કિંમતથી શરૂ કરો. એક-એક પ્રકાર ઉમેરો. હવે કુલ કેટલું છે?",
    "Drag the biggest note into the tray.": "સૌથી મોટી નોટ ખેંચીને ટ્રેમાં મૂકો.",
    "Start with the note.": "નોટથી શરૂ કરો.",
    "Now drag the coin into the tray.": "હવે સિક્કાને ખેંચીને ટ્રેમાં મૂકો.",
    "Drag the coin next.": "હવે સિક્કાને ખેંચો.",
    "Tap the top row to add it to the total.": "ઉપરની હરોળને અડો અને કુલમાં ઉમેરો.",
    "The top row is the biggest.": "ઉપરની હરોળ સૌથી મોટી છે.",
    "Tap the next row to add it as well.": "આગલી હરોળને અડો અને તેને પણ ઉમેરો.",
    "Tap the row below.": "નીચેની હરોળને અડો.",
    "Point to the row with the biggest value and count it first.": "સૌથી મોટી કિંમતવાળી હરોળ બતાવો અને તેને પહેલા ગણો.",
    "Say the total after that row and after the next one.": "તે હરોળ પછી અને આગલી પછી કુલ બોલો.",
    "A mixed handful is counted one kind at a time, starting with the biggest value.": "મિશ્ર પૈસા એક-એક પ્રકાર કરીને ગણાય છે, સૌથી મોટી કિંમતથી શરૂ કરીને.",
    "You learned: count a mixed handful one kind at a time, biggest first": "તમે શીખ્યા: મિશ્ર પૈસા એક-એક પ્રકારે, સૌથી મોટાથી ગણો",
    "Move every piece into the tray, count the rows, then type the total.": "દરેક ટુકડો ટ્રેમાં મૂકો, હરોળ ગણો, પછી કુલ લખો.",
    "Money in the purse?": "પાકીટમાં કેટલા પૈસા?",
    "Look at the numbers and start with the largest one.": "અંક જુઓ અને સૌથી મોટાથી શરૂ કરો.",
    "Yes, every kind is in the total.": "હા, દરેક પ્રકાર કુલમાં આવી ગયો.",
    "Add each piece to the tray, then count the rows and type the purse total.": "દરેક ટુકડો ટ્રેમાં ઉમેરો, હરોળ ગણો, પછી પાકીટનો કુલ લખો.",
    "Purse total?": "પાકીટનો કુલ?",
    "Keep the total so far in your head as each row is counted.": "દરેક હરોળ ગણતી વખતે અત્યાર સુધીનો કુલ યાદ રાખો.",
    "Yes, the notes and coins all count.": "હા, બધી નોટ અને સિક્કા ગણાયા.",
    "Fill the tray, tap the rows from the top, then type what the purse holds.": "ટ્રે ભરો, ઉપરથી હરોળ અડો, પછી લખો પાકીટમાં કેટલું છે.",
    "How much inside?": "અંદર કેટલું?",
    "Count how many pieces of each kind there are, too.": "દરેક પ્રકારના કેટલા છે તે પણ ગણો.",
    "Yes, nothing was left out of the total.": "હા, કુલમાં કંઈ છૂટ્યું નથી.",
    "Start with the biggest.": "સૌથી મોટાથી શરૂ કરો.",
    "Put all the money in the tray first.": "પહેલા બધા પૈસા ટ્રેમાં મૂકો.",
    "One amount, many ways to pay": "એક રકમ, ચૂકવવાની ઘણી રીતો",
    "Pay the price on the tag. Can you pay it a different way?": "ટેગ પરની કિંમત ચૂકવો. શું બીજી રીતે પણ ચૂકવી શકો?",
    "The tray already pays the price, so tap Pay again to clear it.": "ટ્રેમાં કિંમત પૂરી છે, ફરી ચૂકવો દબાવીને તેને ખાલી કરો.",
    "Tap the Pay again key.": "ફરી ચૂકવો બટનને અડો.",
    "Now tap a coin with 20 on it to put it in the tray.": "હવે 20 વાળો સિક્કો અડો અને ટ્રેમાં મૂકો.",
    "Find the coin with the 20.": "20 વાળો સિક્કો શોધો.",
    "Tap a coin with 10 on it to reach the price again.": "10 વાળો સિક્કો અડો, ફરી કિંમત પૂરી થશે.",
    "Find the coin with the 10.": "10 વાળો સિક્કો શોધો.",
    "Say the price and what the tray holds, then compare them.": "કિંમત અને ટ્રેમાં રાખેલા પૈસા બોલો, પછી સરખામણી કરો.",
    "The Total must equal the price, with any notes and coins.": "કોઈ પણ નોટ-સિક્કા વાપરો, કુલ કિંમત જેટલું થવું જોઈએ.",
    "One price can be paid with different notes and coins.": "એક કિંમત અલગ-અલગ નોટ અને સિક્કાથી ચૂકવી શકાય છે.",
    "You learned: one price can be paid in many ways": "તમે શીખ્યા: એક કિંમત ઘણી રીતે ચૂકવી શકાય છે",
    "Pay it two ways": "બે રીતે ચૂકવો",
    "Press Pay again after one way, then find a second way.": "એક રીત પછી ફરી ચૂકવો દબાવો, પછી બીજી રીત શોધો.",
    "Yes, both ways pay the same price.": "હા, બંને રીતે એ જ કિંમત ચૂકવાય છે.",
    "Each way must make the Total equal to the price.": "દરેક રીતમાં કુલ કિંમત જેટલું થવું જોઈએ.",
    "A second way uses different notes and coins, so press Pay again first.": "બીજી રીતમાં અલગ નોટ-સિક્કા વપરાય છે, પહેલા ફરી ચૂકવો દબાવો.",
    "Compare the Total tag with the price tag.": "કુલની પટ્ટીને કિંમતની પટ્ટી સાથે સરખાવો.",
    "3 notes, 1 coin": "3 નોટ, 1 સિક્કો",
    "Count the notes and the coin you have used so far.": "અત્યાર સુધી મૂકેલી નોટ અને સિક્કા ગણો.",
    "Start with the biggest note that fits under the price.": "કિંમતથી ઓછી હોય તેવી સૌથી મોટી નોટ પહેલા મૂકો.",
    "Add up the notes first, then pick one coin to finish.": "પહેલા નોટ ઉમેરો, પછી પૂરું કરવા એક સિક્કો પસંદ કરો.",
    "The tray is full, press Pay again.": "ટ્રે ભરાઈ ગઈ છે, ફરી ચૂકવો દબાવો.",
    "That is one way. Now press Pay again and pay it another way.": "આ એક રીત છે. હવે ફરી ચૂકવો દબાવો અને બીજી રીતે ચૂકવો.",
    "One way is kept, so pay the price a different way.": "એક રીત રાખી છે, કિંમત બીજી રીતે ચૂકવો.",
    "That is the same way, so try a different set of notes and coins.": "આ એ જ રીત છે, નોટ અને સિક્કાનો બીજો સેટ અજમાવો.",
    "Put all four notes in the row first.": "પહેલા ચારેય નોટ હરોળમાં મૂકો.",
    "Put some notes or coins in the tray first.": "પહેલા ટ્રેમાં થોડી નોટ કે સિક્કા મૂકો.",
    "Note": "નોટ",
    "Coin": "સિક્કો",
    "Least": "સૌથી ઓછી",
    "Greatest": "સૌથી વધુ",
    "Tray": "ટ્રે",
    "Pay again": "ફરી ચૂકવો",
    "Needs more": "વધુ જોઈએ",
    "Too much": "વધારે છે",
    "Way 1": "રીત 1",
    "3 notes + 1 coin": "3 નોટ + 1 સિક્કો"
  }
};
const PHASES = [
  {
    n: 1,
    concept: "Every note and coin has a value",
    conceptId: "M1.S1.T2.C5",
    objectiveIds: ["O1"],
    says: ["Look at the number on each note and coin."],
    steps: [
      { say: "Tap the note with 50 on it to read its value.", on: "read-n50", hint: "Find the note with the big 50." },
      { say: "Now tap the coin with 5 on it.", on: "read-c5", hint: "Find the small round coin with a 5." }
    ],
    ladder: ["Put the two pieces side by side and compare their numbers.", "Ignore the colour and the shine, and read only the big number."],
    closing: "Money is worth its printed number, never its colour or size.",
    learned: "You learned: the number on a note or a coin is its value",
    traceback: "The two pieces ring their numbers; the sorted row is made again from the numbers and stops one note short.",
    items: [
      /* learn CM1: Yes, each is worth ₹20 */
      {
        qid: "M1.S1.T2.C5:CM1",
        kind: "pair",
        sc: { a: "n20", b: "c20" },
        say: "Looking at the number on each piece, what is each one worth in rupees?",
        ask: "Each is worth?",
        answer: 20,
        miss: "Tap each piece and read the number on it.",
        win: "Yes, each piece is worth what is printed on it."
      },
      /* practice 1: ₹10, ₹50, ₹200, ₹500 (made on the working area: the row of notes) */
      {
        qid: "M1.S1.T2.C5:1",
        kind: "order",
        pad: "enter",
        sc: { ids: ["n200", "n10", "n500", "n50"] },
        say: "Tap the four notes in order, from the least to the greatest.",
        ask: "Least to greatest",
        answer: "least-to-greatest",
        miss: "Find the note with the smallest number first.",
        win: "Yes, the notes now go from the least to the greatest."
      },
      /* authored: no plan question tests the note-versus-coin misconception directly */
      {
        qid: null,
        kind: "pair",
        sc: { a: "n10", b: "c10" },
        choices: [{ id: "note", label: "The note" }, { id: "coin", label: "The coin" }, { id: "same", label: "The same" }],
        say: "Which is worth more, this note or this coin?",
        ask: "Which is worth more?",
        answer: "same",
        miss: "Read the number on each piece, not how it looks.",
        win: "Yes, the note and the coin are worth exactly the same."
      }
    ]
  },
  {
    n: 2,
    concept: "Counting notes or coins of one kind",
    conceptId: "M1.S1.T2.C6",
    objectiveIds: ["O1"],
    says: ["Tap each one and watch the total climb."],
    steps: [
      { say: "Tap a note on the counter to count it.", on: "tap-1", hint: "Tap any note in the row." },
      { say: "Tap another note and watch the total jump.", on: "tap-2", hint: "Tap a note that is not counted yet." },
      { say: "Tap the third note and keep counting.", on: "tap-3", hint: "Two notes are still waiting." },
      { say: "Tap the last note to finish the count.", on: "tap-4", hint: "One note is still waiting." }
    ],
    ladder: ["Say the value of one piece, then count on by that much.", "Count the pieces one by one, with one jump for each."],
    closing: "Notes or coins of one kind are counted in jumps of their value.",
    learned: "You learned: count notes or coins of one kind in jumps of value",
    traceback: "The counter empties and the pieces land again, one jump each, stopping one jump before the total.",
    items: [
      /* learn CM2: ₹200 */
      {
        qid: "M1.S1.T2.C6:CM2",
        kind: "pile",
        sc: { kind: "n50", n: 4 },
        say: "Tap the notes on the counter, then type the money there.",
        ask: "Money on the counter?",
        answer: 200,
        miss: "Read the number on a note, then count on from it.",
        win: "Yes, each note added the same amount to the total."
      },
      /* practice 2: ₹14 */
      {
        qid: "M1.S1.T2.C6:2",
        kind: "pile",
        sc: { kind: "c2", n: 7 },
        say: "Now tap the coins on the counter, then type how much they make.",
        ask: "Total of the coins?",
        answer: 14,
        miss: "Count the coins by their value, not by how many there are.",
        win: "Yes, seven coins of the same value make that much."
      },
      /* practice 5: ₹100 more (7 notes of ₹100 = ₹700, 3 notes of ₹200 = ₹600) */
      {
        qid: "M1.S1.T2.C6:5",
        kind: "trays",
        sc: { a: { kind: "n200", n: 3 }, b: { kind: "n100", n: 7 } },
        say: "Tap every note onto the counter, then type how much more the bigger pile has.",
        ask: "How much more?",
        answer: 100,
        miss: "Compare the two totals, pile against pile.",
        win: "Yes, the bigger pile holds that much more."
      }
    ]
  },
  {
    n: 3,
    concept: "Counting a mixed handful",
    conceptId: "M1.S1.T2.C7",
    objectiveIds: ["O2"],
    says: ["Begin with the biggest value. Add one kind at a time. What is the total now?"],
    steps: [
      { say: "Drag the biggest note into the tray.", on: "kind-n50", hint: "Start with the note." },
      { say: "Now drag the coin into the tray.", on: "kind-c10", hint: "Drag the coin next." },
      { say: "Tap the top row to add it to the total.", on: "count-n50", hint: "The top row is the biggest." },
      { say: "Tap the next row to add it as well.", on: "count-c10", hint: "Tap the row below." }
    ],
    ladder: ["Point to the row with the biggest value and count it first.", "Say the total after that row and after the next one."],
    closing: "A mixed handful is counted one kind at a time, starting with the biggest value.",
    learned: "You learned: count a mixed handful one kind at a time, biggest first",
    traceback: "The tray fills again and the rows are counted from the top, stopping one row before the total.",
    items: [
      /* learn CM3: ₹240 */
      {
        qid: "M1.S1.T2.C7:CM3",
        kind: "purse",
        sc: { has: { n100: 2, n20: 1, c10: 1, c5: 2 } },
        say: "Move every piece into the tray, count the rows, then type the total.",
        ask: "Money in the purse?",
        answer: 240,
        miss: "Look at the numbers and start with the largest one.",
        win: "Yes, every kind is in the total."
      },
      /* practice 3: ₹66 */
      {
        qid: "M1.S1.T2.C7:3",
        kind: "purse",
        sc: { has: { n50: 1, n10: 1, c2: 3 } },
        say: "Add each piece to the tray, then count the rows and type the purse total.",
        ask: "Purse total?",
        answer: 66,
        miss: "Keep the total so far in your head as each row is counted.",
        win: "Yes, the notes and coins all count."
      },
      /* practice 7: ₹700 */
      {
        qid: "M1.S1.T2.C7:7",
        kind: "purse",
        sc: { has: { n500: 1, n50: 3, c10: 4, c2: 5 } },
        say: "Fill the tray, tap the rows from the top, then type what the purse holds.",
        ask: "How much inside?",
        answer: 700,
        miss: "Count how many pieces of each kind there are, too.",
        win: "Yes, nothing was left out of the total."
      }
    ]
  },
  {
    n: 4,
    concept: "One amount, many ways to pay",
    conceptId: "M1.S1.T2.C8",
    objectiveIds: ["O2"],
    says: ["Pay the price on the tag. Can you pay it a different way?"],
    steps: [
      { say: "The tray already pays the price, so tap Pay again to clear it.", on: "pay-again", hint: "Tap the Pay again key." },
      { say: "Now tap a coin with 20 on it to put it in the tray.", on: "put-c20", hint: "Find the coin with the 20." },
      { say: "Tap a coin with 10 on it to reach the price again.", on: "put-c10", hint: "Find the coin with the 10." }
    ],
    ladder: ["Say the price and what the tray holds, then compare them.", "The Total must equal the price, with any notes and coins."],
    closing: "One price can be paid with different notes and coins.",
    learned: "You learned: one price can be paid in many ways",
    traceback: "The Total stays amber against the price until the two are equal; a first way waits beside the tray.",
    items: [
      /* learn CM4: two ways to pay ₹130 (made on the working area: the tray) */
      {
        qid: "M1.S1.T2.C8:CM4",
        kind: "pay",
        pad: "enter",
        sc: { price: 130, mode: "two" },
        say: "Pay the amount on the tag, press Pay again, then pay it another way.",
        ask: "Pay it two ways",
        answer: "pay-two-ways",
        miss: "Press Pay again after one way, then find a second way.",
        win: "Yes, both ways pay the same price.",
        ladder: ["Each way must make the Total equal to the price.", "A second way uses different notes and coins, so press Pay again first."]
      },
      /* practice 4: one way to pay ₹85 */
      {
        qid: "M1.S1.T2.C8:4",
        kind: "pay",
        pad: "enter",
        sc: { price: 85, mode: "one" },
        say: "Look at the price tag and pay that amount with notes and coins.",
        ask: "Pay the amount",
        answer: "pay-exactly",
        miss: "Compare the Total tag with the price tag.",
        win: "Yes, that money pays the amount on the tag."
      },
      /* practice 8: ₹175 with exactly 3 notes and 1 coin (100 + 50 + 20 + 5) */
      {
        qid: "M1.S1.T2.C8:8",
        kind: "pay",
        pad: "enter",
        sc: { price: 175, mode: "three1" },
        say: "Pay the tag amount with exactly 3 notes and 1 coin.",
        ask: "3 notes, 1 coin",
        answer: "pay-3-notes-1-coin",
        miss: "Count the notes and the coin you have used so far.",
        win: "Yes, the tag is paid with just those pieces.",
        ladder: ["Start with the biggest note that fits under the price.", "Add up the notes first, then pick one coin to finish."]
      }
      /* practice 6 (which two of A, B, C pay ₹36) is the unused plan question: the phase keeps three */
    ]
  }
];
const MODEL = {
  scene: "A shop counter: an open purse at the bottom left, the notes and coins lying on the counter to its right, the money tray in the centre with one row per denomination (value chip, pieces, sky-blue count, green subtotal) and a separate Total line, and, in the paying phase and Free play, one price tag showing the amount to pay. No hands, people or faces; nothing is completed for the child.",
  notes: [500, 200, 100, 50, 20, 10],
  coins: [20, 10, 5, 2, 1],
  freePrices: FREE_PRICES,
  trays: { "M1.S1.T2.C6:5": { a: 3 * 200, b: 7 * 100 } },
  prices: { "M1.S1.T2.C8:CM4": 130, "M1.S1.T2.C8:4": 85, "M1.S1.T2.C8:8": 175 },
  ways: { "M1.S1.T2.C8:CM4": ["n100,n20,c10", "n50x2,n20,c10"], "M1.S1.T2.C8:4": ["n50,n20,c10,c5"], "M1.S1.T2.C8:8": ["n100,n50,n20,c5"] }
};
const mlPayOk = (item, m) => mlSum(m) === item.sc.price && (item.sc.mode !== "three1" || mlCnt(m, "n") === 3 && mlCnt(m, "c") === 1);
const judge = (item, v) => {
  if (item.kind === "order") return String(v) === "n10,n50,n200,n500";
  if (item.kind === "pay") {
    const ws = String(v).split("|").filter((x) => x).map(mlParse);
    if (!ws.length || !ws.every((m) => mlPayOk(item, m))) return false;
    return item.sc.mode === "two" ? new Set(ws.map(mlSig)).size >= 2 : true;
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
const oracle = () => PHASES.every((p) => p.items.every((it) => {
  const sc = it.sc;
  if (!sc) return false;
  const jump = (kind, n) => {
    let t = 0;
    for (let i = 0; i < n; i++) t += ML_V[kind];
    return t;
  };
  if (it.kind === "pile") return it.answer === jump(sc.kind, sc.n);
  if (it.kind === "trays") return it.answer === jump(sc.b.kind, sc.b.n) - jump(sc.a.kind, sc.a.n);
  if (it.kind === "purse") return it.answer === Object.keys(sc.has).reduce((t, k) => t + jump(k, sc.has[k]), 0);
  if (it.kind === "pay") return MODEL.ways[it.qid].every((w) => {
    const m = mlParse(w);
    let t = 0;
    Object.keys(m).forEach((k) => {
      t += jump(k, m[k]);
    });
    return t === sc.price;
  });
  if (it.kind === "order") return [...sc.ids].sort((a, b) => ML_V[a] - ML_V[b]).join(",") === "n10,n50,n200,n500";
  return it.kind === "pair" && ML_V[sc.a] === ML_V[sc.b] && (it.choices ? it.answer === "same" : it.answer === ML_V[sc.a]);
}));
const nearMiss = (item) => {
  const sc = item.sc, v = (k) => ML_V[k];
  if (item.kind === "pile") return sc.n + v(sc.kind);
  if (item.kind === "purse") return Object.keys(sc.has).reduce((t, k) => t + v(k), 0);
  if (item.kind === "trays") return Math.abs(sc.a.n + v(sc.a.kind) - (sc.b.n + v(sc.b.kind)));
  if (item.choices) return "note";
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
const answerForms = (item) => typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)];
const agentKey = (item) => item.kind === "pay" ? MODEL.ways[item.qid].join("|") : item.kind === "order" ? "n10,n50,n200,n500" : item.answer;
const HOOK = {};
const solve = (item, T2) => T2.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T2.submit(agentKey(item));
const answer = (item, v) => item.pad === "enter" && HOOK.set ? HOOK.set(v) : void 0;
const check = () => HOOK.check ? HOOK.check() : void 0;
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL: MODEL2, step, stepOn, box, lang = "en", tx = (v) => v }) {
  ML_SK = 0;
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach");
  const sc = free ? ML_FREE : warm ? ML_WARM[n] : item.sc;
  const K = free ? "free" : warm ? sc.k : item.kind;
  const qk = free ? "free" : warm ? "w" + n : n + "." + index;
  const reveal = stage === "win" || stage === "idle";
  const W2 = box && box.w ? box.w : 900;
  const kx = Math.min(box && box.key ? box.key.x - 12 : W2, W2);
  const wide = W2 >= 1200;
  const [raw, setRaw] = useState(() => mlFresh(qk));
  const SR = useRef(raw);
  const S = raw.qk === qk ? raw : mlFresh(qk);
  if (SR.current.qk !== qk) SR.current = S;
  const PX0 = 350, matR = Math.min(kx, W2 - 8), ext = matR < W2 - 8;
  const moneyGone = K === "purse" && Object.keys(sc.has).every((k) => ((S.tray || {})[k] || 0) >= sc.has[k]) || K === "trays" && ((S.tray || {})[sc.a.kind] || 0) >= sc.a.n && ((S.tray || {})[sc.b.kind] || 0) >= sc.b.n;
  const purseN = K === "purse" ? Object.keys(sc.has).reduce((t, k) => t + sc.has[k], 0) : 0;
  const Z0 = 8, ZH = K === "pile" || moneyGone ? 504 : wide ? purseN > 8 ? 292 : 360 : 286, WY = wide ? 374 : 300, WH = 520 - WY;
  const tagW = wide ? 120 : 100, tagH = Math.round(tagW * 150 / 87);
  const sy = Math.max(8, (ZH - 170) / 2), spOff = wide ? 240 : 156, spCx = (PX0 + matR) / 2;
  const put = (p) => {
    const b = SR.current.qk === qk ? SR.current : mlFresh(qk);
    SR.current = { ...b, ...p };
    setRaw(SR.current);
  };
  const busy = useRef(false);
  const acting = useRef(false);
  const lastKey = useRef(0);
  const lastPut = useRef({});
  const nudged = useRef(0);
  const nudgeAt = useRef(0);
  const flyN = useRef(0);
  const geo = useRef({});
  const clearHint = () => {
    try {
      if (api.openAnswer && api.openAnswer()) setTimeout(() => {
        if (api.closeAnswer) api.closeAnswer();
      }, 330);
    } catch (e) {
    }
  };
  const hintUp = () => {
    try {
      const g = window.toolApi && window.toolApi.getState ? window.toolApi.getState() : null;
      return !!(g && g.hint && g.hintKind === "hint");
    } catch (e) {
      return false;
    }
  };
  const nudge = (line, keep = false) => {
    if (stage !== "ask") return;
    if (hintUp()) clearHint();
    nudged.current = keep ? 2 : 1;
    nudgeAt.current = Date.now();
    api.say(line);
  };
  const tray = S.tray;
  const left = (id, total) => total - (tray[id] || 0);
  const walletList = () => {
    if (K === "all11" || K === "free" || K === "pay") return ML_KINDS.map((id) => ({ id, n: 1 }));
    if (K === "pair") return [{ id: sc.a, n: 1 }, { id: sc.b, n: 1 }];
    if (K === "order") return sc.ids.filter((id) => S.placed.indexOf(id) < 0).map((id) => ({ id, n: 1 }));
    if (K === "pile") return [];
    if (K === "trays") return [sc.a, sc.b].map((g) => ({ id: g.kind, n: left(g.kind, g.n) })).filter((x) => x.n > 0);
    if (K === "purse") return KS.filter((k) => sc.has[k]).reduce((a, k) => a.concat(Array.from({ length: sc.has[k] - (tray[k] || 0) }, (_, j) => ({ id: k, n: 1, uid: k + "#" + j, j }))), []);
    return [];
  };
  const ctlId = (it) => K === "pair" || K === "all11" ? "read-" + it.id : K === "order" ? "note-" + it.id : K === "pile" ? "take-" + ((tray[sc.kind] || 0) + 1) : K === "trays" ? "take-" + it.id : K === "purse" ? "kind-" + it.id + (it.j ? "-" + (it.j + 1) : "") : "put-" + it.id;
  const pileGeom = () => {
    const nn = K === "pile" ? sc.n : 0, kd = sc.kind || "n20", note = mlNote(kd), bw = note ? ML_NW : ML_CD;
    const realH = (s0) => note ? bw * s0 * NOTE_A[ML_V[kd]] : ML_CD * s0 * (COIN_R[kd] || 1);
    const xL = PX0 + 14, xR = W2 - 16, cols = wide ? Math.max(nn, 1) : nn <= 4 ? 2 : 4, rowsN = Math.max(1, Math.ceil(nn / cols)), stride = (xR - xL) / cols;
    let s = Math.min(1.9, stride * 0.9 / bw);
    while (s > 0.6 && 100 + rowsN * (realH(s) + 76) > ZH) s -= 0.02;
    const pw = bw * s, ph = realH(s), pad = note ? (ML_NH * s - ph) / 2 : 0, rh2 = ph + 76, py = 100 + Math.max(0, (ZH - 100 - rowsN * rh2) / 2);
    return { s, pw, ph, py, pad, stride, xs: Array.from({ length: nn }, (_, i) => xL + stride * (i % cols) + (stride - pw) / 2), ys: Array.from({ length: nn }, (_, i) => py + Math.floor(i / cols) * rh2) };
  };
  const orderGeom = () => {
    const gap = 16, xL = PX0 + 24, xR = matR - 24, sw = (xR - xL - 3 * gap) / 4, s = Math.min(1.3, sw / ML_NW), pw = ML_NW * s, ph = ML_NH * s;
    return { s, pw, ph, py: Math.max(24, (ZH - ph - 56) / 2), xL, xR, xs: [0, 1, 2, 3].map((i) => xL + i * (sw + gap) + (sw - pw) / 2) };
  };
  const keptW = K === "pay" && S.ways.length ? 336 : 0;
  const hasTag = K === "pay" || K === "free";
  const hitsOf = (s) => {
    const c = K === "pile" ? s.tray[sc.kind] || 0 : 0;
    return s.hit && s.hit.length === c ? s.hit : Array.from({ length: c }, (_, i) => i);
  };
  const rowsR = matR - 8;
  const trayBox = () => ({ x: PX0 + 10, y: 10, w: rowsR - (PX0 + 10) - keptW, h: K === "trays" ? ZH - 20 : ZH - 10 - 76 });
  const rowsOf = (cnt) => KS.filter((k) => cnt[k] > 0);
  const rowH = (nr, tb) => K === "trays" ? moneyGone ? Math.min(190, Math.floor(tb.h / 2)) : Math.min(100, Math.floor(tb.h / 2)) : Math.min(moneyGone ? 120 : 88, Math.floor(tb.h / Math.max(nr, 4)));
  const rowGeom = (cnt, id) => {
    const tb = trayBox(), rs = K === "trays" ? [sc.a.kind, sc.b.kind] : rowsOf(cnt), i = Math.max(0, rs.indexOf(id)), rh = rowH(rs.length, tb);
    const x0 = tb.x, w0 = tb.w, g = mlRowGeom(x0, w0, K === "trays"), y = tb.y + (K === "trays" && moneyGone ? Math.floor((tb.h - 2 * rh) / 2) : 0) + i * rh;
    return { g, y, rh, tb, x0, w0, fan: mlFan(id, Math.max(cnt[id] || 0, 1), g.fanX, y + 3, g.fw, rh - 6, K === "trays" && moneyGone ? 1.7 : 1) };
  };
  const wRaw = walletList();
  const walletW = W2 - 24;
  const PL = 358;
  const isN = (it) => mlNote(it.id);
  const hasChip = K !== "pair" && K !== "order";
  const chipWOf = (it) => {
    const n2 = ("₹" + ML_V[it.id]).length;
    return n2 >= 4 ? 114 : n2 === 3 ? 92 : 72;
  };
  const bandTop = ZH + Z0 + 2, bandEnd = 494;
  const layoutLoose = (list) => {
    const x0 = PL + 8, avail = walletW - x0 - 4, blk = bandEnd - bandTop;
    const bwOf = (it, ns2, cs2) => isN(it) ? ML_NW * ns2 : ML_CD * cs2;
    const stepOf = (it, ns2, cs2, f) => Math.max(bwOf(it, ns2, cs2) * (isN(it) ? f.fn : f.fc), hasChip ? chipWOf(it) + 6 : 0);
    const total = (rl, f, ns2, cs2) => rl.reduce((a, it, i) => a + (i === rl.length - 1 ? Math.max(bwOf(it, ns2, cs2), hasChip ? chipWOf(it) : 0) : stepOf(it, ns2, cs2, f)), 0);
    const fit = (rl, ns2, cs2, av) => {
      const fnMin = Math.max(0.7, 72 / (ML_NW * ns2)), fcMin = Math.max(0.7, 72 / (ML_CD * cs2));
      let f = { fn: 1.06, fc: 1.06 };
      while (total(rl, f, ns2, cs2) > av && (f.fn > fnMin || f.fc > fcMin)) f = f.fn > fnMin ? { fn: Math.max(fnMin, f.fn - 0.03), fc: f.fc } : { fn: f.fn, fc: Math.max(fcMin, f.fc - 0.03) };
      return total(rl, f, ns2, cs2) <= av ? f : null;
    };
    const unit = hasChip ? 42 : 8;
    const capN = (bk) => (bk - unit) / ML_NH, capC = (bk) => (bk - unit) / (ML_CD * 1.04);
    let ns = 1, cs = 1, fs = [], rowsL = [], packed = false;
    for (const lv of [[1.45, 1.14], [1.3, 1.08], [1.15, 1], [1, 0.9], [0.9, 0.8], [0.8, 0.72]]) {
      const n1 = Math.min(lv[0], capN(blk)), c1 = Math.min(lv[1], capC(blk));
      const r0 = fit(list, n1, c1, avail);
      if (r0) {
        ns = n1;
        cs = c1;
        fs = [r0];
        rowsL = [list];
        break;
      }
    }
    if (!rowsL.length) {
      const n2 = Math.min(1, capN(blk / 2)), c2 = Math.min(0.9, capC(blk / 2)), sp = [list.filter(isN), list.filter((it) => !isN(it))].filter((rl) => rl.length), f2 = sp.map((rl) => fit(rl, n2, c2, avail));
      if (f2.every(Boolean)) {
        ns = n2;
        cs = c2;
        fs = f2;
        rowsL = sp;
      } else packed = true;
    }
    const out = [];
    let rowsOut = [];
    if (!packed) {
      rowsOut = rowsL.map((rl, r) => {
        let x = x0;
        return rl.map((it, i) => {
          const bw = bwOf(it, ns, cs), last = i === rl.length - 1, step2 = last ? Math.max(bw, hasChip ? chipWOf(it) : 0) : stepOf(it, ns, cs, fs[r]), hw = Math.max(72, step2);
          const o = { it, x, bw, hx: x, hw, chipX: x + (last ? hw : step2) / 2, chipW: hasChip ? chipWOf(it) : 0 };
          x += step2;
          return o;
        });
      });
    } else {
      const grpW = (rl) => {
        let w = 0, i = 0;
        while (i < rl.length) {
          let j = i;
          while (j < rl.length && rl[j].id === rl[i].id) j++;
          w += Math.max((j - i) * 72, hasChip ? chipWOf(rl[i]) : 0);
          i = j;
        }
        return w;
      };
      const rr = [[]];
      list.forEach((it) => {
        const cur = rr[rr.length - 1];
        if (cur.length && grpW(cur.concat([it])) > avail) rr.push([it]);
        else cur.push(it);
      });
      const R2 = rr.length;
      ns = Math.min(1, capN(blk / R2), 96 / ML_NW);
      cs = Math.min(0.9, capC(blk / R2), 72 / ML_CD);
      rowsOut = rr.map((rl) => {
        const o2 = [];
        let x = x0, i = 0;
        while (i < rl.length) {
          let j = i;
          while (j < rl.length && rl[j].id === rl[i].id) j++;
          const n2 = j - i, gw = Math.max(n2 * 72, hasChip ? chipWOf(rl[i]) : 0), hwEach = n2 === 1 ? gw : 72;
          for (let k = i; k < j; k++) {
            const bw = bwOf(rl[k], ns, cs), hx = x + (k - i) * 72;
            o2.push({ it: rl[k], x: hx + (hwEach - bw) / 2, bw, hx, hw: hwEach, chipX: x + gw / 2, chipW: k === i && hasChip ? chipWOf(rl[i]) : 0, hideChip: k !== i });
          }
          x += gw;
          i = j;
        }
        return o2;
      });
      rowsL = rr;
    }
    const R = rowsOut.length, rowBlk = blk / R;
    rowsOut.forEach((ro, r) => {
      const bhMax = Math.max(...ro.map((q) => isN(q.it) ? ML_NH * ns : ML_CD * cs * 1.04)), blockH = bhMax + (hasChip ? 42 : 0);
      const top = bandTop + r * rowBlk + Math.max(0, (rowBlk - blockH) / 2), cy = top + bhMax / 2, chipY = top + bhMax + 6;
      const hy = R > 1 ? bandTop + r * rowBlk : cy - Math.max(36, bhMax / 2);
      const hEnd = R > 1 ? r === R - 1 ? chipY + 44 : bandTop + (r + 1) * rowBlk - 1 : hasChip ? chipY + 44 : cy + Math.max(36, bhMax / 2);
      ro.forEach((q) => {
        const sS = isN(q.it) ? ns : cs, bh = (isN(q.it) ? ML_NH : ML_CD) * sS;
        out.push({ ...q.it, two: R > 1, m: 1, st: 0, s: sS, bw: q.bw, bh, w: q.bw, x: q.x, y: cy - bh / 2, hx: q.hx, hy, hw: q.hw, hh: hEnd - hy, top: { x: q.x, y: cy - bh / 2 }, chipX: q.chipX, chipY, chipW: q.chipW, hideChip: !!q.hideChip, row: r });
      });
    });
    return out;
  };
  const layoutStacks = (list) => {
    const pad = 24, Wc = walletW, blk = bandEnd - bandTop;
    const gapOf = (s2) => s2 < 1 ? 12 : 16;
    const wOf = (it, s2) => (mlNote(it.id) ? ML_NW : ML_CD) * s2 + (Math.min(it.n, 8) - 1) * (mlNote(it.id) ? 34 : 28) * s2;
    const tot = (s2) => list.reduce((a, it) => a + wOf(it, s2), 0) + gapOf(s2) * Math.max(list.length - 1, 0) + 2 * pad;
    const sw = tot(1) <= Wc ? 1 : Math.max(0.6, (Wc - 2 * pad) / Math.max(tot(1) - 2 * pad, 1)), s = Math.min(sw, (blk - 42) / ML_NH), gap = gapOf(s);
    const rw = list.reduce((a, it) => a + wOf(it, s), 0) + gap * Math.max(list.length - 1, 0);
    let x = Math.max(PL + 8, (Wc - rw) / 2);
    const bhMax = Math.max(...list.map((it) => (mlNote(it.id) ? ML_NH : ML_CD * 1.04) * s)), top = bandTop + Math.max(0, (blk - bhMax - 42) / 2), cy = top + bhMax / 2, chipY = top + bhMax + 6;
    return list.map((it) => {
      const bw = (mlNote(it.id) ? ML_NW : ML_CD) * s, bh = (mlNote(it.id) ? ML_NH : ML_CD) * s, st = (mlNote(it.id) ? 34 : 28) * s, m = Math.min(it.n, 8);
      const w = wOf(it, s), hw = Math.max(w, 72), hy = cy - Math.max(36, bhMax / 2), o = { ...it, two: false, m, st, s, bw, bh, w, x, y: cy - bh / 2, hx: x - (hw - w) / 2, hy, hw, hh: chipY + 36 + 8 - hy, top: { x: x + (m - 1) * st, y: cy - bh / 2 }, chipX: x + w / 2, chipY, chipW: Math.max(chipWOf(it), 92) };
      x += w + gap;
      return o;
    });
  };
  const layoutWallet = (list) => list.length && list.every((it) => it.n === 1) ? layoutLoose(list) : layoutStacks(list);
  const launch = (id, from, to, s0, s1, land) => {
    const cur = SR.current.fly;
    if (cur && cur.land) {
      cur.land();
    }
    if (reducedMotion()) {
      land();
      return;
    }
    const k = ++flyN.current, f = { k, id, from, to, s0, s1, go: false, land };
    put({ fly: f });
    setTimeout(() => {
      const c = SR.current.fly;
      if (SR.current.qk === qk && c && c.k === k) put({ fly: { ...c, go: true } });
    }, 30);
    setTimeout(() => {
      const c = SR.current.fly;
      if (SR.current.qk === qk && c && c.k === k) {
        put({ fly: null });
        land();
      }
    }, 480);
  };
  const trayFull = (id) => {
    const t0 = SR.current.tray || {}, nk = Object.keys(t0).length;
    return (t0[id] || 0) >= 9 || !t0[id] && nk >= 6;
  };
  const dispatchAct = (name) => {
    if (stage === "demo") api.did(name);
  };
  const tapRead = (id, from = null, s0 = 1) => {
    if (acting.current) return;
    const cur = SR.current, off = spOff, note = mlNote(id);
    const mark = () => {
      put({ read: { ...SR.current.read, [id]: true }, [note ? "slotN" : "slotC"]: id, touched: true, carry: "" });
      api.sfx.tick();
      dispatchAct("read-" + id);
    };
    if (K !== "all11" || !from || cur.read[id] || reducedMotion()) {
      mark();
      return;
    }
    const bw = (note ? ML_NW : ML_CD) * 1.5, bh = (note ? ML_NH : ML_CD) * 1.5, cx = spCx + (note ? -off : off);
    put({ carry: id });
    launch(id, from, { x: cx - bw / 2, y: Z0 + sy + (112 - bh) / 2 }, s0, 1.5, mark);
  };
  const tapNote = (id, from) => {
    if (acting.current) return;
    const p = SR.current.placed;
    if (p.indexOf(id) >= 0) {
      put({ placed: p.filter((x) => x !== id), touched: true });
      api.sfx.tick();
      return;
    }
    const og = orderGeom();
    launch(id, from, { x: og.xs[p.length], y: Z0 + og.py }, 1, og.s, () => {
      put({ placed: [...SR.current.placed.filter((x) => x !== id), id], touched: true });
      api.sfx.tick();
    });
  };
  const tapTake = (id, from, s0) => {
    if (acting.current) return;
    const cnt = SR.current.tray[id] || 0, total = K === "pile" ? sc.n : id === sc.a.kind ? sc.a.n : sc.b.n;
    if (cnt >= total) return;
    const now = Date.now();
    const name = "take-" + (K === "pile" ? cnt + 1 : id);
    let to, s1 = 1;
    if (K === "pile") {
      const pg = pileGeom();
      to = { x: pg.xs[cnt], y: Z0 + pg.ys[cnt] };
      s1 = pg.s;
    } else {
      const rg = rowGeom({ ...SR.current.tray, [id]: cnt + 1 }, id);
      const c = rg.fan.cs[cnt];
      to = { x: c ? c.x : rg.fan.x, y: Z0 + rg.fan.y + (rg.fan.h - rg.fan.ph) / 2 };
      s1 = rg.fan.s;
    }
    dispatchAct(name);
    launch(id, from, to, s0, s1, () => {
      const c0 = SR.current.tray;
      put({ tray: { ...c0, [id]: (c0[id] || 0) + 1 }, touched: true });
      api.sfx.tick();
    });
  };
  const tapPiece3 = (id, from, s0) => {
    if (acting.current) return;
    const c = SR.current.tray[id] || 0, now = Date.now();
    if (c >= sc.has[id]) return;
    const nt = { ...SR.current.tray, [id]: c + 1 };
    const rg = rowGeom(nt, id), cc = rg.fan.cs[c];
    dispatchAct("kind-" + id);
    launch(id, from, { x: cc ? cc.x : rg.fan.x, y: Z0 + rg.fan.y + (rg.fan.h - rg.fan.ph) / 2 }, s0, rg.fan.s, () => {
      const t0 = SR.current.tray;
      put({ tray: { ...t0, [id]: (t0[id] || 0) + 1 }, touched: true });
      api.sfx.tick();
    });
  };
  const tapRow = (k) => {
    const cur = SR.current, rs = rowsOf(cur.tray);
    if (cur.counted >= rs.length || rs[cur.counted] !== k) return;
    lastPut.current.row = Date.now();
    put({ counted: cur.counted + 1, touched: true });
    api.sfx.settle();
    dispatchAct("count-" + k);
  };
  const tapPiece = (i) => {
    if (acting.current) return;
    const cur = SR.current, hs = hitsOf(cur);
    if (hs.indexOf(i) >= 0 || hs.length >= sc.n) return;
    const nh = [...hs, i];
    put({ hit: nh, tray: { [sc.kind]: nh.length }, touched: true, rewound: false });
    api.sfx.tick();
    dispatchAct("tap-" + nh.length);
  };
  const tapPut = (id, from, s0) => {
    if (acting.current) return;
    const c = SR.current.tray[id] || 0, now = Date.now();
    if (trayFull(id)) {
      if (stage === "demo") api.did("put-" + id);
      else if (stage === "ask") nudge("The tray is full, press Pay again.");
      else api.say("The tray is full, press Pay again.");
      return;
    }
    const nt = { ...SR.current.tray, [id]: c + 1 };
    const rg = rowGeom(nt, id), cc = rg.fan.cs[c];
    dispatchAct("put-" + id);
    launch(id, from, { x: cc ? cc.x : rg.fan.x, y: Z0 + rg.fan.y + (rg.fan.h - rg.fan.ph) / 2 }, s0, rg.fan.s, () => {
      const t0 = SR.current.tray, t1 = { ...t0, [id]: (t0[id] || 0) + 1 }, pr = priceNow;
      put({ tray: t1, touched: true, note: "", cand: pr > 0 && mlSum(t1) === pr ? mlSig(t1) : SR.current.cand });
      api.sfx.tick();
    });
  };
  const onDrop = (pid, p, moved) => {
    if (acting.current) return;
    if (reveal) return;
    if (moved && p && isFinite(p.x) && (p.y < -10 || p.y > 530 || p.x < -10 || p.x > W2 + 10)) return;
    const it = wl.filter((w) => (w.uid || w.id) === pid)[0];
    if (!it) return;
    if (stage === "demo" && stepOn && ctlId(it) !== stepOn) {
      api.did(ctlId(it));
      return;
    }
    {
      const nowP = Date.now(), lp = lastPut.current.pos, px = p && isFinite(p.x) ? p.x : null, py = p && isFinite(p.y) ? p.y : null;
      if (lp && nowP - lp.t < 150 && (px === null || lp.x === null || Math.abs(px - lp.x) < 12 && Math.abs(py - lp.y) < 12)) return;
      lastPut.current.pos = { t: nowP, x: px, y: py };
    }
    {
      const pf = SR.current.fly;
      if (pf && pf.land) {
        put({ fly: null });
        pf.land();
      }
    }
    const id = it.id, from = it.top, s0 = it.s;
    if (K === "pair" || K === "all11") tapRead(id, from, s0);
    else if (K === "order") tapNote(id, from);
    else if (K === "trays") tapTake(id, from, s0);
    else if (K === "purse") tapPiece3(id, from, s0);
    else tapPut(id, from, s0);
  };
  const D = useDrag(onDrop);
  const wl = layoutWallet(wRaw);
  const priceNow = free ? FREE_PRICES[(S.fp || 0) % FREE_PRICES.length] : sc.price || 0;
  const price = priceNow;
  const ruleOk = (m) => sc.mode !== "three1" || mlCnt(m, "n") === 3 && mlCnt(m, "c") === 1;
  const exactOf = (s) => price > 0 && Object.keys(s.tray).length > 0 && mlSum(s.tray) === price && ruleOk(s.tray);
  const exact = (K === "pay" || K === "free") && exactOf(S);
  const ruleMiss = K === "pay" && price > 0 && Object.keys(tray).length > 0 && mlSum(tray) === price && !ruleOk(tray);
  const payAgain = () => {
    if (reveal) return;
    if (stage === "demo" && stepOn !== "pay-again") {
      api.did("pay-again");
      return;
    }
    const cur = SR.current;
    const use = K === "pay" && sc.mode === "two" ? exactOf(cur) ? mlSig(cur.tray) : cur.cand : "";
    const keep = !!use && cur.ways.indexOf(use) < 0;
    put({ ways: keep ? [...cur.ways, use] : cur.ways, tray: {}, note: "", cand: "", touched: true, fly: null, lastSent: "", keptHint: false });
    api.sfx.settle();
    if (free) api.say(FREE_LINE);
    dispatchAct("pay-again");
  };
  const pressKey = (fn) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    fn();
  };
  const act = (on) => {
    const it = wl.filter((w) => "read-" + w.id === on || "kind-" + w.id === on || "put-" + w.id === on || "take-" + w.id === on || ctlId(w) === on)[0];
    if (on === "pay-again") payAgain();
    else if (/^tap-\d+$/.test(on)) {
      const hs = hitsOf(SR.current);
      for (let j = 0; j < sc.n; j++) if (hs.indexOf(j) < 0) {
        tapPiece(j);
        break;
      }
    } else if (/^count-/.test(on)) tapRow(on.slice(6));
    else if (it) onDrop(it.uid || it.id, { x: NaN, y: NaN }, false);
  };
  const mkSig = (s) => {
    if (K === "order") return s.placed.length === 4 ? s.placed.join(",") : "";
    if (K === "pay") {
      const parts = s.ways.slice(), t = mlSig(s.tray);
      if (sc.mode === "two" && s.cand && !exactOf(s) && parts.indexOf(s.cand) < 0) parts.push(s.cand);
      if (t && exactOf(s) && parts.indexOf(t) < 0) parts.push(t);
      else if (!parts.length && t) parts.push(t);
      return parts.join("|");
    }
    return "";
  };
  const onEnterAsk = () => {
    const s = SR.current;
    if (K === "pay" && sc.mode === "two") {
      if (exactOf(s) && s.ways.length === 0) {
        put({ keptHint: true });
        nudge("That is one way. Now press Pay again and pay it another way.");
        return;
      }
      if (!Object.keys(s.tray).length && s.ways.length === 1) {
        nudge("One way is kept, so pay the price a different way.");
        return;
      }
    }
    const sig = mkSig(s);
    if (!sig) {
      nudge(K === "order" ? "Put all four notes in the row first." : "Put some notes or coins in the tray first.");
      return;
    }
    if (K === "pay" && sc.mode === "two" && exactOf(s) && s.ways.indexOf(mlSig(s.tray)) >= 0) {
      nudge("That is the same way, so try a different set of notes and coins.");
      return;
    }
    if (sig === s.lastSent) return;
    put({ lastSent: sig });
    api.submit(sig);
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : stage === "ask" && item.pad === "enter" ? onEnterAsk : null);
  const nKinds = K === "purse" ? Object.keys(sc.has).length : 0;
  const isDone = (s) => K === "pair" ? !!(s.read[sc.a] && s.read[sc.b]) : K === "order" ? s.placed.length === 4 : K === "pile" ? (s.tray[sc.kind] || 0) >= sc.n : K === "trays" ? (s.tray[sc.a.kind] || 0) >= sc.a.n && (s.tray[sc.b.kind] || 0) >= sc.b.n : K === "purse" ? s.counted >= nKinds && Object.keys(sc.has).every((k) => (s.tray[k] || 0) >= sc.has[k]) : false;
  const actDone = S.done || isDone(S);
  const finishAct = () => {
    if (K === "pair") put({ read: { [sc.a]: true, [sc.b]: true }, slotN: mlNote(sc.a) ? sc.a : sc.b, slotC: mlNote(sc.a) ? sc.b : sc.a, touched: true });
    else if (K === "pile") put({ tray: { [sc.kind]: sc.n }, hit: Array.from({ length: sc.n }, (_, i) => i), touched: true });
    else if (K === "trays") put({ tray: { [sc.a.kind]: sc.a.n, [sc.b.kind]: sc.b.n }, touched: true });
    else if (K === "purse") put({ tray: { ...sc.has }, counted: nKinds, touched: true });
  };
  HOOK.check = stage === "ask" ? () => {
    if (!isDone(SR.current)) finishAct();
    return void 0;
  } : void 0;
  HOOK.set = stage === "ask" && item.pad === "enter" ? (v) => {
    if (K === "order") {
      const ids = String(v).split(",").filter((x) => ML_V[x]);
      if (ids.length !== 4) return false;
      put({ placed: ids, touched: true });
      return true;
    }
    if (K === "pay") {
      const ws = String(v).split("|").filter((x) => x);
      if (!ws.length) return false;
      put({ ways: ws.slice(0, -1), tray: mlParse(ws[ws.length - 1]), touched: true });
      return true;
    }
    return false;
  } : void 0;
  useEffect(() => {
    if (busy.current || stage !== "ask" || item.pad === "enter") return;
    api.lock(!!(S.touched && !actDone));
    return () => {
      if (!busy.current) api.lock(false);
    };
  }, [stage, qk, S.touched, actDone]);
  useEffect(() => {
    if (isDone(S) && !S.done && stage === "ask") put({ done: true });
  }, [actDone, stage]);
  const trayWays = S.ways.concat(exact ? [mlSig(tray)] : S.cand && S.ways.indexOf(S.cand) < 0 ? [S.cand] : []);
  const ready = K === "order" ? S.placed.length === 4 : K === "pay" ? sc.mode === "two" ? new Set(trayWays).size >= 2 : sc.mode === "three1" ? exact && mlCnt(tray, "n") === 3 && mlCnt(tray, "c") === 1 : exact : false;
  useEffect(() => {
    if (stage === "ask" && item.pad === "enter") api.answerReady(!!ready);
  }, [ready, qk, stage]);
  useEffect(() => {
    if (nudged.current && Date.now() - nudgeAt.current < 2e3) return;
    if (nudged.current === 2) {
      nudged.current = 1;
      return;
    }
    if (nudged.current === 1) {
      nudged.current = 0;
      if (stage === "ask") api.say(item.say);
      return;
    }
    if (stage === "ask" && item.pad === "enter" && !busy.current && !acting.current) {
      const g = window.toolApi && window.toolApi.getState ? window.toolApi.getState() : null;
      if (g && g.hint && g.hintKind !== "type") clearHint();
    }
  }, [mlSig(tray), S.placed.join(","), S.ways.join("|"), S.counted, S.hit.length]);
  useEffect(() => {
    if (SR.current.lastSent || SR.current.keptHint) put({ lastSent: "", keptHint: false });
  }, [mlSig(tray), S.placed.join(","), S.ways.join("|")]);
  useEffect(() => {
    if (K === "free" && stage === "free" && S.freeMsg && Object.keys(tray).length) {
      api.say(FREE_LINE);
      put({ freeMsg: false });
    }
  }, [mlSig(tray)]);
  const overPrice = K === "free" && price > 0 && mlSum(tray) > price;
  useEffect(() => {
    if (K !== "free" || stage !== "free") return;
    if (exact) api.say("Paid the exact price!");
    else if (overPrice) api.say("That is more than the price.");
  }, [exact, overPrice]);
  useEffect(() => {
    if (!(stage === "win" || stage === "idle") || free || warm) return;
    if (K === "pile") put({ tray: { [sc.kind]: sc.n } });
    else if (K === "trays") put({ tray: { [sc.a.kind]: sc.a.n, [sc.b.kind]: sc.b.n } });
    else if (K === "purse") put({ tray: { ...sc.has }, counted: nKinds });
    else if (K === "pair") put({ read: { [sc.a]: true, [sc.b]: true }, slotN: mlNote(sc.a) ? sc.a : sc.b, slotC: mlNote(sc.a) ? sc.b : sc.a });
    else if (K === "pay") {
      const s = SR.current, tw = s.ways.concat(exactOf(s) ? [mlSig(s.tray)] : []);
      const good = sc.mode === "two" ? new Set(tw).size >= 2 : sc.mode === "three1" ? exactOf(s) && mlCnt(s.tray, "n") === 3 && mlCnt(s.tray, "c") === 1 : exactOf(s);
      if (good) put({ note: "" });
      else {
        const m = MODEL2.ways[item.qid];
        put({ ways: m.slice(0, -1), tray: mlParse(m[m.length - 1]), note: "", cand: "" });
      }
    }
    if (stage === "win" && item.win) api.say(item.win);
  }, [stage]);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    busy.current = true;
    api.lock(true);
    const fin = () => {
      busy.current = false;
      api.lock(false);
    };
    const L = [];
    put({ fly: null });
    if (K === "pair") {
      L.push([450, () => put({ ring: true })], [900, () => {
      }]);
    } else if (K === "order") {
      const asc = [...sc.ids].sort((a, b) => ML_V[a] - ML_V[b]);
      L.push([300, () => put({ placed: [] })]);
      for (let i = 1; i < asc.length; i++) L.push([550, () => put({ placed: asc.slice(0, i) })]);
      L.push([450, () => {
      }]);
    } else if (K === "pile") {
      L.push([300, () => put({ tray: {}, hit: [] })]);
      for (let i = 1; i < sc.n; i++) L.push([450, () => put({ tray: { [sc.kind]: i }, hit: Array.from({ length: i }, (_, j) => j) })]);
      L.push([400, () => put({ rewound: true })]);
    } else if (K === "trays") {
      L.push([300, () => put({ tray: {} })]);
      for (let i = 1; i <= sc.a.n; i++) L.push([i === sc.a.n ? 600 : 220, () => put({ tray: { [sc.a.kind]: i } })]);
      for (let i = 1; i <= sc.b.n; i++) L.push([i === sc.b.n ? 600 : 220, () => put({ tray: { [sc.a.kind]: sc.a.n, [sc.b.kind]: i } })]);
    } else if (K === "purse") {
      const ks = KS.filter((k) => sc.has[k]);
      L.push([300, () => put({ tray: {}, counted: 0 })], [700, () => put({ tray: { ...sc.has }, counted: 0 })]);
      for (let i = 1; i < ks.length; i++) L.push([800, () => put({ counted: i })]);
      L.push([500, () => {
      }]);
    } else if (K === "pay") {
      const cur = SR.current, sig = mlSig(cur.tray);
      if (sc.mode === "two" && exactOf(cur)) {
        L.push([700, () => put({ ways: cur.ways.indexOf(sig) < 0 ? [...cur.ways, sig] : cur.ways, tray: {}, note: "" })], [500, () => {
        }]);
      } else {
        const t = mlSum(cur.tray);
        L.push([1200, () => put({ note: t < price ? "needs more" : t > price ? "too much" : "" })]);
      }
    }
    tl.run(L, fin);
  }, [wrong]);
  useEffect(() => () => {
    tl.stop();
    busy.current = false;
    acting.current = false;
  }, [qk]);
  const invFor = (id, x, y, w, h) => stepOn === id && stage === "demo" ? <Invite key={"inv" + id} x={x + w / 2} y={y + h / 2} w={w} h={h} rx={14} C={C} /> : null;
  const lab = (id) => mlNote(id) ? "₹" + ML_V[id] + " note" : "₹" + ML_V[id] + " coin";
  const walletEls = [];
  const pW = 330, pH = Math.round(pW * 180 / 277), pX = 6, pY = 520 - pH - 4;
  const purseEl = mlPurse(pX, pY, pW, "udg-mouth");
  if (wl.length) walletEls.push(<rect key="plate" x={PL - 2} y={bandTop - 4} width={walletW - PL + 6} height={bandEnd + 14 - bandTop} rx={24} fill="#FFF3DC" fillOpacity={0.5} pointerEvents="none" />);
  wl.forEach((it) => {
    const id = ctlId(it), pid = it.id, uid = it.uid || it.id;
    const dragging = D.drag && D.drag.payload === uid;
    const litR = (K === "pair" || K === "all11") && !!S.read[pid];
    walletEls.push(<g key={"wv" + uid} pointerEvents="none" style={{ opacity: dragging ? 0.35 : S.carry === pid ? 0.3 : 1 }}>
      {Array.from({ length: it.m }, (_, i) => <g key={i}>{mlPiece(pid, it.x + i * it.st, it.y, it.s, { label: i === it.m - 1, lit: litR, skin: true, uni: K === "pair" || K === "order" })}</g>)}
    </g>);
    walletEls.push(
      <g key={"w" + uid} {...control(id, lab(pid) + (it.n > 1 ? " x " + it.n : ""))} {...D.bind(uid)} {...D.keys(uid)} style={{ cursor: "grab" }}>
        <rect x={it.hx} y={it.hy} width={it.hw} height={it.hh} fill="transparent" />
      </g>
    );
    if (K !== "pair" && K !== "order" && !it.hideChip) walletEls.push(<g key={"v" + uid} pointerEvents="none">{mlTag(it.chipX - it.chipW / 2, it.chipY, it.chipW, 36, ML_AMB, "₹" + ML_V[pid], T.label, true, true)}</g>);
    if (it.n > 1) walletEls.push(<g key={"b" + uid} pointerEvents="none">{mlTag(it.x + it.w - 52, it.y - 18, 72, 38, ML_SKY, "×" + it.n, T.label)}</g>);
    if (stepOn === id && stage === "demo") walletEls.push(invFor(id, it.hx + 12, it.hy, it.hw - 24, it.hh - 8));
  });
  const zone = [];
  const band = [];
  zone.push(<rect key="mat" x={PX0} y={0} width={matR - PX0} height={ZH} rx={RAD.panel} fill="#F3E2BF" stroke={exact ? ML_GRN : "#B9965F"} strokeWidth={exact ? 7 : 3} filter="url(#udgam-shadow-soft)" />);
  if (ext) zone.push(<g key="mat2"><rect x={matR - RAD.panel - 4} y={88 - Z0} width={W2 - 8 - matR + RAD.panel + 4} height={ZH - 88 + Z0} fill="#F3E2BF" /><line x1={matR} y1={88 - Z0} x2={W2 - 8} y2={88 - Z0} stroke="#B9965F" strokeWidth={3} /><line x1={W2 - 8} y1={88 - Z0} x2={W2 - 8} y2={ZH} stroke="#B9965F" strokeWidth={3} /><line x1={matR - RAD.panel - 4} y1={ZH} x2={W2 - 8} y2={ZH} stroke="#B9965F" strokeWidth={3} /></g>);
  if (K === "all11" || K === "pair") {
    const sN = 1.5, sC = 1.5, cxN = spCx - spOff, cxC = spCx + spOff;
    const idN = K === "pair" ? mlNote(sc.a) ? sc.a : sc.b : S.slotN, idC = K === "pair" ? mlNote(sc.a) ? sc.b : sc.a : S.slotC;
    const both = idN && idC && S.read[idN] && S.read[idC];
    const slot = (id, cx, s, word, nm) => {
      const bw = (id && mlNote(id) || !id && word === "Note" ? ML_NW : ML_CD) * s, bh = (id && mlNote(id) || !id && word === "Note" ? ML_NH : ML_CD) * s;
      const x = cx - bw / 2, y = sy + (112 - bh) / 2;
      if (!id) return <g key={"sl" + word}><rect x={x} y={y} width={bw} height={bh} rx={14} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />
        <text x={cx} y={y + bh / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.dim === "#9AA4AC" ? "#6F685C" : C.dim} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{tx(word)}</text></g>;
      const rd = !!S.read[id] || S.ring;
      return <g key={"sl" + word}>
          <g style={{ transition: "transform 260ms ease-out" }}>{mlPiece(id, x, y, s, { lit: rd, uni: K === "pair" })}</g>
          <Hit id={nm} x={x} y={y} w={bw} h={bh} label={lab(id)} onPress={() => {
        if (stage === "demo" && stepOn !== "read-" + id) api.did(nm);
        else tapRead(id);
      }} />
          {S.read[id] ? mlTag(cx - 70, sy + 118, 140, 44, ML_AMB, "₹" + ML_V[id], T.prompt) : mlTag(cx - 70, sy + 118, 140, 44, ML_AMB, null, T.prompt, false)}
        </g>;
    };
    zone.push(slot(idN, cxN, sN, "Note", "spot-note"), slot(idC, cxC, sC, "Coin", "spot-coin"));
    if (reveal && K === "pair" && both && ML_V[idN] === ML_V[idC]) zone.push(<text key="eq" data-reveals="answer" x={spCx} y={sy + 76} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ML_AMB === "" ? "" : "#6B3A00"} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>=</text>);
    if (free || warm && both && idN && idC && ML_V[idN] === ML_V[idC]) zone.push(<text key="eq2" x={spCx} y={sy + 76} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill="#6B3A00" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>=</text>);
  } else if (K === "order") {
    const og = orderGeom();
    [0, 1, 2, 3].forEach((i) => {
      const id = S.placed[i], x = og.xs[i];
      zone.push(<rect key={"sl" + i} x={x - 8} y={og.py - 8} width={og.pw + 16} height={og.ph + 16} rx={16} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />);
      if (id) zone.push(<g key={"pl" + id}>{mlPiece(id, x, og.py, og.s, {})}<Hit id={"placed-" + id} x={x} y={og.py} w={og.pw} h={Math.max(og.ph, 72)} label={lab(id)} onPress={() => {
        if (stage === "demo") api.did("placed-" + id);
        else tapNote(id, null);
      }} /></g>);
    });
    zone.push(<text key="lo" x={og.xL} y={og.py + og.ph + (lang === "en" ? 48 : 58)} fontSize={T.prompt} fontWeight={700} fill={C.ink} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{tx("Least")}</text>);
    zone.push(<text key="gr" x={og.xR} y={og.py + og.ph + (lang === "en" ? 48 : 58)} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{tx("Greatest")}</text>);
  } else if (K === "pile") {
    const pg = pileGeom(), hs = hitsOf(S), placed = hs.length, v = ML_V[sc.kind];
    zone.push(<g key="vtag">{mlTag(PX0 + 16, 14, 150, 46, ML_AMB, "₹" + v, T.prompt)}</g>);
    zone.push(<g key="ctag">{placed > 0 ? mlTag(PX0 + 178, 14, 120, 46, ML_SKY, "× " + placed, T.prompt) : mlTag(PX0 + 178, 14, 120, 46, ML_SKY, null, T.prompt, false)}</g>);
    for (let i = 0; i < sc.n; i++) {
      const x = pg.xs[i], rank = hs.indexOf(i), yy = pg.ys[i], tY = yy + pg.ph + 10;
      if (rank < 0) {
        zone.push(<g key={"p" + i}>{mlPiece(sc.kind, x, yy - pg.pad, pg.s, {})}{S.rewound && stage === "ask" && placed === sc.n - 1 && <BlinkRing x={x - 8} y={yy - 8} w={pg.pw + 16} h={pg.ph + 16 + EDGE} rx={14} C={C} />}{invFor("tap-" + (i + 1), x, yy, pg.pw, pg.ph)}<Hit id={"tap-" + (i + 1)} x={x} y={yy + pg.ph / 2 - Math.max(pg.ph, 72) / 2} w={pg.pw} h={Math.max(pg.ph, 72)} label={lab(sc.kind)} onPress={() => {
          if (stage === "demo" && stepOn !== "tap-" + (hs.length + 1)) api.did("tap-" + (i + 1));
          else tapPiece(i);
        }} /></g>);
        continue;
      }
      zone.push(<g key={"p" + i}>{mlPiece(sc.kind, x, yy - pg.pad - 10, pg.s, { lit: rank === placed - 1 })}</g>);
      const tw = Math.min(pg.stride - 12, 150), tot = v * (rank + 1), hide = rank + 1 === sc.n && !reveal && !sc.warm && stage !== "free";
      zone.push(hide ? <g key={"t" + i}>{mlTag(x + pg.pw / 2 - tw / 2, tY, tw, 56, ML_GRN, "₹?", T.prompt, false)}</g> : <g key={"t" + i} data-reveals={rank + 1 === sc.n && !sc.warm ? "answer" : void 0}>{mlTag(x + pg.pw / 2 - tw / 2, tY, tw, 56, ML_GRN, "₹" + tot, T.prompt)}</g>);
    }
  } else if (K === "trays" || K === "purse" || K === "pay" || K === "free") {
    const tb = trayBox(), rs = K === "trays" ? [sc.a.kind, sc.b.kind] : rowsOf(tray);
    if (!rs.length) zone.push(<g key="tray0"><rect x={PX0 + 16} y={14} width={rowsR - PX0 - 24} height={ZH - 28} rx={16} fill="none" stroke="#B9965F" strokeWidth={3} strokeDasharray="14 10" />
      <path d={`M ${(PX0 + rowsR) / 2 - 14} ${ZH / 2 - 84} h28 v22 h16 l-30 30 l-30 -30 h16 z`} fill="#B9965F" fillOpacity={0.55} />
      <text x={(PX0 + rowsR) / 2} y={ZH / 2 + 30} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill="#6F5632" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{tx("Tray")}</text></g>);
    let run = 0;
    rs.forEach((k, i) => {
      const cnt = tray[k] || 0, rg = rowGeom(tray, k), fullRow = K === "trays" ? cnt >= (k === sc.a.kind ? sc.a.n : sc.b.n) : true;
      let tot = null, lit = 0;
      if (K === "trays") {
        if (fullRow && cnt > 0) tot = ML_V[k] * cnt;
        lit = cnt;
      } else if (K === "purse") {
        const shown = S.counted > i;
        if (shown) {
          tot = ML_V[k] * cnt;
          run += tot;
        }
        lit = shown ? cnt : 0;
      } else tot = ML_V[k] * cnt;
      zone.push(<g key={"r" + k}>{mlRow(k, cnt, rg.x0, rg.y, rg.w0, rg.rh, { tot, cshow: cnt, lit, k: "r", tight: K === "trays", smax: K === "trays" && moneyGone ? 1.7 : 1 }).el}</g>);
    });
    if (K !== "trays") {
      const allC = K === "purse" && S.counted >= nKinds && rs.length === nKinds, hid = allC && !reveal && !warm, dyT = lang === "en" ? 0 : -3;
      const txt = tx(K === "purse" && !allC ? "So far" : "Total") + "   " + (hid ? "₹?" : "₹" + (K === "purse" ? run : mlSum(tray)));
      const lx = tb.x, lw = rowsR - tb.x, ly = ZH - 68;
      zone.push(<g key="totline" data-reveals={allC && reveal && !warm ? "answer" : void 0}>{hid ? mlTag(lx, ly, lw, 58, ML_GRN, txt, T.prompt, false, false, dyT) : mlTag(lx, ly, lw, 58, K === "purse" || exact ? ML_GRN : "#8A7A6A", txt, T.prompt, true, false, dyT)}{exact && <rect x={lx - 3} y={ly - 3} width={lw + 6} height={64} rx={16} fill="none" stroke={ML_GRN} strokeWidth={6} />}</g>);
    }
    if (K === "purse") {
      const allIn = Object.keys(sc.has).every((k) => (tray[k] || 0) >= sc.has[k]);
      if (stage === "ask" && S.counted < nKinds) zone.push(<rect key="cnt-off" x={tb.x} y={tb.y} width={tb.w} height={tb.h} fill="transparent" onClick={() => {
        if (Date.now() - (lastPut.current.row || 0) < 700) return;
        nudge(allIn ? "Start with the biggest." : "Put all the money in the tray first.");
      }} />);
      if (allIn && S.counted < rs.length) {
        const k = rs[S.counted], rg = rowGeom(tray, k);
        zone.push(<g key="cnt-live"><rect x={rg.x0 - 3} y={rg.y - 1} width={rg.w0 + 6} height={rg.rh + 2} rx={14} fill="none" stroke={ML_SKY} strokeWidth={5} pointerEvents="none" />{invFor("count-" + k, rg.x0, rg.y, rg.w0, rg.rh)}<Hit id={"count-" + k} x={rg.x0} y={rg.y + rg.rh / 2 - 36} w={rg.w0} h={72} label={lab(k)} onPress={() => tapRow(k)} /></g>);
      }
    }
    if (K === "pay" || K === "free") {
      const dyL = lang === "en" ? 0 : 4;
      const noteTxt = ruleMiss ? "3 notes + 1 coin" : S.note && !exact ? S.note === "needs more" ? "Needs more" : "Too much" : "";
      const useR = ext && wide, kx0 = useR ? Math.round((matR + W2 - 8) / 2 - 110) : 12, ky0 = useR ? Z0 + 96 : 12 + tagH + 12;
      const blink = K === "pay" && sc.mode === "two" && S.keptHint && exact && S.ways.length === 0 && stage === "ask";
      band.push(<g key="payagain">{invFor("pay-again", kx0, ky0, 220, 72)}{blink && <BlinkRing x={kx0} y={ky0} w={220} h={72 + EDGE} rx={RAD.key} C={C} />}<Key id="pay-again" x={kx0} y={ky0} w={220} h={72} C={C} tone="key" label={tx("Pay again")} onClick={() => pressKey(payAgain)}><text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Pay again")}</text></Key></g>);
      if (noteTxt) {
        const nt = String(tx(noteTxt)), nw = Math.min(310, Math.round(nt.length * 17 + 40)), nx = kx0 + 110 - nw / 2, ny = ky0 + 72 + 20;
        band.push(<g key="note"><rect x={nx} y={ny} width={nw} height={48} rx={14} fill="#FFF6DF" stroke="#A88A5A" strokeWidth={3} /><text x={nx + nw / 2} y={ny + 24 + 11 + dyL / 2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#4A2A00" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{nt}</text></g>);
      }
      if (keptW) {
        const wm = mlParse(S.ways[0]), rsw = KS.filter((k) => wm[k] > 0), wx = tb.x + tb.w + 10, ww = 316;
        const pH2 = tb.h - 8, rh2 = Math.min(60, Math.floor((pH2 - 80) / Math.max(rsw.length, 1))), tfs = rh2 >= 38 ? T.label : T.micro;
        zone.push(<g key="kept"><rect x={wx} y={tb.y} width={ww} height={pH2} rx={RAD.panel} fill={tint(ML_GRN, 0.88)} stroke={ML_GRN} strokeWidth={3} />
          {rsw.map((k, i) => {
          const sK = mlNote(k) ? 0.78 : Math.min(0.95, (rh2 - 4) / ML_CD);
          const dia = (mlNote(k) ? ML_NH : ML_CD) * sK;
          return <g key={"kw" + k}>{mlPiece(k, wx + 14, tb.y + 8 + i * rh2 + (rh2 - dia) / 2, sK, { label: !mlNote(k) })}<text x={wx + 128} y={tb.y + 8 + i * rh2 + rh2 / 2 + tfs * 0.36} fontSize={tfs} fontWeight={700} fill="#2B2B2B" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{"₹" + ML_V[k] + " × " + wm[k]}</text></g>;
        })}
          {mlTag(wx + 22, tb.y + pH2 - 66, ww - 44, 46, ML_GRN, tx("Way 1") + "  ₹" + mlSum(wm), T.label, true, false, dyL)}</g>);
      }
    }
  }
  const bgEls = [];
  {
    const topW = Math.min(kx, W2);
    bgEls.push(<rect key="woodtop" x={0} y={0} width={topW} height={96} fill="url(#udgam-grad-wood)" />);
    bgEls.push(<rect key="wood" x={0} y={96} width={W2} height={424} fill="url(#udgam-grad-wood)" />);
    const tilesOf = (c, x0, wC, y0, flipX) => {
      const av = 520 - y0, hT = wC * 240 / 640, rn = Math.max(2, Math.ceil(av / hT)), h2 = av / rn;
      return Array.from({ length: rn }, (_, r) => <g key={"cw" + c + "_" + r} transform={`translate(${flipX ? x0 + wC : x0} ${r % 2 ? y0 + (r + 1) * h2 : y0 + r * h2}) scale(${flipX ? -1 : 1} ${r % 2 ? -1 : 1})`}><Skin name="counter" x={0} y={0} w={wC} h={h2} /></g>);
    };
    if (topW < W2) {
      bgEls.push(...tilesOf(0, 0, topW / 2, 0, false), ...tilesOf(1, topW / 2, topW / 2, 0, true));
      bgEls.push(...tilesOf(2, topW, W2 - topW, 96, false));
    } else bgEls.push(...tilesOf(0, 0, W2 / 2, 0, false), ...tilesOf(1, W2 / 2, W2 / 2, 0, true));
    bgEls.push(<defs key="lightdef"><radialGradient id="udgam-light-u" gradientUnits="userSpaceOnUse" cx={0} cy={0} r={0.8 * W2} gradientTransform={`translate(${0.3 * W2} ${96 + 42}) scale(1 ${424 / W2})`}><stop offset="0%" stopColor="#FFF8ED" stopOpacity="0.32" /><stop offset="100%" stopColor="#FFF8ED" stopOpacity="0" /></radialGradient></defs>);
    bgEls.push(<rect key="light" x={0} y={0} width={topW} height={520} fill="url(#udgam-light-u)" pointerEvents="none" />);
    if (W2 > topW) bgEls.push(<rect key="light2" x={topW} y={96} width={W2 - topW} height={424} fill="url(#udgam-light-u)" pointerEvents="none" />);
    bgEls.push(<rect key="edge" x={0} y={486} width={W2} height={34} fill="url(#udgam-edge)" pointerEvents="none" />);
    bgEls.push(<rect key="edge2" x={0} y={512} width={W2} height={8} fill="#6E4018" />);
  }
  const tagEl = hasTag ? (() => {
    const tx0 = wide ? 115 : 125, ty0 = wide ? 20 : 8, fsT = Math.max(32, Math.round(tagW * 0.3));
    return <g key="pricetag" filter="url(#udgam-shadow-soft)">
      <g pointerEvents="none">
        <rect x={tx0} y={ty0 + tagH * 0.16} width={tagW} height={tagH * 0.84} rx={14} fill="#EAD8AF" stroke="#805E2B" strokeWidth={3} />
        <circle cx={tx0 + tagW / 2} cy={ty0 + tagH * 0.12} r={6} fill="#7A5623" />
        <line x1={tx0 + tagW / 2} y1={ty0} x2={tx0 + tagW / 2} y2={ty0 + tagH * 0.12} stroke="#B59A72" strokeWidth={3} />
        <Skin name="pricetag" x={tx0} y={ty0} w={tagW} h={tagH} />
        <text x={tx0 + tagW / 2} y={ty0 + tagH * 0.62 + fsT * 0.36} textAnchor="middle" fontSize={fsT} fontWeight={700} fill="#2B2B2B" stroke="#F7EBCB" strokeWidth={4} paintOrder="stroke" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{"₹" + price}</text>
      </g>
      {free && <Hit id="tag-price" x={tx0} y={ty0} w={tagW} h={tagH} label={"₹" + price} onPress={() => {
      const nowT = Date.now();
      if (nowT - (lastPut.current.tag || 0) < 300) return;
      lastPut.current.tag = nowT;
      const had = Object.keys(SR.current.tray).length > 0;
      if (had) api.say("The tray is empty for the new amount.");
      put({ fp: (SR.current.fp + 1) % FREE_PRICES.length, touched: true, tray: {}, note: "", freeMsg: had });
      api.sfx.tick();
    }} />}
    </g>;
  })() : null;
  const flyEl = S.fly ? (() => {
    const f = S.fly, s = f.go ? f.s1 : f.s0, p = f.go ? f.to : f.from;
    if (!p) return null;
    return <g key="fly" pointerEvents="none" style={{ transform: `translate(${p.x}px, ${p.y}px)`, transition: "transform 420ms ease-in-out" }}>{mlPiece(f.id, 0, 0, s, {})}</g>;
  })() : null;
  const ghost = D.drag && D.drag.moved ? (() => {
    const g = D.drag, pid = String(g.payload).split("#")[0], bw = (mlNote(pid) ? ML_NW : ML_CD) * 1.15, bh = (mlNote(pid) ? ML_NH : ML_CD) * 1.15;
    return <g key="ghost" pointerEvents="none" style={{ filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.35))" }}>{mlPiece(pid, g.x - bw / 2, g.y - bh / 2, 1.15, {})}</g>;
  })() : null;
  api.share({ complete: stage === "idle", tray: mlSig(tray), total: reveal || K === "pay" || K === "free" || K === "trays" ? mlSum(tray) : void 0, price, ways: S.ways.length, counted: S.counted });
  return <g>
      <RenderDefs />
      {bgEls}
      {purseEl}
      <g transform={`translate(0 ${Z0})`}>{zone}</g>
      {tagEl}
      {band}
      {walletEls}
      {flyEl}
      {ghost}
    </g>;
}
function Thumb({ result, it, C, w, h, lang = "en", tx = (v) => v }) {
  ML_SK = 0;
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === void 0) return null;
  const item = it || (result.last && result.last.item !== void 0 ? PHASES[(result.phase || 1) - 1].items[result.last.item] : null) || {};
  const sc = item.sc || {};
  let text = String(v), ids = [];
  if (item.kind === "pay") {
    const m = mlParse(String(v).split("|")[0]);
    text = "₹" + mlSum(m);
    ids = KS.filter((k) => m[k] > 0);
  } else if (item.kind === "order") {
    text = "₹10 → ₹500";
    ids = ["n10", "n500"];
  } else if (item.choices) text = "";
  else if (item.kind === "pile") {
    ids = [sc.kind, sc.kind];
    text = "₹" + v;
  } else if (item.kind === "trays") {
    ids = [sc.a.kind, sc.b.kind];
    text = "₹" + v;
  } else if (item.kind === "purse") {
    ids = KS.filter((k) => sc.has[k]);
    text = "₹" + v;
  } else if (item.kind === "pair") {
    ids = [sc.a, sc.b];
    text = "₹" + v;
  } else if (/^\d+$/.test(text)) text = "₹" + text;
  const sT = 0.46, step = 56, room = w - 14 - String(text).length * 20 - 24, nFit = Math.max(1, Math.floor((room - 62) / step) + 1);
  ids = ids.slice(0, Math.min(3, nFit));
  return <g>
      <RenderDefs />
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {item.choices ? <g>
            {mlPiece(item.sc.a, 12, h / 2 - 20, 0.6, {})}
            <text x={w / 2 + 6} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>=</text>
            {mlPiece(item.sc.b, w - 12 - ML_CD * 0.6, h / 2 - ML_CD * 0.6 / 2, 0.6, {})}
          </g> : <g>
            {ids.map((id, i) => <g key={i}>{mlPiece(id, 12 + i * step, h / 2 - (mlNote(id) ? ML_NH : ML_CD) * sT / 2, sT, { label: false })}</g>)}
            <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{text}</text>
          </g>}
    </g>;
}
function CountTheMoney(props) {
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
    /* the slot never prints the signature a working-area answer is sent as ("n100,n20,c10|...") */
    format: (v) => /^[nc]\d/.test(String(v)) ? "" : v,
    board: true,
    keyOnly: true,
    bigPad: true,
    nextKey: true,
    navDots: true,
    StartArt,
    START_HOOK
  }} />;
}
var stdin_default = CountTheMoney;
export default stdin_default;
