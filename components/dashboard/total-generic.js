import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useAuthUser } from '@frontegg/nextjs';
// import hasuraIntegration from '../_tenantApp/functions/hasuraIntegration';
import WorkIcon from '@mui/icons-material/Work';

export { TotalGeneric as default }
const TotalGeneric = ({ data, iconColor, entityTypeName = 'PRODUCTS' }) => (<Card
    sx={{ height: '100%' }}
>
    {/* <Card {...props}> */}
    <CardContent>
        <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
        >
            <Grid item>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="overline"
                >
                    TOTAL {entityTypeName}
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    {data}
                </Typography>
            </Grid>

            <Grid item>
                <Avatar
                    sx={{
                        backgroundColor: iconColor ? iconColor : 'success.main',
                        height: 56,
                        width: 56
                    }}
                >
                    <WorkIcon />
                </Avatar>
            </Grid>

        </Grid>

    </CardContent>
</Card>
);