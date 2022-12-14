import React from 'react'
import getDatas from '../../lib/getDatas';
import PageTemplate from '@components/PageTemplate_LIST';

const entityTypeName = 'customers';
const model = [
    'customer_code',
    'account_manager',
    'active_project_count',
    'name',
    'id',
    'sales_rep',
    'stage_name',
];

export async function getStaticProps(context) {

    let data = await getDatas({
        entityTypeName: entityTypeName,
        modelEntityTypeCode: 'customer',
        limitProp: 10,
        returningProp: model.join(' ')
    });
    return {
        props: { data: data, model: model },
    };
};

export default function Page({
    data,
    model,
}) {
    let queryFnParams = {
        entityTypeName: entityTypeName,
        modelEntityTypeCode: 'customer',
        limitProp: 10,
        returningProp: model.join(' ')
    };

    return <PageTemplate
        queryFn={() => getDatas(queryFnParams)}
        data={data}
        model={model}
        entityTypeName={entityTypeName}
    />;

};