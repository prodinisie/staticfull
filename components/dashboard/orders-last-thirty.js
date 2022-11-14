import { Avatar, Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/Money';
import { useEffect, useState } from 'react';
// import hasuraIntegration from '../_tenantApp/functions/hasuraIntegration';
import { useAuthUser } from '@frontegg/nextjs';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const OrdersLastThirty = (props) => {

	// const { environment } = props;
	// const user = useAuthUser(); // USER SUPPLIED BY PROVIDOER AT TOP LEVEL OF EACH APP (CLIENT, TEDNANT)

	// const request = hasuraIntegration( {
	// 	userAccessToken: user.accessToken,
	// 	environment: environment
	// } ).hasura.base.request;


	const [ordersInLast30, setOrdersInLast30] = useState(null);
	const [orders60To30, setOrders60To30] = useState(null);

	const daysAgo = days => new Date(new Date().setDate(today.getDate() - days));
	const today = new Date();
	const thirtyDaysAgo = daysAgo(30);
	const sixtyDaysAgo = daysAgo(60);

	useEffect(() => {

		const clientId = 123;//props.app.entity.id;
		const variables = {
			_eq: clientId,
			_gte: thirtyDaysAgo
		};
		const variablesSixty = {
			_eq: clientId,
			_gte: sixtyDaysAgo
		};

		async function fetchOrders() {
			// let response = await request( queryOrdersByOrganizationId, variables );
			let response = {
				total: 39,
				abc: [{ id: 2 }],
			};
			let count30 = 20;
			// response.total.count;
			setOrdersInLast30(20);//response.total.aggregate.count);
			// let responseSixty = await request( queryOrdersByOrganizationId, variablesSixty );
			let responseSixty = {
				total: 3,
				abc: [{ id: 3 }]
			}
			let count60 = 2;//responseSixty.total.count;
			let diffPct = (count60 / count30) * 100;
			let diffDelta = diffPct > 99 ? diffPct - 100 : diffPct;
			let pctObject = {
				pct: diffDelta,
				increase: diffPct > 99
			};
			setOrders60To30(pctObject);
		}

		fetchOrders();
	}, []);

	return (
		!ordersInLast30
			?
			<Card
				sx={{ height: '100%' }}
			>
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
									ORDERS LAST 30
								</Typography>
								<Typography
									color="textPrimary"
									variant="h4"
								>
									34
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
									<MoneyIcon />
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
							<ArrowUpwardIcon color="success" />
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
			</Card>

			:

			<Card
				sx={{ height: '100%' }}
			>
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
								ORDERS LAST 30
							</Typography>

							<Typography
								color="textPrimary"
								variant="h4"
							>
								{ordersInLast30}
							</Typography>

						</Grid>

						<Grid item>

							<Avatar
								sx={{
									backgroundColor: props.iconColor ? props.iconColor : 'error.main',
									height: 56,
									width: 56
								}}
							>
								<ListAltIcon />
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
						{orders60To30 && orders60To30.increase
							? <ArrowUpwardIcon color="success" />
							: <ArrowDownwardIcon color="error" />
						}
						<Typography
							color={orders60To30 && orders60To30.increase ? 'success' : 'error'}
							sx={{
								mr: 1
							}}
							variant="body2"
						>
							{orders60To30 && orders60To30.pct}%
						</Typography>
						<Typography
							color="textSecondary"
							variant="caption"
						>
							Since last month
						</Typography>
					</Box>

				</CardContent>
			</Card>

	);
};

const queryOrdersByOrganizationId = `
query MyQuery2($_eq: bigint = "", $_gte: timestamptz = "") {
  total:orders_aggregate(where: {entity_id: {_eq: $_eq}, created_at: {_gte: $_gte}}) {
    aggregate {
      count
    }
  }
}
`;
