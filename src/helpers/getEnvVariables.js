

export const getEnvVariables = () => {  

    // import.meta.env;
    const {VITE_API_URL} =  import.meta.env;

    return {
        VITE_API_URL

    }
    
}