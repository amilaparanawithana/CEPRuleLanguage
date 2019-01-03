Ext.define('PDMS_Monitor_Web.view.main.Header', {
    extend: 'Ext.Container',
    xtype: 'appheader',


    cls: 'sencha-dash-dash-headerbar shadow',
    height: 50,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'toolbar',
            itemId: 'headerBar',
            cls: 'sencha-dash-dash-headerbar shadow',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="resources/images/company-logo.png">CEP ML - Parser</div>',
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                '->',

                {
                    iconCls:'x-fa fa-user',
                    ui: 'header',
                    // href: '#profile',
                    // hrefTarget: '_self',
                    tooltip: 'See your profile',
                    color: '#FFFFFF'
                },
                {
                    xtype: 'tbtext',
                    text: 'Amila Para',
                    cls: 'top-user-name',
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt:'current user image',
                    src: 'resources/images/user/user.png'
                }
            ]
        }
    ],

});