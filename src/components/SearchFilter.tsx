import React, { useState } from 'react';

interface SearchFilterProps {
  onSearch: (query: string, sources: string, category: string, date: string) => void;
}

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [query, setQuery] = useState('');
  const [sources, setSources] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const sourceOptions = [
    { value: '', label: 'All Sources' },
    { value: 'newsapi', label: 'News API' },
    { value: 'guardian', label: 'The Guardian' },
    { value: 'nytimes', label: 'New York Times' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, sources, category, date);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="p-2 border rounded-md w-full"
        />

        <select
          value={sources}
          onChange={(e) => setSources(e.target.value)}
          className="p-2 border rounded-md w-full bg-[#242424] text-white"
        >
          {sourceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="p-2 border rounded-md w-full"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchFilter;
