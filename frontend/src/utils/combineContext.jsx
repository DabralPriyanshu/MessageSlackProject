/**
 * 
 * @returns combines all the context providers

 */

const combineContext = (...providers) => {
  return ({ children }) => {
  //reduceRight because we want to start from only children then one provider then others..
    return providers.reduceRight((acc, CurrProvider) => {
      return <CurrProvider>{acc}</CurrProvider>;
    }, children);
  };
};

export default combineContext;
