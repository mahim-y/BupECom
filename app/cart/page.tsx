import { redirect } from 'next/navigation'

export default function CartPage() {
  redirect('/?tab=buyer')
}
