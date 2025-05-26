sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.training.exer1.controller.MainView", {
        onInit() {
        },
        // pinaltan ng onPressCheckout sa Step 12 ito..
        // in exercise related to fragments, this was used again.. see step 7
        //id = "com.training.exer1"
        onAddItem: function () {
            // Comment this code for now
            // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // var sMsg = oTextBundle.getText("addButtonMsg");
            // this.fnDisplayMsg(sMsg);
        
            // Instantiate the fragment
        
            // create dialog lazily
            if (!this.oDialog) {
                this.oDialog = this.loadFragment({
                    name: "com.training.exer1.fragment.ProductDialog"
                });
            }
            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        },
        onCloseDialog: function (){
            this.getView().byId("idProductDialog").close();
        },
        onPressCheckout: function (){
            var oInputFName = this.getView().byId("idInptFName");
            var oInputLName = this.getView().byId("idInptLName");
            var oInputFNameValue = oInputFName.getValue();
            var oInputLNameValue = oInputLName.getValue();
            var oRouter = this.getOwnerComponent().getRouter();

            // Check if first name and last name is blank
            if (oInputFNameValue === "" || oInputLNameValue === ""){
               
// set value state to Error
                oInputFName.setValueState("Error");
                oInputLName.setValueState("Error");
            } else {
                oInputFName.setValueState("None");
                oInputLName.setValueState("None");

                //Navigate to review page passing first
                oRouter.navTo("RouteReviewPage", {
                    firstName: oInputFNameValue
                });

            }
        },

        fnDisplayMsg: function (sMsg) {
            MessageToast.show(sMsg);
        },
        onChangeMOP: function (oEvent) {
            var sSelectedKey = oEvent.getSource().getSelectedKey(); // pwedeng paghiwalayin ito.. bale ung gnagawa ng getSource is to 'get' kung aling combobox; getSelectedKey naman is to 'get' kung anong key
            //parang ganto:
            //  var oComboBox = oEvent.getSource(); // This gets the ComboBox that was changed
            //  var sSelectedKey = oComboBox.getSelectedKey();

            // var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");   ung getParameter daw luma na.
            var oView = this.getView();
        
            var oMobileLabel = oView.byId("idLblPhone");
            var oMobileInput = oView.byId("idInputPhone");
        
            var bShow = (sSelectedKey === "GCASH");
            oMobileLabel.setVisible(bShow);         //b = boolean; Show not a reserved keyword but a standard practise for true or false. no need to declare ito
            oMobileInput.setVisible(bShow);
        }
    });
});
// in summary, this exercise will not check which row was clicked.
// chinicheck nya however kung may laman ba ung input field na first name demonstrating kung pano mag implement ng validation.
// last step is to use i18n folder para tanggalin ung mga hardcodes.. parking this for now to prioritize ung ibang activities..