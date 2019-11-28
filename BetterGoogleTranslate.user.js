// ==UserScript==
// @name         Better Google Translate
// @namespace    http://legendword.com/
// @updateURL    https://github.com/legendword/Better-Google-Translate/raw/master/BetterGoogleTranslate.user.js
// @downloadURL  https://github.com/legendword/Better-Google-Translate/raw/master/BetterGoogleTranslate.user.js
// @version      0.2
// @description  Provides an overall better Google Translate experience.
// @author       You
// @match        https://translate.google.com/*
// @match        https://translate.google.cn/*
// @match        https://translate.google.ca/*
// @match        https://translate.google.co.uk/*
// @grant        GM_log
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}

var bgt = {
    s: {
        ap: true,
        pa: false
    },
    keyEvent: function(e){
        //GM_log(e.keyCode);
        if (e.keyCode===65&&e.metaKey) {
            document.getElementById("source").focus();
        }
        if (e.keyCode==13) {
            if (bgt.s.ap) {
                if (document.activeElement.id=="source") {
                    var targetNode = document.getElementsByClassName("src-tts left-positioned ttsbutton jfk-button-flat source-or-target-footer-button jfk-button")[0];
                    triggerMouseEvent (targetNode, "mouseover");
                    triggerMouseEvent (targetNode, "mousedown");
                    triggerMouseEvent (targetNode, "mouseup");
                    //triggerMouseEvent (targetNode, "click");
                    document.getElementById("source").focus();
                }
            }
        }
    },
    createColumn: function() {
        var bt = document.createElement("div");
        bt.innerHTML = "&nbsp;";
        bt.setAttribute("class", "bgt-button-seperator");
        document.querySelector(".tlid-input-button-container.focus-wrapper").append(bt);
    },
    createButton: function(text,id,isActive) {
        var bt = document.createElement("div");
        var btt = document.createElement("div");
        bt.append(btt);
        btt.innerHTML = text;
        bt.setAttribute("class", "tlid-input-button input-button header-button tlid-input-button-text bgt-button"+(isActive?" bgt-button-active":""));
        bt.setAttribute("style", "padding-left: 16px;");
        bt.setAttribute("tabindex", "-1");
        bt.setAttribute("id", id);
        btt.setAttribute("class", "text");
        document.querySelector(".tlid-input-button-container.focus-wrapper").append(bt);
        bt.addEventListener("click", bgt.btnClick);
    },
    btnClick: function(e) {
        var elem = e.target.id=="" ? e.target.parentElement : e.target;
        var id = elem.id;
        if (id=="bgt-ap") {
            bgt.s.ap = !bgt.s.ap;
            elem.setAttribute("class", "tlid-input-button input-button header-button tlid-input-button-text bgt-button"+(bgt.s.ap?" bgt-button-active":""));
        }
        else if (id=="bgt-pa") {
            bgt.s.pa = !bgt.s.pa;
            elem.setAttribute("class", "tlid-input-button input-button header-button tlid-input-button-text bgt-button"+(bgt.s.pa?" bgt-button-active":""));
        }
    }
};

(function() {
    'use strict';
    window.addEventListener("keydown",bgt.keyEvent);
    bgt.createColumn();
    bgt.createButton("Automatic Pronounciation", "bgt-ap", bgt.s.ap);
    bgt.createButton("Prevent Autofill (W.I.P.)", "bgt-pa", bgt.s.pa);
    GM_addStyle(`
.bgt-button-seperator {
    display: inline-block;
    margin-right: 22px;
    margin-left: 12px;
    border-left: 2px solid #dadce0;
    line-height: 36px;
}
.bgt-button {
    color: #e88b1a !important;
}
.bgt-button-active {
    background-color: #f452421f;
    border: 1px solid #fcdcd2;
}`);
})();

