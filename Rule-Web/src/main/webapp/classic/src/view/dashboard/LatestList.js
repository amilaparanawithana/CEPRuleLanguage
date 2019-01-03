Ext.define('PDMS_Monitor_Web.view.dashboard.LatestList', {
    extend: 'Ext.grid.Panel',
    xtype: 'latest_list',

    requires: [
        'PDMS_Monitor_Web.store.LatestEvent',
        'PDMS_Monitor_Web.view.dashboard.LatestListController'
    ],

    // reference: 'latestListGrid',
    title: 'LatestList',
    controller: 'latest_list_controller',
    height: 350,
    autoScroll: true,

    store:{
        type: 'latestEvent'
    },

    columns: [
        { text: 'Parameter',  dataIndex: 'fileName' },
        { text: 'Version', dataIndex: 'paramVersionNo', flex: 1 },
        { text: 'Distribution Time', dataIndex: 'createDateTime', flex: 1 },
        { text: 'Rail Distribution', dataIndex: 'railPercentage', flex: 1 },
        { text: 'Bus Distribution', dataIndex: 'busPercentage', flex: 1 },
    ],

    listeners: {
       /* select: 'onItemSelected'*/

        afterrender : function(grid,evt) {
            this.controller.loadGridData(grid)

        }
    }

});