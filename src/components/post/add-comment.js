import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function AddComment({docId, comments, setComments, commentInput}) {
    const [comment, setComment] = useState('')
    const {firebase, FieldValue} = useContext(FirebaseContext)
    const {
        user: {displayName}
    } = useContext(UserContext)

    const handleSubmitComment = (e) => {
        e.preventDefault()

        setComments([{displayName, comment}, ...comments])
        setComment('')

        return firebase.firestore().collection('photos').doc(docId).update({
            comments: FieldValue.arrayUnion({displayName, comment })
        })
    }

    return <div className="border-t border-gray-primary mt-10">
        <form action="" method="POST" onSubmit={(e) => comment.length >= 1 ? handleSubmitComment : e.preventDefault()} className="flex justify-between pl-0 pr-5">
            <input type="text" ref={commentInput} name="add-comment" value={comment} onChange={({target}) => setComment(target.value)} placeholder="Add a comment ..." aria-label="Add a comment" autoComplete="off" className="text-sm text-gray-base w-full mr-3 py-5 px-4" id="" />
            <button 
                className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                type="button"
                disabled={comment.length < 1}
                onClick={handleSubmitComment}
                >
                Post
            </button>
        </form>
    </div>
}