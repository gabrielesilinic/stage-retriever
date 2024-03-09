import { app, shell, BrowserWindow, ipcMain, screen, desktopCapturer } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    frame: true,
    titleBarStyle: 'default',
    titleBarOverlay: true,
    autoHideMenuBar: true,
    maximizable: true,
    resizable: true,
    fullscreenable: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      backgroundThrottling: false,
    },
    paintWhenInitiallyHidden: true,

  })
  // get mouse screen handler
  ipcMain.on('get-mouse-screen', (event) => {
    const point = screen.getCursorScreenPoint()
    event.returnValue = screen.getDisplayNearestPoint(point)
  })
  ipcMain.on('get-available-displays', (event) => {
    event.returnValue = screen.getAllDisplays()
  })
  // get display stream from desktopCapturer
  ipcMain.on('get-display-stream', (event, display: number|Electron.Display) => {
    const displayId = typeof display === 'number' ? display : display.id
    desktopCapturer.getSources({ types: ['screen'] }).then(async (sources) => {
      for (const source of sources) {
        if (source.display_id === displayId.toString()) {
          event.returnValue = source.id
          return
        }
      }
      event.returnValue = null
    })
  })
  let lastPosition: Electron.Point = { x: 0, y: 0 }
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    setInterval(() => {
      const currentPosition = screen.getCursorScreenPoint()

      // Check if the mouse has moved
      if (currentPosition.x !== lastPosition.x || currentPosition.y !== lastPosition.y) {
        mainWindow.webContents.send('global-mousemove', currentPosition)
        // Update last known position
        lastPosition = currentPosition
      }
    }, 200)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
