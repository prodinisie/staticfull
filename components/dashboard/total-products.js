import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthUser } from '@frontegg/nextjs';
import hasuraIntegration from '../_tenantApp/functions/hasuraIntegration';
import WorkIcon from '@mui/icons-material/Work';

export const TotalProducts = (props) => {
    const clientId = props.app.entity.id;
    const { environment } = props;

    const user = useAuthUser(); // USER SUPPLIED BY PROVIDOER AT TOP LEVEL OF EACH APP (CLIENT, TEDNANT)
    const request = hasuraIntegration({
        userAccessToken: user.accessToken,
        environment: environment
    }).hasura.base.request;

    const [data, setData] = useState(null);

    useEffect(() => {

        const query = `query listProjects($entity_id: bigint!) {
      projects_aggregate(where: {entity_id: {_eq: $entity_id}}) {
        aggregate {
          total: count
        }
      }
    }`;


        async function getData() {
            const variables = {
                'entity_id': clientId
            };
            let response = await request(query, variables);
            let results = response.projects_aggregate.aggregate.total;
            setData(results);
        }
        if (typeof clientId !== 'undefined') {
            getData();
        }
    }, []);


    return (
        <Card
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
                            TOTAL PRODUCTS
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
                                backgroundColor: props.iconColor ? props.iconColor : 'success.main',
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
};