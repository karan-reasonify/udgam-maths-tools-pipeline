import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
/* M1.S1.T2.C4.2D1 · ruler_bench · Ruler Bench — standalone build 2026-09-24, source 771b35f1:1645529.
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
function shownIn(format2, v, j, lang, TR2) {
  const tx = (x) => lineFor(x, lang, TR2);
  const out = String(format2 ? format2(v, j, { lang, tx }) : v);
  return lang && lang !== "en" ? tx(out) : out;
}
function SlotStack({ C, parts, typed, active, live, format: format2, part, onPart, lang, TR: TR2 }) {
  const np = parts.length, vals = slotPartsOf(typed, np);
  const k = (at) => parts.findIndex((p) => p.at === at);
  const iw = k("whole"), it = k("top"), ib = k("bottom");
  const cw = 132, ch = 38, ww = 110, gap = 30;
  const left = iw >= 0 ? Z.slot.x + (Z.slot.w - (ww + gap + cw)) / 2 : 0;
  const fx = iw >= 0 ? left + ww + gap : Z.slot.x + (Z.slot.w - cw) / 2;
  const split = iw >= 0 ? left + ww + gap / 2 : Z.slot.x;
  const barY = Z.slot.y + 46;
  const shownOf = (j) => shownIn(format2, vals[j], j, lang, TR2);
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
function Slot({ C, ask, typed, active, live, format: format2, parts, part, onPart, lang, TR: TR2 }) {
  const lines = wrapText(ask || "", 15).slice(0, 3);
  const askLines = lines.map((ln, k) => <text key={k} x={Z.slot.x} y={236 - (lines.length - 1 - k) * 46} fontSize={T.prompt} fontWeight={500} fill={C.ink}>{ln}</text>);
  if (parts && parts.length && parts.some((p) => p.at)) return <g data-zone="slot">
      {askLines}
      <SlotStack C={C} parts={parts} typed={typed} active={active} live={live} format={format2} part={part} onPart={onPart} lang={lang} TR={TR2} />
    </g>;
  if (parts && parts.length) {
    const np = parts.length, gap = 16, bw = (Z.slot.w - gap * (np - 1)) / np;
    const vals = slotPartsOf(typed, np);
    const quiet = mix(C.ink, "#FFFFFF", 0.3);
    return <g data-zone="slot">
        {askLines}
        {parts.map((p, k) => {
      const x = Z.slot.x + k * (bw + gap), cx2 = x + bw / 2, on = active && k === part;
      const shown2 = shownIn(format2, vals[k], k, lang, TR2);
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
  const shown = shownIn(format2, typed, void 0, lang, TR2);
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
const TOOL_VOICE = {"मापने के लिए चीज़ों से भरी एक बेंच।":"013dbdfd06304d164839.ogg","हर चीज़ को किस तरह का माप चाहिए?":"c3e7a4c72222a8ca420a.ogg","हर चीज़ को उसकी तरह का मात्रक मिला।":"5483a3aed47a82545a59.ogg","हर माप शून्य के निशान से शुरू हुआ।":"802d12ba269af56b3ac6.ogg","हर मात्रक आकार देखकर चुना गया।":"d796594fc0d66baf737f.ogg","मुक्त खेल।":"ccabc6dc1689df81851d.ogg","कोई भी चीज़ चुनो, पैमाने पर खिसकाओ और शून्य के निशान से पढ़ो।":"cc67499b6bee57d87ba4.ogg","यह लंबाई है, भार है या धारिता?":"00d8b11971debfbc5e6d.ogg","कौन से मात्रक इसके हैं?":"4631403783a552cf013b.ogg","किस तरह का माप यह बता सकता है?":"678ccf2e80373d003596.ogg","एक बार में एक चीज़ लो, और पूछो कि उसके बारे में क्या जानना है।":"c73b443b51192d6a47fa.ogg","लंबाई, भार और धारिता, तीनों के अपने मात्रक हैं।":"aeebb8efc87adec416ef.ogg","हर माप अपनी तरह का मात्रक लेता है।":"d24d097edae500b778c2.ogg","तुमने सीखा: लंबाई, भार और धारिता के अपने अपने मात्रक होते हैं।":"6eb28803af8e9a71e95a.ogg","कूदने की रस्सी, स्कूल बैग और दूध का जग।":"b1c0109608c04c045623.ogg","हर चीज़ को उसके डिब्बे में रखो, फिर उसे मात्रक का कार्ड दो।":"cf3e12c13ed30a470ee3.ogg","हर चीज़ से पूछो।":"d4d7049400b6a30ecb5e.ogg","यह कितनी लंबी है, कितनी भारी है, या इसमें कितना आता है?":"d98f217ff02935d6e2d0.ogg","बाल्टी में बारह पानी आता है, पर मात्रक छूट गया है।":"143c95c89958aef5edf2.ogg","कौन सा मात्रक सही है: सेंटीमीटर, किलोग्राम या लीटर?":"eac06b3409f5f1a3f969.ogg","बाल्टी भरने के बारे में सोचो।":"51107cc491ca2828149d.ogg","कौन सा माप बताता है कि इसमें कितना आता है?":"33974e8be4db05928000.ogg","अब चावल की थैली, एक रिबन और जूस का गिलास।":"2570c08f8403ae31afc0.ogg","इन्हें भी इसी तरह छाँटो।":"6c34bba90a66782c7bca.ogg","तुम इसे उठाओगे, सीधा फैलाओगे, या उँडेलोगे?":"b21eef4280338ceff56c.ogg","उसी से इसका डिब्बा तय होता है।":"684149a746207d170763.ogg","बेंच पर एक बित्ता रखने के लिए हाथ पर टैप करो।":"5f3453288f54aa234453.ogg","उसे नापने के लिए फ़ीते पर भी टैप करो।":"cd6f9e40a78fad239f8e.ogg","कौन सा हाथ इस पर ज़्यादा बार आता है?":"c35e38578761f478dc7d.ogg","फ़ीता खींचो।":"a268c655451271cc3ad9.ogg","क्या उसका माप इस पर निर्भर है कि हाथ किसका है?":"aa5c1d8211ff286abb8d.ogg","बित्ता हर व्यक्ति का अलग होता है।":"607047800e989b1b8c15.ogg","इसलिए सेंटीमीटर जैसे मानक मात्रक लिए जाते हैं।":"3377ea5dc9a57952b67c.ogg","इनसे सबको एक ही माप मिलता है।":"fbcbab0f8bfbe9b740b5.ogg","तुमने सीखा: बित्ते अलग होते हैं, इसलिए सब मानक मात्रक लेते हैं।":"8575d166200dd5cb8c62.ogg","दो बच्चे एक ही बेंच को अपने हाथ से नापते हैं।":"19a89493faa633eaf817.ogg","एक को नौ बित्ते मिलते हैं और दूसरे को बारह।":"871a970134296fd11d0a.ogg","कौन सी गिनती सही है?":"bcfcabb95077cb57aabe.ogg","क्या दोनों गिनतियों के बीच बेंच बदल गई?":"a27539310353d59c3a71.ogg","एक बड़े व्यक्ति को मेज़ छह बित्ते की मिलती है।":"f191bcb069aa86895e4a.ogg","एक बच्चे को वह नौ बित्ते की मिलती है।":"49ee058ac2df392670a8.ogg","संख्याएँ अलग क्यों हैं?":"6f118f0a6f94b4263ef1.ogg","दोनों हाथ मेज़ पर रखो।":"5c786aa5e4eb8b31545d.ogg","किसका बित्ता लंबा है?":"e2a5d0bc4312763da4f7.ogg","कपड़ा बित्ते से नहीं, मीटर से क्यों बिकता है?":"450a557e572a5ae95a3b.ogg","मान लो खरीदार का हाथ बड़ा है।":"31e005df992cfb5ba7b9.ogg","क्या उसके बित्तों से उतना ही कपड़ा मिलेगा?":"513ae2a19450bf44215a.ogg","इस पैमाने पर शून्य ढूँढो।":"18e1172326a6b4b0ebdf.ogg","वह नहीं है, इसलिए पहला निशान ही शून्य का निशान है।":"8dab274d938bb9750c4e.ogg","इस पैमाने पर शून्य का निशान कौन सा है?":"fbcb9cdd3e1be32291af.ogg","शून्य के निशान पर उँगली रखो और एक एक सेंटीमीटर आगे बढ़ो।":"1650ecbc86e49a702179.ogg","शून्य के निशान से नापो, जो पैमाने का पहला निशान है।":"2c6bd2535f6b786b4a49.ogg","वहाँ शून्य न छपा हो, तब भी।":"0027746e38eeadc59464.ogg","फिर दूसरे सिरे का माप ही लंबाई है।":"e8b6df8014ecac78bd49.ogg","तुमने सीखा: शून्य के निशान, यानी पैमाने के पहले निशान से नापो।":"c625c189a332738fb4b6.ogg","एक क्रेयॉन पैमाने पर रखा है।":"0322ce02e95a92920426.ogg","उसका बायाँ सिरा पहले निशान पर है।":"1cac3996969349ea79f0.ogg","क्रेयॉन कितना लंबा है?":"3b59b3dc9f68df496550.ogg","निशानों के बीच की जगहें गिनो, निशान नहीं।":"5951b507d67c93575ed3.ogg","अब एक पेंसिल, उसी पहले निशान से रखी हुई।":"970aaf1dd08bc7132351.ogg","यह कितनी लंबी है?":"5dfd67b0085a9110f000.ogg","पेंसिल शून्य के निशान से शुरू होती है।":"bb3b2fd6324c22a84388.ogg","उसकी नोक के नीचे कौन सी संख्या है?":"a49eb06f56ebeca3a64b.ogg","एक बच्चा चाबी का एक सिरा एक के निशान पर रखता है।":"9233aa90c017383a2f27.ogg","दूसरा सिरा छह पर है।":"0c1c2ab7d0808b02c808.ogg","चाबी कितनी लंबी है?":"276f12e49e6091684173.ogg","चाबी का बायाँ सिरा कहाँ है, और शून्य का निशान कहाँ है?":"868a1f25bfec87512de2.ogg","अनुमान लगाने या नापने से पहले, आकार के हिसाब से मात्रक चुनो।":"607da2b519ea8cb1d747.ogg","असली चीज़ को अपने पास सोचो।":"16ff33c6b8277527dece.ogg","वह कितनी बड़ी है?":"177107d19584f8049b5d.ogg","चित्र को फिर से देखो, एक एक हिस्सा करके।":"cb92dfc1951992cbe4fb.ogg","आकार के हिसाब से मात्रक चुनो, अनुमान लगाओ, फिर नापो।":"f4c5b201bef663832afa.ogg","अच्छा अनुमान पास का होता है, और अंतर बताता है कितना पास।":"d5283bc2f106fd24baa2.ogg","तुमने सीखा: आकार देखकर मात्रक चुनो; अनुमान कितना दूर है, जानो।":"170b16f177c06d9f9dbb.ogg","एक स्कूल बस कितनी लंबी होती है?":"0e265ba9aa3bb8bc7bd1.ogg","लगभग दस सेंटीमीटर, दस मीटर या दस किलोमीटर?":"d7467747f1708d2f8163.ogg","मात्रक पर टैप करो, फिर एंटर दबाओ।":"26368752c09d2da03c61.ogg","बस कितनी बड़ी है?":"65286d8e1f0031355927.ogg","एक उँगली जितनी, एक कदम जितनी, या एक सफ़र जितनी?":"c1846b76b9ad6c7dd739.ogg","और एक क्रिकेट पिच: लगभग बीस सेंटीमीटर, बीस मीटर या बीस किलोमीटर?":"95594d533eab3839fc79.ogg","इसे भी वैसे ही चुनो।":"80d88c3cb0603039b065.ogg","मन में पिच पर चलकर देखो।":"658fe28add2f9d869d5a.ogg","क्या यह कुछ कदम है, या लंबा सफ़र?":"b3495d8e4eace0c4ee3b.ogg","एक बच्चे का अनुमान है कि कॉपी तीस सेंटीमीटर की है।":"182920d4d8eb7f364d18.ogg","शून्य के निशान से नापने पर वह चौबीस सेंटीमीटर निकली।":"ecfe6addc9f9558790b3.ogg","अनुमान कितना ग़लत था?":"53265ab39551e07ff7e8.ogg","माप से अनुमान तक आगे गिनो।":"c3b6fbbb6a4fae901fd9.ogg","पहले हर चीज़ को डिब्बा और मात्रक कार्ड चाहिए।":"a562fb40626877659c07.ogg","पहले तीनों में से एक मात्रक चुनो।":"4dda8be43afda62bab5f.ogg","માપવા માટેની વસ્તુઓની એક બેન્ચ.":"4accdc2d7f1f44010603.ogg","દરેક વસ્તુને કેવા પ્રકારનું માપ જોઈએ?":"4fa15c3b81004e5eedcd.ogg","દરેક વસ્તુને તેના પ્રકારનો એકમ મળ્યો.":"af05c591f491867270cf.ogg","દરેક માપ શૂન્યના નિશાનથી શરૂ થયું.":"70a468fbc8dcd6fe91fc.ogg","દરેક એકમ કદ જોઈને પસંદ થયો.":"f7234fb9d3237d09bd9b.ogg","મુક્ત રમત.":"bcfc14c1819f3e6a51cd.ogg","કોઈ પણ વસ્તુ પસંદ કરો, માપપટ્ટી પર સરકાવો અને શૂન્યના નિશાનથી વાંચો.":"c5eec3de1537a2435a6c.ogg","આ લંબાઈ છે, વજન છે કે ક્ષમતા?":"7d0f5bf8e1e818bafafd.ogg","કયા એકમ તેના છે?":"1b3526b8cfd98bd6f29f.ogg","કયા પ્રકારનું માપ એ કહી શકે?":"2b3da8b76c99cf66621c.ogg","એક વારમાં એક વસ્તુ લો, અને પૂછો કે તેના વિશે શું જાણવું છે.":"b00f05916986c99d3cab.ogg","લંબાઈ, વજન અને ક્ષમતા, ત્રણેયના પોતાના એકમ છે.":"d80be07f02aefc7aff5b.ogg","દરેક માપ પોતાના પ્રકારનો એકમ લે છે.":"0192d2df0ac5cbf0261f.ogg","તમે શીખ્યા: લંબાઈ, વજન અને ક્ષમતાના પોતપોતાના એકમ હોય છે.":"53b4c7187fd72cac6722.ogg","કૂદવાનું દોરડું, દફતર અને દૂધનો જગ.":"0fc1ca1b19eb87016fe6.ogg","દરેકને તેના ડબ્બામાં મૂકો, પછી તેને એકમનું કાર્ડ આપો.":"5a7fdbf38d7a9a2a3f0c.ogg","દરેક વસ્તુને પૂછો.":"f4f1e36dbccb6c1333c5.ogg","તે કેટલી લાંબી છે, કેટલી ભારે છે, કે તેમાં કેટલું સમાય છે?":"cfbb85b74a697aec5e35.ogg","ડોલમાં બાર પાણી સમાય છે, પણ એકમ રહી ગયો છે.":"2e1f482005f4af2ebe6c.ogg","કયો એકમ સાચો છે: સેન્ટિમીટર, કિલોગ્રામ કે લિટર?":"e6decd1d3acfa418e1ce.ogg","ડોલ ભરવાનું વિચારો.":"2c0858b27ee80c71606d.ogg","કયું માપ કહે છે કે તેમાં કેટલું સમાય?":"4c6384637bbc4b4d8e95.ogg","હવે ચોખાની થેલી, એક રિબન અને જ્યૂસનો ગ્લાસ.":"50eebf53142c89ada24a.ogg","તેમને પણ એ જ રીતે ગોઠવો.":"a04a1ebc21bbbd7837f2.ogg","તમે તેને ઉપાડશો, સીધું પાથરશો, કે રેડશો?":"7539599bc43c88b88fb2.ogg","તેનાથી તેનો ડબ્બો નક્કી થાય છે.":"53c48b1de79455157f7a.ogg","બેન્ચ પર એક વેંત મૂકવા હાથ પર ટેપ કરો.":"cd7e1757adf5349709fa.ogg","તેને માપવા માટે ફીત પર પણ ટેપ કરો.":"d99b767a9e055c683829.ogg","કયો હાથ તેના પર વધુ વાર સમાય છે?":"00fb3837e43df2b9a5df.ogg","ફીત ખેંચો.":"da6ea553984f9fee9c11.ogg","શું તેનું માપ હાથ કોનો છે તેના પર આધાર રાખે છે?":"edbc18933fc6e4afd147.ogg","વેંત દરેક વ્યક્તિની જુદી હોય છે.":"93a1033402960e637849.ogg","તેથી સેન્ટિમીટર જેવા પ્રમાણભૂત એકમ વપરાય છે.":"8391b550a2cc63c7b341.ogg","તેનાથી બધાને એક જ માપ મળે છે.":"24a0d420bdac4ee83cab.ogg","તમે શીખ્યા: વેંત જુદી હોય છે, તેથી બધા પ્રમાણભૂત એકમ વાપરે છે.":"3f1d070a5eca7657858f.ogg","બે બાળકો એક જ બેન્ચને પોતાના હાથથી માપે છે.":"8e7afda9f5d95bfe6138.ogg","એકને નવ વેંત મળે છે અને બીજાને બાર.":"250849eca25ac22c92bb.ogg","કઈ ગણતરી સાચી છે?":"ecdd6106b6f685e5c225.ogg","શું બે ગણતરી વચ્ચે બેન્ચ બદલાઈ ગઈ?":"6e14df5e4d49482095ea.ogg","એક વડીલને ટેબલ છ વેંતનું મળે છે, અને એક બાળકને નવ વેંતનું.":"b6caa8042c70f42e4fa2.ogg","સંખ્યાઓ જુદી કેમ છે?":"f8bcefa69f39db250c0b.ogg","બંને હાથ ટેબલ પર મૂકો.":"d868c40fd142728cc965.ogg","કોની વેંત લાંબી છે?":"705ce729bdffdad5f4ca.ogg","કાપડ વેંતથી નહીં, મીટરથી કેમ વેચાય છે?":"b5c32872b63c35b434cb.ogg","માનો કે ગ્રાહકનો હાથ મોટો છે.":"d56b03599dd6dbe90647.ogg","શું તેની વેંતથી એટલું જ કાપડ મળશે?":"6defe07266489e120529.ogg","આ માપપટ્ટી પર શૂન્ય શોધો.":"6cf6055932a4711e8f80.ogg","તે નથી, તેથી પહેલું નિશાન જ શૂન્યનું નિશાન છે.":"40cf796229f7a14a42f3.ogg","આ માપપટ્ટી પર શૂન્યનું નિશાન કયું છે?":"b482aeb6879452435776.ogg","શૂન્યના નિશાન પર આંગળી મૂકો અને એક એક સેન્ટિમીટર આગળ વધો.":"bebb065e47359493ffd2.ogg","શૂન્યના નિશાનથી માપો, જે માપપટ્ટીનું પહેલું નિશાન છે.":"821a67b0968780cc1180.ogg","ત્યાં શૂન્ય છાપેલો ન હોય તો પણ.":"a5755e6e0bd88810de41.ogg","પછી બીજા છેડાનું માપ જ લંબાઈ છે.":"3e80fab1d7c71657f823.ogg","તમે શીખ્યા: શૂન્યના નિશાનથી, એટલે માપપટ્ટીના પહેલા નિશાનથી માપો.":"e3722018d1daa1f4c542.ogg","એક ક્રેયોન માપપટ્ટી પર પડ્યો છે.":"93a5629cf52f3a787b5c.ogg","તેનો ડાબો છેડો પહેલા નિશાન પર છે.":"9ca81e60308176287cd0.ogg","ક્રેયોન કેટલો લાંબો છે?":"3b1569b41643bda7592b.ogg","નિશાનો વચ્ચેની જગ્યા ગણો, નિશાન નહીં.":"f077cbea4b60c7c327a0.ogg","હવે એક પેન્સિલ, એ જ પહેલા નિશાનથી મૂકેલી.":"0e4bb73a90b819940d4b.ogg","તે કેટલી લાંબી છે?":"0d1e9958bfd5fea63ba5.ogg","પેન્સિલ શૂન્યના નિશાનથી શરૂ થાય છે.":"0c630cfe0527645d065d.ogg","તેની અણી નીચે કઈ સંખ્યા છે?":"54b4b75fb95e8cb25617.ogg","એક બાળક ચાવીનો એક છેડો એકના નિશાન પર મૂકે છે.":"a44232ecd134d98976c2.ogg","બીજો છેડો છ પર છે.":"6916282267d879ddf4b4.ogg","ચાવી કેટલી લાંબી છે?":"56d5f6937d0ae6f70b2a.ogg","ચાવીનો ડાબો છેડો ક્યાં છે, અને શૂન્યનું નિશાન ક્યાં છે?":"24747c5137c06b7f7ccb.ogg","અંદાજ લગાવતા કે માપતા પહેલાં, કદ પ્રમાણે એકમ પસંદ કરો.":"bc9a1e3fc1ee24ce67da.ogg","સાચી વસ્તુ તમારી પાસે છે એમ વિચારો.":"dc01704bde39c96b6f21.ogg","તે કેટલી મોટી છે?":"3e89f122e2e3e36953ab.ogg","ચિત્ર ફરી જુઓ, એક એક ભાગ કરીને.":"cb0820f74a9007bd5da4.ogg","કદ પ્રમાણે એકમ પસંદ કરો, અંદાજ લગાવો, પછી માપો.":"eef3523244992b123036.ogg","સારો અંદાજ નજીકનો હોય છે, અને તફાવત કહે છે કેટલો નજીક.":"633f301ac157a25cdeec.ogg","તમે શીખ્યા: કદ જોઈને એકમ પસંદ કરો; અંદાજ કેટલો દૂર છે તે શોધો.":"0bbdf96fce786ae8e4f5.ogg","એક સ્કૂલ બસ કેટલી લાંબી હોય છે?":"9716ecf3064f816628a3.ogg","આશરે દસ સેન્ટિમીટર, દસ મીટર કે દસ કિલોમીટર?":"306e668f83172375133f.ogg","એકમ પર ટેપ કરો, પછી એન્ટર દબાવો.":"fdd6d26d3a281856787b.ogg","બસ કેટલી મોટી છે?":"c4387127b19fa4496206.ogg","એક આંગળી જેટલી, એક પગલા જેટલી, કે એક મુસાફરી જેટલી?":"e50da7ba315001a6f4f5.ogg","અને એક ક્રિકેટ પીચ: આશરે વીસ સેન્ટિમીટર, વીસ મીટર કે વીસ કિલોમીટર?":"8bebaf33a8ebcfda33b3.ogg","તેને પણ એ જ રીતે પસંદ કરો.":"6fce84d52582245bf813.ogg","મનમાં પીચ પર ચાલી જુઓ.":"65b46ced6b0957bfd566.ogg","શું તે થોડાં પગલાં છે, કે લાંબી મુસાફરી?":"2d9f27d43d5062cb747f.ogg","એક બાળકનો અંદાજ છે કે નોટબુક ત્રીસ સેન્ટિમીટરની છે.":"b8f1be2aede075d1fbf1.ogg","શૂન્યના નિશાનથી માપતાં તે ચોવીસ સેન્ટિમીટરની નીકળી.":"c680dea277ca5a10061e.ogg","અંદાજ કેટલો જુદો હતો?":"eb50ea094d35fcaa1dc9.ogg","માપથી અંદાજ સુધી આગળ ગણો.":"a392f761d7a85f6cb0fa.ogg","પહેલાં દરેક વસ્તુને ડબ્બો અને એકમ કાર્ડ જોઈએ.":"ee8c721a315427a4b51b.ogg","પહેલાં ત્રણમાંથી એક એકમ પસંદ કરો.":"b33704b1b3f942b0bf96.ogg"};
const TOOL_VOICE_BASE = "https://media.singularity-learn.com/learning_plan_assets/V2/cbse/indiannica/english/class_4/mathematics/ch_11/2dtool/_voice/";
const TOOL_ID = "ruler_bench";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Ruler Bench";
const CHROME = { "dim": "#9AA4AC", "ink": "#2B2B2B", "rule": "#C9BCA6", "panel": "#F2E4CE", "paper": "#FFFDF7", "accent": "#5B6770" };
const VOICE = { "rate": 0.92, "pitch": 1.06 };
const OPENING = ["A bench of things to measure. What kind of measure does each one need?"];
const FINISH_LINE = "Each thing got a unit of its own kind. Every reading started at the zero mark, and every unit was picked to suit the size.";
const FREE_LINE = "Free play. Pick any thing, slide it along the ruler, and read it from the zero mark.";
const TR = {
  hi: {
    "Ruler Bench": "पैमाना बेंच",
    "A bench of things to measure. What kind of measure does each one need?": "मापने के लिए चीज़ों से भरी एक बेंच। हर चीज़ को किस तरह का माप चाहिए?",
    "Each thing got a unit of its own kind. Every reading started at the zero mark, and every unit was picked to suit the size.": "हर चीज़ को उसकी तरह का मात्रक मिला। हर माप शून्य के निशान से शुरू हुआ। हर मात्रक आकार देखकर चुना गया।",
    "Free play. Pick any thing, slide it along the ruler, and read it from the zero mark.": "मुक्त खेल। कोई भी चीज़ चुनो, पैमाने पर खिसकाओ और शून्य के निशान से पढ़ो।",
    /* phase 1 */
    "A unit for every kind of measure": "हर तरह के माप का मात्रक",
    "Is it a length, a weight or a capacity? Which units belong to it?": "यह लंबाई है, भार है या धारिता? कौन से मात्रक इसके हैं?",
    "Which kind of measure can say that?": "किस तरह का माप यह बता सकता है?",
    "Take one thing at a time, and ask what you want to know about it.": "एक बार में एक चीज़ लो, और पूछो कि उसके बारे में क्या जानना है।",
    "Length, weight and capacity each have their own units, and a measure takes a unit of its own kind.": "लंबाई, भार और धारिता, तीनों के अपने मात्रक हैं। हर माप अपनी तरह का मात्रक लेता है।",
    "You learned: length, weight and capacity each take their own units.": "तुमने सीखा: लंबाई, भार और धारिता के अपने अपने मात्रक होते हैं।",
    "A skipping rope, a school bag and a jug of milk. Put each in its bin, then give each a unit card.": "कूदने की रस्सी, स्कूल बैग और दूध का जग। हर चीज़ को उसके डिब्बे में रखो, फिर उसे मात्रक का कार्ड दो।",
    "Bin and unit card for each": "हर चीज़: डिब्बा और कार्ड",
    "Ask of each thing: how long is it, how heavy is it, or how much does it hold?": "हर चीज़ से पूछो। यह कितनी लंबी है, कितनी भारी है, या इसमें कितना आता है?",
    "A bucket holds 12 blank of water. Which unit fills the blank: centimetres, kilograms or litres?": "बाल्टी में 12 पानी आता है, पर मात्रक छूट गया है। कौन सा मात्रक सही है: सेंटीमीटर, किलोग्राम या लीटर?",
    "A bucket holds 12 ___ of water.": "बाल्टी में 12 ___ पानी आता है।",
    "Think of filling the bucket. Which kind of measure tells how much goes in?": "बाल्टी भरने के बारे में सोचो। कौन सा माप बताता है कि इसमें कितना आता है?",
    "Now a bag of rice, a ribbon and a glass of juice. Sort them the same way.": "अब चावल की थैली, एक रिबन और जूस का गिलास। इन्हें भी इसी तरह छाँटो।",
    "Sort all three.": "तीनों को छाँटो।",
    "Would you lift it, lay it out straight, or pour it? That picks its bin.": "तुम इसे उठाओगे, सीधा फैलाओगे, या उँडेलोगे? उसी से इसका डिब्बा तय होता है।",
    "Each thing needs a bin and a unit card first.": "पहले हर चीज़ को डिब्बा और मात्रक कार्ड चाहिए।",
    /* phase 2 */
    "Why everyone uses the same units": "सब एक जैसे मात्रक क्यों लेते हैं",
    "Tap a hand to lay one handspan along the bench. Tap the tape to measure it too.": "बेंच पर एक बित्ता रखने के लिए हाथ पर टैप करो। उसे नापने के लिए फ़ीते पर भी टैप करो।",
    "Which hand fits more times along it?": "कौन सा हाथ इस पर ज़्यादा बार आता है?",
    "Pull out the tape. Does its reading care whose hand it is?": "फ़ीता खींचो। क्या उसका माप इस पर निर्भर है कि हाथ किसका है?",
    "Handspans change from person to person, so standard units such as the centimetre are used. They give everyone the same reading.": "बित्ता हर व्यक्ति का अलग होता है। इसलिए सेंटीमीटर जैसे मानक मात्रक लिए जाते हैं। इनसे सबको एक ही माप मिलता है।",
    "You learned: handspans differ, so everyone uses standard units.": "तुमने सीखा: बित्ते अलग होते हैं, इसलिए सब मानक मात्रक लेते हैं।",
    "Two children measure the same bench with their hands. One counts 9 handspans and the other counts 12. Which count is right?": "दो बच्चे एक ही बेंच को अपने हाथ से नापते हैं। एक को 9 बित्ते मिलते हैं और दूसरे को 12। कौन सी गिनती सही है?",
    "Which count is right?": "कौन सी गिनती सही है?",
    "Did the bench change between the two counts?": "क्या दोनों गिनतियों के बीच बेंच बदल गई?",
    "A grown-up measures a table as 6 handspans, and a child measures it as 9. Why are the numbers different?": "एक बड़े व्यक्ति को मेज़ 6 बित्ते की मिलती है। एक बच्चे को वह 9 बित्ते की मिलती है। संख्याएँ अलग क्यों हैं?",
    "Why do the counts differ?": "गिनतियाँ अलग क्यों हैं?",
    "Lay both hands along the table. Whose handspan is longer?": "दोनों हाथ मेज़ पर रखो। किसका बित्ता लंबा है?",
    "Why is cloth sold by the metre and not by the handspan?": "कपड़ा बित्ते से नहीं, मीटर से क्यों बिकता है?",
    "Why sell cloth by the metre?": "कपड़ा मीटर से क्यों?",
    "Suppose the buyer has a bigger hand. Would their handspans give the same cloth?": "मान लो खरीदार का हाथ बड़ा है। क्या उसके बित्तों से उतना ही कपड़ा मिलेगा?",
    "just 9": "सिर्फ़ 9",
    "just 12": "सिर्फ़ 12",
    "both": "दोनों",
    "hands differ": "हाथ अलग हैं",
    "table changed": "मेज़ बदली",
    "a miscount": "गलत गिनती",
    "same for all": "सबके लिए एक",
    "a longer unit": "बड़ा मात्रक",
    "quicker": "जल्दी होता है",
    /* phase 3 */
    "Measuring from the zero mark": "शून्य के निशान से मापना",
    "Look for the 0 on this ruler. There is none, so the first mark is the zero mark.": "इस पैमाने पर 0 ढूँढो। वह नहीं है, इसलिए पहला निशान ही शून्य का निशान है।",
    "Which mark is the zero mark on this ruler?": "इस पैमाने पर शून्य का निशान कौन सा है?",
    "Put a finger on the zero mark and step one centimetre at a time.": "शून्य के निशान पर उँगली रखो और एक एक सेंटीमीटर आगे बढ़ो।",
    "Measure from the zero mark, the first mark on the ruler, even where no 0 is printed. Then the reading at the other end is the length.": "शून्य के निशान से नापो, जो पैमाने का पहला निशान है। वहाँ 0 न छपा हो, तब भी। फिर दूसरे सिरे का माप ही लंबाई है।",
    "You learned: measure from the zero mark, the ruler's first mark.": "तुमने सीखा: शून्य के निशान, यानी पैमाने के पहले निशान से नापो।",
    "A crayon lies along the ruler, its left end on the first mark. How long is the crayon?": "एक क्रेयॉन पैमाने पर रखा है। उसका बायाँ सिरा पहले निशान पर है। क्रेयॉन कितना लंबा है?",
    "How long is the crayon, in cm?": "क्रेयॉन कितने सेमी का?",
    "Count the spaces between the marks, not the marks themselves.": "निशानों के बीच की जगहें गिनो, निशान नहीं।",
    "Now a pencil, laid from the same first mark. How long is it?": "अब एक पेंसिल, उसी पहले निशान से रखी हुई। यह कितनी लंबी है?",
    "How long is the pencil, in cm?": "पेंसिल कितने सेमी की?",
    "The pencil starts at the zero mark. Which number sits under its tip?": "पेंसिल शून्य के निशान से शुरू होती है। उसकी नोक के नीचे कौन सी संख्या है?",
    "A child lays one end of a key on the mark for 1. The other end reads 6. How long is the key?": "एक बच्चा चाबी का एक सिरा 1 के निशान पर रखता है। दूसरा सिरा 6 पर है। चाबी कितनी लंबी है?",
    "How long is the key, in cm?": "चाबी कितने सेमी की?",
    "Where does the key's left end sit, and where is the zero mark?": "चाबी का बायाँ सिरा कहाँ है, और शून्य का निशान कहाँ है?",
    /* phase 4 */
    "Choosing a sensible unit": "सही मात्रक चुनना",
    "Before you guess or measure, pick a unit that suits the size.": "अनुमान लगाने या नापने से पहले, आकार के हिसाब से मात्रक चुनो।",
    "Picture the real thing beside you. How big is it?": "असली चीज़ को अपने पास सोचो। वह कितनी बड़ी है?",
    "Look at the picture again, one part at a time.": "चित्र को फिर से देखो, एक एक हिस्सा करके।",
    "Choose a unit that suits the size, guess, then measure. A good estimate is a close one, and the gap tells how close.": "आकार के हिसाब से मात्रक चुनो, अनुमान लगाओ, फिर नापो। अच्छा अनुमान पास का होता है, और अंतर बताता है कितना पास।",
    "You learned: pick a unit to suit the size; find how far a guess is out.": "तुमने सीखा: आकार देखकर मात्रक चुनो; अनुमान कितना दूर है, जानो।",
    "Is a school bus about 10 centimetres, 10 metres or 10 kilometres long? Tap the unit, then press Enter.": "एक स्कूल बस कितनी लंबी होती है? लगभग 10 सेंटीमीटर, 10 मीटर या 10 किलोमीटर? मात्रक पर टैप करो, फिर एंटर दबाओ।",
    "A bus is about 10 ___ long.": "बस लगभग 10 ___ लंबी है।",
    "How big is a bus: about a finger, a step or a journey?": "बस कितनी बड़ी है? एक उँगली जितनी, एक कदम जितनी, या एक सफ़र जितनी?",
    "And a cricket pitch: about 20 centimetres, 20 metres or 20 kilometres? Pick it the same way.": "और एक क्रिकेट पिच: लगभग 20 सेंटीमीटर, 20 मीटर या 20 किलोमीटर? इसे भी वैसे ही चुनो।",
    "A pitch is about 20 ___ long.": "पिच लगभग 20 ___ लंबी है।",
    "Walk the pitch in your head. Is it a few steps, or a long ride?": "मन में पिच पर चलकर देखो। क्या यह कुछ कदम है, या लंबा सफ़र?",
    "A child estimates a notebook at 30 centimetres. Measured from the zero mark, it is 24 centimetres. By how much was the estimate out?": "एक बच्चे का अनुमान है कि कॉपी 30 सेंटीमीटर की है। शून्य के निशान से नापने पर वह 24 सेंटीमीटर निकली। अनुमान कितना ग़लत था?",
    "Out by how many cm?": "कितने सेमी का अंतर?",
    "Count on from the measure to the estimate.": "माप से अनुमान तक आगे गिनो।",
    "Pick one of the three units first.": "पहले तीनों में से एक मात्रक चुनो।",
    /* drawn on the working area, the slot and the summary */
    "in bins": "डिब्बों में",
    "{a} of {n}": "{n} में से {a}",
    "length": "लंबाई",
    "weight": "भार",
    "capacity": "धारिता",
    "skipping rope": "कूदने की रस्सी",
    "school bag": "स्कूल बैग",
    "jug of milk": "दूध का जग",
    "bag of rice": "चावल की थैली",
    "ribbon": "रिबन",
    "glass of juice": "जूस का गिलास",
    "bucket": "बाल्टी",
    "mm": "मिमी",
    "cm": "सेमी",
    "m": "मी",
    "km": "किमी",
    "g": "ग्रा",
    "kg": "किग्रा",
    "mL": "मिली",
    "L": "ली",
    "bench": "बेंच",
    "table": "मेज़",
    "cloth": "कपड़ा",
    "tape": "फ़ीता",
    "big hand": "बड़ा हाथ",
    "small hand": "छोटा हाथ",
    "grown-up": "बड़े व्यक्ति",
    "child": "बच्चा",
    "seller": "दुकानदार",
    "buyer": "खरीदार",
    "both are right": "दोनों सही हैं",
    "the hands differ": "हाथ अलग हैं",
    "a metre never changes": "मीटर कभी नहीं बदलता",
    "crayon": "क्रेयॉन",
    "eraser": "रबड़",
    "key": "चाबी",
    "pencil": "पेंसिल",
    "school bus": "स्कूल बस",
    "cricket pitch": "क्रिकेट पिच",
    "about": "लगभग",
    "centimetres": "सेंटीमीटर",
    "metres": "मीटर",
    "kilometres": "किलोमीटर",
    "metre stick": "मीटर छड़",
    "metre sticks": "मीटर छड़ें",
    "estimate": "अनुमान",
    "measure": "माप"
  },
  gu: {
    "Ruler Bench": "માપપટ્ટી બેન્ચ",
    "A bench of things to measure. What kind of measure does each one need?": "માપવા માટેની વસ્તુઓની એક બેન્ચ. દરેક વસ્તુને કેવા પ્રકારનું માપ જોઈએ?",
    "Each thing got a unit of its own kind. Every reading started at the zero mark, and every unit was picked to suit the size.": "દરેક વસ્તુને તેના પ્રકારનો એકમ મળ્યો. દરેક માપ શૂન્યના નિશાનથી શરૂ થયું. દરેક એકમ કદ જોઈને પસંદ થયો.",
    "Free play. Pick any thing, slide it along the ruler, and read it from the zero mark.": "મુક્ત રમત. કોઈ પણ વસ્તુ પસંદ કરો, માપપટ્ટી પર સરકાવો અને શૂન્યના નિશાનથી વાંચો.",
    /* phase 1 */
    "A unit for every kind of measure": "દરેક પ્રકારના માપ માટે એકમ",
    "Is it a length, a weight or a capacity? Which units belong to it?": "આ લંબાઈ છે, વજન છે કે ક્ષમતા? કયા એકમ તેના છે?",
    "Which kind of measure can say that?": "કયા પ્રકારનું માપ એ કહી શકે?",
    "Take one thing at a time, and ask what you want to know about it.": "એક વારમાં એક વસ્તુ લો, અને પૂછો કે તેના વિશે શું જાણવું છે.",
    "Length, weight and capacity each have their own units, and a measure takes a unit of its own kind.": "લંબાઈ, વજન અને ક્ષમતા, ત્રણેયના પોતાના એકમ છે. દરેક માપ પોતાના પ્રકારનો એકમ લે છે.",
    "You learned: length, weight and capacity each take their own units.": "તમે શીખ્યા: લંબાઈ, વજન અને ક્ષમતાના પોતપોતાના એકમ હોય છે.",
    "A skipping rope, a school bag and a jug of milk. Put each in its bin, then give each a unit card.": "કૂદવાનું દોરડું, દફતર અને દૂધનો જગ. દરેકને તેના ડબ્બામાં મૂકો, પછી તેને એકમનું કાર્ડ આપો.",
    "Bin and unit card for each": "દરેક માટે ડબ્બો અને કાર્ડ",
    "Ask of each thing: how long is it, how heavy is it, or how much does it hold?": "દરેક વસ્તુને પૂછો. તે કેટલી લાંબી છે, કેટલી ભારે છે, કે તેમાં કેટલું સમાય છે?",
    "A bucket holds 12 blank of water. Which unit fills the blank: centimetres, kilograms or litres?": "ડોલમાં 12 પાણી સમાય છે, પણ એકમ રહી ગયો છે. કયો એકમ સાચો છે: સેન્ટિમીટર, કિલોગ્રામ કે લિટર?",
    "A bucket holds 12 ___ of water.": "ડોલમાં 12 ___ પાણી સમાય છે.",
    "Think of filling the bucket. Which kind of measure tells how much goes in?": "ડોલ ભરવાનું વિચારો. કયું માપ કહે છે કે તેમાં કેટલું સમાય?",
    "Now a bag of rice, a ribbon and a glass of juice. Sort them the same way.": "હવે ચોખાની થેલી, એક રિબન અને જ્યૂસનો ગ્લાસ. તેમને પણ એ જ રીતે ગોઠવો.",
    "Sort all three.": "ત્રણેયને ગોઠવો.",
    "Would you lift it, lay it out straight, or pour it? That picks its bin.": "તમે તેને ઉપાડશો, સીધું પાથરશો, કે રેડશો? તેનાથી તેનો ડબ્બો નક્કી થાય છે.",
    "Each thing needs a bin and a unit card first.": "પહેલાં દરેક વસ્તુને ડબ્બો અને એકમ કાર્ડ જોઈએ.",
    /* phase 2 */
    "Why everyone uses the same units": "બધા એક જ એકમ કેમ વાપરે છે",
    "Tap a hand to lay one handspan along the bench. Tap the tape to measure it too.": "બેન્ચ પર એક વેંત મૂકવા હાથ પર ટેપ કરો. તેને માપવા માટે ફીત પર પણ ટેપ કરો.",
    "Which hand fits more times along it?": "કયો હાથ તેના પર વધુ વાર સમાય છે?",
    "Pull out the tape. Does its reading care whose hand it is?": "ફીત ખેંચો. શું તેનું માપ હાથ કોનો છે તેના પર આધાર રાખે છે?",
    "Handspans change from person to person, so standard units such as the centimetre are used. They give everyone the same reading.": "વેંત દરેક વ્યક્તિની જુદી હોય છે. તેથી સેન્ટિમીટર જેવા પ્રમાણભૂત એકમ વપરાય છે. તેનાથી બધાને એક જ માપ મળે છે.",
    "You learned: handspans differ, so everyone uses standard units.": "તમે શીખ્યા: વેંત જુદી હોય છે, તેથી બધા પ્રમાણભૂત એકમ વાપરે છે.",
    "Two children measure the same bench with their hands. One counts 9 handspans and the other counts 12. Which count is right?": "બે બાળકો એક જ બેન્ચને પોતાના હાથથી માપે છે. એકને 9 વેંત મળે છે અને બીજાને 12. કઈ ગણતરી સાચી છે?",
    "Which count is right?": "કઈ ગણતરી સાચી છે?",
    "Did the bench change between the two counts?": "શું બે ગણતરી વચ્ચે બેન્ચ બદલાઈ ગઈ?",
    "A grown-up measures a table as 6 handspans, and a child measures it as 9. Why are the numbers different?": "એક વડીલને ટેબલ 6 વેંતનું મળે છે, અને એક બાળકને 9 વેંતનું. સંખ્યાઓ જુદી કેમ છે?",
    "Why do the counts differ?": "ગણતરી જુદી કેમ છે?",
    "Lay both hands along the table. Whose handspan is longer?": "બંને હાથ ટેબલ પર મૂકો. કોની વેંત લાંબી છે?",
    "Why is cloth sold by the metre and not by the handspan?": "કાપડ વેંતથી નહીં, મીટરથી કેમ વેચાય છે?",
    "Why sell cloth by the metre?": "કાપડ મીટરથી કેમ?",
    "Suppose the buyer has a bigger hand. Would their handspans give the same cloth?": "માનો કે ગ્રાહકનો હાથ મોટો છે. શું તેની વેંતથી એટલું જ કાપડ મળશે?",
    "just 9": "ફક્ત 9",
    "just 12": "ફક્ત 12",
    "both": "બંને",
    "hands differ": "હાથ જુદા છે",
    "table changed": "ટેબલ બદલાયું",
    "a miscount": "ખોટી ગણતરી",
    "same for all": "બધા માટે સરખો",
    "a longer unit": "મોટો એકમ",
    "quicker": "ઝડપી",
    /* phase 3 */
    "Measuring from the zero mark": "શૂન્યના નિશાનથી માપવું",
    "Look for the 0 on this ruler. There is none, so the first mark is the zero mark.": "આ માપપટ્ટી પર 0 શોધો. તે નથી, તેથી પહેલું નિશાન જ શૂન્યનું નિશાન છે.",
    "Which mark is the zero mark on this ruler?": "આ માપપટ્ટી પર શૂન્યનું નિશાન કયું છે?",
    "Put a finger on the zero mark and step one centimetre at a time.": "શૂન્યના નિશાન પર આંગળી મૂકો અને એક એક સેન્ટિમીટર આગળ વધો.",
    "Measure from the zero mark, the first mark on the ruler, even where no 0 is printed. Then the reading at the other end is the length.": "શૂન્યના નિશાનથી માપો, જે માપપટ્ટીનું પહેલું નિશાન છે. ત્યાં 0 છાપેલો ન હોય તો પણ. પછી બીજા છેડાનું માપ જ લંબાઈ છે.",
    "You learned: measure from the zero mark, the ruler's first mark.": "તમે શીખ્યા: શૂન્યના નિશાનથી, એટલે માપપટ્ટીના પહેલા નિશાનથી માપો.",
    "A crayon lies along the ruler, its left end on the first mark. How long is the crayon?": "એક ક્રેયોન માપપટ્ટી પર પડ્યો છે. તેનો ડાબો છેડો પહેલા નિશાન પર છે. ક્રેયોન કેટલો લાંબો છે?",
    "How long is the crayon, in cm?": "ક્રેયોનની લંબાઈ, સેમીમાં?",
    "Count the spaces between the marks, not the marks themselves.": "નિશાનો વચ્ચેની જગ્યા ગણો, નિશાન નહીં.",
    "Now a pencil, laid from the same first mark. How long is it?": "હવે એક પેન્સિલ, એ જ પહેલા નિશાનથી મૂકેલી. તે કેટલી લાંબી છે?",
    "How long is the pencil, in cm?": "પેન્સિલની લંબાઈ, સેમીમાં?",
    "The pencil starts at the zero mark. Which number sits under its tip?": "પેન્સિલ શૂન્યના નિશાનથી શરૂ થાય છે. તેની અણી નીચે કઈ સંખ્યા છે?",
    "A child lays one end of a key on the mark for 1. The other end reads 6. How long is the key?": "એક બાળક ચાવીનો એક છેડો 1ના નિશાન પર મૂકે છે. બીજો છેડો 6 પર છે. ચાવી કેટલી લાંબી છે?",
    "How long is the key, in cm?": "ચાવીની લંબાઈ, સેમીમાં?",
    "Where does the key's left end sit, and where is the zero mark?": "ચાવીનો ડાબો છેડો ક્યાં છે, અને શૂન્યનું નિશાન ક્યાં છે?",
    /* phase 4 */
    "Choosing a sensible unit": "યોગ્ય એકમ પસંદ કરવો",
    "Before you guess or measure, pick a unit that suits the size.": "અંદાજ લગાવતા કે માપતા પહેલાં, કદ પ્રમાણે એકમ પસંદ કરો.",
    "Picture the real thing beside you. How big is it?": "સાચી વસ્તુ તમારી પાસે છે એમ વિચારો. તે કેટલી મોટી છે?",
    "Look at the picture again, one part at a time.": "ચિત્ર ફરી જુઓ, એક એક ભાગ કરીને.",
    "Choose a unit that suits the size, guess, then measure. A good estimate is a close one, and the gap tells how close.": "કદ પ્રમાણે એકમ પસંદ કરો, અંદાજ લગાવો, પછી માપો. સારો અંદાજ નજીકનો હોય છે, અને તફાવત કહે છે કેટલો નજીક.",
    "You learned: pick a unit to suit the size; find how far a guess is out.": "તમે શીખ્યા: કદ જોઈને એકમ પસંદ કરો; અંદાજ કેટલો દૂર છે તે શોધો.",
    "Is a school bus about 10 centimetres, 10 metres or 10 kilometres long? Tap the unit, then press Enter.": "એક સ્કૂલ બસ કેટલી લાંબી હોય છે? આશરે 10 સેન્ટિમીટર, 10 મીટર કે 10 કિલોમીટર? એકમ પર ટેપ કરો, પછી એન્ટર દબાવો.",
    "A bus is about 10 ___ long.": "બસ આશરે 10 ___ લાંબી છે.",
    "How big is a bus: about a finger, a step or a journey?": "બસ કેટલી મોટી છે? એક આંગળી જેટલી, એક પગલા જેટલી, કે એક મુસાફરી જેટલી?",
    "And a cricket pitch: about 20 centimetres, 20 metres or 20 kilometres? Pick it the same way.": "અને એક ક્રિકેટ પીચ: આશરે 20 સેન્ટિમીટર, 20 મીટર કે 20 કિલોમીટર? તેને પણ એ જ રીતે પસંદ કરો.",
    "A pitch is about 20 ___ long.": "પીચ આશરે 20 ___ લાંબી છે.",
    "Walk the pitch in your head. Is it a few steps, or a long ride?": "મનમાં પીચ પર ચાલી જુઓ. શું તે થોડાં પગલાં છે, કે લાંબી મુસાફરી?",
    "A child estimates a notebook at 30 centimetres. Measured from the zero mark, it is 24 centimetres. By how much was the estimate out?": "એક બાળકનો અંદાજ છે કે નોટબુક 30 સેન્ટિમીટરની છે. શૂન્યના નિશાનથી માપતાં તે 24 સેન્ટિમીટરની નીકળી. અંદાજ કેટલો જુદો હતો?",
    "Out by how many cm?": "કેટલા સેમીનો ફરક?",
    "Count on from the measure to the estimate.": "માપથી અંદાજ સુધી આગળ ગણો.",
    "Pick one of the three units first.": "પહેલાં ત્રણમાંથી એક એકમ પસંદ કરો.",
    /* drawn on the working area, the slot and the summary */
    "in bins": "ડબ્બામાં",
    "{a} of {n}": "{n} માંથી {a}",
    "length": "લંબાઈ",
    "weight": "વજન",
    "capacity": "ક્ષમતા",
    "skipping rope": "કૂદવાનું દોરડું",
    "school bag": "દફતર",
    "jug of milk": "દૂધનો જગ",
    "bag of rice": "ચોખાની થેલી",
    "ribbon": "રિબન",
    "glass of juice": "જ્યૂસનો ગ્લાસ",
    "bucket": "ડોલ",
    "mm": "મિમી",
    "cm": "સેમી",
    "m": "મી",
    "km": "કિમી",
    "g": "ગ્રા",
    "kg": "કિગ્રા",
    "mL": "મિલિ",
    "L": "લિ",
    "bench": "બેન્ચ",
    "table": "ટેબલ",
    "cloth": "કાપડ",
    "tape": "ફીત",
    "big hand": "મોટો હાથ",
    "small hand": "નાનો હાથ",
    "grown-up": "વડીલ",
    "child": "બાળક",
    "seller": "વેપારી",
    "buyer": "ગ્રાહક",
    "both are right": "બંને સાચા છે",
    "the hands differ": "હાથ જુદા છે",
    "a metre never changes": "મીટર કદી બદલાતો નથી",
    "crayon": "ક્રેયોન",
    "eraser": "રબર",
    "key": "ચાવી",
    "pencil": "પેન્સિલ",
    "school bus": "સ્કૂલ બસ",
    "cricket pitch": "ક્રિકેટ પીચ",
    "about": "આશરે",
    "centimetres": "સેન્ટિમીટર",
    "metres": "મીટર",
    "kilometres": "કિલોમીટર",
    "metre stick": "મીટર પટ્ટી",
    "metre sticks": "મીટર પટ્ટી",
    "estimate": "અંદાજ",
    "measure": "માપ"
  }
};
const PHASES = [
  {
    n: 1,
    concept: "A unit for every kind of measure",
    conceptId: "M1.S1.T2.C4",
    objectiveIds: ["O1"],
    says: ["Is it a length, a weight or a capacity? Which units belong to it?"],
    ladder: ["Which kind of measure can say that?", "Take one thing at a time, and ask what you want to know about it."],
    closing: "Length, weight and capacity each have their own units, and a measure takes a unit of its own kind.",
    learned: "You learned: length, weight and capacity each take their own units.",
    traceback: "Each thing is drawn again in the bin of its own kind, wearing a unit card from that bin, while the child's own pieces stay where they were set.",
    items: [
      /* learn ML1: answer in the plan = The rope needs a length, in metres; the bag needs a weight, in kilograms; the milk needs a capacity, in litres or millilitres */
      {
        qid: "M1.S1.T2.C4:ML1",
        kind: "sort",
        things: ["rope", "bag", "milk"],
        pad: "enter",
        winMs: 2200,
        say: "A skipping rope, a school bag and a jug of milk. Put each in its bin, then give each a unit card.",
        ask: "Bin and unit card for each",
        answer: "rope=length:m|bag=weight:kg|milk=capacity:L",
        near: "rope=length:m|bag=weight:kg|milk=length:cm",
        miss: "Ask of each thing: how long is it, how heavy is it, or how much does it hold?"
      },
      /* practice 1: answer in the plan = L, because how much water a bucket holds is a capacity */
      {
        qid: "M1.S1.T2.C4:1",
        kind: "blank",
        things: ["bucket"],
        amount: 12,
        winMs: 2200,
        say: "A bucket holds 12 blank of water. Which unit fills the blank: centimetres, kilograms or litres?",
        ask: "A bucket holds 12 ___ of water.",
        choices: [{ id: "cm", label: "cm" }, { id: "kg", label: "kg" }, { id: "L", label: "L" }],
        answer: "L",
        near: "kg",
        miss: "Think of filling the bucket. Which kind of measure tells how much goes in?"
      },
      /* practice 2: answer in the plan = The rice is a weight, in kg; the ribbon is a length, in cm or m; the juice is a capacity, in mL */
      {
        qid: "M1.S1.T2.C4:2",
        kind: "sort",
        things: ["rice", "ribbon", "juice"],
        pad: "enter",
        winMs: 2200,
        say: "Now a bag of rice, a ribbon and a glass of juice. Sort them the same way.",
        ask: "Sort all three.",
        answer: "rice=weight:kg|ribbon=length:cm|juice=capacity:mL",
        near: "rice=weight:kg|ribbon=length:cm|juice=length:cm",
        miss: "Would you lift it, lay it out straight, or pour it? That picks its bin."
      }
    ]
  },
  {
    n: 2,
    concept: "Why everyone uses the same units",
    conceptId: "M1.S1.T2.C5",
    objectiveIds: ["O1"],
    says: ["Tap a hand to lay one handspan along the bench. Tap the tape to measure it too."],
    ladder: ["Which hand fits more times along it?", "Pull out the tape. Does its reading care whose hand it is?"],
    closing: "Handspans change from person to person, so standard units such as the centimetre are used. They give everyone the same reading.",
    learned: "You learned: handspans differ, so everyone uses standard units.",
    traceback: "Both hands lay their handspans along the one bench, each row ending at its end, and the tape reads the bench once in centimetres under both rows.",
    items: [
      /* learn ML2: answer in the plan = Both counted correctly with their own hands. Their hands are different sizes, so the counts differ, and a centimetre tape gives both of them the same length */
      {
        qid: "M1.S1.T2.C5:ML2",
        kind: "whose",
        thing: "bench",
        bench: 108,
        hands: [12, 9],
        who: ["big hand", "small hand"],
        counts: [9, 12],
        rows: [9, 12],
        note: "both are right",
        winMs: 2600,
        say: "Two children measure the same bench with their hands. One counts 9 handspans and the other counts 12. Which count is right?",
        ask: "Which count is right?",
        choices: [{ id: "only9", label: "just 9" }, { id: "only12", label: "just 12" }, { id: "bothright", label: "both" }],
        answer: "bothright",
        near: "only12",
        miss: "Did the bench change between the two counts?"
      },
      /* practice 3: answer in the plan = Their hands are different sizes, so the same table takes more of the child's handspans. A standard unit such as the centimetre gives one answer */
      {
        qid: "M1.S1.T2.C5:3",
        kind: "why",
        thing: "table",
        bench: 108,
        hands: [18, 12],
        who: ["grown-up", "child"],
        counts: [6, 9],
        rows: [6, 9],
        note: "the hands differ",
        winMs: 2600,
        say: "A grown-up measures a table as 6 handspans, and a child measures it as 9. Why are the numbers different?",
        ask: "Why do the counts differ?",
        choices: [{ id: "handsize", label: "hands differ" }, { id: "tablegrew", label: "table changed" }, { id: "miscount", label: "a miscount" }],
        answer: "handsize",
        near: "miscount",
        miss: "Lay both hands along the table. Whose handspan is longer?"
      },
      /* practice 4: answer in the plan = A metre is the same for everyone, so the seller and the buyer get the same length. Handspans change from person to person */
      {
        qid: "M1.S1.T2.C5:4",
        kind: "cloth",
        thing: "cloth",
        bench: 108,
        hands: [12, 18],
        who: ["seller", "buyer"],
        counts: [9, 9],
        rows: [9, 9],
        note: "a metre never changes",
        winMs: 2600,
        say: "Why is cloth sold by the metre and not by the handspan?",
        ask: "Why sell cloth by the metre?",
        choices: [{ id: "sameforall", label: "same for all" }, { id: "longerunit", label: "a longer unit" }, { id: "quicker", label: "quicker" }],
        answer: "sameforall",
        near: "longerunit",
        miss: "Suppose the buyer has a bigger hand. Would their handspans give the same cloth?"
      }
    ]
  },
  {
    n: 3,
    concept: "Measuring from the zero mark",
    conceptId: "M1.S1.T2.C6",
    objectiveIds: ["O2"],
    says: ["Look for the 0 on this ruler. There is none, so the first mark is the zero mark."],
    ladder: ["Which mark is the zero mark on this ruler?", "Put a finger on the zero mark and step one centimetre at a time."],
    closing: "Measure from the zero mark, the first mark on the ruler, even where no 0 is printed. Then the reading at the other end is the length.",
    learned: "You learned: measure from the zero mark, the ruler's first mark.",
    traceback: "A bracket under the object counts the centimetre spaces it covers, the object slides back to the zero mark, and its length is written in centimetres.",
    items: [
      /* learn ML3: answer in the plan = 7 cm */
      {
        qid: "M1.S1.T2.C6:ML3",
        kind: "read",
        obj: "crayon",
        from: 0,
        to: 7,
        answer: 7,
        winMs: 2200,
        say: "A crayon lies along the ruler, its left end on the first mark. How long is the crayon?",
        ask: "How long is the crayon, in cm?",
        miss: "Count the spaces between the marks, not the marks themselves."
      },
      /* practice 5: answer in the plan = 12 cm, because the first mark is the zero mark */
      {
        qid: "M1.S1.T2.C6:5",
        kind: "read",
        obj: "pencil",
        from: 0,
        to: 12,
        answer: 12,
        winMs: 2200,
        say: "Now a pencil, laid from the same first mark. How long is it?",
        ask: "How long is the pencil, in cm?",
        miss: "The pencil starts at the zero mark. Which number sits under its tip?"
      },
      /* practice 6: answer in the plan = 5 cm. From the mark for 1 to the mark for 6 is five centimetres; laid from the zero mark, its other end would sit at 5 */
      {
        qid: "M1.S1.T2.C6:6",
        kind: "read",
        obj: "key",
        from: 1,
        to: 6,
        answer: 5,
        winMs: 2200,
        say: "A child lays one end of a key on the mark for 1. The other end reads 6. How long is the key?",
        ask: "How long is the key, in cm?",
        miss: "Where does the key's left end sit, and where is the zero mark?"
      }
    ]
  },
  {
    n: 4,
    concept: "Choosing a sensible unit",
    conceptId: "M1.S1.T2.C7",
    objectiveIds: ["O2"],
    says: ["Before you guess or measure, pick a unit that suits the size."],
    ladder: ["Picture the real thing beside you. How big is it?", "Look at the picture again, one part at a time."],
    closing: "Choose a unit that suits the size, guess, then measure. A good estimate is a close one, and the gap tells how close.",
    learned: "You learned: pick a unit to suit the size; find how far a guess is out.",
    traceback: "A metre stick is laid along the thing and counted until it fits, or the gap between the estimate and the measure is counted centimetre by centimetre.",
    items: [
      /* learn ML4: answer in the plan = About 10 m */
      {
        qid: "M1.S1.T2.C7:ML4",
        kind: "unit",
        thing: "bus",
        amount: 10,
        realCm: 1100,
        pad: "enter",
        winMs: 2400,
        say: "Is a school bus about 10 centimetres, 10 metres or 10 kilometres long? Tap the unit, then press Enter.",
        ask: "A bus is about 10 ___ long.",
        answer: "m",
        near: "cm",
        miss: "How big is a bus: about a finger, a step or a journey?"
      },
      /* practice 7: answer in the plan = About 20 m. 20 cm is about the length of a new pencil, and 20 km is a long journey */
      {
        qid: "M1.S1.T2.C7:7",
        kind: "unit",
        thing: "pitch",
        amount: 20,
        realCm: 2012,
        pad: "enter",
        winMs: 2400,
        say: "And a cricket pitch: about 20 centimetres, 20 metres or 20 kilometres? Pick it the same way.",
        ask: "A pitch is about 20 ___ long.",
        answer: "m",
        near: "km",
        miss: "Walk the pitch in your head. Is it a few steps, or a long ride?"
      },
      /* practice 8: answer in the plan = By 6 cm; the estimate was 6 cm too long */
      {
        qid: "M1.S1.T2.C7:8",
        kind: "gap",
        thing: "notebook",
        estimate: 30,
        measure: 24,
        answer: 6,
        winMs: 2400,
        say: "A child estimates a notebook at 30 centimetres. Measured from the zero mark, it is 24 centimetres. By how much was the estimate out?",
        ask: "Out by how many cm?",
        miss: "Count on from the measure to the estimate."
      }
    ]
  }
];
const MODEL = {
  families: { length: ["mm", "cm", "m", "km"], weight: ["g", "kg"], capacity: ["mL", "L"] },
  bins: ["length", "weight", "capacity"],
  things: {
    rope: { name: "skipping rope", kind: "length", unit: "m" },
    bag: { name: "school bag", kind: "weight", unit: "kg" },
    milk: { name: "jug of milk", kind: "capacity", unit: "L" },
    rice: { name: "bag of rice", kind: "weight", unit: "kg" },
    ribbon: { name: "ribbon", kind: "length", unit: "cm" },
    juice: { name: "glass of juice", kind: "capacity", unit: "mL" },
    bucket: { name: "bucket", kind: "capacity", unit: "L" }
  },
  bench: { pxPerCm: 6 },
  ruler: { pxPerCm: 60, cm: 15, zeroPrinted: false },
  scale: { pxPerCm: 30, cm: 30 },
  picker: [{ id: "cm", name: "centimetres" }, { id: "m", name: "metres" }, { id: "km", name: "kilometres" }],
  freeThings: [{ id: "crayon", cm: 7 }, { id: "eraser", cm: 4 }, { id: "key", cm: 5 }, { id: "pencil", cm: 12 }]
};
const rbPlaces = (v) => {
  const out = {};
  String(v != null ? v : "").split("|").forEach((s) => {
    const m = /^([a-z]+)=([a-z]*):([A-Za-z]*)$/.exec(s.trim());
    if (m) out[m[1]] = { bin: m[2] || null, unit: m[3] || null };
  });
  return out;
};
const rbCode = (things, place) => things.map((t) => t + "=" + (place[t] && place[t].bin || "") + ":" + (place[t] && place[t].unit || "")).join("|");
const judge = (item, v) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "sort") {
    const pl = rbPlaces(v);
    return item.things.every((t) => pl[t] && pl[t].bin === MODEL.things[t].kind && MODEL.families[pl[t].bin].indexOf(pl[t].unit) >= 0);
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
const oracle = () => {
  const how = { rope: "lay", ribbon: "lay", bag: "lift", rice: "lift", milk: "pour", juice: "pour", bucket: "pour" };
  const fam = { lay: ["length", "mm cm m km"], lift: ["weight", "g kg"], pour: ["capacity", "mL L"] };
  const unitOk = (t, u) => fam[how[t]][1].split(" ").indexOf(u) >= 0;
  return PHASES.every((p) => p.items.every((it) => {
    if (it.kind === "sort") return it.things.every((t) => {
      const m = new RegExp("(^|\\|)" + t + "=(\\w+):(\\w+)").exec(it.answer);
      return !!m && m[2] === fam[how[t]][0] && unitOk(t, m[3]);
    });
    if (it.kind === "blank") return unitOk(it.things[0], it.answer) && it.choices.filter((c) => unitOk(it.things[0], c.id)).length === 1;
    if (it.kind === "whose") return it.counts[0] * it.hands[0] === it.bench && it.counts[1] * it.hands[1] === it.bench && it.answer === "bothright";
    if (it.kind === "why") return it.hands[0] !== it.hands[1] && it.counts[0] * it.hands[0] === it.counts[1] * it.hands[1] && it.answer === "handsize";
    if (it.kind === "cloth") return it.counts[0] * it.hands[0] !== it.counts[1] * it.hands[1] && it.answer === "sameforall";
    if (it.kind === "read") {
      let c = 0;
      for (let x = it.from; x < it.to; x++) c++;
      return c === it.answer;
    }
    if (it.kind === "unit") {
      const cmIn = { cm: 1, m: 100, km: 1e5 };
      const off = (u) => Math.abs(Math.log(it.amount * cmIn[u] / it.realCm));
      return Object.keys(cmIn).sort((a, b) => off(a) - off(b))[0] === it.answer;
    }
    if (it.kind === "gap") {
      let c = 0;
      for (let x = it.measure; x < it.estimate; x++) c++;
      return c === it.answer;
    }
    return false;
  }));
};
const nearMiss = (item) => item.near !== void 0 ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~";
const answerForms = (item) => typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [];
const agentKey = (item) => item.answer;
const RB_SHOWN = {};
PHASES.forEach((p) => p.items.forEach((it) => (it.choices || []).forEach((c) => {
  RB_SHOWN[c.id] = c.label;
})));
const format = (v, _j, o) => {
  const s = String(v != null ? v : ""), t = o && o.tx || ((x) => x);
  if (s.indexOf("=") >= 0) return s.split("|").map((x) => x.split(":")[1] || "").filter((x) => x).map((u) => t(u)).join(o && o.lang && o.lang !== "en" ? " " : "  ");
  return RB_SHOWN[s] || s;
};
const HOOK = {};
const solve = (item, T2) => T2.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T2.submit(item.answer);
const answer = (item, v) => item.pad === "enter" && HOOK.set ? HOOK.set(v) : void 0;
const check = () => HOOK.check ? HOOK.check() : void 0;
const RB_SKY = "#56B4E9";
const RB_SKY_INK = shade(RB_SKY, 0.4);
const RB_MARK = CONTENT.pointer;
const RB_MARK_INK = shade(CONTENT.pointer, 0.25);
const RB_GAP = CONTENT.bead;
const RB_METRE = CONTENT.hundred;
const RB_LIQUID = "#C4E4F4";
const RB_WOOD = "#E6D5B2";
const RB_QUIET = "#A7AFB5";
const RB_BIN_W = 340, RB_BIN_GAP = 33, RB_BIN_TOP = 172, RB_LABEL_H = 72, RB_BODY_Y = 250, RB_CARD_Y = 448, RB_CARD_H = 74;
const rbBinX = (b) => b * (RB_BIN_W + RB_BIN_GAP);
const rbSlotX = (b, k) => rbBinX(b) + 64 + k * 106;
const rbTrayX = (k) => 181 + k * 362;
const RB_BX = 60, RB_ROW_A = 110, RB_BENCH_Y = 114, RB_BENCH_H = 50, RB_ROW_B = 168, RB_TAPE_Y = 252, RB_TAPE_H = 44;
const rbBenchScale = (it) => it.kind === "cloth" ? 6 : 9;
const RB_CM3 = 60, RB_Z3 = 93, RB_RULER_Y = 250, RB_RULER_CM = 15;
const RB_CM4 = 34, RB_Z4 = 33;
function rbThing(id, cx, cy, s, ink, quiet) {
  const f = (c) => quiet ? "#FFFFFF" : c;
  const liq = f(RB_LIQUID);
  let body = null;
  if (id === "rope") body = <g>
      <path d="M -54 18 C -34 -44 -8 52 8 -4 S 38 -42 54 14" fill="none" stroke={ink} strokeWidth={12} strokeLinecap="round" />
      <path d="M -54 18 C -34 -44 -8 52 8 -4 S 38 -42 54 14" fill="none" stroke={f("#BCA98C")} strokeWidth={6} strokeLinecap="round" />
      <rect x={-68} y={12} width={24} height={32} rx={9} fill={f("#8F7D66")} stroke={ink} strokeWidth={3} />
      <rect x={44} y={8} width={24} height={32} rx={9} fill={f("#8F7D66")} stroke={ink} strokeWidth={3} />
    </g>;
  else if (id === "bag") body = <g>
      <path d="M -18 -30 Q 0 -56 18 -30" fill="none" stroke={ink} strokeWidth={6} />
      <rect x={-40} y={-32} width={80} height={76} rx={16} fill={f("#B7C2CC")} stroke={ink} strokeWidth={3} />
      <path d="M -40 -4 Q 0 18 40 -4" fill="none" stroke={ink} strokeWidth={3} />
      <rect x={-16} y={14} width={32} height={20} rx={5} fill={f("#DCE2E7")} stroke={ink} strokeWidth={2} />
    </g>;
  else if (id === "milk") body = <g>
      <path d="M -32 -36 L 28 -36 L 22 40 Q 0 46 -26 40 Z" fill="#FFFFFF" />
      <path d="M -29.6 -6 L 25.6 -6 L 22 40 Q 0 46 -26 40 Z" fill={liq} />
      <path d="M -32 -36 L 28 -36 L 22 40 Q 0 46 -26 40 Z" fill="none" stroke={ink} strokeWidth={3} />
      <path d="M -32 -36 L -44 -44" stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <path d="M 27 -26 Q 52 -22 48 4 Q 44 22 23 22" fill="none" stroke={ink} strokeWidth={5} />
    </g>;
  else if (id === "rice") body = <g>
      <path d="M -34 -18 Q -46 40 -30 44 L 30 44 Q 46 40 34 -18 Q 16 -28 0 -24 Q -16 -28 -34 -18 Z" fill={f("#EFE6D0")} stroke={ink} strokeWidth={3} />
      <path d="M -14 -38 L 14 -38 L 9 -22 L -9 -22 Z" fill={f("#EFE6D0")} stroke={ink} strokeWidth={3} />
      <line x1={-13} y1={-25} x2={13} y2={-25} stroke={ink} strokeWidth={4} />
      {[[-12, 14], [4, 22], [16, 8], [-4, 32], [-18, 30], [20, 30]].map((q, k) => <ellipse key={k} cx={q[0]} cy={q[1]} rx={3} ry={2} fill={ink} />)}
    </g>;
  else if (id === "ribbon") body = <g>
      <path d="M -66 12 C -40 -22 -18 30 4 2 S 44 -24 66 6" fill="none" stroke={ink} strokeWidth={20} strokeLinecap="round" />
      <path d="M -66 12 C -40 -22 -18 30 4 2 S 44 -24 66 6" fill="none" stroke={f("#D8CDBE")} strokeWidth={13} strokeLinecap="round" />
    </g>;
  else if (id === "juice") body = <g>
      <path d="M -24 -38 L 24 -38 L 18 40 L -18 40 Z" fill="#FFFFFF" />
      <path d="M -21.8 -10 L 21.8 -10 L 18 40 L -18 40 Z" fill={liq} />
      <path d="M -24 -38 L 24 -38 L 18 40 L -18 40 Z" fill="none" stroke={ink} strokeWidth={3} />
      <path d="M 6 -30 L 18 -52" stroke={ink} strokeWidth={4} strokeLinecap="round" />
    </g>;
  else body = <g>
      <path d="M -38 -22 L 38 -22 L 29 42 L -29 42 Z" fill={f("#CDD3D9")} stroke={ink} strokeWidth={3} />
      <ellipse cx={0} cy={-22} rx={38} ry={9} fill={liq} stroke={ink} strokeWidth={3} />
      <path d="M -38 -22 Q 0 -72 38 -22" fill="none" stroke={ink} strokeWidth={3} />
    </g>;
  return <g transform={`translate(${cx},${cy}) scale(${s})`}>{body}</g>;
}
function rbTag(cx, y, u, C) {
  return <g>
      <rect x={cx - 38} y={y} width={76} height={44} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <text x={cx} y={y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{u}</text>
    </g>;
}
const RB_HAND_H = 0.66;
function rbHand(x, y, w, line, fill, sw) {
  const h = w * RB_HAND_H;
  const parts = [
    [0.5, 0.64, 0.19, 0.3, 0],
    [0.2, 0.7, 0.2, 0.1, 22],
    [0.36, 0.3, 0.075, 0.28, -12],
    [0.5, 0.24, 0.078, 0.31, 0],
    [0.64, 0.3, 0.074, 0.27, 12],
    [0.82, 0.46, 0.17, 0.085, -28]
  ];
  const el = (q, k, edge) => {
    const cx = x + q[0] * w, cy = y + q[1] * h;
    return <ellipse
      key={k}
      cx={cx}
      cy={cy}
      rx={q[2] * w}
      ry={q[3] * h}
      transform={`rotate(${q[4]} ${cx} ${cy})`}
      fill={edge ? line : fill}
      stroke={edge ? line : "none"}
      strokeWidth={edge ? sw * 2 : 0}
    />;
  };
  return <g>{parts.map((q, k) => el(q, "e" + k, true))}{parts.map((q, k) => el(q, "f" + k, false))}</g>;
}
function rbObj(id, x, y, w, ink) {
  if (id === "crayon") return <g>
      <rect x={x} y={y + 22} width={w - 54} height={46} rx={10} fill="#E7D6B3" stroke={ink} strokeWidth={3} />
      <rect x={x + 26} y={y + 22} width={Math.max(10, w - 140)} height={46} fill="#D6BF95" stroke={ink} strokeWidth={2} />
      <path d={`M ${x + w - 56} ${y + 22} L ${x + w} ${y + 45} L ${x + w - 56} ${y + 68} Z`} fill="#C8AE82" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
    </g>;
  if (id === "pencil") return <g>
      <rect x={x} y={y + 24} width={36} height={42} rx={8} fill="#D9D3CC" stroke={ink} strokeWidth={3} />
      <rect x={x + 34} y={y + 24} width={28} height={42} fill="#BCC3CA" stroke={ink} strokeWidth={3} />
      <rect x={x + 60} y={y + 24} width={w - 130} height={42} fill="#EAD9AE" stroke={ink} strokeWidth={3} />
      <path d={`M ${x + w - 70} ${y + 24} L ${x + w - 14} ${y + 41} L ${x + w - 14} ${y + 49} L ${x + w - 70} ${y + 66} Z`} fill="#E3CBA2" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M ${x + w - 14} ${y + 41} L ${x + w} ${y + 45} L ${x + w - 14} ${y + 49} Z`} fill={ink} />
    </g>;
  if (id === "key") return <g>
      <rect x={x + 58} y={y + 36} width={w - 58} height={18} rx={4} fill="#C6CCD2" stroke={ink} strokeWidth={3} />
      <path d={`M ${x + w - 16} ${y + 54} v 14 h -14 v -8 h -14 v 10 h -14 v -16`} fill="#C6CCD2" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={x + 34} cy={y + 45} r={32} fill="#C6CCD2" stroke={ink} strokeWidth={3} />
      <circle cx={x + 26} cy={y + 45} r={9} fill="#FFFFFF" stroke={ink} strokeWidth={2} />
    </g>;
  return <g>
      <rect x={x} y={y + 24} width={w} height={44} rx={9} fill="#E6E2DB" stroke={ink} strokeWidth={3} />
      <rect x={x + w * 0.5} y={y + 24} width={w * 0.5} height={44} rx={9} fill="#C8CFD6" stroke={ink} strokeWidth={3} />
    </g>;
}
function rbCoil(C) {
  return <g>
      <rect x={20} y={-14} width={46} height={16} rx={3} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <circle cx={0} cy={-14} r={32} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
      <circle cx={0} cy={-14} r={21} fill="none" stroke={C.ink} strokeWidth={1.5} />
      <circle cx={0} cy={-14} r={10} fill="none" stroke={C.ink} strokeWidth={1.5} />
    </g>;
}
function rbBus(C) {
  return <g>
      <rect x={40} y={34} width={360} height={116} rx={18} fill="#E4DCC6" stroke={C.ink} strokeWidth={3} />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={60 + k * 58} y={52} width={44} height={40} rx={6} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />)}
      <rect x={354} y={52} width={30} height={78} rx={5} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      {[112, 326].map((x) => <g key={x}>
          <circle cx={x} cy={150} r={22} fill="#5A5A5A" stroke={C.ink} strokeWidth={3} />
          <circle cx={x} cy={150} r={8} fill="#D0D0D0" />
        </g>)}
    </g>;
}
function rbPitch(C) {
  return <g>
      <rect x={30} y={78} width={530} height={64} rx={6} fill="#E7DCBF" stroke={C.ink} strokeWidth={3} />
      <line x1={72} y1={78} x2={72} y2={142} stroke={C.ink} strokeWidth={1.5} />
      <line x1={518} y1={78} x2={518} y2={142} stroke={C.ink} strokeWidth={1.5} />
      {[40, 48, 56, 534, 542, 550].map((x) => <line key={x} x1={x} y1={64} x2={x} y2={100} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />)}
    </g>;
}
function rbUnitPic(id, cx, C, tx = (v) => v) {
  const bracket = (x0, x1, label) => <g>
      <path d={`M ${x0} ${398} v 10 H ${x1} v -10`} fill="none" stroke={C.ink} strokeWidth={2.5} />
      <text x={(x0 + x1) / 2} y={442} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{"1 " + tx(label.slice(2))}</text>
    </g>;
  if (id === "cm") return <g>
      <rect x={cx - 26} y={240} width={52} height={118} rx={26} fill="#EFE2D0" stroke={C.ink} strokeWidth={3} />
      <rect x={cx - 15} y={248} width={30} height={30} rx={11} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <path d={`M ${cx - 12} 306 Q ${cx} 312 ${cx + 12} 306 M ${cx - 12} 314 Q ${cx} 320 ${cx + 12} 314`} fill="none" stroke={C.ink} strokeWidth={1.5} />
      <rect x={cx - 110} y={360} width={220} height={28} fill="#FBF5E6" stroke={C.ink} strokeWidth={2} />
      {[-78, -26, 26, 78].map((d) => <line key={d} x1={cx + d} y1={360} x2={cx + d} y2={374} stroke={C.ink} strokeWidth={2} />)}
      {bracket(cx - 26, cx + 26, "1 cm")}
    </g>;
  if (id === "m") return <g>
      <path d={`M ${cx - 96} 300 Q ${cx} 226 ${cx + 96} 276`} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="8 7" />
      <ellipse cx={cx - 96} cy={338} rx={20} ry={36} fill="#E6DDCF" stroke={C.ink} strokeWidth={3} />
      <ellipse cx={cx + 96} cy={320} rx={20} ry={36} fill="#E6DDCF" stroke={C.ink} strokeWidth={3} />
      {bracket(cx - 96, cx + 96, "1 m")}
    </g>;
  const town = (x) => <g>
      {[0, 30].map((d) => <g key={d}>
          <rect x={x + d - 13} y={318 - d / 3} width={26} height={30 + d / 3} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
          <path d={`M ${x + d - 17} ${318 - d / 3} L ${x + d} ${302 - d / 3} L ${x + d + 17} ${318 - d / 3} Z`} fill="#D9CDBB" stroke={C.ink} strokeWidth={2} />
        </g>)}
    </g>;
  return <g>
      {town(cx - 140)}
      {town(cx + 96)}
      <rect x={cx - 120} y={352} width={240} height={24} rx={4} fill="#B9BDC1" stroke={C.ink} strokeWidth={2} />
      <line x1={cx - 110} y1={364} x2={cx + 110} y2={364} stroke="#FFFFFF" strokeWidth={3} strokeDasharray="14 10" />
      {bracket(cx - 110, cx + 110, "1 km")}
    </g>;
}
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v) => v }) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const it = free ? { kind: "free", things: [] } : item || { kind: "none", things: [] };
  const K = it.kind;
  const ik = free ? "free" : n + ":" + index;
  const ikRef = useRef(ik);
  ikRef.current = ik;
  const fresh = () => ({
    place: {},
    sel: null,
    flash: null,
    demo: null,
    a: 0,
    b: 0,
    tape: false,
    left: K === "read" ? it.from : 1,
    touched: false,
    pick: null,
    obj: "crayon"
  });
  const [raw, setRaw] = useState(() => ({ ik, ...fresh() }));
  const st = raw.ik === ik ? raw : { ik, ...fresh() };
  const stRef = useRef(st);
  stRef.current = st;
  const put = (o) => {
    if (ikRef.current !== ik) return;
    const next = { ...stRef.current, ...o };
    stRef.current = next;
    setRaw(next);
  };
  const won = stage === "win" || stage === "idle";
  const acting = (stage === "ask" || stage === "teach" || free) && !tl.busy;
  const D = st.demo || (won ? { k: 999, done: true, tape: true, ring: true, list: K === "blank" ? ["bucket"] : [] } : null);
  const grab = useRef(null);
  const drag = useDrag((pay, p, moved) => {
    if (!acting) {
      grab.current = null;
      return;
    }
    if (pay.t === "thing") dropThing(pay.id, p, moved);
    else if (pay.t === "card") dropCard(pay, p, moved);
    else if (pay.t === "obj") dropObj(p, moved);
  });
  const dd = drag.drag;
  if (dd && dd.payload && dd.payload.t === "obj") {
    if (!grab.current) grab.current = { x: dd.x, left: st.left };
  } else if (!dd) grab.current = null;
  const binAt = (p) => {
    if (!(p.y >= RB_BIN_TOP - 12 && p.y <= 560)) return -1;
    for (let b = 0; b < 3; b++) if (p.x >= rbBinX(b) - 16 && p.x <= rbBinX(b) + RB_BIN_W + 16) return b;
    return -1;
  };
  const placeThing = (id, bin) => {
    const s = stRef.current, old = s.place[id];
    put({ place: { ...s.place, [id]: bin ? { bin, unit: old && old.bin === bin ? old.unit : null } : null }, sel: null, demo: null });
    api.sfx.tick();
  };
  const giveCard = (card, id) => {
    const s = stRef.current, pl = s.place[id];
    if (!pl) {
      put({ sel: null });
      return;
    }
    if (pl.bin !== card.bin) {
      put({ sel: null, flash: pl.bin, demo: null });
      return;
    }
    put({ place: { ...s.place, [id]: { bin: pl.bin, unit: card.u } }, sel: null, demo: null });
    api.sfx.tick();
  };
  const thingAt = (p) => {
    const s = stRef.current;
    return it.things.find((t, k) => {
      const pl = s.place[t];
      if (!pl) return false;
      const x0 = rbSlotX(MODEL.bins.indexOf(pl.bin), k) - 53;
      return p.x >= x0 && p.x <= x0 + 106 && p.y >= RB_BODY_Y - 10 && p.y <= RB_CARD_Y;
    });
  };
  const dropThing = (id, p, moved) => {
    const s = stRef.current;
    if (!moved) {
      if (s.sel && s.sel.t === "card" && s.place[id]) {
        giveCard(s.sel, id);
        return;
      }
      put({ sel: s.sel && s.sel.t === "thing" && s.sel.id === id ? null : { t: "thing", id }, demo: null });
      return;
    }
    const b = binAt(p);
    if (b >= 0) placeThing(id, MODEL.bins[b]);
    else if (p.y < RB_BIN_TOP - 12) placeThing(id, null);
  };
  const dropCard = (card, p, moved) => {
    const s = stRef.current;
    if (!moved) {
      put({ sel: s.sel && s.sel.t === "card" && s.sel.u === card.u ? null : { t: "card", u: card.u, bin: card.bin }, demo: null });
      return;
    }
    const id = thingAt(p);
    if (id) giveCard(card, id);
    else put({ sel: null });
  };
  const pressBin = (b) => {
    if (!acting) return;
    const s = stRef.current;
    if (s.sel && s.sel.t === "thing") placeThing(s.sel.id, MODEL.bins[b]);
  };
  const sortDone = () => {
    const s = stRef.current;
    return it.things.every((t) => s.place[t] && s.place[t].unit);
  };
  const pkeys = (pay) => {
    const k = drag.keys(pay);
    return { onKeyDown: (e) => {
      if (e.key === "Enter" && K === "sort" && sortDone()) return;
      k.onKeyDown(e);
    } };
  };
  const stamp = (r) => {
    if (!acting) return;
    const s = stRef.current, max = Math.floor(it.bench / it.hands[r] + 1e-9), cur = r === 0 ? s.a : s.b;
    if (cur >= max) return;
    put(r === 0 ? { a: cur + 1, demo: null } : { b: cur + 1, demo: null });
    api.sfx.tick();
  };
  const pullTape = () => {
    if (!acting) return;
    put({ tape: !stRef.current.tape, demo: null });
    api.sfx.tick();
  };
  const lenOf = (id) => (MODEL.freeThings.find((f) => f.id === id) || MODEL.freeThings[0]).cm;
  const dropObj = (p, moved) => {
    const s = stRef.current, g = grab.current, len = free ? lenOf(s.obj) : it.to - it.from;
    grab.current = null;
    let nl;
    if (!moved || !g || !isFinite(p.x)) nl = s.left === 0 ? K === "read" && it.from > 0 ? it.from : 1 : 0;
    else nl = Math.max(0, Math.min(RB_RULER_CM - len, Math.round(g.left + (p.x - g.x) / RB_CM3)));
    if (nl !== s.left) api.sfx.tick();
    put({ left: nl, touched: true });
  };
  const objKeys = (e) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, Home: -99, End: 99 };
    if (step[e.key] === void 0) {
      drag.keys({ t: "obj" }).onKeyDown(e);
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (!acting) return;
    const s = stRef.current, len = free ? lenOf(s.obj) : it.to - it.from;
    const nl = Math.max(0, Math.min(RB_RULER_CM - len, s.left + step[e.key]));
    if (nl !== s.left) api.sfx.tick();
    put({ left: nl, touched: true });
  };
  const pickObj = (id) => {
    put({ obj: id, left: Math.min(stRef.current.left, RB_RULER_CM - lenOf(id)) });
    api.sfx.tick();
  };
  const picking = stage === "ask" && !tl.busy;
  const pickUnit = (id) => {
    if (!picking) return;
    put({ pick: id, demo: null });
    api.setTyped(id);
    api.sfx.tick();
  };
  const typedWas = useRef(typed);
  useEffect(() => {
    const was = typedWas.current;
    typedWas.current = typed;
    if (K === "unit" && was && !typed && stRef.current.pick) put({ pick: null });
  }, [typed]);
  HOOK.set = (v) => {
    if (K === "sort") {
      const pl = rbPlaces(v);
      if (!it.things.every((t) => pl[t])) return false;
      put({ place: pl, sel: null, demo: null });
      return true;
    }
    if (K === "unit") {
      const u = String(v != null ? v : "").trim();
      if (!MODEL.picker.some((c) => c.id === u)) return false;
      put({ pick: u, demo: null });
      api.setTyped(u);
      return true;
    }
    return false;
  };
  if (!free && stage === "ask" && K === "sort") api.onEnter(() => {
    const s = stRef.current, code = rbCode(it.things, s.place);
    if (!it.things.every((t) => s.place[t] && s.place[t].unit)) {
      api.say("Each thing needs a bin and a unit card first.");
      return;
    }
    if (wrong && String(wrong.value) === code) return;
    if (s.sel) put({ sel: null });
    api.submit(code);
  });
  else if (!free && stage === "ask" && K === "unit") api.onEnter(() => {
    const s = stRef.current;
    if (!s.pick) {
      api.say("Pick one of the three units first.");
      return;
    }
    if (wrong && String(wrong.value) === s.pick) return;
    api.submit(s.pick);
  });
  else api.onEnter(null);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const s0 = stRef.current;
    const set = (d) => put({ demo: d });
    const tick = () => api.sfx.tick();
    const steps = [];
    if (K === "blank") {
      steps.push([300, () => set({ k: 0 })]);
      for (let j = 1; j <= it.choices.length; j++) steps.push([850, () => {
        set({ k: j });
        tick();
      }]);
      steps.push([0, () => set({ k: it.choices.length, done: true })]);
    } else if (K === "sort") {
      const list = it.things.filter((t) => {
        const pl = s0.place[t];
        return !(pl && pl.bin === MODEL.things[t].kind && pl.unit);
      });
      const litOf = (j) => list[j] ? MODEL.things[list[j]].kind : null;
      steps.push([800, () => put({ sel: null, demo: { list, k: 0, lit: litOf(0) } })]);
      list.forEach((_t, j) => steps.push([900, () => {
        set({ list, k: j + 1, lit: litOf(j + 1) || litOf(j) });
        tick();
      }]));
      steps.push([0, () => set({ list, k: list.length, done: true })]);
    } else if (K === "whose" || K === "why" || K === "cloth") {
      const mx = Math.max(it.rows[0], it.rows[1]);
      steps.push([300, () => set({ k: 0 })]);
      for (let k = 1; k <= mx; k++) steps.push([220, () => {
        set({ k });
        tick();
      }]);
      steps.push([800, () => set({ k: mx, tape: true })]);
      steps.push([0, () => set({ k: mx, tape: true, done: true })]);
    } else if (K === "read") {
      const len = it.to - it.from;
      steps.push([400, () => set({ k: 0 })]);
      for (let j = 1; j <= len; j++) steps.push([260, () => {
        set({ k: j });
        tick();
      }]);
      if (s0.left !== 0) steps.push([700, () => put({ left: 0, demo: { k: len } })]);
      steps.push([0, () => set({ k: len, done: true })]);
    } else if (K === "unit") {
      const gap = it.amount > 12 ? 120 : 220;
      steps.push([500, () => set({ k: 0, ring: true })]);
      for (let j = 1; j <= it.amount; j++) steps.push([gap, () => {
        set({ k: j, ring: true });
        if (it.amount <= 12 || j % 5 === 0) tick();
      }]);
      steps.push([0, () => set({ k: it.amount, ring: true, done: true })]);
    } else if (K === "gap") {
      const g = it.estimate - it.measure;
      steps.push([400, () => set({ k: 0 })]);
      for (let j = 1; j <= g; j++) steps.push([300, () => {
        set({ k: j });
        tick();
      }]);
      steps.push([0, () => set({ k: g, done: true })]);
    }
    if (!steps.length) return;
    api.lock(true);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);
  useEffect(() => {
    if (!st.flash) return;
    const t = setTimeout(() => put({ flash: null }), 1300);
    return () => clearTimeout(t);
  }, [st.flash, ik]);
  const bins = {}, units = {};
  (it.things || []).forEach((t) => {
    const pl = st.place[t];
    bins[t] = pl ? pl.bin : null;
    units[t] = pl ? pl.unit : null;
  });
  api.share({
    bins,
    unitsChosen: units,
    spanCount: [st.a, st.b],
    tapeReading: st.tape && it.bench ? it.bench : null,
    objectStart: K === "read" || free ? st.left : null,
    unit: st.pick
  });
  const sorterView = () => {
    const things = it.things;
    const dg = dd && dd.moved ? dd : null;
    const litBin = st.flash || D && !D.done && D.lit || null;
    const list = D && D.list || [];
    const ghosts = D ? list.slice(0, Math.min(D.k, list.length)) : [];
    const inBins = things.filter((t) => st.place[t] || ghosts.indexOf(t) >= 0).length;
    const tile = (cx, fill, edge, sw) => <rect x={cx - 46} y={RB_BODY_Y + 6} width={92} height={146} rx={14} fill={fill} stroke={edge} strokeWidth={sw} />;
    const cx0 = (x) => Math.min(Math.max(x, 76), 1010), cy0 = (y) => Math.min(Math.max(y, 56), 470);
    return <g>
        {K === "sort" && <g data-zone="runs">
            <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
            <text x={24} y={-45} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("in bins")}</text>
            <text x={306} y={-43} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("{a} of {n}").replace("{a}", String(inBins)).replace("{n}", String(things.length))}</text>
          </g>}
        <rect x={1} y={1} width={1084} height={148} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
        {MODEL.bins.map((bin, b) => {
      const lit = litBin === bin;
      return <g key={bin}>
              <rect x={rbBinX(b) + 1} y={RB_BIN_TOP} width={RB_BIN_W - 2} height={354} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <rect
        x={rbBinX(b) + 1}
        y={RB_BIN_TOP}
        width={RB_BIN_W - 2}
        height={RB_LABEL_H}
        rx={RAD.panel}
        fill={lit ? tint(C.accent, 0.72) : tint(C.panel, 0.55)}
        stroke={lit ? C.accent : C.rule}
        strokeWidth={lit ? 4 : 2}
      />
              <text x={rbBinX(b) + RB_BIN_W / 2} y={RB_BIN_TOP + 47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(bin)}</text>
              <rect x={rbBinX(b) + 5} y={RB_CARD_Y - 5} width={RB_BIN_W - 10} height={RB_CARD_H + 10} rx={14} fill={tint(C.panel, 0.7)} />
            </g>;
    })}
        {
      /* the keyboard meets the things first, then the bins, then the cards */
    }
        {things.map((t, k) => {
      const pl = st.place[t], b = pl ? MODEL.bins.indexOf(pl.bin) : -1;
      const cx = b >= 0 ? rbSlotX(b, k) : rbTrayX(k), cy = b >= 0 ? RB_BODY_Y + 54 : 58;
      const box = b >= 0 ? { x: cx - 52, y: RB_BODY_Y + 2, w: 104, h: 184 } : { x: cx - 120, y: 6, w: 240, h: 140 };
      const lifted = dg && dg.payload.t === "thing" && dg.payload.id === t;
      const chosen = st.sel && st.sel.t === "thing" && st.sel.id === t;
      const misplaced = !!(st.demo && list.indexOf(t) >= 0 && pl && pl.bin !== MODEL.things[t].kind);
      const pay = { t: "thing", id: t };
      return <g key={"thing-" + t} {...control("thing-" + t, MODEL.things[t].name)} {...drag.bind(pay)} {...pkeys(pay)}>
              <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={16} fill="transparent" stroke={chosen ? C.accent : "none"} strokeWidth={4} />
              {b >= 0 && !lifted && tile(cx, tint(C.panel, 0.6), C.rule, 2)}
              {lifted ? <rect x={box.x + 12} y={box.y + 12} width={box.w - 24} height={box.h - 24} rx={14} fill="none" stroke={RB_QUIET} strokeWidth={2} strokeDasharray="8 8" /> : rbThing(t, cx, cy, b >= 0 ? 0.62 : 1.1, misplaced ? RB_QUIET : C.ink, misplaced)}
              {b < 0 && !lifted && <text x={cx} y={138} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(MODEL.things[t].name)}</text>}
              {b >= 0 && pl.unit && !lifted && rbTag(cx, RB_BODY_Y + 100, tx(pl.unit), C)}
            </g>;
    })}
        {MODEL.bins.map((bin, b) => <Hit key={"hit-" + bin} id={"bin-" + bin} x={rbBinX(b)} y={RB_BIN_TOP} w={RB_BIN_W} h={RB_LABEL_H} onPress={() => pressBin(b)} label={"the " + bin + " bin"} />)}
        {MODEL.bins.map((bin, b) => {
      const us = MODEL.families[bin], m = us.length, w = (RB_BIN_W - 12 - (m - 1) * 12) / m;
      return us.map((u, j) => {
        const x = rbBinX(b) + 6 + j * (w + 12), pay = { t: "card", u, bin };
        const chosen = st.sel && st.sel.t === "card" && st.sel.u === u;
        const lifted = dg && dg.payload.t === "card" && dg.payload.u === u;
        const hot = chosen || litBin === bin;
        const face = <g>
                <rect
          x={x}
          y={RB_CARD_Y}
          width={w}
          height={RB_CARD_H}
          rx={12}
          fill={chosen ? tint(C.accent, 0.72) : "#FFFFFF"}
          stroke={hot ? C.accent : C.ink}
          strokeWidth={hot ? 4 : 2}
          strokeDasharray={lifted ? "8 6" : void 0}
        />
                {
          /* the length bin's four cards are 73 wide: its Devanagari and Gujarati symbols (मिमी, કિમી) take the smaller size */
        }
                <text x={x + w / 2} y={RB_CARD_Y + 47} textAnchor="middle" fontSize={lang !== "en" && m === 4 ? T.micro : T.label} fontWeight={700} fill={C.ink}>{tx(u)}</text>
              </g>;
        return K === "sort" ? <g key={"card-" + u} {...control("card-" + u, u + " card")} {...drag.bind(pay)} {...pkeys(pay)}>{face}</g> : <g key={"card-" + u}>{face}</g>;
      });
    })}
        <g pointerEvents="none">
          {ghosts.map((t) => {
      const k = things.indexOf(t), cx = rbSlotX(MODEL.bins.indexOf(MODEL.things[t].kind), k);
      return <g key={"ghost-" + t}>
                {tile(cx, tint(C.accent, 0.86), C.accent, 3)}
                {rbThing(t, cx, RB_BODY_Y + 54, 0.62, C.ink)}
                {rbTag(cx, RB_BODY_Y + 100, tx(MODEL.things[t].unit), C)}
              </g>;
    })}
        </g>
        {dg && (dg.payload.t === "thing" || dg.payload.t === "card") && <g pointerEvents="none" filter="url(#fLift)">
            {dg.payload.t === "thing" ? rbThing(dg.payload.id, cx0(dg.x), cy0(dg.y), 0.8, C.ink) : <g>
                <rect x={cx0(dg.x) - 40} y={cy0(dg.y) - 37} width={80} height={74} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
                <text x={cx0(dg.x)} y={cy0(dg.y) + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(dg.payload.u)}</text>
              </g>}
          </g>}
        {K === "sort" && inBins === 0 && !st.sel && (stage === "ask" || stage === "teach") && <Invite x={rbTrayX(0)} y={58} r={52} C={C} />}
      </g>;
  };
  const blankView = () => {
    const kindOf = (u) => MODEL.bins.find((b) => MODEL.families[b].indexOf(u) >= 0);
    const shown = D ? Math.min(D.k, it.choices.length) : 0;
    return <g>
        {rbThing(it.things[0], 250, 196, 2, C.ink)}
        <text x={250} y={326} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(MODEL.things[it.things[0]].name)}</text>
        <text x={450} y={230} fontSize={T.display} fontWeight={700} fill={C.ink}>{it.amount}</text>
        <rect x={560} y={150} width={160} height={100} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} strokeDasharray="12 9" />
        <g pointerEvents="none">
          {D && D.done && <text x={640} y={226} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{tx(it.answer)}</text>}
          {it.choices.slice(0, shown).map((c, j) => {
      const x = 120 + j * 300, lit = kindOf(c.id) === MODEL.things[it.things[0]].kind;
      return <g key={"unit-" + c.id}>
                <rect x={x} y={364} width={240} height={150} rx={RAD.card} fill={lit ? tint(C.accent, 0.75) : "#FFFFFF"} stroke={lit ? C.accent : C.rule} strokeWidth={lit ? 5 : 2} />
                <text x={x + 120} y={434} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx(c.label)}</text>
                <text x={x + 120} y={490} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(kindOf(c.id) || "")}</text>
              </g>;
    })}
        </g>
      </g>;
  };
  const benchView = () => {
    const cm = rbBenchScale(it), x0 = RB_BX, L = it.bench * cm;
    const wA = it.hands[0] * cm, wB = it.hands[1] * cm;
    const dk = D ? D.k : 0;
    const nA = Math.max(st.a, D ? Math.min(dk, it.rows[0]) : 0);
    const nB = Math.max(st.b, D ? Math.min(dk, it.rows[1]) : 0);
    const demoTape = !!(D && D.tape);
    const tapeLen = demoTape && K === "cloth" ? it.hands[1] * it.rows[1] : it.bench;
    const readings = demoTape && K === "cloth" ? [it.bench, tapeLen] : [it.bench];
    const row = (count, w, top, key) => Array.from({ length: count }).map((_, k) => <g key={key + k}>{rbHand(x0 + k * w, top, w, RB_SKY, "#EEF7FC", 2.5)}</g>);
    return <g>
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
          <line x1={165} y1={-84} x2={165} y2={-28} stroke={C.rule} strokeWidth={2} />
          {[0, 1].map((r) => {
      const c = r === 0 ? nA : nB, w = it.hands[r] * 4;
      return <g key={"count" + r}>
                {rbHand(20 + r * 165, -56 - w * RB_HAND_H / 2, w, RB_SKY, "#EEF7FC", 1.5)}
                <text x={r * 165 + 146} y={-40} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={RB_SKY_INK}>{c}</text>
              </g>;
    })}
        </g>
        {row(nA, wA, RB_ROW_A - wA * RB_HAND_H, "a")}
        <rect x={x0} y={RB_BENCH_Y} width={L} height={RB_BENCH_H} rx={8} fill={K === "cloth" ? "#ECE6DA" : RB_WOOD} stroke={C.ink} strokeWidth={3} />
        {K === "cloth" && Array.from({ length: 17 }).map((_, j) => <line key={"weave" + j} x1={x0 + 20 + j * 38} y1={RB_BENCH_Y + 4} x2={x0 + 6 + j * 38} y2={RB_BENCH_Y + RB_BENCH_H - 4} stroke="#CFC6B6" strokeWidth={2} />)}
        <rect x={x0 + L / 2 - 54} y={RB_BENCH_Y + 8} width={108} height={34} rx={17} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={x0 + L / 2} y={RB_BENCH_Y + 35} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(it.thing)}</text>
        {row(nB, wB, RB_ROW_B, "b")}
        {(st.tape || demoTape) && <g pointerEvents="none">
            <rect x={x0} y={RB_TAPE_Y} width={tapeLen * cm} height={RB_TAPE_H} rx={4} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            {Array.from({ length: Math.floor(tapeLen / 2) + 1 }).map((_, j) => {
      const v = j * 2, x = x0 + v * cm, long = v % 10 === 0;
      return <line key={"tick" + j} x1={x} y1={RB_TAPE_Y} x2={x} y2={RB_TAPE_Y + (long ? 16 : 8)} stroke={C.ink} strokeWidth={long ? 2.5 : 1.5} />;
    })}
            {Array.from({ length: Math.floor(tapeLen / 20) }).map((_, j) => (j + 1) * 20 > 0 && readings.every((r) => Math.abs(r - (j + 1) * 20) >= 5) ? <text key={"num" + j} x={x0 + (j + 1) * 20 * cm} y={RB_TAPE_Y + 39} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{(j + 1) * 20}</text> : null)}
            <rect x={x0 - 3} y={RB_TAPE_Y - 8} width={6} height={RB_TAPE_H + 16} rx={2} fill={RB_MARK} />
            {readings.map((r) => {
      const x = x0 + r * cm, edge = x > 960;
      return <g key={"reading" + r}>
                  <rect x={x - 3} y={RB_TAPE_Y - 8} width={6} height={RB_TAPE_H + 16} rx={2} fill={RB_MARK} />
                  <text x={edge ? x + 6 : x} y={RB_TAPE_Y + RB_TAPE_H + 42} textAnchor={edge ? "end" : "middle"} fontSize={T.label} fontWeight={700} fill={RB_MARK_INK}>{r + " " + tx("cm")}</text>
                </g>;
    })}
          </g>}
        {[0, 1].map((r) => {
      const w = it.hands[r] * 6.5;
      return <Key key={"hand" + r} id={"hand-" + r} x={40 + r * 240} y={384} w={220} h={136} C={C} disabled={!acting} onClick={() => stamp(r)} label={"lay a " + it.who[r] + " handspan"}>
              {rbHand(-w / 2, -28 - w * RB_HAND_H / 2, w, C.ink, "#FFFFFF", 2)}
              <text y={52} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(it.who[r])}</text>
            </Key>;
    })}
        <Key id="tape" x={520} y={384} w={220} h={136} C={C} disabled={!acting} onClick={pullTape} label={st.tape ? "roll up the tape" : "pull out the tape"}>
          {rbCoil(C)}
          <text y={52} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tape")}</text>
        </Key>
        {
      /* the correction's last words: one line under the tape, on the row of its readings */
    }
        {D && D.done && <text x={x0} y={RB_TAPE_Y + RB_TAPE_H + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(it.note)}</text>}
        {!st.a && !st.b && !st.tape && !D && (stage === "ask" || stage === "teach") && <Invite x={150} y={432} r={44} C={C} />}
      </g>;
  };
  const rulerView = (fm) => {
    const cm = RB_CM3, z = RB_Z3;
    const objId = fm ? st.obj : it.obj;
    const len = fm ? lenOf(st.obj) : it.to - it.from;
    const live = dd && dd.payload && dd.payload.t === "obj" && grab.current ? Math.max(0, Math.min(RB_RULER_CM - len, grab.current.left + (dd.x - grab.current.x) / cm)) : st.left;
    const snap = Math.round(live);
    const xL = z + live * cm;
    const bx0 = z + snap * cm, bx1 = bx0 + len * cm;
    const counted = fm ? len : D ? Math.min(D.k, len) : 0;
    return <g>
        <rect x={53} y={RB_RULER_Y} width={980} height={100} rx={10} fill="#FBF5E6" stroke={C.ink} strokeWidth={3} />
        {Array.from({ length: RB_RULER_CM * 2 + 1 }).map((_, i) => {
      const x = z + i * cm / 2, whole = i % 2 === 0;
      return <line key={"k" + i} x1={x} y1={RB_RULER_Y} x2={x} y2={RB_RULER_Y + (whole ? 42 : 22)} stroke={C.ink} strokeWidth={whole ? 3 : 2} />;
    })}
        <text x={z} y={RB_RULER_Y + 76} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("cm")}</text>
        {Array.from({ length: RB_RULER_CM }).map((_, i) => <text key={"n" + i} x={z + (i + 1) * cm} y={RB_RULER_Y + 78} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{i + 1}</text>)}
        {snap === 0 && <rect x={z - 4} y={RB_RULER_Y - 4} width={8} height={50} rx={3} fill={RB_MARK} />}
        {
      /* the reading mark lights only once the reading is no longer the question: in the correction, after
         the answer, in free play (before it, it would point at the answer's numeral) */
    }
        {(fm || D) && <rect x={z + (snap + len) * cm - 4} y={RB_RULER_Y - 4} width={8} height={50} rx={3} fill={RB_MARK} />}
        <g {...control("object", "slide the " + objId)} {...drag.bind({ t: "obj" })} onKeyDown={objKeys}>
          <rect x={xL - 12} y={146} width={len * cm + 24} height={100} rx={14} fill="transparent" />
          {rbObj(objId, xL, 152, len * cm, C.ink)}
        </g>
        {(fm || D) && <g pointerEvents="none">
            <path d={`M ${bx0} 362 V 384 H ${bx1} V 362`} fill="none" stroke={C.ink} strokeWidth={3} />
            {Array.from({ length: len - 1 }).map((_, j) => <line key={"sp" + j} x1={bx0 + (j + 1) * cm} y1={374} x2={bx0 + (j + 1) * cm} y2={384} stroke={C.ink} strokeWidth={2} />)}
            {Array.from({ length: counted }).map((_, j) => <text key={"c" + j} x={bx0 + (j + 0.5) * cm} y={420} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={RB_SKY_INK}>{j + 1}</text>)}
            {!fm && D && D.done && <text x={(bx0 + bx1) / 2} y={494} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{len + " " + tx("cm")}</text>}
          </g>}
        {fm && MODEL.freeThings.map((f, k) => <Key key={"free-" + f.id} id={"free-" + f.id} x={53 + k * 250} y={444} w={230} h={78} C={C} primary={st.obj === f.id} onClick={() => pickObj(f.id)} label={"lay the " + f.id}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={st.obj === f.id ? "#FFFFFF" : C.ink}>{tx(f.id)}</text>
          </Key>)}
        {!fm && !st.touched && st.left !== 0 && !D && (stage === "ask" || stage === "teach") && <Invite x={xL + len * cm / 2} y={198} r={56} C={C} />}
      </g>;
  };
  const pickView = () => {
    const bus = it.thing === "bus";
    const x0 = bus ? 40 : 30, span = bus ? 360 : 530, stickY = bus ? 184 : 150;
    const seg = span / it.amount;
    const laid = D ? Math.min(D.k, it.amount) : 0;
    const ai = MODEL.picker.findIndex((c) => c.id === it.answer);
    return <g>
        {bus ? rbBus(C) : rbPitch(C)}
        <text x={bus ? 220 : 295} y={bus ? 26 : 46} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(bus ? "school bus" : "cricket pitch")}</text>
        <text x={600} y={100} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("about")}</text>
        <text x={700} y={104} fontSize={T.xl} fontWeight={700} fill={C.ink}>{it.amount}</text>
        <rect x={790} y={48} width={120} height={72} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} strokeDasharray="10 8" />
        {MODEL.picker.map((c, b) => {
      const x = rbBinX(b), cx = x + RB_BIN_W / 2, mine = st.pick === c.id;
      return <g key={"unit-card-" + c.id}>
              <rect
        x={x + 2}
        y={214}
        width={RB_BIN_W - 4}
        height={308}
        rx={RAD.card}
        fill={mine ? tint(C.accent, 0.75) : "#FFFFFF"}
        stroke={mine ? C.accent : C.rule}
        strokeWidth={mine ? 5 : 2}
      />
              {rbUnitPic(c.id, cx, C, tx)}
              <text x={cx} y={500} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(c.name)}</text>
            </g>;
    })}
        {MODEL.picker.map((c, b) => <Hit
      key={"pick-" + c.id}
      id={"unit-" + c.id}
      x={rbBinX(b)}
      y={214}
      w={RB_BIN_W}
      h={308}
      enabled={picking && st.pick !== c.id}
      onPress={() => pickUnit(c.id)}
      label={c.name}
    />)}
        <g pointerEvents="none">
          {Array.from({ length: laid }).map((_, j) => <rect key={"stick" + j} x={x0 + j * seg} y={stickY} width={seg} height={16} fill={j % 2 ? "#FFFFFF" : RB_METRE} stroke={C.ink} strokeWidth={1.5} />)}
          {laid > 0 && <text x={600} y={176} fontSize={T.label} fontWeight={700} fill={RB_SKY_INK}>{laid + " " + tx(laid === 1 ? "metre stick" : "metre sticks")}</text>}
          {D && D.done && <text x={850} y={102} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx(it.answer)}</text>}
          {D && D.ring && ai >= 0 && <rect x={rbBinX(ai) + 2} y={214} width={RB_BIN_W - 4} height={308} rx={RAD.card} fill="none" stroke={C.ink} strokeWidth={6} />}
        </g>
      </g>;
  };
  const gapView = () => {
    const z = RB_Z4, cm = RB_CM4, xs = (v) => z + v * cm;
    const E = it.estimate, M = it.measure, g = E - M;
    const counted = D ? Math.min(D.k, g) : 0;
    const card = (x, label, v) => <g>
        <rect x={x} y={8} width={300} height={104} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={x + 22} y={46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(label)}</text>
        <text x={x + 22} y={96} fontSize={T.prompt} fontWeight={700} fill={C.ink}>{v + " " + tx("cm")}</text>
      </g>;
    return <g>
        {card(93, "estimate", E)}
        {card(423, "measure", M)}
        <rect x={z} y={162} width={M * cm} height={80} rx={6} fill="#DCE4EA" stroke={C.ink} strokeWidth={3} />
        {Array.from({ length: M - 1 }).map((_, j) => <circle key={"ring" + j} cx={z + 16 + j * cm} cy={170} r={5} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />)}
        <rect x={z - 20} y={RB_RULER_Y} width={30 * cm + 40} height={84} rx={10} fill="#FBF5E6" stroke={C.ink} strokeWidth={3} />
        {Array.from({ length: 31 }).map((_, i) => <line key={"t" + i} x1={xs(i)} y1={RB_RULER_Y} x2={xs(i)} y2={RB_RULER_Y + (i % 5 === 0 ? 30 : 16)} stroke={C.ink} strokeWidth={i % 5 === 0 ? 3 : 1.5} />)}
        <text x={z} y={RB_RULER_Y + 68} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("cm")}</text>
        {[5, 10, 15, 20, 25, 30].map((v) => <text key={"v" + v} x={xs(v)} y={RB_RULER_Y + 68} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{v}</text>)}
        <line x1={xs(E)} y1={126} x2={xs(E)} y2={RB_RULER_Y} stroke={C.ink} strokeWidth={3} strokeDasharray="9 7" />
        <rect x={xs(M) - 4} y={236} width={8} height={48} rx={3} fill={RB_MARK} />
        <rect x={z - 4} y={236} width={8} height={48} rx={3} fill={RB_MARK} />
        <g pointerEvents="none">
          {
      /* the gap is the answer: its bar is drawn only in the correction and once the answer is given */
    }
          {D && <rect x={xs(M)} y={346} width={g * cm} height={28} rx={4} fill={RB_GAP} stroke={C.ink} strokeWidth={2} />}
          {Array.from({ length: counted }).map((_, j) => <text key={"g" + j} x={xs(M + j + 0.5)} y={412} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={RB_SKY_INK}>{j + 1}</text>)}
          {D && D.done && <text x={xs(M + g / 2)} y={492} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{g + " " + tx("cm")}</text>}
        </g>
      </g>;
  };
  let view = null;
  if (free) view = rulerView(true);
  else if (K === "sort") view = sorterView();
  else if (K === "blank") view = blankView();
  else if (K === "whose" || K === "why" || K === "cloth") view = benchView();
  else if (K === "read") view = rulerView(false);
  else if (K === "unit") view = pickView();
  else if (K === "gap") view = gapView();
  return <g>{view}</g>;
}
function Thumb({ result, C, w, h, n, lang = "en", tx = (v) => v }) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === void 0) return null;
  const v = String(last.value), kind = last.kind;
  const ph = PHASES.find((p) => p.n === n) || PHASES.find((p) => p.items.some((x) => x.kind === kind)) || { items: [] };
  const itm = ph.items[last.item] || {};
  const label = (s, y) => <text x={w - 10} y={y} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(s)}</text>;
  const big = (s) => <text x={w - 12} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{s}</text>;
  const wide = lang !== "en";
  const pw = wide ? 96 : 128;
  const chip = (x, u) => <g>
      <rect x={wide ? x - 6 : x} y={47} width={wide ? 70 : 58} height={30} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
      <text x={x + 29} y={71} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(u)}</text>
    </g>;
  let pic = null;
  if (kind === "sort") pic = <g>
      {v.split("|").slice(0, 3).map((s, j) => {
    const t = s.split("=")[0], u = s.split(":")[1] || "", x = 4 + j * 77;
    return <g key={t}>
            <rect x={x} y={4} width={74} height={h - 8} rx={10} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={1.5} />
            {rbThing(t, x + 37, 25, 0.4, C.ink)}
            {chip(x + 8, u)}
          </g>;
  })}
    </g>;
  else if (kind === "blank") pic = <g>
      {rbThing((itm.things || ["bucket"])[0], 40, 40, 0.55, C.ink)}
      {big((itm.amount || "") + " " + tx(v))}
    </g>;
  else if (kind === "whose" || kind === "why" || kind === "cloth") {
    pic = <g>
        {[0, 1].map((k) => <g key={"big" + k}>{rbHand(10 + k * 46, 4, 46, RB_SKY, "#EEF7FC", 1.5)}</g>)}
        {[0, 1, 2].map((k) => <g key={"small" + k}>{rbHand(112 + k * 38, 10, 38, RB_SKY, "#EEF7FC", 1.5)}</g>)}
        <rect x={8} y={36} width={w - 16} height={9} rx={3} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
        {[8, w - 8].map((x) => <rect key={x} x={x - 2} y={32} width={4} height={17} fill={RB_MARK} />)}
        <text x={w / 2} y={h - 5} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(RB_SHOWN[v] || v)}</text>
      </g>;
  } else if (kind === "read") {
    const len = itm.to !== void 0 ? itm.to - itm.from : leadNumber(v) || 1, s = pw / (len + 1);
    pic = <g>
        <rect x={8} y={20} width={len * s} height={18} rx={5} fill="#E7D6B3" stroke={C.ink} strokeWidth={1.5} />
        <rect x={4} y={42} width={(len + 1) * s + 8} height={26} rx={4} fill="#FBF5E6" stroke={C.ink} strokeWidth={1.5} />
        {Array.from({ length: len + 2 }).map((_, j) => <line key={j} x1={8 + j * s} y1={42} x2={8 + j * s} y2={52} stroke={C.ink} strokeWidth={1.5} />)}
        <rect x={6} y={38} width={4} height={18} fill={RB_MARK} />
        {big(leadNumber(v) + " " + tx("cm"))}
      </g>;
  } else if (kind === "unit") pic = <g>
      {Array.from({ length: 5 }).map((_, j) => <rect key={j} x={8 + j * 22} y={34} width={22} height={16} fill={j % 2 ? "#FFFFFF" : RB_METRE} stroke={C.ink} strokeWidth={1.5} />)}
      {big((itm.amount || "") + " " + tx(v))}
    </g>;
  else {
    const E = itm.estimate || 30, Mv = itm.measure || 24, s = (pw - 8) / E;
    pic = <g>
        <rect x={8} y={12} width={Mv * s} height={22} rx={4} fill="#DCE4EA" stroke={C.ink} strokeWidth={1.5} />
        <line x1={8 + E * s} y1={6} x2={8 + E * s} y2={70} stroke={C.ink} strokeWidth={2} strokeDasharray="5 4" />
        <rect x={8 + Mv * s} y={42} width={(E - Mv) * s} height={14} rx={3} fill={RB_GAP} stroke={C.ink} strokeWidth={1.5} />
        <line x1={8} y1={66} x2={8 + E * s} y2={66} stroke={C.ink} strokeWidth={1.5} />
        <rect x={6} y={8} width={4} height={62} fill={RB_MARK} />
        {big(leadNumber(v) + " " + tx("cm"))}
      </g>;
  }
  return <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {pic}
    </g>;
}
function RulerBench(props) {
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
    format,
    fitHost: () => null
  }} />;
}
var stdin_default = RulerBench;
export default stdin_default;
