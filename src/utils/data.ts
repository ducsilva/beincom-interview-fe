import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  UserCircleIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { EMenuType, EnumTabs } from "./constants";

export const profileMenuItems = [
  {
    label: "",
    icon: UserCircleIcon,
    type: EMenuType.profile,
  },
  {
    label: "Daily Missions",
    icon: Cog6ToothIcon,
    type: EMenuType.dailyMissions,
  },
  {
    label: "Manage Content",
    icon: InboxArrowDownIcon,
    type: EMenuType.manageContent,
  },
  {
    label: "Setting & Privacy",
    icon: Cog6ToothIcon,
    type: EMenuType.settings,
  },
  {
    label: "Log Out",
    icon: PowerIcon,
    type: EMenuType.logout,
  },
];

export const ArrayTabs = [
  {
    icon: HomeIcon,
    value: EnumTabs.home,
  },
  {
    icon: UserGroupIcon,
    value: EnumTabs.community,
  },
];
