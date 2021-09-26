import React, { useState } from 'react';

const RepoList: React.FC = () => {
  const [term, setTerm] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <form>
        <input value={term} onChange={handleChange} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default RepoList;