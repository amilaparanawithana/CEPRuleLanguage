Ext.define('PDMS_Monitor_Web.store.MainStore', {
    extend: 'Ext.data.Store',

    alias: 'store.mainStore',

    model: 'PDMS_Monitor_Web.model.MainStore',
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
