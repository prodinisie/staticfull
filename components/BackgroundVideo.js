import React from 'react';

export default function BackgroundVideo() {

    return (
        <video
            autoPlay
            muted
            loop
            playsInline
            style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
            }}
        >
            <source src="/ie-bg-vid-3.mp4" type="video/mp4" />
        </video>
    )
}