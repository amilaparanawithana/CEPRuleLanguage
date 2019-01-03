/**
 * Copyright &copy Land Transport Authority (Singapore) 2018. All rights reserved.
 * The contents of this document are property of Land Transport Authority (Singapore).
 * No part of this work may be reproduced or transmitted in any form or by any means,
 * except as permitted by written license agreement with the Land Transport Authority
 * (Singapore).
 */
package org.uom.msc.cep.util;

/**
 * HttpResponse status
 *
 * @author Amila
 * @version 1.0
 * @since ABT
 *
 * <pre>
 * Revision History:
 * Version  Date                     Author                      Changes
 * -----------------------------------------------------------------------------
 * 1.0      2018-11-19               Amila                     Initial coding
 * </pre>
 */
public enum Status {

    SUCCESS("success") ,
    WARN("warn"),
    ERROR("error");


    String status;
    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
