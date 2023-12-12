import Image from "next/image";
import { Inter } from "next/font/google";
import Success from "./donation/success";
import { CampaignCard } from "@/components/shared/CampaignCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <CampaignCard
      campaignTitle={"Sample Title"}
      coverImageURL={
        "data:image/jpeg;base64,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"
      }
      currentAmount={1000}
      targetAmount={10000}
      targetDate={100000}
    />
  );
  // return (
  //   <main
  //     className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
  //   >
  //     <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
  //       <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
  //         Get started by editing&nbsp;
  //         <code className="font-mono font-bold">src/pages/index.tsx</code>
  //       </p>
  //       <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
  //         <a
  //           className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
  //           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           By{" "}
  //           <Image
  //             src="/vercel.svg"
  //             alt="Vercel Logo"
  //             className="dark:invert"
  //             width={100}
  //             height={24}
  //             priority
  //           />
  //         </a>
  //       </div>
  //     </div>

  //     <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
  //       <Image
  //         className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
  //         src="/next.svg"
  //         alt="Next.js Logo"
  //         width={180}
  //         height={37}
  //         priority
  //       />
  //     </div>

  //     <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
  //       <a
  //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={`mb-3 text-2xl font-semibold`}>
  //           Docs{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
  //           Find in-depth information about Next.js features and API.
  //         </p>
  //       </a>

  //       <a
  //         href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={`mb-3 text-2xl font-semibold`}>
  //           Learn{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
  //           Learn about Next.js in an interactive course with&nbsp;quizzes!
  //         </p>
  //       </a>

  //       <a
  //         href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={`mb-3 text-2xl font-semibold`}>
  //           Templates{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
  //           Discover and deploy boilerplate example Next.js&nbsp;projects.
  //         </p>
  //       </a>

  //       <a
  //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={`mb-3 text-2xl font-semibold`}>
  //           Deploy{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
  //           Instantly deploy your Next.js site to a shareable URL with Vercel.
  //         </p>
  //       </a>
  //     </div>
  //   </main>
  // );
}
