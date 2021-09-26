import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRepo, searchRepoSuccess, searchRepoError } from '../state/repoList';
import axios from 'axios';

const RepoList: React.FC = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  console.log(state);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchRepos(term);
  };

  const searchRepos = (term: string) => {
    return async () => {
      dispatch({
        type: searchRepo
      });

      try {
        const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
          params: {
            text: term
          }
        });
      
        const names = data.objects.map((result: any) => {
          return result.package.name;
        });

        dispatch({
          type: searchRepoSuccess,
          payload: names
        });
      } catch (err: any) {
        dispatch({
          type: searchRepoError,
          payload: err.message
        });
      }
    };
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