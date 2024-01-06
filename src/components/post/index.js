import { useRef } from "react"
import Header from "./header"
import Image from "./image"
import Actions from "./actions"
import Footer from "./footer"
import Comments from "./comments"

export default function Post( {content }) {
    const commentInput = useRef(null)

    const handleFocus = () => commentInput.current.focus()

    return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
        <Header username={content.username} />
        <Image src={content.imageSrc} caption={content.caption} />
        <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} />
        <Footer caption={content.caption} username={content.username} />
        <Comments docId={content.docId} commnets={content.comments} posted={content.dateCreated} commentInput={commentInput} />
    </div> )
}