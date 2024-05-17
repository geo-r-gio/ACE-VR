// Selection Menu functionalities
/* global AFRAME*/
// This is a dummy-menu template. 
// You can modify it to add items inside. 
/*
For now, you can go left and right and the indeces are being updates
But you can not select anything since there is nothing to select yet.

Be sure to add what you want to do in your menu and insert them.
*/


// provide a valid Index for an Array if the desiredIndex is greater or less than an array's length by "looping" around
// function loopIndex(desiredIndex, arrayLength) {
//   if (desiredIndex > arrayLength - 1) {
//     return desiredIndex - arrayLength;
//   }
//   if (desiredIndex < 0) {
//     return arrayLength + desiredIndex;
//   }
//   return desiredIndex;
// }


// This is the main menu component, added to the left controller
// Having less than 3 elements will allow for duplicates to be shown
// on the menu.
AFRAME.registerComponent("menu-visibility", {
  schema: {
    flag: { default: true },
  },
  
  init: function () { 
    
        var currentIndex = 1;
        var arr = []; //whatever you need to insert in the selection menu 
    
        this.el.addEventListener("triggerup", (event) => {
          // Make the selection menu visible or invisible
          let controller1 = document.getElementById("lhand");
          let controller2 = document.getElementById("rhand");
          let vrEntity = document.getElementById("menu");

          if (this.flag) {
            // If the menu is turning on, remove movement control
            controller1.removeAttribute("oculus-thumbstick-controls");
            controller2.removeAttribute("oculus-thumbstick-controls");

            // Toggle visibility: On
            vrEntity.object3D.visible = true; 

            this.flag = false;
          } else {
            // Toggle visibility: Off
            vrEntity.object3D.visible = false;

            // If menu turning off, return the movement control
            controller1.setAttribute("oculus-thumbstick-controls", "");
            controller2.setAttribute("oculus-thumbstick-controls", "");

            this.flag = true;
          }
        });

        // Trigger mic toggle on left trigger press
        this.el.addEventListener("triggerdown", (event) => {
          var micButton = document.getElementById("mic");
          
          if (this.flag) {
            // Show the mic button
            micButton.setAttribute("visible", true);
            this.flag = false;
          } else {
            // Hide the mic button
            micButton.setAttribute("visible", false);
            this.flag = true;
          }
        });

        // this.el.addEventListener("thumbstickmoved", (event) => {
        //   if (!this.flag) { 
        //     const thumbstickX = event.detail.x;
        //     if (thumbstickX > 0) {
        //       // Move right
        //       currentIndex = currentIndex + 1;
        //       if (currentIndex == arr.length) {
        //         currentIndex = 0;
        //       }

        //       // Get the arrow element
        //       const arrow = document.getElementById("arrow_right");
        //       const originalColor = arrow.getAttribute("color");

        //       // Change the color to yellow
        //       arrow.setAttribute("color", "yellow");

        //       // Revert the color back to original after 0.5 seconds
        //       setTimeout(() => {
        //         arrow.setAttribute("color", originalColor);
        //       }, 200);
        //     } else if (thumbstickX < 0) {
        //       // Move left
        //       currentIndex = currentIndex - 1;
        //       if (currentIndex < 0) {
        //         currentIndex = arr.length - 1;
        //       }
        //       // Get the arrow element
        //       const arrow = document.getElementById("arrow_left");
        //       const originalColor = arrow.getAttribute("color");

        //       // Change the color to yellow
        //       arrow.setAttribute("color", "yellow");

        //       // Revert the color back to original after 0.5 seconds
        //       setTimeout(() => {
        //         arrow.setAttribute("color", originalColor);
        //       }, 200);
        //     } 
        //   }
        // });
  },
  tick: function () {},
});