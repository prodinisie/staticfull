import React from 'react'
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import DataGrid from './DataGridStriped';
import BreadCrumbs from './BreadCrumbs';

export default function PageTemplate({
    data,
    model,
    queryFn,
    entityTypeName,
}) {

    const { data: rqData, isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: queryFn,
        initialData: data,
    });

    const columns = model.map(m => (
        /created_at|updated_at|date/i.test(m)
            ? {
                field: m,
                width: 180,
                headerName: /_/.test(m)
                    ? m
                        .split('_')
                        .map(n => (
                            n[0].toUpperCase() + n.slice(1)
                        ))
                        .join(' ')
                    : m[0].toUpperCase() + m.slice(1),
                renderCell: ({ row }) => new Date(row[m]).toLocaleDateString()
            }
            : {
                field: m,
                width: 180,
                headerName: /_/.test(m) ? m.split('_').map(n => n[0].toUpperCase() + n.slice(1)).join(' ') : m[0].toUpperCase() + m.slice(1),
                renderCell: m === 'id' ? ({ row }) => <Link href={entityTypeName + '/' + row.id}>{row.id}</Link> : undefined
            }
    ))
        .filter(({ field }) => (
            data.some(row => row[field] && typeof row[field] !== 'undefined')
        ))
        .sort((a, b) => a.field === 'id' ? -1 : a.field === 'name' ? -1 : 1)




    return (data &&
        <div style={{
            paddingLeft: '1rem',
            paddingRight: '1rem',
        }}
        >
            <Box sx={{
                height: '100vh',
                width: '100%',
                paddingTop: '1rem',
            }}>
                <DataGrid
                    slug={entityTypeName}
                    data={rqData}
                    isLoading={isLoading}
                    autoHeight
                    rows={data}
                    columns={columns}
                    pageSize={40}
                    rowsPerPageOptions={[5, 40]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
                <br />
                <br />
                <br />
            </Box>
        </div>
    )
};