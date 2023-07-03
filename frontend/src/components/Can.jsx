import { useAuthStore } from '../stores/auth';
import { PermissionSubject } from '../utils/permissions';

const fieldFromSubject = subject =>
  (subject === PermissionSubject.Transaction ? 'permissionTransactions'
    : subject === PermissionSubject.Post ? 'permissionPosts'
    : subject === PermissionSubject.Comment ? 'permissionComments'
    : subject === PermissionSubject.User ? 'permissionUsers'
    : subject === PermissionSubject.Role ? 'permissionRoles'
    : null);

export default function Can({
  perform: permission,
  on: subject,
  yes,
  no,
}) {
  const user = useAuthStore((state) => state.user);


  const field = fieldFromSubject(subject);
  if (!field)
    throw new Error('Invalid permission subject');

  return <>
    {user.roles.some(role => role[field] & permission)
      ? yes
      : no}
  </>;
}
