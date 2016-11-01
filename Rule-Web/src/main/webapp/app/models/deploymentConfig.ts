import {RestService} from "../services/rest.service";
import {Inject} from "angular2/core";
import {MultipartUploader} from "../services/multipart/multipart-uploader";
import {JwtProvider} from "../providers/jwt.provider";
import {MultipartItem} from "../services/multipart/multipart-item";
/**
 * This class will communicate with backend as a standalone service to perform
 * necessary actions according to the status set by the user. This will automatically retry
 * finite times on failure before it report as a failure.
 *
 * @author Dimuthu Upeksha
 * @author Chathura Widanage
 *
 */

export class DeploymentConfig {

    id:number;
    name:string;
    confType:ConfigType = ConfigType.DEPLOYMENT_UNIT;
    url:String;
    file:File;
    state:number; //0 = newly created , 1 = already existing no update, 2 = to be deleted,3=deleted
    error:number = 0;//0= no error,1 = failed to upload, 2=failed to delete
    projectId:number;
    ports:string;

    processing:boolean = false;//indicate whether this Config is on process.

    //this will
    retries:number = 0;

    constructor(id:number = null, name:string = null, confType:number = null, url:string = null,
                file:File = null, state:number = 0, projectId:number = -1, ports:string = null,
                private restService:RestService) {
        this.id = id;
        this.name = name;
        this.confType = confType;
        this.url = url;
        this.file = file;
        this.state = state;
        this.projectId = projectId;
        this.ports = ports;
    }

    isNewlyCreated() {
        return this.state === 0;
    }

    isToBeDeleted() {
        return this.state === 2;
    }

    isDeleted() {
        return this.state === 3;
    }

    isProcessing() {
        return this.processing;
    }

    getStatus() {
        switch (this.state) {
            case 0:
                return "Not Saved";
            case 1:
                return "Saved";
            case 2:
                return "To be deleted";
            case 3:
                return "Deleted";
        }
    }

    hasError() {
        return this.error !== 0;
    }

    getError() {
        switch (this.error) {
            case 1:
                return "Failed to upload";
            case 2:
                return "Failed to delete";
        }
    }

    setStatus(state:number) {
        this.state = state;
    }

    setConfTypeFromString(conf:string) {
        if ("CONFIG_FILE" === conf) {
            this.confType = ConfigType.CONFIGURATION_FILE;
        } else if ("DEPLOYMENT_UNIT" === conf) {
            this.confType = ConfigType.DEPLOYMENT_UNIT;
        } else if ("LIBRARY" === conf) {
            this.confType = ConfigType.LIBRARY;
        }
    }

    isConfigFile() {
        if (this.confType === ConfigType.CONFIGURATION_FILE) {
            return true;
        } else {
            return false;
        }
    }

    isLibrary() {
        if (this.confType === ConfigType.LIBRARY) {
            return true;
        } else {
            return false;
        }
    }

    isDeploymentUnit() {
        if (this.confType === ConfigType.DEPLOYMENT_UNIT) {
            return true;
        } else {
            return false;
        }
    }

    getConfLabel() {
        switch (this.confType) {
            case ConfigType.DEPLOYMENT_UNIT:
            case 0:
                return "Deployment Unit";
            case ConfigType.CONFIGURATION_FILE:
            case 1:
                return "Configuration";
            case ConfigType.LIBRARY:
            case 2:
                return "Library";
            default:
                return "";
        }
    }

    /**
     * check the status and communicate with the backend to perform the required operations.
     */
    refresh() {
        switch (this.state) {//to be deleted
            case 0:
            {
                var uploader:MultipartUploader =
                    new MultipartUploader({
                        url: this.restService.getBaseUrl("deploymentConf/upload"),
                        authToken: JwtProvider.getToken()
                    });

                var multipartItem:MultipartItem = new MultipartItem(uploader);

                if (multipartItem == null) {
                    multipartItem = new MultipartItem(uploader);
                }

                if (multipartItem.formData == null)
                    multipartItem.formData = new FormData();

                multipartItem.formData.append("file", this.file);
                multipartItem.formData.append("name", this.name);
                multipartItem.formData.append("url", this.url);
                multipartItem.formData.append("type", this.confType);
                multipartItem.formData.append("projectId", this.projectId);
                multipartItem.formData.append("portList", this.ports);
                // multipartItem.formData.append("index", i);

                multipartItem.onSuccess = (response:any, status:any, headers:any)=> {
                    try {
                        this.id = parseInt(JSON.parse(response).id);
                    }catch(e){
                        console.log(response);
                    }
                    this.state = 1;
                    this.error = 0;
                    this.processing = false;
                };

                multipartItem.onError = (response:any, status:any, headers:any)=> {
                    if (!this.retry()) {
                        this.error = 1;
                    }
                };

                multipartItem.callback = (data)=> {
                    //to prevent undefined error, we have to keep this function
                };

                //mark as processing
                this.processing = true;
                multipartItem.upload();
                break;
            }
            case 2:
            {
                if (this.id > 0) {//call server only if id is greater than 0, ie: not a local upload
                    this.processing = true;
                    this.restService.delete(this.restService.getResourceUrl("deploymentConf", this.id))
                        .subscribe(
                            data=> {
                                this.state = 3;
                                this.error = 0;
                                this.processing = false;
                            },
                            err=> {
                                if (!this.retry()) {
                                    this.error = 2;
                                }
                            }
                        );
                } else {
                    this.state = 3;
                    this.error = 0;
                    this.processing = false;
                }
                break;
            }
        }
    }

    private retry() {
        if (this.retries < 5) {
            console.log('retrying...');
            this.retries++;
            this.refresh();
            return true;
        }
        this.processing = false;
        return false;
    }


}

export enum ConfigType {
    DEPLOYMENT_UNIT = 0,
    CONFIGURATION_FILE = 1,
    LIBRARY = 2
}