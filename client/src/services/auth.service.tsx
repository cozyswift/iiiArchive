import React, { ReactNode, ComponentType } from "react";
import { useContext, useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { useCacheService } from "./cache.service";
import {
  useSignInMutation,
  Archivist,
  useMeQuery,
  useSignUpMutation
} from "../graphql/types";

const MyContext = React.createContext<Archivist | null>(null);

export function useMe() {
  return useContext(MyContext);
}

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return (props: any) => {
    if (!isSignedIn()) {
      if (props.history.location.pathname === "/sign-in") {
        return null;
      }
      return <Redirect to="/sign-in" />;
    }

    const signOut = useSignOut();
    const { data, error, loading } = useMeQuery();
    useCacheService();

    if (loading) return null;
    if (data === undefined) return null;
    if (error || !data.me) {
      signOut();
      return <Redirect to="/sign-in" />;
    }

    return (
      <MyContext.Provider value={data.me}>
        <Component {...(props as P)} />
      </MyContext.Provider>
    );
  };
}

// export function signIn(authToken: string) {
//   document.cookie = `authToken=${authToken}`;
//   console.log(document.cookie);
//   return Promise.resolve();
// }

export const useSignIn = useSignInMutation;
export const useSignUp = useSignUpMutation;

export function useSignOut() {
  const client = useApolloClient();

  return useCallback(() => {
    // "expires" represents the lifespan of a cookie. Beyond that date the cookie will
    // be deleted by the browser. "expires" cannot be viewed from "document.cookie"
    document.cookie = `authToken=;expires=${new Date(0)}`;

    // Clear cache
    return client.clearStore();
  }, [client]);
}

export function isSignedIn() {
  return /authToken=.+(;|$)/.test(document.cookie);
}
