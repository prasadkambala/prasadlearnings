sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("c.cog.controller.View1", {
		onInit: function () {
			
			var OData={
					"results":[
						{
							"attibuteDesc":"fall",
							"attributeCount":"01"
						},
						{
							"attibuteDesc":"fall1",
							"attributeCount":"02"
						},
						{
							"attibuteDesc":"fall2",
							"attributeCount":"03"
						},
						{
							"attibuteDesc":"fall3",
							"attributeCount":"04"
						}
						
						
					]
			};
            var oModel1=new sap.ui.model.json.JSONModel(OData); 
            this.getView().setModel(oModel1,"attributes");
            
            var OData1={
					"results":[
						{
							"attibuteDesc":"fall",
							"attributeCount":"01"
						},
						{
							"attibuteDesc":"fall1",
							"attributeCount":"02"
						},
						{
							"attibuteDesc":"fall2",
							"attributeCount":"03"
						},
						{
							"attibuteDesc":"fall3",
							"attributeCount":"04"
						}
						
						
					]
			};
            var oModel2=new sap.ui.model.json.JSONModel(OData1); 
            this.getView().setModel(oModel2,"attributes1");
			
			var oModel= new sap.ui.model.odata.v2.ODataModel("proxy/https/services.odata.org/V2/Northwind/Northwind.svc/");
			this.getView().setModel(oModel);
		},
		onedit:function(oEvent){
			var abc=this.getView().getModel("attributes1").getData().results;
			var tableData=[];
			var tableData1=[];
			
			tableData.push(this.getView().byId("td1").getModel("attributes").getData());
			for(var i=0;i<4;i++){
				tableData1.push(tableData[0].results[i]);
			}
			
			
			
			this.compareFunction(abc,tableData1);
		},
		onsave:function(data){
			var entry=[];
			var entry1={};
			for(var i=0;i<data.length;i++){
				var l_attibuteDesc=data[i];
				entry1.attibuteDesc=l_attibuteDesc;
				
				alert(entry1.attibuteDesc);
			}
			
			
		},
		
		compareFunction:function(original, edited){
			var array=[];
		    for(var i=0;i<original.length;i++)
		    	{
		    	  if(original[i].attributeCount ===edited[i].attributeCount)
		    		  {
		    		  if(original[i].attibuteDesc !==edited[i].attibuteDesc){
		    			  array.push(edited[i].attibuteDesc);
		    			  
		    			  
		    		  }
		    		  }
		    	}
			
			this.onsave(array);
		},
		
		onFilterProducts: function (oEvent) {

				// build filter array
				var aFilter = [];
				var filters;
				var sQuery = oEvent.getParameter("query");
				if (sQuery) {
					filters = this.getSearchFiltersp(sQuery);
					aFilter.push(filters);

				}

				// filter binding
				var pList = this.byId("td1");
				var oBinding = pList.getBinding("rows");
				oBinding.filter(aFilter);
			},
			getSearchFiltersp: function (query) {
			return new Filter({
				filters: [
					new Filter("OrderID", FilterOperator.EQ, query),
					new Filter("OrderDate", FilterOperator.Contains, query),
					new Filter("ShipName", FilterOperator.EQ, query)
					

				],
				and: false
			});
		}
		
		
	});
});