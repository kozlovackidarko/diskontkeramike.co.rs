import Image from 'next/image'
import { assetUrl } from '@/lib/assetUrl'

export default function Divider() {
  return (
    <div className="w-full h-[14px] md:h-[18px] relative overflow-hidden">
      <Image
        src={assetUrl('/icons/divider.svg')}
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />
    </div>
  )
}
