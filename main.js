const { app, BrowserWindow, Menu, shell, ipcMain} = require('electron');
const path = require('path');
const menuItems = [
    {
        label:"File",
        submenu:[
           { label: "New file"},
           { label: "New Folder"},
           { type: "separator"},
           { label:"save"},
           { role: "redo"}
           
        ],
        

    },
    {
        label:"Edit",
        submenu:[
            { role:'cut'},
            { role:"copy"}
        ]

    },
    { 
        label:"learn more",
        click: () =>{  shell.openExternal("htt")}
       
    },
   
    {
        label:"window",
        submenu:[
            {
                label:"New Windows",
                click: async() =>{
                  const win2 = new BrowserWindow({
                            height:300,
                            width:400,      
                        
                    });
              win2.webContents.openDevTools()
              win2.loadFile('index.html')
                }
                
            },
            {
                label:"open camera",
                click: async () => {
                    const cameraScreen = new BrowserWindow({
                        height:400,
                        width:800,
                        background:"blue",
                        show:false,
                        webPreferences: {
      preload: path.join(__dirname, 'cameraPreload.js')
    }
     });
      ipcMain.on('close-window-camera', ()=> cameraScreen.close());

                    cameraScreen.webContents.openDevTools();
                    cameraScreen.loadFile("camera.html");
                    cameraScreen.once('ready-to-show',() => cameraScreen.show());   

                }
            },
            {
                role:"minimize"
            },
            {
                role:"close"
            }

        ]
       
    }

];
const menu = Menu.buildFromTemplate(menuItems)
Menu.setApplicationMenu(menu)
const createWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height:600,
        opacity:0.5,
        webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
    })

    ipcMain.on('set-image', (event, data) => {
        win.webContents.send("get-image", data)
    });

    win.webContents.openDevTools();
    win.loadFile('index.html')
};

app.whenReady().then(() => {
  createWindow()
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})