import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
/* M2.S4.T7.C24.2D1 · digit_tester · Digit Tester — standalone build 2026-09-24, source 6f8373af:1648641.
   One file: the react import below is the only one (the host strips it and injects React and five hooks);
   @use-gesture/react 10.3.1 (MIT) is inlined as __gesture; the mascot and any baked
   voice are inline WebP / data URIs; nothing is stored, and the only fetch is a published tool's voice-clip file (TOOL_VOICE_BASE). */
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
    }
  };
}
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
function useVoice(mutedRef, langRef, cfg) {
  const [line, setLine] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const token = useRef(0);
  const last = useRef([]);
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
    }, ms);
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
  }, []);
  const speak = useCallback((lines, done) => {
    const run = ++token.current;
    cur.current = null;
    flush();
    stopEngine();
    setSpeaking(false);
    if (hasBakedVoice(langRef.current)) warmVoice(langRef.current);
    const list = (Array.isArray(lines) ? lines : [lines]).map((l) => speakableIn(l, langRef.current)).filter(Boolean).flatMap((l) => pieces(l));
    last.current = list;
    const step = (i) => {
      if (run !== token.current) return;
      if (i >= list.length) {
        cur.current = null;
        setSpeaking(false);
        if (done) done();
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
        done: () => {
          if (spent || run !== token.current) return;
          spent = true;
          if (cur.current === r) cur.current = null;
          step(i + 1);
        }
      };
      cur.current = r;
      utter(r, 0);
    };
    step(0);
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
    }, r.span);
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
    if (hasBakedVoice(langRef.current)) ensureVoiceCtx();
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
    if (last.current.length) speak(last.current, done);
  }, [speak]);
  const again = useCallback(() => repeat(), [repeat]);
  useEffect(() => () => hush(), [hush]);
  const state = () => ({ voice: hasBakedVoice(langRef.current) ? "baked clips" : (() => {
    const v = pickVoice(langRef.current);
    return v ? `${v.name} (${v.lang})` : null;
  })(), blocked: blocked.current, inFlight: cur.current ? cur.current.text : null });
  return { line, speaking, needsTap, unlock, speak, hush, pause, resume, again, repeat, state };
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
      {shadow("fShadow", 6, 7, 0.16)}
      {shadow("fShadowSoft", 3, 3, 0.14)}
      {shadow("fLift", 14, 10, 0.24)}
      {shadow("fBtnDown", 1, 1.5, 0.18)}
    </defs>;
}
function Invite({ x, y, r = 56, C }) {
  return <circle className="c4-pulse" cx={x} cy={y} r={r} fill="none" stroke={C && C.accent || DEFAULT_CHROME.accent} strokeWidth={5} pointerEvents="none" />;
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
function usePress(onPress, enabled = true) {
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
    pointerBlur();
  };
  return { down, bind, keys };
}
function Hit({ id, x, y, w, h, onPress, label, enabled = true }) {
  const p = usePress(onPress, enabled);
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
function Key({ id, x, y, w, h, C, primary, onClick, children, rx = RAD.key, disabled, label }) {
  const p = usePress(onClick || (() => {
  }), !disabled);
  const base = primary ? shade(C.accent, 0.28) : shade(C.rule, 0.08);
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
    fill={disabled ? tint(C.panel, 0.55) : primary ? "url(#gAccent)" : "url(#gKey)"}
    stroke={disabled ? tint(C.rule, 0.35) : primary ? shade(C.accent, 0.18) : C.rule}
    strokeWidth={2}
  />
        {!disabled && <path d={`M ${x + rx} ${y + 3} H ${x + w - rx}`} stroke="#FFFFFF" strokeOpacity={primary ? 0.4 : 0.95} strokeWidth={3} strokeLinecap="round" />}
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
.c4-ring{animation:c4ring 1.2s ease-in-out infinite}
@keyframes c4ring{50%{stroke-opacity:.35}}
@media (prefers-reduced-motion:reduce){.c4-pulse,.c4-caret,.c4-talk,.c4-ring{animation:none}.c4-ctl .c4-body{transition:none}.c4-fill{transition:none}}
`;
const UI_STRINGS = {
  en: {
    again: "Say it again",
    soundOff: "Sound off",
    soundOn: "Sound on",
    restart: "Start this phase again",
    rubOut: "Rub out",
    enter: "Enter",
    point: "Point",
    freePlay: "Free play",
    playAgain: "Play again",
    wellDone: "Well done!",
    tapToStart: "Tap to start",
    freePlayLine: "Free play.",
    rightFirstTime: (a, b) => `Right first time: ${a} / ${b}`,
    phaseOf: (n, N) => `Phase ${n} of ${N}`,
    questionOf: (i, total) => `Question ${i} of ${total}`,
    stepOf: (k, N) => `Step ${k} of ${N}`,
    word: { now: "now", done: "done", "not yet": "not yet" }
  },
  hi: {
    again: "दोबारा सुनें",
    soundOff: "ध्वनि बंद",
    soundOn: "ध्वनि चालू",
    restart: "यह चरण फिर से शुरू करें",
    rubOut: "मिटाएँ",
    enter: "दर्ज करें",
    point: "बिंदु",
    freePlay: "मुक्त खेल",
    playAgain: "फिर से खेलें",
    wellDone: "बहुत बढ़िया!",
    tapToStart: "शुरू करने के लिए स्पर्श करें",
    freePlayLine: "मुक्त खेल।",
    rightFirstTime: (a, b) => `पहली बार में सही: ${a} / ${b}`,
    phaseOf: (n, N) => `चरण ${n}, ${N} में से`,
    questionOf: (i, total) => `प्रश्न ${i}, ${total} में से`,
    stepOf: (k, N) => `चरण ${k}, ${N} में से`,
    word: { now: "अभी", done: "पूरा", "not yet": "अभी नहीं" }
  },
  gu: {
    again: "ફરી સાંભળો",
    soundOff: "અવાજ બંધ",
    soundOn: "અવાજ ચાલુ",
    restart: "આ તબક્કો ફરી શરૂ કરો",
    rubOut: "ભૂંસો",
    enter: "દાખલ કરો",
    point: "બિંદુ",
    freePlay: "મુક્ત રમત",
    playAgain: "ફરી રમો",
    wellDone: "ખૂબ સરસ!",
    tapToStart: "શરૂ કરવા સ્પર્શ કરો",
    freePlayLine: "મુક્ત રમત.",
    rightFirstTime: (a, b) => `પ્રથમ પ્રયાસમાં સાચા: ${a} / ${b}`,
    phaseOf: (n, N) => `તબક્કો ${n}, ${N} માંથી`,
    questionOf: (i, total) => `પ્રશ્ન ${i}, ${total} માંથી`,
    stepOf: (k, N) => `તબક્કો ${k}, ${N} માંથી`,
    word: { now: "હમણાં", done: "પૂર્ણ", "not yet": "હજી નહીં" }
  }
};
function Header({ C, name, title, soundOn, onAgain, onSound, onRestart, UI }) {
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
      <RoundControl id="again" label={UI.again} cx={1388} cy={40} C={C} onClick={onAgain}><IconAgain c={C.ink} /></RoundControl>
      <RoundControl id="sound" label={soundOn ? UI.soundOff : UI.soundOn} cx={1460} cy={40} C={C} onClick={onSound}><IconSound c={C.ink} on={soundOn} /></RoundControl>
      <RoundControl id="restart" label={UI.restart} cx={1532} cy={40} C={C} onClick={onRestart}><IconRestart c={C.ink} /></RoundControl>
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
      stroke={on ? C.accent : C.rule}
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
    stroke={active ? C.accent : C.rule}
    strokeWidth={active ? 4 : 2}
    filter="url(#fShadowSoft)"
  />
      <rect x={fx - 12} y={barY - 2} width={cw + 24} height={4} rx={2} fill={C.ink} />
      {cell(iw, left, Z.slot.y + 4, ww, Z.slot.h - 8, T.speech, { x: Z.slot.x, y: Z.slot.y, w: split - Z.slot.x, h: Z.slot.h })}
      {cell(it, fx, barY - 4 - ch, cw, ch, T.label, { x: split, y: barY - HIT, w: fw, h: HIT })}
      {cell(ib, fx, barY + 4, cw, ch, T.label, { x: split, y: barY, w: fw, h: HIT })}
    </g>;
}
function Slot({ C, ask, typed, active, live, format, parts, part, onPart, lang, TR: TR2 }) {
  const lines = wrapText(ask || "", 15).slice(0, 3);
  const askLines = lines.map((ln, k) => <text key={k} x={Z.slot.x} y={236 - (lines.length - 1 - k) * 46} fontSize={T.prompt} fontWeight={500} fill={C.ink}>{ln}</text>);
  if (parts && parts.length && parts.some((p) => p.at)) return <g data-zone="slot">
      {askLines}
      <SlotStack C={C} parts={parts} typed={typed} active={active} live={live} format={format} part={part} onPart={onPart} lang={lang} TR={TR2} />
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
        stroke={on ? C.accent : C.rule}
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
    stroke={active ? C.accent : C.rule}
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
    const cw = (Z.pad.w - gap) / cols, ch = Math.min(110, (Z.pad.h - EDGE - gap * (rows - 1)) / rows);
    return <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
        {choices.map((c, j) => {
      const x = Z.pad.x + j % cols * (cw + gap), y = Z.pad.y + Math.floor(j / cols) * (ch + gap);
      const lines = wrapText(lineFor(c.label, lang, TR2), 10).slice(0, 2);
      return <Key key={c.id} id={"choice-" + c.id} label={lineFor(c.label, lang, TR2)} x={x} y={y} w={cw} h={ch} C={C} disabled={!enabled} onClick={() => enabled && onChoice(c.id)}>
              {lines.map((ln, k) => <text key={k} y={11 + (k - (lines.length - 1) / 2) * 32} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={enabled ? C.ink : quiet}>{ln}</text>)}
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
      const ink = off ? quiet : C.ink;
      return <Key
        key={k}
        id={"key-" + k}
        label={NAMES[k] || k}
        x={x}
        y={y}
        w={w}
        h={h}
        C={C}
        primary={k === "enter" && !off}
        disabled={off}
        onClick={() => !off && onKey(k)}
      >
              {k === "back" ? <IconBack c={ink} /> : k === "enter" ? <IconEnter c={off ? quiet : "#FFFFFF"} /> : k === "point" ? <circle cx={0} cy={4} r={8} fill={ink} /> : <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={ink}>{k}</text>}
            </Key>;
    })}
      </g>;
  }
  return <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
      {KEYS.map((k, j) => {
    if (digitsOff && k !== "enter") return null;
    const x = Z.pad.x + j % 3 * (kw + gap), y = Z.pad.y + Math.floor(j / 3) * (kh + gap);
    const off = !enabled;
    const ink = off ? quiet : C.ink;
    return <Key
      key={k}
      id={"key-" + k}
      label={NAMES[k] || k}
      x={x}
      y={y}
      w={kw}
      h={kh}
      C={C}
      primary={k === "enter" && !off}
      disabled={off}
      onClick={() => !off && onKey(k)}
    >
            {k === "back" ? <IconBack c={ink} /> : k === "enter" ? <IconEnter c={off ? quiet : "#FFFFFF"} /> : <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={ink}>{k}</text>}
          </Key>;
  })}
    </g>;
}
function Mascot({ C, speaking, ok, onFail }) {
  const m = MASCOT_BOX;
  return <g data-zone="voice">
      <line x1={m.x + 8} y1={m.y + m.h - 2} x2={m.x + m.w - 8} y2={m.y + m.h - 2} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      {ok ? <image
    data-role="mascot"
    className={speaking ? "c4-talk" : void 0}
    href={MASCOT_IMAGE}
    x={m.x}
    y={m.y}
    width={m.w}
    height={m.h}
    preserveAspectRatio="xMidYMax meet"
    aria-hidden="true"
    pointerEvents="none"
    onError={onFail}
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
function Footer({ C, line, speaking, n, N, i, total, navigable, done, onGo, mascotOk, onMascotFail, UI }) {
  const b = Z.bubble;
  const big = wrapText(line, 24);
  const size = big.length > 2 ? T.label : T.speech;
  const lines = big.length > 2 ? wrapText(line, 32).slice(0, 3) : big;
  const lh = big.length > 2 ? size + 6 : size + 8;
  const top = b.y + b.h / 2 - (lines.length - 1) * lh / 2 + size * 0.36;
  const pitch = Z.bar.w / Math.max(N, 1);
  return <g>
      <Mascot C={C} speaking={speaking} ok={mascotOk} onFail={onMascotFail} />
      <g data-zone="bubble">
        <path d={`M ${b.x} ${b.y + 30} L ${b.x - 18} ${b.y + 44} L ${b.x} ${b.y + 58} Z`} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={24} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        <rect x={b.x + 1} y={b.y + 32} width={4} height={24} fill="#FFFFFF" />
        {lines.map((ln, k) => <text key={k} x={b.x + 30} y={top + k * lh} fontSize={size} fontWeight={500} fill={C.ink}>{ln}</text>)}
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
            <text x={128} y={y + 74} fontSize={T.micro} fontWeight={500} fill={learnedInk}>{lineFor(p.learned, lang, TR2)}</text>
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
      {freePlay && <Key id="free-play" label={UI.freePlay} x={490} y={628} w={300} h={96} C={C} primary onClick={onFree}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill="#FFFFFF">{UI.freePlay}</text>
        </Key>}
      <Key id="play-again" label={UI.playAgain} x={freePlay ? 810 : 650} y={628} w={300} h={96} C={C} onClick={onAgain}>
        <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{UI.playAgain}</text>
      </Key>
    </g>;
}
const RING_OF = {
  header: Z.header,
  runs: Z.runs,
  work: Z.work,
  slot: { x: Z.slot.x, y: 150, w: Z.slot.w, h: 192 },
  pad: Z.pad,
  voice: MASCOT_BOX,
  bubble: Z.bubble,
  bar: { x: Z.bar.x, y: Z.bar.y - 8, w: Z.bar.w, h: 76 }
};
function ToolFrame({ props, tool }) {
  var _a;
  const P = props || {};
  const phases = tool.PHASES || [];
  const N = Math.max(phases.length, 1);
  const [mountPhase] = useState(() => {
    const v = Number(P.phase);
    return P.phase === void 0 || P.phase === null || P.phase === "" || !isFinite(v) ? null : Math.min(Math.max(Math.round(v), 1), N);
  });
  const navigable = mountPhase === null || ((_a = P.navigableDots) != null ? _a : P.additionalProps && P.additionalProps.navigableDots) === true;
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
  const mutedRef = useRef(P.muted === true || P.soundDefault === false);
  const [soundOn, setSoundOn] = useState(!mutedRef.current);
  const sfx = useMemo(() => makeSfx(mutedRef), []);
  const langRef = useRef("en");
  langRef.current = P.lang === "hi" || P.lang === "gu" ? P.lang : "en";
  const lang = langRef.current;
  const UI = UI_STRINGS[lang];
  const tx = (v) => lineFor(v, lang, tool.TR);
  const voice = useVoice(mutedRef, langRef, { rate: 0.92, pitch: 1.06, ...tool.VOICE || {} });
  const [mascotOk, setMascotOk] = useState(true);
  const mascotRef = useRef(true);
  const [ring, setRing] = useState(null);
  const [done, setDone] = useState([]);
  const [run, setRun] = useState(0);
  const [stage, setStage] = useState("teach");
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
  const setTyped = (v) => {
    const nv = typeof v === "function" ? v(typedRef.current) : String(v != null ? v : "");
    typedRef.current = nv;
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
  };
  const item = items[Math.min(i, items.length - 1)] || {};
  const say = (it) => tx(it.say) || tx(it.ask) || "";
  const live = useRef({});
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
    } catch (e) {
    }
  }, []);
  useEffect(() => {
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
    setStage("teach");
    const lines = [...idx === 0 ? tool.OPENING || [] : [], ...phase.says || []].map((l) => tx(l));
    if (phase.demo) {
      const go = fireOnce(() => {
        demoOpen.current = true;
        setStage("demo");
        pendingAdvance.current = null;
      });
      pendingAdvance.current = go;
      voice.speak(lines, go);
      later(go, lines.reduce((a, l) => a + readMs(speakable(l)), 0) + 6e3);
    } else {
      const full = [...lines, say(items[0] || {})];
      const go = fireOnce(() => {
        setStage("ask");
        pendingAdvance.current = null;
      });
      pendingAdvance.current = go;
      voice.speak(full, go);
      later(go, full.reduce((a, l) => a + readMs(speakable(l)), 0) + 6e3);
    }
    return () => {
      clearLater();
      voice.hush();
      pendingAdvance.current = null;
    };
  }, [run]);
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
    voice.speak(full, go);
    later(go, full.reduce((a, l) => a + readMs(speakable(l)), 0) + 6e3);
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
    const L = live.current;
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
    const go = (k) => {
      if (summaryTok.current !== tk) return;
      if (k >= phases.length) {
        setSummaryRow(-1);
        return;
      }
      setSummaryRow(k);
      voice.speak(tx(phases[k].learned) || tx(phases[k].closing) || "", () => go(k + 1));
    };
    voice.speak([tx(L.phase.closing), tx(tool.FINISH_LINE) || null].filter(Boolean), () => go(0));
  };
  const phaseEnd = () => {
    sfx.win();
    const L = live.current;
    setDone((d) => d.includes(L.n) ? d : [...d, L.n]);
    if (L.idx === phases.length - 1) {
      showSummary();
      return;
    }
    setStage("idle");
    let gone = false;
    const walk = () => {
      if (gone) return;
      gone = true;
      pendingAdvance.current = null;
      later(() => enterPhase(L.idx + 1, 0), 1400);
    };
    const closing = [tx(L.phase.closing)].filter(Boolean);
    pendingAdvance.current = walk;
    voice.speak(closing, walk);
    later(walk, closing.reduce((a, l) => a + readMs(speakable(l)), 0) + 6e3);
  };
  const freePlay = () => {
    summaryTok.current++;
    clearLater();
    voice.hush();
    enterRef.current = null;
    capture(null);
    setSummaryRow(-1);
    setTyped("");
    setWrong(null);
    setLocked(false);
    setStage("free");
    voice.speak(tx(tool.FREE_LINE) || UI.freePlayLine);
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
    var _a2, _b;
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
      later(advance, (_b = (_a2 = it.winMs) != null ? _a2 : tool.winMs) != null ? _b : 1600);
      return true;
    }
    sfx.wrong();
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
    const rung = t === 1 ? it.miss || ladder[0] : t === 2 ? ladder[0] || it.miss : ladder[1] || ladder[0];
    if (rung) voice.speak(tx(rung));
    return false;
  };
  const commit = (v) => enterRef.current ? enterRef.current(v) : submit(v);
  const press = (k) => {
    const L = live.current;
    if (k === "enter" && L.stage === "demo") {
      if (enterRef.current) enterRef.current(void 0);
      return;
    }
    if (captureRef.current && (L.stage === "ask" || L.stage === "free") && !L.locked) {
      captureRef.current(k);
      return;
    }
    if (L.stage !== "ask" || L.locked) return;
    if (k === "point" && (!tool.pointKey || L.item.parts)) return;
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
  const restart = () => ["summary", "free"].includes(live.current.stage) ? playAgain() : enterPhase(live.current.idx, 0);
  const enterItem = (at) => {
    const a = Math.min(Math.max(at, 0), live.current.items.length - 1);
    clearLater();
    voice.hush();
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
    if (mutedRef.current && !was) voice.pause();
    else if (!mutedRef.current && was) voice.resume();
  };
  const toggleSound = () => setMuted(!mutedRef.current);
  useEffect(() => {
    if (typeof P.muted === "boolean" && P.muted !== mutedRef.current) setMuted(P.muted);
  }, [P.muted]);
  const highlight = (id) => {
    const key = String(id);
    if (!RING_OF[key]) return false;
    setRing(key);
    later(() => setRing((r) => r === key ? null : r), 2400);
    return true;
  };
  useEffect(() => {
    const h = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^[0-9]$/.test(e.key)) {
        press(e.key);
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
        else if (live.current.stage === "ask") setTyped("");
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });
  live.current = { idx, n, phase, i, item, stage, typed, tries, submit, setTyped, items, locked };
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
        const ps = slotPartsOf(v, L.item.parts.length);
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
      const r = tool.check ? tool.check(L.item) : void 0;
      if (r === void 0) press("enter");
      return true;
    },
    reset: () => {
      restart();
      return true;
    },
    next: () => {
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
    TOOL_API.forEach((m) => {
      proxy[m] = (...a) => apiRef.current[m](...a);
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
    say: (lines, doneFn) => voice.speak(Array.isArray(lines) ? lines.map((l) => tx(l)) : tx(lines), doneFn),
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
    C,
    W
  };
  const workProps = { phase, n, item, index: i, stage, wrong, typed, part, captured, api, MODEL: tool.MODEL, lang, tx };
  const Work2 = tool.Work;
  const Runs = tool.Runs;
  const rz = ring ? RING_OF[ring] : null;
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
        <Header
    C={C}
    name={tx(tool.TOOL_NAME)}
    title={tx(phase.concept)}
    soundOn={soundOn}
    onAgain={() => voice.repeat(pendingAdvance.current || void 0)}
    onSound={toggleSound}
    onRestart={restart}
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
        <g data-zone="work" transform={`translate(${W.x},${W.y})`}>{Work2 && <Work2 key={run} {...workProps} />}</g>
        <Slot
    C={C}
    ask={stage === "teach" ? "" : stage === "free" ? UI.freePlay : tx(item.ask)}
    typed={stage === "free" ? "" : typed}
    active={stage === "ask" && !captured}
    live={stage === "ask"}
    format={tool.format}
    lang={lang}
    TR={tool.TR}
    parts={stage === "free" ? null : item.parts}
    part={part}
    onPart={pickPart}
  />
        {
    /* no host Next key: the tool walks on to the next phase by itself */
  }
        <Pad
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
  />
        </g>
        {stage === "summary" && <Summary
    C={C}
    phases={phases}
    results={results.current}
    row={summaryRow}
    showScore={P.showScore !== false}
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
    speaking={voice.speaking}
    n={n}
    N={N}
    i={i}
    total={items.length}
    navigable={navigable}
    done={done}
    onGo={goPhase}
    mascotOk={mascotOk}
    onMascotFail={mascotFail}
    UI={UI}
  />
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
const MASCOT_SIZE = { w: 390, h: 420 };
const TOOL_VOICE = {"एक संख्या, हर खाने में एक अंक, और उसके नीचे चार बत्तियाँ।":"46c2af79ec8c599cc21b.ogg","चार जाँचें हुईं, हर खाना गिना गया, और एक बत्ती बुझी ही रही।":"5147c2ab0be1b7c4efea.ogg","मुक्त खेल।":"ccabc6dc1689df81851d.ogg","किसी खाने को छूकर उसका अंक बदलो।":"0fd54fac198b4e2fdfda.ogg","फिर कोई भी बत्ती दबाकर संख्या जाँचो।":"c5f4392a066ca32fb5dd.ogg","अंत छोड़कर सब ढक दो।":"58bffda1f5af8aef6131.ogg","अब भी उत्तर दे सकते हो?":"7bc1677b755bb9c07473.ogg","किस अंक से पता चला?":"6ff45eb83e4c717e4f3f.ogg","किसी जाँच की बत्ती दबाओ।":"0d5ac561e023fbabed1d.ogg","पर्दा आख़िरी खाने के सिवा सब ढक देता है।":"74ad6773e3cd8c548057.ogg","इकाई के खाने में कौन-सा अंक है?":"5c2234c2799b3d04189a.ogg","सिर्फ़ वही अंक पढ़ो जो अभी दिख रहा है, फिर तय करो।":"97a050695f053f81f670.ogg","दो, पाँच और दस की जाँच अकेला इकाई का अंक ही तय कर देता है।":"1f5c08f15e42271b454c.ogg","तुमने सीखा: दो, पाँच और दस में सिर्फ़ आख़िरी अंक काम आता है।":"8ee4d218052042ed4a92.ogg","क्या चार हज़ार तीन सौ छियासी संख्या दो से विभाज्य है?":"768f9d29bc5a00531cdf.ogg","सिर्फ़ आख़िरी सिरा देखो।":"d9395e7644ce96d751ce.ogg","इकाई का खाना कौन-सा है?":"ea614ab91b7a7a2f58ca.ogg","क्या सात हज़ार तीन सौ चौदह संख्या पाँच से विभाज्य है?":"c8d71acb491e91fb6a8f.ogg","पाँच की जाँच में इकाई के कौन-से अंक पास होते हैं?":"424554a2a509c1c28dac.ogg","क्या छह हज़ार चार सौ सत्तर संख्या दस से विभाज्य है?":"108b0176074d956fbfce.ogg","दस के लिए आख़िरी खाने में क्या होना चाहिए?":"a6f43a04abb73051feaf.ogg","हर खाना नीचे लाओ, खाली दिखने वाले भी।":"d533492dac6c1b4368ab.ogg","कोई खाना न छूटे।":"c6e4c01d84cb196be56e.ogg","इस संख्या का हर खाना खींचकर नीचे की पट्टी पर रखो।":"0c6d3839b8b29dc80c7a.ogg","हर खाना पट्टी पर है, शून्य भी।":"c7b342aaf4d0ecc60760.ogg","इस संख्या में कुल कितने खाने हैं?":"f2512addd2bd0007c6d0.ogg","पट्टी का हर अंक छूते हुए योग ज़ोर से बोलो।":"37c8901684a39e643aa3.ogg","तीन की जाँच के योग में हर अंक जुड़ता है, शून्य भी।":"f0f16b0b0e456fca361b.ogg","तुमने सीखा: हर अंक जोड़ो, शून्य भी, फिर योग को जाँचो।":"4c67c09e87563ec62160.ogg","चालीस हज़ार छह सौ आठ को तीन के लिए जाँचना है।":"515fe21e678994ae3749.ogg","पट्टी का हर अंक जोड़ो।":"305f84e993af5fadec8f.ogg","योग कितना है?":"bd789dd3c438316ba17f.ogg","पट्टी के खाने गिनो।":"f2152355a0ed72666f04.ogg","क्या हर एक तुम्हारे योग में जुड़ा?":"7f79773154f713d04a39.ogg","तीन हज़ार एक सौ पाँच के सारे अंक जोड़ो।":"4534a565758866b12e09.ogg","पहले हर खाना नीचे लाओ, फिर योग लिखो।":"fc3859b1e4478f53fece.ogg","जोड़ते समय पट्टी के हर अंक पर उँगली रखो।":"63bc5cb6ddb1f1c528ed.ogg","पचास हज़ार तिहत्तर की तीन से विभाज्यता जाँचो।":"02d1ba686ea316b0399a.ogg","सारे खाने नीचे उतारो, फिर तय करो।":"7a263d10b02abcf66c27.ogg","क्या योग तीन से पूरा-पूरा बँट जाता है?":"caf23c80962eb7dd5aa3.ogg","यह संख्या यहाँ की हर जाँच में पास हुई।":"c6582aaf3291c1281316.ogg","बुझी बत्ती वह जाँच है जो इस अध्याय में नहीं सिखाई गई।":"074c681190ee1ede7bc9.ogg","जिस संख्या के बारे में पूछा है, क्या वह इनमें से एक है?":"722e14bba3ecde4644d3.ogg","बत्तियाँ गिनो, फिर उस संख्या वाली बत्ती ढूँढो।":"6d97591b37352c91dcd1.ogg","जाँच उसी संख्या का उत्तर देती है जिससे जाँचा, किसी और का नहीं।":"974278234bac954cbf55.ogg","इसलिए ये चार जाँचें चार बातें तय करती हैं, और कुछ नहीं।":"0a3893e992656c934f73.ogg","तुमने सीखा: यहाँ की चार जाँचें और कुछ तय नहीं करतीं।":"7f8cc6a1aacf88d0096a.ogg","एक संख्या दो, तीन, पाँच और दस की जाँच में पास होती है।":"7354207849f5dd2ee93f.ogg","अब तुम चार के बारे में क्या जानते हो?":"80bfd24593e17c15ccb7.ogg","इस अध्याय ने तुम्हें कौन-सी जाँचें सिखाई हैं?":"7a09639939fb0ff6d87d.ogg","एक संख्या के अंत में शून्य है, और उसके अंकों का योग बारह है।":"b7968d7e36900c639e18.ogg","इस अध्याय की चार जाँचों में से यह किनमें पास है?":"eb4531925a84bf084e12.ogg","जिन जाँचों में यह पास है, उनकी बत्तियाँ छुओ।":"86c6604f43742410a771.ogg","फिर एंटर दबाओ।":"2ebdb1f2305a8a66339e.ogg","एक-एक करके बत्तियाँ लो।":"ad5201e8767136bff7c4.ogg","हर बत्ती क्या देखती है?":"e3838140f055db538598.ogg","एक बच्ची दिखाती है कि सात हज़ार पाँच संख्या तीन से विभाज्य है।":"e8c74fbba545d991583e.ogg","फिर वह कहती है कि यह संख्या छह से भी विभाज्य होगी।":"9c0c388c39f628bef4f9.ogg","जाँच ने क्या साबित किया?":"3bb7cd11303f4b050fd3.ogg","उसने असल में कौन-सी जाँच की?":"d5f7941efe50c8396ec5.ogg","हर भागीदार को गिनो।":"5920e24f1bc9830aa48f.ogg","क्या तुमने बाँटने वाले को भी गिना?":"86bcb302b1dd545be501.ogg","क्या कोई भागीदार अभी गिना नहीं गया?":"d432239460ab6047fa69.ogg","लोगों को एक-एक करके गिनो, डिब्बे में सही का निशान लगाओ।":"99f9fd0ed99aff7a0673.ogg","फिर नई गिनती से बाँटो।":"c3d63a4764b591232480.ogg","भाजक चुनने से पहले हर भागीदार को गिनो, बाँटने वाले को भी।":"59b908d3585af6b96e68.ogg","तुमने सीखा: बाँटने वाला भी भागीदार होता है।":"694e67cb73a8845c0521.ogg","एक लड़का अपनी पार्टी में चार दोस्तों को बुलाता है।":"53866927381e9188b2e7.ogg","उसके पास बराबर बाँटने को पैंतीस लड्डू हैं।":"cdd29a7694e2da13dcde.ogg","कौन-कौन भागीदार हैं, और क्या कुछ बचेगा?":"59defe9ab096788e0f59.ogg","कितने दोस्त बुलाए गए थे?":"51e47bc1e3a79c1e2b33.ogg","एक लड़की पचास मिठाइयाँ अपने पाँच दोस्तों के साथ बाँटती है।":"864eb90b73a11f6a3352.ogg","अपना हिस्सा भी रखती है।":"c6e4f0c37100b0979c3c.ogg","वह पचास को पाँच से जाँचकर पक्का मानती है कि कुछ नहीं बचेगा।":"faad458202fb0033c533.ogg","क्या लड़की तुम्हारी गिनती में है, या सिर्फ़ उसके दोस्त?":"6e966e80c47ead9abb86.ogg","एक रसोइए के पास सत्तर रोल हैं।":"2d38b84ca6cbc4210d55.ogg","वह सात दोस्तों को बाँटता है, और एक हिस्सा ख़ुद लेता है।":"5da334e76c5281eb7830.ogg","वह सत्तर को सात से जाँचकर कहता है कि एक भी रोल नहीं बचेगा।":"b81e5fc281b303e4b5cd.ogg","उससे क्या छूट गया?":"6a6592f36415c5dd7977.ogg","रोल की थाली किसके हाथ में है?":"c795fd2edfc1fd3ade95.ogg","अभी नहीं।":"85bd48a0b31c7850e317.ogg","जब तक कोई खाना ऊपर है, पट्टी खुली रहती है।":"377ee95c6ef0f06a542c.ogg","लड़के के डिब्बे में सही का निशान लगाओ, ताकि वह भी गिना जाए।":"c8f6a0317c2f0759cff1.ogg","लड़की के डिब्बे में सही का निशान लगाओ, ताकि वह भी गिनी जाए।":"14ad54089378e7a669df.ogg","रसोइए के डिब्बे में सही का निशान लगाओ, ताकि वह भी गिना जाए।":"e8436b971ccdcc84093a.ogg","એક સંખ્યા, દરેક ખાનામાં એક અંક, અને તેની નીચે ચાર બત્તીઓ.":"278bd34debaf82953d62.ogg","ચાર ચકાસણી થઈ, દરેક ખાનું ગણાયું, અને એક બત્તી બંધ જ રહી.":"668aa6b6b07fbbcbb486.ogg","મુક્ત રમત.":"bcfc14c1819f3e6a51cd.ogg","કોઈ ખાનાને અડકીને તેનો અંક બદલો.":"f37d72896b118e1499f4.ogg","પછી કોઈ પણ બત્તી દબાવી સંખ્યા ચકાસો.":"2478cdadd2f8cb44f4a7.ogg","છેલ્લું ખાનું છોડી બધું ઢાંકી દો.":"6c2c40b0cf78dc072a33.ogg","શું હજી જવાબ આપી શકો?":"d7dcbeb01c5d418f5f9b.ogg","કયા અંકથી ખબર પડી?":"3c22637045b0acae2f45.ogg","ચકાસણીની બત્તી દબાવો.":"6fcaa1e67b3dcce4980d.ogg","પડદો છેલ્લા ખાના સિવાય બધું ઢાંકી દે છે.":"a57ef7ba900444ce02d1.ogg","એકમના ખાનામાં કયો અંક?":"71a4daee7d3983e47b8f.ogg","જે અંક હજી દેખાય છે ફક્ત તે જ વાંચો, પછી નક્કી કરો.":"1302a7f7e661529fae1d.ogg","બે, પાંચ અને દસની ચકાસણી એકલો એકમનો અંક જ નક્કી કરી દે છે.":"9d72f17dc1d50a201837.ogg","તમે શીખ્યા: બે, પાંચ અને દસ માટે ફક્ત છેલ્લો અંક જ કામનો છે.":"9fadf0ee8e2b61746fc4.ogg","શું ચાર હજાર ત્રણસો છ્યાસી એ બે વડે વિભાજ્ય છે?":"6b48832bef3c7e62f1a1.ogg","ફક્ત તેનો છેડો જુઓ.":"5b17d1ccd40afec95721.ogg","એકમનું ખાનું કયું છે?":"2a3c0417177bc8f6ac48.ogg","શું સાત હજાર ત્રણસો ચૌદ એ પાંચ વડે વિભાજ્ય છે?":"53becc66f5f3d96d75ce.ogg","પાંચની ચકાસણીમાં એકમના કયા અંક પાસ થાય છે?":"f0bae1dc3f4e387e1209.ogg","શું છ હજાર ચારસો સિત્તેર એ દસ વડે વિભાજ્ય છે?":"ca4bb5b11385c7abfa4e.ogg","દસ માટે છેલ્લા ખાનામાં શું હોવું જોઈએ?":"c1ba58d57176544394bd.ogg","દરેક ખાનું નીચે લાવો, ખાલી દેખાતાં પણ.":"58e40d6649ee12366cda.ogg","એક પણ ખાનું છોડશો નહીં.":"6064a4f63d15ca89112a.ogg","આ સંખ્યાનું દરેક ખાનું ખેંચીને નીચેની પટ્ટી પર મૂકો.":"01e61237daa67c9ba788.ogg","દરેક ખાનું પટ્ટી પર છે, શૂન્ય પણ.":"d7e386a28553a3291ba7.ogg","આ સંખ્યામાં કુલ કેટલાં ખાનાં છે?":"e1d98bb697ef9fda0650.ogg","પટ્ટી પરના દરેક અંકને અડકતાં સરવાળો મોટેથી બોલો.":"34e3066b06013fcaab45.ogg","ત્રણની ચકાસણીના સરવાળામાં દરેક અંક ઉમેરાય છે, શૂન્ય પણ.":"ab50801f8668ec191a45.ogg","તમે શીખ્યા: દરેક અંક ઉમેરો, શૂન્ય પણ, પછી સરવાળો ચકાસો.":"a12e0d33b93fed6cabc5.ogg","ચાલીસ હજાર છસો આઠને ત્રણ માટે ચકાસવાનું છે.":"1a5eaa0583ff29cd71d5.ogg","પટ્ટીનો દરેક અંક ઉમેરો.":"e8ba93aca7dc8d83d2ee.ogg","સરવાળો કેટલો છે?":"8fa60ebed542a8e3fa96.ogg","પટ્ટી પરનાં ખાનાં ગણો.":"32a28ae4f0e984ef4732.ogg","શું દરેક તમારા સરવાળામાં ઉમેરાયું?":"4683e0d950663723af9f.ogg","ત્રણ હજાર એકસો પાંચના બધા અંક ઉમેરો.":"18b89d823dbcec5fbc29.ogg","પહેલાં દરેક ખાનું નીચે લાવો, પછી સરવાળો લખો.":"3c28b8a75165fa00f7c1.ogg","ઉમેરતી વખતે પટ્ટી પરના દરેક અંક પર આંગળી મૂકો.":"e9c095837507bb003e6a.ogg","ચકાસો કે પચાસ હજાર તોતેર એ ત્રણ વડે વિભાજ્ય છે કે નહીં.":"48d1b2f02a411a89828b.ogg","બધાં ખાનાં નીચે ઉતારો, પછી નક્કી કરો.":"6028e97eeb7044851aa9.ogg","શું સરવાળો ત્રણ વડે પૂરેપૂરો ભાગી શકાય છે?":"4f5f8b17f1f77cb757a9.ogg","આ સંખ્યા અહીંની દરેક ચકાસણીમાં પાસ થઈ.":"5a5b3af27c87644409af.ogg","બંધ બત્તી એવી ચકાસણી છે જે આ પ્રકરણમાં શીખવી નથી.":"c5dd29bf84a60b01e667.ogg","જે સંખ્યા વિશે પૂછ્યું છે, શું તે આમાંની એક છે?":"a4ab1d97086a3305b2d6.ogg","બત્તીઓ ગણો, પછી તે સંખ્યાવાળી બત્તી શોધો.":"a0a0a1a11fb666b16613.ogg","ચકાસણી એ જ સંખ્યાનો જવાબ આપે છે જેનાથી ચકાસ્યું.":"b35806c3796399b14637.ogg","બીજી કોઈ સંખ્યાનો નહીં.":"f065c701f7a9d2e0492f.ogg","તેથી આ ચાર ચકાસણી ચાર વાત નક્કી કરે છે, બીજું કંઈ નહીં.":"8f8072f870b3816852a8.ogg","તમે શીખ્યા: અહીંની ચાર ચકાસણી બીજું કંઈ નક્કી કરતી નથી.":"4c42ebe5f3274291ca29.ogg","એક સંખ્યા બે, ત્રણ, પાંચ અને દસની ચકાસણીમાં પાસ થાય છે.":"d745460e91997f7ed648.ogg","હવે તમે ચાર વિશે શું જાણો છો?":"5a756c9c6cd4afb3c254.ogg","આ પ્રકરણે તમને કઈ ચકાસણી શીખવી છે?":"3beafd471da99b7e21ac.ogg","એક સંખ્યાનો છેલ્લો અંક શૂન્ય છે, અને તેના અંકોનો સરવાળો બાર છે.":"f95de8bf6a5813d372cd.ogg","આ પ્રકરણની ચાર ચકાસણીમાંથી તે કઈમાં પાસ થાય છે?":"6f98d17e63809d47c102.ogg","જેમાં પાસ થાય તે બત્તીઓને અડકો.":"ad0d70fb53ab7a404720.ogg","પછી એન્ટર દબાવો.":"ed38ca38f381b36d5cc5.ogg","એક પછી એક બત્તી લો.":"6bef3c31faf00ae34f71.ogg","દરેક બત્તી શું જુએ છે?":"2922c8f51af54331b8fc.ogg","એક બાળકી બતાવે છે કે સાત હજાર પાંચ એ ત્રણ વડે વિભાજ્ય છે.":"246532f71fb900640e36.ogg","પછી તે કહે છે કે આ સંખ્યા છ વડે પણ વિભાજ્ય હશે.":"789e41825228ed21eb2c.ogg","તેની ચકાસણીએ શું સાબિત કર્યું?":"fd7589c505fc3b0961c6.ogg","તેણે ખરેખર કઈ બત્તીથી ચકાસ્યું?":"6ab868c1a0c03f01e960.ogg","દરેક ભાગીદારને ગણો.":"270cdd417d681b6afd05.ogg","વહેંચનારને પણ ગણ્યા?":"10a29007ebf693a5ff79.ogg","શું કોઈ ભાગીદાર હજી ગણાયો નથી?":"c00133740764f66ba289.ogg","લોકોને એક પછી એક ગણો, ચોકઠામાં ખરાની નિશાની કરો.":"cebd8fd5069d5372780a.ogg","પછી નવી ગણતરીથી વહેંચો.":"d354d16c50f3f5075af0.ogg","ભાજક પસંદ કરતાં પહેલાં દરેક ભાગીદારને ગણો, વહેંચનારને પણ.":"955fb4b15cbe4b755bde.ogg","તમે શીખ્યા: વહેંચનાર પણ ભાગીદાર હોય છે.":"e7fdca823ff8b282a278.ogg","એક છોકરો પોતાની પાર્ટીમાં ચાર મિત્રોને બોલાવે છે.":"ce941b406b28c5d5b90a.ogg","તેની પાસે સરખા વહેંચવા પાંત્રીસ લાડુ છે.":"c655a5473bcfe19f6461.ogg","કોણ કોણ ભાગીદાર છે, અને શું કંઈ વધશે?":"1c32a344b222a4a0df72.ogg","કેટલા મિત્રોને બોલાવ્યા?":"3931db7cb44016c1e634.ogg","એક છોકરી પચાસ મીઠાઈ પોતાના પાંચ મિત્રો સાથે વહેંચે છે.":"e87b9ef850f8563b222e.ogg","એક હિસ્સો પોતે રાખે છે.":"3983ade5c03ffced8a60.ogg","તે પચાસને પાંચ વડે ચકાસીને પાકું માને છે કે કંઈ નહીં વધે.":"12c2c231386eb0765fb3.ogg","શું છોકરી તમારી ગણતરીમાં છે, કે ફક્ત તેના મિત્રો?":"5e15874076357860d9d4.ogg","એક રસોઇયા પાસે સિત્તેર રોલ છે.":"9ae860168075214898bb.ogg","તે સાત મિત્રોને વહેંચે છે, અને એક હિસ્સો પોતે લે છે.":"d0d8bbc7ad7a2b3a596f.ogg","તે સિત્તેરને સાત વડે ચકાસી કહે છે કે એક પણ રોલ નહીં વધે.":"8f2e3e57b01d7d31c706.ogg","તેનાથી શું રહી ગયું?":"ebf687f1f249cbd36220.ogg","રોલની થાળી કોના હાથમાં?":"884cc8fec0e39be4b46e.ogg","હજી નહીં.":"96cfe5a1d8ea6526cafb.ogg","કોઈ ખાનું ઉપર હોય ત્યાં સુધી પટ્ટી ખુલ્લી રહે છે.":"f3225360e04299700d84.ogg","છોકરાના ચોકઠામાં ખરાની નિશાની કરો, જેથી તે પણ ગણાય.":"7fa490d5f351692cfc9f.ogg","છોકરીના ચોકઠામાં ખરાની નિશાની કરો, જેથી તે પણ ગણાય.":"4ea4732101f2dfdfe80f.ogg","રસોઇયાના ચોકઠામાં ખરાની નિશાની કરો, જેથી તે પણ ગણાય.":"787a84816613f675f2e5.ogg"};
const TOOL_VOICE_BASE = "https://media.singularity-learn.com/learning_plan_assets/V2/cbse/indiannica/english/class_4/mathematics/ch_6/2dtool/_voice/";
const TOOL_ID = "digit_tester";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Digit Tester";
const CHROME = { "dim": "#9AA4AC", "ink": "#2B2B2B", "rule": "#C9BCA6", "panel": "#F2E4CE", "paper": "#FFFDF7", "accent": "#5B6770" };
const VOICE = { "rate": 0.92, "pitch": 1.06 };
const OPENING = ["A number laid out, one digit to a cell, and four lamps underneath it."];
const FINISH_LINE = "Four tests run, every cell counted in, and one slot that stayed dark.";
const FREE_LINE = "Free play. Tap a cell to change its digit, then press any lamp to test the number.";
const DT_YESNO = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }];
const DT_KNOWN = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }, { id: "not known", label: "not known" }];
const DT_PROVED = [{ id: "by 3 only", label: "by 3 only" }, { id: "by 3 and 6", label: "by 3 and 6" }];
const DT_SHARE = [{ label: "sharing" }, { label: "left over" }];
const DT_ASK_SHARE = "How many share? How many left?";
const PHASES = [
  {
    n: 1,
    concept: "Reading the last digit",
    conceptId: "M2.S4.T7.C24",
    objectiveIds: ["O11"],
    says: [
      "Cover everything but the end. Can you still answer? Which digit did it?",
      "Press the lamp for a test, and the shutter covers all but the last cell."
    ],
    ladder: ["What is standing in the ones cell?", "Read only the digit that is still showing, then decide."],
    closing: "The ones digit alone settles the tests for two, for five and for ten.",
    learned: "You learned: only the last digit matters for 2, 5 and 10.",
    traceback: "The shutter opens and the cells are named from the right, ones first; the shutter covers all but the ones cell, its digit is laid against the digits that pass, the lamp gives its verdict and the number is divided out on the board.",
    items: [
      /* learn ML1: answer in the plan = Yes, because its ones digit is 6 */
      {
        qid: "M2.S4.T7.C24:ML1",
        kind: "verdict",
        num: 4386,
        d: 2,
        answer: "yes",
        choices: DT_YESNO,
        winMs: 3400,
        ask: "Divisible by 2?",
        say: "Is 4,386 divisible by 2? Look only at the end of it.",
        miss: "Which cell is the ones cell?"
      },
      /* practice 1: answer in the plan = No. Its ones digit is 4, and a number divisible by 5 ends in 5 or 0 */
      {
        qid: "M2.S4.T7.C24:1",
        kind: "verdict",
        num: 7314,
        d: 5,
        answer: "no",
        choices: DT_YESNO,
        winMs: 3400,
        ask: "Divisible by 5?",
        say: "Is 7,314 divisible by 5?",
        miss: "Which ones digits pass the test for five?"
      },
      /* practice 2: answer in the plan = Yes. Its ones digit is 0, and 6470 divided by 10 is 647 */
      {
        qid: "M2.S4.T7.C24:2",
        kind: "verdict",
        num: 6470,
        d: 10,
        answer: "yes",
        choices: DT_YESNO,
        winMs: 3400,
        ask: "Divisible by 10?",
        say: "Is 6,470 divisible by 10?",
        miss: "For ten, what must stand in the last cell?"
      }
      /* practice 5 (2,946 and 2,945) is left out: a phase has exactly three questions, and these three
         cover all three last-digit tests (2, 5 and 10) */
    ]
  },
  {
    n: 2,
    concept: "Adding every digit for three",
    conceptId: "M2.S4.T7.C25",
    objectiveIds: ["O11"],
    says: ["Take every cell down, even the empty looking ones. Leave none out.", "Drag each cell of this number onto the rail below it."],
    /* the phase opens on the child's act: every cell of the first number comes down onto the rail while the
       pad waits; later questions judge nothing while a cell is still up (a gate at Enter) */
    demo: { rail: true },
    demoLines: ["Every cell is on the rail, zeros and all."],
    ladder: ["How many cells does this number have altogether?", "Say the total out loud as you touch each digit on the rail."],
    closing: "Every digit goes into the total for the test for three, zeros included.",
    learned: "You learned: add every digit, zeros too, then test the total.",
    traceback: "Every cell still up is lit and brought down onto the rail in order, zeros included; each digit on the rail lights as it is added, the rail closes, the total is written and runs up through the lamp for three.",
    items: [
      /* learn ML2: answer in the plan = Yes, because the digits add to 18 and 3 divides 18 (asked: the digit total) */
      {
        qid: "M2.S4.T7.C25:ML2",
        kind: "total",
        num: 40608,
        answer: 18,
        winMs: 4e3,
        ask: "Digit total?",
        say: "To test 40,608 for three, add every digit on the rail. What is the total?",
        miss: "Count the cells on the rail. Did every one go into your total?"
      },
      /* practice 3: answer in the plan = The digits add to 9, so yes; 3105 divided by 3 is 1035 (asked: the digit total) */
      {
        qid: "M2.S4.T7.C25:3",
        kind: "total",
        num: 3105,
        answer: 9,
        winMs: 4e3,
        ask: "Digit total?",
        say: "Add every digit of 3,105. Bring each cell down first, then type the total.",
        miss: "Point at each digit on the rail as you add it."
      },
      /* practice 4: answer in the plan = Yes. Every digit counts, so 5 and 0 and 0 and 7 and 3 add to 15, which 3 divides.
         Asked as the verdict: the total shows once the rail closes, and the child tests it (the phase's named
         mistake is stopping at the total) */
      {
        qid: "M2.S4.T7.C25:4",
        kind: "three",
        num: 50073,
        answer: "yes",
        choices: DT_YESNO,
        winMs: 3600,
        ask: "Does 3 divide 50,073?",
        say: "Test 50,073 for divisibility by 3. Bring every cell down, then decide.",
        miss: "Does three go into the total exactly?"
      }
    ]
  },
  {
    n: 3,
    concept: "What the tests do not cover",
    conceptId: "M2.S4.T7.C26",
    objectiveIds: ["O12"],
    says: ["It passed every test here. The dark slot is a test this chapter never taught."],
    ladder: ["Is the number you are being asked about one of them?", "Count the lamps, then look for a lamp with that number on it."],
    closing: "A test answers for the number you tested by, and for no other. So these four tests settle four things and nothing else.",
    learned: "You learned: four tests are taught here, and they settle nothing else.",
    traceback: "The dark slot flickers and stays dark. Two numbers that pass all four lamps are divided by four side by side, one with nothing left and one with two left; or each lamp is run in turn on the clues; or 7,005 is divided by six with three left and the lamp for two stays empty.",
    items: [
      /* learn ML3: answer in the plan = Nothing at all */
      {
        qid: "M2.S4.T7.C26:ML3",
        kind: "mystery",
        d: 4,
        answer: "not known",
        choices: DT_KNOWN,
        winMs: 2600,
        ask: "Does it divide by 4?",
        say: "A number passes the tests for 2, for 3, for 5 and for 10. What do you now know about 4?",
        miss: "Which tests has this chapter taught you?"
      },
      /* practice 6: answer in the plan = All four: by 2, by 5 and by 10 from its ones digit, and by 3 because 3 divides 12 */
      {
        qid: "M2.S4.T7.C26:6",
        kind: "list",
        ones: 0,
        sum: 12,
        answer: [2, 3, 5, 10],
        pad: "enter",
        winMs: 3800,
        ask: "Which tests does it pass?",
        say: "A number ends in 0 and its digits add to 12. Which of this chapter's four tests does it pass? Tap each lamp it passes, then press enter.",
        miss: "Take the lamps one at a time. What does each one look at?"
      },
      /* practice 7: answer in the plan = The chapter has no test for 6, and 7005 does not divide by 6 at all, because it is odd.
         A test answers for the number tested by and no other. Asked as: what did her test prove? */
      {
        qid: "M2.S4.T7.C26:7",
        kind: "proof",
        num: 7005,
        d: 6,
        answer: "by 3 only",
        choices: DT_PROVED,
        winMs: 3600,
        ask: "What did the test prove?",
        say: "A child shows that 7,005 divides by 3. Then she says it must divide by 6 as well. What did her test prove?",
        miss: "Which lamp did she really run?"
      }
    ]
  },
  {
    n: 4,
    concept: "Testing for the right number of people",
    conceptId: "M2.S4.T7.C27",
    objectiveIds: ["O12"],
    says: ["Count everyone who is sharing. Have you counted the one handing them out?"],
    ladder: ["Is anybody sharing who has not been counted yet?", "Count the figures one by one, tick the box, then share out by the new count."],
    closing: "Before you choose a divisor, count every person who is sharing, the one handing out too.",
    learned: "You learned: the person handing things out is sharing as well.",
    traceback: "The child's own count is shared out on a board, a row for each person and the leftover on its shelf; the host's box is ticked, the figures are counted one at a time, and the true count is shared out round by round on a second board beside it.",
    items: [
      /* learn ML4: answer in the plan = Five people are sharing, counting the boy, and none will be left */
      {
        qid: "M2.S4.T7.C27:ML4",
        kind: "share",
        friends: 4,
        things: 35,
        host: "boy",
        pron: "him",
        thing: "laddoos",
        answer: [5, 0],
        parts: DT_SHARE,
        winMs: 5600,
        ask: DT_ASK_SHARE,
        say: "A boy asks 4 friends to his party and has 35 laddoos to share out equally. Who is sharing, and will any be left?",
        miss: "How many friends were asked?"
      },
      /* authored: the plan gives this phase two questions; this is the book's own example ("Six people
         leave two over"), fifty shared by five friends and the one handing them out */
      {
        qid: null,
        kind: "share",
        friends: 5,
        things: 50,
        host: "girl",
        pron: "her",
        thing: "sweets",
        answer: [6, 2],
        parts: DT_SHARE,
        winMs: 5600,
        ask: DT_ASK_SHARE,
        say: "A girl shares 50 sweets with her 5 friends, and keeps one share for herself. She tests 50 by 5, and is sure none will be left over.",
        miss: "Is the girl in your count, or only her friends?"
      },
      /* practice 8: answer in the plan = Himself. With him there are 8 sharing, and 70 divided by 8 is 8 with 6 left over */
      {
        qid: "M2.S4.T7.C27:8",
        kind: "share",
        friends: 7,
        things: 70,
        host: "cook",
        pron: "him",
        thing: "rolls",
        answer: [8, 6],
        parts: DT_SHARE,
        winMs: 6e3,
        ask: DT_ASK_SHARE,
        say: "A cook has 70 rolls and asks 7 friends to share them, taking a share himself. He tests 70 by 7 and says none will be left. What has he missed?",
        miss: "Who is holding the tray of rolls?"
      }
    ]
  }
];
const TR = {
  hi: {
    "Digit Tester": "अंक जाँच",
    "A number laid out, one digit to a cell, and four lamps underneath it.": "एक संख्या, हर खाने में एक अंक, और उसके नीचे चार बत्तियाँ।",
    "Four tests run, every cell counted in, and one slot that stayed dark.": "चार जाँचें हुईं, हर खाना गिना गया, और एक बत्ती बुझी ही रही।",
    "Free play. Tap a cell to change its digit, then press any lamp to test the number.": "मुक्त खेल। किसी खाने को छूकर उसका अंक बदलो। फिर कोई भी बत्ती दबाकर संख्या जाँचो।",
    "yes": "हाँ",
    "no": "नहीं",
    "not known": "पता नहीं",
    "by 3 only": "बस 3 से",
    "by 3 and 6": "3 और 6 से",
    "sharing": "भागीदार",
    "left over": "बचे हुए",
    "How many share? How many left?": "कितने भागीदार? कितने बचे?",
    /* phase 1 */
    "Reading the last digit": "आख़िरी अंक पढ़ना",
    "Cover everything but the end. Can you still answer? Which digit did it?": "अंत छोड़कर सब ढक दो। अब भी उत्तर दे सकते हो? किस अंक से पता चला?",
    "Press the lamp for a test, and the shutter covers all but the last cell.": "किसी जाँच की बत्ती दबाओ। पर्दा आख़िरी खाने के सिवा सब ढक देता है।",
    "What is standing in the ones cell?": "इकाई के खाने में कौन-सा अंक है?",
    "Read only the digit that is still showing, then decide.": "सिर्फ़ वही अंक पढ़ो जो अभी दिख रहा है, फिर तय करो।",
    "The ones digit alone settles the tests for two, for five and for ten.": "2, 5 और 10 की जाँच अकेला इकाई का अंक ही तय कर देता है।",
    "You learned: only the last digit matters for 2, 5 and 10.": "तुमने सीखा: 2, 5 और 10 में सिर्फ़ आख़िरी अंक काम आता है।",
    "Divisible by 2?": "2 से विभाज्य?",
    "Is 4,386 divisible by 2? Look only at the end of it.": "क्या 4,386 संख्या 2 से विभाज्य है? सिर्फ़ आख़िरी सिरा देखो।",
    "Which cell is the ones cell?": "इकाई का खाना कौन-सा है?",
    "Divisible by 5?": "5 से विभाज्य?",
    "Is 7,314 divisible by 5?": "क्या 7,314 संख्या 5 से विभाज्य है?",
    "Which ones digits pass the test for five?": "5 की जाँच में इकाई के कौन-से अंक पास होते हैं?",
    "Divisible by 10?": "10 से विभाज्य?",
    "Is 6,470 divisible by 10?": "क्या 6,470 संख्या 10 से विभाज्य है?",
    "For ten, what must stand in the last cell?": "10 के लिए आख़िरी खाने में क्या होना चाहिए?",
    /* phase 2 */
    "Adding every digit for three": "3 के लिए हर अंक जोड़ना",
    "Take every cell down, even the empty looking ones. Leave none out.": "हर खाना नीचे लाओ, खाली दिखने वाले भी। कोई खाना न छूटे।",
    "Drag each cell of this number onto the rail below it.": "इस संख्या का हर खाना खींचकर नीचे की पट्टी पर रखो।",
    "Every cell is on the rail, zeros and all.": "हर खाना पट्टी पर है, शून्य भी।",
    "How many cells does this number have altogether?": "इस संख्या में कुल कितने खाने हैं?",
    "Say the total out loud as you touch each digit on the rail.": "पट्टी का हर अंक छूते हुए योग ज़ोर से बोलो।",
    "Every digit goes into the total for the test for three, zeros included.": "3 की जाँच के योग में हर अंक जुड़ता है, शून्य भी।",
    "You learned: add every digit, zeros too, then test the total.": "तुमने सीखा: हर अंक जोड़ो, शून्य भी, फिर योग को जाँचो।",
    "Digit total?": "अंकों का योग?",
    "To test 40,608 for three, add every digit on the rail. What is the total?": "40,608 को 3 के लिए जाँचना है। पट्टी का हर अंक जोड़ो। योग कितना है?",
    "Count the cells on the rail. Did every one go into your total?": "पट्टी के खाने गिनो। क्या हर एक तुम्हारे योग में जुड़ा?",
    "Add every digit of 3,105. Bring each cell down first, then type the total.": "3,105 के सारे अंक जोड़ो। पहले हर खाना नीचे लाओ, फिर योग लिखो।",
    "Point at each digit on the rail as you add it.": "जोड़ते समय पट्टी के हर अंक पर उँगली रखो।",
    "Does 3 divide 50,073?": "50,073 संख्या 3 से विभाज्य?",
    "Test 50,073 for divisibility by 3. Bring every cell down, then decide.": "50,073 की 3 से विभाज्यता जाँचो। सारे खाने नीचे उतारो, फिर तय करो।",
    "Does three go into the total exactly?": "क्या योग 3 से पूरा-पूरा बँट जाता है?",
    "Not yet. The rail stays open while a cell is still up.": "अभी नहीं। जब तक कोई खाना ऊपर है, पट्टी खुली रहती है।",
    /* phase 3 */
    "What the tests do not cover": "जाँचें क्या नहीं बतातीं",
    "It passed every test here. The dark slot is a test this chapter never taught.": "यह संख्या यहाँ की हर जाँच में पास हुई। बुझी बत्ती वह जाँच है जो इस अध्याय में नहीं सिखाई गई।",
    "Is the number you are being asked about one of them?": "जिस संख्या के बारे में पूछा है, क्या वह इनमें से एक है?",
    "Count the lamps, then look for a lamp with that number on it.": "बत्तियाँ गिनो, फिर उस संख्या वाली बत्ती ढूँढो।",
    "A test answers for the number you tested by, and for no other. So these four tests settle four things and nothing else.": "जाँच उसी संख्या का उत्तर देती है जिससे जाँचा, किसी और का नहीं। इसलिए ये चार जाँचें चार बातें तय करती हैं, और कुछ नहीं।",
    "You learned: four tests are taught here, and they settle nothing else.": "तुमने सीखा: यहाँ की चार जाँचें और कुछ तय नहीं करतीं।",
    "Does it divide by 4?": "क्या यह 4 से विभाज्य है?",
    "A number passes the tests for 2, for 3, for 5 and for 10. What do you now know about 4?": "एक संख्या 2, 3, 5 और 10 की जाँच में पास होती है। अब तुम 4 के बारे में क्या जानते हो?",
    "Which tests has this chapter taught you?": "इस अध्याय ने तुम्हें कौन-सी जाँचें सिखाई हैं?",
    "Which tests does it pass?": "यह किन जाँचों में पास है?",
    "A number ends in 0 and its digits add to 12. Which of this chapter's four tests does it pass? Tap each lamp it passes, then press enter.": "एक संख्या के अंत में 0 है, और उसके अंकों का योग 12 है। इस अध्याय की चार जाँचों में से यह किनमें पास है? जिन जाँचों में यह पास है, उनकी बत्तियाँ छुओ। फिर एंटर दबाओ।",
    "Take the lamps one at a time. What does each one look at?": "एक-एक करके बत्तियाँ लो। हर बत्ती क्या देखती है?",
    "What did the test prove?": "जाँच ने क्या साबित किया?",
    "A child shows that 7,005 divides by 3. Then she says it must divide by 6 as well. What did her test prove?": "एक बच्ची दिखाती है कि 7,005 संख्या 3 से विभाज्य है। फिर वह कहती है कि यह संख्या 6 से भी विभाज्य होगी। जाँच ने क्या साबित किया?",
    "Which lamp did she really run?": "उसने असल में कौन-सी जाँच की?",
    /* phase 4 */
    "Testing for the right number of people": "भागीदारों की सही गिनती",
    "Count everyone who is sharing. Have you counted the one handing them out?": "हर भागीदार को गिनो। क्या तुमने बाँटने वाले को भी गिना?",
    "Is anybody sharing who has not been counted yet?": "क्या कोई भागीदार अभी गिना नहीं गया?",
    "Count the figures one by one, tick the box, then share out by the new count.": "लोगों को एक-एक करके गिनो, डिब्बे में सही का निशान लगाओ। फिर नई गिनती से बाँटो।",
    "Before you choose a divisor, count every person who is sharing, the one handing out too.": "भाजक चुनने से पहले हर भागीदार को गिनो, बाँटने वाले को भी।",
    "You learned: the person handing things out is sharing as well.": "तुमने सीखा: बाँटने वाला भी भागीदार होता है।",
    "A boy asks 4 friends to his party and has 35 laddoos to share out equally. Who is sharing, and will any be left?": "एक लड़का अपनी पार्टी में 4 दोस्तों को बुलाता है। उसके पास बराबर बाँटने को 35 लड्डू हैं। कौन-कौन भागीदार हैं, और क्या कुछ बचेगा?",
    "How many friends were asked?": "कितने दोस्त बुलाए गए थे?",
    "A girl shares 50 sweets with her 5 friends, and keeps one share for herself. She tests 50 by 5, and is sure none will be left over.": "एक लड़की 50 मिठाइयाँ अपने 5 दोस्तों के साथ बाँटती है। अपना हिस्सा भी रखती है। वह 50 को 5 से जाँचकर पक्का मानती है कि कुछ नहीं बचेगा।",
    "Is the girl in your count, or only her friends?": "क्या लड़की तुम्हारी गिनती में है, या सिर्फ़ उसके दोस्त?",
    "A cook has 70 rolls and asks 7 friends to share them, taking a share himself. He tests 70 by 7 and says none will be left. What has he missed?": "एक रसोइए के पास 70 रोल हैं। वह 7 दोस्तों को बाँटता है, और एक हिस्सा ख़ुद लेता है। वह 70 को 7 से जाँचकर कहता है कि एक भी रोल नहीं बचेगा। उससे क्या छूट गया?",
    "Who is holding the tray of rolls?": "रोल की थाली किसके हाथ में है?",
    "Tick the boy in, so the bay counts him too.": "लड़के के डिब्बे में सही का निशान लगाओ, ताकि वह भी गिना जाए।",
    "Tick the girl in, so the bay counts her too.": "लड़की के डिब्बे में सही का निशान लगाओ, ताकि वह भी गिनी जाए।",
    "Tick the cook in, so the bay counts him too.": "रसोइए के डिब्बे में सही का निशान लगाओ, ताकि वह भी गिना जाए।",
    /* the working area's own words */
    "tests run": "हुई जाँचें",
    "{n} of 4": "4 में से {n}",
    "digit total": "अंकों का योग",
    "ends in": "अंत में",
    "O": "इ",
    "T": "द",
    "H": "स",
    "Th": "ह",
    "TTh": "दह",
    "L": "ला",
    "not taught": "नहीं सिखाई",
    "passes all four": "चारों में पास",
    "{r} left": "{r} बचे",
    "the test proved": "जाँच ने साबित किया",
    "{n} sharing": "{n} भागीदार",
    "{q} each, {r} left": "हर एक को {q}, {r} बचे",
    "boy": "लड़का",
    "girl": "लड़की",
    "cook": "रसोइया",
    "laddoos": "लड्डू",
    "sweets": "मिठाइयाँ",
    "rolls": "रोल",
    "passes": "इनमें पास",
    "proved": "साबित हुआ"
  },
  gu: {
    "Digit Tester": "અંક ચકાસણી",
    "A number laid out, one digit to a cell, and four lamps underneath it.": "એક સંખ્યા, દરેક ખાનામાં એક અંક, અને તેની નીચે ચાર બત્તીઓ.",
    "Four tests run, every cell counted in, and one slot that stayed dark.": "ચાર ચકાસણી થઈ, દરેક ખાનું ગણાયું, અને એક બત્તી બંધ જ રહી.",
    "Free play. Tap a cell to change its digit, then press any lamp to test the number.": "મુક્ત રમત. કોઈ ખાનાને અડકીને તેનો અંક બદલો. પછી કોઈ પણ બત્તી દબાવી સંખ્યા ચકાસો.",
    "yes": "હા",
    "no": "ના",
    "not known": "ખબર નથી",
    "by 3 only": "ફક્ત 3 વડે",
    "by 3 and 6": "6 વડે પણ",
    "sharing": "ભાગીદાર",
    "left over": "વધેલા",
    "How many share? How many left?": "કેટલા ભાગીદાર? કેટલા વધ્યા?",
    /* phase 1 */
    "Reading the last digit": "છેલ્લો અંક વાંચવો",
    "Cover everything but the end. Can you still answer? Which digit did it?": "છેલ્લું ખાનું છોડી બધું ઢાંકી દો. શું હજી જવાબ આપી શકો? કયા અંકથી ખબર પડી?",
    "Press the lamp for a test, and the shutter covers all but the last cell.": "ચકાસણીની બત્તી દબાવો. પડદો છેલ્લા ખાના સિવાય બધું ઢાંકી દે છે.",
    "What is standing in the ones cell?": "એકમના ખાનામાં કયો અંક?",
    "Read only the digit that is still showing, then decide.": "જે અંક હજી દેખાય છે ફક્ત તે જ વાંચો, પછી નક્કી કરો.",
    "The ones digit alone settles the tests for two, for five and for ten.": "2, 5 અને 10ની ચકાસણી એકલો એકમનો અંક જ નક્કી કરી દે છે.",
    "You learned: only the last digit matters for 2, 5 and 10.": "તમે શીખ્યા: 2, 5 અને 10 માટે ફક્ત છેલ્લો અંક જ કામનો છે.",
    "Divisible by 2?": "2 વડે વિભાજ્ય?",
    "Is 4,386 divisible by 2? Look only at the end of it.": "શું 4,386 એ 2 વડે વિભાજ્ય છે? ફક્ત તેનો છેડો જુઓ.",
    "Which cell is the ones cell?": "એકમનું ખાનું કયું છે?",
    "Divisible by 5?": "5 વડે વિભાજ્ય?",
    "Is 7,314 divisible by 5?": "શું 7,314 એ 5 વડે વિભાજ્ય છે?",
    "Which ones digits pass the test for five?": "5ની ચકાસણીમાં એકમના કયા અંક પાસ થાય છે?",
    "Divisible by 10?": "10 વડે વિભાજ્ય?",
    "Is 6,470 divisible by 10?": "શું 6,470 એ 10 વડે વિભાજ્ય છે?",
    "For ten, what must stand in the last cell?": "10 માટે છેલ્લા ખાનામાં શું હોવું જોઈએ?",
    /* phase 2 */
    "Adding every digit for three": "3 માટે દરેક અંક ઉમેરવો",
    "Take every cell down, even the empty looking ones. Leave none out.": "દરેક ખાનું નીચે લાવો, ખાલી દેખાતાં પણ. એક પણ ખાનું છોડશો નહીં.",
    "Drag each cell of this number onto the rail below it.": "આ સંખ્યાનું દરેક ખાનું ખેંચીને નીચેની પટ્ટી પર મૂકો.",
    "Every cell is on the rail, zeros and all.": "દરેક ખાનું પટ્ટી પર છે, શૂન્ય પણ.",
    "How many cells does this number have altogether?": "આ સંખ્યામાં કુલ કેટલાં ખાનાં છે?",
    "Say the total out loud as you touch each digit on the rail.": "પટ્ટી પરના દરેક અંકને અડકતાં સરવાળો મોટેથી બોલો.",
    "Every digit goes into the total for the test for three, zeros included.": "3ની ચકાસણીના સરવાળામાં દરેક અંક ઉમેરાય છે, શૂન્ય પણ.",
    "You learned: add every digit, zeros too, then test the total.": "તમે શીખ્યા: દરેક અંક ઉમેરો, શૂન્ય પણ, પછી સરવાળો ચકાસો.",
    "Digit total?": "અંકોનો સરવાળો?",
    "To test 40,608 for three, add every digit on the rail. What is the total?": "40,608ને 3 માટે ચકાસવાનું છે. પટ્ટીનો દરેક અંક ઉમેરો. સરવાળો કેટલો છે?",
    "Count the cells on the rail. Did every one go into your total?": "પટ્ટી પરનાં ખાનાં ગણો. શું દરેક તમારા સરવાળામાં ઉમેરાયું?",
    "Add every digit of 3,105. Bring each cell down first, then type the total.": "3,105ના બધા અંક ઉમેરો. પહેલાં દરેક ખાનું નીચે લાવો, પછી સરવાળો લખો.",
    "Point at each digit on the rail as you add it.": "ઉમેરતી વખતે પટ્ટી પરના દરેક અંક પર આંગળી મૂકો.",
    "Does 3 divide 50,073?": "શું 50,073 એ 3 વડે વિભાજ્ય છે?",
    "Test 50,073 for divisibility by 3. Bring every cell down, then decide.": "ચકાસો કે 50,073 એ 3 વડે વિભાજ્ય છે કે નહીં. બધાં ખાનાં નીચે ઉતારો, પછી નક્કી કરો.",
    "Does three go into the total exactly?": "શું સરવાળો 3 વડે પૂરેપૂરો ભાગી શકાય છે?",
    "Not yet. The rail stays open while a cell is still up.": "હજી નહીં. કોઈ ખાનું ઉપર હોય ત્યાં સુધી પટ્ટી ખુલ્લી રહે છે.",
    /* phase 3 */
    "What the tests do not cover": "ચકાસણી શું નથી કહેતી",
    "It passed every test here. The dark slot is a test this chapter never taught.": "આ સંખ્યા અહીંની દરેક ચકાસણીમાં પાસ થઈ. બંધ બત્તી એવી ચકાસણી છે જે આ પ્રકરણમાં શીખવી નથી.",
    "Is the number you are being asked about one of them?": "જે સંખ્યા વિશે પૂછ્યું છે, શું તે આમાંની એક છે?",
    "Count the lamps, then look for a lamp with that number on it.": "બત્તીઓ ગણો, પછી તે સંખ્યાવાળી બત્તી શોધો.",
    "A test answers for the number you tested by, and for no other. So these four tests settle four things and nothing else.": "ચકાસણી એ જ સંખ્યાનો જવાબ આપે છે જેનાથી ચકાસ્યું. બીજી કોઈ સંખ્યાનો નહીં. તેથી આ ચાર ચકાસણી ચાર વાત નક્કી કરે છે, બીજું કંઈ નહીં.",
    "You learned: four tests are taught here, and they settle nothing else.": "તમે શીખ્યા: અહીંની ચાર ચકાસણી બીજું કંઈ નક્કી કરતી નથી.",
    "Does it divide by 4?": "શું તે 4 વડે વિભાજ્ય છે?",
    "A number passes the tests for 2, for 3, for 5 and for 10. What do you now know about 4?": "એક સંખ્યા 2, 3, 5 અને 10ની ચકાસણીમાં પાસ થાય છે. હવે તમે 4 વિશે શું જાણો છો?",
    "Which tests has this chapter taught you?": "આ પ્રકરણે તમને કઈ ચકાસણી શીખવી છે?",
    "Which tests does it pass?": "તે કઈ ચકાસણીમાં પાસ છે?",
    "A number ends in 0 and its digits add to 12. Which of this chapter's four tests does it pass? Tap each lamp it passes, then press enter.": "એક સંખ્યાનો છેલ્લો અંક 0 છે, અને તેના અંકોનો સરવાળો 12 છે. આ પ્રકરણની ચાર ચકાસણીમાંથી તે કઈમાં પાસ થાય છે? જેમાં પાસ થાય તે બત્તીઓને અડકો. પછી એન્ટર દબાવો.",
    "Take the lamps one at a time. What does each one look at?": "એક પછી એક બત્તી લો. દરેક બત્તી શું જુએ છે?",
    "What did the test prove?": "ચકાસણીએ શું સાબિત કર્યું?",
    "A child shows that 7,005 divides by 3. Then she says it must divide by 6 as well. What did her test prove?": "એક બાળકી બતાવે છે કે 7,005 એ 3 વડે વિભાજ્ય છે. પછી તે કહે છે કે આ સંખ્યા 6 વડે પણ વિભાજ્ય હશે. તેની ચકાસણીએ શું સાબિત કર્યું?",
    "Which lamp did she really run?": "તેણે ખરેખર કઈ બત્તીથી ચકાસ્યું?",
    /* phase 4 */
    "Testing for the right number of people": "ભાગીદારોની સાચી ગણતરી",
    "Count everyone who is sharing. Have you counted the one handing them out?": "દરેક ભાગીદારને ગણો. વહેંચનારને પણ ગણ્યા?",
    "Is anybody sharing who has not been counted yet?": "શું કોઈ ભાગીદાર હજી ગણાયો નથી?",
    "Count the figures one by one, tick the box, then share out by the new count.": "લોકોને એક પછી એક ગણો, ચોકઠામાં ખરાની નિશાની કરો. પછી નવી ગણતરીથી વહેંચો.",
    "Before you choose a divisor, count every person who is sharing, the one handing out too.": "ભાજક પસંદ કરતાં પહેલાં દરેક ભાગીદારને ગણો, વહેંચનારને પણ.",
    "You learned: the person handing things out is sharing as well.": "તમે શીખ્યા: વહેંચનાર પણ ભાગીદાર હોય છે.",
    "A boy asks 4 friends to his party and has 35 laddoos to share out equally. Who is sharing, and will any be left?": "એક છોકરો પોતાની પાર્ટીમાં 4 મિત્રોને બોલાવે છે. તેની પાસે સરખા વહેંચવા 35 લાડુ છે. કોણ કોણ ભાગીદાર છે, અને શું કંઈ વધશે?",
    "How many friends were asked?": "કેટલા મિત્રોને બોલાવ્યા?",
    "A girl shares 50 sweets with her 5 friends, and keeps one share for herself. She tests 50 by 5, and is sure none will be left over.": "એક છોકરી 50 મીઠાઈ પોતાના 5 મિત્રો સાથે વહેંચે છે. એક હિસ્સો પોતે રાખે છે. તે 50ને 5 વડે ચકાસીને પાકું માને છે કે કંઈ નહીં વધે.",
    "Is the girl in your count, or only her friends?": "શું છોકરી તમારી ગણતરીમાં છે, કે ફક્ત તેના મિત્રો?",
    "A cook has 70 rolls and asks 7 friends to share them, taking a share himself. He tests 70 by 7 and says none will be left. What has he missed?": "એક રસોઇયા પાસે 70 રોલ છે. તે 7 મિત્રોને વહેંચે છે, અને એક હિસ્સો પોતે લે છે. તે 70ને 7 વડે ચકાસી કહે છે કે એક પણ રોલ નહીં વધે. તેનાથી શું રહી ગયું?",
    "Who is holding the tray of rolls?": "રોલની થાળી કોના હાથમાં?",
    "Tick the boy in, so the bay counts him too.": "છોકરાના ચોકઠામાં ખરાની નિશાની કરો, જેથી તે પણ ગણાય.",
    "Tick the girl in, so the bay counts her too.": "છોકરીના ચોકઠામાં ખરાની નિશાની કરો, જેથી તે પણ ગણાય.",
    "Tick the cook in, so the bay counts him too.": "રસોઇયાના ચોકઠામાં ખરાની નિશાની કરો, જેથી તે પણ ગણાય.",
    /* the working area's own words */
    "tests run": "ચકાસણી",
    "{n} of 4": "4 માંથી {n}",
    "digit total": "અંકોનો સરવાળો",
    "ends in": "છેલ્લે",
    "O": "એ",
    "T": "દ",
    "H": "શ",
    "Th": "હ",
    "TTh": "દહ",
    "L": "લા",
    "not taught": "શીખવી નથી",
    "passes all four": "ચારેયમાં પાસ",
    "{r} left": "{r} વધ્યા",
    "the test proved": "ચકાસણીએ સાબિત કર્યું",
    "{n} sharing": "{n} ભાગીદાર",
    "{q} each, {r} left": "દરેકને {q}, {r} વધ્યા",
    "boy": "છોકરો",
    "girl": "છોકરી",
    "cook": "રસોઇયો",
    "laddoos": "લાડુ",
    "sweets": "મીઠાઈ",
    "rolls": "રોલ",
    "passes": "આમાં પાસ",
    "proved": "સાબિત થયું"
  }
};
const DT = { cw: 108, ch: 124, gap: 12, cgap: 30, x0: 96, cy: 8, stow: 84, lw: 156, lh: 108, ly: 176, lgap: 40, fw: 176, ry: 262, rh: 96 };
const DT_TESTS = [2, 3, 5, 10];
const DT_ENDS = { 2: [0, 2, 4, 6, 8], 5: [0, 5], 10: [0] };
const DT_AMBER = CONTENT.ten, DT_BLUE = CONTENT.hundred, DT_VERM = CONTENT.pointer, DT_SKY = "#56B4E9";
const DT_PLACE = ["O", "T", "H", "Th", "TTh", "L"];
const DT_FIFTH = [4, 6, 8, 9];
const DT_PAIR = [1020, 1050];
const dtInk = (c) => shade(c, 0.25);
const dtSkyInk = shade(DT_SKY, 0.5);
const dtDigits = (v) => String(v).split("").map(Number);
const dtCellXs = (nd, commas = true) => {
  const xs = [];
  let x = DT.x0;
  for (let i = 0; i < nd; i++) {
    xs.push(x);
    x += DT.cw + (commas && [3, 5, 7].includes(nd - 1 - i) ? DT.cgap : DT.gap);
  }
  return xs;
};
const dtLampX = (k) => DT.x0 + k * (DT.lw + DT.lgap);
const dtPasses = (v, d) => {
  const ds = dtDigits(v);
  return d === 3 ? ds.reduce((a, b) => a + b, 0) % 3 === 0 : DT_ENDS[d].includes(ds[ds.length - 1]);
};
const dtCellsOf = (x) => x.kind === "mystery" ? [null, null, null, null] : x.kind === "list" ? [null, null, null, x.ones] : x.kind === "share" ? [] : dtDigits(x.num || 0);
const dtFill = (tx, key, vals) => Object.keys(vals).reduce((s, k) => s.split("{" + k + "}").join(String(vals[k])), String(tx(key)));
const MODEL = {
  cell: { w: DT.cw, h: DT.ch, gap: DT.gap },
  lamps: DT_TESTS,
  notTaught: DT_FIFTH,
  onesDigitsThatPass: DT_ENDS,
  placeNames: DT_PLACE,
  notKnownPair: DT_PAIR,
  colours: { divides: DT_BLUE, leftover: DT_VERM, number: DT_AMBER, digitRead: DT_SKY }
};
const dtListOf = (v) => Array.isArray(v) ? v.map(Number) : (String(v != null ? v : "").match(/\d+/g) || []).map(Number);
const dtSameSet = (a, b) => {
  const x = Array.from(new Set(a)).sort((p, q) => p - q), y = Array.from(new Set(b)).sort((p, q) => p - q);
  return x.length === y.length && x.every((v, k) => v === y[k]);
};
const judge = (item, v) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "list") return dtSameSet(dtListOf(v), item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
const oracle = () => {
  const rem = (v, d) => {
    let r = 0;
    for (const ch of String(v)) r = (r * 10 + Number(ch)) % d;
    return r;
  };
  const divides = (v, d) => rem(v, d) === 0;
  return PHASES.every((p) => p.items.every((it) => {
    if (it.kind === "verdict") return it.answer === (divides(it.num, it.d) ? "yes" : "no");
    if (it.kind === "three") return it.answer === (divides(it.num, 3) ? "yes" : "no");
    if (it.kind === "total") {
      let s = 0, v = it.num;
      while (v > 0) {
        s += v % 10;
        v = Math.floor(v / 10);
      }
      return s === it.answer && divides(s, 3) === divides(it.num, 3);
    }
    if (it.kind === "mystery") {
      const passing = [];
      for (let v = 1; v <= 300; v++) if (DT_TESTS.every((d) => divides(v, d))) passing.push(v);
      const answers = new Set(passing.map((v) => divides(v, it.d)));
      return it.answer === (answers.size > 1 ? "not known" : answers.has(true) ? "yes" : "no");
    }
    if (it.kind === "list") {
      const sets = [];
      for (let v = 10; v < 1e5; v += 10) {
        let s = 0, t = v;
        while (t > 0) {
          s += t % 10;
          t = Math.floor(t / 10);
        }
        if (v % 10 === it.ones && s === it.sum) sets.push(DT_TESTS.filter((d) => divides(v, d)).join(","));
      }
      return sets.length > 0 && new Set(sets).size === 1 && sets[0] === it.answer.join(",");
    }
    if (it.kind === "proof") return divides(it.num, 3) && !divides(it.num, it.d) && it.answer === "by 3 only";
    if (it.kind === "share") {
      const people = it.friends + 1;
      let left = it.things;
      while (left >= people) left -= people;
      return it.answer[0] === people && it.answer[1] === left;
    }
    return false;
  }));
};
const nearMiss = (item) => {
  if (item.kind === "verdict") return item.answer === "yes" ? "no" : "yes";
  if (item.kind === "total") {
    const ds = dtDigits(item.num), z = ds.indexOf(0);
    const s = ds.reduce((a, b) => a + b, 0) - (z >= 0 && z + 1 < ds.length ? ds[z + 1] : 0);
    return s === item.answer ? item.answer + 1 : s;
  }
  if (item.kind === "three") return item.answer === "yes" ? "no" : "yes";
  if (item.kind === "mystery") return "yes";
  if (item.kind === "list") return "2, 5, 10";
  if (item.kind === "proof") return "by 3 and 6";
  if (item.kind === "share") return [item.friends, item.things % item.friends];
  return "~";
};
const answerForms = (item) => {
  if (item.kind === "total") return [String(item.answer), words(item.answer)];
  if (item.kind === "list") return ["2, 3, 5, 10", "all four"];
  if (item.kind === "share") return [`${item.answer[0]} people`, `${item.answer[0]} sharing`, `${item.answer[1]} left`];
  return [String(item.answer)];
};
const agentKey = (item) => item.kind === "list" ? item.answer.join(", ") : item.answer;
const HOOK = {};
const solve = (item, T2) => {
  if (T2.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if ((item.kind === "total" || item.kind === "three") && HOOK.check) HOOK.check(item);
  if (item.kind === "list") {
    if (HOOK.set) HOOK.set(item.answer);
    setTimeout(() => HOOK.enter && HOOK.enter(), 40);
    return;
  }
  return T2.submit(item.answer);
};
const answer = (item, v) => item.kind === "list" && HOOK.set ? HOOK.set(dtListOf(v)) : void 0;
const check = (item) => HOOK.check ? HOOK.check(item) : void 0;
const DT_CSS = `
.dt-move{transition:transform 480ms cubic-bezier(.3,.7,.25,1)}
.dt-in{animation:dtIn 380ms ease-out both}
@keyframes dtIn{from{opacity:0}to{opacity:1}}
.dt-catch{animation:dtCatch 760ms ease-out 1 both}
@keyframes dtCatch{0%{transform:translateY(0)}35%{transform:translateY(-18px)}100%{transform:translateY(-8px)}}
.dt-grab{cursor:grab}
.dt-tap{cursor:pointer}
@media (prefers-reduced-motion:reduce){.dt-move{transition:none}.dt-in,.dt-catch{animation:none}}
`;
const DtComma = ({ x, y, color }) => <path d={`M ${x + 8} ${y} A 8 8 0 1 0 ${x - 2} ${y + 7.7} C ${x} ${y + 14} ${x - 3} ${y + 23} ${x - 10} ${y + 30} C ${x + 3} ${y + 25} ${x + 9} ${y + 14} ${x + 8} ${y} Z`} fill={color} />;
function DtLamp({ x, y, d, state, ring, mark, quiet, C, tx = (v) => v }) {
  const pass = state === "pass", fail = state === "fail";
  const edge = ring || mark ? C.accent : pass ? DT_BLUE : C.rule;
  return <g>
      <rect
    x={x}
    y={y}
    width={DT.lw}
    height={DT.lh}
    rx={18}
    fill={quiet ? tint(C.panel, 0.45) : pass ? tint(DT_BLUE, 0.82) : "#FFFFFF"}
    stroke={edge}
    strokeWidth={ring || mark ? 5 : pass ? 3 : 2}
    filter={quiet ? void 0 : "url(#fShadowSoft)"}
  />
      <circle cx={x + 30} cy={y + 34} r={15} fill={pass ? "url(#gHundred)" : "#FFFFFF"} stroke={fail ? DT_VERM : pass ? shade(DT_BLUE, 0.2) : C.rule} strokeWidth={fail ? 4 : 2} />
      <text x={x + 96} y={y + 60} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={pass ? dtInk(DT_BLUE) : C.ink}>{d}</text>
      {(pass || fail) && <text x={x + 96} y={y + 98} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={pass ? dtInk(DT_BLUE) : dtInk(DT_VERM)}>{tx(pass ? "yes" : "no")}</text>}
      {mark && <g>
          <circle cx={x + DT.lw - 8} cy={y + 8} r={19} fill={C.accent} stroke="#FFFFFF" strokeWidth={3} />
          <path d={`M ${x + DT.lw - 17} ${y + 8} l 6 7 l 12 -13`} fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>}
    </g>;
}
function DtFifth({ x, y, d, caption, flick, C }) {
  return <g>
      <rect x={x} y={y} width={DT.fw} height={DT.lh} rx={18} fill={tint(C.panel, 0.35)} stroke={shade(C.rule, 0.25)} strokeWidth={2.5} strokeDasharray="10 8" />
      <circle cx={x + 30} cy={y + 34} r={15} fill={flick ? "#B9C0C6" : "#6E7780"} stroke={shade(C.rule, 0.3)} strokeWidth={2} />
      <text x={x + 104} y={y + 58} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{d}</text>
      <text x={x + DT.fw / 2} y={y + 98} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{caption}</text>
    </g>;
}
function DtPerson({ cx, solid, num, C }) {
  const body = `M ${cx - 32} 128 L ${cx - 32} 96 Q ${cx - 32} 64 ${cx} 64 Q ${cx + 32} 64 ${cx + 32} 96 L ${cx + 32} 128 Z`;
  return <g>
      <circle cx={cx} cy={34} r={21} fill={solid ? "url(#gHundred)" : "#FFFFFF"} stroke={shade(DT_BLUE, 0.2)} strokeWidth={solid ? 2 : 3} strokeDasharray={solid ? void 0 : "6 5"} />
      <path d={body} fill={solid ? "url(#gHundred)" : "#FFFFFF"} stroke={shade(DT_BLUE, 0.2)} strokeWidth={solid ? 2 : 3} strokeDasharray={solid ? void 0 : "6 5"} />
      {num ? <text x={cx} y={114} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF" stroke={shade(DT_BLUE, 0.35)} strokeWidth={3} paintOrder="stroke">{num}</text> : null}
    </g>;
}
function DtBoard({ x, y, w, num, d, caption, C, tx = (v) => v }) {
  const q = Math.floor(num / d), r = num - q * d;
  return <g className="dt-in">
      <rect x={x} y={y} width={w} height={204} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      {caption && <text x={x + w - 18} y={y + 34} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={dtInk(DT_BLUE)}>{caption}</text>}
      <text x={x + 22} y={y + (caption ? 76 : 60)} fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${indian(num)} ÷ ${d}`}</text>
      <text x={x + 22} y={y + (caption ? 126 : 116)} fontSize={T.speech} fontWeight={700} fill={C.ink}>{`= ${indian(q)}`}</text>
      <line x1={x + 18} y1={y + 150} x2={x + w - 18} y2={y + 150} stroke={C.rule} strokeWidth={2} />
      {Array.from({ length: Math.min(r, 9) }).map((_, k) => <Disc key={k} x={x + 38 + k * 30} y={y + 176} r={12} paint="gPointer" />)}
      <text x={x + (r ? 38 + Math.min(r, 9) * 30 : 22)} y={y + 187} fontSize={T.label} fontWeight={700} fill={r ? dtInk(DT_VERM) : C.ink}>{dtFill(tx, "{r} left", { r })}</text>
    </g>;
}
function DtShareBoard({ x, y, b, C, tx = (v) => v }) {
  const pitch = Math.min(26, 196 / b.s);
  return <g className="dt-in">
      <rect x={x} y={y} width={530} height={312} rx={RAD.panel} fill="#FFFFFF" stroke={b.mine ? C.rule : DT_BLUE} strokeWidth={b.mine ? 2 : 3} filter="url(#fShadowSoft)" />
      <text x={x + 20} y={y + 38} fontSize={T.label} fontWeight={700} fill={b.mine ? C.ink : dtInk(DT_BLUE)}>{dtFill(tx, "{n} sharing", { n: b.s })}</text>
      {Array.from({ length: b.s }).map((_, k) => {
    const yy = y + 70 + k * pitch;
    return <g key={k}>
            <circle cx={x + 26} cy={yy} r={7} fill="url(#gHundred)" />
            {Array.from({ length: b.rounds }).map((__, j) => <Disc key={j} x={x + 52 + j * 22} y={yy} r={9} paint="gTen" flat />)}
          </g>;
  })}
      <line x1={x + 300} y1={y + 56} x2={x + 300} y2={y + 262} stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />
      <rect x={x + 318} y={y + 56} width={192} height={72} rx={14} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {b.shelf && Array.from({ length: b.r }).map((_, j) => <Disc key={j} x={x + 340 + j % 7 * 25} y={y + 78 + Math.floor(j / 7) * 28} r={10} paint="gPointer" />)}
      {b.shelf && <text x={x + 20} y={y + 296} fontSize={T.label} fontWeight={700} fill={b.r ? dtInk(DT_VERM) : C.ink}>{dtFill(tx, "{q} each, {r} left", { q: b.q, r: b.r })}</text>}
    </g>;
}
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v) => v }) {
  var _a;
  const C = api.C;
  const tl = useTimeline();
  const slide = useTimeline();
  const free = stage === "free";
  const [freeNum, setFreeNum] = useState(24630);
  const [fifthAt, setFifthAt] = useState(0);
  const it = free ? { kind: "free", num: freeNum, d: DT_FIFTH[fifthAt] } : item;
  const kind = it.kind;
  const railKind = kind === "total" || kind === "three";
  const cells = dtCellsOf(it);
  const nd = cells.length;
  const xs = dtCellXs(nd, !cells.includes(null));
  const onesEdge = nd ? xs[nd - 1] - 8 : DT.stow;
  const allEdge = nd ? xs[nd - 1] + DT.cw + 8 : DT.stow;
  const [edgeX, setEdgeX] = useState(DT.stow);
  const edgeRef = useRef(DT.stow);
  const [asking, setAsking] = useState(null);
  const [lamps, setLamps] = useState({});
  const [marks, setMarks] = useState([]);
  const marksRef = useRef([]);
  const actedRef = useRef(false);
  const [down, setDown] = useState([]);
  const downRef = useRef([]);
  const [railOn, setRailOn] = useState(false);
  const [total, setTotal] = useState(null);
  const [lit, setLit] = useState(null);
  const [names, setNames] = useState(0);
  const [rule, setRule] = useState(null);
  const [chip, setChip] = useState(null);
  const [fly, setFly] = useState(null);
  const [board, setBoard] = useState(null);
  const [fifth, setFifth] = useState({ flick: false, caption: "not taught" });
  const [proved, setProved] = useState(false);
  const [ticked, setTicked] = useState(false);
  const tickedRef = useRef(false);
  const [tickGlow, setTickGlow] = useState(false);
  const [counted, setCounted] = useState(0);
  const [boards, setBoards] = useState([]);
  const [gateLit, setGateLit] = useState(false);
  const typedRef = useRef(typed);
  typedRef.current = typed;
  const [touched, setTouched] = useState(false);
  const shown = useRef(false);
  const busy = tl.busy;
  const moveEdge = (v) => {
    edgeRef.current = v;
    setEdgeX(v);
  };
  const slideTo = (to) => {
    const from = edgeRef.current, S = [];
    for (let k = 1; k <= 8; k++) {
      const v = from + (to - from) * (1 - Math.pow(1 - k / 8, 2));
      S.push([45, () => moveEdge(v)]);
    }
    slide.run(S);
  };
  const setup = (x) => {
    tl.stop();
    slide.stop();
    const cs = dtCellsOf(x), xx = dtCellXs(cs.length, !cs.includes(null));
    moveEdge(x.kind === "mystery" ? xx[cs.length - 1] + DT.cw + 8 : x.kind === "list" ? xx[cs.length - 1] - 8 : DT.stow);
    setAsking(null);
    setLamps(x.kind === "mystery" ? { 2: "pass", 3: "pass", 5: "pass", 10: "pass" } : x.kind === "proof" ? { 3: "pass" } : {});
    marksRef.current = [];
    setMarks([]);
    downRef.current = cs.map(() => false);
    setDown(downRef.current);
    setRailOn(x.kind === "total" || x.kind === "three");
    setTotal(null);
    setLit(null);
    setNames(x.kind === "mystery" ? cs.length : 0);
    setRule(null);
    setChip(null);
    setFly(null);
    setBoard(null);
    setFifth({ flick: false, caption: "not taught" });
    setProved(false);
    tickedRef.current = false;
    setTicked(false);
    setTickGlow(false);
    setCounted(0);
    setBoards([]);
    setGateLit(false);
    setTouched(false);
    shown.current = false;
    actedRef.current = false;
    api.lock(false);
  };
  const key = free ? "free" : `${n}:${index}`;
  const setFor = useRef("");
  useEffect(() => {
    if (setFor.current !== key) {
      setFor.current = key;
      setup(it);
    }
  }, [key]);
  const onesXY = () => ({ x: xs[nd - 1] + DT.cw / 2, y: DT.cy + DT.ch / 2 });
  const ruleXY = (d, v) => {
    const ends = DT_ENDS[d], j = ends.indexOf(v);
    return { x: 248 + (j >= 0 ? j : ends.length + 0.6) * 78, y: 364, hit: j >= 0 };
  };
  const onesSteps = (v, d, slow, withBoard) => {
    const ds2 = dtDigits(v), last = ds2[ds2.length - 1], o = onesXY(), to = ruleXY(d, last), pass = dtPasses(v, d);
    const S = [
      [60, () => {
        slideTo(onesEdge);
        setAsking(d);
        setRailOn(false);
        setRule(null);
        setChip(null);
      }],
      [520 * slow, () => setLit("ones")],
      [420 * slow, () => {
        setRule(d);
        setChip({ x: o.x, y: o.y, v: last, landed: false, hit: to.hit });
      }],
      [60, () => setChip((c) => c && { ...c, x: to.x, y: to.y })],
      [560 * slow, () => {
        setChip((c) => c && { ...c, landed: true });
        if (to.hit) api.sfx.tick();
      }],
      [380 * slow, () => setLamps((L) => ({ ...L, [d]: pass ? "pass" : "fail" }))]
    ];
    if (withBoard) S.push([420 * slow, () => setBoard({ num: v, d })]);
    S.push([300, () => {
    }]);
    return S;
  };
  const railSteps = (v, slow, lampAt, lightEach = false) => {
    const ds2 = dtDigits(v), sum = ds2.reduce((a, b) => a + b, 0), S = [[60, () => {
      setRailOn(true);
      setRule(null);
      setChip(null);
    }]];
    ds2.forEach((_, i) => {
      if (downRef.current[i]) return;
      S.push([360 * slow, () => {
        const nx = downRef.current.slice();
        nx[i] = true;
        downRef.current = nx;
        setDown(nx);
        api.sfx.tick();
      }]);
    });
    if (lightEach) ds2.forEach((_, i) => S.push([300 * slow, () => setLit(i)]));
    S.push([360 * slow, () => {
      setLit(null);
      setTotal(sum);
    }]);
    S.push([60, () => setFly({ ...railTotalXY(ds2.length), v: sum })]);
    S.push([80, () => setFly({ x: lampAt.x, y: lampAt.y, v: sum })]);
    S.push([560 * slow, () => {
      setFly(null);
      setLamps((L) => ({ ...L, 3: sum % 3 === 0 ? "pass" : "fail" }));
      api.sfx.tick();
    }]);
    S.push([300, () => {
    }]);
    return S;
  };
  const railY = railKind ? DT.ry : 330;
  const slotCx = (i) => xs[i] + DT.cw / 2;
  const railTotalXY = (k) => ({ x: xs[k - 1] + DT.cw / 2 + 42 + 60 + 52, y: railY + 48 });
  const lamp3At = railKind ? { x: 880 + DT.lw / 2 + 18, y: DT.cy + 54 } : { x: dtLampX(1) + DT.lw / 2 + 18, y: DT.ly + 54 };
  const ask = stage === "ask" && !busy;
  const demo = stage === "demo" && !busy;
  const pressLamp = (d) => {
    if (kind === "verdict") {
      if (!ask || d === 3) return;
      setTouched(true);
      setAsking(d);
      setLit("ones");
      slideTo(onesEdge);
      api.sfx.tick();
    } else if (kind === "list") {
      if (!ask) return;
      setTouched(true);
      const m = marksRef.current.includes(d) ? marksRef.current.filter((x) => x !== d) : [...marksRef.current, d].sort((a, b) => a - b);
      marksRef.current = m;
      setMarks(m);
      actedRef.current = true;
      api.setTyped(m.join(", "));
      api.sfx.tick();
    } else if (free && !busy) {
      setTouched(true);
      setBoard(null);
      setLit(null);
      downRef.current = cells.map(() => false);
      setDown(downRef.current);
      setTotal(null);
      setLamps((L) => {
        const o = { ...L };
        delete o[d];
        return o;
      });
      tl.run(d === 3 ? [[60, () => {
        slideTo(DT.stow);
        setAsking(3);
      }], ...railSteps(freeNum, 0.7, lamp3At)] : onesSteps(freeNum, d, 0.7, false));
    }
  };
  const pressFifth = () => {
    if (!(ask && (kind === "mystery" || kind === "proof")) && !(free && !busy)) return;
    setTouched(true);
    if (free) setFifthAt((k) => (k + 1) % DT_FIFTH.length);
    api.sfx.tick();
    tl.run([
      [40, () => setFifth((f) => ({ ...f, flick: true }))],
      [140, () => setFifth((f) => ({ ...f, flick: false }))],
      [140, () => setFifth((f) => ({ ...f, flick: true }))],
      [160, () => setFifth((f) => ({ ...f, flick: false }))]
    ]);
  };
  const allDown = (nx) => nx.length > 0 && nx.every(Boolean);
  const railClosed = () => {
    setGateLit(false);
    if (kind === "three") setTotal(dtDigits(it.num).reduce((a, b) => a + b, 0));
    if (stage === "demo") api.demoDone(phase.demoLines);
  };
  const bringDown = (i) => {
    if (!((ask || demo) && railKind) || downRef.current[i]) return;
    const nx = downRef.current.slice();
    nx[i] = true;
    downRef.current = nx;
    setDown(nx);
    setTouched(true);
    api.sfx.tick();
    if (allDown(nx)) railClosed();
  };
  const dropAll = () => {
    const nx = downRef.current.map(() => true);
    downRef.current = nx;
    setDown(nx);
    api.sfx.tick();
    railClosed();
  };
  const toggleTick = () => {
    if (!(ask && kind === "share")) return;
    setTouched(true);
    tickedRef.current = !tickedRef.current;
    setTicked(tickedRef.current);
    setTickGlow(false);
    api.sfx.tick();
  };
  const changeCell = (i) => {
    if (!free || busy) return;
    const ds2 = dtDigits(freeNum);
    ds2[i] = i === 0 ? ds2[i] % 9 + 1 : (ds2[i] + 1) % 10;
    setFreeNum(Number(ds2.join("")));
    setTouched(true);
    setLamps({});
    setBoard(null);
    setRule(null);
    setChip(null);
    setLit(null);
    setAsking(null);
    setTotal(null);
    setRailOn(false);
    downRef.current = ds2.map(() => false);
    setDown(downRef.current);
    slideTo(DT.stow);
    api.sfx.tick();
  };
  const drag = useDrag((payload, p, moved) => {
    if (payload.src === "shutter") {
      if (!(ask && kind === "verdict")) return;
      setTouched(true);
      const shut = moved ? p.x > (DT.stow + onesEdge) / 2 : edgeRef.current < onesEdge - 4;
      if (shut) api.sfx.tick();
      slideTo(shut ? onesEdge : DT.stow);
      if (!shut) {
        setAsking(null);
        setLit(null);
      }
    } else if (payload.src === "cell") {
      if (moved && p.y < DT.ry - 40) return;
      bringDown(payload.i);
    }
  });
  const hostLeftOut = (v) => kind === "share" && Number(slotPartsOf(v, 2)[0]) === it.friends + 1 && !tickedRef.current;
  const enterFn = stage !== "ask" ? null : kind === "list" ? () => {
    const m = marksRef.current;
    if (busy || !m.length || !actedRef.current) return;
    actedRef.current = false;
    api.submit(m.join(", "));
  } : railKind ? (v) => {
    if (busy) return;
    if (!allDown(downRef.current)) {
      setGateLit(true);
      api.sfx.tick();
      api.say("Not yet. The rail stays open while a cell is still up.");
      return;
    }
    api.submit(v);
  } : kind === "share" ? (v) => {
    if (busy) return;
    if (hostLeftOut(v)) {
      setTickGlow(true);
      if (it.host === "boy") api.say("Tick the boy in, so the bay counts him too.");
      else if (it.host === "girl") api.say("Tick the girl in, so the bay counts her too.");
      else api.say("Tick the cook in, so the bay counts him too.");
      return;
    }
    api.submit(v);
  } : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v) => {
    const m = DT_TESTS.filter((d) => v.includes(d));
    marksRef.current = m;
    setMarks(m);
    actedRef.current = true;
    api.setTyped(m.join(", "));
    return true;
  };
  HOOK.check = () => {
    if ((stage === "demo" || stage === "ask") && railKind && !allDown(downRef.current)) {
      dropAll();
      return true;
    }
    if (stage === "ask" && hostLeftOut(typedRef.current)) {
      tickedRef.current = true;
      setTicked(true);
      setTickGlow(false);
      api.sfx.tick();
      return true;
    }
    return void 0;
  };
  HOOK.demo = () => {
    if (stage === "demo" && railKind && !allDown(downRef.current)) dropAll();
  };
  const shareSteps = (x, slow, childN) => {
    const N = x.friends + 1, q = Math.floor(x.things / N), r = x.things - q * N;
    const S = [[60, () => {
      setCounted(0);
      setBoards([]);
    }]];
    const cq = childN ? Math.floor(x.things / childN) : 0;
    if (childN && childN !== N && childN >= 2 && childN <= 10 && cq <= 11) {
      const cr = x.things - cq * childN;
      S.push([300 * slow, () => setBoards([{ s: childN, q: cq, r: cr, rounds: 0, shelf: false, mine: true }])]);
      for (let j = 1; j <= cq; j++) S.push([120 * slow, () => setBoards((B) => B.map((b) => b.mine ? { ...b, rounds: j } : b))]);
      S.push([320 * slow, () => setBoards((B) => B.map((b) => b.mine ? { ...b, shelf: true } : b))]);
      S.push([500 * slow, () => {
      }]);
    }
    if (!tickedRef.current) {
      S.push([420 * slow, () => setTickGlow(true)]);
      S.push([420 * slow, () => {
        tickedRef.current = true;
        setTicked(true);
        setTickGlow(false);
        api.sfx.tick();
      }]);
    }
    for (let k = 1; k <= N; k++) S.push([230 * slow, () => setCounted(k)]);
    S.push([300 * slow, () => setBoards((B) => [...B.filter((b) => b.mine), { s: N, q, r, rounds: 0, shelf: false, mine: false }])]);
    for (let j = 1; j <= q; j++) S.push([190 * slow, () => {
      setBoards((B) => B.map((b) => b.mine ? b : { ...b, rounds: j }));
      api.sfx.tick();
    }]);
    S.push([380 * slow, () => setBoards((B) => B.map((b) => b.mine ? b : { ...b, shelf: true }))]);
    S.push([300, () => {
    }]);
    return S;
  };
  const listSteps = (x, slow) => {
    const S = [[60, () => setLamps({})]];
    DT_TESTS.forEach((d) => {
      S.push([380 * slow, () => {
        setAsking(d);
        setLit(d === 3 ? "tag" : "ones");
      }]);
      const pass = d === 3 ? x.sum % 3 === 0 : DT_ENDS[d].includes(x.ones);
      S.push([420 * slow, () => {
        setLamps((L) => ({ ...L, [d]: pass ? "pass" : "fail" }));
        api.sfx.tick();
      }]);
    });
    S.push([300, () => {
      setAsking(null);
      setLit(null);
    }]);
    return S;
  };
  const flickSteps = (slow) => [
    [60, () => setFifth((f) => ({ ...f, flick: true }))],
    [160 * slow, () => setFifth((f) => ({ ...f, flick: false }))],
    [160 * slow, () => setFifth((f) => ({ ...f, flick: true }))],
    [220 * slow, () => setFifth((f) => ({ ...f, flick: false }))]
  ];
  const proofSteps = (x, slow) => [
    ...flickSteps(slow),
    [300 * slow, () => {
    }],
    ...onesSteps(x.num, 2, slow, false),
    [300 * slow, () => setBoard({ num: x.num, d: x.d })],
    [520 * slow, () => setProved(true)],
    [300, () => {
    }]
  ];
  const mysterySteps = (slow) => [
    ...flickSteps(slow),
    [360 * slow, () => setBoard({ pair: true, step: 1 })],
    [700 * slow, () => setBoard({ pair: true, step: 2 })],
    [520 * slow, () => setFifth({ flick: false, caption: "not known" })],
    [300, () => {
    }]
  ];
  useEffect(() => {
    if (stage !== "win") return;
    if (shown.current) {
      tl.run([[400, () => {
      }]]);
      return;
    }
    shown.current = true;
    if (kind === "verdict") tl.run(onesSteps(it.num, it.d, 1, true));
    else if (railKind) tl.run(railSteps(it.num, 0.8, lamp3At));
    else if (kind === "mystery") tl.run([...flickSteps(1), [360, () => setFifth({ flick: false, caption: "not known" })], [300, () => {
    }]]);
    else if (kind === "list") tl.run(listSteps(it, 0.9));
    else if (kind === "proof") tl.run([[300, () => setProved(true)], ...onesSteps(it.num, 2, 0.8, false), [300, () => setBoard({ num: it.num, d: it.d })], [300, () => {
    }]]);
    else if (kind === "share") tl.run(shareSteps(it, 0.9, null));
  }, [stage]);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    shown.current = true;
    const done = () => api.lock(false);
    if (kind === "verdict") {
      const S = [[60, () => {
        slideTo(DT.stow);
        setAsking(null);
        setLit(null);
        setRule(null);
        setChip(null);
        setBoard(null);
        setLamps({});
        setNames(0);
      }], [520, () => {
      }]];
      for (let k = 1; k <= nd; k++) S.push([380, () => setNames(k)]);
      tl.run([...S, [300, () => {
      }], ...onesSteps(it.num, it.d, 1.3, true)], done);
    } else if (railKind) {
      tl.run([[60, () => {
        setLit(null);
        setTotal(null);
        setLamps({});
        setGateLit(false);
      }], [700, () => {
      }], ...railSteps(it.num, 1.3, lamp3At, true)], done);
    } else if (kind === "mystery") {
      tl.run([[60, () => {
        setBoard(null);
        setFifth({ flick: false, caption: "not taught" });
      }], ...mysterySteps(1.2)], done);
    } else if (kind === "list") {
      tl.run(listSteps(it, 1.3), done);
    } else if (kind === "proof") {
      tl.run([[60, () => {
        setBoard(null);
        setProved(false);
        setLamps({ 3: "pass" });
        slideTo(DT.stow);
      }], ...proofSteps(it, 1.2)], done);
    } else if (kind === "share") {
      const mine = slotPartsOf(wrong.value, 2)[0];
      tl.run(shareSteps(it, 1.2, mine === "" ? null : Number(mine)), done);
    } else done();
  }, [wrong]);
  const caught = railKind ? cells.map((_, i) => i).filter((i) => !down[i] && down.some((dn, k) => dn && k > i)) : [];
  const litUp = railKind ? cells.map((_, i) => i).filter((i) => !down[i] && (gateLit || caught.includes(i))) : [];
  const mainBoard = boards.find((b) => !b.mine && b.shelf);
  const ran = Object.keys(lamps).length;
  api.share({
    number: typeof it.num === "number" ? it.num : null,
    divisor: (_a = it.d) != null ? _a : null,
    digitCells: cells.map((c) => c === null ? "?" : String(c)),
    lamp: asking,
    shutter: edgeX >= allEdge - 2 ? "all" : edgeX >= onesEdge - 2 ? "ones" : "open",
    testsRun: ran,
    lampsLit: lamps,
    marked: marks,
    railDown: down.filter(Boolean).length,
    skippedCell: caught.length ? caught[0] : null,
    railTotal: total,
    railClosed: allDown(down),
    gate: gateLit || tickGlow,
    hostTicked: ticked,
    sharers: counted || null,
    leftover: mainBoard ? mainBoard.r : null,
    complete: stage === "idle"
  });
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
  const shownEdge = dragging && dragging.payload.src === "shutter" ? Math.max(DT.stow, Math.min(onesEdge, dragging.x)) : edgeX;
  const hasShutter = kind === "verdict" || kind === "mystery" || kind === "list" || kind === "proof" || kind === "free";
  const covered = (i) => hasShutter && xs[i] + DT.cw <= shownEdge + 1;
  const showLamps = !railKind && kind !== "share";
  const showFifth = kind === "mystery" || kind === "proof" || kind === "free";
  const shutterLive = ask && kind === "verdict";
  const lampLive = (d) => ask && (kind === "verdict" && d !== 3 || kind === "list") || free && !busy;
  const fifthLive = ask && (kind === "mystery" || kind === "proof") || free && !busy;
  const ringOnes = lit === "ones";
  const firstUp = down.findIndex((dn) => !dn);
  const invite = busy ? null : stage === "demo" && railKind && firstUp >= 0 ? { x: xs[firstUp] + DT.cw / 2, y: DT.cy + DT.ch / 2, r: 70 } : stage !== "ask" || touched ? null : kind === "verdict" ? { x: dtLampX(DT_TESTS.indexOf(it.d)) + DT.lw / 2, y: DT.ly + DT.lh / 2, r: 88 } : railKind && firstUp >= 0 ? { x: xs[firstUp] + DT.cw / 2, y: DT.cy + DT.ch / 2, r: 70 } : kind === "mystery" ? { x: dtLampX(4) + DT.fw / 2, y: DT.ly + DT.lh / 2, r: 96 } : kind === "list" ? { x: dtLampX(0) + DT.lw / 2, y: DT.ly + DT.lh / 2, r: 88 } : kind === "share" ? { x: 48, y: 80, r: 42 } : null;
  const ds = cells;
  return <g>
      <style>{DT_CSS}</style>

      {
    /* the running count: tests run on this number, out of the four this chapter teaches */
  }
      {kind !== "share" && <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tests run")}</text>
          <text x={312} y={-40} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{dtFill(tx, "{n} of 4", { n: ran })}</text>
        </g>}

      {
    /* the digit cells: one digit to a cell, a zero drawn exactly like the rest */
  }
      {nd > 0 && ds.map((dg, i) => {
    const x = xs[i], hid = covered(i), isDown = railKind || railOn ? down[i] : false;
    const lifted = dragging && dragging.payload.src === "cell" && dragging.payload.i === i;
    const isCaught = litUp.includes(i);
    const pay = { src: "cell", i };
    const cellLive = (ask || demo) && railKind && !isDown;
    const faceOn = !isDown && !lifted;
    return <g key={"c" + i}>
            {!faceOn && <rect x={x} y={DT.cy} width={DT.cw} height={DT.ch} rx={16} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="9 8" />}
            {faceOn && <g
      className={(isCaught ? "dt-catch" : "") + (cellLive ? " dt-grab c4-piece" : "")}
      key={isCaught ? "caught" + (gateLit ? "g" : "") : "still"}
      {...cellLive ? { ...control("cell-" + i, "Bring the digit " + dg + " down"), ...drag.bind(pay), ...drag.keys(pay) } : {}}
    >
                <rect x={x} y={DT.cy} width={DT.cw} height={DT.ch} rx={16} fill={tint(DT_AMBER, 0.78)} stroke={shade(DT_AMBER, 0.12)} strokeWidth={2.5} filter="url(#fShadowSoft)" />
                {isCaught && <rect x={x - 7} y={DT.cy - 7} width={DT.cw + 14} height={DT.ch + 14} rx={20} fill="none" stroke={DT_SKY} strokeWidth={7} />}
                {!hid && dg !== null && <text x={x + DT.cw / 2} y={DT.cy + 88} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{dg}</text>}
              </g>}
            {free && !hid && !busy && <Hit id={"cell-" + i} label={"Change the digit " + dg} x={x} y={DT.cy} w={DT.cw} h={DT.ch} onPress={() => changeCell(i)} />}
            {i < nd - 1 && !cells.includes(null) && [3, 5, 7].includes(nd - 1 - i) && !(hasShutter && xs[i + 1] <= shownEdge) && <DtComma x={x + DT.cw + DT.cgap / 2} y={DT.cy + 96} color={C.ink} />}
            {names > nd - 1 - i && lang === "en" && <text x={x + DT.cw / 2} y={DT.cy + DT.ch + 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(DT_PLACE[nd - 1 - i])}</text>}
          </g>;
  })}
      {ringOnes && nd > 0 && !covered(nd - 1) && <rect x={xs[nd - 1] - 7} y={DT.cy - 7} width={DT.cw + 14} height={DT.ch + 14} rx={20} fill="none" stroke={DT_SKY} strokeWidth={7} pointerEvents="none" />}
      {
    /* Hindi and Gujarati place heads carry a mark above the letter: a little lower, and drawn over the ones ring */
  }
      {lang !== "en" && nd > 0 && ds.map((_, i) => names > nd - 1 - i && <text
    key={"pn" + i}
    x={xs[i] + DT.cw / 2}
    y={DT.cy + DT.ch + 37}
    textAnchor="middle"
    fontSize={T.micro}
    fontWeight={700}
    fill={C.ink}
    stroke={C.paper}
    strokeWidth={4}
    paintOrder="stroke"
    pointerEvents="none"
  >{tx(DT_PLACE[nd - 1 - i])}</text>)}

      {
    /* the ones shutter: slides in from the left and leaves only the ones cell showing */
  }
      {hasShutter && nd > 0 && (() => {
    const band = kind === "mystery", sy = band ? DT.cy + 30 : DT.cy - 4, sh = band ? DT.ch - 60 : DT.ch + 8, sw = Math.max(DT.stow, shownEdge);
    return <g
      className={shutterLive ? "dt-grab c4-piece" : ""}
      {...shutterLive ? { ...control("shutter", "Slide the shutter over the number"), ...drag.bind({ src: "shutter" }), ...drag.keys({ src: "shutter" }) } : {}}
    >
            <rect x={0} y={sy} width={sw} height={sh} rx={16} fill="url(#gPanel)" stroke={shade(C.rule, 0.2)} strokeWidth={2.5} />
            {(band ? [22, 42] : [34, 66, 98]).map((yy) => <line key={yy} x1={14} y1={(band ? sy : DT.cy) + yy} x2={sw - 30} y2={(band ? sy : DT.cy) + yy} stroke={C.rule} strokeWidth={2} />)}
            <rect x={sw - 22} y={band ? sy + 12 : DT.cy + 20} width={12} height={band ? sh - 24 : DT.ch - 40} rx={6} fill={shade(C.rule, 0.2)} />
          </g>;
  })()}

      {
    /* the list's second clue: the digit total */
  }
      {kind === "list" && <g>
          <rect x={640} y={DT.cy} width={220} height={DT.ch} rx={16} fill="#FFFFFF" stroke={lit === "tag" ? DT_SKY : shade(DT_AMBER, 0.12)} strokeWidth={lit === "tag" ? 7 : 2.5} filter="url(#fShadowSoft)" />
          <text x={750} y={DT.cy + 40} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("digit total")}</text>
          <text x={750} y={DT.cy + 104} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={dtInk(DT_AMBER)}>{it.sum}</text>
        </g>}

      {
    /* the four test lamps, and the slot for a test this chapter never taught */
  }
      {showLamps && DT_TESTS.map((d, k) => <g key={"l" + d}>
          <DtLamp x={dtLampX(k)} y={DT.ly} d={d} state={lamps[d]} ring={asking === d} mark={marks.includes(d)} quiet={kind === "verdict" && d === 3} C={C} tx={tx} />
          {lampLive(d) && <Hit id={"lamp-" + d} label={kind === "list" ? "Mark the test for " + d : "Run the test for " + d} x={dtLampX(k)} y={DT.ly} w={DT.lw} h={DT.lh} onPress={() => pressLamp(d)} />}
        </g>)}
      {showFifth && <g>
          <DtFifth x={dtLampX(4)} y={DT.ly} d={kind === "mystery" || kind === "proof" ? it.d : DT_FIFTH[fifthAt]} caption={tx(fifth.caption)} flick={fifth.flick} C={C} />
          {fifthLive && <Hit id="fifth" label="Ask the slot that was never taught" x={dtLampX(4)} y={DT.ly} w={DT.fw} h={DT.lh} onPress={pressFifth} />}
        </g>}
      {railKind && <DtLamp x={880} y={DT.cy} d={3} state={lamps[3]} ring={false} C={C} tx={tx} />}

      {
    /* the sum rail: a slot under every cell, a plus between, and the total at the end */
  }
      {railOn && nd > 0 && (() => {
    const lastCx = slotCx(nd - 1), eqX = lastCx + 42 + 30, boxX = lastCx + 42 + 60, closed = down.every(Boolean);
    return <g>
            <rect
      x={xs[0] - 14}
      y={railY}
      width={boxX + 104 + 14 - (xs[0] - 14)}
      height={DT.rh}
      rx={22}
      fill={tint(C.panel, 0.4)}
      stroke={closed ? shade(DT_AMBER, 0.12) : C.rule}
      strokeWidth={closed ? 4 : 2}
      strokeDasharray={closed ? void 0 : "12 9"}
    />
            {ds.map((dg, i) => <g key={"r" + i}>
                <rect
      x={slotCx(i) - 42}
      y={railY + 10}
      width={84}
      height={76}
      rx={14}
      fill={down[i] ? "#FFFFFF" : "none"}
      stroke={down[i] ? lit === i ? DT_SKY : shade(DT_SKY, 0.2) : C.rule}
      strokeWidth={down[i] ? lit === i ? 6 : 3 : 2}
      strokeDasharray={down[i] ? void 0 : "8 7"}
    />
                {down[i] && <text x={slotCx(i)} y={railY + 68} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={dtSkyInk}>{dg}</text>}
                {i < nd - 1 && <text x={(slotCx(i) + slotCx(i + 1)) / 2} y={railY + 60} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>+</text>}
              </g>)}
            <text x={eqX} y={railY + 60} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
            <rect x={boxX} y={railY + 10} width={104} height={76} rx={14} fill="#FFFFFF" stroke={closed ? shade(DT_AMBER, 0.12) : C.rule} strokeWidth={closed ? 3 : 2} />
            <text x={boxX + 52} y={railY + 68} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={total === null ? C.ink : dtInk(DT_AMBER)}>{total === null ? "?" : total}</text>
          </g>;
  })()}

      {
    /* the digits that pass a last-digit test, and the ones digit laid against them */
  }
      {rule !== null && DT_ENDS[rule] && <g className="dt-in">
          <text x={DT.x0} y={374} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("ends in")}</text>
          {DT_ENDS[rule].map((v, j) => {
    const on = chip && chip.landed && chip.hit && chip.v === v;
    return <g key={"e" + v}>
                <rect x={214 + j * 78} y={330} width={68} height={68} rx={14} fill={on ? tint(DT_SKY, 0.7) : "#FFFFFF"} stroke={on ? DT_SKY : C.rule} strokeWidth={on ? 6 : 2} />
                <text x={248 + j * 78} y={380} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{v}</text>
              </g>;
  })}
        </g>}
      {chip && !(chip.landed && chip.hit) && <g className="dt-move" style={{ transform: `translate(${chip.x}px, ${chip.y}px)` }} pointerEvents="none">
          <rect x={-34} y={-34} width={68} height={68} rx={14} fill={tint(DT_SKY, 0.7)} stroke={DT_SKY} strokeWidth={5} />
          <text x={0} y={16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={dtSkyInk}>{chip.v}</text>
        </g>}

      {
    /* the total on its way up to the lamp for three */
  }
      {fly && <g className="dt-move" style={{ transform: `translate(${fly.x}px, ${fly.y}px)` }} pointerEvents="none">
          <rect x={-40} y={-30} width={80} height={60} rx={14} fill="#FFFFFF" stroke={DT_AMBER} strokeWidth={4} filter="url(#fLift)" />
          <text x={0} y={14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={dtInk(DT_AMBER)}>{fly.v}</text>
        </g>}

      {
    /* the ruled board: a division done in full */
  }
      {board && !board.pair && <DtBoard x={620} y={316} w={456} num={board.num} d={board.d} C={C} tx={tx} />}
      {board && board.pair && <g>
          <DtBoard x={96} y={316} w={470} num={DT_PAIR[0]} d={it.d} caption={tx("passes all four")} C={C} tx={tx} />
          {board.step >= 2 && <DtBoard x={606} y={316} w={470} num={DT_PAIR[1]} d={it.d} caption={tx("passes all four")} C={C} tx={tx} />}
        </g>}
      {proved && <g className="dt-in">
          <text x={DT.x0} y={460} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("the test proved")}</text>
          <text x={DT.x0} y={506} fontSize={T.label} fontWeight={700} fill={dtInk(DT_BLUE)}>{tx("by 3 only")}</text>
        </g>}

      {
    /* the sharing bay: the one handing out, the friends, the things; the boards come with the answer */
  }
      {kind === "share" && (() => {
    const N = it.friends + 1, main = boards.find((b) => !b.mine), two = boards.length > 1;
    const inPile = it.things - (main ? main.rounds * main.s + (main.shelf ? main.r : 0) : 0);
    const cx = (k) => 150 + k * 92;
    return <g>
            <rect x={20} y={52} width={56} height={56} rx={12} fill="#FFFFFF" stroke={tickGlow ? DT_SKY : C.ink} strokeWidth={tickGlow ? 6 : 3} />
            {ticked && <path d="M 32 80 l 12 13 l 22 -26" fill="none" stroke={DT_BLUE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />}
            {ask && <Hit id="tick-host" label={"Count the " + it.host + " in too"} x={12} y={44} w={72} h={72} onPress={toggleTick} />}
            {Array.from({ length: N }).map((_, k) => <g key={"p" + k}>
                <DtPerson cx={cx(k)} solid={k > 0 || ticked} num={counted > k ? k + 1 : null} C={C} />
              </g>)}
            <text x={cx(0)} y={160} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(it.host)}</text>
            <text x={866} y={30} fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${it.things} ${tx(it.thing)}`}</text>
            <g filter="url(#fShadowSoft)">
              {Array.from({ length: Math.max(0, inPile) }).map((_, j) => <Disc key={j} x={878 + j % 10 * 22} y={62 + Math.floor(j / 10) * 22} r={10} paint="gTen" flat />)}
            </g>
            {boards.map((b) => <DtShareBoard key={b.mine ? "mine" : "true"} x={two ? b.mine ? 0 : 556 : 278} y={214} b={b} C={C} tx={tx} />)}
          </g>;
  })()}

      {
    /* a cell under the finger */
  }
      {dragging && dragging.payload.src === "cell" && (() => {
    const dg = ds[dragging.payload.i];
    return <g pointerEvents="none" filter="url(#fLift)">
            <rect x={dragging.x - DT.cw / 2} y={dragging.y - DT.ch / 2} width={DT.cw} height={DT.ch} rx={16} fill={tint(DT_AMBER, 0.78)} stroke={shade(DT_AMBER, 0.12)} strokeWidth={2.5} />
            <text x={dragging.x} y={dragging.y + 26} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{dg}</text>
          </g>;
  })()}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>;
}
function Thumb({ result, C, w, h, tx = (v) => v }) {
  const L = result && result.last || {};
  const S = L.shared || {};
  const k = L.kind;
  if (L.value === null || L.value === void 0) return null;
  const parts = k === "share" ? slotPartsOf(L.value, 2) : [];
  const tt = tx;
  const top = k === "verdict" ? `${indian(S.number)} ÷ ${S.divisor}` : k === "three" ? `${indian(S.number)} ÷ 3` : k === "total" ? (S.digitCells || []).join("+") : k === "mystery" ? `÷ ${S.divisor}` : k === "list" ? tt("passes") : k === "proof" ? tt("proved") : k === "share" ? dtFill(tt, "{n} sharing", { n: parts[0] }) : "";
  const bottom = k === "share" ? dtFill(tt, "{r} left", { r: parts[1] }) : k === "total" ? `= ${L.value}` : tt(String(L.value));
  return <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={16} y={32} fontSize={T.micro} fontWeight={600} fill={C.ink}>{top}</text>
      <text x={w - 16} y={h - 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={k === "share" && Number(parts[1]) ? dtInk(DT_VERM) : dtInk(DT_BLUE)}>{bottom}</text>
    </g>;
}
function DigitTester(props) {
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
    fitHost: () => null
  }} />;
}
var stdin_default = DigitTester;
export default stdin_default;
