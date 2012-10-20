# nPM

nPM github page. [nPM](http://solar4.ssu.ac.kr:8080) service.

nPM is an open source project management system. methods including:

  * **nPMCore** - Framework, Database, Web, Service, Mobile, Security.
  * **nPMService** - Project Management, Gantt Chart, Mind Map
  * **nPMMobile** - Create iOS, Android, hybrid, and mobile web apps from The Titanium.
  * **nPMWeb** - nPM web page, Open ID (Facebook)
  * **nPMDesign** - nPM Web, Mobile icon and photo.

## Install
There are a few different ways you can install nPM:

* Download the zipfile from the [downloads](http://npmbynpm.github.com/nPM) page and install it. 
* Checkout the source: "git clone https://github.com/nPMbynPM/nPM.git" and install it yourself.
   
## Getting Started
 * Install nPM
 

## Examples
*All examples on nPM API*

HTML5 Canvas drawing HTML:

    <canvas id="canvasId" width="800" height="600"></canvas>
    var context = document.getElementById("canvasId").getContext("2d");

HTML5 Canvas drawing JS:

    var context = document.getElementById("canvasId").getContext("2d");
    // Draw a path
    context.beginPath();
    context.moveTo(padding + width/2, padding);        // Top Corner
    context.lineTo(padding + width, height + padding); // Bottom Right
    context.lineTo(padding, height + padding);         // Bottom Left
    context.closePath();

    // Fill the path
    context.fillStyle = "#ffc821";
    context.fill();

Database Connection:

    mysql jdbc: "org.gjt.mm.mysql.Driver"; 
    oracle jdbc: "oracle.jdbc.driver.OracleDriver";

Titaninum property:

    var goUserHome = function(site) {
    document.location.href = site;
    };

Mail push service:

    using post method
    parameter name is "mailAddress"
    
    //For example
    http://solar4.ssu.ac.kr:8080?mailAddress=test@gmail.com    


![alt text](http://2.bp.blogspot.com/-c4Wzf-Ff4c8/T3ENzYRc6EI/AAAAAAAABPQ/gHO9Bw09Q-s/s1600/Alyssa-Cartwheel.gif "funny nPM")
