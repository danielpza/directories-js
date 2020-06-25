import { envrel, homerel, isMac, isWin } from "./utils";

type Resolver = (project: string) => string | null;

interface ProjectDirs {
  cache: Resolver;
  config: Resolver;
  data: Resolver;
  dataLocal: Resolver;
  preference: Resolver;
  runtime: Resolver;
}

interface Project {
  qualifier: string;
  organization: string;
  application: string;
}

type ProjectOrString = Project | string;

export function projectToString({
  qualifier,
  organization,
  application,
}: Project) {
  if (isWin()) {
    return organization + "/" + application;
  } else if (isMac()) {
    return (
      qualifier +
      "." +
      organization.replace(/ /g, "-") +
      "." +
      application.replace(/ /g, "-")
    );
  } else {
    return application.toLowerCase().replace(/ /g, "");
  }
}

function forceProjectToString(project: ProjectOrString) {
  return typeof project === "string" ? project : projectToString(project);
}

const projectDirsWin: ProjectDirs = {
  cache: (project: ProjectOrString) =>
    envrel("FOLDERID_LocalAppData", forceProjectToString(project), "cache"),
  config: (project: ProjectOrString) =>
    envrel("FOLDERID_RoamingAppData", forceProjectToString(project), "config"),
  data: (project: ProjectOrString) =>
    envrel("FOLDERID_RoamingAppData", forceProjectToString(project), "data"),
  dataLocal: (project: ProjectOrString) =>
    envrel("FOLDERID_LocalAppData", forceProjectToString(project), "data"),
  preference: (project: ProjectOrString) =>
    envrel("FOLDERID_RoamingAppData", forceProjectToString(project), "config"),
  runtime: (_project: ProjectOrString) => null,
};

const projectDirsMac: ProjectDirs = {
  cache: (project: ProjectOrString) =>
    homerel("Library", "Caches", forceProjectToString(project)),
  config: (project: ProjectOrString) =>
    homerel("Library", "Application Support", forceProjectToString(project)),
  data: (project: ProjectOrString) =>
    homerel("Library", "Application Support", forceProjectToString(project)),
  dataLocal: (project: ProjectOrString) =>
    homerel("Library", "Application Support", forceProjectToString(project)),
  preference: (project: ProjectOrString) =>
    homerel("Library", "Preferences", forceProjectToString(project)),
  runtime: (_project: ProjectOrString) => null,
};

const projectDirsLinux: ProjectDirs = {
  cache: (project: ProjectOrString) =>
    envrel("XDG_CACHE_HOME", forceProjectToString(project)) ||
    homerel(".cache", forceProjectToString(project)),
  config: (project: ProjectOrString) =>
    envrel("XDG_CONFIG_HOME", forceProjectToString(project)) ||
    homerel(".config", forceProjectToString(project)),
  data: (project: ProjectOrString) =>
    envrel("XDG_DATA_HOME", forceProjectToString(project)) ||
    homerel(".local/share", forceProjectToString(project)),
  dataLocal: (project: ProjectOrString) =>
    envrel("XDG_DATA_HOME", forceProjectToString(project)) ||
    homerel(".local/share", forceProjectToString(project)),
  preference: (project: ProjectOrString) =>
    envrel("XDG_CONFIG_HOME", forceProjectToString(project)) ||
    homerel(".config", forceProjectToString(project)),
  runtime: (project: ProjectOrString) =>
    envrel("XDG_RUNTIME_DIR", forceProjectToString(project)),
};

export const projectDirs = isWin()
  ? projectDirsWin
  : isMac()
  ? projectDirsMac
  : projectDirsLinux;
