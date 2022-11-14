// import { format_date } from '../../includes/functions';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@mui/material';
import { SeverityPill } from './severity-pill';
import { useEffect, useState } from 'react';
// import hasura÷Integration from '../_tenantApp/functions/hasuraIntegration';
import { useAuthUser } from '@frontegg/nextjs';

export const LatestOrders = (props) => {
	const { environment } = props;
	const user = useAuthUser(); // USER SUPPLIED BY PROVIDOER AT TOP LEVEL OF EACH APP (CLIENT, TEDNANT)

	// const request = hasuraIntegration({
	// 	userAccessToken: user.accessToken,
	// 	environment: environment
	// }).hasura.base.request;


	const [latestOrders, setLatestOrders] = useState(null);

	useEffect(() => {
		const clientId = props.app.entity.id;
		const variables = { _eq: clientId };

		async function fetchOrders() {
			// let response = await request(queryOrdersByOrganizationId, variables);
			let response = { orders: [{ id: 1 }] }

			let formattedOrdersList = response.orders.map(m => ({
				...m,
				ref: m.id,
				name: m.order_name,
				amount: 10,
				customer: {
					name: m.shipped_to
				},
				updatedAt: m.order_date,
				createdAt: m.order_date,
				status: 'processed'
			})
			);
			setLatestOrders(formattedOrdersList);
		}

		fetchOrders();
	}, []);


	const minWidth = 600;

	return (
		<Card>
			<CardHeader
				titleTypographyProps=
				{{
					color: 'textSecondary',
					gutterBottom: true,
					variant: 'overline'
				}}
				title="LATEST ORDERS" />
			{/* <PerfectScrollbar> */}
			<Box sx={{
				margin: 'auto',
				minWidth: 600
			}}>
				<Table>
					<HeaderRow />
					{
						latestOrders
							?
							<TableBody>
								{
									latestOrders.map((order) => (
										<TableRow
											hover
											key={order.id}
										>
											{/* <TableCell>{format_date( order.createdAt )}</TableCell> */}
											<TableCell>{order.customer.name.length > 1 ? order.customer.name : '-'}</TableCell>
											<TableCell>{order.app_name}</TableCell>
											<TableCell>
												<SeverityPill
													color={
														(order.status === 'processed' && 'success') ||
														(order.status === 'refunded' && 'error') ||
														'warning'
													}
												>
													{order.status}
												</SeverityPill>
											</TableCell>
										</TableRow>
									))
								}
							</TableBody>
							:
							<TableBody sx={{
								width: '100%',
								px: 2
							}}>
								{
									skeletonItemsFiller.map((order) => (
										<TableRow
											sx={{
												width: '100%',
												minWidth: minWidth + 'px',
												px: 2
											}}
											hover
											key={'skeleton' + order.ref}
										>
											<TableCell>
												<Skeleton sx={{
													width: '100%',
													minWidth: minWidth / 4 + 'px',
													px: 2
												}} />
											</TableCell>
										</TableRow>
									))
								}
							</TableBody>
					}
				</Table>
			</Box>
			{/* </PerfectScrollbar> */}
		</Card>
	);
};


const HeaderRow = () => (
	<TableHead>
		<TableRow>
			<TableCell sortDirection="desc">
				<Tooltip
					enterDelay={300}
					title="Sort"
				>
					<TableSortLabel
						active
						direction="desc"
					>
						Date
					</TableSortLabel>
				</Tooltip>
			</TableCell>

			<TableCell>
				Customer
			</TableCell>

			<TableCell>
				Source
			</TableCell>
			<TableCell>
				Status
			</TableCell>

		</TableRow>
	</TableHead>
);

const queryOrdersByOrganizationId = `
query MyQuery($_eq: bigint = "") {
  orders:order_summary(where: {organization_id: {_eq: $_eq}},limit:10,order_by: {order_date: desc}) {
    id
    shipped_to
    item_count
    total
    total_shipping
    total_tax
    order_name
    order_date
    organization_name
    billed_to
    app_name
  }
}
`;

const skeletonItemsFiller = [
	{
		ref: '1',
		name: 'a',
		amount: 10,
		customer: { name: 'a' },
		updatedAt: '234',
		createdAt: '123',
		status: 'delivered'
	},
	{
		ref: '2',
		name: 'a',
		amount: 10,
		customer: { name: 'a' },
		updatedAt: '234',
		createdAt: '123',
		status: 'delivered'
	},
	{
		ref: '3',
		name: 'a',
		amount: 10,
		customer: { name: 'a' },
		updatedAt: '234',
		createdAt: '123',
		status: 'delivered'
	},
	{
		ref: '4',
		name: 'a',
		amount: 10,
		customer: { name: 'a' },
		updatedAt: '234',
		createdAt: '123',
		status: 'delivered'
	}
];