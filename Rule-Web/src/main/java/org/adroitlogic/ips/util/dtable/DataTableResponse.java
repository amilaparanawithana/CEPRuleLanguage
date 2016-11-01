package org.adroitlogic.ips.util.dtable;

import java.util.List;

/**
 * Wrapper for the front end data table module. Each response sent to the data tables
 * should be wrapped using this class.
 * @author Chathura Widanage
 */
public class DataTableResponse<T> {
    private long totalEntries;
    private int totalPages;
    private int currentPage;
    private List<T> dataRows;

    public long getTotalEntries() {
        return totalEntries;
    }

    public void setTotalEntries(long totalEntries) {
        this.totalEntries = totalEntries;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public List<T> getDataRows() {
        return dataRows;
    }

    public void setDataRows(List<T> dataRows) {
        this.dataRows = dataRows;
    }
}
