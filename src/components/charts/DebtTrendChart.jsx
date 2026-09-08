import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useLang } from '../../context/LangContext';

const CustomTooltip = ({ active, payload, label }) => {
  const { lang, t } = useLang();
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl border border-primary-100/60 px-4 py-3" dir="rtl" style={{ boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.1)' }}>
        <p className="text-sm font-semibold text-primary-900 mb-1">{label}</p>
        <p className="text-xs text-primary-600">
          {t.debtRatio}: <span className="font-bold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DebtTrendChart({ data, highlightId }) {
  const { lang, t } = useLang();
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: '#627d98', fontWeight: 500 }}
          reversed
          axisLine={{ stroke: '#e5e7eb' }}
          tickLine={false}
        />
        <YAxis
          domain={[60, 105]}
          tick={{ fontSize: 11, fill: '#627d98' }}
          tickFormatter={(v) => `${v}%`}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={70}
          stroke="#059669"
          strokeDasharray="6 4"
          strokeWidth={2}
          label={{
            value: t.debtGoal,
            position: 'insideTopRight',
            fill: '#059669',
            fontSize: 11,
            fontWeight: 600,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#102a43"
          strokeWidth={3}
          dot={(props) => {
            const { cx, cy, payload } = props;
            const isActive = highlightId === payload.id;
            return (
              <circle
                key={`dot-${payload.year}`}
                cx={cx}
                cy={cy}
                r={isActive ? 7 : 5}
                fill={isActive ? '#dc2626' : '#102a43'}
                stroke="white"
                strokeWidth={2.5}
                style={{ cursor: 'pointer', filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none' }}
              />
            );
          }}
          activeDot={{ r: 8, fill: '#dc2626', stroke: 'white', strokeWidth: 3 }}
          animationDuration={1200}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
