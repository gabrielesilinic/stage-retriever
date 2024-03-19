# Stage Retriever

Stage Retriever is a way for you to share multiple screens at once to any meeting app, this way you can focus on what you are presenting and you will not have to bring each window to the screen you initially choose to share.

<p align="center">
  <img width="300" alt="Stage Retriever Logo" src="./resources/stage-retriever.svg"/>
</p>

Stage Retriever runs thanks to Electron, despite this I unfortunately encountered limitations when it comes to recording all screens at the same time on platforms other than Windows, so Windows will be for now the only one that is officially supported for now, but you are free to create an issue to add support for your favorite operating system for the currently default recording mode (an experimental transparent window mode may come).

# Usage
- If possible, designate a virtual desktop for Stage Retriever and your favorite meeting app, they must be in the same one.
- Open Stage Retriever
- Make Stage Retriever full screen, possibly by pressing F11 to get the full resolution and hide the window bar
- share the Stage Retriever window (using precisely window sharing functionality) from your meeting app, if window sharing or virtual desktops are unavailable remember that Stage Retriever will keep working as long as you do not reduce it to icon, though depending on the case you may have to sacrifice a screen.

Stage Retriever will now follow your mouse and show the screen its on

## Known issues
- it Won't work with Microsoft Edge across virtual desktops likely due to optimisations implemented by Microsoft we cannot turn off.

## Stage retriever is known to work with
- Google Chrome (and any web app running inside it)
- Mozilla Firefox (and any web app running inside it)
- Microsoft Teams

anything else should work as well, I just don't know if it does.

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
# For windows
$ npm run build:win
```
