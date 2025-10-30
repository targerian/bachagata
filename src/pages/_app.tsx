import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar, Footer } from "@/common/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="dark min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
