import Image from "next/image";
import ChatBot from "./frontend/ChatBot/page";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        {/* Google Fonts for Material Icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"
        />
      </Head>
      <ChatBot />
    </div>
  );
}
