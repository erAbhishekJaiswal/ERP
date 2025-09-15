// // FacultyMessaging.js
// import React, { useState } from 'react';
// import styles from './FacultyMessaging.module.css';

// const FacultyMessaging = () => {
//   const [activeTab, setActiveTab] = useState('announcements');
//   const [announcement, setAnnouncement] = useState({
//     title: '',
//     content: '',
//     courses: [],
//     schedule: false,
//     scheduleDate: ''
//   });

//   const [message, setMessage] = useState({
//     recipient: '',
//     subject: '',
//     content: ''
//   });

//   const courses = [
//     { id: 'CS101', name: 'Computer Science 101' },
//     { id: 'MATH202', name: 'Mathematics 202' },
//     { id: 'ENG105', name: 'English 105' }
//   ];

//   const announcements = [
//     {
//       id: 1,
//       title: 'Final Project Deadline Extended',
//       date: '2023-11-10',
//       course: 'CS101',
//       content: 'The deadline for the final project has been extended to December 20th.'
//     },
//     {
//       id: 2,
//       title: 'Midterm Exam Room Change',
//       date: '2023-10-15',
//       course: 'MATH202',
//       content: 'The midterm exam will now be held in Room 204 instead of Room 105.'
//     }
//   ];

//   const messages = [
//     {
//       id: 1,
//       from: 'John Doe',
//       subject: 'Question about Final Project',
//       date: '2023-11-12',
//       read: false,
//       content: 'Dear Professor, I have a question about the requirements for the final project...'
//     },
//     {
//       id: 2,
//       from: 'Jane Smith',
//       subject: 'Request for Extension',
//       date: '2023-11-08',
//       read: true,
//       content: 'Hello, I was wondering if it would be possible to get an extension on...'
//     }
//   ];

//   const handleAnnouncementChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setAnnouncement(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleCourseSelect = (courseId) => {
//     setAnnouncement(prev => {
//       const courses = [...prev.courses];
//       const index = courses.indexOf(courseId);
//       if (index === -1) {
//         courses.push(courseId);
//       } else {
//         courses.splice(index, 1);
//       }
//       return { ...prev, courses };
//     });
//   };

//   const postAnnouncement = (e) => {
//     e.preventDefault();
//     console.log('Announcement posted:', announcement);
//     // API call would go here
//     setAnnouncement({
//       title: '',
//       content: '',
//       courses: [],
//       schedule: false,
//       scheduleDate: ''
//     });
//   };

//   const handleMessageChange = (e) => {
//     const { name, value } = e.target;
//     setMessage(prev => ({ ...prev, [name]: value }));
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     console.log('Message sent:', message);
//     // API call would go here
//     setMessage({
//       recipient: '',
//       subject: '',
//       content: ''
//     });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>Communication Center</h1>
//         <div className={styles.tabs}>
//           <button
//             className={`${styles.tabButton} ${activeTab === 'announcements' ? styles.active : ''}`}
//             onClick={() => setActiveTab('announcements')}
//           >
//             Announcements
//           </button>
//           <button
//             className={`${styles.tabButton} ${activeTab === 'messages' ? styles.active : ''}`}
//             onClick={() => setActiveTab('messages')}
//           >
//             Messages
//           </button>
//           <button
//             className={`${styles.tabButton} ${activeTab === 'reminders' ? styles.active : ''}`}
//             onClick={() => setActiveTab('reminders')}
//           >
//             Deadline Reminders
//           </button>
//         </div>
//       </div>

//       {activeTab === 'announcements' && (
//         <div className={styles.announcementsSection}>
//           <div className={styles.createAnnouncement}>
//             <h3>Create New Announcement</h3>
//             <form onSubmit={postAnnouncement} className={styles.announcementForm}>
//               <div className={styles.formGroup}>
//                 <label>Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={announcement.title}
//                   onChange={handleAnnouncementChange}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Content</label>
//                 <textarea
//                   name="content"
//                   value={announcement.content}
//                   onChange={handleAnnouncementChange}
//                   rows={6}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Select Courses</label>
//                 <div className={styles.courseSelection}>
//                   {courses.map(course => (
//                     <div key={course.id} className={styles.courseCheckbox}>
//                       <input
//                         type="checkbox"
//                         id={`course-${course.id}`}
//                         checked={announcement.courses.includes(course.id)}
//                         onChange={() => handleCourseSelect(course.id)}
//                       />
//                       <label htmlFor={`course-${course.id}`}>{course.name}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className={styles.formGroup}>
//                 <div className={styles.scheduleOption}>
//                   <input
//                     type="checkbox"
//                     id="schedule"
//                     name="schedule"
//                     checked={announcement.schedule}
//                     onChange={handleAnnouncementChange}
//                   />
//                   <label htmlFor="schedule">Schedule for later</label>
//                 </div>
//                 {announcement.schedule && (
//                   <input
//                     type="datetime-local"
//                     name="scheduleDate"
//                     value={announcement.scheduleDate}
//                     onChange={handleAnnouncementChange}
//                   />
//                 )}
//               </div>

//               <button type="submit" className={styles.postButton}>
//                 {announcement.schedule ? 'Schedule Announcement' : 'Post Announcement'}
//               </button>
//             </form>
//           </div>

//           <div className={styles.previousAnnouncements}>
//             <h3>Previous Announcements</h3>
//             <div className={styles.announcementsList}>
//               {announcements.map(announcement => (
//                 <div key={announcement.id} className={styles.announcementCard}>
//                   <div className={styles.announcementHeader}>
//                     <h4>{announcement.title}</h4>
//                     <span className={styles.announcementMeta}>
//                       {announcement.course} • {announcement.date}
//                     </span>
//                   </div>
//                   <p className={styles.announcementContent}>{announcement.content}</p>
//                   <div className={styles.announcementActions}>
//                     <button className={styles.editButton}>Edit</button>
//                     <button className={styles.deleteButton}>Delete</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab === 'messages' && (
//         <div className={styles.messagesSection}>
//           <div className={styles.messagesContainer}>
//             <div className={styles.inbox}>
//               <h3>Inbox</h3>
//               <div className={styles.messagesList}>
//                 {messages.map(msg => (
//                   <div 
//                     key={msg.id} 
//                     className={`${styles.messageItem} ${!msg.read ? styles.unread : ''}`}
//                   >
//                     <div className={styles.messageHeader}>
//                       <h4>{msg.from}</h4>
//                       <span className={styles.messageDate}>{msg.date}</span>
//                     </div>
//                     <p className={styles.messageSubject}>{msg.subject}</p>
//                     <p className={styles.messagePreview}>{msg.content.substring(0, 100)}...</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className={styles.messageView}>
//               <h3>Compose New Message</h3>
//               <form onSubmit={sendMessage} className={styles.messageForm}>
//                 <div className={styles.formGroup}>
//                   <label>Recipient</label>
//                   <select
//                     name="recipient"
//                     value={message.recipient}
//                     onChange={handleMessageChange}
//                     required
//                   >
//                     <option value="">Select recipient</option>
//                     <option value="all">All Students</option>
//                     <option value="CS101">CS101 Students</option>
//                     <option value="MATH202">MATH202 Students</option>
//                     <option value="ENG105">ENG105 Students</option>
//                     <option value="student1">John Doe</option>
//                     <option value="student2">Jane Smith</option>
//                   </select>
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label>Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={message.subject}
//                     onChange={handleMessageChange}
//                     required
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label>Message</label>
//                   <textarea
//                     name="content"
//                     value={message.content}
//                     onChange={handleMessageChange}
//                     rows={8}
//                     required
//                   />
//                 </div>

//                 <button type="submit" className={styles.sendButton}>
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab === 'reminders' && (
//         <div className={styles.remindersSection}>
//           <div className={styles.upcomingDeadlines}>
//             <h3>Upcoming Deadlines</h3>
//             <div className={styles.deadlinesList}>
//               <div className={styles.deadlineItem}>
//                 <div className={styles.deadlineInfo}>
//                   <h4>Final Project Submission</h4>
//                   <p>CS101 • Due: December 15, 2023</p>
//                 </div>
//                 <button className={styles.remindButton}>
//                   Send Reminder
//                 </button>
//               </div>
//               <div className={styles.deadlineItem}>
//                 <div className={styles.deadlineInfo}>
//                   <h4>Midterm Exam</h4>
//                   <p>MATH202 • Due: November 10, 2023</p>
//                 </div>
//                 <button className={styles.remindButton}>
//                   Send Reminder
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className={styles.reminderSettings}>
//             <h3>Reminder Settings</h3>
//             <div className={styles.settingsForm}>
//               <div className={styles.settingItem}>
//                 <label>
//                   <input type="checkbox" checked /> Automatic reminders 3 days before deadline
//                 </label>
//               </div>
//               <div className={styles.settingItem}>
//                 <label>
//                   <input type="checkbox" checked /> Automatic reminders 1 day before deadline
//                 </label>
//               </div>
//               <div className={styles.settingItem}>
//                 <label>
//                   <input type="checkbox" /> Remind students who haven't submitted 1 hour before deadline
//                 </label>
//               </div>
//               <div className={styles.settingItem}>
//                 <label>Default reminder message:</label>
//                 <textarea
//                   defaultValue="This is a friendly reminder about the upcoming deadline for {assignment} in {course}. The deadline is {dueDate}."
//                   rows={4}
//                 />
//               </div>
//               <button className={styles.saveButton}>Save Settings</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacultyMessaging;

















// FacultyMessaging.js
import React, { useState } from 'react';
import styles from './FacultyMessaging.module.css';

const FacultyMessaging = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    courses: [],
    schedule: false,
    scheduleDate: ''
  });

  const [message, setMessage] = useState({
    recipient: '',
    subject: '',
    content: ''
  });

  const courses = [
    { id: 'CS101', name: 'Computer Science 101' },
    { id: 'MATH202', name: 'Mathematics 202' },
    { id: 'ENG105', name: 'English 105' }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Final Project Deadline Extended',
      date: '2023-11-10',
      course: 'CS101',
      content: 'The deadline for the final project has been extended to December 20th.'
    },
    {
      id: 2,
      title: 'Midterm Exam Room Change',
      date: '2023-10-15',
      course: 'MATH202',
      content: 'The midterm exam will now be held in Room 204 instead of Room 105.'
    }
  ];

  const messages = [
    {
      id: 1,
      from: 'John Doe',
      subject: 'Question about Final Project',
      date: '2023-11-12',
      read: false,
      content: 'Dear Professor, I have a question about the requirements for the final project...'
    },
    {
      id: 2,
      from: 'Jane Smith',
      subject: 'Request for Extension',
      date: '2023-11-08',
      read: true,
      content: 'Hello, I was wondering if it would be possible to get an extension on...'
    }
  ];

  const handleAnnouncementChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnnouncement(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCourseSelect = (courseId) => {
    setAnnouncement(prev => {
      const courses = [...prev.courses];
      const index = courses.indexOf(courseId);
      if (index === -1) {
        courses.push(courseId);
      } else {
        courses.splice(index, 1);
      }
      return { ...prev, courses };
    });
  };

  const postAnnouncement = (e) => {
    e.preventDefault();
    console.log('Announcement posted:', announcement);
    // API call would go here
    setAnnouncement({
      title: '',
      content: '',
      courses: [],
      schedule: false,
      scheduleDate: ''
    });
  };

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    setMessage(prev => ({ ...prev, [name]: value }));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('Message sent:', message);
    // API call would go here
    setMessage({
      recipient: '',
      subject: '',
      content: ''
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Communication Center</h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'announcements' ? styles.active : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            Announcements
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'messages' ? styles.active : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'reminders' ? styles.active : ''}`}
            onClick={() => setActiveTab('reminders')}
          >
            Deadline Reminders
          </button>
        </div>
      </div>

      {activeTab === 'announcements' && (
        <div className={styles.announcementsSection}>
          <div className={styles.createAnnouncement}>
            <h3>Create New Announcement</h3>
            <form onSubmit={postAnnouncement} className={styles.announcementForm}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={announcement.title}
                  onChange={handleAnnouncementChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Content</label>
                <textarea
                  name="content"
                  value={announcement.content}
                  onChange={handleAnnouncementChange}
                  rows={6}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Select Courses</label>
                <div className={styles.courseSelection}>
                  {courses.map(course => (
                    <div key={course.id} className={styles.courseCheckbox}>
                      <input
                        type="checkbox"
                        id={`course-${course.id}`}
                        checked={announcement.courses.includes(course.id)}
                        onChange={() => handleCourseSelect(course.id)}
                      />
                      <label htmlFor={`course-${course.id}`}>{course.name}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.scheduleOption}>
                  <input
                    type="checkbox"
                    id="schedule"
                    name="schedule"
                    checked={announcement.schedule}
                    onChange={handleAnnouncementChange}
                  />
                  <label htmlFor="schedule">Schedule for later</label>
                </div>
                {announcement.schedule && (
                  <input
                    type="datetime-local"
                    name="scheduleDate"
                    value={announcement.scheduleDate}
                    onChange={handleAnnouncementChange}
                    className={styles.scheduleInput}
                  />
                )}
              </div>

              <button type="submit" className={styles.postButton}>
                {announcement.schedule ? 'Schedule Announcement' : 'Post Announcement'}
              </button>
            </form>
          </div>

          <div className={styles.previousAnnouncements}>
            <h3>Previous Announcements</h3>
            <div className={styles.announcementsList}>
              {announcements.map(announcement => (
                <div key={announcement.id} className={styles.announcementCard}>
                  <div className={styles.announcementHeader}>
                    <h4>{announcement.title}</h4>
                    <span className={styles.announcementMeta}>
                      {announcement.course} • {announcement.date}
                    </span>
                  </div>
                  <p className={styles.announcementContent}>{announcement.content}</p>
                  <div className={styles.announcementActions}>
                    <button className={styles.editButton}>Edit</button>
                    <button className={styles.deleteButton}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className={styles.messagesSection}>
          <div className={styles.messagesContainer}>
            <div className={styles.inbox}>
              <h3>Inbox</h3>
              <div className={styles.messagesList}>
                {messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`${styles.messageItem} ${!msg.read ? styles.unread : ''}`}
                    onClick={() => {
                      // In a real app, you would mark as read and show full message
                      console.log('View message:', msg.id);
                    }}
                  >
                    <div className={styles.messageHeader}>
                      <h4>{msg.from}</h4>
                      <span className={styles.messageDate}>{msg.date}</span>
                    </div>
                    <p className={styles.messageSubject}>{msg.subject}</p>
                    <p className={styles.messagePreview}>{msg.content.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.messageView}>
              <h3>Compose New Message</h3>
              <form onSubmit={sendMessage} className={styles.messageForm}>
                <div className={styles.formGroup}>
                  <label>Recipient</label>
                  <select
                    name="recipient"
                    value={message.recipient}
                    onChange={handleMessageChange}
                    required
                  >
                    <option value="">Select recipient</option>
                    <option value="all">All Students</option>
                    <option value="CS101">CS101 Students</option>
                    <option value="MATH202">MATH202 Students</option>
                    <option value="ENG105">ENG105 Students</option>
                    <option value="student1">John Doe</option>
                    <option value="student2">Jane Smith</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={message.subject}
                    onChange={handleMessageChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Message</label>
                  <textarea
                    name="content"
                    value={message.content}
                    onChange={handleMessageChange}
                    rows={8}
                    required
                  />
                </div>

                <button type="submit" className={styles.sendButton}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reminders' && (
        <div className={styles.remindersSection}>
          <div className={styles.upcomingDeadlines}>
            <h3>Upcoming Deadlines</h3>
            <div className={styles.deadlinesList}>
              <div className={styles.deadlineItem}>
                <div className={styles.deadlineInfo}>
                  <h4>Final Project Submission</h4>
                  <p>CS101 • Due: December 15, 2023</p>
                </div>
                <button className={styles.remindButton}>
                  Send Reminder
                </button>
              </div>
              <div className={styles.deadlineItem}>
                <div className={styles.deadlineInfo}>
                  <h4>Midterm Exam</h4>
                  <p>MATH202 • Due: November 10, 2023</p>
                </div>
                <button className={styles.remindButton}>
                  Send Reminder
                </button>
              </div>
            </div>
          </div>

          <div className={styles.reminderSettings}>
            <h3>Reminder Settings</h3>
            <div className={styles.settingsForm}>
              <div className={styles.settingItem}>
                <label>
                  <input type="checkbox" defaultChecked /> Automatic reminders 3 days before deadline
                </label>
              </div>
              <div className={styles.settingItem}>
                <label>
                  <input type="checkbox" defaultChecked /> Automatic reminders 1 day before deadline
                </label>
              </div>
              <div className={styles.settingItem}>
                <label>
                  <input type="checkbox" /> Remind students who haven't submitted 1 hour before deadline
                </label>
              </div>
              <div className={styles.settingItem}>
                <label>Default reminder message:</label>
                <textarea
                  defaultValue="This is a friendly reminder about the upcoming deadline for {assignment} in {course}. The deadline is {dueDate}."
                  rows={4}
                />
              </div>
              <button className={styles.saveButton}>Save Settings</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyMessaging;