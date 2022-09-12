/**
 * It takes a url, an options object, and an error message as arguments, and returns an error message
 * if the fetch request fails.
 * @param [url] - The url to make the request to.
 * @param [optionsObj=null] - This is the object that contains the request method, headers, and body.
 * @param [errMsg=null] - This is the error message that will be returned if the request fails.
 * @returns The value of errMsg.
 */
const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj);
        if (!response.ok) throw Error('Please reload the app');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

export default apiRequest