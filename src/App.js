import React, { useEffect, useState } from 'react';
import './styles/styles.css'
import axios from 'axios';
import NotificationBody from './components/NotificationBody';

function App() {
  const [list, setList] = useState([]);
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
    const index = id - 1;
    axios.patch(`${baseUrl}/notifications/${id}`, {
      to_read: !status
    })
    .then(res => {
      const updatedData = res.data;
      const updatedArray = [
        ...list.slice(0, index),
          updatedData,
        ...list.slice(index + 1),
      ];
      setList(updatedArray);
    })
    .catch(error => console.log(error));
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
