package org.adroitlogic.ips.repository;

import org.adroitlogic.ips.beans.db.Permission;
import org.springframework.data.repository.CrudRepository;

/**
 * @author amila paranawithana
 *         Expose database functionalities for Permission domain
 */
public interface PermissionRepository extends CrudRepository<Permission, Integer> {

    Permission findById(int id);

    Permission findByName(String name);

}
