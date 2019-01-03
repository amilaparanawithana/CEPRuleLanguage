/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'PDMS_Monitor_Web.Application',

    name: 'PDMS_Monitor_Web',

    requires: [
        // This will automatically load all classes in the PDMS_Monitor_Web namespace
        // so that application classes do not need to require each other.
        'PDMS_Monitor_Web.*',
    ],



    // The name of the initial view to create.
    mainView: 'PDMS_Monitor_Web.view.main.Main'
});
