Ext.define('PDMS_Monitor_Web.model.LatestEvent', {
    extend: 'PDMS_Monitor_Web.model.Base',

    fields: [
        'parameter', 'version', 'distributionTime', 'railPercentage', 'busPercentage'
    ]
});
