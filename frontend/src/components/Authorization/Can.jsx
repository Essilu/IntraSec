import { useAuthStore } from '../../stores/auth';
import { can } from '../../utils/can';

export default function Can({
  perform: permission,
  on: subject,
  yes,
  no,
}) {
  const user = useAuthStore((state) => state.user);

  return <>
    {can({ user, perform: permission, on: subject })
      ? yes
      : no}
  </>;
}
