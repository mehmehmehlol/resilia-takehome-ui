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
      const resData = await axios.get(`${baseUrl}/notifications`)
      setList(resData.data);
    }
    fetchList();
  }, [])

  // update read status and update states to reflect the changes from db
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

  // retrieve the length of unread messages to be used in unread notification feature
  const unreadStatus = () => {
    let unread = list.filter(l => l.to_read === false);
    return unread.length;
  }

  return (
    <div className="App">
      <div className="header">
        <div className="header-container">
          <h1>Notification System</h1>
          <div className="header-right">
            <h4>Notifications({unreadStatus()})</h4>
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
