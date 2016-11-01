package org.adroitlogic.ips.repository;

import org.adroitlogic.ips.beans.db.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author amila paranawithana
 *         Expose database functionalities for AuditLog domain
 */
public interface AuditLogRepository extends PagingAndSortingRepository<AuditLog, Integer> {

    Iterable<AuditLog> findAllByType(AuditLog.Type type);

    Page<AuditLog> findAllByTypeLikeOrAuditMessageLikeOrUsernameLike(AuditLog.Type type, String msg, String username, Pageable pageable);

  /*  @Query("SELECT a FROM AuditLog a WHERE a.auditMessage LIKE CONCAT('%',:searchKey,'%') OR a.username LIKE CONCAT('%',:searchKey,'%') OR a.subject LIKE CONCAT('%',:searchKey,'%') OR a.type LIKE CONCAT('%',:searchKey,'%')")
    List<AuditLog> find(@Param("searchKey") String searchKey, Pageable pageable);
*/
}
