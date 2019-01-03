Ext.define('PDMS_Monitor_Web.store.LatestEvent', {
    extend: 'Ext.data.Store',

    alias: 'store.latestEvent',

    model: 'PDMS_Monitor_Web.model.LatestEvent',
   /* fields: [
        'parameter', 'version', 'distributionTime', 'railPercentage', 'busPercentage'
    ],*/

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
