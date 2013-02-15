AUI.add("aui-ace-autocomplete-base",function(c){var f=c.Lang,b=c.Array,g=c.Do,a="insertText",d="exec",k="host",h="processor",j=-1,i=0,l="ace-autocomplete-base";var e=function(){};e.prototype={initializer:function(){var m=this;m._editorCommands=[];c.after(this._bindUIACBase,this,"renderUI");var n=m.get(h);if(n&&!n.get(k)){n.set(k,m);}},_addSuggestion:function(o){var m=this;var n=m._getEditor();var p=m.get(h).getSuggestion(m._matchParams.match,o);n.insert(p);n.focus();m.fire("addSuggestion",p);return new g.Halt(null);},_bindUIACBase:function(){var m=this;m.publish("cursorChange",{defaultFn:m._defaultCursorChangeFn});var n=m._getEditor();n.on("change",c.bind(m._onEditorChange,m));n.commands.addCommand({name:"showAutoComplete",bindKey:c.merge(m.get("showListKey"),{sender:"editor|cli"}),exec:function(q,p,r){var o=n.getCursorPosition();m._processAutoComplete(o.row,o.column);}});n.getSelection().on("changeCursor",c.bind(m._onEditorChangeCursor,m));m.on("destroy",m._destroyUIACBase,m);},_defaultCursorChangeFn:function(m){var s=this;var p=s._getEditor();var n=p.getCursorPosition();var t=n.row;var o=n.column;var q=s._matchParams;if(t!==q.row||o<q.match.start){s.fire("cursorOut");}else{var u=p.getSession().getLine(t);var r=u.substring(q.match.start,o);if(!s.get(h).getMatch(r)){s.fire("match");}}},_destroyUIACBase:function(){var m=this;m._removeAutoCompleteCommands();},_getEditor:function(){var m=this;return m.get("host").getEditor();},_handleEnter:function(o){var m=this;if(o==="\n"||o==="\t"){var n=m._getSelectedEntry();return m._addSuggestion(n);}},_onEditorChange:function(r){var m=this;var s=r.data;var t=s.action;if(t===a||t==="removeText"){var p=s.range;var q=p.start.column;var o=p.end.row;var n=p.start.row;if(t===a&&n===o){m._processAutoComplete(n,q+1);}m.fire(t,{column:q,dataRange:p,endRow:o,startRow:n});}},_onEditorChangeCursor:function(n){var m=this;m.fire("cursorChange",m._getEditor().getCursorPosition());},_onResultsError:function(n){var m=this;m.fire("resultsError",n);},_onResultsSuccess:function(n){var m=this;m.set("results",n);},_overwriteCommands:function(){var n=this;var o=n._getEditor();var m=o.commands.commands;n._editorCommands.push(g.before(n._handleEnter,o,"onTextInput",this),g.before(n._handleKey,m["golinedown"],d,this,40),g.before(n._handleKey,m["golineup"],d,this,38),g.before(n._handleKey,m["gotoend"],d,this,35),g.before(n._handleKey,m["gotolineend"],d,this,35),g.before(n._handleKey,m["gotolinestart"],d,this,36),g.before(n._handleKey,m["gotopagedown"],d,this,34),g.before(n._handleKey,m["gotopageup"],d,this,33),g.before(n._handleKey,m["gotostart"],d,this,36));},_processAutoComplete:function(t,o){var s=this;var n=o;var q=s._getEditor();var u=q.getSession().getLine(t);u=u.substring(0,o);var m=s.get(h);var p=m.getMatch(u);var r;if(f.isObject(p)){r=q.renderer.textToScreenCoordinates(t,o);s._matchParams={column:o,match:p,row:t};m.getResults(p,c.bind(s._onResultsSuccess,s),c.bind(s._onResultsError,s));}s.fire("match",{column:o,coords:r,line:u,match:p,row:t});},_removeAutoCompleteCommands:function(){var m=this;b.invoke(m._editorCommands,"detach");m._editorCommands.length=0;}};e.NAME=l;e.NS=l;e.ATTRS={processor:{validator:function(m){return f.isObject(m)||f.isFunction(m);}},showListKey:{validator:f.isObject,value:{mac:"Alt-Space",win:"Ctrl-Space"}}};c.AceEditor.AutoCompleteBase=e;},"@VERSION@",{requires:["aui-ace-editor"]});