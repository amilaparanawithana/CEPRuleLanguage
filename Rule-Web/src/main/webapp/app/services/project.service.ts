/**
 * @author chathura widanage
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {Project} from "../models/project";
import {RestService} from "./rest.service";
import {ClusterService} from "./cluster.service";
import {DeploymentConfig} from "../models/deploymentConfig";
import {MultipartUploader} from "./multipart/multipart-uploader";
import {MultipartItem} from "./multipart/multipart-item";
import {JwtProvider} from "../providers/jwt.provider";
import {Observable} from "rxjs/Observable";
import {UserService} from "./user.service";

@Injectable()
export class ProjectService {
    baseUrl:string;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService,
                @Inject(ClusterService)
                private clusterService:ClusterService,
                @Inject(UserService)
                private userService:UserService,
                private jwtProvider:JwtProvider) {
        this.baseUrl = restService.getBaseUrl('project');
        this.restService = restService;
    }

    getById(id:number) {
        return this.restService.get(this.restService.getResourceUrl('project', id))
            .map(res=> {
                return res.json()
            })
            .map(project=> {
                let result:Project;
                if (project) {
                    result = new Project(project.id, project.name, project.clusterId, project.users);

                    //fetch cluster
                   /* this.clusterService.getById(result.clusterId).subscribe(
                        data=> {
                            result.clusterObj = data;
                        }
                    );*/
                    //done fetching cluster

                }
                return result;
            });
    }

    /**
     * Obtains all the projects belongs to the user
     * @returns {Observable<R>}
     */
    getAll() {
        return this.restService.get(this.baseUrl)
            .map(res=> {
                return res.json();
            })
            .map((projects:Array<any>)=> {
                let result:Array<Project> = [];
                if (projects) {
                    projects.forEach((project)=> {
                        result.push(new Project(project.id, project.name, project.clusterId));
                    })
                }
                return result;
            });
    }

    getConfigurations(projectId:number) {
        return this.restService.get(this.restService.getBaseUrl("deploymentConf/" + projectId))
            .map(res=> {
                return res.json();
            })
            .map((depConfs:Array<any>)=> {
                let result:Array<DeploymentConfig> = [];
                if (depConfs) {
                    depConfs.forEach((conf)=> {

                        let depConf:DeploymentConfig = new DeploymentConfig(conf.id, conf.name, null,
                            conf.url, null, 1, conf.projectId, null, this.restService)
                        depConf.setConfTypeFromString(conf.confType)
                        result.push(depConf);
                    })

                }
                return result;
            });
    }

    createProject(project:Project) {
        return this.restService.post(this.baseUrl, JSON.stringify(project)).map(res=>res.json());
    }

    deployConfig(projectId:Number) {
        return this.restService.get(this.baseUrl + '/deploy/' + projectId).map(res=> {
            return res.json()
        });
    }

    updateUsers(project:Project){
        return this.restService.put(this.baseUrl + "/" + project.id, JSON.stringify(project)).map(res=>res.json());
    }

    updateConfiguration(configs:Array<DeploymentConfig>) {
        configs.forEach(config=> {
            config.refresh();
        });
    }

    deleteProject(projectId:number) {
        return this.restService.delete(this.baseUrl + "/" + projectId);
    }
}

export class UploadStatus {
    fileName:string;
    successful:boolean;
    msg:string;

    constructor(fileName:string, successful:boolean, msg:string) {
        this.fileName = fileName;
        this.successful = successful;
        this.msg = msg;
    }

}