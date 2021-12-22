import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.warn('Cannot send empty request', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="search" value={query} onChange={handleInputChange}></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
}
