import React from 'react'
import getData from "../../lib/getData"
import getDatas from "../../lib/getDatas"
import PageTemplate from '@components/PageTemplate_DETAILS';


let entityTypeName = 'products';
let singleQueryEntityTypeName = 'products';
// const model_PATHS = [
//     'customer_code',
//     'account_manager',
//     'active_project_count',
//     'name',
//     'id',
//     'sales_rep',
//     'stage_name',
// ];
// const model_PROPS = [
//     'account_manager { id first_name last_name }',
//     'name',
//     'id',
//     'sales_rep { id first_name last_name email }',
// ];




export async function getStaticPaths() {
    let ids = await getDatas({
        entityTypeName: entityTypeName,
        // returningProp: model_PATHS.join(' '),
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
        id: context.params.id,
        // returningProp: model_PROPS.join(' ')
    });
    return {
        props: { data: data },
    }
};

export default function Page({ data }) {
    return <PageTemplate data={data} />

};