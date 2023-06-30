import { Checkbox, Group } from '@mantine/core';
import { IconPlus, IconEye, IconPencil, IconUserEdit, IconTrash, IconUserX } from '@tabler/icons-react';

const iconLookup = {
  create: ({ className }) => <IconPlus className={className} />,
  read: ({ className }) => <IconEye className={className} />,
  update: ({ className }) => <IconPencil className={className} />,
  'update-own': ({ className }) => <IconUserEdit className={className} />,
  delete: ({ className }) => <IconTrash className={className} />,
  'delete-own': ({ className }) => <IconUserX className={className} />,
};

const labelLookup = {
  create: 'Créer',
  read: 'Voir',
  update: 'Modifier',
  'update-own': 'Modifier les siens',
  delete: 'Supprimer',
  'delete-own': 'Supprimer les siens',
};

export default function PermissionsGroup({ permissionsByRole, handleChange, permissionType, labels, roleId }) {
  const scope = permissionType.split('.')[0];
  return (
    <Checkbox.Group value={permissionsByRole[roleId]?.[scope]} onChange={(value) => handleChange(roleId, scope, value)}>
      <Group>
        {labels.map(label => (
          <Checkbox
            key={`${permissionType}-${label}`}
            mr="md"
            value={`${permissionType}.${label}`}
            label={labelLookup[label]}
            icon={iconLookup[label]}
            indeterminate
          />
        ))}
      </Group>
    </Checkbox.Group>
  );
}
