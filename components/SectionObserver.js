// components/SectionObserver.js
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer'; // Убедитесь, что установлен: npm install react-intersection-observer

const SectionObserver = ({ id, children, onInViewChange, threshold = 0.3, rootMargin }) => {
  const { ref, inView } = useInView({
    threshold: threshold,
    rootMargin: rootMargin, 
  });

  useEffect(() => {
    onInViewChange(id, inView); 
  }, [id, inView, onInViewChange]);

  return (
    <div ref={ref} id={id}> 
      {children}
    </div>
  );
};

export default SectionObserver;