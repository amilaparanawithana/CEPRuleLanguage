package org.adroitlogic.ips.repository;


import org.adroitlogic.ips.beans.db.Tenant;
import org.springframework.data.repository.CrudRepository;

/**
 * @author dimuthu
 *         Expose database functionalities for Tenant domain
 */
public interface TenantRepository extends CrudRepository<Tenant, Integer> {

    Tenant findById(int id);

    Tenant findByName(String name);

    Long deleteByName(String name);
}
