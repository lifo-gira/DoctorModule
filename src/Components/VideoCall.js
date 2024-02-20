import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  // console.log(result)
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App({onMeetEnd}) {
  const roomID = getUrlParams().get('roomID') || "testing";

  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1455965454;
    const serverSecret = "c49644efc7346cc2a7a899aed401ad76";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5),  "Bob");

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      showPreJoinView: false,
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
        window.location.reload();
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