const useStyles = () => {
    return {
        media: {
            height: 0,
            pt: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            ml: 'auto',
            transition: 'transform',
            transitionDuration: '1s'
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        cartContent: {
            pt: 0,
        },
        divider: {
            mx: '0',
            my: '20px'
        },
    
    };
};

export default useStyles;