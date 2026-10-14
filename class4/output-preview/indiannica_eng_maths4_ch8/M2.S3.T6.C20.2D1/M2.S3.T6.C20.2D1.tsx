import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
/* M2.S3.T6.C20.2D1 · point_slider · Point Slider — standalone build 2026-10-14, source bcd95fe9:394102.
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
  const Runs2 = tool.Runs;
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
        {Runs2 && <g data-zone="runs">
            <rect x={Z.runs.x} y={Z.runs.y} width={Z.runs.w} height={Z.runs.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            <g transform={`translate(${Z.runs.x},${Z.runs.y})`}><Runs2 {...workProps} /></g>
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
      hasRuns={!!Runs2}
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
const MASCOT_IMAGE = "data:image/webp;base64,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";
const MASCOT_CHEER = "data:image/webp;base64,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";
const MASCOT_THINK = "data:image/webp;base64,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";
const MASCOT_SIZE = { w: 281, h: 420 };
const TOOL_IMAGES = {
  "piece": "data:image/webp;base64,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"
};
const TOOL_THEME = { "key": ["#A45E3C", "#7A3F22", "#4E2410", "#FFF3DC"], "enter": ["#E0408F", "#BE1F78", "#8C0F55", "#FFFFFF"], "soft": ["#FFE29A", "#F7C25A", "#C48E1F", "#5B3410"], "panel": ["#FFF1D6", "#F3D9A8"], "slot": "#7A3F22" };
const TOOL_ID = "point_slider";
const MEDIA_ID = "M2.S3.T6.C20.2D1";
const TOOL_NAME = "Point Slider";
const CHROME = { "dim": "#9AA4AC", "ink": "#2B2B2B", "rule": "#C9BCA6", "panel": "#F2E4CE", "paper": "#FFFDF7", "accent": "#5B6770" };
const VOICE = { "rate": 0.92, "pitch": 1.06 };
const OPENING = ["Count the zeros underneath first. That is how many places you are going to need."];
const FINISH_LINE = "Every point walked in from the right, and every filling zero standing in front of the digits.";
const FREE_LINE = "Free play: tap the top or bottom number to change it, then walk, fill and run.";
const START_HOOK = "Which side of the digits do the filling zeros go on?";
function StartArt({ box, C, lang, tx }) {
  const ink = C.ink, red = CONTENT.pointer;
  const fx = 400, cy = box.h / 2;
  const cards = [{ k: "whole", ch: "9" }, { k: "point" }];
  let x = 720;
  const laid = cards.map((c) => {
    const w = c.k === "point" ? 56 : 96;
    const o = { ...c, x, w };
    x += w + 10;
    return o;
  });
  const ry = cy - 70;
  return <g>
      <text x={fx} y={cy - 34} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={ink}>9</text>
      <rect x={fx - 80} y={cy - 6} width={160} height={10} rx={5} fill={ink} />
      <text x={fx} y={cy + 82} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={ink}>100</text>
      <path d={`M ${fx + 140} ${cy} H ${680}`} stroke={shade(C.rule, 0.2)} strokeWidth={6} strokeLinecap="round" />
      <path d={`M 668 ${cy - 14} L 688 ${cy} L 668 ${cy + 14} Z`} fill={shade(C.rule, 0.2)} />
      {laid.map((c, i) => {
    if (c.k === "point") return <g key={i}>
            <rect x={c.x} y={ry} width={c.w} height={140} rx={RAD.piece} fill={tint(red, 0.86)} stroke={red} strokeWidth={3} />
            <circle cx={c.x + c.w / 2} cy={ry + 102} r={11} fill={red} />
          </g>;
    return <g key={i}>
            <rect x={c.x} y={ry} width={c.w} height={140} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
            <text
      x={c.x + c.w / 2}
      y={ry + 70 + T.display * 0.35}
      textAnchor="middle"
      fontSize={T.display}
      fontWeight={700}
      fill={shade(CONTENT.hundred, 0.25)}
    >{c.ch}</text>
          </g>;
  })}
    </g>;
}
const TR = {
  hi: {
    "Point Slider": "बिंदु सरकाओ",
    "Free play: tap the top or bottom number to change it, then walk, fill and run.": "मुक्त खेल: ऊपर या नीचे की संख्या छूकर बदलो, फिर सरकाओ, भरो, चलाओ।",
    "Which side of the digits do the filling zeros go on?": "भरने वाले शून्य अंकों की किस तरफ़ जाते हैं?",
    /* phase 1 */
    "Counting the zeros underneath": "नीचे के शून्य गिनना",
    "Tap the zero under the bar.": "रेखा के नीचे का शून्य छुओ।",
    "The zero is in the bottom number.": "शून्य नीचे की संख्या में है।",
    "How many zeros has the bottom got?": "नीचे की संख्या में कितने शून्य हैं?",
    "Light each zero below the bar.": "रेखा के नीचे के सब शून्य छुओ।",
    "The zeros in the denominator count the decimal places, one place for each zero.": "हर के शून्य दशमलव स्थान बताते हैं, प्रत्येक शून्य का एक स्थान।",
    "You learned: the zeros underneath count the decimal places.": "तुमने सीखा: नीचे के शून्य दशमलव स्थान गिनते हैं।",
    "Count the zeros and type how many.": "शून्य गिनो और संख्या लिखो।",
    "How many decimal places?": "कितने दशमलव स्थान?",
    "Count only the zeros, not the 1.": "सिर्फ़ शून्य गिनो, 1 नहीं।",
    "Now count for this bottom number.": "अब इस हर के शून्य गिनो।",
    "Places for a denominator of 1000?": "हर 1000 हो तो कितने स्थान?",
    "Is every digit of that number a zero?": "क्या उसके सारे अंक शून्य हैं?",
    "Count again and type the number.": "फिर गिनो और गिनती लिखो।",
    "29 tenths: digits after the point?": "29 दसवें: दशमलव के बाद कितने अंक?",
    "Look under the bar, not above it.": "रेखा के नीचे देखो, ऊपर नहीं।",
    "Yes, the two zeros give two places.": "हाँ, दो शून्य, तो दो स्थान।",
    "A thousand needs three decimal places.": "हज़ार को तीन दशमलव स्थान चाहिए।",
    "The 29 on top does not change the count.": "ऊपर का 29 गिनती नहीं बदलता।",
    /* phase 2 */
    "Placing the point from the right": "दशमलव बिंदु दाएँ से लगाना",
    "Tap the point card to walk it in.": "बिंदु कार्ड छूकर उसे अंदर सरकाओ।",
    "The point card waits at the right.": "बिंदु कार्ड दाईं ओर है।",
    "Tap again to meet the counter.": "गिनती तक पहुँचने को फिर छुओ।",
    "The counter says two places.": "गिनती दो स्थान बताती है।",
    "What does the places counter say?": "स्थान गिनती क्या बताती है?",
    "Walk one digit in for each zero.": "एक शून्य, एक अंक अंदर।",
    "The point goes in from the right hand end of the numerator. It walks one digit for each zero underneath.": "बिंदु अंश के दाएँ सिरे से अंदर जाता है। नीचे के प्रत्येक शून्य के लिए वह एक अंक चलता है।",
    "You learned: the point walks in from the right hand end.": "तुमने सीखा: बिंदु दाएँ सिरे से अंदर आता है।",
    "Walk the point in, then type it.": "बिंदु अंदर सरकाओ, फिर लिखो।",
    "Write it as a decimal.": "इसे दशमलव में लिखो।",
    "Start the walk at the right end.": "दाएँ सिरे से चलना शुरू करो।",
    "Now turn this one into a decimal.": "अब इसे दशमलव में बदलो।",
    "47 tenths as a decimal?": "47 दसवें भाग दशमलव में?",
    "How far does the counter let it go?": "गिनती उसे कितना आगे जाने देती है?",
    "Walk it in as far as the counter says.": "गिनती जितना बताए, उतना अंदर चलो।",
    "What decimal does it make?": "कौन सा दशमलव बनता है?",
    "Which end do the steps count from?": "कदम किस सिरे से गिने जाते हैं?",
    "The point walked in three digits.": "बिंदु तीन अंक अंदर चला।",
    "One step in from the right.": "दाएँ से एक कदम अंदर।",
    "Three steps in, so the 2 stays as a whole one.": "तीन कदम अंदर, तो 2 इकाई में रहा।",
    /* phase 3 */
    "When the numerator is too short": "जब अंश में अंक कम पड़ें",
    "Tap the zero tray to fill a place.": "स्थान भरने को शून्य ट्रे छुओ।",
    "Tap the grey zeros in the tray.": "ट्रे के स्लेटी शून्य छुओ।",
    "Tap the tray for the last place.": "आखिरी स्थान के लिए ट्रे छुओ।",
    "Another empty place is waiting.": "एक और खाली स्थान बचा है।",
    "Walk in: what is left empty?": "अंदर चलो: क्या खाली बचा?",
    "Fill the places nearest the point.": "बिंदु के सबसे पास के स्थान भरो।",
    "A filling zero goes on the left of the digits, between them and the point.": "भरने वाला शून्य अंकों के बाईं ओर जाता है, उनके और बिंदु के बीच।",
    "You learned: a filling zero goes on the left, next to the point.": "तुमने सीखा: भरने वाला शून्य बाईं ओर, बिंदु के पास जाता है।",
    "Walk the point in, then fill any empty place.": "बिंदु अंदर सरकाओ, खाली स्थान भरो।",
    "What decimal is it?": "यह कौन सा दशमलव है?",
    "Never hang a zero on the right end.": "दाएँ सिरे पर शून्य कभी मत लटकाओ।",
    "Walk it in and fill what is empty.": "अंदर चलाओ और खाली जगह भरो।",
    "5 hundredths as a decimal?": "5 सौवें भाग दशमलव में?",
    "Walk on until it matches the counter.": "गिनती से मिलने तक चलते रहो।",
    "Walk the point in, then write the decimal.": "बिंदु अंदर सरकाओ, फिर दशमलव लिखो।",
    "72 thousandths as a decimal?": "72 हज़ारवें भाग दशमलव में?",
    "Put the zero before the digits.": "शून्य अंकों से पहले रखो।",
    "The zero went in front of the three.": "शून्य तीन के आगे गया।",
    "Five hundredths has no tenths at all.": "पाँच सौवें में कोई दसवाँ भाग नहीं है।",
    "72 thousandths needs one filling zero.": "72 हज़ारवें को एक भरने वाला शून्य चाहिए।",
    /* phase 4 */
    "Why the side matters so much": "तरफ़ इतनी ज़रूरी क्यों है",
    "Tap Run to hang zeros on the right.": "चलाओ छूकर शून्य दाईं ओर लटकाओ।",
    "Run is beside the lower lane.": "चलाओ नीचे के रास्ते के पास है।",
    "Tap Measure to see the gap.": "नापो छूकर अंतर देखो।",
    "Measure is beside the bar.": "नापो पट्टी के पास है।",
    "Is that the same size as the fraction?": "क्या वह भिन्न जितना ही है?",
    "Walk the top point in, then read it.": "ऊपर का बिंदु अंदर चलाओ, फिर पढ़ो।",
    "Zeros on the left make a number smaller. Zeros on the right make it bigger.": "बाईं ओर के शून्य संख्या को छोटा बनाते हैं। दाईं ओर के शून्य उसे बड़ा बनाते हैं।",
    "You learned: zeros on the right make a number bigger, not smaller.": "तुमने सीखा: दाईं ओर के शून्य संख्या को बड़ा बनाते हैं, छोटा नहीं।",
    "Run the lower lane, then type the right decimal.": "नीचे का रास्ता चलाओ, फिर सही दशमलव लिखो।",
    "What should it really be?": "असल में यह क्या होना चाहिए?",
    "Count the places in the lower lane.": "नीचे के रास्ते के स्थान गिनो।",
    "Run it and build the top lane.": "उसे चलाओ और ऊपर का रास्ता बनाओ।",
    "Someone wrote 4.00: what is right?": "किसी ने 4.00 लिखा: सही क्या है?",
    "Which side got that lane's zeros?": "उस रास्ते के शून्य किस तरफ़ गए?",
    "Write this turmeric weight as a decimal.": "हल्दी का यह वज़न दशमलव में लिखो।",
    "Turmeric: 5 tenths of a kilogram?": "हल्दी: एक किलोग्राम के 5 दसवें भाग?",
    "The counter holds a single place.": "गिनती में सिर्फ़ एक स्थान है।",
    "That lane was a thousand times too big.": "वह रास्ता हज़ार गुना बड़ा निकला।",
    "4.00 is four whole ones, not four hundredths.": "4.00 चार पूरे हैं, चार सौवें नहीं।",
    "One place, one digit: no zero needed.": "एक स्थान, एक अंक: शून्य नहीं चाहिए।",
    /* the words the picture draws (Work, Runs, Thumb) */
    "done": "हो गए",
    "Count this top digit": "ऊपर का यह अंक गिनो",
    "Count this bottom digit": "नीचे का यह अंक गिनो",
    "Change the top number": "ऊपर की संख्या बदलो",
    "Change the bottom number": "नीचे की संख्या बदलो",
    "Walk the point in one digit": "बिंदु को एक अंक अंदर सरकाओ",
    "Take a zero for an empty place": "खाली स्थान के लिए शून्य लो",
    "Measure how far apart they are": "नापो कि दोनों में कितना अंतर है",
    "Run the other lane": "दूसरा रास्ता चलाओ",
    "places counter": "स्थान गिनती",
    "place": "स्थान",
    "places": "स्थान",
    "zero tray": "शून्य ट्रे",
    "you typed": "तुमने लिखा",
    "times bigger": "गुना बड़ा",
    "zeros left": "शून्य बाएँ",
    "zeros right": "शून्य दाएँ",
    "Measure": "नापो",
    "Run": "चलाओ"
  },
  gu: {
    "Point Slider": "દશાંશ ચિહ્ન સરકાવો",
    "Free play: tap the top or bottom number to change it, then walk, fill and run.": "મુક્ત રમત: ઉપર કે નીચેની સંખ્યા દબાવી બદલો, પછી સરકાવો, ભરો, ચલાવો.",
    "Which side of the digits do the filling zeros go on?": "ભરનાર શૂન્ય અંકોની કઈ બાજુ જાય છે?",
    /* phase 1 */
    "Counting the zeros underneath": "નીચેના શૂન્ય ગણવા",
    "Tap the zero under the bar.": "રેખા નીચેનું શૂન્ય દબાવો.",
    "The zero is in the bottom number.": "શૂન્ય નીચેની સંખ્યામાં છે.",
    "How many zeros has the bottom got?": "નીચેની સંખ્યામાં કેટલા શૂન્ય છે?",
    "Light each zero below the bar.": "રેખા નીચેના બધા શૂન્ય દબાવો.",
    "The zeros in the denominator count the decimal places, one place for each zero.": "છેદના શૂન્ય દશાંશ સ્થાન બતાવે છે, દરેક શૂન્યનું એક સ્થાન.",
    "You learned: the zeros underneath count the decimal places.": "તમે શીખ્યા: નીચેના શૂન્ય દશાંશ સ્થાન ગણે છે.",
    "Count the zeros and type how many.": "શૂન્ય ગણો અને સંખ્યા લખો.",
    "How many decimal places?": "કેટલા દશાંશ સ્થાન?",
    "Count only the zeros, not the 1.": "ફક્ત શૂન્ય ગણો, 1 નહીં.",
    "Now count for this bottom number.": "હવે આ છેદના શૂન્ય ગણો.",
    "Places for a denominator of 1000?": "છેદ 1000 હોય તો કેટલા સ્થાન?",
    "Is every digit of that number a zero?": "શું તેના બધા અંક શૂન્ય છે?",
    "Count again and type the number.": "ફરી ગણો અને ગણતરી લખો.",
    "29 tenths: digits after the point?": "29 દશમા: દશાંશ પછી કેટલા અંક?",
    "Look under the bar, not above it.": "રેખાની નીચે જુઓ, ઉપર નહીં.",
    "Yes, the two zeros give two places.": "હા, બે શૂન્ય, એટલે બે સ્થાન.",
    "A thousand needs three decimal places.": "હજારને ત્રણ દશાંશ સ્થાન જોઈએ.",
    "The 29 on top does not change the count.": "ઉપરના 29થી ગણતરી બદલાતી નથી.",
    /* phase 2 */
    "Placing the point from the right": "દશાંશ ચિહ્ન જમણેથી મૂકવું",
    "Tap the point card to walk it in.": "ચિહ્ન કાર્ડ દબાવી અંદર સરકાવો.",
    "The point card waits at the right.": "ચિહ્ન કાર્ડ જમણી બાજુ છે.",
    "Tap again to meet the counter.": "ગણતરી સુધી પહોંચવા ફરી દબાવો.",
    "The counter says two places.": "ગણતરી બે સ્થાન બતાવે છે.",
    "What does the places counter say?": "સ્થાન ગણતરી શું બતાવે છે?",
    "Walk one digit in for each zero.": "દરેક શૂન્ય માટે એક અંક અંદર.",
    "The point goes in from the right hand end of the numerator. It walks one digit for each zero underneath.": "ચિહ્ન અંશના જમણા છેડેથી અંદર જાય છે. નીચેના દરેક શૂન્ય માટે તે એક અંક ચાલે છે.",
    "You learned: the point walks in from the right hand end.": "તમે શીખ્યા: ચિહ્ન જમણા છેડેથી અંદર આવે છે.",
    "Walk the point in, then type it.": "ચિહ્ન અંદર સરકાવો, પછી લખો.",
    "Write it as a decimal.": "તેને દશાંશમાં લખો.",
    "Start the walk at the right end.": "જમણા છેડેથી ચાલવાનું શરૂ કરો.",
    "Now turn this one into a decimal.": "હવે આને દશાંશમાં બદલો.",
    "47 tenths as a decimal?": "47 દશમા ભાગ દશાંશમાં?",
    "How far does the counter let it go?": "ગણતરી તેને કેટલું આગળ જવા દે છે?",
    "Walk it in as far as the counter says.": "ગણતરી કહે એટલું અંદર ચલાવો.",
    "What decimal does it make?": "કયો દશાંશ બને છે?",
    "Which end do the steps count from?": "પગલાં કયા છેડેથી ગણાય છે?",
    "The point walked in three digits.": "ચિહ્ન ત્રણ અંક અંદર ચાલ્યું.",
    "One step in from the right.": "જમણેથી એક પગલું અંદર.",
    "Three steps in, so the 2 stays as a whole one.": "ત્રણ પગલાં અંદર, એટલે 2 એકમમાં રહ્યો.",
    /* phase 3 */
    "When the numerator is too short": "જ્યારે અંશમાં અંક ઓછા પડે",
    "Tap the zero tray to fill a place.": "સ્થાન ભરવા શૂન્ય ટ્રે દબાવો.",
    "Tap the grey zeros in the tray.": "ટ્રેના રાખોડી શૂન્ય દબાવો.",
    "Tap the tray for the last place.": "છેલ્લા સ્થાન માટે ટ્રે દબાવો.",
    "Another empty place is waiting.": "હજી એક ખાલી સ્થાન બાકી છે.",
    "Walk in: what is left empty?": "અંદર ચાલો: શું ખાલી રહ્યું?",
    "Fill the places nearest the point.": "ચિહ્નની સૌથી પાસેનાં સ્થાન ભરો.",
    "A filling zero goes on the left of the digits, between them and the point.": "ભરનાર શૂન્ય અંકોની ડાબી બાજુ જાય છે, અંકો અને ચિહ્નની વચ્ચે.",
    "You learned: a filling zero goes on the left, next to the point.": "તમે શીખ્યા: ભરનાર શૂન્ય ડાબી બાજુ, ચિહ્નની પાસે જાય છે.",
    "Walk the point in, then fill any empty place.": "ચિહ્ન અંદર સરકાવો, ખાલી સ્થાન ભરો.",
    "What decimal is it?": "આ કયો દશાંશ છે?",
    "Never hang a zero on the right end.": "જમણા છેડે શૂન્ય ક્યારેય ન લટકાવો.",
    "Walk it in and fill what is empty.": "અંદર ચલાવો અને ખાલી જગ્યા ભરો.",
    "5 hundredths as a decimal?": "5 સોમા ભાગ દશાંશમાં?",
    "Walk on until it matches the counter.": "ગણતરી સાથે મળે ત્યાં સુધી ચાલો.",
    "Walk the point in, then write the decimal.": "ચિહ્ન અંદર સરકાવો, પછી દશાંશ લખો.",
    "72 thousandths as a decimal?": "72 હજારમા ભાગ દશાંશમાં?",
    "Put the zero before the digits.": "શૂન્ય અંકોની પહેલાં મૂકો.",
    "The zero went in front of the three.": "શૂન્ય ત્રણની આગળ ગયું.",
    "Five hundredths has no tenths at all.": "પાંચ સોમામાં એક પણ દશમો ભાગ નથી.",
    "72 thousandths needs one filling zero.": "72 હજારમાને એક ભરનાર શૂન્ય જોઈએ.",
    /* phase 4 */
    "Why the side matters so much": "બાજુ આટલી જરૂરી કેમ છે",
    "Tap Run to hang zeros on the right.": "ચલાવો દબાવી શૂન્ય જમણે લટકાવો.",
    "Run is beside the lower lane.": "ચલાવો નીચલા રસ્તા પાસે છે.",
    "Tap Measure to see the gap.": "માપો દબાવી અંતર જુઓ.",
    "Measure is beside the bar.": "માપો પટ્ટી પાસે છે.",
    "Is that the same size as the fraction?": "શું તે અપૂર્ણાંક જેટલું જ છે?",
    "Walk the top point in, then read it.": "ઉપરનું ચિહ્ન અંદર ચલાવો, પછી વાંચો.",
    "Zeros on the left make a number smaller. Zeros on the right make it bigger.": "ડાબી બાજુના શૂન્ય સંખ્યાને નાની બનાવે છે. જમણી બાજુના શૂન્ય તેને મોટી બનાવે છે.",
    "You learned: zeros on the right make a number bigger, not smaller.": "તમે શીખ્યા: જમણી બાજુના શૂન્ય સંખ્યાને મોટી બનાવે છે, નાની નહીં.",
    "Run the lower lane, then type the right decimal.": "નીચલો રસ્તો ચલાવો, પછી સાચો દશાંશ લખો.",
    "What should it really be?": "ખરેખર તે શું હોવું જોઈએ?",
    "Count the places in the lower lane.": "નીચલા રસ્તાના સ્થાન ગણો.",
    "Run it and build the top lane.": "તે ચલાવો અને ઉપરનો રસ્તો બનાવો.",
    "Someone wrote 4.00: what is right?": "કોઈએ 4.00 લખ્યું: સાચું શું છે?",
    "Which side got that lane's zeros?": "એ રસ્તાના શૂન્ય કઈ બાજુ ગયા?",
    "Write this turmeric weight as a decimal.": "હળદરનું આ વજન દશાંશમાં લખો.",
    "Turmeric: 5 tenths of a kilogram?": "હળદર: એક કિલોગ્રામના 5 દશમા ભાગ?",
    "The counter holds a single place.": "ગણતરીમાં ફક્ત એક સ્થાન છે.",
    "That lane was a thousand times too big.": "તે રસ્તો હજાર ગણો મોટો નીકળ્યો.",
    "4.00 is four whole ones, not four hundredths.": "4.00 ચાર આખા છે, ચાર સોમા નહીં.",
    "One place, one digit: no zero needed.": "એક સ્થાન, એક અંક: શૂન્ય જોઈતું નથી.",
    /* the words the picture draws (Work, Runs, Thumb) */
    "done": "થયા",
    "Count this top digit": "ઉપરનો આ અંક ગણો",
    "Count this bottom digit": "નીચેનો આ અંક ગણો",
    "Change the top number": "ઉપરની સંખ્યા બદલો",
    "Change the bottom number": "નીચેની સંખ્યા બદલો",
    "Walk the point in one digit": "ચિહ્નને એક અંક અંદર સરકાવો",
    "Take a zero for an empty place": "ખાલી સ્થાન માટે શૂન્ય લો",
    "Measure how far apart they are": "બંને વચ્ચે કેટલું અંતર છે તે માપો",
    "Run the other lane": "બીજો રસ્તો ચલાવો",
    "places counter": "સ્થાન ગણતરી",
    "place": "સ્થાન",
    "places": "સ્થાન",
    "zero tray": "શૂન્ય ટ્રે",
    "you typed": "તમે લખ્યું",
    "times bigger": "ગણું મોટું",
    "zeros left": "શૂન્ય ડાબે",
    "zeros right": "શૂન્ય જમણે",
    "Measure": "માપો",
    "Run": "ચલાવો"
  }
};
const PHASES = [
  {
    n: 1,
    concept: "Counting the zeros underneath",
    conceptId: "M2.S3.T6.C20",
    objectiveIds: ["O9"],
    says: ["Count the zeros underneath. That is how many places you need."],
    /* the warm-up counts 7/10 (not Q1's 100): a tap on the zero of the ten lights it and draws its place */
    steps: [{ say: "Tap the zero under the bar.", on: "den-1", hint: "The zero is in the bottom number." }],
    /* tries: rung 1 is each item's miss; then these (no number words here: the answers are counts). Every instruction
       is at most 35 characters and every hint 34 as printed, so a pair takes one bubble line each */
    ladder: ["How many zeros has the bottom got?", "Light each zero below the bar."],
    closing: "The zeros in the denominator count the decimal places, one place for each zero.",
    learned: "You learned: the zeros underneath count the decimal places.",
    traceback: "The zeros of the denominator light one at a time with the leading digit left plain, and a point is drawn with one empty place for each zero, ending on the count of places.",
    items: [
      /* learn ML1: answer in the plan = Two decimal places, because the hundred underneath has two zeros, and the decimal is 3.56.
         The phase counts places, so the slot takes the count; the win drops 356 into the places it found (3.56).
         rival 3 = the digits of the top number counted */
      {
        qid: "M2.S3.T6.C20:ML1",
        kind: "count",
        num: "356",
        den: 100,
        rival: 3,
        answer: 2,
        say: "Count the zeros and type how many.",
        ask: "How many decimal places?",
        miss: "Count only the zeros, not the 1."
      },
      /* practice 1: answer in the plan = Three, one for each zero in the thousand (rival 4 = every digit of 1,000) */
      {
        qid: "M2.S3.T6.C20:1",
        kind: "count",
        num: "",
        den: 1e3,
        rival: 4,
        answer: 3,
        say: "Now count for this bottom number.",
        ask: "Places for a denominator of 1000?",
        miss: "Is every digit of that number a zero?"
      },
      /* practice 2: answer in the plan = One zero, so one digit goes after the point (rival 2 = the digits of 29 or of 10) */
      {
        qid: "M2.S3.T6.C20:2",
        kind: "count",
        num: "29",
        den: 10,
        rival: 2,
        answer: 1,
        say: "Count again and type the number.",
        ask: "29 tenths: digits after the point?",
        miss: "Look under the bar, not above it."
      }
    ]
  },
  {
    n: 2,
    concept: "Placing the point from the right",
    conceptId: "M2.S3.T6.C21",
    objectiveIds: ["O9"],
    says: ["Start at the right hand end and walk the point in. Count as you go."],
    /* the warm-up walks the point into 349/100 (none of the questions' numbers): one tap a digit */
    steps: [
      { say: "Tap the point card to walk it in.", on: "point", hint: "The point card waits at the right." },
      { say: "Tap again to meet the counter.", on: "point", hint: "The counter says two places." }
    ],
    ladder: ["What does the places counter say?", "Walk one digit in for each zero."],
    closing: "The point goes in from the right hand end of the numerator. It walks one digit for each zero underneath.",
    learned: "You learned: the point walks in from the right hand end.",
    traceback: "A second row is laid under the child's: its point card starts at the right hand end and walks in one digit for each zero, each place numbered from the point, ending on the decimal.",
    items: [
      /* learn ML2: answer in the plan = 0.617 (rival 6.17 = the point dropped after the first digit, counted from the left) */
      {
        qid: "M2.S3.T6.C21:ML2",
        kind: "point",
        num: "617",
        den: 1e3,
        rival: "6.17",
        answer: "0.617",
        say: "Walk the point in, then type it.",
        ask: "Write it as a decimal.",
        miss: "Start the walk at the right end."
      },
      /* practice 3: answer in the plan = 4.7 (rival 0.47 = the card walked past the count) */
      {
        qid: "M2.S3.T6.C21:3",
        kind: "point",
        num: "47",
        den: 10,
        rival: "0.47",
        answer: "4.7",
        say: "Now turn this one into a decimal.",
        ask: "47 tenths as a decimal?",
        miss: "How far does the counter let it go?"
      },
      /* practice 4: answer in the plan = 2.358 (rival 235.8 = counted in from the left hand end) */
      {
        qid: "M2.S3.T6.C21:4",
        kind: "point",
        num: "2358",
        den: 1e3,
        rival: "235.8",
        answer: "2.358",
        say: "Walk it in as far as the counter says.",
        ask: "What decimal does it make?",
        miss: "Which end do the steps count from?"
      }
    ]
  },
  {
    n: 3,
    concept: "When the numerator is too short",
    conceptId: "M2.S3.T6.C22",
    objectiveIds: ["O10"],
    says: ["The digits have run out. Which side are the empty places on?"],
    /* the warm-up fills 4/1000 (the book's own example, 0.004; none of the questions'): one tap a zero */
    steps: [
      { say: "Tap the zero tray to fill a place.", on: "tray", hint: "Tap the grey zeros in the tray." },
      { say: "Tap the tray for the last place.", on: "tray", hint: "Another empty place is waiting." }
    ],
    ladder: ["Walk in: what is left empty?", "Fill the places nearest the point."],
    closing: "A filling zero goes on the left of the digits, between them and the point.",
    learned: "You learned: a filling zero goes on the left, next to the point.",
    traceback: "A second row is laid beside the child's own: its point walks in from the right hand end, the empty places light between the point and the digits with a short arrow running inward, and grey zeros fill them, ending on the decimal.",
    items: [
      /* learn ML3: answer in the plan = 0.03, with the zero placed in front of the three (rival 0.30 = hung on the right) */
      {
        qid: "M2.S3.T6.C22:ML3",
        kind: "fill",
        num: "3",
        den: 100,
        rival: "0.30",
        answer: "0.03",
        say: "Walk the point in, then fill any empty place.",
        ask: "What decimal is it?",
        miss: "Never hang a zero on the right end."
      },
      /* practice 5: answer in the plan = 0.05, and the zero goes on the left, in front of the five
         (rival 0.5 = the point dropped with nothing filled) */
      {
        qid: "M2.S3.T6.C22:5",
        kind: "fill",
        num: "5",
        den: 100,
        rival: "0.5",
        answer: "0.05",
        say: "Walk it in and fill what is empty.",
        ask: "5 hundredths as a decimal?",
        miss: "Walk on until it matches the counter."
      },
      /* practice 6: answer in the plan = 0.072 (rival 0.720 = the zero hung on the right) */
      {
        qid: "M2.S3.T6.C22:6",
        kind: "fill",
        num: "72",
        den: 1e3,
        rival: "0.720",
        answer: "0.072",
        say: "Walk the point in, then write the decimal.",
        ask: "72 thousandths as a decimal?",
        miss: "Put the zero before the digits."
      }
    ]
  },
  {
    n: 4,
    concept: "Why the side matters so much",
    conceptId: "M2.S3.T6.C23",
    objectiveIds: ["O10"],
    says: ["Try it the other way and see where it lands. How far apart are they?"],
    /* the warm-up runs 9/100 (the book's own example; the upper lane already worked, as no question asks it) */
    steps: [
      { say: "Tap Run to hang zeros on the right.", on: "run", hint: "Run is beside the lower lane." },
      { say: "Tap Measure to see the gap.", on: "measure", hint: "Measure is beside the bar." }
    ],
    ladder: ["Is that the same size as the fraction?", "Walk the top point in, then read it."],
    closing: "Zeros on the left make a number smaller. Zeros on the right make it bigger.",
    learned: "You learned: zeros on the right make a number bigger, not smaller.",
    traceback: "The other lane runs to its finish, the top lane is built with its zeros on the left of the digits, and the distance bar writes how many times apart they are, ending on the decimal.",
    items: [
      /* learn ML4: answer in the plan = They get 6, which is a thousand times too big. The answer is 0.006
         (the slot takes what it should be; the lane shows what they get) */
      {
        qid: "M2.S3.T6.C23:ML4",
        kind: "lane",
        num: "6",
        den: 1e3,
        rival: "6",
        answer: "0.006",
        winMs: 3400,
        say: "Run the lower lane, then type the right decimal.",
        ask: "What should it really be?",
        miss: "Count the places in the lower lane."
      },
      /* practice 7: answer in the plan = It is a hundred times too big. The right answer is 0.04, with one zero placed in front of the four */
      {
        qid: "M2.S3.T6.C23:7",
        kind: "lane",
        num: "4",
        den: 100,
        rival: "4.00",
        answer: "0.04",
        winMs: 3e3,
        say: "Run it and build the top lane.",
        ask: "Someone wrote 4.00: what is right?",
        miss: "Which side got that lane's zeros?"
      },
      /* practice 8: answer in the plan = 0.5 kg, because only one decimal place is wanted and the five fills it on its own
         (rival 0.05 = a padding zero nobody asked for) */
      {
        qid: "M2.S3.T6.C23:8",
        kind: "lane",
        num: "5",
        den: 10,
        rival: "0.05",
        answer: "0.5",
        winMs: 2600,
        over: true,
        say: "Write this turmeric weight as a decimal.",
        ask: "Turmeric: 5 tenths of a kilogram?",
        miss: "The counter holds a single place."
      }
    ]
  }
];
const MODEL = {
  denominators: [10, 100, 1e3],
  fillingZerosGo: "left of the digits, between them and the point",
  card: { digit: 96, point: 56, height: 116, gap: 8 },
  /* the warm-up of each phase (guide steps): its own small fraction, never a question's */
  warmUp: { 1: { num: "7", den: 10 }, 2: { num: "349", den: 100 }, 3: { num: "4", den: 1e3 }, 4: { num: "9", den: 100 } },
  freeNumerators: ["4", "36", "7", "250", "9"]
};
const judge = (item, v) => {
  const s = String(v != null ? v : "").trim();
  if (typeof item.answer === "number") return /^\d+$/.test(s) && Number(s) === item.answer;
  return s === String(item.answer);
};
const oracle = () => PHASES.every((p) => p.items.every((it) => {
  const places = Math.round(Math.log(it.den) / Math.log(10));
  if (Math.pow(10, places) !== it.den) return false;
  if (it.kind === "count") return it.answer === places && String(it.rival) !== String(it.answer);
  const exact = Number(it.num) / it.den;
  const s = String(it.answer), dot = s.indexOf(".");
  if (dot < 1 || s.length - dot - 1 !== places) return false;
  return Math.abs(Number(s) - exact) < 1e-12 && String(it.rival) !== s;
}));
const nearMiss = (item) => item.rival;
const answerForms = (item) => typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer), speakable(String(item.answer))];
const agentKey = (item) => item.answer;
const HOOK = {};
const solve = (item, T2) => T2.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T2.submit(item.answer);
const answer = (item, v) => {
  if (!HOOK.type) return void 0;
  HOOK.type(String(v != null ? v : ""));
  return true;
};
const check = () => HOOK.check ? HOOK.check() : void 0;
const PS_BLUE = shade(CONTENT.hundred, 0.25);
const PS_GREEN = shade(CONTENT.one, 0.25);
const PS_RED = CONTENT.pointer;
const PS_AMBER = CONTENT.ten;
const PS_GREY = "#767676";
const PS_NUMINK = "#5B6770";
const PS_BIG = { cw: 104, pw: 60, h: 120, gap: 10, fs: 72, ag: 18 };
const PS_LANE = { cw: 80, pw: 52, h: 96, gap: 8, fs: 56, ag: 14 };
const PS_SMALL = { cw: 56, pw: 36, h: 76, gap: 6, fs: 40, ag: 12 };
const PS_FP = 80;
const psTypedCells = (s, count) => {
  if (count) return /^\d+$/.test(s) && Number(s) <= 8 ? psPlaces(Number(s)) : null;
  if (!/^\d*\.?\d*$/.test(s) || !/\d/.test(s)) return null;
  const dot = s.indexOf("."), whole = dot < 0 ? s : s.slice(0, dot), frac = dot < 0 ? "" : s.slice(dot + 1), out = [];
  for (const ch of whole) out.push({ k: whole === "0" ? "lead" : "whole", ch });
  if (dot >= 0) out.push({ k: "point" });
  for (const ch of frac) out.push({ k: "frac", ch });
  return out.length <= 9 ? out : null;
};
const PS_KINDS = ["count", "point", "fill", "lane"];
const psZeros = (d) => String(d).length - 1;
const psCells = (digits, at, fill, hang = 0) => {
  const d = digits + "0".repeat(Math.max(0, hang)), nd = d.length, out = [];
  if (at >= nd) out.push({ k: "lead", ch: "0" });
  else for (let i = 0; i < nd - at; i++) out.push({ k: "whole", ch: d[i], hung: i >= digits.length });
  out.push({ k: "point" });
  for (let i = 0; i < at - nd; i++) out.push({ k: "gap", ch: i < fill ? "0" : "" });
  for (let i = Math.max(0, nd - at); i < nd; i++) out.push({ k: "frac", ch: d[i], hung: i >= digits.length });
  return out;
};
const psPlaces = (k) => [{ k: "point" }].concat(Array.from({ length: Math.max(0, k) }, () => ({ k: "gap", ch: "" })));
const psLay = (cells, R, x0) => {
  let x = x0;
  return cells.map((c) => {
    const w = c.k === "point" ? R.pw : R.cw;
    const o = { ...c, x, w };
    x += w + R.gap;
    return o;
  });
};
const psWide = (cells, R) => cells.reduce((s, c) => s + (c.k === "point" ? R.pw : R.cw), 0) + R.gap * Math.max(0, cells.length - 1);
const psWritten = (cells) => {
  const pi = cells.findIndex((c) => c.k === "point");
  const left = cells.slice(0, pi).map((c) => c.ch).join(""), right = cells.slice(pi + 1).map((c) => c.ch || "_").join("");
  return right ? left + "." + right : left;
};
const psFrac = (num, den, x, y) => {
  const P = PS_FP, ds = String(den), len = Math.max(num.length || 1, ds.length), fw = len * P;
  return { x, y, fw, ds, P, nx: x + (fw - Math.max(1, num.length) * P) / 2, dx: x + (fw - ds.length * P) / 2, ny: y, dy: y + P + 22, by: y + P + 6 };
};
const psArrow = (x1, x2, y) => <g pointerEvents="none">
    <line x1={x1} y1={y} x2={x2 - 14} y2={y} stroke={PS_RED} strokeWidth={4} strokeLinecap="round" />
    <path d={`M ${x2 - 18} ${y - 10} L ${x2} ${y} L ${x2 - 18} ${y + 10} Z`} fill={PS_RED} />
  </g>;
const psRow = (laid, y, R, C, o = {}) => {
  const fs = R.fs || (R.h >= 110 ? T.xl : R.h >= 84 ? T.speech : T.label);
  const pi = laid.findIndex((c) => c.k === "point"), p = laid[pi];
  const open = laid.find((c) => c.k === "gap" && !c.ch);
  return <g>
      {laid.map((c, i) => {
    if (c.k === "point") return <g key={i}>
            <rect x={c.x} y={y} width={c.w} height={R.h} rx={RAD.piece} fill={tint(PS_RED, 0.86)} stroke={PS_RED} strokeWidth={2.5} />
            {o.skin && o.skin(c, c.x, y, c.w, R.h)}
            <circle cx={c.x + c.w / 2} cy={y + R.h * 0.72} r={Math.max(7, R.pw * 0.17)} fill={PS_RED} />
          </g>;
    if (c.k === "gap" && !c.ch) return <rect
      key={i}
      x={c.x}
      y={y}
      width={c.w}
      height={R.h}
      rx={RAD.piece}
      fill={tint(PS_AMBER, o.refuse ? 0.5 : 0.8)}
      stroke={shade(PS_AMBER, 0.2)}
      strokeWidth={3}
      strokeDasharray="9 7"
    />;
    const ink = c.k === "lead" || c.k === "gap" || c.hung ? PS_GREY : c.k === "whole" ? PS_BLUE : PS_GREEN;
    return <g key={i}>
            <rect x={c.x} y={y} width={c.w} height={R.h} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
            {o.skin && o.skin(c, c.x, y, c.w, R.h)}
            <text x={c.x + c.w / 2} y={y + R.h / 2 + fs * 0.35} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{c.ch}</text>
          </g>;
  })}
      {o.nums && pi >= 0 && laid.slice(pi + 1).map((c, j) => <text key={"n" + j} x={c.x + c.w / 2} y={y - 12} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={PS_NUMINK}>{j + 1}</text>)}
      {o.arrow && open && p && psArrow(p.x + p.w, open.x + open.w / 2, y + R.h + (R.ag || 18))}
    </g>;
};
const psSayWin = (api, qid) => {
  if (qid === "M2.S3.T6.C20:ML1") api.say("Yes, the two zeros give two places.");
  else if (qid === "M2.S3.T6.C20:1") api.say("A thousand needs three decimal places.");
  else if (qid === "M2.S3.T6.C20:2") api.say("The 29 on top does not change the count.");
  else if (qid === "M2.S3.T6.C21:ML2") api.say("The point walked in three digits.");
  else if (qid === "M2.S3.T6.C21:3") api.say("One step in from the right.");
  else if (qid === "M2.S3.T6.C21:4") api.say("Three steps in, so the 2 stays as a whole one.");
  else if (qid === "M2.S3.T6.C22:ML3") api.say("The zero went in front of the three.");
  else if (qid === "M2.S3.T6.C22:5") api.say("Five hundredths has no tenths at all.");
  else if (qid === "M2.S3.T6.C22:6") api.say("72 thousandths needs one filling zero.");
  else if (qid === "M2.S3.T6.C23:ML4") api.say("That lane was a thousand times too big.");
  else if (qid === "M2.S3.T6.C23:7") api.say("4.00 is four whole ones, not four hundredths.");
  else if (qid === "M2.S3.T6.C23:8") api.say("One place, one digit: no zero needed.");
};
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL: MODEL2, step, stepOn, box, lang = "en", tx = (v) => v }) {
  const C = api.C;
  const tl = useTimeline();
  const tlB = useTimeline();
  const Wd = box ? box.w : W.w;
  const pn = phase && phase.n || n || 1;
  const free = stage === "free";
  const demo = stage === "demo" || stage === "teach";
  const ctx = free ? "free" : demo ? "d" + pn : "q" + pn + "." + index;
  const conf = () => {
    if (free) return { kind: "free", num: MODEL2.freeNumerators[0], den: 100 };
    if (demo) return { kind: PS_KINDS[pn - 1] || "count", ...MODEL2.warmUp[pn] || MODEL2.warmUp[1] };
    return item || {};
  };
  const setup = (c, key) => {
    const den = c.den || 100, z2 = psZeros(den), num = c.num || "";
    const s = {
      ctx: key,
      kind: c.kind || "count",
      num,
      den,
      over: !!c.over,
      lit: [],
      litTop: [],
      at: 0,
      fill: 0,
      hang: 0,
      bAt: 0,
      run: 0,
      measured: false,
      refuse: 0,
      done: false,
      fi: 0,
      di: 1
    };
    if (demo && s.kind === "fill") s.at = z2;
    if (demo && s.kind === "lane") {
      s.at = z2;
      s.fill = Math.max(0, z2 - num.length);
    }
    return s;
  };
  const [S, setS] = useState(() => setup(conf(), ctx));
  const SR = useRef(S);
  SR.current = S;
  const put = (patch) => {
    const nx = { ...SR.current, ...patch };
    SR.current = nx;
    setS(nx);
  };
  const [tb, setTb] = useState(null);
  const tbR = useRef(null);
  tbR.current = tb;
  const putTb = (patch) => {
    const nx = patch === null ? null : { ...tbR.current || {}, ...patch };
    tbR.current = nx;
    setTb(nx);
  };
  const fixing = useRef(false);
  const refuseT = useRef(null);
  useEffect(() => {
    if (stage === "win" || stage === "idle" || stage === "summary") return;
    if (SR.current.ctx === ctx) return;
    tl.stop();
    tlB.stop();
    putTb(null);
    if (fixing.current) {
      fixing.current = false;
      api.lock(false);
    }
    const s = setup(conf(), ctx);
    SR.current = s;
    setS(s);
  }, [ctx, stage]);
  useEffect(() => () => clearTimeout(refuseT.current), []);
  const z = psZeros(S.den), nd = S.num.length, kind = S.kind;
  const lane = kind === "lane" || kind === "free";
  const counted = S.lit.length + S.litTop.length;
  const aGaps = Math.max(0, S.at - nd);
  const aDone = S.at === z && S.fill >= Math.max(0, z - nd);
  const barOn = S.measured && S.run === 2 && aDone;
  const walk = () => {
    const s = SR.current, mx = Math.max(psZeros(s.den), s.num.length), at = (s.at + 1) % (mx + 1);
    put({ at, fill: Math.min(s.fill, Math.max(0, at - s.num.length)) });
    api.sfx.tick();
  };
  const fillOne = () => {
    const s = SR.current, g = Math.max(0, s.at - s.num.length);
    if (s.fill >= g) return;
    put({ fill: s.fill + 1 });
    api.sfx.tick();
  };
  const runLane = () => {
    const s = SR.current;
    if (s.run) return;
    const zz = psZeros(s.den), st = [];
    put({ run: 1 });
    for (let i = 1; i <= zz; i++) st.push([340, () => {
      put({ hang: i });
      api.sfx.tick();
    }]);
    for (let i = 1; i <= zz; i++) st.push([340, () => {
      put({ bAt: i });
      api.sfx.tick();
    }]);
    tlB.run(st, () => {
      put({ run: 2 });
      api.sfx.settle();
    });
  };
  const measure = () => {
    if (!SR.current.measured) {
      put({ measured: true });
      api.sfx.settle();
    }
  };
  const toggle = (top, i) => {
    const s = SR.current, key = top ? "litTop" : "lit", arr = s[key], on = arr.includes(i);
    put({ [key]: on ? arr.filter((k) => k !== i) : arr.concat(i) });
    if (!on) api.sfx.tick();
  };
  const freeSet = (fi, di) => {
    tlB.stop();
    const s = setup({ kind: "free", num: MODEL2.freeNumerators[fi], den: MODEL2.denominators[di] }, "free");
    s.fi = fi;
    s.di = di;
    SR.current = s;
    setS(s);
    api.sfx.tick();
  };
  const refuse = () => {
    put({ refuse: 1 });
    clearTimeout(refuseT.current);
    refuseT.current = setTimeout(() => put({ refuse: 0 }), 900);
  };
  const act = (on) => {
    const s = SR.current;
    if (on.indexOf("den-") === 0) {
      const i = Number(on.slice(4));
      if (!s.lit.includes(i)) {
        put({ lit: s.lit.concat(i) });
        api.sfx.tick();
      }
    } else if (on === "point") walk();
    else if (on === "tray") fillOne();
    else if (on === "run") runLane();
    else if (on === "measure") measure();
    api.did(on);
  };
  const lastTap = useRef(0);
  const tapOnce = () => {
    const now = Date.now();
    if (now - lastTap.current < 200) return false;
    lastTap.current = now;
    return true;
  };
  const press = (name, fn) => {
    if (demo) {
      if (!tapOnce()) return;
      if (name === stepOn) act(name);
      else api.did(name);
      return;
    }
    if (!(stage === "ask" || free) || fixing.current) return;
    if (tbR.current) putTb(null);
    fn();
  };
  api.onEnter(demo && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => {
    if (stepOn) act(stepOn);
  };
  HOOK.type = (v) => api.setTyped(String(v != null ? v : ""));
  const fg = psFrac(S.num, S.den, 20, 2);
  const cntX = 20 + 4 * PS_FP + 20, cntW = 220;
  const tray = { x: Wd - 20 - 236, y: 6, w: 236, h: 170 };
  const showTray = kind === "fill" || lane;
  const R = PS_BIG, rowY = 226;
  const cells = kind === "count" ? S.done && S.num ? psCells(S.num, z, 0) : psPlaces(S.done ? z : counted) : psCells(S.num, S.at, S.fill);
  const laid = psLay(cells, R, Math.round(Wd / 2 - psWide(cells, R) / 2));
  const ax = 200, aY = 198, barY = 306, bY = 390, kw = 200, kx = Wd - 24 - kw;
  const laneN = nd + z, laneRoom = kx - 16 - ax;
  const LR = laneN * PS_LANE.cw + PS_LANE.pw + laneN * PS_LANE.gap <= laneRoom ? PS_LANE : { ...PS_LANE, cw: Math.max(44, Math.floor((laneRoom - PS_LANE.pw - laneN * PS_LANE.gap) / Math.max(1, laneN))), fs: T.speech };
  const laidA = psLay(psCells(S.num, S.at, S.fill), LR, ax);
  const laidB = psLay(psCells(S.num, S.bAt, 0, S.hang), LR, ax);
  const rowA = lane ? laidA : laid;
  const rowAY = lane ? aY : rowY, rowAH = lane ? LR.h : R.h;
  const openA = rowA.filter((c) => c.k === "gap" && !c.ch);
  const drag = useDrag((pay, p, moved) => {
    if (!pay || pay.src !== "zero") return;
    const onLit = moved && p && isFinite(p.x) && openA.some((c) => p.x >= c.x - 10 && p.x <= c.x + c.w + 10 && p.y >= rowAY - 40 && p.y <= rowAY + rowAH + 40);
    const refused = moved ? !onLit : openA.length === 0;
    if (demo) {
      if (!tapOnce()) return;
      if (refused) {
        refuse();
        api.did("zero-elsewhere");
      } else if (stepOn === "tray") act("tray");
      else api.did("tray");
      return;
    }
    if (!(stage === "ask" || free) || fixing.current) return;
    if (tbR.current) putTb(null);
    if (refused) {
      refuse();
      return;
    }
    fillOne();
  });
  useEffect(() => {
    var _a;
    if (!wrong || stage !== "ask") return;
    const s = SR.current, zz = psZeros(s.den), g = Math.max(0, zz - s.num.length), st = [];
    const you = String((_a = wrong.value) != null ? _a : "").trim();
    fixing.current = true;
    api.lock(true);
    putTb(null);
    if (s.kind === "count") {
      const zs = String(s.den).split("").map((ch, i) => ch === "0" ? i : -1).filter((i) => i >= 0);
      st.push([500, () => putTb({ kind: "count", rings: [], places: 0, you })]);
      zs.forEach((_i, k) => st.push([650, () => {
        putTb({ rings: zs.slice(0, k + 1), places: k + 1 });
        api.sfx.tick();
      }]));
      st.push([600, () => putTb({ read: true })]);
    } else if (s.kind === "point") {
      st.push([600, () => putTb({ kind: "point", at: 0, you })]);
      for (let k = 1; k <= zz; k++) st.push([600, () => {
        putTb({ at: k });
        api.sfx.tick();
      }]);
      st.push([600, () => putTb({ read: true })]);
    } else if (s.kind === "fill") {
      st.push([600, () => putTb({ kind: "fill", at: 0, fill: 0, you })]);
      for (let k = 1; k <= zz; k++) st.push([550, () => {
        putTb({ at: k });
        api.sfx.tick();
      }]);
      for (let k = 1; k <= g; k++) st.push([650, () => {
        putTb({ fill: k });
        api.sfx.tick();
      }]);
      st.push([600, () => putTb({ read: true })]);
    } else if (s.over) {
      st.push([600, () => putTb({ kind: "lane", a: { at: 0, fill: 0 }, you })]);
      for (let k = 1; k <= zz; k++) st.push([500, () => {
        putTb({ a: { at: k, fill: 0 } });
        api.sfx.tick();
      }]);
      st.push([600, () => {
        putTb({ read: true, sizes: true });
        api.sfx.settle();
      }]);
    } else {
      st.push([300, () => putTb({ kind: "lane", you })]);
      if (s.run !== 2) {
        st.push([300, () => putTb({ lane: true, hang: 0, bAt: 0 })]);
        for (let k = 1; k <= zz; k++) st.push([380, () => {
          putTb({ hang: k });
          api.sfx.tick();
        }]);
        for (let k = 1; k <= zz; k++) st.push([380, () => {
          putTb({ bAt: k });
          api.sfx.tick();
        }]);
      }
      st.push([500, () => putTb({ a: { at: 0, fill: 0 } })]);
      for (let k = 1; k <= zz; k++) st.push([450, () => {
        putTb({ a: { at: k, fill: 0 } });
        api.sfx.tick();
      }]);
      for (let k = 1; k <= g; k++) st.push([450, () => {
        putTb({ a: { at: zz, fill: k } });
        api.sfx.tick();
      }]);
      st.push([550, () => {
        putTb({ bar: true });
        api.sfx.settle();
      }]);
      st.push([500, () => putTb({ read: true, sizes: true })]);
    }
    tl.run(st, () => {
      fixing.current = false;
      api.lock(false);
    });
  }, [wrong]);
  useEffect(() => {
    if (stage !== "win") return;
    putTb(null);
    fixing.current = false;
    psSayWin(api, item && item.qid);
    const s = SR.current, zz = psZeros(s.den), d = s.num, g = Math.max(0, zz - d.length), st = [];
    if (s.kind === "count") {
      const zs = String(s.den).split("").map((ch, i) => ch === "0" ? i : -1).filter((i) => i >= 0);
      st.push([300, () => put({ litTop: [], lit: s.lit.filter((i) => zs.includes(i)) })]);
      zs.forEach((i) => {
        if (!s.lit.includes(i)) st.push([340, () => {
          put({ lit: SR.current.lit.concat(i) });
          api.sfx.tick();
        }]);
      });
      st.push([500, () => {
        put({ done: true });
        api.sfx.settle();
      }]);
    } else {
      let at = s.at, f0 = s.at <= zz ? Math.min(s.fill, g) : 0;
      if (at > zz) {
        st.push([300, () => put({ at: 0, fill: 0 })]);
        at = 0;
      }
      for (let k = at + 1; k <= zz; k++) st.push([340, () => {
        put({ at: k, fill: Math.min(SR.current.fill, Math.max(0, k - d.length)) });
        api.sfx.tick();
      }]);
      for (let k = f0 + 1; k <= g; k++) st.push([340, () => {
        put({ fill: k });
        api.sfx.tick();
      }]);
      if (s.kind === "lane" && !s.over) {
        if (s.run !== 2) {
          tlB.stop();
          for (let k = 1; k <= zz; k++) st.push([300, () => {
            put({ hang: k, run: 1 });
            api.sfx.tick();
          }]);
          for (let k = 1; k <= zz; k++) st.push([300, () => {
            put({ bAt: k });
            api.sfx.tick();
          }]);
          st.push([200, () => put({ run: 2 })]);
        }
        st.push([400, () => put({ measured: true })]);
      }
      st.push([400, () => {
        put({ done: true });
        api.sfx.settle();
      }]);
    }
    tl.run(st);
  }, [stage]);
  api.share({
    numerator: S.num,
    denominator: S.den,
    counted: kind === "count" ? counted : z,
    pointAt: S.at,
    emptyPlaces: Math.max(0, aGaps - S.fill),
    filled: S.fill,
    wrongLane: S.run === 2,
    gap: barOn ? S.den : 0
  });
  const live = demo || stage === "ask" || free;
  const fraction = () => {
    const ring2 = tb && tb.kind === "count" ? tb.rings || [] : [];
    return <g>
        {S.num === "" && <rect x={fg.nx + 8} y={fg.ny + 8} width={fg.P - 16} height={fg.P - 16} rx={RAD.piece} fill="none" stroke={shade(C.rule, 0.1)} strokeWidth={2.5} strokeDasharray="8 7" />}
        {S.num.split("").map((ch, i) => <g key={"t" + i}>
            {S.litTop.includes(i) && <rect x={fg.nx + i * fg.P + 4} y={fg.ny + 2} width={fg.P - 8} height={fg.P - 4} rx={12} fill={tint(PS_AMBER, 0.55)} stroke={shade(PS_AMBER, 0.15)} strokeWidth={2} />}
            <text x={fg.nx + i * fg.P + fg.P / 2} y={fg.ny + fg.P / 2 + T.display * 0.35} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{ch}</text>
          </g>)}
        <rect x={fg.x - 6} y={fg.by} width={fg.fw + 12} height={10} rx={5} fill={C.ink} />
        {fg.ds.split("").map((ch, i) => <g key={"b" + i}>
            {S.lit.includes(i) && <rect x={fg.dx + i * fg.P + 4} y={fg.dy + 2} width={fg.P - 8} height={fg.P - 4} rx={12} fill={tint(PS_AMBER, 0.55)} stroke={shade(PS_AMBER, 0.15)} strokeWidth={2} />}
            <text x={fg.dx + i * fg.P + fg.P / 2} y={fg.dy + fg.P / 2 + T.display * 0.35} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{ch}</text>
          </g>)}
        {ring2.length > 0 && <g pointerEvents="none">
            {ring2.map((i, k) => <g key={"r" + i}>
                <rect x={fg.dx + i * fg.P + 2} y={fg.dy} width={fg.P - 4} height={fg.P} rx={14} fill="none" stroke={shade(PS_AMBER, 0.1)} strokeWidth={5} />
                <text x={fg.dx + i * fg.P + fg.P / 2} y={fg.dy + fg.P + 30} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PS_NUMINK}>{k + 1}</text>
              </g>)}
          </g>}
        {
      /* the digits a child counts with (phase 1), or the numbers that change (free play) */
    }
        {live && kind === "count" && S.num.split("").map((_c, i) => <Hit key={"ht" + i} id={"num-" + i} x={fg.nx + i * fg.P} y={fg.ny} w={fg.P} h={fg.P} onPress={() => press("num-" + i, () => toggle(true, i))} label={tx("Count this top digit")} />)}
        {live && kind === "count" && fg.ds.split("").map((_c, i) => <Hit key={"hb" + i} id={"den-" + i} x={fg.dx + i * fg.P} y={fg.dy} w={fg.P} h={fg.P} onPress={() => press("den-" + i, () => toggle(false, i))} label={tx("Count this bottom digit")} />)}
        {free && <Hit id="top" x={fg.nx} y={fg.ny} w={Math.max(1, S.num.length) * fg.P} h={fg.P} onPress={() => press("top", () => freeSet((S.fi + 1) % MODEL2.freeNumerators.length, S.di))} label={tx("Change the top number")} />}
        {free && <Hit id="bottom" x={fg.dx} y={fg.dy} w={fg.ds.length * fg.P} h={fg.P} onPress={() => press("bottom", () => freeSet(S.fi, (S.di + 1) % MODEL2.denominators.length))} label={tx("Change the bottom number")} />}
      </g>;
  };
  const counter = () => <g>
      <rect x={cntX} y={4} width={cntW} height={182} rx={RAD.panel} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {
    /* "places counter" on two lines at 36 (its first word, then the rest), the count at 80 */
  }
      {(() => {
    const t = String(tx("places counter")), sp = t.indexOf(" "), a = sp > 0 ? t.slice(0, sp) : t, b = sp > 0 ? t.slice(sp + 1) : "";
    return <g>
          <text x={cntX + cntW / 2} y={44} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{a}</text>
          {b && <text x={cntX + cntW / 2} y={86} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{b}</text>}
        </g>;
  })()}
      <text x={cntX + cntW / 2} y={168} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{kind === "count" ? counted : z}</text>
    </g>;
  const trayLive = live && showTray;
  const trayView = () => <g {...trayLive ? { ...control("tray", tx("Take a zero for an empty place")), ...drag.bind({ src: "zero" }), ...drag.keys({ src: "zero" }) } : {}}>
      <rect x={tray.x} y={tray.y} width={tray.w} height={tray.h} rx={RAD.panel} fill={tint(C.panel, 0.2)} stroke={C.rule} strokeWidth={2} />
      {[0, 1, 2].map((i) => <g key={i}>
          <rect x={tray.x + 12 + i * 74} y={tray.y + 12} width={64} height={88} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          {!(SZ && SZ.px < tray.x + tray.w) && <text x={tray.x + 44 + i * 74} y={tray.y + 56 + T.xl * 0.35} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PS_GREY}>0</text>}
        </g>)}
      {
    /* the label waits while the correction's sizes panel stands over the tray */
  }
      {!(SZ && SZ.px < tray.x + tray.w) && <text x={tray.x + tray.w / 2} y={tray.y + 148} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{tx("zero tray")}</text>}
    </g>;
  const readout = (text, x, y, w, h, fz = T.speech) => <g>
      <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 + fz * 0.35} textAnchor="middle" fontSize={fz} fontWeight={700} fill={C.ink}>{text}</text>
    </g>;
  const pointHit = (row, y, h) => {
    const p = row.find((c) => c.k === "point");
    if (!p || !live || !(kind === "point" || kind === "fill" || lane)) return null;
    return <Hit id="point" x={p.x + p.w / 2 - 36} y={y} w={72} h={h} onPress={() => press("point", walk)} label={tx("Walk the point in one digit")} />;
  };
  const single = () => {
    const strip = tb && (tb.kind === "count" || tb.kind === "point" || tb.kind === "fill");
    let sl = [], text = "", yl = [], yText = "", yx = 0;
    if (strip) {
      const c2 = tb.kind === "count" ? psPlaces(tb.places || 0) : psCells(S.num, tb.at || 0, tb.fill || 0);
      sl = psLay(c2, PS_SMALL, 48);
      if (tb.read) text = tb.kind === "count" ? z + " " + tx(z === 1 ? "place" : "places") : psWritten(c2);
      const full = tb.kind === "count" ? psPlaces(z) : psCells(S.num, z, Math.max(0, z - nd));
      const reach = 48 + psWide(full, PS_SMALL) + 24 + (tb.kind === "count" ? 9 : psWritten(full).length) * T.speech * 0.62 + 40;
      const labW = String(tx("you typed")).length * T.prompt * 0.6 + 16;
      const yc = tb.you ? psTypedCells(tb.you, tb.kind === "count") : null;
      if (yc && yc.length) {
        yx = Wd - 48 - psWide(yc, PS_SMALL);
        if (yx - labW >= reach) yl = psLay(yc, PS_SMALL, yx);
      }
      if (tb.you && !yl.length) {
        yText = tb.you;
        yx = Wd - 48 - Math.max(60, tb.you.length * T.speech * 0.62);
      }
    }
    const end = sl.length ? sl[sl.length - 1].x + sl[sl.length - 1].w : 48;
    return <g>
        {fraction()}
        {counter()}
        {showTray && trayView()}
        {
      /* phase 1 draws no lone point card: the point and its places appear with the first zero counted (or at the win) */
    }
        {!(kind === "count" && !S.done && counted === 0) && psRow(laid, rowY, R, C, { nums: kind !== "count", arrow: kind === "fill", refuse: S.refuse })}
        {pointHit(laid, rowY, R.h)}
        {S.done && kind !== "count" && readout(psWritten(cells), Math.round(Wd / 2 - 140), 392, 280, 104, T.xl)}
        {strip && <g pointerEvents="none">
            <rect x={24} y={380} width={Wd - 48} height={144} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
            {psRow(sl, 424, PS_SMALL, C, { nums: tb.kind !== "count", arrow: tb.kind === "fill" })}
            {text && <text x={end + 24} y={424 + 38 + T.speech * 0.35} fontSize={T.speech} fontWeight={700} fill={C.ink}>{text}</text>}
            {yl.length > 0 && psRow(yl, 424, PS_SMALL, C, { nums: tb.kind !== "count" })}
            {yText && <text x={yx} y={424 + 38 + T.speech * 0.35} fontSize={T.speech} fontWeight={700} fill={C.ink}>{yText}</text>}
            {tb.you && <text x={yx - 16} y={424 + 38 + T.prompt * 0.35} textAnchor="end" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{tx("you typed")}</text>}
          </g>}
      </g>;
  };
  let PIECE = 84;
  const grid = (x, y, f, paint, key) => {
    const cell = PIECE / 10, cells2 = Math.floor(f * 100 + 1e-6), thou = Math.round((f * 100 - cells2) * 10);
    return <g key={key}>
        <rect x={x} y={y} width={PIECE} height={PIECE} rx={4} fill={tint(C.panel, 0.1)} />
        <Skin name="piece" x={x} y={y} w={PIECE} h={PIECE} fit="stretch" />
        {Array.from({ length: Math.min(100, cells2) }, (_v, k) => <rect key={"c" + k} x={x + Math.floor(k / 10) * cell} y={y + k % 10 * cell} width={cell} height={cell} fill={paint} fillOpacity={0.72} />)}
        {thou > 0 && cells2 < 100 && <rect x={x + Math.floor(cells2 / 10) * cell} y={y + cells2 % 10 * cell} width={cell} height={cell * thou / 10} fill={paint} fillOpacity={0.72} />}
        {Array.from({ length: 9 }, (_v, i) => <g key={"l" + i}>
            <line x1={x + (i + 1) * cell} y1={y} x2={x + (i + 1) * cell} y2={y + PIECE} stroke="#1E1E1E" strokeWidth={1} />
            <line x1={x} y1={y + (i + 1) * cell} x2={x + PIECE} y2={y + (i + 1) * cell} stroke="#1E1E1E" strokeWidth={1} />
          </g>)}
        <rect x={x} y={y} width={PIECE} height={PIECE} rx={4} fill="none" stroke="#1E1E1E" strokeWidth={2} />
        {
      /* a few thousandths are a sliver of one cell: a thin dark circle rings it so it reads from the back bench */
    }
        {cells2 === 0 && thou > 0 && <circle cx={x + cell / 2} cy={y + cell * thou / 20} r={11} fill="none" stroke="#1E1E1E" strokeWidth={2} />}
      </g>;
  };
  const wholePiece = (x, y, key) => <g key={key}>
      <rect x={x} y={y} width={PIECE} height={PIECE} rx={4} fill={tint(C.panel, 0.1)} />
      <Skin name="piece" x={x} y={y} w={PIECE} h={PIECE} fit="stretch" />
      <rect x={x} y={y} width={PIECE} height={PIECE} rx={4} fill="none" stroke="#1E1E1E" strokeWidth={2} />
    </g>;
  const sizesLay = () => {
    if (!tb || !tb.sizes) return null;
    const gap = 8, left = 352, right = Wd - 24 - 20;
    const rightW = psWritten(psCells(S.num, z, Math.max(0, z - nd))).length * T.prompt * 0.62;
    const you = String(tb.you || ""), yv = Number(you), ok = /\d/.test(you) && /^\d*\.?\d*$/.test(you) && isFinite(yv);
    const whole = ok ? Math.floor(yv + 1e-9) : 0, frac0 = ok ? yv - whole : 0, fr = frac0 > 1e-9 ? 1 : 0;
    let P = 84, fits = false;
    if (ok) for (let q = 84; q >= 44; q -= 4) {
      const need = (whole + fr) * (q + gap) - gap;
      if (left + 20 + Math.max(q, rightW) + 24 + Math.max(0, need) <= right) {
        P = q;
        fits = true;
        break;
      }
    }
    const hasFrac = fits && fr === 1, frac = fits ? frac0 : 0;
    const nP = fits ? whole : 0;
    const groupW = fits ? Math.max(0, (nP + (hasFrac ? 1 : 0)) * (P + gap) - gap) : 0;
    const labelW = you.length * T.prompt * 0.62 + 14 + String(tx("you typed")).length * T.prompt * 0.58;
    const contentW = Math.max(P, rightW) + 24 + Math.max(groupW, labelW);
    let px = Wd - 24 - contentW - 40;
    if (px < cntX + cntW + 16) px = left;
    return { px, gap, you, ok, frac, hasFrac, nP, P, rightW };
  };
  const SZ = sizesLay();
  if (SZ) PIECE = SZ.P;
  const sizes = () => {
    if (!SZ) return null;
    const { px, gap, you, ok, frac, hasFrac, nP } = SZ;
    const gy = 14, ly = gy + PIECE + 44;
    const right = psWritten(psCells(S.num, z, Math.max(0, z - nd))), rv = Number(S.num) / S.den;
    const gx = px + 20, x0 = gx + Math.max(PIECE, SZ.rightW) + 24;
    return <g pointerEvents="none">
        <rect x={px} y={4} width={Wd - 24 - px} height={180} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
        {grid(gx, gy, rv, CONTENT.one, "right")}
        <text x={gx} y={ly} fontSize={T.prompt} fontWeight={700} fill={C.ink}>{right}</text>
        {ok && Array.from({ length: nP }, (_v, i) => wholePiece(x0 + i * (PIECE + gap), gy, "w" + i))}
        {ok && hasFrac && grid(x0 + nP * (PIECE + gap), gy, frac, CONTENT.hundred, "yours")}
        {you !== "" && <text x={x0} y={ly} fontSize={T.prompt} fontWeight={700} fill={C.ink}>
            {you}<tspan fontSize={T.prompt} fontWeight={600} dx={14}>{tx("you typed")}</tspan>
          </text>}
      </g>;
  };
  const laneLabel = (t, y) => {
    const s = String(t), sp = s.indexOf(" "), a = sp > 0 ? s.slice(0, sp) : s, b = sp > 0 ? s.slice(sp + 1) : "";
    return <g>
        <text x={24} y={y + 40} fontSize={T.prompt} fontWeight={600} fill={C.ink}>{a}</text>
        {b && <text x={24} y={y + 82} fontSize={T.prompt} fontWeight={600} fill={C.ink}>{b}</text>}
      </g>;
  };
  const lanes = () => {
    const tA = tb && tb.a, tBl = tb && tb.lane;
    const shownB = tBl ? psLay(psCells(S.num, tb.bAt || 0, 0, tb.hang || 0), LR, ax) : laidB;
    const tRow = tA ? psLay(psCells(S.num, tA.at, tA.fill), LR, ax) : null;
    const runLive = live && S.run === 0 && !S.over;
    const measureLive = demo ? !S.measured : live && S.run === 2 && aDone && !S.measured && !S.over;
    const barText = barOn || tb && tb.bar ? indian(S.den) + " " + tx("times bigger") : "";
    const bw = kx - 24 - ax;
    return <g>
        {fraction()}
        {!(SZ && SZ.px < cntX + cntW + 8) && counter()}
        {trayView()}
        {laneLabel(tx("zeros left"), aY)}
        {
      /* while the correction builds this lane on its own layer, the child's row waits under it, not drawn twice */
    }
        {!tRow && psRow(laidA, aY, LR, C, { arrow: true, refuse: S.refuse })}
        {pointHit(laidA, aY, LR.h)}
        <rect
      x={ax}
      y={barY + 6}
      width={bw}
      height={60}
      rx={30}
      fill={barText ? tint(PS_AMBER, 0.75) : "none"}
      stroke={barText ? shade(PS_AMBER, 0.2) : shade(C.rule, 0.1)}
      strokeWidth={2.5}
      strokeDasharray={barText ? void 0 : "10 8"}
    />
        {barText && <text x={ax + bw / 2} y={barY + 36 + T.prompt * 0.35} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{barText}</text>}
        <Key id="measure" x={kx} y={barY} w={kw} h={72} C={C} onClick={() => press("measure", measure)} disabled={!measureLive} label={tx("Measure how far apart they are")}>
          <text y={T.prompt * 0.35} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("Measure")}</text>
        </Key>
        {laneLabel(tx("zeros right"), bY)}
        {psRow(shownB, bY, LR, C, {})}
        <Key id="run" x={kx} y={bY + 12} w={kw} h={72} C={C} onClick={() => press("run", runLane)} disabled={!runLive} label={tx("Run the other lane")}>
          <text y={T.prompt * 0.35} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("Run")}</text>
        </Key>
        {S.done && readout(psWritten(psCells(S.num, S.at, S.fill)), kx, aY + 12, kw, 72)}
        {tRow && <g pointerEvents="none">
            <rect x={ax - 8} y={aY - 6} width={kx - ax - 8} height={LR.h + 12} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
            {psRow(tRow, aY, LR, C, { arrow: true })}
            {tb.read && readout(psWritten(psCells(S.num, tA.at, tA.fill)), kx, aY + 12, kw, 72)}
          </g>}
        {sizes()}
      </g>;
  };
  const ring = (x, y, w, h, r = 14, m = 6, sw = 5) => <rect
    className="c4-pulse"
    x={x - m}
    y={y - m}
    width={w + 2 * m}
    height={h + 2 * m}
    rx={r}
    fill="none"
    strokeWidth={sw}
    pointerEvents="none"
    stroke={typeof THEME !== "undefined" && THEME && THEME.enter && THEME.enter[1] || C.accent}
  />;
  const pointRing = (row, y, h) => {
    const p = row.find((c) => c.k === "point");
    return p ? ring(p.x, y, p.w, h, RAD.piece + 3, 3, 4) : null;
  };
  const invite = () => {
    if (stage === "ask" && kind === "fill" && S.at === 0 && !tb) return pointRing(laid, rowY, R.h);
    if (!demo || !stepOn) return null;
    if (stepOn.indexOf("den-") === 0) {
      const i = Number(stepOn.slice(4));
      return ring(fg.dx + i * fg.P, fg.dy, fg.P, fg.P);
    }
    if (stepOn === "point") return lane ? pointRing(laidA, aY, LR.h) : pointRing(laid, rowY, R.h);
    if (stepOn === "tray") return ring(tray.x, tray.y, tray.w, tray.h, RAD.panel + 4);
    if (stepOn === "run") return ring(kx, bY + 12, kw, 72 + EDGE, RAD.key + 4);
    if (stepOn === "measure") return ring(kx, barY, kw, 72 + EDGE, RAD.key + 4);
    return null;
  };
  const dd = drag.drag;
  return <g>
      {lane ? lanes() : single()}
      {invite()}
      {dd && dd.moved && dd.payload && dd.payload.src === "zero" && <g pointerEvents="none">
          <rect x={dd.x - 32} y={dd.y - 40} width={64} height={80} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fLift)" />
          <text x={dd.x} y={dd.y + T.speech * 0.35} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={PS_GREY}>0</text>
        </g>}
    </g>;
}
function Runs({ index, stage, api, lang = "en", tx = (v) => v }) {
  const C = api.C;
  if (stage === "free" || stage === "summary") return null;
  const turned = stage === "demo" || stage === "teach" ? 0 : Math.min(3, (index || 0) + (stage === "win" || stage === "idle" ? 1 : 0));
  return <g pointerEvents="none">
      <text x={22} y={52} fontSize={T.prompt} fontWeight={600} fill={C.ink}>{tx("done")}</text>
      {[0, 1, 2].map((i) => {
    const x = 170 + i * 52, on = i < turned;
    return <g key={i}>
            <rect
      x={x}
      y={13}
      width={40}
      height={50}
      rx={8}
      fill={on ? "#FFFFFF" : "none"}
      stroke={on ? C.rule : shade(C.rule, 0.15)}
      strokeWidth={2}
      strokeDasharray={on ? void 0 : "6 5"}
    />
            {on && <circle cx={x + 20} cy={50} r={6} fill={CONTENT.pointer} />}
          </g>;
  })}
    </g>;
}
function Thumb({ n, result, C, w, h, lang = "en", tx = (v) => v }) {
  const L = result && result.last;
  if (!L || L.value === null || L.value === void 0) return null;
  const ph = PHASES[(n || 1) - 1] || PHASES[0];
  const it = typeof L.item === "number" ? ph.items[L.item] || {} : L.item || {};
  const v = String(L.value).trim(), count = typeof it.answer === "number", mid = h / 2;
  return <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {it.den && <g>
          <text x={50} y={mid - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{it.num || "?"}</text>
          <rect x={14} y={mid - 2} width={72} height={4} rx={2} fill={C.ink} />
          <text x={50} y={mid + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{it.den}</text>
        </g>}
      <text x={w - 14} y={mid + 11} textAnchor="end" fontSize={count ? T.micro : T.label} fontWeight={700} fill={C.ink}>
        {count ? v + " " + tx(v === "1" ? "place" : "places") : v}
      </text>
    </g>;
}
function PointSlider(props) {
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
    Runs,
    judge,
    oracle,
    nearMiss,
    answerForms,
    agentKey,
    solve,
    answer,
    check,
    fitHost: () => null,
    /* a decimal answer: the pad's point key on every question (PATTERNS §4). No cardAnswer: the answers are counts and
       single-box decimals (the child places the point), so no question is answered on a Fraction or Decimal card */
    pointKey: true,
    /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
       whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
    board: true,
    bigPad: true,
    /* r26: this picture is small, so the keypad panel takes the room beside it (the owner, 2026-10-14) */
    /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on
       the blinking Next key (the question bar's right end; the classic layout: the answer slot's place). Delete to keep the timers. */
    nextKey: true,
    /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
    StartArt,
    START_HOOK
    /* the keypad colours: leave THEME unset and the image agent's TOOL_THEME (the slot's images.tsx) is picked up by the
       runtime by itself; set THEME here only to override it (docs/IMAGES.md) */
  }} />;
}
var stdin_default = PointSlider;
export default stdin_default;
