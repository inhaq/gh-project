import React from 'react';
import styles from "./Searcher.module.css";

const Users = (props: { items: any[]; }) => {
  console.log(props);
  if (props.items?.length === 0) {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>No user exist</div>
    )
  }

  return (
    <div className={styles.repos}>
      {
        // @ts-ignore
        props.items?.map((item) => {
          console.log(item);
          return (
            <div key={item.id} className={styles.repo}>

              <h4 className={styles.userName}>
                <span className={styles.name}>
                  {item.login?.toUpperCase()}
                </span>

                <img className={styles.profileImg} src={item.avatar_url} alt="profile pic"/>
              </h4>
              <div className={styles.userLink}>
                <a href={item.html_url} target='_blank' rel="noopener noreferrer" >Visit {item.login} profile</a>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default Users;
