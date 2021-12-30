import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const useFeatures = () => {
  const navigate = useNavigate();

  function showStatusModal(message, status) {
    toast(message, {type: status});
  };

  function onSendItem(id, src, price, size, title, optionColors, items, setItems, func) {
    const product = {
      currentId: id,
      currentSize: size,
      currentColor: optionColors[0] || null,
      currentSum: 1,
      currentSrc: src,
      currentPrice: price,
      currentTitle: title
    };

    if (func) {
      const isProductExist = func(items, id, 1);
      if (isProductExist) {
        return;
      }
    }

    setItems(items => ([...items, product]));
  }

  function redirectTo(url, replace) {
    navigate(url, {replace: replace});
  };

  return {
    showStatusModal,
    onSendItem,
    redirectTo
  }
}

export {useFeatures};
