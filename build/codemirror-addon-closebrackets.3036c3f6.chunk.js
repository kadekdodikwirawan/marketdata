(self.webpackChunkmarketdata=self.webpackChunkmarketdata||[]).push([[5178],{82801:(e,n,t)=>{!function(e){var n={pairs:"()[]{}''\"\"",closeBefore:")]}'\":;>",triples:"",explode:"[]{}"},t=e.Pos;function r(e,t){return"pairs"==t&&"string"==typeof e?e:"object"==typeof e&&null!=e[t]?e[t]:n[t]}e.defineOption("autoCloseBrackets",!1,(function(n,t,s){s&&s!=e.Init&&(n.removeKeyMap(a),n.state.closeBrackets=null),t&&(i(r(t,"pairs")),n.state.closeBrackets=t,n.addKeyMap(a))}));var a={Backspace:o,Enter:c};function i(e){for(var n=0;n<e.length;n++){var t=e.charAt(n),r="'"+t+"'";a[r]||(a[r]=s(t))}}function s(e){return function(n){return u(n,e)}}function l(e){var n=e.state.closeBrackets;return!n||n.override?n:e.getModeAt(e.getCursor()).closeBrackets||n}function o(n){var a=l(n);if(!a||n.getOption("disableInput"))return e.Pass;for(var i=r(a,"pairs"),s=n.listSelections(),o=0;o<s.length;o++){if(!s[o].empty())return e.Pass;var c=d(n,s[o].head);if(!c||i.indexOf(c)%2!=0)return e.Pass}for(o=s.length-1;o>=0;o--){var h=s[o].head;n.replaceRange("",t(h.line,h.ch-1),t(h.line,h.ch+1),"+delete")}}function c(n){var t=l(n),a=t&&r(t,"explode");if(!a||n.getOption("disableInput"))return e.Pass;for(var i=n.listSelections(),s=0;s<i.length;s++){if(!i[s].empty())return e.Pass;var o=d(n,i[s].head);if(!o||a.indexOf(o)%2!=0)return e.Pass}n.operation((function(){var e=n.lineSeparator()||"\n";n.replaceSelection(e+e,null),h(n,-1),i=n.listSelections();for(var t=0;t<i.length;t++){var r=i[t].head.line;n.indentLine(r,null,!0),n.indentLine(r+1,null,!0)}}))}function h(e,n){for(var t=[],r=e.listSelections(),a=0,i=0;i<r.length;i++){var s=r[i];s.head==e.getCursor()&&(a=i);var l=s.head.ch||n>0?{line:s.head.line,ch:s.head.ch+n}:{line:s.head.line-1};t.push({anchor:l,head:l})}e.setSelections(t,a)}function f(n){var r=e.cmpPos(n.anchor,n.head)>0;return{anchor:new t(n.anchor.line,n.anchor.ch+(r?-1:1)),head:new t(n.head.line,n.head.ch+(r?1:-1))}}function u(n,a){var i=l(n);if(!i||n.getOption("disableInput"))return e.Pass;var s=r(i,"pairs"),o=s.indexOf(a);if(-1==o)return e.Pass;for(var c,u=r(i,"closeBefore"),d=r(i,"triples"),g=s.charAt(o+1)==a,v=n.listSelections(),k=o%2==0,b=0;b<v.length;b++){var P,S=v[b],y=S.head,O=n.getRange(y,t(y.line,y.ch+1));if(k&&!S.empty())P="surround";else if(!g&&k||O!=a)if(g&&y.ch>1&&d.indexOf(a)>=0&&n.getRange(t(y.line,y.ch-2),y)==a+a){if(y.ch>2&&/\bstring/.test(n.getTokenTypeAt(t(y.line,y.ch-2))))return e.Pass;P="addFour"}else if(g){var x=0==y.ch?" ":n.getRange(t(y.line,y.ch-1),y);if(e.isWordChar(O)||x==a||e.isWordChar(x))return e.Pass;P="both"}else{if(!k||!(0===O.length||/\s/.test(O)||u.indexOf(O)>-1))return e.Pass;P="both"}else P=g&&p(n,y)?"both":d.indexOf(a)>=0&&n.getRange(y,t(y.line,y.ch+3))==a+a+a?"skipThree":"skip";if(c){if(c!=P)return e.Pass}else c=P}var A=o%2?s.charAt(o-1):a,B=o%2?a:s.charAt(o+1);n.operation((function(){if("skip"==c)h(n,1);else if("skipThree"==c)h(n,3);else if("surround"==c){for(var e=n.getSelections(),t=0;t<e.length;t++)e[t]=A+e[t]+B;for(n.replaceSelections(e,"around"),e=n.listSelections().slice(),t=0;t<e.length;t++)e[t]=f(e[t]);n.setSelections(e)}else"both"==c?(n.replaceSelection(A+B,null),n.triggerElectric(A+B),h(n,-1)):"addFour"==c&&(n.replaceSelection(A+A+A+A,"before"),h(n,1))}))}function d(e,n){var r=e.getRange(t(n.line,n.ch-1),t(n.line,n.ch+1));return 2==r.length?r:null}function p(e,n){var r=e.getTokenAt(t(n.line,n.ch+1));return/\bstring/.test(r.type)&&r.start==n.ch&&(0==n.ch||!/\bstring/.test(e.getTokenTypeAt(n)))}i(n.pairs+"`")}(t(4631))}}]);