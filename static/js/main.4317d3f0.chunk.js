(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{111:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n(0),i=n.n(r),o=n(12),u=n.n(o),c=(n(99),n(155)),s=n(151),l=n(18),d=n(15),f=n.n(d),h=n(20),v=n(9),j=n(8),b=n(34),p=n(11),O=n(14),k=n(26),x=n.n(k);function y(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return null===t&&(t=e,e=0),x()(t>=e),Array.from(Array(t-e).keys()).map((function(t){return e+t}))}function g(e){var t=e.reduce((function(e,t){return e.concat(e.map((function(e){return[].concat(Object(b.a)(e),[t])})))}),[[]]);return t.sort((function(e,t){return t.length-e.length})),t}var w=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;Object(p.a)(this,e),this._value=null,this.value=t}return Object(O.a)(e,[{key:"equals",value:function(e){return this.value===e.value}},{key:"value",get:function(){return this._value},set:function(t){x()(e.isValidValue(t)),this._value=t}},{key:"isNull",get:function(){return null===this.value}}],[{key:"isValidValue",value:function(t){return null===t||e.ValidValues.includes(t)}}]),e}();w.ValidValues=y(1,10);var m=function e(t,n){Object(p.a)(this,e),this.row=void 0,this.col=void 0,this.id=void 0,this.row=t,this.col=n,this.id="".concat(t,".").concat(n)},V=function(){function e(t,n,a){Object(p.a)(this,e),this._nRows=void 0,this._nCols=void 0,this._constraints=void 0,this._contents=void 0,this.rowIndexes=void 0,this.colIndexes=void 0,this.indexes=void 0,x()(t>0&&n>0),this._nRows=t,this._nCols=n,this._constraints=a,this.rowIndexes=y(this._nRows),this.colIndexes=y(this._nCols),this.indexes=[],this._contents=[];var r,i=Object(j.a)(this.rowIndexes);try{for(i.s();!(r=i.n()).done;){var o=r.value;this._contents[o]=[];var u,c=Object(j.a)(this.colIndexes);try{for(c.s();!(u=c.n()).done;){var s=u.value,l=new m(o,s);this.indexes.push(l),this.setValue(l,null)}}catch(d){c.e(d)}finally{c.f()}}}catch(d){i.e(d)}finally{i.f()}}return Object(O.a)(e,[{key:"clear",value:function(){var e,t=Object(j.a)(this.indexes);try{for(t.s();!(e=t.n()).done;){var n=e.value;this.setValue(n,null)}}catch(a){t.e(a)}finally{t.f()}}},{key:"isValidIndex",value:function(e){var t=e.row,n=e.col;return 0<=t&&t<this._nRows&&0<=n&&n<this._nCols}},{key:"isValidValue",value:function(e,t){if(!w.isValidValue(t))return!1;var n,a=Object(j.a)(this._constraints);try{for(a.s();!(n=a.n()).done;){if(!n.value.allowsValue(this,e,t))return!1}}catch(r){a.e(r)}finally{a.f()}return!0}},{key:"blockedValues",value:function(e){var t,n=new Set,a=Object(j.a)(this._constraints);try{for(a.s();!(t=a.n()).done;){t.value.blockedValues(this,e).forEach((function(e){return n.add(e)}))}}catch(r){a.e(r)}finally{a.f()}return Array.from(n)}},{key:"allowedValues",value:function(e){var t=this.blockedValues(e);return w.ValidValues.filter((function(e){return!t.includes(e)}))}},{key:"setValue",value:function(t,n){x()(this.isValidIndex(t));var a=new w(n);x()(this.isValidValue(t,n));var r=t.row,i=t.col;this._contents[r][i]=a,e._checksum+=1}},{key:"getValue",value:function(e){x()(this.isValidIndex(e));var t=e.row,n=e.col;return this._contents[t][n].value}},{key:"nRows",get:function(){return this._nRows}},{key:"nCols",get:function(){return this._nCols}},{key:"constraints",get:function(){return this._constraints}},{key:"checksum",get:function(){return e._checksum}}]),e}();V._checksum=0;var C=n(23),I=n(22),_=function(){function e(t){Object(p.a)(this,e),this._area=void 0,this._area=t}return Object(O.a)(e,[{key:"appliesTo",value:function(e){return this.firstRow<=e.row&&e.row<=this.lastRow&&this.firstCol<=e.col&&e.col<=this.lastCol}},{key:"constraintIndexes",value:function(e){var t,n=[],a=Object(j.a)(y(this.firstRow,this.lastRow+1));try{for(a.s();!(t=a.n()).done;){var r,i=t.value,o=Object(j.a)(y(this.firstCol,this.lastCol+1));try{for(o.s();!(r=o.n()).done;){var u=r.value;n.push(new m(i,u))}}catch(c){o.e(c)}finally{o.f()}}}catch(c){a.e(c)}finally{a.f()}return n}},{key:"blockedValues",value:function(e,t){if(this.appliesTo(t)){var n=e.getValue(t);return this.constraintIndexes(e).map((function(t){return e.getValue(t)})).filter((function(e){return!(null===e||e===n)}))}return[]}},{key:"allowsValue",value:function(e,t,n){if(null===n)return!0;if(this.appliesTo(t)){var a,r=Object(j.a)(this.constraintIndexes(e));try{for(r.s();!(a=r.n()).done;){var i=a.value;if((i.row!==t.row||i.col!==t.col)&&e.getValue(i)===n)return!1}}catch(o){r.e(o)}finally{r.f()}}return!0}},{key:"firstRow",get:function(){return this._area.from.row}},{key:"lastRow",get:function(){return this._area.to.row}},{key:"firstCol",get:function(){return this._area.from.col}},{key:"lastCol",get:function(){return this._area.to.col}}]),e}(),S=function(e){Object(C.a)(n,e);var t=Object(I.a)(n);function n(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:8;return Object(p.a)(this,n),t.call(this,{from:new m(e,a),to:new m(e,r)})}return n}(_),R=function(e){Object(C.a)(n,e);var t=Object(I.a)(n);function n(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:8;return Object(p.a)(this,n),t.call(this,{from:new m(a,e),to:new m(r,e)})}return n}(_),A=function(e){Object(C.a)(n,e);var t=Object(I.a)(n);function n(e,a){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3;return Object(p.a)(this,n),t.call(this,{from:new m(e,a),to:new m(e+r-1,a+r-1)})}return n}(_),N=function(){function e(t){Object(p.a)(this,e),this.setup=void 0,this._data={},this.setup=this.loadJSON(window.location.href+t)}return Object(O.a)(e,[{key:"loadJSON",value:function(){var e=Object(h.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.json();case 5:this._data=e.sent;case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getData",value:function(e){return e in this._data?this._data[e]:[]}},{key:"ids",get:function(){return Object.keys(this._data)}}]),e}(),E=function(){function e(){Object(p.a)(this,e)}return Object(O.a)(e,null,[{key:"getAreaConstraints",value:function(e){var t=[];return e.forEach((function(n){e.forEach((function(e){t.push(new A(n,e))}))})),t}},{key:"getBasicConstraints",value:function(t,n){var a=y(t).map((function(e){return new S(e)})),r=y(n).map((function(e){return new R(e)})),i=e.getAreaConstraints([0,3,6]);return[].concat(Object(b.a)(a),Object(b.a)(r),Object(b.a)(i))}},{key:"create",value:function(e){return e.create()}},{key:"dataIds",value:function(){var t=Object(h.a)(f.a.mark((function t(n){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.loadData(n.dataURL);case 2:return a=t.sent,t.abrupt("return",a.ids);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"createBasicSudoku",value:function(){var t=e.getBasicConstraints(9,9);return new V(9,9,t)}},{key:"createNRCSudoku",value:function(){var t=e.getBasicConstraints(9,9),n=e.getAreaConstraints([1,5]);return new V(9,9,[].concat(Object(b.a)(t),Object(b.a)(n)))}},{key:"fillSudoku",value:function(){var t=Object(h.a)(f.a.mark((function t(n,a,r){var i,o;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.loadData(a);case 2:i=t.sent,o=i.getData(r),e.fillData(n,o);case 5:case"end":return t.stop()}}),t)})));return function(e,n,a){return t.apply(this,arguments)}}()},{key:"fillData",value:function(e,t){var n,a=Object(j.a)(e.indexes);try{for(a.s();!(n=a.n()).done;){var r=n.value;e.setValue(r,null)}}catch(d){a.e(d)}finally{a.f()}var i,o=Object(j.a)(t);try{for(o.s();!(i=o.n()).done;){var u=Object(v.a)(i.value,3),c=u[0],s=u[1],l=u[2];e.setValue(new m(c,s),l)}}catch(d){o.e(d)}finally{o.f()}}},{key:"loadData",value:function(){var t=Object(h.a)(f.a.mark((function t(n){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e._data[n]){t.next=5;break}return a=new N(n),t.next=4,a.setup;case 4:e._data[n]=a;case 5:return t.abrupt("return",e._data[n]);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"fillNRCSudoku",value:function(){var t=Object(h.a)(f.a.mark((function t(n){var a,r=arguments;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.length>1&&void 0!==r[1]?r[1]:"default",t.next=3,e.fillSudoku(n,"/data/nrc.json",a);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"fillBasicSudoku",value:function(){var t=Object(h.a)(f.a.mark((function t(n){var a,r=arguments;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.length>1&&void 0!==r[1]?r[1]:"default",t.next=3,e.fillSudoku(n,"/data/basic.json",a);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),e}();E._data={};var H={Basic:{id:"Basic",name:"Standard Sudoku",create:E.createBasicSudoku,fill:E.fillBasicSudoku,dataURL:"/data/basic.json"},NRC:{id:"NRC",name:"NRC Sudoku",create:E.createNRCSudoku,fill:E.fillNRCSudoku,dataURL:"/data/nrc.json"}},B=function(){function e(t){Object(p.a)(this,e),this.helper=void 0,this.helper=t}return Object(O.a)(e,[{key:"sudoku",get:function(){return this.helper.sudoku}},{key:"indexInfo",get:function(){return this.helper.indexInfo}}]),e}(),T=function(e){Object(C.a)(n,e);var t=Object(I.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"values",value:function(e){var t=this.getValues(e);return Array.from(t.reduce((function(e,t){var n=Object(v.a)(t,4),a=(n[0],n[1],n[2]);n[3];return a.forEach((function(t){return e.add(t)})),e}),new Set))}},{key:"getValues",value:function(e){var t=this,n=this.indexInfo[e.id].allowedValues;if(1===n.length)return[];var a,r=g(n).filter((function(e){return 2<=e.length&&e.length<=n.length})),i=this.sudoku.constraints.filter((function(t){return t.appliesTo(e)})),o=[],u=Object(j.a)(r);try{var c=function(){var n,r=a.value,u=Object(j.a)(i);try{for(u.s();!(n=u.n()).done;){var c=n.value,s=c.constraintIndexes(t.sudoku).filter((function(e){var n,a=Object(j.a)(r);try{for(a.s();!(n=a.n()).done;){var i=n.value;if(!t.indexInfo[e.id].allowedValues.includes(i))return!1}}catch(o){a.e(o)}finally{a.f()}return!0}));if(s.length===r.length){var l=c.constraintIndexes(t.sudoku).filter((function(e){var n,a=Object(j.a)(r);try{for(a.s();!(n=a.n()).done;){var i=n.value;if(t.indexInfo[e.id].allowedValues.includes(i))return!0}}catch(o){a.e(o)}finally{a.f()}return!1}));s.length===l.length&&o.push([c,e,r,s])}}}catch(d){u.e(d)}finally{u.f()}};for(u.s();!(a=u.n()).done;)c()}catch(s){u.e(s)}finally{u.f()}return o}},{key:"process",value:function(e){var t=this;return this.getValues(e).reduce((function(e,n){var a=Object(v.a)(n,4),r=a[0],i=a[1],o=a[2],u=a[3];return e.concat(t.action(r,i,o,u)),e}),[])}},{key:"action",value:function(e,t,n,a){var r=this,i=[];return a.forEach((function(t){r.indexInfo[t.id].allowedValues.length!==n.length&&i.push({motivation:"Hidden pair",constraints:[e],index:t,allowedValues:n})})),i}}]),n}(B),L=function(e){Object(C.a)(n,e);var t=Object(I.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"values",value:function(e){var t=this.getValues(e)[0];return t?[t]:[]}},{key:"getValues",value:function(e){var t=this.indexInfo[e.id],n=this.sudoku.constraints.filter((function(t){return t.appliesTo(e)})),a=null,r=[];if(1===t.allowedValues.length)return[t.allowedValues[0],[]];var i,o=Object(j.a)(t.allowedValues);try{for(o.s();!(i=o.n()).done;){var u,c=i.value,s=Object(j.a)(n);try{for(s.s();!(u=s.n()).done;){var l,d=u.value,f=0,h=Object(j.a)(d.constraintIndexes(this.sudoku));try{for(h.s();!(l=h.n()).done;){var v=l.value;if(this.indexInfo[v.id].allowedValues.includes(c)&&(f+=1)>1)break}}catch(b){h.e(b)}finally{h.f()}1===f&&(a=c,r.push(d))}}catch(b){s.e(b)}finally{s.f()}}}catch(b){o.e(b)}finally{o.f()}return[a,r]}},{key:"process",value:function(e){var t=this.getValues(e),n=Object(v.a)(t,2),a=n[0],r=n[1];return null===a?[]:[this.action(r,e,a)]}},{key:"action",value:function(e,t,n){return{motivation:"Value ".concat(n," is the only possible value in this constraint"),index:t,constraints:e,allowedValues:[n]}}}]),n}(B),D=function(e){Object(C.a)(n,e);var t=Object(I.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"values",value:function(e){return this.getValues(e).map((function(e){var t=Object(v.a)(e,4),n=t[0];t[1],t[2],t[3];return n}))}},{key:"getValues",value:function(e){var t,n=this.indexInfo[e.id],a=this.sudoku.constraints.filter((function(t){return t.appliesTo(e)})).filter((function(e){return e instanceof A})),r=[],i=Object(j.a)(n.allowedValues);try{for(i.s();!(t=i.n()).done;){var o,u=t.value,c=Object(j.a)(a);try{for(c.s();!(o=c.n()).done;){var s,l=o.value,d=new Set,f=new Set,h=Object(j.a)(l.constraintIndexes(this.sudoku));try{for(h.s();!(s=h.n()).done;){var v=s.value;this.indexInfo[v.id].allowedValues.includes(u)&&(d.add(v.row),f.add(v.col))}}catch(b){h.e(b)}finally{h.f()}1!==d.size&&1!==f.size||r.push([u,l,1===d.size?e.row:null,1===f.size?e.col:null])}}catch(b){c.e(b)}finally{c.f()}}}catch(b){i.e(b)}finally{i.f()}return r}},{key:"process",value:function(e){var t=this;return this.getValues(e).reduce((function(n,a){var r=Object(v.a)(a,4),i=r[0],o=r[1],u=r[2],c=r[3];return n.concat(t.action(o,e,i,u,c))}),[])}},{key:"action",value:function(e,t,n,a,r){var i=[];null!==a?i=this.sudoku.constraints.filter((function(e){return e.appliesTo(t)&&e instanceof S&&e.firstRow===a})):null!==r&&(i=this.sudoku.constraints.filter((function(e){return e.appliesTo(t)&&e instanceof R&&e.firstCol===r})));var o,u=[],c=Object(j.a)(i);try{for(c.s();!(o=c.n()).done;){var s,l=o.value,d=Object(j.a)(l.constraintIndexes(this.sudoku).filter((function(t){return!e.appliesTo(t)})));try{for(d.s();!(s=d.n()).done;){var f=s.value,h=this.indexInfo[f.id].allowedValues;h.includes(n)&&u.push({motivation:"".concat(n," is a single row/column value"),constraints:[e,l],allowedValues:h.filter((function(e){return e!==n})),index:f})}}catch(v){d.e(v)}finally{d.f()}}}catch(v){c.e(v)}finally{c.f()}return u}}]),n}(B),z=function(e){Object(C.a)(n,e);var t=Object(I.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"values",value:function(e){var t=this.getValues(e);return Array.from(t.reduce((function(e,t){var n=Object(v.a)(t,3);n[0],n[1];return n[2].forEach((function(t){return e.add(t)})),e}),new Set))}},{key:"getValues",value:function(e){var t=this,n=this.indexInfo[e.id].allowedValues;if(1===n.length)return[];var a,r=this.sudoku.constraints.filter((function(t){return t.appliesTo(e)})),i=[],o=Object(j.a)(r);try{for(o.s();!(a=o.n()).done;){var u=a.value,c=u.constraintIndexes(this.sudoku).filter((function(e){return n.join("")===t.indexInfo[e.id].allowedValues.join("")}));c.length===n.length&&i.push([u,c,n])}}catch(s){o.e(s)}finally{o.f()}return i}},{key:"process",value:function(e){var t=this;return this.getValues(e).reduce((function(e,n){var a=Object(v.a)(n,3),r=a[0],i=a[1],o=a[2];return e.concat(t.action(r,i,o))}),[])}},{key:"action",value:function(e,t,n){var a=this,r=t.map((function(e){return e.id})),i=e.constraintIndexes(this.sudoku).filter((function(e){return!r.includes(e.id)})),o=[];return i.forEach((function(t){var r=a.indexInfo[t.id],i=r.allowedValues.filter((function(e){return n.includes(e)}));if(i.length>0){var u=r.allowedValues.filter((function(e){return!n.includes(e)}));o.push({motivation:"Eliminate naked pair values ".concat(i.join(", ")),constraints:[e],index:t,allowedValues:u})}})),o}}]),n}(B);function P(e){return Object.entries(J).reduce((function(t,n){var a=Object(v.a)(n,2),r=a[0],i=a[1],o=r;return t[o]=e(o,i),t}),{})}var J={MandatoryValue:{create:function(e){return new L(e)},option:{text:"Show mandatory values"},style:{color:"purple"}},NakedPair:{create:function(e){return new z(e)},option:{text:"Show pairs"},style:{color:"red"}},HiddenPair:{create:function(e){return new T(e)},option:{text:"Show hidden pairs"},style:{color:"blue"}},SingleRowColumn:{create:function(e){return new D(e)},option:{text:"Show single row/column"},style:{color:"green"}}},U=Object(l.a)({PossibleValues:!1,Hint:!1},P((function(){return!1}))),W={sudokuVariant:H.Basic,options:U},F=n(47),G=n(142),M=n(144),q=n(156),$=Object(G.a)((function(e){return Object(q.a)({textField:{"& > *":{textAlign:"center"}}})}));function K(e){var t=$(),n=e.sudoku,i=e.sudokuOptions,o=e.index,u=Object(r.useState)(n.getValue(o)||""),c=Object(v.a)(u,2),s=c[0],l=c[1];return i.Hint&&!s?null:Object(a.jsx)("form",{noValidate:!0,autoComplete:"off",children:Object(a.jsx)(M.a,{className:t.textField,disableUnderline:!0,value:s,onChange:function(t){var n=Number(t.target.value),a=e.onChange(o,isNaN(n)?null:n);l(a||"")}})})}var Q=n(146),X=Object(G.a)((function(e){return Object(q.a)({root:{position:"absolute",top:7,left:8,textAlign:"center",marginLeft:"2px"}})}));var Y=function(e){var t=X(),n=e.sudoku,r=e.sudokuHelper,i=e.options,o=e.index,u=n.getValue(o),c=r.allowedValues(o);return null===u&&i.Hint&&1===c.length?Object(a.jsx)(Q.a,{className:t.root,size:"small",color:"secondary",onClick:function(){return t=c[0],void e.onChange(o,t);var t},children:"?"}):null},Z=n(147),ee=n(148),te=n(149),ne=n(157);function ae(e){var t=i.a.useState(e.options),n=Object(v.a)(t,2),r=n[0],o=n[1],u=function(t){var n=t.target,a=n.name,i=n.checked;o(Object(l.a)(Object(l.a)({},r),{},Object(F.a)({},a,i))),e.onOption(a,i)},c=Object(l.a)({PossibleValues:"Show possible values",Hint:"Show hint"},P((function(e,t){return t.option.text})));return Object(a.jsx)(Z.a,{component:"fieldset",children:Object(a.jsx)(ee.a,{children:Object.entries(c).map((function(e){var t=Object(v.a)(e,2),n=t[0],i=t[1],o=n;return Object(a.jsx)(te.a,{control:Object(a.jsx)(ne.a,{checked:r[o],onChange:u,name:n}),label:i},o)}))})})}var re=n(150),ie=n(75),oe=n.n(ie);var ue=function(e){var t=e.sudokuHelper,n=e.onChange;return Object(a.jsx)(re.a,{variant:"contained",color:"primary",startIcon:Object(a.jsx)(oe.a,{}),onClick:function e(){var a=t.getHint();if(a){var r=Object(v.a)(a,2),i=r[0],o=r[1];n(i,o),setTimeout((function(){return e()}),0)}},children:"Solve"})},ce=n(76),se=n.n(ce);var le=function(e){return Object(a.jsx)(re.a,{variant:"contained",color:"primary",startIcon:Object(a.jsx)(se.a,{}),onClick:e.onErase,children:"Clear"})},de=Object(G.a)((function(e){return Object(q.a)(Object(l.a)({possibleValues:{position:"absolute",top:0,left:0,textAlign:"left",marginLeft:"2px",fontSize:"10px",fontFamily:"monospace"},possibleValue:{}},P((function(e,t){return t.style}))))}));var fe=function(e){var t=de(),n=e.sudoku,r=e.sudokuHelper,i=e.options,o=e.index,u=n.getValue(o),c=Object.values(i).reduce((function(e,t){return e||t}),!1);if(null!==u||!c)return null;var s=r.strategies,l=P((function(e,t){return s[e].values(o)})),d=[];if(0===(d=i.PossibleValues?r.allowedValues(o):Array.from(Object.entries(l).reduce((function(e,t){var n=Object(v.a)(t,2),a=n[0],r=n[1];return i[a]&&r.forEach((function(t){return e.add(t)})),e}),new Set))).length)return null;var f=w.ValidValues.map((function(e){return d.includes(e)?e:" "})),h=[0,3,6].map((function(e){return f.slice(e,e+3)}));return Object(a.jsx)("div",{className:t.possibleValues,children:h.map((function(e,n){return Object(a.jsx)("div",{children:e.map((function(e,n){if(" "===e)return Object(a.jsx)("span",{children:"\xa0"},n);var r=[t.possibleValue];return Object.entries(l).forEach((function(n){var a=Object(v.a)(n,2),o=a[0],u=(a[1],o);i[u]&&l[u].includes(e)&&r.push(t[u])})),Object(a.jsx)("span",{className:r.join(" "),children:e},n)}))},n)}))})};var he=Object(G.a)((function(e){return Object(q.a)({root:{position:"absolute",top:7,left:8,textAlign:"center",marginLeft:"2px"}})}));var ve=function(e){var t=he(),n=e.sudoku,r=e.sudokuHelper,i=e.options,o=e.index,u=n.getValue(o),c=r.allowedValues(o),s=r.actions[o.id]||[];if(null!==u||!i.Hint||1===c.length||0===s.length)return null;var l=Array.from(new Set(s.map((function(e){return e.motivation})))).join(", ");return Object(a.jsx)(Q.a,{className:t.root,size:"small",color:"secondary",onClick:function(){return t=s,void e.onAction(t);var t},title:l,children:"!"})};var je=function(e){var t=Object(r.useState)(""),n=Object(v.a)(t,2),i=n[0],o=n[1],u=Object(r.useState)(W.options),d=Object(v.a)(u,2),f=d[0],h=d[1],b=e.sudoku,p=e.helper,O=Object(G.a)({table:{marginLeft:"auto",marginRight:"auto",border:"1px solid black",borderSpacing:0},tableCell:{position:"relative",backgroundColor:"inherit",border:"1px solid black",padding:0,margin:0,textAlign:"center",verticalAlign:"center",width:35,height:35}})(),k=function(e,t){return"".concat(e.row,".").concat(e.col,".").concat(t)},x=function(e,t){return b.isValidValue(e,t)?b.setValue(e,t):b.setValue(e,null),t=b.getValue(e),o(k(e,t)),t},y=function(e){p.applyActions(e),o(e.map((function(e){return e.index.id})).join(","))};return Object(a.jsxs)("div",{children:[Object(a.jsx)(s.a,{container:!0,direction:"column",justify:"space-around",alignItems:"center",children:Object(a.jsx)("table",{className:O.table,children:Object(a.jsx)("tbody",{children:b.rowIndexes.map((function(e){return Object(a.jsx)("tr",{children:b.colIndexes.map((function(t){var n=new m(e,t),r=k(n,b.getValue(n)),o=function(e,t){var n,a="1px solid black",r="2px solid black",i={borderTop:a,borderRight:a,borderBottom:a,borderLeft:a,backgroundColor:"inherit"},o=Object(j.a)(e.constraints);try{for(o.s();!(n=o.n()).done;){var u=n.value;if(u instanceof A){if([1,5].includes(u.firstRow)||[1,5].includes(u.firstCol)){u.appliesTo(t)&&(i.backgroundColor="lightGrey");continue}t.row===u.firstRow?i.borderTop=r:t.row===u.lastRow&&(i.borderBottom=r),t.col===u.firstCol?i.borderLeft=r:t.col===u.lastCol&&(i.borderRight=r)}}}catch(c){o.e(c)}finally{o.f()}return i}(b,n);return r===i&&(o.backgroundColor="LightBlue"),Object(a.jsxs)("td",{className:O.tableCell,style:o,children:[Object(a.jsx)(fe,{sudoku:b,sudokuHelper:p,options:f,index:n}),Object(a.jsx)(Y,{sudoku:b,sudokuHelper:p,options:f,index:n,onChange:x}),Object(a.jsx)(ve,{sudoku:b,sudokuHelper:p,options:f,index:n,onAction:y}),Object(a.jsx)(K,{sudoku:b,sudokuOptions:f,index:n,onChange:x})]},r)}))},e)}))})})}),Object(a.jsxs)(s.a,{container:!0,direction:"row",justify:"space-between",alignItems:"flex-start",children:[Object(a.jsx)(ae,{options:f,onOption:function(e,t){h(Object(l.a)(Object(l.a)({},f),{},Object(F.a)({},e,t)))}}),Object(a.jsxs)("div",{style:{textAlign:"right"},children:[Object(a.jsx)(c.a,{mt:1,children:Object(a.jsx)(ue,{sudokuHelper:p,onChange:x})}),Object(a.jsx)(c.a,{mt:1,mb:2,children:Object(a.jsx)(le,{onErase:function(){b.clear(),o("Clear")}})})]})]})]})},be=n(158),pe=n(154),Oe=Object(G.a)((function(e){return Object(q.a)({formControl:{margin:e.spacing(1),minWidth:140},selectEmpty:{marginTop:e.spacing(2)}})}));function ke(e){var t=Oe(),n=Object(r.useState)(e.variant),i=Object(v.a)(n,2),o=i[0],u=i[1];return Object(a.jsx)("div",{children:Object(a.jsxs)(Z.a,{className:t.formControl,children:[Object(a.jsx)(be.a,{children:"Sudoku Variant"}),Object(a.jsx)(pe.a,{native:!0,value:o.id,onChange:function(t){var n=t.target.value,a=Object.values(H).filter((function(e){return e.id===n}));a.length&&(u(a[0]),e.onVariant(a[0]))},children:Object.values(H).map((function(e){return Object(a.jsx)("option",{value:e.id,children:e.name},e.id)}))})]})})}var xe=n(115),ye=Object(G.a)((function(e){return Object(q.a)({formControl:{margin:e.spacing(1),minWidth:140},selectEmpty:{marginTop:e.spacing(2)}})}));function ge(e){var t=ye(),n=Object(r.useState)(e.id),i=Object(v.a)(n,2),o=i[0],u=i[1],c=e.ids,s=e.onId;return Object(a.jsx)("div",{children:Object(a.jsxs)(Z.a,{className:t.formControl,children:[Object(a.jsx)(be.a,{children:"Sudoku Data"}),Object(a.jsx)(pe.a,{native:!0,value:o,onChange:function(e){var t=e.target.value;u(t),s(t)},children:c.map((function(e){return Object(a.jsx)("option",{value:e,children:e},e)}))})]})})}var we=function(){function e(t){Object(p.a)(this,e),this._allowedValues=void 0,this._allowedValues=t}return Object(O.a)(e,[{key:"allowedValues",get:function(){return this._allowedValues},set:function(e){this._allowedValues=e}}]),e}(),me=function(){function e(t){Object(p.a)(this,e),this.sudoku=void 0,this.indexInfo={},this.sudokuChecksum=void 0,this._actions=null,this.sudoku=t,this.sudokuChecksum=-1,this.prepare()}return Object(O.a)(e,[{key:"prepare",value:function(){var e=this;this.sudokuChecksum!==this.sudoku.checksum&&(this.sudoku.indexes.forEach((function(t){var n=null===e.sudoku.getValue(t)?e.sudoku.allowedValues(t):[],a=new we(n);e.indexInfo[t.id]=a})),this.sudokuChecksum=this.sudoku.checksum)}},{key:"refreshActions",value:function(){this._actions=this.getActions()}},{key:"getActions",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.prepare();var n=null===t?this.strategies:[t],a={};return Object.values(n).forEach((function(t){e.sudoku.indexes.forEach((function(e){t.process(e).forEach((function(e){a[e.index.id]=a[e.index.id]||[],a[e.index.id].push(e)}))}))})),a}},{key:"applyActions",value:function(e){var t=this;e.forEach((function(e){t.indexInfo[e.index.id].allowedValues=e.allowedValues,t._actions=null}))}},{key:"getHint",value:function(){this.prepare();for(var e=Object.values(this.strategies),t=!0;t;){t=!1;var n,a=Object(j.a)(e);try{for(a.s();!(n=a.n()).done;){var r,i=n.value,o=Object(j.a)(this.sudoku.indexes);try{for(o.s();!(r=o.n()).done;){var u=r.value,c=this.indexInfo[u.id];if(1===c.allowedValues.length)return[u,c.allowedValues[0]]}}catch(f){o.e(f)}finally{o.f()}for(var s=0,l=Object.values(this.getActions(i));s<l.length;s++){var d=l[s];this.applyActions(d),t=!0}}}catch(f){a.e(f)}finally{a.f()}}}},{key:"applyHint",value:function(e){var t=Object(v.a)(e,2),n=t[0],a=t[1];this.sudoku.setValue(n,a)}},{key:"allowedValues",value:function(e){return this.indexInfo[e.id].allowedValues}},{key:"strategies",get:function(){var e=this;return P((function(t,n){return n.create(e)}))}},{key:"actions",get:function(){return null!==this._actions&&this.sudokuChecksum===this.sudoku.checksum||this.refreshActions(),x()(null!==this._actions),this._actions}}]),e}(),Ve={variant:W.sudokuVariant,ids:[],id:"",sudoku:null,helper:null};function Ce(){var e=Object(r.useState)(Ve),t=Object(v.a)(e,2),n=t[0],i=t[1],o=n.variant,u=n.ids,c=n.id,d=n.sudoku,j=n.helper;function b(e){return p.apply(this,arguments)}function p(){return(p=Object(h.a)(f.a.mark((function e(t){var a,r,o,u;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=E.create(t),e.next=3,E.dataIds(t);case 3:return r=e.sent,o=r[0],e.next=7,t.fill(a,o);case 7:u=new me(a),i(Object(l.a)(Object(l.a)({},n),{},{variant:t,ids:r,id:o,sudoku:a,helper:u}));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}if(!d)return b(o),Object(a.jsx)("p",{children:"Loading..."});function O(e,t){return k.apply(this,arguments)}function k(){return(k=Object(h.a)(f.a.mark((function e(t,n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.fill(t,n);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x=function(){var e=Object(h.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(h.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(d,t);case 2:i(Object(l.a)(Object(l.a)({},n),{},{id:t}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)(xe.a,{elevation:3,style:{width:375},children:Object(a.jsxs)(s.a,{container:!0,direction:"column",justify:"space-around",alignItems:"center",children:[Object(a.jsxs)(s.a,{container:!0,direction:"row",justify:"space-around",alignItems:"center",children:[Object(a.jsx)(ke,{variant:o,onVariant:x}),Object(a.jsx)(ge,{ids:u,id:c,onId:y})]}),Object(a.jsx)(je,{sudoku:d,helper:j})]})})}var Ie=n(152),_e=n(153),Se=n(114),Re=n(77),Ae=n.n(Re),Ne=Object(G.a)((function(e){return Object(q.a)({root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}})}));function Ee(){var e=Ne();return Object(a.jsx)("div",{className:e.root,children:Object(a.jsx)(Ie.a,{position:"static",children:Object(a.jsxs)(_e.a,{children:[Object(a.jsx)(Q.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",children:Object(a.jsx)(Ae.a,{})}),Object(a.jsx)(Se.a,{variant:"h6",className:e.title,children:"Sudoku Solver"})]})})})}var He=function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)(c.a,{mb:2,children:Object(a.jsx)(Ee,{})}),Object(a.jsx)(s.a,{container:!0,direction:"column",alignItems:"center",justify:"center",children:Object(a.jsx)(Ce,{})})]})},Be=n(61),Te=Object(Be.b)({name:"sudoku",initialState:{},reducers:{}}).reducer,Le=Object(Be.a)({reducer:{counter:Te}}),De=n(79);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(De.a,{store:Le,children:Object(a.jsx)(He,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},99:function(e,t,n){}},[[111,1,2]]]);
//# sourceMappingURL=main.4317d3f0.chunk.js.map