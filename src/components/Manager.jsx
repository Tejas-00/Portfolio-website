import React, { useEffect, useState } from 'react';
import copyIcon from '../assets/copy.svg';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';

const Manager = () => {
  const [status, setStatus] = useState(false);
  const [pwType, setPwType] = useState(false);

  const [form, setForm] = useState({ site: '', username: '', password: '' });
  const [credentialArray, setCredentialArray] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('credentials');
    if (saved) {
      setCredentialArray(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    setStatus(!status);
    setPwType(!pwType);
  };

  const saveCredential = () => {
    const { site, username, password } = form;
    if (!site.trim() || !username.trim() || !password.trim()) return;

    const newArray = [...credentialArray, form];
    setCredentialArray(newArray);
    localStorage.setItem('credentials', JSON.stringify(newArray));
    setForm({ site: '', username: '', password: '' });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deleteCredential = (id) => {
    const newArray = credentialArray.filter((_, index) => index !== id);
    setCredentialArray(newArray);
    localStorage.setItem('credentials', JSON.stringify(newArray));
  };

  const editCredential = (id) => {
    const item = credentialArray[id];
    setForm(item);
    deleteCredential(id);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center pb-20 px-4">
      {/* Background pattern */}
      <div className="absolute top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Title */}
      <div className="mt-10 text-center">
        <span className="text-2xl font-bold text-white">Don't ever remember your passwords</span>
        <div className="text-lg text-slate-200 mt-2">just PassHub it...</div>
      </div>

      {/* Form */}
      <div className="w-full sm:w-3/4 lg:w-1/2 flex flex-col gap-6 mt-10">
        <input
          value={form.site}
          onChange={handleChange}
          name="site"
          placeholder="Website URL"
          className="text-white w-full border-2 border-white rounded-md p-3 bg-transparent"
          type="text"
        />
        <div className="relative flex flex-col sm:flex-row gap-4">
          <input
            value={form.username}
            onChange={handleChange}
            name="username"
            placeholder="Username"
            className="text-white w-full sm:w-1/2 border-2 border-white rounded-md p-3 bg-transparent"
            type="text"
          />
          <input
            value={form.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
            className="text-white w-full sm:w-1/2 border-2 border-white rounded-md p-3 bg-transparent"
            type={pwType ? 'text' : 'password'}
          />
          <span
            className="absolute right-3 top-20 sm:right-3 sm:top-3 text-slate-300 hover:text-white cursor-pointer"
            onClick={showPassword}
          >
            <h5>{status ? 'hide' : 'show'}</h5>
          </span>
        </div>
        <button
          onClick={saveCredential}
          className="self-start text-white border-2 border-green-400 rounded-lg px-4 py-2 hover:border-white transition"
        >
          Save credentials
        </button>
      </div>

      {/* Table */}
      <div className="w-full mt-10 overflow-x-auto">
        {credentialArray.length === 0 ? (
          <div className="text-white text-center">Save your first password</div>
        ) : (
          <table className="min-w-full text-white border-collapse">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 text-left">Site</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Password</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {credentialArray.map((item, index) => {
                if (!item.site && !item.username && !item.password) return null;

                return (
                  <tr key={index} className="border-b border-gray-600">
                    <td className="p-3 relative">
                      <a href={item.site} target="_blank" rel="noopener noreferrer">
                        {item.site}
                      </a>
                      <button
                        className="absolute right-2 top-3 w-4"
                        onClick={() => copyText(item.site)}
                      >
                        <img src={copyIcon} alt="copy" />
                      </button>
                    </td>
                    <td className="p-3 relative">
                      {item.username}
                      <button
                        className="absolute right-2 top-3 w-4"
                        onClick={() => copyText(item.username)}
                      >
                        <img src={copyIcon} alt="copy" />
                      </button>
                    </td>
                    <td className="p-3 relative">
                      {item.password}
                      <button
                        className="absolute right-2 top-3 w-4"
                        onClick={() => copyText(item.password)}
                      >
                        <img src={copyIcon} alt="copy" />
                      </button>
                    </td>
                    <td className="p-3 text-center flex justify-center gap-4">
                      <button onClick={() => editCredential(index)}>
                        <img className="w-5" src={editIcon} alt="edit" />
                      </button>
                      <button onClick={() => deleteCredential(index)}>
                        <img className="w-5" src={deleteIcon} alt="delete" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
