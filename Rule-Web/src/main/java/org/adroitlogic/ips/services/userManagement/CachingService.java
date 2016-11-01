package org.adroitlogic.ips.services.userManagement;

import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisException;

import java.util.Set;

import static org.adroitlogic.ips.services.userManagement.CachingService.ExpirationTimeUnit.MILLISECONDS;

/**
 * @author Sajith Dilshan
 * @author Chathura Widanage
 */
public class CachingService {

    private Logger logger = LogManager.getLogger(CachingService.class);

    private String hostName;
    private int port;

    private JedisPool jedisPool;

    public void init() {
        this.jedisPool = new JedisPool(hostName, port);
    }

    /**
     * Set the string value as value of the set. The string can't be longer than 1073741824 bytes (1
     * GB).
     * <p/>
     * Time complexity: O(1)
     *
     * @param key   set to be added to the cache
     * @param value value to be added to the cache
     */
    @SuppressWarnings("unused")
    public void addToCache(final String key, final String value) {
        final Jedis client = getClient();
        client.set(key, value);
        client.close();

    }

    /**
     * Set the string value as value of the set. The string can't be longer than 1073741824 bytes (1
     * GB).
     *
     * @param key                set to be added to the cache
     * @param value              value to be added to the cache
     * @param override           false-- Only set the set if it does not already exist. true -- Only set the set
     *                           if it already exist.
     * @param expirationTimeUnit expiration time unit in {@link ExpirationTimeUnit}
     * @param expirationTime     expire time in the units of {@link ExpirationTimeUnit}
     */
    @SuppressWarnings("unused")
    public void addToCacheWithExpiration(final String key, final String value, boolean override,
                                         final ExpirationTimeUnit expirationTimeUnit, final long expirationTime) {
        final String timeUnit = expirationTimeUnit == MILLISECONDS ? "PX" : "EX";
        final String overrideKey = override ? "XX" : "NX";
        final Jedis client = getClient();
        client.set(key, value, overrideKey, timeUnit, expirationTime);
        client.close();
    }

    /**
     * Get the value of the specified set. If the set does not exist null is returned.
     * Time complexity: O(1)
     *
     * @param key set to be added to the cache
     * @return value if set exist, null if set is missing
     */
    @SuppressWarnings("unused")
    public String getValueFromCache(final String key) {
        final Jedis client = getClient();
        final String value = client.get(key);
        client.close();
        return value;
    }

    /**
     * Test if the specified set exists. The command returns "1" if the set exists, otherwise "0" is
     * returned. Note that even keys set with an empty string as value will return "1". Time
     * complexity: O(1)
     *
     * @param key set to be checked
     * @return Boolean reply, true if the set exists, otherwise false
     */
    @SuppressWarnings("unused")
    public Boolean isKeyExists(final String key) {
        final Jedis client = getClient();
        final Boolean exists = client.exists(key);
        client.close();
        return exists;
    }

    /**
     * Add the string value to the head (LPUSH) or tail (RPUSH) of the list stored at set. If the set
     * does not exist an empty list is created just before the append operation. If the set exists but
     * is not a List an error is returned.
     * <p/>
     * Time complexity: O(1)
     *
     * @param set    name of the set (key)
     * @param values values for the key
     * @return Integer reply, specifically, the number of elements inside the list after the push
     * operation.
     */
    public Long addToSet(String set, String... values) {
        final Jedis client = getClient();
        final Long value = client.sadd(set, values);
        client.close();
        return value;
    }

    /**
     * Return all the members (elements) of the set value stored at set. T
     * <p/>
     * Time complexity O(N)
     *
     * @param set name of the set. (key)
     * @return Multi bulk reply
     */
    public Set<String> readSet(String set) throws JedisException {
        final Jedis client = getClient();
        Set<String> membersSet = client.smembers(set);
        if (membersSet.isEmpty()) {
            throw new JedisException("Empty list or set.");
        }

        final Set<String> smembers = client.smembers(set);
        client.close();
        return smembers;
    }

    /**
     * Remove the specified keys. If a given set does not exist no operation is performed for this
     * set. The command returns the number of keys removed. Time complexity: O(1)
     *
     * @param keys keys to be deleted
     * @return Integer reply, specifically: an integer greater than 0 if one or more keys were removed
     * 0 if none of the specified set existed
     */
    public Long deleteKey(final String... keys) {
        final Jedis client = getClient();
        final Long del = client.del(keys);
        client.close();
        return del;
    }

    /**
     * Delete all the keys of all the existing databases, not just the currently selected one. This
     * command never fails.
     */
    public void deleteAllKeyValues() throws ServiceException {
        try {
            final Jedis client = getClient();
            client.flushAll();
            client.close();
        } catch (Exception e) {
            logger.error("Failed to delete the cache", e);
            throw new ServiceException("Failed to update the cache.", e);
        }
    }

    @SuppressWarnings("unused")
    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    @SuppressWarnings("unused")
    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }


    public enum ExpirationTimeUnit {
        MILLISECONDS,

        @SuppressWarnings("unused")
        SECONDS
    }

    private Jedis getClient() {
        final Jedis client = this.jedisPool.getResource();
        if (client.isConnected()) {
            return client;
        } else {
            client.close();//retuning broken resource
            return this.getClient();
        }
    }
}
