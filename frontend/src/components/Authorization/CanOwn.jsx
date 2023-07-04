import { useAuthStore } from '../../stores/auth';
import { canOwn } from '../../utils/can';

export default function CanOwn({
  perform: action,
  on: subject,
  entity,
  yes,
  no,
}) {
  const user = useAuthStore((state) => state.user);

  return <>
    {canOwn({ user, action, on: subject, entity })
      ? yes
      : no}
  </>;
}
