(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{878:function(t,n,e){"use strict";e.r(n),e.d(n,"IonRippleEffect",function(){return a});var i=e(913),a=function(){function t(){this.type="bounded"}return t.prototype.addRipple=function(t,n){return i.a(this,void 0,void 0,function(){var e=this;return i.c(this,function(i){return[2,new Promise(function(i){e.queue.read(function(){var a=e.el.getBoundingClientRect(),c=a.width,u=a.height,f=Math.sqrt(c*c+u*u),l=Math.max(u,c),s=e.unbounded?l:f+o,p=Math.floor(l*r),d=s/p,m=t-a.left,b=n-a.top;e.unbounded&&(m=.5*c,b=.5*u);var y=m-.5*p,w=b-.5*p,h=.5*c-m,v=.5*u-b;e.queue.write(function(){var t=e.win.document.createElement("div");t.classList.add("ripple-effect");var n=t.style;n.top=w+"px",n.left=y+"px",n.width=n.height=p+"px",n.setProperty("--final-scale",""+d),n.setProperty("--translate-end",h+"px, "+v+"px"),(e.el.shadowRoot||e.el).appendChild(t),setTimeout(function(){i(function(){!function(t){t.classList.add("fade-out"),setTimeout(function(){t.remove()},200)}(t)})},325)})})})]})})},Object.defineProperty(t.prototype,"unbounded",{get:function(){return"unbounded"===this.type},enumerable:!0,configurable:!0}),t.prototype.hostData=function(){var t;return{role:"presentation",class:(t={},t[""+this.mode]=!0,t.unbounded=this.unbounded,t)}},Object.defineProperty(t,"is",{get:function(){return"ion-ripple-effect"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{addRipple:{method:!0},el:{elementRef:!0},queue:{context:"queue"},type:{type:String,attr:"type"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-ripple-effect-h{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}.unbounded.sc-ion-ripple-effect-h{contain:layout size style}.ripple-effect.sc-ion-ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation:rippleAnimation 225ms forwards,fadeInAnimation 75ms forwards;animation:rippleAnimation 225ms forwards,fadeInAnimation 75ms forwards;will-change:transform,opacity;pointer-events:none}.fade-out.sc-ion-ripple-effect{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale,1));transform:translate(var(--translate-end)) scale(var(--final-scale,1));-webkit-animation:fadeOutAnimation .15s forwards;animation:fadeOutAnimation .15s forwards}@-webkit-keyframes rippleAnimation{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale,1));transform:translate(var(--translate-end)) scale(var(--final-scale,1))}}@keyframes rippleAnimation{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale,1));transform:translate(var(--translate-end)) scale(var(--final-scale,1))}}@-webkit-keyframes fadeInAnimation{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.16}}@keyframes fadeInAnimation{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.16}}@-webkit-keyframes fadeOutAnimation{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.16}to{opacity:0}}@keyframes fadeOutAnimation{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.16}to{opacity:0}}"},enumerable:!0,configurable:!0}),t}();var o=10,r=.5},913:function(t,n,e){"use strict";e.d(n,"b",function(){return a}),e.d(n,"a",function(){return o}),e.d(n,"c",function(){return r});var i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};function a(t,n){function e(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}function o(t,n,e,i){return new(e||(e=Promise))(function(a,o){function r(t){try{u(i.next(t))}catch(n){o(n)}}function c(t){try{u(i.throw(t))}catch(n){o(n)}}function u(t){t.done?a(t.value):new e(function(n){n(t.value)}).then(r,c)}u((i=i.apply(t,n||[])).next())})}function r(t,n){var e,i,a,o,r={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;r;)try{if(e=1,i&&(a=2&o[0]?i.return:o[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,o[1])).done)return a;switch(i=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return r.label++,{value:o[1],done:!1};case 5:r.label++,i=o[1],o=[0];continue;case 7:o=r.ops.pop(),r.trys.pop();continue;default:if(!(a=(a=r.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){r=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){r.label=o[1];break}if(6===o[0]&&r.label<a[1]){r.label=a[1],a=o;break}if(a&&r.label<a[2]){r.label=a[2],r.ops.push(o);break}a[2]&&r.ops.pop(),r.trys.pop();continue}o=n.call(t,r)}catch(c){o=[6,c],i=0}finally{e=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}}}}]);
//# sourceMappingURL=153.8d660dc7.chunk.js.map