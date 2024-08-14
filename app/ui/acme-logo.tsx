import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { gloria, montserrat } from './font';

export default function AcmeLogo() {
  return (
    <div
      className={`${gloria.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[44px]">Cacica Urimare</p>
    </div>
  );
}
