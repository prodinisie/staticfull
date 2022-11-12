import React from 'react'
import getData from "lib/getData"
import getDatas from "lib/getDatas"
import BasicCard from '@components/BasicCard';

let entityTypeName = 'projects';
let singleQueryEntityTypeName = 'projects';

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