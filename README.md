# Stage Retriever

Stage Retriever is a way for you to share multiple screens at once to any meeting app, this way you can focus on what you are presenting and you will not have to bring each window to the screen you initially choose to share.

Stage Retriever runs thanks to Electron so theoretically supports Linux, Windows and maybe MacOS.

Note: Stage Retriever is in it's early stages (no pun intended) right now and has been tested on windows only, it should work on Linux, I will test on Ubuntu specifically it as soon as I can, MacOS will not be officially supported, build it yourself and see if it runs or choose a better platform, one that is at least easy to virtualize, otherwise you can donate a Mac, I don't mind.

# Usage
- If possible, designate a virtual desktop for Stage Retriever and your favorite meeting app, they must be in the same one.
- Open Stage Retriever
- Make Stage Retriever full screen, possibly by pressing F11 to get the full resolution and hide the window bar
- share the Stage Retriever window from your meeting app, if window sharing unavailable remember that Stage Retriever will keep working as long as you do not reduce it to icon.

Stage Retriever will now follow your mouse and show the screen its on


## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

note: I might remove Prettier for this project and use just ESLint as formatter, Prettier works awfully with ESLint honestly.

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows (Tested, works just fine)
$ npm run build:win

# For macOS (maybe works, dunno)
$ npm run build:mac

# For Linux (needs testing)
$ npm run build:linux
```
