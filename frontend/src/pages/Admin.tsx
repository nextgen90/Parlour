import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Calendar, Users, TrendingUp, Sparkles, Lock } from 'lucide-react';

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceCategory: string;
  appointmentDate: string;
  notes: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'apple' && password === 'apple@123') {
      setIsAuthenticated(true);
      setLoginError(false);
      fetchAppointments();
    } else {
      setLoginError(true);
    }
  };

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/appointments`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: status as any } : app));
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-deep)] px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-bg-card)] border border-white/10 p-8 rounded-xl w-full max-w-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-tertiary)]/10 rounded-full blur-3xl"></div>
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-black/50 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-[var(--color-tertiary)]" size={24} />
            </div>
            <h2 className="text-2xl font-headline font-bold text-white uppercase tracking-wider">Admin Portal</h2>
            <p className="text-gray-400 text-sm mt-2">Secure access required</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Admin ID</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[var(--color-tertiary)] transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[var(--color-tertiary)] transition-colors text-sm"
              />
            </div>
            {loginError && <p className="text-red-400 text-xs text-center">Invalid credentials</p>}
            <button 
              type="submit" 
              className="w-full py-3 bg-[var(--color-tertiary)] text-black rounded text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const totalBookings = appointments.length;
  const pendingBookings = appointments.filter(a => a.status === 'PENDING').length;
  const confirmedBookings = appointments.filter(a => a.status === 'CONFIRMED').length;

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="uppercase tracking-[0.2em] text-xs font-semibold text-[var(--color-tertiary)] flex items-center gap-2 mb-2">
              <Sparkles size={14} /> Executive View
            </span>
            <h1 className="text-4xl font-headline font-bold text-white">Analytics Dashboard</h1>
          </div>
          <button 
            onClick={fetchAppointments}
            className="mt-4 md:mt-0 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs uppercase tracking-widest transition-colors"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[var(--color-bg-card)] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-[var(--color-tertiary)]/5 rounded-full blur-2xl group-hover:bg-[var(--color-tertiary)]/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Bookings</p>
                <h3 className="text-4xl font-headline font-bold text-white">{totalBookings}</h3>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-[var(--color-tertiary)]"><Calendar size={20} /></div>
            </div>
          </div>
          
          <div className="bg-[var(--color-bg-card)] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Pending Requests</p>
                <h3 className="text-4xl font-headline font-bold text-yellow-400">{pendingBookings}</h3>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-yellow-400"><Users size={20} /></div>
            </div>
          </div>

          <div className="bg-[var(--color-bg-card)] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Confirmed Slots</p>
                <h3 className="text-4xl font-headline font-bold text-green-400">{confirmedBookings}</h3>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-green-400"><TrendingUp size={20} /></div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-[var(--color-bg-card)] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-black/20">
            <h2 className="text-xl font-headline font-semibold text-white">Recent Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-xs text-gray-400 uppercase tracking-wider bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-semibold">Client Info</th>
                  <th className="px-6 py-4 font-semibold">Service</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold">Special Request</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{app.clientName}</div>
                      <div className="text-xs text-gray-500 mt-1">{app.clientPhone}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[var(--color-secondary)]">
                      {app.serviceCategory}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(app.appointmentDate).toLocaleString('en-US', {
                        weekday: 'short', month: 'short', day: 'numeric',
                        hour: 'numeric', minute: '2-digit', hour12: true
                      })}
                    </td>
                    <td className="px-6 py-4 text-xs italic text-gray-400 max-w-xs truncate">
                      {app.notes || 'None'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        app.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {app.status === 'PENDING' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => updateStatus(app.id, 'CONFIRMED')}
                            className="p-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded transition border border-green-500/30"
                            title="Confirm"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            onClick={() => updateStatus(app.id, 'CANCELLED')}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition border border-red-500/30"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                         <span className="text-xs text-gray-600">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                      No appointments found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
