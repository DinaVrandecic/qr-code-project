import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';  // Uvođenje QRCodeCanvas

const Grid = () => {
  const studentInfo = {
    name: 'Ivan Horvat',
    studentID: '123456',
    timestamp: new Date().toISOString(),
  };

  const qrContent = `Name: ${studentInfo.name}, ID: ${studentInfo.studentID}, Timestamp: ${studentInfo.timestamp}`;

  return (
    <div>
      <h2>Grid računalni sustavi</h2>
      
      <QRCodeCanvas value={qrContent} size={256} />

      <p>Ime: {studentInfo.name}</p>
      <p>ID Studenta: {studentInfo.studentID}</p>
      <p>Vrijeme: {studentInfo.timestamp}</p>
    </div>
  );
};

export default Grid;