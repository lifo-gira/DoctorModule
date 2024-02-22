import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useState } from 'react';
import { useEffect } from 'react';

// function randomID(len) {
//   let result = '';
//   if (result) return result;
//   var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   // console.log(result)
//   return result;
// }

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}


export default function App({onMeetEnd,doctorId}) {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentId, setdocumentId] = useState([]);
  const [doctor_id, setdoctor_id] = useState([]);
  const [doctorName, setdoctorName] = useState([]);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/patient-info/${doctorId}`
        );
        const data = await response.json();

        if (response.ok) {
          setPatients(data);
          console.log("DATA",patients)
          setdocumentId(patients.health_tracker.meeting_link)
          setdoctor_id(patients.doctor_id)
          setdoctorName(patients.doctor_assigned)
          console.log("VIDEOCALL",documentId,doctorName,doctor_id)
        } else {
          setError(data.detail || "Failed to fetch patient information");
        }
      } catch (error) {
        setError("Error fetching patient information");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, [doctorId]);
  
  useEffect(() => {
    setPatients(patients);
    setdocumentId(documentId)
    setdoctorName(doctorName)
    setdoctor_id(doctor_id)
    console.log("patients",patients);
  }, [patients,documentId,doctorName,doctor_id]);

  console.log(doctorId)
  const roomID = getUrlParams().get('roomID') || "documentId";

  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1455965454;
    const serverSecret = "c49644efc7346cc2a7a899aed401ad76";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, "documentId", "4321","doctor 1");

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      showPreJoinView: false,
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showLeavingView: false,
      showLeaveRoomConfirmDialog: false,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      onLeaveRoom: () => {
        // Navigate to home screen
        onMeetEnd();
        // window.location.reload();
      },
    });

    // Log the URL alone
    const url =
      window.location.protocol + '//' + 
      window.location.host + window.location.pathname +
      '?roomID=' +
      roomID;
    console.log("Shared URL:", url);
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}