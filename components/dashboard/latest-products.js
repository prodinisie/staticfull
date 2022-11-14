import { subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import Link from 'next/link';
import { format_date } from '../../includes/functions';

import { Box, Button, Card, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import hasuraIntegration from '../_tenantApp/functions/hasuraIntegration';
import { useAuthUser } from '@frontegg/nextjs';


export const LatestProducts = ( props ) => {
	
	const { environment } = props;
	const user = useAuthUser(); // USER SUPPLIED BY PROVIDOER AT TOP LEVEL OF EACH APP (CLIENT, TEDNANT)
	
	const request = hasuraIntegration( {
		userAccessToken: user.accessToken,
		environment: environment
	} ).hasura.base.request;
	
	
	const [ latestProducts, setLatestProducts ] = useState( null );
	
	useEffect( () => {
		async function fetchProducts() {
			let response = await request( queryGetProducts );
			let formattedProductsList = response.products.map( m => ( {
				...m,
				imageUrl: m.primary_image && m.primary_image.length > 0 ? m.primary_image[ 0 ].file.url : null,
				updatedAt: format_date( m.updated_at )
			} ) );
			setLatestProducts( formattedProductsList );
		}
		
		fetchProducts();
		
	}, [] );
	
	return (
		<Card>
			<CardHeader
				subtitle={`${products ? products.length : '...'} in total`}
				title="Latest Products"
			/>
			<Divider/>
			{!latestProducts
			 ?
			 < List sx={{ px: 2 }}>
				 {
					 products.map( ( product, i, latestArray ) => (
						 <Skeleton key={product.id}>
							 <ListItem
								
								 divider={i < latestArray.length - 1}
								 key={product.id}
							 >
								 <ListItemAvatar>
									 <img
										 alt={product.name}
										 src={product.imageUrl}
										 style={{
											 height: 48,
											 width: 48
										 }}
									 />
								 </ListItemAvatar>
								 <ListItemText
									 primary={product.name}
									 secondary={`Updated ${product.updatedAt}`}
								 />
								 <IconButton
									 edge="end"
									 size="small"
								 >
									 <MoreVertIcon/>
								 </IconButton>
							 </ListItem>
						 </Skeleton>
					 ) )
				 }
			 </List>
			
			 :
			 <List>
				 {latestProducts.map( ( product, i, latestArray ) => (
					 <ListItem
						 divider={i < latestArray.length - 1}
						 key={product.id}
					 >
						 <ListItemAvatar>
							 <img
								 alt={product.name}
								 src={product.imageUrl}
								 style={{
									 height: 48,
									 width: 48
								 }}
							 />
						 </ListItemAvatar>
						 <ListItemText
							 primary={product.name}
							 secondary={`Updated ${product.updatedAt}`}
						 />
						 <IconButton
							 edge="end"
							 size="small"
						 >
							 <MoreVertIcon/>
						 </IconButton>
					 </ListItem>
				 ) )}
			 </List>
			}
			<Divider/>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					p: 2
				}}
			>
				<Link href={'/products'}>
					
					<Button
						color="primary"
						endIcon={<ArrowRightIcon/>}
						size="small"
						variant="text"
					>
						View all
					</Button>
				</Link>
			</Box>
		</Card>
	);
};


const queryGetProducts = `
query get_products {
    products(limit:6,order_by: {sku:asc}) {
      id
      name
      sku
      updated_at
	  description
      manufacturer {
        id
        name
      }
      config_type: product_type {
        name
      }
      product_type: entity_type {
        id
        name
        path
        level
      }
      primary_image:files(where: {_and: {file: {entity_type: {code: {_eq: "PRODUCT_IMAGE"}}}, is_primary: {_eq: true}}}, limit: 1, order_by: {updated_at: desc}) {
        id
        title
        description
        is_primary
        file {
          id
          entity_type {
            name
          }
          url
        }
      }
      images:files(where: {_and: {file: {entity_type: {code: {_eq: "PRODUCT_IMAGE"}}}}}) {
        id
        title
        description
        is_primary
        file {
          id
          entity_type {
            name
          }
          url
        }
      }
    }
  }
`;


const products = [
	{
		id: uuid(),
		name: 'Dropbox',
		imageUrl: '/static/images/products/product_1.png',
		updatedAt: subHours( Date.now(), 2 )
	},
	{
		id: uuid(),
		name: 'Medium Corporation',
		imageUrl: '/static/images/products/product_2.png',
		updatedAt: subHours( Date.now(), 2 )
	},
	{
		id: uuid(),
		name: 'Slack',
		imageUrl: '/static/images/products/product_3.png',
		updatedAt: subHours( Date.now(), 3 )
	},
	{
		id: uuid(),
		name: 'Lyft',
		imageUrl: '/static/images/products/product_4.png',
		updatedAt: subHours( Date.now(), 5 )
	},
	{
		id: uuid(),
		name: 'GitHub',
		imageUrl: '/static/images/products/product_5.png',
		updatedAt: subHours( Date.now(), 9 )
	}
];