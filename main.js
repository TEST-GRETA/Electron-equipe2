const { app, BrowserWindow, Menu, ipcMain } = require('electron')

// include the Node.js 'path' module at the top of your file
const path = require('path')

const isMac = process.platform === 'darwin'

let mainWindow;
let addWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  // Ajout
  var jsonObj = {utilisateurs: [
    {
      "id":1,
      "nom":"Sommelet",
      "prenom":"stephan",
      "datenaissance":"20/03/1971",
      "adresse":"10 rue de React",
      "codepostal":"21300",
      "numerotel":"06.69.66.15.82",
      "email":"ssommelet21@gmail.com",
      "securitesociale":"1 69 05 49 588 157 80"
    },
    {
      "id":2,
      "nom":"Gomez",
      "prenom":"Jérome",
      "datenaissance":"20/03/1983",
      "adresse":"20 rue de GRETA",
      "codepostal":"21000",
      "numerotel":"06.59.36.25.92",
      "email":"jerome@gmail.com",
      "securitesociale":"1 83 05 49 588 157 80"
    },
    {
      "id":3,
      "nom":"Doe",
      "prenom":"John",
      "datenaissance":"09/07/1987",
      "adresse":"40 Rue de la LIberté",
      "codepostal":"21000",
      "numerotel":"07.45.14.44.19",
      "email":"john@doe.com",
      "securitesociale":"1 87 07 21 126 147 20"
    },
    {
      "id":4,
      "nom":"Shiny",
      "prenom":"Ema",
      "datenaissance":"07/12/1989",
      "adresse":"15 Rue des Godrans",
      "codepostal":"21000",
      "numerotel":"07.54.41.34.29",
      "email":"ema@gmail.com",
      "securitesociale":"1 89 12 21 326 247 20"
    }
  ]};
    var html = jsonObj.utitdsateurs.map(o => {
      return `<tr>
      <td>${o.id}</td>
      <td>${o.nom}</td>
      <td>${o.prenom}</td>
      <td>${o.datenaissance}</td>
      <td>${o.adresse}</td>
      <td>${o.codepostal}</td>
      <td>${o.numerotel}</td>
      <td>${o.email}</td>
      <td>${o.securitesociale}</td>
    </tr>`
    });
  
  document.getElementById("id_tbody").innerHTML = html.join("");
  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  !isMac && mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
})

app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 600,
    height: 700,
    title: "Ajouter un nouvel utilisateur",
    // frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  addWindow.loadURL(`file://${__dirname}/add.html`);
}

ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
});

const menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: "Nouvel utilisateur", accelerator: "Ctrl+N",
        click() { createAddWindow(); },
      },
      isMac ? { role: 'close', accelerator: "Command+Q" } : { role: 'quit', accelerator: "Ctrl+Q" },
      // {
      //   label: "Réinitialise la liste", accelerator: "Ctrl+R",
      //   click() {
      //     mainWindow.webContents.send("todo:clear")
      //   }
      // }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

