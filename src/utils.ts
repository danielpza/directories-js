import { homedir } from "os";
import { resolve } from "path";

export function homerel(...paths: string[]) {
  return resolve(homedir(), ...paths);
}

export function envrel(env: string, ...paths: string[]) {
  const val = process.env[env];
  if (val) {
    return resolve(val, ...paths);
  }
  return null;
}

export const isWin = () => process.platform === "win32";
export const isMac = () => process.platform === "darwin";
