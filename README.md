# maniReady_nailApp
A JavaScript web app for customizing a client's desired manicure look before heading to the salon.

Author: Chad Walkup
This project is about bringing some relief to nail technicians who are working in salons and have clients who show up for their appointment with no idea what they want on their nails that day. By creating an app that allows clients to "play" with different styles and looks on their own time until they figure out what they want, this will allow the nail technician that extra time to actually do the designs and please their clients better.

Special thanks to Southern Utah University in Cedar City, Utah. And to the Walter Maxwell Gibson Research Fellowship who assisted in supporting much of the initial design and research for this project.

The setup for this project is as a web-based app. So the current files will include an HTML, CSS, and JS file. The JS contains many calls to the HTML5 Canvas element, so if you are not familiar with that: https://www.w3schools.com/html/html5_canvas.asp
Which is a link to the basic W3 Schools quick tuitorial and explaination of the element.

Also a great resource for reference to ECMAScript6: http://exploringjs.com/es6/index.html#toc_ch_about-es6 
Which is a link to a web-book with searchable terms and table of contents.

Description of current project files:
HTML File: buildAset3.html  Role:View
The most important elements here are the two <canvas> containers that will hold the Right and Left Hands drawn by the JavaScript
  Eventually this will have all of the controls made of <input> housed within a <form>. One problem to surmount is the <input type="color"> only works on non-iOS Mobile sources- so I need to create a work-around for iOS Mobile devices. Is there something like the NSColor Picker available perhaps?

CSS File: canvasStyles.css  Role:View Styling
This contains the styling for the buildAset3 elements. For mobile I only want one hand at a time showing, so this will need to be changed after I get the sizing for the hands proportional to the canvas elements to match each other precisely. This will just be the straight CSS file, but I may also put up the pre-processed LESS file if there is any interest in that.

JS File: myCanvasJS3.js  Role: Model and Controller
This file is all the variables and methods needed to draw/update the canvas elements in the buildAset3. Eventually this can be broken up so that the actual implementation of the presets are in a separate file perhaps?

