import { useGetCurrentUser } from '@/hooks/rq/auth/use-get-current-user'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { data: currentUser } = useGetCurrentUser()

  return <div className="p-2">Hello, {currentUser?.user.given_name}</div>
}
