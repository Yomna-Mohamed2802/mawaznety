import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'يناير', users: 400, votes: 240 },
  { name: 'فبراير', users: 300, votes: 139 },
  { name: 'مارس', users: 200, votes: 980 },
  { name: 'أبريل', users: 278, votes: 390 },
  { name: 'مايو', users: 189, votes: 480 },
  { name: 'يونيو', users: 239, votes: 380 },
  { name: 'يوليو', users: 349, votes: 430 },
  { name: 'أغسطس', users: 420, votes: 510 },
];

const ActivityChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">مخطط النشاط</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="users" stackId="1" stroke="#3b82f6" fill="#93c5fd" name="المستخدمين" />
          <Area type="monotone" dataKey="votes" stackId="1" stroke="#8b5cf6" fill="#c4b5fd" name="التصويتات" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
