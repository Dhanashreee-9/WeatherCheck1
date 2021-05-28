import React from 'react';

const InputFile =({Inputting})=>{


    return(
        <div className="search">
            <input type="text"  onKeyDown={Inputting} className="input" placeholder="Search City/State/Country" />
        </div>
    )
}
export default InputFile;