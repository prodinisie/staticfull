import React from 'react'
import getDatas from "lib/getDatas"
import Box from '@mui/material/Box';
import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import getModels from 'lib/getModels';



const entityTypeName = 'projects';

export async function getStaticProps(context) {
    let model = await getModels('PROJECTS');
    let data = await getDatas({
        entityTypeName: entityTypeName,
        modelEntityTypeCode: entityTypeName.toUpperCase(),
        limitProp: 10,
    });
    return {
        props: { data: data, model: model },
    }
};

export default function Page({
    data,
    model,
}) {
    const columns = model.map(m => ({
        field: m,
        width: 160,
        headerName: /_/.test(m) ? m.split('_').map(n => n[0].toUpperCase() + n.slice(1)).join(' ') : m[0].toUpperCase() + m.slice(1),
        renderCell: m === 'id' ? ({ row }) => (
            <>
                <Link href={entityTypeName + '/' + row.id}>{row.id}</Link>
            </>
        ) : undefined
    }))
    console.log(data)
    return (data &&
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
    )
};