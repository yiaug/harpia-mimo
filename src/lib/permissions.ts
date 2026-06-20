export enum UserRole {
  VISITOR = 'visitor',
  USER = 'user',
  VERIFIED_MEMBER = 'verified_member',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum Permission {
  VIEW_BOOKS = 'books:view',
  READ_BOOKS = 'books:read',
  RATE_BOOKS = 'books:rate',
  BOOKMARK_BOOKS = 'books:bookmark',
  CREATE_BOOK = 'books:create',
  EDIT_BOOK = 'books:edit',
  DELETE_BOOK = 'books:delete',

  VIEW_FORUM = 'forum:view',
  CREATE_POST = 'forum:post:create',
  EDIT_OWN_POST = 'forum:post:edit:own',
  DELETE_OWN_POST = 'forum:post:delete:own',
  EDIT_ANY_POST = 'forum:post:edit:any',
  DELETE_ANY_POST = 'forum:post:delete:any',
  VOTE = 'forum:vote',
  CREATE_COMMENT = 'forum:comment:create',
  EDIT_OWN_COMMENT = 'forum:comment:edit:own',
  DELETE_OWN_COMMENT = 'forum:comment:delete:own',
  DELETE_ANY_COMMENT = 'forum:comment:delete:any',

  VIEW_COMMUNITIES = 'communities:view',
  JOIN_COMMUNITY = 'communities:join',
  CREATE_COMMUNITY = 'communities:create',
  EDIT_COMMUNITY = 'communities:edit',
  DELETE_COMMUNITY = 'communities:delete',

  VIEW_CHAT = 'chat:view',
  SEND_MESSAGE = 'chat:message:send',
  EDIT_OWN_MESSAGE = 'chat:message:edit:own',
  DELETE_OWN_MESSAGE = 'chat:message:delete:own',
  DELETE_ANY_MESSAGE = 'chat:message:delete:any',
  JOIN_VOICE = 'chat:voice:join',
  CREATE_VOICE_CHANNEL = 'chat:voice:create',
  DELETE_VOICE_CHANNEL = 'chat:voice:delete',

  VIEW_TAROT = 'tarot:view',
  USE_TAROT = 'tarot:use',
  MANAGE_TAROT = 'tarot:manage',

  MANAGE_USERS = 'admin:users',
  MANAGE_ROLES = 'admin:roles',
  VIEW_AUDIT_LOGS = 'admin:logs',
  MANAGE_SYSTEM = 'admin:system',
}

const visitorPermissions: Permission[] = [
  Permission.VIEW_BOOKS,
  Permission.VIEW_FORUM,
  Permission.VIEW_COMMUNITIES,
  Permission.VIEW_TAROT,
]

const userPermissions: Permission[] = [
  ...visitorPermissions,
  Permission.READ_BOOKS,
  Permission.BOOKMARK_BOOKS,
  Permission.CREATE_POST,
  Permission.EDIT_OWN_POST,
  Permission.DELETE_OWN_POST,
  Permission.VOTE,
  Permission.CREATE_COMMENT,
  Permission.EDIT_OWN_COMMENT,
  Permission.DELETE_OWN_COMMENT,
  Permission.JOIN_COMMUNITY,
  Permission.VIEW_CHAT,
  Permission.SEND_MESSAGE,
  Permission.EDIT_OWN_MESSAGE,
  Permission.DELETE_OWN_MESSAGE,
  Permission.USE_TAROT,
]

const verifiedMemberPermissions: Permission[] = [
  ...userPermissions,
  Permission.RATE_BOOKS,
  Permission.CREATE_VOICE_CHANNEL,
]

const moderatorPermissions: Permission[] = [
  ...verifiedMemberPermissions,
  Permission.CREATE_BOOK,
  Permission.EDIT_ANY_POST,
  Permission.DELETE_ANY_POST,
  Permission.DELETE_ANY_COMMENT,
  Permission.CREATE_COMMUNITY,
  Permission.DELETE_ANY_MESSAGE,
  Permission.VIEW_AUDIT_LOGS,
]

const adminPermissions: Permission[] = [
  ...moderatorPermissions,
  Permission.EDIT_BOOK,
  Permission.DELETE_BOOK,
  Permission.EDIT_COMMUNITY,
  Permission.DELETE_COMMUNITY,
  Permission.DELETE_VOICE_CHANNEL,
  Permission.MANAGE_USERS,
  Permission.MANAGE_TAROT,
]

const superAdminPermissions: Permission[] = [
  ...adminPermissions,
  Permission.MANAGE_ROLES,
  Permission.MANAGE_SYSTEM,
]

const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.VISITOR]: visitorPermissions,
  [UserRole.USER]: userPermissions,
  [UserRole.VERIFIED_MEMBER]: verifiedMemberPermissions,
  [UserRole.MODERATOR]: moderatorPermissions,
  [UserRole.ADMIN]: adminPermissions,
  [UserRole.SUPER_ADMIN]: superAdminPermissions,
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p))
}
