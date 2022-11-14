import { motion } from "framer-motion"
import React from 'react';


export const MyComponent = ({
    isVisible,
    setIsVisible,
}) => {

    React.useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 2000);
    }, [isVisible]);

    return (
        <motion.div

            style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'red',
            }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            onClick={() => { setIsVisible(false) }}


        />
    );
};