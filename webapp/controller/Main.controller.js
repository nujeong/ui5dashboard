sap.ui.define([
	"ysc/websocket/controller/BaseController",
	"sap/ui/model/Filter"
], function(Controller,Filter) {
	"use strict";

	return Controller.extend("ysc.websocket.controller.Main", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ysc.websocket.view.Step01
		 */
			onInit: function() {
			   this._oChart = this.byId("idVizFrame");
			   var oLocalData = {"Year":""};
			   var oViewModel = new sap.ui.model.json.JSONModel();
				oViewModel.setData(oLocalData);
				this.getView().setModel(oViewModel, "localModel");
			   this.getRouter().getRoute("salesByCountry").attachPatternMatched(this._onObjectMatched, this);
			},
			_onObjectMatched:function(oEvent){
				    var locModel = this.getModel("localModel");
					var sYear = oEvent.getParameter("arguments").Year;
					var oModel = this.getModel();
					var aFilter = [new Filter({
						path: 'Year',
						operator: 'EQ',
						value1: sYear
					})];
					locModel.setProperty("/Year",sYear);
				    this._oChart.getDataset().getBinding("data").filter(aFilter);
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ysc.websocket.view.Step01
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ysc.websocket.view.Step01
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ysc.websocket.view.Step01
		 */
		//	onExit: function() {
		//
		//	}
		
		
		toNumber:function(sValue){
			var newValue = sValue.replace(',','');
			return newValue*1;
		}

	});

});