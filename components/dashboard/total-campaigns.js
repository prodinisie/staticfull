import { Avatar, Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthUser } from '@frontegg/nextjs';
import hasuraIntegration from '../_tenantApp/functions/hasuraIntegration';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const TotalCampaigns = ( props ) => {
	
	const clientId = props.app.entity.id;
	const { environment } = props;
	const user = useAuthUser(); // USER SUPPLIED BY PROVIDOER AT TOP LEVEL OF EACH APP (CLIENT, TEDNANT)
	
	const request = hasuraIntegration( {
		userAccessToken: user.accessToken,
		environment: environment
	} ).hasura.base.request;
	
	
	const [ data, setData ] = useState( null );
	
	useEffect( () => {
		
		const query = `query get_campaings($organization_id: bigint!) {
      campaigns:apps(where: {entity_id: {_eq: $organization_id}, entity_type: {code: {_eq: "CAMPAIGN"}}}) {
        created_at
        name
        id
        active
        updated_at
        orders {
          id
        }
      }
    }`;
		
		async function getData() {
			
			const variables = {
				organization_id: clientId
			};
			let response = await request( query, variables );
			let results = response.campaigns.length;
			setData( results );
		}
		
		getData();
	}, [] );
	
	return (
		<Card sx={{
			height: '100%'
		}}>
			{
				!data
				?
				<CardContent>
					<Skeleton>
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
									3
								</Typography>
								<Typography
									color="textPrimary"
									variant="h4"
								>
									4
								</Typography>
							</Grid>
							<Grid item>
								<Avatar
									sx={{
										backgroundColor: 'error.main',
										height: 56,
										width: 56
									}}
								>
									<ShoppingCartIcon/>
								</Avatar>
							</Grid>
						</Grid>
						<Box
							sx={{
								pt: 2,
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<ArrowUpward color="success"/>
							<Typography
								color={true ? 'success' : 'error'}
								sx={{
									mr: 1
								}}
								variant="body2"
							>
								34%
							</Typography>
							<Typography
								color="textSecondary"
								variant="caption"
							>
								Since last month
							</Typography>
						</Box>
					</Skeleton>
				</CardContent>
				:
				
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
								TOTAL CAMPAIGNS
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
									backgroundColor: props.iconColor ? props.iconColor : 'primary.main',
									height: 56,
									width: 56
								}}
							>
								<ShoppingCartIcon/>
							</Avatar>
						</Grid>
					</Grid>
				</CardContent>
			}
		</Card>
	);
};
