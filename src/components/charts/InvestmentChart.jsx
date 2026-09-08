import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#102a43', '#334e68', '#486581', '#627d98'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl border border-primary-100/60 px-4 py-3" dir="rtl" style={{ boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.1)' }}>
        <p className="text-sm font-semibold text-primary-900 mb-1">{label}</p>
        <p className="text-xs text-primary-600">
          {payload[0].value} مليار جنيه
        </p>
      </div>
    );
  }
  return null;
};

export default function InvestmentChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(280, data.length * 56)}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: '#627d98' }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="label"
          tick={{ fontSize: 12, fill: '#334e68', fontWeight: 500 }}
          width={180}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16, 42, 67, 0.04)' }} />
        <Bar
          dataKey="value"
          radius={[0, 6, 6, 0]}
          barSize={22}
          animationDuration={800}
          animationEasing="ease-out"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
