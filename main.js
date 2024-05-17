let can_record = false;
let is_recording = false;

let recorder = null;

let chunks = [];

console.log("main.js is loaded")

// Register the cursor-listener component
AFRAME.registerComponent('cursor-listener', {
    init: function () {
      console.log('cursor-listener initialized');
      const mic_btn = document.querySelector('#mic'); // Select the mic button inside the component
      // const playback = document.querySelector('.playback');
      this.el.addEventListener('click', function (evt) {
        console.log('mic-toggle clicked');
        ToggleMic(mic_btn); // Pass the selected element to the ToggleMic function
      });
    }
  });

function SetupAudio() {
    console.log("Setup")
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                audio: true
            })
            .then(SetupStream)
            .catch(err => {
                console.error(err)
            });
    }
}

SetupAudio();

function SetupStream(stream) {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
        chunks.push(e.data);
    }

    recorder.onstop = e => {
        const blob = new Blob(chunks, {type: "audio/mpeg; codecs=opus"});
        SendAudioToBackend(blob);
        chunks = [];
    }

    can_record = true;
}

function ToggleMic(mic_btn) {
    console.log("ToggleMic function called");

    if(!can_record) return;

    is_recording = !is_recording;

    if(is_recording) {
        recorder.start();
        mic_btn.classList.add("is_recording");
    } else {
        recorder.stop();
        mic_btn.classList.remove("is_recording");
    }
}

async function SendAudioToBackend(blob) {
    const formData = new FormData();
    formData.append("file", blob, "audio.mp3");

    console.log("Blob size:", blob.size); // Check blob size
    console.log("Blob type:", blob.type); // Check blob type
    console.log("FormData size:", formData.size); // Check FormData size
    console.log("FormData entries:", [...formData.entries()]); // Check FormData entries

    try {
        const response = await fetch("http://localhost:8000/talk", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioURL = window.URL.createObjectURL(audioBlob);
            const playback = document.querySelector('.playback audio');
            if (playback) {
              playback.src = audioURL;
              playback.play();
            } else {
              console.error('Playback element not found');
            }
          } else {
            throw new Error('Error sending audio to backend');
          }
        } catch (error) {
          console.error("Error sending audio to backend: ", error);
        }
      }
