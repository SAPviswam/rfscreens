sap.ui.define([
    "sap/ui/Device",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",
    "sap/ui/core/Fragment",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/Popover",
    "sap/m/Text",
    "sap/m/Label",
    "sap/ui/core/UIComponent"

],
    function (Device, Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator, exportLibrary, Spreadsheet, Fragment, ODataMode, Popover, Text, Label, UIComponent) {
        "use strict";
       
        return Controller.extend("com.app.rfscreens.controller.View1", {
            onInit: function () {
                var oModel = new JSONModel(sap.ui.require.toUrl("com/app/rfscreens/model/data.json"));
                this.getView().setModel(oModel);
                this._setToggleButtonTooltip(!Device.system.desktop);
                // Apply the colors permanently in local storage
                var sStoredThemeColor = localStorage.getItem("themeColor");
                var sStoredTileColors = localStorage.getItem("tileColors");
 
                if (sStoredThemeColor && this._isValidColor(sStoredThemeColor)) {
                    this._applyColor(sStoredThemeColor);
                }
 
            },

    
            onItemSelect: function (oEvent) {
                var oItem = oEvent.getParameter("item");
                this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
            },
    
            handleUserNamePress: function (event) {
                var oPopover = new Popover({
                    showHeader: false,
                    placement: PlacementType.Bottom,
                    content: [
                        new Button({
                            text: 'Feedback',
                            type: ButtonType.Transparent
                        }),
                        new Button({
                            text: 'Help',
                            type: ButtonType.Transparent
                        }),
                        new Button({
                            text: 'Logout',
                            type: ButtonType.Transparent
                        })
                    ]
                }).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');
    
                oPopover.openBy(event.getSource());
            },
    
            onSideNavButtonPress: function () {
                var oToolPage = this.byId("toolPage");
                var bSideExpanded = oToolPage.getSideExpanded();
    
                this._setToggleButtonTooltip(bSideExpanded);
    
                oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
            },
    
            _setToggleButtonTooltip: function (bLarge) {
                var oToggleButton = this.byId('sideNavigationToggleButton');
                if (bLarge) {
                    oToggleButton.setTooltip('Large Size Navigation');
                } else {
                    oToggleButton.setTooltip('Small Size Navigation');
                }
            },
            onOpenThemeDialog: function () {
                  
                    this.byId("themeDialog").open();
              
            },
            onApplyColor: function () {
                var oView = this.getView();
                var oColorPicker = oView.byId("colorPicker");
                var sColor = oColorPicker.getColorString();
 
                if (this._isValidColor(sColor)) {
                    this._applyColor(sColor);
                    // Store the selected color in local storage
                    localStorage.setItem("themeColor", sColor);
                    sap.m.MessageToast.show("Color applied successfully");
                } else {
                    sap.m.MessageToast.show("Invalid color format. Please use a valid color code.");
                }
                this.byId("themeDialog").close();
            },
            _applyColor: function (sColor) {
                var aElements = [
                    this.byId("pageContainer"),
                    this.byId("idSideNavigation"),
                    this.byId("idtntToolHeader")
                ];
                var sStyleId = "customThemeStyle";
                var oOldStyle = document.getElementById(sStyleId);
                if (oOldStyle) {
                    oOldStyle.remove();
                }
                var oStyle = document.createElement("style");
                oStyle.id = sStyleId;
                oStyle.textContent = ".customTheme { background-color: " + sColor + " !important; }";
                document.head.appendChild(oStyle);
                aElements.forEach(function (oElement) {
                    if (oElement) {
                        oElement.addStyleClass("customTheme");
                    }
                });
            },
            _isValidColor: function (sColor) {
                var hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
                var rgbRegex = /^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/;
                return hexRegex.test(sColor) || rgbRegex.test(sColor);
            },
            onCancelColorTheme: function () {
                this.byId("themeDialog").close();
            },
 
            
            onSelectThem: function (oEvent) {
                this.selectedTileId = oEvent.getSource().getId(); // Store the tile ID
                this.byId("idTileThemeDialog").open(); // Open the dialog
            },
            onApplyColorOnTile: function () {
                var oView = this.getView();
                var oColorPicker = oView.byId("colorPickerforTile");
                var sColor = oColorPicker.getColorString();
    
                if (this._isValidColor(sColor)) {
                    this._applyColorToTile(this.selectedTileId, sColor);
                    // Store the selected tile color in local storage if necessary
                    sap.m.MessageToast.show("Color applied successfully to the tile");
                } else {
                    sap.m.MessageToast.show("Invalid color format. Please use a valid color code.");
                }
                this.byId("idTileThemeDialog").close();
                this.selectedTileId = null;
            },
    
            _applyColorToTile: function (tileId, sColor) {
                var oTile = this.byId(tileId);
                if (oTile) {
                    oTile.$().css("background-color", sColor);
                }
            },
           
           
            onCancelColorTileTheme: function () {
                this.byId("idTileThemeDialog").close();
                this.selectedTileId = null;
            },
            OnPressHUQuery: function(){
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("HUQuerypage");
            }

    });
});
