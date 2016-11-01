/**
 * @author Sajith Dilshan
 */
export class TroubleshootLaunch {

    /** target file path where report would be saved */
    filePath:string;

    /** regular expression for credential masking */
    credentialMask:string;

    /** credential encryption password */
    credentialPassword:string;

    /** encryption key factory name */
    keyFactoryName:string;

    /** encryption cipher name */
    cipherName:string;

    /** task name queue scheduled for execution, mapped to corresponding parameters */
    taskParamMap:any;


    constructor(filePath:string, credentialMask:string, credentialPassword:string, keyFactoryName:string, cipherName:string) {
        this.filePath = filePath;
        this.credentialMask = credentialMask;
        this.credentialPassword = credentialPassword;
        this.keyFactoryName = keyFactoryName;
        this.cipherName = cipherName;
    }
    
}