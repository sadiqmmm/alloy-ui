AUI.add("aui-scheduler-event",function(AX){var AH=AX.Lang,A8=AH.isString,I=AH.isDate,Ay=AH.isFunction,m=AH.isObject,A0=AH.isBoolean,w=AH.isNumber,Ap=AX.ColorUtil,O=AX.DataType.DateMath,Av=AX.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),A5="-",AN=".",U="",V=" ",R="_",Ac="_propagateSet",r="activeView",AV="borderStyle",BH="borderWidth",n="Change",Au="color",Al="colorBrightnessFactor",A3="colorSaturationFactor",AT="content",AC="contentNode",Ar="duration",Af="endDate",A9="events",AJ="hidden",At="id",An="isoTime",BG="locale",S="node",L="overlay",AZ="parentEvent",BJ="recorder",Ad="repeat",A7="repeated",q="repeatedEvents",AB="scheduler",AL="scheduler-event",AM="scheduler-event-recorder",BB="startDate",Ax="template",Ak="title",H="titleDateFormat",k="titleNode",G="%H:%M",Aw="%I:%M",i=AX.ClassNameManager.getClassName,W=i(AL),Ag=i(AL,AT),d=i(AL,AJ),AI=i(AL,BJ),AP=i(AL,A7),f=i(AL,Ak),Aa='<div class="'+W+'">'+'<div class="'+f+'"></div>'+'<div class="'+Ag+'"></div>'+"</div>";var s=AX.Component.create({NAME:AL,ATTRS:{borderStyle:{value:"solid",validator:A8},borderWidth:{value:"1px",validator:A8},colorBrightnessFactor:{value:0.75,validator:w},colorSaturationFactor:{value:1.5,validator:w},content:{value:"(no title)",validator:A8},color:{lazyAdd:false,setter:"_setColor",value:"#D96666",validator:A8},titleDateFormat:{getter:"_getTitleDateFormat",validator:A8},endDate:{valueFn:function(){var A=O.clone(this.get(BB));A.setHours(A.getHours()+1);return A;},validator:I},columnNode:{setter:AX.one},node:{valueFn:function(){return AX.Node.create(Aa).setData(AL,this);},setter:AX.one},parentEvent:{},repeat:{setter:"_setRepeat"},scheduler:{lazyAdd:false,setter:"_setScheduler"},startDate:{valueFn:function(){return new Date();},validator:I}},EXTENDS:AX.Base,PROPAGATE_ATTRS:[BB,Af,AT,Au,Al,A3,AV,BH,H],prototype:{eventStack:null,initializer:function(){var A=this;var BC=A.get(S);A.eventStack={};A.nodeStack={};AX.Array.each(AX.SchedulerEvent.PROPAGATE_ATTRS,function(BD){A.after(BD+n,A._propagateAttrChange);});A.contentNode=BC.one(AN+Ag);A.titleNode=BC.one(AN+f);A.syncNodeUI(true);},destroy:function(){var A=this;A.eachRepeatedEvent(function(BC,BD){BC.destroy();});A.eventStack={};A.get(S).remove(true);},copyDates:function(BC){var A=this;A.set(Af,O.clone(BC.get(Af)));A.set(BB,O.clone(BC.get(BB)));},copyPropagateAttrValues:function(BC,BD){var A=this;A.copyDates(BC);AX.Array.each(AX.SchedulerEvent.PROPAGATE_ATTRS,function(BM){if(!(BM in (BD||{}))){var BN=BC.get(BM);if(!m(BN)){A.set(BM,BN);}}});},getBorderColor:function(){var A=this;return A.borderColorRGB.hex;},getDaysDuration:function(){var A=this;return O.getDayOffset(A.get(Af),A.get(BB));},getHoursDuration:function(){var A=this;return O.getHoursOffset(A.get(Af),A.get(BB));},getMinutesDuration:function(){var A=this;return O.getMinutesOffset(A.get(Af),A.get(BB));},getSecondsDuration:function(){var A=this;return O.getSecondsOffset(A.get(Af),A.get(BB));},hide:function(){var A=this;A.get(S).addClass(d);},sameEndDate:function(BC){var A=this;return O.compare(A.get(Af),BC.get(Af));},sameStartDate:function(BC){var A=this;return O.compare(A.get(BB),BC.get(BB));},show:function(){var A=this;A.get(S).removeClass(d);},isAfter:function(BM){var BD=this;var BC=BD.get(BB);var A=BM.get(BB);return O.after(BC,A);},isBefore:function(BM){var BD=this;var BC=BD.get(BB);var A=BM.get(BB);return O.before(BC,A);},repeatByDate:function(BD){var A=this;var BM=A.uidByDate(BD);if(!A.eventStack[BM]){var BC=O.clone(BD);var BN=O.clone(BD);O.copyHours(BC,A.get(BB));O.copyHours(BN,A.get(Af));var BO=new AX.SchedulerEvent({endDate:BN,parentEvent:A,scheduler:A.get(AB),startDate:BC});BO.copyPropagateAttrValues(A);A.eventStack[BM]=BO;}return A.eventStack[BM];},intersects:function(BM){var BD=this;var BN=BD.get(Af);var BC=BD.get(BB);var A=BM.get(BB);return(BD.sameStartDate(BM)||O.between(A,BC,BN));},intersectHours:function(BD){var BC=this;var BN=BC.get(Af);var A=BC.get(BB);var BM=O.clone(A);O.copyHours(BM,BD.get(BB));return(O.compare(A,BM)||O.between(BM,A,BN));},isDayOverlapEvent:function(){var A=this;return O.isDayOverlap(A.get(BB),A.get(Af));},isRepeatableDate:function(BC){var A=this;var BD=A.get(Ad);return(BD&&BD.validate(A,BC));},getClearEndDate:function(){var A=this;return O.safeClearTime(A.get(Af));},getClearStartDate:function(){var A=this;return O.safeClearTime(A.get(BB));},uidByDate:function(BC){var A=this;BC=I(BC)?O.safeClearTime(BC):A.getClearStartDate();return[AL,BC.getTime()].join(R);},setContent:function(BD,BC){var A=this;A._setContent(AC,BD,BC);},setTitle:function(BD,BC){var A=this;A._setContent(k,BD,BC);},syncNodeUI:function(BC){var A=this;A.get(S).toggleClass(AP,!!(A.get(AZ)));A.syncNodeColorUI(BC);A.syncNodeTitleUI(BC);A.syncNodeContentUI(BC);},syncNodeColorUI:function(BC){var A=this;var BD=A.get(S);var BM=A.getBorderColor();if(BD){BD.setStyles({borderWidth:A.get(BH),borderColor:BM,backgroundColor:A.get(Au),borderStyle:A.get(AV)});}if(A.titleNode){A.titleNode.setStyles({backgroundColor:BM});}if(BC){A.eachRepeatedEvent(function(BN,BO){BN.syncNodeColorUI();});}},syncNodeContentUI:function(BC){var A=this;A.setContent(A.get(AT),BC);},syncNodeTitleUI:function(BC){var A=this;var BD=A._formatDate(A.get(BB));var BM=A._formatDate(A.get(Af));A.setTitle([BD,BM].join(V+A5+V),BC);},eachRepeatedEvent:function(BC){var A=this;AX.each(A.eventStack,BC,A);},unlink:function(){var A=this;if(A.get(AZ)){A.set(AZ,null);}else{A.eachRepeatedEvent(function(BC,BD){BC.unlink();});}A.eventStack={};A.syncNodeUI();},_propagateAttrChange:function(BM){var A=this;var BD=BM.attrName;var BC=BM.newVal;A.eachRepeatedEvent(function(BN,BO){var BP=BN[Ac+Av(BD)];if(BP){BP.apply(A,[BN,BD,BC]);}else{BN.set(BD,BM.newVal);}BN.syncNodeUI();});A.syncNodeUI();},_propagateSetEndDate:function(A,BC,BM){var BD=O.clone(A.get(Af));O.copyHours(BD,BM);A.set(Af,BD);},_propagateSetStartDate:function(BC,BD,BM){var A=O.clone(BC.get(BB));O.copyHours(A,BM);BC.set(BB,A);},_setColor:function(BC){var A=this;A.hsbColor=Ap.rgb2hsb(Ap.getRGB(BC));
A.borderColor=AX.clone(A.hsbColor);A.borderColor.b*=A.get(Al);A.borderColor.s*=A.get(A3);A.borderColorRGB=Ap.hsb2rgb(A.borderColor);return BC;},_setContent:function(BD,BN,BC){var A=this;var BM=A[BD];if(BM){BM.setContent(BN);}if(BC){A.eachRepeatedEvent(function(BO,BP){BO[BD].setContent(BN);});}},_setRepeat:function(BC){var A=this;if(A8(BC)){BC=AX.SchedulerEventRepeat[BC];}return BC;},_setScheduler:function(BD){var A=this;var BC=A.get(AB);if(BC){A.removeTarget(BC);}A.addTarget(BD);return BD;},_formatDate:function(BD,BM){var BC=this;var A=BC.get(BG);BM=BM||BC.get(H);return AX.DataType.Date.format(BD,{format:BM,locale:A});},_getTitleDateFormat:function(BD){var A=this;if(!A8(BD)){var BC=A.get(AB);BD=(BC&&BC.get(r).get(An))?G:Aw;}return BD;}}});AX.SchedulerEvent=s;AX.SchedulerEventRepeat={dayly:{description:"Every day",validate:function(A,BC){return true;},value:"dayly"},monthly:{description:"Every month",validate:function(BC,BD){var BM=BC.get(Af);var A=BC.get(BB);return(A.getDate()===BD.getDate());},value:"monthly"},monWedFri:{description:"Every Monday, Wednesday and Friday",validate:function(A,BC){return O.isMonWedOrFri(BC);},value:"monWedFri"},tuesThurs:{description:"Every Tuesday and Thursday",validate:function(A,BC){return O.isTueOrThu(BC);},value:"tuesThurs"},weekDays:{description:"Every week days",validate:function(A,BC){return O.isWeekDay(BC);},value:"weekDays"},weekly:{description:"Every week",validate:function(BC,BD){var BM=BC.get(Af);var A=BC.get(BB);return(A.getDay()===BC.getDay());},value:"weekly"}};var r="activeView",BF="bc",BE="bd",AO="bodyContent",T="boundingBox",AY="button",F="column",AT="content",AU="dateFormat",AR="dblclick",As="desc",AQ="disk",BK="event",Az="field",Ab="fieldset",AS="form",AD="hint",AG="input",An="isoTime",Ae="label",X="layout",Aj="menu",g="overlayContextPanel",P="pencil",Ad="repeat",Q="row",AB="scheduler",v="select",p="strings",B="tc",j="text",u="when",K="trigger",AE="auiSchedulerEventRecorderWhen",A4="auiSchedulerEventRecorderDesc",Aq="auiSchedulerEventRecorderSelect",e="auiSchedulerEventRecorderButtonRow",AA="cancel",b="edit",AW="save",A5="-",h="#",BL=i(AL,BJ,L),A2=i(AL,BJ,AS),Y=i(AS),M=i(X,AT),A6=i(X,Ab),AK=i(X,Ab,BE),z=i(X,Ab,AT),c=i(X,"w100"),N=i(F),Ah=i(F,AT),C=i(Az),Z=i(Az,Aj),Ai=i(Az,v),BA=i(Az,AT),E=i(Az,Ae),Ao=i(Az,j),J=i(AY,Q),A1=i(Az,AG),AF=i(Az,AG,v),a=i(Az,AG,j),Am=i(AL,BJ,Ae,u),D=i(AL,BJ,As),o=i(AL,BJ,Az,AD),y=i(AL,BJ,Ad),x=i(AL,BJ,AY,Q),l="<option></option>",BI='<form id="auiSchedulerEventRecorderForm" class="'+[A2,M,Y].join(V)+'">'+'<div class="'+[A6,c,N].join(V)+'">'+'<div class="'+[z,Ah].join(V)+'aui-fieldset-content aui-column-content">'+'<div class="'+AK+'">'+'<span class="'+[C,Ao].join(V)+'">'+'<span class="'+BA+'">'+'<label class="'+E+'">{when}:</label>'+'<span id="auiSchedulerEventRecorderWhen" class="'+Am+'"></span>'+"</span>"+"</span>"+'<span class="'+[C,Ao].join(V)+'">'+'<span class="'+BA+'">'+'<label class="'+E+'" for="auiSchedulerEventRecorderDesc">{description}</label>'+'<input id="auiSchedulerEventRecorderDesc" class="'+[A1,a,D].join(V)+'" size="30" type="text" />'+'<div class="'+o+'">'+"<span>{description-hint}</span>"+"</div>"+"</span>"+"</span>"+'<span class="'+[C,Z,Ai].join(V)+'">'+'<label class="'+E+'" for="auiSchedulerEventRecorderSelect">{repeat}:</label>'+'<select id="auiSchedulerEventRecorderSelect" class="'+[A1,AF,y].join(V)+'">'+'<option selected="selected" value="">{no-repeat}</option>'+"</select>"+"</span>"+'<div id="auiSchedulerEventRecorderButtonRow" class="'+[C,J,x].join(V)+'"></div>'+"</div>"+"</div>"+"</div>"+"</form>";var t=AX.Component.create({NAME:AM,ATTRS:{content:{value:U},duration:{value:60},dateFormat:{value:"%a, %B %d,",validator:A8},event:{},strings:{value:{},setter:function(A){return AX.merge({save:"Save",cancel:"Cancel",description:"Description",edit:"Edit",repeat:"Repeat",when:"When","description-hint":"e.g., Dinner at Brian's","no-repeat":"No repeat"},A||{});},validator:m},overlayContextPanel:{value:{},setter:function(BC){var A=this;var BD=AX.Node.create(AX.substitute(BI,A.get(p)));return AX.merge({align:{points:[BF,B]},anim:false,bodyContent:BD,hideOn:AR,trigger:A.get(S),visible:false,zIndex:9999},BC||{});}}},EXTENDS:AX.SchedulerEvent,prototype:{initializer:function(){var A=this;A._createEvents();A.after("schedulerChange",A._afterSchedulerChange);A.on("startDateChange",A._onStartDateChange);A.get(S).addClass(AI);},showOverlay:function(){var A=this;if(!A.overlay){A._initOverlay();}A.overlay.render().show();},getEventCopy:function(BC){var A=this;var BM=A.overlayDescNode.val();var BD=A.get(BK);if(!BD){BD=new AX.SchedulerEvent({endDate:A.get(Af),scheduler:A.get(AB),startDate:A.get(BB)});BD.copyPropagateAttrValues(A,{content:true});}BD.set(Ad,A.overlaySelectNode.val());if(BM){BD.set(AT,BM);}return BD;},hideOverlay:function(){var A=this;if(A.overlay){A.overlay.hide();}},loadFormValues:function(){var A=this;var BM=U;var BD=U;var BC=A.get(BK);if(BC){var BN=BC.get(Ad);if(BN){BM=BN.value;}BD=BC.get(AT);}A.overlaySelectNode.val(BM);A.overlayWhenNode.setContent(A._getWhenFormattedDt());setTimeout(function(){A.overlayDescNode.val(BD).selectText();},0);},_afterSchedulerChange:function(BM){var A=this;var BD=BM.newVal;var BC=BD.get(T);BC.delegate("click",AX.bind(A._onClickSchedulerEvent,A),AN+W);},_createEvents:function(){var A=this;var BC=function(BD,BM){A.publish(BD,{defaultFn:BM,queuable:false,emitFacade:true,bubbles:true});};BC(AW,this._defSaveEventFn);BC(b,this._defEditEventFn);BC(AA,this._defCancelEventFn);},_initOverlay:function(){var BC=this;var A=BC.get(p);BC.overlay=new AX.OverlayContextPanel(BC.get(g));var BM=BC.overlay;var BD=BM.get(T);var BN=BM.get(AO);BC.overlayButtonRowNode=BN.one(h+e);BC.overlayDescNode=BN.one(h+A4);BC.overlaySelectNode=BN.one(h+Aq);BC.overlayWhenNode=BN.one(h+AE);BC.overlaySaveBtn=new AX.ButtonItem({label:A.save,icon:AQ,render:BC.overlayButtonRowNode,handler:{fn:BC._handleSaveEvent,context:BC}});BC.overlayEditBtn=new AX.ButtonItem({label:A.edit,icon:P,render:BC.overlayButtonRowNode,handler:{fn:BC._handleEditEvent,context:BC}});
BC.overlayCancelBtn=new AX.ButtonItem({label:A.cancel,render:BC.overlayButtonRowNode,handler:{fn:BC._handleCancelEvent,context:BC}});AX.each(AX.SchedulerEventRepeat,function(BP,BO){BC.overlaySelectNode.append(AX.Node.create(l).val(BP.value||BO).setContent(BP.description));});BM.on("hide",AX.bind(BC._onOverlayHide,BC));BM.on("show",AX.bind(BC._onOverlayShow,BC));BN.on("submit",AX.bind(BC._onSubmitForm,BC));BD.addClass(BL);},_defCancelEventFn:function(BC){var A=this;A.hideOverlay();},_defEditEventFn:function(BC){var A=this;A.hideOverlay();},_defSaveEventFn:function(BD){var A=this;var BC=A.get(AB);BC.addEvent(BD.newSchedulerEvent);A.hideOverlay();BC.syncEventsUI();},_getWhenFormattedDt:function(){var BD=this;var BC=BD.get(AU);var BN=(BD.get(BK)||BD);var BP=BN.get(Af);var BO=BN.get(AB);var A=BN.get(BB);var BM=(BO.get(r).get(An)?O.toIsoTimeString:O.toUsTimeString);return[BN._formatDate(A,BC),BM(A),A5,BM(BP)].join(V);},_handleEditEvent:function(BC){var A=this;A.fire(b,{newSchedulerEvent:A.getEventCopy()});BC.preventDefault();},_handleSaveEvent:function(BC){var A=this;A.fire(AW,{newSchedulerEvent:A.getEventCopy()});BC.preventDefault();},_handleCancelEvent:function(BC){var A=this;A.fire(AA);BC.preventDefault();},_onClickSchedulerEvent:function(BD){var A=this;var BC=BD.currentTarget.getData(AL);if(BC){if(!A.overlay){A._initOverlay();}A.set(BK,BC);A.overlay.set(K,BC.get(S));A.get(S).remove();A.showOverlay();}},_onOverlayHide:function(BD){var A=this;var BC=A.get(S);if(A.overlay){A.set(BK,null);A.overlay.set(K,BC);}BC.remove();},_onOverlayShow:function(BD){var BC=this;var BM=BC.overlayEditBtn;var A=BC.overlaySaveBtn;if(BC.get(BK)){BM.show();A.hide();}else{BM.hide();A.show();}BC.loadFormValues();},_onStartDateChange:function(BC){var A=this;var BD=A.get(Ar);A.set(Af,O.add(BC.newVal,O.MINUTES,BD));},_onSubmitForm:function(BC){var A=this;if(A.get(BK)){A._handleEditEvent(BC);}else{A._handleSaveEvent(BC);}}}});AX.SchedulerEventRecorder=t;},"@VERSION@",{skinnable:true,requires:["aui-base","aui-color-util","aui-datatype","aui-overlay-context-panel","substitute"]});