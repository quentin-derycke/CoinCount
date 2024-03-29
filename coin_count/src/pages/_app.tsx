"use client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import storage from "@/utils/auth/localStorage";
import { login } from "@/store/slices/authSlice";
import { SessionProvider, useSession } from "next-auth/react";
import {NextUIProvider} from "@nextui-org/react";
import Layout from "@/layout";
import getAxiosInstance from "@/utils/axios/getAxiosInstance";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const dispatch = useDispatch();

  console.log(session);
  useEffect(() => {
    const t = localStorage.getItem("t");
    if (t) {
      const refreshMyToken = async () => {
        try {
          const axiosInstance = getAxiosInstance();
          const resp = await axiosInstance.get("/refresh_token");
          let { token, user } = resp.data;
          user = {
            username: user.username,
            email: user.email,
            watchlist: user.watchlist,
            id: user._id,
          };
          await storage.saveToLocalStorage("t", token);
          dispatch(login({ token, user }));
        } catch (err) {
          console.log(err);
        }
      };
      refreshMyToken();
    }
  }, []);
  return (

    <NextUIProvider> 
     <SessionProvider session={session}>
      <Layout>
      <Component {...pageProps} />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      </Layout>
    </SessionProvider>
    </NextUIProvider>
  );
}

export default wrapper.withRedux(MyApp);
