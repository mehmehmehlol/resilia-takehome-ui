import React, { useEffect, useState } from 'react';
import './styles/styles.css'
import NotificationBody from './components/NotificationBody';

function App() {
  const [list, setList] = useState([]);

  const baseUrl = "http://localhost:3000"
  useEffect(() => {
    const fetchList = async() => {
      const res = await fetch(`${baseUrl}/notifications`)
      const resData = await res.json();
      setList(resData);
    }
    fetchList();
  }, [])

  return (
    <div className="App">
      <div className="header">
        <div className="header-container">
          <h1>Notification System</h1>
          <div className="header-right">
            <h4>Notifications({list.length})</h4>
            <h3>Click me to initialize notification</h3>
          </div>
        </div>
      </div>

      <div className="body">
        <NotificationBody list={list} />
      </div>
    </div>
  );
}

export default App;
