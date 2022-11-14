import * as React from 'react';
import Box from '@mui/material/Box';
import { COUNTRY_ISO_OPTIONS } from '@components/services/static-data';

// const Country = React.memo(function Country(props) {
export function randomCountry() {
    let multiplier = COUNTRY_ISO_OPTIONS.length / 100;
    let randomInteger = Math.random() * 100;
    let randomCountryIndex = Math.ceil(
        randomInteger * multiplier
    ) - 1;
    let randomCountry = COUNTRY_ISO_OPTIONS[randomCountryIndex];
    console.log(randomCountry);
    return randomCountry;
};
export default function Country({
    value,
}) {
    // const { value } = props;
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                '&  > img': {
                    mr: 0.5,
                    flexShrink: 0,
                    width: '20px',
                },
            }}
        >
            <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${value.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${value.code.toLowerCase()}.png 2x`}
                alt=""
            />
            <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {value.label}
            </Box>
        </Box>
    )
};

// export function renderCountry(
//     params
// ) {
//     if (params.value == null) {
//         return '';
//     }

//     // If the aggregated value does not have the same unit as the other cell
//     // Then we fall back to the default rendering based on `valueGetter` instead of rendering the total price UI.
//     if (params.aggregation && !params.aggregation.hasCellUnit) {
//         return null;
//     }

//     return <Country value={params.value} />;
// }