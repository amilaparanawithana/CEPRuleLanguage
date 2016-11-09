package org.adroitlogic.ips.services;

import org.adroitlogic.ips.beans.db.AuditLog;
import org.adroitlogic.ips.repository.AuditLogRepository;
import org.adroitlogic.ips.rest.resources.AuditLogResource;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.adroitlogic.ips.util.dtable.DataTableResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;

/**
 * @author Amila Paranawithana
 */
public class AuditLogService {

    private Logger logger = LogManager.getLogger(AuditLogService.class);

    @Autowired
    private AuditLogRepository auditLogRepository;

    private String logPath;
    private File logFile;

    private final Map<Integer, String> columnNameMap = new HashMap<>();

    public void init() throws IOException {
        logFile = new File(logPath);
        if (!logFile.exists()) {
            logFile.createNewFile();
        }

        columnNameMap.put(0, "id");
        columnNameMap.put(1, "auditMessage");
        columnNameMap.put(2, "host");
        columnNameMap.put(3, "subject");
        columnNameMap.put(4, "timestamp");
        columnNameMap.put(5, "type");
        columnNameMap.put(6, "username");
    }

    /**
     * Persist a new Audit log with given parameters
     *
     * @param user         name of the user
     * @param type         type of the audit log
     * @param subject      subject of the audit log
     * @param auditMessage respective audit message
     */
    public void create(String user, AuditLog.Type type, String subject, String auditMessage) {
        AuditLog auditLog = new AuditLog();

        auditLog.setSubject(subject);
        auditLog.setUsername(user);
        auditLog.setAuditMessage(auditMessage);
        auditLog.setType(type);
        auditLog.setTimestamp(new Date());
        try {
            auditLog.setHost(InetAddress.getLocalHost().getHostName());
        } catch (UnknownHostException ignore) {
        }

        try {
            auditLogRepository.save(auditLog);
        } catch (DataAccessException e) {
            // writing the log to the database failed
            writeLogsToFile(createLogString(auditLog));
        }

        if (logger.isTraceEnabled()) {
            logger.trace("Persisted audit message at {} with subject : {}, user : {}, type: {}, message :{}",
                    auditLog.getTimestamp(), auditLog.getSubject(), auditLog.getUsername(), auditLog.getType(),
                    auditLog.getAuditMessage());
        }
    }

    private void writeLogsToFile(String auditMessage) {

        try (FileWriter fw = new FileWriter(logFile.getAbsoluteFile(), true); BufferedWriter bw = new BufferedWriter(fw)) {
            bw.write(auditMessage + "\n");

        } catch (IOException io) {
            logger.trace("Could not write to the file the log message: {}", auditMessage);
        }
    }

    /**
     * List all the audit logs in the database
     *
     * @return a list of {@link AuditLogResource}
     * @throws ServiceException if obtaining audit logs fails
     */
    public DataTableResponse<AuditLogResource> list(int limit, int page, String key, int column, Boolean asc) throws ServiceException {
        List<AuditLogResource> auditLogResources = new ArrayList<>();
        AuditLog.Type type = AuditLog.Type.DEFAULT;
        Sort.Direction direction = asc ? Sort.Direction.ASC : Sort.Direction.DESC;
        try {
            type = AuditLog.Type.valueOf(key);
        } catch (IllegalArgumentException ignore) {
        }

        key = key.isEmpty() ? "%" : "%" + key + "%";

        try {
            Page<AuditLog> results = auditLogRepository
                    .findAllByTypeLikeOrAuditMessageLikeOrUsernameLike(type, key, key, new PageRequest(page, limit, direction, columnNameMap.get(column)));
            results.forEach(auditLog ->
                    auditLogResources.add(createResource(auditLog))
            );
            DataTableResponse<AuditLogResource> dataTableResponse = new DataTableResponse<>();
            dataTableResponse.setDataRows(auditLogResources);
            dataTableResponse.setTotalEntries(results.getTotalElements());
            dataTableResponse.setCurrentPage(results.getNumber());
            dataTableResponse.setTotalPages(results.getTotalPages());
            return dataTableResponse;
        } catch (DataAccessException e) {
            logger.error("Failed to obtain audit logs", e);
            throw new ServiceException("Failed to obtain the audit logs");
        }
    }

    /**
     * Returns a list of audit logs with the given type
     *
     * @param type type of the desired audit logs
     * @return a list of {@link AuditLogResource}
     * @throws ServiceException if obtaining audit logs fails
     */
    public List<AuditLogResource> listByType(String type) throws ServiceException {
        List<AuditLogResource> auditLogResources = new ArrayList<>();

        try {
            auditLogRepository
                    .findAllByType(AuditLog.Type.valueOf(type))
                    .forEach(auditLog ->
                            auditLogResources.add(createResource(auditLog))
                    );
        } catch (DataAccessException e) {
            logger.error("Failed to obtain audit logs with type : {}", type, e);
            throw new ServiceException("Failed to obtain the audit logs");
        }
        return auditLogResources;
    }

    private AuditLogResource createResource(AuditLog auditLog) {

        AuditLogResource auditLogResource = new AuditLogResource();
        auditLogResource.setId(auditLog.getId());
        auditLogResource.setTimestamp(auditLog.getTimestamp());
        auditLogResource.setUsername(auditLog.getUsername());
        auditLogResource.setAuditMessage(auditLog.getAuditMessage());
        auditLogResource.setSubject(auditLog.getSubject());
        auditLogResource.setType(auditLog.getType().toString());

        return auditLogResource;
    }

    private String createLogString(AuditLog auditLog) {
        StringBuilder logStringBuffer = new StringBuilder("")
                .append(auditLog.getHost()).append(" ")
                .append(auditLog.getTimestamp()).append(" ")
                .append(auditLog.getType()).append(" ")
                .append(auditLog.getSubject()).append(" ")
                .append(auditLog.getUsername()).append(" ")
                .append(auditLog.getAuditMessage());

        System.out.println(logStringBuffer.toString());
        return logStringBuffer.toString();
    }

    public String getLogPath() {
        return logPath;
    }

    public void setLogPath(String logPath) {
        this.logPath = logPath;
    }
}
