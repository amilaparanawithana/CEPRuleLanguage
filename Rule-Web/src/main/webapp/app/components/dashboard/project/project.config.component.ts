/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 * @author Amila Paranawithana
 */
import {Component, Inject} from "angular2/core";
import {ProjectService, UploadStatus} from "../../../services/project.service";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {Project} from "../../../models/project";
import {RestService} from "../../../services/rest.service";
import {ClusterService} from "../../../services/cluster.service";
import {DeploymentConfig, ConfigType} from "../../../models/deploymentConfig";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";
import {AbstractComponent} from "../abstract.component";
import {Cluster} from "../../../models/cluster";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

declare let Dropzone:any;
@Component({
    selector: 'project-config-component',
    templateUrl: '../../../../resources/template/dashboard/project/config.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ProjectService, RestService, ClusterService, UserService]
})

export class ProjectConfigComponent extends AbstractComponent{
    projectId:number;
    project:Project = new Project();
    configs:Array<DeploymentConfig>;
    addConfig:boolean;
    portList:string;
    filePath:string;
    allUsers:Array<User> = [];
    clusterObj:Cluster;

    newConfigurationType:number = 0;

    dropZone:any;

    constructor(private projectService:ProjectService, private routeParam:RouteParams,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService,
                @Inject(RestService)
                private restService:RestService,private userService:UserService,
                private clusterService:ClusterService) {
        super();
        this.projectId = parseInt(routeParam.get('id'));
        this.configs = [];
        this.fetchConfigs();
        this.addConfig = false;
        this.portList = "";
        this.fetchUsers();
    }

    ngAfterViewInit() {
        //this.addDropZone();
    }

    addDropZone(force:boolean = false) {
        if (document.getElementById('drop-zone') && typeof Dropzone !== 'undefined') {
            Dropzone.autoDiscover = false;
            if (!this.dropZone || force) {
                console.log('new drop zone');
                this.dropZone = new Dropzone("#drop-zone", {
                    url: '/no-end',
                    addRemoveLinks: true,
                    autoProcessQueue: false,
                    dictDefaultMessage: "Drop new ultraesb configurations here."
                });
            }
        } else {
            setTimeout(()=> {
                console.log('retrying to add drop zone');
                // retry adding drop zone
                this.addDropZone(true);
            }, 1000);
        }
    }

    fetchClusterObj(){
        this.clusterService.getById(this.project.clusterId).subscribe(
            data=> {
                this.clusterObj = data;
            }
        );
    }
    /**
     * fetches project details from the server
     */
    fetchProject() {
        this.feedBackService.showPreloader = true;
        this.projectService.getById(this.projectId).subscribe(
            data=> {
                this.project = data;
                this.feedBackService.showPreloader = false;
                console.log("checking............ user belongs..");
                console.log(this.project.users);

                this.allUsers.forEach(user=> {
                    if (this.project.users.indexOf(user.id) > -1) {
                        user.selected = true;
                        console.log("user belongs..");
                    }
                });

                this.project.users = [];
                this.fetchClusterObj();
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    deployConfig() {
        this.feedBackService.showPreloader = true;
        this.projectService.deployConfig(this.projectId).subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this.feedBackService.success = "Successfully deployed the configuration";
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    updateUsers() {

        this.allUsers.forEach((user:User)=> {
            if (user.selected) {
                this.project.users.push(user.id);
            }
        });

        this.feedBackService.showPreloader = true;
        this.projectService.updateUsers(this.project).subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this.feedBackService.success = "Successfully updated the groups of the project";
                //this._router.navigate(['GroupList']);
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    /**
     * Fetches existing configs for the project
     */
    fetchConfigs() {
        this.feedBackService.showPreloader = true;
        this.projectService.getConfigurations(this.projectId).subscribe(
            data=> {
                this.feedBackService.showPreloader = false;
                this.configs = data;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    fetchUsers() {
        this.feedBackService.showPreloader = true;
        this.userService.getAll().subscribe(
            data=> {
                this.allUsers = data;
                this.feedBackService.showPreloader = false;

                this.fetchProject();

            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    onConfigSave() {
        // this.feedBackService.showPreloader = true;
        // var operationsCount = 0;//take the pending operation count
        // this.configs.forEach((conf)=> {
        //     if (conf.isNewlyCreated() || conf.isToBeDeleted()) {
        //         operationsCount++;
        //     }
        // });
        // var operationsCompleted = 0;//keep track of calledback operations
        // var operationFailed = 0;//keep track of failed operations
        this.projectService.updateConfiguration(this.configs);
    }

    addNewConfig() {
        if (!this.validatePorts()) {
            return;
        }

        //check for multiple deployment units
        if (this.newConfigurationType == 0 && this.dropZone.getAcceptedFiles().length > 1) {
            var alConfig = new AlertConfiguration("Not allowed", "Uploading multiple deployment units is not allowed since ports are unique for a specific DU.");
            alConfig.positiveButton = "OK";
            alConfig.negativeButtonVisible = false;
            this.alertService.showAlert(alConfig);
            return;
        }

        var acceptedFilesList:Array<File> = this.dropZone.getAcceptedFiles();

        if(acceptedFilesList != null){
            if (!this.validatePath(this.filePath)){
                return;
            }
        }

        acceptedFilesList.forEach(file=> {
            var newDepConfig = new DeploymentConfig(
                -1,
                file.name,
                this.newConfigurationType,
                this.filePath,
                file,
                0,
                this.projectId,
                this.portList.trim(),
                this.restService
            )
            this.configs.push(newDepConfig);
        });
        this.swapAddConfig();
        this.dropZone.removeAllFiles();
    }

    validatePath(filepath:string) {

        if (this.newConfigurationType == ConfigType.DEPLOYMENT_UNIT) {//no point of validating for deployment units
            return true;
        }

        if (filepath == null || filepath.length < 1) {
            this.feedBackService.error = "Configure a correct configuration path";
            return false
        } else {
            return true
        }
    }

    removeConfig(depConfig:DeploymentConfig) {
        var index = this.configs.indexOf(depConfig, 0);
        if (index != undefined) {
            if (this.configs[index].state == 0) { // If it is newly aded one
                this.configs.splice(index, 1);
            } else { // Else change the status to delete onConfigSave
                // Detting state deleted on " + this.configs[index].name
                this.configs[index].setStatus(2);
            }
        }
    }

    swapAddConfig() {
        this.addConfig = !this.addConfig;
        if (this.addConfig) {
            console.log('adding drop zone called.');
            this.addDropZone(true);
        }
    }

    validatePorts() {
        //todo check port conflict within ports
        if (this.newConfigurationType !== ConfigType.DEPLOYMENT_UNIT) {//no point of validating port list for non deployment units
            return true;
        }
        //else if (!this.portList || this.portList.trim() === "") {
        //    this.feedBackService.error = "Invalid or empty list of opened ports";
        //    return false;
        //}

        let lowerVal:Number = this.clusterObj.portFrom;
        let upperVal:Number = this.clusterObj.portTo;
        var portLst = this.portList.trim().split(",");
        for (var i = 0; i < portLst.length; i++) {
            try {
                let intPort:Number = parseInt(portLst[i]);
                if (lowerVal > intPort || upperVal < intPort) {
                    this.feedBackService.error = "Ports are out of range";
                    return false;
                }
            } catch (e) {
                this.feedBackService.error = "Invalid number in port list";
                return false;
            }
        }
        return true;
    }

    changeConfigType(type) {
        this.newConfigurationType = parseInt(type);
    }

    getDeploymentUnits() {
        var dus:Array<DeploymentConfig>;
        dus = [];
        for (var i =0; i < this.configs.length; i++) {
            if (this.configs[i].isDeploymentUnit()) {
                dus.push(this.configs[i]);
            }
        }
        return dus;
    }

    getConfigFiles() {
        var confFiles:Array<DeploymentConfig>;
        confFiles = [];
        for (var i =0; i < this.configs.length; i++) {
            if (this.configs[i].isConfigFile()) {
                confFiles.push(this.configs[i]);
            }
        }
        return confFiles;
    }

    getLibraries() {
        var libs:Array<DeploymentConfig>;
        libs= [];
        for (var i =0; i < this.configs.length; i++) {
            if (this.configs[i].isLibrary()) {
                libs.push(this.configs[i]);
            }
        }
        return libs;
    }
}