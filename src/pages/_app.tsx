import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { NavBar, Footer } from "@/common/components";
import { PageTransition } from "@/common/animations";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      <div className="dark min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <PageTransition key={router.pathname}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
