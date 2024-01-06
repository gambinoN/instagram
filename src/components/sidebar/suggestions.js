import { useState, useEffect } from "react";
import { getSuggestions } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import { PropTypes } from "prop-types";
import SuggestedProfile from "./suggested-profile";

const Suggestions = ({userId, following, loggedInUserDocId }) => {
    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        async function getSuggestionsById() {
            const response = await getSuggestions(userId, following);
            setProfiles(response);
          }
      
          if (userId) {
            getSuggestionsById();
          }
    }, [userId]) 

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">
                    Suggestions for you
                </p>
            </div> 
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) => {
                    return <SuggestedProfile 
                        key={profile.docId}
                        spDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}
                    />
                })}
            </div>
        </div>
    ) : null
}
 
export default Suggestions;

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array
}