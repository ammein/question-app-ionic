import React from 'react';
import { MyContext } from '../../Utils/Declaration/Utils';

const context = React.createContext<MyContext>({
    path : ""
})
export default context;