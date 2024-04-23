import React, {memo, useState, useEffect} from "react";

const index = memo(() => {

    const [currentUrl, setCurrentUrl] = useState('');



    return (
        <div>
            <h1><i className="fa-brands fa-facebook-f"></i> index</h1>
            <p>여기는 index.js입니다.</p>
            <p>mode:</p>
        </div>
    );
});

index.displayName ="index";

export default index;