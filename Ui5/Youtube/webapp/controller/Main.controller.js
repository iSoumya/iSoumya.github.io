sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/yp/YoutubeProject/control/YTVideo"
], function(Controller,YTVideo) {
	"use strict";
	return Controller.extend("com.yp.YoutubeProject.controller.Main", {
		onSelectV:function(oEvent){
			alert('You have pressed '+ oEvent.getSource().getTitle());
		},
		onDeleteAll:function(oEvent){
			var that=this;
			var dialog = new sap.m.Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new sap.m.Text({ text: 'Are you sure you want to delete all videos?' }),
				beginButton: new sap.m.Button({
					text: 'Submit',
					press: function () {
						var ytc=this.getView().byId("ytcontainer");
						ytc.removeAllItems();
						sap.m.MessageToast.show('Submit pressed!');
						dialog.close();
					}.bind(that)
				}),     
				endButton: new sap.m.Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		onAddNew:function(oEvent){//For adding new video
			var that=this;
				var dialog = new sap.m.Dialog({
				title: 'Add New',
				type: 'Message',
				content: [
					new sap.m.Label({text:"Video Title"}),
					new sap.m.Input({placeholder:"Enter Title"}),
					new sap.m.Label({text:"Video Link"}),
					new sap.m.Input({value:"https://"})],
				beginButton: new sap.m.Button({
					text: 'Submit',
					press: function (oEvent) {
						var title=dialog.getContent()[1].getValue();
						var link=dialog.getContent()[3].getValue();
						var ytc=this.getView().byId("ytcontainer");
						ytc.addItem(
							new YTVideo({
								youtubeLink: link,
								title:title,
								select:function(oEvent){this.onSelectV(oEvent);}.bind(this)
							}));
						sap.m.MessageToast.show('Will be added!');
						dialog.close();
					}.bind(that)
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		}
	});
});