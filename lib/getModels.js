import axios from 'axios';
require('dotenv').config()


export default async function getModels(entityTypeCode) {
    // console.log('process.env', process.env);
    let config = {
        url: process.env.GQL_ENDPOINT,
        headers: { 'x-hasura-admin-secret': process.env.GQL_ADMIN_SECRET },
        data: {
            query: queryModelByEntityType,
            variables: { _ilike: entityTypeCode },
        },
        method: 'POST',
    };
    let response = await axios(config);
    let results = response.data.data.slug[0].model.map(m => m.field_key);
    // const getNestedArrayFirstLast = [
    //     'sales_rep_id',
    //     'account_manager_id',
    // ];
    const getNestedFullname = [
        'entity_type_id'
    ]
    let expandedResults = results.map(m => (
        // getNestedArrayFirstLast.includes(m)
        //     ?
        //      `${m.replace('_id', '')} {
        //             id
        //             first_name
        //             last_name
        //         }`
        //     : 
        getNestedFullname.includes(m)
            ? `${m.replace('_id', '')} {
                        id
                        name
                    }`
            :
            m
    ))

    return expandedResults;
}

const queryModelByEntityType = `
    query GetModelsByEntityType($_ilike: String = "") {
        slug: entity_types(limit: 1, where: {code: {_ilike: $_ilike}}) {
            code
            model {
                field_key
            }
        }
    }`;
// model {
//     field_key
//     field_name
//     field_type
//     description
//     required
//     hidden
// }
const variablesModelByEntityType = [
    'ORGANIZATIONS',
    // 'VENDORS',
    // 'CUSTOMER',
    'PROJECTS',
    // 'ORDERS',
    // 'FILE',
    // 'USERS',
    // 'BRAND',
    'PRODUCTS',
];