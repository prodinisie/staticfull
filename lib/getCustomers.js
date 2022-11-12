import axios from 'axios';
require('dotenv').config()
console.log(process.env);


export default async function getCustomers(id) {
    // console.log('process.env', process.env);
    let config = {
        url: process.env.GQL_ENDPOINT,
        headers: { 'x-hasura-admin-secret': process.env.GQL_ADMIN_SECRET },
        data: {
            query: `query GetCustomers($condition: customers_bool_exp!, $offset: Int!, $order_by: [customers_order_by!]!) {
                customers(where: $condition, 
                          offset: $offset,
                          order_by: $order_by) {
                  id
                  name
                  customer_code
                  stage_name
                  parent_id
                  parent
                  owner_id
                  owner
                  sales_rep_id
                  sales_rep
                  brand_manager_id: account_manager_id
                  brand_manager: account_manager
                  users {
                    user_id
                    user_type
                    user_type_code
                    first_name
                    last_name
                    email
                    phone
                    role_code
                  }
                  active_project_count
                  created_at
                }
              }`,
            variables: {
                "condition": {
                    "_and": [
                        {
                            "name": {
                                "_ilike": "%%"
                            }
                        },

                    ]
                },
                "offset": 0,
                "order_by": { "created_at": "desc" }
            }
        },
        method: 'POST',
    };
    console.log('ID', id);
    if (typeof id !== 'undefined') {

        config.data.variables.condition._and.push({ id: { "_eq": id } })
    };
    console.log(config)
    let response = await axios(config);
    console.log('ID', id, response.data, 'response.data.data')
    return response.data.data.customers.slice(0, 40)
}