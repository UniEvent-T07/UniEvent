export const roleLabels = {
  ATTENDEE: "Người tham dự",
  ORGANISER: "Người tổ chức",
  APPROVER: "Người duyệt",
  CHECKER: "Người soát vé",
  ADMINISTRATOR: "Quản trị viên",
} as const;

export const scopeLabels = {
  CLUB: "CLB",
  APPROVAL_UNIT: "Đơn vị duyệt",
  EVENT: "Sự kiện",
} as const;

export type RoleAssignment = {
  role: keyof typeof roleLabels;
  scopeType: keyof typeof scopeLabels | null;
  scopeId: string | null;
};
