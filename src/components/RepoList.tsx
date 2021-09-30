import React, { useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { fetchRepo, RootState } from '../state/repoList';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const RepoList: React.FC = (props) => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const repoList = useTypedSelector((state) => state);
  console.log(repoList);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchRepo(term));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={term} onChange={handleChange} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default RepoList;