/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('PDMS_Monitor_Web.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.button.Segmented',
        'Ext.list.Tree',

        // 'PDMS_Monitor_Web.view.main.MainController',
        'PDMS_Monitor_Web.view.main.MainModel',

        'PDMS_Monitor_Web.view.main.Header',
        'PDMS_Monitor_Web.view.main.MainContainer',
    ],

    // controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',

    layout: {
        type: 'border',
        align: 'stretch'
    },

    items: [
        //header components container
        {
            region: 'north',
            xtype: 'appheader'
        },
        // stats panels container
        {
            region: 'center',
            xtype: 'maincontainer'
        },
    ]

});
