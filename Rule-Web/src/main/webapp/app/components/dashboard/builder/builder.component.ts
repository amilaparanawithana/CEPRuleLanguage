/**
 * @author chathura widanage
 */
import {Component, Inject} from "angular2/core";
import {UIService} from "../../../services/ui.service";

declare let joint:any;
declare let _:any;
declare let $:any;
@Component({
    selector: 'builder',
    templateUrl: '../../../../resources/template/dashboard/builder/builder.html',
    directives: [],
    styleUrls: [
        '../../../../resources/global/vendor/jointjs/ips.css'
    ]
})

export class BuilderComponent {
    graph:any;
    paper:any;
    elements:Array<any> = [];

    endPoint:any;
    processingElement:any;
    junctionPoint:any;
    decision:any;

    //used when doing element level configuration
    settingsObj:any = {};
    currentModel:any = null;


    constructor(@Inject(UIService)
                private uiService:UIService) {
    }

    ngOnDestroy() {
        //this.uiService.showSideBar();
    }

    ngAfterContentInit() {

        //this.uiService.hideSideBar();

        var instance = this;

        this.graph = new joint.dia.Graph;


        this.paper = new joint.dia.Paper({
            el: $('#workspace'),
            width: '100%',
            height: 600,
            model: this.graph,
            gridSize: 10,
            markAvailable: true,
            defaultLink: new joint.dia.Link({
                attrs: {'.marker-target': {d: 'M 10 0 L 0 5 L 10 10 z'}}
            }),
            /* validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
             // Prevent linking from input ports.
             if (magnetS && magnetS.getAttribute('type') === 'input') return false;
             // Prevent linking from output ports to input ports within one element.
             if (cellViewS === cellViewT) return false;
             // Prevent linking to input ports.
             return magnetT && magnetT.getAttribute('type') === 'input';
             },*/
        });


        this.graph.on('change:position', (cell)=> {
            // has an obstacle been moved? Then reroute the link.
            var links = this.graph.getLinks();
            links.forEach((link)=> {
                //xconsole.log(link);
                if (_.contains(this.elements, cell)) this.paper.findViewByModel(link).update();
            });
        });

        this.paper.on('cell:mouseover', function (cell, evt, x, y) {
            try {
                cell.resetControllersVisibilityTimer();
            } catch (e) {
                console.log('not an ips element');
            }
        });

        joint.shapes.ips = {};
        joint.shapes.ips.BasicElement = joint.shapes.devs.Model.extend({
            defaults: joint.util.deepSupplement({
                type: 'ips.BasicElement',
                attrs: {
                    rect: {stroke: '#ffff', 'fill-opacity': 0},
                    '.body': {stroke: 'none'},
                    '.label': ''
                },
            }, joint.shapes.devs.Model.prototype.defaults)
        });


        var o1:any = false, o2:any = false;//temp objects to store the links

        joint.shapes.ips.BasicElementView = joint.dia.ElementView.extend({
            template_sample: [//every element which extends this view should create a template attribute of the following format
                '<div class="ips-element new-ips-class-here">',
                '<h4 class="lbl"></h4>',
                '<button class="delete"><i class="fa fa-times"></i></button>',
                '<button class="options"><i class="fa fa-wrench"></i></button>',
                '<button class="link"><i class="fa fa-link"></i></button>',
                '<button class="clone"><i class="fa fa-clone"></i></button>',
                '</div>'
            ].join(''),//this part should be replaced in every ips element

            controllersVisible: true,
            controllerVisibilityTimer: null,

            initialize: function () {
                _.bindAll(this, 'updateBox');
                joint.dia.ElementView.prototype.initialize.apply(this, arguments);

                this.$box = $(_.template(this.template)());
                this.$box.find('button').on('mousedown click mouseup dblclick', function (evt) {
                    evt.stopPropagation();
                });
                this.$box.find('input').on('change', _.bind(function (evt) {
                    this.model.set('input', $(evt.target).val());
                }, this));
                this.$box.find('.link').on('mousedown', _.bind(function (evt) {
                    o1 = this.model;
                    o2 = false;//to prevent something that I can't explain in words... :/
                }, this));
                //link can be generated if mouse down either on a element or a link
                this.$box.find('.link').on('mouseup', _.bind(function (evt) {
                    //linking ips elements
                    o2 = this.model;
                    if (o1.id !== o2.id) {
                        instance.addLink(o1, o2);
                    }
                    o1 = false;
                    o2 = false;
                }, this));

                //remove the model
                this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
                this.$box.find('.options').on('click', _.bind(function () {
                    instance.showSettingsForElement(this.model);
                }, this));
                // Update the box position whenever the underlying model changes.
                this.model.on('change', this.updateBox, this);
                // Remove the box when the model gets removed from the graph.
                this.model.on('remove', this.removeBox, this);

                this.updateBox();

                this.resetControllersVisibilityTimer();

            },
            resetControllersVisibilityTimer: function () {
                console.log('reseting visibility');
                this.setControllersVisible(true);
                var thisObj = this;
                clearTimeout(this.controllerVisibilityTimer);
                this.controllerVisibilityTimer = setTimeout(function () {
                    console.log('timed out');
                    thisObj.setControllersVisible(false);
                }, 10000);
            },
            setControllersVisible: function (visible) {
                if (visible) {
                    this.$box.find('button').show();
                } else {
                    this.$box.find('button').hide('slow');
                }
            },
            render: function () {
                joint.dia.ElementView.prototype.render.apply(this, arguments);
                this.paper.$el.prepend(this.$box);
                this.updateBox();
                return this;
            },
            updateBox: function () {
                // Set the position and dimension of the box so that it covers the JointJS element.
                var bbox = this.model.getBBox();
                // Example of updating the HTML with a data stored in the cell model.
                this.$box.find('.lbl').text(this.model.get('label'));
                this.$box.css({
                    width: bbox.width,
                    height: bbox.height,
                    left: bbox.x,
                    top: bbox.y,
                    transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
                });
            },
            removeBox: function (evt) {
                this.$box.remove();
            }
        });

        //ips endpoint
        joint.shapes.ips.EndPoint = joint.shapes.devs.Model.extend({
            defaults: joint.util.deepSupplement({
                type: 'ips.EndPoint',
                attrs: {
                    rect: {stroke: '#ffff', 'fill-opacity': 0},
                    '.body': {stroke: 'none'}
                },
            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.ips.EndPointView = joint.shapes.ips.BasicElementView.extend({
            template: [
                '<div class="ips-element end-point">',
                '<h4 class="lbl"></h4>',
                '<button class="delete"><i class="fa fa-times"></i></button>',
                '<button class="options"><i class="fa fa-wrench"></i></button>',
                '<button class="link"><i class="fa fa-link"></i></button>',
                '<button class="clone"><i class="fa fa-clone"></i></button>',
                '</div>'
            ].join('')
        });

        //ips processing element
        joint.shapes.ips.ProcessingElement = joint.shapes.devs.Model.extend({
            defaults: joint.util.deepSupplement({
                type: 'ips.ProcessingElement',
                attrs: {
                    rect: {stroke: '#ffff', 'fill-opacity': 0},
                    '.body': {stroke: 'none'}
                },
            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.ips.ProcessingElementView = joint.shapes.ips.BasicElementView.extend({
            template: [
                '<div class="ips-element processing-element">',
                '<h4 class="lbl"></h4>',
                '<button class="delete"><i class="fa fa-times"></i></button>',
                '<button class="options"><i class="fa fa-wrench"></i></button>',
                '<button class="link"><i class="fa fa-link"></i></button>',
                '<button class="clone"><i class="fa fa-clone"></i></button>',
                '</div>'
            ].join('')
        });

        //ips Junction point
        joint.shapes.ips.JunctionPoint = joint.shapes.devs.Model.extend({
            defaults: joint.util.deepSupplement({
                type: 'ips.JunctionPoint',
                attrs: {
                    rect: {stroke: '#ffff', 'fill-opacity': 0},
                    '.body': {stroke: 'none'},
                    '.label': {text: ''}
                },
            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.ips.JunctionPointView = joint.shapes.ips.BasicElementView.extend({
            template: [
                '<div class="ips-element junction-point">',
                '<h4 class="lbl"></h4>',
                '<button class="delete"><i class="fa fa-times"></i></button>',
                '<button class="options"><i class="fa fa-wrench"></i></button>',
                '<button class="link"><i class="fa fa-link"></i></button>',
                '<button class="clone"><i class="fa fa-clone"></i></button>',
                '</div>'
            ].join('')
        });

        //ips decision
        joint.shapes.ips.DecisionElement = joint.shapes.devs.Model.extend({
            defaults: joint.util.deepSupplement({
                type: 'ips.DecisionElement',
                attrs: {
                    rect: {stroke: '#ffff', 'fill-opacity': 0},
                    '.body': {stroke: 'none'},
                    '.label': {text: ''}
                }
            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.ips.DecisionElementView = joint.shapes.ips.BasicElementView.extend({
            template: [
                '<div class="ips-element decision-element">',
                '<div class="rhombus-outer-wrapper">',
                '<div class="rhombus-wrapper">',
                '<h4 class="lbl"></h4>',
                '<button class="delete"><i class="fa fa-times"></i></button>',
                '<button class="options"><i class="fa fa-wrench"></i></button>',
                '<button class="link"><i class="fa fa-link"></i></button>',
                '<button class="clone"><i class="fa fa-clone"></i></button>',
                '</div>',
                '</div>',
                '</div>'
            ].join('')
        });


        this.endPoint = new joint.shapes.ips.EndPoint({
            position: {x: 100, y: 30},
            size: {width: 150, height: 60},
            label: 'Ingress point',
        });


        this.processingElement = new joint.shapes.ips.ProcessingElement({
            position: {x: 100, y: 30},
            size: {width: 150, height: 60},
            label: 'XML to JSON'
        });

        this.junctionPoint = new joint.shapes.ips.JunctionPoint({
            position: {x: 100, y: 30},
            size: {width: 30, height: 30},
            label: ''
        });

        this.decision = new joint.shapes.ips.DecisionElement({
            position: {x: 10, y: 10},
            size: {width: 120, height: 120},
            label: 'Decision'
        });

        //to load a pre saved graph
        this.loadGraph('{"cells":[{"type":"ips.JunctionPoint","size":{"width":30,"height":30},"inPorts":[],"outPorts":[],"position":{"x":170,"y":70},"angle":0,"label":"","id":"53b71754-6d5c-4afd-b2a8-ab48fc25b01e","embeds":"","z":2,"attrs":{}},{"type":"ips.ProcessingElement","size":{"width":150,"height":60},"inPorts":[],"outPorts":[],"position":{"x":730,"y":160},"angle":0,"label":"XML to JSON","id":"3da4ba6b-6bfa-464a-b5b7-6aaa3801d9d4","embeds":"","z":3,"attrs":{}},{"type":"link","source":{"id":"53b71754-6d5c-4afd-b2a8-ab48fc25b01e"},"target":{"id":"3da4ba6b-6bfa-464a-b5b7-6aaa3801d9d4"},"router":{"name":"manhattan"},"id":"b2b9d250-e47f-4641-a790-c92528490181","z":5,"attrs":{".connection":{"stroke":"blue"},".marker-target":{"fill":"blue","d":"M 10 0 L 0 5 L 10 10 z"}}},{"type":"ips.DecisionElement","blabla":{"abcd":"sdsd"},"size":{"width":120,"height":120},"inPorts":[],"outPorts":[],"position":{"x":330,"y":230},"angle":0,"label":"Decision","id":"8d19f4d8-33fc-4a74-a2e9-5d0340279545","embeds":"","z":6,"attrs":{}},{"type":"link","source":{"id":"8d19f4d8-33fc-4a74-a2e9-5d0340279545"},"target":{"id":"3da4ba6b-6bfa-464a-b5b7-6aaa3801d9d4"},"router":{"name":"manhattan"},"id":"c07ea7f4-5ed1-45b1-830f-6de5682e1118","z":8,"attrs":{".connection":{"stroke":"blue"},".marker-target":{"fill":"blue","d":"M 10 0 L 0 5 L 10 10 z"}}},{"type":"link","source":{"id":"8d19f4d8-33fc-4a74-a2e9-5d0340279545"},"target":{"id":"53b71754-6d5c-4afd-b2a8-ab48fc25b01e"},"router":{"name":"manhattan"},"id":"d096583f-9529-4ef7-9ece-771007530216","z":10,"attrs":{".connection":{"stroke":"blue"},".marker-target":{"fill":"blue","d":"M 10 0 L 0 5 L 10 10 z"}}}]} ');

        //optional : make settings panels draggable
        //this.makeSettingsDraggable();
    }

    makeSettingsDraggable() {
        $(function () {
            $('body').on('mousedown', '.ips-element-settings', function (e) {
                $(this).addClass('draggable').parents().on('mousemove', function (e) {
                    $('.draggable').offset({
                        top: e.pageY - $('.draggable').outerHeight() / 2,
                        left: e.pageX - $('.draggable').outerWidth() / 2
                    }).on('mouseup', function () {
                        $(this).removeClass('draggable');
                    });
                    e.preventDefault();
                });
            }).on('mouseup', function () {
                $('.draggable').removeClass('draggable');
            });
        });
    }

    cloneElement(element) {
        var elementClone = element.clone();
        this.graph.addCell(elementClone);
        this.elements.push(elementClone);
        return elementClone;
    }

    addDecision() {
        var decisionCopy = this.decision.clone();
        this.graph.addCell(decisionCopy);
        this.elements.push(decisionCopy);
    }

    addJunctionPoint() {
        var junctionPointCopy = this.junctionPoint.clone();
        this.graph.addCell(junctionPointCopy);
        this.elements.push(junctionPointCopy);
    }

    addProcessingElement() {
        var processingElementCopy = this.processingElement.clone();
        this.graph.addCell(processingElementCopy);
        this.elements.push(processingElementCopy);
    }

    addIngress() {
        var ingressCopy = this.endPoint.clone();
        this.graph.addCell(ingressCopy);
        this.elements.push(ingressCopy);
    }

    addLink(obj1, obj2) {
        //prevent double links
        var link = new joint.dia.Link({
            source: {id: obj1.id},
            target: {id: obj2.id},
            router: {name: 'manhattan'}
        });
        link.attr({
            '.connection': {stroke: 'blue'},
            '.marker-target': {fill: 'blue', d: 'M 10 0 L 0 5 L 10 10 z'}
        });
        this.graph.addCell(link);
        this.elements.push(link);
    }


    /**
     * load a graph from a saved json
     * @param json as a string
     */
    loadGraph(json:string) {
        this.graph.fromJSON(JSON.parse(json));
    }

    showSettingsForElement(model) {
        this.currentModel = model;
        console.log('setting current model');
        console.log(this.currentModel.attributes.type);
        //backward binding settings to the UI
        if (model.attributes.settings) {
            this.settingsObj = model.attributes.settings;
        }
    }

    /**
     * sets settings to the currently active model
     */
    saveSettings() {
        this.currentModel.attributes.settings = this.settingsObj;
        this.cancelSettings();
    }

    cancelSettings() {
        this.currentModel = null;
        this.settingsObj={};
    }

    //remove this on deployment
    dump() {
        return JSON.stringify(this.graph);
    }

    dumpSettings() {
        return JSON.stringify(this.settingsObj);
    }

}