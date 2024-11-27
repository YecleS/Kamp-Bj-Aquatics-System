export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p className="label">{`${label}`}</p>
          <p className="value">{`₱ ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };


export const CustomToolTipForRestockVsSales = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    const sales = payload.find(p => p.dataKey === 'sales');
    const restock = payload.find(p => p.dataKey === 'restock');
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`Date: ${label}`}</p>
        <p className="intro">{`Sales: ₱ ${sales ? sales.value.toLocaleString() : 0}`}</p>
        <p className="intro">{`Restock: ₱ ${restock ? restock.value.toLocaleString() : 0}`}</p>
      </div>
    );
  }
  return null;
};