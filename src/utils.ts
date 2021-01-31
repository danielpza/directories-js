import { homedir } from "os";
import { resolve } from "path";

export const extraEnv = {} as Record<string, string>;

export function parseUserDirs(content: string): [string, string][] {
  // TODO support absolute paths
  return content
    .split("\n")
    .map((s) => s.match(/^XDG_(\w+)_DIR="\$HOME\/(.+)"$/))
    .filter((p): p is RegExpMatchArray => p !== null)
    .map((match) => [match[1], match[2]]);
}

export function homerel(...paths: string[]) {
  return resolve(homedir(), ...paths);
}

export function envrel(env: string, ...paths: string[]) {
  const val = extraEnv[env] ?? process.env[env];
  if (val) {
    return resolve(val, ...paths);
  }
  return null;
}

export const isWin = () => process.platform === "win32";
export const isMac = () => process.platform === "darwin";
