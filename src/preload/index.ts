import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
interface IExposedAPI {
  getMouseDisplay: () => Electron.Display
  getAvailableDisplays: () => Electron.Display[]
  getDisplayStream: (display: number | Electron.Display) => string
  onGlobalMouseMove: (callback: (event: Electron.IpcRendererEvent) => void) => void
}
const api: IExposedAPI = {
  // Function to get the screen where the mouse is located
  // getMouseDisplay: () => {
  //   const point = screen.getCursorScreenPoint()
  //   return screen.getDisplayNearestPoint(point)
  // },
  // get-mouse-screen event is handled in the main process
  getMouseDisplay: () => ipcRenderer.sendSync('get-mouse-screen'),
  getAvailableDisplays: () => ipcRenderer.sendSync('get-available-displays'),
  getDisplayStream: (display: number | Electron.Display) => ipcRenderer.sendSync('get-display-stream', display),
  onGlobalMouseMove: (callback) => ipcRenderer.on('global-mousemove', callback)
}

// Use `contextBridge` APIs to expose Electron APIs to renderer only if context isolation is enabled, otherwise just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI) // Exposes existing electronAPI
    contextBridge.exposeInMainWorld('api', api) // Now also exposes your custom API including screen capture and detection
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api // Make sure your custom API is also available when context isolation is not enabled
}
