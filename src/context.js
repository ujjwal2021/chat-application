import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({children})=> {

    // error
  const [error, setError] = useState({ status: false, msg: "" });

//   handelling the chainging focus in the input fields of login and signup
    const handleEnter = (event, activeInput, setActiveInput) => {
        if (event.keyCode === 13) {
          const form = event.target.form;
          const index = Array.prototype.indexOf.call(form, event.target);
          setActiveInput([...activeInput, form.elements[index+1].name])
          form.elements[index + 1].focus();
          event.preventDefault();
        }
      }

    return (
        <AppContext.Provider
            value = {{
                handleEnter,
                error,
                setError
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext  = () => {
    return useContext(AppContext);
};
export {AppContext, AppProvider};