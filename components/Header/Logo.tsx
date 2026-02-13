import Image from 'next/image'
import { assetUrl } from '@/lib/assetUrl'

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src={assetUrl('/icons/logo.svg')}
        alt="Diskont Keramike Logo"
        width={95}
        height={60}
        priority
        className="w-[75px] h-[47px] md:w-[95px] md:h-[60px]"
      />
    </div>
  )
}
