import { Grid, Text } from '@mantine/core';
import React from 'react';
import PermissionsGroup from './PermissionsGroup';

export default function PermissionSection({ section, subsections, permissionsByRole, handleChange, roleId }) {
  return (
    <Grid columns={7}>
      {subsections.map((subsection) => (
        <React.Fragment key={subsection.name}>
          <Grid.Col span={1}>
            <Text>{subsection.displayName}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <PermissionsGroup
              permissionsByRole={permissionsByRole}
              handleChange={handleChange}
              permissionType={`${section}.${subsection.name}`}
              labels={subsection.labels}
              roleId={roleId}
            />
          </Grid.Col>
        </React.Fragment>
      ))}
    </Grid>
  );
}
