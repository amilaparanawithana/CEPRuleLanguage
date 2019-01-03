/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('PDMS_Monitor_Web.view.dashboard.LatestListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.latest_list_controller',

    beforeRender: function () {
        console.log("beforeRender sds")
    },


    loadGridData: function (grid) {
        var myStore = grid.getStore();
        Ext.Ajax.setTimeout(300000);

       /* Ext.Ajax.request ({
            url: '/PDMS_Monitor_APP-33.01.00/distribution/latest',
            success: function (resp) {
                var result = Ext.decode(resp.responseText);
                myStore.getProxy().data  = result;
                myStore.load();
            }
        });*/
    }
});
