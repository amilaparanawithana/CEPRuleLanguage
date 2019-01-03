/**
 * Copyright &copy Land Transport Authority (Singapore) 2018. All rights reserved.
 * The contents of this document are property of Land Transport Authority (Singapore).
 * No part of this work may be reproduced or transmitted in any form or by any means,
 * except as permitted by written license agreement with the Land Transport Authority
 * (Singapore).
 */
package org.uom.msc.cep.exceptions;

/**
 * Exception thrown by controllers
 * These exception information will be sent to the front end (UI) and message will be displayed in UI
 *
 * @author Amila
 * @version 1.0
 * @since ABT
 *
 * <pre>
 * Revision History:
 * Version  Date                     Author                      Changes
 * -----------------------------------------------------------------------------
 * 1.0      2018-11-20               Amila                     Initial coding
 * </pre>
 */
public class EControllerException
        extends Exception
{

    public EControllerException(String message, Throwable cause) {
        super(message, cause);
    }
}
