import React from 'react'
import getDatas from "lib/getDatas"
import getModels from '../../lib/getModels';
import PageTemplate from '@components/PageTemplate_LIST';

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
    let queryFnParams = {
        entityTypeName: entityTypeName,
        modelEntityTypeCode: entityTypeName.toUpperCase(),
        limitProp: 10,
    };

    return <PageTemplate
        queryFn={() => getDatas(queryFnParams)}
        data={data}
        model={model}
        entityTypeName={entityTypeName}
    />;

};