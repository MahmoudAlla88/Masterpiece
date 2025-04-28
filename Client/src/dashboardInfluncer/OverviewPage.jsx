import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const OverviewPage = () => {
  const { currentUser: user } = useSelector(state => state.user);
  const [data, setData] = useState(null);

//   const loadOverview = async () => {
//     if (!user?.id) return;
   

//     const  data = await axios.get(
//       `http://localhost:4000/api/users/influencers/${user.id}/overview`,
      
//     );
//     console.log("kk",data);
//     setData(data);
//   };
const loadOverview = async () => {
    if (!user?.id) return;
  
    try {
      const token = Cookies.get('token');
  
      // -- نحصل على الاستجابة --
      const { data } = await axios.get(
        `http://localhost:4000/api/users/influencers/${user.id}/overview`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // -- نخزّن الحمولة فقط (ليس الكائن كله) --
      setData(data);
    } catch (err) {
      console.error('Failed to load overview:', err);
    }
  };
  useEffect(() => { loadOverview(); }, [user?.id]);

  if (!data) return <p className="p-6">Loading…</p>;

  /* تجهيز كروت الإحصائيات */
  const cards = [
    { label: 'Total Bookings', value: data.statusCounts.reduce((s, c) => s + Number(c.count), 0) },
    ...data.statusCounts.map(s => ({ label: s.status, value: s.count })),
    { label: 'Confirmed Revenue', value: `${data.totalRevenue} $` },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      {/* ------- Cards ------- */}
      <div className="grid md:grid-cols-3 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-white shadow p-4 rounded-xl">
            <p className="text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* ------- Next booking ------- */}
      {data.nextBooking && (
        <div className="bg-blue-50 p-4 rounded-xl">
          <p>أقرب حجز قادم:</p>
          <p className="font-semibold">{data.nextBooking.campaignTitle}</p>
          <p>{moment(data.nextBooking.scheduledDate).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      )}

      {/* ------- Chart ------- */}
      <div className="bg-white shadow p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Bookings last 6 months</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.monthly.map(m => ({
            month: moment(m.month).format('MMM'),
            bookings: m.bookings
          }))}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Bar dataKey="bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewPage;
