import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface ColorChangingTextProps {
    text: string;
    color: string; // Prop for the text color
    fontSize: string; // Prop for the text size
}

const ColorChangingText: React.FC<ColorChangingTextProps> = ({ text, color, fontSize }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % text.length);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, [text]);

    const letters = text.split('');

    return (
        <Box sx={{ display: "flex", columnGap: "30px" }}>
            {letters.map((letter, i) => (
                <span
                    key={i}
                    style={{
                        color: i === index ? color : 'white', // Apply the color prop
                        fontSize: fontSize, // Apply the fontSize prop
                        transition: 'color 0.5s',
                        display: 'inline-block',
                    }}
                >
                    {letter}
                </span>
            ))}
        </Box>
    );
};

export default ColorChangingText;
