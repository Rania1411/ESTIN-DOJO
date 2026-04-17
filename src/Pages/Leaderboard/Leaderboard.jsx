import Header from '../../Components/Header/Header.jsx';
import styles from './Leaderboard.module.css';
import pic from '../../assets/pro.jpg';
import { useState, useEffect } from "react";

function Leaderboard() {
  const [selected, setSelected] = useState("All years");
  const options = ["All years", "1CP", "2CP", "1CS", "2CS", "3CS"];

  const defaultUsers = [
    { id: 1, name: "Sarah L.", hours: 42, avatar: pic, year: "1CP" },
    { id: 2, name: "Alex T.", hours: 48, avatar: pic, year: "2CP" },
    { id: 3, name: "David M.", hours: 38, avatar: pic, year: "1CS" },
    { id: 4, name: "Emma W.", hours: 35, avatar: pic, year: "2CS" },
    { id: 5, name: "Marcus J.", hours: 31, avatar: pic, year: "3CS" },
    { id: 6, name: "Rania", hours: 30, avatar: pic, year: "1CP" },
  ];

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    try {
      return saved ? JSON.parse(saved) : defaultUsers;
    } catch {
      return defaultUsers;
    }
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);


  const filteredUsers =
    selected === "All years"
      ? users
      : users.filter(u => u.year === selected);

  const sortedUsers = [...filteredUsers].sort((a, b) => b.hours - a.hours);

  const top3 = sortedUsers.slice(0, 3);
  const others = sortedUsers.slice(3);
  const podium = [
    top3[1] || null,
    top3[0] || null,
    top3[2] || null
  ];

  const medalClass = [styles.medal2, styles.medal1, styles.medal3];
  const medalLabel = ["2", "1", "3"];

  return (
    <>
      <Header />
      <div className={styles.LeaderboardContainer}>
        <div className={styles.card}>

        
          <div className={styles.LeaderboardHead}>
            <div>
              <h2>Study Leaderboard</h2>
              <p>Ranked by total focus time</p>
            </div>

            <select
              className={styles.select}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {options.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className={styles.divider} />
          <div className={styles.top3}>
            {podium.map((user, i) =>
              user && (
                <div
                  key={user.id}
                  className={`${styles.user} ${i === 1 ? styles.first : ""}`}
                >
                  <div className={styles.avatarWrap}>
                    <img
                      src={user.avatar}
                      className={styles.avatar}
                      alt={user.name}
                    />
                    <span className={`${styles.medal} ${medalClass[i]}`}>
                      {medalLabel[i]}
                    </span>
                  </div>
                  <p>{user.name}</p>
                  <span>{user.hours}h</span>
                </div>
              )
            )}
          </div>

          <div className={styles.list}>
            {others.map((user, index) => (
              <div key={user.id} className={styles.row}>
                <span className={styles.rowRank}>{index + 4}</span>
                <p className={styles.rowName}>{user.name}</p>
                <span className={styles.rowHours}>{user.hours}h</span>
              </div>
            ))}
          </div>

        </div>
      </div>
     
    </>
  );
}

export default Leaderboard;


