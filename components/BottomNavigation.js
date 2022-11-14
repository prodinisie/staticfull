import * as React from 'react';
import { useRouter } from 'next/router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import HailRoundedIcon from '@mui/icons-material/HailRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import QrCodeIcon from '@mui/icons-material/QrCode';

export default function LabelBottomNavigation({
    navItemsProp,
}) {
    let navItems = [
        { label: 'home', value: '', icon: <RoofingRoundedIcon /> },
        { label: 'projects', value: 'projects', icon: <AssignmentTurnedInRoundedIcon /> },
        { label: 'customers', value: 'customers', icon: <HailRoundedIcon /> },
        { label: 'products', value: 'products', icon: <QrCodeIcon /> },
        { label: 'profile', value: 'profile', icon: <AccountCircleRoundedIcon /> },
    ];
    const [value, setValue] = React.useState(null);

    React.useEffect(() => {
        let calcNav = navItems
            /* HOME, "/" , WILL MATCH ALL PATHS SO REMOVE IT */
            .slice(1)
            .filter(({ value: v }) => {
                return (
                    new RegExp(v, 'i')
                        .test(window.location.href)
                )
            })[0];
        let calcNavValue = calcNav && typeof calcNav !== 'undefined'
            ? calcNav.value : undefined;
        setValue(calcNavValue)
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0
            }}
            elevation={3}
        >
            <BottomNavigation
                sx={{ width: '100%' }}
                value={value}
                onChange={handleChange}>
                {
                    navItems.map(nvitm => (

                        <BottomNavigationAction
                            href={'/' + nvitm.value}
                            key={nvitm.label + 'nvaitm'}
                            label={nvitm.label[0].toUpperCase() + nvitm.label.slice(1)}
                            value={nvitm.value}
                            icon={nvitm.icon}
                        />
                    ))
                }
            </BottomNavigation>
        </Paper>
    );
}