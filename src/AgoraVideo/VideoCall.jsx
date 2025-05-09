import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "53519b3b63cc45a0a1fa9f53ac617690";
const TOKEN = null; // Use your token if required
const CHANNEL = "testchannel"; // Same channel for all users

const VideoCall = () => {
  const clientRef = useRef(null);
  const localAudioTrackRef = useRef(null);
  const localVideoTrackRef = useRef(null);
  const localPlayerRef = useRef(null);

  const [remoteUsers, setRemoteUsers] = useState([]);
  const [joined, setJoined] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  useEffect(() => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    clientRef.current = client;

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);

      setRemoteUsers((prev) => {
        const exists = prev.find((u) => u.uid === user.uid);
        return exists ? prev : [...prev, user];
      });

      if (mediaType === "audio") {
        user.audioTrack?.play();
      }

      if (mediaType === "video") {
        setTimeout(() => {
          const container = document.getElementById(`remote-player-${user.uid}`);
          if (container) user.videoTrack?.play(container);
        }, 100);
      }
    });

    client.on("user-unpublished", (user) => {
      setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
    });

    return () => {
      leaveCall();
    };
  }, []);

  const joinCall = async () => {
    const client = clientRef.current;
    const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);

    const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    const localVideoTrack = await AgoraRTC.createCameraVideoTrack();

    localAudioTrackRef.current = localAudioTrack;
    localVideoTrackRef.current = localVideoTrack;

    await client.publish([localAudioTrack, localVideoTrack]);

    localVideoTrack.play(localPlayerRef.current);

    setJoined(true);
  };

  const leaveCall = async () => {
    const client = clientRef.current;
    if (localAudioTrackRef.current) localAudioTrackRef.current.close();
    if (localVideoTrackRef.current) localVideoTrackRef.current.close();
    await client.leave();
    setRemoteUsers([]);
    setJoined(false);
  };

  const toggleAudio = async () => {
    const audioTrack = localAudioTrackRef.current;
    if (audioTrack) {
      await audioTrack.setEnabled(isAudioMuted);
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const toggleVideo = async () => {
    const videoTrack = localVideoTrackRef.current;
    if (videoTrack) {
      await videoTrack.setEnabled(isVideoMuted);
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <div>
      <h2>Agora Video Call</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {/* Local User */}
        <div
          ref={localPlayerRef}
          style={{ width: 300, height: 200, backgroundColor: "#000" }}
        />
        {/* Remote Users */}
        {remoteUsers.map((user) => (
          <div
            key={user.uid}
            id={`remote-player-${user.uid}`}
            style={{ width: 300, height: 200, backgroundColor: "#111" }}
          />
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {!joined ? (
          <button onClick={joinCall}>Join Call</button>
        ) : (
          <>
            <button onClick={toggleAudio}>
              {isAudioMuted ? "Unmute" : "Mute"}
            </button>
            <button onClick={toggleVideo}>
              {isVideoMuted ? "Video On" : "Video Off"}
            </button>
            <button onClick={leaveCall}>Leave Call</button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
