import { useState, useEffect } from 'react';
import StatsCards from '../../components/admin/StatsCards';
import UserTable from '../../components/admin/UserTable';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, blocked: 0 });

  useEffect(() => {
    // TODO: Thay mock data bằng API thật
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // const res = await api.get('/admin/users');
        const mockUsers = [
          { id: 1, name: 'Nguyễn Văn A', email: 'an.nguyen@medassist.com', role: 'user', isActive: true },
          { id: 2, name: 'Trần Thị B', email: 'b.tran@medassist.com', role: 'admin', isActive: true },
          { id: 3, name: 'Lê Văn C', email: 'c.le@medassist.com', role: 'user', isActive: false },
          { id: 4, name: 'Phạm Thị D', email: 'd.pham@medassist.com', role: 'user', isActive: true },
          { id: 5, name: 'Hoàng Văn E', email: 'e.hoang@medassist.com', role: 'user', isActive: false },
          { id: 6, name: 'Ngô Thị F', email: 'f.ngo@medassist.com', role: 'user', isActive: true },
          { id: 7, name: 'Đỗ Văn G', email: 'g.do@medassist.com', role: 'user', isActive: true },
          { id: 8, name: 'Bùi Thị H', email: 'h.bui@medassist.com', role: 'admin', isActive: true },
          { id: 9, name: 'Lý Văn I', email: 'i.ly@medassist.com', role: 'user', isActive: false },
          { id: 10, name: 'Trương Thị K', email: 'k.truong@medassist.com', role: 'user', isActive: true },
        ];
        setUsers(mockUsers);
        const total = mockUsers.length;
        const active = mockUsers.filter(u => u.isActive).length;
        setStats({ total, active, blocked: total - active });
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleStatus = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
    setStats(prev => {
      const user = users.find(u => u.id === userId);
      if (!user) return prev;
      const newActive = user.isActive ? prev.active - 1 : prev.active + 1;
      return { ...prev, active: newActive, blocked: users.length - newActive };
    });
  };

  const handleEdit = (user) => {
    console.log('✏️ Edit user:', user);
    alert(`Chỉnh sửa user: ${user.name}`);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Bạn có chắc muốn xóa user này?')) {
      const user = users.find(u => u.id === userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
      if (user) {
        setStats(prev => {
          const newActive = user.isActive ? prev.active - 1 : prev.active;
          return { ...prev, total: prev.total - 1, active: newActive, blocked: prev.total - 1 - newActive };
        });
      }
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Đang tải...</div>;
  }

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