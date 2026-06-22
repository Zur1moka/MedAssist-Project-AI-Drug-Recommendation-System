import { useState } from 'react';
import StatsCards from '../../components/admin/StatsCards';
import UserTable from '../../components/admin/UserTable';

const AdminDashboard = () => {
  // Mock data - sẽ thay bằng API thật sau
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'an.nguyen@medassist.com', role: 'user', isActive: true },
    { id: 2, name: 'Trần Thị B', email: 'b.tran@medassist.com', role: 'admin', isActive: true },
    { id: 3, name: 'Lê Văn C', email: 'c.le@medassist.com', role: 'user', isActive: false },
    { id: 4, name: 'Phạm Thị D', email: 'd.pham@medassist.com', role: 'user', isActive: true },
    { id: 5, name: 'Hoàng Văn E', email: 'e.hoang@medassist.com', role: 'user', isActive: false },
  ]);

  const stats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    blocked: users.filter(u => !u.isActive).length
  };

  const handleToggleStatus = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleEdit = (user) => {
    alert(`Chỉnh sửa user: ${user.name}`);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Bạn có chắc muốn xóa user này?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">📊 Quản lý người dùng</h1>
        <p className="text-slate-400 text-sm">Quản lý tài khoản, phân quyền và trạng thái hoạt động</p>
      </div>
      
      <StatsCards total={stats.total} active={stats.active} blocked={stats.blocked} />
      
      <UserTable 
        users={users}
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;