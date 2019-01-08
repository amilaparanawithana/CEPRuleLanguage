Ext.define('PDMS_Monitor_Web.view.main.MainContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'maincontainer',
    reference: 'maincontainer',


    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'PDMS_Monitor_Web.view.main.MainController',
        'PDMS_Monitor_Web.store.MainStore'
    ],

    defaults: {
        border: '20px',
        margine:'20'
    },

    layout: {
        type: 'responsivecolumn'
    },
    controller: 'main_cont',

    store:{
        type: 'mainStore'
    },

    tools: [
        {
            xtype: 'combobox',
            itemId: 'layout-id',
            width: 200,
            editable: false,
            store: [
                ["select", "Select Conversion"],
                ["mlepl", "CEP ML to EPL"],
                ["mlsiddhi", "CEP ML -> SiddhiQL"],
                ["mlcql", "CEP ML -> CQL"],
                ["eplml", "EPL -> CEP ML"],
                ["siddhiml", "SiddhiQL -> CEP ML"],
                ["cqlml", "CQL -> CEP ML"]
            ],
            value: "select",
            listeners: {
                change: function(comp, newValue, oldValue, eOpts) {
                    console.log(newValue);
                    this.up("maincontainer").getController().loadTextBox(newValue, this);
                }
            }

        },
    ],
    items: [
        {
            xtype: 'label',
            html:'CEP ML',
            responsiveCls: 'big-50 small-100',
            style:'font-weight:400; font-size:16px'
        },
        {
            xtype: 'label',
            html:'Other Language',
            responsiveCls: 'big-50 small-100',
            style:'font-weight:400; font-size:16px'
        },
        {
            xtype: 'textareafield',
            name:'xml',
            id:'xml',
            height:600,
            title: 'Latest Versions',
            html:'Latest Versions',
            responsiveCls: 'big-50 small-100'
        },
        {
            xtype: 'textareafield',
            name:'query',
            id:'query',
            height:600,
            title: 'All Stats',
            html:'Latest Versions',
            responsiveCls: 'big-50 small-100',
        },

    ]

});