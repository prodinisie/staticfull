import React from 'react'
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// import getDatas from '../lib/getDatas';

export default function PageTemplate({
    data,
    model,
    queryFn,
    entityTypeName,
}) {

    const { data: rqData } = useQuery({
        queryKey: ['customers'],
        queryFn: queryFn,
        initialData: data,
    });

    const columns = model.map(m => ({
        field: m,
        width: 180,
        headerName: /_/.test(m) ? m.split('_').map(n => n[0].toUpperCase() + n.slice(1)).join(' ') : m[0].toUpperCase() + m.slice(1),
        renderCell: m === 'id' ? ({ row }) => <Link href={entityTypeName + '/' + row.id}>{row.id}</Link> : undefined
    }))
        .filter(({ field }) => (
            data.some(row => row[field] && typeof row[field] !== 'undefined')
        ))
        .sort((a, b) => a.field === 'id' ? -1 : 1)

    return (data &&
        <>
            <Box sx={{ height: '100vh', width: '100%' }}>
                <DataGrid
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
        </>
    )
};