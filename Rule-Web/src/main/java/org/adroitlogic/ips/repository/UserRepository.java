package org.adroitlogic.ips.repository;

import org.adroitlogic.ips.beans.db.User;
import org.springframework.data.repository.CrudRepository;

/**
 * @author amila paranawithana
 *         Expose database functionalities for User domain
 */
public interface UserRepository extends CrudRepository<User, Integer> {

    User findById(int id);

    User findByName(String name);

    Iterable<User> findAllByTenant_name(String tenant);
}
