import React, {useState} from 'react';
import Modal from './Modal'
import axios from 'axios';

const NotificationCard = ({ notification, markReadStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(!showModal);
  }
  const convertDate = (str) => {
    let d = new Date(str);
    return d.toUTCString();
  }

  const compressBody = (str) => {
    str = str.slice(0, 100) + "...";
    return str;
  }

  // const markReadStatus = (id, status) => {
  //   axios.patch(`${baseUrl}/notifications/${id}`, {
  //     to_read: !status
  //   })
  //   .then(res => console.log(res))
  //   .catch(error => console.log(error));
  // }

  return (
    <div className="individual-notification" key={notification.id}>
      <h1>{notification.title}</h1>
      <h3>{convertDate(notification.created_at)}</h3>
      {
        notification.body.length > 100 ? 
        <>
          <p>{compressBody(notification.body)}</p>
          <button className="read-more-btn" onClick={openModal}>Read More</button>
        </>
        :
        <p>{notification.body}</p>
      }
      { 
      notification.to_read ?
        <button className="read-status-btn" onClick={() => markReadStatus(notification.id, notification.to_read)}>Make As Unread</button> :
        <button className="read-status-btn" onClick={() => markReadStatus(notification.id, notification.to_read)}>Make As Read</button>
      }
      {showModal ? <Modal setShowModal={setShowModal} title={notification.title} body={notification.body} /> : null}
    </div>
  )
}

export default NotificationCard