
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
Modal.setAppElement('#root');

const SchedulePage = () => {
  const { currentUser: user } = useSelector((state) => state.user);
  
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  /* 🔸 حالة التاريخ ونوع العرض */
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);
  
  /* ------------------- جلب البيانات ------------------- */
  const fetchCalendarBookings = async () => {
    if (!user?.id) return;
    try {
      const token = Cookies.get('token');
      const start = moment(currentDate).startOf('month').subtract(1, 'month').format('YYYY-MM-DD');
      const end   = moment(currentDate).endOf('month').add(1, 'month').format('YYYY-MM-DD');
      
      // Using fetch instead of axios
      const response = await fetch(
        `http://localhost:4000/api/users/influencers/${user.id}/calendar?start=${start}&end=${end}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const eventsArray = await response.json();
      console.log(eventsArray);
      
      const parsed = eventsArray.map(evt => ({
        ...evt,
        start: new Date(evt.start),
        end:   new Date(evt.end),
        allDay: true,
      }));
      
      setEvents(parsed);
    } catch (err) {
      console.error('Failed to load calendar bookings:', err);
    }
  };
  
  /* كلما تغيّر التاريخ (بعد navigate) أعد التحميل */
  useEffect(() => { fetchCalendarBookings(); }, [user?.id, currentDate]);
  
  /* ----------------- Handlers ----------------- */
  const handleNavigate = (date) => setCurrentDate(date);
  const handleView     = (view) => setCurrentView(view);
  const handleSelect   = (event) => setSelectedEvent(event);
  const closeModal     = () => setSelectedEvent(null);
  
  /* --------------------- JSX --------------------- */
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
       <h1 className="text-xl md:text-2xl font-bold text-gray-800">Booking Calendar</h1>
<p className="text-gray-500">View and manage your scheduled bookings and appointments easily</p>
</div>
          <div className="flex space-x-2">
            <button 
              onClick={() => fetchCalendarBookings()}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg shadow hover:from-purple-700 hover:to-pink-600 transition-all flex items-center"
            >
              <span className="mr-1">↻</span>
              Refresh
            </button>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
          <div className="p-1">
            <Calendar
              localizer={localizer}
              events={events}
              view={currentView}
              date={currentDate}
              onNavigate={handleNavigate}
              onView={handleView}
              onSelectEvent={handleSelect}
              style={{ height: 600 }}
              className="custom-calendar"
              eventPropGetter={(event) => {
                let backgroundColor = '#6F42C1';
                
                if (event.status === 'confirmed') {
                  backgroundColor = '#10B981'; // green
                } else if (event.status === 'pending') {
                  backgroundColor = '#F59E0B'; // amber
                } else if (event.status === 'cancelled') {
                  backgroundColor = '#EF4444'; // red
                }
                
                return {
                  style: {
                    backgroundColor,
                    borderRadius: '4px',
                    border: 'none',
                    opacity: 0.9,
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }
              }}
              dayPropGetter={(date) => {
                if (moment(date).isSame(moment(), 'day')) {
                  return {
                    style: {
                      backgroundColor: 'rgba(111, 66, 193, 0.08)',
                      borderRadius: '4px'
                    }
                  }
                }
                return {};
              }}
            />
          </div>
        </div>
        
        {/* Footer Info */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow border border-purple-100">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Color Guide</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-700">Confirmed</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-gray-700">Pending</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span className="text-gray-700">Cancelled</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-purple-600 mr-2"></div>
              <span className="text-gray-700">Default</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal لعرض التفاصيل */}
        <Modal
        isOpen={!!selectedEvent}
        onRequestClose={closeModal}
        className="bg-white p-0 rounded-xl shadow-xl max-w-md w-full mx-auto mt-24 outline-none overflow-hidden"
         overlayClassName="fixed inset-0 flex items-center justify-center"
  style={{ overlay: { zIndex: 1000, backgroundColor: 'transparent' } }}

         >
        {selectedEvent && (
          <>
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
              <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
              <p className="opacity-80 text-sm">
                {moment(selectedEvent.start).format('dddd, MMMM D, YYYY')}
              </p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between mb-2 pb-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    selectedEvent.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    selectedEvent.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    selectedEvent.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {selectedEvent.status}
                  </span>
                </div>
                <div className="flex justify-between mb-2 pb-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">Date:</span>
                  <span className="text-gray-800">{moment(selectedEvent.start).format('YYYY-MM-DD')}</span>
                </div>
                <div className="flex justify-between mb-2 pb-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">Title:</span>
                  <span className="text-gray-800">{selectedEvent.title || 'Unspecified'}</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SchedulePage;