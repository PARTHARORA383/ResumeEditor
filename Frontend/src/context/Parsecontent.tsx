
import { createContext  , useContext, useState, type ReactNode } from "react";


type ParsedDataType = {
  name: string;
  email: string;
  education: {
    degree: string;
    institute: string;
    startdate: string;
    enddate: string;
  }[];
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
  }[];
};


type ParsedContextType = {
  parsedData : ParsedDataType | null ,
  setParsedData : React.Dispatch<React.SetStateAction<ParsedDataType | null>>
}

const ParsedStateContext = createContext<ParsedContextType | undefined >(undefined)



export const ParsedStateProvider = ({children} : {children : ReactNode}) =>{

const [parsedData , setParsedData] = useState<ParsedDataType | null>(null)


return (
  <ParsedStateContext.Provider value={{parsedData , setParsedData}}>
    {children}
  </ParsedStateContext.Provider>
)
}


export const useGlobalState = () => {
  const context = useContext(ParsedStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a ParsedStateProvider");
  }
  return context;
};

