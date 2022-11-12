import React from 'react'
import getData from "../../lib/getData"
import getDatas from "../../lib/getDatas"
import PageTemplate from '@components/PageTemplate_DETAILS';


let entityTypeName = 'projects';
let singleQueryEntityTypeName = 'projects';
let model = [
    'account_manager { id first_name last_name }',
    'active',
    'archived_at',
    'assignee_id',
    'completed_at',
    'created_at',
    'created_by',
    'description',
    'due_date',
    'entity_id',
    'entity_type { name id code }',
    'id',
    'metadata',
    'name',
    'owner_id',
    'owner { id first_name last_name }',
    'project_manager_id',
    'project_manager { id first_name last_name }',
    'project_number',
    'source_id',
    'source_ref',
    'status_id',
    'tenant_id',
    'updated_at',
    'updated_by',
];

export async function getStaticPaths() {
    let ids = await getDatas({
        entityTypeName: entityTypeName,
    });
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
        returningProp: model.join(' ')
    });
    return {
        props: { data: data },
    }
};

export default function Page({ data }) {
    return <PageTemplate data={data} />
}