# Table 使用示例

```typescript jsx
import React, { useRef, useState } from 'react';
import Table, { TableColumn, TableRef } from './Table';

// 示例数据
const sampleData = [
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', status: 'inactive' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', status: 'active' },
  // ... 更多数据
];

const App: React.FC = () => {
  const tableRef = useRef<TableRef>(null);
  const [data, setData] = useState(sampleData);
  const [loading, setLoading] = useState(false);

  // 定义列配置
  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'ID',
      width: 80,
      sortable: true,
    },
    {
      key: 'name',
      title: '姓名',
      width: 120,
      sortable: true,
    },
    {
      key: 'age',
      title: '年龄',
      width: 80,
      sortable: true,
    },
    {
      key: 'email',
      title: '邮箱',
      width: 200,
    },
    {
      key: 'status',
      title: '状态',
      width: 100,
      render: (value) => (
        <span className={`status ${value === 'active' ? 'active' : 'inactive'}`}>
          {value === 'active' ? '激活' : '未激活'}
        </span>
      ),
    },
    {
      key: 'action',
      title: '操作',
      width: 150,
      render: (_, record) => (
        <div>
          <button onClick={() => handleEdit(record)}>编辑</button>
          <button onClick={() => handleDelete(record.id)}>删除</button>
        </div>
      ),
    },
  ];

  const handleEdit = (record: any) => {
    console.log('编辑记录:', record);
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
  };

  const handleRefresh = () => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setLoading(false);
      // 重新加载数据
    }, 1000);
  };

  const handleGoToPage = () => {
    if (tableRef.current) {
      tableRef.current.goToPage(3);
    }
  };

  const handleGetCurrentPage = () => {
    if (tableRef.current) {
      alert(`当前页码: ${tableRef.current.getCurrentPage()}`);
    }
  };

  return (
    <div className="app">
      <h1>可翻页表格示例</h1>
      
      <div className="toolbar">
        <button onClick={handleRefresh}>刷新数据</button>
        <button onClick={handleGoToPage}>跳转到第3页</button>
        <button onClick={handleGetCurrentPage}>获取当前页码</button>
      </div>

      <Table
        ref={tableRef}
        dataSource={data}
        columns={columns}
        pageSize={10}
        showSizeChanger={true}
        showQuickJumper={true}
        showTotal={true}
        bordered={true}
        rowKey="id"
        loading={loading}
        onPageChange={(page, pageSize) => {
          console.log(`页码变化: ${page}, 页大小: ${pageSize}`);
        }}
      />
    </div>
  );
};

export default App;
```

## 功能说明

这个表格组件具有以下功能：

**分页功能：**

- 支持自定义每页显示数量

- 显示总记录数

- 快速跳转到指定页码

- 页码过多时显示省略号

**排序功能：**

- 支持列排序（`升序`/`降序`）

- 通过列配置启用排序

**自定义渲染：**

- 支持自定义单元格内容渲染

- 支持操作列

**引用操作：**

- 获取当前页码

- 跳转到指定页码

- 刷新数据

- 设置新的数据源

**其他特性：**

- 加载状态显示

- 边框样式控制

- 空数据提示

- 页码变化回调