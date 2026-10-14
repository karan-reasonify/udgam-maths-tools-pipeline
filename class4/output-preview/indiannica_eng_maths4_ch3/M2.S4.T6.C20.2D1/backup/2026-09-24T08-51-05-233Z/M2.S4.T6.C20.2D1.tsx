import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
/* M2.S4.T6.C20.2D1 · story_to_difference · Story to Difference — standalone build 2026-09-24, source d625c2bc:2073181.
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
const TOOL_VOICE = {"पूरा पढ़ो।":"08d3aa1c48388c6a18ea.ogg","सवाल असल में क्या पूछ रहा है?":"a689b81f89fb7fd5e78d.ogg","हर वाक्य घटाने में बदला, और बिना काम की संख्याएँ वहीं खड़ी हैं।":"2234f4624782ebc475af.ogg","मुक्त खेल।":"ccabc6dc1689df81851d.ogg","कोई भी दो संख्याएँ चटाई पर रखो और देखो वह एक में से दूसरी घटाती है।":"62affaac974c6ea05568.ogg","किसी संख्या को छूने से पहले बताओ कि क्या पूछा गया है।":"081aa2f9f5b48bde78c8.ogg","वह कार्ड चुनो जो बताता है कि क्या पूछा गया है।":"35e94344f1fdfa880461.ogg","फिर उसकी दो संख्याएँ चटाई पर लाओ।":"e7a3a2afd3e81b13c910.ogg","यह किन दो मात्राओं की तुलना करता है?":"c8b523a909a6efe48a85.ogg","बस आखिरी वाक्य पढ़ो।":"96e484a130ad215294c9.ogg","कौन सी संख्या ऊपर जाएगी?":"67d097c115791968865d.ogg","बताओ क्या पूछा गया है, और उसकी दो मात्राएँ ढूँढो।":"f46933d0e09017422608.ogg","बड़ी को ऊपर रखो और उसमें से दूसरी घटाओ।":"5d159371305c3d733839.ogg","तुमने सीखा: पहले बताओ क्या पूछा है, फिर बड़ी संख्या ऊपर रखो।":"0d69f2b1306a154b14b4.ogg","एक टंकी में अड़तालीस हज़ार दो सौ पचास लीटर पानी था,":"163eddfd390d50ed8ade.ogg","और छब्बीस हज़ार एक सौ नब्बे लीटर खर्च हुआ।":"521b9e95ec4ebf60cfd2.ogg","कितना बचा?":"97785ad4a3f6b9839f93.ogg","टंकी में पानी डाला गया, या उसमें से निकाला गया?":"9f2dd3d756ba8a6ca425.ogg","एक पुस्तकालय में अठारह हज़ार चार सौ बीस किताबें थीं,":"616996c365a81fbae8be.ogg","और सात हज़ार तीन सौ पंद्रह पढ़ने को दी गईं।":"23645da119cd68ef0418.ogg","अलमारियों में कितनी बचीं?":"fc608e6e9c143f2d66c6.ogg","तुम्हारा सवाल कार्ड क्या कहता है?":"3d5cdf50726383d76097.ogg","एक शहर में छत्तीस हज़ार नौ सौ चालीस लोग हैं,":"2f818fbd7be28ce0499f.ogg","और दूसरे में इक्कीस हज़ार पाँच सौ आठ।":"f31153daa26eeff1c893.ogg","पहले शहर में कितने लोग ज़्यादा हैं?":"7a57a8905b11800158bd.ogg","कितने ज़्यादा का मतलब शहरों को जोड़ना है, या उनकी तुलना करना?":"9d5da412d9b46c2b6c23.ogg","इनमें से एक संख्या का यहाँ कोई काम नहीं।":"56bef92de5ce715993ec.ogg","कौन सी?":"c49a59adf55c5d889df1.ogg","बिना काम की संख्या को स्लेटी डिब्बे में खींचो।":"8e0dbb10168c99761c1c.ogg","बाकी दो को चटाई पर लाओ।":"724a62503325c3c7533a.ogg","क्या यह संख्या उत्तर देने में मदद करती है?":"77096ee4e3f97d68c410.ogg","एक-एक वाक्य पढ़ो।":"1f2ffc7b49d547830e1e.ogg","क्या उसकी संख्या तुम्हारे सवाल कार्ड का जवाब देती है?":"1bf4a5a2180667e69f7a.ogg","पहले समझो क्या पूछा गया है।":"b36a17fa4f9539e7c4b3.ogg","बस वही संख्याएँ लाओ जो उसका उत्तर दें, और फालतू को वहीं छोड़ दो।":"72e770f7aaddff963fd9.ogg","तुमने सीखा: बस वही संख्याएँ लाओ जो सवाल को चाहिए।":"a243b0e3c80779dff69e.ogg","चौबीस डिब्बों वाली एक ट्रेन में तीन हज़ार आठ सौ पैंतालीस यात्री थे,":"87bceba223a5ca3c501e.ogg","और उनमें से एक हज़ार छह सौ बहत्तर बच्चे थे।":"cad56eb364d7c7018955.ogg","कितने बच्चे नहीं थे?":"2a2a7f28ff1148b1ed25.ogg","क्या डिब्बे बताते हैं कि कौन सफ़र कर रहा था?":"8d0de4927feb44b52b02.ogg","शहर से पंद्रह किलोमीटर दूर एक डिपो ने मार्च में दो हज़ार छह सौ चालीस फेरे,":"af73ac8c99c2bb0aeae7.ogg","और अप्रैल में एक हज़ार नौ सौ पच्चीस फेरे चलाए।":"521c2503ebb8ed20d457.ogg","मार्च में कितने फेरे ज़्यादा चले?":"8b278c005d5122e3f291.ogg","क्या शहर की दूरी से फेरों की गिनती बदलती है?":"28a3399a98ee325aa930.ogg","पाँच सौ कुर्सियों वाले एक हॉल ने एक हफ़्ते में":"61d5cbe9879410a5632d.ogg","चौबीस हज़ार तीन सौ अठारह टिकट बेचे।":"92bde083b7f4aafd9c15.ogg","उनमें से ग्यारह हज़ार दो सौ सात पहले दिन इस्तेमाल हुए।":"2328db9ef2abb3a48b6c.ogg","बाद में कितने इस्तेमाल हुए?":"18c76f5405d13089327a.ogg","तुम्हारा सवाल कार्ड क्या पूछता है?":"259538210cbffff2c63b.ogg","यही सवाल छोटी संख्याओं से करके देखो।":"326ddcd582aea12b6806.ogg","उनके साथ तुमने क्या किया?":"60ec6893ec30fa53b8c9.ogg","फिर छोटा रूप खोलो।":"5d5e4772227b91ef3301.ogg","छोटी संख्याओं को कौन सी चाल चाहिए थी?":"b24ec00568960d4851b4.ogg","छोटा रूप खोलो।":"a27b1911f3e8facdf7c1.ogg","उसकी चाल बड़ी संख्याओं पर करो।":"95411e34d3c11fd33ff2.ogg","लक्ष्य तक पहुँचने के लिए, लक्ष्य में से जो पहले से है वह घटाओ।":"8fda8da469e0c83a3062.ogg","संख्याएँ छोटी करने से पता चलता है क्यों।":"8dc8d28d6ce9b1e710c2.ogg","तुमने सीखा: लक्ष्य तक पहुँचने के लिए, लक्ष्य में से जो है वह घटाओ।":"0d6e500a6d3b994d0500.ogg","यह बावन हज़ार छह सौ चालीस है।":"5648f2c35a5780767565.ogg","नब्बे हज़ार बनाने के लिए इसमें क्या जोड़ें?":"3d4d9325d345c5bd56e5.ogg","बावन हज़ार छह सौ चालीस में जोड़ने पर तुम्हारी संख्या से नब्बे हज़ार बनना चाहिए।":"5c02540b5f96c0495f7b.ogg","क्या बनेगा?":"c05caf9c58d4bf066971.ogg","यह चौदह हज़ार छह सौ बहत्तर है।":"492b61714fad188794f9.ogg","तीस हज़ार बनाने के लिए इसमें क्या जोड़ें?":"ec90fa5905d61beeff5c.ogg","एक अंक वाली संख्याओं के साथ यह सवाल कैसा दिखेगा?":"517b226ffd44df54cce1.ogg","एक मिस्त्री को चालीस हज़ार ईंटें चाहिए,":"c3eb6e17332fa0362dfa.ogg","और उसके पास पहले से सत्ताईस हज़ार पाँच सौ सोलह हैं।":"aee414edf03d424f0523.ogg","और कितनी खरीदनी होंगी?":"9f4841f6bfef9c1f3d9b.ogg","क्या खरीदी जाने वाली ईंटें ज़रूरत से ज़्यादा हो सकती हैं?":"327c66632edf4b81c81b.ogg","यहाँ दो चरण हैं।":"1b3a24c111e9f86195b9.ogg","पहले कौन सा होना चाहिए, और क्यों?":"9c8e5dc1a1df53ffe80c.ogg","जो चरण पहले आता है, उस पर टैप करो।":"4af5fdc1117bd0d8a834.ogg","फिर हल करने के लिए दोबारा टैप करो।":"2264769cdd2ee937e7c0.ogg","छपी संख्याओं से तुम अभी दोनों में से कौन सा कर सकते हो?":"efd5f0660b97a16ba36d.ogg","पहला चरण अकेले हल करो।":"7cf572007b8556a1ec2b.ogg","फिर उसका उत्तर दूसरे में लगाओ।":"89edeb5588a8bab8aba2.ogg","कोई भी चरण हल करने से पहले दोनों का क्रम तय करो।":"887e9f8baf1763c32103.ogg","साथ में कम दाम पर खरीदा?":"ec5b6c9c2b0d409aea9d.ogg","पहले जोड़ो।":"73ae6f9cb98fb085a9df.ogg","किसी और से ज़्यादा दाम?":"5af994bcd4679f4eebdb.ogg","पहले घटाओ।":"026fb50d3b172f095fe0.ogg","तुमने सीखा: हल करने से पहले दो चरणों का क्रम तय करो।":"7da5a149a05f0ad7e2d4.ogg","एक मेज़ सात हज़ार चार सौ अस्सी रुपये की है,":"e954811d64ce1aaf05d1.ogg","और एक कुर्सी तीन हज़ार दो सौ साठ रुपये की।":"439609e659d5280e726f.ogg","दोनों साथ में नौ हज़ार नौ सौ पचास रुपये में बिकते हैं।":"1b274e09aa89e25fe5b3.ogg","कितने बचे?":"b0b3f93550b0007ff80e.ogg","एक दाम में से दूसरा घटाने से पता चलता है कौन महँगा है।":"531b4aee8fe60b82f171.ogg","क्या वही बचत है?":"f9806a024bd037f761d4.ogg","एक फ्रिज चौबीस हज़ार तीन सौ पचास रुपये का है,":"122d02b94cea1e2db40d.ogg","जो वॉशिंग मशीन से छह हज़ार चार सौ अस्सी रुपये ज़्यादा है।":"082a2f63fcc5818fefb8.ogg","दोनों का कुल दाम क्या है?":"c4db3bfaea32595de5c8.ogg","चौबीस हज़ार तीन सौ पचास रुपये फ्रिज का दाम है, या वॉशिंग मशीन का?":"dfe548e468de250d2988.ogg","एक खाते में इक्कीस हज़ार तीन सौ आठ रुपये थे।":"3dfe7f76054ac54f9c68.ogg","एक रकम जमा होने पर बाकी अड़सठ हज़ार नौ सौ आठ रुपये हो गए।":"2e81cb78224afaec4a99.ogg","फिर चौंतीस हज़ार पाँच सौ रुपये खर्च हुए।":"34f6f17ef7dd25b4839c.ogg","जमा रकम, और आखिर में बाकी रकम निकालो।":"0379012fb67238b914a8.ogg","शब्दों में बताओ, तुम्हारे दो चरण क्या हैं?":"40932bc88de6f3825186.ogg","पहले वह कार्ड चुनो जो बताता है कि क्या पूछा गया है।":"3a847ad72235a27237b4.ogg","दूसरे से पहले पहला चरण हल करो।":"a2379a585263f3d3b82d.ogg","उस पर टैप करो।":"945cb94fc20ea5248224.ogg","पहले उस चरण पर टैप करो जो पहले आता है।":"8faa463b2122f86dc0ed.ogg","फिर दोनों संख्याएँ नीचे लाओ।":"a54f6b69317a92b2368e.ogg","अब उसकी दो संख्याएँ चटाई पर लाओ।":"4c4697ca15c04d3999d6.ogg","आखिरी पंक्ति फिर से पढ़ो।":"ddcea395c1f2ef943a8e.ogg","क्या वह यही पूछती है?":"6e00c66b13c9a4e557e8.ogg","छोटी संख्या ऊपर नहीं जा सकती।":"cc4ddc9502ffca0558c9.ogg","दोनों की जगह बदलो।":"527446aaa406b6c2ef0f.ogg","चटाई पर दो संख्याएँ आती हैं।":"f6f22fe7b36b28e72a9b.ogg","किसका कोई काम नहीं?":"db9f77cb3b96748f1d79.ogg","पहले एक वापस रखो।":"c94d258a4f5f7d821508.ogg","तुमने छोटी संख्याओं के साथ क्या किया?":"2de07f864c9628de0e22.ogg","बड़ी संख्याओं के साथ भी वही करो।":"55735ff91806ba88583b.ogg","किसी चरण को दूसरे का उत्तर नहीं चाहिए, इसलिए कोई भी पहले आ सकता है।":"9e2a1bb7b61a7a056d79.ogg","उसे लगाने के लिए पहले चरण पर टैप करो।":"6cfbf32a5bc6625c275b.ogg","हल करने के लिए पहले चरण पर टैप करो।":"a42cf6b303bf1ec56ec1.ogg","बदलने के लिए दूसरे पर।":"414b49350aa0b09ce3d2.ogg","इसे हल करो, और इसके डिब्बे में लिखो।":"2543304c8a6fa273a504.ogg","दूसरा चरण खुल गया।":"6fc62985bfbc84cf94ef.ogg","उसकी दो संख्याएँ चटाई पर लाओ।":"35865ddac95bdb76243f.ogg","આખું વાંચો.":"9ae757b9cf88526d639b.ogg","સવાલ ખરેખર શું પૂછે છે?":"0892f84d185b91f63be8.ogg","દરેક વાક્ય બાદબાકીમાં બદલાયું, અને કામ વગરની સંખ્યાઓ ત્યાં જ ઊભી છે.":"88e1e44df85e227290ad.ogg","મુક્ત રમત.":"bcfc14c1819f3e6a51cd.ogg","કોઈ પણ બે સંખ્યાઓ ચટાઈ પર મૂકો અને જુઓ તે એકમાંથી બીજી બાદ કરે છે.":"a663aae28d686fc5c6cf.ogg","કોઈ સંખ્યાને અડતાં પહેલાં કહો કે શું પૂછ્યું છે.":"b19d00895c90116ecf8c.ogg","જે કાર્ડ કહે છે કે શું પૂછ્યું છે તે પસંદ કરો.":"7e47df90a87dd1207597.ogg","પછી તેની બે સંખ્યાઓ ચટાઈ પર લાવો.":"c043983557c8356551ec.ogg","તે કયા બે જથ્થાની સરખામણી કરે છે?":"14eac6f82fd6ba9fe0f3.ogg","ફક્ત છેલ્લું વાક્ય વાંચો.":"76d5d220754963f61b2f.ogg","કઈ સંખ્યા ઉપર જશે?":"60e768e342c1b5673692.ogg","કહો શું પૂછ્યું છે, અને તેના બે જથ્થા શોધો.":"7a0c4e71b68a97e6c633.ogg","મોટાને ઉપર મૂકો અને તેમાંથી બીજો બાદ કરો.":"b53e50b5e82cfae8a84c.ogg","તમે શીખ્યા: પહેલાં કહો શું પૂછ્યું છે, પછી મોટી સંખ્યા ઉપર મૂકો.":"ee3ebffe6ebc787489ac.ogg","એક ટાંકીમાં અડતાલીસ હજાર બસો પચાસ લિટર પાણી હતું,":"5e072b69613e82593869.ogg","અને છવ્વીસ હજાર એકસો નેવું લિટર વપરાયું.":"e39886876dbd65246cc6.ogg","કેટલું બાકી રહ્યું?":"16aba5027454bfc9771e.ogg","ટાંકીમાં પાણી નાખ્યું, કે તેમાંથી કાઢ્યું?":"182de369e0247613f403.ogg","એક પુસ્તકાલયમાં અઢાર હજાર ચારસો વીસ પુસ્તકો હતાં,":"28bcabc25a88210a1a00.ogg","અને સાત હજાર ત્રણસો પંદર વાંચવા આપ્યાં.":"31a88f28e7a5544a7cf0.ogg","છાજલીઓ પર કેટલાં બાકી છે?":"bb5f671575859d8b3725.ogg","તમારું સવાલ કાર્ડ શું કહે છે?":"2fd25e718c8b18e58e91.ogg","એક શહેરમાં છત્રીસ હજાર નવસો ચાલીસ લોકો છે, અને બીજામાં એકવીસ હજાર પાંચસો આઠ.":"5246928a94712e2ec5c3.ogg","પહેલા શહેરમાં કેટલા લોકો વધારે છે?":"1300411e07bb02507b43.ogg","કેટલા વધારેનો અર્થ શહેરોને જોડવાં છે, કે તેમની સરખામણી કરવી?":"8ca9aede09bc34583bf1.ogg","આમાંથી એક સંખ્યાનું અહીં કોઈ કામ નથી.":"74308eb97197f1dae763.ogg","કઈ?":"d1680060e388d906746b.ogg","કામ વગરની સંખ્યાને રાખોડી ખાનામાં ખેંચો.":"183cfc79ae4b9946508c.ogg","બાકીની બેને ચટાઈ પર લાવો.":"e660a0019ae19d76dd26.ogg","શું આ સંખ્યા જવાબ આપવામાં મદદ કરે છે?":"81806601826db1d898a1.ogg","એક પછી એક વાક્ય વાંચો.":"f795b0353ff07f05565f.ogg","શું તેની સંખ્યા તમારા સવાલ કાર્ડનો જવાબ આપે છે?":"c8943da02ac323e20192.ogg","પહેલાં સમજો શું પૂછ્યું છે.":"727d066fd6507c87a02d.ogg","ફક્ત એ જ સંખ્યાઓ લાવો જે તેનો જવાબ આપે, અને વધારાની ત્યાં જ રહેવા દો.":"d5532b2e19f6fda58670.ogg","તમે શીખ્યા: ફક્ત એ જ સંખ્યાઓ લાવો જે સવાલને જોઈએ.":"18a7e91bc821d232cc89.ogg","ચોવીસ ડબ્બાવાળી એક ટ્રેનમાં ત્રણ હજાર આઠસો પિસ્તાલીસ મુસાફરો હતા,":"647c939fe788c5cbf039.ogg","અને તેમાંથી એક હજાર છસો બોતેર બાળકો હતાં.":"506983be4d667a61595c.ogg","કેટલા બાળકો નહોતા?":"a56b7b420c4aba597e27.ogg","શું ડબ્બા કહે છે કે કોણ મુસાફરી કરતું હતું?":"07eba34f2125828932c2.ogg","શહેરથી પંદર કિલોમીટર દૂર એક ડેપોએ માર્ચમાં બે હજાર છસો ચાલીસ ફેરા,":"1ba257f85d6ac74e512d.ogg","અને એપ્રિલમાં એક હજાર નવસો પચ્ચીસ ફેરા ચલાવ્યા.":"0dad9b768b23aed520ff.ogg","માર્ચમાં કેટલા ફેરા વધારે ચાલ્યા?":"e0cdab1bb156e3194ad9.ogg","શું શહેરના અંતરથી ફેરાની ગણતરી બદલાય છે?":"f2b3e242fc155b110820.ogg","પાંચસો ખુરશીવાળા એક હૉલે એક અઠવાડિયામાં ચોવીસ હજાર ત્રણસો અઢાર ટિકિટ વેચી.":"317cb141cb278b0af6ab.ogg","તેમાંથી અગિયાર હજાર બસો સાત પહેલા દિવસે વપરાઈ.":"c8d11a70546a523a2a22.ogg","પછી કેટલી વપરાઈ?":"c594af7a826c37a567ad.ogg","તમારું સવાલ કાર્ડ શું પૂછે છે?":"a1abb9edea3cc9d7d3e1.ogg","આ જ સવાલ નાની સંખ્યાઓથી કરી જુઓ.":"7c1e39a32407a1544778.ogg","તેમની સાથે તમે શું કર્યું?":"2c9b636eed9fe4e410c3.ogg","પછી નાનું રૂપ ખોલો.":"7df4bf3e861f16af5859.ogg","નાની સંખ્યાઓને કઈ ચાલ જોઈતી હતી?":"bbe6e09cc29082cc4431.ogg","નાનું રૂપ ખોલો.":"81c36d67779fb0ddfc30.ogg","તેની ચાલ મોટી સંખ્યાઓ પર કરો.":"487f3e01cc54a2eb90ff.ogg","લક્ષ્ય સુધી પહોંચવા, લક્ષ્યમાંથી પહેલેથી હોય તે બાદ કરો.":"ac8d316a07e153504bf3.ogg","સંખ્યાઓ નાની કરવાથી ખબર પડે છે કેમ.":"1868cac27033f1678dd6.ogg","તમે શીખ્યા: લક્ષ્ય સુધી પહોંચવા, લક્ષ્યમાંથી જે છે તે બાદ કરો.":"e8c2181e381cbc6439c2.ogg","આ બાવન હજાર છસો ચાલીસ છે.":"4019c0eb37f85510b622.ogg","નેવું હજાર બનાવવા તેમાં શું ઉમેરીએ?":"805257df01e23ede7e5c.ogg","બાવન હજાર છસો ચાલીસ માં ઉમેરતાં તમારી સંખ્યાથી નેવું હજાર બનવા જોઈએ.":"ec7404a63dab157e58d1.ogg","શું બનશે?":"ca342f0ca69672b0a56f.ogg","આ ચૌદ હજાર છસો બોતેર છે.":"4c7d93c42e984fc49f20.ogg","ત્રીસ હજાર બનાવવા તેમાં શું ઉમેરીએ?":"7bbc87bcc1327575d5d5.ogg","એક અંકની સંખ્યાઓ સાથે આ સવાલ કેવો દેખાશે?":"fddd974b4ef392dfac2d.ogg","એક કડિયાને ચાલીસ હજાર ઈંટો જોઈએ છે,":"ec827dc4761979279fa2.ogg","અને તેની પાસે પહેલેથી સત્તાવીસ હજાર પાંચસો સોળ છે.":"6f87951f95e313f9a997.ogg","હજી કેટલી ખરીદવી પડશે?":"81f4d0c8839edbe924a3.ogg","શું ખરીદવાની ઈંટો જરૂર કરતાં વધારે હોઈ શકે?":"314c8ec0287c86c655f9.ogg","અહીં બે પગલાં છે.":"0f52f640ea1d59b087e2.ogg","પહેલાં કયું થવું જોઈએ, અને કેમ?":"31f5e2aae72af6026e98.ogg","જે પગલું પહેલાં આવે તેના પર ટૅપ કરો.":"40fe7672f9ad7f845999.ogg","પછી તેને ઉકેલવા ફરી ટૅપ કરો.":"c982b20dd7a7995a758a.ogg","છાપેલી સંખ્યાઓથી તમે હમણાં બેમાંથી કયું કરી શકો?":"31118d1265b9fca16534.ogg","પહેલું પગલું એકલું ઉકેલો.":"583edd5f0eb2be9ddb2b.ogg","પછી તેનો જવાબ બીજામાં વાપરો.":"cd5118b680fcfffa662c.ogg","કોઈ પણ પગલું ઉકેલતાં પહેલાં બંનેનો ક્રમ નક્કી કરો.":"0f90557203a259c04174.ogg","સાથે ઓછી કિંમતે ખરીદ્યું?":"13a39683fb683e840c4f.ogg","પહેલાં ઉમેરો.":"de142268ef23ee4fd3a7.ogg","બીજા કરતાં વધારે કિંમત?":"4ed9a5d17c54d558e132.ogg","પહેલાં બાદ કરો.":"29f01b33e2ccf17137d0.ogg","તમે શીખ્યા: ઉકેલતાં પહેલાં બે પગલાંનો ક્રમ નક્કી કરો.":"e35432b3275a1c42bed2.ogg","એક ટેબલ સાત હજાર ચારસો એંસી રૂપિયાનું છે,":"d4148acd8de9ad714f9c.ogg","અને એક ખુરશી ત્રણ હજાર બસો સાઠ રૂપિયાની.":"2e9262c2612bb0825387.ogg","બંને સાથે નવ હજાર નવસો પચાસ રૂપિયામાં વેચાય છે.":"18b93db239fadad50f29.ogg","કેટલા બચ્યા?":"20fabfc8a5405c2feb60.ogg","એક કિંમતમાંથી બીજી બાદ કરવાથી ખબર પડે કઈ મોંઘી છે.":"3e54927b1556d6e778b0.ogg","શું એ જ બચત છે?":"6d1314786afb39093689.ogg","એક ફ્રિજ ચોવીસ હજાર ત્રણસો પચાસ રૂપિયાનું છે,":"73d25a51bdacce16f1c7.ogg","જે વૉશિંગ મશીનથી છ હજાર ચારસો એંસી રૂપિયા વધારે છે.":"872cbbff62702322ef0a.ogg","બંનેની કુલ કિંમત શું છે?":"189a7b9bcdc34a247301.ogg","ચોવીસ હજાર ત્રણસો પચાસ રૂપિયા ફ્રિજની કિંમત છે, કે વૉશિંગ મશીનની?":"0091d01cc29c30c18a07.ogg","એક ખાતામાં એકવીસ હજાર ત્રણસો આઠ રૂપિયા હતા.":"8273b3017ac0472c12c2.ogg","એક રકમ જમા થતાં બાકી અડસઠ હજાર નવસો આઠ રૂપિયા થયા.":"75ffc23e1b753cc8c4d9.ogg","પછી ચોત્રીસ હજાર પાંચસો રૂપિયા ખર્ચાયા.":"42cdcbcae916c4096668.ogg","જમા રકમ, અને છેલ્લે બાકી રકમ શોધો.":"782fbccd945e7a6c4893.ogg","શબ્દોમાં કહો, તમારાં બે પગલાં શું છે?":"c81d19f8315c09aad852.ogg","પહેલાં તે કાર્ડ પસંદ કરો જે કહે છે કે શું પૂછ્યું છે.":"05cbacd1d0cba3648101.ogg","બીજા પહેલાં પહેલું પગલું ઉકેલો.":"92cef17054e40f87a080.ogg","તેના પર ટૅપ કરો.":"b787caa9c517ffc4b054.ogg","પહેલાં તે પગલા પર ટૅપ કરો જે પહેલાં આવે છે.":"2eebdf3a6e898f840e13.ogg","પછી બંને સંખ્યાઓ નીચે લાવો.":"2471c33918b18afe77b1.ogg","હવે તેની બે સંખ્યાઓ ચટાઈ પર લાવો.":"689af0b66ea4d80fcd1a.ogg","છેલ્લી લીટી ફરી વાંચો.":"bab0c053ac0d80d9944d.ogg","શું તે આ જ પૂછે છે?":"1eee86c7a6a4b11af940.ogg","નાની સંખ્યા ઉપર ન જઈ શકે.":"d82aada6c983e48619e2.ogg","બંનેની જગ્યા બદલો.":"966d5931ea827a8f97f3.ogg","ચટાઈ પર બે સંખ્યાઓ આવે છે.":"3cb4a2056a755c6ab65b.ogg","કોનું કોઈ કામ નથી?":"40939a4e09b86e59d195.ogg","પહેલાં એક પાછી મૂકો.":"d171226cee22e20b5b59.ogg","તમે નાની સંખ્યાઓ સાથે શું કર્યું?":"79e40d5dab3f1f75b7f2.ogg","મોટી સંખ્યાઓ સાથે પણ એમ જ કરો.":"eb6e623300e06eb181a8.ogg","કોઈ પગલાને બીજાના જવાબની જરૂર નથી, તેથી કોઈ પણ પહેલાં આવી શકે.":"d46d18ed8ebf2b550866.ogg","તેને ગોઠવવા પહેલા પગલા પર ટૅપ કરો.":"9399afbe29a82b33f143.ogg","ઉકેલવા પહેલા પગલા પર ટૅપ કરો.":"ac99828cc4f3a54c9c62.ogg","અદલબદલ કરવા બીજા પર.":"528949c90aa6e1bea99d.ogg","આને ઉકેલો, અને તેના બૉક્સમાં લખો.":"c147abadd2d047a5961b.ogg","બીજું પગલું ખૂલી ગયું.":"c9ec7499b552105e24f4.ogg","તેની બે સંખ્યાઓ ચટાઈ પર લાવો.":"f0f0efd29087c467ed69.ogg"};
const TOOL_VOICE_BASE = "https://media.singularity-learn.com/learning_plan_assets/V2/cbse/indiannica/english/class_4/mathematics/ch_3/2dtool/_voice/";
const TOOL_ID = "story_to_difference";
const MEDIA_ID = "M2.S4.T6.C20.2D1";
const TOOL_NAME = "Story to Difference";
const CHROME = { "dim": "#9AA4AC", "ink": "#2B2B2B", "rule": "#C9BCA6", "panel": "#F2E4CE", "paper": "#FFFDF7", "accent": "#5B6770" };
const VOICE = { "rate": 0.92, "pitch": 1.06 };
const OPENING = ["Read it right through. What is the question actually asking for?"];
const FINISH_LINE = "Every sentence turned into a taking away, and the numbers with no job are still standing.";
const FREE_LINE = "Free play. Lift any two numbers onto the mat and watch it take one from the other.";
const TR = {
  hi: {
    "Story to Difference": "कहानी से अंतर",
    "Read it right through. What is the question actually asking for?": "पूरा पढ़ो। सवाल असल में क्या पूछ रहा है?",
    "Every sentence turned into a taking away, and the numbers with no job are still standing.": "हर वाक्य घटाने में बदला, और बिना काम की संख्याएँ वहीं खड़ी हैं।",
    "Free play. Lift any two numbers onto the mat and watch it take one from the other.": "मुक्त खेल। कोई भी दो संख्याएँ चटाई पर रखो और देखो वह एक में से दूसरी घटाती है।",
    "Find the two numbers the question is about": "सवाल की दो संख्याएँ ढूँढो",
    "Say what you are being asked for before you touch a number.": "किसी संख्या को छूने से पहले बताओ कि क्या पूछा गया है।",
    "Pick the card that says what is asked. Then bring its two numbers down to the mat.": "वह कार्ड चुनो जो बताता है कि क्या पूछा गया है। फिर उसकी दो संख्याएँ चटाई पर लाओ।",
    "Which two amounts does it compare?": "यह किन दो मात्राओं की तुलना करता है?",
    "Read only the last sentence. Which number goes on top?": "बस आखिरी वाक्य पढ़ो। कौन सी संख्या ऊपर जाएगी?",
    "Say what is being asked, and find the two amounts it is about. Put the greater one on top and take the other off it.": "बताओ क्या पूछा गया है, और उसकी दो मात्राएँ ढूँढो। बड़ी को ऊपर रखो और उसमें से दूसरी घटाओ।",
    "You learned: say what is asked, then put the greater number on top.": "तुमने सीखा: पहले बताओ क्या पूछा है, फिर बड़ी संख्या ऊपर रखो।",
    "A tank held 48,250 L of water, and 26,190 L was used. How much is left?": "एक टंकी में 48,250 लीटर पानी था, और 26,190 लीटर खर्च हुआ। कितना बचा?",
    "Water left?": "कितना पानी बचा?",
    "Was water put into the tank, or taken out of it?": "टंकी में पानी डाला गया, या उसमें से निकाला गया?",
    "A library had 18,420 books, and 7,315 were lent out. How many are left on the shelves?": "एक पुस्तकालय में 18,420 किताबें थीं, और 7,315 पढ़ने को दी गईं। अलमारियों में कितनी बचीं?",
    "Books left?": "कितनी किताबें बचीं?",
    "What does your question card say?": "तुम्हारा सवाल कार्ड क्या कहता है?",
    "One town has 36,940 people, and another has 21,508. How many more people has the first town?": "एक शहर में 36,940 लोग हैं, और दूसरे में 21,508। पहले शहर में कितने लोग ज़्यादा हैं?",
    "How many more?": "कितने ज़्यादा?",
    "Does how many more ask you to join the towns, or to compare them?": "कितने ज़्यादा का मतलब शहरों को जोड़ना है, या उनकी तुलना करना?",
    "Some numbers are printed to be left out": "कुछ संख्याएँ छोड़ने के लिए ही छपी होती हैं",
    "One of these numbers has no job here. Which one?": "इनमें से एक संख्या का यहाँ कोई काम नहीं। कौन सी?",
    "Drag the number with no job into the grey bay. Bring the other two down to the mat.": "बिना काम की संख्या को स्लेटी डिब्बे में खींचो। बाकी दो को चटाई पर लाओ।",
    "Does this number help to answer it?": "क्या यह संख्या उत्तर देने में मदद करती है?",
    "Read one sentence at a time. Does its number answer your question card?": "एक-एक वाक्य पढ़ो। क्या उसकी संख्या तुम्हारे सवाल कार्ड का जवाब देती है?",
    "Work out what is being asked first. Bring down only the numbers that answer it, and leave the spare one standing.": "पहले समझो क्या पूछा गया है। बस वही संख्याएँ लाओ जो उसका उत्तर दें, और फालतू को वहीं छोड़ दो।",
    "You learned: bring down only the numbers the question needs.": "तुमने सीखा: बस वही संख्याएँ लाओ जो सवाल को चाहिए।",
    "A train with 24 coaches carried 3,845 passengers, and 1,672 of them were children. How many were not children?": "24 डिब्बों वाली एक ट्रेन में 3,845 यात्री थे, और उनमें से 1,672 बच्चे थे। कितने बच्चे नहीं थे?",
    "Not children?": "बच्चे नहीं?",
    "Do the coaches tell you anything about who was riding?": "क्या डिब्बे बताते हैं कि कौन सफ़र कर रहा था?",
    "A depot 15 km from the town ran 2,640 trips in March, and 1,925 trips in April. How many more trips ran in March?": "शहर से 15 किलोमीटर दूर एक डिपो ने मार्च में 2,640 फेरे, और अप्रैल में 1,925 फेरे चलाए। मार्च में कितने फेरे ज़्यादा चले?",
    "More trips?": "ज़्यादा फेरे?",
    "Does the distance to the town change how many trips ran?": "क्या शहर की दूरी से फेरों की गिनती बदलती है?",
    "A hall with 500 chairs sold 24,318 tickets in a week. 11,207 of them were used on the first day. How many were used later?": "500 कुर्सियों वाले एक हॉल ने एक हफ़्ते में 24,318 टिकट बेचे। उनमें से 11,207 पहले दिन इस्तेमाल हुए। बाद में कितने इस्तेमाल हुए?",
    "Used later?": "बाद में इस्तेमाल?",
    "What does your question card ask for?": "तुम्हारा सवाल कार्ड क्या पूछता है?",
    "Shrink the question until you can see it": "सवाल को छोटा करो, जब तक वह साफ़ न दिखे",
    "Try the same question with tiny numbers. What did you do to those?": "यही सवाल छोटी संख्याओं से करके देखो। उनके साथ तुमने क्या किया?",
    "Pick the card that says what is asked. Then open the tiny version.": "वह कार्ड चुनो जो बताता है कि क्या पूछा गया है। फिर छोटा रूप खोलो।",
    "Which move did the tiny numbers need?": "छोटी संख्याओं को कौन सी चाल चाहिए थी?",
    "Open the tiny version. Copy its move onto the big numbers.": "छोटा रूप खोलो। उसकी चाल बड़ी संख्याओं पर करो।",
    "An amount needed to reach a target is the target take away what is already there. Shrinking the numbers shows you why.": "लक्ष्य तक पहुँचने के लिए, लक्ष्य में से जो पहले से है वह घटाओ। संख्याएँ छोटी करने से पता चलता है क्यों।",
    "You learned: to reach a target, take what is there from the target.": "तुमने सीखा: लक्ष्य तक पहुँचने के लिए, लक्ष्य में से जो है वह घटाओ।",
    "Here is 52,640. What should be added to it to make 90,000?": "यह 52,640 है। 90,000 बनाने के लिए इसमें क्या जोड़ें?",
    "What to add?": "क्या जोड़ें?",
    "Added to 52,640, your number should make 90,000. Would it?": "52,640 में जोड़ने पर तुम्हारी संख्या से 90,000 बनना चाहिए। क्या बनेगा?",
    "Here is 14,672. What should be added to it to make 30,000?": "यह 14,672 है। 30,000 बनाने के लिए इसमें क्या जोड़ें?",
    "What would this question look like with single digit numbers?": "एक अंक वाली संख्याओं के साथ यह सवाल कैसा दिखेगा?",
    "A builder needs 40,000 bricks, and already has 27,516. How many more must be bought?": "एक मिस्त्री को 40,000 ईंटें चाहिए, और उसके पास पहले से 27,516 हैं। और कितनी खरीदनी होंगी?",
    "Bricks to buy?": "कितनी ईंटें खरीदें?",
    "Can the bricks to buy be more than the builder needs?": "क्या खरीदी जाने वाली ईंटें ज़रूरत से ज़्यादा हो सकती हैं?",
    "Two steps need an order": "दो चरणों का एक क्रम होता है",
    "Two steps here. Which one has to happen first, and why?": "यहाँ दो चरण हैं। पहले कौन सा होना चाहिए, और क्यों?",
    "Tap the step that comes first. Then tap it again to work it.": "जो चरण पहले आता है, उस पर टैप करो। फिर हल करने के लिए दोबारा टैप करो।",
    "Which of the two could you do right now with the numbers that are printed?": "छपी संख्याओं से तुम अभी दोनों में से कौन सा कर सकते हो?",
    "Work the first step alone. Then use its answer in the second.": "पहला चरण अकेले हल करो। फिर उसका उत्तर दूसरे में लगाओ।",
    "Decide the order of two steps before working either one. Bought together for less? Add first. Priced above another? Take away first.": "कोई भी चरण हल करने से पहले दोनों का क्रम तय करो। साथ में कम दाम पर खरीदा? पहले जोड़ो। किसी और से ज़्यादा दाम? पहले घटाओ।",
    "You learned: decide the order of two steps before working either.": "तुमने सीखा: हल करने से पहले दो चरणों का क्रम तय करो।",
    "A table costs ₹7,480, and a chair costs ₹3,260. The two together are sold for ₹9,950. How much is saved?": "एक मेज़ 7,480 रुपये की है, और एक कुर्सी 3,260 रुपये की। दोनों साथ में 9,950 रुपये में बिकते हैं। कितने बचे?",
    "Money saved?": "कितने पैसे बचे?",
    "Taking one price off the other shows which is dearer. Is that the saving?": "एक दाम में से दूसरा घटाने से पता चलता है कौन महँगा है। क्या वही बचत है?",
    "A fridge costs ₹24,350, which is ₹6,480 more than a washing machine. What do the two cost together?": "एक फ्रिज 24,350 रुपये का है, जो वॉशिंग मशीन से 6,480 रुपये ज़्यादा है। दोनों का कुल दाम क्या है?",
    "Cost together?": "कुल दाम?",
    "Is ₹24,350 the fridge's price, or the washing machine's?": "24,350 रुपये फ्रिज का दाम है, या वॉशिंग मशीन का?",
    "An account held ₹21,308. After a payment came in, the balance was ₹68,908. Then ₹34,500 was spent. Find the payment, and the balance at the end.": "एक खाते में 21,308 रुपये थे। एक रकम जमा होने पर बाकी 68,908 रुपये हो गए। फिर 34,500 रुपये खर्च हुए। जमा रकम, और आखिर में बाकी रकम निकालो।",
    "Payment and balance?": "जमा रकम और बाकी?",
    "What are your two steps, said in words?": "शब्दों में बताओ, तुम्हारे दो चरण क्या हैं?",
    /* the working area's own lines */
    "First pick the card that says what is asked.": "पहले वह कार्ड चुनो जो बताता है कि क्या पूछा गया है।",
    "Read the last line again. Does it ask that?": "आखिरी पंक्ति फिर से पढ़ो। क्या वह यही पूछती है?",
    "The smaller number cannot go on top. Swap them.": "छोटी संख्या ऊपर नहीं जा सकती। दोनों की जगह बदलो।",
    "What did you do to the tiny numbers?": "तुमने छोटी संख्याओं के साथ क्या किया?",
    "Do the same to the big ones.": "बड़ी संख्याओं के साथ भी वही करो।",
    "Work the first step before the second. Tap it.": "दूसरे से पहले पहला चरण हल करो। उस पर टैप करो।",
    "First tap the step that comes first.": "पहले उस चरण पर टैप करो जो पहले आता है।",
    "Drag the number with no job into the grey bay.": "बिना काम की संख्या को स्लेटी डिब्बे में खींचो।",
    "Bring the other two down to the mat.": "बाकी दो को चटाई पर लाओ।",
    "Open the tiny version. Then bring the two numbers down.": "छोटा रूप खोलो। फिर दोनों संख्याएँ नीचे लाओ।",
    "Now bring its two numbers down to the mat.": "अब उसकी दो संख्याएँ चटाई पर लाओ।",
    "Add the columns from the ones.": "इकाई से खाने जोड़ो।",
    "Take the lower number off the top one, from the ones.": "इकाई से, ऊपर वाली में से नीचे वाली संख्या घटाओ।",
    "Then type both answers, one in each box.": "फिर दोनों उत्तर लिखो, हर डिब्बे में एक।",
    "Then type the answer.": "फिर उत्तर लिखो।",
    "The mat holds two numbers. Which one has no job?": "चटाई पर दो संख्याएँ आती हैं। किसका कोई काम नहीं?",
    "The mat holds two numbers. Put one back first.": "चटाई पर दो संख्याएँ आती हैं। पहले एक वापस रखो।",
    "Neither step needs the other's answer, so either can go first.": "किसी चरण को दूसरे का उत्तर नहीं चाहिए, इसलिए कोई भी पहले आ सकता है।",
    "Tap the first step to set it out.": "उसे लगाने के लिए पहले चरण पर टैप करो।",
    "Tap the first step to work it. Tap the second to swap them.": "हल करने के लिए पहले चरण पर टैप करो। बदलने के लिए दूसरे पर।",
    "Take it off what? That amount is not made yet.": "किसमें से घटाओगे? वह रकम अभी बनी ही नहीं।",
    "Add it to what? That price is not found yet.": "किसमें जोड़ोगे? वह दाम अभी मिला ही नहीं।",
    "Work this one out, and type it in its box.": "इसे हल करो, और इसके डिब्बे में लिखो।",
    "The second step is open. Bring its two numbers down to the mat.": "दूसरा चरण खुल गया। उसकी दो संख्याएँ चटाई पर लाओ।",
    "The second step is open.": "दूसरा चरण खुल गया।",
    "Bring its two numbers down to the mat.": "उसकी दो संख्याएँ चटाई पर लाओ।",
    /* the answer sentences ({n} the answer, {p} the payment) */
    "{n} L of water is left.": "{n} लीटर पानी बचा है।",
    "{n} books are left on the shelves.": "अलमारियों में {n} किताबें बची हैं।",
    "The first town has {n} more people.": "पहले शहर में {n} लोग ज़्यादा हैं।",
    "{n} passengers were not children.": "{n} यात्री बच्चे नहीं थे।",
    "{n} more trips ran in March.": "मार्च में {n} फेरे ज़्यादा चले।",
    "{n} tickets were used later.": "{n} टिकट बाद में इस्तेमाल हुए।",
    "{n} should be added to make 90,000.": "90,000 बनाने के लिए {n} जोड़ना होगा।",
    "{n} should be added to make 30,000.": "30,000 बनाने के लिए {n} जोड़ना होगा।",
    "{n} more bricks must be bought.": "{n} ईंटें और खरीदनी होंगी।",
    "₹{n} is saved.": "{n} रुपये बचे।",
    "The two cost ₹{n} together.": "दोनों का कुल दाम {n} रुपये है।",
    "The payment was ₹{p}. ₹{n} is left at the end.": "जमा रकम {p} रुपये थी। आखिर में {n} रुपये बचे।",
    /* the problem board, piece by piece */
    "A tank held": "एक टंकी में",
    "L of water and": "लीटर पानी था, और",
    "L was used.": "लीटर खर्च हुआ।",
    "A library had": "एक पुस्तकालय में",
    "books and": "किताबें थीं, और",
    "were lent out.": "पढ़ने को दी गईं।",
    "One town has": "एक शहर में",
    "people and another has": "लोग हैं, और दूसरे में",
    ".": "।",
    "A train with": "एक ट्रेन के",
    "coaches carried": "डिब्बों में थे",
    "passengers.": "यात्री।",
    "of them were children.": "यात्री बच्चे थे।",
    "A depot": "शहर से",
    "km from the town ran": "किलोमीटर दूर एक डिपो ने",
    "trips in March and": "फेरे मार्च में, और",
    "in April.": "अप्रैल में चलाए।",
    "A hall with": "एक हॉल में",
    "chairs sold": "कुर्सियाँ, एक हफ़्ते में बिके",
    "tickets in a week.": "टिकट।",
    "of them were used on the first day.": "पहले दिन इस्तेमाल हुए।",
    "What should be added to": "संख्या",
    "to make it": "में क्या जोड़ें कि बने",
    "A builder needs": "एक मिस्त्री को",
    "bricks and already has": "ईंटें चाहिए, पास में हैं",
    "A table costs": "एक मेज़ का दाम",
    "and a chair costs": "है, और एक कुर्सी का",
    "The two together are sold for": "दोनों साथ में लो तो दाम",
    "A fridge costs": "एक फ्रिज का दाम",
    ", which is": "है, जो वॉशिंग मशीन से",
    "more than a washing machine.": "ज़्यादा है।",
    "An account held": "एक खाते में",
    ". A payment came in,": "थे। फिर एक रकम जमा हुई,",
    "and the balance was": "और बाकी रकम हुई",
    ". Then": "। फिर",
    "was spent.": "खर्च हुए।",
    "A shop had": "एक दुकान में थे",
    "pens and": "पेन और",
    "pencils.": "पेंसिलें।",
    "It sold": "उसने बेचे",
    /* the question lines and the question cards */
    "How much is left?": "कितना बचा?",
    "How many are left on the shelves?": "अलमारियों में कितनी बचीं?",
    "How many more people has the first town?": "पहले शहर में कितने लोग ज़्यादा हैं?",
    "How many were not children?": "कितने बच्चे नहीं थे?",
    "How many more trips ran in March?": "मार्च में कितने फेरे ज़्यादा चले?",
    "How many were used later?": "बाद में कितने इस्तेमाल हुए?",
    "How many more must be bought?": "और कितनी खरीदनी होंगी?",
    "How much is saved?": "कितने बचे?",
    "What do the two cost together?": "दोनों का कुल दाम क्या है?",
    "Find the payment, then the balance at the end.": "जमा रकम निकालो, फिर आखिर में बाकी रकम।",
    "How many are left?": "कितने बचे?",
    "How many to reach?": "पहुँचने को कितने?",
    "How much altogether?": "कुल कितना?",
    /* the numbers' names on the mat, the routes, the steps */
    "held": "पहले",
    "used": "खर्च",
    "had": "पहले",
    "lent": "दी गईं",
    "first": "पहला",
    "second": "दूसरा",
    "coaches": "डिब्बे",
    "riders": "यात्री",
    "children": "बच्चे",
    "km": "किलोमीटर",
    "March": "मार्च",
    "April": "अप्रैल",
    "chairs": "कुर्सियाँ",
    "sold": "बिके",
    "1st day": "पहला दिन",
    "have": "पास में",
    "target": "लक्ष्य",
    "needs": "चाहिए",
    "has": "पास में",
    "table": "मेज़",
    "chair": "कुर्सी",
    "paid": "दिए",
    "both": "दोनों",
    "fridge": "फ्रिज",
    "more by": "ज़्यादा",
    "washer": "मशीन",
    "balance": "बाकी",
    "spent": "खर्च",
    "payment": "जमा रकम",
    "left": "बचा",
    "pens": "पेन",
    "pencils": "पेंसिलें",
    "altogether": "कुल",
    "more": "ज़्यादा",
    "dearer by": "इतना महँगा",
    "saved": "बचत",
    "added at once": "सीधे जोड़ा",
    "together": "कुल दाम",
    "added": "जोड़ा",
    "Add the two prices": "दोनों दाम जोड़ो",
    "Subtract the price paid": "दिया गया दाम घटाओ",
    "Find the cheaper price": "सस्ता दाम निकालो",
    "Find the payment": "जमा रकम निकालो",
    "Take off the spending": "खर्च घटाओ",
    /* the working area's own words */
    "O": "इ",
    "T": "द",
    "H": "सै",
    "Th": "ह",
    "TTh": "द.ह.",
    "L": "ला",
    "no job": "कोई काम नहीं",
    "Tiny numbers": "छोटी संख्याएँ",
    "Try it with tiny numbers": "छोटी संख्याओं से करके देखो",
    "1st": "पहला",
    "2nd": "दूसरा",
    "not enough": "काफ़ी नहीं",
    "either order": "कोई भी क्रम",
    "On the mat:": "चटाई पर:",
    "Step": "चरण",
    "Which step first?": "पहले कौन सा चरण?",
    "Mat": "चटाई",
    "grey": "स्लेटी",
    "What is asked?": "क्या पूछा है?"
  },
  gu: {
    "Story to Difference": "વાર્તાથી તફાવત",
    "Read it right through. What is the question actually asking for?": "આખું વાંચો. સવાલ ખરેખર શું પૂછે છે?",
    "Every sentence turned into a taking away, and the numbers with no job are still standing.": "દરેક વાક્ય બાદબાકીમાં બદલાયું, અને કામ વગરની સંખ્યાઓ ત્યાં જ ઊભી છે.",
    "Free play. Lift any two numbers onto the mat and watch it take one from the other.": "મુક્ત રમત. કોઈ પણ બે સંખ્યાઓ ચટાઈ પર મૂકો અને જુઓ તે એકમાંથી બીજી બાદ કરે છે.",
    "Find the two numbers the question is about": "સવાલની બે સંખ્યાઓ શોધો",
    "Say what you are being asked for before you touch a number.": "કોઈ સંખ્યાને અડતાં પહેલાં કહો કે શું પૂછ્યું છે.",
    "Pick the card that says what is asked. Then bring its two numbers down to the mat.": "જે કાર્ડ કહે છે કે શું પૂછ્યું છે તે પસંદ કરો. પછી તેની બે સંખ્યાઓ ચટાઈ પર લાવો.",
    "Which two amounts does it compare?": "તે કયા બે જથ્થાની સરખામણી કરે છે?",
    "Read only the last sentence. Which number goes on top?": "ફક્ત છેલ્લું વાક્ય વાંચો. કઈ સંખ્યા ઉપર જશે?",
    "Say what is being asked, and find the two amounts it is about. Put the greater one on top and take the other off it.": "કહો શું પૂછ્યું છે, અને તેના બે જથ્થા શોધો. મોટાને ઉપર મૂકો અને તેમાંથી બીજો બાદ કરો.",
    "You learned: say what is asked, then put the greater number on top.": "તમે શીખ્યા: પહેલાં કહો શું પૂછ્યું છે, પછી મોટી સંખ્યા ઉપર મૂકો.",
    "A tank held 48,250 L of water, and 26,190 L was used. How much is left?": "એક ટાંકીમાં 48,250 લિટર પાણી હતું, અને 26,190 લિટર વપરાયું. કેટલું બાકી રહ્યું?",
    "Water left?": "કેટલું પાણી બાકી?",
    "Was water put into the tank, or taken out of it?": "ટાંકીમાં પાણી નાખ્યું, કે તેમાંથી કાઢ્યું?",
    "A library had 18,420 books, and 7,315 were lent out. How many are left on the shelves?": "એક પુસ્તકાલયમાં 18,420 પુસ્તકો હતાં, અને 7,315 વાંચવા આપ્યાં. છાજલીઓ પર કેટલાં બાકી છે?",
    "Books left?": "કેટલાં પુસ્તકો બાકી?",
    "What does your question card say?": "તમારું સવાલ કાર્ડ શું કહે છે?",
    "One town has 36,940 people, and another has 21,508. How many more people has the first town?": "એક શહેરમાં 36,940 લોકો છે, અને બીજામાં 21,508. પહેલા શહેરમાં કેટલા લોકો વધારે છે?",
    "How many more?": "કેટલા વધારે?",
    "Does how many more ask you to join the towns, or to compare them?": "કેટલા વધારેનો અર્થ શહેરોને જોડવાં છે, કે તેમની સરખામણી કરવી?",
    "Some numbers are printed to be left out": "કેટલીક સંખ્યાઓ છોડી દેવા માટે જ છાપેલી હોય છે",
    "One of these numbers has no job here. Which one?": "આમાંથી એક સંખ્યાનું અહીં કોઈ કામ નથી. કઈ?",
    "Drag the number with no job into the grey bay. Bring the other two down to the mat.": "કામ વગરની સંખ્યાને રાખોડી ખાનામાં ખેંચો. બાકીની બેને ચટાઈ પર લાવો.",
    "Does this number help to answer it?": "શું આ સંખ્યા જવાબ આપવામાં મદદ કરે છે?",
    "Read one sentence at a time. Does its number answer your question card?": "એક પછી એક વાક્ય વાંચો. શું તેની સંખ્યા તમારા સવાલ કાર્ડનો જવાબ આપે છે?",
    "Work out what is being asked first. Bring down only the numbers that answer it, and leave the spare one standing.": "પહેલાં સમજો શું પૂછ્યું છે. ફક્ત એ જ સંખ્યાઓ લાવો જે તેનો જવાબ આપે, અને વધારાની ત્યાં જ રહેવા દો.",
    "You learned: bring down only the numbers the question needs.": "તમે શીખ્યા: ફક્ત એ જ સંખ્યાઓ લાવો જે સવાલને જોઈએ.",
    "A train with 24 coaches carried 3,845 passengers, and 1,672 of them were children. How many were not children?": "24 ડબ્બાવાળી એક ટ્રેનમાં 3,845 મુસાફરો હતા, અને તેમાંથી 1,672 બાળકો હતાં. કેટલા બાળકો નહોતા?",
    "Not children?": "બાળકો નહીં?",
    "Do the coaches tell you anything about who was riding?": "શું ડબ્બા કહે છે કે કોણ મુસાફરી કરતું હતું?",
    "A depot 15 km from the town ran 2,640 trips in March, and 1,925 trips in April. How many more trips ran in March?": "શહેરથી 15 કિલોમીટર દૂર એક ડેપોએ માર્ચમાં 2,640 ફેરા, અને એપ્રિલમાં 1,925 ફેરા ચલાવ્યા. માર્ચમાં કેટલા ફેરા વધારે ચાલ્યા?",
    "More trips?": "વધારે ફેરા?",
    "Does the distance to the town change how many trips ran?": "શું શહેરના અંતરથી ફેરાની ગણતરી બદલાય છે?",
    "A hall with 500 chairs sold 24,318 tickets in a week. 11,207 of them were used on the first day. How many were used later?": "500 ખુરશીવાળા એક હૉલે એક અઠવાડિયામાં 24,318 ટિકિટ વેચી. તેમાંથી 11,207 પહેલા દિવસે વપરાઈ. પછી કેટલી વપરાઈ?",
    "Used later?": "પછી વપરાઈ?",
    "What does your question card ask for?": "તમારું સવાલ કાર્ડ શું પૂછે છે?",
    "Shrink the question until you can see it": "સવાલને નાનો કરો, જ્યાં સુધી તે સાફ ન દેખાય",
    "Try the same question with tiny numbers. What did you do to those?": "આ જ સવાલ નાની સંખ્યાઓથી કરી જુઓ. તેમની સાથે તમે શું કર્યું?",
    "Pick the card that says what is asked. Then open the tiny version.": "જે કાર્ડ કહે છે કે શું પૂછ્યું છે તે પસંદ કરો. પછી નાનું રૂપ ખોલો.",
    "Which move did the tiny numbers need?": "નાની સંખ્યાઓને કઈ ચાલ જોઈતી હતી?",
    "Open the tiny version. Copy its move onto the big numbers.": "નાનું રૂપ ખોલો. તેની ચાલ મોટી સંખ્યાઓ પર કરો.",
    "An amount needed to reach a target is the target take away what is already there. Shrinking the numbers shows you why.": "લક્ષ્ય સુધી પહોંચવા, લક્ષ્યમાંથી પહેલેથી હોય તે બાદ કરો. સંખ્યાઓ નાની કરવાથી ખબર પડે છે કેમ.",
    "You learned: to reach a target, take what is there from the target.": "તમે શીખ્યા: લક્ષ્ય સુધી પહોંચવા, લક્ષ્યમાંથી જે છે તે બાદ કરો.",
    "Here is 52,640. What should be added to it to make 90,000?": "આ 52,640 છે. 90,000 બનાવવા તેમાં શું ઉમેરીએ?",
    "What to add?": "શું ઉમેરીએ?",
    "Added to 52,640, your number should make 90,000. Would it?": "52,640 માં ઉમેરતાં તમારી સંખ્યાથી 90,000 બનવા જોઈએ. શું બનશે?",
    "Here is 14,672. What should be added to it to make 30,000?": "આ 14,672 છે. 30,000 બનાવવા તેમાં શું ઉમેરીએ?",
    "What would this question look like with single digit numbers?": "એક અંકની સંખ્યાઓ સાથે આ સવાલ કેવો દેખાશે?",
    "A builder needs 40,000 bricks, and already has 27,516. How many more must be bought?": "એક કડિયાને 40,000 ઈંટો જોઈએ છે, અને તેની પાસે પહેલેથી 27,516 છે. હજી કેટલી ખરીદવી પડશે?",
    "Bricks to buy?": "કેટલી ઈંટો ખરીદવી?",
    "Can the bricks to buy be more than the builder needs?": "શું ખરીદવાની ઈંટો જરૂર કરતાં વધારે હોઈ શકે?",
    "Two steps need an order": "બે પગલાંનો એક ક્રમ હોય છે",
    "Two steps here. Which one has to happen first, and why?": "અહીં બે પગલાં છે. પહેલાં કયું થવું જોઈએ, અને કેમ?",
    "Tap the step that comes first. Then tap it again to work it.": "જે પગલું પહેલાં આવે તેના પર ટૅપ કરો. પછી તેને ઉકેલવા ફરી ટૅપ કરો.",
    "Which of the two could you do right now with the numbers that are printed?": "છાપેલી સંખ્યાઓથી તમે હમણાં બેમાંથી કયું કરી શકો?",
    "Work the first step alone. Then use its answer in the second.": "પહેલું પગલું એકલું ઉકેલો. પછી તેનો જવાબ બીજામાં વાપરો.",
    "Decide the order of two steps before working either one. Bought together for less? Add first. Priced above another? Take away first.": "કોઈ પણ પગલું ઉકેલતાં પહેલાં બંનેનો ક્રમ નક્કી કરો. સાથે ઓછી કિંમતે ખરીદ્યું? પહેલાં ઉમેરો. બીજા કરતાં વધારે કિંમત? પહેલાં બાદ કરો.",
    "You learned: decide the order of two steps before working either.": "તમે શીખ્યા: ઉકેલતાં પહેલાં બે પગલાંનો ક્રમ નક્કી કરો.",
    "A table costs ₹7,480, and a chair costs ₹3,260. The two together are sold for ₹9,950. How much is saved?": "એક ટેબલ 7,480 રૂપિયાનું છે, અને એક ખુરશી 3,260 રૂપિયાની. બંને સાથે 9,950 રૂપિયામાં વેચાય છે. કેટલા બચ્યા?",
    "Money saved?": "કેટલા પૈસા બચ્યા?",
    "Taking one price off the other shows which is dearer. Is that the saving?": "એક કિંમતમાંથી બીજી બાદ કરવાથી ખબર પડે કઈ મોંઘી છે. શું એ જ બચત છે?",
    "A fridge costs ₹24,350, which is ₹6,480 more than a washing machine. What do the two cost together?": "એક ફ્રિજ 24,350 રૂપિયાનું છે, જે વૉશિંગ મશીનથી 6,480 રૂપિયા વધારે છે. બંનેની કુલ કિંમત શું છે?",
    "Cost together?": "કુલ કિંમત?",
    "Is ₹24,350 the fridge's price, or the washing machine's?": "24,350 રૂપિયા ફ્રિજની કિંમત છે, કે વૉશિંગ મશીનની?",
    "An account held ₹21,308. After a payment came in, the balance was ₹68,908. Then ₹34,500 was spent. Find the payment, and the balance at the end.": "એક ખાતામાં 21,308 રૂપિયા હતા. એક રકમ જમા થતાં બાકી 68,908 રૂપિયા થયા. પછી 34,500 રૂપિયા ખર્ચાયા. જમા રકમ, અને છેલ્લે બાકી રકમ શોધો.",
    "Payment and balance?": "જમા રકમ અને બાકી?",
    "What are your two steps, said in words?": "શબ્દોમાં કહો, તમારાં બે પગલાં શું છે?",
    /* the working area's own lines */
    "First pick the card that says what is asked.": "પહેલાં તે કાર્ડ પસંદ કરો જે કહે છે કે શું પૂછ્યું છે.",
    "Read the last line again. Does it ask that?": "છેલ્લી લીટી ફરી વાંચો. શું તે આ જ પૂછે છે?",
    "The smaller number cannot go on top. Swap them.": "નાની સંખ્યા ઉપર ન જઈ શકે. બંનેની જગ્યા બદલો.",
    "What did you do to the tiny numbers?": "તમે નાની સંખ્યાઓ સાથે શું કર્યું?",
    "Do the same to the big ones.": "મોટી સંખ્યાઓ સાથે પણ એમ જ કરો.",
    "Work the first step before the second. Tap it.": "બીજા પહેલાં પહેલું પગલું ઉકેલો. તેના પર ટૅપ કરો.",
    "First tap the step that comes first.": "પહેલાં તે પગલા પર ટૅપ કરો જે પહેલાં આવે છે.",
    "Drag the number with no job into the grey bay.": "કામ વગરની સંખ્યાને રાખોડી ખાનામાં ખેંચો.",
    "Bring the other two down to the mat.": "બાકીની બેને ચટાઈ પર લાવો.",
    "Open the tiny version. Then bring the two numbers down.": "નાનું રૂપ ખોલો. પછી બંને સંખ્યાઓ નીચે લાવો.",
    "Now bring its two numbers down to the mat.": "હવે તેની બે સંખ્યાઓ ચટાઈ પર લાવો.",
    "Add the columns from the ones.": "એકમથી ખાનાં ઉમેરો.",
    "Take the lower number off the top one, from the ones.": "એકમથી, ઉપરની સંખ્યામાંથી નીચેની બાદ કરો.",
    "Then type both answers, one in each box.": "પછી બંને જવાબ લખો, દરેક બૉક્સમાં એક.",
    "Then type the answer.": "પછી જવાબ લખો.",
    "The mat holds two numbers. Which one has no job?": "ચટાઈ પર બે સંખ્યાઓ આવે છે. કોનું કોઈ કામ નથી?",
    "The mat holds two numbers. Put one back first.": "ચટાઈ પર બે સંખ્યાઓ આવે છે. પહેલાં એક પાછી મૂકો.",
    "Neither step needs the other's answer, so either can go first.": "કોઈ પગલાને બીજાના જવાબની જરૂર નથી, તેથી કોઈ પણ પહેલાં આવી શકે.",
    "Tap the first step to set it out.": "તેને ગોઠવવા પહેલા પગલા પર ટૅપ કરો.",
    "Tap the first step to work it. Tap the second to swap them.": "ઉકેલવા પહેલા પગલા પર ટૅપ કરો. અદલબદલ કરવા બીજા પર.",
    "Take it off what? That amount is not made yet.": "શેમાંથી બાદ કરશો? તે રકમ હજી બની જ નથી.",
    "Add it to what? That price is not found yet.": "શેમાં ઉમેરશો? તે કિંમત હજી મળી જ નથી.",
    "Work this one out, and type it in its box.": "આને ઉકેલો, અને તેના બૉક્સમાં લખો.",
    "The second step is open. Bring its two numbers down to the mat.": "બીજું પગલું ખૂલી ગયું. તેની બે સંખ્યાઓ ચટાઈ પર લાવો.",
    "The second step is open.": "બીજું પગલું ખૂલી ગયું.",
    "Bring its two numbers down to the mat.": "તેની બે સંખ્યાઓ ચટાઈ પર લાવો.",
    /* the answer sentences ({n} the answer, {p} the payment) */
    "{n} L of water is left.": "{n} લિટર પાણી બાકી છે.",
    "{n} books are left on the shelves.": "છાજલીઓ પર {n} પુસ્તકો બાકી છે.",
    "The first town has {n} more people.": "પહેલા શહેરમાં {n} લોકો વધારે છે.",
    "{n} passengers were not children.": "{n} મુસાફરો બાળકો નહોતા.",
    "{n} more trips ran in March.": "માર્ચમાં {n} ફેરા વધારે ચાલ્યા.",
    "{n} tickets were used later.": "{n} ટિકિટ પછી વપરાઈ.",
    "{n} should be added to make 90,000.": "90,000 બનાવવા {n} ઉમેરવા પડે.",
    "{n} should be added to make 30,000.": "30,000 બનાવવા {n} ઉમેરવા પડે.",
    "{n} more bricks must be bought.": "હજી {n} ઈંટો ખરીદવી પડશે.",
    "₹{n} is saved.": "{n} રૂપિયા બચ્યા.",
    "The two cost ₹{n} together.": "બંનેની કુલ કિંમત {n} રૂપિયા છે.",
    "The payment was ₹{p}. ₹{n} is left at the end.": "જમા રકમ {p} રૂપિયા હતી. છેલ્લે {n} રૂપિયા બાકી રહ્યા.",
    /* the problem board, piece by piece */
    "A tank held": "એક ટાંકીમાં",
    "L of water and": "લિટર પાણી હતું, અને",
    "L was used.": "લિટર વપરાયું.",
    "A library had": "એક પુસ્તકાલયમાં",
    "books and": "પુસ્તકો હતાં, અને",
    "were lent out.": "વાંચવા આપ્યાં.",
    "One town has": "એક શહેરમાં",
    "people and another has": "લોકો છે, અને બીજામાં",
    ".": ".",
    "A train with": "એક ટ્રેનના",
    "coaches carried": "ડબ્બામાં હતા",
    "passengers.": "મુસાફરો.",
    "of them were children.": "મુસાફરો બાળકો હતાં.",
    "A depot": "શહેરથી",
    "km from the town ran": "કિલોમીટર દૂર એક ડેપોએ",
    "trips in March and": "ફેરા માર્ચમાં, અને",
    "in April.": "એપ્રિલમાં ચલાવ્યા.",
    "A hall with": "એક હૉલમાં",
    "chairs sold": "ખુરશીઓ, એક અઠવાડિયામાં વેચાઈ",
    "tickets in a week.": "ટિકિટ.",
    "of them were used on the first day.": "પહેલા દિવસે વપરાઈ.",
    "What should be added to": "સંખ્યા",
    "to make it": "માં શું ઉમેરીએ કે બને",
    "A builder needs": "એક કડિયાને",
    "bricks and already has": "ઈંટો જોઈએ છે, પાસે છે",
    "A table costs": "એક ટેબલની કિંમત",
    "and a chair costs": "છે, અને એક ખુરશીની",
    "The two together are sold for": "બંને સાથે લો તો કિંમત",
    "A fridge costs": "એક ફ્રિજની કિંમત",
    ", which is": "છે, જે વૉશિંગ મશીનથી",
    "more than a washing machine.": "વધારે છે.",
    "An account held": "એક ખાતામાં",
    ". A payment came in,": "હતા. પછી એક રકમ જમા થઈ,",
    "and the balance was": "અને બાકી રકમ થઈ",
    ". Then": ". પછી",
    "was spent.": "ખર્ચાયા.",
    "A shop had": "એક દુકાનમાં હતી",
    "pens and": "પેન અને",
    "pencils.": "પેન્સિલો.",
    "It sold": "તેણે વેચી",
    /* the question lines and the question cards */
    "How much is left?": "કેટલું બાકી રહ્યું?",
    "How many are left on the shelves?": "છાજલીઓ પર કેટલાં બાકી છે?",
    "How many more people has the first town?": "પહેલા શહેરમાં કેટલા લોકો વધારે છે?",
    "How many were not children?": "કેટલા બાળકો નહોતા?",
    "How many more trips ran in March?": "માર્ચમાં કેટલા ફેરા વધારે ચાલ્યા?",
    "How many were used later?": "પછી કેટલી વપરાઈ?",
    "How many more must be bought?": "હજી કેટલી ખરીદવી પડશે?",
    "How much is saved?": "કેટલા બચ્યા?",
    "What do the two cost together?": "બંનેની કુલ કિંમત શું છે?",
    "Find the payment, then the balance at the end.": "જમા રકમ શોધો, પછી છેલ્લે બાકી રકમ.",
    "How many are left?": "કેટલા બાકી?",
    "How many to reach?": "પહોંચવા કેટલા?",
    "How much altogether?": "કુલ કેટલું?",
    /* the numbers' names on the mat, the routes, the steps */
    "held": "પહેલાં",
    "used": "વપરાયું",
    "had": "પહેલાં",
    "lent": "આપ્યાં",
    "first": "પહેલું",
    "second": "બીજું",
    "coaches": "ડબ્બા",
    "riders": "મુસાફરો",
    "children": "બાળકો",
    "km": "કિલોમીટર",
    "March": "માર્ચ",
    "April": "એપ્રિલ",
    "chairs": "ખુરશીઓ",
    "sold": "વેચાઈ",
    "1st day": "પહેલો દિવસ",
    "have": "પાસે",
    "target": "લક્ષ્ય",
    "needs": "જોઈએ",
    "has": "પાસે",
    "table": "ટેબલ",
    "chair": "ખુરશી",
    "paid": "ચૂકવ્યા",
    "both": "બંને",
    "fridge": "ફ્રિજ",
    "more by": "વધારે",
    "washer": "મશીન",
    "balance": "બાકી",
    "spent": "ખર્ચ",
    "payment": "જમા રકમ",
    "left": "બાકી",
    "pens": "પેન",
    "pencils": "પેન્સિલો",
    "altogether": "કુલ",
    "more": "વધારે",
    "dearer by": "આટલું મોંઘું",
    "saved": "બચત",
    "added at once": "સીધું ઉમેર્યું",
    "together": "કુલ કિંમત",
    "added": "ઉમેર્યું",
    "Add the two prices": "બંને કિંમત ઉમેરો",
    "Subtract the price paid": "ચૂકવેલી કિંમત બાદ કરો",
    "Find the cheaper price": "સસ્તી કિંમત શોધો",
    "Find the payment": "જમા રકમ શોધો",
    "Take off the spending": "ખર્ચ બાદ કરો",
    /* the working area's own words */
    "O": "એ",
    "T": "દ",
    "H": "શ",
    "Th": "હ",
    "TTh": "દ.હ.",
    "L": "લા",
    "no job": "કોઈ કામ નથી",
    "Tiny numbers": "નાની સંખ્યાઓ",
    "Try it with tiny numbers": "નાની સંખ્યાઓથી કરી જુઓ",
    "1st": "પહેલું",
    "2nd": "બીજું",
    "not enough": "પૂરતું નથી",
    "either order": "કોઈ પણ ક્રમ",
    "On the mat:": "ચટાઈ પર:",
    "Step": "પગલું",
    "Which step first?": "પહેલાં કયું પગલું?",
    "Mat": "ચટાઈ",
    "grey": "રાખોડી",
    "What is asked?": "શું પૂછ્યું છે?"
  }
};
const sdOf = (a, b, lang) => lang === "hi" ? `${b} में से ${a}` : lang === "gu" ? `${b} માંથી ${a}` : `${a} of ${b}`;
const sdNum = (id, v, tag, rs = false) => ({ t: "num", id, v, tag, rs });
const SD_CARDS = [["more", "How many more?"], ["left", "How many are left?"], ["reach", "How many to reach?"], ["all", "How much altogether?"]];
const SD_PROBS = {
  "M2.S4.T6.C20:ML1": {
    lines: [["A tank held", sdNum("held", 48250, "held"), "L of water and", sdNum("used", 26190, "used"), "L was used."]],
    q: "How much is left?",
    right: ["left"],
    need: ["held", "used"],
    tell: "{n} L of water is left.",
    rivals: [{ label: "altogether", a: "held", b: "used", op: "+", right: { label: "left", a: "held", b: "used", op: "-" } }]
  },
  "M2.S4.T6.C20:1": {
    lines: [["A library had", sdNum("had", 18420, "had"), "books and", sdNum("lent", 7315, "lent"), "were lent out."]],
    q: "How many are left on the shelves?",
    right: ["left"],
    need: ["had", "lent"],
    tell: "{n} books are left on the shelves.",
    rivals: [{ label: "altogether", a: "had", b: "lent", op: "+", right: { label: "left", a: "had", b: "lent", op: "-" } }]
  },
  "M2.S4.T6.C20:2": {
    lines: [["One town has", sdNum("t1", 36940, "first"), "people and another has", sdNum("t2", 21508, "second"), "."]],
    q: "How many more people has the first town?",
    right: ["more"],
    need: ["t1", "t2"],
    tell: "The first town has {n} more people.",
    rivals: [{ label: "altogether", a: "t1", b: "t2", op: "+", right: { label: "more", a: "t1", b: "t2", op: "-" } }]
  },
  "M2.S4.T6.C21:ML2": {
    lines: [
      ["A train with", sdNum("coach", 24, "coaches"), "coaches carried", sdNum("pass", 3845, "riders"), "passengers."],
      [sdNum("kids", 1672, "children"), "of them were children."]
    ],
    q: "How many were not children?",
    right: ["left"],
    spare: "coach",
    need: ["pass", "kids"],
    tell: "{n} passengers were not children."
  },
  "M2.S4.T6.C21:3": {
    lines: [["A depot", sdNum("km", 15, "km"), "km from the town ran"], [sdNum("mar", 2640, "March"), "trips in March and", sdNum("apr", 1925, "April"), "in April."]],
    q: "How many more trips ran in March?",
    right: ["more"],
    spare: "km",
    need: ["mar", "apr"],
    tell: "{n} more trips ran in March."
  },
  "M2.S4.T6.C21:4": {
    lines: [
      ["A hall with", sdNum("chairs", 500, "chairs"), "chairs sold", sdNum("sold", 24318, "sold"), "tickets in a week."],
      [sdNum("day1", 11207, "1st day"), "of them were used on the first day."]
    ],
    q: "How many were used later?",
    right: ["left"],
    spare: "chairs",
    need: ["sold", "day1"],
    tell: "{n} tickets were used later."
  },
  "M2.S4.T6.C22:ML3": {
    lines: [["What should be added to", sdNum("have", 52640, "have"), "to make it", sdNum("goal", 9e4, "target"), "?"]],
    q: null,
    right: ["reach"],
    need: ["goal", "have"],
    tiny: [4, 7],
    tell: "{n} should be added to make 90,000."
  },
  "M2.S4.T6.C22:5": {
    lines: [["What should be added to", sdNum("have", 14672, "have"), "to make it", sdNum("goal", 3e4, "target"), "?"]],
    q: null,
    right: ["reach"],
    need: ["goal", "have"],
    tiny: [2, 6],
    tell: "{n} should be added to make 30,000."
  },
  "M2.S4.T6.C22:6": {
    lines: [["A builder needs", sdNum("need", 4e4, "needs"), "bricks and already has", sdNum("has", 27516, "has"), "."]],
    q: "How many more must be bought?",
    right: ["reach", "more"],
    need: ["need", "has"],
    tiny: [5, 8],
    tell: "{n} more bricks must be bought."
  },
  "M2.S4.T6.C23:ML4": {
    lines: [
      ["A table costs", sdNum("tab", 7480, "table", true), "and a chair costs", sdNum("cha", 3260, "chair", true), "."],
      ["The two together are sold for", sdNum("paid", 9950, "paid", true), "."]
    ],
    q: "How much is saved?",
    steps: [
      { id: "add", label: "Add the two prices", op: "+", a: "tab", b: "cha", out: "both", tag: "both" },
      { id: "take", label: "Subtract the price paid", op: "-", a: "both", b: "paid" }
    ],
    loose: ["take", "add"],
    early: { a: null, b: "paid", op: "-", say: "Take it off what? That amount is not made yet." },
    need: ["both", "paid"],
    tell: "₹{n} is saved.",
    rivals: [{ label: "dearer by", a: "tab", b: "cha", op: "-", right: { label: "saved", a: "both", b: "paid", op: "-" } }]
  },
  "M2.S4.T6.C23:7": {
    lines: [["A fridge costs", sdNum("fri", 24350, "fridge", true), ", which is", sdNum("more", 6480, "more by", true)], ["more than a washing machine."]],
    q: "What do the two cost together?",
    steps: [
      { id: "find", label: "Find the cheaper price", op: "-", a: "fri", b: "more", out: "wm", tag: "washer" },
      { id: "add", label: "Add the two prices", op: "+", a: "fri", b: "wm" }
    ],
    loose: ["find", "add"],
    early: { a: "fri", b: null, op: "+", say: "Add it to what? That price is not found yet." },
    need: ["fri", "wm"],
    tell: "The two cost ₹{n} together.",
    rivals: [{ label: "added at once", a: "fri", b: "more", op: "+", right: { label: "together", a: "fri", b: "wm", op: "+" } }]
  },
  "M2.S4.T6.C23:8": {
    lines: [
      ["An account held", sdNum("held", 21308, "held", true), ". A payment came in,"],
      ["and the balance was", sdNum("bal", 68908, "balance", true), ". Then", sdNum("spent", 34500, "spent", true), "was spent."]
    ],
    q: "Find the payment, then the balance at the end.",
    steps: [
      { id: "pay", label: "Find the payment", op: "-", a: "bal", b: "held", part: 0, tag: "payment" },
      { id: "spend", label: "Take off the spending", op: "-", a: "bal", b: "spent", part: 1, tag: "left" }
    ],
    loose: ["spend", "pay"],
    anyOrder: true,
    /* neither step needs the other's answer: either order stands */
    need: ["bal", "spent"],
    tell: "The payment was ₹{p}. ₹{n} is left at the end.",
    rivals: [{ label: "added", a: "held", b: "bal", op: "+", part: 0, right: { label: "payment", a: "bal", b: "held", op: "-" } }]
  }
};
const SD_FREE = { free: true, need: [], lines: [
  ["A shop had", sdNum("f1", 36500, "pens"), "pens and", sdNum("f2", 12875, "pencils"), "pencils."],
  ["It sold", sdNum("f3", 9480, "sold"), "pens and", sdNum("f4", 4350, "sold"), "pencils."]
] };
const sdProb = (key) => key === "free" ? SD_FREE : SD_PROBS[key] || SD_PROBS["M2.S4.T6.C20:ML1"];
const sdToks = (pr) => (pr.lines || []).flat().filter((t) => t && typeof t !== "string");
const sdRecipe = (pr) => {
  const v = {};
  sdToks(pr).forEach((t) => {
    v[t.id] = t.v;
  });
  (pr.steps || []).forEach((st) => {
    if (st.out) v[st.out] = st.op === "+" ? v[st.a] + v[st.b] : v[st.a] - v[st.b];
  });
  return v;
};
const sdMatOp = (pr) => pr.steps ? pr.steps[1].op : "-";
const PHASES = [
  {
    n: 1,
    concept: "Find the two numbers the question is about",
    conceptId: "M2.S4.T6.C20",
    objectiveIds: ["O9"],
    says: ["Say what you are being asked for before you touch a number.", "Pick the card that says what is asked. Then bring its two numbers down to the mat."],
    /* tries, as the plan writes it: first rung the item's miss line; second the phase's; third: the last sentence alone, which number goes on top */
    ladder: ["Which two amounts does it compare?", "Read only the last sentence. Which number goes on top?"],
    closing: "Say what is being asked, and find the two amounts it is about. Put the greater one on top and take the other off it.",
    learned: "You learned: say what is asked, then put the greater number on top.",
    traceback: "The question line lights and the right question card goes up; if the answer given was the sum, that route is written under the mat in ink (altogether: the two numbers added), beside the right one it is then set against; both numbers come down, the greater on top (a smaller one on top is swapped down); the columns are taken from the ones, a lending digit struck once in ink with its new value above it in rose and the ten travelling into the next column; the answer row fills and the answer is written back into a sentence.",
    items: [
      /* learn ML1: answer in the plan = 22,060 L. near: the two amounts added */
      {
        qid: "M2.S4.T6.C20:ML1",
        kind: "diff",
        near: 74440,
        winMs: 6400,
        ask: "Water left?",
        answer: 22060,
        miss: "Was water put into the tank, or taken out of it?",
        say: "A tank held 48,250 L of water, and 26,190 L was used. How much is left?"
      },
      /* practice 1: answer in the plan = 11,105 books. near: the two amounts added */
      {
        qid: "M2.S4.T6.C20:1",
        kind: "diff",
        near: 25735,
        winMs: 6400,
        ask: "Books left?",
        answer: 11105,
        miss: "What does your question card say?",
        say: "A library had 18,420 books, and 7,315 were lent out. How many are left on the shelves?"
      },
      /* practice 2: answer in the plan = 15,432 people. near: the two amounts added */
      {
        qid: "M2.S4.T6.C20:2",
        kind: "diff",
        near: 58448,
        winMs: 6400,
        ask: "How many more?",
        answer: 15432,
        miss: "Does how many more ask you to join the towns, or to compare them?",
        say: "One town has 36,940 people, and another has 21,508. How many more people has the first town?"
      }
    ]
  },
  {
    n: 2,
    concept: "Some numbers are printed to be left out",
    conceptId: "M2.S4.T6.C21",
    objectiveIds: ["O10"],
    says: ["One of these numbers has no job here. Which one?", "Drag the number with no job into the grey bay. Bring the other two down to the mat."],
    /* tries, as the plan writes it: first rung the item's; second the phase's; third: one sentence at a time, each number judged on its own */
    ladder: ["Does this number help to answer it?", "Read one sentence at a time. Does its number answer your question card?"],
    closing: "Work out what is being asked first. Bring down only the numbers that answer it, and leave the spare one standing.",
    learned: "You learned: bring down only the numbers the question needs.",
    traceback: "The right question card goes up; the number with no job flies back into its sentence and turns grey with its outline kept; the two needed numbers stand on the mat, the greater on top, and are taken from the ones with each trade drawn; the answer sentence is written back.",
    items: [
      /* learn ML2: answer in the plan = 2,173 passengers, and the number of coaches is not needed. near: the 24 coaches taken off too */
      {
        qid: "M2.S4.T6.C21:ML2",
        kind: "spare",
        near: 2149,
        winMs: 6800,
        ask: "Not children?",
        answer: 2173,
        miss: "Do the coaches tell you anything about who was riding?",
        say: "A train with 24 coaches carried 3,845 passengers, and 1,672 of them were children. How many were not children?"
      },
      /* practice 3: answer in the plan = 715 trips, and the distance is not needed. near: the 15 km taken off too */
      {
        qid: "M2.S4.T6.C21:3",
        kind: "spare",
        near: 700,
        winMs: 6800,
        ask: "More trips?",
        answer: 715,
        miss: "Does the distance to the town change how many trips ran?",
        say: "A depot 15 km from the town ran 2,640 trips in March, and 1,925 trips in April. How many more trips ran in March?"
      },
      /* practice 4: answer in the plan = 13,111 tickets, and the number of chairs is not needed. near: the 500 chairs taken off too */
      {
        qid: "M2.S4.T6.C21:4",
        kind: "spare",
        near: 12611,
        winMs: 6800,
        ask: "Used later?",
        answer: 13111,
        miss: "What does your question card ask for?",
        say: "A hall with 500 chairs sold 24,318 tickets in a week. 11,207 of them were used on the first day. How many were used later?"
      }
    ]
  },
  {
    n: 3,
    concept: "Shrink the question until you can see it",
    conceptId: "M2.S4.T6.C22",
    objectiveIds: ["O9"],
    says: ["Try the same question with tiny numbers. What did you do to those?", "Pick the card that says what is asked. Then open the tiny version."],
    /* tries, as the plan writes it: first rung the item's; second the phase's; third: the tiny version already answered, only the copying across left */
    ladder: ["Which move did the tiny numbers need?", "Open the tiny version. Copy its move onto the big numbers."],
    closing: "An amount needed to reach a target is the target take away what is already there. Shrinking the numbers shows you why.",
    learned: "You learned: to reach a target, take what is there from the target.",
    traceback: "The right question card goes up; the tiny version opens and answers itself (4 and 3 more make 7, so 7 − 4 = 3); the same move goes onto the real numbers with the target on top; the columns are worked across the zeros, each zero opening a ten; the answer is added back to show the target, and written as a sentence.",
    items: [
      /* learn ML3: answer in the plan = 37,360. near: the two added because the question says added */
      {
        qid: "M2.S4.T6.C22:ML3",
        kind: "reach",
        near: 142640,
        winMs: 9e3,
        ask: "What to add?",
        answer: 37360,
        miss: "Added to 52,640, your number should make 90,000. Would it?",
        say: "Here is 52,640. What should be added to it to make 90,000?"
      },
      /* practice 5: answer in the plan = 15,328. near: the two added */
      {
        qid: "M2.S4.T6.C22:5",
        kind: "reach",
        near: 44672,
        winMs: 9e3,
        ask: "What to add?",
        answer: 15328,
        miss: "What would this question look like with single digit numbers?",
        say: "Here is 14,672. What should be added to it to make 30,000?"
      },
      /* practice 6: answer in the plan = 12,484 bricks. near: the two added */
      {
        qid: "M2.S4.T6.C22:6",
        kind: "reach",
        near: 67516,
        winMs: 9e3,
        ask: "Bricks to buy?",
        answer: 12484,
        miss: "Can the bricks to buy be more than the builder needs?",
        say: "A builder needs 40,000 bricks, and already has 27,516. How many more must be bought?"
      }
    ]
  },
  {
    n: 4,
    concept: "Two steps need an order",
    conceptId: "M2.S4.T6.C23",
    objectiveIds: ["O10"],
    says: ["Two steps here. Which one has to happen first, and why?", "Tap the step that comes first. Then tap it again to work it."],
    /* tries, as the plan writes it: first rung the item's; second the phase's; third: the first step alone, the second locked */
    ladder: ["Which of the two could you do right now with the numbers that are printed?", "Work the first step alone. Then use its answer in the second."],
    closing: "Decide the order of two steps before working either one. Bought together for less? Add first. Priced above another? Take away first.",
    learned: "You learned: decide the order of two steps before working either.",
    traceback: "The two steps are laid in their right order; if the answer given matches another route (the two prices compared, the printed numbers added at once, the payment added), that route is written under the mat in ink, beside the right one; the bay works the first step in its own columns and builds its card with a drawn edge (for the payment and the balance, whose steps need nothing from each other, the first is set out and its result filled in last); the second step's two numbers come down onto the mat and are worked from the ones; the answer sentence is written back.",
    items: [
      /* learn ML4: answer in the plan = Rs 790. near: the chair's price taken off the table's (the two prices compared) */
      {
        qid: "M2.S4.T6.C23:ML4",
        kind: "two",
        near: 4220,
        winMs: 9e3,
        ask: "Money saved?",
        answer: 790,
        miss: "Taking one price off the other shows which is dearer. Is that the saving?",
        say: "A table costs ₹7,480, and a chair costs ₹3,260. The two together are sold for ₹9,950. How much is saved?"
      },
      /* practice 7: answer in the plan = Rs 42,220, because the washing machine costs Rs 17,870. near: the two printed numbers added */
      {
        qid: "M2.S4.T6.C23:7",
        kind: "two",
        near: 30830,
        winMs: 9e3,
        ask: "Cost together?",
        answer: 42220,
        miss: "Is ₹24,350 the fridge's price, or the washing machine's?",
        say: "A fridge costs ₹24,350, which is ₹6,480 more than a washing machine. What do the two cost together?"
      },
      /* practice 8: answer in the plan = the payment was Rs 47,600 and the balance at the end is Rs 34,408: two answers,
         one box each. Neither step needs the other's answer, so either order stands; the bay sets the first out with its
         result open. near: the payment found by adding, because it "came in" */
      {
        qid: "M2.S4.T6.C23:8",
        kind: "two",
        near: [90216, 34408],
        winMs: 9600,
        ask: "Payment and balance?",
        answer: [47600, 34408],
        parts: [{ label: "Payment" }, { label: "Balance" }],
        miss: "What are your two steps, said in words?",
        say: "An account held ₹21,308. After a payment came in, the balance was ₹68,908. Then ₹34,500 was spent. Find the payment, and the balance at the end."
      }
    ]
  }
];
const MODEL = {
  mat: {
    columns: ["L", "TTh", "Th", "H", "T", "O"],
    alignsBy: "the right hand end (ones under ones)",
    rows: ["the greater number", "the number taken away"],
    greaterOnTop: "a smaller number over a greater one does not settle; the two swap under a finger",
    trade: "a lending digit is struck once in ink, its new value written above in rose, and the ten it lends travels (vermilion) into the next column"
  },
  questionCards: SD_CARDS.map((c) => c[1]),
  questionCardFirst: "in phases 1 to 3 no number card lifts until a card that says what is asked is picked; in phase 4 none lifts until the first step is worked",
  problems: Object.keys(SD_PROBS).map((k) => {
    const p = SD_PROBS[k], v = sdRecipe(p);
    return {
      qid: k,
      asks: (p.right || []).map((r) => (SD_CARDS.find((c) => c[0] === r) || [])[1]),
      top: v[p.need[0]],
      takeAway: v[p.need[1]],
      operation: sdMatOp(p),
      spare: p.spare ? v[p.spare] : null,
      tiny: p.tiny ? { have: p.tiny[0], target: p.tiny[1], move: p.tiny[1] + " − " + p.tiny[0] } : null,
      steps: p.steps ? p.steps.map((s) => ({ step: s.label, working: v[s.a] + (s.op === "+" ? " + " : " − ") + v[s.b], builds: s.out ? v[s.out] : null })) : null,
      answerSentence: p.tell
    };
  })
};
const judge = (item, v) => item.parts ? judgeSlotParts(item, v) : leadNumber(v) === item.answer;
const sdAddStr = (a, b) => {
  let out = "", c = 0;
  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0 || c; i--, j--) {
    const s = (i >= 0 ? a.charCodeAt(i) - 48 : 0) + (j >= 0 ? b.charCodeAt(j) - 48 : 0) + c;
    out = String(s % 10) + out;
    c = s > 9 ? 1 : 0;
  }
  return out.replace(/^0+(?=\d)/, "");
};
const sdSubStr = (a, b) => {
  let out = "", owe = 0;
  for (let i = a.length - 1, j = b.length - 1; i >= 0; i--, j--) {
    let d = a.charCodeAt(i) - 48 - owe - (j >= 0 ? b.charCodeAt(j) - 48 : 0);
    owe = d < 0 ? 1 : 0;
    if (d < 0) d += 10;
    out = String(d) + out;
  }
  const r = out.replace(/^0+(?=\d)/, "");
  return owe || sdAddStr(r, b) !== a.replace(/^0+(?=\d)/, "") ? "NaN" : r;
};
const sdSayNums = (s) => (String(s).match(/\d{1,3}(?:,\d{2,3})+|\d+/g) || []).map((x) => x.replace(/,/g, ""));
const SD_ROUTE = {
  "M2.S4.T6.C20:ML1": (p) => sdSubStr(p[0], p[1]),
  "M2.S4.T6.C20:1": (p) => sdSubStr(p[0], p[1]),
  "M2.S4.T6.C20:2": (p) => sdSubStr(p[0], p[1]),
  "M2.S4.T6.C21:ML2": (p) => sdSubStr(p[1], p[2]),
  /* the 24 coaches have no job */
  "M2.S4.T6.C21:3": (p) => sdSubStr(p[1], p[2]),
  /* the 15 km have no job */
  "M2.S4.T6.C21:4": (p) => sdSubStr(p[1], p[2]),
  /* the 500 chairs have no job */
  "M2.S4.T6.C22:ML3": (p) => sdSubStr(p[1], p[0]),
  /* the target less what is there */
  "M2.S4.T6.C22:5": (p) => sdSubStr(p[1], p[0]),
  "M2.S4.T6.C22:6": (p) => sdSubStr(p[0], p[1]),
  "M2.S4.T6.C23:ML4": (p) => sdSubStr(sdAddStr(p[0], p[1]), p[2]),
  /* add the prices first, then take off the price paid */
  "M2.S4.T6.C23:7": (p) => sdAddStr(p[0], sdSubStr(p[0], p[1])),
  /* take away first to find the cheaper one, then add */
  "M2.S4.T6.C23:8": (p) => sdSubStr(p[1], p[0]) + "|" + sdSubStr(p[1], p[2])
  /* the payment, and the balance */
};
const oracle = () => PHASES.every((p) => p.items.every((it) => {
  const route = SD_ROUTE[it.qid];
  if (!route) return false;
  const pr = SD_PROBS[it.qid], toks = sdToks(pr);
  const str = {};
  toks.forEach((t) => {
    str[t.id] = String(t.v);
  });
  (pr.steps || []).forEach((st) => {
    if (st.out) str[st.out] = st.op === "+" ? sdAddStr(str[st.a], str[st.b]) : sdSubStr(str[st.a], str[st.b]);
  });
  const work = (a, b, op) => op === "+" ? sdAddStr(str[a], str[b]) : sdSubStr(str[a], str[b]);
  const byBoard = pr.anyOrder ? pr.steps.slice().sort((x, y) => x.part - y.part).map((st) => work(st.a, st.b, st.op)).join("|") : work(pr.need[0], pr.need[1], sdMatOp(pr));
  const want = Array.isArray(it.answer) ? it.answer.join("|") : String(it.answer);
  return route(sdSayNums(it.say)) === want && byBoard === want && sdSayNums(it.say).length === toks.length;
}));
const nearMiss = (item) => item.parts ? item.near.join("|") : item.near;
const answerForms = (item) => (item.parts ? item.answer : [item.answer]).flatMap((x) => [String(x), indian(x), words(x)]);
const agentKey = (item) => item.answer;
const solve = (item, T2) => T2.submit(item.answer);
const answer = () => void 0;
const check = () => void 0;
const sdFormat = (typed) => /^\d{4,9}$/.test(String(typed != null ? typed : "")) ? indian(Number(typed)) : String(typed != null ? typed : "");
const SDB = { pad: 4, line: 74, q: 48, gap: 12, cardMin: 132, left: 16 };
const SDM = { margin: 160, col: 74, head: 34, strip: 32, row: 46, w: 616 };
const SDR = { x: 640, w: 446 };
const SD_COLS = ["L", "TTh", "Th", "H", "T", "O"];
const SD_BLUE = shade(CONTENT.hundred, 0.25);
const SD_AMBER = CONTENT.ten;
const SD_AMBER_INK = shade(CONTENT.ten, 0.4);
const SD_GREEN = shade(CONTENT.one, 0.25);
const SD_VERM = shade(CONTENT.pointer, 0.25);
const SD_ROSE = shade(CONTENT.bead, 0.25);
const SD_GREY = "#767676";
const sdColX = (k) => SDM.margin + (5 - k) * SDM.col;
const sdColC = (k) => sdColX(k) + SDM.col / 2;
const sdBayC = (k) => SDR.x + SDR.w - 50 - k * 44;
const sdDigits = (v, len) => Array.from({ length: len }, (_, k) => Math.floor(v / Math.pow(10, k)) % 10);
let sdCtx = null;
const sdMeasure = (s, size, weight = 500) => {
  try {
    if (!sdCtx) sdCtx = window.document.createElement("canvas").getContext("2d");
    sdCtx.font = `${weight} ${size}px ${FONT}`;
    return Math.ceil(sdCtx.measureText(String(s)).width * 1.03);
  } catch (e) {
    return Math.ceil(String(s).length * size * 0.58);
  }
};
const sdCardText = (v, rs) => (rs ? "₹" : "") + indian(v);
const sdCardW = (v, rs) => Math.max(SDB.cardMin, sdMeasure(sdCardText(v, rs), T.label, 700) + 30);
const sdBoard = (pr, tx = (v) => v) => {
  let y = SDB.pad;
  const lines = pr.lines.map((ln) => {
    let x = SDB.left;
    const items = [];
    ln.forEach((tok) => {
      if (typeof tok === "string") {
        const text = tx(tok);
        if (items.length) x += /^[.,?।]/.test(text) ? 2 : SDB.gap;
        const w = sdMeasure(text, T.label, 500);
        items.push({ kind: "w", text, x, w });
        x += w;
      } else {
        if (items.length) x += SDB.gap;
        const w = sdCardW(tok.v, tok.rs);
        items.push({ kind: "card", tok, x, w });
        x += w;
      }
    });
    const out = { y, items, width: x };
    y += SDB.line;
    return out;
  });
  const qy = pr.free ? null : y;
  if (!pr.free) y += SDB.q;
  return { lines, qy, h: y + 4 };
};
const sdFresh = (item, free) => ({
  key: free || !item || !item.qid ? "free" : item.qid,
  picked: null,
  mat: [null, null],
  grey: [],
  strip: 0,
  tinyAdd: 0,
  order: [],
  early: false,
  bay: null,
  built: {},
  wk: null,
  hl: null,
  ten: null,
  told: null,
  addBack: false,
  lit: false,
  litLine: null,
  tip: null,
  fly: null,
  prompted: false,
  hoverSaid: false,
  opened: false,
  rival: null,
  eitherNote: false
});
const SD_CSS = `
.sd-in{animation:sdIn 320ms ease-out both}
@keyframes sdIn{from{transform:translateY(-26px);opacity:.25}to{transform:none;opacity:1}}
.sd-pop{transform-box:fill-box;transform-origin:center;animation:sdPop 300ms ease-out both}
@keyframes sdPop{from{transform:scale(.4);opacity:.2}to{transform:none;opacity:1}}
.sd-ten{animation:sdTen 380ms cubic-bezier(.3,.7,.25,1) both}
@keyframes sdTen{from{transform:translateX(-74px)}to{transform:none}}
.sd-fly{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.sd-tip{animation:sdTip 520ms ease-in-out both}
@keyframes sdTip{0%,100%{transform:none}25%{transform:translateX(-9px)}75%{transform:translateX(9px)}}
.sd-grab{cursor:grab}
.sd-hello{animation:sdHello 1300ms ease-in-out 250ms both}
@keyframes sdHello{0%,100%{transform:none}45%{transform:translateY(-12px)}}
@media (prefers-reduced-motion:reduce){.sd-in,.sd-pop,.sd-ten,.sd-tip,.sd-hello{animation:none}.sd-fly{transition:none}}
`;
function Work({ n, item, index, stage, wrong, api, lang = "en", tx = (v) => v }) {
  const C = api.C;
  const tl = useTimeline();
  const tb = useTimeline();
  const free = stage === "free";
  const [S, setS] = useState(() => sdFresh(item, free));
  const SR = useRef(S);
  const set = (s) => {
    SR.current = s;
    setS(s);
  };
  const put = (patch) => set({ ...SR.current, ...patch });
  const setupFor = useRef(index);
  const timers = useRef([]);
  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };
  const clearLater = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearLater, []);
  const reset = (it, fr) => {
    tl.stop();
    tb.stop();
    clearLater();
    set(sdFresh(it, fr));
  };
  useEffect(() => {
    if (free) return;
    if ((stage === "ask" || stage === "teach") && setupFor.current !== index) {
      setupFor.current = index;
      reset(item, false);
    }
  }, [stage, index]);
  useEffect(() => {
    if (free) {
      setupFor.current = -2;
      reset(null, true);
    }
  }, [free]);
  api.onEnter(null);
  const pr = sdProb(S.key);
  const kind = pr.free ? "free" : pr.steps ? "two" : pr.tiny ? "reach" : pr.spare ? "spare" : "diff";
  const board = sdBoard(pr, tx);
  const matTop = board.h + 8;
  const MR = board.lines.length === 1 && !pr.free ? { strip: 38, row: 62, size: T.xl, base: 48, ans: 56, cut: 36 } : { strip: SDM.strip, row: SDM.row, size: T.prompt, base: 36, ans: 42, cut: 27 };
  const rowTop = (r) => matTop + SDM.head + MR.strip + r * MR.row;
  const ruleY = rowTop(2) + 4;
  const ansBase = ruleY + MR.ans;
  const matH = ansBase + 14 - matTop;
  const bayTop = matTop + 164;
  const busy = tl.busy || tb.busy;
  const canAct = free || stage === "ask" && !busy;
  const tick = () => api.sfx.tick();
  const val = (s, id) => {
    if (!id) return null;
    const t = sdToks(pr).find((x) => x.id === id);
    if (t) return t.v;
    return s.built && s.built[id] !== void 0 ? s.built[id] : null;
  };
  const stepOf = (sid) => (pr.steps || []).find((x) => x.id === sid);
  const outStep = (id) => (pr.steps || []).find((x) => x.out === id);
  const isRs = (id) => {
    const t = sdToks(pr).find((x) => x.id === id);
    return t ? !!t.rs : !!outStep(id) && sdToks(pr).some((x) => x.rs);
  };
  const tagOf = (id) => {
    if (!id) return "";
    const t = sdToks(pr).find((x) => x.id === id);
    return t ? t.tag : outStep(id) ? outStep(id).tag : "";
  };
  const builtNow = (s) => kind === "two" && Object.keys(s.built).length > 0;
  const stepDone = (s) => kind === "two" && (builtNow(s) || !!s.opened);
  const opOf = (s) => stepDone(s) ? stepOf(s.order[1]).op : "-";
  const needOf = (s) => pr.anyOrder && s.order.length ? [stepOf(s.order[1]).a, stepOf(s.order[1]).b] : pr.need;
  const stepVal = (s, st) => {
    const a = val(s, st.a) || 0, b = val(s, st.b) || 0;
    return st.op === "+" ? a + b : a - b;
  };
  const byPart = () => (pr.steps || []).slice().sort((x, y) => x.part - y.part);
  const needsPick = kind === "diff" || kind === "spare" || kind === "reach";
  const cardLabel = (cid) => {
    const c = SD_CARDS.find((x) => x[0] === cid);
    return c ? c[1] : "";
  };
  const told2 = (total) => Array.isArray(total) ? total : [total];
  const tellOf = (total, l = "en") => {
    const t = told2(total), p = pr.anyOrder ? t[0] : pr.steps && pr.steps[0].out ? sdRecipe(pr)[pr.steps[0].out] : null;
    const tpl = String(pr.tell || "{n}"), own = l === "en" ? tpl : TR[l] && TR[l][tpl] || tpl;
    return own.replace("{n}", indian(t[t.length - 1])).replace("{p}", p === null ? "" : indian(p));
  };
  const tellSay = (total) => ({ en: tellOf(total), hi: tellOf(total, "hi"), gu: tellOf(total, "gu") });
  const routeVal = (r) => {
    const v = sdRecipe(pr);
    return r.op === "+" ? v[r.a] + v[r.b] : v[r.a] - v[r.b];
  };
  const routeRow = (r, right) => {
    const v = sdRecipe(pr);
    return { label: r.label, a: v[r.a], b: v[r.b], op: r.op, v: routeVal(r), right };
  };
  const rivalOf = (wv) => {
    if (wv === null || wv === void 0 || !pr.rivals || !item) return null;
    const got = item.parts ? slotPartsOf(wv, item.parts.length).map((x) => x === "" ? null : Number(x)) : [leadNumber(wv)];
    return pr.rivals.find((r) => got[item.parts ? r.part || 0 : 0] === routeVal(r)) || null;
  };
  const posOf = (id) => {
    if (outStep(id)) return { x: 946, y: bayTop + 118 };
    for (const ln of board.lines) for (const it of ln.items) if (it.tok && it.tok.id === id) return { x: it.x + it.w / 2, y: ln.y + 37 };
    return { x: 300, y: 60 };
  };
  const matPos = (r) => ({ x: sdColC(2), y: rowTop(r) + MR.row / 2 });
  const lineOf = (id) => board.lines.findIndex((ln) => ln.items.some((t) => t.tok && t.tok.id === id));
  const planner = (start, slow) => {
    const P = { sim: start, steps: [] };
    P.at = (ms, patch, fx) => {
      P.sim = { ...P.sim, ...patch };
      P.steps.push([Math.round(ms * slow), () => {
        put(patch);
        if (fx) fx();
      }]);
    };
    return P;
  };
  const subSteps = (P, a, b) => {
    const len = String(a).length, ansLen = String(a - b).length;
    const cur = sdDigits(a, len), bot = sdDigits(b, len);
    const tr = {}, diff = {};
    const snap = (ten = null) => ({ wk: { op: "-", tr: { ...tr }, diff: { ...diff }, carry: {} }, ten });
    for (let k = 0; k < len; k++) {
      P.at(260, { hl: k });
      if (cur[k] < bot[k]) {
        let j = k + 1;
        while (j < len && cur[j] === 0) j++;
        for (let m = j; m > k; m--) {
          cur[m] -= 1;
          tr[m] = cur[m];
          P.at(420, snap({ to: m - 1, n: P.steps.length }), tick);
          cur[m - 1] += 10;
          tr[m - 1] = cur[m - 1];
          P.at(300, snap());
        }
      }
      if (k < ansLen) diff[k] = cur[k] - bot[k];
      P.at(460, snap(), tick);
    }
    P.at(240, { hl: null });
  };
  const addSteps = (P, a, b) => {
    const tlen = String(a + b).length;
    const A = sdDigits(a, tlen), B = sdDigits(b, tlen);
    const carry = {}, diff = {};
    let c = 0;
    for (let k = 0; k < tlen; k++) {
      P.at(260, { hl: k });
      const t = A[k] + B[k] + c;
      diff[k] = t % 10;
      c = t > 9 ? 1 : 0;
      if (c) carry[k + 1] = 1;
      P.at(460, { wk: { op: "+", tr: {}, diff: { ...diff }, carry: { ...carry } } }, tick);
    }
    P.at(240, { hl: null });
  };
  const stripSteps = (P) => {
    const [have, goal] = pr.tiny;
    P.at(460, { strip: 1, tinyAdd: 0 }, tick);
    for (let i = 1; i <= goal - have; i++) P.at(380, { strip: 1, tinyAdd: i }, tick);
    P.at(520, { strip: 2, tinyAdd: goal - have });
  };
  const buildSteps = (P) => {
    const st = pr.steps[0], a = val(P.sim, st.a) || 0, b = val(P.sim, st.b) || 0;
    const c = st.op === "+" ? a + b : a - b;
    const bay = { a, b: null, op: st.op, c, shown: 0 };
    P.at(320, { bay, early: false });
    P.at(440, { bay: { ...bay, b } });
    const len = String(c).length;
    for (let k = 1; k <= len; k++) P.at(170, { bay: { ...bay, b, shown: k } }, k === len ? tick : void 0);
    P.at(420, { built: { [st.out]: c } }, tick);
  };
  const layFirst = (P) => {
    const st = stepOf(P.sim.order[0]), bay = { a: val(P.sim, st.a), b: null, op: st.op, c: null, shown: 0, tag: st.tag };
    P.at(320, { bay, early: false });
    P.at(440, { bay: { ...bay, b: val(P.sim, st.b) }, opened: true }, tick);
  };
  const fillFirst = (P) => {
    const st = stepOf(P.sim.order[0]), c = stepVal(P.sim, st), bay = { ...P.sim.bay, c, shown: 0 }, len = String(c).length;
    P.at(260, { bay });
    for (let k = 1; k <= len; k++) P.at(170, { bay: { ...bay, shown: k } }, k === len ? tick : void 0);
  };
  const plan = (slow, wrongVal) => {
    const start = { ...SR.current, fly: null, tip: null, lit: false, litLine: null, hl: null, ten: null };
    put({ fly: null, tip: null, lit: false, litLine: null, hl: null, ten: null });
    const P = planner(start, slow);
    const v = (id) => val(P.sim, id) || 0;
    if (needsPick && !P.sim.picked) {
      P.at(520, { lit: true });
      P.at(620, { picked: pr.right[0] }, tick);
      P.at(220, { lit: false });
    }
    if (kind === "two" && !stepDone(P.sim)) {
      const want = pr.steps.map((x) => x.id);
      if (pr.anyOrder ? !P.sim.order.length : P.sim.order.join() !== want.join()) P.at(560, { order: want, early: false, bay: null, eitherNote: !!pr.anyOrder }, tick);
      if (pr.anyOrder) layFirst(P);
      else buildSteps(P);
    }
    const rv = rivalOf(wrongVal);
    if (rv) P.at(900, { rival: [routeRow(rv, false)] }, tick);
    if (kind === "reach" && P.sim.strip < 2) stripSteps(P);
    const flyBack = (id, r) => {
      const a2 = matPos(r), b2 = posOf(id), mat = P.sim.mat.slice();
      mat[r] = null;
      P.at(40, { fly: { ...a2, v: v(id), rs: isRs(id) }, wk: null, told: null });
      P.at(480, { fly: { ...b2, v: v(id), rs: isRs(id) } });
      P.at(80, { fly: null, mat }, tick);
    };
    if (pr.spare) {
      const id = pr.spare, li = lineOf(id), r = P.sim.mat.indexOf(id);
      P.at(360, { litLine: li });
      if (r >= 0) flyBack(id, r);
      if (!P.sim.grey.includes(id)) P.at(480, { grey: [...P.sim.grey, id] }, tick);
      P.at(300, { litLine: null });
    }
    const need = needOf(P.sim);
    [0, 1].forEach((r) => {
      const id = P.sim.mat[r];
      if (id && !need.includes(id)) flyBack(id, r);
    });
    if (P.sim.mat[0] === need[1] || P.sim.mat[1] === need[0]) P.at(560, { mat: [P.sim.mat[1], P.sim.mat[0]], wk: null, told: null }, tick);
    [0, 1].forEach((r) => {
      const id = need[r];
      if (P.sim.mat[r] === id) return;
      const a2 = posOf(id), b2 = matPos(r), mat = P.sim.mat.slice();
      mat[r] = id;
      P.at(40, { fly: { ...a2, v: v(id), rs: isRs(id), built: !!outStep(id) }, grey: P.sim.grey.filter((g) => g !== id) });
      P.at(460, { fly: { ...b2, v: v(id), rs: isRs(id), built: !!outStep(id) } });
      P.at(60, { fly: null, mat, wk: null, told: null }, tick);
    });
    if (P.sim.wk) P.at(260, { wk: null, told: null, addBack: false });
    const a = v(need[0]), b = v(need[1]), op2 = opOf(P.sim);
    if (op2 === "+") addSteps(P, a, b);
    else subSteps(P, a, b);
    let total = op2 === "+" ? a + b : a - b;
    if (pr.anyOrder) {
      fillFirst(P);
      total = byPart().map((st) => stepVal(P.sim, st));
    }
    P.at(420, { told: total, addBack: kind === "reach", ...rv ? { rival: [routeRow(rv, false), routeRow(rv.right, true)] } : {} });
    return { steps: P.steps, total };
  };
  const nudge = () => {
    api.say("First pick the card that says what is asked.");
    put({ lit: true });
    later(() => put({ lit: false }), 1500);
  };
  const nudgeSteps = () => {
    const s = SR.current;
    if (s.order.length) api.say("Work the first step before the second. Tap it.");
    else api.say("First tap the step that comes first.");
  };
  const afterPick = () => {
    if (kind === "spare") return api.say(["Drag the number with no job into the grey bay.", "Bring the other two down to the mat."]);
    if (kind === "reach") return api.say("Open the tiny version. Then bring the two numbers down.");
    return api.say("Now bring its two numbers down to the mat.");
  };
  const pick = (cid) => {
    const s = SR.current;
    if (!canAct || s.picked) return;
    if (pr.right.includes(cid)) {
      put({ picked: cid, lit: false, tip: null });
      tick();
      afterPick();
      return;
    }
    put({ tip: cid, lit: true });
    api.say("Read the last line again. Does it ask that?");
    later(() => put({ tip: null, lit: false }), 1400);
  };
  const settled = (s, mat) => {
    const [a, b] = mat.map((id) => val(s, id));
    if (a === null || b === null || free) return;
    if (opOf(s) === "-" && a < b) {
      if (!s.hoverSaid) {
        put({ hoverSaid: true });
        api.say("The smaller number cannot go on top. Swap them.");
      }
      return;
    }
    if (!s.prompted) {
      put({ prompted: true });
      const then = item && item.parts ? "Then type both answers, one in each box." : "Then type the answer.";
      api.say([opOf(s) === "+" ? "Add the columns from the ones." : "Take the lower number off the top one, from the ones.", then]);
    }
  };
  const lift = (id, row) => {
    const s = SR.current;
    if (!canAct) return;
    if (needsPick && !s.picked) return nudge();
    if (kind === "two" && !stepDone(s)) return nudgeSteps();
    if (val(s, id) === null) return;
    const mat = s.mat.slice(), at = mat.indexOf(id);
    if (row === void 0 || row === at) {
      if (at >= 0) return;
      const r = mat[0] === null ? 0 : mat[1] === null ? 1 : -1;
      if (r < 0) {
        if (kind === "spare") api.say("The mat holds two numbers. Which one has no job?");
        else api.say("The mat holds two numbers. Put one back first.");
        return;
      }
      mat[r] = id;
    } else {
      if (at >= 0) mat[at] = null;
      const other = 1 - row;
      if (mat[row] !== null && mat[other] === null) mat[other] = mat[row];
      mat[row] = id;
    }
    put({ mat, grey: s.grey.filter((g) => g !== id), wk: null, told: null, hl: null, addBack: false });
    tick();
    settled(SR.current, mat);
  };
  const back = (id) => {
    const s = SR.current;
    if (!canAct || !s.mat.includes(id)) return;
    put({ mat: s.mat.map((m) => m === id ? null : m), wk: null, told: null, hl: null, addBack: false });
    tick();
  };
  const swapRows = () => {
    const s = SR.current;
    if (!canAct) return;
    const mat = [s.mat[1], s.mat[0]];
    put({ mat, wk: null, told: null, hl: null });
    tick();
    settled(SR.current, mat);
  };
  const greyOut = (id) => {
    const s = SR.current;
    if (!canAct) return;
    if (needsPick && !s.picked) return nudge();
    const off = s.mat.includes(id) ? { mat: s.mat.map((m) => m === id ? null : m), wk: null, told: null, hl: null } : {};
    put({ grey: [...s.grey.filter((g) => g !== id), id], ...off });
    tick();
  };
  const unGrey = (id) => {
    const s = SR.current;
    if (canAct) {
      put({ grey: s.grey.filter((g) => g !== id) });
      tick();
    }
  };
  const openStrip = () => {
    const s = SR.current;
    if (!canAct || s.strip > 0 || !pr.tiny) return;
    const P = planner({ ...s }, 1);
    stripSteps(P);
    tb.run(P.steps, () => api.say(["What did you do to the tiny numbers?", "Do the same to the big ones."]));
  };
  const chooseFirst = (sid) => {
    const s = SR.current;
    if (!canAct || s.order.length) return;
    const other = pr.steps.find((x) => x.id !== sid).id;
    put({ order: [sid, other], early: false, eitherNote: !!pr.anyOrder });
    tick();
    if (pr.anyOrder) api.say(["Neither step needs the other's answer, so either can go first.", "Tap the first step to set it out."]);
    else api.say("Tap the first step to work it. Tap the second to swap them.");
  };
  const swapSteps = () => {
    const s = SR.current;
    if (!canAct || stepDone(s) || s.order.length < 2) return;
    put({ order: [s.order[1], s.order[0]], early: false });
    tick();
  };
  const workFirst = () => {
    const s = SR.current;
    if (!canAct || stepDone(s) || !s.order.length) return;
    if (!pr.anyOrder && s.order[0] !== pr.steps[0].id) {
      put({ early: true });
      api.say(pr.early.say);
      return;
    }
    const P = planner({ ...s }, 1);
    if (pr.anyOrder) layFirst(P);
    else buildSteps(P);
    tb.run(P.steps, () => {
      if (pr.anyOrder) api.say(["Work this one out, and type it in its box.", "The second step is open. Bring its two numbers down to the mat."]);
      else api.say(["The second step is open.", "Bring its two numbers down to the mat."]);
    });
  };
  const drag = useDrag((pay, p, moved) => {
    const s = SR.current;
    if (!canAct) return;
    if (!moved) {
      if (s.grey.includes(pay.id)) return unGrey(pay.id);
      return lift(pay.id);
    }
    const overMat = p.x < SDR.x - 8 && p.y > matTop - 12;
    const overRight = p.x > SDR.x - 16 && p.y > matTop - 12;
    if (overMat) return lift(pay.id, p.y < rowTop(1) ? 0 : 1);
    if (overRight && (kind === "spare" || kind === "free") && pay.src === "num") return greyOut(pay.id);
  });
  const keysFor = (pay) => {
    const k = drag.keys(pay);
    return { onKeyDown: (e) => {
      if ((kind === "spare" || kind === "free") && e.key === "Delete") {
        e.preventDefault();
        e.stopPropagation();
        greyOut(pay.id);
        return;
      }
      k.onKeyDown(e);
    } };
  };
  useEffect(() => {
    if (stage !== "win" || free) return;
    tb.stop();
    clearLater();
    const s = SR.current;
    if (s.told !== null && s.told !== void 0) {
      api.say(tellSay(s.told));
      return;
    }
    const r = plan(0.5, null);
    tl.run(r.steps, () => api.say(tellSay(r.total)));
  }, [stage]);
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    tb.stop();
    clearLater();
    api.lock(true);
    const r = plan(1, wrong.value);
    tl.run([[350, () => {
    }], ...r.steps, [300, () => {
    }]], () => api.lock(false));
  }, [wrong]);
  const matKey = S.mat.join(",");
  useEffect(() => {
    if (!free) return;
    const s = SR.current;
    const [a, b] = s.mat.map((id) => val(s, id));
    if (a === null || b === null || a < b) {
      tl.stop();
      put({ wk: null, hl: null, ten: null });
      return;
    }
    const P = planner({ ...s, wk: null }, 0.7);
    P.at(200, { wk: null, hl: null, ten: null });
    subSteps(P, a, b);
    tl.run(P.steps);
  }, [matKey, free]);
  const told = S.told !== null && S.told !== void 0;
  api.share({
    phase: n,
    problem: pr.free ? "free" : item && item.qid || null,
    questionCard: kind === "two" ? S.order.length ? stepOf(S.order[0]).label + ", then " + stepOf(S.order[1]).label.toLowerCase() : null : S.picked ? cardLabel(S.picked) : null,
    liftedNumbers: S.mat.filter(Boolean).map((id) => val(S, id)),
    dimmed: S.grey.map((id) => val(S, id)),
    shrunk: kind === "reach" ? S.strip >= 2 ? pr.tiny[1] + " − " + pr.tiny[0] : S.strip ? "open" : "shut" : null,
    builtAmount: kind === "two" && builtNow(S) ? S.built[pr.steps[0].out] : null,
    stepOrder: kind === "two" ? S.order.map((sid) => stepOf(sid).label) : null,
    answerSentence: told ? tellOf(S.told) : null,
    complete: stage === "idle"
  });
  const cardArt = (cx, cy, v, o = {}) => {
    const w = sdCardW(v, !!o.rs);
    return <g filter={o.grey ? void 0 : o.lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
        <rect
      x={cx - w / 2}
      y={cy - 28}
      width={w}
      height={56}
      rx={14}
      fill={o.grey ? "#ECECEC" : "#FFFFFF"}
      stroke={o.grey ? SD_GREY : o.built ? C.accent : C.rule}
      strokeWidth={o.built ? 3 : 2}
      strokeDasharray={o.grey ? "7 5" : void 0}
    />
        {o.built && <rect x={cx - w / 2 + 6} y={cy - 22} width={w - 12} height={44} rx={10} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="6 5" />}
        <text x={cx} y={cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={o.grey ? SD_GREY : C.ink}>{sdCardText(v, !!o.rs)}</text>
      </g>;
  };
  const piece = (it, ln) => {
    const t = it.tok, id = t.id, y = ln.y, v = t.v;
    if (S.mat.includes(id)) {
      return <g key={"piece-" + id}>
          <line x1={it.x + 22} y1={y + 56} x2={it.x + it.w - 22} y2={y + 56} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />
          {canAct && <Hit id={"back-" + id} label={"Put " + sdCardText(v, t.rs) + " back"} x={it.x} y={y + 1} w={it.w} h={72} onPress={() => back(id)} />}
        </g>;
    }
    const grey = S.grey.includes(id), pay = { src: "num", id };
    return <g
      key={"piece-" + id}
      className={canAct ? "c4-piece sd-grab" : ""}
      {...canAct ? { ...control("num-" + id, (grey ? "Turned down: " : "Number ") + sdCardText(v, t.rs)), ...drag.bind(pay), ...keysFor(pay) } : {}}
    >
        {cardArt(it.x + it.w / 2, y + 37, v, { grey, rs: t.rs })}
        <rect x={it.x} y={y + 1} width={it.w} height={72} fill="transparent" />
      </g>;
  };
  const sentenceText = (x, y, total) => {
    const segs = [];
    let rest = tellOf(total, lang);
    told2(total).forEach((t) => {
      const num = indian(t), at = rest.indexOf(num);
      if (at < 0) return;
      if (at > 0) segs.push([rest.slice(0, at), false]);
      segs.push([num, true]);
      rest = rest.slice(at + num.length);
    });
    if (rest) segs.push([rest, false]);
    return <text key={"told-" + told2(total).join("-")} className="sd-in" x={x} y={y} fontSize={T.label} fontWeight={500} fill={C.ink}>
        {segs.map((g, k) => <tspan key={k} fontWeight={g[1] ? 700 : 500} fill={g[1] ? SD_GREEN : C.ink}>{g[0]}</tspan>)}
      </text>;
  };
  const drawBoard = () => {
    const q = pr.q ? tx(pr.q) : null;
    const qW = q ? sdMeasure(q, T.label, 600) : 0;
    return <g data-role="reading">
        <rect x={0} y={0} width={W.w} height={board.h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
        {board.lines.map((ln, li) => <g key={li}>
            {(S.litLine === li || S.lit && !pr.q && li === 0) && <rect x={SDB.left - 6} y={ln.y + 67} width={ln.width - SDB.left + 12} height={6} rx={3} fill={SD_AMBER} />}
            {ln.items.map((it, k) => it.kind === "w" ? <text key={"word-" + k} x={it.x} y={ln.y + 48} fontSize={T.label} fontWeight={500} fill={C.ink}>{it.text}</text> : piece(it, ln))}
          </g>)}
        {board.qy !== null && !told && S.lit && pr.q && <rect x={SDB.left - 8} y={board.qy + 4} width={qW + 16} height={42} rx={12} fill={tint(SD_AMBER, 0.65)} />}
        {board.qy !== null && (told ? sentenceText(SDB.left, board.qy + 34, S.told) : q ? <text x={SDB.left} y={board.qy + 34} fontSize={T.label} fontWeight={600} fill={C.ink}>{q}</text> : null)}
      </g>;
  };
  const mv = [0, 1].map((r) => val(S, S.mat[r]));
  const op = opOf(S);
  const hover = !told && op === "-" && mv[0] !== null && mv[1] !== null && mv[0] < mv[1];
  const wk = S.wk;
  const drawRow = (r) => {
    const id = S.mat[r];
    if (!id) {
      return <rect key={"e" + r} x={sdColX(4) - 4} y={rowTop(r) + 5} width={SDM.col * 5 + 4} height={MR.row - 10} rx={8} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />;
    }
    const v = val(S, id) || 0, ds = String(v).split("").reverse(), y = rowTop(r), lift2 = hover && r === 0 ? -7 : 0;
    const base = y + MR.base + lift2, fill = r === 0 ? SD_BLUE : SD_AMBER_INK, built = !!outStep(id);
    return <g key={"row-" + id + "-" + r} className="sd-in">
        {built && <rect x={sdColX(ds.length - 1) + 3} y={y + 5 + lift2} width={ds.length * SDM.col - 6} height={MR.row - 10} rx={10} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray="6 5" />}
        {!hover && <text x={12} y={y + MR.base - 4} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(id))}</text>}
        {ds.map((d, k) => {
      const struck = r === 0 && wk && wk.tr && wk.tr[k] !== void 0;
      return <g key={k}>
              <text x={sdColC(k)} y={base} textAnchor="middle" fontSize={MR.size} fontWeight={700} fill={d === "0" ? SD_GREY : fill}>{d}</text>
              {struck && <line x1={sdColC(k) - 17} y1={base - 3} x2={sdColC(k) + 17} y2={base - MR.cut} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
            </g>;
    })}
      </g>;
  };
  const drawMat = () => <g>
      <rect x={0} y={matTop} width={SDM.w} height={matH} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {S.hl !== null && <rect x={sdColX(S.hl) + 2} y={matTop + 2} width={SDM.col - 4} height={matH - 4} rx={10} fill={SD_AMBER} fillOpacity={0.13} />}
      {[0, 1, 2, 3, 4, 5, 6].map((k) => {
    const x = k === 6 ? sdColX(5) : sdColX(k) + SDM.col;
    return <line key={"v" + k} x1={x} y1={matTop + SDM.head} x2={x} y2={ansBase + 8} stroke={tint(C.rule, 0.35)} strokeWidth={1.5} />;
  })}
      {SD_COLS.map((h, j) => {
    const k = 5 - j, lit = S.hl === k;
    return <g key={h}>
            <rect
      x={sdColX(k) + 3}
      y={matTop + 4}
      width={SDM.col - 6}
      height={28}
      rx={8}
      fill={lit ? tint(SD_AMBER, 0.55) : tint(C.panel, 0.35)}
      stroke={lit ? SD_AMBER : "none"}
      strokeWidth={lit ? 3 : 0}
    />
            <text x={sdColC(k)} y={matTop + 27} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(h)}</text>
          </g>;
  })}
      {
    /* the trade strip: a traded digit's new value in rose; the ten travelling in, vermilion; a carry, vermilion */
  }
      {wk && Object.keys(wk.tr || {}).map((ks) => {
    const k = Number(ks);
    if (S.ten && S.ten.to === k) return null;
    return <text key={"t" + k + "-" + wk.tr[k]} className="sd-pop" x={sdColC(k)} y={matTop + SDM.head + MR.strip - 5} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SD_ROSE}>{wk.tr[k]}</text>;
  })}
      {S.ten && <text key={"ten-" + S.ten.n} className="sd-ten" x={sdColC(S.ten.to)} y={matTop + SDM.head + MR.strip - 5} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SD_VERM}>10</text>}
      {wk && Object.keys(wk.carry || {}).map((ks) => <text key={"c" + ks} className="sd-pop" x={sdColC(Number(ks))} y={matTop + SDM.head + MR.strip - 5} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SD_VERM}>1</text>)}
      {hover && <rect x={sdColX(4) - 8} y={rowTop(0) - 4} width={SDM.col * 5 + 12} height={MR.row * 2 + 4} rx={12} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray="8 6" />}
      {drawRow(0)}
      {drawRow(1)}
      <text x={sdColC(5)} y={rowTop(1) + MR.base} textAnchor="middle" fontSize={MR.size} fontWeight={700} fill={C.ink}>{op === "+" ? "+" : "−"}</text>
      <rect x={sdColX(5)} y={ruleY} width={SDM.col * 6} height={4} rx={2} fill={C.ink} />
      {wk && Object.keys(wk.diff || {}).map((ks) => {
    const k = Number(ks), d = wk.diff[k], last = Object.keys(wk.diff).length - 1;
    return <text
      key={"d" + k + "-" + d}
      className="sd-pop"
      x={sdColC(k)}
      y={ansBase}
      textAnchor="middle"
      fontSize={MR.size}
      fontWeight={700}
      fill={d === 0 && k < last ? SD_GREY : SD_GREEN}
    >{d}</text>;
  })}
      {hover && canAct && <g>
          <circle cx={48} cy={rowTop(1)} r={30} fill="url(#gKey)" stroke={C.rule} strokeWidth={2} />
          <path
    d={`M ${38} ${rowTop(1) + 14} V ${rowTop(1) - 12} M ${30} ${rowTop(1) - 4} L ${38} ${rowTop(1) - 14} L ${46} ${rowTop(1) - 4}`}
    fill="none"
    stroke={C.ink}
    strokeWidth={3.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
          <path
    d={`M ${58} ${rowTop(1) - 14} V ${rowTop(1) + 12} M ${50} ${rowTop(1) + 4} L ${58} ${rowTop(1) + 14} L ${66} ${rowTop(1) + 4}`}
    fill="none"
    stroke={C.ink}
    strokeWidth={3.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
          <Hit id="swap-rows" label="Swap the two numbers" x={12} y={rowTop(1) - 36} w={72} h={72} onPress={swapRows} />
          <Invite x={48} y={rowTop(1)} r={40} C={C} />
        </g>}
    </g>;
  const qCard = (label, y, key, badge = "?") => {
    const size = sdMeasure(label, T.label, 500) <= SDR.w - 100 ? T.label : T.micro;
    return <g key={key}>
        <rect x={SDR.x} y={y} width={SDR.w} height={72} rx={RAD.key} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
        <circle cx={SDR.x + 38} cy={y + 36} r={21} fill={C.accent} />
        <text x={SDR.x + 38} y={y + 46} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{badge}</text>
        <text x={SDR.x + 74} y={y + 36 + size * 0.36} fontSize={size} fontWeight={600} fill={C.ink}>{label}</text>
      </g>;
  };
  const greyBay = (y) => <g key="grey-bay">
      <rect x={SDR.x} y={y} width={SDR.w} height={140} rx={RAD.panel} fill="#FFFFFF" stroke={SD_GREY} strokeWidth={2.5} strokeDasharray="10 8" />
      <text x={SDR.x + SDR.w / 2} y={y + 80} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={SD_GREY}>{tx("no job")}</text>
    </g>;
  const drawStrip = (y) => {
    const [have, goal] = pr.tiny;
    if (S.strip === 0) {
      return <g key="strip-shut">
          <Key id="tiny" label={tx("Try it with tiny numbers")} x={SDR.x} y={y} w={SDR.w} h={80} C={C} disabled={!canAct} onClick={openStrip}>
            {[0, 1, 2].map((i) => <circle key={i} cx={-SDR.w / 2 + 34 + i * 20} cy={0} r={10 - i * 3} fill={C.accent} />)}
            <text x={-SDR.w / 2 + 96} y={11} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Tiny numbers")}</text>
          </Key>
          {canAct && !hover && <Invite x={SDR.x + 54} y={y + 40} r={40} C={C} />}
        </g>;
    }
    const pitch = Math.min(52, Math.floor((SDR.w - 40) / goal)), x0 = SDR.x + (SDR.w - pitch * goal) / 2 + pitch / 2;
    const eq = (parts, yy, size) => {
      const gap = 14, ws = parts.map((p) => sdMeasure(String(p[0]), size, 700));
      let x = SDR.x + (SDR.w - (ws.reduce((a, b) => a + b, 0) + gap * (parts.length - 1))) / 2;
      return parts.map((p, i) => {
        const el = <text key={i} x={x + ws[i] / 2} y={yy} textAnchor="middle" fontSize={size} fontWeight={700} fill={p[1]}>{p[0]}</text>;
        x += ws[i] + gap;
        return el;
      });
    };
    return <g key="strip" data-role="reading">
        <rect x={SDR.x} y={y} width={SDR.w} height={528 - y} rx={RAD.panel} fill="#FFFFFF" stroke={C.accent} strokeWidth={2.5} />
        {eq([[have, SD_AMBER_INK], ["+", C.ink], ["?", C.ink], ["=", C.ink], [goal, SD_BLUE]], y + 44, T.label)}
        {Array.from({ length: goal }).map((_, i) => {
      const cx = x0 + i * pitch, cy = y + 100;
      if (i < have) return <Disc key={i} x={cx} y={cy} r={19} paint="gTen" />;
      if (i < have + S.tinyAdd) return <g key={i} className="sd-pop"><Disc x={cx} y={cy} r={19} paint="gOne" /></g>;
      return <circle key={i} cx={cx} cy={cy} r={19} fill="none" stroke={CONTENT.hundred} strokeWidth={2.5} strokeDasharray="5 4" />;
    })}
        {S.strip >= 2 && <g className="sd-in">{eq([[goal, SD_BLUE], ["−", C.ink], [have, SD_AMBER_INK], ["=", C.ink], [goal - have, SD_GREEN]], y + 176, T.label)}</g>}
        {S.addBack && told && (() => {
      const v = sdRecipe(pr);
      return <g className="sd-in">{eq([[indian(S.told), SD_GREEN], ["+", C.ink], [indian(v[pr.need[1]]), SD_AMBER_INK], ["=", C.ink], [indian(v[pr.need[0]]), SD_BLUE]], y + 246, T.micro)}</g>;
    })()}
      </g>;
  };
  const lock = (x, y) => <g>
      <path d={`M ${x - 9} ${y - 2} V ${y - 10} A 9 9 0 0 1 ${x + 9} ${y - 10} V ${y - 2}`} fill="none" stroke={C.ink} strokeWidth={3.5} />
      <rect x={x - 14} y={y - 3} width={28} height={22} rx={5} fill={C.ink} />
    </g>;
  const drawSteps = () => {
    const built = stepDone(S), hasCard = builtNow(S), ord = S.order;
    const slot = (k) => {
      const y = matTop + k * 80, sid = ord[k], st = sid ? stepOf(sid) : null, name = tx(k === 0 ? "1st" : "2nd");
      if (!st) {
        return <g key={"slot" + k}>
            <rect x={SDR.x} y={y} width={SDR.w} height={72} rx={RAD.key} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="9 7" />
            <text x={SDR.x + 20} y={y + 46} fontSize={T.micro} fontWeight={700} fill={C.ink}>{name}</text>
            {k === 1 && lock(SDR.x + SDR.w - 36, y + 38)}
          </g>;
      }
      const lab = tx(st.label), size = sdMeasure(lab, T.label, 600) <= SDR.w - 150 ? T.label : T.micro;
      const face = <g>
          <text x={-SDR.w / 2 + 20} y={10} fontSize={T.micro} fontWeight={700} fill={C.ink}>{name}</text>
          <text x={-SDR.w / 2 + 84} y={size * 0.36} fontSize={size} fontWeight={600} fill={C.ink}>{lab}</text>
          {k === 1 && !built && <g transform={`translate(${SDR.w / 2 - 36},-2)`}>{lock(0, 0)}</g>}
        </g>;
      if (k === 1 && built) {
        return <g key={"slot" + k}>
            <rect x={SDR.x} y={y} width={SDR.w} height={72} rx={RAD.key} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
            <g transform={`translate(${SDR.x + SDR.w / 2},${y + 36})`}>{face}</g>
          </g>;
      }
      return <Key
        key={"slot" + k}
        id={k === 0 ? "step-first" : "step-second"}
        label={k === 0 ? "Work the first step: " + st.label : "Make this step first: " + st.label}
        x={SDR.x}
        y={y}
        w={SDR.w}
        h={72}
        C={C}
        disabled={!canAct || built}
        primary={k === 0 && !built && !S.early}
        onClick={k === 0 ? workFirst : swapSteps}
      >
          {k === 0 && !built && !S.early ? <g><text x={-SDR.w / 2 + 20} y={10} fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{name}</text>
              <text x={-SDR.w / 2 + 84} y={size * 0.36} fontSize={size} fontWeight={600} fill="#FFFFFF">{lab}</text></g> : face}
        </Key>;
    };
    const rowNum = (v, yy, fill, shown = 99) => v === null ? <g><rect x={sdBayC(4) - 24} y={yy - 32} width={44 * 5 + 4} height={40} rx={8} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="7 6" />
        <text x={sdBayC(2)} y={yy} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>?</text></g> : <g>{String(v).split("").reverse().map((d, k) => k < shown ? <text key={k} x={sdBayC(k)} y={yy} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={d === "0" && k < String(v).length - 1 ? SD_GREY : fill}>{d}</text> : null)}</g>;
    const bay = () => {
      if (!ord.length) return null;
      const st0 = stepOf(ord[0]), e = pr.early;
      if (S.early && !built && !S.bay) {
        const a = e.a ? val(S, e.a) : null, b = e.b ? val(S, e.b) : null;
        return <g key="early" className="sd-in">
            <text x={SDR.x + 12} y={bayTop + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(e.a))}</text>
            {rowNum(a, bayTop + 34, SD_BLUE)}
            <text x={SDR.x + 12} y={bayTop + 74} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(e.b))}</text>
            <text x={sdBayC(5) - 6} y={bayTop + 74} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{e.op === "+" ? "+" : "−"}</text>
            {rowNum(b, bayTop + 74, SD_AMBER_INK)}
            <rect x={sdBayC(4) - 24} y={bayTop + 84} width={44 * 5 + 4} height={3} rx={1.5} fill={C.ink} />
            {a !== null && b !== null && a < b && <text x={sdBayC(4) - 24} y={bayTop + 126} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("not enough")}</text>}
          </g>;
      }
      const bv = S.bay || (hasCard ? { a: val(S, st0.a), b: val(S, st0.b), op: st0.op, c: S.built[st0.out], shown: 9 } : null);
      if (!bv) return null;
      const out = st0.out, onMat2 = S.mat.includes(out), pay = { src: "built", id: out };
      return <g key="bay">
          <text x={SDR.x + 12} y={bayTop + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(st0.a))}</text>
          {rowNum(bv.a, bayTop + 34, SD_BLUE)}
          {bv.b !== null && <text x={SDR.x + 12} y={bayTop + 74} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(st0.b))}</text>}
          {bv.b !== null && <text x={sdBayC(5) - 6} y={bayTop + 74} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{bv.op === "+" ? "+" : "−"}</text>}
          {bv.b !== null && rowNum(bv.b, bayTop + 74, bv.op === "+" ? SD_BLUE : SD_AMBER_INK)}
          <rect x={sdBayC(4) - 24} y={bayTop + 84} width={44 * 5 + 4} height={3} rx={1.5} fill={C.ink} />
          {!hasCard && rowNum(bv.c, bayTop + 128, SD_GREEN, bv.shown)}
          {!hasCard && bv.tag && <text x={SDR.x + 12} y={bayTop + 128} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(bv.tag)}</text>}
          {hasCard && <text x={SDR.x + 12} y={bayTop + 128} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(out))}</text>}
          {hasCard && onMat2 && <line x1={846} y1={bayTop + 136} x2={1046} y2={bayTop + 136} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />}
          {hasCard && onMat2 && canAct && <Hit id="back-built" label={"Put " + sdCardText(bv.c, isRs(out)) + " back"} x={826} y={bayTop + 82} w={240} h={72} onPress={() => back(out)} />}
          {hasCard && !onMat2 && <g
        className={canAct ? "c4-piece sd-grab sd-in" : "sd-in"}
        {...canAct ? { ...control("built-" + out, "Built " + sdCardText(bv.c, isRs(out))), ...drag.bind(pay), ...drag.keys(pay) } : {}}
      >
              <g filter="url(#fShadowSoft)">
                <rect x={826} y={bayTop + 90} width={240} height={56} rx={14} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
                <rect x={832} y={bayTop + 96} width={228} height={44} rx={10} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="6 5" />
                <text x={946} y={bayTop + 129} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{sdCardText(bv.c, isRs(out))}</text>
              </g>
              <rect x={826} y={bayTop + 82} width={240} height={72} fill="transparent" />
            </g>}
        </g>;
    };
    const loose = !ord.length ? <g className={stage === "ask" && canAct ? "sd-hello" : ""}>
        {pr.loose.map((sid, i) => {
      const st = stepOf(sid), lab = tx(st.label), size = sdMeasure(lab, T.label, 600) <= SDR.w - 60 ? T.label : T.micro;
      return <Key
        key={sid}
        id={"step-" + sid}
        label={"This step comes first: " + st.label}
        x={SDR.x}
        y={matTop + 160 + i * 78}
        w={SDR.w}
        h={72}
        C={C}
        disabled={!canAct}
        onClick={() => chooseFirst(sid)}
      >
              <text x={0} y={size * 0.36} textAnchor="middle" fontSize={size} fontWeight={600} fill={C.ink}>{lab}</text>
            </Key>;
    })}
      </g> : null;
    const inv = canAct && !built && ord.length && S.early ? { x: SDR.x + 40, y: matTop + 116 } : null;
    return <g>
        {slot(0)}
        {slot(1)}
        {loose}
        {bay()}
        {pr.anyOrder && S.eitherNote && ord.length === 2 && <g className="sd-in" pointerEvents="none">
            <rect x={SDR.x + SDR.w - 262} y={matTop + 59} width={250} height={34} rx={17} fill="#FFFFFF" stroke={C.accent} strokeWidth={2} />
            <path
      d={`M ${SDR.x + SDR.w - 240} ${matTop + 86} V ${matTop + 66} M ${SDR.x + SDR.w - 246} ${matTop + 72} L ${SDR.x + SDR.w - 240} ${matTop + 65} L ${SDR.x + SDR.w - 234} ${matTop + 72}
              M ${SDR.x + SDR.w - 226} ${matTop + 66} V ${matTop + 86} M ${SDR.x + SDR.w - 232} ${matTop + 80} L ${SDR.x + SDR.w - 226} ${matTop + 87} L ${SDR.x + SDR.w - 220} ${matTop + 80}`}
      fill="none"
      stroke={C.ink}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
            <text x={SDR.x + SDR.w - 208} y={matTop + 86} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("either order")}</text>
          </g>}
        {inv && <Invite x={inv.x} y={inv.y} r={34} C={C} />}
      </g>;
  };
  const drawRight = () => {
    if (kind === "free") return greyBay(matTop);
    if (kind === "two") return drawSteps();
    if (!S.picked) {
      return <g className={stage === "ask" && canAct ? "sd-hello" : ""}>{SD_CARDS.map((c, i) => {
        const y = matTop + i * 80, label = tx(c[1]);
        const size = sdMeasure(label, T.label, 500) <= SDR.w - 92 ? T.label : T.micro;
        return <g key={c[0]} className={S.tip === c[0] ? "sd-tip" : ""}>
            <Key id={"ask-" + c[0]} label={"Question card: " + c[1]} x={SDR.x} y={y} w={SDR.w} h={72} C={C} disabled={!canAct} onClick={() => pick(c[0])}>
              <circle cx={-SDR.w / 2 + 38} cy={0} r={21} fill={canAct ? C.accent : tint(C.accent, 0.35)} />
              <text x={-SDR.w / 2 + 38} y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">?</text>
              <text x={-SDR.w / 2 + 74} y={size === T.label ? 11 : 10} fontSize={size} fontWeight={500} fill={C.ink}>{label}</text>
            </Key>
          </g>;
      })}</g>;
    }
    return <g>
        {qCard(tx(cardLabel(S.picked)), matTop, "picked")}
        {kind === "spare" && greyBay(matTop + 88)}
        {kind === "reach" && drawStrip(matTop + 88)}
      </g>;
  };
  const onMat = S.mat.filter(Boolean).length;
  const runs1 = kind === "free" ? tx("On the mat:") + " " + onMat : kind === "two" ? stepDone(S) ? tx("Step") + " " + sdOf(2, 2, lang) : S.order.length ? tx("Step") + " " + sdOf(1, 2, lang) : tx("Which step first?") : kind === "spare" ? tx("Mat") + " " + sdOf(onMat, 2, lang) + " · " + tx("grey") + " " + S.grey.length : tx("On the mat:") + " " + sdOf(onMat, 2, lang);
  const runs2 = kind === "free" ? "" : kind === "two" ? stepDone(S) ? tx("On the mat:") + " " + sdOf(onMat, 2, lang) : "" : S.picked ? tx(cardLabel(S.picked)) : tx("What is asked?");
  const ghost = drag.drag && drag.drag.moved && canAct ? drag.drag : null;
  return <g>
      <style>{SD_CSS}</style>

      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={runs2 ? -61 : -46} fontSize={T.micro} fontWeight={700} fill={C.ink}>{runs1}</text>
        {runs2 && <text key={runs2} className="sd-in" x={18} y={-27} fontSize={T.micro} fontWeight={500} fill={C.ink}>{runs2}</text>}
      </g>

      {drawBoard()}
      {drawMat()}
      {S.rival && (() => {
    const x0 = 12 + Math.max(...S.rival.map((r) => sdMeasure(tx(r.label), T.micro, 600))) + 22;
    return S.rival.map((r, i) => {
      const y = matTop + matH + 34 + i * 36;
      const toks = [[indian(r.a), C.ink], [r.op === "+" ? "+" : "−", C.ink], [indian(r.b), C.ink], ["=", C.ink], [indian(r.v), r.right ? SD_GREEN : C.ink]];
      let x = x0;
      return <g key={"rival-" + i + "-" + r.label} className="sd-in">
              <text x={12} y={y} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(r.label)}</text>
              {toks.map((t, k) => {
        const el = <text key={k} x={x} y={y} fontSize={T.micro} fontWeight={700} fill={t[1]}>{t[0]}</text>;
        x += sdMeasure(t[0], T.micro, 700) + 12;
        return el;
      })}
            </g>;
    });
  })()}
      {drawRight()}

      {S.fly && <g className="sd-fly" style={{ transform: `translate(${S.fly.x}px, ${S.fly.y}px)` }} pointerEvents="none">
          {cardArt(0, 0, S.fly.v, { lift: true, rs: S.fly.rs, built: S.fly.built })}
        </g>}
      {ghost && (() => {
    const v = val(S, ghost.payload.id);
    return v === null ? null : <g pointerEvents="none">{cardArt(ghost.x, ghost.y, v, { lift: true, rs: isRs(ghost.payload.id), built: ghost.payload.src === "built" })}</g>;
  })()}
    </g>;
}
function Thumb({ n, result, C, w, h }) {
  const L = result && result.last || {};
  const ph = PHASES[(n || 1) - 1];
  const it = ph && ph.items ? ph.items[L.item] : null;
  const partsGot = it && it.parts ? slotPartsOf(L.value, it.parts.length).map((x) => x === "" ? null : Number(x)) : null;
  const v = partsGot ? partsGot[partsGot.length - 1] : leadNumber(L.value);
  if (v === null || v === void 0 || !it || !it.qid || !SD_PROBS[it.qid]) {
    return <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        <circle cx={34} cy={h / 2} r={18} fill={C.accent} />
        <text x={34} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">?</text>
        <text x={62} y={h / 2 + 10} fontSize={T.micro} fontWeight={600} fill={C.ink}>what is asked</text>
      </g>;
  }
  const pr = SD_PROBS[it.qid], vals = sdRecipe(pr);
  const rows = [String(vals[pr.need[0]]).length, String(vals[pr.need[1]]).length];
  const cell = 15, right = 100, top = 7, ruleY = h - 26, pitch = (ruleY - 4 - top) / 2, bh = Math.min(15, pitch - 4);
  const fills = [tint(CONTENT.hundred, 0.45), tint(CONTENT.ten, 0.35)], edges = [shade(CONTENT.hundred, 0.1), shade(CONTENT.ten, 0.2)];
  const dAns = String(v).length;
  const cells = (y, d, hh) => Array.from({ length: d - 1 }).map((_, k) => <line key={k} x1={right - (k + 1) * cell} y1={y + 2} x2={right - (k + 1) * cell} y2={y + hh - 2} stroke="#FFFFFF" strokeWidth={1.4} />);
  return <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {rows.map((d, i) => {
    const y = top + i * pitch + (pitch - bh) / 2;
    return <g key={i}>
            <rect x={right - d * cell} y={y} width={d * cell} height={bh} rx={3} fill={fills[i]} stroke={edges[i]} strokeWidth={1.2} />
            {cells(y, d, bh)}
          </g>;
  })}
      <rect x={right - 6 * cell} y={ruleY} width={6 * cell} height={3} rx={1.5} fill={C.ink} />
      <rect x={right - dAns * cell} y={ruleY + 7} width={dAns * cell} height={14} rx={3} fill={tint(CONTENT.one, 0.35)} stroke={shade(CONTENT.one, 0.1)} strokeWidth={1.2} />
      {cells(ruleY + 7, dAns, 14)}
      {partsGot ? partsGot.map((x, k) => <text key={k} x={w - 12} y={h / 2 - 6 + k * 32} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{x === null ? "" : indian(x)}</text>) : <text x={w - 12} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{indian(v)}</text>}
    </g>;
}
function StoryToDifference(props) {
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
    format: sdFormat,
    fitHost: () => null
  }} />;
}
var stdin_default = StoryToDifference;
export default stdin_default;
