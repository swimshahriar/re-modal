import { useEffect, useRef, useState, useCallback } from 'react';

export const useDragging = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isElReady, setIsElReady] = useState(false);

  const dragPosRef = useRef({ x: 0, y: 0 });
  const dragElRef = useRef(null);
  const parentElRef = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.stopPropagation();
      e.preventDefault();

      if (parentElRef.current) {
        const { x, y } = dragPosRef.current;
        parentElRef.current.style.left = `${
          parentElRef.current.offsetLeft - (x - e.x)
        }px`;
        parentElRef.current.style.top = `${
          parentElRef.current.offsetTop - (y - e.y)
        }px`;

        dragPosRef.current = { x: e.x, y: e.y };
      }
    },
    [isDragging]
  );

  const onMouseUp = (e) => {
    setIsDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    e.stopPropagation();
    e.preventDefault();

    dragPosRef.current = { x: e.x, y: e.y };
  };

  // When the element mounts, attach an mousedown listener
  useEffect(() => {
    if (isElReady) {
      dragElRef.current.addEventListener('mousedown', onMouseDown);
    }
  }, [isElReady]);

  // Everytime the isDragging state changes, assign or remove
  // the corresponding mousemove and mouseup handlers
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    } else {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragging, onMouseMove]);

  return { dragElRef, parentElRef, setIsElReady, isDragging };
};
