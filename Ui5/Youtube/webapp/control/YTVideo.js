sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/core/Icon",
	"sap/m/Text",
	"sap/m/Link"
], function (Control, Icon, Text, Link) {
	"use strict";

	return Control.extend("com.yp.YoutubeProject.control.YTVideo", {
		metadata: {
			properties: {
				videoID: {type: "string", defaultValue: "unknown"},
				youtubeLink: {type: "string", defaultValue: "#"},
				title:{type: "string", defaultValue: "unknown"},
				//Video Frame Width in px
				vfWidth: {type : "sap.ui.core.CSSSize", defaultValue : "200"},
				//Video Frame Height in px
                vfHeight: {type : "sap.ui.core.CSSSize", defaultValue : "200"},
                //Title font size
                titleSize: {type : "sap.ui.core.CSSSize", defaultValue : "14px"}
			},
			aggregations: {
				_videoTitle: {type: "sap.m.Link", multiple: false, visibility: "hidden"}
			},
			events: {
				"select" : {}
			}
		},

		init: function () {
			this.setAggregation("_videoTitle", new Link({
				text: this.getProperty("title"),
				size: "2rem",
				press:this._onSubmit.bind(this)
			}));
		},
		 _onSubmit : function(evt) {  
        	this.fireEvent("select", {});
    	},
		setTitleValue: function (fTitleValue,fVfWidth) {
			this.getAggregation("_videoTitle").setText(fTitleValue);
			this.getAggregation("_videoTitle").setWidth(fVfWidth+"px");
			//this.getAggregation("_videoTitle").setHref(fYoutubeLinkValue);
			//this.getAggregation("_videoTitle").attachPress(this.fireEvent("select", {}));
		},

		reset: function () {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();
		},

		renderer: function (oRM, oControl) {
			//oControl.setValue(oControl.getName(),oControl.getSrc());
			var ylink=oControl.refineYoutubeLink(oControl.getYoutubeLink());
			var id=oControl.refineDivID(oControl.getId(),oControl.getVideoID());
			oControl.setTitleValue(oControl.getTitle(),oControl.getVfWidth());
			oRM.write("<div id='"+id+"'");
			oRM.writeControlData(oControl);
			oRM.addClass("sapUiSmallMargin");
			oRM.writeClasses();
			oRM.write("style='width:"+oControl.getVfWidth()+"px;'>");
			if(ylink==="error"){
					oRM.write("<div style='font-size:"+oControl.getTitleSize()+";width:"+oControl.getVfWidth()+"px;height:"+oControl.getVfHeight()+
					"px;color: red;'>Invalid video link!</div>");
			}
			else{
			oRM.write("<iframe type='text/html'"+
			"width='"+oControl.getVfWidth()+ "' height='"+oControl.getVfHeight()+
			"' src='"+ ylink+
			"' frameborder='0' allowfullscreen></iframe>");
			}
			//oRM.write("<div style='font-size:"+oControl.getTitleSize()+";width:"+oControl.getVfWidth()+"px'>"+oControl.getTitle()+"</div>");
			oRM.renderControl(oControl.getAggregation("_videoTitle"));
			oRM.write("</div>");
		},
		refineYoutubeLink:function(sLink){
			var rLink;
			   var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			    var match = sLink.match(regExp);
			    if (match && match[2].length == 11) {rLink="https://www.youtube.com/embed/"+match[2]+"?disablekb=1&showinfo=0&rel=0";} 
			else{rLink="error";}
			return rLink;
		},
		refineDivID:function(cID,vID){
			var rID;
			if(vID.length===0 || vID === "unknown"){rID=cID+"Content";}
			else{rID=vID;}
			return rID;
		}
	});

});
