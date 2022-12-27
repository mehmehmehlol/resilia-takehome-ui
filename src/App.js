import React, { useEffect, useState } from 'react';
import './styles/styles.css'
import axios from 'axios';
import NotificationBody from './components/NotificationBody';

function App() {
  const [list, setList] = useState([]);
  const [unreadLength, setUnreadLength] = useState(0);

  const baseUrl = "http://localhost:3000"
  useEffect(() => {
    const fetchList = async() => {
      const res = await fetch(`${baseUrl}/notifications`)
      const resData = await res.json();
      setList(resData);
    }
    fetchList();

    const unreadStatus = () => {
      let unread = list.filter(l => l.to_read === false);
      console.log(list);
      console.log(unread);
      setUnreadLength(unread.length);
    }
    unreadStatus();
  }, [])

  const markReadStatus = (id, status) => {
    axios.patch(`${baseUrl}/notifications/${id}`, {
      to_read: !status
    })
    .then(res => console.log(res))
    .catch(error => console.log(error));

    if (status) {
      setUnreadLength(unreadLength + 1)
    } else {
      setUnreadLength(unreadLength - 1)
    }
    setList(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === id) {
          return {
            ...obj,
            to_read: !status
          }
        }
        return obj;
      })
      return newState;
    })
  }

  return (
    <div className="App">
      <div className="header">
        <div className="header-container">
          <h1>Notification System</h1>
          <div className="header-right">
            <h4>Notifications({unreadLength})</h4>
            {/* <h3>Click me to initialize notification</h3> */}
          </div>
        </div>
      </div>

      <div className="body">
        <NotificationBody list={list} markReadStatus={markReadStatus} />
      </div>
    </div>
  );
}

export default App;
