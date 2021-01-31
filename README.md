# directories

https://github.com/dirs-dev/directories-rs for javascript

## Installation

not yet in npm packages, install from github:

```js
npm i https://github.com/danielpza/directories-js
```

## Usage

```typescript
import { baseDirs, userDirs, projectDirs } from "directories-js";

baseDirs.home();
baseDirs.cache();
baseDirs.config();
baseDirs.data();
baseDirs.dataLocal();
baseDirs.executable();
baseDirs.preference();
baseDirs.runtime();

userDirs.home();
userDirs.audio();
userDirs.desktop();
userDirs.document();
userDirs.download();
userDirs.font();
userDirs.picture();
userDirs.public();
userDirs.template();
userDirs.video();

const project = {
  qualifier: "org",
  organization: "Baz Corp",
  application: "Foo Bar-App",
};
// or const project = "baz-corp/foo-bar-app";
projectDirs.cache(project);
projectDirs.config(project);
projectDirs.data(project);
projectDirs.dataLocal(project);
projectDirs.preference(project);
projectDirs.runtime(project);
```
