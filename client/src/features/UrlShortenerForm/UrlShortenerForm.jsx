import React from 'react';



import { useState } from 'react';
import { useLinks } from '../../hooks/useLinks';
import { toast } from 'react-hot-toast';

const UrlShortenerForm = () => {
  const { shortenLink } = useLinks();
  const [form, setForm] = useState({
    longUrl: '',
    customAlias: '',
    expiresAt: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.longUrl) return toast.error('Please enter a URL');
    
    try {
      await shortenLink(form);
      toast.success('Link created successfully!');
      setForm({ longUrl: '', customAlias: '', expiresAt: '' });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-purple-700 mb-1">
          Destination URL
        </label>
        <input
          type="url"
          name="longUrl"
          value={form.longUrl}
          onChange={(e) => setForm({ ...form, longUrl: e.target.value })}
          placeholder="https://example.com/very-long-url"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Custom Alias (optional)
          </label>
          <input
            type="text"
            name="customAlias"
            value={form.customAlias}
            onChange={(e) => setForm({ ...form, customAlias: e.target.value })}
            placeholder="my-custom-link"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Expiration Date (optional)
          </label>
          <input
            type="datetime-local"
            name="expiresAt"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary w-full">
        Shorten URL
      </button>
    </form>
  );
};

export default UrlShortenerForm;