import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from '@mui/material';
import Country, { randomCountry } from './renderers/renderCountry';
import { MyComponent } from './FramerMotionDiv';



export default function StripedGrid({
    data,
    isLoading: loading,
    slug,
    ...rest
}) {

    const {
        columns: cc,
        autoHeight,
        checkboxSelection,
        disableSelectionOnClick,
        experimentalFeatures,
        pageSize,
        rows: rr,
        rowPerPageOptions,
    } = rest;

    let rows = rr.map(row => ({ ...row, avatar: '#f44336' }));

    let avatarDimensions = '40px';

    let columns = [
        {
            headerName: 'Avatar',
            field: 'avatar',
            width: 60,
            renderCell: ({ row }) => (
                <div
                    style={{
                        borderRadius: '50%',
                        backgroundColor: row.avatar,
                        color: 'white',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: avatarDimensions,
                        height: avatarDimensions,
                        fontSize: '1.25rem',
                        lineHeight: 1,
                        flexShrink: 1,
                    }}
                >
                    {row.name[0].toUpperCase()}
                </div >
            )
        },
        {
            headerName: 'Country',
            field: 'country',
            width: 150,
            renderCell: ({ row }) => <Country value={randomCountry()} />,
        },
        ...cc.map(m => (
            m.field === 'name'
                ?
                {
                    ...m,
                    renderCell: ({ row }) => (
                        <Link
                            href={'/' + slug + '/' + row.id}
                        >
                            {row.name}
                        </Link>
                    )
                }
                : m
        )),
    ];

    const [myComponentIsVisible, setMyComponentIsVisible] = React.useState(true);
    return (
        <div style={{ height: 400, width: '100%' }}>

            <StripedDataGrid
                loading={loading}
                {...data}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                columns={columns}
                autoHeight={autoHeight}
                checkboxSelection={checkboxSelection}
                disableSelectionOnClick={disableSelectionOnClick}
                experimentalFeatures={experimentalFeatures}
                pageSize={pageSize}
                rows={rows}
                rowPerPageOptions={rowPerPageOptions}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            // Hide columns status and traderName, the other columns will remain visible
                            id: false,
                            // traderName: false,
                        },
                    },
                }}
            />
        </div>
    );
}





const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));
