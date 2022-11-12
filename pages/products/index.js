import React from 'react'
import getDatas from "lib/getDatas"
import getModels from '../../lib/getModels';
import PageTemplate from '@components/PageTemplate_LIST';

const entityTypeName = 'products';

export async function getStaticProps(context) {
    let model = await getModels(entityTypeName.toUpperCase());
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
    let queryFnParams = {
        entityTypeName: entityTypeName,
        modelEntityTypeCode: entityTypeName.toUpperCase(),
        limitProp: 10,
    };

    return <PageTemplate
        queryFn={() => queryFn(queryFnParams)}
        data={data}
        model={model}
        entityTypeName={entityTypeName}
    />;
};