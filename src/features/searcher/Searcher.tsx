import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import debounce from "lodash.debounce"
import {loggedAsync, selectSearch, userAsync} from "./searcherSlice";
import {logged} from "./searcherSlice";
import GithubLogo from "../../gh.svg";
import styles from './Searcher.module.css';
import Repos from "./Repos";
import Users from "./Users";

export function Searcher() {
  const searcher = useSelector(selectSearch);
  const dispatch = useDispatch();
  const { search, dropdown, repo, user } = searcher;
  const [localSearch, setSearch] = useState(search);
  const [localDropdown, setDropdown] = useState(dropdown);
  const [localRepo, setRepo] = useState(repo);
  const [localUser, setUser] = useState(user);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRepos = React.useCallback(
    debounce((localSearch: string) => {
      dispatch(loggedAsync(localSearch))
    }, 500),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceUsers= React.useCallback(
    debounce((localSearch: string) => {
      dispatch(userAsync(localSearch))
    }, 500),
    []
  );

  React.useEffect(() => {
    const newVal = {search: localSearch.toString(), dropdown: localDropdown.toString(), repo: localRepo, user: localUser}
    dispatch(logged(newVal))
    if (localDropdown === 'repos' && localSearch.length > 3) {
      debounceRepos(localSearch)
      // @ts-ignore
      setRepo('')
    }
    if (localDropdown === 'user'  && localSearch.length > 3) {
      debounceUsers(localSearch)
      // @ts-ignore
      setUser('')
    }

  },[dispatch, localSearch, localDropdown, debounceRepos, debounceUsers, localRepo, localUser])

  // @ts-ignore
  return (
    <div>
      <div className={styles.searcher}>
        <div className={styles.headbox}>
          <div className={styles.imgDiv}>
            <img src={GithubLogo} className={styles.GithubImg} alt="github logo" />
          </div>
          <div className={styles.content}>
            <h3 className={styles.m0}>
              Github Searcher
            </h3>
            <h5 className={`${styles.m0} ${styles.opacity50}`}>Search users or repositories below</h5>
          </div>
        </div>
        <div className={styles.inputs}>
          <input
            className={styles.search}
            placeholder={'Start typing to search'}
            aria-label="Search"
            value={localSearch}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={dropdown} onChange={(e) => e.target.value === 'repos' ? setDropdown('repos') : setDropdown('user')}>
            <option value='repos'>Repos</option>
            <option value='user'>User</option>
          </select>
        </div>

      </div>

        {localDropdown === 'repos' && localSearch.length > 3 &&
        // @ts-ignore
          <Repos items={repo.items} />
        }

      {localDropdown === 'user' && localSearch.length > 3 &&
      // @ts-ignore
	    <Users items={user.items} />
      }
    </div>
  )

}
