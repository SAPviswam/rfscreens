sap.ui.define(
    [
        "./BaseController",
        "sap/ui/core/UIComponent",
        "sap/m/MessageBox"
    ],
    function(Controller, UIComponent, MessageBox) {
      "use strict";
  
      return Controller.extend("com.app.rfscreens.controller.loginpage", {
        onInit: function() {
        },
        onResourceLoginBtnPress: function () {
            // Assuming successful validation or login logic here
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
        },
        handleLinkPress: async function () {
          debugger
          if (!this.oActiveLoansDialogFP) {
              this.oActiveLoansDialogFP = await this.loadFragment("Forgotpassword")
          }
          this.oActiveLoansDialogFP.open();
      },
      onCloseFP: function(){
        this.oActiveLoansDialogFP.close();
      },
        onPressSignupBtn: async function () {
          debugger
          if (!this.oActiveLoansDialog) {
              this.oActiveLoansDialog = await this.loadFragment("SignUpDetails")
          }
          this.oActiveLoansDialog.open();
      },
      onCloseRegisterDialog: function () {
        this.oActiveLoansDialog.close();
    },
    onClearRegisterDialog: function () {
      var oView = this.getView();
      oView.byId("idEmployeeIDInput").setValue("");
      oView.byId("idResourceNameInput").setValue("");
      oView.byId("idInputEmail").setValue("");
      oView.byId("idInputPhoneNumber").setValue("");

      // Unselect checkboxes
      oView.byId("idRoesurcetypeInput").setSelectedItem(null);

      // Clear the selected keys from GroupSelect MultiComboBox
      oView.byId("GroupSelect").setSelectedKeys([]);

      var oMultiComboBox = this.byId("checkboxContainer");

      // Clear all selected items
     oMultiComboBox.setSelectedKeys([]);
  },
  onSubmitPress: function () {
    const oUserView = this.getView();

    // Get the form inputs
    var sEmployeeID = this.byId("idEmployeeIDInput").getValue();
    var sResourceName = this.byId("idResourceNameInput").getValue();
    var oResourceTypeComboBox = oUserView.byId("idRoesurcetypeInput");
    var oSelectedItem = oResourceTypeComboBox.getSelectedItem();
    var sPhone = this.byId("idInputPhoneNumber").getValue();
    var oEmail = this.byId("idInputEmail").getValue();

    var oMultiComboBox = this.byId("checkboxContainer");
    // Retrieve the selected items
    var aSelectedItems = oMultiComboBox.getSelectedItems();
    var aSelectedValues = aSelectedItems.map(function(oItem) {
        return oItem.getText(); // Use oItem.getKey() if you need the key instead of the text
    });
    var sSelectedAreas = aSelectedValues.join(","); 

    var oItem = this.byId("GroupSelect").getSelectedKeys();
    var resourceGroup = oItem.join(", ");

    var bValid = true;
    var bAllFieldsFilled = true;

    // Validate Employee ID
    if (!sEmployeeID) {
        oUserView.byId("idEmployeeIDInput").setValueState("Error");
        oUserView.byId("idEmployeeIDInput").setValueStateText("Employee ID is mandatory");
        bValid = false;
        bAllFieldsFilled = false;
    } else if (!/^\d{6}$/.test(sEmployeeID)) {
        oUserView.byId("idEmployeeIDInput").setValueState("Error");
        oUserView.byId("idEmployeeIDInput").setValueStateText("Resource ID must be a 6-digit numeric value");
        bValid = false;
    } else {
        oUserView.byId("idEmployeeIDInput").setValueState("None");
        oUserView.byId("idEmployeeIDInput").setValueStateText(""); // Clear the value state text
    }

    // Validate Resource Name
    if (!sResourceName) {
        oUserView.byId("idResourceNameInput").setValueState("Error");
        oUserView.byId("idResourceNameInput").setValueStateText("Resource Name cannot be empty");
        bValid = false;
        bAllFieldsFilled = false;
    } else {
        oUserView.byId("idResourceNameInput").setValueState("None");
        oUserView.byId("idResourceNameInput").setValueStateText(""); // Clear the value state text
    }

    // Validate Resource Type
    if (!oSelectedItem) {
        oUserView.byId("idRoesurcetypeInput").setValueState("Error");
        oUserView.byId("idRoesurcetypeInput").setValueStateText("Please select Resource Type");
        bValid = false;
        bAllFieldsFilled = false;
    } else {
        oUserView.byId("idRoesurcetypeInput").setValueState("None");
        oUserView.byId("idRoesurcetypeInput").setValueStateText(""); // Clear the value state text
    }

    // Validate Phone Number
    if (!sPhone) {
        oUserView.byId("idInputPhoneNumber").setValueState("Error");
        oUserView.byId("idInputPhoneNumber").setValueStateText("Phone number is mandatory");
        bValid = false;
        bAllFieldsFilled = false;
    } else if (sPhone.length !== 10 || !/^\d+$/.test(sPhone)) {
        oUserView.byId("idInputPhoneNumber").setValueState("Error");
        oUserView.byId("idInputPhoneNumber").setValueStateText("Phone number must be a 10-digit numeric value");
        bValid = false;
    } else {
        oUserView.byId("idInputPhoneNumber").setValueState("None");
        oUserView.byId("idInputPhoneNumber").setValueStateText(""); // Clear the value state text
    }

    // Validate Email
    if (oEmail && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(oEmail)) {
        oUserView.byId("idInputEmail").setValueState("Error");
        oUserView.byId("idInputEmail").setValueStateText("Please enter a valid email address");
        bValid = false;
    } else {
        oUserView.byId("idInputEmail").setValueState("None");
        oUserView.byId("idInputEmail").setValueStateText(""); // Clear the value state text
    }

    // Check if all required fields are filled
    if (!bAllFieldsFilled) {
        sap.m.MessageToast.show("Please fill all mandatory details");
        return;
    }

    // Check if all validations pass
    if (!bValid) {
        sap.m.MessageToast.show("Please enter correct data");
        return;
    }

    // Show success message if everything is valid
    sap.m.MessageToast.show("Validation successful!");

    // Optionally clear the form fields and reset the form
    oUserView.byId("idEmployeeIDInput").setValue("");
    oUserView.byId("idResourceNameInput").setValue("");
    oUserView.byId("idInputEmail").setValue("");
    oUserView.byId("idInputPhoneNumber").setValue("");
    oUserView.byId("idRoesurcetypeInput").setSelectedItem(null);
    oUserView.byId("GroupSelect").setSelectedKeys([]);
    oMultiComboBox.setSelectedKeys([]);
}

      });
    }
  );
  