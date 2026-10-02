import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaReply,
  FaTrash,
  FaEye,
  FaCommentDots,
} from 'react-icons/fa';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const url = statusFilter ? `/contact?status=${statusFilter}` : '/contact';
      const { data } = await API.get(url);
      setContacts(data || []);
    } catch (err) {
      toast.error('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [statusFilter]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { data } = await API.patch(`/contact/${id}/status`, { status: newStatus });
      toast.success(`Message status updated to ${newStatus}`);
      setContacts(contacts.map((c) => (c._id === id ? data : c)));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(data);
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this contact message?')) {
      return;
    }
    try {
      await API.delete(`/contact/${id}`);
      toast.success('Contact message deleted');
      setContacts(contacts.filter((c) => c._id !== id));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      toast.error('Failed to delete contact message');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Contact Messages & Inquiries</h1>
          <p className="text-xs text-slate-500">
            View messages submitted via Contact Us form and reply or update inquiry status
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-xl border border-slate-200 text-sm bg-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Statuses</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading contact messages...</div>
        ) : contacts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <FaCommentDots className="text-4xl text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-600">No contact messages found</p>
            <p className="text-xs text-slate-400">Messages sent via Contact Us page will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Sender</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Message Snippet</th>
                  <th className="py-3.5 px-4">Received Date</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contacts.map((item) => (
                  <tr
                    key={item._id}
                    className={`transition-colors ${
                      item.status === 'unread' ? 'bg-amber-50/40 font-medium' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Sender Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs shrink-0">
                          <FaUser />
                        </div>
                        <div>
                          <p className="font-bold text-navy-900">{item.name}</p>
                          {item.status === 'unread' && (
                            <span className="text-[10px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email & Phone */}
                    <td className="py-3.5 px-4 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <FaEnvelope className="text-amber-500 shrink-0" />
                        <a href={`mailto:${item.email}`} className="hover:underline">
                          {item.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <FaPhone className="text-emerald-500 shrink-0" />
                        <a href={`tel:${item.phone}`} className="hover:underline font-mono">
                          {item.phone}
                        </a>
                      </div>
                    </td>

                    {/* Message Snippet */}
                    <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs">
                      <p className="line-clamp-2 italic">&ldquo;{item.message}&rdquo;</p>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <FaClock className="text-slate-400 shrink-0" />
                        {new Date(item.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 text-[11px] font-bold uppercase rounded-full ${
                          item.status === 'replied'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : item.status === 'read'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedMessage(item);
                            if (item.status === 'unread') {
                              handleUpdateStatus(item._id, 'read');
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1"
                          title="View Message Details"
                        >
                          <FaEye /> View
                        </button>

                        {item.status !== 'replied' && (
                          <button
                            onClick={() => handleUpdateStatus(item._id, 'replied')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                            title="Mark as Replied"
                          >
                            <FaReply /> Replied
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                          title="Delete Message"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MESSAGE DETAILS MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs"
            onClick={() => setSelectedMessage(null)}
          />
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                <FaEnvelope className="text-primary-600" /> Contact Inquiry Details
              </h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-400 hover:text-navy-900 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <p className="text-sm font-bold text-navy-900">{selectedMessage.name}</p>
                <div className="flex flex-wrap gap-4 text-slate-600">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary-600 font-semibold hover:underline">
                      {selectedMessage.email}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a href={`tel:${selectedMessage.phone}`} className="text-emerald-600 font-semibold hover:underline font-mono">
                      {selectedMessage.phone}
                    </a>
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Received on:{' '}
                  {new Date(selectedMessage.createdAt).toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Message Content</h5>
                <div className="text-sm bg-primary-50/70 text-navy-900 p-4 rounded-2xl border border-primary-100 leading-relaxed font-medium whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Reply to your inquiry on English Medium Tutor`}
                  onClick={() => handleUpdateStatus(selectedMessage._id, 'replied')}
                  className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <FaEnvelope /> Send Email Reply
                </a>
                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <FaPhone /> Call Phone
                </a>
              </div>

              <div className="flex items-center gap-2">
                {selectedMessage.status !== 'replied' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage._id, 'replied')}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Mark Replied
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="px-3 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
