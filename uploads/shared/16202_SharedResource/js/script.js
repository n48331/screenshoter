/*--------------------config.js script--------------------*/
var touchEvent = touchEvent();
function isTouchDevice() {
    return 'ontouchstart' in window;
}
function touchEvent() {
    if (isTouchDevice())
        return 'touchend';
    else
        return 'click';
}
var config = {
    "project": "16202",
    slides: {

        s1: {
            name: "s1",
            zipFile: "16202_Imbruvica_S1_Opening_slide.zip",
        },
        s2: {
            name: "s2",
            zipFile: "16202_Imbruvica_S2_Living_Ahead.zip",
        },

        s3: {
            name: "s3",
            zipFile: "16202_Imbruvica_S3_Proven_long_term_survival.zip",
        },

        s4: {
            name: "s4",
            zipFile: "16202_Imbruvica_S4_high_risk_patient_subtypes.zip",
        },

        s5: {
            name: "s5",
            zipFile: "16202_Imbruvica_S5_extensive_real_world_experience.zip",
        },

        s6: {
            name: "s6",
            zipFile: "16202_Imbruvica_S6_1L_CLL_patients.zip",
        },

        s7: {
            name: "s7",
            zipFile: "16202_Imbruvica_S7_Time_to_next_treatment.zip",
        },

        s8: {
            name: "s8",
            zipFile: "16202_Imbruvica_S8_tolerability_profile.zip",
        },
        s9: {
            name: "s9",
            zipFile: "16202_Imbruvica_S9_flexible_dosing.zip",
        },
        s10: {
            name: "s10",
            zipFile: "16202_Imbruvica_S10_SMPC.zip",
        },
        s11: {
            name: "s11",
            zipFile: "16202_Imbruvica_S11_Living_Ahead.zip",
        },
        s12: {
            name: "s12",
            zipFile: "16202_Imbruvica_S12_Strength_through_synergy.zip",
        },
        s13: {
            name: "s13",
            zipFile: "16202_Imbruvica_S13_superior_efficacy.zip",
        },
        s14: {
            name: "s14",
            zipFile: "16202_Imbruvica_S14_favorable_safety_profile.zip",
        },
        s15: {
            name: "s15",
            zipFile: "16202_Imbruvica_S15_all_oral_fixed_duration.zip",
        },
        s16: {
            name: "s16",
            zipFile: "16202_Imbruvica_S16_SMPC.zip",
        },
    },
    coreflow: {
        /*First flow should have all the slides*/
        f0: {
            content: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14', 's15', 's16'],
            name: "Flow 0",
        },
    },
    "carSlide": ["s10"],

}
/*-------------------------------------------------------*/
/*-----------------framework.js script-------------------*/
var app = {
    var: {
        slides: {},
        coreflow: {},
        project: "",
        currentSlide: "",
        firstflow: "",
        locstorage: {},
        nextslide: "",
        prevslide: "",
        navig: "",
        env: "",
        anchor: "",
        smpcSlidesArr: "",
        fragments: "",
        account: ""
    },
    start: {
        init: function () {
            var e = app,
                t = e.var;
            t.project = config.project, t.slides = config.slides, t.coreflow = config.coreflow, t.currentSlide = currentSlide, config.vaultId && (t.vault = config.vaultId), config.smpcSlides && (t.smpcSlidesArr = config.smpcSlides.content), t.firstflow = Object.keys(config.coreflow)[0], e.rte.check(), e.storage.check(), e.logic.getdirection(t.locstorage.flow, t.currentSlide), null != localStorage.getItem("lastVisited") && (app.var.lastVisited = JSON.parse(localStorage.getItem("lastVisited"))), localStorage.getItem("NGTool") ? t.env = "dev" : t.env = ""
        },
        test: function () {
            localStorage.setItem("NGTool", "yes"), location.reload()
        }
    },
    stop: {
        test: function () {
            localStorage.setItem("NGTool", ""), location.reload()
        }
    },
    logic: {
        getdirection: function (e, t) {
            var o = app,
                a = o.logic;
            flowitm = o.var.coreflow[e].content, a.getNext(flowitm, t), a.getPrev(flowitm, t)
        },
        getIndex: function (e, t) {
            var o;
            return Object.keys(e).map(function (a, i) {
                e[a] !== t || (o = i + 1)
            }), o
        },
        getNext: function (e, t) {
            var o, a = app.var;
            app.logic.getIndex(app.var.locstorage.flow, t);
            e.indexOf(t) == e.length - 1 ? nextslide = "" : (o = e[e.indexOf(t) + 1], nextslide = a.slides[o].zipFile), app.var.nextslide = nextslide
        },
        getPrev: function (e, t) {
            var o, a = app.var;
            0 == e.indexOf(t) ? prevslide = "" : (o = e[e.indexOf(t) - 1], prevslide = a.slides[o].zipFile), app.var.prevslide = prevslide
        }
    },
    rte: {
        check: function (e = config.rteconnect) {
            var t = app.var;
            e && t.slides[t.currentSlide].rteId
        },
        click: function () {
            var e = app.var;
            void 0 !== e.slides[e.currentSlide].rteId && e.slides[e.currentSlide].rteId ? (console.log("RTE is enabled"), com.veeva.clm.getDataForCurrentObject("Account", "ID", function (e) {
                1 == e.success || alert("Please Select an Account to proceed")
            }), com.veeva.clm.getApprovedDocument(app.var.vault, e.slides[e.currentSlide].rteId, function (e) {
                1 == e.success && (emailerid = e.Approved_Document_vod__c.ID, com.veeva.clm.launchApprovedEmail(emailerid, [], function () { }))
            })) : console.log("RTE is not enabled for this slide")
        },
        findId: function (e) {
            alert("findId"), 1 == e.success && (myTemplate = e.Approved_Document_vod__c.ID, com.veeva.clm.getApprovedDocument(app.var.vault, [], app.rte.launch))
        },
        launch: function (e) {
            alert(entered);
            var t = app.var;
            1 == e.success && (com.veeva.clm.launchApprovedEmail(t.slides[t.currentSlide].rteId, [], function () {
                alert("Success")
            }), t.account || alert("Please select the account"))
        }
    },
    setLastVisited: function () {
        var e = app.var,
            t = {};
        (t = JSON.parse(localStorage.getItem(e.project))).lastPresentation = t.presentation, t.lastFlow = t.flow, t.lastSlide = t.slide, localStorage.setItem("lastVisited", JSON.stringify(t))
    },
    setAnchor: function () {
        var e = app.var,
            t = {};
        (t = JSON.parse(localStorage.getItem(e.project))).lastPresentation = t.presentation, t.lastFlow = t.flow, t.lastSlide = t.slide;
        var o = JSON.stringify(t);
        localStorage.setItem(e.project, o)
    },
    setAccount: function () {
        var e = app.var;
        e.account = 0, e.veevaApp.getDataForCurrentObject("Account", "ID", function (t) {
            1 == t.success ? e.account = t.Account.ID : console.log("asd")
        })
    },
    goNextSlide: function () {
        app.var.nextslide ? (app.setLastVisited(), app.goTo(app.var.nextslide, "next")) : console.log("Last Slide")
    },
    goPrevSlide: function () {
        app.var.prevslide ? (app.setLastVisited(), app.goTo(app.var.prevslide, "prev")) : console.log("First Slide")
    },
    goToSlidezip: function (e, t) {
        app.setLastVisited();
        var o = app.var;
        app.storage.setValue(e, t);
        var a = o.slides[t].zipFile;
        app.goTo(a)
    },
    goToLastVisited: function () {
        if (localStorage.getItem("lastVisited")) {
            var e = JSON.parse(localStorage.getItem("lastVisited"));
            app.goToSlidezip(e.lastFlow, e.lastSlide)
        }
    },
    goTo: function (e, t = "") {
        var o;
        if (app.var.locstorage.navig > 10 && "dev" == app.var.env) {
            o = e.slice(0, -4);
            var a = document.getElementById("mainWrapper"),
                i = 0,
                r = setInterval(function () {
                    i > 499 ? (clearInterval(r), document.location = "../" + o + "/" + o + ".html") : (i += 80, "next" == t ? a.style.left = -i + "px" : "prev" == t && (a.style.left = i + "px"))
                }, 5)
        } else com.veeva.clm.gotoSlide("" + e)
    },
    goToPi: function (component) {
        var that = this, v = app.var, flow, slide, flowitm;
        flow = component.getAttributeNode("data-flow").value;
        slide = component.getAttributeNode("data-slide").value;
        console.log('text', slide)
        if (flow && slide) {
            flowitm = v.coreflow[flow].content;
            if (flowitm.includes(slide)) {
                if (app.var.currentSlide !== 's11') {
                    app.setParentSlide(1);
                }
                app.goToSlidezip(flow, slide);
            } else {
                console.log("Slide " + slide + " is not present in the flow " + flow);
            }
        }
    },
    setParentSlide: function (act) {
        if (act == 1) {
            localStorage.setItem('parentSlide', app.var.currentSlide);
        } else {
            localStorage.setItem('parentSlide', '');
        }
    },
    goToParentSlide: function () {
        // console.log('aaaaa');
        if (localStorage.getItem('parentSlide') != '') {
            // console.log('aaaaa');
            var slide = localStorage.getItem('parentSlide');
            var flow = 'f0';
            app.setParentSlide(0);
            app.goToSlidezip(flow, slide);
        }
    },
    setSubParentSlide: function (act) {
        if (act == 1) {
            localStorage.setItem('goToHome1', app.var.currentSlide);
        } else {
            localStorage.setItem('goToHome1', '');
        }
    },
    gotoSubParent: function () {
        // console.log('aaaaa');
        if (localStorage.getItem('goToHome1') != '') {
            // console.log('aaaaa');
            var slide = localStorage.getItem('goToHome1');
            var flow = 'f0';
            app.setSubParentSlide(0);
            app.goToSlidezip(flow, slide);
        }
    },
    gotoRefParent: function () {
        if (localStorage.getItem(app.var.project + '_refOrigin') != '') {
            // console.log('aaaaa');
            var slide = localStorage.getItem(app.var.project + '_refOrigin');
            var flow = 'f0';
            localStorage.setItem(app.var.project + '_refOrigin', '');
            app.goToSlidezip(flow, slide);
        }
    },
    setsub_slide_localstorage: function (sub_slide) {
        if (sub_slide != null && sub_slide != '') {
            localStorage.setItem("goToPrev", sub_slide);
        } else {
            localStorage.setItem("goToPrev", '');
        }
    },
    Checksub_slide_localstorage: function (goToHome) {
        if (goToHome != '' && goToHome != null) {
            // var item = goToHome - 1;
            $(".item").removeClass('active');
            $(".item:nth-child(" + goToHome + ")").addClass('active');
            // console.log('aaaaaaaa', goToHome)
            app.setsub_slide_localstorage(0);
        }
    },

    getActiveItem: function () {
        $('.item').each(function () {
            if ($(this).hasClass('active')) {
                var X = $(this).find('section').attr('class');
                var activeItem = X.split('-')[1]
                app.setsub_slide_localstorage(activeItem);
                // console.log(X);
            }

            // console.log($(this));
        });
    },

    goToHomeButton: function (component) {
        var that = this, v = app.var, flow, slide, flowitm;
        flow = component.getAttributeNode("data-flow").value;
        slide = component.getAttributeNode("data-slide").value;
        if (component.hasAttribute("p_sub_slide")) {
            var p_sub_slide = component.getAttributeNode("p_sub_slide").value;
            localStorage.setItem(app.var.project + "sub_slide", p_sub_slide);
        }
        if (component.hasAttribute("data-popup")) {
            var dataPopup = component.getAttributeNode("data-popup").value;
            localStorage.setItem(app.var.project + "data_popup", dataPopup);
        }
        var sub_slide = component.getAttributeNode("sub_slide").value;

        app.setsub_slide_localstorage(sub_slide);
        if (flow && slide) {
            var goToHome = v.currentSlide;
            localStorage.setItem("goToHome1", goToHome);
            flowitm = v.coreflow[flow].content;
            //console.log(flowitm)
            //console.log(flowitm.includes("s030"));
            if (flowitm.includes(slide)) {
                var zipFile = v.slides[slide].zipFile;
                app.goTo(zipFile, '', goToHome);
            } else {
                console.log("Slide " + slide + " is not present in the flow " + flow);
            }
        }
    },
    goToRef: function (component) {
        var that = this, v = app.var, flow, slide, flowitm, curSlide;
        flow = component.getAttributeNode("data-flow").value;
        slide = component.getAttributeNode("data-slide").value;
        if (flow && slide) {
            curSlide = v.currentSlide;
            localStorage.setItem(v.project + "_refOrigin", curSlide);
            flowitm = v.coreflow[flow].content;
            app.storage.setValue(flow, slide);
            if (flowitm.includes(slide)) {
                // console.log('aaaaaaa')
                app.goToSlidezip(flow, slide);
            } else {
                console.log("Slide " + slide + " is not present in the flow " + flow);
            }
        }
    },
    goToButton: function (e) {
        var t, o, a = app.var;
        t = e.getAttributeNode("data-flow").value, o = e.getAttributeNode("data-slide").value, t && o && (a.coreflow[t].content.includes(o) ? app.goToSlidezip(t, o) : console.log("Slide " + o + " is not present in the flow " + t))
    },
    goToDifferentSlide: function (e, t = "") {
        com.veeva.clm.gotoSlide("" + e, t)
    },
    setAnchor: function (e) {
        var t = app.var;
        t.anchor = t.currentSlide, this.goToButton(e)
    },
    storage: {
        setValue: function (e, t) {
            var o, a, i, r = app.var;
            o = JSON.parse(localStorage.getItem(r.project)), (a = {}).presentation = o.presentation, a.flow = e, a.slide = t, r.anchor ? a.anchor = r.anchor : a.anchor = o.anchor, a.navig = o.navig, a.lastSlide = o.currentSlide, i = JSON.stringify(a), localStorage.setItem(r.project, i), r.locstorage = a
        },
        check: function () {
            var e, t = app.var,
                o = navigator.userAgent;
            if (app.var.navig = o.indexOf("Chrome"), null === localStorage.getItem(t.project)) {
                (i = {}).presentation = t.project, i.flow = t.firstflow, i.slide = t.currentSlide, i.anchor = t.anchor, i.lastSlide = t.currentSlide, i.navig = t.navig;
                var a = JSON.stringify(i);
                localStorage.setItem(t.project, a), t.locstorage = i
            } else if (e = JSON.parse(localStorage.getItem(t.project)), flowitm = t.coreflow[e.flow].content, t.currentSlide == e.slide && flowitm.includes(t.currentSlide)) t.locstorage = e, t.lastVisited = e.lastSlide;
            else if (flowitm.includes(t.currentSlide)) {
                (i = {}).presentation = e.presentation, i.flow = e.flow, i.slide = t.currentSlide, i.navig = e.navig, i.lastSlide = t.currentSlide, t.anchor ? i.anchor = t.anchor : i.anchor = e.anchor;
                a = JSON.stringify(i);
                localStorage.setItem(t.project, a), t.locstorage = i
            } else {
                var i;
                (i = {}).presentation = e.presentation, i.flow = t.firstflow, i.slide = t.currentSlide, i.anchor = t.anchor, i.navig = e.navig, t.anchor ? i.anchor = t.anchor : i.anchor = e.anchor;
                a = JSON.stringify(i);
                localStorage.setItem(t.project, a), t.locstorage = i
            }
        },
        test: function () {
            var e = app.var;
            localStorage.customPresentation && "{}" !== localStorage.customPresentation && (e.customsavedslides = JSON.parse(localStorage.getItem("presentation")), Object.keys(e.customsavedslides).map(function (t, o) {
                e.slideshow[Name] = {}, e.slideshow[Name] = e.customsavedslides[t]
            }))
        }
    },
    bindSwipe: function () {
        $(".mainWrapper").swipe({
            swipe: function (e, t, o, a, i, r) {
                var l = app,
                    n = 1;
                "left" === t ? n < len && (n++, idName = l.getNext(l.var.slideshow[currentSlide].content, slide), l.goToSlide(n, idName)) : "right" === t && n > 1 && (n--, idName = l.getPrev(l.var.slideshow[currentSlide].content, slide), l.goToSlide(n, idName))
            }
        })
    },
    isTouchDevice: function () {
        return "ontouchstart" in window
    },
    init: function () {
        this.start.init()
    }
};
app.init();
/*-------------------------------------------------------*/

/*-----------------baseScript.js script------------------*/
var currentSlide = 0;
$(document).ready(function () {
    $("body").bind("touchmove", function (e) {
        e.preventDefault();
    });
    var carSlide = config.carSlide;

    var swipeElement = 'body';
    if ($('body').hasClass('carousel')) {
        swipeElement = '.carousel';
    }
    // console.log('swipeElement..', swipeElement);
    $(swipeElement).swipe({
        //Generic swipe handler for all directions
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

            switch (direction) {

                case 'left':
                    // console.log('is it coming..left');
                    if (!$("#popup-wrapper").is(":visible")) {
                        if (carSlide.includes(app.var.currentSlide)) {
                            if ($("#carousel-example-generic").is(":visible")) {
                                var slideLength = $("#carousel-example-generic .carousel-inner section").length;

                                if ($("#carousel-example-generic .section-" + slideLength).parent(".item").hasClass('active')) {
                                    app.goNextSlide();
                                } else {
                                    $(this).carousel('next');
                                }
                            }
                        } else {
                            app.goNextSlide();
                        }
                    }
                 
                    break;
                case 'right':
                    // console.log('is it coming..right');
                    if (!$("#popup-wrapper").is(":visible")) {
                        if (carSlide.includes(app.var.currentSlide)) {
                            if ($("#carousel-example-generic").is(":visible")) {
                                var slideLength = 1
                                if ($("#carousel-example-generic .section-" + slideLength).parent(".item").hasClass('active')) {
                                    app.goPrevSlide();
                                } else {
                                    $(this).carousel('prev');
                                }
                            }
                        } else {
                            if (app.var.currentSlide == "s11") {
                                localStorage.setItem(app.var.project + 'sub_slide', 2);
                            }
                            app.goPrevSlide();
                        }
                    }
                
                    break;
                default:
                    break;
            }
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 100
    });


    $(document).on(touchEvent, ".goToButton", function () {
        app.goToButton(this);
    });
    $(document).on(touchEvent, ".goToHomeButton", function () {
        app.goToHomeButton(this);
    });

    $(document).on(touchEvent, ".goToSmpc", function () {
        app.goToSmpc(this);
    });
    $(document).on(touchEvent, '.goToButton', function () {
        // console.log("fix it");
        console.log("gotbutton", this);
        if (typeof $(this).attr('sub_slide') != 'undefined' && $(this).attr('sub_slide') != false) {
            var sub_slide = $(this).attr('sub_slide');
            localStorage.setItem(app.var.project + "sub_slide", sub_slide);
        }
        app.goToButton(this);
    });
});

function storeToCRM(zipfile, description) {
    var clickStream = {};
    clickStream.Track_Element_Id_vod__c = "" + zipfile;
    clickStream.Track_Element_Description_vod__c = "" + description;
    clickStream.Track_Element_Type_vod__c = "Main Slide";
    com.veeva.clm.createRecord("Call_Clickstream_vod__c", clickStream, pushDataToCRMDone);
}

function pushDataToCRMDone() {
    console.log("tracked");
}

if ("dev" == app.var.env) {
    if ($("body").prepend("<button id='settingOptRV' class='settingOptRV'></button><div class='settingDetail' style='z-index:1; background-color:rgb(255 255 0 / 70%); color:red; position:absolute; padding: 10px; max-width:150px; word-break: break-all;'><h3 style='color:black'>NextGen eDetail</h3>Slide: <b>" + app.var.currentSlide + "</b><br/>Flow: " + app.var.firstflow + "<br/><br/>Highlight: <input type='checkbox' id='SettingHighlight'/><br/>SlideNumber: <input type='checkbox'  id='SettingSno'/><br/>AutoPlay: <input type='checkbox' id='SettingPlay'/><br/><br/>Previous Slide: <br/><small style='color:black'>" + app.var.prevslide + "</small><br/>NextSlide: <br/><small style='color:black'>" + app.var.nextslide + "</small><br/></div>"), $("#bottommenu div").on("click", function () { $(this).trigger("tap") }), $(document).on("click", "#bottommenu div, #infoclose", function () { $(this).trigger("tap") }), null === localStorage.getItem("NextGenEDA")) { var ng = { autoplay: !1, highlight: !1, slideview: !1, other: !1 }, sjstring = JSON.stringify(ng); localStorage.setItem("NextGenEDA", sjstring) } else ng = JSON.parse(localStorage.getItem("NextGenEDA")); $(document).ready(function () { function t(t = 1) { 1 == t ? ($(".goToButton").addClass("hg"), $("#bottommenu > div").addClass("hg")) : ($(".goToButton").removeClass("hg"), $("#bottommenu > div").removeClass("hg")) } function e() { $(".goToButton").each(function () { $(this).html($(this).attr("data-slide")) }) } function i() { setInterval(function () { var t = app.var.nextslide; app.goTo(t) }, 2e3) } ng.highlight && (t(), $("#SettingHighlight").attr("checked", "true")), ng.slideview && (e(), $("#SettingSno").attr("checked", "true")), ng.autoplay && (i(), $("#SettingPlay").attr("checked", "true")), $("#SettingHighlight").change(function () { if (hgng = ng, this.checked) { var e = confirm("Are you sure to highlight the click buttons?"); $(this).prop("checked", e), t(), hgng.highlight = !0 } else t(0), hgng.highlight = !1; var i = JSON.stringify(hgng); localStorage.setItem("NextGenEDA", i) }), $("#SettingSno").change(function () { if (snong = ng, this.checked) { var t = confirm("Are you sure to show the slide numbers?"); $(this).prop("checked", t), e(), snong.slideview = !0 } else snong.slideview = !1; var i = JSON.stringify(snong); localStorage.setItem("NextGenEDA", i) }), $("#SettingPlay").change(function () { if (spng = ng, this.checked) { var t = confirm("Are you sure to enable autoplay?"); $(this).prop("checked", t), i(), spng.autoplay = !0 } else spng.autoplay = !1; var e = JSON.stringify(spng); localStorage.setItem("NextGenEDA", e) }), $(".goToButton").unbind().bind("click", function () { app.goToButton(this) }), $("#settingOptRV").unbind().bind("click", function () { $(".settingDetail").toggle("slow") }) })
    $("body").css({ "background": "linear-gradient(to right, rgb(40, 48, 72), rgb(133, 147, 152))", "width": "100vw", "height": "100vh" });
}
/*-------------------------------------------------------*/