import { auth } from "@/lib/auth";
import { ProjectForm } from "@/modules/home/components/project-form";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col w-full ">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center ">
          <Image src={"/logo.svg"} alt="Webly Logo" width={50} height={50} />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">Build something amazing with Webly</h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">Create apps and websites by chatting with AI</p>
        <div className="max-w-3xl mx-auto w-full">
          <div className="mx-w-3xl mx-auto w-full">
            <ProjectForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
