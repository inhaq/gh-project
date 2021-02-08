import React from 'react';
import styles from "./Searcher.module.css";

const Repos = (props: { items: any[]; }) => {
  if (props.items?.length === 0) {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>No repos found</div>
    )
  }
  return (
      <div className={styles.repos}>
        {
          // @ts-ignore
          props.items?.map((item) => {
            return (
              <div key={item.id} className={styles.repo}>

                <h4 className={styles.repoName}>
                  {item.name.toUpperCase()}
                  <span> 🌟 {item.stargazers_count}</span>
                  <span> 🍽 {item.forks_count}</span>
                </h4>
                <div>
                  <span>📝 </span>
                  {item.description}
                </div>
                <div className={styles.owner}>
                  <span> ✍️ </span>
                  {item.owner.login}
                </div>
                <div className={styles.repoLinks}>
                  <a href={item.owner.html_url} target='_blank' rel="noopener noreferrer" >Visit {item.owner.login} profile</a>
                  <a href={item.html_url} target='_blank' rel="noopener noreferrer" >See Repo</a>
                </div>
              </div>
            )
          })
        }
      </div>
  );
};

export default Repos;
