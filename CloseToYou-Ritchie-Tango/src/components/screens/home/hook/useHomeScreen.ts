import {useState} from 'react';


export const useHomeScreen = () => {
  const [showContacts, setShowContacts] = useState(true);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 50 && showContacts) {
      setShowContacts(false);
    } else if (offsetY <= 50 && !showContacts) {
      setShowContacts(true);
    }
  };

  return {
    showContacts,
    handleScroll,
    setShowContacts,
  };
};
