import React from "react";
import { useUser } from '../UserContext/UserContext';


function Rank() {

    const { user } = useUser();



    return (
        <div>
            {user && (
                <div>
                    <div className="black f3">
                        {`${user.name}, your current rank is..`}
                    </div>
                    <div className="black f1">
                        {`#${user.entries}`}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Rank;