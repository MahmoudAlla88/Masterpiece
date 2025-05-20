// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { UploadCloud, Ban, Eye, RefreshCw, LayoutGrid, Table } from 'lucide-react';
// import { useSelector } from 'react-redux';

// const AdRequests = () => {
  
//   const influencer = useSelector((s) => s.user.currentUser);
//   const [requests, setRequests]   = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [view, setView]           = useState('cards');       
//   const [filter, setFilter]       = useState('all');          
//   const [selected, setSelected]   = useState(null);          
//   const [postUrl, setPostUrl]     = useState('');
//   const [err, setErr]             = useState('');



//   const fetchAll = async () => {
//     if (!influencer) return;
//     setLoading(true);
//     try {
//       const { data } = await axios.get(`http://localhost:4000/api/users/influencer/${influencer.id}`);
//       setRequests(data);
//       console.log(data);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

 
//   useEffect(() => {
    
//     fetchAll();
//   }, [influencer]);

  
//   const act = async (action, url = '') => {
//     if (!selected) return;
//     try {
//       await axios.put(`http://localhost:4000/api/users/status/${selected.id}`, {
//         action,
//         ...(action === 'publish' && { postUrl: url.trim() })
//       });
//       close();
//       fetchAll();
//     } catch (e) {
//       setErr(e?.response?.data?.message || 'Unexpected error');
//     }
//   };

  
//   const close = () => {
//     setSelected(null);
//     setPostUrl('');
//     setErr('');
//   };

//   const shown = requests.filter((r) => filter === 'all' || r.status === filter);

 
//   const purpleBtn   = 'px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700';
//   const outlineBtn  = 'px-3 py-1 bg-white text-purple-600 border border-purple-600 rounded hover:bg-purple-50';
//   const badge       = 'px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700';
//   const statusText  = { pending: 'Pending', published: 'Published', cancelled: 'Cancelled' };

 
//   return (
//     <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
     
//          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
//  <div>
//           <h1 className="text-xl md:text-2xl font-bold text-gray-800">
//             Ad  Requests
//           </h1>
//           <p className="text-gray-500">Manage incoming advertisement requests</p>
//         </div>
//      </div>
//       <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-3 items-center mb-6">
//         {['all', 'pending', 'published', 'cancelled'].map((v) => (
//           <button
//             key={v}
//             onClick={() => setFilter(v)}
//             className={`px-4 py-1 rounded-full border ${
//               filter === v
//                 ? 'bg-purple-600 text-white'
//                 : 'bg-white text-gray-700 border-gray-300'
//             }`}
//           >
//             {v[0].toUpperCase() + v.slice(1)}
//           </button>
//         ))}

//         {/* view toggle */}
//         <div className="ml-auto flex gap-2">
//           <button
//             onClick={() => setView('cards')}
//             className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//               view === 'cards'
//                 ? 'bg-purple-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             {/* <LayoutGrid size={16} /> */}Card View
//           </button>
//           <button
//             onClick={() => setView('table')}
//             className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//               view === 'table'
//                 ? 'bg-purple-600 text-white'
//                 : 'bg-white text-gray-700 border border-gray-300'
//             }`}
//           >
//             {/* <Table size={16} /> */}Table View
//           </button>
//           <button
//             onClick={fetchAll}
//             className="p-2 rounded bg-purple-100 text-purple-700"
//           >
//             <RefreshCw size={16} />
//           </button>
//         </div>
//       </div>

//       {/* ---------- Content ---------- */}
//       {loading ? (
//         <p className="text-center text-gray-600">Loading…</p>
//       ) : shown.length === 0 ? (
//         <p className="text-center text-gray-600">No requests found.</p>
//       ) : view === 'cards' ? (
//         /* -------- Card View -------- */
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {shown.map((r) => (
//       <div key={r.id} className="bg-white shadow rounded-lg p-4">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="font-bold text-black">{r.campaignTitle || 'No Title'}</h3>
//           <span className={badge}>{statusText[r.status]}</span>
//         </div>

//         {/* اسم المستخدم والبريد */}
//         <p className="text-gray-800 font-semibold mb-1">
//           User: {r.User?.name || '-'}
//         </p>
//         <p className="text-gray-600 text-sm mb-3">
//           Email: {r.User?.email || '-'}
//         </p>

//         {/* باقي التفاصيل */}
//         <p className="text-gray-600 text-sm mb-2">
//           Content Type: <span className="font-medium text-gray-800">{r.contentType || '-'}</span>
//         </p>
//         <p className="text-gray-600 text-sm mb-2">
//           Platform: <span className="font-medium text-gray-800">{r.platform || '-'}</span>
//         </p>
//         <p className="text-gray-600 text-sm mb-4 line-clamp-2">{r.brief}</p>
//         {/* <p className="text-gray-800 text-sm mb-1">Budget: ${r.proposedPrice}</p> */}
//         <p className="text-gray-600 text-sm mb-4">
//           Requested: {new Date(r.requestedDate).toLocaleString()}
//         </p>

//         {r.status === 'pending' && (
//           <div className="flex gap-2 mb-3">
//             <button
//               onClick={() => setSelected(r)}
//               className={`${purpleBtn} flex-1 flex items-center justify-center`}
//             >
//               <UploadCloud size={16} className="mr-1" /> Publish
//             </button>
//             <button
//               onClick={() => setSelected(r)}
//               className={`${outlineBtn} flex-1 flex items-center justify-center`}
//             >
//               <Ban size={16} className="mr-1" /> Cancel
//             </button>
//           </div>
//         )}

//         <button
//           onClick={() => setSelected(r)}
//           className="w-full py-2 bg-purple-50 text-purple-700 rounded flex items-center justify-center"
//         >
//           <Eye size={16} className="mr-1" /> View
//         </button>
//       </div>
//     ))}
//   </div>
//       ) : (
    
//     <div className="overflow-x-auto bg-white shadow rounded-lg">
//     <table className="min-w-full table-fixed">
//       <thead className="bg-gray-100">
//         <tr className="text-left  w-[12.5%]">
//           <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">User Name</th>
//           {/* <th className="px-6 py-3 text-gray-600 font-medium">Email</th> */}
//           <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Campaign Title</th>
//           <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">brief</th>
//               <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">requestedDate</th>
//           <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Content Type</th>
//           <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Platform</th>
//           <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Status</th>
//           <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {shown.map((r) => (
//           <tr key={r.id} className="hover:bg-gray-50">
//             <td className="px-6 py-3 w-[12.5%]">{r.User?.name || '-'}<br></br>
//        <div className="text-sm text-gray-500">  {r.User?.email || '-'}</div></td>
//             <td className="px-6 text-sm py-3 w-[12.5%]">{r.campaignTitle || '-'}</td>
//              <td className="px-6 text-sm py-3 w-[12.5%]">{r.brief || '-'}</td>
//               <td className="px-6 text-sm py-3 w-[12.5%]">{new Date(r.requestedDate).toLocaleString() || '-'}</td>
//             <td className="px-6 py-3 w-[12.5%]">{r.contentType || '-'}</td>
//             <td className="px-6 py-3">{r.platform || '-'}</td>
//             <td className="px-6 py-3">
//               <span className={badge}>{statusText[r.status]}</span>
//             </td>
//             <td className="px-6 py-3 space-x-2">
//               {r.status === 'pending' ? (
//                 <>
//                   <button onClick={() => setSelected(r)} className={purpleBtn}>Publish</button>
//                   <button onClick={() => setSelected(r)} className={outlineBtn}>Cancel</button>
//                 </>
//              ) : (
//               <button onClick={() => setSelected(r)} className="text-purple-600 underline">
//                 View
//               </button>
//             )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}

//       {/* ---------- Modal ---------- */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-96 p-6 rounded-lg relative shadow">
//             <button
//               onClick={close}
//               className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//             >
//               ×
//             </button>

//             <h4 className="font-bold text-lg mb-4">{selected.campaignTitle}</h4>
//             <p className="text-gray-600 text-sm mb-4">{selected.brief}</p>

//             {selected.status === 'pending' && (
//               <>
//                 <label className="block text-sm font-medium mb-1">Post URL</label>
//                 <input
//                   type="url"
//                   placeholder="https://…"
//                   value={postUrl}
//                   onChange={(e) => setPostUrl(e.target.value)}
//                   className="w-full px-3 py-2 border rounded mb-4"
//                 />

//                 <button
//                   disabled={!postUrl.trim()}
//                   onClick={() => act('publish', postUrl)}
//                   className={`${purpleBtn} w-full mb-2 disabled:opacity-50`}
//                 >
//                   Publish
//                 </button>

//                 <button
//                   onClick={() => act('cancel')}
//                   className={`${outlineBtn} w-full mb-2`}
//                 >
//                   Cancel Booking
//                 </button>
//               </>
//             )}

//             {err && <p className="text-red-600 text-sm mb-2">{err}</p>}

//             <button
//               onClick={close}
//               className="w-full py-2 bg-gray-100 text-gray-700 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdRequests;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadCloud, Ban, Eye, RefreshCw } from 'lucide-react';
import { useSelector } from 'react-redux';

const ITEMS_PER_PAGE = 5;

const AdRequests = () => {
  const influencer = useSelector((s) => s.user.currentUser);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('cards');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [postUrl, setPostUrl] = useState('');
  const [err, setErr] = useState('');
  const [page, setPage] = useState(1);

  const fetchAll = async () => {
    if (!influencer) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:4000/api/users/influencer/${influencer.id}`);
      setRequests(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [influencer]);

  const act = async (action, url = '') => {
    if (!selected) return;
    try {
      await axios.put(`http://localhost:4000/api/users/status/${selected.id}`, {
        action,
        ...(action === 'publish' && { postUrl: url.trim() }),
      });
      close();
      fetchAll();
    } catch (e) {
      setErr(e?.response?.data?.message || 'Unexpected error');
    }
  };

  const close = () => {
    setSelected(null);
    setPostUrl('');
    setErr('');
  };

  // فلترة الطلبات
  const filtered = requests.filter((r) => filter === 'all' || r.status === filter);

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  // تحديد الطلبات المعروضة حسب الصفحة
  const shown = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // تغيير الصفحة مع التحقق
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const purpleBtn = 'px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700';
  const outlineBtn = 'px-3 py-1 bg-white text-purple-600 border border-purple-600 rounded hover:bg-purple-50';
  const badge = 'px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700';
  const statusText = { pending: 'Pending', published: 'Published', cancelled: 'Cancelled' };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Ad Requests</h1>
          <p className="text-gray-500">Manage incoming advertisement requests</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-3 items-center mb-6">
        {['all', 'pending', 'published', 'cancelled'].map((v) => (
          <button
            key={v}
            onClick={() => {
              setFilter(v);
              setPage(1); // اعادة الصفحة للصفحة الأولى عند تغيير الفلتر
            }}
            className={`px-4 py-1 rounded-full border ${
              filter === v ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setView('cards')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              view === 'cards' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Card View
          </button>
          <button
            onClick={() => setView('table')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              view === 'table' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Table View
          </button>
          <button onClick={fetchAll} className="p-2 rounded bg-purple-100 text-purple-700">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* المحتوى */}
      {loading ? (
        <p className="text-center text-gray-600">Loading…</p>
      ) : shown.length === 0 ? (
        <p className="text-center text-gray-600">No requests found.</p>
      ) : view === 'cards' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((r) => (
            <div key={r.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-black">{r.campaignTitle || 'No Title'}</h3>
                <span className={badge}>{statusText[r.status]}</span>
              </div>

              <p className="text-gray-800 font-semibold mb-1">User: {r.User?.name || '-'}</p>
              <p className="text-gray-600 text-sm mb-3">Email: {r.User?.email || '-'}</p>

              <p className="text-gray-600 text-sm mb-2">
                Content Type: <span className="font-medium text-gray-800">{r.contentType || '-'}</span>
              </p>
              <p className="text-gray-600 text-sm mb-2">
                Platform: <span className="font-medium text-gray-800">{r.platform || '-'}</span>
              </p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{r.brief}</p>

              <p className="text-gray-600 text-sm mb-4">Requested: {new Date(r.requestedDate).toLocaleString()}</p>

              {r.status === 'pending' && (
                <div className="flex gap-2 mb-3">
                  <button onClick={() => setSelected(r)} className={`${purpleBtn} flex-1 flex items-center justify-center`}>
                    <UploadCloud size={16} className="mr-1" /> Publish
                  </button>
                  <button onClick={() => setSelected(r)} className={`${outlineBtn} flex-1 flex items-center justify-center`}>
                    <Ban size={16} className="mr-1" /> Cancel
                  </button>
                </div>
              )}

              <button
                onClick={() => setSelected(r)}
                className="w-full py-2 bg-purple-50 text-purple-700 rounded flex items-center justify-center"
              >
                <Eye size={16} className="mr-1" /> View
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-100">
              <tr className="text-left w-[12.5%]">
                <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">User Name</th>
                <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Campaign Title</th>
                <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Brief</th>
                <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Requested Date</th>
                <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Content Type</th>
                <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Platform</th>
                <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Status</th>
                <th className="w-[12.5%] px-6 py-3 text-gray-500 font-medium text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 w-[12.5%]">
                    {r.User?.name || '-'}
                    <br />
                    <div className="text-sm text-gray-500">{r.User?.email || '-'}</div>
                  </td>
                  <td className="px-6 text-sm py-3 w-[12.5%]">{r.campaignTitle || '-'}</td>
                  <td className="px-6 text-sm py-3 w-[12.5%]">{r.brief || '-'}</td>
                  <td className="px-6 text-sm py-3 w-[12.5%]">{new Date(r.requestedDate).toLocaleString() || '-'}</td>
                  <td className="px-6 py-3 w-[12.5%]">{r.contentType || '-'}</td>
                  <td className="px-6 py-3">{r.platform || '-'}</td>
                  <td className="px-6 py-3">
                    <span className={badge}>{statusText[r.status]}</span>
                  </td>
                  <td className="px-6 py-3 space-x-2">
                    {r.status === 'pending' ? (
                      <>
                        <button onClick={() => setSelected(r)} className={purpleBtn}>
                          Publish
                        </button>
                        <button onClick={() => setSelected(r)} className={outlineBtn}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button onClick={() => setSelected(r)} className="text-purple-600 underline">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-3">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
          >
            Previous
          </button>
          <span>
            Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg relative shadow">
            <button
              onClick={close}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>

            <h4 className="font-bold text-lg mb-4">{selected.campaignTitle}</h4>
            <p className="text-gray-600 text-sm mb-4">{selected.brief}</p>

            {selected.status === 'pending' && (
              <>
                <label className="block text-sm font-medium mb-1">Post URL</label>
                <input
                  type="url"
                  placeholder="https://…"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-4"
                />

                <button
                  disabled={!postUrl.trim()}
                  onClick={() => act('publish', postUrl)}
                  className={`${purpleBtn} w-full mb-2 disabled:opacity-50`}
                >
                  Publish
                </button>

                <button
                  onClick={() => act('cancel')}
                  className={`${outlineBtn} w-full mb-2`}
                >
                  Cancel Booking
                </button>
              </>
            )}

            {err && <p className="text-red-600 text-sm mb-2">{err}</p>}

            <button
              onClick={close}
              className="w-full py-2 bg-gray-100 text-gray-700 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdRequests;
