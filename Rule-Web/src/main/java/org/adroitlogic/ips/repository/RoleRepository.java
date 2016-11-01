package org.adroitlogic.ips.repository;

import org.adroitlogic.ips.beans.db.Role;
import org.springframework.data.repository.CrudRepository;

/**
 * @author amila paranawithana
 *         Expose database functionalities for Role domain
 */
public interface RoleRepository extends CrudRepository<Role, Integer> {

    Role findById(int id);

    Role findByName(String name);

    Role findOneByTenant_nameAndName(String tenant, String name);

    Iterable<Role> findAllByTenant_name(String tenant);
}
