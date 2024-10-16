import { useRef, useState } from 'react';
import Image from 'next/image';
import DropBoxItem from './DropBoxItem';
import menu from '@/public/images/icon/menu.svg';
import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from 'next/navigation';

interface IItemsProps<T> {
  items: string[];
  data?: T;
  hideTrigger?: boolean;
  triggerElement?: React.ReactNode;
}

const DropBoxGroup = <T,>({ items, data, hideTrigger = false, triggerElement }: IItemsProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const dropBoxRef = useRef<HTMLDivElement>(null);
  const epidayId = data;
  const router = useRouter();

  const handleClickOutside = () => {
    setIsVisible(false);
  };

  useClickOutside(dropBoxRef, handleClickOutside);

  const handleToggleDropBox = () => {
    setIsVisible((prev) => !prev);
  };

  const handleClick = (item: string) => {
    switch (item) {
      case '수정하기':
        if (epidayId) {
          router.push(`/epidays/${epidayId}/edit`);
        }
        break;
      case '삭제하기':
        alert('삭제하기 클릭됨!');
        break;
      default:
        break;
    }
    setIsVisible(false);
  };

  return (
    <div className='relative' ref={dropBoxRef}>
      {!hideTrigger && <button onClick={handleToggleDropBox}>{triggerElement ? triggerElement : <Image src={menu} alt='메뉴' width={36} height={36} />}</button>}
      {triggerElement && hideTrigger && <div onClick={handleToggleDropBox}>{triggerElement}</div>}
      {isVisible && (
        <ul className='absolute right-0 rounded-[1.6rem] border-[0.1rem] bg-var-background'>
          {items.map((item) => {
            return <DropBoxItem key={item} itemText={item} onClick={() => handleClick(item)} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default DropBoxGroup;
