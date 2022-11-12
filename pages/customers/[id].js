import React from 'react'
import getData from "lib/getData"
import getDatas from "lib/getDatas"
import BasicCard from '@components/BasicCard';

let entityTypeName = 'customers';
let singleQueryEntityTypeName = 'organizations';
const model = [
    'customer_code',
    'account_manager',
    'active_project_count',
    'name',
    'id',
    'sales_rep',
    'stage_name',
];
let returningProp = model.join(' ');
const model2 = [
    // 'customer_code',
    'account_manager { id first_name last_name }',
    // 'active_project_count',
    'name',
    'id',
    'sales_rep { id first_name last_name email }',
    // 'stage_name',
];
let returningProp2 = model2.join(' ');


export async function getStaticPaths() {
    let ids = await getDatas({
        entityTypeName: entityTypeName,
        returningProp: returningProp,
    })
    ids = ids.slice(0, 10);
    let paths = ids.map(m => ({ params: { id: m.id.toString() } }))
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
};

export async function getStaticProps(context) {
    let data = await getData({
        entityTypeName: singleQueryEntityTypeName,
        // entityTypeName: entityTypeName,
        id: context.params.id,
        returningProp: returningProp2
    });
    return {
        props: { data: data },
    }
};

export default function Page({ data }) {
    console.log('DATA:', data, '\n::DATA');
    let subs = Object.keys(data)
        .filter(f => data[f] && data[f].id)
        .map(f => data[f].name ? data[f].name : data[f].first_name ? data[f].first_name + ' ' + data[f].last_name : '-');
    console.log(subs);
    return (
        <div style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            top: '0px',
            left: '0px',
            backgroundColor: 'azure'
        }}>
            <div style={{
                width: '400px',
                margin: 'auto',
                marginTop: '2rem',
            }}
            >
                <BasicCard values={
                    [
                        data.id,
                        data.name,
                        subs[0],
                        subs[1],
                        'END',
                        data.name,
                        data.name,
                    ]
                }
                />
            </div>
        </div>
    )
};