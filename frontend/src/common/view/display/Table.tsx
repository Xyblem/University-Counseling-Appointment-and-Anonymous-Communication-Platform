import React, { useState, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
import './Table.css'
// 定义表格列配置接口
export interface TableColumn {
    key: string;
    title: string;
    width?: number;
    sortable?: boolean;
    render?: (value: any, record: any, index: number) => React.ReactNode;
}

// 定义表格属性接口
export interface TableProps {
    dataSource: any[];
    columns: TableColumn[];
    pageSize?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: boolean;
    bordered?: boolean;
    rowKey?: string;
    loading?: boolean;
    onPageChange?: (page: number, pageSize: number) => void;
}

// 定义表格引用接口
export interface TableRef {
    getCurrentPage: () => number;
    getPageSize: () => number;
    goToPage: (page: number) => void;
    refresh: () => void;
    setDataSource: (data: any[]) => void;
}

// 表格组件
export const Table = forwardRef<TableRef, TableProps>((props, ref) => {
    const {
        dataSource = [],
        columns,
        pageSize: defaultPageSize = 10,
        showSizeChanger = true,
        showQuickJumper = true,
        showTotal = true,
        bordered = false,
        rowKey = 'id',
        loading = false,
        onPageChange
    } = props;

    // 状态管理
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [data, setData] = useState<any[]>(dataSource);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    // 使用useImperativeHandle暴露方法给父组件
    useImperativeHandle(ref, () => ({
        getCurrentPage: () => currentPage,
        getPageSize: () => pageSize,
        goToPage: (page: number) => {
            setCurrentPage(Math.max(1, Math.min(page, totalPages)));
        },
        refresh: () => {
            // 这里可以触发数据重新加载
            setCurrentPage(1);
        },
        setDataSource: (newData: any[]) => {
            setData(newData);
            setCurrentPage(1);
        }
    }));

    // 监听外部数据源变化
    useEffect(() => {
        setData(dataSource);
        setCurrentPage(1);
    }, [dataSource]);

    // 计算分页数据
    const { currentData, totalPages, total } = useMemo(() => {
        // 处理排序
        let sortedData = [...data];
        if (sortConfig !== null) {
            sortedData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        const total = sortedData.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, total);
        const currentData = sortedData.slice(startIndex, endIndex);

        return { currentData, totalPages, total };
    }, [data, currentPage, pageSize, sortConfig]);

    // 处理排序
    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // 处理页码变化
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange?.(page, pageSize);
    };

    // 处理页大小变化
    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
        onPageChange?.(1, size);
    };

    // 渲染分页器
    const renderPagination = () => {
        const pageItems = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // 上一页按钮
        pageItems.push(
            <li
                key="prev"
                className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            >
                &lt;
            </li>
        );

        // 第一页和省略号
        if (startPage > 1) {
            pageItems.push(
                <li
                    key={1}
                    className={`pagination-item ${1 === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(1)}
                >
                    1
                </li>
            );
            if (startPage > 2) {
                pageItems.push(<li key="start-ellipsis" className="pagination-ellipsis">...</li>);
            }
        }

        // 页码按钮
        for (let i = startPage; i <= endPage; i++) {
            pageItems.push(
                <li
                    key={i}
                    className={`pagination-item ${i === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </li>
            );
        }

        // 最后一页和省略号
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageItems.push(<li key="end-ellipsis" className="pagination-ellipsis">...</li>);
            }
            pageItems.push(
                <li
                    key={totalPages}
                    className={`pagination-item ${totalPages === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </li>
            );
        }

        // 下一页按钮
        pageItems.push(
            <li
                key="next"
                className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            >
                &gt;
            </li>
        );

        return (
            <div className="table-pagination">
                <div className="pagination-left">
                    {showTotal && (
                        <span className="pagination-total">
              共 {total} 条记录
            </span>
                    )}
                    {showSizeChanger && (
                        <div className="page-size-changer">
                            <span>每页显示：</span>
                            <select
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    )}
                </div>
                <div className="pagination-center">
                    <ul className="pagination">
                        {pageItems}
                    </ul>
                </div>
                <div className="pagination-right">
                    {showQuickJumper && (
                        <div className="quick-jumper">
                            <span>跳至</span>
                            <input
                                type="number"
                                min={1}
                                max={totalPages}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const page = Number((e.target as HTMLInputElement).value);
                                        if (page >= 1 && page <= totalPages) {
                                            handlePageChange(page);
                                            (e.target as HTMLInputElement).value = '';
                                        }
                                    }
                                }}
                            />
                            <span>页</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 渲染表格头部
    const renderTableHeader = () => (
        <thead>
        <tr>
            {columns.map((column) => (
                <th
                    key={column.key}
                    style={{ width: column.width }}
                    className={column.sortable ? 'sortable' : ''}
                    onClick={() => column.sortable && handleSort(column.key)}
                >
                    <div className="th-content">
                        <span>{column.title}</span>
                        {column.sortable && (
                            <span className="sort-indicator">
                  {sortConfig?.key === column.key && (
                      sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </span>
                        )}
                    </div>
                </th>
            ))}
        </tr>
        </thead>
    );

    // 渲染表格主体
    const renderTableBody = () => (
        <tbody>
        {currentData.length > 0 ? (
            currentData.map((record, index) => (
                <tr key={record[rowKey] || index}>
                    {columns.map((column) => (
                        <td key={column.key}>
                            {column.render
                                ? column.render(record[column.key], record, index)
                                : record[column.key]}
                        </td>
                    ))}
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={columns.length} className="no-data">
                    暂无数据
                </td>
            </tr>
        )}
        </tbody>
    );

    return (
        <div className="table-container">
            <div className={`table-wrapper ${bordered ? 'bordered' : ''}`}>
                {loading && <div className="table-loading">加载中...</div>}
                <table className="data-table">
                    {renderTableHeader()}
                    {renderTableBody()}
                </table>
            </div>
            {total > 0 && renderPagination()}
        </div>
    );
});