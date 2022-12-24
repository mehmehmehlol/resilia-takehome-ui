import React from 'react'
import NotificationCard from './NotificationCard';

const NotificationBody = ({ list }) => {
  return (
    <div className='notification-list'>
      {
        list.map((l) => (
          <>
            <NotificationCard notification={l}/>
          </>
        ))
      }
    </div>
  )
}

export default NotificationBody