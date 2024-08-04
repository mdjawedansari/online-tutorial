import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { users } = useSelector((state) => state.user);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">User Statistics</h2>
        <p>Total Registered Users: {users.length}</p>
        {/* Add charts for registered users, subscribed users, and payment graph */}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Manage Courses</h2>
        {/* Add course management functionality */}
      </div>
    </div>
  );
};

export default AdminDashboard;
