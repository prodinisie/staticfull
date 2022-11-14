import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from './dashboard-layout';
import { OrdersLastThirty } from './orders-last-thirty';
// import { TotalProjects } from './total-projects';
// import { TotalProducts } from './total-products';
// import { TotalCampaigns } from './total-campaigns';
import { LatestOrders } from './latest-orders';
import TotalGeneric from './total-generic';


export {
    Dashboard as default,
    coolors,
    TotalGeneric,
    OrdersLastThirty,
    // TotalProjects,
    // TotalCampaigns,
    //  TotalProducts
};


const Dashboard = ({
    panels = ['orders-last-thirty'],
}) => {
    let props = {
        panels: panels,
    }

    const topRowComponents = [
        {
            disabled: false,
            name: 'orders-last-thirty',
            component: props => <OrdersLastThirty iconColor={coolors[1].hex} {...props} />,
            sizes: {
                xs: 4,
                md: 4,
                lg: 4,
                xl: 4
            }
        },
        {
            disabled: false,
            name: 'orders-last-thirty',
            component: props => <OrdersLastThirty iconColor={coolors[1].hex} {...props} />,
            sizes: {
                xs: 3,
                md: 3,
                lg: 3,
                xl: 3
            }
        },
        {
            disabled: false,
            name: 'orders-last-thirty',
            component: props => <OrdersLastThirty iconColor={coolors[1].hex} {...props} />,
            sizes: {
                xs: 5,
                md: 5,
                lg: 5,
                xl: 5
            }
        },
        {
            disabled: false,
            name: 'orders-last-thirty',
            component: props => <OrdersLastThirty iconColor={coolors[1].hex} {...props} />,
            sizes: {
                xs: 6,
                md: 6,
                lg: 6,
                xl: 6
            }
        },
        {
            disabled: false,
            name: 'orders-last-thirty',
            component: props => <OrdersLastThirty iconColor={coolors[1].hex} {...props} />,
            sizes: {
                xs: 6,
                md: 6,
                lg: 6,
                xl: 6
            }
        },
        // {
        //     disabled: false,
        //     name: 'total-projects',
        //     component: props => <TotalProjects iconColor={coolors[0].hex} {...props} />
        // },
        // {
        //     disabled: false,
        //     name: 'total-campaigns',
        //     component: props => <TotalCampaigns iconColor={coolors[2].hex} {...props} />
        // }
    ].filter(f => props.panels.includes(f.name));

    const topRow = topRowComponents.map(m => ({
        sizes: xColumnRow(topRowComponents.length),
        ...m
    }));

    const sections = [
        ...topRow,
        {
            name: 'latest-orders',
            disabled: false,
            component: props => <LatestOrders color={coolors[2].hex} {...props} />,
            sizes: {
                xs: 12,
                md: 12,
                lg: 12,
                xl: 12
            }
        }
    ].filter(f => props.panels.includes(f.name));

    if (Array.isArray(props.additionalPanels) && props.additionalPanels.length > 0) {
        props.additionalPanels.forEach(fe => sections.push(fe));
    }

    return (
        <>
            <Head>
                <title>
                    Dashboard | Imprint Engine
                </title>
            </Head>
            <Box
                // component="main"
                sx={{
                    flexGrow: 1,
                    py: 4,
                    width: '100%',
                }}
            >
                <Container maxWidth={false}>

                    <Grid
                        container
                        spacing={3}
                    >
                        {props.children}

                        {sections.map(({
                            sizes,
                            disabled,
                            component
                        }, panelIdx) => (
                            <Grid
                                key={'panel' + panelIdx}
                                item
                                {...sizes}
                            >
                                {
                                    disabled
                                        ? <Over>
                                            {component(props)}
                                        </Over>
                                        : component(props)
                                }
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};


Dashboard.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);


const Over = ({ children }) => (
    <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: '.45'
    }}>
        {children}
    </div>
);
const xColumnRow = x => ({
    xs: 12,
    sm: 6,
    lg: 12 / x,
    xl: 12 / x
});


const coolors =
    [
        {
            'name': 'Crimson',
            'hex': 'd7263d',
            'rgb': [
                215,
                38,
                61
            ],
            'cmyk': [
                0,
                82,
                72,
                16
            ],
            'hsb': [
                352,
                82,
                84
            ],
            'hsl': [
                352,
                70,
                50
            ],
            'lab': [
                47,
                66,
                33
            ]
        },
        {
            'name': 'Portland Orange',
            'hex': 'f46036',
            'rgb': [
                244,
                96,
                54
            ],
            'cmyk': [
                0,
                61,
                78,
                4
            ],
            'hsb': [
                13,
                78,
                96
            ],
            'hsl': [
                13,
                90,
                58
            ],
            'lab': [
                60,
                55,
                52
            ]
        },
        {
            'name': 'Space Cadet',
            'hex': '2e294e',
            'rgb': [
                46,
                41,
                78
            ],
            'cmyk': [
                41,
                47,
                0,
                69
            ],
            'hsb': [
                248,
                47,
                31
            ],
            'hsl': [
                248,
                31,
                23
            ],
            'lab': [
                19,
                13,
                - 22
            ]
        },
        {
            'name': 'Persian Green',
            'hex': '1b998b',
            'rgb': [
                27,
                153,
                139
            ],
            'cmyk': [
                82,
                0,
                9,
                40
            ],
            'hsb': [
                173,
                82,
                60
            ],
            'hsl': [
                173,
                70,
                35
            ],
            'lab': [
                57,
                - 36,
                - 2
            ]
        }
    ].map(m => ({
        ...m,
        hex: '#' + m.hex
    }));
