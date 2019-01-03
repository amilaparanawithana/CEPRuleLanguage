/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('PDMS_Monitor_Web.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main_cont',

    beforeRender: function () {
        // debugger;
    },

    loadTextBox: function (newValue, obj) {

        var xml = Ext.get('xml').component.value;
        var query = Ext.get('query').component.value;

         Ext.Ajax.request ({
             url: '/CEPML-1.0/cepmlparser/' + newValue,
             method: 'POST',
             params: {
                 "xml" : xml,
                 "query": query,
                 "queryType" : newValue
             },
             success: function (resp) {
                 var resultData = Ext.decode(resp.responseText).data;
                 var resultXml = resultData.xml;
                 var resultQuery = resultData.query;
                 console.log(resultQuery);
                 Ext.get('xml').component.setValue(resultXml);
                 Ext.get('query').component.setValue(resultQuery);


             }
         });
    }
});
