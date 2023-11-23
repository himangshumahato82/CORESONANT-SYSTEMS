import { createContext, useState } from "react";

const profileContext = createContext(null);
const MyContext = ({ children }) => {
  const [profile, setProfile] = useState({});
//   console.log(profile);
  return (
    <profileContext.Provider value={{ profile, setProfile }}>
      {children}
    </profileContext.Provider>
  );
};
export { MyContext, profileContext };
