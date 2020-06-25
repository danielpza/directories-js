import { homedir } from "os";
import { envrel, homerel, isMac, isWin } from "./utils";

type Resolver = () => string | null;

interface BaseDirs {
  home: Resolver;
  cache: Resolver;
  config: Resolver;
  data: Resolver;
  dataLocal: Resolver;
  executable: Resolver;
  preference: Resolver;
  runtime: Resolver;
}

const baseDirsWindows: BaseDirs = {
  home: () => process.env.FOLDERID_Profile!,
  cache: () => process.env.FOLDERID_LocalAppData!,
  config: () => process.env.FOLDERID_RoamingAppData!,
  data: () => process.env.FOLDERID_RoamingAppData!,
  dataLocal: () => process.env.FOLDERID_LocalAppData!,
  executable: () => null,
  preference: () => process.env.FOLDERID_RoamingAppData!,
  runtime: () => null,
};

const baseDirsMac: BaseDirs = {
  home: () => homedir(),
  cache: () => homerel("Library/Caches"),
  config: () => homerel("Library/Application Support"),
  data: () => homerel("Library/Application Support"),
  dataLocal: () => homerel("Library/Application Support"),
  executable: () => null,
  preference: () => homerel("Library/Preferences"),
  runtime: () => null,
};

const baseDirsLinux: BaseDirs = {
  home: () => homedir(),
  cache: () => envrel("XDG_CACHE_HOME") || homerel(".cache"),
  config: () => envrel("XDG_CONFIG_HOME") || homerel(".config"),
  data: () => envrel("XDG_DATA_HOME") || homerel(".local/share"),
  dataLocal: () => envrel("XDG_DATA_HOME") || homerel(".local/share"),
  executable: () =>
    envrel("XDG_BIN_HOME", "../bin") ||
    envrel("XDG_DATA_HOME", "../bin") ||
    homerel(".local/bin"),
  preference: () => envrel("XDG_CONFIG_HOME") || homerel(".config"),
  runtime: () => envrel("XDG_RUNTIME_DIR"),
};

export const baseDirs = isWin()
  ? baseDirsWindows
  : isMac()
  ? baseDirsMac
  : baseDirsLinux;
