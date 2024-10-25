import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCurrentUser } from "@/hooks/rq/auth/use-get-current-user";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className="p-2 mt-4">
      <div className="flex items-center gap-2 w-1/4 mx-auto">
        <Avatar>
          <AvatarImage src={currentUser?.user.picture as string} />
          <AvatarFallback>Cn</AvatarFallback>
        </Avatar>

        <div>
          <p>
            {currentUser?.user.given_name} {currentUser?.user.family_name}
          </p>

          <p className="text-xs text-gray-500">{currentUser?.user.email}</p>
        </div>
      </div>
    </div>
  );
}
