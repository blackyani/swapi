
export default (...funcs) => (comp) => {
    return funcs.reduceRight(
        (previousFunction, currentFunction) => currentFunction(previousFunction), comp);
};