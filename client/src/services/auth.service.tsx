import {useCallback} from 'react'
import {useApolloClient} from '@apollo/react-hooks'

export const signIn=(currentArchivistId:string)=>{
    document.cookie=`currentUserId=${currentArchivistId};`

    return Promise.resolve();
}

export const useSignOut=()=>{
    const client=useApolloClient();


    return useCallback(()=>{
        document.cookie = `currentUserId=;expires=${new Date(0)}`;
        return client.clearStore();
    },[client])
}

export const isSignedIn = () => {
    return /currentUserId=.+(;|$)/.test(document.cookie);
  };