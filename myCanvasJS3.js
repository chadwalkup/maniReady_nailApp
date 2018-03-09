* 	Mani-Ready Web App: Chad Walkup Update 1/27/2018
	Version 3: Connects to two HTML Canvas elements, one for each hand
	
    Changes: Variables changed to each finger being the object with properties
        Re: this cleans up the method calls significantly and sets up for
            pulling the HTML 'finger' attribute from the users input 
			
    Need to Change: Palm/finger numbers for drawing background hands are still hard-coded, not adaptive. 
		This needs to be fixed so I can resize the canvas as needed
    To set color gradients- need a function like colorSetter() that can go and grab the proper color to use for the nail when running the drawNailX- then I don't need to have that same code so many times.
	
	After testing, just found out that the <form type="color"> does not work in any version of iOS Safari...
	So all it displays is a text box where you can manually enter the Hexa color code if you happen to know the color you want. Need to see how to fix this- ideas: bad one- hardcode some choices in... OR look for something like the UIColor like Swift offers
    
    Also, currently drawing things sideways for thumbs- can change this with a context save- do stuff- context restore in a future build
*/

const canvas1 = document.getElementById('rightHandCanvas');
const canvas2 = document.getElementById('leftHandCanvas');

var rightPinkie = { name:'Right Pinkie',isThumb:false,isRight:true,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:18,xPos:100,yPos:150,fLen:2.0,lMod:10,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}
var rightRing = { name:'Right Ring',isThumb:false,isRight:true,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:22,xPos:167,yPos:150,fLen:2.7,lMod:6,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}
var rightMiddle = { name:'Right Middle',isThumb:false,isRight:true,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:25,xPos:242,yPos:150,fLen:3.2,lMod:3,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}
var rightPointer = { name:'Right Pointer',isThumb:false,isRight:true,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:23,xPos:322,yPos:150,fLen:2.7,lMod:5,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}
var rightThumb = { name:'Right Thumb',isThumb:true,isRight:true,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:28,xPos:340,yPos:350,fLen:3.5,lMod:0,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}
var leftPinkie = { name:'Left Pinkie',isThumb:false,isRight:false,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:18,xPos:452,yPos:150,fLen:2.0,lMod:10,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}
var leftRing = { name:'Left Ring',isThumb:false,isRight:false,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:22,xPos:377,yPos:150,fLen:2.7,lMod:6,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}
var leftMiddle = { name:'Left Middle',isThumb:false,isRight:false,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:25,xPos:294,yPos:150,fLen:3.2,lMod:3,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}
var leftPointer = { name:'Left Pointer',isThumb:false,isRight:false,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:23,xPos:218,yPos:150,fLen:2.7,lMod:5,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}
var leftThumb = { name:'Left Thumb',isThumb:true,isRight:false,
    smileLine:'french',blendChoice:'solid',blendLength:1,splitLength:1, 
    radius:28,xPos:247,yPos:350,fLen:3.5,lMod:0,
    pColor:'white',sColor:'white',tColor:'white',smileColor:'rgb(255,200,200)' 
}

const bedLength = 26;

/*Beginning Values that will all be changed as the user sets things */
/*Whole Hand Section */
var nLength = 75; //Minimum is 65 up to max of 140
var shapeChoice = 'round'; // Choices: square, stiletto, squoval, coffin, round, oval, edge, flare, almond, bevel, lipstick, mountain- could add arrowhead
var handColor = 'rgb(255,223,196)';
var handColorHighlight1= 'rgba(255,255,255,1)';
var handColorHighlight2= 'rgba(255,255,255,0)';
var nailBedColor = 'rgb(255,200,200)';

//var nPColor = 'white'; //Primary Nail Color
//var nSColor = 'red';   //Secondary Nail Color

// For skin tone color choices http://www.collectedwebs.com/art/colors/skin_tones/

/*Functions for drawing to the canvas */
function drawSmileLine(finger, canvas){
    let startX = finger.xPos;
    let startY = finger.yPos;
    let radius = finger.radius;
    let smileColor = finger.smileColor;
    let mod = finger.lMod;
    let thumbTest = finger.isThumb;
    let handednessTest = finger.isRight;
    let bedL = bedLength;
    let smileChoice = finger.smileLine; 
    
    if(canvas.getContext){
        let ctx =canvas.getContext('2d');
        ctx.fillStyle = smileColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        if(thumbTest){
            if(handednessTest){ //Checks true if Right Hand
                switch(smileChoice){
                    case 'french':
                        bedL= bedL -10;
                        ctx.arc(startX, startY-radius, radius, 1.5*Math.PI, 0.5*Math.PI, false);
                        ctx.arc(startX-bedL, startY-radius, radius, 0.5*Math.PI, 1.5*Math.PI, false);
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(startX-bedL, startY);
                        ctx.moveTo(startX-bedL,startY-(2*radius));
                        ctx.lineTo(startX, startY-(2*radius));
                        break;
                    case 'chevron':
                        bedL=bedL -6;
                        ctx.arc(startX, startY-radius, radius, 1.5*Math.PI, 0.5*Math.PI, false);
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(startX-bedL, startY);
                        ctx.lineTo(startX-bedL-radius,startY-radius);
                        ctx.lineTo(startX-bedL,startY-(2*radius));
                        ctx.lineTo(startX, startY-(2*radius));
                        break;
                    case 'none':
                        //
                        break;
                    default:
                        //
                        break;
                }
            }else{
                switch(smileChoice){
                    case 'french':
                        bedL= bedL -10;
                        ctx.arc(startX, startY-radius, radius, 1.5*Math.PI, 0.5*Math.PI, true);
                        ctx.arc(startX+bedL, startY-radius, radius, 0.5*Math.PI, 1.5*Math.PI, true);
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(startX+bedL, startY);
                        ctx.moveTo(startX+bedL,startY-(2*radius));
                        ctx.lineTo(startX, startY-(2*radius));
                        break;
                    case 'chevron':
                        bedL=bedL -6;
                        ctx.arc(startX, startY-radius, radius, 1.5*Math.PI, 0.5*Math.PI, true);
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(startX+bedL, startY);
                        ctx.lineTo(startX+bedL+radius,startY-radius);
                        ctx.lineTo(startX+bedL,startY-(2*radius));
                        ctx.lineTo(startX, startY-(2*radius));
                }
            }   
        }else{
            switch(smileChoice){
            case 'french':
                bedL= bedL -10;
                ctx.arc(startX+radius, startY, radius, 0, Math.PI, true);
                ctx.arc(startX+radius, startY+bedL, radius, Math.PI,0, true);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX, startY+bedL);
                ctx.moveTo(startX+(2*radius),startY+bedL);
                ctx.lineTo(startX+(2*radius), startY);
                ctx.fill();
                ctx.stroke();
                break;
            case 'chevron':
                bedL=bedL -6;
                ctx.arc(startX+radius, startY, radius, 0, Math.PI, true);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX, startY+bedL);
                ctx.lineTo(startX+radius,startY+bedL+radius);
                ctx.lineTo(startX+(2*radius),startY+bedL);
                ctx.lineTo(startX+(2*radius), startY);
                ctx.fill();
                ctx.stroke();
                break;
            case 'none':
                //
                break;
            default:
                //
                break;
            }
            
        }
        ctx.fill();
        ctx.stroke();
    }
}

function drawFinger(finger, canvas){
    let startX = finger.xPos;
    let startY = finger.yPos;
    let fingLength = finger.fLen;
    let radius = finger.radius;
    
    
    let radius2 = radius + 9;
    let newX = startX - 9;
    
    
    
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = handColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        // The drawing of the tops of the finger under the nails
        ctx.arc(startX+radius, startY+bedLength, radius2, 0, Math.PI, false);
        ctx.arc(startX+radius, startY-(bedLength*fingLength), radius2, Math.PI, 0, false);
        ctx.moveTo(newX+(2*radius2), startY-(bedLength*fingLength));
        ctx.lineTo(newX+(2*radius2), startY+(bedLength));
        ctx.moveTo(newX, startY+(bedLength));
        ctx.lineTo(newX, startY-(bedLength*fingLength));
        
        ctx.fill();
        ctx.stroke();
    }
}

function drawThumb(finger, canvas){
    let startX = finger.xPos;
    let startY = finger.yPos;
    let fingLength = finger.fLen;
    let radius = finger.radius;
    let isRight = finger.isRight;
    
    let radius2 = radius + 9;
    let newY = startY + 9;
    let newBL = bedLength * 1.5;
    
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = handColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        if(isRight){ // The drawing of the top of the thumb- if Right, else left
            ctx.arc(startX-bedLength, startY-radius,radius2,0.5*Math.PI,1.5*Math.PI,false);
            ctx.arc(startX+(newBL),startY-radius, radius2,1.5*Math.PI,0.5*Math.PI,false);
            ctx.moveTo(startX-bedLength,newY);
            ctx.lineTo(startX+(newBL),newY);
            ctx.moveTo(startX-bedLength,newY-(2*radius2));
            ctx.lineTo(startX+(newBL),newY-(2*radius2));
        }else{
            ctx.arc(startX+bedLength, startY-radius,radius2,0.5*Math.PI,1.5*Math.PI,true);
            ctx.arc(startX-(newBL),startY-radius, radius2,1.5*Math.PI,0.5*Math.PI,true);
            ctx.moveTo(startX+bedLength,newY);
            ctx.lineTo(startX-(newBL),newY);
            ctx.moveTo(startX+bedLength,newY-(2*radius2));
            ctx.lineTo(startX-(newBL),newY-(2*radius2));
        }
        ctx.fill();
        ctx.stroke();
        
    }
}

function drawPalm(canvas,isRight){ // Need to get rid of these hard #s- right hand has too much left padding
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        
        ctx.fillStyle = handColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        // The drawing of the palm- if Right, else left
        if(isRight){
            ctx.moveTo(92,100); //Start of top Pinkie
            ctx.bezierCurveTo(85,150,  80,190,  85,200);
            
            ctx.bezierCurveTo(70,270,  60,320,  110,380);
            ctx.bezierCurveTo(120,410, 210,410,  235,400);
            ctx.bezierCurveTo(375,420, 380,380,  405,350); 
            ctx.bezierCurveTo(375,300, 390,260,  380,200);
            
            ctx.bezierCurveTo(385,170, 385,140,  375,70); //Pointer Finger
            ctx.lineTo(315,70);
            ctx.bezierCurveTo(315,70, 308,150,  308,150);
            
            ctx.bezierCurveTo(308,150, 300,60,  300,60); //Middle Finger
            ctx.lineTo(240,60);
            ctx.bezierCurveTo(240,60,225,130,  227,140);
            
            ctx.bezierCurveTo(227,140,217,70,  217,70);
            ctx.lineTo(160,70);
            ctx.bezierCurveTo(160,70,150,150,  151,150);
            
            ctx.bezierCurveTo(151,150,145,100,  145,100);
            ctx.lineTo(92,100);
            
            ctx.fill();
            ctx.stroke();
			
            //Testing out the shading and lines on the hand for future build
            let tempX = 160;
            let tempY = 320;
            
            let grd = ctx.createRadialGradient(tempX,tempY,10,tempX,tempY,70);
            grd.addColorStop(0, handColorHighlight1);
            grd.addColorStop(1, handColorHighlight2);
            
            ctx.fillStyle = grd;
            ctx.arc(tempX,tempY,80,0,2*Math.PI,true);
            ctx.fill();
        }else{ 
            
            ctx.moveTo(495,100);
            ctx.bezierCurveTo(502,150,  507, 190, 502,200);
            ctx.bezierCurveTo(517,270,  527, 320,  477, 380);
            ctx.bezierCurveTo(467,410,  377, 410,  352, 400);
            ctx.bezierCurveTo(212,420,  207, 380,  182, 350);
            ctx.bezierCurveTo(212,300,  197, 260,  207, 200);
            
            
            ctx.bezierCurveTo(202,170,  202, 140,   212,70);
            ctx.lineTo(272, 70);
            ctx.bezierCurveTo(272,70, 279,150,  279,150);
            
            ctx.bezierCurveTo(279,150,  287,60,  287,60);
            ctx.lineTo(347,60);
            ctx.bezierCurveTo(347,60, 362,130,  360,140);
            ctx.bezierCurveTo(360,140, 370,70,  370,70);
            ctx.lineTo(427,70);
            ctx.bezierCurveTo(427,70, 437,150,  438,150);
            ctx.bezierCurveTo(438,150, 444,100,  444,100);
            ctx.lineTo(495,100);
            
            ctx.fill();
            ctx.stroke();
        }
    }
}

function drawHandBackground(canvas, isRight){ //To draw a left or right hand palm/fingers entirely
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        
        ctx.fillStyle = handColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        if(isRight){ // Gives the right hand
            drawPalm(canvas, true);
            drawFinger(rightPinkie, canvas);
            drawFinger(rightRing, canvas);
            drawFinger(rightMiddle, canvas);
            drawFinger(rightPointer, canvas);
            drawThumb(rightThumb, canvas);
        }else{ // Gives the left hand
            drawPalm(canvas, false);
            drawFinger(leftPinkie, canvas);
            drawFinger(leftRing, canvas);
            drawFinger(leftMiddle, canvas);
            drawFinger(leftPointer, canvas);
            drawThumb(leftThumb, canvas);
        }
        ctx.fill();
        ctx.stroke();
    }
}


/*Nail Shape Functions */
function drawNailSquare(finger, canvas){ 
    let startX = finger.xPos;
    let startY = finger.yPos;
    let radius = finger.radius;
    let nPColor = finger.pColor;
    let mod = finger.lMod;
    let thumbTest = finger.isThumb;
    let handednessTest = finger.isRight;
    
    if(canvas.getContext){
        let ctx =canvas.getContext('2d');
        ctx.fillStyle = nPColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        if(thumbTest){
            if(handednessTest){ //Checks true if Right Hand
                ctx.arc(startX,startY-radius, radius, 0.5*Math.PI, 1.5*Math.PI, true);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX-bedLength,startY);
                ctx.lineTo(startX-nLength+mod,startY);
                ctx.lineTo(startX-nLength+mod,startY-(2*radius));
                ctx.lineTo(startX, startY-(2*radius));
            }else{
                ctx.arc(startX,startY-radius,radius, 0.5*Math.PI, 1.5*Math.PI, false);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX+bedLength,startY);
                ctx.lineTo(startX+nLength-mod,startY);
                ctx.lineTo(startX+nLength-mod,startY-(2*radius));
                ctx.lineTo(startX,startY-(2*radius));
            }
        }else{
            ctx.arc(startX+radius, startY, radius, 0, Math.PI, true);
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, startY+bedLength);
            ctx.lineTo(startX, startY+nLength-mod);
            ctx.lineTo(startX+(2*radius), startY+nLength-mod);
            ctx.lineTo(startX+(2*radius), startY);
        }
        ctx.fill();
        ctx.stroke();
    }
} // Complete

function drawNailStiletto(finger,canvas){
    let startX = finger.xPos;
    let startY = finger.yPos;
    let radius = finger.radius;
    let nPColor = finger.pColor;
    let mod = finger.lMod;
    let thumbTest = finger.isThumb;
    let handednessTest = finger.isRight;
    
    if(canvas.getContext){
        var ctx =canvas.getContext('2d');
        
        ctx.fillStyle = nPColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        if(thumbTest){
            if(handednessTest){ //Checks true if Right Hand
                ctx.arc(startX,startY-radius, radius, 0.5*Math.PI, 1.5*Math.PI, true);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX-bedLength,startY);
                ctx.bezierCurveTo(startX-50, startY, startX-nLength+mod, startY-radius, startX-nLength+mod, startY-radius);
                ctx.bezierCurveTo(startX-50, startY-(2*radius), startX-bedLength, startY-(2*radius), startX-bedLength, startY-(2*radius));
                ctx.lineTo(startX, startY-(2*radius));
            }else{
                ctx.arc(startX,startY-radius,radius, 0.5*Math.PI, 1.5*Math.PI, false);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX+bedLength,startY);
                ctx.bezierCurveTo(startX+50,startY,startX+nLength-mod,startY-radius,startX+nLength-mod,startY-radius);
                ctx.bezierCurveTo(startX+50,startY-(2*radius),startX+25,startY-(2*radius),startX+bedLength,startY-(2*radius));
                ctx.lineTo(startX,startY-(2*radius));
            }
        }else{
            ctx.arc(startX+radius, startY, radius, 0, Math.PI, true);
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, startY+bedLength);
            ctx.bezierCurveTo(startX, startY+50, startX+radius, startY+nLength-mod, startX+radius, startY+nLength-mod);
            ctx.bezierCurveTo(startX+(2*radius), startY+50, startX+(2*radius), startY+bedLength, startX+(2*radius), startY+bedLength);
            ctx.lineTo(startX+(2*radius), startY);
        }
        ctx.fill();
        ctx.stroke();
    }
} // Complete

function drawNailSquoval(finger, canvas){} // Do- stiletto base

function drawNailCoffin(finger, canvas){
    let startX = finger.xPos;
    let startY = finger.yPos;
    let radius = finger.radius;
    let nPColor = finger.pColor;
    let mod = finger.lMod;
    let thumbTest = finger.isThumb;
    let handednessTest = finger.isRight;
    
    if(canvas.getContext){
        let ctx =canvas.getContext('2d');
        ctx.fillStyle = nPColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        if(thumbTest){
            if(handednessTest){ //Checks true if Right Hand
                ctx.arc(startX,startY-radius, radius, 0.5*Math.PI, 1.5*Math.PI, true);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX-bedLength,startY);
                ctx.lineTo(startX-nLength+mod,startY-(0.5*radius));
                ctx.lineTo(startX-nLength+mod,startY-(1.5*radius));
                ctx.lineTo(startX-bedLength, startY-(2*radius));
                ctx.lineTo(startX, startY-(2*radius));
            }else{
                ctx.arc(startX,startY-radius,radius, 0.5*Math.PI, 1.5*Math.PI, false);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX+bedLength,startY);
                ctx.lineTo(startX+nLength-mod,startY-(0.5*radius));
                ctx.lineTo(startX+nLength-mod,startY-(1.5*radius));
                ctx.lineTo(startX+bedLength,startY-(2*radius));
                ctx.lineTo(startX,startY-(2*radius));
            }
        }else{
            ctx.arc(startX+radius, startY, radius, 0, Math.PI, true);
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, startY+bedLength);
            ctx.lineTo(startX+(0.5*radius), startY+nLength-mod);
            ctx.lineTo(startX+(1.5*radius),startY +nLength-mod);
            ctx.lineTo(startX+(2*radius), startY+bedLength);
            ctx.lineTo(startX+(2*radius), startY);
        }
        ctx.fill();
        ctx.stroke();
    }
} // Complete

function drawNailRound(finger, canvas){
    let startX = finger.xPos;
    let startY = finger.yPos;
    let radius = finger.radius;
    let nPColor = finger.pColor;
    let mod = finger.lMod;
    let thumbTest = finger.isThumb;
    let handednessTest = finger.isRight;
    
    if(canvas.getContext){
        var ctx =canvas.getContext('2d');
        
        ctx.fillStyle = nPColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        if(thumbTest){
            if(handednessTest){ //Checks true if Right Hand
                ctx.arc(startX,startY-radius, radius, 0.5*Math.PI, 1.5*Math.PI, true);
                ctx.arc(startX-nLength+radius+mod,startY-radius, radius, 1.5*Math.PI, 0.5*Math.PI, true);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX-nLength+radius+mod,startY);
                ctx.moveTo(startX-nLength+radius+mod,startY-(2*radius));
                ctx.lineTo(startX, startY-(2*radius));
            }else{
                ctx.arc(startX,startY-radius,radius, 0.5*Math.PI, 1.5*Math.PI, false);
                ctx.arc(startX+nLength-radius-mod,startY-radius,radius, 1.5*Math.PI, 0.5*Math.PI, false);
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX+nLength-radius-mod,startY);
                ctx.moveTo(startX+nLength-radius-mod,startY-(2*radius));
                ctx.lineTo(startX,startY-(2*radius));
            }
        }else{
            ctx.arc(startX+radius, startY, radius, 0, Math.PI, true);
            ctx.arc(startX+radius, startY+nLength-radius-mod, radius, Math.PI, 0, true);
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, startY+nLength-radius-mod);
            ctx.moveTo(startX+(2*radius), startY+nLength-radius-mod);
            ctx.lineTo(startX+(2*radius), startY);
        }
        ctx.fill();
        ctx.stroke();
    }
    
} // Complete

function drawNailOval(finger, canvas){} // Do-stiletto base
function drawNailEdge(finger, canvas){} // Do-square base
function drawNailFlare(finger, canvas){
    let startX = finger.xPos;
    let startY = finger.yPos;
    let radius = finger.radius;
    let nPColor = finger.pColor;
    let mod = finger.lMod;
    let thumbTest = finger.isThumb;
    let handednessTest = finger.isRight;
    
    if(canvas.getContext){
        let ctx =canvas.getContext('2d');
        ctx.fillStyle = nPColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        if(thumbTest){
            if(handednessTest){ //Checks true if Right Hand
                ctx.arc(startX,startY-radius, radius, 0.5*Math.PI, 1.5*Math.PI, true);
                ctx.moveTo(startX, startY);
                //ctx.lineTo(startX-bedLength,startY);
                ctx.lineTo(startX-nLength+mod,startY+(0.2*radius));
                ctx.lineTo(startX-nLength+mod,startY-(2.2*radius));
                ctx.lineTo(startX, startY-(2*radius));
            }else{
                ctx.arc(startX,startY-radius,radius, 0.5*Math.PI, 1.5*Math.PI, false);
                ctx.moveTo(startX, startY);
                //ctx.lineTo(startX+bedLength,startY);
                ctx.lineTo(startX+nLength-mod,startY+(0.2*radius));
                ctx.lineTo(startX+nLength-mod,startY-(2.2*radius));
                ctx.lineTo(startX,startY-(2*radius));
            }
        }else{
            ctx.arc(startX+radius, startY, radius, 0, Math.PI, true);
            ctx.moveTo(startX, startY);
            //ctx.lineTo(startX, startY+bedLength);
            ctx.lineTo(startX-(0.2*radius), startY+nLength-mod);
            ctx.lineTo(startX+(2.2*radius), startY+nLength-mod);
            ctx.lineTo(startX+(2*radius), startY);
        }
        ctx.fill();
        ctx.stroke();
    }
} // Complete
function drawNailAlmond(finger, canvas){} // Do-stiletto base
function drawNailBevel(finger, canvas){} // Do-square base
function drawNailLipstick(finger, canvas){} // Do-square base
function drawNailMountain(finger, canvas){} // Do-stiletto base

/* Version 2 Code- (delete in version 4)- this was original code, making stiletto shape
function drawVerticleNail(startX, startY, radius, canvas){
    if(canvas.getContext){
        var ctx =canvas.getContext('2d');
        
        ctx.fillStyle = nPColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        ctx.arc(startX+radius, startY, radius, 0, Math.PI, true);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY+25);
        ctx.bezierCurveTo(startX, startY+50, startX+radius, startY+nLength, startX+radius, startY+nLength);
        ctx.bezierCurveTo(startX+(2*radius), startY+50, startX+(2*radius), startY+25, startX+(2*radius), startY+25);
        ctx.lineTo(startX+(2*radius), startY);
        
        ctx.fill();
        ctx.stroke();
    }
}

function drawHorizontalNail(startX, startY, radius, canvas, isRight){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = nPColor;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        
        if(isRight){ // Gives the right handed thumb
            ctx.arc(startX,startY-radius, radius, 0.5*Math.PI, 1.5*Math.PI, true);
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX-25,startY);
            ctx.bezierCurveTo(startX-50, startY, startX-nLength, startY-radius, startX-nLength, startY-radius);
            ctx.bezierCurveTo(startX-50, startY-(2*radius), startX-25, startY-(2*radius), startX-25, startY-(2*radius));
            ctx.lineTo(startX, startY-(2*radius));
            
        }else{ //Gives the left handed thumb
            ctx.arc(startX,startY-radius,radius, 0.5*Math.PI, 1.5*Math.PI, false);
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX+25,startY);
            ctx.bezierCurveTo(startX+50,startY,startX+nLength,startY-radius,startX+nLength,startY-radius);
            ctx.bezierCurveTo(startX+50,startY-(2*radius),startX+25,startY-(2*radius),startX+25,startY-(2*radius));
            ctx.lineTo(startX,startY-(2*radius));
        }
        ctx.fill();
        ctx.stroke();
    }
}
*/
/* Version 1 Code- original setters and listeners using jQuery
function setNailLength(){
	var temp = Number($('#sliderSetNailLength').val());
	//var temp = 40;
	console.log("Temp: " + temp);
	console.log("nLength: " + nLength);
	nLength = temp;
    
	draw();
}

$('#btnSetNailLength').click(function(){
    refreshCanvas();
	setNailLength();
});

var cWidth = 600;
var cHeight = 400;

function refreshCanvas(){
    $('canvas').remove();
    var setSize = '<canvas id="buildDisplay" width="'+cWidth+'" height="'+cHeight+'"></canvas>';
    console.log(setSize);
    //$('#canvasBox').html('<canvas id="tutorial" width="400" height="500"></canvas>');
    $('#canvasBox').html(setSize);
}

$('#btnSetPrimaryColor').click(function(){
    refreshCanvas();
	setPrimaryCanvasColor();
});
$('#btnSetSecondaryColor').click(function(){
    refreshCanvas();
	setSecondaryCanvasColor();
});

function setPrimaryCanvasColor(){
    var temp = $('#color1Choice').val();
    console.log("Color 1 chosen: " + temp);
    nPColor = temp;
    console.log("nPColor set to: " + nPColor);
    draw();
}
function setSecondaryCanvasColor(){
    var temp = $('#color2Choice').val();
    console.log("Color 2 chosen: " + temp);
    nSColor = temp;
    console.log("nSColor set to: " + nPColor);
    draw();
}
*/

/* Setting up the Buttons and Controls */
//Original thought: document.getElementById('clearButton').addEventListener('click',clearCanvas(),false);

function clearCanvas(){
    if(canvas1.getContext){
        let ctx =canvas1.getContext('2d');
        ctx.clearRect(1,1,canvas1.width,canvas1.height);
    }
    if(canvas2.getContext){
        let ctx2 =canvas2.getContext('2d');
        ctx2.clearRect(1,1,canvas2.width,canvas2.height);
    }
}

function setLength(value){
    nLength = Number(value);
    clearCanvas();
    drawAllNails();
}

function setNailShape(value){
    shapeChoice = value;
    clearCanvas();
    drawAllNails();
}

function setSmileChoice(value){
    rightPinkie.smileLine = value;
    rightRing.smileLine = value;
    rightMiddle.smileLine = value;
    rightPointer.smileLine = value;
    rightThumb.smileLine = value;
    leftPinkie.smileLine = value;
    leftRing.smileLine = value;
    leftMiddle.smileLine = value;
    leftPointer.smileLine = value;
    leftThumb.smileLine = value;
    clearCanvas();
    drawAllNails();
}

function setPrimaryColor(value){
    rightPinkie.pColor = value;
    rightRing.pColor = value;
    rightMiddle.pColor = value;
    rightPointer.pColor = value;
    rightThumb.pColor = value;
    leftPinkie.pColor = value;
    leftRing.pColor = value;
    leftMiddle.pColor = value;
    leftPointer.pColor = value;
    leftThumb.pColor = value;
    clearCanvas();
    drawAllNails();
}

var currentFinger = rightPinkie;
function setCurrentFinger(finger){
    switch(finger){
        case 'rightPinkie':
            currentFinger = rightPinkie;
            break;
        case 'rightRing':
            currentFinger = rightRing;
            break;
        case 'rightMiddle':
            currentFinger = rightMiddle;
            break;
        case 'rightPointer':
            currentFinger = rightPointer;
            break;
        case 'rightThumb':
            currentFinger = rightThumb;
            break;
        case 'leftPinkie':
            currentFinger = leftPinkie;
            break;
        case 'leftRing':
            currentFinger = leftRing;
            break;
        case 'leftMiddle':
            currentFinger = leftMiddle;
            break;
        case 'leftPointer':
            currentFinger = leftPointer;
            break;
        case 'leftThumb':
            currentFinger = leftThumb;
            break;
        default:
            currentFinger = rightPinkie;
    }
}

/*End of Methods and Code- Begin Implementation */

/* Version 2 ideas- (delete in Version 4)
//console.log(currentFinger.name);
//correctFingerSetter('rightRing');
//console.log(currentFinger.name);
//drawNailSquare(currentFinger, canvas1);
*/

function drawAllNails(){
    drawHandBackground(canvas1,true);
    drawHandBackground(canvas2,false);
    switch (shapeChoice){
        
        case 'stiletto':
            drawNailStiletto(rightPinkie,canvas1);
            drawNailStiletto(rightRing,canvas1);
            drawNailStiletto(rightMiddle,canvas1);
            drawNailStiletto(rightPointer,canvas1);
            drawNailStiletto(rightThumb,canvas1);
            drawNailStiletto(leftPinkie, canvas2);
            drawNailStiletto(leftRing, canvas2);
            drawNailStiletto(leftMiddle, canvas2);
            drawNailStiletto(leftPointer, canvas2);
            drawNailStiletto(leftThumb, canvas2);
            break;
        case 'square':
            drawNailSquare(rightPinkie,canvas1);
            drawNailSquare(rightRing,canvas1);
            drawNailSquare(rightMiddle,canvas1);
            drawNailSquare(rightPointer,canvas1);
            drawNailSquare(rightThumb,canvas1);
            drawNailSquare(leftPinkie, canvas2);
            drawNailSquare(leftRing, canvas2);
            drawNailSquare(leftMiddle, canvas2);
            drawNailSquare(leftPointer, canvas2);
            drawNailSquare(leftThumb, canvas2);
            break;
        case 'squoval':
            drawNailSquoval(rightPinkie,canvas1);
            drawNailSquoval(rightRing,canvas1);
            drawNailSquoval(rightMiddle,canvas1);
            drawNailSquoval(rightPointer,canvas1);
            drawNailSquoval(rightThumb,canvas1);
            drawNailSquoval(leftPinkie, canvas2);
            drawNailSquoval(leftRing, canvas2);
            drawNailSquoval(leftMiddle, canvas2);
            drawNailSquoval(leftPointer, canvas2);
            drawNailSquoval(leftThumb, canvas2);
            break;
        case 'coffin':
            drawNailCoffin(rightPinkie,canvas1);
            drawNailCoffin(rightRing,canvas1);
            drawNailCoffin(rightMiddle,canvas1);
            drawNailCoffin(rightPointer,canvas1);
            drawNailCoffin(rightThumb,canvas1);
            drawNailCoffin(leftPinkie, canvas2);
            drawNailCoffin(leftRing, canvas2);
            drawNailCoffin(leftMiddle, canvas2);
            drawNailCoffin(leftPointer, canvas2);
            drawNailCoffin(leftThumb, canvas2);
            break;
        case 'round':
            drawNailRound(rightPinkie,canvas1);
            drawNailRound(rightRing,canvas1);
            drawNailRound(rightMiddle,canvas1);
            drawNailRound(rightPointer,canvas1);
            drawNailRound(rightThumb,canvas1);
            drawNailRound(leftPinkie, canvas2);
            drawNailRound(leftRing, canvas2);
            drawNailRound(leftMiddle, canvas2);
            drawNailRound(leftPointer, canvas2);
            drawNailRound(leftThumb, canvas2);
            break;
        case 'oval':
            drawNailOval(rightPinkie,canvas1);
            drawNailOval(rightRing,canvas1);
            drawNailOval(rightMiddle,canvas1);
            drawNailOval(rightPointer,canvas1);
            drawNailOval(rightThumb,canvas1);
            drawNailOval(leftPinkie, canvas2);
            drawNailOval(leftRing, canvas2);
            drawNailOval(leftMiddle, canvas2);
            drawNailOval(leftPointer, canvas2);
            drawNailOval(leftThumb, canvas2);
            break;
        case 'edge':
            drawNailEdge(rightPinkie,canvas1);
            drawNailEdge(rightRing,canvas1);
            drawNailEdge(rightMiddle,canvas1);
            drawNailEdge(rightPointer,canvas1);
            drawNailEdge(rightThumb,canvas1);
            drawNailEdge(leftPinkie, canvas2);
            drawNailEdge(leftRing, canvas2);
            drawNailEdge(leftMiddle, canvas2);
            drawNailEdge(leftPointer, canvas2);
            drawNailEdge(leftThumb, canvas2);
            break;
        case 'flare':
            drawNailFlare(rightPinkie,canvas1);
            drawNailFlare(rightRing,canvas1);
            drawNailFlare(rightMiddle,canvas1);
            drawNailFlare(rightPointer,canvas1);
            drawNailFlare(rightThumb,canvas1);
            drawNailFlare(leftPinkie, canvas2);
            drawNailFlare(leftRing, canvas2);
            drawNailFlare(leftMiddle, canvas2);
            drawNailFlare(leftPointer, canvas2);
            drawNailFlare(leftThumb, canvas2);
            break;
        case 'almond':
            drawNailAlmond(rightPinkie,canvas1);
            drawNailAlmond(rightRing,canvas1);
            drawNailAlmond(rightMiddle,canvas1);
            drawNailAlmond(rightPointer,canvas1);
            drawNailAlmond(rightThumb,canvas1);
            drawNailAlmond(leftPinkie, canvas2);
            drawNailAlmond(leftRing, canvas2);
            drawNailAlmond(leftMiddle, canvas2);
            drawNailAlmond(leftPointer, canvas2);
            drawNailAlmond(leftThumb, canvas2);
            break;
        case 'bevel':
            drawNailBevel(rightPinkie,canvas1);
            drawNailBevel(rightRing,canvas1);
            drawNailBevel(rightMiddle,canvas1);
            drawNailBevel(rightPointer,canvas1);
            drawNailBevel(rightThumb,canvas1);
            drawNailBevel(leftPinkie, canvas2);
            drawNailBevel(leftRing, canvas2);
            drawNailBevel(leftMiddle, canvas2);
            drawNailBevel(leftPointer, canvas2);
            drawNailBevel(leftThumb, canvas2);
            break;
        case 'lipstick':
            drawNailLipstick(rightPinkie,canvas1);
            drawNailLipstick(rightRing,canvas1);
            drawNailLipstick(rightMiddle,canvas1);
            drawNailLipstick(rightPointer,canvas1);
            drawNailLipstick(rightThumb,canvas1);
            drawNailLipstick(leftPinkie, canvas2);
            drawNailLipstick(leftRing, canvas2);
            drawNailLipstick(leftMiddle, canvas2);
            drawNailLipstick(leftPointer, canvas2);
            drawNailLipstick(leftThumb, canvas2);
            break;
        case 'mountain':
            drawNailMountain(rightPinkie,canvas1);
            drawNailMountain(rightRing,canvas1);
            drawNailMountain(rightMiddle,canvas1);
            drawNailMountain(rightPointer,canvas1);
            drawNailMountain(rightThumb,canvas1);
            drawNailMountain(leftPinkie, canvas2);
            drawNailMountain(leftRing, canvas2);
            drawNailMountain(leftMiddle, canvas2);
            drawNailMountain(leftPointer, canvas2);
            drawNailMountain(leftThumb, canvas2);
            break;
        default:
            //
            break;
    }
    
    drawSmileLine(rightPinkie, canvas1);
    drawSmileLine(rightRing, canvas1);
    drawSmileLine(rightMiddle, canvas1);
    drawSmileLine(rightPointer, canvas1);
    drawSmileLine(rightThumb, canvas1);
    
    drawSmileLine(leftPinkie,canvas2);
    drawSmileLine(leftRing,canvas2);
    drawSmileLine(leftMiddle,canvas2);
    drawSmileLine(leftPointer,canvas2);
    drawSmileLine(leftThumb,canvas2);
}

drawAllNails();
