import { status, priorities } from "./enums";

export const priorityList = [
    { label: 'Priority', value: null },
    { label: priorities.p0, value: priorities.p0 },
    { label: priorities.p1, value: priorities.p1 },
    { label: priorities.p2, value: priorities.p2 },
];

export const statusList = [
    { label: status.pending, value: status.pending },
    { label: status.inProgress, value: status.inProgress },
    { label: status.completed, value: status.completed },
    { label: status.deployed, value: status.deployed },
    { label: status.deffred, value: status.deffred },
];