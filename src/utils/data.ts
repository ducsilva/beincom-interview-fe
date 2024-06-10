import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  UserCircleIcon,
  HomeIcon,
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { EActionType, EMenuType, EnumTabs } from "./constants";

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

export const commentMenuItems = [
  {
    label: "Edit comment",
    icon: PencilIcon,
    type: EActionType.update,
  },
  {
    label: "Delete Comment",
    icon: TrashIcon,
    type: EActionType.delete,
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
