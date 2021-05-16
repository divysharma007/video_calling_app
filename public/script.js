const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myvideogrid=document.getElementById('self')
let mystream;
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})
const myVideo = document.createElement('video') 
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStreammine(myVideo, stream)
  mystream=stream
  myPeer.on('call', call => {
    console.log("request id: ",myPeer.id)
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close',()=>{
      video.remove()
    })
  })

  socket.on('user-connected', userId => {
    console.log("User Connected " + userId)
    setTimeout(connectToNewUser,10000,userId,stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}
function addVideoStreammine(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  myvideogrid.append(video)
}
function copier()
{ navigator.clipboard.writeText(window.location.href);
  document.getElementById("button").innerHTML = "Link Copied!";
  setTimeout( function() {
      document.getElementById("button").innerHTML = "Link";
                         }, 1500);}
function timer()
{
  const timevar = document.getElementById('timer');
  let time = 0;
       setInterval(()=>{
       timevar.innerText="Active Time: " + String(time) + " Seconds"
       time++
     },1000)}
 
const playstop = () => {
      let enabled = mystream.getVideoTracks()[0].enabled;
      if (enabled) {
        mystream.getVideoTracks()[0].enabled = false;
      } else {
        mystream.getVideoTracks()[0].enabled = true;
      }
    };
    
const muteunmute = () => {
      const enabled = mystream.getAudioTracks()[0].enabled;
      if (enabled) {
        mystream.getAudioTracks()[0].enabled = false;
      } else {
        mystream.getAudioTracks()[0].enabled = true;
      }
    };
    setInterval(()=>
    {console.log(1)
      var size=mystream.getAudioTracks().length
      var sizevideo=mystream.getVideoTracks().length
      if(sizevideo==0)
      {
        videochecker();
      }
      else
      {
        const videoenabled=mystream.getVideoTracks()[0].enabled;
        if(videoenabled)
        {
          setStopVideo();
        }
        else
        {
          setPlayVideo();
     
        }
      }
      if(size==0)
      {audiochecker();}
      else{
      const enabled = mystream.getAudioTracks()[0].enabled;
     
      if(enabled){setMuteButton();}
      else setUnmuteButton();}
    },100)
    
const setPlayVideo = () => {
      document.getElementById("svideo").innerHTML = "Show Video";
    };
const setStopVideo = () => {
      document.getElementById("svideo").innerHTML = "Hide Video";
    };
const audiochecker=()=>
{
  document.getElementById("mute").innerHTML = "No Audio Device Found!";
    
};
const videochecker=()=>
{
  document.getElementById("svideo").innerHTML = "No Video Device Found!";
    
};

const setUnmuteButton = () => {
      document.getElementById("mute").innerHTML = "Unmute";
    };
const setMuteButton = () => {
      document.getElementById("mute").innerHTML = "Mute";
    };