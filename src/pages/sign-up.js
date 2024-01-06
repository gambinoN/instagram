import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { useContext, useEffect, useState } from "react";
import * as ROUTES from "../constants/routes"
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAdress, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAdress === ''

    const handleSignUp = async (e) => {
        e.preventDefault();

        const usernameExists = await doesUsernameExist(username);

        if (!usernameExists.length) {
            try {
           const createdUserResult = await firebase
           .auth()
           .createUserWithEmailAndPassword(emailAdress, password)

           await createdUserResult.user.updateProfile({
            displayName: username
           })

           await firebase.firestore().collection('users').add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName: fullName,
            emailAdress: emailAdress.toLowerCase(),
            following: [],
            followers: [],
            dateCreated: Date.now()
           })

           navigate(ROUTES.DASHBOARD)
        } catch (error) {
            setFullName('')
            setEmailAdress('')
            setPassword('')
            setError(error.message);
        }
    } else {
        setUsername('')
        setError('That username exists please try another one')
    }
    }

    useEffect(() => {
        document.title = 'Sign Up - Instagram';
    }, [])

    return (
        <>
            <div className="container flex mx-auto max-w-screen-md items-center h-screen">
                <div className="flex w-3/5">
                    <img src="/images/login.jpg" alt="iphone with Instagram"/>
                </div>
                <div className="flex flex-col w-2/5 items-center bg-white p-4 py-10 border border-gray-primary mb-4">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="w-6/12 mb-5" />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignUp} method="POST">
                        <input 
                            aria-label="Enter your username"
                            type="text"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                            value={username}
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        />
                        <input 
                            aria-label="Enter your full name"
                            type="text"
                            onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                            value={fullName}
                            placeholder="Full name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        />
                        <input 
                            aria-label="Enter your email address"
                            type="text"
                            onChange={(e) => {
                                setEmailAdress(e.target.value)
                            }}
                            value={emailAdress}
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        />
                        <input 
                            aria-label="Enter your password"
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password}
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        />
                        <button disabled={isInvalid} type="submit" className={`bg-blue-medium mt-3 text-white w-full rounded h-10 font-bold ${isInvalid && `opacity-50`}`}>
                            Sign Up
                        </button>
                    </form>
                    <div className="flex justify-center items-center rounded-lg flex-col mt-10 w-full bg-white p-4 border border-gray-primary">
                        <p className="text-sm">Have an account?{` `}
                            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                                Log In
                            </Link>
                        </p>                
                    </div>
                </div>                
            </div>
        </>
    )
}