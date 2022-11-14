import axios from 'axios';


export default async function getModel(entityTypeCode) {

    let URL = process.env.GQL_ENDPOINT
        ? process.env.GQL_ENDPOINT
        : process.env.NEXT_PUBLIC_GQL_ENDPOINT
            ? process.env.NEXT_PUBLIC_GQL_ENDPOINT
            : undefined;
    let SECRET = process.env.GQL_ADMIN_SECRET
        ? process.env.GQL_ADMIN_SECRET
        : process.env.NEXT_PUBLIC_GQL_ADMIN_SECRET
            ? process.env.NEXT_PUBLIC_GQL_ADMIN_SECRET
            : undefined;
    // console.log(URL, SECRET, 'get model = URURURL');

    let config = {
        url: URL,
        headers: { 'x-hasura-admin-secret': SECRET },
        data: {
            query: queryModelByEntityType,
            variables: { _ilike: entityTypeCode },
        },
        method: 'POST',
    };
    let response = await axios(config);
    let results = response.data.data.slug[0].model.map(m => m.field_key);

    const getNestedFullname = [
        'entity_type_id'
    ];

    let expandedResults = results.map(m => (
        getNestedFullname.includes(m)
            ? `${m.replace('_id', '')} {
                        id
                        name
                    }`
            : m
    ));
    return expandedResults;
};

const queryModelByEntityType = `
    query GetModelsByEntityType($_ilike: String = "") {
        slug: entity_types(limit: 1, where: {code: {_ilike: $_ilike}}) {
            code
            model {
                field_key
            }
        }
    }`;

const variablesModelByEntityType = [
    'ORGANIZATIONS',
    'PROJECTS',
    'PRODUCTS',
    // 'VENDORS',
    // 'CUSTOMER',
    // 'ORDERS',
    // 'FILE',
    // 'USERS',
    // 'BRAND',
];