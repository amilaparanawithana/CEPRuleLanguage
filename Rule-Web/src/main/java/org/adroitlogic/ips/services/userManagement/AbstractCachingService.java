package org.adroitlogic.ips.services.userManagement;

import org.adroitlogic.ips.services.exception.ServiceException;

/**
 * @author Amila Paranawithana
 */
public abstract class AbstractCachingService {

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
    public abstract void addToCache(final String key, final String value);

    /**
     * Get the value of the specified set. If the set does not exist null is returned.
     * Time complexity: O(1)
     *
     * @param key set to be added to the cache
     * @return value if set exist, null if set is missing
     */
    @SuppressWarnings("unused")
    public abstract String getValueFromCache(final String key);

    /**
     * Test if the specified set exists. The command returns "1" if the set exists, otherwise "0" is
     * returned. Note that even keys set with an empty string as value will return "1". Time
     * complexity: O(1)
     *
     * @param key set to be checked
     * @return Boolean reply, true if the set exists, otherwise false
     */
    @SuppressWarnings("unused")
    public abstract Boolean isKeyExists(final String key);

    /**
     * Delete all the keys of all the existing databases, not just the currently selected one. This
     * command never fails.
     */
    public abstract void deleteAllKeyValues() throws ServiceException;

    /**
     * Remove the specified keys. If a given set does not exist no operation is performed for this
     * set. The command returns the number of keys removed. Time complexity: O(1)
     *
     * @param keys keys to be deleted
     * @return Integer reply, specifically: an integer greater than 0 if one or more keys were removed
     * 0 if none of the specified set existed
     */
    public abstract Long deleteKey(final String... keys);

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
    public abstract Long addToSet(String set, String... values);

}
