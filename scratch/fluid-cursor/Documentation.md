# **💦 Fluid Cursor Pro**

A high-performance, WebGL-based fluid simulation cursor effect. Add premium, liquid-like interactivity to your website in seconds.

## **✨ Features**

* **Zero Dependencies:** Pure JavaScript, no heavy frameworks.  
* **High Performance:** Runs on WebGL2 for buttery smooth 60FPS.  
* **Fully Customizable:** Control colors, splash force, radius, and more.  
* **Framework Agnostic:** Works with React, Vue, Svelte, or plain HTML.

## **🚀 Installation**

### **Option 1: Using NPM (Terminal)**

If you are building a modern app (React, Next.js, Vite), install via terminal:

npm install fluid-cursor-pro

Then import it in your code:

import FluidCursor from 'fluid-cursor-pro';

// Initialize  
new FluidCursor();

### **Option 2: HTML Script Tag (Classic)**

Simply download fluid-cursor.js and add it to your project:

\<script src="./path/to/fluid-cursor.js"\>\</script\>  
\<script\>  
    new FluidCursor({  
        color: { r: 1.0, g: 0.2, b: 0.5 }, // Custom RGB color  
        SPLAT\_FORCE: 5000  
    });  
\</script\>

## **⚙️ Configuration**

| Option | Default | Description |  
| color | {r:0, g:0, b:0} | The color of the fluid splash. |  
| SPLAT\_FORCE | 6000 | How hard the fluid splashes on movement. |  
| SPLAT\_RADIUS | 0.25 | The size of the splash point. |  
| SIM\_RESOLUTION | 128 | Resolution of the physics simulation (Lower \= faster). |

## **📜 License**

Copyright © 2025 Asagi. All rights reserved.  
This software is for personal or commercial use by the purchaser only. Redistribution is prohibited.