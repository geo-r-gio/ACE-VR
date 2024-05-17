// AFRAME.registerComponent('controller-listener', {
//     schema: {
//         flag: { default: true },
//     },
    
//     init: function () {
//       var el = this.el;
  
//       // Add event listener for buttondown event on the left controller
//       el.addEventListener('buttondown', function (evt) {
//         // Check if the button pressed is the X button on the left controller (buttonId 3)
//         if (evt.detail.id === 3 && evt.detail.hand === 'left') {
//           // Toggle visibility of the recording button
//           var recordingButton = document.getElementById('mic');
//           recordingButton.setAttribute('visible', !recordingButton.getAttribute('visible'));
//         }
//       });
//     }
//   });
  

AFRAME.registerComponent("button-visibility", {
    schema: {
      flag: { default: true },
    },
    
    init: function () { 
      var currentIndex = 1;
      var arr = []; // Whatever you need to insert in the selection menu 
      
      this.el.addEventListener("xbuttondown", (event) => {
        // Check if the X button on the left controller is pressed
        if (event.detail.id === 3 && event.detail.hand === "left") {
          // Toggle visibility of the recording button
          var recordingButton = document.getElementById("mic");
          recordingButton.setAttribute("visible", !recordingButton.getAttribute("visible"));
        }
      });
  
      this.el.addEventListener("thumbstickmoved", (event) => {
        if (!this.flag) { 
          const thumbstickX = event.detail.x;
          if (thumbstickX > 0) {
            // Move right
            currentIndex = currentIndex + 1;
            if (currentIndex == arr.length) {
              currentIndex = 0;
            }
  
            // Get the arrow element
            const arrow = document.getElementById("arrow_right");
            const originalColor = arrow.getAttribute("color");
  
            // Change the color to yellow
            arrow.setAttribute("color", "yellow");
  
            // Revert the color back to original after 0.5 seconds
            setTimeout(() => {
              arrow.setAttribute("color", originalColor);
            }, 200);
          } else if (thumbstickX < 0) {
            // Move left
            currentIndex = currentIndex - 1;
            if (currentIndex < 0) {
              currentIndex = arr.length - 1;
            }
            // Get the arrow element
            const arrow = document.getElementById("arrow_left");
            const originalColor = arrow.getAttribute("color");
  
            // Change the color to yellow
            arrow.setAttribute("color", "yellow");
  
            // Revert the color back to original after 0.5 seconds
            setTimeout(() => {
              arrow.setAttribute("color", originalColor);
            }, 200);
          } 
        }
      });
    },
    tick: function () {},
  });
  