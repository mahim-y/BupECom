import { redirect } from 'next/navigation'

export default function EditProductRedirect() {
  redirect('/?tab=seller')
}
