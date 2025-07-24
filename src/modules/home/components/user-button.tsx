import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between  overflow-hidden text-foreground">
          {data.user.image ? (
            <Avatar className=" flex gap-2">
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : null}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0 ml-1">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent className="w-72">
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            {/* <Button variant={"outline"} onClick={() => authClient.customer.portal()}>
              <CreditCardIcon />
              Billing
            </Button> */}
            <Button variant={"outline"} onClick={onLogout}>
              <LogOutIcon />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-secondary-foreground/30 hover:bg-secondary-foreground/40 overflow-hidden text-secondary-foreground">
        {data.user.image ? (
          <Avatar className=" flex gap-2">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : null}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0 ml-1">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={() => authClient.customer.portal()} className="cursor-pointer flex items-center justify-between">
          Billing <CreditCardIcon className="size-4" />
        </DropdownMenuItem> */}
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer flex items-center justify-between">
          Logout <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
