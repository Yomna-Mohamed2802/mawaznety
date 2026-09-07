import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#102a43', '#7c3aed', '#059669', '#d97706', '#dc2626', '#627d98'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white rounded-xl border border-primary-100/60 px-4 py-3 max-w-[200px]" dir="rtl" style={{ boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.1)' }}>
        <p className="text-sm font-semibold text-primary-900 mb-1">{data.label}</p>
        <p className="text-xs text-primary-500">{data.pct}% من إجمالي المصروفات</p>
        <p className="text-xs text-primary-600 mt-1 font-medium tabular-nums">{data.value?.toLocaleString('ar-EG')} مليون جنيه</p>
      </div>
    );
  }
  return null;
};

export default function ExpenditureDonut({ data, onSliceClick, activeId }) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={145}
            paddingAngle={2}
            dataKey="value"
            onClick={(_, index) => onSliceClick(data[index])}
            style={{ cursor: 'pointer', outline: 'none' }}
            animationBegin={0}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.id}`}
                fill={COLORS[index % COLORS.length]}
                opacity={activeId && activeId !== entry.id ? 0.3 : 1}
                stroke="white"
                strokeWidth={3}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-3xl sm:text-4xl font-bold text-primary-900 leading-none tabular-nums">100</p>
          <p className="text-xs text-primary-500 mt-1.5 font-medium">جنيه مصري</p>
        </div>
      </div>
    </div>
  );
}
