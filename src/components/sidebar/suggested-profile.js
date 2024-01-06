import { useState } from "react"
import { Link } from "react-router-dom"
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'

export default function SuggestedProfile ({ spDocId, username, profileId, userId, loggedInUserDocId}) {
    const [followed, setFollowed] = useState(false)

    async function handleFollowUser() {
        setFollowed(true)

        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)

        await updateFollowedUserFollowers(spDocId, userId, false)
    }

    return !followed ? ( 
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img src={`/images/avatars/${username}.jpg`} alt="" className="rounded-full w-8 flex mr-3" />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <button
                className="text-xs font-bold text-blue-medium"
                type="button"
                onClick={handleFollowUser}
            >
                Follow
            </button>
           
        </div>
    ) : null
}
 