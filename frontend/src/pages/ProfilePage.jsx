import { useState } from 'react';
import Navbar from '../components/common/Navbar';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    email: 'an.nguyen@medassist.com',
    phone: '0909 123 456',
    dob: '1995-08-15',
    gender: 'Nam',
    joinedAt: '15/05/2026'
  });

  const [editData, setEditData] = useState(user);

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
    alert('✅ Đã lưu thông tin thành công!');
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans overflow-hidden">
      <div className="bg-glow-orb w-[400px] h-[400px] bg-teal-500/5 top-[20%] left-[-10%]"></div>
      <div className="bg-glow-orb w-[500px] h-[500px] bg-sky-500/5 bottom-[-10%] right-[-10%]"></div>

      <Navbar />

      <div className="relative z-10 container mx-auto px-6 py-8 max-w-4xl space-y-6">
        {/* Back Button */}
        <button className="text-slate-400 hover:text-white text-sm flex items-center gap-2">
          ◄ Quay lại Dashboard
        </button>

        {/* Profile Header */}
        <div className="glass-card p-6 rounded-xl flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-500 to-sky-600 flex items-center justify-center text-3xl text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 bg-slate-800 p-1.5 rounded-full border border-slate-700 hover:bg-slate-700 text-sm">
              📸
            </button>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-slate-400">{user.email}</p>
            <p className="text-slate-500 text-sm">Tham gia từ: {user.joinedAt}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-800 overflow-x-auto">
          {['📝 Thông tin cá nhân', '🔑 Đổi mật khẩu', '📋 Lịch sử tra cứu', '⚙️ Cài đặt'].map((tab, i) => (
            <button key={i} className={`px-4 py-2 text-sm border-b-2 transition-all whitespace-nowrap ${i === 0 ? 'border-teal-500 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Info */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">Thông tin cá nhân</h3>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="text-teal-400 hover:text-teal-300 text-sm">
                ✏️ Sửa
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-slate-800 rounded-lg text-sm hover:bg-slate-700">
                  Hủy
                </button>
                <button onClick={handleSave} className="px-3 py-1 bg-teal-600 rounded-lg text-sm hover:bg-teal-500">
                  💾 Lưu
                </button>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            {[
              { label: 'Họ và tên', key: 'name', type: 'text' },
              { label: 'Email', key: 'email', type: 'text', readonly: true },
              { label: 'Số điện thoại', key: 'phone', type: 'text' },
              { label: 'Ngày sinh', key: 'dob', type: 'date' },
              { label: 'Giới tính', key: 'gender', type: 'select', options: ['Nam', 'Nữ', 'Khác'] },
            ].map((field) => (
              <div key={field.key} className="flex flex-col sm:flex-row sm:items-center border-b border-slate-800/50 py-2 gap-1 sm:gap-0">
                <span className="sm:w-32 text-slate-400 text-sm font-medium">{field.label}</span>
                {isEditing && !field.readonly ? (
                  field.type === 'select' ? (
                    <select 
                      value={editData[field.key]} 
                      onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                      className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {field.options.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input 
                      type={field.type} 
                      value={editData[field.key]} 
                      onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                      className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  )
                ) : (
                  <span className="text-white">{field.readonly ? user[field.key] : user[field.key]}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;