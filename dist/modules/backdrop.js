/**
 * Cupertino Pane 1.3.01
 * New generation interfaces for web3 progressive applications
 * https://github.com/roman-rr/cupertino-pane/
 *
 * Copyright 2019-2022 Roman Antonov (roman-rr)
 *
 * Released under the MIT License
 *
 * Released on: August 12, 2022
 */

var CupertinoTransition;!function(t){t.Present="present",t.Destroy="destroy",t.Move="move",t.Breakpoint="breakpoint",t.Hide="hide",t.TouchEnd="end"}(CupertinoTransition||(CupertinoTransition={}));class Support{static get touch(){return window.Modernizr&&!0===window.Modernizr.touch||!!(window.navigator.maxTouchPoints>0||"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch)}static get observer(){return"MutationObserver"in window||"WebkitMutationObserver"in window}static get backdropFilter(){return CSS.supports("backdrop-filter","blur(0px)")||CSS.supports("-webkit-backdrop-filter","blur(0px)")}static get passiveListener(){let t=!1;try{const e=Object.defineProperty({},"passive",{get(){t=!0}});window.addEventListener("testPassiveListener",null,e)}catch(t){}return t}static get gestures(){return"ongesturestart"in window}}class BackdropModule{constructor(t){this.instance=t,this.touchMoveBackdropCb=t=>this.touchMoveBackdrop(t),this.settings=this.instance.settings,this.events=this.instance.events,this.settings.backdrop&&(this.instance.backdrop=t=>this.backdrop(t),this.instance.on("rendered",(()=>{this.instance.addStyle("\n        .cupertino-pane-wrapper .backdrop {\n          overflow: hidden;\n          position: fixed;\n          width: 100%;\n          bottom: 0;\n          right: 0;\n          left: 0;\n          top: 0;\n          display: none;\n          z-index: 10;\n        }\n      "),this.settings.backdrop&&this.renderBackdrop()})),this.instance.on("beforePresentTransition",(t=>{t.animate||(this.backdropEl.style.display="block")})),this.instance.on("onTransitionStart",(t=>{this.settings.backdrop&&(this.instance.isHidden()||t.type===CupertinoTransition.Hide||t.type===CupertinoTransition.Destroy||t.type===CupertinoTransition.Present)&&(this.backdropEl.style.backgroundColor="rgba(0,0,0,.0)",this.backdropEl.style.transition=`all ${this.settings.animationDuration}ms ${this.settings.animationType} 0s`,t.type!==CupertinoTransition.Hide&&t.type!==CupertinoTransition.Destroy&&(this.backdropEl.style.display="block",setTimeout((()=>{this.backdropEl.style.backgroundColor=`rgba(0,0,0, ${this.settings.backdropOpacity})`}),50)))})),this.instance.on("onTransitionEnd",(t=>{this.backdropEl&&(t.type!==CupertinoTransition.Destroy&&t.type!==CupertinoTransition.Hide||(this.backdropEl.style.transition="initial",this.backdropEl.style.display="none"))})),Support.touch&&(this.instance.on("onDidPresent",(()=>{var t;null===(t=this.backdropEl)||void 0===t||t.addEventListener(this.events.touchEvents.move,this.touchMoveBackdropCb,!!Support.passiveListener&&{passive:!1,capture:!1})})),this.instance.on("onDidDismiss",(t=>{var e;null===(e=this.backdropEl)||void 0===e||e.removeEventListener(this.events.touchEvents.move,this.touchMoveBackdropCb)}))))}backdrop(t={show:!0}){var e,i;if(!this.instance.isPanePresented())return console.warn("Cupertino Pane: Present pane before call backdrop()"),null;this.isBackdropPresented()||(this.renderBackdrop(),Support.touch&&(null===(e=this.backdropEl)||void 0===e||e.removeEventListener(this.events.touchEvents.move,this.touchMoveBackdropCb),null===(i=this.backdropEl)||void 0===i||i.addEventListener(this.events.touchEvents.move,this.touchMoveBackdropCb,!!Support.passiveListener&&{passive:!1,capture:!1})));const n=()=>{this.backdropEl.style.transition="initial",this.backdropEl.style.display="none",this.backdropEl.removeEventListener("transitionend",n)};if(this.backdropEl.style.transition=`all ${this.settings.animationDuration}ms ${this.settings.animationType} 0s`,this.backdropEl.style.backgroundColor="rgba(0,0,0,.0)",t.show)this.backdropEl.style.display="block",setTimeout((()=>{this.backdropEl.style.backgroundColor=`rgba(0,0,0, ${this.settings.backdropOpacity})`}),50);else{if("none"===this.backdropEl.style.display)return;this.backdropEl.addEventListener("transitionend",n)}}renderBackdrop(){this.backdropEl=document.createElement("div"),this.backdropEl.classList.add("backdrop"),this.backdropEl.style.transition=`all ${this.settings.animationDuration}ms ${this.settings.animationType} 0s`,this.backdropEl.style.backgroundColor=`rgba(0,0,0, ${this.settings.backdropOpacity})`,this.instance.wrapperEl.appendChild(this.backdropEl),this.backdropEl.addEventListener("click",(()=>this.instance.emit("onBackdropTap")))}isBackdropPresented(){return!!document.querySelector(".cupertino-pane-wrapper .backdrop")}touchMoveBackdrop(t){this.settings.touchMoveStopPropagation&&t.stopPropagation()}}export{BackdropModule};