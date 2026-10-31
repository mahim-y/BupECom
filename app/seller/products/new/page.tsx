import { redirect } from 'next/navigation'

export default function NewProductRedirect() {
  redirect('/?tab=seller')
}
