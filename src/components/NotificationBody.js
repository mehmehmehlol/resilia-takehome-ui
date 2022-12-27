import React from 'react'
import NotificationCard from './NotificationCard';

const NotificationBody = ({ list, markReadStatus }) => {
  return (
    <div className='notification-list'>
      {
        list.map((l) => (
          <>
            <NotificationCard notification={l} markReadStatus={markReadStatus} />
          </>
        ))
      }
    </div>
  )
}

export default NotificationBody