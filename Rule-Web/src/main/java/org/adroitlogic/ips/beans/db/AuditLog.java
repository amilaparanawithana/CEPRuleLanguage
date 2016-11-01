package org.adroitlogic.ips.beans.db;

import javax.persistence.*;
import java.util.Date;

/**
 * @author amila
 *         IPS monitor action logs
 */
@Entity
@Table(name = "AUDIT_LOG")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE")
    private Type type;

    @Column(name = "TIMESTAMP")
    Date timestamp;

    @Column(name = "USERNAME")
    String username;

    @Column(name = "AUDIT_MESSAGE")
    String auditMessage;

    @Column(name = "SUBJECT")
    String subject;

    @Column(name = "HOST")
    String host;

    public enum Type {
        GENERIC, USER, KUBERNETES, PROJECT, CLUSTER, TENANT, POD,SERVICE_PACKAGE, DEFAULT
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAuditMessage() {
        return auditMessage;
    }

    public void setAuditMessage(String auditMessage) {
        this.auditMessage = auditMessage;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }
}
