package org.adroitlogic.ips.services.userManagement;

import org.adroitlogic.ips.services.exception.ServiceException;

import java.util.HashMap;
import java.util.Map;

/**
 * In Memory cache implementation
 *
 * @author Amila Paranawithana
 */
public class InMemoryCachingService extends AbstractCachingService {

    Map<String, String> cacheMap = new HashMap<>();

    @Override
    public void addToCache(String key, String value) {
        this.cacheMap.put(key, value);
    }

    @Override
    public String getValueFromCache(String key) {
        return this.cacheMap.get(key);
    }

    @Override
    public Boolean isKeyExists(String key) {
        return this.cacheMap.containsKey(key);
    }

    @Override
    public void deleteAllKeyValues() throws ServiceException {
        this.cacheMap.clear();
    }

    @Override
    public Long deleteKey(String... keys) {
        for (String key : keys) {
            this.cacheMap.remove(key);
        }
        return 1L;
    }

    @Override
    public Long addToSet(String set, String... values) {
        return null;
    }
}
