

export const getEnvVariables = () => {  

    // import.meta.env;
    // const jota = JSON.stringify(import.meta.env);
    const {VITE_API_URL} =  import.meta.env;
    // import.meta.env = JSON.stringify(import.meta.env);

    return {
        VITE_API_URL
        // ...import.meta.env
        // jota
    }
    
}